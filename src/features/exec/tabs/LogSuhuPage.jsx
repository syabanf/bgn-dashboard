import React, { useState } from 'react'
import { Card, KPI } from '../../../components/ui'
import { toast } from '../../../components/ui/Toaster'

function ViewToggle({ view, setView, options }) {
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

function IdentityFields({ form, setF, D }) {
  const inp = { width: '100%', padding: '8px 10px', border: '1px solid var(--ink-200)', borderRadius: 6, fontSize: 13, background: '#fff', boxSizing: 'border-box' }
  const lbl = { fontSize: 11, color: 'var(--ink-500)', fontWeight: 600, marginBottom: 4, display: 'block' }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div>
        <span style={lbl}>Dapur SPPG *</span>
        <select value={form.sppg} onChange={e => setF('sppg', e.target.value)} style={inp}>
          <option value="">— Pilih SPPG —</option>
          {D.sppgList.map(s => <option key={s.id} value={s.name}>{s.name} · {s.prov}</option>)}
        </select>
      </div>
      <div>
        <span style={lbl}>Kode Batch *</span>
        <input value={form.batch} onChange={e => setF('batch', e.target.value)} placeholder="B-2026-JK-NNNN"
          style={{ ...inp, fontFamily: 'var(--font-mono)' }}/>
      </div>
      <div>
        <span style={lbl}>Nama Petugas / Pengawas</span>
        <input value={form.officer} onChange={e => setF('officer', e.target.value)} placeholder="Nama, SKM" style={inp}/>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <div>
          <span style={lbl}>Tanggal</span>
          <input type="date" value={form.date} onChange={e => setF('date', e.target.value)} style={inp}/>
        </div>
        <div>
          <span style={lbl}>Jam Pengisian</span>
          <input type="time" value={form.time} onChange={e => setF('time', e.target.value)} style={inp}/>
        </div>
      </div>
    </div>
  )
}

const EMPTY_FORM = { sppg: '', batch: '', officer: '', date: '2026-05-09', time: '07:00', cook: '', hold: '', storage: '', truck: '', distMin: '', notes: '' }

