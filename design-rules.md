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
├── dashboard.html                            # Dashboard
├── index.html                                # Halaman login
├── akun-preferensi.html                       # Preferensi (font sistem)
├── manajemen-referensi-tahun-periode.html     # HALAMAN ACUAN (baseline)
├── penetapan-standar-mutu.html                 # Penetapan › Daftar Nilai Mutu
├── penetapan-daftar-standar-mutu.html          # Penetapan › Daftar Standar Mutu
├── evaluasi-ami-manajemen-auditor.html         # Evaluasi (AMI) › Manajemen Auditor
├── evaluasi-ami-jenis-temuan.html              # Evaluasi (AMI) › Jenis Temuan
├── pelaksanaan-pengaturan-periode.html
├── pelaksanaan-target-nilai-mutu.html
├── pelaksanaan-evaluasi-diri.html
├── pelaksanaan-lihat-data-pendidikan-data-ipk.html
├── pelaksanaan-lihat-data-pendidikan-data-do.html
├── pelaksanaan-lihat-data-pendidikan-data-lulus-tepat.html
├── pelaksanaan-lihat-data-pendidikan-data-tugas-akhir.html
├── pelaksanaan-lihat-data-penelitian-data-penelitian.html
├── pelaksanaan-lihat-data-penelitian-data-karya-ilmiah.html
├── pelaksanaan-lihat-data-penelitian-data-haki.html
├── pelaksanaan-lihat-data-penelitian-data-publikasi-jurnal.html
├── pelaksanaan-lihat-data-pengabdian-data-kegiatan-pkm.html
├── manajemen-referensi-lembaga-akreditasi.html
├── manajemen-referensi-auditee-pusat.html
├── manajemen-referensi-auditee.html
├── manajemen-referensi-unit-penunjang.html
├── manajemen-referensi-master-standar-mutu.html
├── manajemen-dokumen-kategori-dokumen.html
├── manajemen-dokumen-jenis-dokumen.html
├── manajemen-referensi-manajemen-dokumen.html
├── integrasi-sister-aktivasi-sister.html        # Integrasi SISter › Aktivasi Sister
├── integrasi-sister-referensi.html              # Integrasi SISter › Referensi Sister
├── integrasi-sister-data.html                   # Integrasi SISter › Data Sister
├── integrasi-akademik-data.html                 # Integrasi Akademik › Data Akademik
├── pengaturan-sistem-pengguna-portal.html       # Pengaturan Sistem › Data Pengguna Portal
├── pengaturan-sistem-pengguna-backoffice.html   # Pengaturan Sistem › Manajemen Pengguna
├── pengaturan-sistem-pengaturan-menu.html       # Pengaturan Sistem › Manajemen Menu
├── pengaturan-sistem-pengaturan-grup.html       # Pengaturan Sistem › Manajemen Group
├── pengaturan-sistem-pengaturan-modul.html      # Pengaturan Sistem › Manajemen Module
├── assets/
│   ├── css/
│   │   ├── espmi-app.css                      # override tema eSPMI
│   │   └── vendor/                            # CSS pihak ketiga (mis. driver.css)
│   └── js/
│       ├── espmi-toast.js                     # toast notifikasi (semua halaman)
│       ├── espmi-about.js                     # modal "Tentang" (semua halaman)
│       ├── espmi-truncate.js                  # tooltip teks terpotong (semua halaman)
│       ├── espmi-drag-scroll.js               # geser tabel lebar dengan drag (semua halaman)
│       ├── espmi-datatable-columns.js         # kontrol kolom datatable
│       ├── espmi-datatable-crud.js            # aksi Hapus datatable
│       ├── espmi-tour.js                      # mesin tour halaman
│       └── vendor/                            # JS pihak ketiga (mis. driver.js)
└── ../dist/assets/...                         # libs + theme (hasil build Dasher)
```

- Aset **pihak ketiga** (vendor) tidak ditulis ulang di `dist/assets/**`, tetapi
  diletakkan di `espmi-admin/assets/{css,js}/vendor/` dan dimuat hanya pada
  halaman yang memakainya (lihat bagian 12 & 16.8).

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
<script src="../dist/assets/js/vendors/espmi-font.js"></script>
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
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;700&display=swap" />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700&display=swap" />
<link rel="stylesheet" href="../dist/assets/libs/simplebar/dist/simplebar.min.css" />
<link rel="stylesheet" href="../dist/assets/libs/@tabler/icons-webfont/tabler-icons.min.css" />
<link rel="stylesheet" href="../dist/assets/css/theme.min.css" />
<link rel="stylesheet" href="assets/css/espmi-app.css" />
```

- `<title>`: `{Nama Halaman} | eSPMI`.
- Skrip penentu posisi sidebar pada `documentElement` **wajib** ada (mencegah
  halaman "berkedip" saat sidebar di-collapse).
- `espmi-font.js` dimuat **sebelum** blok penentu sidebar & CSS agar preferensi
  font (bagian 11) diterapkan lebih dulu (mencegah *flash* font bawaan).
- Empat `link` Google Fonts (Inter, Roboto, Google Sans, Open Sans) **wajib**
  ada di setiap halaman agar pilihan font di halaman Preferensi langsung siap.
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
        <span class="text">Dashboard</span>
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

### 4.0 Grup Menu (`nav-heading`)

Item sidebar dikelompokkan dengan **label grup** memakai pola bawaan tema
Dasher (`nav-heading` + `nav-line`):

```html
<li class="nav-item">
  <div class="nav-heading">Operasional</div>
  <hr class="mx-5 nav-line mb-1" />
</li>
```

Pembagian grup (urut):

| Grup | Isi (urut) |
| --- | --- |
| — (tanpa grup) | Dashboard |
| Operasional | Penetapan, Pelaksanaan, Evaluasi (AMI), Pengendalian & Peningkatan |
| Pengaturan | Manajemen Referensi, Manajemen Dokumen, Integrasi SISter, Integrasi Akademik, Pengaturan Sistem |

- Label `nav-heading` **selalu** didampingi `<hr class="mx-5 nav-line mb-1" />`.
- **Garis tipis pemisah antar grup (wajib, semua halaman)**: setiap grup menu
  dipisah **garis tipis**. Saat sidebar *expanded* / *offcanvas*, garis digambar
  di **atas** label grup (`.nav-heading`) lewat `espmi-app.css` bagian 16; saat
  *collapsed*, tema menampilkan `<hr class="nav-line">`. Warna garis mengikuti
  `--ds-gray-300` (ikut light/dark). Pemisah berlaku otomatis di **semua
  halaman** — **tanpa** markup tambahan (cukup pola grup `nav-heading` +
  `nav-line` di atas).
- Heading **bukan** tautan dan tidak pernah diberi state `active`.
- Perubahan grup **wajib** diterapkan pada desktop **dan** offcanvas.

### 4.1 Submenu bertingkat (level 3)

Theme Dasher mendukung menu **tiga level** dengan pola `li.dropdown-submenu`. Toggle level 2 dan level 3 **tidak menampilkan ikon**, hanya level 1 yang memiliki SVG inline. Level 3 submenu ditampilkan saat toggle diklik, bukan hover seperti mode collapsed.

Contoh grup **Lihat Data Pendidikan** di dalam submenu **Pelaksanaan**:

```html
<ul class="dropdown-menu flex-column">
  <li class="nav-item">
    <a class="nav-link" href="./pelaksanaan-pengaturan-periode.html">
      <span class="nav-icon"><svg ...width="18" height="18"...></svg></span>
      <span class="text">Pengaturan Periode</span>
    </a>
  </li>
  <!-- grup bertingkat -->
  <li class="nav-item dropdown-submenu">
    <a class="nav-link dropdown-toggle" href="#!" role="button" data-bs-toggle="dropdown" aria-expanded="false">
      <span class="nav-icon"><svg ...width="18" height="18"...></svg></span>
      <span class="text">Lihat Data Pendidikan</span>
    </a>
    <ul class="dropdown-menu flex-column">
      <li class="nav-item">
        <a class="nav-link" href="./pelaksanaan-lihat-data-pendidikan-data-ipk.html">
          <span class="nav-icon"><svg ...width="18" height="18"...></svg></span>
          <span class="text">Data IPK</span>
        </a>
      </li>
    </ul>
  </li>
</ul>
```

- Toggle grup bertingkat memakai `li.nav-item.dropdown-submenu` +
  `a.nav-link.dropdown-toggle` + `ul.dropdown-menu.flex-column`.
- **Ikon**: hanya menu **level 1** yang memakai ikon SVG. Level 2 dan level 3
  **tanpa ikon** (span `.nav-icon` disembunyikan via CSS di `espmi-app.css`).
  Atribut `width/height` tetap 20 (level 1) dan 18 (level 2 & 3) bila ikon
  ditulis di markup, tetapi tidak ditampilkan.
- Saat halaman di dalam grup dibuka, toggle level 3 diberi `active` +
  `aria-expanded="true"` dan `ul.dropdown-menu`-nya diberi `show`.
- **Sorotan item aktif level 3**: theme mewarnai tautan level 3 dengan selector
  yang lebih spesifik, jadi override ada di `espmi-app.css` bagian 10 agar
  `.active` tetap terlihat (desktop & offcanvas).
- **Catatan bug theme & perbaikan `sidebarnav.js`**: submenu bertingkat
  (level 3) sebelumnya tidak bisa dibuka karena (1) variabel tak terdefinisi
  `isVisible` pada `classList.toggle('show', isVisible)`, dan (2) konflik
  *double-toggle* antara handler Bootstrap `data-bs-toggle="dropdown"` dengan
  handler kustom. Perbaikan di `src/assets/js/vendors/sidebarnav.js` **dan**
  file build `dist/assets/js/vendors/sidebarnav.js`:
  1. Menghapus `data-bs-toggle` dari toggle `.dropdown-submenu` secara dinamis
     agar hanya handler kustom yang mengontrol submenu.
  2. Men-toggle `show` secara eksplisit (`classList.toggle('show', !isOpen)`)
     sekaligus menyinkronkan `aria-expanded`.
  3. Memakai fase *capture* (`addEventListener(..., true)`) agar handler kustom
     berjalan lebih dulu sebelum handler Bootstrap tingkat dokumen.

Aturan:

1. **Icon** memakai SVG inline Tabler *outline* — `width/height="20"` untuk menu
   level 1, `18` untuk level 2 & 3 (ditulis di markup tetapi disembunyikan lewat
   CSS agar hanya level 1 yang menampilkan ikon). Kelas: `icon icon-tabler
   icons-tabler-outline icon-tabler-{nama}`. Jangan memakai `<i class="ti ...">`
   untuk icon menu sidebar.
2. **Teks menu** selalu dibungkus `<span class="text">`. Judul menu berbahasa
   Indonesia dengan huruf kapital di awal kata.
3. **State aktif** (halaman yang sedang dibuka):
   - Menu induk: tambahkan `active` pada `dropdown-toggle`, set
     `aria-expanded="true"`, dan tambahkan `show` pada `ul.dropdown-menu`.
   - Submenu aktif: tambahkan `active` pada `nav-link` anak.
   - Grup bertingkat (level 3): tambahkan `active` pada `dropdown-toggle`
     level 3, set `aria-expanded="true"`, dan tambahkan `show` pada
     `ul.dropdown-menu` level 3 (lihat bagian 4.1).
4. Urutan menu mengikuti **grup pada bagian 4.0**: Dashboard (tanpa grup) →
   grup **Operasional** (Penetapan → Pelaksanaan → Evaluasi (AMI) →
   Pengendalian & Peningkatan) → grup **Pengaturan** (Manajemen Referensi →
   Manajemen Dokumen → Integrasi SISter → Integrasi Akademik →
   Pengaturan Sistem).
5. Perubahan sidebar **wajib diterapkan pada versi desktop dan offcanvas**.
6. **Submenu Pelaksanaan** (dropdown level 1, ikon `icon-tabler-clipboard-list`):

   | Urutan | Label | Level | Ikon | Halaman |
   | --- | --- | --- | --- | --- |
   | 1 | Pengaturan Periode | 2 | — | `pelaksanaan-pengaturan-periode.html` |
   | 2 | Target Nilai Mutu | 2 | — | `pelaksanaan-target-nilai-mutu.html` |
   | 3 | Evaluasi Diri | 2 | — | `pelaksanaan-evaluasi-diri.html` |
   | 4 | Lihat Data Pendidikan | 2 (grup) | — | — (grup bertingkat, bagian 4.1) |
   | 4.1 | Data IPK | 3 | — | `pelaksanaan-lihat-data-pendidikan-data-ipk.html` |
   | 4.2 | Data DO | 3 | — | `pelaksanaan-lihat-data-pendidikan-data-do.html` |
   | 4.3 | Data Lulus Tepat | 3 | — | `pelaksanaan-lihat-data-pendidikan-data-lulus-tepat.html` |
   | 4.4 | Data Tugas Akhir | 3 | — | `pelaksanaan-lihat-data-pendidikan-data-tugas-akhir.html` |
   | 5 | Lihat Data Penelitian | 2 (grup) | — | — (grup bertingkat, bagian 4.1) |
   | 5.1 | Data Penelitian | 3 | — | `pelaksanaan-lihat-data-penelitian-data-penelitian.html` |
   | 5.2 | Data Karya Ilmiah | 3 | — | `pelaksanaan-lihat-data-penelitian-data-karya-ilmiah.html` |
   | 5.3 | Data HAKI | 3 | — | `pelaksanaan-lihat-data-penelitian-data-haki.html` |
   | 5.4 | Data Publikasi Jurnal | 3 | — | `pelaksanaan-lihat-data-penelitian-data-publikasi-jurnal.html` |
   | 6 | Lihat Data Pengabdian | 2 (grup) | — | — (grup bertingkat, bagian 4.1) |
   | 6.1 | Data Kegiatan PKM | 3 | — | `pelaksanaan-lihat-data-pengabdian-data-kegiatan-pkm.html` |
   | 6.2 | Data Publikasi PKM | 3 | — | `pelaksanaan-lihat-data-pengabdian-data-publikasi-pkm.html` |
   | 6.3 | Data Bahan Ajar PKM | 3 | — | `pelaksanaan-lihat-data-pengabdian-data-bahan-ajar-pkm.html` |
   | 6.4 | Data Isi PKM | 3 | - | `pelaksanaan-lihat-data-pengabdian-data-isi-pkm.html` |
   | 6.5 | Data Mutu Pelaksana PKM | 3 | — | `pelaksanaan-lihat-data-pengabdian-data-mutu-pelaksana-pkm.html` |

   - Item ber-`#!` adalah **placeholder** menu (sesuai arsitektur aplikasi). Ganti
     `href="#!"` menjadi path halaman begitu halamannya dibuat.
   - **Lihat Data Penelitian** dan **Lihat Data Pengabdian** adalah **submenu
     (level 2) dari Pelaksanaan**, bukan sub-submenu dari Lihat Data Pendidikan.
     Keduanya memakai pola **grup bertingkat (level 3)** — lihat bagian 4.1.
   - **Data Kegiatan PKM dkk. adalah item level 3** di dalam grup **Lihat Data
     Pengabdian**. Item-item tersebut **tidak boleh** muncul sebagai menu
     top-level (`li.nav-item` tingkat 1) di luar grupnya.

### 4.2 Submenu Integrasi SISter

Dropdown level 1 **Integrasi SISter** (ikon `icon-tabler-plug-connected`) berisi
tiga item **level 2** (tanpa ikon tampil, lihat bagian 4.1):

| Urutan | Label | Level | Halaman |
| --- | --- | --- | --- |
| 1 | Aktivasi Sister | 2 | `integrasi-sister-aktivasi-sister.html` |
| 2 | Referensi Sister | 2 | `integrasi-sister-referensi.html` |
| 3 | Data Sister | 2 | `integrasi-sister-data.html` |

- **Aktivasi Sister** adalah halaman **form** (non-datatable): form kredensial
  SISTER (`Id Pengguna` readonly, `Username`/`Password` berupa `<textarea>`,
  tombol **Aktifasi** = `btn btn-dark` dan **Reset** = `btn btn-white`), dipisah
  garis **dashed** (`<hr class="border-dashed border-gray-300" />`) dari blok
  `Id Satuan Perguruan Tinggi` + `Universitas` yang **disabled**. Wajib memenuhi
  kerangka halaman + page header berikon + **petunjuk `alert alert-info`**
  (bagian 16.4) + footer. Label kolom memakai `row align-items-start` +
  `col-md-3 col-form-label` + `col-md-5`.
- **Referensi Sister** dan **Data Sister** adalah halaman **datatable** dengan
  kolom `No | Aksi | Data | Progress | Terakhir Diperbaharui`. Kolom Aksi berisi
  **satu** tombol ikon **Sinkronisasi** (`btn btn-icon btn-sm btn-subtle-secondary`
  + `ti ti-refresh`) — aksi khusus di luar Ubah/Hapus (bagian 8.1). Kolom
  *Progress* memakai progress bar ramping `.espmi-readiness` (bagian 21) dengan
  sel `<td class="progres">` (nama kolom dihindari `progress` karena bentrok
  dengan kelas `.progress` Bootstrap). Kolom *Progress* & *Terakhir Diperbaharui*
  dapat disembunyikan; tiga kolom pertama terkunci (bagian 16.5 butir 4).
- Terapkan perubahan sidebar pada **desktop + offcanvas** di **semua** halaman
  (bagian 4.1 butir 5).

### 4.3 Submenu Integrasi Akademik

Dropdown level 1 **Integrasi Akademik** (ikon `icon-tabler-school`) berisi **satu**
item **level 2** (tanpa ikon tampil, lihat bagian 4.1):

| Urutan | Label | Level | Halaman |
| --- | --- | --- | --- |
| 1 | Data Akademik | 2 | `integrasi-akademik-data.html` |

- **Data Akademik** adalah halaman **datatable** dengan kolom
  `No | Aksi | Data | Progress | Terakhir Diperbaharui`. Kolom Aksi berisi
  **satu** tombol ikon **Sinkronisasi** (`btn btn-icon btn-sm btn-subtle-secondary`
  + `ti ti-refresh`, atribut `data-espmi-sinkron`) — aksi khusus (bagian 8.1).
  Kolom *Progress* memakai progress bar ramping `.espmi-readiness` (bagian 21)
  dengan sel `<td class="progres">`. Tiga kolom pertama terkunci (bagian 16.5
  butir 4). Tanpa tombol **Tambah**, tanpa **Filter**, dan tanpa blok **Petunjuk**
  (sesuai halaman asal).
- Judul halaman (`<h1>`) memakai ikon menu level 1: `ti ti-school` (bagian 16.1).
- Aksi **Sinkronisasi** menganimasikan progress bar hingga 100% lalu memperbarui
  sel *Terakhir Diperbaharui* dan menampilkan toast "Sinkronisasi berhasil".
- Terapkan perubahan sidebar pada **desktop + offcanvas** di **semua** halaman.

### 4.4 Submenu Pengaturan Sistem

Dropdown level 1 **Pengaturan Sistem** (ikon `icon-tabler-settings`) berisi **lima**
item **level 2** (tanpa ikon tampil, lihat bagian 4.1):

| Urutan | Label | Level | Halaman |
| --- | --- | --- | --- |
| 1 | Data Pengguna Portal | 2 | `pengaturan-sistem-pengguna-portal.html` |
| 2 | Manajemen Pengguna | 2 | `pengaturan-sistem-pengguna-backoffice.html` |
| 3 | Manajemen Menu | 2 | `pengaturan-sistem-pengaturan-menu.html` |
| 4 | Manajemen Group | 2 | `pengaturan-sistem-pengaturan-grup.html` |
| 5 | Manajemen Module | 2 | `pengaturan-sistem-pengaturan-modul.html` |

- Semua halaman memakai judul `<h1>` berikon menu level 1: `ti ti-settings`
  (bagian 16.1).
- Kolom & pola setiap halaman:
  | Halaman | Kolom | Tambah | Petunjuk | Aksi |
  | --- | --- | --- | --- | --- |
  | Data Pengguna Portal | No, Aksi, Nama Pengguna, Nama Asli, Group, Status | ya | ya | Ubah, Hapus, Detail |
  | Manajemen Pengguna | No, Aksi, Nama Pengguna, Nama Lengkap, Group, Unit, Status | ya | ya | Ubah, Hapus, Detail |
  | Manajemen Menu | No, Aksi, Nama, Tingkat, Induk | ya | tidak | Ubah, Hapus |
  | Manajemen Group | No, Aksi, Nama, Deskripsi | ya | tidak | Ubah, Hapus, Detail |
  | Manajemen Module | No, Aksi, Module, Jumlah Submodule, Terdaftar, Belum Terdaftar | tidak | tidak | Registrasi (tunggal) |
- **Manajemen Menu** memakai tab `nav-pills` (bagian 19): tab **Back Office**
  (datatable) dan tab **Portal Kepegawaian** (placeholder `alert alert-info`,
  belum ada tabel).
- **Manajemen Module** memakai kontrol **toolbar kiri** (bagian 16.5): select
  `Back Office`/`Portal Kepegawaian` + tombol `btn btn-dark` **Cek Module**
  (`ti ti-refresh`). Kolom Aksi berisi **satu** tombol ikon **Registrasi**
  (`btn btn-icon btn-sm btn-subtle-secondary` + `ti ti-checkbox`).
- Status pengguna memakai badge subtle (bagian 16.2): **Data Pengguna Portal**
  memakai nilai `Aktif` (hijau), **Manajemen Pengguna** memakai nilai `aktif`
  (hijau) seperti pada halaman asal.
- Terapkan perubahan sidebar pada **desktop + offcanvas** di **semua** halaman.

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

### 5.1 Dropdown Profile Menu (User)

Dropdown user (`Administrator Pusat`) memakai **ikon Tabler di setiap item**
(format `dropdown-item d-flex align-items-center` + ikon + `<span class="ms-2">`):

```html
<ul class="dropdown-menu dropdown-menu-end shadow">
  <li>
    <a class="dropdown-item d-flex align-items-center" href="#!"><i class="ti ti-user"></i><span class="ms-2">Profil</span></a>
  </li>
  <li>
    <a class="dropdown-item d-flex align-items-center" href="./akun-preferensi.html"><i class="ti ti-typography"></i><span class="ms-2">Preferensi</span></a>
  </li>
  <li>
    <a class="dropdown-item d-flex align-items-center" href="#!"><i class="ti ti-user-cog"></i><span class="ms-2">Pengaturan Akun</span></a>
  </li>
  <li><hr class="dropdown-divider" /></li>
  <li>
    <a class="dropdown-item d-flex align-items-center text-danger" href="./index.html"><i class="ti ti-logout"></i><span class="ms-2">Logout</span></a>
  </li>
</ul>
```

| Urutan | Label | Ikon | Halaman |
| --- | --- | --- | --- |
| 1 | Profil | `ti-user` | `#!` |
| 2 | Preferensi | `ti-typography` | `akun-preferensi.html` |
| 3 | Pengaturan Akun | `ti-user-cog` | `#!` |
| — | *(divider)* | — | — |
| 4 | Logout | `ti-logout` | `index.html` |

- Urutan wajib: **Profil → Preferensi → Pengaturan Akun → Logout** (Preferensi
  berada **di atas** Pengaturan Akun).
- Semua item memakai ikon Tabler webfont `<i class="ti ti-{nama}"></i>`; item
  Logout berwarna `text-danger`.
- Blok ini **identik** di semua halaman (desktop & offcanvas memakai navbar yang
  sama).

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
            <li class="breadcrumb-item"><a href="./dashboard.html">Dashboard</a></li>
            <li class="breadcrumb-item"><a href="#!">Menu</a></li>
            <li class="breadcrumb-item"><a href="#!">Submenu</a></li>
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
  (menu level 2/3 memakai ikon induk level 1 — lihat bagian 16.1). Contoh:
  `<h1 class="mb-3 h2"><i class="ti ti-folders"></i> Tahun Periode</h1>`.
- **Posisi breadcrumb**: di **bawah judul** dan tetap di **kolom kiri** —
  dibungkus satu `<div>` bersama `<h1>` (lihat contoh di atas). Breadcrumb
  **tidak boleh** diletakkan di sisi kanan header.
- **Struktur breadcrumb mengikuti hierarki menu sidebar**, berurutan:
  `Dashboard` → `Menu` (level 1) → `Submenu` (level 2, **jika** halaman berada
  di dalam submenu) → `Sub-submenu` (level 3, **jika** halaman berada di dalam
  sub-submenu) → item aktif (nama halaman). Contoh:
  - Level 1: `Dashboard` → `Dashboard`
  - Level 2: `Dashboard` → `Pelaksanaan` → `Pengaturan Periode`
  - Level 3: `Dashboard` → `Pelaksanaan` → `Lihat Data Pendidikan` → `Data DO`
- Item breadcrumb **bukan halaman** (menu/submenu induk) memakai
  `<a href="#!">` — **bukan** `href="#"`.
- Breadcrumb selalu diawali `Dashboard`. Item terakhir memakai `active` +
  `aria-current="page"`, dan namanya **sama** dengan item sidebar
  (lihat bagian 14).
- Tombol aksi utama (mis. **Tambah**) memakai `btn-dark` dengan ikon
  `icon-tabler-plus` dan `d-md-flex align-items-center gap-2`.
- Tombol sekunder/ikon (mis. **filter**) memakai `btn btn-icon btn-white` +
  ikon `<i class="ti ti-filter fs-5"></i>`.

---

## 7. Pola Halaman Daftar Data (List)

Halaman daftar data (contoh: **Tahun Periode**, **Lembaga Akreditasi**) memakai
satu `card card-lg border-1` dengan urutan: **toolbar → tabel → footer pagination**.

Setiap card yang memakai kelas `card card-lg` **wajib** ditambah kelas
**`border-1`** → `class="card card-lg border-1"` (berlaku di seluruh halaman
proyek, termasuk card non-datatable).

```html
<div class="card card-lg border-1" id="{idList}" data-list="kolom_1,kolom_2">
  <div class="card-body pb-0">
    <div class="d-flex flex-column flex-md-row justify-content-md-between align-items-md-center gap-3">
      <!-- KIRI : pencarian + tombol Filter + pilih kolom -->
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
        <!-- kontrol visibilitas kolom (selalu ada pada datatable) -->
        <div class="dropdown">
          <button
            class="btn btn-white dropdown-toggle datatable-columns-toggle d-inline-flex align-items-center gap-2"
            type="button"
            data-bs-toggle="dropdown"
            data-bs-auto-close="outside"
            aria-expanded="false"
            aria-label="Pilih kolom yang ditampilkan"
          >
            <i class="ti ti-table-minus fs-5"></i>
            Kolom
          </button>
          <ul class="dropdown-menu espmi-columns-menu" data-columns-menu>
            <li><h6 class="dropdown-header">Tampilkan kolom</h6></li>
          </ul>
        </div>
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
      <div class="d-flex flex-wrap align-items-center gap-3 pt-4 mt-4 border-top border-dashed border-gray-300">
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
| **Kiri** | Input pencarian (`form-control listjs-search`, **lebar tetap 200px**) + tombol **Filter** (hanya bila halaman punya filter) di **sebelah kanan** input + tombol dropdown **Kolom** (kontrol visibilitas kolom) |
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
  - Tombol Filter menampilkan **chevron status** (pseudo-element `::after`) yang
    menunjuk **ke bawah** saat baris filter tertutup dan **ke atas** saat
    terbuka. Arah mengikuti `aria-expanded` yang di-update Bootstrap; chevron
    berada di **paling kanan** isi tombol (setelah teks `Filter` dan badge
    indikator). Ditulis **CSS-only** di `espmi-app.css` bagian 9 sehingga tidak
    perlu mengubah markup HTML di tiap halaman.
  - Isi baris filter:
    `d-flex flex-wrap align-items-center gap-3 pt-4 mt-4 border-top border-dashed border-gray-300`,
    tiap filter dibungkus `d-flex align-items-center gap-2` dengan
    `form-label text-nowrap mb-0` + `form-select` (`style="width: 10rem"`,
    `12rem` bila label lebih panjang). Garis pemisah **dashed** di atas baris
    filter memakai warna `--ds-gray-300` (kelas `.border-gray-300`, lihat
    bagian 13) ditambah jarak `mt-4`.
  - **Tempat baris filter wajib di dalam `.card-body`**, tepat setelah baris
    toolbar — bukan setelah `.card-body`, bukan di luar card.
- **Tombol Filter selalu berada di grup KIRI** toolbar, tepat **di sebelah
  kanan input pencarian**, bukan di grup kanan dan bukan di luar card.
- **Tombol dropdown Kolom berada di sebelah kanan tombol Filter** (atau tepat
  di sebelah kanan input pencarian pada halaman tanpa filter) — lihat
  *Kontrol Kolom (Dropdown Kolom)* di bawah.
- Bila halaman **tidak punya filter**, grup kiri berisi input pencarian +
  tombol dropdown Kolom (tanpa tombol Filter) dan tidak ada blok `collapse`.
  Grup kanan tetap berisi `Per page:`.
- Grup kiri memakai
  `d-flex flex-column flex-sm-row flex-wrap align-items-sm-center gap-3`
  agar tetap rapi saat menumpuk di layar kecil; grup kanan memakai
  `d-flex flex-column flex-sm-row align-items-sm-center gap-3`.
- Label filter memakai `form-label text-nowrap mb-0` dan select-nya
  `style="width: 10rem"`.
- Semua kontrol wajib punya `aria-label` deskriptif (lihat bagian 10).

### Kontrol Kolom (Dropdown Kolom)

Setiap datatable menampilkan tombol dropdown **Kolom** di toolbar (grup kiri,
tepat di sebelah kanan tombol Filter, atau di sebelah kanan input pencarian
bila halaman tanpa filter) untuk memilih kolom mana yang ditampilkan.
**Checked = kolom tampil**, **unchecked = kolom disembunyikan**.

Markup (identik di semua halaman; isi menu dibangun otomatis oleh
`assets/js/espmi-datatable-columns.js`):

```html
<div class="dropdown">
  <button
    class="btn btn-white dropdown-toggle datatable-columns-toggle d-inline-flex align-items-center gap-2"
    type="button"
    data-bs-toggle="dropdown"
    data-bs-auto-close="outside"
    aria-expanded="false"
    aria-label="Pilih kolom yang ditampilkan"
  >
    <i class="ti ti-table-minus fs-5"></i>
    Kolom
  </button>
  <ul class="dropdown-menu espmi-columns-menu" data-columns-menu>
    <li><h6 class="dropdown-header">Tampilkan kolom</h6></li>
  </ul>
</div>
```

- **Ikon** tombol: `ti ti-table-minus`.
- **Chevron**: tombol memakai class `.datatable-columns-toggle` sehingga caret
  bawaan `.dropdown-toggle` diganti chevron border yang **berputar** mengikuti
  `aria-expanded` (di-update otomatis oleh Bootstrap dropdown) — gayanya
  **sama persis** dengan chevron tombol Filter (`.datatable-filter-toggle`,
  bagian 9). Bila dropdown terbuka, chevron mengarah ke atas.

- **Kolom terkunci selalu tampil dan tidak bisa disembunyikan**. Secara default
  yang terkunci adalah **tiga kolom pertama**: kolom **No** (ke-1), kolom
  **Aksi** (ke-2), dan **kolom ke-3** (bagian 16.5). Untuk tabel yang menaruh
  kolom Aksi di posisi lain (mis. halaman tree **Daftar Standar Mutu** yang
  menaruh Aksi di paling kanan, bagian 16.10), tandai kolom terkunci secara
  **eksplisit** dengan atribut `data-espmi-locked` pada `<th>`; bila atribut ini
  ada, `espmi-datatable-columns.js` memakai daftar eksplisit tersebut dan
  mengabaikan aturan "tiga kolom pertama". Checkbox kolom terkunci tetap
  `checked` + `disabled` dan itemnya diredupkan.
- Skrip mengisi menu dari `<th>` tabel, **mendukung header bertingkat
  (`rowspan`/`colspan`)**, lalu menampilkan/menyembunyikan kolom lewat atribut
  `hidden` pada `<th>`/`<td>`. Karena kolom terkunci selalu tampil, geometri
  `.table-sticky` tidak pernah terpengaruh.
- `data-bs-auto-close="outside"` menjaga menu tetap terbuka saat beberapa
  checkbox diubah.
- Bila tabel punya ≤ 3 kolom (tidak ada kolom yang bisa disembunyikan), tombol
  dropdown dan menu tidak berfungsi — halaman tetap memuat markup yang sama
  demi konsistensi.
- **Kolom tersembunyi default** — bila sebuah kolom harus sudah tersembunyi saat
  halaman dibuka (checkbox **tidak** tercentang), tambahkan atribut
  `data-espmi-hidden-default` pada `<th>`-nya (disertai atribut `hidden` pada
  `<th>`/`<td>` agar tidak "berkedip" sebelum JS jalan). `espmi-datatable-columns.js`
  membaca atribut ini, memulai kolom dalam keadaan tersembunyi, dan hanya
  mencentang checkbox kolom yang tampil. Contoh: kolom **Info Jenjang** pada
  halaman `penetapan-daftar-standar-mutu.html` (bagian 16.10).

### Indikator Filter Aktif (badge pada tombol Filter)

UX: bila ada **filter yang aktif** (select terpilih, bukan opsi default
`-- SEMUA --`), tombol `Filter` menampilkan **badge angka** di **sebelah kanan
teks "Filter"** yang menunjukkan **berapa banyak** item filter yang aktif.
Badge disembunyikan (`hidden`) saat 0 filter aktif.

Markup badge — disisipkan **di dalam** tombol Filter, tepat setelah teks
`Filter` (lihat contoh toolbar di atas):

```html
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
  <span class="badge bg-primary-subtle text-primary-emphasis active-filter-badge" hidden>0</span>
</button>
```

Kontrak:

| Aspek | Ketentuan |
| --- | --- |
| Kelas badge | `.active-filter-badge` (style: `espmi-app.css` bagian 9) |
| Varian warna | `badge bg-primary-subtle text-primary-emphasis` (palet subtle, bagian 9) |
| Aturan hitung | **1 poin per `<select>`** di dalam baris filter yang `selectedIndex > 0` (bukan opsi pertama / default) |
| Default | Opsi pertama select filter selalu `-- SEMUA --` (dianggap tidak aktif) |
| Keadaan 0 | badge diberi atribut `hidden` (tersembunyi) |
| Skrip | `../dist/assets/js/vendors/espmi-filter-badge.js` — dimuat di **semua halaman** (setelah `sidebarnav.js`); IIFE, no-op bila halaman tidak punya tombol Filter |
| Perilaku | Listener `change` pada tiap select filter → hitung ulang; juga dihitung ulang saat halaman dimuat (filter mungkin sudah terpilih di HTML) |

- **Contoh penerapan** (halaman acuan): `pelaksanaan-lihat-data-pendidikan-data-do.html`
  — filter **Angkatan** diset `2025` (`<option selected>2025</option>`), maka
  saat halaman dibuka tombol Filter menampilkan badge **`1`** (dan jadi `2`/`3`
  bila user memilih filter lain).
- Jangan menghitung "Per page" select atau select di luar baris filter —
  hanya `<select>` di dalam `div.collapse` yang dijadikan target tombol.

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
  dihilangkan (contoh: `manajemen-referensi-master-standar-mutu.html`,
  `pelaksanaan-lihat-data-pengabdian-data-mutu-pelaksana-pkm.html`). List.js
  tetap aman karena setiap elemen (`listjs-showing-items-label`, `.pagination`,
  `.prev`, `.next`, `.listjs-items-per-page`) dicek `null` sebelum dipakai.
  Saat data ditambahkan, lengkapi kembali sesuai bagian 7.
- **Tombol Filter tetap ditampilkan** di grup kiri toolbar meski tabel masih
  kosong (bagian 7 → *Tata Letak Toolbar*); baris filter di dalam
  `.card-body` tetap ada dan bisa dibuka/ditutup. Tombol dropdown **Kolom**
  juga tetap ditampilkan.

---

## 8. Tabel

```html
<table class="table text-nowrap table-hover mb-0">
  <thead>
    <tr>
      <th scope="col" style="width: 4.5rem">No</th>
      <th scope="col" class="aksi" style="width: 7rem">Aksi</th>
      <th scope="col" class="listjs-sorter" data-sort="{kolom}">Nama Kolom</th>
      <!-- kolom lain ... -->
    </tr>
  </thead>
  <tbody class="list"> ... </tbody>
</table>
```

- Selalu `text-nowrap table-hover mb-0`.
- Kolom **No** selalu kolom pertama dengan `style="width: 4.5rem"` dan isi
  `<td class="no">{nomor}</td>`.
- Kolom **Aksi** selalu kolom **ke-2 setelah No** dan **wajib ada di setiap
  datatable** (lihat bagian 8.1) — kecuali halaman laporan **read-only** yang
  hanya menampilkan data (bagian 19), yang tidak menampilkan kolom Aksi.
- Kolom yang bisa diurutkan diberi `class="listjs-sorter"` + `data-sort`.
- **Jangan** memakai `table-bordered` — cukup `table` + modifier standar
  (`text-nowrap`, `table-hover`, `align-middle`, `mb-0`) (lihat bagian 16.3).
- Tabel dibungkus `<div class="table-responsive mt-6">`.
- Tabel yang **dapat melebar melebihi lebar container** (banyak kolom / kolom
  teks panjang) **wajib** ditambah kelas **`table-sticky`** — lihat 8.2.

### 8.2 Kolom Tetap (`.table-sticky`) untuk Tabel Lebar

`.table-sticky` membuat **dua kolom pertama** (No + kolom ke-2) menempel di
kiri. Untuk tabel ber-kolom **Aksi** (kini kolom **ke-2**, headernya diberi
`class="aksi"`), **kolom ke-3** juga menempel di kiri, sehingga blok tetap =
**No + Aksi + kolom identitas** dan tombol aksi tetap terlihat saat tabel
di-scroll horizontal. Kolom **data biasa tidak** menempel — pada tabel laporan
tanpa kolom Aksi, hanya dua kolom kiri yang menempel.

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
| Cakupan | kolom ke-1 & ke-2 (`nth-child(-n + 2)`) sticky `left`; **kolom ke-3** ikut sticky `left` **hanya bila** `<th>` kolom ke-2 ber-`class="aksi"` (deteksi `:has()`) |
| Posisi kolom ke-2 | `left: 4.5rem` = lebar kolom No; dioverride per halaman dengan `--espmi-table-sticky-left` |
| Lebar kolom No | **wajib sama dengan `--espmi-table-sticky-left`** — CSS men-set `width` + `min-width: 4.5rem` dan tetap menutup celahnya (lihat baris berikut) |
| Latar sel (body) | wajib opaque — CSS men-set `--ds-table-bg: var(--ds-card-bg)`; hover tetap dari `box-shadow: inset` theme |
| Latar sel (header) | **sama dengan header theme** — `--ds-table-bg: var(--ds-gray-100)` (light `#f9fafb`, dark `#141a21`) |
| Penutup celah | pseudo `::after` selebar offset di tepi kanan kolom No (dan, bila ber-Aksi, kolom Aksi), warnanya mengikuti keadaan sel |
| Garis batas | pseudo `::after` 1px di tepi kanan blok kiri (kolom ke-2; **kolom ke-3** bila kolom Aksi ada) |
| Pembungkus | **wajib** berada di dalam `.table-responsive` (kalau tidak, tidak ada scroll) |

- **Kolom Aksi wajib ditandai `class="aksi"`** pada `<th>`-nya (mis.
  `<th scope="col" class="aksi" style="width: 7rem">Aksi</th>`) — itulah penanda
  yang membuat `.table-sticky` menempelkan **kolom ke-3** (bagian 8.1). Kolom
  **data biasa jangan** diberi `class="aksi"`.
- Karena penempelan kolom ke-3 memakai `:has()`, pada browser yang tidak
  mendukungnya hanya dua kolom kiri yang menempel (degradasi aman).
- Offset kolom ke-3 = lebar kolom No + lebar kolom Aksi, diatur lewat
  `--espmi-table-sticky-left-3` (default `11.5rem`); lebar kolom Aksi lewat
  `--espmi-table-sticky-aksi` (default `7rem`). Keduanya **wajib** disesuaikan
  bersama bila lebar kolom No/Aksi diubah.

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
`pelaksanaan-pengaturan-periode.html`,
`pelaksanaan-lihat-data-pendidikan-data-do.html`,
`pelaksanaan-lihat-data-pendidikan-data-lulus-tepat.html`,
`pelaksanaan-lihat-data-pendidikan-data-tugas-akhir.html`,
`pelaksanaan-lihat-data-penelitian-data-penelitian.html`,
`pelaksanaan-lihat-data-penelitian-data-karya-ilmiah.html`,
`pelaksanaan-lihat-data-penelitian-data-haki.html`,
`pelaksanaan-lihat-data-penelitian-data-publikasi-jurnal.html`,
`pelaksanaan-lihat-data-pengabdian-data-kegiatan-pkm.html`,
`evaluasi-ami-manajemen-auditor.html`.

**Tidak dipakai** pada tabel 3 kolom (No + 1 kolom data + Aksi) atau tabel 4
kolom yang selalu muat — pada tabel seperti itu hampir semua kolom menjadi
sticky dan tidak ada lagi kolom yang bisa di-scroll (mis.
`manajemen-referensi-master-standar-mutu.html`, `manajemen-referensi-tahun-periode.html`).

- Cara memeriksa cepat: buka halaman, jalankan
  `document.querySelector('.table-responsive').scrollWidth > document.querySelector('.table-responsive').clientWidth`
  di console. Bila `false` di semua ukuran layar, jangan pakai `table-sticky`.

### 8.3 Geser Tabel Lebar dengan Drag (drag-to-scroll)

Tabel lebar (banyak kolom, memakai `.table-sticky`) dapat di-scroll horizontal.
Selain lewat **scroll bar**, pengguna **wajib** bisa menggeser **area tabel**
(baris/kolomnya) dengan **drag** (klik-tahan-lalu-geser) untuk scroll horizontal.
Perilaku ini disediakan otomatis oleh `assets/js/espmi-drag-scroll.js` (dimuat di
**setiap halaman**, setelah `espmi-truncate.js`):

- Kursor `grab` muncul pada `.table-responsive` **hanya bila** container memang
  bisa scroll horizontal (`scrollWidth > clientWidth`); berubah `grabbing` saat
  drag (kelas `espmi-drag-scrollable` / `is-dragging` — `espmi-app.css` bagian 15).
- Hanya untuk pointer **mouse**; perangkat sentuh tetap memakai swipe bawaan.
- Ada ambang gerak (4px): klik biasa (sorting header, tombol, pagination) tetap
  berfungsi; klik yang ternyata bagian dari drag otomatis dibatalkan (suppress).
- Seleksi teks dimatikan (`user-select: none`) selama drag.

**Ketentuan markup** — cukup bungkus tabel di `.table-responsive` (sudah wajib,
bagian 8.2). **Tidak ada markup tambahan** dan **tidak perlu** konfigurasi per
halaman; fitur ini otomatis aktif di semua tabel yang bisa scroll horizontal.

---

### 8.1 Kolom Aksi (wajib di setiap datatable)

Setiap tabel data punya kolom **Aksi** di **kolom ke-2 (tepat setelah No)**
berisi tombol aksi **ikon** memakai **varian soft** berukuran **`btn-sm`** dengan
warna **sesuai fungsi aksi** (lihat tabel standarisasi di bawah):

```html
<th scope="col" class="aksi" style="width: 7rem">Aksi</th>
```

```html
<td>
  <div class="d-flex gap-1">
    <a href="#!" class="btn btn-icon btn-sm btn-subtle-warning" title="Ubah" aria-label="Ubah"><i class="ti ti-pencil"></i></a>
    <a href="#!" class="btn btn-icon btn-sm btn-subtle-danger" title="Hapus" aria-label="Hapus"><i class="ti ti-trash"></i></a>
  </div>
</td>
```

**Standarisasi tombol Aksi (wajib):** semua tombol berukuran **`btn-sm`**,
warna *soft* ditentukan **per fungsi aksi**:

| Fungsi aksi | Warna (`btn-subtle-*`) | Ikon | `title` |
| --- | --- | --- | --- |
| Edit / Ubah | `warning` | `<i class="ti ti-pencil"></i>` | `Ubah` |
| Hapus | `danger` | `<i class="ti ti-trash"></i>` | `Hapus` |
| Detail / Lihat | `info` | `<i class="ti ti-file-search"></i>` | `Detail` / `Lihat` |
| Download / Unduh | `success` | `<i class="ti ti-download"></i>` | `Unduh` / `Download` |
| Aksi lain (tak terdefinisi) | `secondary` | sesuai kebutuhan | sesuai aksi |

| Aspek | Ketentuan |
| --- | --- |
| Kelas tombol | `btn btn-icon btn-sm btn-subtle-{color}` — **ikon saja**, ukuran `btn-sm` (2.1875rem) |
| Ubah | `btn-subtle-warning` + `<i class="ti ti-pencil"></i>` |
| Hapus | `btn-subtle-danger` + `<i class="ti ti-trash"></i>` |
| Pembungkus | `<div class="d-flex gap-1">` |
| Atribut | `title="{aksi}"` **dan** `aria-label` yang sama |
| Lebar kolom | `style="width: 7rem"` |
| Kelas `<th>` | `class="aksi"` — penanda kolom Aksi; dipakai `.table-sticky` agar **kolom ke-3** ikut menempel (bagian 8.2) |
| `data-list` | Kolom Aksi **tidak** dimasukkan ke `data-list` (tidak dicari/diurutkan) |
| `listjs-sorter` | **Tidak** dipakai pada `<th>` Aksi (tidak ada `data-sort`) |

- Tombol **Ubah** = `btn-subtle-warning`, **Hapus** = `btn-subtle-danger`.
  Aksi tambahan khusus (mis. "Kelola indikator", "Tambah sub standar") boleh
  mengikuti bila halaman memang butuh — memakai **`btn-subtle-secondary`**
  (semua aksi yang **tidak** termasuk edit/hapus/detail/download).
- Halaman **dokumen** (mis. **Laporan AMI**, **Upload Laporan RTM**) memakai
  aksi khusus varian **soft**: **Unduh/Download** = `btn-subtle-success` +
  `<i class="ti ti-download"></i>`, **Lihat** = `btn-subtle-info` +
  `<i class="ti ti-file-search"></i>` (keduanya `btn btn-icon btn-sm`).
- **Jangan** memakai varian solid (`btn-info`, `btn-danger`, `btn-success`,
  `btn-primary`) pada tombol aksi tabel — lihat bagian 16.5.
- Semua tombol Aksi memakai ukuran **`btn-sm`** — **jangan** `btn-xs`/`btn-lg`.
- Bila ada baris *empty state*, `colspan`-nya = **jumlah kolom termasuk Aksi**.
- Pada tabel lebar yang memakai `.table-sticky`, kolom Aksi berada di **kolom
  ke-2** dan ikut menempel di kiri bersama **kolom ke-3**, sehingga tombol tetap
  terjangkau tanpa scroll horizontal (bagian 8.2) — ini aktif hanya karena
  `<th>` Aksi diberi `class="aksi"`.

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
  Selain itu, tombol menampilkan **chevron status** (bawah = tertutup, atas =
  terbuka) di **paling kanan** tombol lewat pseudo-element `::after` — juga
  CSS-only (lihat bagian 7).
- **Tombol dropdown Kolom datatable**: `btn btn-white dropdown-toggle datatable-columns-toggle d-inline-flex align-items-center gap-2`
  + `<i class="ti ti-table-minus fs-5"></i>` + teks `Kolom`, dengan
  `data-bs-toggle="dropdown"` + `data-bs-auto-close="outside"` (lihat bagian 7
  → *Kontrol Kolom*). Chevron `::after`-nya memakai gaya **sama** dengan tombol
  Filter (berputar mengikuti `aria-expanded`).
- **Aksi tabel**: varian **soft** berukuran **`btn-sm`** —
  `btn btn-icon btn-sm btn-subtle-warning` (Ubah), `btn-subtle-danger` (Hapus),
  `btn-subtle-info` (Detail/Lihat), `btn-subtle-success` (Download/Unduh),
  `btn-subtle-secondary` (aksi lain) — lihat bagian 8.1.
- **Aksi halaman non-form** (mis. **Export Excel**): memakai gaya aksi utama —
  `btn btn-dark d-md-flex align-items-center gap-2` + ikon (mis.
  `<i class="ti ti-download"></i>`), diletakkan di **area aksi page header**
  (bagian 7), di samping tombol tour.
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
- **Warna value vs placeholder harus berbeda** (lihat `espmi-app.css` bagian 12):
  - **Value** (teks yang sudah diisi/dipilih) memakai warna teks normal
    (gray-800 / `--ds-body-color`) agar jelas terbaca.
  - **Placeholder** memakai gray-500 (tetap samar), sesuai theme.
  - **Saat kontrol fokus**, warna teks value **tidak boleh** ikut berubah
    menjadi gray-500 (perilaku bawaan theme yang salah). Override
    `.form-control:focus` / `.form-select:focus` di `espmi-app.css` bagian 12
    mempertahankan warna value (gray-800; dark gray-100).
  - Pada `<select>`, opsi default ("-- SEMUA --" / "-- Pilih --") dianggap
    placeholder dan diredupkan lewat class `.is-placeholder`, yang ditambahkan
    otomatis oleh `espmi-form-select.js` (dimuat di semua halaman ber-`select`).
    Karena itu **opsi placeholder harus diawali `-- `** (mis. `-- SEMUA --`) dan
    berada di posisi pertama; opsi bernilai nyata tidak boleh diawali `-- `.

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
<script src="../dist/assets/js/vendors/espmi-filter-badge.js"></script>
<script src="../dist/assets/js/vendors/espmi-form-select.js"></script>
<!-- skrip bersama eSPMI (semua halaman) -->
<script src="assets/js/espmi-toast.js"></script>
<script src="assets/js/espmi-about.js"></script>
<script src="assets/js/espmi-truncate.js"></script>
<script src="assets/js/espmi-drag-scroll.js"></script>
<!-- hanya pada halaman daftar data -->
<script src="../dist/assets/libs/list.js/dist/list.min.js"></script>
<script src="assets/js/espmi-datatable-columns.js"></script>
<script src="assets/js/espmi-datatable-crud.js"></script>
<!-- Vendor (mis. tour driver.js, hanya halaman yang memakai) -->
<link rel="stylesheet" href="assets/css/vendor/driver.css" /> <!-- di <head> -->
<script src="assets/js/vendor/driver.js"></script> <!-- opsional, sebelum skrip halaman -->
<script src="assets/js/espmi-tour.js"></script>
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
- `assets/js/espmi-datatable-columns.js` adalah skrip **bersama** eSPMI
  (berada di `espmi-admin/assets/js/`, bukan `dist/assets/`) yang mengisi menu
  dropdown **Kolom**. Muat tepat setelah `list.min.js` pada **semua** halaman
  ber-datatable (lihat bagian 7 → *Kontrol Kolom*).
- `assets/js/espmi-datatable-crud.js` adalah skrip **bersama** yang menangani
  aksi **Hapus** (modal konfirmasi + hapus baris) dan mendaftarkan instance
  List.js. Muat tepat setelah `espmi-datatable-columns.js` pada **semua**
  halaman ber-datatable (lihat bagian 16.6).
- `assets/js/espmi-toast.js` adalah skrip **bersama** (semua halaman) yang
  menyediakan `window.espmiToast(message, opts)` untuk notifikasi toast
  Bootstrap (lihat bagian 16.6 → *Notifikasi Toast*).
- `assets/js/espmi-about.js` adalah skrip **bersama** (semua halaman) yang
  menyuntikkan modal **Tentang** (`#espmiAboutModal`) untuk menu dropdown profil
  (lihat bagian 16.9).
- `assets/js/espmi-truncate.js` adalah skrip **bersama** (semua halaman) yang
  memberi tooltip otomatis pada teks yang terpotong ellipsis (bagian 16.7).
- `assets/js/espmi-drag-scroll.js` adalah skrip **bersama** (semua halaman) yang
  mengaktifkan geser horizontal tabel lebar dengan drag (bagian 8.3).
- `assets/js/espmi-editor.js` menginisialisasi **editor rich text Quill** pada
  elemen `[data-espmi-editor]` dan menyimpan instance di `element.espmiQuill`.
  Quill adalah editor **base template** (`../dist/assets/libs/quill/dist/quill.js`
  + `quill.snow.css` di `<head>`), jadi dimuat dari `dist` — sama seperti
  `bootstrap`/`list.js`, bukan disalin ke `assets/`. Pustaka Quill + skrip ini
  dimuat **hanya** pada halaman yang memakai editor (lihat bagian 16.10).
- Aset **vendor pihak ketiga** (mis. `driver.js`) diletakkan di subfolder
  khusus — `assets/js/vendor/` dan `assets/css/vendor/` — dan dimuat **hanya**
  pada halaman yang memakainya. Ini bukan override tema, sehingga tidak
  melanggar larangan mengubah `dist/assets/**`.

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
  - `.navbar-glass`, `#content` (latar area konten = `--ds-gray-100`), `#miniSidebar` — override tampilan eSPMI.
  - `.nav-heading` — label grup menu sidebar; diberi **garis tipis pemisah** di
    atasnya saat sidebar *expanded* / *offcanvas* (bagian 4.0 & CSS bagian 16).
    `html.collapsed` memakai `<hr class="nav-line">` bawaan tema.
  - `.bg-gradient-info/success/warning/danger` — gradient card eSPMI
    (**light mode saja**; dark mode tetap memakai gradient bawaan theme).
  - `.dashboard-widget*`, `.dashboard-customizing-only` — grid widget Dashboard yang
    dapat dikostumasi (bagian 18).
  - `.table-sticky` — kolom tetap untuk tabel lebar (bagian 8.2). Tabel ber-Aksi:
    No + Aksi + kolom ke-3; tabel laporan tanpa Aksi: No + kolom ke-2. Variabel
    `--espmi-table-sticky-left` = lebar kolom No = offset kolom ke-2;
    `--espmi-table-sticky-aksi` = lebar kolom Aksi (7rem);
    `--espmi-table-sticky-left-3` = offset kolom ke-3 (11.5rem); latar sel sticky
    di `<thead>` memakai `--ds-gray-100` dan di `<tbody>` memakai `--ds-card-bg`.
  - `.listjs-search` — lebar baku input pencarian datatable (`width: 200px`),
    menggantikan inline `style="max-width: 22rem"` (bagian 7).
  - `.border-gray-300` — mengeset `border-color` ke `--ds-gray-300`; dipakai
    garis pemisah **dashed** (`border-top border-dashed`) di atas baris filter
    datatable (bagian 7).
  - `.espmi-columns-menu` — menu dropdown **Kolom** (kontrol visibilitas kolom):
    lebar minimum, tinggi maksimum, dan `overflow-y: auto`; item terkunci
    diredupkan (bagian 7 → *Kontrol Kolom*).
  - `.datatable-filter-toggle[aria-expanded='true']` — keadaan "tertekan" tombol
    Filter saat baris filter terbuka (bagian 7 & 9).
  - `.datatable-filter-toggle::after` — chevron status tombol Filter (bawah =
    tertutup, atas = terbuka) di **paling kanan** tombol; CSS-only, tanpa
    markup ikon di HTML (bagian 7 & 9).
  - `.datatable-columns-toggle::after` — chevron tombol **Kolom** dengan gaya
    **sama** seperti tombol Filter (menimpa caret bawaan `.dropdown-toggle::after`),
    berputar mengikuti `aria-expanded` dropdown (bagian 7 → *Kontrol Kolom*).
  - `.active-filter-badge` — badge angka jumlah filter aktif di dalam tombol
    Filter (bagian 7 → *Indikator Filter Aktif*; dihitung `espmi-filter-badge.js`).
  - `.form-control`, `.form-select` + `.is-placeholder` — warna **value** (gray-800)
    vs **placeholder** (gray-500) pada input & select, termasuk **saat fokus**
    (`.form-control:focus` / `.form-select:focus`) (bagian 10 & 12; class
    `.is-placeholder` diset `espmi-form-select.js`).
  - `html[data-espmi-font='...']` + `.font-option*` — preferensi font sistem &
    kartu pilihan font (bagian 11 & 20).
  - `.espmi-readiness` — progress bar **kesiapan akreditasi** yang ramping (tinggi
    `0.5rem`, tepi membulat penuh, `min-width: 6rem`); dipakai di kolom
    *Visualisasi Akreditasi* (bagian 21).
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
2. Ganti `<title>`, `<h1>`, dan breadcrumb sesuai halaman baru — breadcrumb
   **wajib** mengikuti hierarki menu sidebar `Dashboard › Menu › Submenu ›
   Sub-submenu` sesuai level halaman (bagian 6), bukan label generik.
3. Sesuaikan state aktif sidebar pada **desktop + offcanvas** (menu induk
   `active`/`show`, submenu `active`, dan `href` yang benar). Pastikan item
   **grup bertingkat (level 3)** berada di dalam grupnya (mis. *Data Kegiatan
   PKM* di dalam *Lihat Data Pengabdian*), **bukan** sebagai menu top-level.
4. Sesuaikan **Periode Aktif** di navbar bila perlu.
5. Siapkan card list: `id`, `data-list`, kelas `<td>`, dan header kolom urut.
6. Susun **toolbar** sesuai standar: **kiri** = pencarian 200px (`.listjs-search`,
   tanpa inline style lebar) + tombol `Filter` (bila ada) di sebelah kanan input
   + tombol dropdown **Kolom**; **kanan** = selector `Per page` (10/25/50/100) —
   bagian 7 & 16.5. Bila ada filter, tambahkan tombol `Filter`
   (`.datatable-filter-toggle`) + baris `collapse` filter di dalam `.card-body`
   (bagian 7 → *Tata Letak Toolbar*), dan **badge indikator filter aktif**
   `.active-filter-badge` di dalam tombol (bagian 7 → *Indikator Filter Aktif*).
   Tambahkan juga dropdown **Kolom** (`data-columns-menu`) — bagian 7 →
   *Kontrol Kolom*.
7. Tambahkan kolom **Aksi** di **kolom ke-2 (setelah No)** berisi tombol ikon
   **soft** Ubah (`btn-subtle-info` + `ti ti-pencil`) dan Hapus
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
    filter), **badge indikator filter aktif** (pilih filter → angka tampil;
    kembalikan ke `-- SEMUA --` → badge hilang), dropdown **Kolom**
    (uncheck kolom → kolom hilang; kolom No/Aksi/ke-3 tetap terkunci), dan
    navigasi Prev/Next.
17. Uji **light & dark mode** serta tampilan **desktop & mobile** — dan bila
    tabel memakai `table-sticky`, pastikan header No + kolom identitas tetap
    menempel saat tabel di-scroll horizontal, serta tabel bisa digeser dengan
    **drag** (klik-tahan-geser area baris) — kursor `grab`/`grabbing` (bagian 8.3).
18. Khusus **Dashboard**: ikuti kontrak grid widget yang dapat dikostumasi
    (bagian 18) — atribut `data-widget`/`data-span`/`data-widget-title`, kelas
    pegangan & toolbar, widget terkunci `data-locked`, tombol hapus `data-removable`,
    panel Kartu Tersembunyi, dan urutan pemuatan aset dragula.
19. Uji mode kostumasi: drag urutan, ubah lebar 1–4, hapus kartu chart,
    pulihkan lewat chip/Tampilkan Semua, dan **Reset** — lalu muat ulang halaman
    untuk memastikan layout tersimpan.
20. Untuk halaman **non-datatable** (mis. `akun-preferensi.html`), lewati langkah
    tabel/toolbar List.js; tetap penuhi kerangka halaman (bagian 2), `<head>`
    (bagian 3), page header berikon (bagian 6), petunjuk `alert alert-info`
    (bagian 16.4), dan footer (bagian 11). Bila menambah preferensi baru, ikuti
    kontrak di bagian 20.
21. Verifikasi **notifikasi toast**: simpan form Tambah → muncul toast
    `Data berhasil disimpan`; hapus baris → muncul toast `Data berhasil dihapus`
    (bagian 16.6 → *Notifikasi Toast*).
22. Verifikasi **tooltip teks terpotong**: persempit jendela/sidebar hingga label
    menu terpotong → hover menampilkan teks lengkap (bagian 16.7).
23. **WAJIB** — setiap halaman menyediakan **tour** (driver.js): tombol
    `btn-subtle-secondary btn-icon` + `ti-help-circle` di **kiri** grup aksi page
    header; klik → tour berjalan dan langkah tersembunyi dilewati (bagian 16.8).
    Muat `driver.css` + `driver.js` + `espmi-tour.js` di halaman tersebut.
24. Tambahkan menu **Tentang** pada dropdown profil (tepat di bawah
    **Pengaturan Akun**), ikon `ti ti-info-circle` dan
    `data-bs-target="#espmiAboutModal"`, lalu muat `assets/js/espmi-about.js` —
    klik → modal "Tentang Aplikasi" tampil (bagian 16.9).

---

## 16. Aturan Tambahan (Standar Wajib)

Aturan-aturan berikut berlaku untuk **semua halaman** eSPMI dan wajib dipatuhi.

### 16.1 Judul Halaman Memakai Ikon Menu

Setiap judul halaman (`<h1>`) **wajib** diawali ikon Tabler webfont yang **sama**
dengan ikon menu sidebar halaman tersebut.

**Aturan ikon menurut level menu:**

- **Menu level 1** (item utama sidebar) → judul memakai ikon menu itu sendiri
  (ikon yang tampil di sidebar).
- **Submenu (level 2) dan sub-submenu (level 3)** → karena ikon level 2/3
  disembunyikan (bagian 4), judul memakai **ikon menu induk level 1**-nya.

```html
<!-- level 1 : ikon sendiri -->
<h1 class="mb-3 h2"><i class="ti ti-layout-dashboard"></i> Dashboard</h1>

<!-- level 2/3 : ikon induk level 1 -->
<h1 class="mb-3 h2"><i class="ti ti-folders"></i> Tahun Periode</h1>
```

| Halaman | Level | Ikon judul (`<h1>`) |
| --- | --- | --- |
| Dashboard (`dashboard.html`) | 1 | `<i class="ti ti-layout-dashboard"></i>` |
| Manajemen Referensi › Tahun Periode | 2 | `<i class="ti ti-folders"></i>` |
| Manajemen Referensi › Lembaga Akreditasi | 2 | `<i class="ti ti-folders"></i>` |
| Manajemen Referensi › Auditee Pusat | 2 | `<i class="ti ti-folders"></i>` |
| Manajemen Referensi › Auditee | 2 | `<i class="ti ti-folders"></i>` |
| Manajemen Referensi › Unit Penunjang | 2 | `<i class="ti ti-folders"></i>` |
| Manajemen Referensi › Master Standar Mutu | 2 | `<i class="ti ti-folders"></i>` |
| Manajemen Dokumen › Kategori Dokumen | 2 | `<i class="ti ti-file-text"></i>` |
| Manajemen Dokumen › Jenis Dokumen | 2 | `<i class="ti ti-file-text"></i>` |
| Manajemen Dokumen › Manajemen Dokumen | 2 | `<i class="ti ti-file-text"></i>` |
| Penetapan › Daftar Nilai Mutu | 2 | `<i class="ti ti-clipboard-check"></i>` |
| Penetapan › Daftar Standar Mutu | 2 | `<i class="ti ti-clipboard-check"></i>` |
| Evaluasi (AMI) › Manajemen Auditor | 2 | `<i class="ti ti-checklist"></i>` |
| Evaluasi (AMI) › Jenis Temuan | 2 | `<i class="ti ti-checklist"></i>` |
| Evaluasi (AMI) › Kategori Temuan | 2 | `<i class="ti ti-checklist"></i>` |
| Evaluasi (AMI) › Daftar Temuan Kolektif | 2 | `<i class="ti ti-checklist"></i>` |
| Evaluasi (AMI) › Rekap Desk Evaluation | 2 | `<i class="ti ti-checklist"></i>` |
| Evaluasi (AMI) › Laporan AMI | 2 | `<i class="ti ti-checklist"></i>` |
| Evaluasi (AMI) › Visualisasi Akreditasi | 2 | `<i class="ti ti-checklist"></i>` |
| Pengendalian & Peningkatan › Daftar Temuan | 2 | `<i class="ti ti-chart-line"></i>` |
| Pengendalian & Peningkatan › Daftar Kesesuaian | 2 | `<i class="ti ti-chart-line"></i>` |
| Pengendalian & Peningkatan › Draft Laporan RTM | 2 | `<i class="ti ti-chart-line"></i>` |
| Pengendalian & Peningkatan › Upload Laporan RTM | 2 | `<i class="ti ti-chart-line"></i>` |
| Integrasi SISter › Aktivasi Sister | 2 | `<i class="ti ti-plug-connected"></i>` |
| Integrasi SISter › Referensi Sister | 2 | `<i class="ti ti-plug-connected"></i>` |
| Integrasi SISter › Data Sister | 2 | `<i class="ti ti-plug-connected"></i>` |
| Integrasi Akademik › Data Akademik | 2 | `<i class="ti ti-school"></i>` |
| Pengaturan Sistem › Data Pengguna Portal | 2 | `<i class="ti ti-settings"></i>` |
| Pengaturan Sistem › Manajemen Pengguna | 2 | `<i class="ti ti-settings"></i>` |
| Pengaturan Sistem › Manajemen Menu | 2 | `<i class="ti ti-settings"></i>` |
| Pengaturan Sistem › Manajemen Group | 2 | `<i class="ti ti-settings"></i>` |
| Pengaturan Sistem › Manajemen Module | 2 | `<i class="ti ti-settings"></i>` |
| Pelaksanaan › Pengaturan Periode | 2 | `<i class="ti ti-clipboard-list"></i>` |
| Pelaksanaan › Target Nilai Mutu | 2 | `<i class="ti ti-clipboard-list"></i>` |
| Pelaksanaan › Evaluasi Diri | 2 | `<i class="ti ti-clipboard-list"></i>` |
| Pelaksanaan › Lihat Data Pendidikan › Data IPK | 3 | `<i class="ti ti-clipboard-list"></i>` |
| Pelaksanaan › Lihat Data Pendidikan › Data DO | 3 | `<i class="ti ti-clipboard-list"></i>` |
| Pelaksanaan › Lihat Data Pendidikan › Data Lulus Tepat | 3 | `<i class="ti ti-clipboard-list"></i>` |
| Pelaksanaan › Lihat Data Pendidikan › Data Tugas Akhir | 3 | `<i class="ti ti-clipboard-list"></i>` |
| Pelaksanaan › Lihat Data Penelitian › Data Penelitian | 3 | `<i class="ti ti-clipboard-list"></i>` |
| Pelaksanaan › Lihat Data Penelitian › Data Karya Ilmiah | 3 | `<i class="ti ti-clipboard-list"></i>` |
| Pelaksanaan › Lihat Data Penelitian › Data Publikasi Jurnal | 3 | `<i class="ti ti-clipboard-list"></i>` |
| Pelaksanaan › Lihat Data Pengabdian › Data Kegiatan PKM | 3 | `<i class="ti ti-clipboard-list"></i>` |
| Pelaksanaan › Lihat Data Pengabdian › Data Publikasi PKM | 3 | `<i class="ti ti-clipboard-list"></i>` |
| Pelaksanaan › Lihat Data Pengabdian › Data Bahan Ajar PKM | 3 | `<i class="ti ti-clipboard-list"></i>` |
| Pelaksanaan › Lihat Data Pengabdian › Data Isi PKM | 3 | `<i class="ti ti-clipboard-list"></i>` |
| Pelaksanaan › Lihat Data Pengabdian › Data Mutu Pelaksana PKM | 3 | `<i class="ti ti-clipboard-list"></i>` |
| Preferensi (`akun-preferensi.html`) | — *(menu profile dropdown)* | `<i class="ti ti-typography"></i>` |

- Ikon menu induk level 1: Manajemen Referensi = `ti-folders`,
  Manajemen Dokumen = `ti-file-text`, Penetapan = `ti-clipboard-check`,
  Pelaksanaan = `ti-clipboard-list`, Evaluasi (AMI) = `ti-checklist`,
  Pengendalian & Peningkatan = `ti-chart-line`, Integrasi SISter =
  `ti-plug-connected`, Integrasi Akademik = `ti-school`, Pengaturan Sistem =
  `ti-settings`.
- Nama ikon = nama ikon sidebar **tanpa** prefix `icon-tabler-`.
- **Semua** halaman wajib punya judul berikon, termasuk Dashboard: `dashboard.html`
  memakai `<h1 class="mb-3 h2"><i class="ti ti-layout-dashboard"></i> Dashboard</h1>` dengan
  breadcrumb satu item aktif (Dashboard adalah halaman saat ini).

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

Empat aturan wajib untuk **setiap card datatable**:

1. **Toolbar** — sisi **kiri** = input pencarian (**lebar tetap 200px** lewat
   kelas `.listjs-search`, **tanpa** inline style lebar) + tombol **Filter**
   (hanya bila ada filter) di **sebelah kanan** input + tombol dropdown
   **Kolom**; sisi **kanan** = selector **Per page (10, 25, 50, 100)**. Tombol
   Filter **tidak boleh** diletakkan di grup kanan atau di luar card (lihat
   bagian 7 → *Tata Letak Toolbar*).
2. **Baris filter** — bila datatable punya filter, baris filter diletakkan di
   dalam `.card-body` (tepat setelah baris toolbar), disembunyikan default
   sebagai `<div class="collapse" id="{idFilters}">`, dan dibuka oleh tombol
   `btn btn-white datatable-filter-toggle` + `data-bs-toggle="collapse"` +
   `data-bs-target="#{idFilters}"` + `aria-expanded="false"` +
   `aria-controls="{idFilters}"`. Tidak perlu JS tambahan (Bootstrap bundle sudah
   dimuat). Saat terbuka, tombol otomatis tampak "tertekan"
   (`.datatable-filter-toggle[aria-expanded='true']`).
3. **Kolom Aksi** — setiap datatable **wajib** memiliki kolom `Aksi` di
   **kolom ke-2 (setelah No)**, berisi tombol ikon **Ubah** (`ti ti-pencil`)
   dan **Hapus** (`ti ti-trash`) dengan **varian soft** `btn-subtle-*`
   berukuran **`btn-sm`** (Ubah = `btn-subtle-warning`, Hapus =
   `btn-subtle-danger`; lihat standarisasi warna di bagian 8.1). Bila tabel
   lebar memakai `.table-sticky`, kolom Aksi otomatis ikut menempel bersama
   **kolom ke-3** di kiri (bagian 8.2).
4. **Kontrol Kolom** — setiap datatable menampilkan tombol dropdown **Kolom**
   di sebelah kanan tombol Filter untuk menampilkan/menyembunyikan kolom
   (`checked` = tampil). **Tiga kolom pertama (No, Aksi, kolom ke-3) wajib
   selalu tampil** dan checkbox-nya `checked` + `disabled` (lihat bagian 7 →
   *Kontrol Kolom*). Menu diisi otomatis oleh
   `assets/js/espmi-datatable-columns.js`.

```html
<!-- header (kolom ke-2, tepat setelah kolom No) -->
<th scope="col" class="aksi" style="width: 7rem">Aksi</th>

<!-- sel -->
<td>
  <div class="d-flex gap-1">
    <a href="#!" class="btn btn-icon btn-sm btn-subtle-warning" title="Ubah" aria-label="Ubah"><i class="ti ti-pencil"></i></a>
    <a href="#!" class="btn btn-icon btn-sm btn-subtle-danger" title="Hapus" aria-label="Hapus"><i class="ti ti-trash"></i></a>
  </div>
</td>
```

- Tombol aksi tabel **wajib ikon saja** (`btn-icon`), ukuran **`btn-sm`**, dengan
  warna soft **sesuai fungsi** (Ubah = `btn-subtle-warning`, Hapus =
  `btn-subtle-danger`, Detail/Lihat = `btn-subtle-info`, Download =
  `btn-subtle-success`, aksi lain = `btn-subtle-secondary`) — lihat bagian 8.1.
- Kolom Aksi **tidak** dimasukkan ke `data-list` dan **tidak** diberi
  `listjs-sorter`.
- `colspan` baris *empty state* harus menghitung kolom Aksi.

### 16.6 Modal Dialog & Aksi Datatable (Tambah / Ubah / Hapus)

Aksi datatable berjalan **front-end saja** (tanpa backend). Semua dialog
memakai komponen **Bootstrap modal** (`bootstrap.bundle.min.js` sudah dimuat di
setiap halaman). Aturan tombol modal: batal = `btn btn-white`, simpan =
`btn btn-dark`, aksi destruktif (Hapus) = `btn btn-danger`.

#### Form Tambah

- Pemicu di **page header**: `btn btn-dark d-md-flex align-items-center gap-2`
  berikon Tabler (mis. `icon-tabler-plus`) + teks `Tambah`, dengan
  `type="button"` + `data-bs-toggle="modal"` + `data-bs-target="#{idModal}"`.
- Modal: `div.modal.fade` → `div.modal-dialog.modal-dialog-centered` →
  `div.modal-content` → `form` (wajib `novalidate`).

```html
<div class="modal fade" id="{idModal}" tabindex="-1" aria-labelledby="{idModalLabel}" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <form id="{idForm}" novalidate>
        <div class="modal-header">
          <h5 class="modal-title" id="{idModalLabel}">Tambah {Entitas}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Tutup"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label class="form-label" for="{idField}">{Label}</label>
            <input type="text" class="form-control" id="{idField}" required />
            <div class="invalid-feedback">{pesan validasi}</div>
          </div>
          <!-- field lain ... -->
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-white" data-bs-dismiss="modal">Batal</button>
          <button type="submit" class="btn btn-dark">Simpan</button>
        </div>
      </form>
    </div>
  </div>
</div>
```

- Validasi: pasang `novalidate` pada `<form>`, `form.classList.add('was-validated')`
  saat submit, lalu `if (!form.checkValidity()) return;`.
- `Simpan` menambah baris lewat `listjs.add({ ... })` (kunci objek = nama di
  `valueNames` datatable). Baris baru diletakkan di **paling atas**
  (`listjs.items.unshift` + `listjs.update()`), lalu kolom `No` diurutkan ulang
  dengan `window.espmiDatatable.renumber(listjs)`.
- Setelah simpan: tutup modal (`bootstrap.Modal.getOrCreateInstance(id).hide()`),
  reset form, lalu tampilkan **toast** `Data berhasil disimpan` (lihat
  *Notifikasi Toast* di bawah).
- Contoh acuan: `penetapan-standar-mutu.html` (modal *Tambah Nilai Mutu*).

#### Hapus (semua datatable)

- Tombol Hapus (`.btn-subtle-danger` + `title="Hapus"`) di dalam `tbody.list`
  otomatis membuka **modal konfirmasi** lewat skrip bersama
  `assets/js/espmi-datatable-crud.js`. Tidak perlu JS tambahan di halaman.
- Modal konfirmasi memakai judul `Konfirmasi Hapus` dan tombol **Batal**
  (`btn btn-white`) + **Hapus** (`btn btn-danger`).
- Setelah dikonfirmasi, baris benar-benar dihapus: item List.js di-`splice`,
  `<tr>` dibuang dari DOM, `list.update()`, lalu `No` diurutkan ulang dan
  muncul toast `Data berhasil dihapus`.
- Skrip juga membungkus konstruktor `List` untuk mendaftarkan instance
  (`window.espmiDatatableLists`) agar helper halaman bisa mengaksesnya.

#### Notifikasi Toast

- Helper bersama: `window.espmiToast(message, opts)` dari
  `assets/js/espmi-toast.js` (dimuat di semua halaman). Container
  `#espmiToastContainer` dibuat otomatis di pojok **kanan bawah**
  (`toast-container position-fixed bottom-0 end-0 p-3`).
- Opsi: `variant` (`success` default, `danger`, `warning`, `info`), `icon`
  (nama ikon Tabler tanpa `ti-`), `delay` (ms, default `3000`).
- Contoh: `window.espmiToast('Data berhasil disimpan')` dan
  `window.espmiToast('Data berhasil dihapus', { variant: 'danger', icon: 'trash' })`.
- Selalu bungkus dengan guard `if (window.espmiToast) { ... }`.

### 16.7 Tooltip Teks Terpotong (Ellipsis)

Setiap teks yang terpotong `text-overflow: ellipsis` **wajib** menampilkan
tooltip berisi **teks lengkap** saat di-hover. Ditangani otomatis oleh
`assets/js/espmi-truncate.js` (dimuat di semua halaman):

- Memindai elemen kandidat lalu hanya yang **benar-benar terpotong**
  (`scrollWidth > clientWidth` + `text-overflow: ellipsis`) yang diberi
  atribut `title` (tooltip bawaan peramban).
- Kandidat yang dipantau: `.nav-link .text` (**label menu sidebar**),
  `.text-truncate`, `.dropdown-item`, `.dropdown-header`, `.breadcrumb-item`,
  `.card-title`, `.list-group-item`, `.form-label`, `.table td`, `.table th`,
  dan elemen bertanda `data-truncate-tooltip`.
- Untuk elemen di luar daftar itu, tambahkan `data-truncate-tooltip`. Teks
  tooltip bisa dioverride lewat `data-truncate-text="..."`.
- Pemindaian ulang otomatis (debounced) saat: resize, toggle sidebar
  (perubahan class pada `<html>`), offcanvas/dropdown terbuka, dan perubahan
  isi DOM (pagination List.js, tambah/hapus baris).
- Larangan: jangan menulis teks ellipsis manual tanpa mekanisme ini, dan
  jangan menimpa `title` yang sudah dipakai untuk keperluan lain.

### 16.8 Tour Halaman (driver.js) — wajib di setiap halaman

**Setiap halaman eSPMI wajib memiliki tour tutorial** singkat yang menjelaskan
bagian-bagian penting halaman tersebut (tujuan, kontrol utama, area data, dan
aksi yang tersedia). Tour memakai **driver.js** (vendored di
`assets/js/vendor/driver.js` + `assets/css/vendor/driver.css`) dan mesin
deklaratif `assets/js/espmi-tour.js`.

#### Tombol pemicu (page header)

Tombol pemicu **selalu** diletakkan sebagai item **pertama** pada grup aksi di
sisi kanan judul halaman — yaitu **di sebelah kiri** tombol aksi lain (Tambah,
Reset, Kostumasi, dsb.) — berupa **tombol ikon saja**:

```html
<button
  type="button"
  id="btnTourHalaman"
  class="btn btn-subtle-secondary btn-icon"
  data-tour-start
  data-tour-intro-title="Tour {Nama Halaman}"
  data-tour-intro-text="{ringkasan singkat halaman}"
  aria-label="Mulai tour halaman"
  title="Tur halaman"
>
  <i class="ti ti-help-circle fs-5"></i>
</button>
```

- Kelas **wajib**: `btn btn-subtle-secondary btn-icon` + ikon `ti ti-help-circle`
  (`id="btnTourHalaman"` dipakai konsisten di semua halaman).
- Bila halaman belum punya grup aksi di header, buat wrapper
  `div.d-flex align-items-center gap-2` dan taruh tombol ini sebagai anak pertama.
- Urutan dalam grup aksi: **Tour → aksi lain** (Tambah/Reset/Kostumasi).

#### Penanda langkah (declarative)

Mesin tour membaca penanda `data-*` pada HTML (tanpa JS per halaman):

| Atribut | Ditempatkan pada | Fungsi |
| --- | --- | --- |
| `data-tour-start` | tombol pemicu | mengaktifkan klik untuk memulai tour |
| `data-tour-intro-title` | tombol pemicu | judul langkah pembuka (popover tengah, opsional) |
| `data-tour-intro-text` | tombol pemicu | deskripsi langkah pembuka (opsional) |
| `data-tour-step` | elemen target | menandai satu langkah; urut mengikuti urutan DOM |
| `data-tour-title` | elemen target | judul popover langkah |
| `data-tour-text` | elemen target | deskripsi popover langkah |
| `data-tour-side` | elemen target | `top`/`bottom`/`left`/`right` (opsional) |
| `data-tour-align` | elemen target | `start`/`center`/`end` (opsional, default `start`) |

- **Urutan langkah = urutan DOM** elemen bertanda `data-tour-step`; tidak perlu
  penomoran manual. Jumlah langkah disarankan **3–6**.
- Setiap tour mencakup minimal: (1) **aksi utama halaman**, (2) **kontrol/
  toolbar** (pencarian, Filter, Kolom, Per page), dan (3) **area data**
  (tabel/kartu). Tambahkan langkah khas halaman bila perlu.
- Elemen yang **tersembunyi** (`offsetWidth`/`offsetHeight` = 0, mis. panel
  khusus mode kostumasi) otomatis **dilewati**, jadi aman menandai elemen
  kondisional.

#### Pemuatan aset

Muat CSS driver di `<head>` (setelah `espmi-app.css`) dan skrip di akhir
`<body>` (`driver.js` **sebelum** `espmi-tour.js`) di **setiap halaman yang
punya tour**:

```html
<link rel="stylesheet" href="assets/css/vendor/driver.css" />
...
<script src="assets/js/vendor/driver.js"></script>
<script src="assets/js/espmi-tour.js"></script>
```

- Contoh acuan: `dashboard.html` (tour widget dashboard) dan
  `penetapan-standar-mutu.html` / `evaluasi-ami-jenis-temuan.html` /
  `evaluasi-ami-manajemen-auditor.html` (tour halaman daftar data).

### 16.9 Tentang Aplikasi (dropdown Profil)

Setiap halaman (kecuali `index.html`) memuat menu **Tentang** pada dropdown
profil di navbar, **tepat di bawah** menu **Pengaturan Akun**:

```html
<li>
  <a class="dropdown-item d-flex align-items-center" href="#!"
     data-bs-toggle="modal" data-bs-target="#espmiAboutModal">
    <i class="ti ti-info-circle"></i><span class="ms-2">Tentang</span>
  </a>
</li>
```

- Ikon **wajib** `ti ti-info-circle`.
- Modal `#espmiAboutModal` **tidak** ditulis di markup halaman, melainkan
  disuntikkan oleh `assets/js/espmi-about.js` (dimuat di semua halaman, tepat
  setelah `espmi-toast.js`). Skrip ini idempoten (dibuat sekali per halaman).
- Isi modal (urut): logo eSPMI (sama seperti sidebar —
  `../dist/assets/images/brand/logo/logo-icon.svg`), nama + tagline aplikasi,
  ringkasan aplikasi, **Versi Aplikasi** (`3.1.7.0`, samakan dengan footer),
  **Hak Cipta** (`© 2021 PT. Solusi Kampus Indonesia`), lalu footer berisi
  tautan **Kebijakan Privasi** & **Ketentuan Layanan** (`#!`) dan tombol
  **Tutup** (`btn btn-white`).
- Modal memakai `modal-dialog-centered`; tombol tutup sudut kanan atas
  (`btn-close`) juga disediakan.

### 16.10 Halaman Tree - Daftar Standar Mutu (`penetapan-daftar-standar-mutu.html`)

Halaman ini memakai **tree bertingkat** (baris `<tr class="collapse show g-*">`),
bukan datatable List.js, sehingga toolbar mengikuti pola baku (bagian 7 & 16.5)
**tanpa** `Per page`, pagination, dan `data-list`. Aturan standar halaman ini:

- **Kolom** (4): `Standar Mutu` (45%) | `Indikator` (15%, `text-center`) |
  `Info Jenjang` (15%, `text-center`, `data-espmi-hidden-default` + atribut
  `hidden`) | `Aksi` (25%, `class="aksi"`, **paling kanan**). Setiap sel
  `Info Jenjang` bernilai **`Prodi`** pada data contoh.
- **Kolom Aksi di paling kanan** (menyimpang dari bagian 8.1 yang menaruhnya di
  kolom ke-2, karena halaman ini tanpa kolom No). Karena itu kolom terkunci
  ditentukan eksplisit lewat `data-espmi-locked` pada `<th>` **Standar Mutu**,
  **Indikator**, dan **Aksi** (bagian 7 → *Kontrol Kolom*); **`Info Jenjang`**
  adalah satu-satunya kolom yang bisa disembunyikan dan **tersembunyi secara
  default**.
- **Tombol Aksi per tingkatan** (semua `btn-sm`, urut kiri→kanan):
  - **Standar Level 1-3** (punya turunan): **Tambah** (ikon `ti ti-plus`,
    `btn-subtle-secondary`, `data-espmi-add`) → **Ubah** (ikon `ti ti-pencil`,
    `btn-subtle-warning`, `data-espmi-edit`) → **Hapus** (ikon `ti ti-trash`,
    `btn-subtle-danger`, `data-espmi-hapus`).
  - **Standar Level 4** (daun, tanpa turunan): hanya **Ubah** + **Hapus**.
- **Isi sel khusus baris Standar Level 4**:
  - **Kolom `Standar Mutu`** — setelah nama standar ditambahkan **badge risiko**
    dari input **`Tingkat`** (tab *Manajemen Risiko*) saat tambah:
    **`Resiko Rendah`** = `badge bg-success-subtle text-success-emphasis`,
    **`Resiko Sedang`** = `badge bg-warning-subtle text-warning-emphasis`,
    **`Resiko Tinggi`** = `badge bg-danger-subtle text-danger-emphasis`
    (semua `text-nowrap`). Nilai disimpan pada `data-espmi-risiko`
    (`Rendah` / `Sedang` / `Tinggi`).
  - **Kolom `Indikator`** — berisi dua hal (sel `text-center`):
    1. **Link `N Indikator`** (`a.link-primary.fw-semibold.d-block`, atribut
       `data-espmi-indikator`) yang membuka modal **`#espmiIndikatorModal`**;
       `N` = jumlah textarea terisi pada modal (default **0**).
    2. **Badge jenis indikator** dari input **`Jenis Indikator`** saat tambah
       (tepat di bawah link, `mt-1`; **tanpa label `Informasi`**):
       **`Kualitatif`** = `badge bg-success-subtle text-success-emphasis`,
       **`Kuantitatif`** = `badge bg-info-subtle text-info-emphasis`. Nilai
       disimpan pada `data-espmi-jenis`.
- **Modal `#espmiIndikatorModal`** (`Input Indikator`,
  `modal-dialog-centered`): form `#espmiIndikatorForm` (di dalam `modal-body`)
  berisi **5 `textarea.form-control`** (`data-espmi-ind`, `rows="2"`)
  berpasangan dengan label: `1 (Kurang)`, `2 (Cukup Baik)`, `3 (Baik)`,
  `4 (Sangat Baik)`, `0 (kurang banget)` (layout
  `row g-3 align-items-center`, label `col-4`, textarea `col-8`). Footer
  **`Batal`** (`btn-white`) + **`Simpan`** (`btn-dark`, tombol memakai
  atribut `form="espmiIndikatorForm"`). Simpan menyimpan nilai ke
  `data-espmi-ind` (JSON array 5 elemen) pada baris terkait, memperbarui teks
  link menjadi `N Indikator`, lalu toast `Data berhasil disimpan`.
- **Tombol toolbar tambahan**, memakai gaya objek yang sama
  (`btn btn-white d-inline-flex align-items-center gap-2`), diletakkan di
  **grup kanan toolbar** (sisi kanan baris pencarian/filter, menggantikan
  `Per page` yang tidak dipakai halaman ini):
  1. **Buka/Tutup semua** — `id="espmiTreeToggleAll"`, ikon `ti ti-arrows-minimize`
     saat terbuka dan `ti ti-arrows-maximize` saat tertutup, label berganti
     `Collapse all` / `Expand all`; membuka/menutup **seluruh** tingkatan.
  2. **Atur urutan** — `id="espmiTreeAtur"`, ikon `ti ti-arrows-sort`. Klik =
     masuk **mode drag-to-reorder** (bukan modal):
     - `<table>` diberi class `.espmi-reordering`; seluruh `tr` di `tbody`
       menjadi `draggable="true"` (kursor `grab`).
     - **Aturan valid**: **Level 1** boleh dipindah antar sesama Level 1
       (satu **blok** = baris level-1 + seluruh turunannya); **Level 2-4**
       hanya boleh dipindah **dalam lingkup satu level pada induk (parent)
       yang sama**.
     - Baris target valid diberi penanda garis atas/bawah (`inset box-shadow`
       warna `--ds-primary`, class `espmi-drop-before`/`espmi-drop-after`);
       baris yang diseret diredupkan (`espmi-dragging`).
     - Selama mode aktif, hanya **tombol aksi** yang dinonaktifkan
       (`disabled`; tombol `<a class="btn">` memakai class `.disabled` +
       `aria-disabled`): tombol **Tambah** header dan **tombol Aksi** tiap
       baris. Input **pencarian**, **Filter**, **Kolom**, dan tombol
       **Buka/Tutup semua** tetap **aktif**. Tombol **Atur urutan** berganti
       menjadi **`Batal`** (`btn-white`, `id="espmiTreeAturBatal"`, **tanpa
       ikon**) + **`Simpan`** (`btn-dark`, `id="espmiTreeAturSimpan"`, **tanpa
       ikon**) di grup kanan toolbar, dengan **Buka/Tutup semua tetap tampil
       di sebelah kiri `Batal`**.
     - **Simpan** keluar dari mode + toast `Data berhasil disimpan`;
       **Batal** mengembalikan urutan seperti saat masuk mode (snapshot) lalu
       keluar tanpa toast. Banner petunjuk `#espmiReorderHint` (alert) tampil
       selama mode aktif. (CSS: `espmi-app.css` bagian 19.)
- **Pencarian** (`#daftarStandarMutuSearch`, tetap `.listjs-search` 200px)
  menyaring **baris tree**: saat mengetik, `<table>` diberi class
  `.espmi-tree-searching` (CSS `espmi-app.css` bagian 6 membuka semua
  `tr.collapse` dan menyembunyikan `tr.espmi-tree-hidden`) agar baris yang cocok
  tetap terlihat walaupun berada di grup yang tertutup.
- **Filter** (pola baku bagian 7): **Tahun** (`width: 10rem`), **Lembaga
  Akreditasi** (`width: 12rem`), dan **Jenjang** (`width: 10rem`); opsi pertama
  tiap select = `-- SEMUA --`. Opsi filter **Jenjang**: `-- SEMUA --`, `Prodi`,
  `Direktorat`.
- **Tambah / Ubah Data Standar Mutu** — memakai **satu modal bersama**
  `#espmiTambahStandarModal` (`modal-lg`, `modal-dialog-centered
  modal-dialog-scrollable`). Isi form (label di atas field, footer `btn btn-white`
  Batal + `btn btn-dark` Simpan — bagian 16.6):
  **Parent Standar Mutu** (input teks, `disabled`, hanya tampil saat relevan),
  **Tahun** (select: 2022-2026, **`disabled`**), **Lembaga Akreditasi** (select:
  SPMI, BAN-PT, LAM-PTKes, LAMEMBA, LAMDIK, LAM Teknik, LAM INFOKOM,
  **`disabled`**), **Nama Standar** (rich text editor), **Kategori** (select,
  **`disabled`**), dan **Jenjang** (select: Prodi, Direktorat). Field
  **Tahun/Lembaga/Kategori selalu `disabled`** (konteks halaman, tidak diubah
  user).
  - **Rich text editor**: memakai **Quill** (editor bawaan base template,
    `dist/assets/libs/quill/dist/{quill.js,quill.snow.css}`) yang diinisialisasi
    oleh `assets/js/espmi-editor.js` pada elemen `[data-espmi-editor]`
    (`assets/js/vendor/*` untuk aset pihak ketiga; Quill berasal dari `dist`,
    jadi dimuat dari sana). Instance tersimpan di `element.espmiQuill`; halaman
    membacanya lewat `espmiQuill.getText().trim()` (fallback ke `textContent`) dan
    mengisinya kembali lewat `espmiQuill.setText(...)`.
  - **Tambah (header)** — tombol header (`btn btn-dark` + `ti ti-plus`) membuka
    modal berjudul `Tambah Data Standar Mutu`, **Parent disembunyikan**; Simpan
    menambah **standar level-1 (root)** baru di akhir `tbody`
    (`table-light fw-semibold`), lengkap dengan caret + grup anaknya sendiri.
  - **Tambah (baris level 1-3)** — tombol **Tambah** membuka modal **yang sama
    persis** (judul `Tambah Data Standar Mutu`) dengan tambahan field **Parent
    Standar Mutu**: otomatis terisi **nama baris yang diklik** dan `disabled`.
    Simpan menambah **sub-standar (anak)** satu tingkat lebih dalam, disisipkan
    setelah seluruh turunan induknya; anak level-4 tidak diberi tombol Tambah.
  - **Tambah (baris level 3 → Standar Mutu Level 4)** — hasilnya adalah standar
    **daun (level 4)**, sehingga modal memakai **form lengkap**: muncul **tab
    navigasi** (`ul.nav.nav-pills` + `data-bs-toggle="pill"`, bagian 20.2)
    berisi **`Standar Mutu`** dan **`Manajemen Risiko`** — **tanpa `nav-fill`**,
    sehingga lebar tiap pill mengikuti labelnya (*fit-content*), bukan memenuhi
    lebar container — plus field
    tambahan (tersembunyi pada mode simpel) mengikuti urutan:
    `Tahun` → `Lembaga Akreditasi` → `Parent Standar Mutu` → `Nama Standar` →
    **`Data Dukung`** (rich text) → `Kategori` (**`Sub Standar`**) → `Jenjang` →
    **`Deskripsi`** (rich text) → **`Jenis Indikator`** (select: Kuantitatif,
    Kualitatif) → **`Plotting Unit Kerja`** (input teks) →
    **`Syarat Perlu Akreditasi`** (select: Tidak, Ya).
    - Tab **Manajemen Risiko**: **Aktifkan Manajemen Risiko** (radio Ya/Tidak,
      default **Tidak**), **Risiko** (textarea), **Penyebab Risiko**,
      **Dampak Risiko**, **Tingkat** (select: Rendah, Sedang, Tinggi, default
      Tinggi), **Strategi Mitigasi** — semua `textarea.form-control`.
    - Saat modal dibuka, tab aktif selalu dikembalikan ke **`Standar Mutu`** dan
      field tambahan di-reset.
    - Karena form cukup panjang, **body modal dibuat *scrollable*** agar
      `modal-footer` (tombol **Batal**/**Simpan**) tetap terlihat: modal memakai
      `modal-dialog-scrollable` + tinggi pasti pada `.modal-dialog`,
      `.modal-content`, dan `.modal-content > form` (dijadikan kolom flex,
      sebab form membungkus header/body/footer), lalu `.modal-body` diberi
      `overflow-y:auto`. Aturan di `espmi-admin/assets/css/espmi-app.css`
      bagian 18 (di-scope ke `#espmiTambahStandarModal`).
  - **Ubah (semua baris)** — tombol **Ubah** membuka modal berjudul
    `Ubah Data Standar Mutu`, terisi data baris tsb: **Nama Standar** (editable)
    dan **Jenjang** (editable), sedangkan **Tahun/Lembaga/Kategori** (dan
    **Parent**, bila baris punya induk) tetap `disabled`. Simpan **mengubah data
    di tabel** (teks nama + sel `Info Jenjang` baris itu).
  - Nama kosong → pesan error, tidak ada perubahan. Setelah Simpan: toast
    `Data berhasil disimpan`, modal ditutup, form + editor dikosongkan.
