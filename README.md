# report-deck

조사 내용이나 검토 결과를 **보고용 발표 덱(HTML)** 으로 만드는 [Claude Code](https://claude.com/claude-code) 스킬입니다.

**왜 만들었나.** AI 에게 PPT 를 맡기면 매번 비슷하게 "AI 가 만든 티"가 납니다. 모든 장이 아이콘 카드 셋, 아무 데나 깐 그라데이션, 장식용 색 띠, em dash 와 가운뎃점, 제목만큼 큰 본문. 이 스킬은 그 반대를 규칙과 스타일로 고정해 둡니다. Claude 는 디자인을 새로 하지 않고, 정해진 틀 중에서 내용에 맞는 것을 고르기만 합니다.
"이 자료로 보고용 PPT 만들어 줘" 하면 Claude 가 내용을 읽고, 장마다 맞는 틀을 골라, 늘 같은 스타일의 덱을 만듭니다.

**하는 일 다섯 가지**

1. **디자인 고정.** AI 티가 나는 요소를 막고, 정해진 kit 와 주제에 맞는 키 컬러로만 그린다.
2. **틀 고르기.** 장 틀 55개쯤에서 내용 모양(숫자, 비율, 일정, 비교, 사례, 이미지)에 맞는 것을 고른다. 같은 틀을 연달아 쓰지 않는다.
3. **흐름과 글 다듬기.** 글만 뽑은 원고(`deck.outline.md`)로 제목만 이어 읽어도 이야기가 되는지, 장과 장이 이어지는지, 용어와 단위가 섞이지 않았는지 고친다. 짧은 명사형 제목, 제목과 본문의 크기 위계, 금지 문장부호를 지킨다.
4. **내용 검증.** 덱의 숫자를 모두 자료와 자동 대조하고, 원하면 덱을 만들지 않은 별도 에이전트가 자료와 원고만 보고 장마다 주장을 판정하고 읽는 사람 입장에서 흐름을 본다.
5. **여러 형태로 주기.** 아티팩트 링크, html 한 파일, PDF, PPTX(장마다 그림과 노트).

- 결과물은 브라우저에서 넘겨 보는 HTML 한 파일입니다(←→ 넘기기, G 전체 보기, F 전체 화면). .pptx 가 아닙니다.
- 스타일은 `kit/` 한 곳에만 있습니다. 덱마다 CSS 를 새로 짜지 않으니 결과가 들쭉날쭉하지 않습니다.
- 장 틀 40개 가까이(요약, 정리표, 비율 막대, 막대 그래프, 원그래프, 깔때기, 일정표, 시간 축, 전후 비교, 기능 비교표, 위치 지도, 인용, 질문과 답, 화면 갤러리 등) 중에서 내용에 맞는 것을 고릅니다. 같은 틀을 연달아 쓰지 않습니다.
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

### 시작할 때 묻는 것

요청에 없는 것만 한 번에 묻는다: 자료, 누가 보는지, 표지(이미지형, 숫자형, 글자형, 알아서), 발표 노트(필요, 필요 없음), 받는 방식(아티팩트, 파일 하나, html 경로). 테마와 장 틀은 묻지 않고 정한 뒤 알려 준다.

발표 노트는 `D.write(out, slides, { notes: [장마다 글] })` 로 넣고, 발표 화면 하단 '노트' 버튼이나 N 키로 연다.

### 결과 받는 방식

- 기본은 아티팩트(Claude Code 가 claude.ai 와 연결돼 있을 때). 덱을 올리고 비공개 링크를 준다.
- PDF, PPTX: `node kit/export.cjs deck.html pdf|pptx`. PDF 는 글자가 살아 있고, PPTX 는 장마다 그림 한 장과 발표 노트(글자 수정은 안 됨, 구글 드라이브에 올리면 구글 슬라이드로 열린다). PPTX 는 `pptxgenjs` 가 필요하다.
- "파일로", "올리지 말고" 라고 하면 게시하지 않는다. 메일이나 메신저로 보낼 거면 이미지까지 html 안에 넣은 파일 하나(`D.write(out, slides, { inline: true })`)를, 경로만 원하면 `deck.html` 경로를 준다.

### 내용 검증

`node kit/check.cjs deck.html sources/` 하나로 모양, 숫자 대조, 글을 한 번에 검사한다. 숫자 대조는 모두 자료(`sources/` 에 글로 저장한 것)에서 찾고, 출처 줄 없는 장을 알린다. 시작할 때 "독립 검증" 을 고르면, 덱을 만들지 않은 별도 에이전트가 자료와 덱만 보고 장마다 주장을 판정한다.

## 테마

```js
theme: 'blue'      // 프리셋: blue, violet, teal, green, orange, mono
theme: { accent: '#8935bd' }                                   // 브랜드 색 하나만
theme: { accent: '#8935bd', grad: ['#c362ff', '#a77cff', '#6aa5ff'], hi: '#e1ffaf', ours: '#2277f0' }
```

`grad` 는 간지와 강조 칸의 그라데이션, `hi` 는 형광 강조색, `ours` 는 경쟁사 분석에서 "우리 쪽"을 구분하는 색입니다.

## 다른 스킬에서 쓰기

`kit/deck.mjs` 를 불러 쓰면 다른 스킬도 같은 스타일로 덱을 만든다. 예를 들어 월간 보고 스킬은 자기 데이터(이번 달 정한 것, 한 일, 리스크)를 모은 뒤 이 kit 의 틀(표, 마일스톤, 3열, 큰 숫자)로 그리기만 한다.

```js
import { deck } from '../report-deck/kit/deck.mjs'
```

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
