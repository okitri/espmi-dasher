# eSPMI — Design Rules & Standar Halaman

Dokumen ini adalah **sumber kebenaran (single source of truth)** untuk struktur,
layout, dan gaya penulisan halaman pada aplikasi **eSPMI Admin**
(folder `espmi-admin/`).

Halaman acuan utama (**baseline**) adalah:

> **`espmi-admin/manajemen-referensi-tahun-periode.html`**

Semua halaman baru **wajib** mengikuti struktur, urutan aset, penamaan class, dan
pola komponen seperti pada halaman acuan tersebut. Jika ada keraguan, ikuti
halaman acuan — bukan halaman lama dari aplikasi versi sebelumnya.

Tema dasar yang dipakai adalah **Dasher (Bootstrap 5)**. Override khusus eSPMI
disimpan di `espmi-admin/assets/css/espmi-app.css` dan **selalu dimuat paling
akhir** setelah `theme.min.css`.

---

## 1. Struktur Folder & Penamaan File

```
espmi-admin/
├── dashboard.html                            # Beranda
├── index.html                                # Halaman login
├── manajemen-referensi-tahun-periode.html     # HALAMAN ACUAN (baseline)
├── penetapan-daftar-standar-mutu.html
├── lembaga-akreditasi.html
├── assets/
│   └── css/
│       └── espmi-app.css                      # override tema eSPMI
└── ../dist/assets/...                         # libs + theme (hasil build Dasher)
```

- Semua halaman diletakkan **flat** di dalam `espmi-admin/` (tanpa sub-folder)
  agar semua path relatif ke `../dist/assets/...` dan `assets/css/...` seragam.
- Nama file memakai **kebab-case** dan berbahasa Indonesia
  (contoh: `manajemen-referensi-tahun-periode.html`).
- Nama halaman pada `<title>`, `<h1>`, breadcrumb, dan item sidebar harus sama.

---

## 2. Kerangka Halaman (Page Shell)

Setiap halaman **wajib** memakai kerangka berikut, berurutan:

```
<body>
  <div>                                     <!-- wrapper -->
    <div id="miniSidebar"> ... </div>                 <!-- sidebar desktop -->
    <div class="offcanvasNav offcanvas offcanvas-start" id="offcanvasExample">
      ...                                             <!-- sidebar mobile (mirror) -->
    </div>
    <div id="content" class="position-relative h-100">
      <div class="navbar-glass navbar navbar-expand-lg px-0 px-lg-4"> ... </div>
      <div class="custom-container">
        <!-- konten halaman -->
      </div>
    </div>
  </div>
</body>
```

Aturan:

1. Sidebar desktop (`#miniSidebar`) **dan** offcanvas adalah **duplikat** —
   offcanvas dipakai untuk mobile. Setiap perubahan menu **harus** dikerjakan di
   **kedua** tempat.
2. `#content` selalu memakai `class="position-relative h-100"`.
3. Konten dibungkus `.custom-container` (max-width 1536px + margin auto dari theme).
4. Scrollbar panjang dikelola `simplebar` (sudah termasuk di theme).

---

## 3. Bagian `<head>`

Urutan tag pada `<head>` **tidak boleh diubah**:

```html
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
<meta content="Codescandy" name="author" />
<title>{Nama Halaman} | eSPMI</title>
<!-- favicon: blok standar (apple-icon / favicon-*.png) -->
<script src="../dist/assets/js/vendors/color-modes.js"></script>
<script>
  if (localStorage.getItem('sidebarExpanded') === 'false') {
    document.documentElement.classList.add('collapsed');
    document.documentElement.classList.remove('expanded');
  } else {
    document.documentElement.classList.remove('collapsed');
    document.documentElement.classList.add('expanded');
  }
</script>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" />
<link rel="stylesheet" href="../dist/assets/libs/simplebar/dist/simplebar.min.css" />
<link rel="stylesheet" href="../dist/assets/libs/@tabler/icons-webfont/tabler-icons.min.css" />
<link rel="stylesheet" href="../dist/assets/css/theme.min.css" />
<link rel="stylesheet" href="assets/css/espmi-app.css" />
```

