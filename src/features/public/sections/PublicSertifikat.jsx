import React from 'react'
import { Card } from '../../../components/ui'

function CertCard({ seal, name, desc, pct }) {
  return (
    <div className="cert-card">
      <div className="seal">{seal}</div>
      <div className="name">{name}</div>
      <div className="desc">{desc}</div>
      <div className="pct">{pct}<span className="of">% SPPG terpenuhi</span></div>
      <div className="bar-track" style={{ marginTop: 8 }}>
        <div className={`bar-fill ${pct >= 80 ? 'safe' : pct >= 60 ? 'gold' : 'warn'}`} style={{ width: `${pct}%` }}/>
      </div>
    </div>
  )
}

function Commit({ n, t, desc }) {
  return (
    <div style={{ display: 'flex', gap: 12, padding: '10px 12px', background: 'var(--bgn-sky-pale)', borderRadius: 8 }}>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: 'var(--bgn-gold)', lineHeight: 1 }}>{n}</div>
      <div>
        <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--bgn-navy-deep)', marginBottom: 2 }}>{t}</div>
        <div style={{ fontSize: 11.5, color: 'var(--ink-500)' }}>{desc}</div>
      </div>
    </div>
  )
}

export default function PublicSertifikat({ D }) {
  return (
    <div className="row-gap">
      <div className="page-head">
        <div>
          <h1>Sertifikasi & Audit Independen</h1>
          <div className="subtitle">Setiap dapur SPPG (dapur gizi sekolah) harus memenuhi 3 sertifikasi inti — diperiksa BPOM, Kemenkes, dan BPJPH — dan diaudit secara berkala tanpa pemberitahuan</div>
        </div>
      </div>

      <div className="grid-3">
        <CertCard seal="HACCP" name="HACCP 7-Prinsip" desc="Standar internasional pengendalian bahaya pangan — direferensi Codex/FAO" pct={D.kpis.haccpReady}/>
        <CertCard seal="SLHS" name="Laik Higiene Sanitasi" desc="Sertifikat Kemenkes wajib untuk seluruh dapur SPPG" pct={D.kpis.slhsCoverage}/>
        <CertCard seal="ﺣﻼل" name="Sertifikasi Halal BPJPH" desc="Bahan, proses, hingga distribusi tersertifikasi halal" pct={D.kpis.halalCoverage}/>
      </div>

      <Card title="Daftar Audit & Tindak Lanjut Terbaru" subtitle="Diperbarui tiap hari · Sumber: BPOM (pengawas pangan nasional), Kemenkes, dan tim audit BGN" padded={false}>
        <div>
          <div className="insp-row" style={{ background: 'var(--ink-50)', fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ink-500)', fontWeight: 700 }}>
            <div>Tanggal</div><div>Dapur yang Diaudit</div><div>Hasil</div><div>Tindakan</div>
          </div>
          {D.inspections.map((it, i) => (
            <div className="insp-row" key={i}>
              <div className="date">{it.date}</div>
              <div>
                <div className="who">{it.target}</div>
                <div style={{ fontSize: 11, color: 'var(--ink-500)' }}>{it.who}</div>
              </div>
              <div><span className={`chip ${it.result === 'Lulus' ? 'safe' : 'warn'}`}>{it.result}</span></div>
              <div style={{ fontSize: 11.5, color: 'var(--ink-700)' }}>{it.action}</div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid-2">
        <Card title="Standar yang kami ikuti" subtitle="Acuan internasional dan nasional">
          <ul style={{ paddingLeft: 18, color: 'var(--ink-700)', fontSize: 12.5, lineHeight: 1.8, margin: 0 }}>
            <li><strong>WHO Five Keys to Safer Food</strong> — masak 70°C, hold &gt;60°C, dingin &lt;5°C</li>
            <li><strong>Codex/FAO CXC 1-1969</strong> — General Principles of Food Hygiene</li>
            <li><strong>BGN Juknis 401.1/2025</strong> — Tata Kelola Penyelenggaraan Program MBG</li>
            <li><strong>BPOM PMR/HACCP</strong> — Pedoman PMR & HACCP nasional</li>
            <li><strong>Kemenkes SLHS</strong> — Sertifikat Laik Higiene Sanitasi</li>
            <li><strong>BPJPH Halal</strong> — Sertifikasi Halal Indonesia</li>
          </ul>
        </Card>
        <Card title="Komitmen transparansi BGN" subtitle="Kami publikasikan, kami pertanggungjawabkan">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Commit n="01" t="Setiap kasus KLB dilaporkan publik dalam 24 jam" desc="Dengan kode batch, jumlah terdampak, dan tindakan korektif"/>
            <Commit n="02" t="Audit BPOM independen — tidak terjadwal" desc="Inspeksi dapur dan uji laboratorium tanpa pemberitahuan"/>
            <Commit n="03" t="Recall cepat ≤6 jam dari deteksi" desc="Sistem auto-hold + notifikasi sekolah real-time"/>
            <Commit n="04" t="Open API untuk peneliti & jurnalis" desc="Data agregat dapat diakses untuk riset publik"/>
          </div>
        </Card>
      </div>
    </div>
  )
}
