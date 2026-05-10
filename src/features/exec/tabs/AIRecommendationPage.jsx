import React, { useState } from 'react'
import { Card } from '../../../components/ui'
import { toast } from '../../../components/ui/Toaster'
import { AI_RECS_INIT } from '../constants'

const PRIORITY_META = {
  urgent: { label: 'Urgent', color: 'var(--status-risk)', bg: 'var(--status-risk-soft)', badge: 'risk' },
  high:   { label: 'Tinggi', color: '#9E5400', bg: '#FFF3E0', badge: 'warn' },
  medium: { label: 'Sedang', color: '#176B3F', bg: 'var(--status-safe-soft)', badge: 'safe' },
}

export default function AIRecommendationPage({ D }) {
  const [recs, setRecs] = useState(AI_RECS_INIT)
  const [filterPri, setFilterPri] = useState('all')
  const [filterCat, setFilterCat] = useState('all')
  const [expanded, setExpanded] = useState(null)

  const cats = [...new Set(AI_RECS_INIT.map(r => r.category))]

  const filtered = recs.filter(r => {
    if (filterPri !== 'all' && r.priority !== filterPri) return false
    if (filterCat !== 'all' && r.category !== filterCat) return false
    return true
  })

  const applyRec = (id) => {
    setRecs(prev => prev.map(r => r.id === id ? { ...r, status: 'applied' } : r))
    toast('Rekomendasi diterapkan · Task dibuat & dikirim ke tim terkait', 'safe')
  }
  const dismissRec = (id) => {
    setRecs(prev => prev.map(r => r.id === id ? { ...r, status: 'dismissed' } : r))
    toast('Rekomendasi diabaikan · Dicatat untuk review bulanan', 'gold')
  }

  const counts = {
    pending: recs.filter(r => r.status === 'pending').length,
    applied: recs.filter(r => r.status === 'applied').length,
    dismissed: recs.filter(r => r.status === 'dismissed').length,
  }

  return (
    <div className="row-gap">
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

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {filtered.map(r => {
          const pm = PRIORITY_META[r.priority]
          const isExpanded = expanded === r.id
          const isDone = r.status !== 'pending'
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
          )
        })}
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: 40, color: 'var(--ink-400)', fontSize: 13 }}>
            <div style={{ fontSize: 40, marginBottom: 8 }}>🤖</div>
            Tidak ada rekomendasi yang sesuai filter saat ini.
          </div>
        )}
      </div>
    </div>
  )
}
