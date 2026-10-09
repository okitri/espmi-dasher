/* ==========================================================================
   eSPMI - Kontrol visibilitas kolom datatable (dropdown "Kolom")
   --------------------------------------------------------------------------
   Untuk setiap menu `[data-columns-menu]`:
     1. Membaca header (<th>) tabel pada card yang sama, termasuk header
        bertingkat (rowspan / colspan).
     2. Mengisi menu dengan checkbox per kolom (checked = tampil).
     3. Menyembunyikan / menampilkan kolom saat checkbox diubah.

   Aturan: tiga kolom pertama (No + Aksi + kolom ke-3) SELALU tampil dan
   tidak bisa disembunyikan (lihat design-rules.md bagian 7 & 16.5).

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
    var dropdown = menu.closest('.dropdown');
    var card = menu.closest('.card');
    if (!dropdown || !card) return;

    var table = card.querySelector('table tbody.list');
    table = table ? table.closest('table') : card.querySelector('table');
    if (!table) return;

    var headRows = Array.prototype.slice.call(table.querySelectorAll('thead tr'));
    if (!headRows.length) return;
    var bodyRows = Array.prototype.slice.call(table.querySelectorAll('tbody tr'));

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
    var total = 0;

    headRows.forEach(function (tr) {
      var col = 0;
      Array.prototype.forEach.call(tr.children, function (cell) {
        while (rowspanLeft[col] > 0) col += 1;
        var span = spanOf(cell);
        var rowspan = parseInt(cell.getAttribute('rowspan') || 1, 10);
        var text = (cell.textContent || '').replace(/\s+/g, ' ').trim();
        cell.setAttribute('data-espmi-col', col);
        for (var k = 0; k < span; k += 1) {
          var index = col + k;
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

    var hidden = [];
    for (var h = 0; h < total; h += 1) hidden.push(false);

    function apply() {
      bodyRows.forEach(function (tr) {
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

    // Bangun item menu.
    menu.innerHTML = '';
    var head = document.createElement('li');
    head.innerHTML = '<h6 class="dropdown-header">Tampilkan kolom</h6>';
    menu.appendChild(head);

    for (var c = 0; c < total; c += 1) {
      (function (index) {
        var locked = index < LOCKED_COLUMNS;
        var li = document.createElement('li');
        var label = document.createElement('label');
        label.className = 'dropdown-item d-flex align-items-center gap-2' + (locked ? ' disabled text-secondary' : '');

        var input = document.createElement('input');
        input.type = 'checkbox';
        input.className = 'form-check-input m-0 flex-shrink-0';
        input.checked = true;
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
