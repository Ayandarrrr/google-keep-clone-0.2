// Manual, no-AI feature: colour-coding notes.
// A small fixed palette (modelled on the real Keep swatches) that every
// note can be tagged with. Stored as an id on the note object so the
// hex value can change per-theme without touching saved data.
export const COLORS = [
  { id: 'default', name: 'Default', hex: '#ffffff', dark: '#202124' },
  { id: 'coral', name: 'Coral', hex: '#faafa8', dark: '#5c2b29' },
  { id: 'peach', name: 'Peach', hex: '#f39f76', dark: '#5c3921' },
  { id: 'sand', name: 'Sand', hex: '#fff8b8', dark: '#5c5324' },
  { id: 'mint', name: 'Mint', hex: '#e2f6d3', dark: '#345920' },
  { id: 'sage', name: 'Sage', hex: '#b4ddd3', dark: '#16594e' },
  { id: 'fog', name: 'Fog', hex: '#d4e4ed', dark: '#2d555f' },
  { id: 'storm', name: 'Storm', hex: '#aeccdc', dark: '#1e3c48' },
  { id: 'dusk', name: 'Dusk', hex: '#d3bfdb', dark: '#42275e' },
  { id: 'blossom', name: 'Blossom', hex: '#f6e2dd', dark: '#5b2245' },
]

export function colorHex(id, isDark) {
  const c = COLORS.find((c) => c.id === id) || COLORS[0]
  return isDark ? c.dark : c.hex
}
