// 테마: 키 컬러 하나에서 덱이 쓰는 색 토큰을 모두 계산한다. 주제에 맞는 키 컬러(회사, 서비스 브랜드 색)를 넣으면 된다.
// theme = 'blue' 같은 프리셋 이름, 또는 { accent:'#hex', grad?:[3색], hi?:'#hex', ours?:'#hex' }
export const PRESETS = {
  blue:   { accent: '#2277f0', grad: ['#1557c4', '#2277f0', '#4b9bff'], hi: '#ffe58a' },
  violet: { accent: '#8935bd', grad: ['#c362ff', '#a77cff', '#6aa5ff'], hi: '#e1ffaf' },
  teal:   { accent: '#0b7f77', grad: ['#065f5a', '#0b7f77', '#2bb3a3'], hi: '#ffe08a' },
  green:  { accent: '#12873e', grad: ['#0b6b30', '#12873e', '#3fbf6a'], hi: '#fff3a0' },
  orange: { accent: '#d9480f', grad: ['#b83a0a', '#e8590c', '#ff922b'], hi: '#fff0b3' },
  mono:   { accent: '#1f2329', grad: ['#0d0f12', '#2b3038', '#4a525e'], hi: '#ffe066' },
}

const hex2hsl = h => {
  const [r, g, b] = [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16) / 255)
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2, d = mx - mn
  if (!d) return [0, 0, l * 100]
  const s = d / (1 - Math.abs(2 * l - 1))
  const hh = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4
  return [(hh * 60 + 360) % 360, s * 100, l * 100]
}
const hsl = (h, s, l) => `hsl(${Math.round(h)} ${Math.round(Math.min(s, 100))}% ${Math.round(Math.max(0, Math.min(l, 100)))}%)`

export function themeVars(theme = 'blue') {
  const t = typeof theme === 'string' ? PRESETS[theme] : theme
  if (!t?.accent) throw new Error(`테마를 모름: ${JSON.stringify(theme)} (프리셋: ${Object.keys(PRESETS).join(', ')})`)
  const [h, s, l] = hex2hsl(t.accent)
  const grad = t.grad || [hsl(h, s, l - 12), t.accent, hsl(h + 12, s, l + 14)]
  const cs = Math.min(s, 45) // 어두운 바탕은 채도를 눌러서
  return {
    '--blue': t.accent, '--blue-deep': hsl(h, s, Math.max(l - 14, 12)), '--on-blue': '#ffffff',
    '--sky': hsl(h, Math.min(s, 90), 96.5), '--sky-2': hsl(h, Math.min(s, 80), 91), '--tint': hsl(h, Math.min(s, 90), 98),
    '--grey-bar': hsl(h, Math.min(s, 18), 80),
    '--grad': `linear-gradient(115deg, ${grad[0]} 0%, ${grad[1]} 55%, ${grad[2]} 100%)`,
    '--hi': t.hi || '#ffe58a', '--ours': t.ours || t.accent, '--ours-sky': hsl(...hex2hsl(t.ours || t.accent).slice(0, 2), 96),
    '--stage': hsl(h, cs, 8), '--stage-2': hsl(h, cs, 14), '--bar-line': hsl(h, cs, 24), '--bar-ink': hsl(h, Math.min(s, 30), 80),
  }
}
export const themeCss = (theme, sel = ':root') => `${sel}{${Object.entries(themeVars(theme)).map(([k, v]) => `${k}:${v}`).join(';')}}`
