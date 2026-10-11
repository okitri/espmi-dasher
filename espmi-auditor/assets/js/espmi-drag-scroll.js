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