- `<title>`: `{Nama Halaman} | eSPMI`.
- Skrip penentu posisi sidebar pada `documentElement` **wajib** ada (mencegah
  halaman "berkedip" saat sidebar di-collapse).
- `theme.min.css` **selalu** dimuat sebelum `espmi-app.css`.

---

## 4. Sidebar (`#miniSidebar`)

Struktur: `#miniSidebar` → `.brand-logo` → `ul.navbar-nav.flex-column` → item menu.

```html
<div id="miniSidebar">
  <div class="brand-logo">
    <span class="d-none d-md-flex align-items-center gap-2">
      <img src="../dist/assets/images/brand/logo/logo-icon.svg" alt="" />
      <span class="fw-bold fs-4 site-logo-text">eSPMI</span>
    </span>
  </div>
  <ul class="navbar-nav flex-column">
    <!-- item biasa -->
    <li class="nav-item">
      <a class="nav-link" href="./dashboard.html">
        <span class="nav-icon"><svg ...width="20" height="20"...></svg></span>
        <span class="text">Beranda</span>
      </a>
    </li>
    <!-- item dengan submenu -->
    <li class="nav-item dropdown">
      <a class="nav-link dropdown-toggle" href="#!" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        <span class="nav-icon"><svg ...width="20" height="20"...></svg></span>
        <span class="text">Manajemen Referensi</span>
      </a>
      <ul class="dropdown-menu flex-column">
        <li class="nav-item">
          <a class="nav-link" href="./halaman.html">
            <span class="nav-icon"><svg ...width="18" height="18"...></svg></span>
            <span class="text">Label Submenu</span>
          </a>
        </li>
      </ul>
    </li>
  </ul>
</div>
```

Aturan:

1. **Icon** memakai SVG inline Tabler *outline* — `width/height="20"` untuk menu
   level 1, `18` untuk menu level 2. Kelas: `icon icon-tabler
   icons-tabler-outline icon-tabler-{nama}`. Jangan memakai `<i class="ti ...">`
   untuk icon menu sidebar.
2. **Teks menu** selalu dibungkus `<span class="text">`. Judul menu berbahasa
   Indonesia dengan huruf kapital di awal kata.
3. **State aktif** (halaman yang sedang dibuka):
   - Menu induk: tambahkan `active` pada `dropdown-toggle`, set
     `aria-expanded="true"`, dan tambahkan `show` pada `ul.dropdown-menu`.
   - Submenu aktif: tambahkan `active` pada `nav-link` anak.
4. Urutan menu mengikuti informasi arsitektur aplikasi (Beranda → Manajemen
   Referensi → Manajemen Dokumen → Penetapan → Pelaksanaan → …).
5. Perubahan sidebar **wajib diterapkan pada versi desktop dan offcanvas**.

---

## 5. Navbar (`navbar-glass`)

Navbar berada di dalam `#content` (di atas `custom-container`), bukan `fixed`.

```html
<div class="navbar-glass navbar navbar-expand-lg px-0 px-lg-4">
  <div class="container-fluid px-lg-0">
    <div class="d-flex align-items-center gap-4">
      <!-- toggle sidebar (mobile: offcanvas, desktop: collapse) -->
      <!-- institution: logo + institusi -->
    </div>
    <ul class="list-unstyled d-flex align-items-center mb-0 gap-2">
      <!-- Periode Aktif -->
      <!-- Toggle light/dark mode -->
      <!-- Notifikasi (bell) -->
      <!-- User dropdown -->
    </ul>
  </div>
</div>
```

- Info institusi: teks kecil "Sistem Informasi Penjaminan Mutu Internal" dan
  baris tebal "UNIVERSITAS SOLUSI KAMPUS INDONESIA", plus logo kampus.
- Menu kanan urut: **Periode Aktif** → toggle tema (`color-modes.js`) →
  notifikasi → user (`Administrator Pusat`).
