# 장 틀 목록

`D` = `deck({...})` 이 돌려준 것. 본문은 `D.slide(섹션번호, '제목', 본문, cls)` 의 세 번째 인자에 넣는다.
본문 높이 예산은 약 700px(제목 아래부터 쪽 번호 위까지). 출처는 본문 맨 끝에 `D.src('자료: …')`.
같은 틀을 두 장 연속 쓰지 않는다. 아래 "언제"를 보고 내용에 맞는 틀을 고른다.

## 고정 장

| 틀 | 호출 |
|---|---|
| 표지(이미지) | 사진이면 그대로, 화면 캡처면 `imgFit:'contain'` 을 더해 자르지 않는다. `D.cover({ logoImg:'img/logo.png', line1:'서비스 이름', line2:'분석 보고', meta:'2026년 10월, 팀 이름<br>한 줄 설명', img:'img/hero.jpg', imgAlt:'…' })` |
| 표지(숫자) | `D.cover({ line1, line2, meta, stats:[['24<small>장</small>','설명'], …] })` 숫자 2~3개 |
| 표지(글자형) | `D.cover({ line1, line2, meta })` 이미지도 숫자도 장식도 없이 제목만. 정기 보고처럼 매번 같은 모양이 좋을 때 |

표지 고르기: 자료에 대표 이미지(서비스 화면, 브랜드 이미지)가 있으면 이미지형, 내용을 요약하는 숫자 2~3개가 분명하면 숫자형, 둘 다 아니거나 정기 보고면 글자형.
| 목차 | `D.toc('덱 이름')` 섹션 수(3~6)에 맞춰 자동 배치, 마지막 섹션 강조 |
| 간지 | `D.div(i)` i는 0부터. 섹션의 `sub` 가 한 줄로 붙는다 |
| 정리 | `D.close({ h:'제목<br>둘째 줄', lead:'3문장 이내', facts:['핵심 1','핵심 2','핵심 3','핵심 4'] })` |

## 본문 틀

새 클래스를 만들 때는 kit 의 CSS 에 같은 이름이 있는지 먼저 찾는다(예: `dec` 는 이미 격자 틀이라 표에 붙이면 깨진다).

### road — 마일스톤 길 · 언제: 로드맵, 일정
```html
<div class="road"><div class="done"><span class="d">07.01</span><span class="o"></span><span class="n">킥오프</span></div>
  <div class="now"><span class="d">10월</span><span class="o"></span><span class="n">시범 운영</span><em>지금</em></div>
  <div class="next">…</div></div>
```

### pill — 상태 알약 · 표 칸이나 카드 안: `<span class="pill">확정</span>`, `<span class="pill pr">제안</span>`

### fact — 정리표 (항목, 값, 설명) · 언제: 개요, 한눈에 보기
```html
<div class="fact">
  <div class="k">운영</div><div class="v">회사 이름</div><div class="n">설명 한두 줄</div>
  …(3~5행)
</div>
```

### irow — 배너 이미지 + 설명 행 · 언제: 서비스 축, 상품 구성 2~3개
```html
<div class="irow"><div><img src="img/a.jpg" alt="…"><div><h3>이름</h3><p>설명</p></div></div> …</div>
```
이미지 비율 1000:280. 다른 비율이면 `style="aspect-ratio:16/9"`.

### seg — 시간·비율 막대 + 아래 설명 · 언제: 흐름의 단계 길이가 다를 때
```html
<div class="seg" style="grid-template-columns:5fr 20fr 5fr 6fr">
  <div class="b"><span>5분</span><h3>단계</h3></div>
  <div class="b hot"><span>20분</span><h3>핵심 단계</h3></div>
  <div class="b after"><span>수업 후</span><h3>점선 단계</h3></div>
  <p>단계 설명</p> …(블록 수만큼)
</div>
```
막대 비율은 실제 수치로. 출처 줄에 "막대 길이는 ○○ 비율" 명시.