- **Hapus** — tombol **Hapus** membuka modal konfirmasi
  `#espmiHapusStandarModal` (judul `Konfirmasi Hapus`, menampilkan nama standar)
  dengan tombol **Batal** (`btn btn-white`) + **Hapus** (`btn btn-danger`,
  bagian 16.6). Setelah dikonfirmasi, baris **beserta seluruh turunannya**
  dibuang dari DOM, lalu toast `Data berhasil dihapus`
  (`{ variant: 'danger', icon: 'trash' }`).
- **Tour** (bagian 16.8) mencakup langkah pencarian, filter, kolom, buka/tutup
  semua, atur urutan, dan tabel; tombol tour berada di kiri tombol **Tambah**.
- Baris level-1 memakai `<tr class="table-light fw-semibold">`; grup anak memakai
  class `g-*` yang menjadi target `data-bs-target=".g-*"` pada caret
  `.tree-toggle` (caret berputar mengikuti `aria-expanded`, bagian 13). Skrip
  menyimpan grup anak tiap baris pada `data-espmi-cg` agar penambahan anak tahu
  class collapse yang dipakai.

---

## 17. Do & Don't

**Do**

- Ikuti halaman acuan: struktur, urutan aset, class, dan penamaan.
- Terapkan perubahan sidebar di desktop **dan** offcanvas.
- Tulis semua override styling di `espmi-app.css`.
- Jaga konsistensi label (judul = breadcrumb = menu sidebar).
- Pakai `.listjs-search` (200px) & `table-sticky` bila tabel memang melebar
  horizontal, dan biarkan `espmi-drag-scroll.js` membuat tabel lebar bisa
  digeser dengan **drag** (bagian 7, 8.2, 8.3, 16.5).
