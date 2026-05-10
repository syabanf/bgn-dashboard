import React, { useState } from 'react'
import { Card } from '../../../components/ui'
import { toast } from '../../../components/ui/Toaster'

function ContactRow({ label, v }) {
  return (
    <div style={{ padding: '10px 14px', background: 'var(--bgn-sky-pale)', borderRadius: 8 }}>
      <div style={{ fontSize: 11, color: 'var(--ink-500)', fontWeight: 600 }}>{label}</div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--bgn-navy-deep)', fontWeight: 700, marginTop: 2 }}>{v}</div>
    </div>
  )
}

function FormField({ lab, placeholder, mono, v, onChange }) {
  return (
    <div>
      <div style={{ fontSize: 11.5, color: 'var(--ink-500)', fontWeight: 600, marginBottom: 4 }}>{lab}</div>
      <input value={v || ''} onChange={onChange} placeholder={placeholder} style={{ width: '100%', padding: '8px 12px', border: '1px solid var(--ink-200)', borderRadius: 6, fontFamily: mono ? 'var(--font-mono)' : 'inherit', fontSize: 13 }}/>
    </div>
  )
}

export default function PublicLapor() {
  const [form, setForm] = useState({ nama: '', wa: '', lokasi: '', waktu: '', batch: '', jumlah: '', gejala: '' })
  const [sent, setSent] = useState(null)
  const set = (k) => (e) => setForm(s => ({ ...s, [k]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    if (!form.nama || !form.lokasi || !form.gejala) {
      toast('Lengkapi nama, lokasi, dan gejala terlebih dahulu', 'risk'); return
    }
    const tid = 'TKT-' + Math.floor(Math.random() * 9000 + 1000) + '-' + new Date().getFullYear()
    setSent(tid)
    toast(`Laporan terkirim · ${tid} · BPOM dinotifikasi`, 'safe')
  }

  return (
    <div className="row-gap">
      <div className="page-head">
        <div>
          <h1>Lapor Keluhan atau Insiden</h1>
          <div className="subtitle">Pelaporan Anda akan menahan batch terkait & memicu investigasi resmi BPOM</div>
        </div>
      </div>
      {sent && (
        <div style={{ background: 'var(--status-safe-soft)', border: '1px solid var(--status-safe)', padding: 14, borderRadius: 8, color: 'var(--bgn-navy-deep)' }}>
          <strong>✓ Laporan terkirim · Tiket {sent}</strong>
          <div style={{ fontSize: 12.5, marginTop: 4, color: 'var(--ink-700)' }}>Tim BPOM akan menghubungi {form.wa || 'Anda'} dalam 2 jam. Batch {form.batch || '(tidak disebut)'} ditahan untuk investigasi.</div>
        </div>
      )}
      <div className="grid-1-2">
        <Card title="Hubungi langsung" subtitle="24 jam, 7 hari">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <ContactRow label="Hotline Kemenkes" v="119 ext. 9"/>
            <ContactRow label="BPOM Halo" v="1500-533"/>
            <ContactRow label="WhatsApp BGN" v="0811-1500-101"/>
            <ContactRow label="Email aduan" v="aduan@bgn.go.id"/>
          </div>
        </Card>
        <Card title="Form pelaporan online" subtitle="Mohon isi sedetail mungkin agar tim dapat menahan batch terkait">
          <form onSubmit={submit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <FormField lab="Nama Pelapor *" placeholder="Nama lengkap" v={form.nama} onChange={set('nama')}/>
            <FormField lab="No. WhatsApp" placeholder="081x-xxxx-xxxx" v={form.wa} onChange={set('wa')}/>
            <FormField lab="Sekolah / Lokasi *" placeholder="Nama sekolah / kelurahan" v={form.lokasi} onChange={set('lokasi')}/>
            <FormField lab="Tanggal & Jam Konsumsi" placeholder="9 Mei 2026, 12.00" v={form.waktu} onChange={set('waktu')}/>
            <FormField lab="Kode Batch (dari kemasan)" placeholder="B-2026-XX-NNNN" mono v={form.batch} onChange={set('batch')}/>
            <FormField lab="Jumlah Anak Terdampak" placeholder="1, 5, atau 'tidak tahu'" v={form.jumlah} onChange={set('jumlah')}/>
            <div style={{ gridColumn: '1 / -1' }}>
              <div style={{ fontSize: 11.5, color: 'var(--ink-500)', fontWeight: 600, marginBottom: 4 }}>Gejala / Keluhan *</div>
              <textarea rows="4" value={form.gejala} onChange={set('gejala')} placeholder="Misal: mual, muntah, diare, rasa aneh pada makanan…" style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--ink-200)', borderRadius: 6, fontFamily: 'inherit', fontSize: 13, resize: 'vertical' }}/>
            </div>
            <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 11, color: 'var(--ink-500)' }}>Identitas Anda dilindungi · Hanya tim investigasi BPOM yang akses</span>
              <button type="submit" className="btn btn-primary">Kirim laporan →</button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}
