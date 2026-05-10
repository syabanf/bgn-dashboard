export const LEVEL_LABELS = { province: 'Provinsi', kota: 'Kota/Kabupaten', kecamatan: 'Kecamatan', kelurahan: 'Kelurahan' }

export const CHECKLIST_STAGES = [
  { id: 'bahan_baku', label: '1. Penerimaan Bahan Baku', icon: '📦', items: [
    'Suhu bahan baku perishable ≤5°C saat diterima',
    'Bahan tidak rusak, tidak berbau, tidak berubah warna abnormal',
    'Dokumen supplier (faktur, tanggal kadaluarsa) lengkap dan sesuai',
    'Sertifikat SLHS / Halal supplier masih aktif dan valid',
  ]},
  { id: 'persiapan', label: '2. Persiapan & Sanitasi Dapur', icon: '🧼', items: [
    'Seluruh petugas cuci tangan dengan sabun sebelum mulai bekerja',
    'Permukaan kerja, talenan, dan peralatan disanitasi sebelum digunakan',
    'Bahan mentah dan makanan matang disimpan terpisah (talenan warna berbeda)',
    'Seragam kerja, sarung tangan, dan penutup kepala dipakai seluruh petugas',
  ]},
  { id: 'memasak', label: '3. Proses Pengolahan / Memasak', icon: '🍳', items: [
    'Suhu inti protein (ayam, daging, ikan) ≥70°C — diverifikasi termometer kalibrasi',
    'Tidak ada kontaminasi silang selama proses memasak berlangsung',
    'Waktu selesai memasak dicatat dalam log batch per menu',
    'Hot-holding dimulai segera setelah matang, suhu dijaga >60°C',
  ]},
  { id: 'pengemasan', label: '4. Pengemasan & Food Sample', icon: '📋', items: [
    'Wadah distribusi bersih, tertutup rapat, berlabel: batch + menu + tanggal + SPPG',
    'Suhu hot-holding di atas 60°C diverifikasi sebelum pengemasan dimulai',
    '2 porsi food sample diambil, diberi label lengkap, disimpan ≥3 hari di kulkas terkunci',
    'Seluruh batch tercatat dalam sistem QR dan di-scan sebelum keluar dapur',
  ]},
  { id: 'distribusi', label: '5. Distribusi ke Sekolah', icon: '🚐', items: [
    'Kendaraan distribusi bersih dan telah disanitasi sebelum pemuatan',
    'Waktu keberangkatan dicatat; estimasi tiba di sekolah ≤30 menit',
    'Dokumen pengiriman (DO) ditandatangani pengemudi dan supervisor',
    'Konfirmasi penerimaan diperoleh dari petugas atau kepala sekolah',
  ]},
]