- Gunakan modal Bootstrap untuk form **Tambah** & konfirmasi **Hapus**
  (bagian 16.6).
- Tampilkan notifikasi aksi memakai `window.espmiToast(...)` (bagian 16.6 →
  *Notifikasi Toast*), dan andalkan `espmi-truncate.js` untuk tooltip teks
  terpotong (bagian 16.7).
- Sediakan **tour** (driver.js) di **setiap** halaman dengan tombol
  `btn-subtle-secondary btn-icon` berikon `ti-help-circle` di kiri grup aksi
  (bagian 16.8).
- Pisahkan **grup menu sidebar** dengan garis tipis — cukup memakai pola grup
  `nav-heading` + `<hr class="nav-line">`; garis tampil otomatis di desktop
  (expanded) & offcanvas (bagian 4.0, CSS bagian 16).
- Sertakan menu **Tentang** di dropdown profil (bawah **Pengaturan Akun**) dan
  muat `assets/js/espmi-about.js` (bagian 16.9).

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
- Jangan meletakkan tombol `Filter` datatable di grup **kanan** toolbar, di luar
  card, atau langsung menampilkan barisnya tanpa tombol toggle — tombol `Filter`
  selalu berada di grup **kiri** (di sebelah kanan input pencarian) dan membuka
  baris `collapse` di dalam `.card-body` (lihat bagian 7 & 16.5).
