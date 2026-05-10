import { useState, useEffect } from 'react'

const listeners = []

export function toast(msg, type = 'info') {
  listeners.forEach(fn => fn({ msg, type, id: Date.now() + Math.random() }))
}

export function Toaster() {
  const [items, setItems] = useState([])

  useEffect(() => {
    const handler = (t) => {
      setItems(prev => [...prev, t])
      setTimeout(() => setItems(prev => prev.filter(x => x.id !== t.id)), 3500)
    }
    listeners.push(handler)
    return () => {
      const i = listeners.indexOf(handler)
      if (i > -1) listeners.splice(i, 1)
    }
  }, [])

  return (
    <div style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 9999, display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 360 }}>
      {items.map(t => (
        <div key={t.id} style={{
          background: t.type === 'safe' ? '#176B3F' : t.type === 'warn' ? '#8E5800' : t.type === 'risk' ? '#8B1F15' : '#0E2A5C',
          color: '#fff', padding: '10px 14px', borderRadius: 8, fontSize: 12.5,
          boxShadow: '0 8px 24px rgba(14,42,92,0.25)', display: 'flex', alignItems: 'center', gap: 8,
          animation: 'slideIn 0.2s ease',
        }}>
          <span style={{ fontSize: 16 }}>{t.type === 'safe' ? '✓' : t.type === 'warn' ? '⚠' : t.type === 'risk' ? '!' : 'i'}</span>
          {t.msg}
        </div>
      ))}
    </div>
  )
}
