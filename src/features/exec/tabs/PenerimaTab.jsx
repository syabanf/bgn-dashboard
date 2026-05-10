import React, { useState } from 'react'
import { Card, KPI } from '../../../components/ui'
import { DrillDrawer } from '../../../components/ui/DrillDrawer'

export default function PenerimaTab({ D }) {
  const [provTab, setProvTab] = useState('coverage')
  const [drawer, setDrawer]   = useState(null)
  const [drawerKey, setDrawerKey] = useState(0)

  const openDrawer = (title, subtitle, sortKey, startAt = null) => {
    setDrawer({ title, subtitle, sortKey, startAt })
    setDrawerKey(k => k + 1)
  }

  const jenjang = [
    { n: 'SD / MI', v: 9840, target: 24000, gender: [51, 49], icon: '🏫' },
    { n: 'SMP / MTs', v: 5120, target: 14000, gender: [49, 51], icon: '🏫' },
    { n: 'SMA / SMK / MA', v: 2980, target: 8500, gender: [48, 52], icon: '🏫' },
    { n: 'PAUD / TK', v: 1820, target: 6000, gender: [50, 50], icon: '🎒' },
    { n: 'Ibu Hamil & Menyusui', v: 358, target: 2000, gender: [100, 0], icon: '🤰' },
  ]
  const totalPenerima = jenjang.reduce((a, j) => a + j.v, 0)

  const monthlyGrowth = [
    { bln: 'Jan', v: 8.2 }, { bln: 'Feb', v: 10.4 }, { bln: 'Mar', v: 13.1 },
    { bln: 'Apr', v: 16.7 }, { bln: 'Mei', v: 20.1 },
  ]
  const maxG = 25

  const nutriImpact = [
    { label: 'Anak yang sebelumnya sarapan tidak teratur', pct: 62, after: 91, color: 'safe' },
    { label: 'Perbaikan tingkat konsentrasi belajar (laporan guru)', pct: 71, after: null, color: 'gold' },
    { label: 'Penurunan absensi akibat sakit ringan', pct: 18, after: null, color: 'leaf' },
    { label: 'Stunting prevalensi daerah pilot (target turun)', pct: 24.4, after: 21.8, color: 'warn' },
  ]

  const topProvs = [...D.provinces]
    .sort((a, b) => b.porsi - a.porsi)
    .slice(0, 12)
    .map(p => ({
      ...p,
      penerima: Math.round(p.porsi / 250),
      school: Math.round(p.sppg * 1.8),
      coverage: Math.round((p.porsi / (p.porsi * 4.2)) * 100),
    }))

  return (
    <div className="row-gap">
      <div className="kpi-grid">
        <KPI label="Total Penerima Manfaat Aktif" accent="navy"
          value={(totalPenerima / 1000).toFixed(1)} unit="jt anak"
          meta="Snapshot 9 Mei 2026 · naik 21% dari bulan lalu"
          spark={[8.2, 10.4, 13.1, 16.7, 20.1]}
          onClick={() => openDrawer('Total Penerima Manfaat Aktif', 'Breakdown per provinsi · urutkan dari porsi terbesar', 'porsi')}/>
        <KPI label="Satuan Pendidikan Terjangkau" accent="gold"
          value="20.118" unit=" sekolah"
          meta="SD / SMP / SMA / PAUD di 31 provinsi"
          onClick={() => openDrawer('Satuan Pendidikan Terjangkau', 'Breakdown per provinsi · urutkan dari SPPG terbesar', 'sppg')}/>
        <KPI label="Coverage terhadap Target Nasional" accent="leaf"
          value="24,3" unit="%"
          meta="Target: 82,9 juta anak — gap 62,8 juta"
          onClick={() => openDrawer('Coverage terhadap Target Nasional', 'Compliance per provinsi · terburuk dulu', 'comply')}/>
        <KPI label="Rata-rata Porsi per Anak / Hari" accent="warn"
          value="3.571" unit=" porsi"
          meta="Ekuivalen kalori: 574–638 kkal · protein 24–32 g"
          onClick={() => openDrawer('Rata-rata Porsi per Anak / Hari', 'Breakdown per provinsi · urutkan dari porsi terbesar', 'porsi')}/>
      </div>
      <div className="grid-2" style={{ gap: 14 }}>
        <Card title="Distribusi Penerima per Jenjang Pendidikan" subtitle="Dalam ribuan anak · vs target tahunan">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {jenjang.map(j => {
              const pct = (j.v / j.target) * 100
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
              )
            })}
          </div>
        </Card>

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

      <Card title="Sebaran Penerima Manfaat per Provinsi" subtitle="12 provinsi dengan volume porsi tertinggi · klik baris untuk drill-down"
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
                <tr key={p.code} className="drill-row"
                  onClick={() => openDrawer(p.name, 'Breakdown kota/kab — klik untuk terus drill-down', 'sppg', { province: p })}>
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

      <div style={{ padding: '12px 16px', background: 'var(--bgn-sky-pale)', borderRadius: 8, fontSize: 12, color: 'var(--ink-500)', lineHeight: 1.7, border: '1px solid var(--border)' }}>
        <strong style={{ color: 'var(--ink-700)' }}>Catatan metodologi:</strong> Estimasi penerima manfaat dihitung dari volume porsi harian ÷ 250 ml ekuivalen per anak (proxy distribusi). Data satuan pendidikan berdasarkan registry BGN Pusat. Dampak gizi dari survei cepat BGN–Kemenkes pilot Maret 2026, belum representatif nasional. Coverage target mengacu Perpres No. 83/2025.
      </div>

      <DrillDrawer
        key={drawerKey}
        open={!!drawer}
        onClose={() => setDrawer(null)}
        title={drawer?.title}
        subtitle={drawer?.subtitle}
        allProvinces={D.provinces}
        initialSortKey={drawer?.sortKey || 'porsi'}
        startAt={drawer?.startAt}
      />
    </div>
  )
}