- Jangan menghilangkan tombol dropdown **Kolom** dari toolbar datatable, dan
  jangan mengizinkan kolom **No / Aksi / kolom ke-3** disembunyikan — tiga kolom
  itu wajib `checked` + `disabled` (lihat bagian 7 & 16.5).
- Jangan menulis inline `style="max-width: 22rem"` pada input pencarian
  datatable — lebar baku 200px sudah diatur `.listjs-search` (bagian 7 & 13).
- Jangan memakai `table-sticky` pada tabel yang tidak bisa scroll horizontal
  (mis. 3 kolom) atau meletakkannya di luar `.table-responsive`
  (lihat bagian 8.2).
- Jangan mengandalkan **scroll bar** saja untuk tabel lebar — area tabel wajib
  bisa digeser dengan **drag** (klik-tahan-geser) via `espmi-drag-scroll.js`
  (lihat bagian 8.3).
- Jangan memberi latar `--ds-card-bg` pada sel sticky di `<thead>` — header sticky
  wajib memakai `--ds-gray-100` yang sama dengan `.table thead`, kalau tidak kolom
  No/kolom identitas/Aksi berbeda warna dari kolom header lain (lihat bagian 8.2).
- Jangan mengubah offset `left` kolom sticky ke-2 (dan ke-3) tanpa menyesuaikan
  lebar kolom No / kolom Aksi dan penutup celahnya (`--espmi-table-sticky-left`,
  `--espmi-table-sticky-aksi`, `--espmi-table-sticky-left-3`); celah antar kolom
  sticky tampil sebagai garis putih pada baris hover (lihat bagian 8.2).
