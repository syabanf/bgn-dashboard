import React from 'react'
import { Card } from '../../../components/ui'
import { BarsRow } from '../../../components/ui'
import { Ico } from '../../../components/ui/icons'
import { IndonesiaMap } from '../../../components/map/IndonesiaMap'
import { HaccpHeatmap } from '../../../components/ui/HaccpHeatmap'
import { DrillDrawer } from '../../../components/ui/DrillDrawer'
import { geoChildren } from '../../../lib/geoHelpers'
import { riskColor, riskLabel } from '../../../lib/utils'
import { LEVEL_LABELS } from '../constants'

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

function CertBars({ D, onItemClick }) {
  const items = [
    { n: 'SLHS — Sertifikat Laik Higiene Sanitasi (Kemenkes)', v: D.slhsCoverage, c: 'safe' },
    { n: 'Halal — Sertifikat BPJPH', v: D.halalCoverage, c: 'gold' },
    { n: 'HACCP — Kesiapan 7 Prinsip Keamanan Pangan', v: D.haccpReady, c: 'warn' },
    { n: 'IoT — Sensor Suhu Otomatis Terpasang', v: D.iotCoverage, c: 'risk' },
    { n: 'QR — Batch Makanan Bisa Dilacak', v: D.qrTraceability, c: 'warn' },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {items.map((it, i) => (
        <div key={i} className="drill-cert-item" onClick={() => onItemClick && onItemClick(it)}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
            <span style={{ color: 'var(--ink-700)', fontWeight: 600 }}>{it.n}</span>
            <span style={{ fontWeight: 700, color: 'var(--bgn-navy-deep)' }}>{it.v}%</span>
          </div>
          <div className="bar-track"><div className={`bar-fill ${it.c}`} style={{ width: `${it.v}%` }}/></div>
        </div>
      ))}
    </div>
  )
}

function Roadmap() {
  const phases = [
    { lab: '0–30', t: 'Standardize', items: ['HACCP plan template', 'CCP & batas WHO', 'Form log digital', 'Batch ID minimum'], done: 100 },
    { lab: '31–60', t: 'Digitize', items: ['QR traceability', 'Risk score dashboard', 'Suhu/waktu alert', 'Corrective tracker'], done: 65 },
    { lab: '61–90', t: 'Enforce', items: ['Audit HACCP gate', 'Uji mikrobiologi', 'Scorecard nasional', 'Pilot 100 SPPG'], done: 18 },
  ]
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
  )
}

function SppgTable({ rows: rowsIn, onRowClick }) {
  const [q, setQ] = React.useState('')
  const [sort, setSort] = React.useState('score')
  const rows = React.useMemo(() => {
    let r = rowsIn.filter(x => !q || (x.id + x.name + x.prov).toLowerCase().includes(q.toLowerCase()))
    r = [...r].sort((a, b) => sort === 'porsi' ? b.porsi - a.porsi : sort === 'inc' ? b.inc - a.inc : a.score - b.score)
    return r
  }, [rowsIn, q, sort])

  const riskLabel = (r) => r === 'high' ? 'Tinggi' : r === 'med' ? 'Sedang' : 'Rendah'
  const riskColor = (r) => r === 'high' ? '#C03A2B' : r === 'med' ? '#D89014' : '#2E8B57'

  return (
    <div>
      <div style={{ display: 'flex', gap: 8, padding: '10px 14px', borderBottom: '1px solid var(--ink-100)', background: 'var(--ink-50)', flexWrap: 'wrap' }}>
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Cari kode / nama / provinsi…" style={{ flex: 1, minWidth: 180, padding: '7px 12px', border: '1px solid var(--ink-200)', borderRadius: 6, fontSize: 12, fontFamily: 'inherit', background: '#fff' }}/>
        <select value={sort} onChange={e => setSort(e.target.value)} style={{ padding: '7px 10px', border: '1px solid var(--ink-200)', borderRadius: 6, fontSize: 12, background: '#fff' }}>
          <option value="score">Urut: Skor Keamanan (terburuk dulu)</option>
          <option value="porsi">Urut: Volume Porsi (terbesar dulu)</option>
          <option value="inc">Urut: Kasus 30 Hari (terbanyak dulu)</option>
        </select>
        <button className="btn">{Ico.download} CSV</button>
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
              <tr key={i} className={onRowClick ? 'drill-row' : ''} onClick={() => onRowClick && onRowClick(r)}>
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
  )
}

