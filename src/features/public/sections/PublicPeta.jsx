import React from 'react'
import { Card } from '../../../components/ui'
import { IndonesiaMap } from '../../../components/map/IndonesiaMap'

export default function PublicPeta({ D }) {
  const safe  = D.provinces.filter(p => p.comply >= 88)
  const watch = D.provinces.filter(p => p.comply >= 80 && p.comply < 88)
  const prio  = D.provinces.filter(p => p.comply < 80)

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
  )
}
