/* ==========================================================================
   eSPMI - Tour halaman (driver.js)
   --------------------------------------------------------------------------
   Mesin tour generik berbasis penanda (declarative):
     - Tombol pemicu: elemen dengan atribut `data-tour-start`.
     - Langkah: elemen dengan atribut `data-tour-step` (urut sesuai DOM).
         data-tour-title  : judul popover langkah
         data-tour-text   : deskripsi popover langkah
         data-tour-side   : 'top' | 'bottom' | 'left' | 'right' (opsional)
         data-tour-align  : 'start' | 'center' | 'end' (opsional)
     - Langkah pembuka (opsional, popover di tengah tanpa elemen):
         data-tour-intro-title + data-tour-intro-text pada tombol pemicu.

   Contoh penerapan: dashboard.html (lihat design-rules.md bagian 16.7).
   Driver.js vendored di `assets/js/vendor/driver.js` + `assets/css/vendor/driver.css`.
   ========================================================================== */
(function () {
  'use strict';

  function getFactory() {
    return window.driver && window.driver.js && window.driver.js.driver;
  }

  function attr(el, name) {
    return el.getAttribute(name) || '';
  }

  function buildSteps() {
    var steps = [];
    var trigger = document.querySelector('[data-tour-start]');

    if (trigger) {
      var introTitle = attr(trigger, 'data-tour-intro-title');
      var introText = attr(trigger, 'data-tour-intro-text');
      if (introTitle || introText) {
        steps.push({
          popover: { title: introTitle, description: introText },
        });
      }
    }

    Array.prototype.forEach.call(document.querySelectorAll('[data-tour-step]'), function (el) {
      if (!el.offsetWidth && !el.offsetHeight) return;
      steps.push({
        element: el,
        popover: {
          title: attr(el, 'data-tour-title'),
          description: attr(el, 'data-tour-text'),
          side: el.getAttribute('data-tour-side') || undefined,
          align: attr(el, 'data-tour-align') || 'start',
        },
      });
    });

    return steps;
  }

  function start() {
    var factory = getFactory();
    if (typeof factory !== 'function') return;
    var steps = buildSteps();
    if (!steps.length) return;

    var tour = factory({
      showProgress: true,
      progressText: 'Langkah {{current}} dari {{total}}',
      nextBtnText: 'Berikutnya',
      prevBtnText: 'Sebelumnya',
      doneBtnText: 'Selesai',
      allowClose: true,
      overlayOpacity: 0.6,
      stagePadding: 6,
      stageRadius: 8,
      steps: steps,
    });
    tour.drive();
  }

  document.addEventListener('click', function (event) {
    var trigger = event.target.closest('[data-tour-start]');
    if (!trigger) return;
    event.preventDefault();
    start();
  });
})();
