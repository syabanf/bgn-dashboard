import React, { useState } from 'react'
import { toast } from '../../../components/ui/Toaster'
import { JUKNIS_INIT } from '../constants'

const JUKNIS_STATUS = { berlaku: 'safe', direvisi: 'warn', draft: 'info' }

let _juknisId = 100
const uid = () => ++_juknisId

function PasalCard({ pasal, onEdit, onDelete, expanded, onToggle }) {
  return (
    <div style={{ background: 'var(--bgn-sky-pale)', borderRadius: 8, border: '1px solid var(--border)', overflow: 'hidden' }}>
      <div
        style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', cursor: 'pointer', userSelect: 'none' }}
        onClick={onToggle}
      >
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink-500)', textTransform: 'uppercase', letterSpacing: '0.07em', whiteSpace: 'nowrap' }}>{pasal.kode}</span>
        <span style={{ flex: 1, fontWeight: 600, fontSize: 13, color: 'var(--bgn-navy-deep)' }}>{pasal.judul}</span>
        <span style={{ fontSize: 11, color: 'var(--ink-400)', marginLeft: 'auto' }}>{expanded ? '▲' : '▼'}</span>
      </div>
      {expanded && (
        <div style={{ padding: '0 14px 12px', borderTop: '1px solid var(--border)' }}>
          <p style={{ fontSize: 13, color: 'var(--ink-700)', lineHeight: 1.6, margin: '10px 0 10px' }}>{pasal.isi}</p>
          <div style={{ display: 'flex', gap: 6 }}>
            <button className="btn" style={{ fontSize: 11 }} onClick={() => onEdit(pasal)}>Edit</button>
            <button className="btn btn-ghost" style={{ fontSize: 11, color: 'var(--risk-hi)' }} onClick={() => onDelete(pasal.id)}>Hapus</button>
          </div>
        </div>
      )}
    </div>
  )
}

