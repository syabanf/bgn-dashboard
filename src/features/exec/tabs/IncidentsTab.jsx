import React from 'react'
import { Card } from '../../../components/ui'
import { BarsRow } from '../../../components/ui'

export default function IncidentsTab({ D }) {
  return (
    <div className="row-gap">
      <Card title="Kasus Aktif & Recall Tracker" subtitle={`${D.kpis.incidentsOpen} kasus terbuka (KLB = Kejadian Luar Biasa / dugaan keracunan) · ${D.kpis.incidentsClosed30d} selesai 30 hari terakhir · 0 fatality`}>
        <div className="table-wrap">
          <table className="bgn">
            <thead><tr><th>ID Kasus</th><th>Lokasi Dapur</th><th>Menu / Kode Batch</th><th>Status Penanganan</th><th>Terdampak</th><th>Batas Waktu</th></tr></thead>
            <tbody>
              <tr><td className="mono">INC-2026-0214</td><td><div className="strong">SPPG Bogor Selatan</div><div style={{ fontSize: 11, color: 'var(--ink-500)' }}>Jawa Barat</div></td><td>Sayur Lodeh · B-2026-JB-1240</td><td><span className="chip risk">Recall aktif</span></td><td>34 dilaporkan</td><td>8j tersisa</td></tr>
              <tr><td className="mono">INC-2026-0211</td><td><div className="strong">SPPG Mataram Barat</div><div style={{ fontSize: 11, color: 'var(--ink-500)' }}>NTB</div></td><td>Telur Balado · B-2026-NB-0491</td><td><span className="chip warn">Investigasi</span></td><td>12 keluhan</td><td>1d 4j</td></tr>
              <tr><td className="mono">INC-2026-0208</td><td><div className="strong">SPPG Manokwari</div><div style={{ fontSize: 11, color: 'var(--ink-500)' }}>Papua Barat</div></td><td>Ayam Goreng · B-2026-PB-0118</td><td><span className="chip warn">Lab uji</span></td><td>8 dilaporkan</td><td>2d 6j</td></tr>
              <tr><td className="mono">INC-2026-0205</td><td><div className="strong">SPPG Kupang Tengah</div><div style={{ fontSize: 11, color: 'var(--ink-500)' }}>NTT</div></td><td>Sup Sayuran · B-2026-NT-0212</td><td><span className="chip info">Korektif jalan</span></td><td>4 dilaporkan</td><td>3d 0j</td></tr>
              <tr><td className="mono">INC-2026-0202</td><td><div className="strong">SPPG Jayapura Sel.</div><div style={{ fontSize: 11, color: 'var(--ink-500)' }}>Papua</div></td><td>Ikan Cakalang · B-2026-PA-0064</td><td><span className="chip safe">Closing</span></td><td>2 dilaporkan</td><td>—</td></tr>
            </tbody>
          </table>
        </div>
      </Card>
      <div className="grid-2">
        <Card title="Tren Insiden 30 Hari"><BarsRow values={D.incidents30d} h={140}/></Card>
        <Card title="Akar Penyebab Kasus" subtitle="Distribusi penyebab dari 47 kasus selesai (30 hari)">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { n: 'Hot-holding gagal (suhu <60°C)',        v: 38, c: 'risk' },
              { n: 'Window 4 jam terlewati',                v: 22, c: 'risk' },
              { n: 'Suhu masak kurang (<70°C)',             v: 18, c: 'warn' },
              { n: 'Kontaminasi silang (bahan mentah)',     v: 12, c: 'warn' },
              { n: 'Bahan baku dari supplier tidak layak', v: 10, c: 'gold' },
            ].map((it, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                  <span style={{ color: 'var(--ink-700)', fontWeight: 600 }}>{it.n}</span>
                  <span style={{ fontWeight: 700, color: 'var(--bgn-navy-deep)' }}>{it.v}%</span>
                </div>
                <div className="bar-track"><div className={`bar-fill ${it.c}`} style={{ width: `${it.v}%` }}/></div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
