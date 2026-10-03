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
├── penetapan-standar-mutu.html
├── penetapan-daftar-standar-mutu.html
├── pelaksanaan-pengaturan-periode.html
├── manajemen-referensi-lembaga-akreditasi.html
├── manajemen-referensi-auditee-pusat.html
├── manajemen-referensi-auditee.html
├── manajemen-referensi-unit-penunjang.html
├── manajemen-referensi-master-standar-mutu.html
├── manajemen-dokumen-kategori-dokumen.html
├── manajemen-dokumen-jenis-dokumen.html
├── manajemen-referensi-manajemen-dokumen.html
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
6. **Submenu Pelaksanaan** (dropdown, ikon `icon-tabler-clipboard-list`):

   | Urutan | Label | Ikon (level 2) | Halaman |
   | --- | --- | --- | --- |
   | 1 | Pengaturan Periode | `icon-tabler-calendar-cog` | `pelaksanaan-pengaturan-periode.html` |
   | 2 | Target Nilai Mutu | `icon-tabler-target` | `#!` (belum ada halaman) |
   | 3 | Evaluasi Diri | `icon-tabler-refresh` | `#!` (belum ada halaman) |
   | 4-6 | Lihat Data Pendidikan / Penelitian / Pengabdian | `icon-tabler-corner-down-right` | `#!` (belum ada halaman) |

   - Item 2–6 adalah **placeholder** menu (sesuai arsitektur aplikasi). Ganti
     `href="#!"` menjadi path halaman begitu halamannya dibuat.
   - Hanya mendukung **dua level** (menu induk + submenu) seperti pola di atas;
     grup bertingkat (nested) belum dipakai di theme ini.

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

- Judul halaman memakai `<h1 class="mb-3 h2">` (semantik `h1`, ukuran visual `h2`)
  dan **diawali ikon** yang sama dengan ikon menu sidebar halaman tersebut
  (lihat bagian 16.1). Contoh:
  `<h1 class="mb-3 h2"><i class="ti ti-calendar-event"></i> Tahun Periode</h1>`.
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
      <!-- KIRI : pencarian (+ tombol Filter bila ada filter) -->
      <div class="d-flex flex-column flex-sm-row flex-wrap align-items-sm-center gap-3">
        <input type="search" placeholder="Cari.." class="form-control listjs-search" aria-label="Cari ..." />
        <!-- tombol pembuka baris filter - HANYA bila halaman punya filter -->
        <button
          class="btn btn-white datatable-filter-toggle d-inline-flex align-items-center gap-2"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#{idFilters}"
          aria-expanded="false"
          aria-controls="{idFilters}"
        >
          <i class="ti ti-filter fs-5"></i>
          Filter
        </button>
      </div>
      <!-- KANAN : jumlah data per halaman -->
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
    <!-- Baris filter: tampil setelah tombol Filter diklik (masih di dalam .card-body) -->
    <div class="collapse" id="{idFilters}">
      <div class="d-flex flex-wrap align-items-center gap-3 pt-4">
        <div class="d-flex align-items-center gap-2">
          <label class="form-label text-nowrap mb-0" for="{idFilter}">Nama Filter</label>
          <select class="form-select" id="{idFilter}" aria-label="{nama filter}" style="width: 10rem">
            <option selected>-- SEMUA --</option>
          </select>
        </div>
        <!-- filter lain ... -->
      </div>
    </div>
  </div>
  <div class="table-responsive mt-6">
    <table class="table text-nowrap table-hover mb-0 table-sticky"> ... </table>
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

#### Tata Letak Toolbar (wajib)

Baris toolbar selalu memakai pola `d-flex flex-column flex-md-row
justify-content-md-between align-items-md-center gap-3` dengan pembagian:

| Posisi | Isi |
| --- | --- |
| **Kiri** | Input pencarian (`form-control listjs-search`, **lebar tetap 200px**) + tombol **Filter** (hanya bila halaman punya filter) |
| **Kanan** | Selector `Per page:` (`form-select listjs-items-per-page`) |

- **Lebar input pencarian = 200px** dan diatur CSS, bukan HTML. **Jangan** menulis
  `style="max-width: 22rem"` (atau inline style lebar lain) di input pencarian —
  kelas `.listjs-search` sudah menetapkan `width: 200px`
  (lihat bagian 13 → *Kelas CSS kustom*).
- **Filter tidak lagi ditampilkan langsung** di baris toolbar. Bila datatable
  punya filter, filter dipindah ke **baris filter sendiri** di bawah toolbar
  (masih di dalam `.card-body`) dan **disembunyikan default** memakai Bootstrap
  **collapse**:
  - Pembungkus: `<div class="collapse" id="{idFilters}">`.
  - Pemicu: tombol `btn btn-white datatable-filter-toggle d-inline-flex align-items-center gap-2`
    berisi `<i class="ti ti-filter fs-5"></i>` + teks `Filter`, dengan
    `type="button"`, `data-bs-toggle="collapse"`,
    `data-bs-target="#{idFilters}"`, `aria-expanded="false"`, dan
    `aria-controls="{idFilters}"`.
  - Saat terbuka, kelas `.datatable-filter-toggle[aria-expanded='true']`
    (dikelola Bootstrap) membuat tombol tampak "tertekan"; tidak perlu JS
    tambahan karena `bootstrap.bundle.min.js` sudah dimuat di setiap halaman.
  - Isi baris filter: `d-flex flex-wrap align-items-center gap-3 pt-4`, tiap
    filter dibungkus `d-flex align-items-center gap-2` dengan
    `form-label text-nowrap mb-0` + `form-select` (`style="width: 10rem"`,
    `12rem` bila label lebih panjang).
  - **Tempat baris filter wajib di dalam `.card-body`**, tepat setelah baris
    toolbar — bukan setelah `.card-body`, bukan di luar card.
- **Filter selalu berada di grup KIRI** halaman (toolbar-nya), bukan di kanan
  dan bukan di luar card.
- Bila halaman **tidak punya filter**, grup kiri hanya berisi input pencarian
  (tanpa tombol Filter) dan tidak ada blok `collapse`. Grup kanan tetap ada
  berisi `Per page:`.
- Grup kiri memakai
  `d-flex flex-column flex-sm-row flex-wrap align-items-sm-center gap-3`
  agar tetap rapi saat menumpuk di layar kecil.
