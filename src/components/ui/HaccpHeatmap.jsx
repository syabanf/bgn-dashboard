import React from 'react'

export function HaccpHeatmap({ D }) {
  const cls = (v) => v >= 85 ? 's5' : v >= 70 ? 's4' : v >= 55 ? 's3' : v >= 40 ? 's2' : 's1'
  return (
    <div className="haccp-grid">
      <div className="h-head" style={{ background: 'transparent' }}></div>
      {D.haccpHeads.map((h, i) => <div className="h-head" key={i}>{h}</div>)}
      {D.haccpMatrix.map((row, i) => (
        <React.Fragment key={i}>
          <div className="h-row-label">{row.cat}</div>
          {row.row.map((v, j) => (
            <div className={`h-cell ${cls(v)}`} key={j}>
              <div className="pct">{v}%</div>
            </div>
          ))}
        </React.Fragment>
      ))}
    </div>
  )
}