### met — 큰 숫자 4개 · 언제: 핵심 수치. seg 아래 `style="margin-top:auto"` 로 받쳐도 좋다
```html
<div class="met"><div><b>30<small>분</small></b><span>설명</span></div> …(4개) </div>
```
경고 숫자는 `<div class="warn">`.

### callg — 번호 단계 목록 + 화면 2×2 · 언제: 순서 + 스크린샷
```html
<div class="callg"><div class="st9">
  <div><i>1</i><span>단계</span></div><div class="key"><i>2</i><span><b>강조 단계</b></span></div> …
</div><div class="shots">
  <figure style="margin:0"><img src="img/x.jpg" alt="…"><p><b>이름</b>짧은 설명</p></figure> …(4개)
</div></div>
```

### lr — 이름표 + 설명 줄 (둘이면 `.two.even` 으로 감싼다) · 언제: 과정별 규칙, 항목별 관찰
```html
<div class="two even" style="flex:none"><div class="lr"><h3>왼쪽 제목</h3>
  <div><b>1차</b><p>설명</p></div>
  <div class="minus"><b>아쉬움</b><p>부정 항목은 빨강</p></div>
</div><div class="lr">…</div></div>
```

### tbl — 표 · 언제: 구조, 메뉴, 조건별 정리. 행 강조는 `<tr class="hot">`
```html
<table class="tbl" style="margin-top:48px"><thead><tr><th style="width:220px">항목</th><th>내용</th></tr></thead><tbody>…</tbody></table>
<p class="flex-note">표 아래 한 줄 결론(선택)</p>
```

### tbl.vs — 두 대상 비교표 · 언제: 경쟁사 1:1 비교
```html
<table class="tbl vs"><thead><tr><th style="width:250px"></th><th class="mx">우리 쪽/주인공</th><th class="sp">상대</th></tr></thead>
<tbody><tr><td>항목</td><td class="mx">…</td><td>…</td></tr>…</tbody></table>
```

### tbl.bd — 문제 + 관찰 표 · 언제: 아쉬운 점, 리스크
```html
<table class="tbl bd"><thead><tr><th style="width:32%">아쉬운 점</th><th>관찰한 내용</th></tr></thead><tbody>…</tbody></table>
```

### lv — 막대 그래프(높이 = 값) · 언제: 레벨, 기간, 금액처럼 값이 있는 순서 목록 4~7개
```js
`<div class="lv">
  ${vals.map(v => `<div class="w">${v}주</div>`).join('')}
  ${vals.map((v, i) => `<div class="tr"><i class="${i ? '' : 'hot'}" style="height:${v / max * 100}%">${i ? '' : '<em>NEW</em>'}</i></div>`).join('')}
  ${labels.map(t => `<div class="lvl">${t}</div>`).join('')}
  ${names.map(t => `<div class="nm">${t}</div>`).join('')}
</div>`
```
열 수가 6이 아니면 `style="grid-template-columns:repeat(N,minmax(0,1fr))"`. 강조할 막대는 `i === 강조할 번호` 로 바꾸고, 표시(`<em>`)는 NEW, 권장, 1위처럼 내용에 맞게. 표시가 필요 없으면 `<em>` 을 뺀다.

### sp2 — 큰 숫자 행 + 어두운 칸 · 언제: 목록 + "직접 해 보니" 같은 관찰 한 덩어리
```html
<div class="sp2"><div class="wk">
  <div><b>4주</b><div><h3>이름</h3><p>설명</p></div></div> …
</div><div class="dark"><span class="k">직접 해 보니</span><p>문단</p><p>문단, <b>강조</b></p></div></div>
```

### scr — 화면 갤러리 3열(n3) / 4열(n4) · 언제: 앱 화면 소개.
```html
<div class="scr n3"><figure style="margin:0"><img src="img/a.jpg" alt="…"><h3>이름</h3><p>설명</p></figure> …</div>
```

### role3 — 큰 역할 단어 3열 · 언제: 같은 무게의 세 가지를 역할로 구분
```html
<div class="role3"><div><span class="r">유입</span><h3>이름</h3><p>줄</p><p>줄</p></div> …(3개)</div>
<p class="warnbar">확인 못 한 부분이나 주의 한 줄(선택)</p>
```