- Label filter memakai `form-label text-nowrap mb-0` dan select-nya
  `style="width: 10rem"`.
- Semua kontrol wajib punya `aria-label` deskriptif (lihat bagian 10).

### Kontrak List.js

Pencarian, sorting, dan pagination memakai **List.js**
(`../dist/assets/libs/list.js/dist/list.min.js`). Kontrak yang **wajib** dipenuhi:

| Elemen | Kelas / atribut | Keterangan |
| --- | --- | --- |
| Card | `id` + `data-list="kolom1,kolom2"` | `valueNames` diambil dari `data-list` |
| Input cari | `form-control listjs-search` | `searchClass` List.js; lebar 200px dari CSS |
| Toggle filter | `btn btn-white datatable-filter-toggle` + `data-bs-toggle="collapse"` | pembuka baris filter (bukan dikelola List.js) |
| Baris filter | `<div class="collapse" id="{idFilters}">` | berisi `form-select` filter; wajib di dalam `.card-body` |
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

#### Empty State (Tabel Tanpa Data)

Bila tabel **belum memiliki data**, tuliskan satu baris *empty state* di dalam
`<tbody class="list">` (menggantikan baris data), dengan `colspan` sejumlah kolom:

```html
<tbody class="list">
  <tr>
    <td colspan="3" class="text-center py-6 text-secondary">
      <i class="ti ti-info-circle me-2"></i>Tidak ada data standar mutu yang ditemukan.
    </td>
  </tr>
</tbody>
```

- Ikon baku: `<i class="ti ti-info-circle me-2"></i>`; kelas sel
  `text-center py-6 text-secondary`.
- `colspan` = jumlah kolom tabel **termasuk kolom Aksi** (bagian 8.1).
- Baris data (`<td class="no">`, `<td class="{kolom}">`, `<td>` Aksi) ditambahkan
  saat data tersedia; baris *empty state* dihapus pada saat itu.
- Selama tabel kosong, **selector Per page** dan **footer pagination** boleh
  dihilangkan (contoh: `manajemen-referensi-master-standar-mutu.html`). List.js
  tetap aman karena setiap elemen (`listjs-showing-items-label`, `.pagination`,
  `.prev`, `.next`, `.listjs-items-per-page`) dicek `null` sebelum dipakai.
  Saat data ditambahkan, lengkapi kembali sesuai bagian 7.
- **Tombol Filter tetap ditampilkan** di grup kiri toolbar meski tabel masih
  kosong (bagian 7 → *Tata Letak Toolbar*); baris filter di dalam
  `.card-body` tetap ada dan bisa dibuka/ditutup.

---

## 8. Tabel

```html
<table class="table text-nowrap table-hover mb-0">
  <thead>
    <tr>
      <th scope="col" style="width: 4.5rem">No</th>
      <th scope="col" class="listjs-sorter" data-sort="{kolom}">Nama Kolom</th>
      <!-- kolom lain ... -->
      <th scope="col" style="width: 7rem">Aksi</th>
    </tr>
  </thead>
  <tbody class="list"> ... </tbody>
</table>
```

- Selalu `text-nowrap table-hover mb-0`.
- Kolom **No** selalu kolom pertama dengan `style="width: 4.5rem"` dan isi
  `<td class="no">{nomor}</td>`.
- Kolom **Aksi** selalu kolom **terakhir** dan **wajib ada di setiap datatable**
  (lihat bagian 8.1).
- Kolom yang bisa diurutkan diberi `class="listjs-sorter"` + `data-sort`.
- **Jangan** memakai `table-bordered` — cukup `table` + modifier standar
  (`text-nowrap`, `table-hover`, `align-middle`, `mb-0`) (lihat bagian 16.3).
- Tabel dibungkus `<div class="table-responsive mt-6">`.
- Tabel yang **dapat melebar melebihi lebar container** (banyak kolom / kolom
  teks panjang) **wajib** ditambah kelas **`table-sticky`** — lihat 8.2.

### 8.2 Kolom Tetap (`.table-sticky`) untuk Tabel Lebar

`.table-sticky` membuat **dua kolom pertama** (No + kolom identitas) menempel di
kiri dan **kolom terakhir** (Aksi) menempel di kanan, sehingga identitas baris dan
tombol aksi tetap terlihat saat tabel di-scroll horizontal.

```html
<div class="table-responsive mt-6">
  <table class="table text-nowrap table-hover mb-0 table-sticky">
    ...
  </table>
</div>
```

| Aspek | Ketentuan |
| --- | --- |
| Kelas | `table-sticky` ditulis **setelah** `mb-0` (urutan class lain tidak berubah) |
| Cakupan | kolom ke-1 & ke-2 (`nth-child(-n + 2)`) sticky `left`, kolom terakhir sticky `right` |
| Posisi kolom ke-2 | `left: 4.5rem` = lebar kolom No; dioverride per halaman dengan `--espmi-table-sticky-left` |
| Lebar kolom No | **wajib sama dengan `--espmi-table-sticky-left`** — CSS men-set `width` + `min-width: 4.5rem` dan tetap menutup celahnya (lihat baris berikut) |
| Latar sel (body) | wajib opaque — CSS men-set `--ds-table-bg: var(--ds-card-bg)`; hover tetap dari `box-shadow: inset` theme |
| Latar sel (header) | **sama dengan header theme** — `--ds-table-bg: var(--ds-gray-100)` (light `#f9fafb`, dark `#141a21`) |
| Penutup celah | pseudo `::after` selebar offset di tepi kanan kolom No, warnanya mengikuti keadaan sel |
| Garis batas | pseudo `::after` 1px di tepi kanan blok kiri & tepi kiri kolom Aksi |
| Pembungkus | **wajib** berada di dalam `.table-responsive` (kalau tidak, tidak ada scroll) |

**Kenapa begitu** — tabel memakai `table-layout: auto`, sehingga lebar kolom dihitung
dari lebar min-content isinya (kolom `text-nowrap`) dan `width` pada sel **bisa
diabaikan**. Kolom No karena itu bisa tampil lebih sempit dari offset `left` kolom
ke-2 (±13px pada tabel 8 kolom) dan muncul celah di antara dua kolom sticky. Celah
itu menampilkan latar di belakangnya: di header tampak sebagai **garis putih** yang
memotong warna header, dan pada baris **hover** tampak sebagai **garis putih** karena
baris berubah ke `--ds-gray-100` sementara celah tetap berlatar kartu. Karena itu dua
hal harus ada bersamaan: (1) latar sel sticky di `<thead>` mengikuti `--ds-gray-100`
(bukan warna kartu), dan (2) penutup celah selebar offset yang warnanya ikut keadaan
sel (normal / hover / header). Penutup aman untuk kedua arah: bila kolom No lebih
lebar dari offset, penutup tertutup oleh kolom ke-2 yang dilukis di atasnya.

