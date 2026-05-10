// Shared React components — BGN dashboards

const { useState, useEffect, useMemo, useRef } = React;

// ---------- Icons (inline SVG) ----------
const Ico = {
  dashboard: <svg className="ico" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/></svg>,
  map: <svg className="ico" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2z"/><path d="M9 4v14M15 6v14"/></svg>,
  shield: <svg className="ico" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3z"/><path d="m9 12 2 2 4-4"/></svg>,
  alert: <svg className="ico" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3 2 21h20L12 3z"/><path d="M12 10v5M12 18h.01"/></svg>,
  chart: <svg className="ico" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18"/><path d="M7 14l3-3 3 3 5-6"/></svg>,
  thermo: <svg className="ico" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 4a2.5 2.5 0 0 0-2.5 2.5v8.5a4 4 0 1 0 5 0V6.5A2.5 2.5 0 0 0 12 4z"/><path d="M12 9v6.5"/></svg>,
  qr: <svg className="ico" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3M21 14v7M14 21h3M17 17h4"/></svg>,
  truck: <svg className="ico" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 7h11v9H3zM14 10h4l3 3v3h-7"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>,
  doc: <svg className="ico" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h6"/></svg>,
  users: <svg className="ico" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="9" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><circle cx="17" cy="8" r="2.5"/><path d="M21.5 18a4.5 4.5 0 0 0-6-4.2"/></svg>,
  flag: <svg className="ico" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 21V4M5 4h12l-2 4 2 4H5"/></svg>,
  search: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>,
  download: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 4v12m0 0 4-4m-4 4-4-4M4 20h16"/></svg>,
  arrowUp: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 19V5m0 0-6 6m6-6 6 6"/></svg>,
  arrowDown: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 5v14m0 0-6-6m6 6 6-6"/></svg>,
  check: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="m5 12 5 5L20 7"/></svg>,
  x: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M6 6l12 12M18 6 6 18"/></svg>,
  filter: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 5h18l-7 9v6l-4-2v-4L3 5z"/></svg>,
  bell: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 8a6 6 0 1 1 12 0c0 7 3 8 3 8H3s3-1 3-8z"/><path d="M10 21a2 2 0 0 0 4 0"/></svg>,
};

// ---------- KPI Tile ----------
function KPI({ label, value, unit, delta, deltaDir = 'up', meta, accent = 'navy', spark }) {
  return (
    <div className={`kpi ${accent}`}>
      <div className="label">{label}</div>
      <div className="value">{value}{unit && <span className="unit">{unit}</span>}</div>
      {delta && (
        <div className={`delta ${deltaDir === 'down' ? 'down' : ''}`}>
          {deltaDir === 'down' ? Ico.arrowDown : Ico.arrowUp}
          <span>{delta}</span>
        </div>
      )}
      {meta && <div className="meta">{meta}</div>}
      {spark && <Sparkline points={spark} className="spark" />}
    </div>
  );
}

