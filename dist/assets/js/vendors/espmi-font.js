/* ==========================================================================
   eSPMI - Preferensi Font Sistem
   --------------------------------------------------------------------------
   Membaca pilihan font dari localStorage lalu menerapkannya ke SELURUH halaman
   dengan men-set atribut `data-espmi-font` pada elemen <html>. Pemetaan nilai
   atribut -> `--ds-font-sans-serif` diatur di `espmi-admin/assets/css/espmi-app.css`
   (bagian 11).

   Skrip ini dimuat di <head> (sebelum CSS) agar font pilihan langsung terpasang
   dan tidak terjadi "flash" font bawaan saat halaman dibuka.

   Pilihan font yang tersedia (lihat halaman akun-preferensi.html):
     - inter        -> Inter (default)
     - roboto       -> Roboto
     - google-sans  -> Google Sans
     - open-sans    -> Open Sans
   ========================================================================== */
(function () {
  'use strict';

  var STORAGE_KEY = 'espmiFont';
  var DEFAULT_FONT = 'inter';
  var FONTS = {
    inter: 'Inter',
    roboto: 'Roboto',
    'google-sans': 'Google Sans',
    'open-sans': 'Open Sans',
  };

  // Pastikan kunci yang dipakai selalu salah satu font yang dikenal.
  function normalize(key) {
    return Object.prototype.hasOwnProperty.call(FONTS, key) ? key : DEFAULT_FONT;
  }

  function getFont() {
    try {
      return normalize(localStorage.getItem(STORAGE_KEY) || DEFAULT_FONT);
    } catch (e) {
      return DEFAULT_FONT;
    }
  }

  function applyFont(key) {
    document.documentElement.setAttribute('data-espmi-font', normalize(key));
  }

  function setFont(key) {
    var value = normalize(key);
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch (e) {
      /* localStorage bisa saja tidak tersedia; font tetap diterapkan sesi ini */
    }
    applyFont(value);
    return value;
  }

  // Terapkan segera saat skrip dieksekusi (sebelum body dirender).
  applyFont(getFont());

  // API publik untuk dipakai halaman Preferensi.
  window.espmiFont = {
    key: STORAGE_KEY,
    defaultFont: DEFAULT_FONT,
    fonts: FONTS,
    get: getFont,
    set: setFont,
    apply: applyFont,
  };
})();
