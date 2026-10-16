// 넘침 검사 + 캡처. node shot.cjs <deck.html> [장번호,…]  → 넘친 장을 출력하고 s<n>.png 를 deck 옆에 저장
// playwright 를 찾는 순서: 환경변수 PLAYWRIGHT(경로) → 지금 폴더의 node_modules → 전역
const path = require('path'), { pathToFileURL } = require('url'), { createRequire } = require('module')
let pw
for (const load of [() => require(process.env.PLAYWRIGHT), () => createRequire(path.join(process.cwd(), 'x.js'))('playwright'), () => require('playwright')]) {
  try { pw = load(); break } catch {}
}
if (!pw) { console.error('playwright 를 못 찾았습니다. 작업 폴더에서 `npm i -D playwright` 하거나 PLAYWRIGHT=<…/node_modules/playwright> 로 지정하세요.'); process.exit(1) }
const file = path.resolve(process.argv[2]), U = pathToFileURL(file).href, out = path.dirname(file)
;(async () => {
  const b = await pw.chromium.launch({ channel: 'chrome', args: ['--headless=new'] }).catch(() => pw.chromium.launch())
  const p = await b.newPage({ viewport: { width: 1920, height: 1080 } })
  await p.goto(U); await p.waitForTimeout(1500)
  const over = await p.evaluate(() => [...document.querySelectorAll('.slide')].map((s, i) => {
    const r = s.getBoundingClientRect(), k = r.width / 1920, bad = []
    s.querySelectorAll('.pad *').forEach(e => { const q = e.getBoundingClientRect(); if (q.bottom > r.bottom - 90 * k || q.right > r.right - 2) bad.push(e.className || e.tagName) })
    return [i + 1, bad.slice(0, 3).join(',')]
  }).filter(x => x[1]))
  console.log('넘침:', JSON.stringify(over))
  // 위계: 장 제목보다 작아야 할 글(숫자가 아닌 글자 3자 이상)이 제목의 60%를 넘으면 알린다
  const rank = await p.evaluate(() => [...document.querySelectorAll('.slide')].map((s, i) => {
    const h2 = s.querySelector('.pad > h2'); if (!h2 || s.matches('.s-div,.s-ask,.s-cover,.s-toc')) return null
    const lim = parseFloat(getComputedStyle(h2).fontSize) * 0.6, bad = []
    s.querySelectorAll('.pad *:not(h2)').forEach(e => {
      const own = [...e.childNodes].filter(n => n.nodeType === 3).map(n => n.textContent).join('').replace(/[0-9.,~%+/()\s]|초|분|주|개|명|건|원|시간|점/g, '')
      if (own.length >= 3 && parseFloat(getComputedStyle(e).fontSize) > lim) bad.push(own.slice(0, 12))
    })
    return bad.length ? [i + 1, bad.slice(0, 2).join(' | ')] : null
  }).filter(Boolean))
  console.log('위계(제목만큼 큰 본문):', JSON.stringify(rank))
  // 클래스 이름이 kit 의 다른 틀과 겹치면 표가 격자나 줄로 깨진다
  const broke = await p.evaluate(() => [...document.querySelectorAll('.slide')].map((s, i) =>
    [...s.querySelectorAll('table')].some(t => getComputedStyle(t).display !== 'table') ? i + 1 : 0).filter(Boolean))
  if (broke.length) console.log('깨진 표(클래스 이름 겹침 의심):', JSON.stringify(broke))
  for (const n of (process.argv[3] || '').split(',').filter(Boolean)) {
    await p.goto(U + '#s' + n); await p.reload(); await p.waitForTimeout(1600)
    await p.screenshot({ path: path.join(out, `s${n}.png`) })
  }
  await b.close()
})()
