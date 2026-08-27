/* ═══════════════════════════════════════════════════════════
   about.js — about.html 전용 스크립트 (연표 + 평론 렌더링)
   ═══════════════════════════════════════════════════════════ */

/* 연표 데이터 — [연도, 분야, 내용, 부기]
   분야를 나누지 않고 한 줄기로 섞는다. */
var T = [
  ['2025', '개인전', '16th 〈Langue des trous noirs〉', '한국문화예술위원회 지원 · 부산'],
  ['2025', '단체전', 'Seoul Winter Festa', '서울'],
  ['2024', '개인전', '15th 〈Re:Forest Sound〉', '백해영갤러리 · 서울'],
  ['2024', '단체전', 'Climate Resonance', '광화문광장 · 서울'],
  ['2024', '단체전', 'Incheon Artshow 2024', '송도컨벤시아 · 인천'],
  ['2024', '단체전', 'Seoul Design 2024', 'DDP · 서울'],
  ['2024', '단체전', 'Artists with Warm Hands', '유동룡미술관 · 제주'],
  ['2024', '단체전', 'Alone Be Together', 'The Lits · 서울'],
  ['2024', '소장', '〈Resonance〉', '경상북도청 · 안동'],
  ['2023', '개인전', '14th 〈不.二.火 – Re:one〉', '금호알베르 · 서울'],
  ['2023', '개인전', '13th 〈Papageno – Re:dream〉', '현대백화점 목동점'],
  ['2023', '단체전', 'Sculpture in the City 12th · shortlisted', '런던, 영국'],
  ['2022', '개인전', '12th 〈Black Silhouette〉', '금호알베르 · 서울'],
  ['2022', '개인전', '11th 〈Sound Forest〉', '갤러리 아트사이드 · 서울'],
  ['2021', '개인전', '10th 〈Daybreak〉', '금호알베르 · 서울'],
  ['2021', '개인전', '9th 〈Towards(向) : Indigo Sky〉', '경상북도청 · 안동'],
  ['2021', '소장', '〈Sound Tree〉', '안뮤지엄 · 경주 / 유동룡미술관 · 제주 / 봄아트갤러리 · 제주'],
  ['2021', '소장', '〈Resonance(泂然)〉', '경주엑스포'],
  ['2020', '개인전', '8th 〈Re:relationship〉', '서울도시건축전시관'],
  ['2019', '개인전', '7th 〈Glittering Pathway〉', '부산'],
  ['2019', '건축', 'DRB 마을버스 6번 건축 기획', '부산'],
  ['2018', '건축', 'BNK 부산은행 플래그십 지점', '부산'],
  ['2018', '건축', '평창동계올림픽 올림픽페스티벌파크 건축 기획', '평창 · 강릉'],
  ['2017', '개인전', '6th 〈Reconciled with Vestiges〉', '대구 삼성창조캠퍼스'],
  ['2017', '건축', 'UIA 2017 SEOUL 건축 디자인', '서울'],
  ['2016', '개인전', '5th 〈Hello, Hui〉', '해방촌 · 서울'],
  ['2016', '건축', '삼성 블루스퀘어 컬처파크 프로젝트 (—2013)', '서울'],
  ['2016', '건축', '하남 컨테이너 복합문화공간 기획·설계', ''],
  ['2015', '단체전', 'Chambres Bondées', '파리, 프랑스'],
  ['2015', '건축', '이중섭거리 문화공간 공모 당선', '제주'],
  ['2014', '단체전', '창원조각비엔날레', '창원'],
  ['2014', '단체전', 'Glenfiddich AIR', '더프타운, 스코틀랜드'],
  ['2013', '건축', '소치동계올림픽 평창하우스 기획 설계', '러시아'],
  ['2012', '단체전', 'New Audi Q3 Art and Architecture', '블루스퀘어 아트스페이스 · 서울'],
  ['2012', '수상', 'IT Award 대상 — 〈NEMO〉 환경·공간 디자인', '서울'],
  ['2011', '개인전', '4th 〈Reconciled〉', '갤러리 압생트 · 서울'],
  ['2011', '단체전', 'Resonance(泂然) · 제48회 대종상영화제', '세종문화회관 · 서울'],
  ['2011', '단체전', 'Sea of Peace 2', '인천시청'],
  ['2011', '건축', '허영만 스튜디오 블록 건축 기획', '부천 한국만화영상진흥원'],
  ['2010', '단체전', '60주년 6·25 평화 기원전', '청계천 · 서울'],
  ['2010', '단체전', '2010 Korea Tomorrow', 'SETEC · 서울'],
  ['2010', '단체전', 'The Art of Progress — New Audi A8 런칭쇼', '올림픽공원 · 서울'],
  ['2010', '건축', '문화공간 NEMO 건축 기획', '서울'],
  ['2009', '단체전', 'The Earth', '성북구립미술관 · 서울'],
  ['2009', '단체전', 'Sound Forest', '자넷오갤러리 · 서울'],
  ['2009', '소장', '〈Norwegian Forest – This Bird Has Flown〉', 'FEZH · 서울'],
  ['2009', '건축', "당진 K's House / RIZOME 리뉴얼", '서울'],
  ['2008', '개인전', '3rd 〈Resonance〉', '다산쯔 798 예술구 · 베이징'],
  ['2008', '단체전', '부산비엔날레', '부산'],
  ['2008', '단체전', '주중 한국대사관저 개관전', '베이징, 중국'],
  ['2008', '소장', '〈Rebirth〉 · 〈Mother Arms〉 · 〈나래소이북〉', '경상북도청 / LIG넥스원 / 국립과천과학관'],
  ['2007', '건축', '모리아트센터 전시 기획', '일본'],
  ['2007', '건축', 'Calla (에버콘 메디컬몰)', '서울'],
  ['2006', '개인전', '2nd 〈Rebirth〉', '청계천 · 서울 — 복원 1주년 기념, 서울시 주최'],
  ['2006', '단체전', 'Chinese Art Today 2006', '중국미술관 · 베이징'],
  ['2006', '단체전', 'Dreaming Object', '금호갤러리 · 서울'],
  ['2006', '건축', 'Thimbloom I & II · 성북동 H주택 리뉴얼', '서울'],
  ['2005', '건축', '소마미술관(SOMA) 리뉴얼 기획 · Paper Dome', '서울 · 용인'],
  ['2004', '학력', '도쿄대학교 대학원 건축학과 박사과정 수료 (—2007)', 'Univ. of Tokyo, Japan'],
  ['2004', '건축', '성균관대 박물관 · 공간 이음 · 아트사이드 리노베이션 설계', '서울 · 베이징'],
  ['2003', '개인전', '1st 〈The Flower of Evil〉', '갤러리 아트사이드 · 서울'],
  ['2003', '단체전', 'Chelsea College of Art & Design Show', '맨레사로드 · 런던'],
  ['2002', '단체전', 'Borrowed Space — Time Bound', 'Architecture Foundation · 런던'],
  ['2002', '학력', '네덜란드 환경건축 연구 프로그램', 'Dutch Environmental Architecture'],
  ['2002', '학력', '센트럴 세인트 마틴 연구생 (—2003)', 'Central Saint Martins, UK'],
  ['2002', '수상', 'UAL Chelsea Graduate Award', '런던, 영국'],
  ['2001', '학력', '첼시 예술대학 석사 (—2002)', 'MA, Chelsea College of Art & Design, UK']
];