// ---------- Sparkline ----------
function Sparkline({ points, className, color = 'var(--bgn-navy-500)', fill = true, w = 90, h = 32 }) {
  if (!points || !points.length) return null;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;
  const step = w / (points.length - 1);
  const ys = points.map((p, i) => [i * step, h - 3 - ((p - min) / range) * (h - 6)]);
  const d = ys.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
  const fillD = `${d} L ${w},${h} L 0,${h} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={className} preserveAspectRatio="none">
      {fill && <path d={fillD} fill={color} opacity="0.13"/>}
      <path d={d} fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// ---------- Card primitive ----------
function Card({ title, subtitle, tools, children, padded = true, className = '' }) {
  return (
    <div className={`card ${className}`}>
      {(title || tools) && (
        <div className="card-head">
          <div>
            {title && <div className="card-title">{title}</div>}
            {subtitle && <div className="card-sub">{subtitle}</div>}
          </div>
          {tools && <div className="card-tools">{tools}</div>}
        </div>
      )}
      <div className={padded ? 'card-pad' : ''}>{children}</div>
    </div>
  );
}

// ---------- Risk color helper ----------
const riskColor = (r) => r === 'high' ? '#C03A2B' : r === 'med' ? '#D89014' : '#2E8B57';
const riskLabel = (r) => r === 'high' ? 'Tinggi' : r === 'med' ? 'Sedang' : 'Rendah';

// ---------- Indonesia map — OpenLayers ----------
// ── Hierarchy data generators ─────────────────────────────────────────────
function seededRng(seed) {
  let s = typeof seed === 'string'
    ? seed.split('').reduce((a, c) => a + c.charCodeAt(0) * 31, 1)
    : seed;
  return () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
}

const PROVINCE_KOTA = {
  'JK': ['Jakarta Pusat','Jakarta Utara','Jakarta Barat','Jakarta Selatan','Jakarta Timur','Kep. Seribu'],
  'JB': ['Kota Bandung','Kab. Bandung','Kab. Bandung Barat','Kota Bekasi','Kab. Bekasi','Kota Bogor','Kab. Bogor','Kota Depok','Kab. Garut','Kab. Cirebon','Kota Cirebon','Kab. Karawang','Kab. Subang','Kab. Purwakarta','Kab. Sukabumi','Kota Sukabumi','Kab. Cianjur','Kab. Indramayu','Kab. Majalengka','Kab. Sumedang','Kab. Tasikmalaya','Kota Tasikmalaya','Kab. Kuningan'],
  'JT': ['Kota Semarang','Kab. Semarang','Kota Surakarta','Kota Magelang','Kab. Magelang','Kab. Kudus','Kab. Jepara','Kab. Demak','Kab. Grobogan','Kab. Blora','Kab. Pati','Kab. Rembang','Kab. Kendal','Kota Pekalongan','Kab. Pekalongan','Kota Tegal','Kab. Tegal','Kab. Banyumas','Kab. Cilacap','Kab. Purbalingga','Kab. Kebumen','Kab. Purworejo','Kab. Klaten','Kab. Boyolali'],
  'JI': ['Kota Surabaya','Kab. Sidoarjo','Kab. Gresik','Kota Malang','Kab. Malang','Kota Batu','Kab. Jember','Kab. Banyuwangi','Kab. Bondowoso','Kab. Probolinggo','Kota Probolinggo','Kab. Jombang','Kota Mojokerto','Kab. Lamongan','Kab. Tuban','Kab. Pasuruan','Kota Pasuruan','Kab. Kediri','Kota Kediri','Kab. Blitar','Kota Blitar','Kab. Tulungagung','Kab. Madiun','Kota Madiun'],
  'SN': ['Kota Makassar','Kab. Gowa','Kab. Maros','Kab. Bone','Kab. Wajo','Kota Parepare','Kab. Luwu','Kab. Pinrang','Kab. Barru','Kab. Selayar','Kab. Sinjai','Kab. Bulukumba','Kab. Bantaeng'],
  'BA': ['Kab. Badung','Kota Denpasar','Kab. Gianyar','Kab. Tabanan','Kab. Buleleng','Kab. Klungkung','Kab. Bangli','Kab. Karangasem','Kab. Jembrana'],
  'AC': ['Kota Banda Aceh','Kab. Aceh Besar','Kab. Pidie','Kab. Bireuen','Kab. Aceh Utara','Kota Lhokseumawe','Kab. Aceh Timur','Kota Langsa','Kab. Aceh Tengah','Kab. Aceh Barat','Kab. Aceh Selatan','Kab. Simeulue'],
  'SU': ['Kota Medan','Kab. Deli Serdang','Kota Binjai','Kab. Langkat','Kab. Serdang Bedagai','Kab. Asahan','Kota Tebing Tinggi','Kab. Labuhan Batu','Kab. Tapanuli Utara','Kab. Tapanuli Selatan','Kota Padangsidimpuan','Kab. Nias'],
};
const KEC_WORDS  = ['Suka','Cibiru','Manda','Tegal','Kramat','Batu','Cipta','Muara','Ranca','Gede','Ciawi','Pulo','Benda','Cibodas','Karet','Cengkareng','Kemayoran','Pademangan','Penjaringan','Tambora'];
const KEC_SFXS   = ['jadi','waras','jaya','baru','maju','damai','indah','lestari','makmur','agung','mulya','utama','sari','raya','wetan','kulon','kaler','kidul','lor'];
const KEL_HEADS  = ['Taman','Kebun','Pasar','Kebon','Teluk','Pantai','Permai','Mekar','Harapan','Sejahtera','Maju','Bakti','Karya','Mandiri'];
const KEL_TAILS  = ['Raya','Barat','Timur','Utara','Selatan','Tengah','Kaler','Kidul','Wetan','Kulon','Lor','Dul','Baru','Lama'];

function geoChildren(parent, level) {
  const rng = seededRng(parent.code);
  const parentLon = parent.lon !== undefined ? parent.lon : (parent.x / 26 + 95);
  const parentLat = parent.lat !== undefined ? parent.lat : (6 - parent.y / 26);
  let names, spread, countBase;
  if (level === 'kota') {
    names = PROVINCE_KOTA[parent.code] || Array.from({ length: 8 }, (_, i) => `Kab. ${parent.name.split(' ')[0]} ${i + 1}`);
    spread = 1.4; countBase = names.length;
  } else if (level === 'kecamatan') {
    countBase = 9 + Math.floor(rng() * 7);
    names = Array.from({ length: countBase }, () => `Kec. ${KEC_WORDS[Math.floor(rng()*KEC_WORDS.length)]}${KEC_SFXS[Math.floor(rng()*KEC_SFXS.length)]}`);
    spread = 0.35;
  } else {
    countBase = 6 + Math.floor(rng() * 5);
    names = Array.from({ length: countBase }, () => `Kel. ${KEL_HEADS[Math.floor(rng()*KEL_HEADS.length)]} ${KEL_TAILS[Math.floor(rng()*KEL_TAILS.length)]}`);
    spread = 0.09;
  }
  return names.map((name, i) => {
    const angle = (2 * Math.PI * i) / names.length + rng() * 0.4;
    const r = spread * (0.25 + 0.75 * rng());
    const comply = Math.max(55, Math.min(99, Math.round((parent.comply || 80) + (rng() - 0.5) * 18)));
    const sppgBase = level === 'kota' ? Math.round((parent.sppg || 200) / names.length) :
                     level === 'kecamatan' ? Math.round((parent.sppg || 30) / names.length) :
                     Math.max(0, Math.round((parent.sppg || 5) / names.length * (0.4 + 0.9 * rng())));
    return {
      code: `${parent.code}-${level[0].toUpperCase()}${i.toString().padStart(2, '0')}`,
      name, level,
      parent: parent.code,
      lon: parentLon + r * Math.cos(angle),
      lat: parentLat + r * Math.sin(angle),
      sppg: Math.max(level === 'kelurahan' ? 0 : 1, Math.round(sppgBase * (0.5 + rng()))),
      comply,
      risk: comply >= 88 ? 'low' : comply >= 78 ? 'med' : 'high',
      porsi: Math.round(sppgBase * (0.5 + rng()) * 2500),
    };
  });
}
window.geoChildren = geoChildren; // expose for GeoTab

function IndonesiaMap({ provinces, metric = 'risk', onSelect, selected, mode = 'exec',
                        drillPoints = null, onDrillDown = null }) {
  const containerRef  = useRef(null);
  const mapRef        = useRef(null);
  const vLayerRef     = useRef(null);
  const overlayRef    = useRef(null);
  const modeRef       = useRef(mode);
  const selectedRef   = useRef(selected);
  const onSelectRef   = useRef(onSelect);
  const onDrillRef    = useRef(onDrillDown);

  useEffect(() => { modeRef.current    = mode;        vLayerRef.current?.changed(); }, [mode]);
  useEffect(() => { selectedRef.current = selected;   vLayerRef.current?.changed(); }, [selected]);
  useEffect(() => { onSelectRef.current = onSelect; },   [onSelect]);
  useEffect(() => { onDrillRef.current  = onDrillDown; }, [onDrillDown]);

  const toLonLat = (p) => [p.x / 26 + 95, 6 - p.y / 26];

  const colorForP = (p, m) => {
    if (m === 'public') {
      if (p.comply >= 88) return '#2E8B57';
      if (p.comply >= 80) return '#C9A24A';
      return '#C03A2B';
    }
    return p.risk === 'high' ? '#C03A2B' : p.risk === 'med' ? '#D89014' : '#2E8B57';
  };

  const sizeForP = (p) => {
    if (p.level === 'kelurahan')  return 6 + (p.sppg > 0 ? 3 : 0);
    if (p.level === 'kecamatan')  return 7 + Math.min(1, (p.sppg || 0) / 60) * 7;
    if (p.level === 'kota')       return 7 + Math.min(1, (p.sppg || 0) / 1200) * 9;
    return 5 + Math.min(1, (p.sppg || 0) / 3800) * 13;
  };

  // ── Init map once ───────────────────────────────────────────────────────────
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    const OL = window.ol;
    if (!OL) { console.error('OpenLayers not loaded'); return; }

    const { Map, View, Feature, Overlay,
            layer:  { Tile: TileLayer, Vector: VectorLayer },
            source: { XYZ, Vector: VectorSource },
            geom:   { Point },
            style:  { Style, Circle: CircleStyle, Fill, Stroke },
            proj:   { fromLonLat } } = OL;

    const makeStyle = (feature) => {
      const p   = feature.get('province');
      const col = colorForP(p, modeRef.current);
      const r   = sizeForP(p);
      const sel = selectedRef.current === p.code;
      return new Style({
        image: new CircleStyle({
          radius: r,
          fill:   new Fill({ color: col + 'CC' }),
          stroke: new Stroke({ color: sel ? '#FFD700' : 'rgba(255,255,255,0.85)', width: sel ? 3 : 1.5 }),
        }),
      });
    };

    const buildFeatures = (pts) => pts.map(p => {
      const coords = p.lon !== undefined ? fromLonLat([p.lon, p.lat]) : fromLonLat(toLonLat(p));
      const f = new Feature({ geometry: new Point(coords), province: p });
      f.setId(p.code);
      return f;
    });

    const vSource = new VectorSource({ features: buildFeatures(provinces) });
    const vLayer  = new VectorLayer({ source: vSource, style: makeStyle });
    vLayerRef.current = vLayer;

    const tipEl = document.createElement('div');
    tipEl.className = 'ol-bgn-tip';
    tipEl.style.display = 'none';
    const tooltip = new Overlay({ element: tipEl, positioning: 'bottom-left', offset: [14, -14], stopEvent: false });
    overlayRef.current = { tooltip, tipEl };

    const base = new TileLayer({
      source: new XYZ({
        url: 'https://{a-d}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
        attributions: '© <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> · © <a href="https://carto.com/attributions">CARTO</a>',
      }),
    });

    const map = new Map({
      target: containerRef.current,
      layers: [base, vLayer],
      overlays: [tooltip],
      view: new View({ center: fromLonLat([118, -2.5]), zoom: 4.5, minZoom: 3, maxZoom: 14 }),
      controls: [],
    });
    mapRef.current = map;

    const LEVEL_LBL = { kota: 'Kota/Kab.', kecamatan: 'Kecamatan', kelurahan: 'Kelurahan' };

    map.on('pointermove', (e) => {
      const feat = map.forEachFeatureAtPixel(e.pixel, f => f, { hitTolerance: 6 });
      if (feat) {
        const p  = feat.get('province');
        const rc = p.risk === 'high' ? '#FF7A6E' : p.risk === 'med' ? '#FFD166' : '#6BCB77';
        const lvlRow = p.level ? `<div class="ol-tip-row"><span>${LEVEL_LBL[p.level]}</span></div>` : '';
        tipEl.innerHTML = `
          <div class="ol-tip-name">${p.name}</div>
          ${lvlRow}
          ${p.sppg ? `<div class="ol-tip-row"><span>SPPG aktif</span><b>${(p.sppg||0).toLocaleString('id-ID')}</b></div>` : ''}
          ${p.porsi ? `<div class="ol-tip-row"><span>Porsi/hari</span><b>${((p.porsi||0)/1000).toFixed(0)}K</b></div>` : ''}
          <div class="ol-tip-row"><span>Compliance</span><b>${p.comply}%</b></div>
          <div class="ol-tip-row"><span>Risiko</span><b style="color:${rc}">${(p.risk||'').toUpperCase()}</b></div>
          <div class="ol-tip-hint">Klik untuk drill-down →</div>
        `;
        tipEl.style.display = 'block';
        tooltip.setPosition(e.coordinate);
        map.getTargetElement().style.cursor = 'pointer';
      } else {
        tipEl.style.display = 'none';
        tooltip.setPosition(undefined);
        map.getTargetElement().style.cursor = '';
      }
    });

    map.on('click', (e) => {
      const feat = map.forEachFeatureAtPixel(e.pixel, f => f, { hitTolerance: 6 });
      if (!feat) return;
      const data = feat.get('province');
      if (onDrillRef.current) { onDrillRef.current(data); }
      else if (onSelectRef.current) { onSelectRef.current(feat.getId()); }
    });

    return () => { map.setTarget(null); mapRef.current = null; vLayerRef.current = null; };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Update features when drillPoints changes ────────────────────────────────
  useEffect(() => {
    if (!mapRef.current || !vLayerRef.current) return;
    const OL = window.ol;
    const { Feature, proj: { fromLonLat }, geom: { Point } } = OL;
    const source = vLayerRef.current.getSource();
    source.clear();
    const pts = drillPoints || provinces;
    pts.forEach(p => {
      const coords = p.lon !== undefined ? fromLonLat([p.lon, p.lat]) : fromLonLat([p.x / 26 + 95, 6 - p.y / 26]);
      const f = new Feature({ geometry: new Point(coords), province: p });
      f.setId(p.code);
      source.addFeature(f);
    });
    vLayerRef.current.changed();
    const ext = source.getExtent();
    if (ext && isFinite(ext[0])) {
      const maxZ = drillPoints ? (drillPoints[0]?.level === 'kota' ? 8 : drillPoints[0]?.level === 'kecamatan' ? 11 : 13) : 5;
      mapRef.current.getView().fit(ext, { padding: [60, 60, 60, 60], duration: 600, maxZoom: maxZ });
    }
  }, [drillPoints]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Legend ──────────────────────────────────────────────────────────────────
  const legendItems = mode === 'public'
    ? [['#2E8B57','Aman ≥88%'],['#C9A24A','Watchlist 80–87%'],['#C03A2B','Prioritas <80%']]
    : [['#2E8B57','Risiko Rendah'],['#D89014','Risiko Sedang'],['#C03A2B','Risiko Tinggi']];

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
  );
}

// ---------- Top bar ----------
function TopBar({ role, setRole }) {
  const [now, setNow] = useState(new Date(2026, 4, 9, 19, 4, 22));
  useEffect(() => {
    const t = setInterval(() => setNow(d => new Date(d.getTime() + 1000)), 1000);
    return () => clearInterval(t);
  }, []);
  const fmt = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const date = now.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="topbar">
      <div className="brand">
        <img src="assets/bgn-logo.png" alt="BGN"/>
        <div className="brand-text">
          <div className="t1">Badan Gizi Nasional</div>
          <div className="t2">Sistem Dashboard MBG</div>
        </div>
      </div>
      <div className="role-toggle">
        <button className={role === 'exec' ? 'active' : ''} onClick={() => setRole('exec')}>
          <span className="dot"/>Executive (BOD)
        </button>
        <button className={role === 'public' ? 'active' : ''} onClick={() => setRole('public')}>
          <span className="dot"/>Publik
        </button>
      </div>
      <div className="spacer"/>
      <div className="meta">
        <div className="pill"><span className="pulse"/>LIVE · WIB</div>
        <div>
          <div style={{ fontSize: 10, opacity: 0.7, letterSpacing: '0.06em' }}>{date.toUpperCase()}</div>
          <div className="clock">{fmt}</div>
        </div>
      </div>
      {role === 'exec' && (
        <div className="user-chip">
          <span className="avatar">DR</span>
          <div>
            <div style={{ fontWeight: 600 }}>Dr. Dadan Hindayana</div>
            <div style={{ opacity: 0.6, fontSize: 10 }}>Kepala BGN · BOD View</div>
          </div>
        </div>
      )}
    </div>
  );
}

// ---------- Toast ----------
function Toaster() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    window.toast = (msg, kind = 'info') => {
      const id = Math.random().toString(36).slice(2);
      setItems(s => [...s, { id, msg, kind }]);
      setTimeout(() => setItems(s => s.filter(x => x.id !== id)), 3500);
    };
  }, []);
  return (
    <div style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 9999, display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 360 }}>
      {items.map(t => (
        <div key={t.id} style={{
          background: t.kind === 'safe' ? '#176B3F' : t.kind === 'warn' ? '#8E5800' : t.kind === 'risk' ? '#8B1F15' : '#0E2A5C',
          color: '#fff', padding: '10px 14px', borderRadius: 8, fontSize: 12.5,
          boxShadow: '0 8px 24px rgba(14,42,92,0.25)', display: 'flex', alignItems: 'center', gap: 8,
          animation: 'slideIn 0.2s ease',
        }}>
          <span style={{ fontSize: 16 }}>{t.kind === 'safe' ? '✓' : t.kind === 'warn' ? '⚠' : t.kind === 'risk' ? '!' : 'i'}</span>
          {t.msg}
        </div>
      ))}
    </div>
  );
}

// Modal
function Modal({ open, onClose, title, children, w = 600 }) {
  if (!open) return null;
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(8,24,58,0.55)', zIndex: 9000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }} onClick={onClose}>
      <div style={{ background: '#fff', borderRadius: 12, maxWidth: w, width: '100%', maxHeight: '85vh', overflowY: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 22px', borderBottom: '1px solid var(--ink-100)' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 17, color: 'var(--bgn-navy-deep)' }}>{title}</div>
          <button className="iconbtn" onClick={onClose}>{Ico.x}</button>
        </div>
        <div style={{ padding: 22 }}>{children}</div>
      </div>
    </div>
  );
}

// Export
Object.assign(window, { Ico, KPI, Sparkline, Card, IndonesiaMap, TopBar, riskColor, riskLabel, Toaster, Modal });