**Kapan dipakai** — pakai `.table-sticky` bila tabel benar-benar bisa scroll
horizontal, yaitu:

- jumlah kolom **≥ 5**, atau
- tabel dengan **4 kolom** yang isinya panjang (mis.
  `manajemen-referensi-lembaga-akreditasi.html`) sehingga `scrollWidth` >
  `clientWidth` pada lebar layar ≥ 1100px.

Halaman yang **sudah** memakainya: `manajemen-referensi-manajemen-dokumen.html`,
`manajemen-referensi-auditee.html`, `manajemen-referensi-unit-penunjang.html`,
`manajemen-referensi-lembaga-akreditasi.html`, `penetapan-standar-mutu.html`,
`pelaksanaan-pengaturan-periode.html`.

**Tidak dipakai** pada tabel 3 kolom (No + 1 kolom data + Aksi) atau tabel 4
kolom yang selalu muat — pada tabel seperti itu hampir semua kolom menjadi
sticky dan tidak ada lagi kolom yang bisa di-scroll (mis.
`manajemen-referensi-master-standar-mutu.html`, `manajemen-referensi-tahun-periode.html`).

- Cara memeriksa cepat: buka halaman, jalankan
  `document.querySelector('.table-responsive').scrollWidth > document.querySelector('.table-responsive').clientWidth`
  di console. Bila `false` di semua ukuran layar, jangan pakai `table-sticky`.

### 8.1 Kolom Aksi (wajib di setiap datatable)

Setiap tabel data punya kolom **Aksi** di paling kanan berisi **dua tombol ikon**
(`Ubah` dan `Hapus`) memakai **varian soft**:

```html
<th scope="col" style="width: 7rem">Aksi</th>
```

```html
<td>
  <div class="d-flex gap-1">
    <a href="#!" class="btn btn-icon btn-xs btn-subtle-info" title="Ubah" aria-label="Ubah"><i class="ti ti-pencil"></i></a>
    <a href="#!" class="btn btn-icon btn-xs btn-subtle-danger" title="Hapus" aria-label="Hapus"><i class="ti ti-trash"></i></a>
  </div>
</td>
```

| Aspek | Ketentuan |
| --- | --- |
| Kelas tombol | `btn btn-icon btn-xs btn-subtle-{color}` — **ikon saja**, ukuran `btn-xs` (1.75rem) |
| Ubah | `btn-subtle-info` + `<i class="ti ti-pencil"></i>` |
| Hapus | `btn-subtle-danger` + `<i class="ti ti-trash"></i>` |
| Pembungkus | `<div class="d-flex gap-1">` |
| Atribut | `title="Ubah"` / `title="Hapus"` **dan** `aria-label` yang sama |
| Lebar kolom | `style="width: 7rem"` |
| `data-list` | Kolom Aksi **tidak** dimasukkan ke `data-list` (tidak dicari/diurutkan) |
| `listjs-sorter` | **Tidak** dipakai pada `<th>` Aksi (tidak ada `data-sort`) |

