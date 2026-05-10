import React from 'react'
import { Card } from '../../../components/ui'
import { Ico } from '../../../components/ui/icons'

function SensorRow({ lab, v, tol, ok }) {
  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'center', padding: 10, background: ok ? 'var(--status-safe-soft)' : 'var(--status-risk-soft)', borderRadius: 8 }}>
      <div style={{ width: 8, height: 8, borderRadius: 999, background: ok ? 'var(--status-safe)' : 'var(--status-risk)' }}/>
      <div style={{ flex: 1, fontSize: 12.5, fontWeight: 600, color: 'var(--ink-900)' }}>{lab}</div>
      <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: ok ? '#176B3F' : '#8B1F15' }}>{v}</div>
      <div style={{ fontSize: 11, color: 'var(--ink-500)' }}>tol {tol}</div>
    </div>
  )
}

function SppgTableOps({ rows: rowsIn }) {
  const [q, setQ] = React.useState('')
  const [sort, setSort] = React.useState('score')
  const rows = React.useMemo(() => {
    let r = rowsIn.filter(x => !q || (x.id + x.name + x.prov).toLowerCase().includes(q.toLowerCase()))
    r = [...r].sort((a, b) => sort === 'porsi' ? b.porsi - a.porsi : sort === 'inc' ? b.inc - a.inc : a.score - b.score)
    return r
  }, [rowsIn, q, sort])

  const riskLabel = (r) => r === 'high' ? 'Tinggi' : r === 'med' ? 'Sedang' : 'Rendah'

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
      <div className="table-wrap">
        <table className="bgn">
          <thead>
            <tr>
              <th>Kode Dapur</th>
              <th>Nama Dapur / Provinsi</th>
              <th style={{ textAlign: 'right' }}>Porsi/hari</th>
              <th>Kepatuhan HACCP</th>
              <th>Sertifikasi Laik</th>
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
  )
}

export default function OpsTab({ D }) {
  return (
    <div className="row-gap">
      <Card title="SPPG Operasional — All Watchlist" subtitle="Filter, sort, drill-down" padded={false}>
        <SppgTableOps rows={D.sppgList}/>
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
  )
}
