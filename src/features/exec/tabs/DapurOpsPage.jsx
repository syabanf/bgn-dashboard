import React, { useState } from 'react'
import { Card, KPI, Modal } from '../../../components/ui'
import { toast } from '../../../components/ui/Toaster'
import { DAPUR_INIT } from '../constants'

export default function DapurOpsPage({ D }) {
  const [kitchens, setKitchens] = useState(DAPUR_INIT)
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterRisk, setFilterRisk] = useState('all')
  const [confirmModal, setConfirmModal] = useState(null)
  const [searchQ, setSearchQ] = useState('')

  const filtered = kitchens.filter(k => {
    if (filterStatus !== 'all' && k.status !== filterStatus) return false
    if (filterRisk !== 'all' && k.risk !== filterRisk) return false
    if (searchQ && !k.name.toLowerCase().includes(searchQ.toLowerCase()) && !k.prov.toLowerCase().includes(searchQ.toLowerCase())) return false
    return true
  })

  const doAction = (kitchen, action) => {
    setKitchens(prev => prev.map(k => k.id === kitchen.id ? { ...k, status: action === 'suspend' ? 'suspended' : 'active' } : k))
    toast(`${kitchen.name}: ${action === 'suspend' ? 'Ditangguhkan' : 'Diaktifkan kembali'}`, action === 'suspend' ? 'risk' : 'safe')
    setConfirmModal(null)
  }

  const kpis = {
    total: kitchens.length,
    active: kitchens.filter(k => k.status === 'active').length,
    suspended: kitchens.filter(k => k.status === 'suspended').length,
    highRisk: kitchens.filter(k => k.risk === 'high').length,
    avgComply: Math.round(kitchens.reduce((s, k) => s + k.comply, 0) / kitchens.length),
  }

  return (
    <div className="row-gap">
      <div className="kpi-grid" style={{ marginTop: 0 }}>
        <KPI label="Dapur Terdaftar" accent="navy" value={kpis.total} unit="" meta="Total SPPG dalam sistem"/>
        <KPI label="Aktif Beroperasi" accent="leaf" value={kpis.active} unit="" meta="Sinkronisasi data berjalan"/>
        <KPI label="Ditangguhkan" accent="risk" value={kpis.suspended} unit="" meta="Menunggu tindakan korektif"/>
        <KPI label="Avg Compliance" accent="gold" value={`${kpis.avgComply}%`} unit="" meta="Rata-rata skor HACCP"/>
      </div>

      <Card title="Manajemen Dapur SPPG" subtitle="Status sinkronisasi dari IoT, QR Traceability, dan sistem BPOM · Klik aksi untuk suspend/aktifkan dapur">
        <div style={{ display: 'flex', gap: 10, marginBottom: 14, flexWrap: 'wrap', alignItems: 'center' }}>
          <input
            placeholder="Cari nama dapur atau provinsi…"
            value={searchQ}
            onChange={e => setSearchQ(e.target.value)}
            style={{ flex: 1, minWidth: 200, padding: '7px 12px', border: '1px solid var(--ink-200)', borderRadius: 6, fontSize: 13 }}
          />
          <div style={{ display: 'flex', gap: 4 }}>
            {['all','active','suspended'].map(v => (
              <button key={v} className={`btn ${filterStatus === v ? 'btn-primary' : ''}`}
                      style={{ fontSize: 12, padding: '5px 10px' }}
                      onClick={() => setFilterStatus(v)}>
                {v === 'all' ? 'Semua' : v === 'active' ? 'Aktif' : 'Ditangguhkan'}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            {['all','high','med','low'].map(v => (
              <button key={v} className={`btn ${filterRisk === v ? 'btn-primary' : ''}`}
                      style={{ fontSize: 12, padding: '5px 10px' }}
                      onClick={() => setFilterRisk(v)}>
                {v === 'all' ? 'Semua Risk' : v === 'high' ? 'Tinggi' : v === 'med' ? 'Sedang' : 'Rendah'}
              </button>
            ))}
          </div>
        </div>

        <div className="table-wrap">
          <table className="bgn">
            <thead>
              <tr>
                <th>ID Dapur</th>
                <th>Nama & Lokasi</th>
                <th>Porsi/Hari</th>
                <th>Compliance</th>
                <th>HACCP Gate</th>
                <th>Sinkronisasi App</th>
                <th>Sync Terakhir</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(k => (
                <tr key={k.id}>
                  <td><span className="mono" style={{ fontSize: 11 }}>{k.id}</span></td>
                  <td>
                    <div className="strong">{k.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--ink-500)' }}>{k.prov}</div>
                  </td>
                  <td style={{ textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{k.porsi.toLocaleString('id-ID')}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div className="bar-track" style={{ width: 48 }}>
                        <div className={`bar-fill ${k.comply >= 85 ? 'safe' : k.comply >= 70 ? 'gold' : 'risk'}`} style={{ width: `${k.comply}%` }}/>
                      </div>
                      <span className="strong" style={{ fontSize: 12, color: k.comply >= 85 ? 'var(--status-safe)' : k.comply >= 70 ? '#9E7700' : 'var(--status-risk)' }}>{k.comply}%</span>
                    </div>
                  </td>
                  <td><span className={`chip ${k.haccp === 'A' ? 'safe' : k.haccp === 'B' ? 'gold' : 'risk'}`}>Gate {k.haccp}</span></td>
                  <td>
                    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                      {['IoT','QR','BPOM'].map(app => (
                        <span key={app} className={`chip ${k.apps.includes(app) ? 'safe' : 'risk'}`} style={{ fontSize: 10 }}>
                          {k.apps.includes(app) ? '✓' : '✗'} {app}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td style={{ fontSize: 11, color: k.lastSync.includes('jam') ? 'var(--status-risk)' : 'var(--ink-600)' }}>
                    {k.lastSync}
                  </td>
                  <td>
                    <span className={`chip ${k.status === 'active' ? 'safe' : 'risk'}`}>
                      <span className="dot"/>
                      {k.status === 'active' ? 'Aktif' : 'Ditangguhkan'}
                    </span>
                  </td>
                  <td>
                    {k.status === 'active' ? (
                      <button className="btn" style={{ fontSize: 11, padding: '4px 8px', borderColor: 'var(--status-risk)', color: 'var(--status-risk)' }}
                              onClick={() => setConfirmModal({ kitchen: k, action: 'suspend' })}>
                        Tangguhkan
                      </button>
                    ) : (
                      <button className="btn btn-primary" style={{ fontSize: 11, padding: '4px 8px' }}
                              onClick={() => setConfirmModal({ kitchen: k, action: 'activate' })}>
                        Aktifkan
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: 32, color: 'var(--ink-400)', fontSize: 13 }}>Tidak ada dapur yang sesuai filter.</div>
        )}
      </Card>

      <Modal open={!!confirmModal} onClose={() => setConfirmModal(null)}
             title={confirmModal?.action === 'suspend' ? 'Konfirmasi Penangguhan Dapur' : 'Konfirmasi Aktivasi Dapur'}
             w={480}>
        {confirmModal && (
          <div style={{ fontSize: 13, lineHeight: 1.6 }}>
            <div style={{ background: confirmModal.action === 'suspend' ? 'var(--status-risk-soft)' : 'var(--status-safe-soft)', padding: 14, borderRadius: 8, marginBottom: 14 }}>
              <strong>{confirmModal.kitchen.name}</strong><br/>
              {confirmModal.action === 'suspend'
                ? `Compliance saat ini: ${confirmModal.kitchen.comply}% (${confirmModal.kitchen.haccp === 'C' ? 'HACCP Gate C – tidak lulus standar keamanan pangan minimum' : 'pelanggaran terdeteksi'}). Penangguhan akan menghentikan operasional sementara hingga korektif selesai.`
                : `Compliance saat ini: ${confirmModal.kitchen.comply}%. Pastikan tindakan korektif telah selesai sebelum mengaktifkan kembali.`
              }
            </div>
            <div style={{ color: 'var(--ink-700)' }}>
              <strong>Konsekuensi:</strong>
              <ul style={{ paddingLeft: 18, marginTop: 6 }}>
                {confirmModal.action === 'suspend' ? (
                  <>
                    <li>Distribusi porsi ke {confirmModal.kitchen.porsi.toLocaleString('id-ID')} penerima terhenti</li>
                    <li>BPOM & Dinas Pendidikan dinotifikasi otomatis</li>
                    <li>Dapur masuk watchlist audit darurat</li>
                  </>
                ) : (
                  <>
                    <li>Operasional dan distribusi dapat dilanjutkan</li>
                    <li>Monitoring diperkuat 7 hari pertama pasca-aktivasi</li>
                    <li>Laporan aktivasi dikirim ke supervisor wilayah</li>
                  </>
                )}
              </ul>
            </div>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 16 }}>
              <button className="btn" onClick={() => setConfirmModal(null)}>Batal</button>
              <button
                className={`btn ${confirmModal.action === 'suspend' ? '' : 'btn-primary'}`}
                style={confirmModal.action === 'suspend' ? { background: 'var(--status-risk)', color: '#fff', border: 'none' } : {}}
                onClick={() => doAction(confirmModal.kitchen, confirmModal.action)}>
                {confirmModal.action === 'suspend' ? 'Ya, Tangguhkan' : 'Ya, Aktifkan Kembali'}
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
