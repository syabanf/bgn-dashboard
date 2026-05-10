import React from 'react'
import { Card } from '../../../components/ui'
import { Ico } from '../../../components/ui/icons'

function NutriBar({ lab, v, of, unit }) {
  const pct = Math.min(100, (v / of) * 100)
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
        <span style={{ color: 'var(--ink-700)', fontWeight: 600 }}>{lab}</span>
        <span style={{ color: 'var(--bgn-navy-deep)', fontWeight: 700 }}>{v} <span style={{ color: 'var(--ink-500)', fontWeight: 500 }}>/ {of} {unit}</span></span>
      </div>
      <div className="bar-track"><div className={`bar-fill ${pct >= 90 ? 'safe' : 'gold'}`} style={{ width: `${pct}%` }}/></div>
    </div>
  )
}

export default function PublicMenu({ D }) {
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
        {D.menuToday.concat([
          { name: 'Nasi + Tempe Orek + Tumis Kangkung + Semangka', kcal: 552, protein: 21, lokasi: 'Nusa Tenggara' },
          { name: 'Nasi + Ayam Suir Sambal + Wortel Rebus + Pir', kcal: 596, protein: 27, lokasi: 'Papua & Maluku' }
        ]).map((m, i) => (
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
  )
}