- Toggle tema memakai ikon Tabler `<i class="ti ti-...">` dengan
  `data-bs-theme-value="light|dark|auto"`.

---

## 6. Container Konten & Page Header

Semua konten halaman berada di dalam `<div class="custom-container">`.
Page header **wajib** memakai pola berikut (judul + breadcrumb di kiri, aksi di kanan):

```html
<div class="row">
  <div class="col-lg-12 col-md-12 col-12">
    <div class="mb-6 d-md-flex justify-content-between align-items-center">
      <div>
        <h1 class="mb-3 h2">Nama Halaman</h1>
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="./dashboard.html">Beranda</a></li>
            <li class="breadcrumb-item"><a href="#!">Menu Induk</a></li>
            <li class="breadcrumb-item active" aria-current="page">Nama Halaman</li>
          </ol>
        </nav>
      </div>
      <div class="d-flex align-items-center gap-2">
        <!-- aksi halaman (opsional): tombol filter, tombol tambah, dll -->
      </div>
    </div>
  </div>
</div>
```

- Judul halaman memakai `<h1 class="mb-3 h2">` (semantik `h1`, ukuran visual `h2`).
- Breadcrumb selalu diawali `Beranda`. Item terakhir memakai `active` +
  `aria-current="page"`.
- Tombol aksi utama (mis. **Tambah**) memakai `btn-dark` dengan ikon
  `icon-tabler-plus` dan `d-md-flex align-items-center gap-2`.
- Tombol sekunder/ikon (mis. **filter**) memakai `btn btn-icon btn-white` +
  ikon `<i class="ti ti-filter fs-5"></i>`.

---

## 7. Pola Halaman Daftar Data (List)

Halaman daftar data (contoh: **Tahun Periode**, **Lembaga Akreditasi**) memakai
satu `card card-lg` dengan urutan: **toolbar → tabel → footer pagination**.

```html
<div class="card card-lg" id="{idList}" data-list="kolom_1,kolom_2">
  <div class="card-body pb-0">
    <div class="d-flex flex-column flex-md-row justify-content-md-between align-items-md-center gap-3">
      <div>
        <input type="search" placeholder="Cari.." class="form-control listjs-search" aria-label="Cari ..." />
      </div>
      <div class="d-flex flex-column flex-sm-row align-items-sm-center gap-3">
        <div class="d-flex align-items-center gap-2">
          <label class="form-label text-nowrap mb-0" for="{idPerPage}">Per page:</label>
          <select class="form-select listjs-items-per-page" id="{idPerPage}" style="width: 5.5rem">
            <option value="10" selected>10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
      </div>
    </div>
  </div>
  <div class="table-responsive mt-6">
    <table class="table text-nowrap table-hover mb-0"> ... </table>
  </div>
  <div class="card-footer border-top d-flex flex-column flex-md-row justify-content-md-between align-items-md-center gap-3">
    <p class="mb-0 listjs-showing-items-label">Showing 1 to 10 of N entries</p>
    <div class="pagination-buttons d-flex align-items-center">
      <button class="btn btn-white prev" type="button" disabled>Previous</button>
      <ul class="pagination mb-0 ms-1">
        <li class="page-item active"><a class="page-link page" href="#" data-page="1">1</a></li>
      </ul>
      <button class="btn btn-white next" type="button">Next</button>
    </div>
  </div>
</div>
```

### Kontrak List.js

Pencarian, sorting, dan pagination memakai **List.js**
(`../dist/assets/libs/list.js/dist/list.min.js`). Kontrak yang **wajib** dipenuhi:

| Elemen | Kelas / atribut | Keterangan |
| --- | --- | --- |
| Card | `id` + `data-list="kolom1,kolom2"` | `valueNames` diambil dari `data-list` |
| Input cari | `form-control listjs-search` | `searchClass` List.js |
| Select per halaman | `form-select listjs-items-per-page` | jumlah baris per halaman |
| Header kolom urut | `class="listjs-sorter" data-sort="{kolom}"` | klik untuk sorting |
| Sel data | `class="{kolom}"` | nama kelas **sama** dengan `data-list` |
| Label jumlah | `listjs-showing-items-label` | "Showing X to Y of Z entries" |
| Prev/Next | `btn btn-white prev` / `btn btn-white next` | tombol halaman |
| Nomor halaman | `.pagination` + `.page-link.page[data-page]` | dirender ulang oleh JS |

