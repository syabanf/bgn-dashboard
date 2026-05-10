import React, { useState } from 'react'
import { Card } from '../../../components/ui'
import { Ico } from '../../../components/ui/icons'
import { toast } from '../../../components/ui/Toaster'

const BATCH_DB = {
  'B-2026-JB-0241': { menu: 'Nasi + Ayam Bumbu Kuning + Tumis Buncis + Pisang', dapur: 'SPPG Cipinang Besar — DKI Jakarta', tujuan: 'SDN Cipinang Besar Selatan 03 (612 porsi)', supplier: 'PT Boga Tani', haccp: 'A', tCook: '72.4°C', tHold: '61.2°C', dist: '22 mnt · 4.8 km', svd: '07.42 WIB', win: '3 jam 02 menit', ok: true },
  'B-2026-JT-0512': { menu: 'Nasi + Telur Balado + Sayur Sop + Jeruk', dapur: 'SPPG Tegalsari — Jawa Tengah', tujuan: 'SDN Tegalsari 02 (498 porsi)', supplier: 'KUD Sumber Makmur', haccp: 'A', tCook: '74.1°C', tHold: '62.0°C', dist: '18 mnt · 3.9 km', svd: '07.34 WIB', win: '2 jam 48 menit', ok: true },
  'B-2026-BA-0066': { menu: 'Nasi + Ikan Tongkol Sambal + Cap Cay + Pepaya', dapur: 'SPPG Denpasar Utara — Bali', tujuan: 'SDN 5 Denpasar (524 porsi)', supplier: 'CV Bali Segar', haccp: 'B', tCook: '71.8°C', tHold: '60.4°C', dist: '26 mnt · 5.2 km', svd: '07.51 WIB', win: '3 jam 24 menit', ok: true },
}