export const JUKNIS_INIT = [
  {
    id: 1, kode: 'Bab I', judul: 'Pendahuluan', status: 'berlaku',
    deskripsi: 'Latar belakang kebijakan MBG, tujuan strategis, dan ruang lingkup regulasi tata kelola penyelenggaraan program.',
    pasals: [
      { id: 11, kode: 'Pasal 1', judul: 'Latar Belakang', isi: 'Program MBG diselenggarakan untuk meningkatkan status gizi anak usia sekolah di seluruh wilayah Indonesia dengan memastikan akses makanan bergizi dan aman setiap hari sekolah.' },
      { id: 12, kode: 'Pasal 2', judul: 'Tujuan Program', isi: 'Menurunkan prevalensi stunting, meningkatkan capaian gizi seimbang, dan membangun kebiasaan makan sehat pada generasi usia 6–18 tahun.' },
      { id: 13, kode: 'Pasal 3', judul: 'Ruang Lingkup', isi: 'Regulasi ini berlaku bagi seluruh Satuan Pelayanan Pemenuhan Gizi (SPPG) yang beroperasi di bawah naungan BGN, termasuk mitra swasta dan koperasi.' },
    ],
  },
  {
    id: 2, kode: 'Bab II', judul: 'Standar Penyelenggaraan SPPG', status: 'berlaku',
    deskripsi: 'Persyaratan kapasitas produksi, luas area dapur, alur kerja, dan kompetensi SDM minimum untuk setiap SPPG.',
    pasals: [
      { id: 21, kode: 'Pasal 4', judul: 'Kapasitas Produksi', isi: 'Setiap SPPG wajib mampu memproduksi minimum 2.500 porsi dan maksimum 3.000 porsi per hari operasional.' },
      { id: 22, kode: 'Pasal 5', judul: 'Persyaratan Fasilitas', isi: 'Area dapur minimal 120 m², dilengkapi zona bersih terpisah, ventilasi mekanis, dan sistem air bersih berkelanjutan.' },
      { id: 23, kode: 'Pasal 6', judul: 'SDM dan Kompetensi', isi: 'Kepala dapur wajib bersertifikasi higiene pangan. Minimal 80% staf pengolah mengikuti pelatihan WHO Five Keys sebelum operasi.' },
    ],
  },
  {
    id: 3, kode: 'Bab III', judul: 'Lima Kunci Keamanan Pangan', status: 'berlaku',
    deskripsi: 'Adaptasi WHO Five Keys to Safer Food untuk konteks SPPG: jaga kebersihan, pisahkan mentah-matang, masak sempurna, jaga suhu, gunakan air & bahan aman.',
    pasals: [
      { id: 31, kode: 'Pasal 7', judul: 'Kunci 1 — Jaga Kebersihan', isi: 'Cuci tangan dengan sabun sebelum menyentuh bahan pangan, setelah dari toilet, dan setelah menangani bahan mentah. Sanitasi permukaan setiap pergantian batch.' },
      { id: 32, kode: 'Pasal 8', judul: 'Kunci 2 — Pisahkan Mentah & Matang', isi: 'Gunakan peralatan berbeda (talenan warna berbeda) untuk bahan mentah dan makanan siap saji. Simpan bahan mentah di rak bawah lemari pendingin.' },
      { id: 33, kode: 'Pasal 9', judul: 'Kunci 3 — Masak Hingga Matang', isi: 'Suhu inti daging dan unggas minimal 74°C, ikan 63°C, telur hingga kuning matang. Verifikasi dengan termometer kalibrasi.' },
      { id: 34, kode: 'Pasal 10', judul: 'Kunci 4 — Jaga Suhu Aman', isi: 'Makanan panas disimpan ≥60°C. Makanan dingin disimpan ≤5°C. Zona bahaya suhu 5–60°C tidak boleh dilewati lebih dari 2 jam.' },
      { id: 35, kode: 'Pasal 11', judul: 'Kunci 5 — Air & Bahan Baku Aman', isi: 'Gunakan air minum bersertifikasi atau yang telah dimasak. Bahan baku dari pemasok terdaftar BGN dengan bukti SLHS aktif.' },
    ],
  },
  {
    id: 4, kode: 'Bab IV', judul: 'Window 4 Jam Pengolahan ke Konsumsi', status: 'berlaku',
    deskripsi: 'Standar batas waktu maksimum antara selesai pengolahan hingga konsumsi oleh penerima manfaat tidak boleh melebihi 4 jam.',
    pasals: [
      { id: 41, kode: 'Pasal 12', judul: 'Definisi Window Waktu', isi: 'Window dimulai saat batch selesai dimasak (suhu inti tercapai) dan berakhir saat porsi terakhir dikonsumsi di titik distribusi.' },
      { id: 42, kode: 'Pasal 13', judul: 'Prosedur Penahanan Batch', isi: 'Batch yang melampaui 4 jam window wajib ditahan (hold), dilaporkan, dan tidak didistribusikan. Insiden dicatat dalam sistem log digital.' },
    ],
  },
  {
    id: 5, kode: 'Bab V', judul: 'Standar Distribusi 30 Menit / 6 Km', status: 'berlaku',
    deskripsi: 'Batas maksimum waktu tempuh distribusi 30 menit atau 6 km dari SPPG ke titik konsumsi, dengan persyaratan suhu kendaraan.',
    pasals: [
      { id: 51, kode: 'Pasal 14', judul: 'Radius dan Waktu Distribusi', isi: 'SPPG hanya boleh mendistribusikan ke sekolah dalam radius 6 km atau waktu tempuh ≤30 menit pada kondisi lalu lintas normal.' },
      { id: 52, kode: 'Pasal 15', judul: 'Persyaratan Kendaraan', isi: 'Kendaraan distribusi wajib dilengkapi kontainer termal atau pendingin. Suhu isi kendaraan dipantau dan dicatat setiap pengiriman. Suhu ≤5°C untuk makanan dingin.' },
    ],
  },
  {
    id: 6, kode: 'Bab VI', judul: 'Food Sample 2 Porsi per Batch', status: 'berlaku',
    deskripsi: 'Setiap batch produksi wajib menyimpan 2 porsi sebagai sampel selama 3 hari penuh untuk keperluan investigasi jika terjadi insiden kesehatan.',
    pasals: [
      { id: 61, kode: 'Pasal 16', judul: 'Kewajiban Pengambilan Sampel', isi: 'SPPG wajib menyisihkan 2 porsi per batch di wadah berlabel (nama menu, tanggal, kode SPPG) sebelum distribusi dimulai.' },
      { id: 62, kode: 'Pasal 17', judul: 'Penyimpanan dan Pemusnahan Sampel', isi: 'Sampel disimpan pada suhu ≤5°C selama 72 jam. Setelah 72 jam tanpa insiden, sampel dimusnahkan dan dicatat dalam log.' },
    ],
  },
  {
    id: 7, kode: 'Bab VII', judul: 'Sertifikasi SLHS, Halal, dan HACCP', status: 'berlaku',
    deskripsi: 'Persyaratan sertifikasi terpadu dari Kemenkes (SLHS), BPJPH (Halal), dan BPOM/BGN (HACCP) sebagai prasyarat operasional SPPG.',
    pasals: [
      { id: 71, kode: 'Pasal 18', judul: 'Sertifikat Laik Higiene Sanitasi (SLHS)', isi: 'Setiap SPPG wajib memiliki SLHS aktif dari Dinas Kesehatan setempat sebelum beroperasi. SLHS diperbarui setiap 2 tahun atau setelah renovasi fasilitas.' },
      { id: 72, kode: 'Pasal 19', judul: 'Sertifikasi Halal BPJPH', isi: 'Seluruh menu dan bahan baku SPPG wajib memiliki sertifikat halal BPJPH atau menggunakan bahan yang terdaftar dalam daftar positif halal.' },
      { id: 73, kode: 'Pasal 20', judul: 'Implementasi HACCP', isi: 'SPPG diwajibkan menerapkan 7 prinsip HACCP (Codex Alimentarius) dengan rencana HACCP tertulis yang disetujui BPOM. Audit HACCP dilakukan minimal 2x per tahun.' },
    ],
  },
  {
    id: 8, kode: 'Bab VIII', judul: 'Pengawasan & Sanksi', status: 'berlaku',
    deskripsi: 'Mekanisme pengawasan Tauwas (Tim Audit Keamanan Pangan), prosedur eskalasi insiden, dan sanksi administratif hingga pencabutan izin.',
    pasals: [
      { id: 81, kode: 'Pasal 21', judul: 'Tim Pengawas (Tauwas)', isi: 'BGN membentuk Tim Audit Keamanan Pangan (Tauwas) di setiap provinsi. Tauwas berwenang melakukan inspeksi mendadak dan mengambil sampel uji laboratorium.' },
      { id: 82, kode: 'Pasal 22', judul: 'Prosedur Eskalasi Insiden', isi: 'Insiden KLB (Kejadian Luar Biasa) wajib dilaporkan dalam 1 jam ke BGN Pusat. Eskalasi ke Kemenkes dalam 6 jam. Investigasi gabungan dalam 24 jam.' },
      { id: 83, kode: 'Pasal 23', judul: 'Sanksi Administratif', isi: 'Peringatan tertulis (tingkat I), penghentian sementara operasional (tingkat II), pencabutan izin SPPG (tingkat III) sesuai berat pelanggaran dan rekam jejak.' },
    ],
  },
]

