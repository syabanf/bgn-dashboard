import React, { useState } from 'react'
import { BGN_DATA } from '../../data'
import { toast } from '../../components/ui/Toaster'
import { Ico } from '../../components/ui/icons'
import { Modal } from '../../components/ui'
import { KPI } from '../../components/ui'
import OverviewTab from './tabs/OverviewTab'
import GeoTab from './tabs/GeoTab'
import HaccpTab from './tabs/HaccpTab'
import OpsTab from './tabs/OpsTab'
import IncidentsTab from './tabs/IncidentsTab'
import PenerimaTab from './tabs/PenerimaTab'
import JuknisTab from './tabs/JuknisTab'
import KpiTab from './tabs/KpiTab'
import LogSuhuPage from './tabs/LogSuhuPage'
import LogChecklistPage from './tabs/LogChecklistPage'
import DapurOpsPage from './tabs/DapurOpsPage'
import AIRecommendationPage from './tabs/AIRecommendationPage'

export default function ExecDashboard({ sidebarOpen, setSidebarOpen }) {
  const D = BGN_DATA
  const [tab, setTab] = useState('overview')
  const [selProv, setSelProv] = useState(null)
  const [modal, setModal] = useState(null)

  const navigate = (t) => { setTab(t); setSidebarOpen(false) }

  const titles = {
    overview:     'Executive Dashboard — Program Makan Bergizi (MBG)',
    geo:          'Sebaran Geografis — 38 Provinsi',
    haccp:        'Keamanan Pangan — Standar HACCP 7 Prinsip',
    ops:          'Operasional Dapur — Watchlist & Sensor Suhu',
    incidents:    'Kasus Aktif & Recall Tracker',
    penerima:     'Penerima Manfaat — Demografi & Sebaran',
    juknis:       'Juknis 401.1/2025 — Tata Kelola MBG',
    kpi:          'Strategic KPI — Scorecard BOD',
    logsuhu:      'Log Suhu Harian — Pemantauan Titik Kendali Kritis',
    logchecklist: 'Log Checklist Proses — Verifikasi per Tahapan Produksi',
    dapurops:     'Manajemen Dapur — Status & Kepatuhan SPPG',
    airek:        'Rekomendasi AI — Prioritas Tindakan Berbasis Data',
  }

  return (
    <div className="layout">
      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}/>}
      <aside className={`sidebar${sidebarOpen ? ' sidebar--open' : ''}`}>
        <div className="nav-group">
          <div className="label">BOD Cockpit</div>
          <button className={`nav-item ${tab === 'overview'   ? 'active' : ''}`} onClick={() => navigate('overview')}>{Ico.dashboard} Overview</button>
          <button className={`nav-item ${tab === 'geo'        ? 'active' : ''}`} onClick={() => navigate('geo')}>{Ico.map} Geographic</button>
          <button className={`nav-item ${tab === 'haccp'      ? 'active' : ''}`} onClick={() => navigate('haccp')}>{Ico.shield} HACCP & Compliance</button>
          <button className={`nav-item ${tab === 'ops'        ? 'active' : ''}`} onClick={() => navigate('ops')}>{Ico.truck} SPPG Operations</button>
          <button className={`nav-item ${tab === 'incidents'  ? 'active' : ''}`} onClick={() => navigate('incidents')}>{Ico.alert} Incidents <span className="badge">{D.kpis.incidentsOpen}</span></button>
        </div>
        <div className="nav-group">
          <div className="label">Program</div>
          <button className={`nav-item ${tab === 'penerima'   ? 'active' : ''}`} onClick={() => navigate('penerima')}>{Ico.users} Penerima Manfaat</button>
          <button className={`nav-item ${tab === 'juknis'     ? 'active' : ''}`} onClick={() => navigate('juknis')}>{Ico.doc} Juknis 401.1/2025</button>
          <button className={`nav-item ${tab === 'kpi'        ? 'active' : ''}`} onClick={() => navigate('kpi')}>{Ico.flag} Strategic KPI</button>
        </div>
        <div className="nav-group">
          <div className="label">Operasional</div>
          <button className={`nav-item ${tab === 'logsuhu'      ? 'active' : ''}`} onClick={() => navigate('logsuhu')}>{Ico.thermo} Log Suhu Harian</button>
          <button className={`nav-item ${tab === 'logchecklist' ? 'active' : ''}`} onClick={() => navigate('logchecklist')}>{Ico.shield} Log Checklist Proses</button>
        </div>
        <div className="nav-group">
          <div className="label">Manajemen</div>
          <button className={`nav-item ${tab === 'dapurops' ? 'active' : ''}`} onClick={() => navigate('dapurops')}>{Ico.truck} Manajemen Dapur</button>
          <button className={`nav-item ${tab === 'airek'    ? 'active' : ''}`} onClick={() => navigate('airek')}>{Ico.flag} Rekomendasi AI</button>
        </div>
      </aside>

      <main className="main">
        <div className="page-head">
          <div>
            <h1>{titles[tab]}</h1>
            <div className="subtitle">Snapshot operasional nasional · 27.641 dapur SPPG aktif · 31 provinsi · Update real-time setiap 60 detik · SPPG = Satuan Pelayanan Pemenuhan Gizi (dapur gizi sekolah)</div>
          </div>
          <div className="actions">
            <button className="btn" onClick={() => setModal('filter')}>{Ico.filter} Filter</button>
            <button className="btn" onClick={() => { toast('Briefing PDF dihasilkan & diunduh', 'safe') }}>{Ico.download} Briefing PDF</button>
            <button className="btn btn-primary" onClick={() => setModal('standup')}>{Ico.bell} Daily Stand-up</button>
          </div>
        </div>

        <Modal open={modal === 'filter'} onClose={() => setModal(null)} title="Filter Dashboard" w={520}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div><div style={{ fontSize: 11, color: 'var(--ink-500)', fontWeight: 700, marginBottom: 6 }}>PROVINSI</div>
              <select style={{ width: '100%', padding: '8px 12px', border: '1px solid var(--ink-200)', borderRadius: 6 }}>
                <option>Semua provinsi</option>
                {D.provinces.map(p => <option key={p.code}>{p.name}</option>)}
              </select></div>
            <div><div style={{ fontSize: 11, color: 'var(--ink-500)', fontWeight: 700, marginBottom: 6 }}>RISK LEVEL</div>
              <div style={{ display: 'flex', gap: 6 }}>
                {['Semua','Rendah','Sedang','Tinggi'].map(x => <button key={x} className="btn">{x}</button>)}
              </div></div>
            <div><div style={{ fontSize: 11, color: 'var(--ink-500)', fontWeight: 700, marginBottom: 6 }}>VOLUME</div>
              <div style={{ display: 'flex', gap: 6 }}>
                {['<1.000','1.000–2.000','>2.000'].map(x => <button key={x} className="btn">{x} porsi</button>)}
              </div></div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
              <button className="btn" onClick={() => setModal(null)}>Batal</button>
              <button className="btn btn-primary" onClick={() => { setModal(null); toast('Filter diterapkan', 'safe') }}>Terapkan</button>
            </div>
          </div>
        </Modal>

        <Modal open={modal === 'standup'} onClose={() => setModal(null)} title="Daily Stand-up · 9 Mei 2026" w={620}>
          <div style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--ink-700)' }}>
            <div style={{ background: 'var(--bgn-navy-100)', padding: 14, borderRadius: 8, marginBottom: 12 }}>
              <strong style={{ color: 'var(--bgn-navy-deep)' }}>Headline pagi ini:</strong> 71,8 jt porsi tersaji · 14 insiden aktif · 2 recall harus diputuskan hari ini.
            </div>
            <ul style={{ paddingLeft: 18 }}>
              <li><strong>Decision required</strong> — Recall batch B-2026-JB-1240 (Bogor Selatan) — 34 dilaporkan. <button className="btn" style={{ marginLeft: 6 }} onClick={() => { setModal(null); toast('Recall disetujui · BPOM dinotifikasi', 'risk') }}>Setujui Recall</button></li>
              <li>Pilot 100 SPPG Phase 1 progress: 87 dari 100 SPPG onboarded</li>
              <li>IoT rollout Q3: PO 12.000 sensor cold-chain disiapkan</li>
              <li>Roundtable sore: Kemenkes + BPOM + Kemendikdasmen 16.00 WIB</li>
            </ul>
          </div>
        </Modal>

        {/* KPI strip */}
        <div className="kpi-grid">
          <KPI label="Porsi Makanan Disajikan Hari Ini" accent="navy"
               value={`${(D.kpis.porsiToday/1e6).toFixed(1)}`} unit="jt porsi"
               delta="+4.2% vs kemarin"
               meta={`${((D.kpis.porsiToday/D.kpis.porsiTarget)*100).toFixed(1)}% dari target nasional 82,9 juta porsi`}
               spark={[42,48,51,55,60,58,62,68,71,69,72,71]}/>
          <KPI label="Dapur Gizi Aktif (SPPG)" accent="gold"
               value={D.kpis.sppgActive.toLocaleString('id-ID')} unit=""
               delta="+126 minggu ini"
               meta={`${((D.kpis.sppgActive/D.kpis.sppgTarget)*100).toFixed(0)}% dari target 35.000 dapur nasional`}
               spark={[24,25,26,26,27,27,27,27,28,27,27,28]}/>
          <KPI label="Dapur Lulus Standar Keamanan Pangan" accent="leaf"
               value={`${D.kpis.complianceRate}`} unit="%"
               delta="+1.8 poin vs minggu lalu"
               meta="Terverifikasi 7 prinsip HACCP secara digital"
               spark={[78,79,80,82,83,82,84,85,85,86,87,87]}/>
          <KPI label="Kasus Aktif Diselidiki" accent="risk"
               value={D.kpis.incidentsOpen} unit=""
               delta="-6 vs 7 hari lalu" deltaDir="down"
               meta={`${D.kpis.incidentsClosed30d} kasus selesai dalam 30 hari terakhir`}
               spark={D.incidents30d}/>
        </div>

        {/* Secondary KPIs */}
        <div className="kpi-grid" style={{ marginTop: 0 }}>
          <KPI label="Rata-rata Waktu Distribusi" accent="navy"
               value={D.kpis.avgDistMinutes} unit=" menit"
               meta="Batas aman Juknis 401.1: maks 30 menit / 6 km"/>
          <KPI label="Sampel Makanan Tersimpan" accent="leaf"
               value={D.kpis.sampleRetention} unit="%"
               meta="2 porsi per batch disimpan 3 hari — wajib Juknis"/>
          <KPI label="Batch Terlacak via QR" accent="gold"
               value={D.kpis.qrTraceability} unit="%"
               meta="Target Q3 2026: 85% · supplier→batch→sekolah"/>
          <KPI label="Dapur dengan Sensor IoT" accent="warn"
               value={D.kpis.iotCoverage} unit="%"
               meta="Cold chain, hot-holding, kendaraan"/>
        </div>

        {tab === 'overview'  && <OverviewTab D={D}/>}
        {tab === 'geo'       && <GeoTab D={D} selProv={selProv} setSelProv={setSelProv}/>}
        {tab === 'haccp'     && <HaccpTab D={D}/>}
        {tab === 'ops'       && <OpsTab D={D}/>}
        {tab === 'incidents' && <IncidentsTab D={D}/>}
        {tab === 'penerima'  && <PenerimaTab D={D}/>}
        {tab === 'juknis'    && <JuknisTab/>}
        {tab === 'kpi'       && <KpiTab D={D}/>}
        {tab === 'logsuhu'      && <LogSuhuPage D={D}/>}
        {tab === 'logchecklist' && <LogChecklistPage D={D}/>}
        {tab === 'dapurops'     && <DapurOpsPage D={D}/>}
        {tab === 'airek'        && <AIRecommendationPage D={D}/>}
      </main>
    </div>
  )
}
