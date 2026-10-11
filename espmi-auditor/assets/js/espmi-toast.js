/* ==========================================================================
   eSPMI - Toast notifikasi (front-end, Bootstrap Toast)
   --------------------------------------------------------------------------
   `window.espmiToast(message, options)` menampilkan toast di pojok kanan bawah.
   Opsi:
     - variant : 'success' (default) | 'danger' | 'warning' | 'info'
     - icon    : nama ikon Tabler tanpa prefix `ti-` (opsional)
     - delay   : durasi tampil dalam ms (default 3000)

   Container dibuat otomatis (sekali) di akhir document.body. Dipakai antara
   lain saat Simpan data (lihat design-rules.md bagian 16.6) dan saat Hapus.
   ========================================================================== */
(function () {
  'use strict';

  var DEFAULT_ICONS = {
    success: 'circle-check',
    danger: 'alert-triangle',
    warning: 'alert-triangle',
    info: 'info-circle',
  };

  function ensureContainer() {
    var container = document.getElementById('espmiToastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'espmiToastContainer';
      container.className = 'toast-container position-fixed bottom-0 end-0 p-3';
      document.body.appendChild(container);
    }
    return container;
  }

  function build(message, opts) {
    var variant = opts.variant || 'success';
    var icon = opts.icon || DEFAULT_ICONS[variant] || DEFAULT_ICONS.success;

    var el = document.createElement('div');
    el.className = 'toast align-items-center text-bg-' + variant + ' border-0';
    el.setAttribute('role', 'status');
    el.setAttribute('aria-live', 'polite');
    el.setAttribute('aria-atomic', 'true');
    el.innerHTML =
      '<div class="d-flex">' +
      '<div class="toast-body d-flex align-items-center gap-2">' +
      '<i class="ti ti-' + icon + ' fs-5 flex-shrink-0"></i>' +
      '<span class="espmi-toast-message"></span>' +
      '</div>' +
      '<button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Tutup"></button>' +
      '</div>';
    el.querySelector('.espmi-toast-message').textContent = message;
    return el;
  }

  function show(message, options) {
    if (!message) return null;
    var opts = options || {};
    var delay = typeof opts.delay === 'number' ? opts.delay : 3000;
    var container = ensureContainer();
    var el = build(message, opts);
    container.appendChild(el);

    if (window.bootstrap && window.bootstrap.Toast) {
      var instance = new window.bootstrap.Toast(el, { delay: delay });
      el.addEventListener('hidden.bs.toast', function () {
        el.remove();
      });
      instance.show();
    } else {
      el.classList.add('show');
      window.setTimeout(function () {
        el.remove();
      }, delay);
    }
    return el;
  }

  window.espmiToast = show;
})();