var C = [
  ['사회적 부조리와 불안 속에서도 열정과 실천으로 국제적 성취를 이뤄낸 작가.', '서진석', '부산시립미술관 관장 · 큐레이터', '2024'],
  ['어둠과 빛, 소리와 공간을 써서 버려진 사물을 되살리고 희망과 치유의 메시지를 전한다.', '안현정', '미술평론가 · 예술철학 박사', '2022'],
  ['어둠과 소리를 통해 관람자의 감각과 마음을 치유하는 몰입 공간을 만든다.', '김성호', '2021 강원국제트리엔날레 예술감독', '2021'],
  ['예술과 건축의 경계를 흐리며, 작업으로 소통과 기획과 삶을 가르친다.', '신지섭', '매트리스 대표 · 건축가', '2018'],
  ['건축과 설치미술을 잇고, 재사용과 문화공간과 국제 교류로 지역과 세계를 연결한다.', '조성룡', '성룡도시건축 대표 · 성균관대 명예교수', '2014'],
  ['블루스퀘어 NEMO를 설계해 건축과 예술의 경계를 허무는 실험적 창작을 이끌었다.', '최태만', '국민대 예술대학 학부장 · 미술평론가', '2012']
];

(function () {
  requestAnimationFrame(function () { document.body.classList.add('ready'); });

  /* 연도별로 묶는다 */
  var tl = document.getElementById('tl'), cur = null, box = null;
  T.forEach(function (r) {
    if (r[0] !== cur) {
      cur = r[0];
      var w = document.createElement('div'); w.className = 'yr';
      w.innerHTML = '<div class="y">' + cur + '</div><div class="items"></div>';
      tl.appendChild(w); box = w.querySelector('.items');
    }
    var it = document.createElement('div'); it.className = 'it';
    it.innerHTML = '<span class="k' + (r[1] === '개인전' ? ' solo' : '') + '">' + r[1] + '</span>' +
      '<span class="v">' + r[2] + (r[3] ? '<br><em>' + r[3] + '</em>' : '') + '</span>';
    box.appendChild(it);
  });

  var cr = document.getElementById('crit');
  cr.innerHTML = '<div class="lb" style="margin-bottom:34px">평론 — 2024 한원석 건축·예술 도록 발췌</div>' +
    C.map(function (c) {
      return '<div class="q"><p>' + c[0] + '</p>' +
        '<div class="src"><b>' + c[1] + '</b>' + c[2] + '<br>' + c[3] + '</div></div>';
    }).join('');
})();