export const DAPUR_INIT = [
  { id:'SPPG-JK-001', name:'SPPG Jakarta Pusat 1', prov:'DKI Jakarta', porsi:3200, comply:91, haccp:'A', iotOk:true,  qrOk:true,  bpomOk:true,  lastSync:'2 menit lalu',  status:'active',   risk:'low',  apps:['IoT','QR','BPOM'] },
  { id:'SPPG-JK-002', name:'SPPG Jakarta Utara 3', prov:'DKI Jakarta', porsi:2850, comply:78, haccp:'B', iotOk:false, qrOk:true,  bpomOk:true,  lastSync:'18 menit lalu', status:'active',   risk:'med',  apps:['QR','BPOM'] },
  { id:'SPPG-JB-001', name:'SPPG Bandung Selatan', prov:'Jawa Barat',  porsi:2100, comply:62, haccp:'C', iotOk:false, qrOk:false, bpomOk:true,  lastSync:'45 menit lalu', status:'suspended',risk:'high', apps:['BPOM'] },
  { id:'SPPG-JB-002', name:'SPPG Bekasi Barat 2',  prov:'Jawa Barat',  porsi:1980, comply:87, haccp:'A', iotOk:true,  qrOk:true,  bpomOk:true,  lastSync:'5 menit lalu',  status:'active',   risk:'low',  apps:['IoT','QR','BPOM'] },
  { id:'SPPG-JT-001', name:'SPPG Semarang Tengah', prov:'Jawa Tengah', porsi:1760, comply:74, haccp:'B', iotOk:true,  qrOk:false, bpomOk:true,  lastSync:'12 menit lalu', status:'active',   risk:'med',  apps:['IoT','BPOM'] },
  { id:'SPPG-JT-002', name:'SPPG Klaten Utara',    prov:'Jawa Tengah', porsi:1320, comply:58, haccp:'C', iotOk:false, qrOk:false, bpomOk:false, lastSync:'3 jam lalu',    status:'suspended',risk:'high', apps:[] },
  { id:'SPPG-JI-001', name:'SPPG Surabaya Selatan',prov:'Jawa Timur',  porsi:2900, comply:89, haccp:'A', iotOk:true,  qrOk:true,  bpomOk:true,  lastSync:'4 menit lalu',  status:'active',   risk:'low',  apps:['IoT','QR','BPOM'] },
  { id:'SPPG-SN-001', name:'SPPG Makassar Utara',  prov:'Sulsel',      porsi:1550, comply:80, haccp:'B', iotOk:true,  qrOk:true,  bpomOk:false, lastSync:'8 menit lalu',  status:'active',   risk:'med',  apps:['IoT','QR'] },
  { id:'SPPG-BA-001', name:'SPPG Denpasar Timur',  prov:'Bali',        porsi:1200, comply:93, haccp:'A', iotOk:true,  qrOk:true,  bpomOk:true,  lastSync:'1 menit lalu',  status:'active',   risk:'low',  apps:['IoT','QR','BPOM'] },
  { id:'SPPG-NT-001', name:'SPPG Kupang Tengah',   prov:'NTT',         porsi:980,  comply:61, haccp:'C', iotOk:false, qrOk:false, bpomOk:true,  lastSync:'1j 20m lalu',   status:'active',   risk:'high', apps:['BPOM'] },
  { id:'SPPG-PA-001', name:'SPPG Jayapura Selatan',prov:'Papua',       porsi:870,  comply:55, haccp:'C', iotOk:false, qrOk:false, bpomOk:false, lastSync:'6 jam lalu',    status:'suspended',risk:'high', apps:[] },
  { id:'SPPG-AC-001', name:'SPPG Banda Aceh Kota', prov:'Aceh',        porsi:1100, comply:84, haccp:'A', iotOk:true,  qrOk:true,  bpomOk:true,  lastSync:'7 menit lalu',  status:'active',   risk:'low',  apps:['IoT','QR','BPOM'] },
]

