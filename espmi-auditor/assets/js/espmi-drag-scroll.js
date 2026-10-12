/* ==========================================================================
   eSPMI - Geser datatable lebar dengan drag (horizontal drag-to-scroll)
   --------------------------------------------------------------------------
   Untuk datatable yang lebih lebar dari container (mis. banyak kolom) dan
   dibungkus `.table-responsive`, selain menggeser scrollbar pengguna bisa
   MENDRAG area tabel (baris/kolom) untuk scroll horizontal.

   Perilaku:
     - Hanya aktif bila container benar-benar bisa scroll horizontal
       (`scrollWidth > clientWidth`) dan hanya untuk pointer mouse
       (sentuhan tetap memakai swipe bawaan peramban).
     - Ada ambang gerak (4px) agar klik biasa (sorting, tombol) tidak
       terblokir; klik setelah drag otomatis ditekan (suppress).
     - Kursor berubah `grab` -> `grabbing`; seleksi teks dimatikan saat drag.

   Class kustom di espmi-app.css bagian 15 (lihat design-rules.md bagian 8.3).
   ========================================================================== */
(function () {
  'use strict';

  var THRESHOLD = 4;
  var CONTAINER_SELECTOR = '.table-responsive';

  function enhance(el) {
    if (el.getAttribute('data-espmi-drag-scroll') === '1') return;
    el.setAttribute('data-espmi-drag-scroll', '1');

    var isDown = false;
    var dragged = false;
    var startX = 0;
    var startScroll = 0;

    function canScroll() {
      return el.scrollWidth > el.clientWidth + 1;
    }

    function refreshAffordance() {
      if (canScroll()) {
        el.classList.add('espmi-drag-scrollable');
      } else {
        el.classList.remove('espmi-drag-scrollable');
        el.classList.remove('is-dragging');
      }
    }

    function stop() {
      if (!isDown) return;
      isDown = false;
      el.classList.remove('is-dragging');
      document.body.classList.remove('espmi-is-dragging');
    }

    el.addEventListener('pointerdown', function (event) {
      if (event.pointerType !== 'mouse') return;
      if (event.button !== 0) return;
      if (!canScroll()) return;

      isDown = true;
      dragged = false;
      startX = event.clientX;
      startScroll = el.scrollLeft;

      if (el.setPointerCapture) {
        try {
          el.setPointerCapture(event.pointerId);
        } catch (err) {
          /* noop */
        }
      }
    });

    el.addEventListener('pointermove', function (event) {
      if (!isDown) return;
      var dx = event.clientX - startX;

      if (!dragged && Math.abs(dx) > THRESHOLD) {
        dragged = true;
        el.classList.add('is-dragging');
        document.body.classList.add('espmi-is-dragging');
      }

      if (dragged) {
        el.scrollLeft = startScroll - dx;
        event.preventDefault();
      }
    });

    el.addEventListener('pointerup', stop);
    el.addEventListener('pointercancel', stop);

    // Cegah klik (sorting / tombol) bila ternyata user mendrag, bukan mengklik.
    el.addEventListener(
      'click',
      function (event) {
        if (dragged) {
          dragged = false;
          event.preventDefault();
          event.stopPropagation();
        }
      },
      true
    );

    refreshAffordance();
    window.addEventListener('resize', refreshAffordance, { passive: true });
  }

  function boot() {
    var nodes = document.querySelectorAll(CONTAINER_SELECTOR);
    for (var i = 0; i < nodes.length; i += 1) enhance(nodes[i]);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();

/* ==========================================================================
   eSPMI - Ubah lebar kolom target datatable dengan drag (column resize)
   --------------------------------------------------------------------------
   Kolom target adalah kolom ke-3 bila kolom ke-2 adalah Aksi (`th.aksi`),
   atau kolom ke-2 bila tidak ada kolom Aksi. Berlaku untuk tabel
   `.table-sticky` dengan minimal 3 kolom. Gagang disuntik di tepi kanan
   header DAN setiap sel body kolom target, sehingga pengguna bisa menyeret
   dari mana saja di kolom tersebut. Klik ganda pada gagang mengembalikan
   lebar bawaan.

   Perilaku:
     - Hanya pointer mouse; ambang gerak 4px; klik pada gagang tidak
       memicu sorting; pointerdown pada gagang tidak diteruskan ke
       drag-to-scroll (stopPropagation).
     - Lebar tersimpan per halaman+tabel di localStorage (`espmi.colWidth:*`)
       dan diterapkan saat halaman dibuka.
     - Lebar minimum 72px; tidak bisa lebih sempit dari isi terpanjang
       (table-layout auto + text-nowrap).
     - Event di-delegasi per tabel; MutationObserver menyuntik gagang ke
       baris yang ditambah belakangan (mis. via List.js).
     - Kolom yang dipakai filter cocok-persis WAJIB memakai atribut data-*
       (bukan values()), karena innerHTML sel kini memuat markup gagang.

   Class kustom di espmi-app.css (lihat design-rules.md bagian 8.5).
   ========================================================================== */
(function () {
  'use strict';

  var MIN_WIDTH = 72;
  var THRESHOLD = 4;

  function pageKey() {
    try {
      var p = window.location.pathname.split('/').pop();
      return p || 'index';
    } catch (err) {
      return 'index';
    }
  }
  function storeGet(k) {
    try {
      return window.localStorage.getItem(k);
    } catch (err) {
      return null;
    }
  }
  function storeSet(k, v) {
    try {
      window.localStorage.setItem(k, v);
    } catch (err) {
      /* localStorage penuh / diblokir - abaikan */
    }
  }
  function storeDel(k) {
    try {
      window.localStorage.removeItem(k);
    } catch (err) {
      /* abaikan */
    }
  }

  // Nomor kolom target (1-based): 3 bila kolom ke-2 adalah Aksi, 2 bila tidak.
  // 0 = tabel tidak memenuhi syarat (bukan sticky / <3 kolom / header span).
  function targetIndex(table) {
    if (!table.classList.contains('table-sticky')) return 0;
    var headRow = table.querySelector('thead > tr');
    if (!headRow || headRow.children.length < 3) return 0;
    for (var i = 0; i < 3; i += 1) {
      var c = headRow.children[i];
      if ((c.getAttribute('colspan') || '1') !== '1' || (c.getAttribute('rowspan') || '1') !== '1') return 0;
    }
    return headRow.children[1].classList.contains('aksi') ? 3 : 2;
  }

  function ensurePositioned(el) {
    try {
      var pos = window.getComputedStyle ? window.getComputedStyle(el).position : '';
      if (!pos || pos === 'static') el.style.position = 'relative';
    } catch (err) {
      el.style.position = 'relative';
    }
  }

  function injectHandle(cell) {
    if (!cell || cell.querySelector(':scope > .espmi-col-resize-handle')) return null;
    ensurePositioned(cell);
    var handle = document.createElement('span');
    handle.className = 'espmi-col-resize-handle';
    handle.setAttribute('title', 'Seret untuk mengatur lebar kolom (klik ganda = reset)');
    handle.setAttribute('aria-hidden', 'true');
    cell.appendChild(handle);
    return handle;
  }

  function targetCells(table, target) {
    var cells = [];
    var th = table.querySelector('thead > tr > :nth-child(' + target + ')');
    if (th) cells.push(th);
    var tds = table.querySelectorAll('tbody > tr > :nth-child(' + target + ')');
    for (var i = 0; i < tds.length; i += 1) cells.push(tds[i]);
    return cells;
  }

  function applyWidth(table, target, px) {
    var cells = targetCells(table, target);
    for (var i = 0; i < cells.length; i += 1) {
      cells[i].style.width = px + 'px';
      cells[i].style.minWidth = px + 'px';
    }
  }

  function clearWidth(table, target) {
    var cells = targetCells(table, target);
    for (var i = 0; i < cells.length; i += 1) {
      cells[i].style.width = '';
      cells[i].style.minWidth = '';
    }
  }

  function closestHandle(table, node) {
    if (!node || !node.closest) return null;
    var h = node.closest('.espmi-col-resize-handle');
    return h && table.contains(h) ? h : null;
  }

  function enhance(table, index) {
    var target = targetIndex(table);
    if (!target) return;
    if (table.getAttribute('data-espmi-col-resize') === '1') return;
    table.setAttribute('data-espmi-col-resize', '1');
    var key = 'espmi.colWidth.' + pageKey() + '.' + index;

    var headCell = table.querySelector('thead > tr > :nth-child(' + target + ')');
    if (headCell) injectHandle(headCell);
    var rows = table.querySelectorAll('tbody > tr');
    for (var i = 0; i < rows.length; i += 1) {
      var td = rows[i].children[target - 1];
      if (td) injectHandle(td);
    }

    var saved = parseInt(storeGet(key), 10);
    if (saved && saved >= MIN_WIDTH) applyWidth(table, target, saved);

    // Baris yang ditambah belakangan (sort/paginasi ulang List.js, tambah
    // baris) dapatkan gagang otomatis; baris lama yang dipasang ulang dilewati.
    var tbody = table.querySelector('tbody');
    if (tbody && typeof window.MutationObserver === 'function') {
      var mo = new window.MutationObserver(function (muts) {
        for (var m = 0; m < muts.length; m += 1) {
          var added = muts[m].addedNodes;
          for (var a = 0; a < added.length; a += 1) {
            var node = added[a];
            if (!node || node.nodeType !== 1) continue;
            var cell = null;
            if (node.tagName === 'TR') cell = node.children[target - 1] || null;
            else if ((node.tagName === 'TD' || node.tagName === 'TH') && node.cellIndex === target - 1) cell = node;
            if (cell) injectHandle(cell);
          }
        }
      });
      mo.observe(tbody, { childList: true });
    }

    var dragging = false;
    var moved = false;
    var downOnHandle = false;
    var startX = 0;
    var startW = 0;

    table.addEventListener('pointerdown', function (event) {
      if (!closestHandle(table, event.target)) return;
      if (event.pointerType !== 'mouse' || event.button !== 0) return;
      event.stopPropagation();
      event.preventDefault();
      dragging = true;
      moved = false;
      downOnHandle = true;
      startX = event.clientX;
      var rect = headCell ? headCell.getBoundingClientRect() : null;
      startW = Math.max(MIN_WIDTH, Math.round((rect && rect.width) || MIN_WIDTH));
      document.body.classList.add('espmi-col-resizing');
    });

    // Klik pada gagang bukan klik sorting: tekan.
    table.addEventListener('click', function (event) {
      if (!downOnHandle) return;
      downOnHandle = false;
      if (!closestHandle(table, event.target)) return;
      event.preventDefault();
      event.stopPropagation();
    }, true);

    table.addEventListener('dblclick', function (event) {
      if (!closestHandle(table, event.target)) return;
      event.stopPropagation();
      event.preventDefault();
      clearWidth(table, target);
      storeDel(key);
    });

    window.addEventListener('pointermove', function (event) {
      if (!dragging) return;
      var dx = event.clientX - startX;
      if (!moved && Math.abs(dx) <= THRESHOLD) return;
      moved = true;
      applyWidth(table, target, Math.max(MIN_WIDTH, Math.round(startW + dx)));
    });

    function finish(save) {
      if (!dragging) return;
      dragging = false;
      document.body.classList.remove('espmi-col-resizing');
      if (save && moved && headCell) {
        var w = parseInt(headCell.style.width, 10);
        if (w && w >= MIN_WIDTH) storeSet(key, String(w));
      }
      moved = false;
    }
    window.addEventListener('pointerup', function () {
      finish(true);
    });
    window.addEventListener('pointercancel', function () {
      finish(false);
    });
  }

  function boot() {
    var tables = document.querySelectorAll('table.table-sticky');
    var n = 0;
    for (var i = 0; i < tables.length; i += 1) {
      if (targetIndex(tables[i])) {
        enhance(tables[i], n);
        n += 1;
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
