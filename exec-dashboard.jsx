// Executive Dashboard — BOD level

const { useState: useStateE, useMemo: useMemoE } = React;

function ExecDashboard() {
  const D = window.BGN_DATA;
  const [tab, setTab] = useStateE('overview');
  const [selProv, setSelProv] = useStateE(null);
  const [modal, setModal] = useStateE(null);

  const titles = {
    overview:     'Executive Dashboard — Program Makan Bergizi (MBG)',
    geo:          'Sebaran Geografis — 38 Provinsi',
    haccp:        'Keamanan Pangan — Standar HACCP 7 Prinsip',
    ops:          'Operasional Dapur — Watchlist & Sensor Suhu',
    incidents:    'Kasus Aktif & Recall Tracker',
    penerima:     'Penerima Manfaat — Demografi & Sebaran',
    juknis:       'Juknis 401.1/2025 — Tata Kelola MBG',
    kpi:          'Strategic KPI — Scorecard BOD',
    logsuhu:      'Log Suhu Harian — Pemantauan Titik Kendali Kritis',
    logchecklist: 'Log Checklist Proses — Verifikasi per Tahapan Produksi',
    dapurops:     'Manajemen Dapur — Status & Kepatuhan SPPG',
    airek:        'Rekomendasi AI — Prioritas Tindakan Berbasis Data',
  };

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="nav-group">
          <div className="label">BOD Cockpit</div>
          <button className={`nav-item ${tab === 'overview'   ? 'active' : ''}`} onClick={() => setTab('overview')}>{Ico.dashboard} Overview</button>
          <button className={`nav-item ${tab === 'geo'        ? 'active' : ''}`} onClick={() => setTab('geo')}>{Ico.map} Geographic</button>
          <button className={`nav-item ${tab === 'haccp'      ? 'active' : ''}`} onClick={() => setTab('haccp')}>{Ico.shield} HACCP & Compliance</button>
          <button className={`nav-item ${tab === 'ops'        ? 'active' : ''}`} onClick={() => setTab('ops')}>{Ico.truck} SPPG Operations</button>
          <button className={`nav-item ${tab === 'incidents'  ? 'active' : ''}`} onClick={() => setTab('incidents')}>{Ico.alert} Incidents <span className="badge">{D.kpis.incidentsOpen}</span></button>
        </div>
        <div className="nav-group">
          <div className="label">Program</div>
          <button className={`nav-item ${tab === 'penerima'   ? 'active' : ''}`} onClick={() => setTab('penerima')}>{Ico.users} Penerima Manfaat</button>
          <button className={`nav-item ${tab === 'juknis'     ? 'active' : ''}`} onClick={() => setTab('juknis')}>{Ico.doc} Juknis 401.1/2025</button>
          <button className={`nav-item ${tab === 'kpi'        ? 'active' : ''}`} onClick={() => setTab('kpi')}>{Ico.flag} Strategic KPI</button>
        </div>
        <div className="nav-group">
          <div className="label">Operasional</div>
          <button className={`nav-item ${tab === 'logsuhu'      ? 'active' : ''}`} onClick={() => setTab('logsuhu')}>{Ico.thermo} Log Suhu Harian</button>
          <button className={`nav-item ${tab === 'logchecklist' ? 'active' : ''}`} onClick={() => setTab('logchecklist')}>{Ico.shield} Log Checklist Proses</button>
        </div>
        <div className="nav-group">
          <div className="label">Manajemen</div>
          <button className={`nav-item ${tab === 'dapurops' ? 'active' : ''}`} onClick={() => setTab('dapurops')}>{Ico.truck} Manajemen Dapur</button>
          <button className={`nav-item ${tab === 'airek'    ? 'active' : ''}`} onClick={() => setTab('airek')}>{Ico.flag} Rekomendasi AI</button>
        </div>
      </aside>

      <main className="main">
        <div className="page-head">
          <div>
            <h1>{titles[tab]}</h1>
            <div className="subtitle">Snapshot operasional nasional · 27.641 dapur SPPG aktif · 31 provinsi · Update real-time setiap 60 detik · SPPG = Satuan Pelayanan Pemenuhan Gizi (dapur gizi sekolah)</div>
          </div>
          <div className="actions">
            <button className="btn" onClick={() => setModal('filter')}>{Ico.filter} Filter</button>
            <button className="btn" onClick={() => { window.toast('Briefing PDF dihasilkan & diunduh', 'safe'); }}>{Ico.download} Briefing PDF</button>
            <button className="btn btn-primary" onClick={() => setModal('standup')}>{Ico.bell} Daily Stand-up</button>
          </div>
        </div>

        <Modal open={modal === 'filter'} onClose={() => setModal(null)} title="Filter Dashboard" w={520}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div><div style={{ fontSize: 11, color: 'var(--ink-500)', fontWeight: 700, marginBottom: 6 }}>PROVINSI</div>
              <select style={{ width: '100%', padding: '8px 12px', border: '1px solid var(--ink-200)', borderRadius: 6 }}>
                <option>Semua provinsi</option>
                {D.provinces.map(p => <option key={p.code}>{p.name}</option>)}
              </select></div>
            <div><div style={{ fontSize: 11, color: 'var(--ink-500)', fontWeight: 700, marginBottom: 6 }}>RISK LEVEL</div>
              <div style={{ display: 'flex', gap: 6 }}>
                {['Semua','Rendah','Sedang','Tinggi'].map(x => <button key={x} className="btn">{x}</button>)}
              </div></div>
            <div><div style={{ fontSize: 11, color: 'var(--ink-500)', fontWeight: 700, marginBottom: 6 }}>VOLUME</div>
              <div style={{ display: 'flex', gap: 6 }}>
                {['<1.000','1.000–2.000','>2.000'].map(x => <button key={x} className="btn">{x} porsi</button>)}
              </div></div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
              <button className="btn" onClick={() => setModal(null)}>Batal</button>
              <button className="btn btn-primary" onClick={() => { setModal(null); window.toast('Filter diterapkan', 'safe'); }}>Terapkan</button>
            </div>
          </div>
        </Modal>

        <Modal open={modal === 'standup'} onClose={() => setModal(null)} title="Daily Stand-up · 9 Mei 2026" w={620}>
          <div style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--ink-700)' }}>
            <div style={{ background: 'var(--bgn-navy-100)', padding: 14, borderRadius: 8, marginBottom: 12 }}>
              <strong style={{ color: 'var(--bgn-navy-deep)' }}>Headline pagi ini:</strong> 71,8 jt porsi tersaji · 14 insiden aktif · 2 recall harus diputuskan hari ini.
            </div>
            <ul style={{ paddingLeft: 18 }}>
              <li><strong>Decision required</strong> — Recall batch B-2026-JB-1240 (Bogor Selatan) — 34 dilaporkan. <button className="btn" style={{ marginLeft: 6 }} onClick={() => { setModal(null); window.toast('Recall disetujui · BPOM dinotifikasi', 'risk'); }}>Setujui Recall</button></li>
              <li>Pilot 100 SPPG Phase 1 progress: 87 dari 100 SPPG onboarded</li>
              <li>IoT rollout Q3: PO 12.000 sensor cold-chain disiapkan</li>
              <li>Roundtable sore: Kemenkes + BPOM + Kemendikdasmen 16.00 WIB</li>
            </ul>
          </div>
        </Modal>

        {/* KPI strip */}
        <div className="kpi-grid">
          <KPI label="Porsi Makanan Disajikan Hari Ini" accent="navy"
               value={`${(D.kpis.porsiToday/1e6).toFixed(1)}`} unit="jt porsi"
               delta="+4.2% vs kemarin"
               meta={`${((D.kpis.porsiToday/D.kpis.porsiTarget)*100).toFixed(1)}% dari target nasional 82,9 juta porsi`}
               spark={[42,48,51,55,60,58,62,68,71,69,72,71]}/>
          <KPI label="Dapur Gizi Aktif (SPPG)" accent="gold"
               value={D.kpis.sppgActive.toLocaleString('id-ID')} unit=""
               delta="+126 minggu ini"
               meta={`${((D.kpis.sppgActive/D.kpis.sppgTarget)*100).toFixed(0)}% dari target 35.000 dapur nasional`}
               spark={[24,25,26,26,27,27,27,27,28,27,27,28]}/>
          <KPI label="Dapur Lulus Standar Keamanan Pangan" accent="leaf"
               value={`${D.kpis.complianceRate}`} unit="%"
               delta="+1.8 poin vs minggu lalu"
               meta="Terverifikasi 7 prinsip HACCP secara digital"
               spark={[78,79,80,82,83,82,84,85,85,86,87,87]}/>
          <KPI label="Kasus Aktif Diselidiki" accent="risk"
               value={D.kpis.incidentsOpen} unit=""
               delta="-6 vs 7 hari lalu" deltaDir="down"
               meta={`${D.kpis.incidentsClosed30d} kasus selesai dalam 30 hari terakhir`}
               spark={D.incidents30d}/>
        </div>

        {/* Secondary KPIs */}
        <div className="kpi-grid" style={{ marginTop: 0 }}>
          <KPI label="Rata-rata Waktu Distribusi" accent="navy"
               value={D.kpis.avgDistMinutes} unit=" menit"
               meta="Batas aman Juknis 401.1: maks 30 menit / 6 km"/>
          <KPI label="Sampel Makanan Tersimpan" accent="leaf"
               value={D.kpis.sampleRetention} unit="%"
               meta="2 porsi per batch disimpan 3 hari — wajib Juknis"/>
          <KPI label="Batch Terlacak via QR" accent="gold"
               value={D.kpis.qrTraceability} unit="%"
               meta="Target Q3 2026: 85% · supplier→batch→sekolah"/>
          <KPI label="Dapur dengan Sensor IoT" accent="warn"
               value={D.kpis.iotCoverage} unit="%"
               meta="Cold chain, hot-holding, kendaraan"/>
        </div>

        {tab === 'overview'  && <OverviewTab D={D}/>}
        {tab === 'geo'       && <GeoTab D={D} selProv={selProv} setSelProv={setSelProv}/>}
        {tab === 'haccp'     && <HaccpTab D={D}/>}
        {tab === 'ops'       && <OpsTab D={D}/>}
        {tab === 'incidents' && <IncidentsTab D={D}/>}
        {tab === 'penerima'  && <PenerimaTab D={D}/>}
        {tab === 'juknis'    && <JuknisTab/>}
        {tab === 'kpi'       && <KpiTab D={D}/>}
        {tab === 'logsuhu'      && <LogSuhuPage D={D}/>}
        {tab === 'logchecklist' && <LogChecklistPage D={D}/>}
        {tab === 'dapurops'     && <DapurOpsPage D={D}/>}
        {tab === 'airek'        && <AIRecommendationPage D={D}/>}
      </main>
    </div>
  );
}

