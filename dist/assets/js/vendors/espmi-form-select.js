/* eSPMI - Bedakan tampilan VALUE vs PLACEHOLDER pada <select>.
   Theme Dasher memakai warna teks yang SAMA untuk nilai terpilih dan
   placeholder (gray-500), sehingga keduanya sulit dibedakan. Script ini
   menambahkan class `.is-placeholder` pada <select> yang masih menampilkan
   opsi default (placeholder), agar warnanya bisa diredupkan lewat CSS
   (espmi-app.css bagian 12). Opsi default dikenali dari teksnya yang diawali
   "-- " atau bernilai kosong ("").
   Dipakai pada semua halaman yang punya <select> (lihat design-rules.md
   bagian 10 -> Form). */
(function () {
  'use strict';

  var PLACEHOLDER_RE = /^\s*--/;

  function isPlaceholderOption(option) {
    if (!option) return false;
    var val = option.getAttribute('value');
    if (val === '') return true;
    return PLACEHOLDER_RE.test((option.textContent || '').trim());
  }

  function refresh(select) {
    var opt = select.options[select.selectedIndex];
    if (isPlaceholderOption(opt)) {
      select.classList.add('is-placeholder');
    } else {
      select.classList.remove('is-placeholder');
    }
  }

  function init() {
    var selects = document.querySelectorAll('select.form-select');
    selects.forEach(function (select) {
      refresh(select);
      select.addEventListener('change', function () {
        refresh(select);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