- Nilai `data-sort` **harus** sama dengan nama kolom pada `data-list` dan nama
  kelas `<td>`.
- Skrip inisialisasi List.js **disalin** dari halaman acuan, lalu hanya ganti:
  `id` card pada `getElementById`, fallback `data-list`, dan komentar judul.
- Jumlah baris `<tr>` di HTML **menentukan** total entri pada label pagination.
- Sel kosong (tanpa nilai) tetap ditulis `<td class="{kolom}"></td>`.

---

## 8. Tabel

```html
<table class="table text-nowrap table-hover mb-0">
  <thead>
    <tr>
      <th scope="col" style="width: 4.5rem">No</th>
      <th scope="col" class="listjs-sorter" data-sort="{kolom}">Nama Kolom</th>
    </tr>
  </thead>
  <tbody class="list"> ... </tbody>
</table>
```

- Selalu `text-nowrap table-hover mb-0`.
- Kolom **No** selalu kolom pertama dengan `style="width: 4.5rem"` dan isi
  `<td class="no">{nomor}</td>`.
- Kolom yang bisa diurutkan diberi `class="listjs-sorter"` + `data-sort`.
- **Jangan** memakai `table-bordered` (theme eSPMI memakai garis baris solid).
- Tabel dibungkus `<div class="table-responsive mt-6">`.

---

## 9. Tombol, Ikon, & Badge

- **Aksi utama** (Tambah / Simpan / Submit): `btn btn-dark` + ikon
  (`d-md-flex align-items-center gap-2`).
- **Aksi sekunder / ikon**: `btn btn-icon btn-white` atau `btn btn-white`.
- **Prev/Next pagination**: `btn btn-white`.
- **Ikon tombol / konten**: Tabler webfont `<i class="ti ti-{nama}"></i>`
  (contoh `<i class="ti ti-filter fs-5"></i>`).
- **Ikon menu sidebar**: SVG inline (lihat bagian 4).
- **Badge**: pakai palet theme (`badge` + `bg-{primary|secondary|success|danger|warning|info}`).
  Warna khusus yang tidak ada di palet (mis. ungu) memakai kelas proyek
  `badge-violet` dari `espmi-app.css`.

---

## 10. Form

- Kontrol: `form-control`, `form-select`, `form-label`, `form-check`.
- Label inline dengan kontrol memakai `class="form-label text-nowrap mb-0"`.
- Select kecil (mis. per page) diberi `style="width: 5.5rem"`.
- Selector "Per page" & pencarian **selalu** berada di dalam toolbar card list.
- Gunakan `aria-label` yang deskriptif pada input pencarian & select.

---

## 11. Footer

Footer **wajib** ada di akhir `.custom-container`, setelah seluruh kartu konten:

```html
<!-- footer -->
<div class="row">
  <div class="col-12">
    <div class="d-flex flex-wrap justify-content-between align-items-center gap-2 py-4 small text-secondary">
      <div>&copy; 2021 PT. Solusi Kampus Indonesia</div>
      <div>version 3.1.7.0</div>
    </div>
  </div>
</div>
```

- Teks versi aplikasi harus **sama** di semua halaman.

---

## 12. Scripts (akhir `<body>`)

Urutan pemuatan script:

```html
<!-- Libs JS -->
<script src="../dist/assets/libs/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
<script src="../dist/assets/libs/simplebar/dist/simplebar.min.js"></script>
<!-- Theme JS -->
<script src="../dist/assets/js/theme.min.js"></script>
<script src="../dist/assets/js/vendors/sidebarnav.js"></script>
<!-- hanya pada halaman daftar data -->
<script src="../dist/assets/libs/list.js/dist/list.min.js"></script>
<!-- Skrip khusus halaman -->
<script>
  // eSPMI - {deskripsi halaman}
  (function () {
    ...
  })();
</script>
```

