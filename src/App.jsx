import React, { useState, useEffect } from 'react'
import { useTweaks } from './hooks/useTweaks'
import { TweaksPanel, TweakSection, TweakRadio, TweakSelect, TweakToggle } from './components/tweaks/TweaksPanel'
import { TopBar, Toaster } from './components/ui'
import ExecDashboard from './features/exec/ExecDashboard'
import PublicDashboard from './features/public/PublicDashboard'

const TWEAK_DEFAULTS = { role: 'exec', accentTone: 'navy-gold', denseTable: false }

const styleTag = document.createElement('style')
styleTag.id = '__bgn_tone'
document.head.appendChild(styleTag)

function applyTone(tone) {
  let css = ''
  if (tone === 'navy-leaf') css = `:root { --bgn-gold: #2E8B57; --bgn-gold-soft: #C8E6D2; --bgn-gold-pale: #E6F3EC; }`
  else if (tone === 'sky-gold') css = `:root { --bgn-navy-deep: #1A3D6B; --bgn-navy: #245490; }`
  styleTag.textContent = css
}

export default function App() {
  const [tw, setTweak] = useTweaks(TWEAK_DEFAULTS)
  const [role, setRole] = useState(tw.role || 'exec')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const setRoleSync = (r) => { setRole(r); setTweak('role', r); setSidebarOpen(false) }

  useEffect(() => { applyTone(tw.accentTone || 'navy-gold') }, [tw.accentTone])

  // Close sidebar on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') setSidebarOpen(false) }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  return (
    <div className="app" data-screen-label={role === 'exec' ? '01 Executive Dashboard' : '02 Public Dashboard'}>
      <TopBar role={role} setRole={setRoleSync} onMenuToggle={() => setSidebarOpen(o => !o)}/>

      {role === 'exec'
        ? <ExecDashboard sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
        : <PublicDashboard sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
      }

      <Toaster/>

      <div className="footer">
        <div>© 2026 Badan Gizi Nasional · Republik Indonesia · Sistem Dashboard MBG v0.4 (pilot)</div>
        <div>Data: BGN Juknis 401.1/2025 · BPOM · Kemenkes · Codex/FAO · WHO Five Keys</div>
      </div>

      <TweaksPanel title="Tweaks">
        <TweakSection label="Tampilan">
          <TweakRadio label="Peran" value={role} onChange={setRoleSync} options={[
            { value: 'exec', label: 'BOD' },
            { value: 'public', label: 'Publik' },
          ]}/>
          <TweakSelect label="Tone aksen" value={tw.accentTone} onChange={v => setTweak('accentTone', v)} options={[
            { value: 'navy-gold', label: 'Navy + Gold (default)' },
            { value: 'navy-leaf', label: 'Navy + Hijau Daun' },
            { value: 'sky-gold',  label: 'Sky Blue + Gold' },
          ]}/>
          <TweakToggle label="Tabel padat" value={tw.denseTable} onChange={v => setTweak('denseTable', v)}/>
        </TweakSection>
      </TweaksPanel>
    </div>
  )
}
