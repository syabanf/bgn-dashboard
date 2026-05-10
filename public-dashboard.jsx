// Public Dashboard — Trust & Transparency for Indonesian people

const { useState: useStateP } = React;

function PublicDashboard() {
  const D = window.BGN_DATA;
  const [section, setSection] = useStateP('beranda');
  const [modal, setModal] = useStateP(null);

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="nav-group">
          <div className="label">Untuk Publik</div>
          <button className={`nav-item ${section === 'beranda' ? 'active' : ''}`} onClick={() => setSection('beranda')}>{Ico.dashboard} Beranda</button>
          <button className={`nav-item ${section === 'lacak' ? 'active' : ''}`} onClick={() => setSection('lacak')}>{Ico.qr} Lacak Batch</button>
          <button className={`nav-item ${section === 'menu' ? 'active' : ''}`} onClick={() => setSection('menu')}>{Ico.doc} Menu Hari Ini</button>
          <button className={`nav-item ${section === 'sertifikat' ? 'active' : ''}`} onClick={() => setSection('sertifikat')}>{Ico.shield} Sertifikasi & Audit</button>
          <button className={`nav-item ${section === 'peta' ? 'active' : ''}`} onClick={() => setSection('peta')}>{Ico.map} Peta Provinsi</button>
          <button className={`nav-item ${section === 'lapor' ? 'active' : ''}`} onClick={() => setSection('lapor')}>{Ico.alert} Lapor Keluhan</button>
        </div>
        <div className="nav-group">
          <div className="label">Sumber Daya</div>
          <button className="nav-item" onClick={() => setModal('juknis')}>{Ico.doc} Juknis 401.1/2025</button>
          <button className="nav-item" onClick={() => setModal('haccp')}>{Ico.doc} Standar HACCP</button>
          <button className="nav-item" onClick={() => setModal('faq')}>{Ico.users} FAQ Orang Tua</button>
        </div>
        <div style={{ background: 'var(--bgn-gold-pale)', border: '1px solid var(--bgn-gold-soft)', borderRadius: 8, padding: 12, fontSize: 11.5, color: 'var(--ink-700)', lineHeight: 1.5 }}>
          <strong style={{ color: 'var(--bgn-navy-deep)', display: 'block', marginBottom: 4 }}>Hotline 24 jam</strong>
          📞 119 ext. 9 (Kemenkes)<br/>
          📞 1500-533 (BPOM)<br/>
          ✉ aduan@bgn.go.id
        </div>
      </aside>

      <main className="main">
        {section === 'beranda' && <PublicBeranda D={D} go={setSection}/>}

        {section === 'lacak' && <PublicLacak D={D} goLapor={setSection}/>}
        {section === 'menu' && <PublicMenu D={D}/>}
        {section === 'sertifikat' && <PublicSertifikat D={D}/>}
        {section === 'peta' && <PublicPeta D={D}/>}
        {section === 'lapor' && <PublicLapor/>}
      </main>

      <Modal open={modal === 'juknis'} onClose={() => setModal(null)} title="Juknis 401.1/2025" w={620}>
        <div style={{ fontSize: 13.5, lineHeight: 1.7, color: 'var(--ink-700)' }}>
          <p>Dokumen rujukan utama tata kelola Program Makan Bergizi (MBG) yang diterbitkan Badan Gizi Nasional. Mengatur:</p>
          <ul style={{ paddingLeft: 18 }}>
            <li>Standar dapur SPPG (kapasitas 2.500–3.000 porsi/hari)</li>
            <li>Window 4 jam dari masak ke konsumsi</li>
            <li>Distribusi maksimum 30 menit / 6 km</li>
            <li>Sample 2 porsi per batch disimpan 3 hari</li>
            <li>Sertifikasi terpadu: SLHS · Halal · HACCP</li>
          </ul>
          <button className="btn btn-primary" style={{ marginTop: 12 }} onClick={() => window.toast('PDF Juknis 401.1 sedang diunduh', 'safe')}>{Ico.download} Unduh PDF (3.4 MB)</button>
        </div>
      </Modal>

      <Modal open={modal === 'haccp'} onClose={() => setModal(null)} title="Standar HACCP — 7 Prinsip WHO/Codex" w={640}>
        <ol style={{ fontSize: 13.5, lineHeight: 1.7, color: 'var(--ink-700)', paddingLeft: 22 }}>
            <li><strong>Hazard Analysis</strong> — identifikasi bahaya biologi, kimia, fisik</li>
            <li><strong>Critical Control Point (CCP)</strong> — titik kritis pengendalian</li>
            <li><strong>Critical Limit</strong> — batas suhu, waktu, pH yang harus dipenuhi</li>
            <li><strong>Monitoring</strong> — pengukuran rutin, terotomatisasi via IoT</li>
            <li><strong>Corrective Action</strong> — tindakan saat batas terlewati</li>
            <li><strong>Verification</strong> — audit & uji laboratorium berkala</li>
            <li><strong>Record Keeping</strong> — dokumentasi tertelusur (digital + cetak)</li>
        </ol>
      </Modal>

      <Modal open={modal === 'faq'} onClose={() => setModal(null)} title="FAQ Orang Tua" w={620}>
        <div style={{ fontSize: 13.5, lineHeight: 1.7 }}>
          {[
            ['Bagaimana saya tahu makanan anak saya aman?', 'Setiap porsi memiliki QR di kemasan. Pindai untuk lihat batch, suhu masak, waktu, dan sekolah tujuan.'],
            ['Apa yang dilakukan jika anak saya sakit setelah makan?', 'Hubungi 119 ext. 9 atau 1500-533 (BPOM). Sampel 2 porsi per batch disimpan 3 hari untuk investigasi.'],
            ['Apakah menu halal & sesuai gizi?', 'Ya. Setiap SPPG bersertifikat Halal BPJPH dan menu mengikuti AKG dengan rasio K-P-L 50-25-25.'],
            ['Boleh saya kunjungi dapur SPPG?', 'Ya, dengan janji temu. Hubungi SPPG terdekat — kunjungan publik dibuka tiap Jumat.'],
          ].map(([q, a], i) => (
            <details key={i} style={{ borderBottom: '1px solid var(--ink-100)', padding: '10px 0' }}>
              <summary style={{ cursor: 'pointer', fontWeight: 600, color: 'var(--bgn-navy-deep)' }}>{q}</summary>
              <p style={{ margin: '8px 0 0', color: 'var(--ink-700)' }}>{a}</p>
            </details>
          ))}
        </div>
      </Modal>
    </div>
  );
}

