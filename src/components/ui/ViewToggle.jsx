export function ViewToggle({ view, setView, options }) {
  return (
    <div style={{ display: 'flex', gap: 0, background: 'var(--bgn-sky-pale)', borderRadius: 8, padding: 4, width: 'fit-content', border: '1px solid var(--border)' }}>
      {options.map(([v, l]) => (
        <button key={v} onClick={() => setView(v)}
          style={{ padding: '7px 20px', border: 'none', borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s',
            background: view === v ? 'var(--bgn-navy-deep)' : 'transparent',
            color: view === v ? '#fff' : 'var(--ink-600)' }}>
          {l}
        </button>
      ))}
    </div>
  )
}
