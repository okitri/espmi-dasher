/* ==========================================================================
   eSPMI - Aksi datatable (Ubah/Hapus) sisi front-end
   --------------------------------------------------------------------------
   Fitur:
     1. Menangkap setiap instance List.js yang dibuat halaman
        (window.espmiDatatableLists[id]) dengan membungkus konstruktor `List`.
     2. Tombol Hapus di dalam `tbody.list`
        (`.btn-subtle-danger[title="Hapus"]`) membuka modal konfirmasi.
        Setelah dikonfirmasi, baris benar-benar dihapus dari datatable
        (item List.js di-splice + `<tr>` dibuang + List.js di-update).
     3. `no` diurutkan ulang setelah penghapusan.
     4. Menampilkan toast `Data berhasil dihapus` (via window.espmiToast).
     5. Helper `window.espmiDatatable` dipakai halaman yang punya form Tambah.

   Front-end saja: tidak ada permintaan ke server.
   ========================================================================== */
(function () {
  'use strict';

  /* --- 1. Tangkap instance List.js ------------------------------------- */
  if (typeof window.List === 'function') {
    var OriginalList = window.List;

    var CapturingList = function (id, options) {
      var instance = new OriginalList(id, options);
      if (id) {
        window.espmiDatatableLists = window.espmiDatatableLists || {};
        window.espmiDatatableLists[id] = instance;
      }
      return instance;
    };

    for (var key in OriginalList) {
      if (Object.prototype.hasOwnProperty.call(OriginalList, key)) {
        CapturingList[key] = OriginalList[key];
      }
    }
    CapturingList.prototype = OriginalList.prototype;
    window.List = CapturingList;
  }

  /* --- Helper ---------------------------------------------------------- */
  function getListFor(row) {
    var host = row.closest('[data-list]') || row.closest('.card');
    if (!host || !host.id) return null;
    return (window.espmiDatatableLists || {})[host.id] || null;
  }

  // Urutkan ulang kolom No sesuai urutan item yang cocok saat ini.
  function renumber(list) {
    if (!list || !list.matchingItems) return;
    var items = list.matchingItems;
    for (var i = 0; i < items.length; i += 1) {
      var elm = items[i].elm;
      if (!elm) continue;
      var cell = elm.querySelector('td.no');
      if (cell) cell.textContent = i + 1;
    }
  }

  // Hapus satu baris dari datatable (front-end).
  function removeRow(row) {
    var list = getListFor(row);
    if (list && list.items) {
      for (var i = 0; i < list.items.length; i += 1) {
        if (list.items[i].elm === row) {
          list.items.splice(i, 1);
          break;
        }
      }
    }
    if (row.parentNode) row.parentNode.removeChild(row);
    if (list) {
      list.update();
      renumber(list);
    }
  }

  /* --- 2. Modal konfirmasi Hapus --------------------------------------- */
  var modalEl = null;
  var pendingRow = null;

  function buildModal() {
    if (modalEl) return modalEl;
    modalEl = document.createElement('div');
    modalEl.className = 'modal fade';
    modalEl.id = 'espmiConfirmDeleteModal';
    modalEl.tabIndex = -1;
    modalEl.setAttribute('aria-labelledby', 'espmiConfirmDeleteModalLabel');
    modalEl.setAttribute('aria-hidden', 'true');
    modalEl.innerHTML =
      '<div class="modal-dialog modal-dialog-centered">' +
      '<div class="modal-content">' +
      '<div class="modal-header">' +
      '<h5 class="modal-title" id="espmiConfirmDeleteModalLabel">Konfirmasi Hapus</h5>' +
      '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Tutup"></button>' +
      '</div>' +
      '<div class="modal-body">' +
      '<p class="mb-0">Apakah Anda yakin ingin menghapus data ini? Tindakan ini tidak dapat dibatalkan.</p>' +
      '</div>' +
      '<div class="modal-footer">' +
      '<button type="button" class="btn btn-white" data-bs-dismiss="modal">Batal</button>' +
      '<button type="button" class="btn btn-danger" data-espmi-confirm-delete>Hapus</button>' +
      '</div>' +
      '</div>' +
      '</div>';
    document.body.appendChild(modalEl);

    modalEl.querySelector('[data-espmi-confirm-delete]').addEventListener('click', function () {
      if (pendingRow) {
        removeRow(pendingRow);
        pendingRow = null;
        if (window.espmiToast) {
          window.espmiToast('Data berhasil dihapus', { variant: 'danger', icon: 'trash' });
        }
      }
      hideModal();
    });
    modalEl.addEventListener('hidden.bs.modal', function () {
      pendingRow = null;
    });
    return modalEl;
  }

  function hideModal() {
    if (!modalEl) return;
    if (window.bootstrap && window.bootstrap.Modal) {
      window.bootstrap.Modal.getOrCreateInstance(modalEl).hide();
    }
  }

  function showModal(row) {
    buildModal();
    pendingRow = row;
    if (window.bootstrap && window.bootstrap.Modal) {
      window.bootstrap.Modal.getOrCreateInstance(modalEl).show();
    } else if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      removeRow(row);
      pendingRow = null;
    }
  }

  /* --- 3. Delegasi klik tombol Hapus ----------------------------------- */
  document.addEventListener('click', function (event) {
    var button = event.target.closest('tbody.list .btn-subtle-danger[title="Hapus"]');
    if (!button) return;
    event.preventDefault();
    var row = button.closest('tr');
    if (row) showModal(row);
  });

  /* --- 4. API untuk halaman dengan form Tambah ------------------------- */
  window.espmiDatatable = window.espmiDatatable || {};
  window.espmiDatatable.removeRow = removeRow;
  window.espmiDatatable.renumber = renumber;
  window.espmiDatatable.getListFor = getListFor;
})();