- Jangan membuat datatable (non-read-only) tanpa kolom **Aksi** (Ubah + Hapus)
  di **kolom ke-2** setelah No (lihat bagian 8.1 & 16.5).
- Jangan menghapus baris datatable tanpa **modal konfirmasi**, dan jangan
  memakai varian tombol lain di modal: Batal `btn-white`, Simpan `btn-dark`,
  Hapus `btn-danger` (lihat bagian 16.6).
- Jangan menulis logika hapus/tambah baris per halaman; pakai skrip bersama
  `espmi-datatable-crud.js` (bagian 12 & 16.6).
- Jangan menutup form Tambah tanpa menampilkan toast `Data berhasil disimpan`,
  dan jangan membuat sistem toast sendiri — pakai `window.espmiToast`
  (bagian 16.6).
- Jangan membiarkan teks yang terpotong ellipsis tanpa tooltip teks lengkap,
  dan jangan menimpa `title` yang sudah dipakai untuk keperluan lain
  (bagian 16.7).
- Jangan memakai tombol/label teks untuk pemicu tour — gunakan tombol ikon
  `btn-subtle-secondary btn-icon` + `ti-help-circle` (bagian 16.8).
- Jangan memakai varian tombol **solid** (`btn-info`, `btn-danger`,
  `btn-success`, `btn-primary`) untuk aksi di dalam tabel; pakai varian **soft**
  `btn-subtle-*` (lihat bagian 8.1 & 9).
