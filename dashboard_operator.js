/**
 * DASHBOARD OPERATOR INTERACTION SCRIPT
 * Sesuai Implementasi Repository PBL_1 Maulana Akram Alif
 */

function previewFile(filename) {
    alert("Pratinjau Dokumen Digital: " + filename + "\nStatus: Terverifikasi oleh Sistem");
}

function verifyDoc(id, result) {
    const statusElement = document.getElementById('status-' + id);
    if (!statusElement) {
        throw new Error('Status berkas tidak ditemukan: ' + id);
    }

    if (result === 'Disetujui') {
        statusElement.className = 'status-badge kompeten';
        statusElement.innerText = 'Disetujui';
        alert('Berkas peserta berhasil disetujui!');
    } else {
        statusElement.className = 'status-badge belum-kompeten';
        statusElement.innerText = 'Ditolak';
        alert('Berkas peserta ditolak!');
    }
}

function exportDataData(format) {
    alert("Sistem mengunduh Rekap Data Peserta Sertikom dalam format " + format.toUpperCase() + "...");
}

// Ekspor baris rekapitulasi ke format dokumen siap cetak / PDF
function exportRekapRow(button) {
    const row = button.closest('.simple-row');
    const table = document.getElementById('table-rekap-pendaftaran');
    if (!row || !table) {
        throw new Error('Baris atau tabel rekapitulasi tidak ditemukan.');
    }

    const headings = Array.from(table.querySelector('.table-title').children);
    const cells = Array.from(row.children);
    const escapeHtml = function (value) {
        return value.replace(/[&<>"']/g, function (character) {
            const entities = {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#39;'
            };
            return entities[character];
        });
    };
    const printableCells = cells.slice(0, headings.length - 1).map(function (cell, index) {
        return '<tr><th>' + escapeHtml(headings[index].textContent.trim()) +
            '</th><td>' + escapeHtml(cell.textContent.trim()) + '</td></tr>';
    }).join('');
    const printWindow = window.open('', '_blank', 'width=800,height=600');

    if (!printWindow) {
        alert('Jendela ekspor diblokir browser. Izinkan pop-up untuk menyimpan rekap sebagai PDF.');
        return;
    }

    printWindow.addEventListener('load', function () {
        printWindow.focus();
        printWindow.print();
    });
    printWindow.document.open();
    printWindow.document.write(
        '<!DOCTYPE html><html lang="id"><head><meta charset="UTF-8">' +
        '<title>Rekap Pendaftaran - ' + escapeHtml(cells[0].textContent.trim()) + '</title>' +
        '<style>' +
        'body{font-family:Arial,sans-serif;color:#0f172a;margin:40px}' +
        'h1{font-size:20px;margin:0 0 8px;color:#0284c7}p{font-size:12px;color:#64748b;margin:0 0 24px}' +
        'table{width:100%;border-collapse:collapse}th,td{text-align:left;padding:12px 14px;border:1px solid #cbd5e1}' +
        'th{width:42%;background:#f1f5f9;font-weight:bold;}' +
        '@media print{body{margin:20mm}}' +
        '</style></head><body><h1>Rekapitulasi Pendaftaran Sertikom</h1>' +
        '<p>Dokumentasi Resmi LSP-P1 TRPL Politeknik Negeri Batam</p><table>' + printableCells +
        '</table></body></html>'
    );
    printWindow.document.close();
}

function openCourseForm() {
    alert("Membuka formulir tambah Sertikom...");
}

// Menambah baris dinamis pada tabel sertifikasi, jadwal, atau sertifikat
function addDataRow(tableType) {
    const tableConfig = {
        sertifikasi: {
            id: 'table-sertifikasi',
            fields: [
                { label: 'Sertifikasi', type: 'text', placeholder: 'Nama Skema' },
                { label: 'Deskripsi', type: 'text', placeholder: 'Deskripsi singkat' },
                { label: 'Persyaratan', type: 'text', placeholder: 'Persyaratan berkas' },
                { label: 'Kuota', type: 'number', min: '0', placeholder: 'Kuota' }
            ]
        },
        jadwal: {
            id: 'table-jadwal',
            fields: [
                { label: 'Nama Jadwal', type: 'text', placeholder: 'Skema' },
                { label: 'Waktu', type: 'time' },
                { label: 'Tempat', type: 'text', placeholder: 'Lab Komputer' },
                { label: 'Tanggal', type: 'date' },
                { label: 'Asesor', type: 'text', placeholder: 'Nama Asesor' }
            ]
        },
        sertifikat: {
            id: 'table-sertifikat',
            fields: [
                { label: 'File Sertifikat', type: 'file', accept: '.pdf,.jpg,.jpeg,.png' },
                { label: 'Nama Sertifikat', type: 'text', placeholder: 'Nama file sertifikat' }
            ]
        }
    };
    const config = tableConfig[tableType];
    if (!config) {
        throw new Error('Jenis tabel tidak dikenal: ' + tableType);
    }

    const table = document.getElementById(config.id);
    if (!table) {
        throw new Error('Tabel tidak ditemukan: ' + config.id);
    }

    const row = document.createElement('div');
    row.className = 'simple-row';
    config.fields.forEach(function (field) {
        const cell = document.createElement('span');
        const input = document.createElement('input');
        input.type = field.type;
        input.className = 'no-icon';
        input.setAttribute('aria-label', field.label);
        if (field.placeholder) input.placeholder = field.placeholder;
        if (field.min !== undefined) {
            input.min = field.min;
        }
        if (field.accept) {
            input.accept = field.accept;
        }
        cell.appendChild(input);
        row.appendChild(cell);
    });
    const actionCell = document.createElement('span');
    const submitButton = document.createElement('button');
    submitButton.className = 'btn-action-approve';
    submitButton.type = 'button';
    submitButton.textContent = 'Submit';
    submitButton.onclick = function () {
        submitDataRow(submitButton);
    };
    actionCell.appendChild(submitButton);
    row.appendChild(actionCell);
    table.appendChild(row);
}

// Handle submit baris data
function submitDataRow(button) {
    const row = button.closest('.simple-row');
    if (!row) {
        throw new Error('Baris data yang akan disubmit tidak ditemukan.');
    }

    // Ambil input pada baris
    const inputs = row.querySelectorAll('input, select');
    let hasValue = false;
    inputs.forEach(inp => {
        if (inp.value && inp.value.trim() !== '') hasValue = true;
    });

    button.innerHTML = '<i class="fa-solid fa-check"></i> Tersimpan';
    button.style.backgroundColor = '#10b981';
    alert('Data baris berhasil diperbarui dan divalidasi ke sistem!');
}

const MAX_VISIBLE_ROWS = 6;
const rowScrollObserver = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
        const table = mutation.target;
        const dataRowCount = Array.from(table.children).filter(function (child) {
            return child.classList.contains('simple-row') && !child.classList.contains('table-title');
        }).length;
        table.classList.toggle('has-row-scroll', dataRowCount > MAX_VISIBLE_ROWS);
    });
});

document.querySelectorAll('#table-sertifikasi, #table-jadwal, #table-sertifikat').forEach(function (table) {
    const dataRowCount = Array.from(table.children).filter(function (child) {
        return child.classList.contains('simple-row') && !child.classList.contains('table-title');
    }).length;
    table.classList.toggle('has-row-scroll', dataRowCount > MAX_VISIBLE_ROWS);
    rowScrollObserver.observe(table, { childList: true });
});
