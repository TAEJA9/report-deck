// 덱 내보내기: node export.cjs <deck.html> pdf|pptx [출력 경로]
//   pdf  : 장마다 한 쪽(1920×1080), 글자는 벡터로 남는다(검색, 복사 가능)
//   pptx : 장마다 그림 한 장 + 발표 노트. 글자는 수정할 수 없다(모양을 그대로 옮기는 대신)
// 필요: playwright, pptx 는 pptxgenjs 도. 찾는 순서는 shot.cjs 와 같다(환경변수 PLAYWRIGHT, PPTXGENJS → 지금 폴더 node_modules → 전역)
const path = require('path'), fs = require('fs'), { pathToFileURL } = require('url'), { createRequire } = require('module')
const need = (env, name) => {
  for (const load of [() => require(process.env[env]), () => createRequire(path.join(process.cwd(), 'x.js'))(name), () => require(name)]) {
    try { return load() } catch {}
  }
  console.error(`${name} 를 못 찾았습니다. 작업 폴더에서 \`npm i -D ${name}\` 하거나 ${env}=<…/node_modules/${name}> 로 지정하세요.`); process.exit(1)
}
const [file, kind = 'pdf', outArg] = process.argv.slice(2)
if (!file || !['pdf', 'pptx'].includes(kind)) { console.error('사용: node export.cjs <deck.html> pdf|pptx [출력 경로]'); process.exit(1) }
const src = path.resolve(file), out = path.resolve(outArg || src.replace(/\.html?$/, '') + '.' + kind)
const pw = need('PLAYWRIGHT', 'playwright')

// 발표 화면을 걷어 내고 장을 위에서 아래로 한 장씩 놓는다
const FLAT = `@page { size: 1920px 1080px; margin: 0 }
html, body { background: #fff !important; overflow: visible !important; height: auto !important }
.bar, .notes { display: none !important }
.viewer { display: block !important; height: auto !important; padding: 0 !important; overflow: visible !important; min-height: 0 !important }
.frame { position: relative !important; left: auto !important; top: auto !important; translate: none !important; opacity: 1 !important; width: 1920px !important; height: 1080px !important; break-after: page; outline: none !important }
.frame > .no { display: none !important }
.slide { position: relative !important; transform: none !important; border-radius: 0 !important; box-shadow: none !important }
/* PDF 는 글자 모양 그라데이션(background-clip:text)에 상자 자국이 남아 단색으로 */
.s-cover h1 .g, .g6 i { background: none !important; -webkit-text-fill-color: var(--blue) !important; color: var(--blue) !important }`

;(async () => {
  const b = await pw.chromium.launch({ channel: 'chrome', args: ['--headless=new'] }).catch(() => pw.chromium.launch())
  const p = await b.newPage({ viewport: { width: 1920, height: 1080 } })
  await p.goto(pathToFileURL(src).href); await p.waitForTimeout(1200)
  await p.addStyleTag({ content: FLAT })
  await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(600)
  const n = await p.locator('.slide').count()
  if (kind === 'pdf') {
    await p.emulateMedia({ media: 'print' })
    await p.pdf({ path: out, width: '1920px', height: '1080px', printBackground: true, preferCSSPageSize: true })
  } else {
    const PptxGenJS = need('PPTXGENJS', 'pptxgenjs')
    const notes = await p.evaluate(() => JSON.parse(document.getElementById('notes')?.textContent || '[]'))
    const title = await p.title()
    const deck = new PptxGenJS(); deck.layout = 'LAYOUT_WIDE'; deck.title = title // 13.33 × 7.5 in = 16:9
    for (let i = 0; i < n; i++) {
      const png = await p.locator('.slide').nth(i).screenshot({ type: 'png' })
      const s = deck.addSlide()
      s.addImage({ data: 'data:image/png;base64,' + png.toString('base64'), x: 0, y: 0, w: 13.333, h: 7.5 })
      if (notes[i]) s.addNotes(notes[i])
    }
    await deck.writeFile({ fileName: out })
  }
  await b.close()
  console.log(`${out} (${n}장, ${(fs.statSync(out).size / 1024 / 1024).toFixed(1)}MB)`)
})()