- Jangan menghapus `espmi-font.js` atau salah satu dari empat `link` Google Fonts
  dari `<head>` — preferensi font (bagian 20) akan gagal diterapkan.
- Jangan memuat `espmi-font.js` di akhir `<body>`; ia **wajib** di `<head>`
  sebelum CSS agar font tidak berkedip (bagian 3 & 20).
- Jangan menambah item menu di dropdown Profile Menu tanpa ikon Tabler dan
  tanpa mengikuti urutan **Profil → Preferensi → Pengaturan Akun → Logout**
  (bagian 5.1).

---

## 18. Kartu Statistik Dashboard yang Dapat Dikostumasi

Dashboard (`dashboard.html`) memakai **satu grid widget 4 kolom** yang dapat diubah
pengguna: kartu bisa **digeser urutannya** (drag & drop) dan **diubah lebarnya**
(1–4 kolom). Grid memuat kartu statistik *dan* kartu chart.

### 18.1 Kontrak Grid & Widget

```html
<div class="row g-6 mb-6" id="dashboardWidgetGrid">

  <div class="dashboard-widget-col col-12 col-md-6 col-xl-3" data-widget="auditee" data-span="1">
    <div class="card card-lg border-1 bg-gradient-info h-100 dashboard-widget dashboard-widget--gradient">
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

- Semua chart Dashboard dirender dari satu fungsi `renderAllCharts()` di dalam IIFE
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

- Muat dragula **hanya** pada halaman yang memakai grid widget (saat ini Dashboard).
- ApexCharts sudah dimuat Dashboard dan dipakai untuk sparkline.

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

Pengguna dapat "menghapus" kartu **chart** dari Dashboard tanpa menghilangkannya
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

---

## 19. Halaman "Lihat Data" (laporan pendidikan)

Halaman `pelaksanaan-lihat-data-pendidikan-data-ipk.html` (Data IPK) adalah
acuan pola **halaman laporan** di dalam grup **Lihat Data Pendidikan**.
Struktur konten, berurutan:

1. **Page header** — `h1.h2` dengan ikon Tabler webfont `<i class="ti ...">`
   (ikon sama dengan menu sidebar level 3, mis. `ti-award`); di bawah judul
   breadcrumb struktur penuh sesuai hierarki menu (bagian 6), mis.
   `Dashboard` → `Pelaksanaan` → `Lihat Data Pendidikan` → `Data IPK`.
2. **Tab navigasi** — `ul.nav.nav-pills` dengan `data-bs-toggle="pill"`
   (mis. *Monitoring IPK / Evaluasi IPK / Evaluasi Masa Studi*), diikuti
   `div.tab-content` berisi `div.tab-pane`.
3. **Tabel data** — mengikuti **pola datatable baku (bagian 7 & 16.5)**:
   satu `div.card.card-lg.border-1` berisi **toolbar → baris filter (collapse) →
   tabel → footer pagination**. Toolbar memakai
   `justify-content-md-between`: **kiri** = input pencarian
   (`form-control listjs-search`) + tombol **Filter**
   (`btn btn-white datatable-filter-toggle`) di sebelah kanan input + tombol
   dropdown **Kolom**; **kanan** = selector **Per page**.
   Filter (Tahun Lulus, Auditee) **tidak** lagi diletakkan di
   card terpisah, melainkan di dalam `<div class="collapse" id="{idFilters}">`
   tepat setelah baris toolbar, dibuka oleh tombol Filter. Kolom: No, NIM,
   Nama Lulusan, IPK, Tahun Lulus, Lama Studi, Prodi; selaraskan `class` sel
   dengan `data-sort` pada `listjs-sorter`.
4. **Statistik** — `h4` "Statistik" + `table` ringkas (Minimum / Maksimum /
   Rata-rata) tanpa `table-bordered` (bagian 16.3).
6. **Grafik** — `div.card.card-lg` dengan `card-header` "Grafik Statistik IPK"
   dan `div#ipkStatChart` di dalam `card-body`. Chart ApexCharts (bar
   berkelompok) diinisialisasi di IIFE akhir `<body>` dengan **guard
   visibilitas** `offsetParent !== null` (bagian 18.4) dan dirender ulang pada
   event `shown.bs.tab`.

