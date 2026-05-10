import React from 'react'
import { Card } from '../../../components/ui'
import { Ico } from '../../../components/ui/icons'
import { IndonesiaMap } from '../../../components/map/IndonesiaMap'

function CertCard({ icon, name, desc, pct }) {
  return (
    <div className="cert-card">
      <div className="seal">{icon}</div>
      <div className="name">{name}</div>
      <div className="desc">{desc}</div>
      <div className="pct">{pct}<span className="of">% SPPG terpenuhi</span></div>
      <div className="bar-track" style={{ marginTop: 8 }}>
        <div className={`bar-fill ${pct >= 80 ? 'safe' : pct >= 60 ? 'gold' : 'warn'}`} style={{ width: `${pct}%` }}/>
      </div>
    </div>
  )
}

export default function PublicBeranda({ D, go }) {
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

        <div className="hero-body">
          <div className="eyebrow">{Ico.calendar} Diperbarui 9 Mei 2026 · 19.04 WIB</div>
          <h1>Makanan anak Anda <em>aman</em>, <em>bergizi</em>, dan bisa dicek sendiri.</h1>
          <p className="lede">
            Setiap kotak makan dari Program MBG dimasak di dapur ber-sertifikat dan diantar dengan suhu terjaga.
            Halaman ini menunjukkan datanya — terbuka, real-time, untuk semua orang tua di Indonesia.
          </p>
        </div>

        <div className="trust-score-card">
          <div className="trust-donut">
            <svg width="88" height="88" viewBox="0 0 110 110">
              <circle cx="55" cy="55" r="46" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="8"/>
              <circle cx="55" cy="55" r="46" fill="none" stroke="#E8B547" strokeWidth="8"
                strokeDasharray={`${(D.kpis.publicTrust / 100) * 289} 289`}
                strokeLinecap="round" transform="rotate(-90 55 55)"/>
            </svg>
            <div className="trust-donut-num">{D.kpis.publicTrust}</div>
          </div>
          <div>
            <div className="trust-score-label">{Ico.thumbsUp} Skor Kepercayaan Orang Tua</div>
            <div className="trust-score-sub">Survey nasional · 12.400 responden</div>
          </div>
        </div>
      </div>

      {/* Live counters */}
      <div className="kpi-grid">
        <div className="live-counter">
          <div className="lc-icon" style={{ background: '#FEF3D7', color: '#A36F00' }}>{Ico.meal}</div>
          <div className="lab"><span className="live-dot"/>Porsi disajikan hari ini</div>
          <div className="num">{(D.kpis.porsiToday / 1e6).toFixed(1)}<span className="unit">juta porsi</span></div>
          <div className="delta">{Ico.arrowUp} 4,2% lebih banyak dari kemarin</div>
        </div>
        <div className="live-counter">
          <div className="lc-icon" style={{ background: '#E8F1FB', color: 'var(--bgn-navy-deep)' }}>{Ico.child}</div>
          <div className="lab">Anak yang menerima makanan</div>
          <div className="num">{(D.kpis.studentsServed / 1e6).toFixed(1)}<span className="unit">juta anak</span></div>
          <div className="delta">{Ico.check} di 20.118 sekolah</div>
        </div>
        <div className="live-counter">
          <div className="lc-icon" style={{ background: '#E8F4EC', color: '#176B3F' }}>{Ico.kitchen}</div>
          <div className="lab">Dapur SPPG yang aktif</div>
          <div className="num">{D.kpis.sppgActive.toLocaleString('id-ID')}<span className="unit">dapur</span></div>
          <div className="delta">{Ico.check} di 31 provinsi</div>
        </div>
        <div className="live-counter">
          <div className="lc-icon" style={{ background: '#FBE9E5', color: '#8B1F15' }}>{Ico.shield}</div>
          <div className="lab">Lulus standar keamanan pangan</div>
          <div className="num">{D.kpis.complianceRate}<span className="unit">%</span></div>
          <div className="delta">{Ico.arrowUp} naik 1,8 poin minggu ini</div>
        </div>
      </div>

      {/* Flow: How food reaches your child */}
      <Card title="Bagaimana makanan sampai ke anak Anda?" subtitle="Dari belanja bahan sampai di sekolah, semua dalam 4 jam — diawasi sensor & QR">
        <div className="flow-vis">
          {[
            { i: Ico.cart,   l: 'Belanja',   t: '04.00', d: 'Bahan segar dari supplier resmi' },
            { i: Ico.flame,  l: 'Masak',     t: '05.30', d: 'Suhu inti minimal 70°C' },
            { i: Ico.thermo, l: 'Hot Hold',  t: '06.30', d: 'Dijaga di atas 60°C' },
            { i: Ico.truck,  l: 'Antar',     t: '07.10', d: 'Maksimum 30 menit / 6 km' },
            { i: Ico.plate,  l: 'Disajikan', t: '07.40', d: 'Anak makan saat masih hangat' },
          ].map((s, i, arr) => (
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

      {/* Certification pillars */}
      <Card title="6 cara kami menjaga makanan tetap aman"
            subtitle="Setiap dapur SPPG harus lulus enam pemeriksaan ini — diawasi BPOM, Kemenkes & BPJPH">
        <div className="grid-3" style={{ gap: 14 }}>
          <CertCard icon={Ico.shield}   name="HACCP — 7 Pemeriksaan Wajib"
            desc="Setiap potensi bahaya (bakteri, racun, benda asing) dicek di titik kritis. Standar sama dengan WHO." pct={D.kpis.haccpReady}/>
          <CertCard icon={Ico.hospital} name="SLHS — Surat Laik dari Kemenkes"
            desc="Dapur diperiksa Kemenkes setiap 3 bulan: kebersihan, ventilasi, alur kerja, kesehatan pekerja." pct={D.kpis.slhsCoverage}/>
          <CertCard icon={Ico.halal}    name="Sertifikat Halal BPJPH"
            desc="Bahan baku sampai pengantaran semua halal — diaudit BPJPH dan diperbarui setiap 6 bulan." pct={D.kpis.halalCoverage}/>
        </div>
        <div className="grid-3" style={{ gap: 14, marginTop: 14 }}>
          <CertCard icon={Ico.qr}       name="QR Code di Setiap Kotak Makan"
            desc="Pindai QR di kemasan untuk lihat dari dapur mana, jam masak, dan suhu — seperti cek paket online." pct={D.kpis.qrTraceability}/>
          <CertCard icon={Ico.thermo}   name="Sensor Suhu Otomatis"
            desc="Suhu kulkas, panci, dan mobil pengantar dilaporkan setiap menit. Jika lewat batas, sistem berhenti otomatis." pct={D.kpis.iotCoverage}/>
          <CertCard icon={Ico.lab}      name="Inspeksi BPOM Berkala"
            desc="BPOM datang langsung ke dapur, ambil sampel makanan, dan uji di laboratorium. Hasilnya dipublikasi di sini." pct={92}/>
        </div>
      </Card>

      {/* Map + Inspections */}
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

      {/* CTA */}
      <div className="public-cta">
        <div className="cta-icon" style={{ width: 64, height: 64, borderRadius: 14, background: 'var(--bgn-navy-deep)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--bgn-gold-soft)', flexShrink: 0 }}>
          {Ico.mobile}
        </div>
        <div style={{ flex: 1 }}>
          <h3>Anak Anda dapat kotak makan hari ini? Cek dulu sebelum dimakan.</h3>
          <p>Lihat kode di kemasan (contoh: <span style={{ fontFamily: 'var(--font-mono)', background: 'var(--bgn-gold-pale)', padding: '2px 6px', borderRadius: 4 }}>B-2026-JB-0241</span>) lalu ketik di sini. Anda akan tahu dari dapur mana, jam berapa dimasak, dan suhu saat dikirim.</p>
        </div>
        <button className="btn btn-gold" onClick={() => go && go('lacak')}>Cek sekarang →</button>
      </div>
    </div>
  )
}
