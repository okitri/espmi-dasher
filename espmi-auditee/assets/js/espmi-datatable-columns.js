/* ==========================================================================
   eSPMI - Kontrol visibilitas kolom datatable (dropdown "Kolom")
   --------------------------------------------------------------------------
   Untuk setiap menu `[data-columns-menu]`:
     1. Membaca header (<th>) tabel pada card yang sama, termasuk header
        bertingkat (rowspan / colspan).
     2. Mengisi menu dengan checkbox per kolom (checked = tampil).
     3. Menyembunyikan / menampilkan kolom saat checkbox diubah.

   Aturan: secara default tiga kolom pertama (No + Aksi + kolom ke-3) SELALU
   tampil dan tidak bisa disembunyikan (lihat design-rules.md bagian 7 & 16.5).
   Bila pada <th> ada atribut `data-espmi-locked`, kolom terkunci ditentukan
   eksplisit oleh atribut itu (dipakai halaman tree "Daftar Standar Mutu" yang
   menaruh kolom Aksi di paling kanan).

   Kolom dengan atribut `data-espmi-hidden-default` pada <th>-nya dimulai dalam
   keadaan tersembunyi (checkbox tidak tercentang) - dipakai kolom "Info Jenjang"
   pada halaman Daftar Standar Mutu.

   Tidak bergantung pada List.js; aman dijalankan sebelum/sesudah list.min.js
   karena hanya bekerja saat event change pada checkbox.
   ========================================================================== */
(function () {
  'use strict';

  // Jumlah kolom kiri yang selalu tampil (No, Aksi, kolom ke-3).
  var LOCKED_COLUMNS = 3;

  function spanOf(cell) {
    var value = parseInt(cell.getAttribute('data-espmi-span') || cell.colSpan || 1, 10);
    return value > 0 ? value : 1;
  }

  function initMenu(menu) {
    if (menu.getAttribute('data-espmi-columns-init') === '1') return;
    menu.setAttribute('data-espmi-columns-init', '1');

    var dropdown = menu.closest('.dropdown');
    var card = menu.closest('.card');
    if (!dropdown || !card) return;

    var table = card.querySelector('table tbody.list');
    table = table ? table.closest('table') : card.querySelector('table');
    if (!table) return;

    var headRows = Array.prototype.slice.call(table.querySelectorAll('thead tr'));
    if (!headRows.length) return;

    // Simpan colspan asli header agar bisa dihitung ulang saat kolom disembunyikan.
    headRows.forEach(function (tr) {
      Array.prototype.forEach.call(tr.children, function (cell) {
        if (!cell.hasAttribute('data-espmi-span')) {
          cell.setAttribute('data-espmi-span', cell.colSpan || 1);
        }
      });
    });

    // Susun model grid header: label + posisi kolom tiap sel (rowspan/colspan aware).
    var labels = [];
    var rowspanLeft = [];
    var defaultHidden = {};
    var explicitLocked = {};
    var total = 0;

    headRows.forEach(function (tr) {
      var col = 0;
      Array.prototype.forEach.call(tr.children, function (cell) {
        while (rowspanLeft[col] > 0) col += 1;
        var span = spanOf(cell);
        var rowspan = parseInt(cell.getAttribute('rowspan') || 1, 10);
        var text = (cell.textContent || '').replace(/\s+/g, ' ').trim();
        cell.setAttribute('data-espmi-col', col);
        var hideByDefault = cell.hasAttribute('data-espmi-hidden-default');
        var lockExplicit = cell.hasAttribute('data-espmi-locked');
        for (var k = 0; k < span; k += 1) {
          var index = col + k;
          if (hideByDefault) defaultHidden[index] = true;
          if (lockExplicit) explicitLocked[index] = true;
          if (text) {
            labels[index] = labels[index] ? labels[index] + ' ' + text : text;
          }
          rowspanLeft[index] = rowspan;
          if (index + 1 > total) total = index + 1;
        }
        col += span;
      });
      // Turunkan sisa rowspan setelah baris ini selesai.
      for (var c = 0; c < rowspanLeft.length; c += 1) {
        if (rowspanLeft[c] > 0) rowspanLeft[c] -= 1;
      }
    });

    if (total < LOCKED_COLUMNS) total = LOCKED_COLUMNS;

    // Kolom terkunci: pakai data-espmi-locked bila ada, jika tidak pakai aturan
    // "tiga kolom pertama" (No + Aksi + kolom ke-3) - lihat design-rules bagian 7.
    var hasExplicitLock = Object.keys(explicitLocked).length > 0;
    function isLocked(index) {
      return hasExplicitLock ? !!explicitLocked[index] : index < LOCKED_COLUMNS;
    }

    var hidden = [];
    var hasDefaultHidden = false;
    for (var h = 0; h < total; h += 1) {
      hidden.push(!!defaultHidden[h]);
      if (defaultHidden[h]) hasDefaultHidden = true;
    }

    function apply() {
      // Re-query tiap kali agar baris yang baru ditambah/dihapus ikut terbarui.
      Array.prototype.forEach.call(table.querySelectorAll('tbody tr'), function (tr) {
        Array.prototype.forEach.call(tr.children, function (cell, index) {
          if (index < total) cell.hidden = !!hidden[index];
        });
      });
      headRows.forEach(function (tr) {
        Array.prototype.forEach.call(tr.children, function (cell) {
          var start = parseInt(cell.getAttribute('data-espmi-col') || 0, 10);
          var span = spanOf(cell);
          var visible = 0;
          for (var k = 0; k < span; k += 1) {
            if (!hidden[start + k]) visible += 1;
          }
          if (visible === 0) {
            cell.hidden = true;
          } else {
            cell.hidden = false;
            cell.colSpan = visible;
          }
        });
      });
    }

    // Terapkan ulang setiap kali baris masuk/keluar DOM (pagination, tambah,
    // hapus) supaya kolom yang disembunyikan tetap konsisten di tiap halaman.
    var body = table.querySelector('tbody.list') || table.querySelector('tbody');
    if (body && typeof MutationObserver === 'function') {
      new MutationObserver(function () {
        apply();
      }).observe(body, { childList: true });
    }

    // Bangun item menu.
    menu.innerHTML = '';
    var head = document.createElement('li');
    head.innerHTML = '<h6 class="dropdown-header">Tampilkan kolom</h6>';
    menu.appendChild(head);

    for (var c = 0; c < total; c += 1) {
      (function (index) {
        var locked = isLocked(index);
        var li = document.createElement('li');
        var label = document.createElement('label');
        label.className = 'dropdown-item d-flex align-items-center gap-2' + (locked ? ' disabled text-secondary' : '');

        var input = document.createElement('input');
        input.type = 'checkbox';
        input.className = 'form-check-input m-0 flex-shrink-0';
        input.checked = locked ? true : !hidden[index];
        if (locked) {
          input.disabled = true;
          input.setAttribute('aria-disabled', 'true');
        } else {
          input.addEventListener('change', function () {
            hidden[index] = !input.checked;
            apply();
          });
        }

        var text = document.createElement('span');
        text.className = 'flex-grow-1';
        text.textContent = labels[index] || ('Kolom ' + (index + 1));

        label.appendChild(input);
        label.appendChild(text);
        li.appendChild(label);
        menu.appendChild(li);
      })(c);
    }

    // Terapkan kolom yang disembunyikan default (mis. "Info Jenjang").
    if (hasDefaultHidden) apply();
  }

  function boot() {
    Array.prototype.forEach.call(document.querySelectorAll('[data-columns-menu]'), initMenu);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
