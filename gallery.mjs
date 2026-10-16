// 견본 덱: 장 틀을 한 번씩 그리고, 하단 막대에서 테마를 바꿔 본다. kit 를 고친 뒤 깨진 데가 없는지 보는 시험지 겸용.
// node gallery.mjs → gallery.html (내용은 전부 예시 데이터)
import { fileURLToPath } from 'node:url'
import { deck, PRESETS, themeCss } from './kit/deck.mjs'

const D = deck({
  title: 'report-deck 견본', theme: 'blue', logo: 'report-deck 견본 (예시 데이터)',
  sections: [
    { name: '현황', sub: '한눈에 보기, 도입 흐름' },
    { name: '비교', sub: '후보 비교, 비용, 응답 속도' },
    { name: '평가', sub: '좋은 점, 걱정되는 점' },
    { name: '결론', sub: '권장안, 일정' },
  ],
})

const slides = [
  D.cover({ line1: '협업 도구', line2: '도입 검토', meta: '견본 덱, 예시 데이터<br>장 틀과 테마를 확인하는 용도', stats: [['3<small>개</small>', '비교한 후보'], ['42<small>%</small>', '회의 시간 감소(예시)'], ['6<small>주</small>', '시범 운영 기간']] }),
  D.cover({ line1: '표지', line2: '이미지형', meta: '오른쪽에 대표 이미지(서비스 메인 화면 등)<br>logoImg 로 로고도 넣을 수 있다', img: 'img/hero.svg', imgAlt: '대표 이미지 자리' }),
  D.toc('report-deck 견본'),
  D.div(0),
  D.slide(1, '도입 대상과 범위', `<div class="fact">
    <div class="k">대상</div><div class="v">기획, 개발 2개 팀</div><div class="n">총 24명. 외부 협력사 계정은 2단계에서</div>
    <div class="k">기간</div><div class="v">6주 시범 운영</div><div class="n">11월 첫 주 시작, 매주 금요일 점검</div>
    <div class="k">목표</div><div class="v">회의와 메일 줄이기</div><div class="n">주간 회의 시간, 메일 수, 문서 찾는 시간을 비교</div>
    <div class="k">예산</div><div class="v">월 50만 원 이내</div><div class="n">시범 기간은 무료 체험판 사용</div>
  </div>${D.src('fact: 항목, 값, 설명 정리표')}`),
  D.slide(1, '시범 운영 6주의 흐름', `<div class="seg" style="grid-template-columns:1fr 3fr 2fr 1.4fr">
    <div class="b"><span>1주</span><h3>설치</h3></div>
    <div class="b hot"><span>3주</span><h3>실사용</h3></div>
    <div class="b"><span>2주</span><h3>확대</h3></div>
    <div class="b after"><span>종료 후</span><h3>평가</h3></div>
    <p>계정 발급, 기존 문서 옮기기</p><p>두 팀이 모든 회의와 문서를 새 도구로</p><p>협력사 계정 추가, 알림 규칙 정리</p><p>설문과 사용 기록으로 판단</p>
  </div><div class="met" style="margin-top:auto">
    <div><b>24<small>명</small></b><span>참여 인원</span></div><div><b>6<small>주</small></b><span>시범 기간</span></div>
    <div><b>3<small>회</small></b><span>중간 점검</span></div><div class="warn"><b>1<small>건</small></b><span>보안 검토 남음</span></div>
  </div>${D.src('seg: 길이 비율 막대 / met: 큰 숫자 4개')}`),
  D.slide(1, '세 가지 구성', `<div class="irow">
    ${['문서', '채팅', '이슈 보드'].map(n => `<div><img src="img/wide.svg" alt="배너 자리"><div><h3>${n}</h3><p>irow: 배너 이미지와 설명 한 줄. 상품 구성, 서비스 축 소개에</p></div></div>`).join('')}
  </div>${D.src('irow: 배너 이미지 행')}`),
  D.slide(1, '회의 진행 순서', `<div class="callg"><div class="st9">
    ${['안건 올리기', '<b>미리 읽기</b>', '의견 달기', '회의(결정만)', '할 일 만들기', '마감 알림'].map((t, i) => `<div${i === 1 ? ' class="key"' : ''}><i>${i + 1}</i><span>${t}</span></div>`).join('')}
  </div><div class="shots">
    ${['안건 화면', '댓글 화면', '보드 화면', '알림 화면'].map(n => `<figure style="margin:0"><img src="img/shot.svg" alt="화면 자리"><p><b>${n}</b>짧은 설명</p></figure>`).join('')}
  </div></div>${D.src('callg: 번호 단계 목록과 화면 2×2')}`),
  D.slide(1, '팀별 쓰임새', `<div class="two even" style="flex:none"><div class="lr"><h3>기획팀</h3>
    <div><b>회의</b><p>안건을 문서로 먼저 올리고 회의는 결정만</p></div><div><b>문서</b><p>기획서 버전을 한 곳에서 관리</p></div>
    <div class="minus"><b>걱정</b><p>기존 메일 습관이 남아 두 곳을 오갈 수 있음</p></div>
  </div><div class="lr"><h3>개발팀</h3>
    <div><b>이슈</b><p>요청과 버그를 같은 보드에서</p></div><div><b>알림</b><p>배포 알림을 채널로 모으기</p></div>
    <div class="minus"><b>걱정</b><p>기존 이슈 도구와 연동이 필요</p></div>
  </div></div>${D.src('lr: 이름표와 설명 줄, 두 열')}`),

  D.div(1),
  D.slide(2, '후보 세 가지', `<table class="tbl" style="margin-top:48px"><thead><tr><th style="width:240px">후보</th><th>강점</th><th>약점</th><th style="width:220px">월 비용</th></tr></thead><tbody>
    <tr><td>A</td><td>문서와 채팅이 한 화면</td><td>대용량 파일 느림</td><td class="num">42만 원</td></tr>
    <tr class="hot"><td>B</td><td>이슈 보드, 자동화 규칙</td><td>처음 배우기 어려움</td><td class="num">48만 원</td></tr>
    <tr><td>C</td><td>가장 싸고 가벼움</td><td>권한 관리가 단순</td><td class="num">25만 원</td></tr>
  </tbody></table><p class="flex-note">표 아래 결론 띠: B가 두 팀 요구를 가장 많이 채운다</p>`),
  D.slide(2, '후보 A와 B', `<table class="tbl vs"><thead><tr><th style="width:250px"></th><th class="mx">후보 B</th><th class="sp">후보 A</th></tr></thead><tbody>
    <tr><td>문서</td><td class="mx">버전 기록, 댓글</td><td>버전 기록, 댓글, 실시간 편집</td></tr>
    <tr><td>이슈</td><td class="mx"><b>보드와 자동화 규칙</b></td><td>간단한 할 일 목록</td></tr>
    <tr><td>연동</td><td class="mx">메일, 캘린더, 저장소</td><td>메일, 캘린더</td></tr>
    <tr><td>가격</td><td class="mx"><b>1인 월 2만 원</b></td><td>1인 월 1.75만 원</td></tr>
  </tbody></table>${D.src('tbl.vs: 두 대상 비교표')}`),
  D.slide(2, '요금제와 써 본 느낌', `<div class="sp2"><div class="wk">
    <div><b>무료</b><div><h3>체험판</h3><p>10명까지, 저장 공간 5GB</p></div></div>
    <div><b>팀</b><div><h3>팀 요금제</h3><p>인원 제한 없음, 자동화 규칙</p></div></div>
    <div><b>기업</b><div><h3>기업 요금제</h3><p>보안 기능, 전담 지원</p></div></div>
  </div><div class="dark"><span class="k">직접 써 보니</span><p>sp2: 왼쪽은 큰 글자 행, 오른쪽은 관찰 한 덩어리를 담는 칸</p><p>강조는 <b>이렇게</b> 진한 키 컬러</p></div></div>`),
  D.slide(2, '1인당 월 비용', `<div class="lv" style="grid-template-columns:repeat(4,minmax(0,1fr))">
    ${[25, 42, 48, 60].map(v => `<div class="w">${v}만 원</div>`).join('')}
    ${[25, 42, 48, 60].map((v, i) => `<div class="tr"><i class="${i === 2 ? 'hot' : ''}" style="height:${v / 60 * 100}%">${i === 2 ? '<em>권장</em>' : ''}</i></div>`).join('')}
    ${['후보 C', '후보 A', '후보 B', '현재 도구 합계'].map(t => `<div class="lvl">${t}</div>`).join('')}
    ${['가벼운 메신저', '문서 중심', '이슈 중심', '메일, 메신저, 위키'].map(t => `<div class="nm">${t}</div>`).join('')}
  </div>${D.src('lv: 막대 높이 = 값. 강조 막대와 표시 글자는 바꿀 수 있다')}`),
  D.slide(2, '화면 응답 속도', `<div class="axis"><div class="ln"></div>
    <div class="m" style="left:205px"><b>0.4<small>초</small></b><span>후보 C<br>문서 열기</span></div>
    <div class="m" style="left:656px"><b>1.2<small>초</small></b><span>후보 B<br>문서 열기</span></div>
    <div class="m" style="left:1066px;width:340px"><b>2<small>초</small></b><span>후보 A<br>문서 열기</span></div>
    <div class="m r warn" style="left:1538px;width:300px"><b>3<small>초</small></b><span>후보 A<br>큰 파일</span></div>
    ${[0, 1, 2, 3].map(s => `<span class="t" style="left:${s * 513}px">${s}초</span>`).join('')}
  </div><p class="axis-note">시간 축. 점끼리 400px 이상 떨어뜨린다</p>${D.src('axis: 측정값 비교')}`),

  D.div(2),
  D.slide(3, '써 본 사람들의 말', `<div class="quote"><span>개발팀 시범 사용자</span><p>“배포 알림이 한곳에 모이니 확인할 데가 줄었어요”</p></div><div class="c3">
    <div><h3>좋았던 점</h3><p>회의 전 안건 공유</p><p>문서 찾는 시간 감소</p></div>
    <div><h3>헷갈린 점</h3><p>알림이 너무 많음</p><p>권한 설정 위치</p></div>
    <div><h3>요청</h3><p>모바일 앱 알림 정리</p><p>기존 메일 자동 옮기기</p></div>
  </div><p class="warnbar">warnbar: 주의할 점 한 줄</p>`),
  D.slide(3, '모바일 화면 세 가지', `<div class="scr n3">
    ${['홈', '채팅', '알림'].map(n => `<figure style="margin:0"><img src="img/phone.svg" alt="폰 화면 자리"><h3>${n}</h3><p>scr n3: 화면 3개와 설명</p></figure>`).join('')}
  </div>`),
  D.slide(3, '초보자 도움 장치', `<div class="scr n4">
    ${['처음 안내', '도움말', '단축키', '템플릿'].map(n => `<figure style="margin:0"><img src="img/phone.svg" alt="폰 화면 자리"><h3>${n}</h3><p>scr n4: 화면 4개</p></figure>`).join('')}
  </div>`),
  D.slide(3, '알림 메시지 예시', `<div class="care"><img src="img/square.svg" alt="이미지 자리"><div class="lr" style="border-top:4px solid var(--ink)">
    <div><b>마감 알림</b><p>마감 하루 전 담당자에게</p></div><div><b>언급</b><p>내 이름이 불리면 바로</p></div><div><b>요약</b><p>매일 아침 어제 바뀐 것</p></div>
    <div class="minus"><b>걱정</b><p>care: 큰 이미지 하나와 이름표 줄. 부정 항목은 빨강</p></div>
  </div></div>`),
  D.slide(3, '좋은 점', `<div class="g6">
    ${['회의가 짧아진다', '문서가 한곳에', '요청이 안 묻힌다', '협력사와 같은 화면', '자동화 규칙', '검색이 빠르다'].map((h, i) => `<div><i>0${i + 1}</i><h3>${h}</h3><p>g6 칸의 설명 한두 줄. 예시 문장입니다</p></div>`).join('')}
  </div>`),
  D.slide(3, '걱정되는 점', `<table class="tbl bd"><thead><tr><th style="width:32%">걱정</th><th>내용과 대응</th></tr></thead><tbody>
    <tr><td>두 곳을 오간다</td><td>메일과 새 도구를 같이 쓰는 기간이 길어질 수 있음. 4주차부터 메일 공지 중단</td></tr>
    <tr><td>알림 피로</td><td>채널마다 기본 알림을 끄고 언급만 받기</td></tr>
    <tr><td>보안 검토</td><td>외부 계정 권한 검토가 남음. 2단계 전에 끝내기</td></tr>
  </tbody></table>${D.src('tbl.bd: 문제와 관찰 표')}`),
  D.slide(3, '역할로 나눈 세 가지', `<div class="role3">
    <div><span class="r">유입</span><h3>초대 링크</h3><p>팀 채널에서 바로 가입</p></div>
    <div><span class="r">정착</span><h3>주간 점검</h3><p>금요일 15분 사용 점검</p></div>
    <div><span class="r">확대</span><h3>협력사</h3><p>2단계에서 외부 계정</p></div>
  </div><p class="warnbar">role3: 같은 무게의 세 가지를 역할 단어로</p>`),
  D.slide(3, '시범 중 관찰', `<div class="hm"><div class="lines"><p><b>1주차</b> 문서 옮기기에 예상보다 이틀 더 걸림</p><p><b>2주차</b> 회의 안건 문서화가 자리 잡음</p><p><b>3주차</b> 알림 규칙 정리 후 불만 감소</p></div>
  <div class="mis"><h3>사례 카드</h3><div class="g"><span>전</span><span>후</span><b>주 6회 회의</b><b class="x">주 4회 회의</b></div><p>hm: 설명 줄과 사례 카드</p><p class="minus">부정 설명은 빨강</p></div></div>`),

  D.div(3),
  D.slide(4, '진행 일정', `<div class="road">
    <div class="done"><span class="d">10월</span><span class="o"></span><span class="n">후보 비교</span></div>
    <div class="now"><span class="d">11월</span><span class="o"></span><span class="n">시범 운영</span><em>지금</em></div>
    <div class="next"><span class="d">12월</span><span class="o"></span><span class="n">평가</span></div>
    <div class="next"><span class="d">1월</span><span class="o"></span><span class="n">전사 도입</span></div>
  </div>${D.src('road: 마일스톤 길')}`),
  D.slide(4, '위치 지도', `<div class="pos"><div class="map">
    <div class="q"></div><div class="vx"></div><div class="hx"></div>
    <span class="lab" style="left:490px;top:10px">기능 많음</span><span class="lab" style="left:490px;bottom:10px">기능 적음</span>
    <span class="lab" style="left:10px;top:302px">싸다</span><span class="lab" style="right:10px;top:302px">비싸다</span>
    <span class="pt" style="right:90px;top:72px">후보 B<i></i></span><span class="pt sp" style="left:180px;top:396px"><i></i>후보 C</span>
    <span class="usp">우리 목표: 기능은 많게, 비용은 중간</span>
  </div><div><div class="who"><span class="k">후보 B</span><h3>기능 많고 비쌈</h3><p>이슈 중심 팀에 맞다</p></div><div class="who sp"><span class="k">후보 C</span><h3>싸고 가벼움</h3><p>작은 팀에 맞다</p></div></div></div>${D.src('pos: 2축 위치 지도, 정성 판단')}`),
  D.slide(4, '권장안', `<div class="ap"><div><h3>권장</h3><p><b>후보 B로 확대.</b>두 팀 요구를 가장 많이 채움</p><p><b>알림 기본값 정리.</b>언급만 받기</p></div>
  <div><h3 class="no">남은 위험</h3><p><b>보안 검토.</b>외부 계정 전에</p><h3 class="ok">다음 측정</h3><p><b>회의 시간.</b>12월 말 다시 재기</p></div></div>`),
  D.close({ h: '후보 B로<br>전사 도입 준비', lead: '정리 장. 핵심 문장 세 줄 이내와 기억할 것 몇 개를 알약으로 둔다.', facts: ['후보 B', '알림 규칙', '보안 검토', '1월 전사 도입'] }),
]

const names = Object.keys(PRESETS)
D.write(fileURLToPath(new URL('./gallery.html', import.meta.url)), slides, {
  css: names.map(n => themeCss(n, `body[data-theme="${n}"]`)).join('\n') + '\n#theme{height:44px;border-radius:999px;padding:0 14px;background:var(--stage-2);color:#fff;border:1px solid var(--bar-line);font:600 14px var(--body)}',
  bar: `<select id="theme" aria-label="테마">${names.map(n => `<option>${n}</option>`).join('')}</select>`,
  js: `;document.getElementById('theme').onchange=e=>{document.body.dataset.theme=e.target.value}`,
})
