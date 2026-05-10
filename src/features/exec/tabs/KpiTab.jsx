import React from 'react'
import { Card } from '../../../components/ui'

const METRIC_SORT = {
  'Coverage penerima manfaat':   'porsi',
  'SPPG operasional':            'sppg',
  'Compliance HACCP nasional':   'comply',
  'Insiden per 1 jt porsi':      'risk',
  'Public Trust Index':          'comply',
  'QR Traceability coverage':    'comply',
  'IoT coverage':                'comply',
  'Maturity score (HACCP)':      'comply',
}

export default function KpiTab({ D, navigateDrill }) {
  const k = [
    { n: 'Coverage penerima manfaat', v: 24.3, t: 100, u: '%' },
    { n: 'SPPG operasional', v: 78.9, t: 100, u: '% target' },
    { n: 'Compliance HACCP nasional', v: D.kpis.complianceRate, t: 95, u: '%' },
    { n: 'Insiden per 1 jt porsi', v: 0.19, t: 0.05, u: 'rate' },
    { n: 'Public Trust Index', v: D.kpis.publicTrust, t: 90, u: '/100' },
    { n: 'QR Traceability coverage', v: D.kpis.qrTraceability, t: 95, u: '%' },
    { n: 'IoT coverage', v: D.kpis.iotCoverage, t: 80, u: '%' },
    { n: 'Maturity score (HACCP)', v: 61, t: 85, u: '/100' },
  ]

  return (
    <Card title="Strategic KPI · BOD Scorecard" subtitle="Aktual vs target tahunan · klik tile untuk breakdown per provinsi">
      <div className="grid-2" style={{ gap: 12 }}>
        {k.map(x => {
          const pct = (x.v / x.t) * 100
          const sortKey = METRIC_SORT[x.n] || 'comply'
          return (
            <div key={x.n}
              className="drill-card-item"
              style={{ background: '#fff', border: '1px solid var(--ink-100)', borderRadius: 8 }}
              onClick={() => navigateDrill?.({
                title: x.n,
                subtitle: `Breakdown per provinsi · Aktual ${x.v}${x.u} / target ${x.t}`,
                sortKey,
              })}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontWeight: 600, fontSize: 12.5 }}>{x.n}</span>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--bgn-navy-deep)' }}>
                  {x.v}<span style={{ fontSize: 11, color: 'var(--ink-500)' }}>{x.u} / target {x.t}</span>
                </span>
              </div>
              <div className="bar-track">
                <div className={`bar-fill ${pct >= 90 ? 'safe' : pct >= 60 ? 'gold' : 'risk'}`} style={{ width: `${Math.min(100, pct)}%` }}/>
              </div>
              <div style={{ marginTop: 6, fontSize: 10, color: 'var(--ink-400)', textAlign: 'right' }}>Klik untuk breakdown provinsi →</div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
