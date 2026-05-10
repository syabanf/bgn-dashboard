export function IdentityFields({ form, setF, D }) {
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