### hm — 설명 줄 + 사례 카드 · 언제: 기능 설명 + 대표 사례(오류, 대비)
```html
<div class="hm"><div class="lines"><p><b>강조</b> 설명</p> …</div>
<div class="mis"><h3>카드 제목</h3>
  <div class="g"><span>왼쪽 머리</span><span>오른쪽 머리</span><b>값</b><b class="x">빨강 값</b></div>
  <p>설명</p><p class="minus">부정 설명</p>
</div></div>
```

### axis — 시간·수치 축 · 언제: 몇 개의 측정값을 한 축에서 비교.
```html
<div class="axis"><div class="ln"></div>
  <div class="m" style="left:${값 * 1640 / 축최대}px"><b>1.5<small>초</small></b><span>설명<br>둘째 줄</span></div>
  <div class="m r warn" style="left:…px;width:300px">…</div>   ← 오른쪽 끝 값은 r(오른쪽 정렬), 경고는 warn
  <span class="t" style="left:0px">0초</span> …(눈금)
</div><p class="axis-note">아래 한두 줄 해설, <b>강조</b></p>
```
점끼리 400px 이상 떨어져야 글이 안 겹친다.

### quote + c3 — 인용 + 3열 · 언제: 대표 발화·사례 하나와 그 근거 세 갈래
```html
<div class="quote"><span>출처나 상황</span><p>“인용문”</p></div>
<div class="c3"><div><h3>제목</h3><p>줄</p><p>줄</p></div> …(3개)</div>
<p class="warnbar">주의 한 줄(선택)</p>
```

### care — 큰 이미지 + 이름표 줄 · 언제: 이미지 하나를 자세히 설명
```html
<div class="care"><img src="img/x.jpg" alt="…"><div class="lr" style="border-top:4px solid var(--ink)">
  <div><b>이름</b><p>설명</p></div> …
</div></div>
```

### pos — 2축 위치 지도 + 오른쪽 설명 · 언제: 포지셔닝. 출처 줄에 "정성 판단" 명시
```html
<div class="pos"><div class="map">
  <div class="q"></div><div class="vx"></div><div class="hx"></div>
  <span class="lab" style="left:490px;top:10px">위쪽 축</span><span class="lab" style="left:490px;bottom:10px">아래쪽 축</span>
  <span class="lab" style="left:10px;top:302px">왼쪽</span><span class="lab" style="right:10px;top:302px">오른쪽</span>
  <span class="pt" style="right:90px;top:72px">이름<i></i></span>
  <span class="pt sp" style="left:180px;top:396px"><i></i>이름</span>
  <span class="usp">우리 위치(점선, ours 색)</span>
</div><div>
  <div class="who"><span class="k">이름</span><h3>한 줄 요약</h3><p>설명</p></div>
  <div class="who sp">…</div>
</div></div>
```

### g6 — 번호 6칸 · 언제: 잘한 점, 원칙, 장점 6개
```html
<div class="g6"><div><i>01</i><h3>제목</h3><p>설명</p></div> …(6개)</div>
```

### ap — 결론 두 열 · 언제: 가져올 것과 피할 것, 권장과 남은 위험처럼 결론을 두 갈래로. 제목 문구는 내용에 맞게 바꾼다. `h3` 기본은 ours 색(우리 쪽 표시색), `class="no"` 는 빨강, `class="ok"` 는 검정
```js
D.slide(`<span style="color:var(--ours)">${D.sec(6)}</span>`, '우리에게 적용할 점', `<div class="ap"><div>
  <h3>가져올 것</h3><p><b>굵은 머리.</b>설명</p> …
</div><div>
  <h3 class="no">피할 것</h3><p>…</p>
  <h3 class="ok">이미 우리가 나은 것</h3><p>…</p>
</div></div>`)
```

