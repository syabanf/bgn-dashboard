import React from 'react'
import { Card } from '../../../components/ui'
import { HaccpHeatmap } from '../../../components/ui/HaccpHeatmap'

function MaturityRadial() {
  const items = [
    { n: 'Hazard Analysis', s: 58 },
    { n: 'CCP Determination', s: 64 },
    { n: 'Critical Limits', s: 52 },
    { n: 'Monitoring (digital)', s: 78 },
    { n: 'Corrective Action', s: 49 },
    { n: 'Verification', s: 68 },
    { n: 'Record Keeping', s: 55 },
  ]
  const cx = 130, cy = 130, R = 95
  const N = items.length
  const angle = i => (Math.PI * 2 * i) / N - Math.PI / 2
  const point = (i, r) => [cx + Math.cos(angle(i)) * r, cy + Math.sin(angle(i)) * r]
  const polyPts = items.map((it, i) => point(i, (it.s / 100) * R).join(',')).join(' ')
  return (
    <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
      <svg width="260" height="260" viewBox="0 0 260 260">
        {[0.25, 0.5, 0.75, 1].map(t => (
          <circle key={t} cx={cx} cy={cy} r={R * t} fill="none" stroke="#E4E8EF" strokeWidth="1"/>
        ))}
        {items.map((it, i) => {
          const [x, y] = point(i, R)
          return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="#E4E8EF" strokeWidth="1"/>
        })}
        <polygon points={polyPts} fill="rgba(201,162,74,0.28)" stroke="#C9A24A" strokeWidth="2"/>
        {items.map((it, i) => {
          const [x, y] = point(i, (it.s / 100) * R)
          return <circle key={i} cx={x} cy={y} r="3.5" fill="#0E2A5C"/>
        })}
        {items.map((it, i) => {
          const [x, y] = point(i, R + 14)
          return <text key={i} x={x} y={y} fontSize="9" fill="#5A6A82" textAnchor="middle" fontWeight="600">{it.n.split(' ')[0]}</text>
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
          Prioritas: <strong>Critical Limits</strong> &amp; <strong>Corrective Action</strong> — adopsi WHO 70°C / &gt;60°C / &lt;5°C dan auto-hold pre-distribution.
        </div>
      </div>
    </div>
  )
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
  )
}

export default function HaccpTab({ D }) {
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
  )
}