function PublicBeranda({ D, go }) {
  return (
    <div className="row-gap">
      <div className="hero-public">
        <div className="hero-illus" aria-hidden="true">
          <svg viewBox="0 0 240 200" width="240" height="200">
            <circle cx="120" cy="110" r="86" fill="rgba(255,255,255,0.06)"/>
            <circle cx="120" cy="110" r="66" fill="rgba(255,255,255,0.08)"/>
            <rect x="66" y="82" width="108" height="56" rx="8" fill="#F5F1E6"/>
            <rect x="72" y="88" width="42" height="44" rx="4" fill="#E8B547"/>
            <rect x="118" y="88" width="24" height="20" rx="3" fill="#7AB97D"/>
            <rect x="146" y="88" width="22" height="20" rx="3" fill="#D97757"/>
            <rect x="118" y="112" width="50" height="20" rx="3" fill="#FFFFFF" stroke="#0E2A5C" strokeWidth="1"/>
            <circle cx="120" cy="60" r="14" fill="#FFFFFF" stroke="#7AB97D" strokeWidth="3"/>
            <path d="M114 60 l4 4 l8 -8" stroke="#176B3F" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
          </svg>
        </div>
        <div className="eyebrow">📅 Diperbarui 9 Mei 2026 · 19.04 WIB</div>
        <h1>Makanan anak Anda <em>aman</em>, <em>bergizi</em>, dan bisa dicek sendiri.</h1>
        <p className="lede">
          Setiap kotak makan dari Program MBG dimasak di dapur ber-sertifikat dan diantar dengan suhu terjaga.
          Halaman ini menunjukkan datanya — terbuka, real-time, untuk semua orang tua di Indonesia.
        </p>
        <div className="trust-score-card">
          <svg width="110" height="110" viewBox="0 0 110 110" style={{ position: 'absolute', top: 14, right: 14, opacity: 0.95 }}>
            <circle cx="55" cy="55" r="46" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="8"/>
            <circle cx="55" cy="55" r="46" fill="none" stroke="#E8B547" strokeWidth="8" strokeDasharray={`${(D.kpis.publicTrust/100)*289} 289`} strokeDashoffset="0" strokeLinecap="round" transform="rotate(-90 55 55)"/>
          </svg>
          <div className="num">{D.kpis.publicTrust}<span style={{ fontSize: 22 }}>/100</span></div>
          <div className="lab">👍 Skor Kepercayaan Orang Tua</div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', marginTop: 4 }}>Survey nasional · 12.400 responden</div>
        </div>
      </div>

      {/* Live counters */}
      <div className="kpi-grid">
        <div className="live-counter">
          <div className="lc-icon" style={{ background: '#FEF3D7', color: '#A36F00' }}>🍱</div>
          <div className="lab"><span className="live-dot"/>Porsi disajikan hari ini</div>
          <div className="num">{(D.kpis.porsiToday/1e6).toFixed(1)}<span className="unit">juta porsi</span></div>
          <div className="delta">{Ico.arrowUp} 4,2% lebih banyak dari kemarin</div>
        </div>
        <div className="live-counter">
          <div className="lc-icon" style={{ background: '#E8F1FB', color: 'var(--bgn-navy-deep)' }}>👧</div>
          <div className="lab">Anak yang menerima makanan</div>
          <div className="num">{(D.kpis.studentsServed/1e6).toFixed(1)}<span className="unit">juta anak</span></div>
          <div className="delta">{Ico.check} di 20.118 sekolah</div>
        </div>
        <div className="live-counter">
          <div className="lc-icon" style={{ background: '#E8F4EC', color: '#176B3F' }}>🏠</div>
          <div className="lab">Dapur SPPG yang aktif</div>
          <div className="num">{D.kpis.sppgActive.toLocaleString('id-ID')}<span className="unit">dapur</span></div>
          <div className="delta">{Ico.check} di 31 provinsi</div>
        </div>
        <div className="live-counter">
          <div className="lc-icon" style={{ background: '#FBE9E5', color: '#8B1F15' }}>🛡️</div>
          <div className="lab">Lulus standar keamanan pangan</div>
          <div className="num">{D.kpis.complianceRate}<span className="unit">%</span></div>
          <div className="delta">{Ico.arrowUp} naik 1,8 poin minggu ini</div>
        </div>
      </div>

      {/* Visual: How it gets to your child in 4 hours */}
      <Card title="Bagaimana makanan sampai ke anak Anda?" subtitle="Dari belanja bahan sampai di sekolah, semua dalam 4 jam — diawasi sensor & QR">
        <div className="flow-vis">
          {[{i:'🛒',l:'Belanja',t:'04.00',d:'Bahan segar dari supplier resmi'},
            {i:'🔥',l:'Masak',t:'05.30',d:'Suhu inti minimal 70°C'},
            {i:'🌡️',l:'Hot Hold',t:'06.30',d:'Dijaga di atas 60°C'},
            {i:'🚐',l:'Antar',t:'07.10',d:'Maksimum 30 menit / 6 km'},
            {i:'🍽️',l:'Disajikan',t:'07.40',d:'Anak makan saat masih hangat'}].map((s,i,arr) => (
              <React.Fragment key={i}>
                <div className="flow-step">
                  <div className="flow-dot">{s.i}</div>
                  <div className="flow-time">{s.t}</div>
                  <div className="flow-lab">{s.l}</div>
                  <div className="flow-desc">{s.d}</div>
                </div>
                {i < arr.length - 1 && <div className="flow-line"><div className="flow-line-fill"/></div>}
              </React.Fragment>
            ))}
        </div>
      </Card>

      {/* Trust pillars / cert summary */}
      <Card title="6 cara kami menjaga makanan tetap aman"
            subtitle="Setiap dapur SPPG harus lulus enam pemeriksaan ini — diawasi BPOM, Kemenkes & BPJPH">
        <div className="grid-3" style={{ gap: 14 }}>
          <CertCard seal="🛡️" name="HACCP — 7 Pemeriksaan Wajib" desc="Setiap potensi bahaya (bakteri, racun, benda asing) dicek di titik kritis. Standar sama dengan WHO."
                    pct={D.kpis.haccpReady}/>
          <CertCard seal="🏥" name="SLHS — Surat Laik dari Kemenkes" desc="Dapur diperiksa Kemenkes setiap 3 bulan: kebersihan, ventilasi, alur kerja, kesehatan pekerja."
                    pct={D.kpis.slhsCoverage}/>
          <CertCard seal="☪️" name="Sertifikat Halal BPJPH" desc="Bahan baku sampai pengantaran semua halal — diaudit BPJPH dan diperbarui setiap 6 bulan."
                    pct={D.kpis.halalCoverage}/>
        </div>
        <div className="grid-3" style={{ gap: 14, marginTop: 14 }}>
          <CertCard seal="📱" name="QR Code di Setiap Kotak Makan" desc="Pindai QR di kemasan untuk lihat dari dapur mana, jam masak, dan suhu — seperti cek paket online."
                    pct={D.kpis.qrTraceability}/>
          <CertCard seal="🌡️" name="Sensor Suhu Otomatis" desc="Suhu kulkas, panci, dan mobil pengantar dilaporkan setiap menit. Jika lewat batas, sistem berhenti otomatis."
                    pct={D.kpis.iotCoverage}/>
          <CertCard seal="🔬" name="Inspeksi BPOM Berkala" desc="BPOM datang langsung ke dapur, ambil sampel makanan, dan uji di laboratorium. Hasilnya dipublikasi di sini."
                    pct={92}/>
        </div>
      </Card>

      <div className="public-map-grid">
        <Card title="Peta Compliance Nasional" subtitle="Status keamanan pangan setiap provinsi" padded={false}>
          <div style={{ padding: 14 }}>
            <IndonesiaMap provinces={D.provinces} mode="public"/>
          </div>
        </Card>
        <Card title="Audit & Inspeksi Terbaru" subtitle="Tindakan transparan oleh BPOM, Kemenkes, dan BGN">
          <div className="scroll-y-440" style={{ margin: '-18px -20px' }}>
            {D.inspections.map((it, i) => (
              <div className="insp-row" key={i} style={{ gridTemplateColumns: '1fr', padding: '14px 20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span className="who">{it.who}</span>
                  <span className="date">{it.date}</span>
                </div>
                <div style={{ fontSize: 13, color: 'var(--ink-900)', fontWeight: 600, marginBottom: 4 }}>{it.target}</div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4 }}>
                  <span className={`chip ${it.result === 'Lulus' ? 'safe' : 'warn'}`}>{it.result}</span>
                  <span style={{ fontSize: 11.5, color: 'var(--ink-500)' }}>{it.action}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="public-cta">
        <div style={{ width: 64, height: 64, borderRadius: 14, background: 'var(--bgn-navy-deep)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--bgn-gold-soft)', fontSize: 30, flexShrink: 0 }}>📱</div>
        <div style={{ flex: 1 }}>
          <h3>Anak Anda dapat kotak makan hari ini? Cek dulu sebelum dimakan.</h3>
          <p>Lihat kode di kemasan (contoh: <span style={{ fontFamily: 'var(--font-mono)', background: 'var(--bgn-gold-pale)', padding: '2px 6px', borderRadius: 4 }}>B-2026-JB-0241</span>) lalu ketik di sini. Anda akan tahu dari dapur mana, jam berapa dimasak, dan suhu saat dikirim.</p>
        </div>
        <button className="btn btn-gold" onClick={() => go && go('lacak')}>Cek sekarang →</button>
      </div>
    </div>
  );
}

function CertCard({ seal, name, desc, pct }) {
  return (
    <div className="cert-card">
      <div className="seal">{seal}</div>
      <div className="name">{name}</div>
      <div className="desc">{desc}</div>
      <div className="pct">{pct}<span className="of">% SPPG terpenuhi</span></div>
      <div className="bar-track" style={{ marginTop: 8 }}>
        <div className={`bar-fill ${pct >= 80 ? 'safe' : pct >= 60 ? 'gold' : 'warn'}`} style={{ width: `${pct}%` }}/>
      </div>
    </div>
  );
}

const BATCH_DB = {
  'B-2026-JB-0241': { menu: 'Nasi + Ayam Bumbu Kuning + Tumis Buncis + Pisang', dapur: 'SPPG Cipinang Besar — DKI Jakarta', tujuan: 'SDN Cipinang Besar Selatan 03 (612 porsi)', supplier: 'PT Boga Tani', haccp: 'A', tCook: '72.4°C', tHold: '61.2°C', dist: '22 mnt · 4.8 km', svd: '07.42 WIB', win: '3 jam 02 menit', ok: true },
  'B-2026-JT-0512': { menu: 'Nasi + Telur Balado + Sayur Sop + Jeruk', dapur: 'SPPG Tegalsari — Jawa Tengah', tujuan: 'SDN Tegalsari 02 (498 porsi)', supplier: 'KUD Sumber Makmur', haccp: 'A', tCook: '74.1°C', tHold: '62.0°C', dist: '18 mnt · 3.9 km', svd: '07.34 WIB', win: '2 jam 48 menit', ok: true },
  'B-2026-BA-0066': { menu: 'Nasi + Ikan Tongkol Sambal + Cap Cay + Pepaya', dapur: 'SPPG Denpasar Utara — Bali', tujuan: 'SDN 5 Denpasar (524 porsi)', supplier: 'CV Bali Segar', haccp: 'B', tCook: '71.8°C', tHold: '60.4°C', dist: '26 mnt · 5.2 km', svd: '07.51 WIB', win: '3 jam 24 menit', ok: true },
};

function PublicLacak({ D, goLapor }) {
  const [batch, setBatch] = useStateP('B-2026-JB-0241');
  const [shown, setShown] = useStateP(true);
  const data = BATCH_DB[batch.toUpperCase().trim()] || null;
  const submit = () => {
    if (!data) {
      window.toast(`Batch "${batch}" tidak ditemukan. Coba B-2026-JB-0241`, 'risk');
      setShown(false); return;
    }
    setShown(true);
    window.toast(`Batch ${batch} ditemukan · status aman`, 'safe');
  };

  return (
    <div className="row-gap">
      <div className="page-head">
        <div>
          <h1>Lacak Kotak Makan Anak Anda</h1>
          <div className="subtitle">Setiap kotak makan MBG memiliki kode batch unik. Masukkan kode dari kemasan atau pindai QR untuk melihat dari dapur mana makanan berasal, jam masak, dan suhu yang tercatat.</div>
        </div>
      </div>

      <div className="batch-lookup">
        <div style={{ fontSize: 13, color: 'var(--bgn-navy-deep)', fontWeight: 600 }}>Masukkan kode batch atau pindai QR</div>
        <div className="batch-input">
          <input value={batch} onChange={e => setBatch(e.target.value)} onKeyDown={e => e.key === 'Enter' && submit()} placeholder="B-2026-JB-0241"/>
          <button className="btn btn-primary" onClick={submit}>{Ico.search} Lacak</button>
          <button className="btn" onClick={() => window.toast('Mengaktifkan kamera untuk pindai QR…', 'info')}>{Ico.qr} Pindai</button>
        </div>
        <div style={{ fontSize: 11.5, color: 'var(--ink-500)', marginTop: 8 }}>
          Format: <span style={{ fontFamily: 'var(--font-mono)' }}>B-YYYY-XX-NNNN</span> · Coba juga: B-2026-JT-0512 · B-2026-BA-0066
        </div>
      </div>

      {shown && (
        <div className="batch-result">
          <div className="head">
            <div>
              <div style={{ fontSize: 11, color: 'var(--ink-500)', fontFamily: 'var(--font-mono)', letterSpacing: '0.05em' }}>BATCH ID</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 600, color: 'var(--bgn-navy-deep)' }}>{batch}</div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <span className="chip safe">{Ico.check} Aman dikonsumsi</span>
              <span className="chip info">HACCP A</span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 8 }}>
            <div><div style={{ fontSize: 10.5, color: 'var(--ink-500)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700 }}>Menu</div><div style={{ fontWeight: 700, color: 'var(--ink-900)', marginTop: 2 }}>Nasi + Ayam Bumbu Kuning + Tumis Buncis + Pisang</div></div>
            <div><div style={{ fontSize: 10.5, color: 'var(--ink-500)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700 }}>Dapur</div><div style={{ fontWeight: 700, color: 'var(--ink-900)', marginTop: 2 }}>SPPG Cipinang Besar — DKI Jakarta</div></div>
            <div><div style={{ fontSize: 10.5, color: 'var(--ink-500)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700 }}>Tujuan</div><div style={{ fontWeight: 700, color: 'var(--ink-900)', marginTop: 2 }}>SDN Cipinang Besar Selatan 03 (612 porsi)</div></div>
            <div><div style={{ fontSize: 10.5, color: 'var(--ink-500)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700 }}>Sertifikasi</div><div style={{ marginTop: 4, display: 'flex', gap: 4, flexWrap: 'wrap' }}><span className="chip safe">SLHS</span><span className="chip safe">Halal</span><span className="chip safe">HACCP</span></div></div>
          </div>

          <div className="batch-trace">
            <div className="step">
              <div className="ico">1</div>
              <div className="label">Bahan</div>
              <div className="meta">Supplier PT Boga Tani</div>
              <div className="ts">04.40 WIB</div>
            </div>
            <div className="step">
              <div className="ico">2</div>
              <div className="label">Masak</div>
              <div className="meta">Suhu inti 72.4°C ✓</div>
              <div className="ts">06.18 WIB</div>
            </div>
            <div className="step">
              <div className="ico">3</div>
              <div className="label">Hot Hold</div>
              <div className="meta">61.2°C selama 36 mnt</div>
              <div className="ts">06.55 WIB</div>
            </div>
            <div className="step">
              <div className="ico">4</div>
              <div className="label">Distribusi</div>
              <div className="meta">22 mnt · 4.8 km</div>
              <div className="ts">07.18 WIB</div>
            </div>
            <div className="step">
              <div className="ico">5</div>
              <div className="label">Disajikan</div>
              <div className="meta">SDN Cipinang Bs. 03</div>
              <div className="ts">07.42 WIB</div>
            </div>
          </div>

          <div className="divider"/>
          <div style={{ display: 'flex', gap: 14, fontSize: 11.5, color: 'var(--ink-700)' }}>
            <div>📋 <strong>Food sample disimpan</strong> 3 hari · Sample ID FS-091-A</div>
            <div>🌡 <strong>Window 4 jam</strong> tercapai (3 jam 02 menit)</div>
            <div>✓ <strong>Auditor terakhir</strong> 7 Mei 2026 (BPOM Lab)</div>
          </div>
        </div>
      )}

      <div className="grid-3">
        <Card title="Apa yang dicek di setiap titik?">
          <ol style={{ paddingLeft: 18, color: 'var(--ink-700)', fontSize: 12.5, lineHeight: 1.7, margin: 0 }}>
            <li><strong>Bahan</strong> — supplier approved, COA, suhu chiller</li>
            <li><strong>Masak</strong> — suhu inti ≥70°C untuk protein</li>
            <li><strong>Hot Hold</strong> — &gt;60°C, max 4 jam total</li>
            <li><strong>Distribusi</strong> — ≤30 menit / 6 km, suhu kotak</li>
            <li><strong>Disajikan</strong> — scan terima, attendance penerima</li>
          </ol>
        </Card>
        <Card title="Apa yang terjadi kalau gagal?">
          <div style={{ fontSize: 12.5, color: 'var(--ink-700)', lineHeight: 1.6 }}>
            Sistem <strong>menahan otomatis (auto-hold)</strong> batch tersebut <em>sebelum</em> didistribusikan.
            Jika sudah terlanjur dikirim, mekanisme <strong>recall cepat</strong> mengontak sekolah dan mengganti
            menu darurat. Setiap kasus dicatat dan dilaporkan ke BPOM dalam 24 jam.
          </div>
        </Card>
        <Card title="Bagaimana kalau anak saya merasa tidak enak badan?">
          <div style={{ fontSize: 12.5, color: 'var(--ink-700)', lineHeight: 1.6 }}>
            Segera lapor ke guru atau Puskesmas terdekat. Sertakan kode batch dari kemasan.
            Tim akan menahan batch terkait, ambil food sample yang tersimpan, dan investigasi.
          </div>
          <button className="btn btn-gold" style={{ width: '100%', marginTop: 10, justifyContent: 'center' }} onClick={() => goLapor && goLapor('lapor')}>Lapor sekarang →</button>
        </Card>
      </div>
    </div>
  );
}

function PublicMenu({ D }) {
  return (
    <div className="row-gap">
      <div className="page-head">
        <div>
          <h1>Menu Hari Ini</h1>
          <div className="subtitle">Disesuaikan per region · Memenuhi AKG anak sekolah · Disusun ahli gizi BGN</div>
        </div>
        <div className="actions">
          <button className="btn">{Ico.download} Menu Mingguan PDF</button>
        </div>
      </div>

      <div className="grid-3">
        {D.menuToday.concat([{ name: 'Nasi + Tempe Orek + Tumis Kangkung + Semangka', kcal: 552, protein: 21, lokasi: 'Nusa Tenggara' },
                             { name: 'Nasi + Ayam Suir Sambal + Wortel Rebus + Pir', kcal: 596, protein: 27, lokasi: 'Papua & Maluku' }]).map((m, i) => (
          <div className="menu-card" key={i}>
            <div className="img">[ foto menu MBG · {m.lokasi.toLowerCase()} ]</div>
            <div className="body">
              <div className="name">{m.name}</div>
              <div className="nutri">{m.lokasi} · {m.kcal} kkal · {m.protein}g protein</div>
              <div className="nutri-row">
                <span>{m.kcal} kkal</span>
                <span>Protein {m.protein}g</span>
                <span>Karbo 78g</span>
                <span>Sayur ✓</span>
                <span>Buah ✓</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Card title="Standar gizi setiap porsi MBG" subtitle="Pemenuhan AKG anak usia 7–12 tahun">
        <div className="grid-3" style={{ gap: 14 }}>
          <NutriBar lab="Energi" v={612} of={650} unit="kkal"/>
          <NutriBar lab="Protein" v={28} of={26} unit="g"/>
          <NutriBar lab="Karbohidrat" v={78} of={90} unit="g"/>
          <NutriBar lab="Lemak" v={18} of={22} unit="g"/>
          <NutriBar lab="Serat" v={6.2} of={8} unit="g"/>
          <NutriBar lab="Zat besi" v={4.1} of={5} unit="mg"/>
        </div>
      </Card>
    </div>
  );
}

function NutriBar({ lab, v, of, unit }) {
  const pct = Math.min(100, (v / of) * 100);
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
        <span style={{ color: 'var(--ink-700)', fontWeight: 600 }}>{lab}</span>
        <span style={{ color: 'var(--bgn-navy-deep)', fontWeight: 700 }}>{v} <span style={{ color: 'var(--ink-500)', fontWeight: 500 }}>/ {of} {unit}</span></span>
      </div>
      <div className="bar-track"><div className={`bar-fill ${pct >= 90 ? 'safe' : 'gold'}`} style={{ width: `${pct}%` }}/></div>
    </div>
  );
}

function PublicSertifikat({ D }) {
  return (
    <div className="row-gap">
      <div className="page-head">
        <div>
          <h1>Sertifikasi & Audit Independen</h1>
          <div className="subtitle">Setiap dapur SPPG (dapur gizi sekolah) harus memenuhi 3 sertifikasi inti — diperiksa BPOM, Kemenkes, dan BPJPH — dan diaudit secara berkala tanpa pemberitahuan</div>
        </div>
      </div>

      <div className="grid-3">
        <CertCard seal="HACCP" name="HACCP 7-Prinsip" desc="Standar internasional pengendalian bahaya pangan — direferensi Codex/FAO" pct={D.kpis.haccpReady}/>
        <CertCard seal="SLHS" name="Laik Higiene Sanitasi" desc="Sertifikat Kemenkes wajib untuk seluruh dapur SPPG" pct={D.kpis.slhsCoverage}/>
        <CertCard seal="ﺣﻼل" name="Sertifikasi Halal BPJPH" desc="Bahan, proses, hingga distribusi tersertifikasi halal" pct={D.kpis.halalCoverage}/>
      </div>

      <Card title="Daftar Audit & Tindak Lanjut Terbaru" subtitle="Diperbarui tiap hari · Sumber: BPOM (pengawas pangan nasional), Kemenkes, dan tim audit BGN" padded={false}>
        <div>
          <div className="insp-row" style={{ background: 'var(--ink-50)', fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ink-500)', fontWeight: 700 }}>
            <div>Tanggal</div><div>Dapur yang Diaudit</div><div>Hasil</div><div>Tindakan</div>
          </div>
          {D.inspections.map((it, i) => (
            <div className="insp-row" key={i}>
              <div className="date">{it.date}</div>
              <div>
                <div className="who">{it.target}</div>
                <div style={{ fontSize: 11, color: 'var(--ink-500)' }}>{it.who}</div>
              </div>
              <div><span className={`chip ${it.result === 'Lulus' ? 'safe' : 'warn'}`}>{it.result}</span></div>
              <div style={{ fontSize: 11.5, color: 'var(--ink-700)' }}>{it.action}</div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid-2">
        <Card title="Standar yang kami ikuti" subtitle="Acuan internasional dan nasional">
          <ul style={{ paddingLeft: 18, color: 'var(--ink-700)', fontSize: 12.5, lineHeight: 1.8, margin: 0 }}>
            <li><strong>WHO Five Keys to Safer Food</strong> — masak 70°C, hold &gt;60°C, dingin &lt;5°C</li>
            <li><strong>Codex/FAO CXC 1-1969</strong> — General Principles of Food Hygiene</li>
            <li><strong>BGN Juknis 401.1/2025</strong> — Tata Kelola Penyelenggaraan Program MBG</li>
            <li><strong>BPOM PMR/HACCP</strong> — Pedoman PMR & HACCP nasional</li>
            <li><strong>Kemenkes SLHS</strong> — Sertifikat Laik Higiene Sanitasi</li>
            <li><strong>BPJPH Halal</strong> — Sertifikasi Halal Indonesia</li>
          </ul>
        </Card>
        <Card title="Komitmen transparansi BGN" subtitle="Kami publikasikan, kami pertanggungjawabkan">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Commit n="01" t="Setiap kasus KLB dilaporkan publik dalam 24 jam" desc="Dengan kode batch, jumlah terdampak, dan tindakan korektif"/>
            <Commit n="02" t="Audit BPOM independen — tidak terjadwal" desc="Inspeksi dapur dan uji laboratorium tanpa pemberitahuan"/>
            <Commit n="03" t="Recall cepat ≤6 jam dari deteksi" desc="Sistem auto-hold + notifikasi sekolah real-time"/>
            <Commit n="04" t="Open API untuk peneliti & jurnalis" desc="Data agregat dapat diakses untuk riset publik"/>
          </div>
        </Card>
      </div>
    </div>
  );
}

function Commit({ n, t, desc }) {
  return (
    <div style={{ display: 'flex', gap: 12, padding: '10px 12px', background: 'var(--bgn-sky-pale)', borderRadius: 8 }}>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: 'var(--bgn-gold)', lineHeight: 1 }}>{n}</div>
      <div>
        <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--bgn-navy-deep)', marginBottom: 2 }}>{t}</div>
        <div style={{ fontSize: 11.5, color: 'var(--ink-500)' }}>{desc}</div>
      </div>
    </div>
  );
}

function PublicPeta({ D }) {
  const safe = D.provinces.filter(p => p.comply >= 88);
  const watch = D.provinces.filter(p => p.comply >= 80 && p.comply < 88);
  const prio = D.provinces.filter(p => p.comply < 80);

  return (
    <div className="row-gap">
      <div className="page-head">
        <div>
          <h1>Peta Compliance Nasional</h1>
          <div className="subtitle">Status keamanan pangan MBG di 38 provinsi · klik provinsi untuk detail</div>
        </div>
      </div>
      <Card padded={false} title="Sebaran Compliance" subtitle="Hijau = Aman · Emas = Watchlist · Merah = Prioritas">
        <div style={{ padding: 14 }}><IndonesiaMap provinces={D.provinces} mode="public"/></div>
      </Card>
      <div className="grid-3">
        <Card title={`Aman (${safe.length} provinsi)`} subtitle="Compliance ≥88%" tools={<span className="chip safe">{safe.length}</span>}>
          <div className="prov-list">
            {safe.slice(0, 10).map(p => (
              <div className="prov-row" key={p.code}>
                <span className="name">{p.name}</span>
                <div className="bar-track"><div className="bar-fill safe" style={{ width: `${p.comply}%` }}/></div>
                <span className="v" style={{ color: 'var(--status-safe)' }}>{p.comply}%</span>
              </div>
            ))}
          </div>
        </Card>
        <Card title={`Watchlist (${watch.length} provinsi)`} subtitle="Compliance 80–87%" tools={<span className="chip gold">{watch.length}</span>}>
          <div className="prov-list">
            {watch.slice(0, 10).map(p => (
              <div className="prov-row" key={p.code}>
                <span className="name">{p.name}</span>
                <div className="bar-track"><div className="bar-fill gold" style={{ width: `${p.comply}%` }}/></div>
                <span className="v" style={{ color: 'var(--bgn-gold)' }}>{p.comply}%</span>
              </div>
            ))}
          </div>
        </Card>
        <Card title={`Prioritas (${prio.length} provinsi)`} subtitle="Compliance <80% — fokus perbaikan" tools={<span className="chip risk">{prio.length}</span>}>
          <div className="prov-list">
            {prio.map(p => (
              <div className="prov-row" key={p.code}>
                <span className="name">{p.name}</span>
                <div className="bar-track"><div className="bar-fill risk" style={{ width: `${p.comply}%` }}/></div>
                <span className="v" style={{ color: 'var(--status-risk)' }}>{p.comply}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function PublicLapor() {
  const [form, setForm] = useStateP({ nama: '', wa: '', lokasi: '', waktu: '', batch: '', jumlah: '', gejala: '' });
  const [sent, setSent] = useStateP(null);
  const set = (k) => (e) => setForm(s => ({ ...s, [k]: e.target.value }));
  const submit = (e) => {
    e.preventDefault();
    if (!form.nama || !form.lokasi || !form.gejala) {
      window.toast('Lengkapi nama, lokasi, dan gejala terlebih dahulu', 'risk'); return;
    }
    const tid = 'TKT-' + Math.floor(Math.random() * 9000 + 1000) + '-' + new Date().getFullYear();
    setSent(tid);
    window.toast(`Laporan terkirim · ${tid} · BPOM dinotifikasi`, 'safe');
  };
  return (
    <div className="row-gap">
      <div className="page-head">
        <div>
          <h1>Lapor Keluhan atau Insiden</h1>
          <div className="subtitle">Pelaporan Anda akan menahan batch terkait & memicu investigasi resmi BPOM</div>
        </div>
      </div>
      {sent && (
        <div style={{ background: 'var(--status-safe-soft)', border: '1px solid var(--status-safe)', padding: 14, borderRadius: 8, color: 'var(--bgn-navy-deep)' }}>
          <strong>✓ Laporan terkirim · Tiket {sent}</strong>
          <div style={{ fontSize: 12.5, marginTop: 4, color: 'var(--ink-700)' }}>Tim BPOM akan menghubungi {form.wa || 'Anda'} dalam 2 jam. Batch {form.batch || '(tidak disebut)'} ditahan untuk investigasi.</div>
        </div>
      )}
      <div className="grid-1-2">
        <Card title="Hubungi langsung" subtitle="24 jam, 7 hari">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <ContactRow label="Hotline Kemenkes" v="119 ext. 9"/>
            <ContactRow label="BPOM Halo" v="1500-533"/>
            <ContactRow label="WhatsApp BGN" v="0811-1500-101"/>
            <ContactRow label="Email aduan" v="aduan@bgn.go.id"/>
          </div>
        </Card>
        <Card title="Form pelaporan online" subtitle="Mohon isi sedetail mungkin agar tim dapat menahan batch terkait">
          <form onSubmit={submit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <FormField lab="Nama Pelapor *" placeholder="Nama lengkap" v={form.nama} onChange={set('nama')}/>
            <FormField lab="No. WhatsApp" placeholder="081x-xxxx-xxxx" v={form.wa} onChange={set('wa')}/>
            <FormField lab="Sekolah / Lokasi *" placeholder="Nama sekolah / kelurahan" v={form.lokasi} onChange={set('lokasi')}/>
            <FormField lab="Tanggal & Jam Konsumsi" placeholder="9 Mei 2026, 12.00" v={form.waktu} onChange={set('waktu')}/>
            <FormField lab="Kode Batch (dari kemasan)" placeholder="B-2026-XX-NNNN" mono v={form.batch} onChange={set('batch')}/>
            <FormField lab="Jumlah Anak Terdampak" placeholder="1, 5, atau 'tidak tahu'" v={form.jumlah} onChange={set('jumlah')}/>
            <div style={{ gridColumn: '1 / -1' }}>
              <div style={{ fontSize: 11.5, color: 'var(--ink-500)', fontWeight: 600, marginBottom: 4 }}>Gejala / Keluhan *</div>
              <textarea rows="4" value={form.gejala} onChange={set('gejala')} placeholder="Misal: mual, muntah, diare, rasa aneh pada makanan…" style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--ink-200)', borderRadius: 6, fontFamily: 'inherit', fontSize: 13, resize: 'vertical' }}/>
            </div>
            <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 11, color: 'var(--ink-500)' }}>Identitas Anda dilindungi · Hanya tim investigasi BPOM yang akses</span>
              <button type="submit" className="btn btn-primary">Kirim laporan →</button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}

function ContactRow({ label, v }) {
  return (
    <div style={{ padding: '10px 14px', background: 'var(--bgn-sky-pale)', borderRadius: 8 }}>
      <div style={{ fontSize: 11, color: 'var(--ink-500)', fontWeight: 600 }}>{label}</div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--bgn-navy-deep)', fontWeight: 700, marginTop: 2 }}>{v}</div>
    </div>
  );
}

function FormField({ lab, placeholder, mono, v, onChange }) {
  return (
    <div>
      <div style={{ fontSize: 11.5, color: 'var(--ink-500)', fontWeight: 600, marginBottom: 4 }}>{lab}</div>
      <input value={v || ''} onChange={onChange} placeholder={placeholder} style={{ width: '100%', padding: '8px 12px', border: '1px solid var(--ink-200)', borderRadius: 6, fontFamily: mono ? 'var(--font-mono)' : 'inherit', fontSize: 13 }}/>
    </div>
  );
}

window.PublicDashboard = PublicDashboard;
