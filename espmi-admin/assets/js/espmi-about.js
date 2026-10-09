/* ==========================================================================
   eSPMI - Modal "Tentang Aplikasi" (menu dropdown Profil -> Tentang)
   --------------------------------------------------------------------------
   Menyisipkan modal #espmiAboutModal ke <body> sekali per halaman, lalu
   membukanya dari item "Tentang" pada dropdown profil (data-bs-target).

   Isi modal: logo eSPMI (sama dengan sidebar), ringkasan aplikasi, informasi
   versi, hak cipta, serta tautan Kebijakan Privasi & Ketentuan Layanan.

   Lihat design-rules.md bagian 16.9 (Tentang Aplikasi).
   ========================================================================== */
(function () {
  'use strict';

  var MODAL_ID = 'espmiAboutModal';
  var LOGO_SRC = '../dist/assets/images/brand/logo/logo-icon.svg';
  var APP_VERSION = '3.1.7.0';
  var COPYRIGHT = '\u00a9 2021 PT. Solusi Kampus Indonesia';

  function build() {
    if (document.getElementById(MODAL_ID)) return;

    var wrapper = document.createElement('div');
    wrapper.innerHTML =
      '<div class="modal fade" id="' + MODAL_ID + '" tabindex="-1" aria-labelledby="' + MODAL_ID + 'Label" aria-hidden="true">' +
        '<div class="modal-dialog modal-dialog-centered">' +
          '<div class="modal-content">' +
            '<div class="modal-header">' +
              '<h5 class="modal-title" id="' + MODAL_ID + 'Label">Tentang Aplikasi</h5>' +
              '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Tutup"></button>' +
            '</div>' +
            '<div class="modal-body text-center">' +
              '<img src="' + LOGO_SRC + '" alt="eSPMI" width="48" height="48" class="mb-3" />' +
              '<div class="fw-bold fs-3 site-logo-text lh-1">eSPMI</div>' +
              '<div class="small text-secondary mt-1">Sistem Informasi Penjaminan Mutu Internal</div>' +
              '<p class="mt-4 mb-4 text-secondary">' +
                'eSPMI membantu perguruan tinggi mengelola penjaminan mutu internal secara terpadu \u2014 ' +
                'mulai dari penetapan standar, pelaksanaan, evaluasi (AMI), hingga pengendalian dan peningkatan mutu.' +
              '</p>' +
              '<ul class="list-unstyled text-start small mb-0 mt-4 pt-3 border-top">' +
                '<li class="d-flex justify-content-between gap-3 py-1">' +
                  '<span class="text-secondary">Versi Aplikasi</span>' +
                  '<span class="fw-semibold">' + APP_VERSION + '</span>' +
                '</li>' +
                '<li class="d-flex justify-content-between gap-3 py-1">' +
                  '<span class="text-secondary">Hak Cipta</span>' +
                  '<span class="fw-semibold">' + COPYRIGHT + '</span>' +
                '</li>' +
              '</ul>' +
            '</div>' +
            '<div class="modal-footer d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center gap-2">' +
              '<div class="d-flex gap-3 small">' +
                '<a href="#!" class="link-primary">Kebijakan Privasi</a>' +
                '<a href="#!" class="link-primary">Ketentuan Layanan</a>' +
              '</div>' +
              '<button type="button" class="btn btn-white" data-bs-dismiss="modal">Tutup</button>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>';

    document.body.appendChild(wrapper.firstChild);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', build);
  } else {
    build();
  }
})();
