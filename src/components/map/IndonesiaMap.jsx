import { useRef, useEffect } from 'react'
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import XYZ from 'ol/source/XYZ'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import { fromLonLat } from 'ol/proj'
import Style from 'ol/style/Style'
import CircleStyle from 'ol/style/Circle'
import Fill from 'ol/style/Fill'
import Stroke from 'ol/style/Stroke'
import Overlay from 'ol/Overlay'

export function IndonesiaMap({ provinces, metric = 'risk', onSelect, selected, mode = 'exec',
                               drillPoints = null, onDrillDown = null }) {
  const containerRef  = useRef(null)
  const mapRef        = useRef(null)
  const vLayerRef     = useRef(null)
  const overlayRef    = useRef(null)
  const modeRef       = useRef(mode)
  const selectedRef   = useRef(selected)
  const onSelectRef   = useRef(onSelect)
  const onDrillRef    = useRef(onDrillDown)

  useEffect(() => { modeRef.current    = mode;        vLayerRef.current?.changed() }, [mode])
  useEffect(() => { selectedRef.current = selected;   vLayerRef.current?.changed() }, [selected])
  useEffect(() => { onSelectRef.current = onSelect },   [onSelect])
  useEffect(() => { onDrillRef.current  = onDrillDown }, [onDrillDown])

  const toLonLat = (p) => [p.x / 26 + 95, 6 - p.y / 26]

  const colorForP = (p, m) => {
    if (m === 'public') {
      if (p.comply >= 88) return '#2E8B57'
      if (p.comply >= 80) return '#C9A24A'
      return '#C03A2B'
    }
    return p.risk === 'high' ? '#C03A2B' : p.risk === 'med' ? '#D89014' : '#2E8B57'
  }

  const sizeForP = (p) => {
    if (p.level === 'kelurahan')  return 6 + (p.sppg > 0 ? 3 : 0)
    if (p.level === 'kecamatan')  return 7 + Math.min(1, (p.sppg || 0) / 60) * 7
    if (p.level === 'kota')       return 7 + Math.min(1, (p.sppg || 0) / 1200) * 9
    return 5 + Math.min(1, (p.sppg || 0) / 3800) * 13
  }

  // ── Init map once ───────────────────────────────────────────────────────────
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    const makeStyle = (feature) => {
      const p   = feature.get('province')
      const col = colorForP(p, modeRef.current)
      const r   = sizeForP(p)
      const sel = selectedRef.current === p.code
      return new Style({
        image: new CircleStyle({
          radius: r,
          fill:   new Fill({ color: col + 'CC' }),
          stroke: new Stroke({ color: sel ? '#FFD700' : 'rgba(255,255,255,0.85)', width: sel ? 3 : 1.5 }),
        }),
      })
    }

    const buildFeatures = (pts) => pts.map(p => {
      const coords = p.lon !== undefined ? fromLonLat([p.lon, p.lat]) : fromLonLat(toLonLat(p))
      const f = new Feature({ geometry: new Point(coords), province: p })
      f.setId(p.code)
      return f
    })

    const vSource = new VectorSource({ features: buildFeatures(provinces) })
    const vLayer  = new VectorLayer({ source: vSource, style: makeStyle })
    vLayerRef.current = vLayer

    const tipEl = document.createElement('div')
    tipEl.className = 'ol-bgn-tip'
    tipEl.style.display = 'none'
    const tooltip = new Overlay({ element: tipEl, positioning: 'bottom-left', offset: [14, -14], stopEvent: false })
    overlayRef.current = { tooltip, tipEl }

    const base = new TileLayer({
      source: new XYZ({
        url: 'https://{a-d}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
        attributions: '© <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> · © <a href="https://carto.com/attributions">CARTO</a>',
      }),
    })

    const map = new Map({
      target: containerRef.current,
      layers: [base, vLayer],
      overlays: [tooltip],
      view: new View({ center: fromLonLat([118, -2.5]), zoom: 4.5, minZoom: 3, maxZoom: 14 }),
      controls: [],
    })
    mapRef.current = map

    const LEVEL_LBL = { kota: 'Kota/Kab.', kecamatan: 'Kecamatan', kelurahan: 'Kelurahan' }

    map.on('pointermove', (e) => {
      const feat = map.forEachFeatureAtPixel(e.pixel, f => f, { hitTolerance: 6 })
      if (feat) {
        const p  = feat.get('province')
        const rc = p.risk === 'high' ? '#FF7A6E' : p.risk === 'med' ? '#FFD166' : '#6BCB77'
        const lvlRow = p.level ? `<div class="ol-tip-row"><span>${LEVEL_LBL[p.level]}</span></div>` : ''
        tipEl.innerHTML = `
          <div class="ol-tip-name">${p.name}</div>
          ${lvlRow}
          ${p.sppg ? `<div class="ol-tip-row"><span>SPPG aktif</span><b>${(p.sppg||0).toLocaleString('id-ID')}</b></div>` : ''}
          ${p.porsi ? `<div class="ol-tip-row"><span>Porsi/hari</span><b>${((p.porsi||0)/1000).toFixed(0)}K</b></div>` : ''}
          <div class="ol-tip-row"><span>Compliance</span><b>${p.comply}%</b></div>
          <div class="ol-tip-row"><span>Risiko</span><b style="color:${rc}">${(p.risk||'').toUpperCase()}</b></div>
          <div class="ol-tip-hint">Klik untuk drill-down →</div>
        `
        tipEl.style.display = 'block'
        tooltip.setPosition(e.coordinate)
        map.getTargetElement().style.cursor = 'pointer'
      } else {
        tipEl.style.display = 'none'
        tooltip.setPosition(undefined)
        map.getTargetElement().style.cursor = ''
      }
    })

    map.on('click', (e) => {
      const feat = map.forEachFeatureAtPixel(e.pixel, f => f, { hitTolerance: 6 })
      if (!feat) return
      const data = feat.get('province')
      if (onDrillRef.current) { onDrillRef.current(data) }
      else if (onSelectRef.current) { onSelectRef.current(feat.getId()) }
    })

    return () => { map.setTarget(null); mapRef.current = null; vLayerRef.current = null }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // ── Update features when drillPoints changes ────────────────────────────────
  useEffect(() => {
    if (!mapRef.current || !vLayerRef.current) return
    const source = vLayerRef.current.getSource()
    source.clear()
    const pts = drillPoints || provinces
    pts.forEach(p => {
      const coords = p.lon !== undefined ? fromLonLat([p.lon, p.lat]) : fromLonLat([p.x / 26 + 95, 6 - p.y / 26])
      const f = new Feature({ geometry: new Point(coords), province: p })
      f.setId(p.code)
      source.addFeature(f)
    })
    vLayerRef.current.changed()
    const ext = source.getExtent()
    if (ext && isFinite(ext[0])) {
      const maxZ = drillPoints ? (drillPoints[0]?.level === 'kota' ? 8 : drillPoints[0]?.level === 'kecamatan' ? 11 : 13) : 5
      mapRef.current.getView().fit(ext, { padding: [60, 60, 60, 60], duration: 600, maxZoom: maxZ })
    }
  }, [drillPoints]) // eslint-disable-line react-hooks/exhaustive-deps

  // ── Legend ──────────────────────────────────────────────────────────────────
  const legendItems = mode === 'public'
    ? [['#2E8B57','Aman ≥88%'],['#C9A24A','Watchlist 80–87%'],['#C03A2B','Prioritas <80%']]
    : [['#2E8B57','Risiko Rendah'],['#D89014','Risiko Sedang'],['#C03A2B','Risiko Tinggi']]

  return (
    <div className="map-wrap" style={{ position: 'relative' }}>
      <div ref={containerRef} style={{ width: '100%', height: 430, borderRadius: 'var(--r-md)' }}/>
      <div className="map-legend">
        <div style={{ fontWeight: 700, color: 'var(--ink-900)', marginBottom: 6, fontSize: 11 }}>
          {mode === 'public' ? 'Compliance Pangan' : 'Level Risiko Operasional'}
        </div>
        {legendItems.map(([c, l]) => (
          <div className="row" key={l}><span className="swatch" style={{ background: c }}/> {l}</div>
        ))}
        <div className="row" style={{ marginTop: 8, paddingTop: 6, borderTop: '1px solid var(--ink-100)', opacity: 0.65, fontSize: 10.5 }}>
          Ukuran lingkaran = volume porsi/hari
        </div>
      </div>
    </div>
  )
}