- Skrip halaman ditulis **inline** di akhir `<body>`, dibungkus IIFE
  `(function () { ... })();` agar tidak mengotori scope global.
- Setiap skrip list **wajib** memakai guard:
  `if (!listElement || typeof List === 'undefined') return;`.
- Komentar berbahasa Indonesia dan diawali `// eSPMI - ...`.
- Muat `list.min.js` **hanya** pada halaman yang memakai tabel List.js.

---

## 13. Override Tema (`espmi-app.css`)

- **Jangan** mengubah `dist/assets/css/theme.min.css`. Semua override eSPMI
  ditulis di `espmi-admin/assets/css/espmi-app.css`.
- File override **selalu** dimuat paling akhir (lihat bagian 3).
- Bila override menyasar tampilan **light mode**, tambahkan juga aturan untuk
  `[data-bs-theme='dark']` agar dark mode tidak rusak.
- Kelas kustom yang sudah tersedia di proyek:
  - `.tree-toggle`, `.tree-lvl-2/3/4` — tree view (halaman Daftar Standar Mutu).
  - `.badge-violet` — badge warna khusus di luar palet theme.
  - `.navbar-glass`, `#content`, `#miniSidebar` — override tampilan eSPMI.

---

## 14. Konvensi Penamaan

| Hal | Aturan | Contoh |
| --- | --- | --- |
| Nama file | kebab-case, bahasa Indonesia | `lembaga-akreditasi.html` |
| `<title>` | `{Nama Halaman} | eSPMI` | `Lembaga Akreditasi \| eSPMI` |
| `id` elemen | camelCase diawali entitas | `lembagaAkreditasiList`, `lembagaAkreditasiPerPage` |
| `data-list` & kelas `<td>` | snake_case nama kolom | `nama_lembaga`, `keterangan` |
| Komentar section HTML | `<!-- Nama Section -->` | `<!-- Daftar Lembaga Akreditasi -->` |
| Komentar JS | `// eSPMI - ...` | `// eSPMI - daftar Lembaga Akreditasi ...` |

---

## 15. Checklist Halaman Baru

1. **Salin** `manajemen-referensi-tahun-periode.html` sebagai titik awal.
2. Ganti `<title>`, `<h1>`, dan breadcrumb sesuai halaman baru.
3. Sesuaikan state aktif sidebar pada **desktop + offcanvas** (menu induk
   `active`/`show`, submenu `active`, dan `href` yang benar).
4. Sesuaikan **Periode Aktif** di navbar bila perlu.
5. Siapkan card list: `id`, `data-list`, kelas `<td>`, dan header kolom urut.
6. Sesuaikan skrip List.js (`getElementById`, fallback `data-list`, komentar).
7. Pastikan **footer** ada dengan teks versi yang konsisten.
8. Periksa semua path aset (`../dist/assets/...`, `assets/css/...`).
9. Uji: pencarian, sorting, ubah "Per page", dan navigasi Prev/Next.
10. Uji **light & dark mode** serta tampilan **desktop & mobile**.

---

## 16. Do & Don't

**Do**

- Ikuti halaman acuan: struktur, urutan aset, class, dan penamaan.
- Terapkan perubahan sidebar di desktop **dan** offcanvas.
- Tulis semua override styling di `espmi-app.css`.
- Jaga konsistensi label (judul = breadcrumb = menu sidebar).

**Don't**

- Jangan mengubah `dist/assets/**` (hasil build) atau `theme.min.css` secara langsung.
- Jangan memakai class/komponen dari template lama yang tidak ada di halaman acuan.
- Jangan menulis CSS/JS halaman di dalam file theme.
- Jangan membiarkan link menu `href="#!"` bila halamannya sudah ada
  (arahkan ke file halaman yang benar).
- Jangan memakai ikon campur aduk: SVG inline untuk sidebar, Tabler webfont
  `<i class="ti ...">` untuk isi konten.
