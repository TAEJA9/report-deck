# report-deck

조사 내용이나 검토 결과를 **보고용 발표 덱(HTML)** 으로 만드는 [Claude Code](https://claude.com/claude-code) 스킬입니다.
"이 자료로 보고용 PPT 만들어 줘" 하면 Claude 가 내용을 읽고, 장마다 맞는 틀을 골라, 늘 같은 스타일의 덱을 만듭니다.

- 결과물은 브라우저에서 넘겨 보는 HTML 한 파일입니다(←→ 넘기기, G 전체 보기, F 전체 화면). .pptx 가 아닙니다.
- 스타일은 `kit/` 한 곳에만 있습니다. 덱마다 CSS 를 새로 짜지 않으니 결과가 들쭉날쭉하지 않습니다.
- 장 틀 20여 개(정리표, 비율 막대, 막대 그래프, 시간 축, 마일스톤, 비교표, 위치 지도, 인용, 화면 갤러리 등) 중에서 내용에 맞는 것을 고릅니다. 같은 틀을 연달아 쓰지 않습니다.
- 키 컬러 하나만 정하면 나머지 색이 계산됩니다. 주제가 되는 회사나 서비스의 브랜드 색을 쓰면 됩니다.

## 설치

Claude Code 의 스킬 폴더에 이 레포를 `report-deck` 이름으로 둡니다.

```bash
# 내 모든 프로젝트에서 쓰기
git clone https://github.com/TAEJA9/report-deck ~/.claude/skills/report-deck

# 한 프로젝트에서만 쓰기
git clone https://github.com/TAEJA9/report-deck .claude/skills/report-deck
```

필요한 것: Node.js 18 이상. 넘침 검사와 캡처를 하려면 [Playwright](https://playwright.dev) (`npm i -D playwright`, 또는 환경변수 `PLAYWRIGHT` 로 설치 경로 지정).

## 쓰는 법

Claude Code 에서:

```
/report-deck 이 자료로 보고용 PPT 만들어 줘: docs/research.md
```

Claude 가 하는 일은 [SKILL.md](SKILL.md) 에 있습니다. 목차와 장 제목을 먼저 정하고, [catalog.md](catalog.md) 에서 장마다 틀을 고르고, `build.mjs` 를 써서 빌드한 뒤, 넘침과 글자 위계를 검사합니다.

직접 써도 됩니다.

```js
import { deck } from 'file:///<스킬 경로>/kit/deck.mjs'
import { fileURLToPath } from 'node:url'

const D = deck({ title: '협업 도구 도입 검토', theme: 'blue', logo: '팀 이름',
  sections: [{ name: '현황', sub: '한눈에 보기, 도입 흐름' }, { name: '결론', sub: '권장안' }] })

D.write(fileURLToPath(new URL('./deck.html', import.meta.url)), [
  D.cover({ line1: '협업 도구', line2: '도입 검토', meta: '2026년 10월', stats: [['3<small>개</small>', '비교한 후보']] }),
  D.toc(),
  D.div(0),
  D.slide(1, '도입 대상과 범위', `<div class="fact">…</div>`),
  D.close({ h: '후보 B로 도입', lead: '한두 문장 요약', facts: ['핵심 1', '핵심 2'] }),
])
```

```bash
node build.mjs
node <스킬 경로>/kit/shot.cjs deck.html 1,4,7   # 넘친 장, 위계가 무너진 장을 알려 주고 캡처를 남긴다
```

## 테마

```js
theme: 'blue'      // 프리셋: blue, violet, teal, green, orange, mono
theme: { accent: '#8935bd' }                                   // 브랜드 색 하나만
theme: { accent: '#8935bd', grad: ['#c362ff', '#a77cff', '#6aa5ff'], hi: '#e1ffaf', ours: '#2277f0' }
```

`grad` 는 간지와 강조 칸의 그라데이션, `hi` 는 형광 강조색, `ours` 는 경쟁사 분석에서 "우리 쪽"을 구분하는 색입니다.

## 견본

```bash
node gallery.mjs   # gallery.html: 모든 장 틀을 예시 데이터로 그리고, 하단 메뉴에서 테마를 바꿔 본다
```

kit 를 고친 뒤 깨진 데가 없는지 볼 때도 씁니다.

## 글 규칙

이 스킬이 지키는 규칙입니다(SKILL.md 에 자세히).

- em dash, 가운뎃점, 말줄임표, 글머리 점을 쓰지 않습니다. 빌드할 때 경고가 뜹니다.
- 장 제목은 짧은 명사형. 제목 > 블록 제목 > 본문으로 크기 위계를 지킵니다.
- 글꼴은 고딕(Noto Sans KR, IBM Plex Sans KR). 배경은 흰 바탕.
- 숫자와 인용은 자료에 있는 것만. 추정치는 표시합니다.

## 라이선스

MIT. 글꼴은 Google Fonts 에서 불러옵니다(각 글꼴의 라이선스를 따름).