export default function OverviewTab({ D }) {
  const [drillLevel, setDrillLevel] = React.useState('province')
  const [drillPath,  setDrillPath]  = React.useState([])
  const [drillPoints, setDrillPoints] = React.useState(null)
  const [selPoint,   setSelPoint]   = React.useState(null)

  const [drawer, setDrawer]       = React.useState(null)
  const [drawerKey, setDrawerKey] = React.useState(0)

  const openDrawer = (title, subtitle, sortKey, startAt = null) => {
    setDrawer({ title, subtitle, sortKey, startAt })
    setDrawerKey(k => k + 1)
  }

  const findProvince = (provName) =>
    D.provinces.find(p => p.name === provName) ||
    D.provinces.find(p => p.code === provName.split('-')[1]) ||
    D.provinces.find(p => p.name.includes(provName.split(' ')[0]) && provName.length > 4 && p.name.split(' ').length > 1)

  const currentPoints = drillPoints || D.provinces
  const nextLabel = drillLevel === 'province' ? 'Kota/Kab' : drillLevel === 'kota' ? 'Kecamatan' : drillLevel === 'kecamatan' ? 'Kelurahan' : null

  const drillInto = (p) => {
    if (drillLevel === 'kelurahan') return
    const nextLevel = drillLevel === 'province' ? 'kota' : drillLevel === 'kota' ? 'kecamatan' : 'kelurahan'
    setDrillPath(prev => [...prev, { code: p.code, name: p.name, level: drillLevel }])
    setDrillLevel(nextLevel)
    setDrillPoints(geoChildren(p, nextLevel))
    setSelPoint(null)
  }

  const drillUp = (idx) => {
    if (idx < 0) { setDrillLevel('province'); setDrillPath([]); setDrillPoints(null); setSelPoint(null); return }
    const target = drillPath[idx]
    const nextLevel = target.level === 'province' ? 'kota' : target.level === 'kota' ? 'kecamatan' : 'kelurahan'
    setDrillPath(drillPath.slice(0, idx))
    setDrillLevel(nextLevel)
    setDrillPoints(geoChildren(target, nextLevel))
    setSelPoint(null)
  }

  return (
    <div className="row-gap">
      {/* Geo + alerts */}
      <div className="grid-2">
        <Card
          title={drillPath.length > 0 ? `Sebaran SPPG — ${LEVEL_LABELS[drillLevel]}` : 'Sebaran SPPG & Risk Level Nasional'}
          subtitle={`${currentPoints.length} ${LEVEL_LABELS[drillLevel]} · Klik titik untuk ${nextLabel ? `drill-down ke ${nextLabel}` : 'detail'}`}
          tools={<button className="iconbtn">{Ico.download}</button>}
          padded={false}>
          {/* Breadcrumb */}
          {drillPath.length > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px 0', flexWrap: 'wrap' }}>
              <button className="btn" style={{ fontSize: 11, padding: '3px 8px' }} onClick={() => drillUp(-1)}>Nasional</button>
              {drillPath.map((p, i) => (
                <React.Fragment key={p.code}>
                  <span style={{ color: 'var(--ink-400)', fontSize: 12 }}>›</span>
                  <button className="btn" style={{ fontSize: 11, padding: '3px 8px' }} onClick={() => drillUp(i)}>{p.name}</button>
                </React.Fragment>
              ))}
              <span style={{ color: 'var(--ink-400)', fontSize: 12 }}>›</span>
              <span style={{ fontSize: 11, color: 'var(--ink-600)', padding: '3px 8px', background: 'var(--bgn-navy-100)', borderRadius: 4 }}>{LEVEL_LABELS[drillLevel]}</span>
            </div>
          )}
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
          {/* Mini detail strip */}
          {selPoint && (
            <div style={{ padding: '10px 16px', borderTop: '1px solid var(--ink-100)', background: 'var(--ink-50)', display: 'flex', gap: 18, flexWrap: 'wrap', alignItems: 'center' }}>
              <strong style={{ flex: 1, minWidth: 120, fontSize: 13, color: 'var(--bgn-navy-deep)' }}>{selPoint.name}</strong>
              {[
                ['SPPG', (selPoint.sppg||0).toLocaleString('id-ID')],
                ['Porsi/hari', `${((selPoint.porsi||0)/1000).toFixed(0)}K`],
                ['Compliance', `${selPoint.comply||0}%`],
              ].map(([l, v]) => (
                <div key={l}>
                  <div style={{ fontSize: 10, color: 'var(--ink-500)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{l}</div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: l === 'Compliance' ? riskColor(selPoint.risk||'low') : 'var(--bgn-navy-deep)' }}>{v}</div>
                </div>
              ))}
              <span className={`chip ${selPoint.risk === 'high' ? 'risk' : selPoint.risk === 'med' ? 'warn' : 'safe'}`}>
                <span className="dot"/>{riskLabel(selPoint.risk||'low')}
              </span>
              {nextLabel && (
                <button className="btn btn-primary" style={{ fontSize: 12, padding: '5px 12px' }} onClick={() => drillInto(selPoint)}>
                  {nextLabel} →
                </button>
              )}
            </div>
          )}
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
        <SppgTable rows={D.sppgList} onRowClick={(r) => {
          const provCode = r.id.split('-')[1]
          const prov = D.provinces.find(p => p.code === provCode) || findProvince(r.prov)
          openDrawer(r.name, `${r.prov} · Drill-down ke kota/kab`, 'comply', prov ? { province: prov } : null)
        }}/>
      </Card>

      {/* Trend + cert coverage */}
      <div className="grid-3">
        <Card title="Tren Insiden 30 Hari" subtitle="Dugaan KLB + corrective hold">
          <BarsRow values={D.incidents30d} h={120}/>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, fontSize: 11, color: 'var(--ink-500)' }}>
            <span>10 Apr</span><span>25 Apr</span><span>9 Mei</span>
          </div>
        </Card>
        <Card title="Sertifikasi — % Dapur dengan Dokumen Valid" subtitle="SLHS = Laik Higiene · Halal = BPJPH · HACCP = 7 Prinsip · IoT = Sensor Suhu · QR = Traceabilitas · klik untuk breakdown">
          <CertBars D={D.kpis} onItemClick={(it) =>
            openDrawer(it.n, `${it.v}% nasional · breakdown per provinsi`, 'comply')
          }/>
        </Card>
        <Card title="Roadmap 90-hari" subtitle="Target eksekusi pilot 100 SPPG → nasional">
          <Roadmap/>
        </Card>
      </div>

      <DrillDrawer
        key={drawerKey}
        open={!!drawer}
        onClose={() => setDrawer(null)}
        title={drawer?.title}
        subtitle={drawer?.subtitle}
        allProvinces={D.provinces}
        initialSortKey={drawer?.sortKey || 'comply'}
        startAt={drawer?.startAt}
      />
    </div>
  )
}
