import React from 'react'
import { Card } from '../../../components/ui'
import { IndonesiaMap } from '../../../components/map/IndonesiaMap'
import { geoChildren } from '../../../lib/geoHelpers'
import { riskColor, riskLabel } from '../../../lib/utils'
import { LEVEL_LABELS } from '../constants'

export default function GeoTab({ D, selProv, setSelProv }) {
  const [drillLevel, setDrillLevel] = React.useState('province')
  const [drillPath, setDrillPath] = React.useState([])
  const [drillPoints, setDrillPoints] = React.useState(null)
  const [selPoint, setSelPoint] = React.useState(null)

  const currentPoints = drillPoints || D.provinces

  const drillInto = (p) => {
    if (drillLevel === 'kelurahan') return
    const nextLevel = drillLevel === 'province' ? 'kota'
                    : drillLevel === 'kota'     ? 'kecamatan'
                    : 'kelurahan'
    const children = geoChildren(p, nextLevel)
    setDrillPath(prev => [...prev, { code: p.code, name: p.name, level: drillLevel }])
    setDrillLevel(nextLevel)
    setDrillPoints(children)
    setSelPoint(null)
  }

  const drillUp = (idx) => {
    if (idx < 0) {
      setDrillLevel('province')
      setDrillPath([])
      setDrillPoints(null)
      setSelPoint(null)
      return
    }
    const targetLevel = drillPath[idx].level
    const targetParent = drillPath[idx]
    const newPath = drillPath.slice(0, idx)
    const nextLevel = targetLevel === 'province' ? 'kota'
                    : targetLevel === 'kota'     ? 'kecamatan'
                    : 'kelurahan'
    const children = geoChildren(targetParent, nextLevel)
    setDrillPath(newPath)
    setDrillLevel(nextLevel)
    setDrillPoints(children)
    setSelPoint(null)
  }

  const detail = selPoint
  const top12 = [...currentPoints].sort((a, b) => (b.sppg || 0) - (a.sppg || 0)).slice(0, 12)
  const risky8 = [...currentPoints].sort((a, b) => (a.comply || 0) - (b.comply || 0)).slice(0, 8)

  const levelLabel = LEVEL_LABELS[drillLevel]
  const nextLabel  = drillLevel === 'province' ? 'Kota/Kab' : drillLevel === 'kota' ? 'Kecamatan' : drillLevel === 'kecamatan' ? 'Kelurahan' : null

  return (
    <div className="row-gap">
      <Card title="Peta Sebaran Operasional MBG"
            subtitle={`Klik titik untuk ${nextLabel ? `drill-down ke ${nextLabel}` : 'detail'} · ${currentPoints.length} ${levelLabel} · Level: ${levelLabel}`}
            padded={false}>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 16px 0', flexWrap: 'wrap' }}>
          <button className="btn" style={{ fontSize: 11, padding: '3px 8px' }} onClick={() => drillUp(-1)}>
            Nasional
          </button>
          {drillPath.map((p, i) => (
            <React.Fragment key={p.code}>
              <span style={{ color: 'var(--ink-400)', fontSize: 12 }}>›</span>
              <button className="btn" style={{ fontSize: 11, padding: '3px 8px' }} onClick={() => drillUp(i)}>
                {p.name}
              </button>
            </React.Fragment>
          ))}
          {drillPath.length > 0 && (
            <React.Fragment>
              <span style={{ color: 'var(--ink-400)', fontSize: 12 }}>›</span>
              <span style={{ fontSize: 11, color: 'var(--ink-600)', padding: '3px 8px', background: 'var(--bgn-navy-100)', borderRadius: 4 }}>
                {LEVEL_LABELS[drillLevel]}
              </span>
            </React.Fragment>
          )}
        </div>
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
      </Card>

      <div className="grid-3">
        <Card title={`Top 12 ${levelLabel} by SPPG`} subtitle="Volume kapasitas operasional">
          <div className="prov-list">
            {top12.map((p) => (
              <div className="prov-row" key={p.code} style={{ cursor: nextLabel ? 'pointer' : 'default' }}
                   onClick={() => setSelPoint(p)}>
                <span className="name">{p.name}</span>
                <div className="bar-track">
                  <div className="bar-fill" style={{ width: `${Math.max(4, ((p.sppg || 0) / Math.max(1, top12[0]?.sppg || 1)) * 100)}%`, background: riskColor(p.risk) }}/>
                </div>
                <span className="v">{(p.sppg || 0).toLocaleString('id-ID')}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card title={`8 ${levelLabel} Watch`} subtitle="Compliance HACCP terendah">
          <div className="prov-list">
            {risky8.map((p) => (
              <div className="prov-row" key={p.code} style={{ cursor: 'pointer' }}
                   onClick={() => setSelPoint(p)}>
                <span className="name">{p.name}</span>
                <div className="bar-track">
                  <div className={`bar-fill ${(p.comply||0) < 75 ? 'risk' : 'warn'}`} style={{ width: `${p.comply||0}%` }}/>
                </div>
                <span className="v" style={{ color: (p.comply||0) < 75 ? 'var(--status-risk)' : 'var(--status-warn)' }}>{p.comply||0}%</span>
              </div>
            ))}
          </div>
        </Card>

        <Card title={detail ? `Detail · ${detail.name}` : `Detail ${levelLabel}`}
              subtitle={detail ? `${LEVEL_LABELS[detail.level || drillLevel]} snapshot` : `Klik titik pada peta atau daftar`}>
          {detail ? (
            <div>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 14 }}>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--ink-500)' }}>SPPG</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 600, color: 'var(--bgn-navy-deep)' }}>{(detail.sppg||0).toLocaleString('id-ID')}</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--ink-500)' }}>Porsi/hari</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 600, color: 'var(--bgn-navy-deep)' }}>
                    {(detail.porsi||0) >= 1000 ? `${((detail.porsi||0)/1000).toFixed(0)}K` : (detail.porsi||0)}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--ink-500)' }}>Compliance</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 600, color: riskColor(detail.risk||'low') }}>{detail.comply||0}%</div>
                </div>
              </div>
              <div className="divider"/>
              <div style={{ fontSize: 12, color: 'var(--ink-700)', lineHeight: 1.7 }}>
                Level: <strong>{LEVEL_LABELS[detail.level || drillLevel]}</strong><br/>
                Risk: <span className={`chip ${detail.risk === 'high' ? 'risk' : detail.risk === 'med' ? 'warn' : 'safe'}`}>{riskLabel(detail.risk||'low')}</span><br/>
                Insiden 30d: {Math.round(((100-(detail.comply||80))/6))}<br/>
                IoT coverage: {Math.round((detail.comply||80)*0.7)}%
              </div>
              {nextLabel && (
                <button className="btn btn-primary" style={{ width: '100%', marginTop: 12, justifyContent: 'center' }}
                        onClick={() => drillInto(detail)}>
                  Drill-down ke {nextLabel} →
                </button>
              )}
              {!nextLabel && (
                <div style={{ marginTop: 12, fontSize: 11, color: 'var(--ink-500)', textAlign: 'center' }}>
                  Level terdalam — tidak ada sub-wilayah
                </div>
              )}
            </div>
          ) : (
            <div style={{ color: 'var(--ink-500)', fontSize: 12.5, padding: '20px 0', textAlign: 'center' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>🗺</div>
              Klik titik pada peta atau baris di tabel untuk melihat detail.
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
