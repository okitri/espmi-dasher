/* ==========================================================================
   eSPMI - Tooltip otomatis untuk teks yang terpotong (ellipsis)
   --------------------------------------------------------------------------
   Tujuan: setiap label/teks yang terpotong `text-overflow: ellipsis`
   (mis. label menu sidebar, judul kartu, sel tabel) diberi tooltip berisi
   teks lengkap saat di-hover.

   Cara kerja:
     - Memindai elemen kandidat, lalu hanya elemen yang benar-benar terpotong
       (`scrollWidth > clientWidth` dengan `text-overflow: ellipsis`) yang diberi
       atribut `title` (tooltip bawaan peramban). Elemen yang tidak terpotong
       dibersihkan kembali.
     - Teks tooltip bisa dioverride lewat `data-truncate-text="..."`.
     - Pemindaian ulang (debounced) dilakukan saat: resize, toggle sidebar
       (perubahan class pada <html>), offcanvas terbuka, dan perubahan isi DOM
       (mis. pagination List.js, tambah/hapus baris).

   Konvensi (design-rules.md bagian 7 -> "Tooltip Teks Terpotong"):
     - Tambahkan `data-truncate-tooltip` pada elemen apa pun agar ikut dipantau,
       walau tidak memakai class `.text-truncate`.
   ========================================================================== */
(function () {
  'use strict';

  var SELECTOR = [
    '[data-truncate-tooltip]',
    '.text-truncate',
    '.nav-link .text',
    '.dropdown-item',
    '.dropdown-header',
    '.breadcrumb-item',
    '.card-title',
    '.list-group-item',
    '.form-label',
    '.table td',
    '.table th',
  ].join(',');

  var MARK = 'data-espmi-trunc-title';

  function isTruncated(el) {
    var style = window.getComputedStyle(el);
    if (style.display === 'none' || style.visibility === 'hidden') return false;
    if (style.textOverflow !== 'ellipsis') return false;
    return el.scrollWidth > el.clientWidth + 1;
  }

  function refresh() {
    var els = document.querySelectorAll(SELECTOR);
    for (var i = 0; i < els.length; i += 1) {
      var el = els[i];
      var text = (el.getAttribute('data-truncate-text') || el.textContent || '')
        .replace(/\s+/g, ' ')
        .trim();
      if (!text) continue;

      if (isTruncated(el)) {
        if (el.getAttribute('title') !== text) el.setAttribute('title', text);
        el.setAttribute(MARK, '1');
      } else if (el.getAttribute(MARK) === '1') {
        el.removeAttribute('title');
        el.removeAttribute(MARK);
      }
    }
  }

  var pending = null;
  function schedule() {
    if (pending) window.clearTimeout(pending);
    pending = window.setTimeout(refresh, 150);
  }

  function boot() {
    refresh();

    window.addEventListener('resize', schedule, { passive: true });
    window.addEventListener('load', schedule);
    document.addEventListener('shown.bs.offcanvas', schedule);
    document.addEventListener('shown.bs.dropdown', schedule);

    // Toggle sidebar (class pada <html>) dan perubahan isi DOM.
    if (typeof MutationObserver === 'function') {
      new MutationObserver(schedule).observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class'],
      });
      new MutationObserver(schedule).observe(document.body, {
        childList: true,
        subtree: true,
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