export default function PublicLacak({ D, goLapor }) {
  const [batch, setBatch] = useState('B-2026-JB-0241')
  const [shown, setShown] = useState(true)
  const data = BATCH_DB[batch.toUpperCase().trim()] || null

  const submit = () => {
    if (!data) {
      toast(`Batch "${batch}" tidak ditemukan. Coba B-2026-JB-0241`, 'risk')
      setShown(false); return
    }
    setShown(true)
    toast(`Batch ${batch} ditemukan · status aman`, 'safe')
  }

  return (
    <div className="row-gap">
      <div className="page-head">
        <div>
          <h1>Lacak Kotak Makan Anak Anda</h1>
          <div className="subtitle">Setiap kotak makan MBG memiliki kode batch unik. Masukkan kode dari kemasan atau pindai QR untuk melihat dari dapur mana makanan berasal, jam masak, dan suhu yang tercatat.</div>
        </div>
      </div>

      <div className="batch-lookup">
        <div style={{ fontSize: 13, color: 'var(--bgn-navy-deep)', fontWeight: 600 }}>Masukkan kode batch atau pindai QR</div>
        <div className="batch-input">
          <input value={batch} onChange={e => setBatch(e.target.value)} onKeyDown={e => e.key === 'Enter' && submit()} placeholder="B-2026-JB-0241"/>
          <button className="btn btn-primary" onClick={submit}>{Ico.search} Lacak</button>
          <button className="btn" onClick={() => toast('Mengaktifkan kamera untuk pindai QR…', 'info')}>{Ico.qr} Pindai</button>
        </div>
        <div style={{ fontSize: 11.5, color: 'var(--ink-500)', marginTop: 8 }}>
          Format: <span style={{ fontFamily: 'var(--font-mono)' }}>B-YYYY-XX-NNNN</span> · Coba juga: B-2026-JT-0512 · B-2026-BA-0066
        </div>
      </div>

      {shown && (
        <div className="batch-result">
          <div className="head">
            <div>
              <div style={{ fontSize: 11, color: 'var(--ink-500)', fontFamily: 'var(--font-mono)', letterSpacing: '0.05em' }}>BATCH ID</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 600, color: 'var(--bgn-navy-deep)' }}>{batch}</div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <span className="chip safe">{Ico.check} Aman dikonsumsi</span>
              <span className="chip info">HACCP A</span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 8 }}>
            <div><div style={{ fontSize: 10.5, color: 'var(--ink-500)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700 }}>Menu</div><div style={{ fontWeight: 700, color: 'var(--ink-900)', marginTop: 2 }}>Nasi + Ayam Bumbu Kuning + Tumis Buncis + Pisang</div></div>
            <div><div style={{ fontSize: 10.5, color: 'var(--ink-500)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700 }}>Dapur</div><div style={{ fontWeight: 700, color: 'var(--ink-900)', marginTop: 2 }}>SPPG Cipinang Besar — DKI Jakarta</div></div>
            <div><div style={{ fontSize: 10.5, color: 'var(--ink-500)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700 }}>Tujuan</div><div style={{ fontWeight: 700, color: 'var(--ink-900)', marginTop: 2 }}>SDN Cipinang Besar Selatan 03 (612 porsi)</div></div>
            <div><div style={{ fontSize: 10.5, color: 'var(--ink-500)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700 }}>Sertifikasi</div><div style={{ marginTop: 4, display: 'flex', gap: 4, flexWrap: 'wrap' }}><span className="chip safe">SLHS</span><span className="chip safe">Halal</span><span className="chip safe">HACCP</span></div></div>
          </div>

          <div className="batch-trace">
            <div className="step">
              <div className="ico">1</div>
              <div className="label">Bahan</div>
              <div className="meta">Supplier PT Boga Tani</div>
              <div className="ts">04.40 WIB</div>
            </div>
            <div className="step">
              <div className="ico">2</div>
              <div className="label">Masak</div>
              <div className="meta">Suhu inti 72.4°C ✓</div>
              <div className="ts">06.18 WIB</div>
            </div>
            <div className="step">
              <div className="ico">3</div>
              <div className="label">Hot Hold</div>
              <div className="meta">61.2°C selama 36 mnt</div>
              <div className="ts">06.55 WIB</div>
            </div>
            <div className="step">
              <div className="ico">4</div>
              <div className="label">Distribusi</div>
              <div className="meta">22 mnt · 4.8 km</div>
              <div className="ts">07.18 WIB</div>
            </div>
            <div className="step">
              <div className="ico">5</div>
              <div className="label">Disajikan</div>
              <div className="meta">SDN Cipinang Bs. 03</div>
              <div className="ts">07.42 WIB</div>
            </div>
          </div>

          <div className="divider"/>
          <div style={{ display: 'flex', gap: 14, fontSize: 11.5, color: 'var(--ink-700)' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>{Ico.clipboard} <strong>Food sample disimpan</strong> 3 hari · Sample ID FS-091-A</div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>{Ico.thermo} <strong>Window 4 jam</strong> tercapai (3 jam 02 menit)</div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>{Ico.check} <strong>Auditor terakhir</strong> 7 Mei 2026 (BPOM Lab)</div>
          </div>
        </div>
      )}

      <div className="grid-3">
        <Card title="Apa yang dicek di setiap titik?">
          <ol style={{ paddingLeft: 18, color: 'var(--ink-700)', fontSize: 12.5, lineHeight: 1.7, margin: 0 }}>
            <li><strong>Bahan</strong> — supplier approved, COA, suhu chiller</li>
            <li><strong>Masak</strong> — suhu inti ≥70°C untuk protein</li>
            <li><strong>Hot Hold</strong> — &gt;60°C, max 4 jam total</li>
            <li><strong>Distribusi</strong> — ≤30 menit / 6 km, suhu kotak</li>
            <li><strong>Disajikan</strong> — scan terima, attendance penerima</li>
          </ol>
        </Card>
        <Card title="Apa yang terjadi kalau gagal?">
          <div style={{ fontSize: 12.5, color: 'var(--ink-700)', lineHeight: 1.6 }}>
            Sistem <strong>menahan otomatis (auto-hold)</strong> batch tersebut <em>sebelum</em> didistribusikan.
            Jika sudah terlanjur dikirim, mekanisme <strong>recall cepat</strong> mengontak sekolah dan mengganti
            menu darurat. Setiap kasus dicatat dan dilaporkan ke BPOM dalam 24 jam.
          </div>
        </Card>
        <Card title="Bagaimana kalau anak saya merasa tidak enak badan?">
          <div style={{ fontSize: 12.5, color: 'var(--ink-700)', lineHeight: 1.6 }}>
            Segera lapor ke guru atau Puskesmas terdekat. Sertakan kode batch dari kemasan.
            Tim akan menahan batch terkait, ambil food sample yang tersimpan, dan investigasi.
          </div>
          <button className="btn btn-gold" style={{ width: '100%', marginTop: 10, justifyContent: 'center' }} onClick={() => goLapor && goLapor('lapor')}>Lapor sekarang →</button>
        </Card>
      </div>
    </div>
  )
}
