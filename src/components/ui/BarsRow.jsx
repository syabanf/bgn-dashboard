export function BarsRow({ values, h = 80 }) {
  const max = Math.max(...values)
  return (
    <div style={{ display: 'flex', gap: 3, alignItems: 'flex-end', height: h }}>
      {values.map((v, i) => {
        const c = v >= 6 ? '#C03A2B' : v >= 4 ? '#D89014' : '#2E8B57'
        return <div key={i} style={{ flex: 1, height: `${(v/max)*100}%`, background: c, borderRadius: '3px 3px 0 0', minHeight: 4 }} title={`Hari -${30-i}: ${v} insiden`}/>
      })}
    </div>
  )
}
