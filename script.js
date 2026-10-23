/**
 * SERTIKOM TRPL POLIBATAM - JAVASCRIPT
 * Interaktivitas Frontend Berdasarkan:
 * 1. Mini Project HTML-CSS-JS (Hamburger Toggle, Card Expand .aktif .isi, Real-time Search)
 * 2. Laporan Perancangan Aplikasi Manajemen Sertikom TRPL Polibatam
 */

document.addEventListener('DOMContentLoaded', function () {
  // State Aplikasi
  const appState = {
    currentRole: 'peserta', // 'peserta', 'assesor', 'operator'
    currentUser: {
      name: 'Maulana Akram Alif',
      nim: '4342601070',
      prodi: 'Teknologi Rekayasa Perangkat Lunak',
      email: 'maulana.akram@polibatam.ac.id',
      phone: '0812-7654-3210',
      activeSchema: 'Junior Web Developer',
      statusBerkas: 'verified', // 'pending', 'verified', 'rejected'
      statusKelulusan: 'KOMPETEN', // 'KOMPETEN', 'BELUM KOMPETEN', 'MENUNGGU UJIAN'
      nilaiTeori: 88,
      nilaiPraktik: 92,
      nomorSertifikat: 'BNSP-LSP-POLIBATAM-2026-08912',
      tanggalTerbit: '24 Oktober 2026'
    },
    schemes: [
      {
        id: 'jwd',
        title: 'Junior Web Developer',
        category: 'web',
        badge: 'BNSP - LSP P1',
        status: 'Buka Pendaftaran',
        desc: 'Sertifikasi kompetensi pembuatan dan pengembangan aplikasi web berbasis HTML, CSS, JavaScript, dan backend service sesuai standar industri.',
        units: [
          'J.620100.005.02 - Mengimplementasikan User Interface',
          'J.620100.015.01 - Mempersiapkan Kode Program Terstruktur',
          'J.620100.016.01 - Menerapkan Perintah Eksekusi Bahasa Pemrograman',
          'J.620100.025.02 - Melakukan Pengujian Unit Perangkat Lunak'
        ],
        jadwal: '15 November 2026 (09:00 - 15:00 WIB)',
        lokasi: 'Laboratorium RPL 301, Gedung Utama Polibatam',
        asesor: 'Dr. Ir. Hendra Gunawan, S.T., M.Kom.',
        kuota: '30 Peserta (Tersisa 8 Kursi)',
        biaya: 'Gratis (Subsidi Jurusan Informatika)',
        gradient: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
        icon: 'code'
      },
      {
        id: 'csa',
        title: 'Cyber Security Analyst',
        category: 'security',
        badge: 'BNSP - LSP P1',
        status: 'Buka Pendaftaran',
        desc: 'Kompetensi analisis ancaman keamanan siber, pemantauan log insiden, vulnerability assessment, dan implementasi security hardening.',
        units: [
          'J.620200.001.01 - Melakukan Identifikasi Aset Sistem Kritis',
          'J.620200.004.01 - Menganalisis Ancaman dan Kerentanan Siber',
          'J.620200.009.01 - Menangani Insiden Keamanan Sistem Informasi'
        ],
        jadwal: '18 November 2026 (08:30 - 15:30 WIB)',
        lokasi: 'Laboratorium Cyber Security 402, Polibatam',
        asesor: 'Fahrizal Rahman, S.Kom., M.T., CEH',
        kuota: '25 Peserta (Tersisa 4 Kursi)',
        biaya: 'Gratis (Subsidi Kemendikbud)',
        gradient: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        icon: 'shield-halved'
      },
      {
        id: 'dsa',
        title: 'Data Science Associate',
        category: 'data',
        badge: 'BNSP - LSP P1',
        status: 'Buka Pendaftaran',
        desc: 'Kompetensi pengolahan big data, pembersihan data, eksplorasi statistik, pembuatan model machine learning dasar, dan dashboard visualisasi.',
        units: [
          'J.62DTA00.001.1 - Menentukan Data dan Sumber Data Relevan',
          'J.62DTA00.003.1 - Melakukan Pra-pemrosesan Data (Data Wrangling)',
          'J.62DTA00.006.1 - Mengembangkan Model Prediksi Data'
        ],
        jadwal: '20 November 2026 (09:00 - 16:00 WIB)',
        lokasi: 'Laboratorium Data Science 305, Polibatam',
        asesor: 'Novi Fitriani, M.Sc., Ph.D.',
        kuota: '30 Peserta (Tersisa 12 Kursi)',
        biaya: 'Gratis (Subsidi Jurusan TRPL)',
        gradient: 'linear-gradient(135deg, #10b981 0%, #047857 100%)',
        icon: 'chart-pie'
      },
      {
        id: 'net',
        title: 'Network Administrator',
        category: 'network',
        badge: 'BNSP - LSP P1',
        status: 'Buka Pendaftaran',
        desc: 'Instalasi, konfigurasi router/switch skala enterprise, subnetting IP, manajemen bandwidth, dan troubleshooting infrastruktur jaringan LAN/WAN.',
        units: [
          'J.611000.001.01 - Memasang Perangkat Jaringan ke Dalam Sistem',
          'J.611000.005.02 - Mengkonfigurasi Routing pada Perangkat Jaringan',
          'J.611000.009.02 - Memonitor Keamanan dan Kinerja Jaringan'
        ],
        jadwal: '22 November 2026 (09:00 - 15:00 WIB)',
        lokasi: 'Laboratorium Jaringan Komputer 201, Polibatam',
        asesor: 'Bambang Sudarmono, S.T., M.Kom.',
        kuota: '24 Peserta (Tersisa 6 Kursi)',
        biaya: 'Gratis (Subsidi Jurusan Informatika)',
        gradient: 'linear-gradient(135deg, #6366f1 0%, #4338ca 100%)',
        icon: 'network-wired'
      },
      {
        id: 'uiux',
        title: 'UI/UX Designer Specialist',
        category: 'design',
        badge: 'BNSP - LSP P1',
        status: 'Buka Pendaftaran',
        desc: 'Riset pengguna (user research), penyusunan wireframe, high-fidelity design system, interactive prototyping, dan usability testing.',
        units: [
          'J.620100.011.01 - Melakukan Riset Pengalaman Pengguna (User Research)',
          'J.620100.012.01 - Merancang Antarmuka Pengguna Visual (UI Design)',
          'J.620100.013.01 - Melakukan Pengujian Kegunaan (Usability Testing)'
        ],
        jadwal: '25 November 2026 (09:00 - 15:00 WIB)',
        lokasi: 'Studio Multimedia & Kreatif 401, Polibatam',
        asesor: 'Cindy Claudia, M.Ds.',
        kuota: '20 Peserta (Tersisa 3 Kursi)',
        biaya: 'Gratis (Subsidi Beasiswa Polibatam)',
        gradient: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)',
        icon: 'pen-nib'
      },
      {
        id: 'cld',
        title: 'Cloud Practitioner',
        category: 'network',
        badge: 'BNSP - LSP P1',
        status: 'Buka Pendaftaran',
        desc: 'Kompetensi arsitektur komputasi awan, deployment container microservices, implementasi virtual private cloud (VPC), dan cloud storage.',
        units: [
          'J.620900.002.01 - Merancang Arsitektur Komputasi Awan Dasar',
          'J.620900.005.01 - Mengkonfigurasi Layanan Virtual Server di Cloud',
          'J.620900.008.01 - Menerapkan Manajemen Hak Akses IAM Cloud'
        ],
        jadwal: '27 November 2026 (09:00 - 16:00 WIB)',
        lokasi: 'Laboratorium Server & Cloud 304, Polibatam',
        asesor: 'Riyan Hidayat, S.Kom., M.T.',
        kuota: '20 Peserta (Tersisa 5 Kursi)',
        biaya: 'Gratis (Subsidi LSP Polibatam)',
        gradient: 'linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%)',
        icon: 'cloud'
      }
    ],
    candidates: [
      { id: 1, name: 'Maulana Akram Alif', nim: '4342601070', schema: 'Junior Web Developer', berkasStatus: 'Terverifikasi', teori: 88, praktik: 92, hasil: 'KOMPETEN' },
      { id: 2, name: 'M. Galih Adiyatma Arif', nim: '4342601061', schema: 'Cyber Security Analyst', berkasStatus: 'Terverifikasi', teori: 85, praktik: 90, hasil: 'KOMPETEN' },
      { id: 3, name: 'Mutia Nur Afifah', nim: '4342601062', schema: 'UI/UX Designer Specialist', berkasStatus: 'Terverifikasi', teori: 90, praktik: 94, hasil: 'KOMPETEN' },
      { id: 4, name: 'Marsya Ayunda Dinata', nim: '4342601063', schema: 'Data Science Associate', berkasStatus: 'Terverifikasi', teori: 82, praktik: 88, hasil: 'KOMPETEN' },
      { id: 5, name: 'Radja Rafa Alfathir', nim: '4342601065', schema: 'Network Administrator', berkasStatus: 'Menunggu Verifikasi', teori: '-', praktik: '-', hasil: 'MENUNGGU UJIAN' },
      { id: 6, name: 'Muhammad Fahrel Al Faiz', nim: '4342601068', schema: 'Junior Web Developer', berkasStatus: 'Menunggu Verifikasi', teori: '-', praktik: '-', hasil: 'MENUNGGU UJIAN' }
    ]
  };

  // =========================================================================
  // 1. HAMBURGER TOGGLE MENU (Sesuai Referensi miniproject_html_css_javascript)
  // =========================================================================
  const toggle = document.getElementById('toggle');
  const menu = document.getElementById('menu');

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      menu.classList.toggle('aktif');
    });

    // Close menu when a link is clicked
    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('aktif');
      });
    });
  }

  // =========================================================================
  // 2. SPA NAVIGATION (Tab switching)
  // =========================================================================
  const navLinks = document.querySelectorAll('.nav-link');
  const pages = document.querySelectorAll('.page-view');

  window.navigateTo = function (pageId) {
    pages.forEach(p => p.classList.remove('active'));
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
      targetPage.classList.add('active');
    }

    navLinks.forEach(link => {
      if (link.getAttribute('data-page') === pageId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const pageId = this.getAttribute('data-page');
      if (pageId) {
        navigateTo(pageId);
      }
    });
  });

  // =========================================================================
  // 3. RENDER KATALOG KARTU SKEMA (Sesuai Pola Card .card .btn &#9776;)
  // =========================================================================
  const galeriContainer = document.getElementById('galeriContainer');

  function renderCards(schemesToRender) {
    if (!galeriContainer) return;
    galeriContainer.innerHTML = '';

    if (schemesToRender.length === 0) {
      galeriContainer.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; background: #fff; border-radius: 12px; border: 1px dashed #cbd5e1;">
          <i class="fa-solid fa-magnifying-glass" style="font-size: 2.5rem; color: #94a3b8; margin-bottom: 12px;"></i>
          <h3 style="color: #334155;">Skema Tidak Ditemukan</h3>
          <p style="color: #64748b; font-size: 0.9rem;">Coba cari dengan kata kunci lain atau pilih filter kategori yang berbeda.</p>
        </div>
      `;
      return;
    }

    schemesToRender.forEach(s => {
      const card = document.createElement('div');
      card.className = 'card';
      card.setAttribute('data-category', s.category);
      card.setAttribute('data-title', s.title.toLowerCase());

      card.innerHTML = `
        <div class="card-media" style="background: ${s.gradient};">
          <div class="card-badge badge-bnsp">
            <i class="fa-solid fa-certificate"></i> ${s.badge}
          </div>
          <div class="card-badge-status">${s.status}</div>
          <div style="text-align: center; color: white;">
            <i class="fa-solid fa-${s.icon}" style="font-size: 3.5rem; opacity: 0.9; margin-bottom: 6px;"></i>
            <div style="font-size: 0.75rem; letter-spacing: 1px; font-weight: 700; opacity: 0.85;">POLIBATAM LSP</div>
          </div>
        </div>

        <div class="title">
          <div class="title-header">
            <h3>${s.title}</h3>
            <!-- Tombol Toggle Khas Referensi: &#9776; (Hamburger) yang berubah menjadi &#10005; (Close) -->
            <button class="btn" title="Buka Detail Unit & Jadwal">&#9776;</button>
          </div>

          <p class="card-summary">${s.desc}</p>

          <div class="card-tags">
            <span class="tag"><i class="fa-solid fa-user-tie"></i> ${s.asesor.split(',')[0]}</span>
            <span class="tag"><i class="fa-solid fa-users"></i> ${s.kuota.split('(')[0]}</span>
            <span class="tag"><i class="fa-solid fa-tag"></i> Beasiswa TRPL</span>
          </div>

          <div class="card-footer-actions">
            <button class="btn-card-apply" onclick="pilihSkema('${s.title}')">
              <i class="fa-solid fa-paper-plane"></i> Daftar Skema
            </button>
            <button class="btn-card-info" onclick="bukaModalUnit('${s.id}')">
              <i class="fa-solid fa-list-check"></i> Unit SKKNI
            </button>
          </div>

          <!-- Bagian .isi yang dibuka saat tombol .btn diklik -->
          <div class="isi">
            <div class="detail-block">
              <h4><i class="fa-solid fa-calendar-check" style="color: #0284c7;"></i> Jadwal Pelaksanaan Uji:</h4>
              <p style="font-size: 0.82rem; font-weight: 600; color: #0f172a; margin-bottom: 6px;">${s.jadwal}</p>
              
              <div class="detail-row">
                <span>Lokasi Ujian:</span>
                <span>${s.lokasi}</span>
              </div>
              <div class="detail-row">
                <span>Asesor Penguji:</span>
                <span>${s.asesor}</span>
              </div>
              <div class="detail-row">
                <span>Sisa Kuota:</span>
                <span style="color: #0284c7;">${s.kuota}</span>
              </div>
              <div class="detail-row">
                <span>Biaya Ujian:</span>
                <span style="color: #10b981;">${s.biaya}</span>
              </div>
            </div>

            <div class="detail-block">
              <h4><i class="fa-solid fa-book-open" style="color: #0284c7;"></i> Unit Kompetensi Diujikan:</h4>
              <ul>
                ${s.units.map(u => `<li>${u}</li>`).join('')}
              </ul>
            </div>
          </div>
        </div>
      `;

      galeriContainer.appendChild(card);
    });

    // Pasang Event Listener Tombol .btn untuk Card Toggle Sesuai script.js Referensi
    attachCardToggleEvents();
  }

  // Card toggle interaction (persis logika referensi: card.classList.toggle("aktif") + icon switch)
  function attachCardToggleEvents() {
    const allCards = document.querySelectorAll('.card');
    allCards.forEach(function (card) {
      const btn = card.querySelector('.btn');
      if (btn) {
        btn.addEventListener('click', function () {
          card.classList.toggle('aktif');
          if (card.classList.contains('aktif')) {
            btn.innerHTML = '&#10005;'; // Close icon
          } else {
            btn.innerHTML = '&#9776;'; // Hamburger icon
          }
        });
      }
    });
  }

  // =========================================================================
  // 4. REAL-TIME SEARCH & FILTER
  // =========================================================================
  const searchInput = document.getElementById('searchInput');
  const filterPills = document.querySelectorAll('.pill-btn');

  let currentCategory = 'all';

  function applyFilters() {
    const query = (searchInput?.value || '').toLowerCase().trim();
    const filtered = appState.schemes.filter(s => {
      const matchesCategory = currentCategory === 'all' || s.category === currentCategory;
      const matchesQuery = s.title.toLowerCase().includes(query) ||
        s.desc.toLowerCase().includes(query) ||
        s.asesor.toLowerCase().includes(query) ||
        s.units.some(u => u.toLowerCase().includes(query));
      return matchesCategory && matchesQuery;
    });

    renderCards(filtered);
  }

  if (searchInput) {
    searchInput.addEventListener('input', applyFilters);
  }

  filterPills.forEach(pill => {
    pill.addEventListener('click', function () {
      filterPills.forEach(p => p.classList.remove('active'));
      this.classList.add('active');
      currentCategory = this.getAttribute('data-filter') || 'all';
      applyFilters();
    });
  });

  // Initial render
  renderCards(appState.schemes);

  // =========================================================================
  // 5. ROLE QUICK SWITCHER
  // =========================================================================
  const roleSelect = document.getElementById('roleSelect');
  const userRoleBadge = document.getElementById('userRoleBadge');
  const userNameDisplay = document.getElementById('userNameDisplay');

  function updateRoleUI(role) {
    appState.currentRole = role;
    if (userRoleBadge && userNameDisplay) {
      if (role === 'peserta') {
        userRoleBadge.textContent = 'Peserta';
        userRoleBadge.style.background = '#0284c7';
        userNameDisplay.textContent = 'Maulana Akram Alif';
      } else if (role === 'assesor') {
        userRoleBadge.textContent = 'Asesor Penguji';
        userRoleBadge.style.background = '#8b5cf6';
        userNameDisplay.textContent = 'Dr. Hendra Gunawan';
      } else if (role === 'operator') {
        userRoleBadge.textContent = 'Admin / Operator';
        userRoleBadge.style.background = '#f59e0b';
        userNameDisplay.textContent = 'Operator TRPL LSP';
      }
    }

    // Role-based navigation sync
    if (role === 'peserta') {
      navigateTo('dashboard-peserta');
      showToast('Beralih ke Peran: Mahasiswa / Peserta Uji', 'info');
    } else if (role === 'assesor') {
      navigateTo('dashboard-asesor');
      showToast('Beralih ke Peran: Asesor Penguji Sertifikasi', 'info');
    } else if (role === 'operator') {
      navigateTo('dashboard-operator');
      showToast('Beralih ke Peran: Operator / Admin Jurusan', 'info');
    }
  }

  if (roleSelect) {
    roleSelect.addEventListener('change', function () {
      updateRoleUI(this.value);
    });
  }

  // =========================================================================
  // 6. FORMULIR PENDAFTARAN & BERKAS (KU-001, KU-004)
  // =========================================================================
  const regForm = document.getElementById('pendaftaranForm');
  const schemaSelect = document.getElementById('formSkema');

  // Populate schema select options
  if (schemaSelect) {
    schemaSelect.innerHTML = appState.schemes.map(s => `<option value="${s.title}">${s.title}</option>`).join('');
  }

  window.pilihSkema = function (skemaTitle) {
    if (schemaSelect) {
      schemaSelect.value = skemaTitle;
    }
    navigateTo('pendaftaran');
    showToast(`Skema "${skemaTitle}" dipilih. Silakan lengkapi berkas formulir.`, 'info');
  };

  // Setup file preview names
  document.querySelectorAll('.file-upload-box input[type="file"]').forEach(input => {
    input.addEventListener('change', function () {
      const preview = this.parentElement.querySelector('.file-name-preview');
      if (preview && this.files.length > 0) {
        preview.textContent = `✓ File siap: ${this.files[0].name} (${(this.files[0].size / 1024).toFixed(1)} KB)`;
        preview.style.display = 'block';
      }
    });
  });

  if (regForm) {
    regForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const nama = document.getElementById('formNama').value;
      const nim = document.getElementById('formNim').value;
      const email = document.getElementById('formEmail').value;
      const skema = schemaSelect.value;

      // Update state
      appState.currentUser.name = nama;
      appState.currentUser.nim = nim;
      appState.currentUser.email = email;
      appState.currentUser.activeSchema = skema;
      appState.currentUser.statusBerkas = 'verified';

      // Update Dashboard UI
      document.getElementById('pesertaNamaHeader').textContent = nama;
      document.getElementById('pesertaNimHeader').textContent = `NIM: ${nim} • TRPL Polibatam`;
      document.getElementById('pesertaSkemaDisplay').textContent = skema;
      document.getElementById('pesertaStatusBerkas').className = 'status-badge verified';
      document.getElementById('pesertaStatusBerkas').innerHTML = '<i class="fa-solid fa-circle-check"></i> Terverifikasi';

      // Add to table
      const newCand = {
        id: appState.candidates.length + 1,
        name: nama,
        nim: nim,
        schema: skema,
        berkasStatus: 'Terverifikasi',
        teori: '-',
        praktik: '-',
        hasil: 'MENUNGGU UJIAN'
      };
      appState.candidates.unshift(newCand);
      renderTables();

      showToast('Pendaftaran & Berkas Persyaratan Berhasil Disimpan!', 'success');
      navigateTo('dashboard-peserta');
    });
  }

  // =========================================================================
  // 7. DASHBOARD ASESOR (Penilaian & Rekomendasi Uji)
  // =========================================================================
  const asesorTableBody = document.getElementById('asesorTableBody');
  const operatorVervalBody = document.getElementById('operatorVervalBody');

  function renderTables() {
    // 1. Asesor Table
    if (asesorTableBody) {
      asesorTableBody.innerHTML = '';
      appState.candidates.forEach(c => {
        const tr = document.createElement('tr');
        const badgeClass = c.hasil === 'KOMPETEN' ? 'kompeten' : (c.hasil === 'BELUM KOMPETEN' ? 'rejected' : 'pending');
        tr.innerHTML = `
          <td><strong>${c.name}</strong><br><small style="color: #64748b;">NIM: ${c.nim}</small></td>
          <td><span class="tag" style="background:#e0f2fe; color:#0369a1;">${c.schema}</span></td>
          <td style="font-weight: 700; text-align: center;">${c.teori}</td>
          <td style="font-weight: 700; text-align: center;">${c.praktik}</td>
          <td><span class="status-badge ${badgeClass}">${c.hasil}</span></td>
          <td>
            <button class="btn-table btn-table-primary" onclick="bukaModalNilai(${c.id})">
              <i class="fa-solid fa-pen-to-square"></i> Input Nilai
            </button>
          </td>
        `;
        asesorTableBody.appendChild(tr);
      });
    }

    // 2. Operator Table
    if (operatorVervalBody) {
      operatorVervalBody.innerHTML = '';
      appState.candidates.forEach(c => {
        const tr = document.createElement('tr');
        const badgeClass = c.berkasStatus === 'Terverifikasi' ? 'verified' : (c.berkasStatus === 'Ditolak' ? 'rejected' : 'pending');
        tr.innerHTML = `
          <td><strong>${c.name}</strong><br><small style="color: #64748b;">${c.nim}</small></td>
          <td>${c.schema}</td>
          <td>
            <button class="btn-table" style="background: #f1f5f9;" onclick="lihatBerkasModal('${c.name}')">
              <i class="fa-solid fa-file-pdf" style="color: #ef4444;"></i> Pas Foto & KTM
            </button>
          </td>
          <td><span class="status-badge ${badgeClass}">${c.berkasStatus}</span></td>
          <td>
            <div class="table-actions">
              <button class="btn-table btn-table-success" onclick="verifikasiPeserta(${c.id}, true)">
                <i class="fa-solid fa-check"></i> Setujui
              </button>
              <button class="btn-table btn-table-danger" onclick="verifikasiPeserta(${c.id}, false)">
                <i class="fa-solid fa-xmark"></i> Tolak
              </button>
            </div>
          </td>
        `;
        operatorVervalBody.appendChild(tr);
      });
    }
  }

  renderTables();

  // Asesor Nilai Modal
  const scoreModal = document.getElementById('scoreModal');
  let activeScoringCandidateId = null;

  window.bukaModalNilai = function (candId) {
    activeScoringCandidateId = candId;
    const cand = appState.candidates.find(c => c.id === candId);
    if (!cand) return;

    document.getElementById('scoreCandName').textContent = `${cand.name} (${cand.nim})`;
    document.getElementById('scoreCandSchema').textContent = cand.schema;
    document.getElementById('inputNilaiTeori').value = cand.teori === '-' ? 85 : cand.teori;
    document.getElementById('inputNilaiPraktik').value = cand.praktik === '-' ? 90 : cand.praktik;
    document.getElementById('selectRekomendasi').value = cand.hasil === 'MENUNGGU UJIAN' ? 'KOMPETEN' : cand.hasil;

    scoreModal.classList.add('active');
  };

  window.tutupModalNilai = function () {
    scoreModal.classList.remove('active');
  };

  window.simpanPenilaian = function () {
    const teori = Number(document.getElementById('inputNilaiTeori').value);
    const praktik = Number(document.getElementById('inputNilaiPraktik').value);
    const hasil = document.getElementById('selectRekomendasi').value;

    const cand = appState.candidates.find(c => c.id === activeScoringCandidateId);
    if (cand) {
      cand.teori = teori;
      cand.praktik = praktik;
      cand.hasil = hasil;

      if (cand.nim === appState.currentUser.nim) {
        appState.currentUser.nilaiTeori = teori;
        appState.currentUser.nilaiPraktik = praktik;
        appState.currentUser.statusKelulusan = hasil;
        document.getElementById('pesertaHasilUjian').textContent = hasil;
        document.getElementById('pesertaNilaiAkhir').textContent = `Nilai: Teori ${teori} | Praktik ${praktik}`;
      }

      renderTables();
      tutupModalNilai();
      showToast(`Penilaian asesi ${cand.name} berhasil disimpan! Status: ${hasil}`, 'success');
    }
  };

  // =========================================================================
  // 8. DASHBOARD OPERATOR (Verval & Tambah Skema)
  // =========================================================================
  window.verifikasiPeserta = function (candId, disetujui) {
    const cand = appState.candidates.find(c => c.id === candId);
    if (!cand) return;

    if (disetujui) {
      cand.berkasStatus = 'Terverifikasi';
      showToast(`Berkas ${cand.name} disetujui & dijadwalkan!`, 'success');
    } else {
      cand.berkasStatus = 'Perlu Revisi';
      showToast(`Berkas ${cand.name} ditolak. Notifikasi revisi dikirim.`, 'warning');
    }
    renderTables();
  };

  // Tambah Skema Modal
  const newSchemaModal = document.getElementById('newSchemaModal');

  window.bukaModalTambahSkema = function () {
    newSchemaModal.classList.add('active');
  };

  window.tutupModalTambahSkema = function () {
    newSchemaModal.classList.remove('active');
  };

  window.simpanSkemaBaru = function (e) {
    e.preventDefault();
    const title = document.getElementById('newSchemaTitle').value;
    const cat = document.getElementById('newSchemaCat').value;
    const asesor = document.getElementById('newSchemaAsesor').value;
    const desc = document.getElementById('newSchemaDesc').value;

    const newSchema = {
      id: 'custom-' + Date.now(),
      title: title,
      category: cat,
      badge: 'BNSP - LSP P1',
      status: 'Buka Pendaftaran',
      desc: desc,
      units: [
        'SKKNI.2026.001 - Menguasai Prinsip Rekayasa Perangkat Lunak',
        'SKKNI.2026.002 - Menerapkan Quality Assurance & Testing Standar Industri'
      ],
      jadwal: '30 November 2026 (09:00 - 15:00 WIB)',
      lokasi: 'Lab Terpadu Gedung Utama Lantai 3, Polibatam',
      asesor: asesor,
      kuota: '25 Peserta (Tersisa 25 Kursi)',
      biaya: 'Gratis (Subsidi Jurusan TRPL)',
      gradient: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
      icon: 'layer-group'
    };

    appState.schemes.unshift(newSchema);
    renderCards(appState.schemes);
    tutupModalTambahSkema();
    showToast(`Skema baru "${title}" berhasil ditambahkan ke katalog!`, 'success');
  };

  // =========================================================================
  // 9. UNIT SKKNI MODAL & LIHAT BERKAS MODAL
  // =========================================================================
  const unitModal = document.getElementById('unitModal');
  window.bukaModalUnit = function (schemeId) {
    const s = appState.schemes.find(item => item.id === schemeId);
    if (!s) return;

    document.getElementById('unitModalTitle').textContent = s.title;
    document.getElementById('unitModalBody').innerHTML = `
      <p style="margin-bottom: 12px; color: #475569;"><strong>Asesor Penguji:</strong> ${s.asesor}</p>
      <p style="margin-bottom: 16px; color: #475569;"><strong>Standar Kompetensi Kerja Nasional Indonesia (SKKNI):</strong></p>
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px;">
        <ul style="padding-left: 20px; font-size: 0.88rem; line-height: 1.8; color: #1e293b;">
          ${s.units.map(u => `<li><strong>${u.split(' - ')[0]}</strong><br>${u.split(' - ')[1] || ''}</li>`).join('')}
        </ul>
      </div>
      <div style="margin-top: 16px; font-size: 0.85rem; color: #64748b;">
        <i class="fa-solid fa-circle-info" style="color: #0284c7;"></i> Peserta dinyatakan KOMPETEN jika telah memenuhi seluruh unjuk kerja unit di atas.
      </div>
    `;
    unitModal.classList.add('active');
  };

  window.tutupModalUnit = function () {
    unitModal.classList.remove('active');
  };

  window.lihatBerkasModal = function (nama) {
    alert(`[Pratinjau Dokumen Digital]\nNama: ${nama}\n1. Pas Foto 3x4: Valid (Format JPEG, Latar Merah)\n2. Kartu Tanda Mahasiswa (KTM Polibatam): Terverifikasi Aktif Semester Ganjil 2026\n3. Transkrip KHS Nilai: IPK Memenuhi Syarat Minimal (> 3.00)`);
  };

  // =========================================================================
  // 10. AUTH MODAL (LOGIN & REGISTER)
  // =========================================================================
  const authModal = document.getElementById('authModal');
  window.bukaModalAuth = function () {
    authModal.classList.add('active');
  };
  window.tutupModalAuth = function () {
    authModal.classList.remove('active');
  };

  window.switchAuthTab = function (tab) {
    document.getElementById('tabLogin').classList.toggle('active', tab === 'login');
    document.getElementById('tabRegister').classList.toggle('active', tab === 'register');
    document.getElementById('formLoginContainer').classList.toggle('hidden', tab !== 'login');
    document.getElementById('formRegisterContainer').classList.toggle('hidden', tab !== 'register');
  };

  window.submitLogin = function (e) {
    e.preventDefault();
    const role = document.getElementById('authRole').value;
    updateRoleUI(role);
    tutupModalAuth();
    showToast(`Berhasil masuk sebagai ${role.toUpperCase()}`, 'success');
  };

  // =========================================================================
  // 11. CETAK / UNDUH SERTIFIKAT
  // =========================================================================
  window.cetakSertifikat = function () {
    window.print();
  };

  window.unduhKartuUjian = function () {
    showToast('Mengunduh Kartu Peserta Uji Kompetensi (PDF)...', 'info');
    setTimeout(() => {
      showToast('Kartu Ujian berhasil diunduh!', 'success');
    }, 1200);
  };

  // =========================================================================
  // 12. TOAST NOTIFICATION UTILITY
  // =========================================================================
  const toastContainer = document.getElementById('toastContainer');

  window.showToast = function (message, type = 'info') {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let icon = 'info-circle';
    if (type === 'success') icon = 'circle-check';
    if (type === 'warning') icon = 'triangle-exclamation';
    if (type === 'danger') icon = 'circle-xmark';

    toast.innerHTML = `<i class="fa-solid fa-${icon}"></i> <span>${message}</span>`;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(50px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  };

  // Close modals when clicking overlay
  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', function (e) {
      if (e.target === this) {
        this.classList.remove('active');
      }
    });
  });
});
