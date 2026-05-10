import React, { useState, useEffect } from 'react'
import { geoChildren } from '../../../lib/geoHelpers'
import { Ico } from '../../../components/ui/icons'

const LEVEL_LABELS = { province: 'Provinsi', kota: 'Kota/Kabupaten', kecamatan: 'Kecamatan', kelurahan: 'Kelurahan' }
const NEXT_LEVEL   = { province: 'kota', kota: 'kecamatan', kecamatan: 'kelurahan', kelurahan: null }

function formatPorsi(p) {
  if (!p) return '—'
  if (p >= 1e6) return `${(p / 1e6).toFixed(1)} jt`
  if (p >= 1e3) return `${(p / 1e3).toFixed(0)}K`
  return String(p)
}

function riskChip(risk) {
  const cls = risk === 'low' ? 'safe' : risk === 'med' ? 'warn' : 'risk'
  const lab = risk === 'low' ? 'Rendah' : risk === 'med' ? 'Sedang' : 'Tinggi'
  return <span className={`chip ${cls}`}><span className="dot"/>{lab}</span>
}

export default function DrillPage({ config, onBack, backLabel, allProvinces }) {
  const rootFrame = { level: 'province', points: allProvinces, parent: null }
  const [stack, setStack]     = useState([rootFrame])
  const [sortKey, setSortKey] = useState(config?.sortKey || 'comply')

  useEffect(() => {
    setSortKey(config?.sortKey || 'comply')
    if (config?.startAt?.province) {
      const kotas = geoChildren(config.startAt.province, 'kota')
      setStack([rootFrame, { level: 'kota', points: kotas, parent: config.startAt.province }])
    } else {
      setStack([rootFrame])
    }
  }, [config]) // eslint-disable-line react-hooks/exhaustive-deps

  const current   = stack[stack.length - 1]
  const { level, points } = current
  const nextLevel = NEXT_LEVEL[level]

  const sorted = [...points].sort((a, b) => {
    if (sortKey === 'comply') return a.comply - b.comply
    if (sortKey === 'sppg')   return b.sppg - a.sppg
    if (sortKey === 'porsi')  return b.porsi - a.porsi
    const rv = { high: 0, med: 1, low: 2 }
    return (rv[a.risk] || 1) - (rv[b.risk] || 1)
  })

  const scrollTop = () => {
    document.querySelector('.main')?.scrollTo({ top: 0, behavior: 'instant' })
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  const drillInto = (p) => {
    if (!nextLevel) return
    setStack(prev => [...prev, { level: nextLevel, points: geoChildren(p, nextLevel), parent: p }])
    scrollTop()
  }

  const goTo = (i) => {
    setStack(prev => prev.slice(0, i + 1))
    scrollTop()
  }

  return (
    <div className="drill-page">
      {/* Back bar */}
      <div className="drill-page-back">
        <button className="btn" onClick={onBack}>
          {Ico.arrowUp && <span style={{ display:'inline-flex', transform:'rotate(-90deg)', marginRight:4 }}>{Ico.arrowLeft ?? '←'}</span>}
          ← Kembali ke {backLabel}
        </button>
        <div className="drill-page-back-title">{config?.title}</div>
      </div>

      {/* Page header */}
      <div className="drill-page-header">
        <div>
          <h2 className="drill-page-title">{config?.title}</h2>
          {config?.subtitle && <div className="drill-page-sub">{config.subtitle}</div>}
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: 11.5, color: 'var(--ink-500)', fontWeight: 600 }}>Urutkan:</span>
          {[['comply','Compliance ↑'],['sppg','SPPG'],['porsi','Porsi/hari'],['risk','Risk']].map(([k, l]) => (
            <button key={k} className={`btn${sortKey === k ? ' btn-primary' : ''}`}
              style={{ fontSize: 11.5 }} onClick={() => setSortKey(k)}>{l}</button>
          ))}
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="drill-page-crumb">
        {stack.map((frame, i) => (
          <React.Fragment key={i}>
            {i > 0 && <span className="drill-page-crumb-sep">›</span>}
            <span
              className={i === stack.length - 1 ? 'drill-page-crumb-active' : 'drill-page-crumb-link'}
              onClick={() => i < stack.length - 1 && goTo(i)}
            >
              {i === 0 ? 'Nasional' : frame.parent?.name}
            </span>
          </React.Fragment>
        ))}
        <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--ink-400)' }}>
          {LEVEL_LABELS[level]} · {sorted.length} wilayah
        </span>
      </div>

      {/* Back within drill */}
      {stack.length > 1 && (
        <div style={{ padding: '8px 0 4px' }}>
          <button className="btn" onClick={() => goTo(stack.length - 2)}>
            ← {stack[stack.length - 2].parent?.name ?? 'Nasional'}
          </button>
        </div>
      )}

      {/* Table */}
      <div className="table-wrap" style={{ marginTop: 12 }}>
        <table className="bgn">
          <thead>
            <tr>
              <th style={{ width: 32 }}>#</th>
              <th>{LEVEL_LABELS[level]}</th>
              <th style={{ textAlign: 'right' }}>SPPG Aktif</th>
              <th style={{ textAlign: 'right' }}>Porsi/hari</th>
              <th style={{ minWidth: 180 }}>Compliance HACCP</th>
              <th>Risk Level</th>
              {nextLevel && <th style={{ width: 140 }}>Drill-down</th>}
            </tr>
          </thead>
          <tbody>
            {sorted.map((p, i) => (
              <tr key={p.code || i}
                className={nextLevel ? 'drill-row' : ''}
                onClick={() => nextLevel && drillInto(p)}>
                <td style={{ fontFamily: 'var(--font-mono)', color: 'var(--ink-400)', fontSize: 11 }}>{i + 1}</td>
                <td>
                  <span className="strong">{p.name}</span>
                  {p.parent && <div style={{ fontSize: 11, color: 'var(--ink-400)' }}>{LEVEL_LABELS[level]}</div>}
                </td>
                <td style={{ textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700 }}>
                  {(p.sppg || 0).toLocaleString('id-ID')}
                </td>
                <td style={{ textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: 13 }}>
                  {formatPorsi(p.porsi)}
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div className="bar-track" style={{ width: 80, flexShrink: 0 }}>
                      <div className={`bar-fill ${p.comply >= 88 ? 'safe' : p.comply >= 78 ? 'gold' : 'risk'}`}
                        style={{ width: `${p.comply}%` }}/>
                    </div>
                    <span style={{ fontWeight: 700, fontSize: 13, minWidth: 36 }}>{p.comply}%</span>
                  </div>
                </td>
                <td>{riskChip(p.risk)}</td>
                {nextLevel && (
                  <td>
                    <span className="btn btn-primary" style={{ fontSize: 11.5, padding: '4px 10px', cursor: 'pointer' }}>
                      {LEVEL_LABELS[nextLevel]} →
                    </span>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