export const AI_RECS_INIT = [
  {
    id: 'REC-001', priority: 'urgent', category: 'Keamanan Pangan', icon: '🚨',
    title: 'Tangguhkan 3 dapur HACCP Gate C di NTT & Papua',
    rationale: 'Compliance di bawah 65% selama 14 hari berturut-turut. Korelasi tinggi dengan 2 insiden KLB aktif (INC-0205, INC-0202). Probabilitas insiden lanjutan: 78%.',
    impact: 'Cegah estimasi 42 kasus keracunan / bulan · Lindungi 1.850 penerima manfaat',
    source: 'Model prediktif HACCP + pola insiden historis 90 hari',
    status: 'pending',
  },
  {
    id: 'REC-002', priority: 'urgent', category: 'IoT & Cold Chain', icon: '🌡',
    title: 'Pasang sensor IoT di 8 dapur Jawa Tengah yang offline >3 jam',
    rationale: 'SPPG Klaten Utara dan 7 dapur sekitarnya tidak ada data sensor 3+ jam. Blind spot cold-chain menyumbang 38% penyebab insiden (akar penyebab terkonfirmasi).',
    impact: 'Tutup blind spot 3.080 porsi/hari · Reduce risk rate 22%',
    source: 'Analisis gap IoT coverage + distribusi akar penyebab insiden',
    status: 'pending',
  },
  {
    id: 'REC-003', priority: 'high', category: 'Distribusi', icon: '🚐',
    title: 'Optimalkan rute distribusi Jakarta Utara — waktu rata-rata 34 menit',
    rationale: 'SPPG Jakarta Utara 3 melebihi batas 30 menit Juknis 401.1. Data GPS 7 hari terakhir menunjukkan kemacetan titik Kelapa Gading pukul 10.30–11.00.',
    impact: 'Hemat 4 menit rata-rata per rute · Pastikan hot-hold aman',
    source: 'Log distribusi GPS + toleransi waktu Juknis Bab 5 Pasal 12',
    status: 'pending',
  },
  {
    id: 'REC-004', priority: 'high', category: 'QR Traceability', icon: '📱',
    title: 'Percepat onboarding QR untuk 14 dapur Jawa Barat yang belum terhubung',
    rationale: 'QR traceability masih 61% di Jawa Barat vs target nasional 85% Q3 2026. Gap ini menghambat recall response time jika ada KLB.',
    impact: 'Tingkatkan traceability 24 poin · Percepat recall response 2–4 jam',
    source: 'Dashboard QR coverage + roadmap Q3 target BGN',
    status: 'pending',
  },
  {
    id: 'REC-005', priority: 'high', category: 'Pelatihan SDM', icon: '👨‍🍳',
    title: 'Jadwalkan re-training HACCP Prinsip 2 & 3 untuk dapur Gate B/C',
    rationale: 'Hot-holding gagal dan waktu distribusi terlewati adalah 60% akar penyebab insiden 30 hari. Kedua prinsip ini dapat diperbaiki via intervensi SDM langsung.',
    impact: 'Potensi kurangi insiden 30% dalam 45 hari · 8 dapur prioritas',
    source: 'Distribusi akar penyebab kasus + log checklist proses',
    status: 'pending',
  },
  {
    id: 'REC-006', priority: 'medium', category: 'BPOM Sertifikasi', icon: '📋',
    title: 'Percepat perpanjangan SLHS untuk 4 dapur yang jatuh tempo bulan ini',
    rationale: 'SPPG Bandung Selatan, Klaten Utara, Kupang Tengah, dan Jayapura Selatan — SLHS (Sertifikat Laik Higiene Sanitasi) akan habis ≤30 hari.',
    impact: 'Cegah operational disruption · Hindari sanksi regulasi BPOM',
    source: 'Database SLHS BPOM + jadwal audit BGN',
    status: 'pending',
  },
  {
    id: 'REC-007', priority: 'medium', category: 'Nutrisi & Menu', icon: '🥗',
    title: 'Variasikan menu protein di 6 daerah dengan stunting prevalensi >20%',
    rationale: 'Data Riskesdas & pilot survey BGN menunjukkan korelasi menu monoton (ayam goreng berulang) dengan asupan mikro kurang. Rotasi 5-hari direkomendasikan.',
    impact: 'Tingkatkan asupan zinc & vitamin A estimasi 15% · 18.000 anak',
    source: 'Pilot survey nutrisi Jan–Apr 2026 + profil menu aktif per SPPG',
    status: 'pending',
  },
]
