export function riskColor(r) {
  return r === 'high' ? '#C03A2B' : r === 'med' ? '#D89014' : '#2E8B57';
}

export function riskLabel(r) {
  return r === 'high' ? 'Tinggi' : r === 'med' ? 'Sedang' : 'Rendah';
}

export function colorForScore(s) {
  if (s >= 85) return '#2E8B57';
  if (s >= 70) return '#D89014';
  return '#C03A2B';
}
