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
   eSPMI - Ubah lebar kolom datatable dengan drag (column resize)
   --------------------------------------------------------------------------
   SEMUA kolom pada tabel di dalam `.table-responsive` bisa diubah lebarnya
   dengan menyeret gagang di tepi kanan header MAUPUN sel body kolom
   tersebut. Klik ganda pada gagang mengembalikan lebar bawaan kolom itu.

   Perilaku:
     - Hanya pointer mouse; ambang gerak 4px; klik pada gagang tidak
       memicu sorting; pointerdown pada gagang tidak diteruskan ke
       drag-to-scroll (stopPropagation).
     - Lebar tersimpan per halaman+tabel di localStorage (`espmi.colWidths:*`
       berisi peta {nomorKolom: px}) dan diterapkan saat halaman dibuka.
     - Lebar minimum 72px; sel body membungkus teks panjang (multi-baris,
       espmi-app.css bagian 22a) sehingga kolom bisa dirampingkan.
     - Pada tabel `.table-sticky`, offset kolom fixed (No/Aksi/ketiga)
       diselaraskan otomatis dari lebar terukur agar tidak tumpang tindih.
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

  // Daftar nomor kolom (1-based) yang boleh diubah: semua sel header baris
  // pertama tanpa span. [] = tabel tidak memenuhi syarat.
  function resizableColumns(table) {
    var headRow = table.querySelector('thead > tr');
    if (!headRow || headRow.children.length < 2) return [];
    var cols = [];
    for (var i = 0; i < headRow.children.length; i += 1) {
      var c = headRow.children[i];
      if ((c.getAttribute('colspan') || '1') !== '1' || (c.getAttribute('rowspan') || '1') !== '1') return [];
      cols.push(i + 1);
    }
    return cols;
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

  function columnCells(table, col) {
    var cells = [];
    var th = table.querySelector('thead > tr > :nth-child(' + col + ')');
    if (th) cells.push(th);
    var tds = table.querySelectorAll('tbody > tr > :nth-child(' + col + ')');
    for (var i = 0; i < tds.length; i += 1) cells.push(tds[i]);
    return cells;
  }

  function applyWidth(table, col, px) {
    var cells = columnCells(table, col);
    for (var i = 0; i < cells.length; i += 1) {
      cells[i].style.width = px + 'px';
      cells[i].style.minWidth = px + 'px';
    }
  }

  function clearWidth(table, col) {
    var cells = columnCells(table, col);
    for (var i = 0; i < cells.length; i += 1) {
      cells[i].style.width = '';
      cells[i].style.minWidth = '';
    }
  }

  function isStickyTable(table) {
    return table.classList.contains('table-sticky');
  }

  // Selaraskan offset kolom fixed (No/Aksi/ketiga) dengan lebar kolom 1-2:
  // diukur dari render, jatuh kembali ke inline, lalu ke bawaan (px pada
  // root 16px). Dipanggil setiap ada perubahan agar tidak tumpang tindih.
  function colWidthPx(table, col, fallback) {
    var th = table.querySelector('thead > tr > :nth-child(' + col + ')');
    if (!th) return fallback;
    var rect = th.getBoundingClientRect ? th.getBoundingClientRect() : null;
    var w = Math.round((rect && rect.width) || 0);
    if (w > 0) return w;
    var inline = parseInt(th.style.width, 10);
    if (inline > 0) return inline;
    return fallback;
  }
  function syncStickyVars(table) {
    if (!isStickyTable(table)) return;
    var w1 = colWidthPx(table, 1, 72);
    var w2 = colWidthPx(table, 2, 112);
    if (w1 <= 0 || w2 <= 0) return;
    table.style.setProperty('--espmi-table-sticky-left', w1 + 'px');
    table.style.setProperty('--espmi-table-sticky-aksi', w2 + 'px');
    table.style.setProperty('--espmi-table-sticky-left-3', w1 + w2 + 'px');
  }

  function hasCustomWidth(table) {
    var ths = table.querySelectorAll('thead > tr > *');
    for (var i = 0; i < ths.length; i += 1) {
      if (parseInt(ths[i].style.width, 10)) return true;
    }
    return false;
  }

  function refreshSticky(table) {
    if (!isStickyTable(table)) return;
    if (!hasCustomWidth(table)) {
      table.style.removeProperty('--espmi-table-sticky-left');
      table.style.removeProperty('--espmi-table-sticky-aksi');
      table.style.removeProperty('--espmi-table-sticky-left-3');
      return;
    }
    syncStickyVars(table);
  }

  function collectWidths(table) {
    var map = {};
    var headRow = table.querySelector('thead > tr');
    if (!headRow) return map;
    for (var i = 0; i < headRow.children.length; i += 1) {
      var w = parseInt(headRow.children[i].style.width, 10);
      if (w && w >= MIN_WIDTH) map[i + 1] = w;
    }
    return map;
  }

  function saveWidths(table, key) {
    var map = collectWidths(table);
    if (!Object.keys(map).length) storeDel(key);
    else {
      try {
        storeSet(key, JSON.stringify(map));
      } catch (err) {
        /* abaikan */
      }
    }
  }

  function restoreWidths(table, key) {
    var map = null;
    try {
      map = JSON.parse(storeGet(key) || 'null');
    } catch (err) {
      map = null;
    }
    if (!map || typeof map !== 'object') return false;
    var applied = false;
    Object.keys(map).forEach(function (k) {
      var col = parseInt(k, 10);
      var px = parseInt(map[k], 10);
      if (col > 0 && px >= MIN_WIDTH) {
        applyWidth(table, col, px);
        applied = true;
      }
    });
    return applied;
  }

  function closestHandle(table, node) {
    if (!node || !node.closest) return null;
    var h = node.closest('.espmi-col-resize-handle');
    return h && table.contains(h) ? h : null;
  }

  function enhance(table, index) {
    var cols = resizableColumns(table);
    if (!cols.length) return;
    if (table.getAttribute('data-espmi-col-resize') === '1') return;
    table.setAttribute('data-espmi-col-resize', '1');
    var key = 'espmi.colWidths.' + pageKey() + '.' + index;

    var headRow = table.querySelector('thead > tr');
    for (var i = 0; i < cols.length; i += 1) injectHandle(headRow.children[cols[i] - 1]);
    var rows = table.querySelectorAll('tbody > tr');
    for (var r = 0; r < rows.length; r += 1) {
      for (var c = 0; c < cols.length; c += 1) {
        var td = rows[r].children[cols[c] - 1];
        if (td) injectHandle(td);
      }
    }

    if (restoreWidths(table, key)) refreshSticky(table);

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
            if (node.tagName === 'TR') {
              for (var q = 0; q < cols.length; q += 1) {
                var cell = node.children[cols[q] - 1];
                if (cell) injectHandle(cell);
              }
            } else if (node.tagName === 'TD' || node.tagName === 'TH') {
              injectHandle(node);
            }
          }
        }
      });
      mo.observe(tbody, { childList: true });
    }

    var dragging = false;
    var moved = false;
    var downOnHandle = false;
    var dragCol = 0;
    var startX = 0;
    var startW = 0;

    function headerCell(col) {
      return table.querySelector('thead > tr > :nth-child(' + col + ')');
    }

    table.addEventListener('pointerdown', function (event) {
      var handle = closestHandle(table, event.target);
      if (!handle) return;
      if (event.pointerType !== 'mouse' || event.button !== 0) return;
      event.stopPropagation();
      event.preventDefault();
      var cell = handle.parentElement;
      dragCol = cell && typeof cell.cellIndex === 'number' ? cell.cellIndex + 1 : 0;
      if (!dragCol) return;
      dragging = true;
      moved = false;
      downOnHandle = true;
      startX = event.clientX;
      var head = headerCell(dragCol);
      var rect = head ? head.getBoundingClientRect() : null;
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
      var cell = event.target.closest('.espmi-col-resize-handle').parentElement;
      var col = cell && typeof cell.cellIndex === 'number' ? cell.cellIndex + 1 : 0;
      if (!col) return;
      clearWidth(table, col);
      refreshSticky(table);
      saveWidths(table, key);
    });

    window.addEventListener('pointermove', function (event) {
      if (!dragging || !dragCol) return;
      var dx = event.clientX - startX;
      if (!moved && Math.abs(dx) <= THRESHOLD) return;
      moved = true;
      applyWidth(table, dragCol, Math.max(MIN_WIDTH, Math.round(startW + dx)));
      refreshSticky(table);
    });

    function finish(save) {
      if (!dragging) return;
      dragging = false;
      dragCol = 0;
      document.body.classList.remove('espmi-col-resizing');
      if (save && moved) saveWidths(table, key);
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
    var tables = document.querySelectorAll('.table-responsive table');
    var n = 0;
    for (var i = 0; i < tables.length; i += 1) {
      if (resizableColumns(tables[i]).length) {
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
