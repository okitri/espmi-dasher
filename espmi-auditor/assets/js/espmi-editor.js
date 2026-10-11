/* ==========================================================================
   eSPMI - Editor rich text (Quill)
   --------------------------------------------------------------------------
   Meng-inisialisasi Quill (base template: dist/assets/libs/quill) pada setiap
   elemen ber-atribut `data-espmi-editor`. Instance disimpan di properti
   `element.espmiQuill` supaya halaman bisa membaca/mengosongkan isinya:

     var isi = el.espmiQuill ? el.espmiQuill.getText().trim() : el.textContent;

   Atribut opsional:
     data-espmi-editor-placeholder : teks placeholder editor

   Quill dimuat HANYA di halaman yang memakainya (lihat design-rules bagian 12).
   ========================================================================== */
(function () {
  'use strict';

  var TOOLBAR = [
    [{ header: [1, 2, 3, false] }],
    [{ font: [] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ size: ['small', false, 'large', 'huge'] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ color: [] }, { background: [] }, { align: [] }],
    ['link', 'image', 'code-block', 'video'],
    ['clean'],
  ];

  function boot() {
    if (!window.Quill) return;
    Array.prototype.forEach.call(document.querySelectorAll('[data-espmi-editor]'), function (el) {
      if (el.getAttribute('data-espmi-editor-init') === '1') return;
      el.setAttribute('data-espmi-editor-init', '1');
      try {
        el.espmiQuill = new window.Quill(el, {
          theme: 'snow',
          placeholder: el.getAttribute('data-espmi-editor-placeholder') || '',
          modules: { toolbar: TOOLBAR },
        });
      } catch (error) {
        // Biarkan halaman tetap berjalan walau editor gagal diinisialisasi.
        el.espmiQuill = null;
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
