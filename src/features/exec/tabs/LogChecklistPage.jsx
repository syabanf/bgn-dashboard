import React, { useState } from 'react'
import { Card, KPI } from '../../../components/ui'
import { toast } from '../../../components/ui/Toaster'
import { CHECKLIST_STAGES } from '../constants'

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

const EMPTY_CL_FORM = () => ({
  sppg: '', batch: '', officer: '', date: '2026-05-09', time: '07:00',
  sampleTaken: false, notes: '',
  stages: Object.fromEntries(CHECKLIST_STAGES.map(s => [s.id, s.items.map(() => false)])),
})

export default function LogChecklistPage({ D }) {
  const [logs, setLogs] = useState([])
  const [view, setView] = useState('input')
  const [form, setForm] = useState(EMPTY_CL_FORM())
  const [expanded, setExpanded] = useState(
    Object.fromEntries(CHECKLIST_STAGES.map(s => [s.id, true]))
  )

  const setF = (k, v) => setForm(s => ({ ...s, [k]: v }))
  const setCheck = (stageId, idx, v) => setForm(s => {
    const stages = { ...s.stages }
    const items = [...stages[stageId]]
    items[idx] = v
    stages[stageId] = items
    return { ...s, stages }
  })
  const toggleStage = (id) => setExpanded(e => ({ ...e, [id]: !e[id] }))

  const totalItems  = CHECKLIST_STAGES.reduce((a, s) => a + s.items.length, 0)
  const checkedItems = (stages) => CHECKLIST_STAGES.reduce((a, s) => a + stages[s.id].filter(Boolean).length, 0)

  const submit = (e) => {
    e.preventDefault()
    if (!form.sppg || !form.batch) { toast('Pilih SPPG dan isi kode batch', 'risk'); return }
    const checked = checkedItems(form.stages)
    const ok = checked === totalItems && form.sampleTaken
    const stageResults = CHECKLIST_STAGES.map(s => ({
      id: s.id, label: s.label, passed: form.stages[s.id].filter(Boolean).length, total: s.items.length,
    }))
    const entry = {
      id: 'CKL-' + (Math.floor(Math.random() * 90000) + 10000),
      ts: form.time, date: form.date,
      sppg: form.sppg, prov: D.sppgList.find(s => s.name === form.sppg)?.prov || '—',
      officer: form.officer || 'Pengawas', batch: form.batch,
      checked, total: totalItems, sampleTaken: form.sampleTaken,
      stageResults, notes: form.notes, ok,
    }
    setLogs(prev => [entry, ...prev])
    const missed = totalItems - checked
    if (!ok) toast(`Checklist tidak lengkap — ${missed} poin belum dicentang`, 'warn')
    else     toast(`Checklist ${form.batch} lulus semua proses ✓`, 'safe')
    setForm(EMPTY_CL_FORM())
    setView('table')
  }

  const pct = (stages) => Math.round((checkedItems(stages) / totalItems) * 100)

  return (
    <div className="row-gap">
      <div className="grid-3" style={{ gap: 12 }}>
        <KPI label="Checklist tersimpan hari ini" accent="navy" value={logs.length} unit=" entri"/>
        <KPI label="Lulus semua proses" accent="leaf" value={logs.filter(l => l.ok).length} unit=" batch"/>
        <KPI label="Ada poin belum terpenuhi" accent="warn" value={logs.filter(l => !l.ok).length} unit=" batch"/>
      </div>

      <ViewToggle view={view} setView={setView} options={[['input','✅  Input Checklist Baru'], ['table', `📋  Riwayat Checklist (${logs.length})`]]}/>

      {view === 'input' && (
        <form onSubmit={submit}>
          <div className="grid-2" style={{ gap: 14, marginBottom: 14 }}>
            <Card title="Identitas SPPG & Batch">
              <IdentityFields form={form} setF={setF} D={D}/>
            </Card>
            <Card title="Panduan Pengisian" subtitle="Centang setiap poin yang benar-benar sudah dipenuhi">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {CHECKLIST_STAGES.map(s => {
                  const done = form.stages[s.id].filter(Boolean).length
                  const total = s.items.length
                  return (
                    <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', background: done === total ? 'var(--status-safe-soft)' : 'var(--bgn-sky-pale)', borderRadius: 8, border: `1px solid ${done === total ? 'var(--status-safe)' : 'var(--border)'}` }}>
                      <span style={{ fontSize: 18 }}>{s.icon}</span>
                      <span style={{ flex: 1, fontSize: 12, fontWeight: 600, color: 'var(--bgn-navy-deep)' }}>{s.label}</span>
                      <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', fontWeight: 700, color: done === total ? '#176B3F' : 'var(--ink-500)' }}>{done}/{total}</span>
                    </div>
                  )
                })}
                <label style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '11px 14px', background: form.sampleTaken ? 'var(--bgn-gold-pale)' : 'var(--ink-50)', borderRadius: 8, border: `1.5px dashed ${form.sampleTaken ? 'var(--bgn-gold)' : 'var(--ink-300)'}`, cursor: 'pointer', marginTop: 4 }}>
                  <input type="checkbox" checked={form.sampleTaken} onChange={e => setF('sampleTaken', e.target.checked)} style={{ marginTop: 3, width: 16, height: 16, accentColor: 'var(--bgn-gold)', flexShrink: 0 }}/>
                  <span style={{ fontSize: 12.5, lineHeight: 1.55 }}>
                    <strong style={{ color: 'var(--bgn-navy-deep)' }}>Food Sample Diambil</strong> — 2 porsi per batch, berlabel, disimpan ≥3 hari
                  </span>
                </label>
              </div>
            </Card>
          </div>

          {CHECKLIST_STAGES.map(s => (
            <Card key={s.id} title={`${s.icon}  ${s.label}`}
              subtitle={`${form.stages[s.id].filter(Boolean).length} dari ${s.items.length} poin terpenuhi`}
              tools={
                <button type="button" className="btn" style={{ fontSize: 11 }} onClick={() => toggleStage(s.id)}>
                  {expanded[s.id] ? 'Tutup ▲' : 'Buka ▼'}
                </button>
              }>
              {expanded[s.id] && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {s.items.map((item, idx) => {
                    const checked = form.stages[s.id][idx]
                    return (
                      <label key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer', padding: '11px 14px', background: checked ? 'var(--status-safe-soft)' : 'var(--ink-50)', borderRadius: 8, border: `1px solid ${checked ? 'var(--status-safe)' : 'var(--ink-200)'}`, transition: 'all 0.15s' }}>
                        <input type="checkbox" checked={checked} onChange={e => setCheck(s.id, idx, e.target.checked)}
                          style={{ marginTop: 3, width: 16, height: 16, accentColor: 'var(--status-safe)', flexShrink: 0 }}/>
                        <span style={{ fontSize: 13, color: 'var(--ink-900)', lineHeight: 1.55 }}>{item}</span>
                        {checked && <span style={{ marginLeft: 'auto', flexShrink: 0, fontSize: 15 }}>✅</span>}
                      </label>
                    )
                  })}
                </div>
              )}
            </Card>
          ))}

          <Card title="Catatan & Temuan">
            <textarea rows="3" value={form.notes} onChange={e => setF('notes', e.target.value)}
              placeholder="Temuan visual, ketidaksesuaian proses, atau tindakan korektif yang sudah diambil…"
              style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--ink-200)', borderRadius: 6, fontFamily: 'inherit', fontSize: 13, resize: 'vertical', boxSizing: 'border-box' }}/>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 12 }}>
              <button type="submit" className="btn btn-primary" style={{ minWidth: 220 }}>Simpan Checklist Proses →</button>
            </div>
          </Card>
        </form>
      )}

      {view === 'table' && (
        <Card title="Riwayat Checklist Proses" subtitle="Terbaru di atas · per batch per dapur SPPG" padded={false}>
          <div className="table-wrap">
            <table className="bgn">
              <thead>
                <tr>
                  <th>ID</th><th>Jam</th><th>Dapur SPPG</th><th>Batch</th>
                  {CHECKLIST_STAGES.map(s => <th key={s.id} title={s.label}>{s.icon}</th>)}
                  <th>Sampel</th><th>Total</th><th>Status</th><th>Catatan</th>
                </tr>
              </thead>
              <tbody>
                {logs.length === 0 && (
                  <tr><td colSpan={11} style={{ textAlign: 'center', padding: 32, color: 'var(--ink-400)' }}>Belum ada checklist tersimpan — isi form di tab Input.</td></tr>
                )}
                {logs.map((l, i) => (
                  <tr key={i} style={{ background: l.ok ? '' : 'rgba(234,179,8,0.05)' }}>
                    <td><span style={{ fontFamily: 'var(--font-mono)', fontSize: 10 }}>{l.id}</span></td>
                    <td style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>{l.ts}</td>
                    <td>
                      <div className="strong" style={{ fontSize: 12.5 }}>{l.sppg}</div>
                      <div style={{ fontSize: 11, color: 'var(--ink-500)' }}>{l.prov}</div>
                    </td>
                    <td><span style={{ fontFamily: 'var(--font-mono)', fontSize: 11 }}>{l.batch}</span></td>
                    {l.stageResults.map(sr => (
                      <td key={sr.id} style={{ textAlign: 'center' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 12, color: sr.passed === sr.total ? '#176B3F' : '#C03A2B' }}>
                          {sr.passed}/{sr.total}
                        </span>
                      </td>
                    ))}
                    <td style={{ textAlign: 'center', fontSize: 14 }}>{l.sampleTaken ? '✅' : '❌'}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <div className="bar-track" style={{ width: 40 }}>
                          <div className={`bar-fill ${pct(l) >= 100 ? 'safe' : 'warn'}`} style={{ width: `${Math.min(100, pct(l))}%` }}/>
                        </div>
                        <span style={{ fontSize: 11, fontWeight: 700 }}>{l.checked}/{l.total}</span>
                      </div>
                    </td>
                    <td><span className={`chip ${l.ok ? 'safe' : 'warn'}`}>{l.ok ? 'Lulus ✓' : 'Tidak Lengkap'}</span></td>
                    <td style={{ fontSize: 11, color: 'var(--ink-500)', maxWidth: 180, lineHeight: 1.45 }}>{l.notes || '—'}</td>
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
