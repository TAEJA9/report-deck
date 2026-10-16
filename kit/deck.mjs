// 덱 엔진. 프로젝트의 build.mjs 는 내용만 쓰고 이걸 불러 쓴다. CSS·뷰어는 이 kit 한 곳에서만 읽는다(복사 금지).
import fs from 'node:fs'
import { pathToFileURL } from 'node:url'
import { themeCss } from './theme.mjs'
export { PRESETS, RULES, themeCss } from './theme.mjs'
const KIT = new URL('./', import.meta.url)
const read = f => fs.readFileSync(new URL(f, KIT), 'utf8')

export function deck({ title, sections = [], logo = '', theme = 'blue', divStyle = 'grad', rules = 'bold' }) {
  const names = sections.map(s => s.name)
  const logoHtml = logo ? `<span class="logo">${logo}</span>` : ''
  const pg = '<span class="pg">0</span>'
  const sec = n => `0${n} ${names[n - 1]}`

  const cover = ({ logoImg, line1, line2, meta, img, imgAlt = '', imgFit, stats }) => `<section class="slide s-cover${img || stats ? '' : ' plain'}"><div class="left">${logoImg ? `<img class="mxlogo" src="${logoImg}" alt="">` : ''}<h1>${line1}<br><span class="g">${line2}</span></h1><div class="meta">${meta}</div></div>${img ? `<div class="right${imgFit === 'contain' ? ' fit' : ''}"><img src="${img}" alt="${imgAlt}"></div>` : stats ? `<div class="right stats"><div class="cover-stats">${stats.map(([b, s]) => `<div class="cs"><b>${b}</b><span>${s}</span></div>`).join('')}</div></div>` : ''}</section>`

  const toc = (eyebrow = title, hot = sections.length - 1) => {
    const n = sections.length, cls = n === 5 ? ' toc5' : n === 6 ? ' toc5 toc6' : ''
    const st = n <= 4 ? ` style="grid-template-columns:repeat(${n},minmax(0,1fr))"` : ''
    return `<section class="slide s-toc"><div class="pad"><div class="eyebrow">${eyebrow}</div><h2>목차</h2><div class="toc${cls}"${st}>${sections.map((s, i) => `<div class="ti${i === hot ? ' hot' : ''}"><span class="n">0${i + 1}</span><h3>${s.name}</h3><ul>${(s.sub || '').split(', ').filter(Boolean).map(x => `<li>${x}</li>`).join('')}</ul></div>`).join('')}</div></div>${logoHtml}${pg}</section>`
  }

  // 간지 스타일: 'grad'(기본, 그라데이션 바탕), 'plain'(흰 바탕, 큰 번호), 'split'(왼쪽 그라데이션 칸에 번호). 한 덱 안에서는 하나로 통일
  const div = (i, o = {}) => `<section class="slide s-div ${o.style || divStyle}"><div class="pad"><span class="dn">0${i + 1}</span><h2>${names[i]}</h2>${sections[i].sub ? `<p class="lead" style="color:rgba(255,255,255,.85);margin-top:24px">${sections[i].sub}</p>` : ''}<div class="didx">${names.map((t, j) => `<span class="${j === i ? 'on' : ''}"><b>0${j + 1}</b>${t}</span>`).join('')}</div></div>${logoHtml}${pg}</section>`

  // n: 섹션 번호(1부터) 또는 eyebrow 문자열. cls: 추가 클래스(보통 비움)
  const slide = (n, h, body, cls = '') => `<section class="slide ${cls}"><div class="pad"><div class="eyebrow">${typeof n === 'number' ? sec(n) : n}</div><h2>${h}</h2>${body}</div>${pg}</section>`

  const close = ({ eyebrow = '정리', h, lead, facts = [] }) => `<section class="slide s-ask"><div class="pad"><div class="eyebrow">${eyebrow}</div><h2>${h}</h2><p class="lead">${lead}</p><div class="facts">${facts.map(f => `<span>${f}</span>`).join('')}</div></div>${logoHtml}${pg}</section>`

  const src = t => `<p class="src2">${t}</p>`

  function write(out, slides, extra = {}) {
    const text = slides.join('\n').replace(/<[^>]+>/g, ' ')
    const bad = [...new Set(text.match(/[—–·…•]/g) || [])]
    if (bad.length) console.warn('⚠ 금지 문장부호:', bad.join(' '), '(쉼표나 "와/과"로 바꿀 것)')
    // notes: 장마다 발표 노트(글자). 장 수와 같은 길이의 배열, 없는 장은 ''. 하단 '노트' 버튼이나 N 키로 연다
    const notes = extra.notes?.length ? slides.map((_, i) => extra.notes[i] || '') : null
    if (extra.notes && extra.notes.length !== slides.length) console.warn(`⚠ 노트 ${extra.notes.length}개, 장 ${slides.length}장: 순서가 맞는지 확인`)
    const css = ['deck.css', 'extra.css', 'review.css', 'parts.css'].map(read).join('\n') + '\n' + themeCss(theme, ':root', rules) + (extra.css || '')
    const html = `<title>${title}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@400;500;600&family=Noto+Sans+KR:wght@500;700;800;900&display=swap">
<style>${css}</style>
<main class="viewer" id="viewer" aria-roledescription="발표 자료">
${slides.map((x, i) => x.replace(/<span class="pg">\d+<\/span>/, `<span class="pg">${i + 1}</span>`)).join('\n')}
</main>
<nav class="bar" aria-label="슬라이드 이동">
  <button type="button" id="grid" title="전체 보기 (G)" class="nav-only">전체</button>
  <span class="sp"></span>
  <button type="button" id="prev" aria-label="이전 슬라이드" class="nav-only">←</button>
  <span class="count nav-only" id="count"><b>1</b> / ${slides.length}</span>
  <button type="button" id="next" aria-label="다음 슬라이드" class="nav-only">→</button>
  <span class="dots nav-only" id="dots"></span>
  <span class="sp"></span>
  ${extra.bar || ''}
  ${notes ? '<button type="button" id="nt" title="발표 노트 (N)" class="nav-only" aria-pressed="false">노트</button>' : ''}
  <button type="button" id="fs" title="전체 화면 (F)" class="nav-only">전체 화면</button>
</nav>
${notes ? `<aside class="notes" id="notesBox" aria-label="발표 노트"></aside>
<script type="application/json" id="notes">${JSON.stringify(notes).replace(/</g, '\u003c')}</script>
` : ''}<script>${read('viewer.js')}${extra.js || ''}</script>
`
    // inline: 이미지를 html 안에 넣어 파일 하나로 (아티팩트 없이 파일로 줄 때)
    const final = extra.inline ? html.replace(/src="(?!data:|https?:)([^"]+)"/g, (m, f) => {
      const file = new URL(f, pathToFileURL(out)), ext = f.split('.').pop().toLowerCase()
      const type = { svg: 'image/svg+xml', jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp', gif: 'image/gif' }[ext]
      return type && fs.existsSync(file) ? `src="data:${type};base64,${fs.readFileSync(file).toString('base64')}"` : m
    }) : html
    fs.writeFileSync(out, final)
    console.log(out, 'slides', slides.length, 'bytes', final.length)
  }
  return { sec, cover, toc, div, slide, close, src, write }
}