export default function LogSuhuPage({ D }) {
  const [logs, setLogs] = useState(
    D.recentLogs.map(l => ({ ...l, id: l.id.replace('LOG', 'TMP') }))
  )
  const [view, setView] = useState('input')
  const [form, setForm] = useState(EMPTY_FORM)
  const setF = (k, v) => setForm(s => ({ ...s, [k]: v }))

  const cookV = parseFloat(form.cook), holdV = parseFloat(form.hold)
  const storV = parseFloat(form.storage), trukV = parseFloat(form.truck)
  const distV = parseInt(form.distMin, 10)
  const cookOk = isNaN(cookV) || cookV >= 70
  const holdOk = isNaN(holdV) || holdV >= 60
  const storOk = isNaN(storV) || storV <= 5
  const trukOk = isNaN(trukV) || trukV <= 5
  const distOk = isNaN(distV) || distV <= 30
  const anyViolation = !cookOk || !holdOk || !storOk || !trukOk || !distOk

  const submit = (e) => {
    e.preventDefault()
    if (!form.sppg || !form.batch) { toast('Pilih SPPG dan isi kode batch', 'risk'); return }
    const violations = []
    if (!isNaN(cookV) && cookV < 70)  violations.push(`Masak ${cookV}°C < 70°C`)
    if (!isNaN(holdV) && holdV < 60)  violations.push(`Hot-hold ${holdV}°C < 60°C`)
    if (!isNaN(storV) && storV > 5)   violations.push(`Cold ${storV}°C > 5°C`)
    if (!isNaN(trukV) && trukV > 5)   violations.push(`Kend. ${trukV}°C > 5°C`)
    if (!isNaN(distV) && distV > 30)  violations.push(`Distribusi ${distV} mnt > 30 mnt`)
    const ok = violations.length === 0
    const entry = {
      id: 'TMP-' + (Math.floor(Math.random() * 90000) + 10000),
      ts: form.time, date: form.date,
      sppg: form.sppg, prov: D.sppgList.find(s => s.name === form.sppg)?.prov || '—',
      officer: form.officer || 'Pengawas', batch: form.batch,
      cook: isNaN(cookV) ? null : cookV, hold: isNaN(holdV) ? null : holdV,
      storage: isNaN(storV) ? null : storV, truck: isNaN(trukV) ? null : trukV,
      distMin: isNaN(distV) ? null : distV,
      violations, notes: violations.length ? violations.join('; ') : form.notes, ok,
    }
    setLogs(prev => [entry, ...prev])
    if (!ok) toast(`Auto-hold! ${violations[0]}`, 'risk')
    else     toast(`Log suhu tersimpan · batch ${form.batch} ✓`, 'safe')
    setForm(EMPTY_FORM)
    setView('table')
  }

  const TempInput = ({ label, sublabel, value, onChange, unit = '°C', ok }) => (
    <div>
      <div style={{ fontSize: 11.5, fontWeight: 600, color: 'var(--ink-700)', marginBottom: 2 }}>{label}</div>
      <div style={{ fontSize: 10.5, color: 'var(--ink-400)', marginBottom: 6 }}>{sublabel}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <input type="number" value={value} onChange={onChange} placeholder="0.0" step="0.1"
          style={{ flex: 1, padding: '9px 10px', border: `1.5px solid ${value !== '' ? (ok ? 'var(--status-safe)' : 'var(--status-risk)') : 'var(--ink-200)'}`, borderRadius: 6, fontFamily: 'var(--font-mono)', fontSize: 14, background: '#fff' }}/>
        <span style={{ color: 'var(--ink-500)', fontSize: 12, whiteSpace: 'nowrap', width: 36 }}>{unit}</span>
        {value !== '' && <span style={{ fontSize: 18 }}>{ok ? '✅' : '🚨'}</span>}
      </div>
    </div>
  )

  const TempCell = ({ v, okFn }) => {
    if (v == null || isNaN(v)) return <span style={{ color: 'var(--ink-300)' }}>—</span>
    const ok = okFn(v)
    return <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 12.5, color: ok ? '#176B3F' : '#C03A2B' }}>{v}°</span>
  }

  return (
    <div className="row-gap">
      <div className="grid-3" style={{ gap: 12 }}>
        <KPI label="Log suhu masuk hari ini" accent="navy" value={logs.length} unit=" entri" meta="Semua SPPG yang melapor"/>
        <KPI label="Pembacaan dalam batas aman" accent="leaf" value={logs.filter(l => l.ok).length} unit=" batch"/>
        <KPI label="Auto-hold diaktifkan" accent="risk" value={logs.filter(l => !l.ok).length} unit=" batch" meta="Batas suhu dilanggar"/>
      </div>

      <ViewToggle view={view} setView={setView} options={[['input','🌡️  Input Suhu Baru'], ['table', `📊  Riwayat Suhu (${logs.length})`]]}/>

      {view === 'input' && (
        <form onSubmit={submit}>
          {anyViolation && form.cook !== '' && (
            <div style={{ background: 'var(--status-risk-soft)', border: '1px solid var(--status-risk)', borderRadius: 8, padding: '12px 16px', fontSize: 12.5, color: '#8B1F15', marginBottom: 14, lineHeight: 1.6 }}>
              <strong>⚠️ Peringatan:</strong> Terdapat pembacaan suhu di luar batas aman. Batch akan ditahan otomatis (auto-hold) saat disimpan.
            </div>
          )}
          <div className="grid-2" style={{ gap: 14 }}>
            <Card title="Identitas SPPG & Batch">
              <IdentityFields form={form} setF={setF} D={D}/>
            </Card>
            <Card title="Pembacaan Suhu — Titik Kendali Kritis (CCP)" subtitle="🟢 aman · 🚨 = auto-hold">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <TempInput label="🔥 CCP-1 · Suhu Masak Inti Protein" sublabel="Batas minimum WHO/Codex: ≥70°C (ayam, daging, ikan, telur)" value={form.cook} onChange={e => setF('cook', e.target.value)} ok={cookOk}/>
                <TempInput label="♨️ CCP-2 · Suhu Hot-Holding Pra-Distribusi" sublabel="Batas minimum: >60°C · dijaga terus hingga tiba di sekolah" value={form.hold} onChange={e => setF('hold', e.target.value)} ok={holdOk}/>
                <TempInput label="❄️ CCP-3 · Suhu Cold Storage Bahan Perishable" sublabel="Batas maksimum: <5°C · daging, susu, telur, lauk mentah" value={form.storage} onChange={e => setF('storage', e.target.value)} ok={storOk}/>
                <TempInput label="🚐 CCP-4 · Suhu Kendaraan Distribusi" sublabel="Batas maksimum: <5°C · untuk produk dingin / lauk mentah" value={form.truck} onChange={e => setF('truck', e.target.value)} ok={trukOk}/>
                <TempInput label="⏱️ CCP-5 · Durasi Perjalanan Distribusi" sublabel="Batas maksimum Juknis 401.1: ≤30 menit / ≤6 km" value={form.distMin} onChange={e => setF('distMin', e.target.value)} unit="menit" ok={distOk}/>
              </div>
            </Card>
          </div>
          <Card title="Catatan & Tindakan Korektif">
            <textarea rows="3" value={form.notes} onChange={e => setF('notes', e.target.value)}
              placeholder="Temuan anomali suhu, tindakan korektif yang sudah diambil, atau catatan lain untuk supervisor…"
              style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--ink-200)', borderRadius: 6, fontFamily: 'inherit', fontSize: 13, resize: 'vertical', boxSizing: 'border-box' }}/>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 12 }}>
              <button type="submit" className="btn btn-primary" style={{ minWidth: 200 }}>Simpan Log Suhu →</button>
            </div>
          </Card>
        </form>
      )}

      {view === 'table' && (
        <Card title="Riwayat Log Suhu Harian" subtitle="Terbaru di atas · merah = auto-hold · semua suhu dalam °C" padded={false}>
          <div className="table-wrap">
            <table className="bgn">
              <thead>
                <tr>
                  <th>ID</th><th>Jam</th><th>Dapur SPPG</th><th>Batch</th>
                  <th title="CCP-1 Masak ≥70°C">Masak</th>
                  <th title="CCP-2 Hot-Hold >60°C">Hot-Hold</th>
                  <th title="CCP-3 Cold <5°C">Cold</th>
                  <th title="CCP-4 Kendaraan <5°C">Kend.</th>
                  <th title="CCP-5 Distribusi ≤30 mnt">Dist.</th>
                  <th>Status</th><th>Pelanggaran / Catatan</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((l, i) => (
                  <tr key={i} style={{ background: l.ok ? '' : 'rgba(192,58,43,0.04)' }}>
                    <td><span style={{ fontFamily: 'var(--font-mono)', fontSize: 10 }}>{l.id}</span></td>
                    <td style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>{l.ts}</td>
                    <td>
                      <div className="strong" style={{ fontSize: 12.5 }}>{l.sppg}</div>
                      <div style={{ fontSize: 11, color: 'var(--ink-500)' }}>{l.prov}</div>
                    </td>
                    <td><span style={{ fontFamily: 'var(--font-mono)', fontSize: 11 }}>{l.batch}</span></td>
                    <td><TempCell v={l.cook}    okFn={v => v >= 70}/></td>
                    <td><TempCell v={l.hold}    okFn={v => v >= 60}/></td>
                    <td><TempCell v={l.storage} okFn={v => v <= 5}/></td>
                    <td><TempCell v={l.truck}   okFn={v => v <= 5}/></td>
                    <td>{l.distMin != null ? <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 12.5, color: l.distMin <= 30 ? '#176B3F' : '#C03A2B' }}>{l.distMin}m</span> : <span style={{ color: 'var(--ink-300)' }}>—</span>}</td>
                    <td><span className={`chip ${l.ok ? 'safe' : 'risk'}`}>{l.ok ? 'Aman ✓' : 'Ditahan !'}</span></td>
                    <td style={{ fontSize: 11, color: l.notes ? '#8B1F15' : 'var(--ink-400)', maxWidth: 200, lineHeight: 1.45 }}>{l.notes || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  )
}
