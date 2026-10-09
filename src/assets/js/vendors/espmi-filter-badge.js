/* eSPMI - Indikator filter aktif pada tombol Filter datatable.
   Menghitung berapa <select> di dalam baris filter (collapse) yang nilainya
   terpilih (bukan opsi default "-- SEMUA --"), lalu menampilkan angkanya pada
   .active-filter-badge di dalam tombol .datatable-filter-toggle.
   Badge disembunyikan (hidden) saat 0 filter aktif.
   Dipakai pada semua halaman yang punya tombol Filter (lihat design-rules.md
   bagian 7 -> "Indikator Filter Aktif"). */
(function () {
  'use strict';

  function initFilterBadges() {
    var toggles = document.querySelectorAll('.datatable-filter-toggle');
    toggles.forEach(function (toggle) {
      var badge = toggle.querySelector('.active-filter-badge');
      var targetId = toggle.getAttribute('data-bs-target');
      if (!badge || !targetId || targetId.charAt(0) !== '#') return;
      var panel = document.querySelector(targetId);
      if (!panel) return;
      var selects = panel.querySelectorAll('select');
      if (!selects.length) return;

      function refresh() {
        var active = 0;
        selects.forEach(function (sel) {
          // select dianggap aktif bila bukan opsi pertamanya (default "-- SEMUA --")
          if (sel.selectedIndex > 0) active += 1;
        });
        badge.textContent = String(active);
        if (active > 0) {
          badge.removeAttribute('hidden');
        } else {
          badge.setAttribute('hidden', '');
        }
      }

      selects.forEach(function (sel) {
        sel.addEventListener('change', refresh);
      });
      // sinkronkan saat muat halaman (filter mungkin sudah terpilih di HTML,
      // mis. contoh pada pelaksanaan-lihat-data-pendidikan-data-do.html)
      refresh();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFilterBadges);
  } else {
    initFilterBadges();
  }
})();
