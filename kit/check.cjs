// 검사 한 번에: node check.cjs <deck.html> [sources 폴더] [캡처할 장번호,…]
//   모양: 넘친 장, 위계(제목만큼 큰 본문), 깨진 표  (shot.cjs)
//   내용: 숫자 대조, 출처 줄  (verify.cjs, sources 폴더를 줬을 때)
//   글:   장 제목 문법(명사형), 너무 긴 문장  (deck.outline.md)
const path = require('path'), fs = require('fs'), { execFileSync } = require('child_process')
const [deck, a2, a3] = process.argv.slice(2)
if (!deck) { console.error('사용: node check.cjs <deck.html> [sources 폴더] [장번호,…]'); process.exit(1) }
const src = a2 && fs.existsSync(a2) && fs.statSync(a2).isDirectory() ? a2 : null
const shots = src ? a3 : a2
const run = (f, args) => { try { process.stdout.write(execFileSync(process.execPath, [path.join(__dirname, f), ...args], { encoding: 'utf8' })) } catch (e) { process.stdout.write(e.stdout || ''); process.stderr.write(e.stderr || '') } }

console.log('── 모양'); run('shot.cjs', [deck, ...(shots ? [shots] : [])])
if (src) { console.log('\n── 내용'); run('verify.cjs', [deck, src]) } else console.log('\n── 내용: sources 폴더를 주면 숫자 대조를 한다')

console.log('\n── 글')
const ol = path.resolve(deck).replace(/\.html?$/, '') + '.outline.md'
if (!fs.existsSync(ol)) { console.log('deck.outline.md 가 없다. 다시 빌드할 것'); process.exit(0) }
const md = fs.readFileSync(ol, 'utf8')
const titles = [...md.matchAll(/^## (\d+)\. (.+?)(?: \((표지|목차|간지|정리)\))?$/gm)].filter(m => !m[3]).map(m => [m[1], m[2]])
const sentence = titles.filter(([, t]) => /(다|요|까)[.!?]?$/.test(t))
console.log(`문장형 제목 ${sentence.length}개 (짧은 명사형으로):`); sentence.forEach(([n, t]) => console.log(`  ${n}장 ${t}`))
const long = []
md.split(/^## /m).slice(1).forEach(sec => {
  const n = sec.match(/^(\d+)/)?.[1]
  // 표나 칸이 이어 붙은 줄(공백 둘 이상)은 문장이 아니라서 뺀다
  sec.split('\n').slice(1).filter(l => !l.startsWith('>') && !/^\s*(자료|\*)/.test(l) && !/\S {2,}\S/.test(l.trim())).flatMap(l => l.split(/(?<=[.다])\s+/)).forEach(s => { if (s.replace(/\s/g, '').length > 70) long.push(`  ${n}장 ${s.trim().slice(0, 40)}…`) })
})
console.log(`긴 문장 ${long.length}개 (70자 넘음, 쪼개거나 줄이기):`); long.slice(0, 15).forEach(x => console.log(x))
console.log(`\n원고를 처음부터 끝까지 읽고 흐름을 본다: ${ol}`)
