import React, { useState, useEffect } from 'react'
import { geoChildren } from '../../lib/geoHelpers'

const LEVEL_LABELS = { province: 'Provinsi', kota: 'Kota/Kabupaten', kecamatan: 'Kecamatan', kelurahan: 'Kelurahan' }
const NEXT_LEVEL   = { province: 'kota', kota: 'kecamatan', kecamatan: 'kelurahan', kelurahan: null }

function riskChip(risk) {
  const cls = risk === 'low' ? 'safe' : risk === 'med' ? 'warn' : 'risk'
  const lab = risk === 'low' ? 'Rendah' : risk === 'med' ? 'Sedang' : 'Tinggi'
  return <span className={`chip ${cls}`}>{lab}</span>
}

function formatPorsi(p) {
  if (!p) return '—'
  if (p >= 1e6) return `${(p / 1e6).toFixed(1)}jt`
  if (p >= 1e3) return `${(p / 1e3).toFixed(0)}K`
  return String(p)
}

export function DrillDrawer({ open, onClose, title, subtitle, allProvinces, initialSortKey = 'comply', startAt = null }) {
  const rootFrame = { level: 'province', points: allProvinces, parent: null }
  const [stack, setStack]     = useState([rootFrame])
  const [sortKey, setSortKey] = useState(initialSortKey)

  useEffect(() => {
    if (!open) return
    setSortKey(initialSortKey)
    if (startAt?.province) {
      const kotas = geoChildren(startAt.province, 'kota')
      setStack([rootFrame, { level: 'kota', points: kotas, parent: startAt.province }])
    } else {
      setStack([rootFrame])
    }
  }, [open]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!open) return null

  const current  = stack[stack.length - 1]
  const { level, points } = current
  const nextLevel = NEXT_LEVEL[level]

  const sorted = [...points].sort((a, b) => {
    if (sortKey === 'comply') return a.comply - b.comply
    if (sortKey === 'sppg')   return b.sppg - a.sppg
    if (sortKey === 'porsi')  return b.porsi - a.porsi
    const rv = { high: 0, med: 1, low: 2 }
    return (rv[a.risk] || 1) - (rv[b.risk] || 1)
  })

  const drillInto = (p) => {
    if (!nextLevel) return
    setStack(prev => [...prev, { level: nextLevel, points: geoChildren(p, nextLevel), parent: p }])
  }

  const goTo = (i) => setStack(prev => prev.slice(0, i + 1))

  return (
    <div className="drill-overlay" onClick={onClose}>
      <div className="drill-drawer" onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="drill-header">
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="drill-title">{title}</div>
            {subtitle && <div className="drill-sub">{subtitle}</div>}
          </div>
          <button className="drill-close" onClick={onClose} aria-label="Tutup">×</button>
        </div>

        {/* Breadcrumb */}
        <div className="drill-crumb">
          {stack.map((frame, i) => (
            <React.Fragment key={i}>
              {i > 0 && <span className="drill-crumb-sep">›</span>}
              <span
                className={i === stack.length - 1 ? 'drill-crumb-active' : 'drill-crumb-link'}
                onClick={() => i < stack.length - 1 && goTo(i)}
              >
                {i === 0 ? 'Nasional' : frame.parent?.name}
              </span>
            </React.Fragment>
          ))}
        </div>

        {/* Toolbar */}
        <div className="drill-toolbar">
          <span className="drill-level-label">{LEVEL_LABELS[level]} · {sorted.length} wilayah</span>
          <div style={{ display: 'flex', gap: 4 }}>
            {[['comply','Compliance ↑'],['sppg','SPPG'],['porsi','Porsi'],['risk','Risk']].map(([k, l]) => (
              <button key={k} className={`btn${sortKey === k ? ' btn-primary' : ''}`}
                style={{ fontSize: 10.5, padding: '3px 8px' }} onClick={() => setSortKey(k)}>{l}</button>
            ))}
          </div>
        </div>

        {/* Back button */}
        {stack.length > 1 && (
          <div className="drill-back">
            <button className="btn" style={{ fontSize: 11.5 }}
              onClick={() => setStack(prev => prev.slice(0, -1))}>
              ← {stack[stack.length - 2].parent?.name ?? 'Nasional'}
            </button>
          </div>
        )}

        {/* Table */}
        <div className="drill-table-wrap">
          <table className="bgn">
            <thead>
              <tr>
                <th>{LEVEL_LABELS[level]}</th>
                <th style={{ textAlign: 'right' }}>SPPG</th>
                <th style={{ textAlign: 'right' }}>Porsi/hari</th>
                <th>Compliance</th>
                <th>Risk</th>
                {nextLevel && <th style={{ width: 16 }}/>}
              </tr>
            </thead>
            <tbody>
              {sorted.map((p, i) => (
                <tr key={p.code || i}
                  className={nextLevel ? 'drill-row' : ''}
                  onClick={() => nextLevel && drillInto(p)}>
                  <td><span className="strong">{p.name}</span></td>
                  <td style={{ textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: 12 }}>
                    {(p.sppg || 0).toLocaleString('id-ID')}
                  </td>
                  <td style={{ textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: 11.5 }}>
                    {formatPorsi(p.porsi)}
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div className="bar-track" style={{ width: 48 }}>
                        <div className={`bar-fill ${p.comply >= 88 ? 'safe' : p.comply >= 78 ? 'gold' : 'risk'}`}
                          style={{ width: `${p.comply}%` }}/>
                      </div>
                      <span style={{ fontSize: 11, fontWeight: 700, minWidth: 32 }}>{p.comply}%</span>
                    </div>
                  </td>
                  <td>{riskChip(p.risk)}</td>
                  {nextLevel && <td style={{ color: 'var(--ink-300)', fontSize: 13, paddingRight: 14 }}>›</td>}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}