function PasalEditor({ initial, onSave, onCancel }) {
  const [kode, setKode] = useState(initial?.kode || '')
  const [judul, setJudul] = useState(initial?.judul || '')
  const [isi, setIsi] = useState(initial?.isi || '')
  const inp = { fontSize: 13, padding: '6px 10px', border: '1px solid var(--border)', borderRadius: 6, width: '100%', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', background: 'var(--surface)' }
  return (
    <div style={{ background: '#fff8e6', border: '1.5px solid var(--bgn-gold)', borderRadius: 8, padding: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', gap: 8 }}>
        <input style={{ ...inp, width: 110, flexShrink: 0 }} placeholder="Kode (mis. Pasal 5)" value={kode} onChange={e => setKode(e.target.value)}/>
        <input style={{ ...inp }} placeholder="Judul pasal" value={judul} onChange={e => setJudul(e.target.value)}/>
      </div>
      <textarea style={{ ...inp, resize: 'vertical', minHeight: 72 }} placeholder="Isi pasal..." value={isi} onChange={e => setIsi(e.target.value)}/>
      <div style={{ display: 'flex', gap: 6 }}>
        <button className="btn btn-primary" style={{ fontSize: 12 }} onClick={() => { if (!kode.trim() || !judul.trim()) return; onSave({ kode: kode.trim(), judul: judul.trim(), isi: isi.trim() }) }}>Simpan</button>
        <button className="btn btn-ghost" style={{ fontSize: 12 }} onClick={onCancel}>Batal</button>
      </div>
    </div>
  )
}

function BabModal({ initial, onSave, onClose }) {
  const [kode, setKode] = useState(initial?.kode || '')
  const [judul, setJudul] = useState(initial?.judul || '')
  const [deskripsi, setDeskripsi] = useState(initial?.deskripsi || '')
  const [status, setStatus] = useState(initial?.status || 'berlaku')
  const inp = { fontSize: 13, padding: '7px 10px', border: '1px solid var(--border)', borderRadius: 6, width: '100%', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', background: 'var(--surface)' }
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(8,24,58,0.55)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={onClose}>
      <div style={{ background: 'var(--surface)', borderRadius: 12, padding: 24, width: 480, maxWidth: '95vw', boxShadow: '0 8px 32px rgba(0,0,0,0.18)' }} onClick={e => e.stopPropagation()}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, color: 'var(--bgn-navy-deep)', marginBottom: 16 }}>
          {initial ? 'Edit Bab' : 'Tambah Bab Baru'}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <input style={{ ...inp, width: 120, flexShrink: 0 }} placeholder="Kode (mis. Bab IX)" value={kode} onChange={e => setKode(e.target.value)}/>
            <input style={{ ...inp }} placeholder="Judul bab" value={judul} onChange={e => setJudul(e.target.value)}/>
          </div>
          <textarea style={{ ...inp, resize: 'vertical', minHeight: 72 }} placeholder="Deskripsi singkat bab..." value={deskripsi} onChange={e => setDeskripsi(e.target.value)}/>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <label style={{ fontSize: 12, color: 'var(--ink-500)', whiteSpace: 'nowrap' }}>Status:</label>
            {['berlaku', 'direvisi', 'draft'].map(s => (
              <label key={s} style={{ fontSize: 12, display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
                <input type="radio" name="bab-status" value={s} checked={status === s} onChange={() => setStatus(s)}/>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </label>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 18, justifyContent: 'flex-end' }}>
          <button className="btn btn-ghost" onClick={onClose}>Batal</button>
          <button className="btn btn-primary" onClick={() => {
            if (!kode.trim() || !judul.trim()) { toast('Kode dan judul wajib diisi', 'warn'); return }
            onSave({ kode: kode.trim(), judul: judul.trim(), deskripsi: deskripsi.trim(), status })
          }}>Simpan</button>
        </div>
      </div>
    </div>
  )
}

export default function JuknisTab() {
  const [babs, setBabs] = useState(JUKNIS_INIT)
  const [selectedId, setSelectedId] = useState(1)
  const [search, setSearch] = useState('')
  const [babModal, setBabModal] = useState(null)
  const [expandedPasals, setExpandedPasals] = useState({})
  const [editingPasal, setEditingPasal] = useState(null)
  const [addingPasal, setAddingPasal] = useState(false)
  const [deletingBab, setDeletingBab] = useState(null)

  const filtered = babs.filter(b =>
    b.judul.toLowerCase().includes(search.toLowerCase()) ||
    b.kode.toLowerCase().includes(search.toLowerCase()) ||
    b.pasals.some(p => p.judul.toLowerCase().includes(search.toLowerCase()))
  )

  const selected = babs.find(b => b.id === selectedId) || babs[0]

  const togglePasal = (id) => setExpandedPasals(prev => ({ ...prev, [id]: !prev[id] }))

  const saveBab = (data) => {
    if (babModal === 'new') {
      const nb = { id: uid(), pasals: [], ...data }
      setBabs(prev => [...prev, nb])
      setSelectedId(nb.id)
      toast(`Bab "${data.judul}" ditambahkan`, 'success')
    } else {
      setBabs(prev => prev.map(b => b.id === babModal.id ? { ...b, ...data } : b))
      toast('Bab diperbarui', 'success')
    }
    setBabModal(null)
  }

  const deleteBab = (id) => {
    setBabs(prev => prev.filter(b => b.id !== id))
    setSelectedId(babs.find(b => b.id !== id)?.id || null)
    setDeletingBab(null)
    toast('Bab dihapus', 'info')
  }

  const savePasal = (data) => {
    if (editingPasal) {
      setBabs(prev => prev.map(b => b.id === selected.id
        ? { ...b, pasals: b.pasals.map(p => p.id === editingPasal ? { ...p, ...data } : p) }
        : b
      ))
      setEditingPasal(null)
      toast('Pasal diperbarui', 'success')
    } else {
      const np = { id: uid(), ...data }
      setBabs(prev => prev.map(b => b.id === selected.id ? { ...b, pasals: [...b.pasals, np] } : b))
      setExpandedPasals(prev => ({ ...prev, [np.id]: true }))
      setAddingPasal(false)
      toast(`Pasal "${data.judul}" ditambahkan`, 'success')
    }
  }

  const deletePasal = (pid) => {
    setBabs(prev => prev.map(b => b.id === selected.id ? { ...b, pasals: b.pasals.filter(p => p.id !== pid) } : b))
    toast('Pasal dihapus', 'info')
  }

  return (
    <div style={{ display: 'flex', gap: 0, height: 'calc(100vh - 160px)', minHeight: 500, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>

      {/* LEFT: Bab Browser */}
      <div style={{ width: 270, flexShrink: 0, display: 'flex', flexDirection: 'column', borderRight: '1px solid var(--border)', background: 'var(--bgn-sky-pale)' }}>
        <div style={{ padding: '14px 14px 10px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13, color: 'var(--bgn-navy-deep)', marginBottom: 8 }}>
            Juknis 401.1/2025
          </div>
          <input
            style={{ width: '100%', boxSizing: 'border-box', fontSize: 12, padding: '6px 9px', border: '1px solid var(--border)', borderRadius: 6, background: 'var(--surface)' }}
            placeholder="Cari bab / pasal..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '6px 0' }}>
          {filtered.map(b => (
            <div
              key={b.id}
              onClick={() => { setSelectedId(b.id); setAddingPasal(false); setEditingPasal(null) }}
              style={{
                padding: '9px 14px', cursor: 'pointer', borderLeft: '3px solid ' + (b.id === selectedId ? 'var(--bgn-gold)' : 'transparent'),
                background: b.id === selectedId ? 'rgba(255,255,255,0.75)' : 'transparent',
                transition: 'background 0.12s',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, color: 'var(--ink-500)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>{b.kode}</span>
                <span className={'chip ' + (JUKNIS_STATUS[b.status] || '')} style={{ fontSize: 9, padding: '1px 5px', marginLeft: 'auto' }}>{b.status}</span>
              </div>
              <div style={{ fontWeight: b.id === selectedId ? 700 : 500, fontSize: 12.5, color: 'var(--bgn-navy-deep)', marginTop: 2, lineHeight: 1.3 }}>{b.judul}</div>
              <div style={{ fontSize: 11, color: 'var(--ink-500)', marginTop: 2 }}>{b.pasals.length} pasal</div>
            </div>
          ))}
        </div>
        <div style={{ padding: '10px 14px', borderTop: '1px solid var(--border)' }}>
          <button className="btn btn-primary" style={{ width: '100%', fontSize: 12 }} onClick={() => setBabModal('new')}>+ Tambah Bab</button>
        </div>
      </div>

      {/* RIGHT: Detail Panel */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {selected ? (
          <>
            <div style={{ padding: '16px 20px 14px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-500)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>{selected.kode}</span>
                  <span className={'chip ' + (JUKNIS_STATUS[selected.status] || '')}>{selected.status}</span>
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, color: 'var(--bgn-navy-deep)' }}>{selected.judul}</div>
                <div style={{ fontSize: 13, color: 'var(--ink-600)', marginTop: 4, lineHeight: 1.5 }}>{selected.deskripsi}</div>
              </div>
              <div style={{ display: 'flex', gap: 6, flexShrink: 0, marginTop: 2 }}>
                <button className="btn" style={{ fontSize: 11 }} onClick={() => setBabModal(selected)}>Edit Bab</button>
                <button className="btn btn-ghost" style={{ fontSize: 11, color: 'var(--risk-hi)' }} onClick={() => setDeletingBab(selected.id)}>Hapus</button>
              </div>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '14px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
                <span style={{ fontWeight: 600, fontSize: 13, color: 'var(--ink-600)' }}>Pasal-pasal ({selected.pasals.length})</span>
                <button className="btn btn-primary" style={{ marginLeft: 'auto', fontSize: 11 }} onClick={() => { setAddingPasal(true); setEditingPasal(null) }}>+ Tambah Pasal</button>
              </div>

              {addingPasal && (
                <div style={{ marginBottom: 10 }}>
                  <PasalEditor onSave={savePasal} onCancel={() => setAddingPasal(false)}/>
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {selected.pasals.map(p => (
                  editingPasal === p.id ? (
                    <PasalEditor key={p.id} initial={p} onSave={savePasal} onCancel={() => setEditingPasal(null)}/>
                  ) : (
                    <PasalCard
                      key={p.id}
                      pasal={p}
                      expanded={!!expandedPasals[p.id]}
                      onToggle={() => togglePasal(p.id)}
                      onEdit={(pasal) => { setEditingPasal(pasal.id); setAddingPasal(false) }}
                      onDelete={deletePasal}
                    />
                  )
                ))}
                {selected.pasals.length === 0 && !addingPasal && (
                  <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--ink-400)', fontSize: 13 }}>Belum ada pasal — klik "+ Tambah Pasal" untuk memulai.</div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ink-400)', fontSize: 14 }}>Pilih bab dari daftar kiri</div>
        )}
      </div>

      {/* Modals */}
      {babModal && <BabModal initial={babModal === 'new' ? null : babModal} onSave={saveBab} onClose={() => setBabModal(null)}/>}

      {deletingBab && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(8,24,58,0.55)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: 'var(--surface)', borderRadius: 12, padding: 24, width: 360, boxShadow: '0 8px 32px rgba(0,0,0,0.18)' }}>
            <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--bgn-navy-deep)', marginBottom: 10 }}>Hapus Bab?</div>
            <div style={{ fontSize: 13, color: 'var(--ink-600)', marginBottom: 18 }}>
              Bab <strong>{babs.find(b => b.id === deletingBab)?.kode}</strong> dan seluruh pasalnya akan dihapus permanen.
            </div>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <button className="btn btn-ghost" onClick={() => setDeletingBab(null)}>Batal</button>
              <button className="btn" style={{ background: 'var(--risk-hi)', color: '#fff', border: 'none' }} onClick={() => deleteBab(deletingBab)}>Hapus</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
