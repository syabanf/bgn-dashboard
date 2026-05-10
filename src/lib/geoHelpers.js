export const PROVINCE_KOTA = {
  'JK': ['Jakarta Pusat','Jakarta Utara','Jakarta Barat','Jakarta Selatan','Jakarta Timur','Kep. Seribu'],
  'JB': ['Kota Bandung','Kab. Bandung','Kab. Bandung Barat','Kota Bekasi','Kab. Bekasi','Kota Bogor','Kab. Bogor','Kota Depok','Kab. Garut','Kab. Cirebon','Kota Cirebon','Kab. Karawang','Kab. Subang','Kab. Purwakarta','Kab. Sukabumi','Kota Sukabumi','Kab. Cianjur','Kab. Indramayu','Kab. Majalengka','Kab. Sumedang','Kab. Tasikmalaya','Kota Tasikmalaya','Kab. Kuningan'],
  'JT': ['Kota Semarang','Kab. Semarang','Kota Surakarta','Kota Magelang','Kab. Magelang','Kab. Kudus','Kab. Jepara','Kab. Demak','Kab. Grobogan','Kab. Blora','Kab. Pati','Kab. Rembang','Kab. Kendal','Kota Pekalongan','Kab. Pekalongan','Kota Tegal','Kab. Tegal','Kab. Banyumas','Kab. Cilacap','Kab. Purbalingga','Kab. Kebumen','Kab. Purworejo','Kab. Klaten','Kab. Boyolali'],
  'JI': ['Kota Surabaya','Kab. Sidoarjo','Kab. Gresik','Kota Malang','Kab. Malang','Kota Batu','Kab. Jember','Kab. Banyuwangi','Kab. Bondowoso','Kab. Probolinggo','Kota Probolinggo','Kab. Jombang','Kota Mojokerto','Kab. Lamongan','Kab. Tuban','Kab. Pasuruan','Kota Pasuruan','Kab. Kediri','Kota Kediri','Kab. Blitar','Kota Blitar','Kab. Tulungagung','Kab. Madiun','Kota Madiun'],
  'SN': ['Kota Makassar','Kab. Gowa','Kab. Maros','Kab. Bone','Kab. Wajo','Kota Parepare','Kab. Luwu','Kab. Pinrang','Kab. Barru','Kab. Selayar','Kab. Sinjai','Kab. Bulukumba','Kab. Bantaeng'],
  'BA': ['Kab. Badung','Kota Denpasar','Kab. Gianyar','Kab. Tabanan','Kab. Buleleng','Kab. Klungkung','Kab. Bangli','Kab. Karangasem','Kab. Jembrana'],
  'AC': ['Kota Banda Aceh','Kab. Aceh Besar','Kab. Pidie','Kab. Bireuen','Kab. Aceh Utara','Kota Lhokseumawe','Kab. Aceh Timur','Kota Langsa','Kab. Aceh Tengah','Kab. Aceh Barat','Kab. Aceh Selatan','Kab. Simeulue'],
  'SU': ['Kota Medan','Kab. Deli Serdang','Kota Binjai','Kab. Langkat','Kab. Serdang Bedagai','Kab. Asahan','Kota Tebing Tinggi','Kab. Labuhan Batu','Kab. Tapanuli Utara','Kab. Tapanuli Selatan','Kota Padangsidimpuan','Kab. Nias'],
};

export const KEC_WORDS  = ['Suka','Cibiru','Manda','Tegal','Kramat','Batu','Cipta','Muara','Ranca','Gede','Ciawi','Pulo','Benda','Cibodas','Karet','Cengkareng','Kemayoran','Pademangan','Penjaringan','Tambora'];
export const KEC_SFXS   = ['jadi','waras','jaya','baru','maju','damai','indah','lestari','makmur','agung','mulya','utama','sari','raya','wetan','kulon','kaler','kidul','lor'];
export const KEL_HEADS  = ['Taman','Kebun','Pasar','Kebon','Teluk','Pantai','Permai','Mekar','Harapan','Sejahtera','Maju','Bakti','Karya','Mandiri'];
export const KEL_TAILS  = ['Raya','Barat','Timur','Utara','Selatan','Tengah','Kaler','Kidul','Wetan','Kulon','Lor','Dul','Baru','Lama'];

export function seededRng(seed) {
  let s = typeof seed === 'string'
    ? seed.split('').reduce((a, c) => a + c.charCodeAt(0) * 31, 1)
    : seed;
  return () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
}

export function geoChildren(parent, level) {
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