### 그 밖에 원래 덱에 있던 부품
`.cards.c3/.c4` 안 `.cd`(카드, `.cd.hot` 강조), `.loop`(가로 흐름), `.steps`(칩 흐름), `.ev`(번호 목록 2열), `.gal.g3/.g4`(이미지 카드), `.ph`(폰 화면 + 설명), `.flex-note`(하늘색 결론 띠), `.lead`(큰 문단). 쓸 때 `.cd` 의 글머리 점은 parts.css 에서 꺼 두지 않았으니 `ul` 대신 `p` 를 쓴다.

## 일반 보고 틀

정확한 마크업은 `gallery.mjs` 의 "더 많은 틀" 섹션(같은 이름의 장)을 그대로 따라 쓴다.

| 틀 | 언제 | 핵심 마크업 |
|---|---|---|
| sum | 맨 앞 요약. 핵심 문장 셋과 근거 | `.sum > div` 안에 `i`(번호) `h3`(핵심) `p`(근거) |
| msgl + msg | 한 장에 메시지 하나. 제목 아래 한 줄 메시지, 근거 숫자 셋 | `<p class="msgl">` 다음 `.msg > div` 안에 `b`(숫자) `span` |
| hero | 숫자 하나가 장의 전부일 때 | `.hero` 안에 `b`(숫자, small 단위) 와 `div`(h3, p) |
| ba | 전후 비교, 지금과 바뀐 뒤 | `.ba` 안에 `.bf`, `.to`(→), `.af`. 각 칸 `.k` `h3` `p` |
| flow2 | 절차, 단계 3~6개 | `.flow2 > div` 안에 `i`(번호) `h3` `p`. 강조 단계는 `class="key"` |
| gantt | 일정표 | `.gantt style="--n:기간 수"`. 머리 `span.h`, 행마다 `span.t` 와 `span.gbar style="grid-column:시작 / 끝"`(이름 열이 1열). `gbar hot` 강조, `gbar ms` 마일스톤 |
| hbar | 순위, 항목별 크기 비교 | `.hbar > div` 안에 `.l` `.tr > i style="width:%"` `b`. 강조 행 `class="hot"` |
| stack | 구성비, 전후 구성 변화 | `.stack > div` 안에 `.l` `.tr > span.c1~c4 style="width:%"`, 아래 `.leg` 범례 |
| donut | 비율 한 가지 | `.pie style="background:conic-gradient(...)"` 안에 `b`(합계), 옆 `ul > li`(i.c1~c4, 이름, b 비율) |
| funnel | 단계별 이탈, 전환율 | `.funnel > div style="width:…px"` 안에 `h3`(이름 small 수), 둘째부터 `em`(전환율) |
| tbl fx2 | 기능 비교 매트릭스 | 칸에 `<span class="yes">있음</span>`, `part`(일부), `no2`(없음). 글자를 꼭 같이 쓴다 |
| team | 담당자, 역할 | `.team style="--n:인원"` 안에 `img`(사진, 없으면 뺀다) `.r`(역할) `h3`(이름) `p` |
| faq | 예상 질문과 답 | `.faq > div` 안에 `h3`(질문, Q 는 자동) `p`(답) |
| voices2 | 인용 여러 개 | `.voices2 > div` 안에 `p`(인용) `span`(누가, 언제) |
| met + em | 지난 기간 대비 증감 | met 칸의 `b` 다음 `<em class="up">+8%p</em>` 또는 `down` |
| 표 + pill | 다음 할 일(담당, 기한, 상태) | `tbl` 에 상태 칸 `<span class="pill">진행</span>`, `pill pr` |

## 그림, 아이콘

- 그림은 자료에 있는 이미지(화면 캡처, 로고, 사진)만 쓴다. 이미지 틀(irow, callg, scr, care, team, 이미지형 표지)에 넣는다.
- 장식용 아이콘, 이모지, 색 띠, 배경 무늬는 넣지 않는다. 아이콘이 꼭 필요하면 뜻이 있는 자리(채널 종류, 기기 종류 등)에만, 한 가지 선 아이콘 세트로, 글자와 같이 쓴다.
