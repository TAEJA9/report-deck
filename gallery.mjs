// 견본 덱: 장 틀을 한 번씩 그리고, 하단 막대에서 테마를 바꿔 본다. kit 를 고친 뒤 깨진 데가 없는지 보는 시험지 겸용.
// node gallery.mjs → gallery.html (내용은 전부 예시 데이터)
import { fileURLToPath } from 'node:url'
import { deck, PRESETS, RULES, themeCss } from './kit/deck.mjs'

const D = deck({
  title: 'report-deck 견본', theme: 'blue', logo: 'report-deck 견본 (예시 데이터)',
  sections: [
    { name: '현황', sub: '한눈에 보기, 도입 흐름' },
    { name: '비교', sub: '후보 비교, 비용, 응답 속도' },
    { name: '평가', sub: '좋은 점, 걱정되는 점' },
    { name: '결론', sub: '권장안, 일정' },
    { name: '더 많은 틀', sub: '요약, 강조, 일정, 비율, 비교, 사람, 질문' },
    { name: '카드와 목록', sub: '개요표, 이미지 카드, 순환, 칩 흐름, 카드, 폰 화면, 화면과 설명, 번호 목록' },
  ],
})

const slides = [
  D.cover({ line1: '협업 도구', line2: '도입 검토', meta: '견본 덱, 예시 데이터<br>장 틀과 테마를 확인하는 용도', stats: [['3<small>개</small>', '비교한 후보'], ['42<small>%</small>', '회의 시간 감소(예시)'], ['6<small>주</small>', '시범 운영 기간']] }),
  D.cover({ line1: '표지', line2: '글자형', meta: '이미지도 숫자도 없을 때<br>정기 보고처럼 매번 같은 모양' }),
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

  D.div(1, { style: 'plain' }),
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

  D.div(2, { style: 'split' }),
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
  D.slide(3, '알림 메시지 예시', `<div class="care"><img src="img/square.svg" alt="이미지 자리"><div class="lr" style="border-top:var(--rule)">
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
  D.div(4),
  D.slide(5, '세 줄 요약', `<div class="sum">
    <div><i>01</i><h3>회의 시간이 40% 줄었다</h3><p>sum: 핵심 문장과 오른쪽 근거. 주 6시간에서 3.5시간</p></div>
    <div><i>02</i><h3>문서를 찾는 시간이 절반으로</h3><p>검색 한 번에 찾는 비율 45%에서 82%</p></div>
    <div><i>03</i><h3>보안 검토 하나가 남았다</h3><p>외부 계정 권한 검토, 12월 첫 주</p></div>
  </div>`),
  D.slide(5, '시범 운영의 핵심 결과', `<p class="msgl">회의는 결정만 하고, 나머지는 문서로 옮겨 갔다</p><div class="msg">
    <div><b>-40%</b><span>주간 회의 시간</span></div><div><b>82%</b><span>검색 한 번에 찾은 비율</span></div><div><b>24명</b><span>6주 동안 매일 쓴 사람</span></div>
  </div>${D.src('msgl + msg: 핵심 메시지 한 줄과 근거 숫자 셋')}`),
  D.slide(5, '줄어든 회의 시간', `<div class="hero"><b>42<small>%</small></b><div><h3>주간 회의 시간 감소</h3><p>hero: 숫자 하나가 장의 전부일 때. 6주 시범 기간, 두 팀 24명 기준(예시)</p></div></div>`),
  D.slide(5, '회의 방식 전후', `<div class="ba">
    <div class="bf"><span class="k">전</span><h3>모여서 정리</h3><p>안건을 회의에서 처음 봄</p><p>결정과 할 일이 메일에 흩어짐</p></div>
    <div class="to">→</div>
    <div class="af"><span class="k">후</span><h3>읽고 와서 결정</h3><p>안건을 하루 전 문서로</p><p>결정과 할 일이 보드에 바로</p></div>
  </div>${D.src('ba: 전후 비교')}`),
  D.slide(5, '도입 절차', `<div class="flow2">
    <div><i>1</i><h3>계정 발급</h3><p>팀별 초대 링크</p></div><div><i>2</i><h3>문서 옮기기</h3><p>최근 3개월치만</p></div>
    <div class="key"><i>3</i><h3>실사용</h3><p>모든 회의를 새 도구로</p></div><div><i>4</i><h3>평가</h3><p>설문과 사용 기록</p></div>
  </div>${D.src('flow2: 단계 흐름, 강조 단계는 key')}`),
  D.slide(5, '도입 일정', `<div class="gantt" style="--n:6">
    <span></span>${['10월', '11월', '12월', '1월', '2월', '3월'].map(m => `<span class="h">${m}</span>`).join('')}
    <span class="t">후보 비교</span><span class="gbar" style="grid-column:2 / 3">비교</span>
    <span class="t">시범 운영</span><span class="gbar hot" style="grid-column:3 / 5">2개 팀, 6주</span>
    <span class="t">보안 검토</span><span class="gbar" style="grid-column:4 / 5">외부 계정</span>
    <span class="t">전사 도입</span><span class="gbar" style="grid-column:5 / 8">단계별 확대</span>
    <span class="t">평가 보고</span><span class="gbar ms" style="grid-column:5 / 6">1월 말</span>
  </div>${D.src('gantt: 열 = 기간, 막대는 grid-column 으로 위치. ms 는 마일스톤')}`),
  D.slide(5, '단계별 로드맵', `<div class="phase">
    <div class="done"><span class="when">10월</span><h3>비교</h3><span class="goal">후보 하나로 좁히기</span><p>후보 셋 비교, 보안 질문지</p></div>
    <div class="now"><span class="when">11~12월, 지금</span><h3>시범 운영</h3><span class="goal">두 팀에서 효과 확인</span><p>2개 팀 6주, 주간 점검</p><p>보안 검토</p></div>
    <div><span class="when">1~2월</span><h3>전사 도입</h3><span class="goal">모든 팀 이전</span><p>단계별 확대, 교육</p></div>
    <div><span class="when">3월~</span><h3>정착</h3><span class="goal">메일 안건 0건</span><p>협력사 계정, 자동화 규칙</p></div>
  </div>${D.src('phase: 단계별 로드맵. 시기, 이름, 목표, 할 일. 지금 단계 now, 끝난 단계 done. 날짜 중심이면 road, 기간이 겹치면 gantt')}`),
  D.slide(5, '팀별 하루 사용 시간', `<div class="hbar">
    ${[['개발팀', 96], ['기획팀', 78], ['디자인팀', 54], ['영업팀', 31]].map(([l, v], i) => `<div class="${i ? '' : 'hot'}"><span class="l">${l}</span><span class="tr"><i style="width:${v / 96 * 100}%"></i></span><b>${v}분</b></div>`).join('')}
  </div>${D.src('hbar: 가로 막대 순위. 막대 길이 = 값')}`),
  D.slide(5, '업무 연락 채널 구성', `<div class="stack">
    <div><span class="l">도입 전</span><span class="tr"><span class="c2" style="width:55%">메일 55%</span><span class="c3x" style="width:30%">메신저 30%</span><span class="c4" style="width:15%">기타</span></span></div>
    <div><span class="l">도입 후</span><span class="tr"><span class="c1" style="width:60%">새 도구 60%</span><span class="c2" style="width:25%">메일 25%</span><span class="c3x" style="width:15%">메신저</span></span></div>
  </div><div class="leg"><span><i class="c1"></i>새 도구</span><span><i class="c2"></i>메일</span><span><i class="c3x"></i>메신저</span><span><i class="c4"></i>기타</span></div>${D.src('stack: 100% 누적 막대, 구성비')}`),
  D.slide(5, '알림 종류 비율', `<div class="donut"><div class="pie" style="background:conic-gradient(var(--blue) 0 48%, var(--sky-2) 0 78%, var(--grey-bar) 0 92%, #e8ebf0 0 100%)"><b>1,240<small>건, 하루 평균</small></b></div>
    <ul><li><i class="c1"></i>언급<b>48%</b></li><li><i class="c2"></i>댓글<b>30%</b></li><li><i class="c3x"></i>마감<b>14%</b></li><li><i class="c4"></i>기타<b>8%</b></li></ul></div>`),
  D.slide(5, '가입에서 정착까지', `<div class="funnel">
    <div style="width:1200px"><h3>초대 받음<small>120명</small></h3></div>
    <div style="width:1000px"><h3>가입<small>104명</small></h3><em>87%</em></div>
    <div style="width:760px"><h3>첫 주 사용<small>80명</small></h3><em>77%</em></div>
    <div style="width:560px"><h3>6주 정착<small>62명</small></h3><em>78%</em></div>
  </div>${D.src('funnel: 단계별 수와 전환율. 폭은 수에 비례해 직접 정한다')}`),
  D.slide(5, '후보별 기능 비교', `<table class="tbl fx2" style="margin-top:48px"><thead><tr><th style="width:30%">기능</th><th>후보 A</th><th>후보 B</th><th>후보 C</th></tr></thead><tbody>
    <tr><td>문서 버전 기록</td><td><span class="yes">있음</span></td><td><span class="yes">있음</span></td><td><span class="part">일부</span></td></tr>
    <tr><td>이슈 보드</td><td><span class="no2">없음</span></td><td><span class="yes">있음</span></td><td><span class="no2">없음</span></td></tr>
    <tr><td>자동화 규칙</td><td><span class="part">일부</span></td><td><span class="yes">있음</span></td><td><span class="no2">없음</span></td></tr>
    <tr><td>외부 계정</td><td><span class="yes">있음</span></td><td><span class="yes">있음</span></td><td><span class="part">일부</span></td></tr>
  </tbody></table>${D.src('tbl fx2: 기능 비교 매트릭스, 있음, 일부, 없음은 글자로도 적는다')}`),
  D.slide(5, '도입 담당', `<div class="team" style="--n:4">
    ${[['김하나', '총괄', '일정과 예산'], ['이도윤', '기획팀', '문서 옮기기, 교육'], ['박서준', '개발팀', '연동, 알림 규칙'], ['최유리', '보안', '외부 계정 검토']].map(([n, r, p]) => `<div><img src="img/square.svg" alt=""><span class="r">${r}</span><h3>${n}</h3><p>${p}</p></div>`).join('')}
  </div>${D.src('team: 사람과 역할. 사진이 없으면 img 를 뺀다. 이름은 예시')}`),
  D.slide(5, '자주 받은 질문', `<div class="faq">
    <div><h3>기존 메일은 어떻게 되나요?</h3><p>최근 3개월치만 옮기고, 나머지는 메일에 그대로 둡니다</p></div>
    <div><h3>외부 협력사도 쓸 수 있나요?</h3><p>보안 검토가 끝나는 12월부터 가능합니다</p></div>
    <div><h3>모바일에서도 되나요?</h3><p>앱이 있고, 알림은 언급만 받게 기본값을 둡니다</p></div>
    <div><h3>비용은 누가 내나요?</h3><p>시범 기간은 무료, 이후는 팀 예산에서</p></div>
  </div>`),
  D.slide(5, '사용자 의견', `<div class="voices2">
    <div><p>“회의 전에 안건을 읽고 오니 회의가 짧아졌어요”</p><span>기획팀, 시범 3주차</span></div>
    <div><p>“배포 알림이 한곳에 모여서 확인할 데가 줄었어요”</p><span>개발팀, 시범 4주차</span></div>
    <div><p>“알림이 너무 많아서 처음엔 꺼 두었어요”</p><span>디자인팀, 시범 1주차</span></div>
  </div>${D.src('voices2: 인용 여러 개')}`),
  D.slide(5, '핵심 지표 변화', `<div class="met" style="margin-top:72px">
    <div><b>3.5<small>시간</small></b><em class="up">-2.5시간</em><span>주간 회의</span></div>
    <div><b>82<small>%</small></b><em class="up">+37%p</em><span>검색 한 번에 찾음</span></div>
    <div><b>62<small>명</small></b><em class="up">+62명</em><span>6주 정착 사용자</span></div>
    <div class="warn"><b>1<small>건</small></b><em class="down">미해결</em><span>보안 검토</span></div>
  </div>${D.src('met + em: 지난 기간 대비 증감')}`),
  D.div(5),
  D.slide(6, '한눈에 보기', `<div class="ov">
    <div class="k">대상</div><div class="v">기획, 개발 2개 팀 <small>ov: 왼쪽 항목, 오른쪽 큰 값과 아래 설명. fact 보다 값이 크고 칸이 둘</small></div>
    <div class="k">기간</div><div class="v">6주 시범 운영 <small>11월 첫 주 시작, 매주 금요일 점검</small></div>
    <div class="k">예산</div><div class="v">월 50만 원 이내 <small>시범 기간은 무료 체험판</small></div>
    <div class="k">목표</div><div class="v">회의와 메일 줄이기 <small>회의 시간, 메일 수, 문서 찾는 시간 비교</small></div>
  </div>`),
  D.slide(6, '세 가지 기능', `<div class="gal g3">
    ${['문서', '채팅', '이슈 보드'].map(n => `<figure><img src="img/wide.svg" alt="기능 화면 자리"><figcaption><b>${n}</b>gal g3: 이미지 카드 셋. 사진이나 배너가 있을 때</figcaption></figure>`).join('')}
  </div><p class="flex-note">flex-note: 아래에 한 줄 결론</p>`),
  D.slide(6, '한 주의 순환', `<div class="loop">
    <div class="n"><h3>안건 올리기</h3><p>월요일까지 문서로</p></div><div class="ar">→</div>
    <div class="n hot"><h3>회의</h3><p>화요일, 결정만</p></div><div class="ar">→</div>
    <div class="n"><h3>할 일</h3><p>보드로 바로</p></div><div class="ar">→</div>
    <div class="n"><h3>회고</h3><p>금요일 15분</p></div>
  </div><div class="met" style="margin-top:auto">
    <div><b>4<small>단계</small></b><span>loop: 가로 순환 칸과 화살표</span></div><div><b>15<small>분</small></b><span>금요일 회고</span></div>
    <div><b>1<small>회</small></b><span>주간 회의</span></div><div><b>0<small>건</small></b><span>메일 안건</span></div>
  </div>`),
  D.slide(6, '회의 진행 순서', `<div class="steps">
    ${['인사', '<b>지난 결정 확인</b>', '안건 1', '안건 2', '할 일 정리', '다음 일정'].map((t, i) => `<span class="s${i === 1 ? ' key' : ''}"><small>${i + 1}</small>${t}</span>${i < 5 ? '<span class="ar">›</span>' : ''}`).join('')}
  </div><div class="gal g4 tall">
    ${['안건 화면', '결정 기록', '할 일 보드', '회고 화면'].map(n => `<figure><img src="img/shot.svg" alt="화면 자리"><figcaption><b>${n}</b>steps 칩 흐름 + gal g4</figcaption></figure>`).join('')}
  </div>`),
  D.slide(6, '팀별 쓰임새 카드', `<div class="cards c3">
    <div class="cd"><span class="k">기획팀</span><h3>문서 중심</h3><ul><li>안건을 문서로</li><li>버전 기록</li><li class="minus">메일 습관이 남음</li></ul></div>
    <div class="cd hot"><span class="k">개발팀</span><h3>이슈 중심</h3><ul><li>요청과 버그를 한 보드에</li><li>배포 알림 모으기</li></ul></div>
    <div class="cd"><span class="k">디자인팀</span><h3>리뷰 중심</h3><ul><li>시안에 바로 댓글</li><li class="minus">큰 파일 업로드 느림</li></ul></div>
  </div><p class="flex-note">cards c3: 카드 셋, 강조 카드는 cd hot. 목록은 점 대신 줄로 나눈다</p>`),
  D.slide(6, '요금제 네 가지', `<div class="cards c4">
    ${[['무료', '체험판', '10명까지'], ['팀', '팀 요금제', '인원 제한 없음'], ['기업', '기업 요금제', '보안 기능'], ['교육', '학교용', '학생 무료']].map(([k, h, p], i) => `<div class="cd${i === 1 ? ' hot' : ''}"><span class="k">${k}</span><h3>${h}</h3><p>${p}</p></div>`).join('')}
  </div><div class="cd ours" style="margin-top:32px"><span class="k">우리에게</span><p>cards c4 + cd ours: 우리 쪽 시사점 칸은 ours 색</p></div>`),
  D.slide(6, '모바일 화면 설명', `<div class="ph p2" style="grid-template-columns:repeat(3,minmax(0,1fr))">
    ${['홈', '채팅', '알림'].map(n => `<figure><img src="img/phone.svg" alt="폰 화면 자리"><figcaption><b>${n}</b>ph: 폰 화면 왼쪽, 설명 오른쪽. 열 수는 style 로</figcaption></figure>`).join('')}
  </div>`),
  D.slide(6, '카톡 알림 예시', `<div class="shotx wide"><div class="imgs"><figure><img src="img/square.svg" alt="이미지 자리"><figcaption>shotx: 화면 하나와 오른쪽 설명 목록</figcaption></figure></div><div class="txt">
    <ul class="bl" style="margin-top:0"><li><b>마감 알림</b> 하루 전 담당자에게</li><li><b>언급</b> 이름이 불리면 바로</li><li><b>요약</b> 매일 아침 어제 바뀐 것</li><li class="minus">알림이 많으면 꺼 두는 사람이 생김</li></ul>
  </div></div>`),
  D.slide(6, '잘된 점과 아쉬운 점', `<div class="ev">
    <div class="it"><i>1</i><div><h3>회의가 짧아졌다</h3><p>ev: 번호 목록 2열. 잘한 점, 원칙</p></div></div>
    <div class="it"><i>2</i><div><h3>문서가 한곳에</h3><p>검색 한 번에 찾는다</p></div></div>
    <div class="it"><i>3</i><div><h3>요청이 안 묻힌다</h3><p>보드에 바로 남는다</p></div></div>
    <div class="it"><i>4</i><div><h3>협력사와 같은 화면</h3><p>외부 계정 검토 뒤</p></div></div>
  </div>`),
  D.slide(6, '후보 B의 SWOT', `<div class="quad">
    <div><div class="hd"><b>S</b><h3>강점</h3></div><p>이슈 보드와 자동화 규칙</p><p>외부 계정 지원</p></div>
    <div class="neg"><div class="hd"><b>W</b><h3>약점</h3></div><p>처음 배우기 어렵다</p><p>1인 월 2만 원, 가장 비쌈</p></div>
    <div><div class="hd"><b>O</b><h3>기회</h3></div><p>메일과 메신저를 한 곳으로</p><p>협력사와 같은 화면</p></div>
    <div class="neg"><div class="hd"><b>T</b><h3>위협</h3></div><p>알림 피로로 꺼 두는 사람</p><p>보안 검토 지연</p></div>
  </div>${D.src('quad: 2×2 네 칸. SWOT 은 S, W, O, T. 부정 칸은 neg(회색). 2×2 정리에도 쓴다')}`),
  D.slide(6, '시범 운영 현장', `<div class="trio">
    <figure><img src="img/hero.svg" alt="큰 이미지 자리"><figcaption><b>회의실</b>trio: 큰 이미지 하나</figcaption></figure>
    <figure><img src="img/wide.svg" alt="이미지 자리"><figcaption><b>보드</b>작은 이미지</figcaption></figure>
    <figure><img src="img/shot.svg" alt="이미지 자리"><figcaption><b>알림</b>작은 이미지</figcaption></figure>
  </div>${D.src('trio: 이미지 셋, 하나를 크게. 화면 캡처면 trio fit(자르지 않음). 셋이 같은 무게면 gal g3, 폰 화면이면 scr n3')}`),
  D.slide(6, '두 후보 나란히', `<div class="two even" style="flex:none">
    <div class="cd hot"><span class="k">후보 B</span><h3>기능 많고 비쌈</h3><ul><li>이슈 보드와 자동화</li><li>1인 월 2만 원</li></ul></div>
    <div class="cd"><span class="k">후보 C</span><h3>싸고 가벼움</h3><ul><li>메신저 중심</li><li class="minus">권한 관리 단순</li></ul></div>
  </div><p class="flex-note">two even + cd: 둘을 카드로 나란히</p>`),
  D.close({ h: '후보 B로<br>전사 도입 준비', lead: '정리 장. 핵심 문장 세 줄 이내와 기억할 것 몇 개를 알약으로 둔다.', facts: ['후보 B', '알림 규칙', '보안 검토', '1월 전사 도입'] }),
]

const names = Object.keys(PRESETS)
D.write(fileURLToPath(new URL('./gallery.html', import.meta.url)), slides, {
  css: names.map(n => themeCss(n, `body[data-theme="${n}"]`)).join('\n')
    + '\n' + Object.entries(RULES).map(([k, v]) => `body[data-rules="${k}"]{--rule:${v}}`).join('\n')
    + '\n#theme,#rules{height:44px;border-radius:999px;padding:0 14px;background:var(--stage-2);color:#fff;border:1px solid var(--bar-line);font:600 14px var(--body)}',
  bar: `<select id="theme" aria-label="테마">${names.map(n => `<option>${n}</option>`).join('')}</select><select id="rules" aria-label="블록 위 선">${Object.keys(RULES).map(k => `<option value="${k}">선 ${{ bold: '굵게', light: '얇게', none: '없음' }[k]}</option>`).join('')}</select>`,
  js: `;document.getElementById('theme').onchange=e=>{document.body.dataset.theme=e.target.value};document.getElementById('rules').onchange=e=>{document.body.dataset.rules=e.target.value}`,
})