Catatan:

- Karena halaman ini hanya **menampilkan** data (read-only), kolom **Aksi
  tidak ditampilkan** — ini pengecualian terhadap aturan "setiap datatable
  wajib punya kolom Aksi" (bagian 8.1/16.2).
- ApexCharts dimuat di halaman ini:
  `<script src="../dist/assets/libs/apexcharts/dist/apexcharts.min.js"></script>`.
- Filter antar-tab (Evaluasi IPK / Evaluasi Masa Studi) masih berupa
  `alert alert-info` placeholder sampai datanya tersedia.
- Halaman laporan **sederhana** — `pelaksanaan-lihat-data-pendidikan-data-do.html`,
  `pelaksanaan-lihat-data-pendidikan-data-lulus-tepat.html`,
  `pelaksanaan-lihat-data-pendidikan-data-tugas-akhir.html`,
  `pelaksanaan-lihat-data-penelitian-data-penelitian.html`,
  `pelaksanaan-lihat-data-penelitian-data-karya-ilmiah.html`,
  `pelaksanaan-lihat-data-penelitian-data-haki.html`,
  `pelaksanaan-lihat-data-penelitian-data-publikasi-jurnal.html`,
  `pelaksanaan-lihat-data-pengabdian-data-kegiatan-pkm.html`,
  `pelaksanaan-lihat-data-pengabdian-data-publikasi-pkm.html`,
  `pelaksanaan-lihat-data-pengabdian-data-bahan-ajar-pkm.html`,
  `pelaksanaan-lihat-data-pengabdian-data-isi-pkm.html`, dan
  `pelaksanaan-lihat-data-pengabdian-data-mutu-pelaksana-pkm.html` — mengikuti **hanya**
  langkah 1 + 3 di atas (page header + datatable baku), tanpa tab, statistik,
  atau grafik. Kolom disesuaikan dengan data tiap laporan.

