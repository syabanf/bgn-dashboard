import { useState, useEffect } from 'react'

export function TopBar({ role, setRole, onMenuToggle }) {
  const [now, setNow] = useState(new Date(2026, 4, 9, 19, 4, 22))
  useEffect(() => {
    const t = setInterval(() => setNow(d => new Date(d.getTime() + 1000)), 1000)
    return () => clearInterval(t)
  }, [])
  const fmt  = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  const date = now.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <div className="topbar">
      <button className="hamburger" onClick={onMenuToggle} aria-label="Toggle navigation">
        <span/>
        <span/>
        <span/>
      </button>

      <div className="brand">
        <img src="/icons/icon.svg" alt="BGN" style={{ width: 34, height: 34, borderRadius: 8 }}/>
        <div className="brand-text">
          <div className="t1">Badan Gizi Nasional</div>
          <div className="t2">Sistem Dashboard MBG</div>
        </div>
      </div>

      <div className="role-toggle">
        <button className={role === 'exec' ? 'active' : ''} onClick={() => setRole('exec')}>
          <span className="dot"/>Executive (BOD)
        </button>
        <button className={role === 'public' ? 'active' : ''} onClick={() => setRole('public')}>
          <span className="dot"/>Publik
        </button>
      </div>

      <div className="spacer"/>

      <div className="meta">
        <div className="pill"><span className="pulse"/>LIVE · WIB</div>
        <div>
          <div style={{ fontSize: 10, opacity: 0.7, letterSpacing: '0.06em' }}>{date.toUpperCase()}</div>
          <div className="clock">{fmt}</div>
        </div>
      </div>

      {role === 'exec' && (
        <div className="user-chip">
          <span className="avatar">DR</span>
          <div className="user-chip-text">
            <div style={{ fontWeight: 600 }}>Dr. Dadan Hindayana</div>
            <div style={{ opacity: 0.6, fontSize: 10 }}>Kepala BGN · BOD View</div>
          </div>
        </div>
      )}
    </div>
  )
}
