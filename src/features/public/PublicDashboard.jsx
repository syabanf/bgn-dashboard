import React, { useState } from 'react'
import { BGN_DATA } from '../../data'
import { toast } from '../../components/ui/Toaster'
import { Ico } from '../../components/ui/icons'

import { Modal } from '../../components/ui'
import PublicBeranda from './sections/PublicBeranda'
import PublicLacak from './sections/PublicLacak'
import PublicMenu from './sections/PublicMenu'
import PublicSertifikat from './sections/PublicSertifikat'
import PublicPeta from './sections/PublicPeta'
import PublicLapor from './sections/PublicLapor'

export default function PublicDashboard({ sidebarOpen, setSidebarOpen }) {
  const D = BGN_DATA
  const [section, setSection] = useState('beranda')
  const [modal, setModal] = useState(null)

  const navigate = (s) => { setSection(s); setSidebarOpen(false) }

  return (
    <div className="layout">
      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}/>}
      <aside className={`sidebar${sidebarOpen ? ' sidebar--open' : ''}`}>
        <div className="nav-group">
          <div className="label">Untuk Publik</div>
          <button className={`nav-item ${section === 'beranda'    ? 'active' : ''}`} onClick={() => navigate('beranda')}>{Ico.dashboard} Beranda</button>
          <button className={`nav-item ${section === 'lacak'      ? 'active' : ''}`} onClick={() => navigate('lacak')}>{Ico.qr} Lacak Batch</button>
          <button className={`nav-item ${section === 'menu'       ? 'active' : ''}`} onClick={() => navigate('menu')}>{Ico.doc} Menu Hari Ini</button>
          <button className={`nav-item ${section === 'sertifikat' ? 'active' : ''}`} onClick={() => navigate('sertifikat')}>{Ico.shield} Sertifikasi & Audit</button>
          <button className={`nav-item ${section === 'peta'       ? 'active' : ''}`} onClick={() => navigate('peta')}>{Ico.map} Peta Provinsi</button>
          <button className={`nav-item ${section === 'lapor'      ? 'active' : ''}`} onClick={() => navigate('lapor')}>{Ico.alert} Lapor Keluhan</button>
        </div>
        <div className="nav-group">
          <div className="label">Sumber Daya</div>
          <button className="nav-item" onClick={() => { setModal('juknis'); setSidebarOpen(false) }}>{Ico.doc} Juknis 401.1/2025</button>
          <button className="nav-item" onClick={() => { setModal('haccp');  setSidebarOpen(false) }}>{Ico.doc} Standar HACCP</button>
          <button className="nav-item" onClick={() => { setModal('faq');    setSidebarOpen(false) }}>{Ico.users} FAQ Orang Tua</button>
        </div>
        <div style={{ background: 'var(--bgn-gold-pale)', border: '1px solid var(--bgn-gold-soft)', borderRadius: 8, padding: 12, fontSize: 11.5, color: 'var(--ink-700)', lineHeight: 1.5 }}>
          <strong style={{ color: 'var(--bgn-navy-deep)', display: 'block', marginBottom: 4 }}>Hotline 24 jam</strong>
          {Ico.phone} 119 ext. 9 (Kemenkes)<br/>
          {Ico.phone} 1500-533 (BPOM)<br/>
          {Ico.mail} aduan@bgn.go.id
        </div>
      </aside>

      <main className="main">
        {section === 'beranda'    && <PublicBeranda D={D} go={navigate}/>}
        {section === 'lacak'      && <PublicLacak D={D} goLapor={navigate}/>}
        {section === 'menu'       && <PublicMenu D={D}/>}
        {section === 'sertifikat' && <PublicSertifikat D={D}/>}
        {section === 'peta'       && <PublicPeta D={D}/>}
        {section === 'lapor'      && <PublicLapor/>}
      </main>

      <Modal open={modal === 'juknis'} onClose={() => setModal(null)} title="Juknis 401.1/2025" w={620}>
        <div style={{ fontSize: 13.5, lineHeight: 1.7, color: 'var(--ink-700)' }}>
          <p>Dokumen rujukan utama tata kelola Program Makan Bergizi (MBG) yang diterbitkan Badan Gizi Nasional. Mengatur:</p>
          <ul style={{ paddingLeft: 18 }}>
            <li>Standar dapur SPPG (kapasitas 2.500–3.000 porsi/hari)</li>
            <li>Window 4 jam dari masak ke konsumsi</li>
            <li>Distribusi maksimum 30 menit / 6 km</li>
            <li>Sample 2 porsi per batch disimpan 3 hari</li>
            <li>Sertifikasi terpadu: SLHS · Halal · HACCP</li>
          </ul>
          <button className="btn btn-primary" style={{ marginTop: 12 }} onClick={() => toast('PDF Juknis 401.1 sedang diunduh', 'safe')}>{Ico.download} Unduh PDF (3.4 MB)</button>
        </div>
      </Modal>

      <Modal open={modal === 'haccp'} onClose={() => setModal(null)} title="Standar HACCP — 7 Prinsip WHO/Codex" w={640}>
        <ol style={{ fontSize: 13.5, lineHeight: 1.7, color: 'var(--ink-700)', paddingLeft: 22 }}>
          <li><strong>Hazard Analysis</strong> — identifikasi bahaya biologi, kimia, fisik</li>
          <li><strong>Critical Control Point (CCP)</strong> — titik kritis pengendalian</li>
          <li><strong>Critical Limit</strong> — batas suhu, waktu, pH yang harus dipenuhi</li>
          <li><strong>Monitoring</strong> — pengukuran rutin, terotomatisasi via IoT</li>
          <li><strong>Corrective Action</strong> — tindakan saat batas terlewati</li>
          <li><strong>Verification</strong> — audit & uji laboratorium berkala</li>
          <li><strong>Record Keeping</strong> — dokumentasi tertelusur (digital + cetak)</li>
        </ol>
      </Modal>

      <Modal open={modal === 'faq'} onClose={() => setModal(null)} title="FAQ Orang Tua" w={620}>
        <div style={{ fontSize: 13.5, lineHeight: 1.7 }}>
          {[
            ['Bagaimana saya tahu makanan anak saya aman?', 'Setiap porsi memiliki QR di kemasan. Pindai untuk lihat batch, suhu masak, waktu, dan sekolah tujuan.'],
            ['Apa yang dilakukan jika anak saya sakit setelah makan?', 'Hubungi 119 ext. 9 atau 1500-533 (BPOM). Sampel 2 porsi per batch disimpan 3 hari untuk investigasi.'],
            ['Apakah menu halal & sesuai gizi?', 'Ya. Setiap SPPG bersertifikat Halal BPJPH dan menu mengikuti AKG dengan rasio K-P-L 50-25-25.'],
            ['Boleh saya kunjungi dapur SPPG?', 'Ya, dengan janji temu. Hubungi SPPG terdekat — kunjungan publik dibuka tiap Jumat.'],
          ].map(([q, a], i) => (
            <details key={i} style={{ borderBottom: '1px solid var(--ink-100)', padding: '10px 0' }}>
              <summary style={{ cursor: 'pointer', fontWeight: 600, color: 'var(--bgn-navy-deep)' }}>{q}</summary>
              <p style={{ margin: '8px 0 0', color: 'var(--ink-700)' }}>{a}</p>
            </details>
          ))}
        </div>
      </Modal>
    </div>
  )
}