- Aksi **hanya** `Ubah` dan `Hapus`; aksi tambahan khusus (mis. "Tambah sub
  standar", "Kelola indikator") boleh mengikuti bila halaman memang butuh,
  tetap dengan varian **soft**.
- **Jangan** memakai varian solid (`btn-info`, `btn-danger`, `btn-success`,
  `btn-primary`) pada tombol aksi tabel — lihat bagian 16.5.
- Bila ada baris *empty state*, `colspan`-nya = **jumlah kolom termasuk Aksi**.
- Pada tabel lebar yang memakai `.table-sticky`, kolom Aksi (kolom terakhir)
  otomatis **menempel di kanan** sehingga tombol tetap terjangkau tanpa
  scroll horizontal (bagian 8.2).

---

## 9. Tombol, Ikon, & Badge

- **Aksi utama** (Tambah / Simpan / Submit): `btn btn-dark` + ikon
  (`d-md-flex align-items-center gap-2`).
- **Aksi sekunder / ikon**: `btn btn-icon btn-white` atau `btn btn-white`.
- **Tombol Filter datatable**: `btn btn-white datatable-filter-toggle d-inline-flex align-items-center gap-2`
  + `<i class="ti ti-filter fs-5"></i>` + teks `Filter` (lihat bagian 7).
  Saat baris filter terbuka, `aria-expanded="true"` (di-set Bootstrap) membuat
  CSS memberi latar `--ds-gray-100` dan border `--ds-gray-200` agar tombol
  tampak "tertekan" — berlaku di light & dark mode.
- **Aksi tabel (Ubah / Hapus)**: varian **soft** —
  `btn btn-icon btn-xs btn-subtle-info` (Ubah) & `btn-subtle-danger` (Hapus)
  (lihat bagian 8.1).
- **Varian soft** di theme ini bernama `btn-subtle-{color}`
  (`primary`, `secondary`, `success`, `danger`, `warning`, `info`, `dark`,
  `light`, `white`): background *tint* transparan (`rgba(color, .11)`) dan
  naik ke `.21` saat hover, border transparan. Aman di light & dark mode.
- **Prev/Next pagination**: `btn btn-white`.
- **Ikon tombol / konten**: Tabler webfont `<i class="ti ti-{nama}"></i>`
  (contoh `<i class="ti ti-filter fs-5"></i>`).
- **Ikon menu sidebar**: SVG inline (lihat bagian 4).
- **Badge status** (kolom status pada datatable): **wajib** *subtle* —
  `badge bg-{color}-subtle text-{color}-emphasis` (lihat bagian 16.2).
  **Jangan** memakai badge solid (`text-bg-{color}`).
- **Badge indikator/kategori**: boleh memakai palet subtle
  (`bg-{primary|secondary|success|danger|warning|info}-subtle`); warna di luar
  palet theme (mis. ungu) memakai kelas proyek `.badge-violet` /
  `.badge-violet-subtle` dari `espmi-app.css`.

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
  - `.badge-violet`, `.badge-violet-subtle` — badge warna khusus di luar palet theme.
  - `.navbar-glass`, `#content`, `#miniSidebar` — override tampilan eSPMI.
  - `.bg-gradient-info/success/warning/danger` — gradient card eSPMI
    (**light mode saja**; dark mode tetap memakai gradient bawaan theme).
  - `.dashboard-widget*`, `.dashboard-customizing-only` — grid widget Beranda yang
    dapat dikostumasi (bagian 18).
  - `.table-sticky` — kolom tetap (2 kiri + Aksi kanan) untuk tabel lebar
    (bagian 8.2); variabel `--espmi-table-sticky-left` = lebar kolom No =
    offset kolom ke-2 = lebar penutup celah; latar sel sticky di `<thead>`
    memakai `--ds-gray-100` dan di `<tbody>` memakai `--ds-card-bg`.
  - `.listjs-search` — lebar baku input pencarian datatable (`width: 200px`),
    menggantikan inline `style="max-width: 22rem"` (bagian 7).
  - `.datatable-filter-toggle[aria-expanded='true']` — keadaan "tertekan" tombol
    Filter saat baris filter terbuka (bagian 7 & 9).
- Kelas baru **ditulis di `espmi-app.css`** pada bagian bernomor (mis. bagian 9
  untuk toolbar datatable), bukan sebagai inline style di HTML.
- Override gradasi bertema (warna palet aplikasi) **hanya** ditulis untuk light
  mode dengan scope `html:not([data-bs-theme='dark']) ...`, supaya dark mode
  tetap memakai default theme tanpa perlu menulis rule pembalik.

---

## 14. Konvensi Penamaan

| Hal | Aturan | Contoh |
| --- | --- | --- |
| Nama file | kebab-case, bahasa Indonesia | `manajemen-referensi-lembaga-akreditasi.html` |
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
6. Susun **toolbar** sesuai standar: **kiri** = pencarian 200px (`.listjs-search`,
   tanpa inline style lebar), **kanan** = `Per page` (10/25/50/100) — bagian 7 &
   16.5. Bila ada filter, tambahkan tombol `Filter`
   (`.datatable-filter-toggle`) di grup kiri + baris `collapse` filter di dalam
   `.card-body` (bagian 7 → *Tata Letak Toolbar*).
7. Tambahkan kolom **Aksi** di kolom terakhir berisi tombol ikon **soft**
   Ubah (`btn-subtle-info` + `ti ti-pencil`) dan Hapus
   (`btn-subtle-danger` + `ti ti-trash`) — bagian 8.1 & 16.5.
8. Bila tabel akan melebar (≥ 5 kolom / isi panjang), tambahkan `table-sticky`
   pada `<table>` — bagian 8.2.
9. Sesuaikan skrip List.js (`getElementById`, fallback `data-list`, komentar).
10. Tambahkan ikon pada judul halaman (sama dengan ikon menu sidebar — bagian 16.1).
11. Ubah nilai kolom status menjadi badge *subtle* (bagian 16.2).
12. Pastikan tidak ada `table-bordered` pada tabel (bagian 16.3).
13. Bila ada petunjuk/catatan, ubah menjadi `alert alert-info` + ikon (bagian 16.4).
14. Pastikan **footer** ada dengan teks versi yang konsisten.
15. Periksa semua path aset (`../dist/assets/...`, `assets/css/...`).
16. Uji: pencarian, sorting, ubah "Per page", tombol Filter (buka/tutup baris
    filter), dan navigasi Prev/Next.
17. Uji **light & dark mode** serta tampilan **desktop & mobile** — dan bila
    tabel memakai `table-sticky`, pastikan header No + kolom identitas tetap
    menempel saat tabel di-scroll horizontal.
18. Khusus **Beranda**: ikuti kontrak grid widget yang dapat dikostumasi
    (bagian 18) — atribut `data-widget`/`data-span`/`data-widget-title`, kelas
    pegangan & toolbar, widget terkunci `data-locked`, tombol hapus `data-removable`,
    panel Kartu Tersembunyi, dan urutan pemuatan aset dragula.
19. Uji mode kostumasi: drag urutan, ubah lebar 1–4, hapus kartu chart,
    pulihkan lewat chip/Tampilkan Semua, dan **Reset** — lalu muat ulang halaman
    untuk memastikan layout tersimpan.

---

## 16. Aturan Tambahan (Standar Wajib)

Lima aturan berikut berlaku untuk **semua halaman** eSPMI dan wajib dipatuhi.

### 16.1 Judul Halaman Memakai Ikon Menu

Setiap judul halaman (`<h1>`) **wajib** diawali ikon Tabler webfont yang **sama**
dengan ikon menu sidebar halaman tersebut.

```html
<h1 class="mb-3 h2"><i class="ti ti-calendar-event"></i> Tahun Periode</h1>
```

| Halaman | Ikon sidebar (SVG) | Ikon judul (`<h1>`) |
| --- | --- | --- |
| Beranda (`dashboard.html`) | `icon-tabler-home` | `<i class="ti ti-home"></i>` |
| Manajemen Referensi › Tahun Periode | `icon-tabler-calendar-event` | `<i class="ti ti-calendar-event"></i>` |
| Manajemen Referensi › Lembaga Akreditasi | `icon-tabler-star` | `<i class="ti ti-star"></i>` |
| Manajemen Referensi › Auditee Pusat | `icon-tabler-building` | `<i class="ti ti-building"></i>` |
| Manajemen Referensi › Auditee | `icon-tabler-user` | `<i class="ti ti-user"></i>` |
| Manajemen Referensi › Unit Penunjang | `icon-tabler-list-details` | `<i class="ti ti-list-details"></i>` |
| Manajemen Referensi › Master Standar Mutu | `icon-tabler-versions` | `<i class="ti ti-versions"></i>` |
| Manajemen Dokumen › Kategori Dokumen | `icon-tabler-category` | `<i class="ti ti-category"></i>` |
| Manajemen Dokumen › Jenis Dokumen | `icon-tabler-file-description` | `<i class="ti ti-file-description"></i>` |
| Manajemen Dokumen › Manajemen Dokumen | `icon-tabler-files` | `<i class="ti ti-files"></i>` |
| Penetapan › Standar Mutu | `icon-tabler-ruler-measure` | `<i class="ti ti-ruler-measure"></i>` |
| Pelaksanaan › Pengaturan Periode | `icon-tabler-calendar-cog` | `<i class="ti ti-calendar-cog"></i>` |
| Penetapan › Daftar Standar Mutu | `icon-tabler-list-details` | `<i class="ti ti-list-details"></i>` |

- Nama ikon = nama ikon sidebar **tanpa** prefix `icon-tabler-`.
- **Semua** halaman wajib punya judul berikon, termasuk Beranda: `dashboard.html`
  memakai `<h1 class="mb-3 h2"><i class="ti ti-home"></i> Beranda</h1>` dengan
  breadcrumb satu item aktif (Beranda adalah halaman saat ini).

### 16.2 Status di Datatable Memakai Badge Subtle

Nilai status pada kolom tabel **wajib** dibungkus badge *subtle* — bukan teks
biasa dan bukan badge solid (`text-bg-*`):

```html
<td class="status text-center"><span class="badge bg-success-subtle text-success-emphasis">Aktif</span></td>
<td class="status text-center"><span class="badge bg-danger-subtle text-danger-emphasis">Tidak Aktif</span></td>
```

- Format: `badge bg-{color}-subtle text-{color}-emphasis`.
- Pemetaan status: Aktif → `success`; Tidak Aktif / Nonaktif → `danger`.
- Nilai badge tetap berada di dalam `<td class="{kolom}">` sehingga `textContent`
  kolom tidak berubah — pencarian & sorting List.js tetap bekerja.
- Badge **indikator/kategori** (bukan status) tetap boleh memakai
  `.badge-violet` atau `.badge-violet-subtle`.

### 16.3 Tabel Tanpa `table-bordered`

Class tabel memakai **`table`** beserta modifier standar yang sudah disepakati
pada bagian 8, dan **tidak boleh** memakai `table-bordered`.

```html
<!-- benar -->
<table class="table text-nowrap table-hover mb-0">
<table class="table align-middle mb-0">

<!-- salah -->
<table class="table table-bordered">
<table class="table table-bordered border-primary">
```

### 16.4 Petunjuk Memakai `alert alert-info` + Ikon

Bila halaman memiliki catatan/petunjuk (mis. "Data Tahun dengan status Aktif
tidak dapat dihapus."), gunakan **alert** `alert-info` dengan ikon — **bukan**
`card` biasa.

```html
<!-- Petunjuk -->
<div class="alert alert-info d-flex align-items-start gap-2 mt-6" role="alert">
  <i class="ti ti-info-circle fs-5"></i>
  <div><span class="fw-semibold">Petunjuk:</span> Data Tahun dengan status Aktif tidak dapat dihapus.</div>
</div>
```

- Ikon baku: `<i class="ti ti-info-circle fs-5"></i>`.
- Selalu sertakan `role="alert"`.
- Pakai `d-flex align-items-start gap-2` agar ikon tetap sejajar bila teks
  membungkus ke beberapa baris.

### 16.5 Tata Letak Toolbar & Kolom Aksi Datatable

Tiga aturan wajib untuk **setiap card datatable**:

1. **Toolbar** — sisi **kiri** = input pencarian (**lebar tetap 200px** lewat
   kelas `.listjs-search`, **tanpa** inline style lebar) + tombol **Filter**
   (hanya bila ada filter); sisi **kanan** = selector **Per page
   (10, 25, 50, 100)**. Filter **tidak boleh** diletakkan di kanan atau di luar
   card (lihat bagian 7 → *Tata Letak Toolbar*).
2. **Baris filter** — bila datatable punya filter, baris filter diletakkan di
   dalam `.card-body` (tepat setelah baris toolbar), disembunyikan default
   sebagai `<div class="collapse" id="{idFilters}">`, dan dibuka oleh tombol
   `btn btn-white datatable-filter-toggle` + `data-bs-toggle="collapse"` +
   `data-bs-target="#{idFilters}"` + `aria-expanded="false"` +
   `aria-controls="{idFilters}"`. Tidak perlu JS tambahan (Bootstrap bundle sudah
   dimuat). Saat terbuka, tombol otomatis tampak "tertekan"
   (`.datatable-filter-toggle[aria-expanded='true']`).
3. **Kolom Aksi** — setiap datatable **wajib** memiliki kolom `Aksi` di kolom
   **terakhir**, berisi tombol ikon **Ubah** (`ti ti-pencil`) dan **Hapus**
   (`ti ti-trash`) dengan **varian soft** `btn-subtle-*`
   (lihat bagian 8.1). Bila tabel lebar memakai `.table-sticky`, kolom Aksi
   otomatis menempel di kanan (bagian 8.2).

```html
<!-- header -->
<th scope="col" style="width: 7rem">Aksi</th>

<!-- sel -->
<td>
  <div class="d-flex gap-1">
    <a href="#!" class="btn btn-icon btn-xs btn-subtle-info" title="Ubah" aria-label="Ubah"><i class="ti ti-pencil"></i></a>
    <a href="#!" class="btn btn-icon btn-xs btn-subtle-danger" title="Hapus" aria-label="Hapus"><i class="ti ti-trash"></i></a>
  </div>
</td>
```

- Tombol aksi tabel **wajib ikon saja** (`btn-icon`), ukuran `btn-xs`.
- Kolom Aksi **tidak** dimasukkan ke `data-list` dan **tidak** diberi
  `listjs-sorter`.
- `colspan` baris *empty state* harus menghitung kolom Aksi.

---

## 17. Do & Don't

**Do**

- Ikuti halaman acuan: struktur, urutan aset, class, dan penamaan.
- Terapkan perubahan sidebar di desktop **dan** offcanvas.
- Tulis semua override styling di `espmi-app.css`.
- Jaga konsistensi label (judul = breadcrumb = menu sidebar).
- Pakai `.listjs-search` (200px) & `table-sticky` bila tabel memang melebar
  horizontal (bagian 7, 8.2, 16.5).

**Don't**

- Jangan mengubah `dist/assets/**` (hasil build) atau `theme.min.css` secara langsung.
- Jangan memakai class/komponen dari template lama yang tidak ada di halaman acuan.
- Jangan menulis CSS/JS halaman di dalam file theme.
- Jangan membiarkan link menu `href="#!"` bila halamannya sudah ada
  (arahkan ke file halaman yang benar).
- Jangan memakai ikon campur aduk: SVG inline untuk sidebar, Tabler webfont
  `<i class="ti ...">` untuk isi konten.
- Jangan memakai `table-bordered` (lihat bagian 16.3).
- Jangan memakai badge solid (`text-bg-{color}`) untuk status; gunakan badge
  *subtle* (lihat bagian 16.2).
- Jangan menampilkan petunjuk/catatan memakai `card`; gunakan `alert alert-info`
  (lihat bagian 16.4).
- Jangan membuat judul halaman tanpa ikon menu (lihat bagian 16.1).
- Jangan memindahkan `.dashboard-widget-handle` / `.dashboard-widget-toolbar` /
  `.dashboard-widget-remove` keluar dari strukturnya, dan jangan mengaktifkan drag
  tanpa mode kostumasi (lihat bagian 18).
- Jangan menambahkan tombol hapus (`data-removable`) pada kartu KPI atau widget
  terkunci — hapus hanya untuk kartu chart (lihat bagian 18.7).
- Jangan memasukkan profil/daftar kartu tersembunyi ke dalam grid; panel Kartu
  Tersembunyi berada di luar grid dengan kelas `.dashboard-customizing-only`.
- Jangan merender chart pada container yang sedang `display: none`; gunakan
  `isChartVisible()` (lihat bagian 18.4).
- Jangan meletakkan filter datatable di sisi kanan toolbar, di luar card, atau
  langsung terlihat tanpa tombol toggle — filter selalu di baris `collapse`
  di dalam `.card-body` yang dibuka tombol `Filter` di grup **kiri**
  (lihat bagian 7 & 16.5).
- Jangan menulis inline `style="max-width: 22rem"` pada input pencarian
  datatable — lebar baku 200px sudah diatur `.listjs-search` (bagian 7 & 13).
- Jangan memakai `table-sticky` pada tabel yang tidak bisa scroll horizontal
  (mis. 3 kolom) atau meletakkannya di luar `.table-responsive`
  (lihat bagian 8.2).
- Jangan memberi latar `--ds-card-bg` pada sel sticky di `<thead>` — header sticky
  wajib memakai `--ds-gray-100` yang sama dengan `.table thead`, kalau tidak kolom
  No/kolom identitas/Aksi berbeda warna dari kolom header lain (lihat bagian 8.2).
- Jangan mengubah offset `left` kolom sticky ke-2 tanpa menyesuaikan lebar kolom No
  dan penutup celahnya; celah antar dua kolom sticky tampil sebagai garis putih pada
  baris hover (lihat bagian 8.2).
- Jangan membuat datatable tanpa kolom **Aksi** (Ubah + Hapus) di kolom terakhir
  (lihat bagian 8.1 & 16.5).
- Jangan memakai varian tombol **solid** (`btn-info`, `btn-danger`,
  `btn-success`, `btn-primary`) untuk aksi di dalam tabel; pakai varian **soft**
  `btn-subtle-*` (lihat bagian 8.1 & 9).

---

## 18. Kartu Statistik Beranda yang Dapat Dikostumasi

Beranda (`dashboard.html`) memakai **satu grid widget 4 kolom** yang dapat diubah
pengguna: kartu bisa **digeser urutannya** (drag & drop) dan **diubah lebarnya**
(1–4 kolom). Grid memuat kartu statistik *dan* kartu chart.

### 18.1 Kontrak Grid & Widget

```html
<div class="row g-6 mb-6" id="dashboardWidgetGrid">

  <div class="dashboard-widget-col col-12 col-md-6 col-xl-3" data-widget="auditee" data-span="1">
    <div class="card card-lg bg-gradient-info h-100 dashboard-widget dashboard-widget--gradient">
      <div class="card-body d-flex flex-column gap-6">
        <div class="d-flex justify-content-between align-items-start gap-3">
          <div class="text-white fw-semibold">Auditee</div>
          <div class="d-flex align-items-center gap-1 text-white">
            <!-- ikon kartu (SVG inline, seperti kartu statistik lain) -->
            <button type="button" class="btn btn-ghost btn-icon dashboard-widget-handle"
                    aria-label="Geser kartu Auditee"><i class="ti ti-grip-vertical fs-5"></i></button>
          </div>
        </div>
        <!-- isi kartu -->
        <div class="dashboard-widget-chart" id="statistikAuditeeChart"></div>
      </div>
      <div class="card-footer border-0 bg-transparent dashboard-widget-toolbar justify-content-between align-items-center gap-2">
        <span class="small text-white-50">Lebar</span>
        <div class="btn-group btn-group-sm" role="group" aria-label="Lebar kartu Auditee">
          <button type="button" class="btn btn-white" data-span-set="1">1</button>
          <button type="button" class="btn btn-white" data-span-set="2">2</button>
          <button type="button" class="btn btn-white" data-span-set="3">3</button>
          <button type="button" class="btn btn-white" data-span-set="4">4</button>
        </div>
      </div>
    </div>
  </div>
  <!-- widget lain ... -->
</div>
```

Aturan:

1. **Grid**: satu `#dashboardWidgetGrid` (`row g-6 mb-6`). Setiap widget adalah
   *child langsung* `.dashboard-widget-col` — jangan menambah pembungkus lain.
2. **Kartu**: `.dashboard-widget` + `h-100`. Kartu KPI bergradasi menambah
   `.dashboard-widget--gradient` (untuk warna pegangan/toolbar di atas gradient).
3. **Identitas widget**: `data-widget` = kebab-case unik dan **stabil**, karena
   dipakai sebagai kunci layout tersimpan. Mengganti nama = layout pengguna untuk
   widget itu hilang.
4. **Judul kartu untuk UI**: `data-widget-title` = nama kartu yang ditampilkan pada
   panel **Kartu Tersembunyi** (bagian 18.7). Diisi pada **semua** widget agar chip
   pemulih selalu punya label; JS tetap punya fallback bila atribut tidak ada.
5. **Lebar**: atribut `data-span` bernilai 1–4 (jumlah kolom dari 4 kolom).
6. **Pegangan** (handle): selalu
   `<button type="button" class="btn btn-ghost btn-icon dashboard-widget-handle">`
   berisi `<i class="ti ti-grip-vertical fs-5"></i>` dan `aria-label` berbentuk
   `Geser kartu {Nama}`.
7. **Toolbar lebar**: `card-footer border-0 bg-transparent dashboard-widget-toolbar`
   berisi `btn-group btn-group-sm` dengan tombol `data-span-set="1..4"`.
   `border-0 bg-transparent` **wajib** — `card-footer` theme memakai background
   kartu sehingga tanpa itu akan muncul blok putih di dalam kartu gradient.
8. **Tombol hapus** (opsional, bagian 18.7): hanya untuk kartu **chart** —
   `<button type="button" class="btn btn-ghost btn-icon dashboard-widget-remove">`
   berisi `<i class="ti ti-trash fs-5"></i>`, diletakkan tepat setelah pegangan
   (dalam flex container `d-flex align-items-center gap-1` yang sama), dan
   kolomnya diberi `data-removable="true"`.
9. **Widget terkunci**: panel filter (lihat aturan 10) memakai
   `data-locked="true"` — **tanpa** pegangan, **tanpa** toolbar lebar, **tanpa**
   tombol hapus. Widget terkunci selalu `col-12` dan tidak ikut digeser/dilebarkan.
10. **Panel filter kartu chart** adalah **widget terkunci di dalam grid**
    (`data-widget="filter"`, `data-locked="true"`, `data-widget-title="Filter Kartu
    Chart"`), diletakkan tepat **setelah 4 kartu KPI** dan **sebelum kartu chart** —
    karena filter ini khusus untuk kartu chart. Ini satu-satunya pengecualian dari
    "filter tidak boleh masuk grid".
11. **Footer halaman tidak boleh** dimasukkan ke dalam grid (bukan widget).
12. **Petunjuk** mode kostumasi memakai `alert alert-info` (bagian 16.4) + kelas
    `.dashboard-customizing-only`.

#### Pemetaan `data-span` → class

| `data-span` | Class lengkap |
| --- | --- |
| 1 | `dashboard-widget-col col-12 col-md-6 col-xl-3` |
| 2 | `dashboard-widget-col col-12 col-md-6 col-xl-6` |
| 3 | `dashboard-widget-col col-12 col-xl-9` |
| 4 | `dashboard-widget-col col-12` |

- `dashboard-widget-col` selalu ditulis **paling depan** agar urutan class di
  markup sama persis dengan hasil `applySpan()` (memudahkan pengecekan).
- Layout default (semua baris terisi penuh):
  `1,1,1,1` · `filter (4)` · `4` · `4` · `2,2` · `2,2` — yaitu
  `auditee`, `lembaga-akreditasi`, `standar-mutu`, `risiko-tinggi`, **`filter`**,
  `kesiapan-akreditasi`, `rata-nilai-standar`, `rata-nilai-sub-standar`, `risiko`,
  `perkembangan-mutu`, `perkembangan-evaluasi-diri`.

### 18.2 Mode Kostumasi

| Elemen | Ketentuan |
| --- | --- |
| Tombol utama | `#btnKustomisasiDashboard`, `btn btn-dark d-md-flex align-items-center gap-2`, ikon `<i class="ti ti-adjustments">` (berganti ke `ti ti-check` saat aktif) + label "Kostumasi Dashboard" ⇄ "Selesai" |
| Tombol reset | `#btnResetDashboard`, `btn btn-white`, memakai atribut `hidden` saat mode tidak aktif |
| Tombol hapus kartu | `.dashboard-widget-remove` (ikon `ti ti-trash`) pada kartu chart; tampil **hanya** saat mode kostumasi |
| Panel Kartu Tersembunyi | `#dashboardHiddenPanel` + `#dashboardHiddenList` + `#btnTampilkanSemuaKartu`, dibungkus kelas `.dashboard-customizing-only` |
| State | kelas `dashboard-customizing` pada `<body>` |

- Saat mode aktif: pegangan & toolbar lebar & tombol hapus tampil, panel Kartu
  Tersembunyi tampil, petunjuk tampil, drag aktif.
- **Drag hanya boleh dimulai dari pegangan.** Diatur lewat opsi `moves` dragula dan
  dicek dengan `closest('.dashboard-widget-handle')` — **bukan** `classList.contains`,
  karena dragula mengirim elemen tempat `mousedown` terjadi (bisa `<i>` di dalam tombol).
- Urutan class `moves` juga memastikan kartu tidak bisa digeser di luar mode kostumasi.
- Ikon tombol memakai **Tabler webfont** (`<i class="ti ...">`, bagian 9) karena harus
  berganti secara dinamis; bukan SVG inline seperti ikon menu sidebar.
- **Reset** berfungsi ganda: mengembalikan urutan & lebar default **dan** menampilkan
  kembali seluruh kartu yang disembunyikan.

### 18.3 Persistensi Layout

- Kunci `localStorage`: **`espmi.dashboardLayout`**.
- Nilai: JSON array berisi urutan tampil —
  `[{ "id": "auditee", "span": 1, "hidden": false }, { "id": "risiko", "span": 2 }, ...]`.
- Widget **terkunci** hanya disimpan sebagai `{ "id": "filter" }` (tanpa `span`/`hidden`),
  karena lebarnya tidak dapat diubah dan tidak dapat disembunyikan.
- Disimpan otomatis setiap kali widget selesai digeser, lebar diubah, kartu
  disembunyikan, atau kartu dipulihkan.
- Dibaca oleh **skrip inline kecil yang diletakkan tepat SETELAH markup grid** dan
  diterapkan sebelum paint agar tidak berkedip. Skrip ini **wajib** berada setelah
  grid, karena butuh elemen widget sudah ada di DOM.
- Selalu dibungkus `try/catch` (mode privat / localStorage diblokir) dan entri
  dengan `id` tidak dikenal diabaikan.
- **Migrasi layout lama**: layout yang tersimpan sebelum `filter` masuk grid tidak
  memuat entri `filter`. Skrip restore menyisipkan `{ id: 'filter' }` tepat sebelum
  entri kartu chart pertama, sehingga urutan kustom pengguna tidak tertimpa.
- Karena `applySpan()` dan skrip restore menulis ulang `className`, kelas
  `.dashboard-widget-hidden` **wajib** dipasang *setelah* penulisan `className`.
  Untuk itu atribut `data-hidden="true"` dipakai sebagai penanda yang ikut ditulis
  ulang oleh `applySpan()`.
- Tombol **Reset** menghapus kunci tersebut lalu mengembalikan urutan, lebar, dan
  visibilitas default.

### 18.4 Chart di Dalam Widget

- Semua chart Beranda dirender dari satu fungsi `renderAllCharts()` di dalam IIFE
  akhir `<body>` (bagian 12), bukan langsung di top-level.
- Helper `registerChart(instance)` mengumpulkan instance ApexCharts.
- `refreshCharts()` melakukan **destroy + render ulang** (debounce 60 ms) setelah drag
  selesai, lebar kartu berubah, atau kartu disembunyikan/dipulihkan. Ini perlu karena
  ApexCharts hanya mendengarkan event `resize` jendela, bukan perubahan ukuran container.
- **Guard visibilitas (wajib)**: chart hanya boleh dibuat bila container-nya terlihat.
  Pakai helper `isChartVisible('#id')` (memeriksa `el.offsetParent !== null`) sebagai
  pengganti `document.getElementById(...)` pada setiap blok chart. Tanpa guard ini,
  ApexCharts dipaksa menghitung ukuran elemen `display: none` dan menghasilkan chart
  berukuran nol setelah kartunya dipulihkan.
- **Sparkline kartu statistik**: ApexCharts tipe `area`, `sparkline: { enabled: true }`,
  tinggi `56`, warna `#ffffff` (aman di light maupun dark mode karena kartu gradient
  ikut menggelap di dark mode), `animations: { enabled: false }`.

### 18.5 Aset & Urutan Pemuatan

```html
<!-- blok Libs CSS -->
<link rel="stylesheet" href="../dist/assets/libs/dragula/dist/dragula.min.css" />

<!-- akhir <body>, sebelum apexcharts -->
<script src="../dist/assets/libs/dragula/dist/dragula.min.js"></script>
```

- Muat dragula **hanya** pada halaman yang memakai grid widget (saat ini Beranda).
- ApexCharts sudah dimuat Beranda dan dipakai untuk sparkline.

### 18.6 Kelas CSS Terkait (`espmi-app.css` bagian 8)

| Kelas | Fungsi |
| --- | --- |
| `.dashboard-widget-col` | kolom grid widget (pembungkus, bukan kartunya) |
| `.dashboard-widget` | kartu widget |
| `.dashboard-widget--gradient` | varian kartu KPI bergradasi |
| `.dashboard-widget-handle` | tombol pegangan; tampil hanya saat `body.dashboard-customizing` |
| `.dashboard-widget-toolbar` | toolbar pilih lebar; tampil hanya saat mode kostumasi |
| `.dashboard-widget-remove` | tombol hapus kartu chart; tampil hanya saat mode kostumasi |
| `.dashboard-widget-hidden` | kartu chart yang disembunyikan pengguna (`display: none !important`) |
| `.dashboard-widget-chart` | area sparkline kartu statistik |
| `.dashboard-customizing-only` | elemen yang hanya tampil saat mode kostumasi |
| `.gu-mirror`, `.gu-transit` | bawaan dragula (mirror mengikuti kursor, item asal transparan) |

Aturan atribut:

| Atribut | Nilai | Fungsi |
| --- | --- | --- |
| `data-widget` | kebab-case | identitas stabil widget (kunci layout) |
| `data-widget-title` | teks | label kartu pada panel Kartu Tersembunyi |
| `data-span` | `1`–`4` | lebar kartu (jumlah kolom dari 4) |
| `data-locked` | `"true"` | widget tidak dapat digeser/dilebarkan/dihapus |
| `data-removable` | `"true"` | kartu chart yang boleh disembunyikan |
| `data-hidden` | `"true"` | penanda kartu sedang disembunyikan (bertahan melewati penulisan ulang `className`) |

### 18.7 Menyembunyikan (Menghapus) Kartu Chart

Pengguna dapat "menghapus" kartu **chart** dari Beranda tanpa menghilangkannya
permanen. Kartu yang dihapus cukup disembunyikan dan dapat dimunculkan kembali.

Kartu yang **dapat** dihapus (chart, `data-removable="true"`):

| `data-widget` | Judul |
| --- | --- |
| `kesiapan-akreditasi` | Persentase Kesiapan Akreditasi |
| `rata-nilai-standar` | Persentase Rata Nilai - Standar Mutu |
| `rata-nilai-sub-standar` | Persentase Rata Nilai - Sub Standar Mutu |
| `risiko` | Risiko |
| `perkembangan-mutu` | Perkembangan Nilai Mutu |
| `perkembangan-evaluasi-diri` | Perkembangan Nilai Evaluasi Diri |

Kartu **tidak dapat** dihapus: 4 kartu KPI bergradasi (`auditee`,
`lembaga-akreditasi`, `standar-mutu`, `risiko-tinggi`) dan widget terkunci (`filter`).

Perilaku:

1. Tombol `.dashboard-widget-remove` hanya tampil di mode kostumasi.
2. Klik → `removeWidget()` menambahkan `.dashboard-widget-hidden` +
   `data-hidden="true"`, lalu menyimpan layout dan me-refresh chart.
3. Kartu **tidak** di-`remove()` dari DOM — hanya disembunyikan, agar urutannya
   tetap utuh saat dipulihkan dan sisa kartu otomatis mengalir memenuhi baris.
4. Panel **Kartu Tersembunyi** (`#dashboardHiddenPanel`, hanya di mode kostumasi)
   menampilkan satu chip `btn btn-white btn-sm` berikon `ti ti-plus` per kartu yang
   disembunyikan → klik chip = pulihkan **satu** kartu itu.
   Bila tidak ada yang disembunyikan, panel menampilkan teks muted
   "Tidak ada kartu yang disembunyikan."
5. Tombol **Tampilkan Semua** (`#btnTampilkanSemuaKartu`) muncul bila ada **lebih dari
   satu** kartu tersembunyi, lalu memulihkan semuanya sekaligus.
6. Tombol **Reset** juga memulihkan seluruh kartu tersembunyi (kembali ke default).
7. Isi label chip dipasang dengan `textContent` (bukan `innerHTML`) — nama kartu
   berasal dari `data-widget-title`.
8. Panel filter kartu chart **tetap selalu tampil** meski seluruh kartu chart dihapus;
   panel itu tidak ikut disembunyikan otomatis.


