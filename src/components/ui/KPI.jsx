import { Ico } from './icons'

function Sparkline({ points, className, color = 'var(--bgn-navy-500)', fill = true, w = 90, h = 32 }) {
  if (!points || !points.length) return null
  const max = Math.max(...points)
  const min = Math.min(...points)
  const range = max - min || 1
  const step = w / (points.length - 1)
  const ys = points.map((p, i) => [i * step, h - 3 - ((p - min) / range) * (h - 6)])
  const d = ys.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ')
  const fillD = `${d} L ${w},${h} L 0,${h} Z`
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={className} preserveAspectRatio="none">
      {fill && <path d={fillD} fill={color} opacity="0.13"/>}
      <path d={d} fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export function KPI({ label, value, unit, delta, deltaDir = 'up', meta, accent = 'navy', spark }) {
  return (
    <div className={`kpi ${accent}`}>
      <div className="label">{label}</div>
      <div className="value">{value}{unit && <span className="unit">{unit}</span>}</div>
      {delta && (
        <div className={`delta ${deltaDir === 'down' ? 'down' : ''}`}>
          {deltaDir === 'down' ? Ico.arrowDown : Ico.arrowUp}
          <span>{delta}</span>
        </div>
      )}
      {meta && <div className="meta">{meta}</div>}
      {spark && <Sparkline points={spark} className="spark" />}
    </div>
  )
}
