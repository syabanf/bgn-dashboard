// BGN MBG Dashboard — shared data
// Numbers anchored to provided source PDFs (BGN Juknis 401.1/2025, BPOM, UGM/JPPI).

export const BGN_DATA = (() => {
  // 38 Indonesian provinces with approximate map coords (1200x460 viewBox).
  // x = (lng - 95) * 26, y = (6 - lat) * 26  (rounded for layout)
  const provinces = [
    { code: 'AC', name: 'Aceh',                x: 44,   y: 34,  sppg: 612,  porsi: 1530000, comply: 91, risk: 'low'  },
    { code: 'SU', name: 'Sumatera Utara',      x: 104,  y: 99,  sppg: 1289, porsi: 3220000, comply: 86, risk: 'med'  },
    { code: 'SB', name: 'Sumatera Barat',      x: 146,  y: 177, sppg: 712,  porsi: 1780000, comply: 88, risk: 'low'  },
    { code: 'RI', name: 'Riau',                x: 169,  y: 143, sppg: 698,  porsi: 1745000, comply: 84, risk: 'med'  },
    { code: 'KR', name: 'Kepulauan Riau',      x: 247,  y: 130, sppg: 188,  porsi: 470000,  comply: 90, risk: 'low'  },
    { code: 'JA', name: 'Jambi',               x: 224,  y: 198, sppg: 412,  porsi: 1030000, comply: 87, risk: 'low'  },
    { code: 'BE', name: 'Bengkulu',            x: 190,  y: 255, sppg: 248,  porsi: 620000,  comply: 89, risk: 'low'  },
    { code: 'SS', name: 'Sumatera Selatan',    x: 234,  y: 242, sppg: 821,  porsi: 2052000, comply: 82, risk: 'med'  },
    { code: 'BB', name: 'Kep. Bangka Belitung', x: 296, y: 226, sppg: 162,  porsi: 405000,  comply: 92, risk: 'low'  },
    { code: 'LA', name: 'Lampung',             x: 260,  y: 286, sppg: 836,  porsi: 2090000, comply: 85, risk: 'med'  },
    { code: 'BT', name: 'Banten',              x: 286,  y: 322, sppg: 1142, porsi: 2855000, comply: 79, risk: 'high' },
    { code: 'JK', name: 'DKI Jakarta',         x: 307,  y: 317, sppg: 1568, porsi: 4180000, comply: 94, risk: 'low'  },
    { code: 'JB', name: 'Jawa Barat',          x: 348,  y: 335, sppg: 3812, porsi: 9530000, comply: 81, risk: 'high' },
    { code: 'JT', name: 'Jawa Tengah',         x: 403,  y: 351, sppg: 3266, porsi: 8165000, comply: 87, risk: 'med'  },
    { code: 'YO', name: 'DI Yogyakarta',       x: 410,  y: 369, sppg: 482,  porsi: 1205000, comply: 95, risk: 'low'  },
    { code: 'JI', name: 'Jawa Timur',          x: 465,  y: 351, sppg: 3548, porsi: 8870000, comply: 84, risk: 'med'  },
    { code: 'BA', name: 'Bali',                x: 525,  y: 377, sppg: 521,  porsi: 1302000, comply: 93, risk: 'low'  },
    { code: 'NB', name: 'Nusa Tenggara Barat', x: 582,  y: 382, sppg: 612,  porsi: 1530000, comply: 78, risk: 'high' },
    { code: 'NT', name: 'Nusa Tenggara Timur', x: 676,  y: 390, sppg: 728,  porsi: 1820000, comply: 72, risk: 'high' },
    { code: 'KB', name: 'Kalimantan Barat',    x: 390,  y: 156, sppg: 568,  porsi: 1420000, comply: 83, risk: 'med'  },
    { code: 'KT', name: 'Kalimantan Tengah',   x: 478,  y: 200, sppg: 348,  porsi: 870000,  comply: 81, risk: 'med'  },
    { code: 'KS', name: 'Kalimantan Selatan',  x: 528,  y: 234, sppg: 482,  porsi: 1205000, comply: 86, risk: 'low'  },
    { code: 'KI', name: 'Kalimantan Timur',    x: 559,  y: 143, sppg: 412,  porsi: 1030000, comply: 88, risk: 'low'  },
    { code: 'KU', name: 'Kalimantan Utara',    x: 559,  y: 78,  sppg: 142,  porsi: 355000,  comply: 84, risk: 'med'  },
    { code: 'GO', name: 'Gorontalo',           x: 715,  y: 138, sppg: 162,  porsi: 405000,  comply: 80, risk: 'med'  },
    { code: 'SA', name: 'Sulawesi Utara',      x: 775,  y: 130, sppg: 312,  porsi: 780000,  comply: 86, risk: 'low'  },
    { code: 'ST', name: 'Sulawesi Tengah',     x: 676,  y: 195, sppg: 388,  porsi: 970000,  comply: 76, risk: 'high' },
    { code: 'SR', name: 'Sulawesi Barat',      x: 624,  y: 226, sppg: 188,  porsi: 470000,  comply: 79, risk: 'med'  },
    { code: 'SN', name: 'Sulawesi Selatan',    x: 637,  y: 260, sppg: 1248, porsi: 3120000, comply: 85, risk: 'med'  },
    { code: 'SG', name: 'Sulawesi Tenggara',   x: 715,  y: 260, sppg: 312,  porsi: 780000,  comply: 82, risk: 'med'  },
    { code: 'MA', name: 'Maluku',              x: 871,  y: 252, sppg: 198,  porsi: 495000,  comply: 74, risk: 'high' },
    { code: 'MU', name: 'Maluku Utara',        x: 845,  y: 130, sppg: 142,  porsi: 355000,  comply: 77, risk: 'high' },
    { code: 'PB', name: 'Papua Barat',         x: 968,  y: 200, sppg: 118,  porsi: 295000,  comply: 71, risk: 'high' },
    { code: 'PD', name: 'Papua Barat Daya',    x: 940,  y: 175, sppg: 92,   porsi: 230000,  comply: 70, risk: 'high' },
    { code: 'PA', name: 'Papua',               x: 1058, y: 250, sppg: 162,  porsi: 405000,  comply: 68, risk: 'high' },
    { code: 'PT', name: 'Papua Tengah',        x: 1018, y: 235, sppg: 88,   porsi: 220000,  comply: 67, risk: 'high' },
    { code: 'PG', name: 'Papua Pegunungan',    x: 1058, y: 215, sppg: 76,   porsi: 190000,  comply: 65, risk: 'high' },
    { code: 'PS', name: 'Papua Selatan',       x: 1098, y: 290, sppg: 102,  porsi: 255000,  comply: 73, risk: 'high' },
  ];

  // National KPIs (today snapshot)
  const kpis = {
    porsiToday: 71840000,         // portions served today
    porsiTarget: 82900000,        // national target
    sppgActive: 27641,            // operational SPPG (per BGN dashboard 9 May 2026)
    sppgTarget: 35000,            // pedoman target
    studentsServed: 20118000,     // satuan pendidikan reach proxy
    complianceRate: 87.3,         // % SPPG green-band on HACCP today
    incidentsOpen: 14,            // active investigations
    incidentsClosed30d: 47,
    avgDistMinutes: 22,           // avg distribution time (max 30)
    sampleRetention: 99.1,        // % batch with food sample retained 3 days
    haccpReady: 64,               // % SPPG with full HACCP readiness gate cleared
    iotCoverage: 41,              // % SPPG with IoT temp logger
    qrTraceability: 58,           // % batch with QR end-to-end
    slhsCoverage: 73,             // % SPPG SLHS valid
    halalCoverage: 81,            // % SPPG halal valid
    publicTrust: 78,              // public trust index 0–100
  };

  // HACCP 7-principle compliance per category (% SPPG passing)
  const haccpMatrix = [
    { cat: 'Sentral / >2.000 porsi',   row: [62, 68, 58, 81, 54, 71, 47] },
    { cat: 'Reguler / 1.000–2.000',    row: [74, 78, 71, 88, 66, 79, 61] },
    { cat: 'Kecil / <1.000 porsi',     row: [81, 84, 79, 91, 75, 84, 72] },
    { cat: 'Sentinel pilot (3 prov.)', row: [94, 95, 92, 98, 89, 96, 88] },
  ];
  const haccpHeads = ['1. Identifikasi Bahaya','2. Titik Kontrol Kritis','3. Batas Suhu/Waktu','4. Pemantauan Rutin','5. Tindakan Korektif','6. Verifikasi & Audit','7. Pencatatan'];

  // Risk timeline — 30 day incidents
  const incidents30d = [
    2,1,3,2,4,5,3,2,4,6,7,5,3,2,4,3,5,8,6,4,3,2,3,4,5,7,5,3,2,1
  ];

  // Operational alerts (live feed)
  const alerts = [
    { sev: 'risk', t: 'Suhu hot-holding < 60°C', meta: 'SPPG Cipinang Besar, Jakarta Tim. · Batch B-2026-MA-091', at: '2 min', action: 'Auto-hold' },
    { sev: 'risk', t: 'Window 4 jam terlewati', meta: 'SPPG Bogor Selatan · Batch B-2026-JB-1240', at: '7 min', action: 'Disposal' },
    { sev: 'warn', t: 'Cold storage chiller drift +1.8°C', meta: 'SPPG Sleman Tengah, DIY · Sensor C-04', at: '14 min', action: 'Tech dispatch' },
    { sev: 'warn', t: 'Suhu inti masak protein 67°C', meta: 'SPPG Tabanan, Bali · Menu Ayam Goreng', at: '23 min', action: 'Re-cook' },
    { sev: 'info', t: 'Sertifikat SLHS akan kedaluwarsa', meta: 'SPPG Bandung Wetan · 14 hari lagi', at: '38 min', action: 'Renew' },
    { sev: 'safe', t: 'Audit BPOM lulus — 12 SPPG', meta: 'Batch audit harian Sulawesi Selatan', at: '1 j', action: 'Logged' },
    { sev: 'warn', t: '3 keluhan rasa dari sekolah', meta: 'SDN 12 Mataram, NTB · Menu Telur Balado', at: '1 j', action: 'Investigate' },
    { sev: 'risk', t: 'Driver overdistance 38 mnt / 9 km', meta: 'SPPG Manokwari · Distribusi rute 4', at: '2 j', action: 'Re-route' },
  ];

  // SPPG operational table (sample of 12 high-volume / monitored kitchens)
  const sppgList = [
    { id: 'SPPG-JB-0241', name: 'SPPG Cipinang Besar',       prov: 'DKI Jakarta',     porsi: 2980, score: 96, risk: 'low',  haccp: 'A', slhs: true,  halal: true,  inc: 0 },
    { id: 'SPPG-JB-1240', name: 'SPPG Bogor Selatan',        prov: 'Jawa Barat',      porsi: 2840, score: 71, risk: 'high', haccp: 'C', slhs: true,  halal: true,  inc: 2 },
    { id: 'SPPG-JT-0512', name: 'SPPG Semarang Utara',       prov: 'Jawa Tengah',     porsi: 2620, score: 89, risk: 'low',  haccp: 'A', slhs: true,  halal: true,  inc: 0 },
    { id: 'SPPG-JI-0884', name: 'SPPG Surabaya Pusat',       prov: 'Jawa Timur',      porsi: 2950, score: 84, risk: 'med',  haccp: 'B', slhs: true,  halal: true,  inc: 1 },
    { id: 'SPPG-NT-0118', name: 'SPPG Kupang Tengah',        prov: 'Nusa Tenggara T.', porsi: 1840, score: 62, risk: 'high', haccp: 'D', slhs: false, halal: true,  inc: 1 },
    { id: 'SPPG-NB-0204', name: 'SPPG Mataram Barat',        prov: 'Nusa Tenggara B.', porsi: 2120, score: 68, risk: 'high', haccp: 'C', slhs: true,  halal: true,  inc: 1 },
    { id: 'SPPG-BA-0066', name: 'SPPG Tabanan',              prov: 'Bali',            porsi: 1740, score: 91, risk: 'low',  haccp: 'A', slhs: true,  halal: true,  inc: 0 },
    { id: 'SPPG-SN-0421', name: 'SPPG Makassar Timur',       prov: 'Sulawesi Selatan', porsi: 2680, score: 86, risk: 'med',  haccp: 'B', slhs: true,  halal: true,  inc: 0 },
    { id: 'SPPG-PA-0018', name: 'SPPG Jayapura Selatan',     prov: 'Papua',           porsi: 1280, score: 58, risk: 'high', haccp: 'D', slhs: false, halal: false, inc: 2 },
    { id: 'SPPG-PB-0011', name: 'SPPG Manokwari',            prov: 'Papua Barat',     porsi: 1140, score: 64, risk: 'high', haccp: 'C', slhs: false, halal: true,  inc: 1 },
    { id: 'SPPG-MA-0028', name: 'SPPG Ambon Pusat',          prov: 'Maluku',          porsi: 1560, score: 70, risk: 'high', haccp: 'C', slhs: true,  halal: true,  inc: 1 },
    { id: 'SPPG-YO-0055', name: 'SPPG Sleman Tengah',        prov: 'DI Yogyakarta',   porsi: 2360, score: 93, risk: 'low',  haccp: 'A', slhs: true,  halal: true,  inc: 0 },
  ];

  // Public — today's national menu
  const menuToday = [
    { name: 'Nasi + Ayam Bumbu Kuning + Tumis Buncis + Pisang',  kcal: 612, protein: 28, lokasi: 'Jawa & Bali' },
    { name: 'Nasi + Ikan Cakalang Suwir + Sayur Lodeh + Jeruk',  kcal: 588, protein: 31, lokasi: 'Sulawesi & Maluku' },
    { name: 'Nasi + Telur Balado + Sup Sayuran + Pepaya',         kcal: 574, protein: 24, lokasi: 'Sumatera' },
    { name: 'Nasi + Daging Sapi Lada Hitam + Capcay + Apel',      kcal: 638, protein: 32, lokasi: 'Kalimantan' },
  ];

  // Public — recent inspection log (BPOM + BGN)
  const inspections = [
    { date: '09 May 2026', who: 'BPOM RI', target: 'SPPG Cipinang Besar — DKI Jakarta',     result: 'Lulus',  action: 'Sertifikat SLHS diperpanjang 6 bulan' },
    { date: '09 May 2026', who: 'BGN Audit', target: 'SPPG Sleman Tengah — DI Yogyakarta',  result: 'Lulus',  action: 'Naik gate B → A (HACCP-ready)' },
    { date: '08 May 2026', who: 'BPOM Lab', target: 'SPPG Bogor Selatan — Jawa Barat',      result: 'Tindak lanjut', action: '12 batch ditahan, recall menu Sayur Lodeh' },
    { date: '08 May 2026', who: 'BPOM RI', target: 'SPPG Mataram Barat — NTB',              result: 'Tindak lanjut', action: 'Pelatihan ulang hot-holding · Re-audit 14 hari' },
    { date: '07 May 2026', who: 'BGN Audit', target: 'SPPG Makassar Timur — Sulsel',        result: 'Lulus',  action: 'CCP cooking ditingkatkan ke 72°C' },
    { date: '07 May 2026', who: 'Kemenkes', target: 'SPPG Manokwari — Papua Barat',         result: 'Tindak lanjut', action: 'Pengadaan thermometer digital + IoT phase 1' },
  ];

  // Food safety data source registry
  const dataSources = [
    { id: 'iot-sensors',    name: 'Sensor Suhu IoT',              cat: 'Suhu Real-time',  status: 'live',    lastSync: '< 1 mnt',   records: 11328,   coverage: 41,  desc: 'Logger suhu di panci masak, hot-holding, cold storage, dan kendaraan distribusi — sinyal setiap 60 detik.' },
    { id: 'qr-scan',        name: 'Pemindai QR Batch',            cat: 'Traceabilitas',   status: 'live',    lastSync: '< 1 mnt',   records: 2400000, coverage: 58,  desc: 'Scan QR per batch dari dapur (keluar) hingga sekolah penerima (diterima). Data end-to-end.' },
    { id: 'bpom-api',       name: 'API Inspeksi BPOM',            cat: 'Regulasi',        status: 'live',    lastSync: '2 mnt lalu', records: 18420,   coverage: 94,  desc: 'Hasil inspeksi lapangan, status sertifikasi, dan keputusan recall dari BPOM RI.' },
    { id: 'bgn-central',    name: 'Database Pusat BGN',           cat: 'Operasional',     status: 'live',    lastSync: '5 mnt lalu', records: 27641,   coverage: 100, desc: 'Master data SPPG aktif, jadwal distribusi, penerima manfaat, dan riwayat batch harian.' },
    { id: 'kemenkes-slhs',  name: 'Registry SLHS Kemenkes',       cat: 'Sertifikasi',     status: 'live',    lastSync: '1 j lalu',   records: 20178,   coverage: 73,  desc: 'Validitas Sertifikat Laik Higiene Sanitasi (kebersihan dapur) per SPPG.' },
    { id: 'bpjph-halal',    name: 'Registry Halal BPJPH',         cat: 'Sertifikasi',     status: 'live',    lastSync: '1 j lalu',   records: 22389,   coverage: 81,  desc: 'Status sertifikasi halal bahan baku, proses produksi, hingga distribusi per SPPG.' },
    { id: 'manual-log',     name: 'Log Manual Pengawas Lapangan', cat: 'Input Manual',    status: 'partial', lastSync: '3 j lalu',   records: 8841,    coverage: 62,  desc: 'Input harian petugas SKM: suhu terukur, checklist WHO 5 Keys, temuan visual.' },
    { id: 'lab-results',    name: 'Hasil Uji Laboratorium Mikro', cat: 'Lab',             status: 'lag',     lastSync: '48 j lalu',  records: 341,     coverage: 28,  desc: 'Uji Salmonella, E. coli, dan coliform dari food sample tersimpan (3 hari). Turnaround 48 jam.' },
  ];

  // Operational food safety daily log (pre-seeded sample entries)
  const recentLogs = [
    { id: 'LOG-2026-0892', ts: '07:42', sppg: 'SPPG Cipinang Besar',  prov: 'DKI Jakarta',      officer: 'Suherman, SKM',    batch: 'B-2026-JK-0241', cook: 72.4, hold: 61.2, storage: 3.8, truck: 4.1, distMin: 22, sampleTaken: true,  keys: [true,true,true,true,true],   notes: '',                                                                              ok: true  },
    { id: 'LOG-2026-0891', ts: '07:38', sppg: 'SPPG Sleman Tengah',   prov: 'DI Yogyakarta',    officer: 'Ratna W., SKM',    batch: 'B-2026-YO-0055', cook: 74.1, hold: 62.0, storage: 4.1, truck: 3.9, distMin: 18, sampleTaken: true,  keys: [true,true,true,true,true],   notes: '',                                                                              ok: true  },
    { id: 'LOG-2026-0890', ts: '07:31', sppg: 'SPPG Bogor Selatan',   prov: 'Jawa Barat',       officer: 'Hendra P.',        batch: 'B-2026-JB-1240', cook: 66.2, hold: 58.1, storage: 4.9, truck: 5.2, distMin: 38, sampleTaken: true,  keys: [true,false,false,true,true], notes: 'Suhu masak 66.2°C < batas 70°C. Hot-holding 58.1°C < 60°C. Jarak distribusi 38 mnt > 30 mnt. Auto-hold diaktifkan.', ok: false },
    { id: 'LOG-2026-0889', ts: '07:25', sppg: 'SPPG Makassar Timur',  prov: 'Sulawesi Selatan', officer: 'Aminah, SKM',      batch: 'B-2026-SN-0421', cook: 71.8, hold: 60.4, storage: 3.9, truck: 4.0, distMin: 24, sampleTaken: true,  keys: [true,true,true,true,true],   notes: '',                                                                              ok: true  },
    { id: 'LOG-2026-0888', ts: '07:19', sppg: 'SPPG Tabanan',         prov: 'Bali',             officer: 'I Wayan S., SKM',  batch: 'B-2026-BA-0066', cook: 71.4, hold: 60.8, storage: 4.3, truck: 4.2, distMin: 26, sampleTaken: true,  keys: [true,true,true,true,true],   notes: '',                                                                              ok: true  },
  ];

  return { provinces, kpis, haccpMatrix, haccpHeads, incidents30d, alerts, sppgList, menuToday, inspections, dataSources, recentLogs };
})();