function PenerimaTab({ D }) {
  const [provTab, setProvTab] = React.useState('coverage');

  const jenjang = [
    { n: 'SD / MI', v: 9840, target: 24000, gender: [51, 49], icon: '🏫' },
    { n: 'SMP / MTs', v: 5120, target: 14000, gender: [49, 51], icon: '🏫' },
    { n: 'SMA / SMK / MA', v: 2980, target: 8500, gender: [48, 52], icon: '🏫' },
    { n: 'PAUD / TK', v: 1820, target: 6000, gender: [50, 50], icon: '🎒' },
    { n: 'Ibu Hamil & Menyusui', v: 358, target: 2000, gender: [100, 0], icon: '🤰' },
  ];
  const totalPenerima = jenjang.reduce((a, j) => a + j.v, 0);

  const monthlyGrowth = [
    { bln: 'Jan', v: 8.2 }, { bln: 'Feb', v: 10.4 }, { bln: 'Mar', v: 13.1 },
    { bln: 'Apr', v: 16.7 }, { bln: 'Mei', v: 20.1 },
  ];
  const maxG = 25;

  const nutriImpact = [
    { label: 'Anak yang sebelumnya sarapan tidak teratur', pct: 62, after: 91, color: 'safe' },
    { label: 'Perbaikan tingkat konsentrasi belajar (laporan guru)', pct: 71, after: null, color: 'gold' },
    { label: 'Penurunan absensi akibat sakit ringan', pct: 18, after: null, color: 'leaf' },
    { label: 'Stunting prevalensi daerah pilot (target turun)', pct: 24.4, after: 21.8, color: 'warn' },
  ];

  const topProvs = [...D.provinces]
    .sort((a, b) => b.porsi - a.porsi)
    .slice(0, 12)
    .map(p => ({
      ...p,
      penerima: Math.round(p.porsi / 250),
      school: Math.round(p.sppg * 1.8),
      coverage: Math.round((p.porsi / (p.porsi * 4.2)) * 100),
    }));

  return (
    <div className="row-gap">
      {/* ── KPI Strip ─────────────────────────────────────────────── */}
      <div className="kpi-grid">
        <KPI label="Total Penerima Manfaat Aktif" accent="navy"
          value={(totalPenerima / 1000).toFixed(1)} unit="jt anak"
          meta="Snapshot 9 Mei 2026 · naik 21% dari bulan lalu"
          spark={[8.2, 10.4, 13.1, 16.7, 20.1]}/>
        <KPI label="Satuan Pendidikan Terjangkau" accent="gold"
          value="20.118" unit=" sekolah"
          meta="SD / SMP / SMA / PAUD di 31 provinsi"/>
        <KPI label="Coverage terhadap Target Nasional" accent="leaf"
          value="24,3" unit="%"
          meta="Target: 82,9 juta anak — gap 62,8 juta"/>
        <KPI label="Rata-rata Porsi per Anak / Hari" accent="warn"
          value="3.571" unit=" porsi"
          meta="Ekuivalen kalori: 574–638 kkal · protein 24–32 g"/>
      </div>
      <div className="grid-2" style={{ gap: 14 }}>
        {/* ── Distribusi per Jenjang ─────────────────────────────── */}
        <Card title="Distribusi Penerima per Jenjang Pendidikan" subtitle="Dalam ribuan anak · vs target tahunan">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {jenjang.map(j => {
              const pct = (j.v / j.target) * 100;
              return (
                <div key={j.n} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5 }}>
                    <span style={{ fontWeight: 600 }}>{j.icon} {j.n}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>
                      <strong>{j.v.toLocaleString('id-ID')}K</strong>
                      <span style={{ color: 'var(--ink-400)' }}> / {j.target.toLocaleString('id-ID')}K target</span>
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div className="bar-track" style={{ flex: 1 }}>
                      <div className={`bar-fill ${pct >= 70 ? 'safe' : pct >= 40 ? 'gold' : 'risk'}`} style={{ width: `${Math.min(100, pct)}%` }}/>
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 700, color: pct >= 70 ? 'var(--status-safe)' : pct >= 40 ? 'var(--bgn-gold)' : 'var(--status-risk)', width: 38, textAlign: 'right' }}>{pct.toFixed(0)}%</span>
                  </div>
                  <div style={{ display: 'flex', gap: 12, fontSize: 10.5, color: 'var(--ink-400)' }}>
                    <span>👦 Laki-laki: {j.gender[0]}%</span>
                    <span>👧 Perempuan: {j.gender[1]}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* ── Pertumbuhan Penerima ───────────────────────────────── */}
        <Card title="Pertumbuhan Penerima Manfaat 2026" subtitle="Dalam juta anak · akumulasi per bulan">
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, height: 140, padding: '0 4px' }}>
            {monthlyGrowth.map((m, i) => (
              <div key={m.bln} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--bgn-navy-deep)' }}>{m.v}jt</span>
                <div style={{ width: '100%', background: i === monthlyGrowth.length - 1 ? 'var(--bgn-gold)' : 'var(--bgn-navy)', borderRadius: '4px 4px 0 0', height: `${(m.v / maxG) * 120}px`, transition: 'height 0.3s' }}/>
                <span style={{ fontSize: 11, color: 'var(--ink-500)' }}>{m.bln}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12, padding: '10px 14px', background: 'var(--bgn-sky-pale)', borderRadius: 8, fontSize: 12, color: 'var(--ink-700)', lineHeight: 1.6 }}>
            <strong style={{ color: 'var(--bgn-navy-deep)' }}>Tren:</strong> Pertumbuhan rata-rata +3,0 juta anak/bulan. Akselerasi terjadi mulai Maret 2026 seiring onboarding 100 SPPG pilot pertama.
          </div>
        </Card>
      </div>

      {/* ── Dampak Gizi ───────────────────────────────────────────── */}
      <Card title="Dampak Gizi & Kesehatan — Data Survei Pilot" subtitle="Survei 1.240 responden di 5 provinsi pilot · Maret–April 2026">
        <div className="grid-2" style={{ gap: 10 }}>
          {nutriImpact.map(n => (
            <div key={n.label} style={{ padding: '12px 14px', background: 'var(--bgn-sky-pale)', borderRadius: 8, border: '1px solid var(--border)' }}>
              <div style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--bgn-navy-deep)', marginBottom: 8, lineHeight: 1.4 }}>{n.label}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div className="bar-track" style={{ flex: 1 }}>
                  <div className={`bar-fill ${n.color}`} style={{ width: `${n.pct}%` }}/>
                </div>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, color: 'var(--bgn-navy-deep)', width: 50 }}>{n.pct}%</span>
              </div>
              {n.after && (
                <div style={{ marginTop: 6, fontSize: 11, color: 'var(--ink-500)' }}>
                  Sebelum program: <strong>{n.pct}%</strong> → Setelah 3 bulan: <strong style={{ color: 'var(--status-safe)' }}>{n.after}%</strong>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* ── Tabel Sebaran Provinsi ─────────────────────────────────── */}
      <Card title="Sebaran Penerima Manfaat per Provinsi" subtitle="12 provinsi dengan volume porsi tertinggi · diurutkan dari terbesar"
        padded={false}>
        <div style={{ display: 'flex', gap: 8, padding: '12px 16px 0' }}>
          {[['coverage','Coverage'],['volume','Volume Porsi'],['risk','Risk Level']].map(([v, l]) => (
            <button key={v} className={`btn ${provTab === v ? 'btn-primary' : ''}`} style={{ fontSize: 11 }} onClick={() => setProvTab(v)}>{l}</button>
          ))}
        </div>
        <div className="table-wrap">
          <table className="bgn">
            <thead>
              <tr>
                <th>#</th>
                <th>Provinsi</th>
                <th style={{ textAlign: 'right' }}>Penerima Est.</th>
                <th style={{ textAlign: 'right' }}>Porsi/hari</th>
                <th style={{ textAlign: 'right' }}>SPPG Aktif</th>
                <th style={{ textAlign: 'right' }}>Sekolah</th>
                <th>Kepatuhan HACCP</th>
                <th>Risk</th>
              </tr>
            </thead>
            <tbody>
              {topProvs.map((p, i) => (
                <tr key={p.code}>
                  <td style={{ fontFamily: 'var(--font-mono)', color: 'var(--ink-400)', fontSize: 11 }}>{i + 1}</td>
                  <td><span className="strong">{p.name}</span></td>
                  <td style={{ textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: 12 }}>
                    {(p.penerima).toLocaleString('id-ID')}
                  </td>
                  <td style={{ textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: 12 }}>
                    {(p.porsi / 1000).toFixed(0)}K
                  </td>
                  <td style={{ textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: 12 }}>{p.sppg.toLocaleString('id-ID')}</td>
                  <td style={{ textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: 12 }}>{p.school.toLocaleString('id-ID')}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div className="bar-track" style={{ width: 60 }}>
                        <div className={`bar-fill ${p.comply >= 90 ? 'safe' : p.comply >= 80 ? 'gold' : 'risk'}`} style={{ width: `${p.comply}%` }}/>
                      </div>
                      <span style={{ fontSize: 11.5, fontWeight: 700 }}>{p.comply}%</span>
                    </div>
                  </td>
                  <td>
                    <span className={`chip ${p.risk === 'low' ? 'safe' : p.risk === 'med' ? 'warn' : 'risk'}`}>
                      {p.risk === 'low' ? 'Rendah' : p.risk === 'med' ? 'Sedang' : 'Tinggi'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* ── Catatan Metodologi ────────────────────────────────────── */}
      <div style={{ padding: '12px 16px', background: 'var(--bgn-sky-pale)', borderRadius: 8, fontSize: 12, color: 'var(--ink-500)', lineHeight: 1.7, border: '1px solid var(--border)' }}>
        <strong style={{ color: 'var(--ink-700)' }}>Catatan metodologi:</strong> Estimasi penerima manfaat dihitung dari volume porsi harian ÷ 250 ml ekuivalen per anak (proxy distribusi). Data satuan pendidikan berdasarkan registry BGN Pusat. Dampak gizi dari survei cepat BGN–Kemenkes pilot Maret 2026, belum representatif nasional. Coverage target mengacu Perpres No. 83/2025.
      </div>
    </div>
  );
}

// ─── Juknis CRUD data & helpers ───────────────────────────────────────────────
const JUKNIS_STATUS = { berlaku: 'safe', direvisi: 'warn', draft: 'info' };

let _juknisId = 100;
const uid = () => ++_juknisId;

const JUKNIS_INIT = [
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
];

function PasalCard({ pasal, onEdit, onDelete, expanded, onToggle }) {
  return (
    <div style={{ background: 'var(--bgn-sky-pale)', borderRadius: 8, border: '1px solid var(--border)', overflow: 'hidden' }}>
      <div
        style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', cursor: 'pointer', userSelect: 'none' }}
        onClick={onToggle}
      >
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink-500)', textTransform: 'uppercase', letterSpacing: '0.07em', whiteSpace: 'nowrap' }}>{pasal.kode}</span>
        <span style={{ flex: 1, fontWeight: 600, fontSize: 13, color: 'var(--bgn-navy-deep)' }}>{pasal.judul}</span>
        <span style={{ fontSize: 11, color: 'var(--ink-400)', marginLeft: 'auto' }}>{expanded ? '▲' : '▼'}</span>
      </div>
      {expanded && (
        <div style={{ padding: '0 14px 12px', borderTop: '1px solid var(--border)' }}>
          <p style={{ fontSize: 13, color: 'var(--ink-700)', lineHeight: 1.6, margin: '10px 0 10px' }}>{pasal.isi}</p>
          <div style={{ display: 'flex', gap: 6 }}>
            <button className="btn" style={{ fontSize: 11 }} onClick={() => onEdit(pasal)}>Edit</button>
            <button className="btn btn-ghost" style={{ fontSize: 11, color: 'var(--risk-hi)' }} onClick={() => onDelete(pasal.id)}>Hapus</button>
          </div>
        </div>
      )}
    </div>
  );
}

function PasalEditor({ initial, onSave, onCancel }) {
  const [kode, setKode] = React.useState(initial?.kode || '');
  const [judul, setJudul] = React.useState(initial?.judul || '');
  const [isi, setIsi] = React.useState(initial?.isi || '');
  const inp = { fontSize: 13, padding: '6px 10px', border: '1px solid var(--border)', borderRadius: 6, width: '100%', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', background: 'var(--surface)' };
  return (
    <div style={{ background: '#fff8e6', border: '1.5px solid var(--bgn-gold)', borderRadius: 8, padding: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', gap: 8 }}>
        <input style={{ ...inp, width: 110, flexShrink: 0 }} placeholder="Kode (mis. Pasal 5)" value={kode} onChange={e => setKode(e.target.value)}/>
        <input style={{ ...inp }} placeholder="Judul pasal" value={judul} onChange={e => setJudul(e.target.value)}/>
      </div>
      <textarea style={{ ...inp, resize: 'vertical', minHeight: 72 }} placeholder="Isi pasal..." value={isi} onChange={e => setIsi(e.target.value)}/>
      <div style={{ display: 'flex', gap: 6 }}>
        <button className="btn btn-primary" style={{ fontSize: 12 }} onClick={() => { if (!kode.trim() || !judul.trim()) return; onSave({ kode: kode.trim(), judul: judul.trim(), isi: isi.trim() }); }}>Simpan</button>
        <button className="btn btn-ghost" style={{ fontSize: 12 }} onClick={onCancel}>Batal</button>
      </div>
    </div>
  );
}

function BabModal({ initial, onSave, onClose }) {
  const [kode, setKode] = React.useState(initial?.kode || '');
  const [judul, setJudul] = React.useState(initial?.judul || '');
  const [deskripsi, setDeskripsi] = React.useState(initial?.deskripsi || '');
  const [status, setStatus] = React.useState(initial?.status || 'berlaku');
  const inp = { fontSize: 13, padding: '7px 10px', border: '1px solid var(--border)', borderRadius: 6, width: '100%', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', background: 'var(--surface)' };
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(8,24,58,0.55)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={onClose}>
      <div style={{ background: 'var(--surface)', borderRadius: 12, padding: 24, width: 480, maxWidth: '95vw', boxShadow: '0 8px 32px rgba(0,0,0,0.18)' }} onClick={e => e.stopPropagation()}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, color: 'var(--bgn-navy-deep)', marginBottom: 16 }}>
          {initial ? 'Edit Bab' : 'Tambah Bab Baru'}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <input style={{ ...inp, width: 120, flexShrink: 0 }} placeholder="Kode (mis. Bab IX)" value={kode} onChange={e => setKode(e.target.value)}/>
            <input style={{ ...inp }} placeholder="Judul bab" value={judul} onChange={e => setJudul(e.target.value)}/>
          </div>
          <textarea style={{ ...inp, resize: 'vertical', minHeight: 72 }} placeholder="Deskripsi singkat bab..." value={deskripsi} onChange={e => setDeskripsi(e.target.value)}/>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <label style={{ fontSize: 12, color: 'var(--ink-500)', whiteSpace: 'nowrap' }}>Status:</label>
            {['berlaku', 'direvisi', 'draft'].map(s => (
              <label key={s} style={{ fontSize: 12, display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
                <input type="radio" name="bab-status" value={s} checked={status === s} onChange={() => setStatus(s)}/>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </label>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 18, justifyContent: 'flex-end' }}>
          <button className="btn btn-ghost" onClick={onClose}>Batal</button>
          <button className="btn btn-primary" onClick={() => {
            if (!kode.trim() || !judul.trim()) { window.toast('Kode dan judul wajib diisi', 'warn'); return; }
            onSave({ kode: kode.trim(), judul: judul.trim(), deskripsi: deskripsi.trim(), status });
          }}>Simpan</button>
        </div>
      </div>
    </div>
  );
}

function JuknisTab() {
  const [babs, setBabs] = React.useState(JUKNIS_INIT);
  const [selectedId, setSelectedId] = React.useState(1);
  const [search, setSearch] = React.useState('');
  const [babModal, setBabModal] = React.useState(null); // null | 'new' | bab object
  const [expandedPasals, setExpandedPasals] = React.useState({});
  const [editingPasal, setEditingPasal] = React.useState(null); // pasal id being edited
  const [addingPasal, setAddingPasal] = React.useState(false);
  const [deletingBab, setDeletingBab] = React.useState(null);

  const filtered = babs.filter(b =>
    b.judul.toLowerCase().includes(search.toLowerCase()) ||
    b.kode.toLowerCase().includes(search.toLowerCase()) ||
    b.pasals.some(p => p.judul.toLowerCase().includes(search.toLowerCase()))
  );

  const selected = babs.find(b => b.id === selectedId) || babs[0];

  const togglePasal = (id) => setExpandedPasals(prev => ({ ...prev, [id]: !prev[id] }));

  const saveBab = (data) => {
    if (babModal === 'new') {
      const nb = { id: uid(), pasals: [], ...data };
      setBabs(prev => [...prev, nb]);
      setSelectedId(nb.id);
      window.toast(`Bab "${data.judul}" ditambahkan`, 'success');
    } else {
      setBabs(prev => prev.map(b => b.id === babModal.id ? { ...b, ...data } : b));
      window.toast('Bab diperbarui', 'success');
    }
    setBabModal(null);
  };

  const deleteBab = (id) => {
    setBabs(prev => prev.filter(b => b.id !== id));
    setSelectedId(babs.find(b => b.id !== id)?.id || null);
    setDeletingBab(null);
    window.toast('Bab dihapus', 'info');
  };

  const savePasal = (data) => {
    if (editingPasal) {
      setBabs(prev => prev.map(b => b.id === selected.id
        ? { ...b, pasals: b.pasals.map(p => p.id === editingPasal ? { ...p, ...data } : p) }
        : b
      ));
      setEditingPasal(null);
      window.toast('Pasal diperbarui', 'success');
    } else {
      const np = { id: uid(), ...data };
      setBabs(prev => prev.map(b => b.id === selected.id ? { ...b, pasals: [...b.pasals, np] } : b));
      setExpandedPasals(prev => ({ ...prev, [np.id]: true }));
      setAddingPasal(false);
      window.toast(`Pasal "${data.judul}" ditambahkan`, 'success');
    }
  };

  const deletePasal = (pid) => {
    setBabs(prev => prev.map(b => b.id === selected.id ? { ...b, pasals: b.pasals.filter(p => p.id !== pid) } : b));
    window.toast('Pasal dihapus', 'info');
  };

  return (
    <div style={{ display: 'flex', gap: 0, height: 'calc(100vh - 160px)', minHeight: 500, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>

      {/* ── LEFT: Bab Browser ─────────────────────────────────────────── */}
      <div style={{ width: 270, flexShrink: 0, display: 'flex', flexDirection: 'column', borderRight: '1px solid var(--border)', background: 'var(--bgn-sky-pale)' }}>
        {/* Header */}
        <div style={{ padding: '14px 14px 10px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13, color: 'var(--bgn-navy-deep)', marginBottom: 8 }}>
            Juknis 401.1/2025
          </div>
          <input
            style={{ width: '100%', boxSizing: 'border-box', fontSize: 12, padding: '6px 9px', border: '1px solid var(--border)', borderRadius: 6, background: 'var(--surface)' }}
            placeholder="Cari bab / pasal..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        {/* Bab list */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '6px 0' }}>
          {filtered.map(b => (
            <div
              key={b.id}
              onClick={() => { setSelectedId(b.id); setAddingPasal(false); setEditingPasal(null); }}
              style={{
                padding: '9px 14px', cursor: 'pointer', borderLeft: '3px solid ' + (b.id === selectedId ? 'var(--bgn-gold)' : 'transparent'),
                background: b.id === selectedId ? 'rgba(255,255,255,0.75)' : 'transparent',
                transition: 'background 0.12s',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, color: 'var(--ink-500)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>{b.kode}</span>
                <span className={'chip ' + (JUKNIS_STATUS[b.status] || '')} style={{ fontSize: 9, padding: '1px 5px', marginLeft: 'auto' }}>{b.status}</span>
              </div>
              <div style={{ fontWeight: b.id === selectedId ? 700 : 500, fontSize: 12.5, color: 'var(--bgn-navy-deep)', marginTop: 2, lineHeight: 1.3 }}>{b.judul}</div>
              <div style={{ fontSize: 11, color: 'var(--ink-500)', marginTop: 2 }}>{b.pasals.length} pasal</div>
            </div>
          ))}
        </div>
        {/* Add Bab button */}
        <div style={{ padding: '10px 14px', borderTop: '1px solid var(--border)' }}>
          <button className="btn btn-primary" style={{ width: '100%', fontSize: 12 }} onClick={() => setBabModal('new')}>+ Tambah Bab</button>
        </div>
      </div>

      {/* ── RIGHT: Detail Panel ───────────────────────────────────────── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {selected ? (
          <>
            {/* Detail header */}
            <div style={{ padding: '16px 20px 14px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-500)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>{selected.kode}</span>
                  <span className={'chip ' + (JUKNIS_STATUS[selected.status] || '')}>{selected.status}</span>
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, color: 'var(--bgn-navy-deep)' }}>{selected.judul}</div>
                <div style={{ fontSize: 13, color: 'var(--ink-600)', marginTop: 4, lineHeight: 1.5 }}>{selected.deskripsi}</div>
              </div>
              <div style={{ display: 'flex', gap: 6, flexShrink: 0, marginTop: 2 }}>
                <button className="btn" style={{ fontSize: 11 }} onClick={() => setBabModal(selected)}>Edit Bab</button>
                <button className="btn btn-ghost" style={{ fontSize: 11, color: 'var(--risk-hi)' }} onClick={() => setDeletingBab(selected.id)}>Hapus</button>
              </div>
            </div>

            {/* Pasal list */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '14px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
                <span style={{ fontWeight: 600, fontSize: 13, color: 'var(--ink-600)' }}>Pasal-pasal ({selected.pasals.length})</span>
                <button className="btn btn-primary" style={{ marginLeft: 'auto', fontSize: 11 }} onClick={() => { setAddingPasal(true); setEditingPasal(null); }}>+ Tambah Pasal</button>
              </div>

              {addingPasal && (
                <div style={{ marginBottom: 10 }}>
                  <PasalEditor onSave={savePasal} onCancel={() => setAddingPasal(false)}/>
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {selected.pasals.map(p => (
                  editingPasal === p.id ? (
                    <PasalEditor key={p.id} initial={p} onSave={savePasal} onCancel={() => setEditingPasal(null)}/>
                  ) : (
                    <PasalCard
                      key={p.id}
                      pasal={p}
                      expanded={!!expandedPasals[p.id]}
                      onToggle={() => togglePasal(p.id)}
                      onEdit={(pasal) => { setEditingPasal(pasal.id); setAddingPasal(false); }}
                      onDelete={deletePasal}
                    />
                  )
                ))}
                {selected.pasals.length === 0 && !addingPasal && (
                  <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--ink-400)', fontSize: 13 }}>Belum ada pasal — klik "+ Tambah Pasal" untuk memulai.</div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ink-400)', fontSize: 14 }}>Pilih bab dari daftar kiri</div>
        )}
      </div>

      {/* ── Modals ───────────────────────────────────────────────────── */}
      {babModal && <BabModal initial={babModal === 'new' ? null : babModal} onSave={saveBab} onClose={() => setBabModal(null)}/>}

      {deletingBab && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(8,24,58,0.55)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: 'var(--surface)', borderRadius: 12, padding: 24, width: 360, boxShadow: '0 8px 32px rgba(0,0,0,0.18)' }}>
            <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--bgn-navy-deep)', marginBottom: 10 }}>Hapus Bab?</div>
            <div style={{ fontSize: 13, color: 'var(--ink-600)', marginBottom: 18 }}>
              Bab <strong>{babs.find(b => b.id === deletingBab)?.kode}</strong> dan seluruh pasalnya akan dihapus permanen.
            </div>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <button className="btn btn-ghost" onClick={() => setDeletingBab(null)}>Batal</button>
              <button className="btn" style={{ background: 'var(--risk-hi)', color: '#fff', border: 'none' }} onClick={() => deleteBab(deletingBab)}>Hapus</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// RoadmapTab removed per user request

function KpiTab({ D }) {
  const k = [
    { n: 'Coverage penerima manfaat', v: 24.3, t: 100, u: '%' },
    { n: 'SPPG operasional', v: 78.9, t: 100, u: '% target' },
    { n: 'Compliance HACCP nasional', v: D.kpis.complianceRate, t: 95, u: '%' },
    { n: 'Insiden per 1 jt porsi', v: 0.19, t: 0.05, u: 'rate' },
    { n: 'Public Trust Index', v: D.kpis.publicTrust, t: 90, u: '/100' },
    { n: 'QR Traceability coverage', v: D.kpis.qrTraceability, t: 95, u: '%' },
    { n: 'IoT coverage', v: D.kpis.iotCoverage, t: 80, u: '%' },
    { n: 'Maturity score (HACCP)', v: 61, t: 85, u: '/100' },
  ];
  return (
    <Card title="Strategic KPI · BOD Scorecard" subtitle="Aktual vs target tahunan">
      <div className="grid-2" style={{ gap: 12 }}>
        {k.map(x => {
          const pct = (x.v / x.t) * 100;
          return (
            <div key={x.n} style={{ padding: 14, background: '#fff', border: '1px solid var(--ink-100)', borderRadius: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontWeight: 600, fontSize: 12.5 }}>{x.n}</span>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--bgn-navy-deep)' }}>{x.v}<span style={{ fontSize: 11, color: 'var(--ink-500)' }}>{x.u} / target {x.t}</span></span>
              </div>
              <div className="bar-track"><div className={`bar-fill ${pct >= 90 ? 'safe' : pct >= 60 ? 'gold' : 'risk'}`} style={{ width: `${Math.min(100, pct)}%` }}/></div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

// ── Shared helpers ─────────────────────────────────────────────────────────
const CHECKLIST_STAGES = [
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
];

function ViewToggle({ view, setView, options }) {
  return (
    <div style={{ display: 'flex', gap: 0, background: 'var(--bgn-sky-pale)', borderRadius: 8, padding: 4, width: 'fit-content', border: '1px solid var(--border)' }}>
      {options.map(([v, l]) => (
        <button key={v} onClick={() => setView(v)}
          style={{ padding: '7px 20px', border: 'none', borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s',
            background: view === v ? 'var(--bgn-navy-deep)' : 'transparent',
            color: view === v ? '#fff' : 'var(--ink-600)' }}>
          {l}
        </button>
      ))}
    </div>
  );
}

function IdentityFields({ form, setF, D }) {
  const inp = { width: '100%', padding: '8px 10px', border: '1px solid var(--ink-200)', borderRadius: 6, fontSize: 13, background: '#fff', boxSizing: 'border-box' };
  const lbl = { fontSize: 11, color: 'var(--ink-500)', fontWeight: 600, marginBottom: 4, display: 'block' };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div>
        <span style={lbl}>Dapur SPPG *</span>
        <select value={form.sppg} onChange={e => setF('sppg', e.target.value)} style={inp}>
          <option value="">— Pilih SPPG —</option>
          {D.sppgList.map(s => <option key={s.id} value={s.name}>{s.name} · {s.prov}</option>)}
        </select>
      </div>
      <div>
        <span style={lbl}>Kode Batch *</span>
        <input value={form.batch} onChange={e => setF('batch', e.target.value)} placeholder="B-2026-JK-NNNN"
          style={{ ...inp, fontFamily: 'var(--font-mono)' }}/>
      </div>
      <div>
        <span style={lbl}>Nama Petugas / Pengawas</span>
        <input value={form.officer} onChange={e => setF('officer', e.target.value)} placeholder="Nama, SKM" style={inp}/>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <div>
          <span style={lbl}>Tanggal</span>
          <input type="date" value={form.date} onChange={e => setF('date', e.target.value)} style={inp}/>
        </div>
        <div>
          <span style={lbl}>Jam Pengisian</span>
          <input type="time" value={form.time} onChange={e => setF('time', e.target.value)} style={inp}/>
        </div>
      </div>
    </div>
  );
}

// ── Page 1: Log Suhu Harian ────────────────────────────────────────────────
function LogSuhuPage({ D }) {
  const EMPTY_FORM = { sppg: '', batch: '', officer: '', date: '2026-05-09', time: '07:00', cook: '', hold: '', storage: '', truck: '', distMin: '', notes: '' };
  const [logs, setLogs] = React.useState(
    D.recentLogs.map(l => ({ ...l, id: l.id.replace('LOG', 'TMP') }))
  );
  const [view, setView] = React.useState('input');
  const [form, setForm] = React.useState(EMPTY_FORM);
  const setF = (k, v) => setForm(s => ({ ...s, [k]: v }));

  const cookV = parseFloat(form.cook), holdV = parseFloat(form.hold);
  const storV = parseFloat(form.storage), trukV = parseFloat(form.truck);
  const distV = parseInt(form.distMin, 10);
  const cookOk = isNaN(cookV) || cookV >= 70;
  const holdOk = isNaN(holdV) || holdV >= 60;
  const storOk = isNaN(storV) || storV <= 5;
  const trukOk = isNaN(trukV) || trukV <= 5;
  const distOk = isNaN(distV) || distV <= 30;
  const anyViolation = !cookOk || !holdOk || !storOk || !trukOk || !distOk;

  const submit = (e) => {
    e.preventDefault();
    if (!form.sppg || !form.batch) { window.toast('Pilih SPPG dan isi kode batch', 'risk'); return; }
    const violations = [];
    if (!isNaN(cookV) && cookV < 70)  violations.push(`Masak ${cookV}°C < 70°C`);
    if (!isNaN(holdV) && holdV < 60)  violations.push(`Hot-hold ${holdV}°C < 60°C`);
    if (!isNaN(storV) && storV > 5)   violations.push(`Cold ${storV}°C > 5°C`);
    if (!isNaN(trukV) && trukV > 5)   violations.push(`Kend. ${trukV}°C > 5°C`);
    if (!isNaN(distV) && distV > 30)  violations.push(`Distribusi ${distV} mnt > 30 mnt`);
    const ok = violations.length === 0;
    const entry = {
      id: 'TMP-' + (Math.floor(Math.random() * 90000) + 10000),
      ts: form.time, date: form.date,
      sppg: form.sppg, prov: D.sppgList.find(s => s.name === form.sppg)?.prov || '—',
      officer: form.officer || 'Pengawas', batch: form.batch,
      cook: isNaN(cookV) ? null : cookV, hold: isNaN(holdV) ? null : holdV,
      storage: isNaN(storV) ? null : storV, truck: isNaN(trukV) ? null : trukV,
      distMin: isNaN(distV) ? null : distV,
      violations, notes: violations.length ? violations.join('; ') : form.notes, ok,
    };
    setLogs(prev => [entry, ...prev]);
    if (!ok) window.toast(`Auto-hold! ${violations[0]}`, 'risk');
    else     window.toast(`Log suhu tersimpan · batch ${form.batch} ✓`, 'safe');
    setForm(EMPTY_FORM);
    setView('table');
  };

  const TempInput = ({ label, sublabel, value, onChange, unit = '°C', ok }) => (
    <div>
      <div style={{ fontSize: 11.5, fontWeight: 600, color: 'var(--ink-700)', marginBottom: 2 }}>{label}</div>
      <div style={{ fontSize: 10.5, color: 'var(--ink-400)', marginBottom: 6 }}>{sublabel}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <input type="number" value={value} onChange={onChange} placeholder="0.0" step="0.1"
          style={{ flex: 1, padding: '9px 10px', border: `1.5px solid ${value !== '' ? (ok ? 'var(--status-safe)' : 'var(--status-risk)') : 'var(--ink-200)'}`, borderRadius: 6, fontFamily: 'var(--font-mono)', fontSize: 14, background: '#fff' }}/>
        <span style={{ color: 'var(--ink-500)', fontSize: 12, whiteSpace: 'nowrap', width: 36 }}>{unit}</span>
        {value !== '' && <span style={{ fontSize: 18 }}>{ok ? '✅' : '🚨'}</span>}
      </div>
    </div>
  );

  const TempCell = ({ v, okFn }) => {
    if (v == null || isNaN(v)) return <span style={{ color: 'var(--ink-300)' }}>—</span>;
    const ok = okFn(v);
    return <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 12.5, color: ok ? '#176B3F' : '#C03A2B' }}>{v}°</span>;
  };

  return (
    <div className="row-gap">
      <div className="grid-3" style={{ gap: 12 }}>
        <KPI label="Log suhu masuk hari ini" accent="navy" value={logs.length} unit=" entri" meta="Semua SPPG yang melapor"/>
        <KPI label="Pembacaan dalam batas aman" accent="leaf" value={logs.filter(l => l.ok).length} unit=" batch"/>
        <KPI label="Auto-hold diaktifkan" accent="risk" value={logs.filter(l => !l.ok).length} unit=" batch" meta="Batas suhu dilanggar"/>
      </div>

      <ViewToggle view={view} setView={setView} options={[['input','🌡️  Input Suhu Baru'], ['table', `📊  Riwayat Suhu (${logs.length})`]]}/>

      {view === 'input' && (
        <form onSubmit={submit}>
          {anyViolation && form.cook !== '' && (
            <div style={{ background: 'var(--status-risk-soft)', border: '1px solid var(--status-risk)', borderRadius: 8, padding: '12px 16px', fontSize: 12.5, color: '#8B1F15', marginBottom: 14, lineHeight: 1.6 }}>
              <strong>⚠️ Peringatan:</strong> Terdapat pembacaan suhu di luar batas aman. Batch akan ditahan otomatis (auto-hold) saat disimpan.
            </div>
          )}
          <div className="grid-2" style={{ gap: 14 }}>
            <Card title="Identitas SPPG & Batch">
              <IdentityFields form={form} setF={setF} D={D}/>
            </Card>
            <Card title="Pembacaan Suhu — Titik Kendali Kritis (CCP)" subtitle="🟢 aman · 🚨 = auto-hold">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <TempInput label="🔥 CCP-1 · Suhu Masak Inti Protein" sublabel="Batas minimum WHO/Codex: ≥70°C (ayam, daging, ikan, telur)" value={form.cook} onChange={e => setF('cook', e.target.value)} ok={cookOk}/>
                <TempInput label="♨️ CCP-2 · Suhu Hot-Holding Pra-Distribusi" sublabel="Batas minimum: >60°C · dijaga terus hingga tiba di sekolah" value={form.hold} onChange={e => setF('hold', e.target.value)} ok={holdOk}/>
                <TempInput label="❄️ CCP-3 · Suhu Cold Storage Bahan Perishable" sublabel="Batas maksimum: <5°C · daging, susu, telur, lauk mentah" value={form.storage} onChange={e => setF('storage', e.target.value)} ok={storOk}/>
                <TempInput label="🚐 CCP-4 · Suhu Kendaraan Distribusi" sublabel="Batas maksimum: <5°C · untuk produk dingin / lauk mentah" value={form.truck} onChange={e => setF('truck', e.target.value)} ok={trukOk}/>
                <TempInput label="⏱️ CCP-5 · Durasi Perjalanan Distribusi" sublabel="Batas maksimum Juknis 401.1: ≤30 menit / ≤6 km" value={form.distMin} onChange={e => setF('distMin', e.target.value)} unit="menit" ok={distOk}/>
              </div>
            </Card>
          </div>
          <Card title="Catatan & Tindakan Korektif">
            <textarea rows="3" value={form.notes} onChange={e => setF('notes', e.target.value)}
              placeholder="Temuan anomali suhu, tindakan korektif yang sudah diambil, atau catatan lain untuk supervisor…"
              style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--ink-200)', borderRadius: 6, fontFamily: 'inherit', fontSize: 13, resize: 'vertical', boxSizing: 'border-box' }}/>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 12 }}>
              <button type="submit" className="btn btn-primary" style={{ minWidth: 200 }}>Simpan Log Suhu →</button>
            </div>
          </Card>
        </form>
      )}

      {view === 'table' && (
        <Card title="Riwayat Log Suhu Harian" subtitle="Terbaru di atas · merah = auto-hold · semua suhu dalam °C" padded={false}>
          <div className="table-wrap">
            <table className="bgn">
              <thead>
                <tr>
                  <th>ID</th><th>Jam</th><th>Dapur SPPG</th><th>Batch</th>
                  <th title="CCP-1 Masak ≥70°C">Masak</th>
                  <th title="CCP-2 Hot-Hold >60°C">Hot-Hold</th>
                  <th title="CCP-3 Cold <5°C">Cold</th>
                  <th title="CCP-4 Kendaraan <5°C">Kend.</th>
                  <th title="CCP-5 Distribusi ≤30 mnt">Dist.</th>
                  <th>Status</th><th>Pelanggaran / Catatan</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((l, i) => (
                  <tr key={i} style={{ background: l.ok ? '' : 'rgba(192,58,43,0.04)' }}>
                    <td><span style={{ fontFamily: 'var(--font-mono)', fontSize: 10 }}>{l.id}</span></td>
                    <td style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>{l.ts}</td>
                    <td>
                      <div className="strong" style={{ fontSize: 12.5 }}>{l.sppg}</div>
                      <div style={{ fontSize: 11, color: 'var(--ink-500)' }}>{l.prov}</div>
                    </td>
                    <td><span style={{ fontFamily: 'var(--font-mono)', fontSize: 11 }}>{l.batch}</span></td>
                    <td><TempCell v={l.cook}    okFn={v => v >= 70}/></td>
                    <td><TempCell v={l.hold}    okFn={v => v >= 60}/></td>
                    <td><TempCell v={l.storage} okFn={v => v <= 5}/></td>
                    <td><TempCell v={l.truck}   okFn={v => v <= 5}/></td>
                    <td>{l.distMin != null ? <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 12.5, color: l.distMin <= 30 ? '#176B3F' : '#C03A2B' }}>{l.distMin}m</span> : <span style={{ color: 'var(--ink-300)' }}>—</span>}</td>
                    <td><span className={`chip ${l.ok ? 'safe' : 'risk'}`}>{l.ok ? 'Aman ✓' : 'Ditahan !'}</span></td>
                    <td style={{ fontSize: 11, color: l.notes ? '#8B1F15' : 'var(--ink-400)', maxWidth: 200, lineHeight: 1.45 }}>{l.notes || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}

// ── Page 2: Log Checklist Proses ───────────────────────────────────────────
const EMPTY_CL_FORM = () => ({
  sppg: '', batch: '', officer: '', date: '2026-05-09', time: '07:00',
  sampleTaken: false, notes: '',
  stages: Object.fromEntries(CHECKLIST_STAGES.map(s => [s.id, s.items.map(() => false)])),
});

function LogChecklistPage({ D }) {
  const [logs, setLogs] = React.useState([]);
  const [view, setView] = React.useState('input');
  const [form, setForm] = React.useState(EMPTY_CL_FORM());
  const [expanded, setExpanded] = React.useState(
    Object.fromEntries(CHECKLIST_STAGES.map(s => [s.id, true]))
  );

  const setF = (k, v) => setForm(s => ({ ...s, [k]: v }));
  const setCheck = (stageId, idx, v) => setForm(s => {
    const stages = { ...s.stages };
    const items = [...stages[stageId]];
    items[idx] = v;
    stages[stageId] = items;
    return { ...s, stages };
  });
  const toggleStage = (id) => setExpanded(e => ({ ...e, [id]: !e[id] }));

  const totalItems  = CHECKLIST_STAGES.reduce((a, s) => a + s.items.length, 0);
  const checkedItems = (stages) => CHECKLIST_STAGES.reduce((a, s) => a + stages[s.id].filter(Boolean).length, 0);

  const submit = (e) => {
    e.preventDefault();
    if (!form.sppg || !form.batch) { window.toast('Pilih SPPG dan isi kode batch', 'risk'); return; }
    const checked = checkedItems(form.stages);
    const ok = checked === totalItems && form.sampleTaken;
    const stageResults = CHECKLIST_STAGES.map(s => ({
      id: s.id, label: s.label, passed: form.stages[s.id].filter(Boolean).length, total: s.items.length,
    }));
    const entry = {
      id: 'CKL-' + (Math.floor(Math.random() * 90000) + 10000),
      ts: form.time, date: form.date,
      sppg: form.sppg, prov: D.sppgList.find(s => s.name === form.sppg)?.prov || '—',
      officer: form.officer || 'Pengawas', batch: form.batch,
      checked, total: totalItems, sampleTaken: form.sampleTaken,
      stageResults, notes: form.notes, ok,
    };
    setLogs(prev => [entry, ...prev]);
    const missed = totalItems - checked;
    if (!ok) window.toast(`Checklist tidak lengkap — ${missed} poin belum dicentang`, 'warn');
    else     window.toast(`Checklist ${form.batch} lulus semua proses ✓`, 'safe');
    setForm(EMPTY_CL_FORM());
    setView('table');
  };

  const pct = (stages) => Math.round((checkedItems(stages) / totalItems) * 100);

  return (
    <div className="row-gap">
      <div className="grid-3" style={{ gap: 12 }}>
        <KPI label="Checklist tersimpan hari ini" accent="navy" value={logs.length} unit=" entri"/>
        <KPI label="Lulus semua proses" accent="leaf" value={logs.filter(l => l.ok).length} unit=" batch"/>
        <KPI label="Ada poin belum terpenuhi" accent="warn" value={logs.filter(l => !l.ok).length} unit=" batch"/>
      </div>

      <ViewToggle view={view} setView={setView} options={[['input','✅  Input Checklist Baru'], ['table', `📋  Riwayat Checklist (${logs.length})`]]}/>

      {view === 'input' && (
        <form onSubmit={submit}>
          <div className="grid-2" style={{ gap: 14, marginBottom: 14 }}>
            <Card title="Identitas SPPG & Batch">
              <IdentityFields form={form} setF={setF} D={D}/>
            </Card>
            <Card title="Panduan Pengisian" subtitle="Centang setiap poin yang benar-benar sudah dipenuhi">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {CHECKLIST_STAGES.map(s => {
                  const done = form.stages[s.id].filter(Boolean).length;
                  const total = s.items.length;
                  return (
                    <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', background: done === total ? 'var(--status-safe-soft)' : 'var(--bgn-sky-pale)', borderRadius: 8, border: `1px solid ${done === total ? 'var(--status-safe)' : 'var(--border)'}` }}>
                      <span style={{ fontSize: 18 }}>{s.icon}</span>
                      <span style={{ flex: 1, fontSize: 12, fontWeight: 600, color: 'var(--bgn-navy-deep)' }}>{s.label}</span>
                      <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', fontWeight: 700, color: done === total ? '#176B3F' : 'var(--ink-500)' }}>{done}/{total}</span>
                    </div>
                  );
                })}
                <label style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '11px 14px', background: form.sampleTaken ? 'var(--bgn-gold-pale)' : 'var(--ink-50)', borderRadius: 8, border: `1.5px dashed ${form.sampleTaken ? 'var(--bgn-gold)' : 'var(--ink-300)'}`, cursor: 'pointer', marginTop: 4 }}>
                  <input type="checkbox" checked={form.sampleTaken} onChange={e => setF('sampleTaken', e.target.checked)} style={{ marginTop: 3, width: 16, height: 16, accentColor: 'var(--bgn-gold)', flexShrink: 0 }}/>
                  <span style={{ fontSize: 12.5, lineHeight: 1.55 }}>
                    <strong style={{ color: 'var(--bgn-navy-deep)' }}>Food Sample Diambil</strong> — 2 porsi per batch, berlabel, disimpan ≥3 hari
                  </span>
                </label>
              </div>
            </Card>
          </div>

          {CHECKLIST_STAGES.map(s => (
            <Card key={s.id} title={`${s.icon}  ${s.label}`}
              subtitle={`${form.stages[s.id].filter(Boolean).length} dari ${s.items.length} poin terpenuhi`}
              tools={
                <button type="button" className="btn" style={{ fontSize: 11 }} onClick={() => toggleStage(s.id)}>
                  {expanded[s.id] ? 'Tutup ▲' : 'Buka ▼'}
                </button>
              }>
              {expanded[s.id] && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {s.items.map((item, idx) => {
                    const checked = form.stages[s.id][idx];
                    return (
                      <label key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer', padding: '11px 14px', background: checked ? 'var(--status-safe-soft)' : 'var(--ink-50)', borderRadius: 8, border: `1px solid ${checked ? 'var(--status-safe)' : 'var(--ink-200)'}`, transition: 'all 0.15s' }}>
                        <input type="checkbox" checked={checked} onChange={e => setCheck(s.id, idx, e.target.checked)}
                          style={{ marginTop: 3, width: 16, height: 16, accentColor: 'var(--status-safe)', flexShrink: 0 }}/>
                        <span style={{ fontSize: 13, color: 'var(--ink-900)', lineHeight: 1.55 }}>{item}</span>
                        {checked && <span style={{ marginLeft: 'auto', flexShrink: 0, fontSize: 15 }}>✅</span>}
                      </label>
                    );
                  })}
                </div>
              )}
            </Card>
          ))}

          <Card title="Catatan & Temuan">
            <textarea rows="3" value={form.notes} onChange={e => setF('notes', e.target.value)}
              placeholder="Temuan visual, ketidaksesuaian proses, atau tindakan korektif yang sudah diambil…"
              style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--ink-200)', borderRadius: 6, fontFamily: 'inherit', fontSize: 13, resize: 'vertical', boxSizing: 'border-box' }}/>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 12 }}>
              <button type="submit" className="btn btn-primary" style={{ minWidth: 220 }}>Simpan Checklist Proses →</button>
            </div>
          </Card>
        </form>
      )}

      {view === 'table' && (
        <Card title="Riwayat Checklist Proses" subtitle="Terbaru di atas · per batch per dapur SPPG" padded={false}>
          <div className="table-wrap">
            <table className="bgn">
              <thead>
                <tr>
                  <th>ID</th><th>Jam</th><th>Dapur SPPG</th><th>Batch</th>
                  {CHECKLIST_STAGES.map(s => <th key={s.id} title={s.label}>{s.icon}</th>)}
                  <th>Sampel</th><th>Total</th><th>Status</th><th>Catatan</th>
                </tr>
              </thead>
              <tbody>
                {logs.length === 0 && (
                  <tr><td colSpan={11} style={{ textAlign: 'center', padding: 32, color: 'var(--ink-400)' }}>Belum ada checklist tersimpan — isi form di tab Input.</td></tr>
                )}
                {logs.map((l, i) => (
                  <tr key={i} style={{ background: l.ok ? '' : 'rgba(234,179,8,0.05)' }}>
                    <td><span style={{ fontFamily: 'var(--font-mono)', fontSize: 10 }}>{l.id}</span></td>
                    <td style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>{l.ts}</td>
                    <td>
                      <div className="strong" style={{ fontSize: 12.5 }}>{l.sppg}</div>
                      <div style={{ fontSize: 11, color: 'var(--ink-500)' }}>{l.prov}</div>
                    </td>
                    <td><span style={{ fontFamily: 'var(--font-mono)', fontSize: 11 }}>{l.batch}</span></td>
                    {l.stageResults.map(sr => (
                      <td key={sr.id} style={{ textAlign: 'center' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 12, color: sr.passed === sr.total ? '#176B3F' : '#C03A2B' }}>
                          {sr.passed}/{sr.total}
                        </span>
                      </td>
                    ))}
                    <td style={{ textAlign: 'center', fontSize: 14 }}>{l.sampleTaken ? '✅' : '❌'}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <div className="bar-track" style={{ width: 40 }}>
                          <div className={`bar-fill ${pct(l) >= 100 ? 'safe' : 'warn'}`} style={{ width: `${Math.min(100, pct(l))}%` }}/>
                        </div>
                        <span style={{ fontSize: 11, fontWeight: 700 }}>{l.checked}/{l.total}</span>
                      </div>
                    </td>
                    <td><span className={`chip ${l.ok ? 'safe' : 'warn'}`}>{l.ok ? 'Lulus ✓' : 'Tidak Lengkap'}</span></td>
                    <td style={{ fontSize: 11, color: 'var(--ink-500)', maxWidth: 180, lineHeight: 1.45 }}>{l.notes || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}

function OverviewTab({ D }) {
  return (
    <div className="row-gap">
      {/* Geo + alerts */}
      <div className="grid-2">
        <Card title="Sebaran SPPG & Risk Level Nasional"
              subtitle="Lingkaran = volume porsi · warna = risk level operasional"
              tools={<>
                <button className="iconbtn">{Ico.search}</button>
                <button className="iconbtn">{Ico.download}</button>
              </>}
              padded={false}>
          <div style={{ padding: 14 }}>
            <IndonesiaMap provinces={D.provinces} mode="exec"/>
          </div>
        </Card>
        <Card title="Notifikasi Operasional Live"
              subtitle="Auto-hold, pelanggaran suhu, dugaan insiden pangan awal"
              tools={<span className="chip risk"><span className="dot"/>{D.alerts.filter(a => a.sev === 'risk').length} kritis</span>}
              padded={false}>
          <div className="alert-list scroll-y-440">
            {D.alerts.map((a, i) => (
              <div className="alert-item" key={i}>
                <div className={`alert-icon ${a.sev}`}>
                  {a.sev === 'risk' ? '!' : a.sev === 'warn' ? '⚠' : a.sev === 'safe' ? '✓' : 'i'}
                </div>
                <div className="alert-body">
                  <div className="at-title">{a.t}</div>
                  <div className="at-meta">
                    <span>{a.meta}</span>
                    <span>· {a.at}</span>
                    <span style={{ color: 'var(--bgn-navy-deep)', fontWeight: 600 }}>· {a.action}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* HACCP heatmap + Trend */}
      <div className="grid-2">
        <Card title="HACCP 7-Prinsip — Compliance per kategori SPPG"
              subtitle="% SPPG yang lulus prinsip · update harian"
              tools={<span className="chip info">N = 27.641</span>}>
          <HaccpHeatmap D={D}/>
          <div className="legend-row" style={{ marginTop: 12 }}>
            <div><span className="swatch" style={{ background: '#2E8B57' }}/>≥85% Lulus</div>
            <div><span className="swatch" style={{ background: '#7CB890' }}/>70–84%</div>
            <div><span className="swatch" style={{ background: '#E8D49A' }}/>55–69%</div>
            <div><span className="swatch" style={{ background: '#E8A565' }}/>40–54%</div>
            <div><span className="swatch" style={{ background: '#C03A2B' }}/>&lt;40% Risiko</div>
          </div>
        </Card>
        <Card title="Maturity vs HACCP" subtitle="Skor analitis 0–100">
          <MaturityRadial/>
        </Card>
      </div>

      {/* SPPG ops + risk timeline */}
      <Card title="SPPG Watchlist — High Volume / Risk-Adjusted"
            subtitle="Diurutkan oleh risk score harian"
            tools={<>
              <input className="batch-input-x" placeholder="Cari SPPG / kode / provinsi…" style={{ padding: '7px 12px', border: '1px solid var(--ink-200)', borderRadius: 6, fontSize: 12, fontFamily: 'inherit' }}/>
              <button className="btn">{Ico.filter} Filter</button>
              <button className="btn">{Ico.download} Ekspor CSV</button>
            </>}
            padded={false}>
        <SppgTable rows={D.sppgList}/>
      </Card>

      {/* Trend + cert coverage */}
      <div className="grid-3">
        <Card title="Tren Insiden 30 Hari" subtitle="Dugaan KLB + corrective hold">
          <BarsRow values={D.incidents30d} h={120}/>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, fontSize: 11, color: 'var(--ink-500)' }}>
            <span>10 Apr</span><span>25 Apr</span><span>9 Mei</span>
          </div>
        </Card>
        <Card title="Sertifikasi — % Dapur dengan Dokumen Valid" subtitle="SLHS = Laik Higiene · Halal = BPJPH · HACCP = 7 Prinsip · IoT = Sensor Suhu · QR = Traceabilitas">
          <CertBars D={D.kpis}/>
        </Card>
        <Card title="Roadmap 90-hari" subtitle="Target eksekusi pilot 100 SPPG → nasional">
          <Roadmap/>
        </Card>
      </div>
    </div>
  );
}

function HaccpHeatmap({ D }) {
  const cls = (v) => v >= 85 ? 's5' : v >= 70 ? 's4' : v >= 55 ? 's3' : v >= 40 ? 's2' : 's1';
  return (
    <div className="haccp-grid">
      <div className="h-head" style={{ background: 'transparent' }}></div>
      {D.haccpHeads.map((h, i) => <div className="h-head" key={i}>{h}</div>)}
      {D.haccpMatrix.map((row, i) => (
        <React.Fragment key={i}>
          <div className="h-row-label">{row.cat}</div>
          {row.row.map((v, j) => (
            <div className={`h-cell ${cls(v)}`} key={j}>
              <div className="pct">{v}%</div>
            </div>
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}

function MaturityRadial() {
  const items = [
    { n: 'Hazard Analysis', s: 58 },
    { n: 'CCP Determination', s: 64 },
    { n: 'Critical Limits', s: 52 },
    { n: 'Monitoring (digital)', s: 78 },
    { n: 'Corrective Action', s: 49 },
    { n: 'Verification', s: 68 },
    { n: 'Record Keeping', s: 55 },
  ];
  const cx = 130, cy = 130, R = 95;
  const N = items.length;
  const angle = i => (Math.PI * 2 * i) / N - Math.PI / 2;
  const point = (i, r) => [cx + Math.cos(angle(i)) * r, cy + Math.sin(angle(i)) * r];
  const polyPts = items.map((it, i) => point(i, (it.s / 100) * R).join(',')).join(' ');
  return (
    <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
      <svg width="260" height="260" viewBox="0 0 260 260">
        {[0.25, 0.5, 0.75, 1].map(t => (
          <circle key={t} cx={cx} cy={cy} r={R * t} fill="none" stroke="#E4E8EF" strokeWidth="1"/>
        ))}
        {items.map((it, i) => {
          const [x, y] = point(i, R);
          return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="#E4E8EF" strokeWidth="1"/>;
        })}
        <polygon points={polyPts} fill="rgba(201,162,74,0.28)" stroke="#C9A24A" strokeWidth="2"/>
        {items.map((it, i) => {
          const [x, y] = point(i, (it.s / 100) * R);
          return <circle key={i} cx={x} cy={y} r="3.5" fill="#0E2A5C"/>;
        })}
        {items.map((it, i) => {
          const [x, y] = point(i, R + 14);
          return <text key={i} x={x} y={y} fontSize="9" fill="#5A6A82" textAnchor="middle" fontWeight="600">{it.n.split(' ')[0]}</text>;
        })}
        <text x={cx} y={cy - 4} textAnchor="middle" fontSize="11" fill="#5A6A82" fontWeight="600">Skor Saat Ini</text>
        <text x={cx} y={cy + 16} textAnchor="middle" fontSize="22" fill="#0E2A5C" fontFamily="Fraunces" fontWeight="700">61</text>
      </svg>
      <div style={{ flex: 1, fontSize: 11.5 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          <span style={{ color: 'var(--ink-500)' }}>Target Q4 2026</span>
          <span style={{ fontWeight: 700, color: 'var(--bgn-leaf)' }}>85</span>
        </div>
        <div className="bar-track" style={{ marginBottom: 12 }}><div className="bar-fill gold" style={{ width: '61%' }}/></div>
        <div style={{ color: 'var(--ink-500)', lineHeight: 1.5 }}>
          5 dari 7 prinsip masih <strong style={{ color: 'var(--status-risk)' }}>HIGH risk</strong>.<br/>
          Prioritas: <strong>Critical Limits</strong> & <strong>Corrective Action</strong> — adopsi WHO 70°C / &gt;60°C / &lt;5°C dan auto-hold pre-distribution.
        </div>
      </div>
    </div>
  );
}

function BarsRow({ values, h = 80 }) {
  const max = Math.max(...values);
  return (
    <div style={{ display: 'flex', gap: 3, alignItems: 'flex-end', height: h }}>
      {values.map((v, i) => {
        const c = v >= 6 ? '#C03A2B' : v >= 4 ? '#D89014' : '#2E8B57';
        return <div key={i} style={{ flex: 1, height: `${(v/max)*100}%`, background: c, borderRadius: '3px 3px 0 0', minHeight: 4 }} title={`Hari -${30-i}: ${v} insiden`}/>;
      })}
    </div>
  );
}

function CertBars({ D }) {
  const items = [
    { n: 'SLHS — Sertifikat Laik Higiene Sanitasi (Kemenkes)', v: D.slhsCoverage, c: 'safe' },
    { n: 'Halal — Sertifikat BPJPH', v: D.halalCoverage, c: 'gold' },
    { n: 'HACCP — Kesiapan 7 Prinsip Keamanan Pangan', v: D.haccpReady, c: 'warn' },
    { n: 'IoT — Sensor Suhu Otomatis Terpasang', v: D.iotCoverage, c: 'risk' },
    { n: 'QR — Batch Makanan Bisa Dilacak', v: D.qrTraceability, c: 'warn' },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {items.map((it, i) => (
        <div key={i}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
            <span style={{ color: 'var(--ink-700)', fontWeight: 600 }}>{it.n}</span>
            <span style={{ fontWeight: 700, color: 'var(--bgn-navy-deep)' }}>{it.v}%</span>
          </div>
          <div className="bar-track"><div className={`bar-fill ${it.c}`} style={{ width: `${it.v}%` }}/></div>
        </div>
      ))}
    </div>
  );
}

function Roadmap() {
  const phases = [
    { lab: '0–30', t: 'Standardize', items: ['HACCP plan template', 'CCP & batas WHO', 'Form log digital', 'Batch ID minimum'], done: 100 },
    { lab: '31–60', t: 'Digitize', items: ['QR traceability', 'Risk score dashboard', 'Suhu/waktu alert', 'Corrective tracker'], done: 65 },
    { lab: '61–90', t: 'Enforce', items: ['Audit HACCP gate', 'Uji mikrobiologi', 'Scorecard nasional', 'Pilot 100 SPPG'], done: 18 },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {phases.map((p, i) => (
        <div key={i} style={{ borderLeft: `3px solid ${p.done >= 95 ? 'var(--status-safe)' : p.done >= 50 ? 'var(--bgn-gold)' : 'var(--ink-200)'}`, paddingLeft: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
            <div>
              <span style={{ fontSize: 10, color: 'var(--ink-500)', fontFamily: 'var(--font-mono)', letterSpacing: '0.05em' }}>HARI {p.lab}</span>{' '}
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 14, color: 'var(--bgn-navy-deep)' }}>{p.t}</span>
            </div>
            <span className={`chip ${p.done >= 95 ? 'safe' : p.done >= 50 ? 'gold' : ''}`}>{p.done}%</span>
          </div>
          <div style={{ fontSize: 11.5, color: 'var(--ink-500)' }}>{p.items.join(' · ')}</div>
        </div>
      ))}
    </div>
  );
}

function SppgTable({ rows: rowsIn }) {
  const [q, setQ] = React.useState('');
  const [sort, setSort] = React.useState('score');
  const rows = React.useMemo(() => {
    let r = rowsIn.filter(x => !q || (x.id + x.name + x.prov).toLowerCase().includes(q.toLowerCase()));
    r = [...r].sort((a, b) => sort === 'porsi' ? b.porsi - a.porsi : sort === 'inc' ? b.inc - a.inc : a.score - b.score);
    return r;
  }, [rowsIn, q, sort]);
  return (
    <div>
      <div style={{ display: 'flex', gap: 8, padding: '10px 14px', borderBottom: '1px solid var(--ink-100)', background: 'var(--ink-50)', flexWrap: 'wrap' }}>
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Cari kode / nama / provinsi…" style={{ flex: 1, minWidth: 180, padding: '7px 12px', border: '1px solid var(--ink-200)', borderRadius: 6, fontSize: 12, fontFamily: 'inherit', background: '#fff' }}/>
        <select value={sort} onChange={e => setSort(e.target.value)} style={{ padding: '7px 10px', border: '1px solid var(--ink-200)', borderRadius: 6, fontSize: 12, background: '#fff' }}>
          <option value="score">Urut: Skor Keamanan (terburuk dulu)</option>
          <option value="porsi">Urut: Volume Porsi (terbesar dulu)</option>
          <option value="inc">Urut: Kasus 30 Hari (terbanyak dulu)</option>
        </select>
        <button className="btn" onClick={() => { window.toast(`Ekspor ${rows.length} baris CSV`, 'safe'); }}>{Ico.download} CSV</button>
      </div>
      <div style={{ display: 'flex', gap: 16, padding: '8px 14px', background: 'var(--bgn-sky-pale)', fontSize: 11, color: 'var(--ink-600)', borderBottom: '1px solid var(--ink-100)' }}>
        <strong style={{ color: 'var(--ink-700)' }}>Kepatuhan HACCP:</strong>
        <span><span className="chip safe" style={{ fontSize: 10 }}>Gate A</span> Sangat baik — semua CCP terpenuhi</span>
        <span><span className="chip gold" style={{ fontSize: 10 }}>Gate B</span> Baik — 1–2 gap minor</span>
        <span><span className="chip risk" style={{ fontSize: 10 }}>Gate C/D</span> Perlu perbaikan segera / risiko tinggi</span>
        <span style={{ marginLeft: 'auto' }}><strong>SLHS</strong> = Sertifikat Laik Higiene Sanitasi (Kemenkes) · <strong>Halal</strong> = Sertifikat BPJPH</span>
      </div>
    <div className="table-wrap">
      <table className="bgn">
        <thead>
          <tr>
            <th>Kode Dapur</th>
            <th>Nama Dapur / Provinsi</th>
            <th style={{ textAlign: 'right' }}>Porsi/hari</th>
            <th title="A = Sangat Baik · B = Baik · C = Perlu Perbaikan · D = Risiko Tinggi">Kepatuhan HACCP</th>
            <th title="SLHS = Sertifikat Laik Higiene Sanitasi (Kemenkes) · Halal = BPJPH">Sertifikasi Laik</th>
            <th>Level Risiko</th>
            <th style={{ textAlign: 'right' }}>Skor Keamanan</th>
            <th>Kasus 30 Hari</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td><span className="mono">{r.id}</span></td>
              <td><div className="strong">{r.name}</div><div style={{ fontSize: 11, color: 'var(--ink-500)' }}>{r.prov}</div></td>
              <td style={{ textAlign: 'right' }}><span className="strong" style={{ fontVariantNumeric: 'tabular-nums' }}>{r.porsi.toLocaleString('id-ID')}</span></td>
              <td><span className={`chip ${r.haccp === 'A' ? 'safe' : r.haccp === 'B' ? 'gold' : 'risk'}`}>Gate {r.haccp}</span></td>
              <td>
                <div style={{ display: 'flex', gap: 4 }}>
                  <span className={`chip ${r.slhs ? 'safe' : 'risk'}`}>SLHS</span>
                  <span className={`chip ${r.halal ? 'safe' : 'risk'}`}>Halal</span>
                </div>
              </td>
              <td><span className={`chip ${r.risk === 'high' ? 'risk' : r.risk === 'med' ? 'warn' : 'safe'}`}><span className="dot"/>{riskLabel(r.risk)}</span></td>
              <td style={{ textAlign: 'right' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  <div className="bar-track" style={{ width: 56 }}>
                    <div className={`bar-fill ${r.score >= 85 ? 'safe' : r.score >= 70 ? 'gold' : 'risk'}`} style={{ width: `${r.score}%` }}/>
                  </div>
                  <span className="strong" style={{ width: 26, textAlign: 'right' }}>{r.score}</span>
                </div>
              </td>
              <td>{r.inc === 0 ? <span className="chip safe">0</span> : <span className="chip risk">{r.inc}</span>}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}

// ---- Geographic tab ----
const LEVEL_LABELS = { province: 'Provinsi', kota: 'Kota/Kabupaten', kecamatan: 'Kecamatan', kelurahan: 'Kelurahan' };

function GeoTab({ D, selProv, setSelProv }) {
  const [drillLevel, setDrillLevel] = React.useState('province');
  const [drillPath, setDrillPath] = React.useState([]);   // array of { code, name, level }
  const [drillPoints, setDrillPoints] = React.useState(null); // null = show provinces
  const [selPoint, setSelPoint] = React.useState(null);

  const currentPoints = drillPoints || D.provinces;

  const drillInto = (p) => {
    if (drillLevel === 'kelurahan') return; // leaf
    const nextLevel = drillLevel === 'province' ? 'kota'
                    : drillLevel === 'kota'     ? 'kecamatan'
                    : 'kelurahan';
    const children = window.geoChildren(p, nextLevel);
    setDrillPath(prev => [...prev, { code: p.code, name: p.name, level: drillLevel }]);
    setDrillLevel(nextLevel);
    setDrillPoints(children);
    setSelPoint(null);
  };

  const drillUp = (idx) => {
    if (idx < 0) {
      // back to province root
      setDrillLevel('province');
      setDrillPath([]);
      setDrillPoints(null);
      setSelPoint(null);
      return;
    }
    const targetLevel = drillPath[idx].level;
    const targetParent = drillPath[idx];
    const newPath = drillPath.slice(0, idx);
    const nextLevel = targetLevel === 'province' ? 'kota'
                    : targetLevel === 'kota'     ? 'kecamatan'
                    : 'kelurahan';
    const children = window.geoChildren(targetParent, nextLevel);
    setDrillPath(newPath);
    setDrillLevel(nextLevel);
    setDrillPoints(children);
    setSelPoint(null);
  };

  const detail = selPoint;
  const top12 = [...currentPoints].sort((a, b) => (b.sppg || 0) - (a.sppg || 0)).slice(0, 12);
  const risky8 = [...currentPoints].sort((a, b) => (a.comply || 0) - (b.comply || 0)).slice(0, 8);

  const levelLabel = LEVEL_LABELS[drillLevel];
  const nextLabel  = drillLevel === 'province' ? 'Kota/Kab' : drillLevel === 'kota' ? 'Kecamatan' : drillLevel === 'kecamatan' ? 'Kelurahan' : null;

  const sppgUnit = drillLevel === 'province' ? '' : drillLevel === 'kota' ? '' : '';

  return (
    <div className="row-gap">
      <Card title="Peta Sebaran Operasional MBG"
            subtitle={`Klik titik untuk ${nextLabel ? `drill-down ke ${nextLabel}` : 'detail'} · ${currentPoints.length} ${levelLabel} · Level: ${levelLabel}`}
            padded={false}>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 16px 0', flexWrap: 'wrap' }}>
          <button className="btn" style={{ fontSize: 11, padding: '3px 8px' }} onClick={() => drillUp(-1)}>
            Nasional
          </button>
          {drillPath.map((p, i) => (
            <React.Fragment key={p.code}>
              <span style={{ color: 'var(--ink-400)', fontSize: 12 }}>›</span>
              <button className="btn" style={{ fontSize: 11, padding: '3px 8px' }} onClick={() => drillUp(i)}>
                {p.name}
              </button>
            </React.Fragment>
          ))}
          {drillPath.length > 0 && (
            <React.Fragment>
              <span style={{ color: 'var(--ink-400)', fontSize: 12 }}>›</span>
              <span style={{ fontSize: 11, color: 'var(--ink-600)', padding: '3px 8px', background: 'var(--bgn-navy-100)', borderRadius: 4 }}>
                {LEVEL_LABELS[drillLevel]}
              </span>
            </React.Fragment>
          )}
        </div>
        <div style={{ padding: 14 }}>
          <IndonesiaMap
            provinces={D.provinces}
            drillPoints={drillPoints}
            mode="exec"
            onDrillDown={drillInto}
            onSelect={(code) => setSelPoint(currentPoints.find(p => p.code === code) || null)}
            selected={selPoint?.code}
          />
        </div>
      </Card>

      <div className="grid-3">
        <Card title={`Top 12 ${levelLabel} by SPPG`} subtitle="Volume kapasitas operasional">
          <div className="prov-list">
            {top12.map((p) => (
              <div className="prov-row" key={p.code} style={{ cursor: nextLabel ? 'pointer' : 'default' }}
                   onClick={() => { setSelPoint(p); }}>
                <span className="name">{p.name}</span>
                <div className="bar-track">
                  <div className="bar-fill" style={{ width: `${Math.max(4, ((p.sppg || 0) / Math.max(1, top12[0]?.sppg || 1)) * 100)}%`, background: riskColor(p.risk) }}/>
                </div>
                <span className="v">{(p.sppg || 0).toLocaleString('id-ID')}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card title={`8 ${levelLabel} Watch`} subtitle="Compliance HACCP terendah">
          <div className="prov-list">
            {risky8.map((p) => (
              <div className="prov-row" key={p.code} style={{ cursor: 'pointer' }}
                   onClick={() => setSelPoint(p)}>
                <span className="name">{p.name}</span>
                <div className="bar-track">
                  <div className={`bar-fill ${(p.comply||0) < 75 ? 'risk' : 'warn'}`} style={{ width: `${p.comply||0}%` }}/>
                </div>
                <span className="v" style={{ color: (p.comply||0) < 75 ? 'var(--status-risk)' : 'var(--status-warn)' }}>{p.comply||0}%</span>
              </div>
            ))}
          </div>
        </Card>

        <Card title={detail ? `Detail · ${detail.name}` : `Detail ${levelLabel}`}
              subtitle={detail ? `${LEVEL_LABELS[detail.level || drillLevel]} snapshot` : `Klik titik pada peta atau daftar`}>
          {detail ? (
            <div>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 14 }}>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--ink-500)' }}>SPPG</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 600, color: 'var(--bgn-navy-deep)' }}>{(detail.sppg||0).toLocaleString('id-ID')}</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--ink-500)' }}>Porsi/hari</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 600, color: 'var(--bgn-navy-deep)' }}>
                    {(detail.porsi||0) >= 1000 ? `${((detail.porsi||0)/1000).toFixed(0)}K` : (detail.porsi||0)}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--ink-500)' }}>Compliance</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 600, color: riskColor(detail.risk||'low') }}>{detail.comply||0}%</div>
                </div>
              </div>
              <div className="divider"/>
              <div style={{ fontSize: 12, color: 'var(--ink-700)', lineHeight: 1.7 }}>
                Level: <strong>{LEVEL_LABELS[detail.level || drillLevel]}</strong><br/>
                Risk: <span className={`chip ${detail.risk === 'high' ? 'risk' : detail.risk === 'med' ? 'warn' : 'safe'}`}>{riskLabel(detail.risk||'low')}</span><br/>
                Insiden 30d: {Math.round(((100-(detail.comply||80))/6))}<br/>
                IoT coverage: {Math.round((detail.comply||80)*0.7)}%
              </div>
              {nextLabel && (
                <button className="btn btn-primary" style={{ width: '100%', marginTop: 12, justifyContent: 'center' }}
                        onClick={() => drillInto(detail)}>
                  Drill-down ke {nextLabel} →
                </button>
              )}
              {!nextLabel && (
                <div style={{ marginTop: 12, fontSize: 11, color: 'var(--ink-500)', textAlign: 'center' }}>
                  Level terdalam — tidak ada sub-wilayah
                </div>
              )}
            </div>
          ) : (
            <div style={{ color: 'var(--ink-500)', fontSize: 12.5, padding: '20px 0', textAlign: 'center' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>🗺</div>
              Klik titik pada peta atau baris di tabel untuk melihat detail.
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

// ---- HACCP tab ----
function HaccpTab({ D }) {
  return (
    <div className="row-gap">
      <Card title="HACCP 7-Prinsip Compliance Heatmap" subtitle="% SPPG yang lulus prinsip — by kategori volume">
        <HaccpHeatmap D={D}/>
      </Card>
      <div className="grid-2">
        <Card title="Gap Analysis — Juknis 401.1/2025 vs Standar HACCP Internasional" subtitle="5 dari 7 prinsip masih berisiko tinggi — lihat tindakan prioritas di kolom kanan">
          <div className="table-wrap">
            <table className="bgn">
              <thead><tr><th>Prinsip HACCP</th><th>Kondisi Saat Ini di MBG</th><th>Risiko</th><th>Tindakan Prioritas</th></tr></thead>
              <tbody>
                <tr><td className="strong">1. Identifikasi Bahaya<br/><span style={{fontSize:10.5,color:'var(--ink-400)',fontWeight:400}}>Hazard Analysis</span></td><td>WHO 5 Keys sudah ada, tapi matriks bahaya per menu protein belum dibuat secara nasional</td><td><span className="chip risk">Tinggi</span></td><td>Buat template bahaya per jenis menu protein (ayam, ikan, telur, daging)</td></tr>
                <tr><td className="strong">2. Titik Kontrol Kritis<br/><span style={{fontSize:10.5,color:'var(--ink-400)',fontWeight:400}}>Critical Control Point (CCP)</span></td><td>Batas 4 jam dan food sample sudah ada; namun titik kritis belum ditetapkan secara eksplisit di Juknis</td><td><span className="chip risk">Tinggi</span></td><td>Tetapkan 6 CCP nasional: masak, hot-hold, pengemasan, distribusi, penerimaan, penyajian</td></tr>
                <tr><td className="strong">3. Batas Suhu &amp; Waktu Aman<br/><span style={{fontSize:10.5,color:'var(--ink-400)',fontWeight:400}}>Critical Limits</span></td><td>Hanya batas 4 jam yang eksplisit — batas suhu masak dan holding belum termaktub di Juknis</td><td><span className="chip risk">Tinggi</span></td><td>Adopsi batas WHO secara resmi: masak ≥70°C · hot-hold &gt;60°C · cold storage &lt;5°C</td></tr>
                <tr><td className="strong">4. Pemantauan Rutin<br/><span style={{fontSize:10.5,color:'var(--ink-400)',fontWeight:400}}>Monitoring</span></td><td>Pengawasan sudah berjalan (Tauwas + inspeksi); namun log digital masih terbatas di 62% SPPG</td><td><span className="chip warn">Sedang</span></td><td>Perluas QR batch + sensor IoT ke semua SPPG; wajibkan log digital harian via form ini</td></tr>
                <tr><td className="strong">5. Tindakan Saat Batas Dilanggar<br/><span style={{fontSize:10.5,color:'var(--ink-400)',fontWeight:400}}>Corrective Action</span></td><td>Sanksi saat ini bersifat pasca-insiden; belum ada mekanisme otomatis sebelum distribusi</td><td><span className="chip risk">Tinggi</span></td><td>Implementasi auto-hold sebelum distribusi + wajib disposal record untuk batch gagal</td></tr>
                <tr><td className="strong">6. Verifikasi &amp; Audit<br/><span style={{fontSize:10.5,color:'var(--ink-400)',fontWeight:400}}>Verification</span></td><td>Food sample + inspeksi dapur sudah ada; uji laboratorium mikrobiologi masih jarang</td><td><span className="chip warn">Sedang</span></td><td>Jadwalkan uji lab Salmonella/E. coli berbasis risiko setiap 14 hari untuk SPPG Gate C/D</td></tr>
                <tr><td className="strong">7. Pencatatan &amp; Ketertelusuran<br/><span style={{fontSize:10.5,color:'var(--ink-400)',fontWeight:400}}>Record Keeping</span></td><td>Rekam jejak dari supplier ke batch ke sekolah belum terhubung secara digital end-to-end</td><td><span className="chip risk">Tinggi</span></td><td>Terapkan Batch ID nasional yang menghubungkan supplier → dapur → sekolah dalam satu QR</td></tr>
              </tbody>
            </table>
          </div>
        </Card>
        <Card title="Maturity vs HACCP Target"><MaturityRadial/></Card>
      </div>
      <div className="grid-3">
        <Card title="Standar Suhu Aman" subtitle="WHO Five Keys to Safer Food">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <TempCard label="Cook thoroughly" v="70°C" desc="Suhu inti masak, terutama protein hewani" color="#C03A2B"/>
            <TempCard label="Hot holding" v=">60°C" desc="Pertahankan panas hingga disajikan" color="#D89014"/>
            <TempCard label="Cold storage" v="<5°C" desc="Bahan perishable & makanan matang dingin" color="#2D5BA8"/>
            <TempCard label="Window distribusi" v="≤4 jam" desc="Pengolahan → konsumsi (Juknis 401.1)" color="#0E2A5C"/>
          </div>
        </Card>
        <Card title="Risk-Based Inspection Engine" subtitle="Faktor scoring SPPG">
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11.5, padding: 12, background: 'var(--ink-50)', borderRadius: 8, color: 'var(--ink-700)', lineHeight: 1.7 }}>
            risk = volume×0.18 +<br/>
            certificate_gap×0.22 +<br/>
            temp_log_miss×0.20 +<br/>
            historical_complaint×0.16 +<br/>
            distance_minutes×0.10 +<br/>
            high_risk_menu×0.08 +<br/>
            audit_findings×0.06
          </div>
          <div className="divider"/>
          <div style={{ fontSize: 11.5, color: 'var(--ink-700)', lineHeight: 1.6 }}>
            <span className="chip risk">High</span> &gt;65 score · audit 14 hari<br/>
            <span className="chip warn">Medium</span> 40–65 · audit bulanan<br/>
            <span className="chip safe">Low</span> &lt;40 · audit kuartalan
          </div>
        </Card>
        <Card title="Auto-Hold Engine" subtitle="Pre-distribution corrective action">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ padding: 12, background: 'var(--status-risk-soft)', borderRadius: 8, fontSize: 12, color: '#8B1F15' }}>
              <strong>847</strong> batch ditahan otomatis (30 hari)<br/>
              <span style={{ fontSize: 11, opacity: 0.85 }}>Suhu inti / window 4 jam / hot-holding fail</span>
            </div>
            <div style={{ padding: 12, background: 'var(--status-warn-soft)', borderRadius: 8, fontSize: 12, color: '#8E5800' }}>
              <strong>312</strong> batch reroute distribusi<br/>
              <span style={{ fontSize: 11, opacity: 0.85 }}>Overdistance &gt; 30 mnt / 6 km</span>
            </div>
            <div style={{ padding: 12, background: 'var(--status-safe-soft)', borderRadius: 8, fontSize: 12, color: '#176B3F' }}>
              <strong>71.6 jt</strong> porsi clear hari ini<br/>
              <span style={{ fontSize: 11, opacity: 0.85 }}>Verified · QR scanned · disajikan</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function TempCard({ label, v, desc, color }) {
  return (
    <div style={{ display: 'flex', gap: 12, padding: 12, background: 'var(--ink-50)', borderRadius: 8, alignItems: 'center' }}>
      <div style={{ width: 60, textAlign: 'center', fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color }}>{v}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 700, fontSize: 12.5, color: 'var(--ink-900)' }}>{label}</div>
        <div style={{ fontSize: 11, color: 'var(--ink-500)' }}>{desc}</div>
      </div>
    </div>
  );
}

// ---- Operations tab ----
function OpsTab({ D }) {
  return (
    <div className="row-gap">
      <Card title="SPPG Operasional — All Watchlist" subtitle="Filter, sort, drill-down" padded={false}>
        <SppgTable rows={D.sppgList}/>
      </Card>
      <div className="grid-2">
        <Card title="Distribusi Window 4 Jam — by Provinsi" subtitle="% batch sampai sebelum 4 jam">
          <div className="prov-list">
            {D.provinces.slice(0, 10).map(p => (
              <div className="prov-row" key={p.code}>
                <span className="name">{p.name}</span>
                <div className="bar-track"><div className={`bar-fill ${p.comply >= 88 ? 'safe' : p.comply >= 80 ? 'gold' : 'risk'}`} style={{ width: `${p.comply}%` }}/></div>
                <span className="v">{p.comply}%</span>
              </div>
            ))}
          </div>
        </Card>
        <Card title="IoT Sensor Status" subtitle="Hot-holding + cold-chain real-time">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <SensorRow lab="Hot Holding" v="61.4°C" tol=">60°C" ok={true}/>
            <SensorRow lab="Cold Storage A" v="3.8°C" tol="<5°C" ok={true}/>
            <SensorRow lab="Cold Storage B" v="6.8°C" tol="<5°C" ok={false}/>
            <SensorRow lab="Cooking Core (Ayam)" v="72.4°C" tol="≥70°C" ok={true}/>
            <SensorRow lab="Cooking Core (Telur)" v="67.1°C" tol="≥70°C" ok={false}/>
            <SensorRow lab="Truck Refer" v="4.2°C" tol="<5°C" ok={true}/>
          </div>
        </Card>
      </div>
    </div>
  );
}

function SensorRow({ lab, v, tol, ok }) {
  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'center', padding: 10, background: ok ? 'var(--status-safe-soft)' : 'var(--status-risk-soft)', borderRadius: 8 }}>
      <div style={{ width: 8, height: 8, borderRadius: 999, background: ok ? 'var(--status-safe)' : 'var(--status-risk)' }}/>
      <div style={{ flex: 1, fontSize: 12.5, fontWeight: 600, color: 'var(--ink-900)' }}>{lab}</div>
      <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: ok ? '#176B3F' : '#8B1F15' }}>{v}</div>
      <div style={{ fontSize: 11, color: 'var(--ink-500)' }}>tol {tol}</div>
    </div>
  );
}

// ---- Incidents tab ----
function IncidentsTab({ D }) {
  return (
    <div className="row-gap">
      <Card title="Kasus Aktif & Recall Tracker" subtitle={`${D.kpis.incidentsOpen} kasus terbuka (KLB = Kejadian Luar Biasa / dugaan keracunan) · ${D.kpis.incidentsClosed30d} selesai 30 hari terakhir · 0 fatality`}>
        <div className="table-wrap">
          <table className="bgn">
            <thead><tr><th>ID Kasus</th><th>Lokasi Dapur</th><th>Menu / Kode Batch</th><th>Status Penanganan</th><th>Terdampak</th><th>Batas Waktu</th></tr></thead>
            <tbody>
              <tr><td className="mono">INC-2026-0214</td><td><div className="strong">SPPG Bogor Selatan</div><div style={{ fontSize: 11, color: 'var(--ink-500)' }}>Jawa Barat</div></td><td>Sayur Lodeh · B-2026-JB-1240</td><td><span className="chip risk">Recall aktif</span></td><td>34 dilaporkan</td><td>8j tersisa</td></tr>
              <tr><td className="mono">INC-2026-0211</td><td><div className="strong">SPPG Mataram Barat</div><div style={{ fontSize: 11, color: 'var(--ink-500)' }}>NTB</div></td><td>Telur Balado · B-2026-NB-0491</td><td><span className="chip warn">Investigasi</span></td><td>12 keluhan</td><td>1d 4j</td></tr>
              <tr><td className="mono">INC-2026-0208</td><td><div className="strong">SPPG Manokwari</div><div style={{ fontSize: 11, color: 'var(--ink-500)' }}>Papua Barat</div></td><td>Ayam Goreng · B-2026-PB-0118</td><td><span className="chip warn">Lab uji</span></td><td>8 dilaporkan</td><td>2d 6j</td></tr>
              <tr><td className="mono">INC-2026-0205</td><td><div className="strong">SPPG Kupang Tengah</div><div style={{ fontSize: 11, color: 'var(--ink-500)' }}>NTT</div></td><td>Sup Sayuran · B-2026-NT-0212</td><td><span className="chip info">Korektif jalan</span></td><td>4 dilaporkan</td><td>3d 0j</td></tr>
              <tr><td className="mono">INC-2026-0202</td><td><div className="strong">SPPG Jayapura Sel.</div><div style={{ fontSize: 11, color: 'var(--ink-500)' }}>Papua</div></td><td>Ikan Cakalang · B-2026-PA-0064</td><td><span className="chip safe">Closing</span></td><td>2 dilaporkan</td><td>—</td></tr>
            </tbody>
          </table>
        </div>
      </Card>
      <div className="grid-2">
        <Card title="Tren Insiden 30 Hari"><BarsRow values={D.incidents30d} h={140}/></Card>
        <Card title="Akar Penyebab Kasus" subtitle="Distribusi penyebab dari 47 kasus selesai (30 hari)">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { n: 'Hot-holding gagal (suhu <60°C)',        v: 38, c: 'risk' },
              { n: 'Window 4 jam terlewati',                v: 22, c: 'risk' },
              { n: 'Suhu masak kurang (<70°C)',             v: 18, c: 'warn' },
              { n: 'Kontaminasi silang (bahan mentah)',     v: 12, c: 'warn' },
              { n: 'Bahan baku dari supplier tidak layak', v: 10, c: 'gold' },
            ].map((it, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                  <span style={{ color: 'var(--ink-700)', fontWeight: 600 }}>{it.n}</span>
                  <span style={{ fontWeight: 700, color: 'var(--bgn-navy-deep)' }}>{it.v}%</span>
                </div>
                <div className="bar-track"><div className={`bar-fill ${it.c}`} style={{ width: `${it.v}%` }}/></div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

// ─── Food Safety Data Sources Tab ───────────────────────────────────────────

const WHO_KEYS_LABELS = [
  'Bahan baku dari supplier resmi (dilengkapi COA/sertifikat)',
  'Suhu inti masak protein ≥70°C (ayam, daging, telur, ikan)',
  'Hot-holding dijaga >60°C dari masak hingga distribusi',
  'Distribusi ≤4 jam total & ≤30 menit / ≤6 km per jalur',
  'Sampel 2 porsi/batch diambil & disimpan 3 hari untuk investigasi',
];



// ---- Dapur Ops Page ----
const DAPUR_INIT = [
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
];

function DapurOpsPage({ D }) {
  const [kitchens, setKitchens] = React.useState(DAPUR_INIT);
  const [filterStatus, setFilterStatus] = React.useState('all');
  const [filterRisk, setFilterRisk] = React.useState('all');
  const [confirmModal, setConfirmModal] = React.useState(null); // { kitchen, action }
  const [searchQ, setSearchQ] = React.useState('');

  const filtered = kitchens.filter(k => {
    if (filterStatus !== 'all' && k.status !== filterStatus) return false;
    if (filterRisk !== 'all' && k.risk !== filterRisk) return false;
    if (searchQ && !k.name.toLowerCase().includes(searchQ.toLowerCase()) && !k.prov.toLowerCase().includes(searchQ.toLowerCase())) return false;
    return true;
  });

  const doAction = (kitchen, action) => {
    setKitchens(prev => prev.map(k => k.id === kitchen.id ? { ...k, status: action === 'suspend' ? 'suspended' : 'active' } : k));
    window.toast(`${kitchen.name}: ${action === 'suspend' ? 'Ditangguhkan' : 'Diaktifkan kembali'}`, action === 'suspend' ? 'risk' : 'safe');
    setConfirmModal(null);
  };

  const kpis = {
    total: kitchens.length,
    active: kitchens.filter(k => k.status === 'active').length,
    suspended: kitchens.filter(k => k.status === 'suspended').length,
    highRisk: kitchens.filter(k => k.risk === 'high').length,
    avgComply: Math.round(kitchens.reduce((s, k) => s + k.comply, 0) / kitchens.length),
  };

  return (
    <div className="row-gap">
      {/* KPI Strip */}
      <div className="kpi-grid" style={{ marginTop: 0 }}>
        <KPI label="Dapur Terdaftar" accent="navy" value={kpis.total} unit="" meta="Total SPPG dalam sistem"/>
        <KPI label="Aktif Beroperasi" accent="leaf" value={kpis.active} unit="" meta="Sinkronisasi data berjalan"/>
        <KPI label="Ditangguhkan" accent="risk" value={kpis.suspended} unit="" meta="Menunggu tindakan korektif"/>
        <KPI label="Avg Compliance" accent="gold" value={`${kpis.avgComply}%`} unit="" meta="Rata-rata skor HACCP"/>
      </div>

      <Card title="Manajemen Dapur SPPG" subtitle="Status sinkronisasi dari IoT, QR Traceability, dan sistem BPOM · Klik aksi untuk suspend/aktifkan dapur">
        {/* Filter Bar */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 14, flexWrap: 'wrap', alignItems: 'center' }}>
          <input
            placeholder="Cari nama dapur atau provinsi…"
            value={searchQ}
            onChange={e => setSearchQ(e.target.value)}
            style={{ flex: 1, minWidth: 200, padding: '7px 12px', border: '1px solid var(--ink-200)', borderRadius: 6, fontSize: 13 }}
          />
          <div style={{ display: 'flex', gap: 4 }}>
            {['all','active','suspended'].map(v => (
              <button key={v} className={`btn ${filterStatus === v ? 'btn-primary' : ''}`}
                      style={{ fontSize: 12, padding: '5px 10px' }}
                      onClick={() => setFilterStatus(v)}>
                {v === 'all' ? 'Semua' : v === 'active' ? 'Aktif' : 'Ditangguhkan'}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            {['all','high','med','low'].map(v => (
              <button key={v} className={`btn ${filterRisk === v ? 'btn-primary' : ''}`}
                      style={{ fontSize: 12, padding: '5px 10px' }}
                      onClick={() => setFilterRisk(v)}>
                {v === 'all' ? 'Semua Risk' : v === 'high' ? 'Tinggi' : v === 'med' ? 'Sedang' : 'Rendah'}
              </button>
            ))}
          </div>
        </div>

        <div className="table-wrap">
          <table className="bgn">
            <thead>
              <tr>
                <th>ID Dapur</th>
                <th>Nama & Lokasi</th>
                <th>Porsi/Hari</th>
                <th>Compliance</th>
                <th>HACCP Gate</th>
                <th>Sinkronisasi App</th>
                <th>Sync Terakhir</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(k => (
                <tr key={k.id}>
                  <td><span className="mono" style={{ fontSize: 11 }}>{k.id}</span></td>
                  <td>
                    <div className="strong">{k.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--ink-500)' }}>{k.prov}</div>
                  </td>
                  <td style={{ textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{k.porsi.toLocaleString('id-ID')}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div className="bar-track" style={{ width: 48 }}>
                        <div className={`bar-fill ${k.comply >= 85 ? 'safe' : k.comply >= 70 ? 'gold' : 'risk'}`} style={{ width: `${k.comply}%` }}/>
                      </div>
                      <span className="strong" style={{ fontSize: 12, color: k.comply >= 85 ? 'var(--status-safe)' : k.comply >= 70 ? '#9E7700' : 'var(--status-risk)' }}>{k.comply}%</span>
                    </div>
                  </td>
                  <td><span className={`chip ${k.haccp === 'A' ? 'safe' : k.haccp === 'B' ? 'gold' : 'risk'}`}>Gate {k.haccp}</span></td>
                  <td>
                    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                      {['IoT','QR','BPOM'].map(app => (
                        <span key={app} className={`chip ${k.apps.includes(app) ? 'safe' : 'risk'}`} style={{ fontSize: 10 }}>
                          {k.apps.includes(app) ? '✓' : '✗'} {app}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td style={{ fontSize: 11, color: k.lastSync.includes('jam') ? 'var(--status-risk)' : 'var(--ink-600)' }}>
                    {k.lastSync}
                  </td>
                  <td>
                    <span className={`chip ${k.status === 'active' ? 'safe' : 'risk'}`}>
                      <span className="dot"/>
                      {k.status === 'active' ? 'Aktif' : 'Ditangguhkan'}
                    </span>
                  </td>
                  <td>
                    {k.status === 'active' ? (
                      <button className="btn" style={{ fontSize: 11, padding: '4px 8px', borderColor: 'var(--status-risk)', color: 'var(--status-risk)' }}
                              onClick={() => setConfirmModal({ kitchen: k, action: 'suspend' })}>
                        Tangguhkan
                      </button>
                    ) : (
                      <button className="btn btn-primary" style={{ fontSize: 11, padding: '4px 8px' }}
                              onClick={() => setConfirmModal({ kitchen: k, action: 'activate' })}>
                        Aktifkan
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: 32, color: 'var(--ink-400)', fontSize: 13 }}>Tidak ada dapur yang sesuai filter.</div>
        )}
      </Card>

      {/* Confirm Modal */}
      <Modal open={!!confirmModal} onClose={() => setConfirmModal(null)}
             title={confirmModal?.action === 'suspend' ? 'Konfirmasi Penangguhan Dapur' : 'Konfirmasi Aktivasi Dapur'}
             w={480}>
        {confirmModal && (
          <div style={{ fontSize: 13, lineHeight: 1.6 }}>
            <div style={{ background: confirmModal.action === 'suspend' ? 'var(--status-risk-soft)' : 'var(--status-safe-soft)', padding: 14, borderRadius: 8, marginBottom: 14 }}>
              <strong>{confirmModal.kitchen.name}</strong><br/>
              {confirmModal.action === 'suspend'
                ? `Compliance saat ini: ${confirmModal.kitchen.comply}% (${confirmModal.kitchen.haccp === 'C' ? 'HACCP Gate C – tidak lulus standar keamanan pangan minimum' : 'pelanggaran terdeteksi'}). Penangguhan akan menghentikan operasional sementara hingga korektif selesai.`
                : `Compliance saat ini: ${confirmModal.kitchen.comply}%. Pastikan tindakan korektif telah selesai sebelum mengaktifkan kembali.`
              }
            </div>
            <div style={{ color: 'var(--ink-700)' }}>
              <strong>Konsekuensi:</strong>
              <ul style={{ paddingLeft: 18, marginTop: 6 }}>
                {confirmModal.action === 'suspend' ? (
                  <>
                    <li>Distribusi porsi ke {confirmModal.kitchen.porsi.toLocaleString('id-ID')} penerima terhenti</li>
                    <li>BPOM & Dinas Pendidikan dinotifikasi otomatis</li>
                    <li>Dapur masuk watchlist audit darurat</li>
                  </>
                ) : (
                  <>
                    <li>Operasional dan distribusi dapat dilanjutkan</li>
                    <li>Monitoring diperkuat 7 hari pertama pasca-aktivasi</li>
                    <li>Laporan aktivasi dikirim ke supervisor wilayah</li>
                  </>
                )}
              </ul>
            </div>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 16 }}>
              <button className="btn" onClick={() => setConfirmModal(null)}>Batal</button>
              <button
                className={`btn ${confirmModal.action === 'suspend' ? '' : 'btn-primary'}`}
                style={confirmModal.action === 'suspend' ? { background: 'var(--status-risk)', color: '#fff', border: 'none' } : {}}
                onClick={() => doAction(confirmModal.kitchen, confirmModal.action)}>
                {confirmModal.action === 'suspend' ? 'Ya, Tangguhkan' : 'Ya, Aktifkan Kembali'}
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

// ---- AI Recommendation Page ----
const AI_RECS_INIT = [
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
];

const PRIORITY_META = {
  urgent: { label: 'Urgent', color: 'var(--status-risk)', bg: 'var(--status-risk-soft)', badge: 'risk' },
  high:   { label: 'Tinggi', color: '#9E5400', bg: '#FFF3E0', badge: 'warn' },
  medium: { label: 'Sedang', color: '#176B3F', bg: 'var(--status-safe-soft)', badge: 'safe' },
};

function AIRecommendationPage({ D }) {
  const [recs, setRecs] = React.useState(AI_RECS_INIT);
  const [filterPri, setFilterPri] = React.useState('all');
  const [filterCat, setFilterCat] = React.useState('all');
  const [expanded, setExpanded] = React.useState(null);

  const cats = [...new Set(AI_RECS_INIT.map(r => r.category))];

  const filtered = recs.filter(r => {
    if (filterPri !== 'all' && r.priority !== filterPri) return false;
    if (filterCat !== 'all' && r.category !== filterCat) return false;
    return true;
  });

  const applyRec = (id) => {
    setRecs(prev => prev.map(r => r.id === id ? { ...r, status: 'applied' } : r));
    window.toast('Rekomendasi diterapkan · Task dibuat & dikirim ke tim terkait', 'safe');
  };
  const dismissRec = (id) => {
    setRecs(prev => prev.map(r => r.id === id ? { ...r, status: 'dismissed' } : r));
    window.toast('Rekomendasi diabaikan · Dicatat untuk review bulanan', 'gold');
  };

  const counts = { pending: recs.filter(r=>r.status==='pending').length, applied: recs.filter(r=>r.status==='applied').length, dismissed: recs.filter(r=>r.status==='dismissed').length };

  return (
    <div className="row-gap">
      {/* Header AI panel */}
      <Card title="Mesin Analitik & Rekomendasi AI" subtitle="Model prediktif berbasis data HACCP compliance, log insiden, sensor IoT, dan tren distribusi 90 hari terakhir">
        <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 220 }}>
            <div style={{ fontSize: 12, color: 'var(--ink-600)', lineHeight: 1.7 }}>
              <strong>Metodologi:</strong> Random Forest + aturan berbasis Juknis 401.1/2025, WHO Five Keys, dan pola historis 14.200 log lapangan. Rekomendasi diperbarui setiap 6 jam.<br/>
              <strong>Sumber data:</strong> IoT cold-chain, log suhu CCP, checklist proses, data distribusi GPS, laporan BPOM, dan survei pilot BGN.
            </div>
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            {[
              { l: 'Menunggu', v: counts.pending, c: 'var(--bgn-gold)' },
              { l: 'Diterapkan', v: counts.applied, c: 'var(--status-safe)' },
              { l: 'Diabaikan', v: counts.dismissed, c: 'var(--ink-400)' },
            ].map(({ l, v, c }) => (
              <div key={l} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, color: c }}>{v}</div>
                <div style={{ fontSize: 11, color: 'var(--ink-500)' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Filter Bar */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ fontSize: 12, color: 'var(--ink-500)', fontWeight: 600 }}>Prioritas:</span>
        {['all','urgent','high','medium'].map(v => (
          <button key={v} className={`btn ${filterPri === v ? 'btn-primary' : ''}`}
                  style={{ fontSize: 12, padding: '5px 10px' }}
                  onClick={() => setFilterPri(v)}>
            {v === 'all' ? 'Semua' : PRIORITY_META[v]?.label || v}
          </button>
        ))}
        <span style={{ fontSize: 12, color: 'var(--ink-500)', fontWeight: 600, marginLeft: 8 }}>Kategori:</span>
        <button className={`btn ${filterCat === 'all' ? 'btn-primary' : ''}`}
                style={{ fontSize: 12, padding: '5px 10px' }}
                onClick={() => setFilterCat('all')}>Semua</button>
        {cats.map(c => (
          <button key={c} className={`btn ${filterCat === c ? 'btn-primary' : ''}`}
                  style={{ fontSize: 12, padding: '5px 10px' }}
                  onClick={() => setFilterCat(c)}>{c}</button>
        ))}
      </div>

      {/* Recommendation Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {filtered.map(r => {
          const pm = PRIORITY_META[r.priority];
          const isExpanded = expanded === r.id;
          const isDone = r.status !== 'pending';
          return (
            <div key={r.id} style={{
              border: `1px solid ${isDone ? 'var(--ink-200)' : pm.color + '55'}`,
              borderLeft: `4px solid ${isDone ? 'var(--ink-300)' : pm.color}`,
              borderRadius: 10,
              background: isDone ? 'var(--surface)' : pm.bg,
              opacity: isDone ? 0.65 : 1,
              transition: 'opacity .2s',
            }}>
              <div style={{ display: 'flex', gap: 14, padding: '14px 16px', alignItems: 'flex-start', cursor: 'pointer' }}
                   onClick={() => setExpanded(isExpanded ? null : r.id)}>
                <div style={{ fontSize: 24, lineHeight: 1, marginTop: 2 }}>{r.icon}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4, flexWrap: 'wrap' }}>
                    <span className={`chip ${pm.badge}`} style={{ fontSize: 10 }}>{pm.label}</span>
                    <span className="chip info" style={{ fontSize: 10 }}>{r.category}</span>
                    <span style={{ fontSize: 11, color: 'var(--ink-400)', fontFamily: 'var(--font-mono)' }}>{r.id}</span>
                    {r.status === 'applied' && <span className="chip safe" style={{ fontSize: 10 }}>✓ Diterapkan</span>}
                    {r.status === 'dismissed' && <span className="chip" style={{ fontSize: 10, background: 'var(--ink-100)' }}>Diabaikan</span>}
                  </div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--ink-900)', marginBottom: 4, lineHeight: 1.4 }}>{r.title}</div>
                  <div style={{ fontSize: 12, color: 'var(--ink-600)', lineHeight: 1.5 }}>{r.rationale}</div>
                </div>
                <div style={{ fontSize: 18, color: 'var(--ink-400)', flexShrink: 0 }}>{isExpanded ? '▲' : '▼'}</div>
              </div>

              {isExpanded && (
                <div style={{ padding: '0 16px 16px', borderTop: '1px solid var(--ink-100)', marginTop: 0 }}>
                  <div style={{ paddingTop: 14, display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, minWidth: 220 }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-500)', marginBottom: 4 }}>ESTIMASI DAMPAK</div>
                      <div style={{ fontSize: 13, color: 'var(--ink-800)', lineHeight: 1.6 }}>{r.impact}</div>
                    </div>
                    <div style={{ flex: 1, minWidth: 220 }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-500)', marginBottom: 4 }}>SUMBER DATA</div>
                      <div style={{ fontSize: 12, color: 'var(--ink-600)', lineHeight: 1.6 }}>{r.source}</div>
                    </div>
                  </div>
                  {!isDone && (
                    <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
                      <button className="btn btn-primary" onClick={() => applyRec(r.id)}>
                        ✓ Terapkan Rekomendasi
                      </button>
                      <button className="btn" style={{ color: 'var(--ink-500)', borderColor: 'var(--ink-200)' }}
                              onClick={() => dismissRec(r.id)}>
                        Abaikan
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: 40, color: 'var(--ink-400)', fontSize: 13 }}>
            <div style={{ fontSize: 40, marginBottom: 8 }}>🤖</div>
            Tidak ada rekomendasi yang sesuai filter saat ini.
          </div>
        )}
      </div>
    </div>
  );
}

window.ExecDashboard = ExecDashboard;