---

## 20. Halaman Preferensi (Font Sistem)

Halaman `akun-preferensi.html` dibuka dari **dropdown Profile Menu → Preferensi**
(bagian 5.1). Halaman ini mengatur preferensi pengguna yang berlaku **global** di
seluruh halaman eSPMI. Saat ini berisi satu preferensi: **Font Sistem**.

### 20.1 Kontrak Preferensi Font

| Aspek | Ketentuan |
| --- | --- |
| Kunci `localStorage` | **`espmiFont`** |
| Nilai | `inter` (default), `roboto`, `google-sans`, `open-sans` |
| Penerapan | Atribut `data-espmi-font` pada `<html>`, di-set oleh `espmi-font.js` |
| Skrip | `../dist/assets/js/vendors/espmi-font.js` (dimuat di `<head>`) |
| Pemetaan CSS | `espmi-app.css` bagian 11 → `--ds-font-sans-serif` |
| API global | `window.espmiFont` (`get()`, `set(key)`, `apply(key)`, `key`, `defaultFont`, `fonts`) |

- `espmi-font.js` memetakan nilai tersimpan ke atribut `data-espmi-font` pada
  `<html>` **segera saat dieksekusi** (sebelum body dirender) sehingga tidak
  terjadi *flash* font bawaan.
- CSS memetakan `html[data-espmi-font='...']` ke variabel `--ds-font-sans-serif`
  yang dipakai `--ds-body-font-family`, sehingga **seluruh** teks halaman
  (body, sidebar, navbar, tabel) ikut berubah. Ikon Tabler tidak terpengaruh
  karena memakai `font-family: tabler-icons`.
- Nilai tidak dikenal / belum di-set otomatis jatuh ke **Inter** (default).

### 20.2 Struktur Halaman

1. **Page header** — `h1.h2` berikon `<i class="ti ti-typography"></i>`,
   breadcrumb `Dashboard` → `Preferensi` (item aktif).
2. **Card `card-lg`** berisi heading `Font Sistem` + deskripsi, lalu grid
   pilihan font `row g-3` (4 opsi: `col-12 col-md-6 col-xl-3`).
3. Setiap opsi memakai pola **Bootstrap `btn-check`**:

   ```html
   <div class="col-12 col-md-6 col-xl-3 font-option" data-font="roboto">
     <input type="radio" class="btn-check" name="espmiFont" id="espmiFontRoboto" value="roboto" autocomplete="off" />
     <label class="card card-lg border-1 h-100 mb-0" for="espmiFontRoboto">
       <div class="card-body d-flex flex-column gap-3">
         <div class="d-flex align-items-center justify-content-between gap-2">
           <span class="fw-semibold">Roboto</span>
           <i class="ti ti-circle-check-filled fs-4 text-primary font-option-check"></i>
         </div>
         <div class="font-option-preview text-body">Aa Bb Cc</div>
         <p class="mb-0 small text-secondary">Roboto &mdash; font geometris yang netral.</p>
       </div>
     </label>
   </div>
   ```

4. **Petunjuk** memakai `alert alert-info` (bagian 16.4).
5. **Footer** standar (bagian 11).

- Semua radio memakai `name="espmiFont"`; `value` = nilai yang sama dengan kunci
  font di `espmi-font.js`.
- Ikon centang (`.font-option-check`) **hanya tampil** saat kartu terpilih
  (CSS: `.btn-check:checked + label.card`).
- Preview `Aa Bb Cc` (`.font-option-preview`) dirender dengan font aslinya
  masing-masing agar pengguna bisa membandingkan.
- Skrip halaman (IIFE di akhir `<body>`) menyinkronkan radio tercentang dengan
  `espmiFont.get()` lalu memanggil `espmiFont.set(value)` saat `change`.
- Halaman ini **tidak** memiliki item sidebar aktif (bukan bagian menu sidebar);
  sidebar dibiarkan dalam keadaan normal (tidak ada `active`/`show`).

### 20.3 Kelas CSS Terkait (`espmi-app.css` bagian 11)

| Kelas | Fungsi |
| --- | --- |
| `.font-option` | pembungkus satu pilihan (menyimpan `data-font`) |
| `.font-option .btn-check:checked + label.card` | gaya kartu terpilih (border & latar primary) |
| `.font-option-check` | ikon centang; `visibility: hidden` kecuali saat terpilih |
| `.font-option-preview` | contoh teks "Aa Bb Cc" dengan font masing-masing |

---

## 21. Halaman Visualisasi (Kesiapan Akreditasi)

Halaman `evaluasi-ami-visualisasi-akreditasi.html` (grup **Evaluasi (AMI)**)
adalah acuan pola **halaman visualisasi read-only**. Struktur konten, berurutan:

1. **Page header** — `h1.h2` berikon `<i class="ti ti-checklist"></i>` (ikon
   menu induk level 1 *Evaluasi (AMI)*, bagian 16.1); breadcrumb
   `Dashboard` → `Evaluasi (AMI)` → `Visualisasi Akreditasi`.
2. **Petunjuk** — `alert alert-info` (bagian 16.4) di **atas** card, berisi
   "Klik progress bar Visual Akreditasi untuk melihat detail Syarat Perlu
   Akreditasi."
3. **Tabel data** — datatable baku (bagian 7 & 16.5): satu
   `div.card.card-lg.border-1` berisi **toolbar → baris filter (collapse) →
   tabel → footer pagination**.
   - Toolbar: **kiri** = pencarian (`form-control listjs-search`) + tombol
     **Filter** (`btn btn-white datatable-filter-toggle`) + tombol dropdown
     **Kolom**; **kanan** = selector **Per page**.
   - Filter (collapse): **Tahun** + **Lembaga Akreditasi** (select
     `-- SEMUA --`).
   - Kolom: **No**, **Auditee** (`listjs-sorter` + `data-sort="auditee"`),
     **Visualisasi Akreditasi**.
   - Karena halaman **read-only**, kolom **Aksi tidak ditampilkan** — pengecualian
     terhadap bagian 8.1/16.2 (sama seperti bagian 19).

### 21.1 Progress Bar Kesiapan Akreditasi

Sel kolom **Visualisasi Akreditasi** memakai salah satu dari dua bentuk:

- **Tidak ada syarat perlu** — teks biasa:
  `<span class="text-secondary">Tidak memiliki syarat perlu</span>`.
- **Ada kesiapan** — badge persentase + progress bar ramping:

  ```html
  <div class="d-flex align-items-center gap-2">
    <span class="badge bg-danger-subtle text-danger-emphasis text-nowrap">0% siap</span>
    <div class="progress espmi-readiness flex-grow-1" role="progressbar"
         aria-label="0% siap" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
      <div class="progress-bar bg-danger" style="width: 0%"></div>
    </div>
  </div>
  ```

| Rentang kesiapan | Badge (varian soft) | Progress bar |
| --- | --- | --- |
| `< 50%` | `bg-danger-subtle text-danger-emphasis` | `bg-danger` |
| `50% &ndash; 79%` | `bg-warning-subtle text-warning-emphasis` | `bg-warning` |
| `&ge; 80%` | `bg-success-subtle text-success-emphasis` | `bg-success` |

- Badge persentase memakai varian **soft** (bagian 16.2); progress bar memakai
  warna solid agar kontras terhadap track.
- Track progress bar dimampatkan lewat kelas `.espmi-readiness`
  (`espmi-app.css` bagian 17): tinggi `0.5rem`, tepi membulat penuh,
  `min-width: 6rem`.



