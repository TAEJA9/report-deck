// 내용 검증(자동): node verify.cjs <deck.html> <자료.txt|md 폴더나 파일 …>
//   1. 숫자 대조: 장에 나온 숫자를 모두 뽑아 자료 글에서 찾는다. 없으면 "자료에 없음"으로 알린다.
//      계산하거나 추정한 값은 숫자 옆이나 그 장 출처 줄에 * 가 있으면 "계산, 추정"으로 따로 센다.
//   2. 출처 줄: 내용 장(표지, 목차, 간지, 정리 제외)에 출처 줄(src2)이 없으면 알린다.
// 자료는 글자로 된 파일이어야 한다. 구글 문서, 웹 페이지는 읽을 때 sources/ 에 글로 저장해 둔다.
const path = require('path'), fs = require('fs'), { pathToFileURL } = require('url'), { createRequire } = require('module')
let pw
for (const load of [() => require(process.env.PLAYWRIGHT), () => createRequire(path.join(process.cwd(), 'x.js'))('playwright'), () => require('playwright')]) { try { pw = load(); break } catch {} }
if (!pw) { console.error('playwright 를 못 찾았습니다(shot.cjs 와 같은 방법으로 지정).'); process.exit(1) }
const [deckFile, ...srcArgs] = process.argv.slice(2)
if (!deckFile || !srcArgs.length) { console.error('사용: node verify.cjs <deck.html> <자료 파일이나 폴더 …>'); process.exit(1) }

const files = srcArgs.flatMap(a => fs.statSync(a).isDirectory() ? fs.readdirSync(a).filter(f => /\.(txt|md|csv|json|html?)$/i.test(f)).map(f => path.join(a, f)) : [a])
const norm = s => s.replace(/[,\s]/g, '')
const SRC = norm(files.map(f => fs.readFileSync(f, 'utf8')).join('\n'))

// 번호, 쪽수, 목차 같은 장식 숫자는 빼고 읽는다
const SKIP = '.pg, .no, .dn, .didx, .logo, .st9 i, .ev i, .g6 i, .sum i, .flow2 i, .steps small, .toc, .src2'
;(async () => {
  const b = await pw.chromium.launch({ channel: 'chrome', args: ['--headless=new'] }).catch(() => pw.chromium.launch())
  const p = await b.newPage()
  await p.goto(pathToFileURL(path.resolve(deckFile)).href); await p.waitForTimeout(800)
  const slides = await p.evaluate(SKIP => [...document.querySelectorAll('.slide')].map(s => {
    const c = s.cloneNode(true); c.querySelectorAll(SKIP).forEach(e => e.remove()); c.querySelectorAll('*').forEach(e => e.append(' ')) // 칸끼리 글자가 붙지 않게
    return { kind: s.className, title: s.querySelector('h2, h1')?.textContent.trim() || '', text: c.innerText, src: s.querySelector('.src2')?.innerText || '' }
  }), SKIP)
  await b.close()

  const missing = [], calc = [], noSrc = []
  let total = 0
  slides.forEach((s, i) => {
    const content = !/s-cover|s-toc|s-div|s-ask/.test(s.kind)
    if (content && !s.src) noSrc.push(`${i + 1} ${s.title}`)
    const starred = s.src.includes('*')
    for (const m of s.text.matchAll(/(\d[\d,.]*)(\s*\*)?/g)) {
      const raw = m[1].replace(/[.,]$/, ''), n = norm(raw)
      if (n.replace(/\D/g, '').length < 2 && !/[.]/.test(n)) continue // 한 자리 숫자는 너무 흔해서 뺀다
      total++
      if (SRC.includes(n)) continue
      const line = s.text.slice(Math.max(0, m.index - 14), m.index + raw.length + 10).replace(/\s+/g, ' ').trim()
      ;(m[2] || starred ? calc : missing).push(`${i + 1}장 "${raw}" … ${line}`)
    }
  })
  console.log(`숫자 ${total}개 대조, 자료 ${files.length}개`)
  console.log(`\n자료에 없음 ${missing.length}개 (고치거나, 계산 값이면 * 표시):`); missing.forEach(x => console.log('  ' + x))
  console.log(`\n계산, 추정 표시 ${calc.length}개 (근거를 출처 줄에 적었는지 확인):`); calc.forEach(x => console.log('  ' + x))
  console.log(`\n출처 줄 없는 내용 장 ${noSrc.length}개:`); noSrc.forEach(x => console.log('  ' + x))
})()
