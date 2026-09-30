/* ═══════════════════════════════════════════════════════════
   works.js — 작품 아카이브 데이터 (단일 소스)

   전에는 index.html 과 work.html 에 같은 배열이 두 번 들어 있었다.
   이제 이 파일 하나만 고치면 두 페이지 모두에 반영된다.

   필드:
     n     번호 (문자열, "001" 형식)
     t     제목
     y     연도
     v     장소/전시명
     m     재료
     c     분류 코드 — LABELS 참고
     s     대표 이미지 시드 (표지/썸네일)
     raw   "수거 당시" 이미지 시드
     done  "설치 이후" 이미지 시드
     q     수량
     size  규모
     d     설명
   ═══════════════════════════════════════════════════════════ */

export const LABELS = { art: 'Art', sound: 'Sound', arch: 'Architectural', pub: 'Public' };

export const WORKS = [
  { n:'001', t:'Re:one 不二火', y:'2024', v:'Freedots / Symbiosis', m:'폐지관', c:'art', s:'wc1',
    raw:'trash01', done:'work01', q:'100+ 개', size:'H 4,000mm',
    d:'폐기 예정이던 지관을 수거해 겹겹이 얽었다. 검정 껍질이 붉은 불빛을 감싸고, 바흐 푸가 변주곡이 심박음과 섞여 공간을 울린다.' },

  { n:'002', t:'Black Silhouette 現影 : 共生共思', y:'2024', v:'Seoul', m:'담배꽁초', c:'art', s:'wc2',
    raw:'trash03', done:'work03', q:'24,800 개', size:'가변 설치',
    d:'거리에서 모은 꽁초를 압착해 면을 만들었다. 가장 하찮게 버려지는 것으로 그림자의 실체를 세운다.' },

  { n:'003', t:'Resonance 泂然 : Climate Resonance', y:'2024', v:'2024 기후 공명', m:'폐지관·목재', c:'sound', s:'wc3',
    raw:'trash05', done:'work05', q:'620 점', size:'파빌리온',
    d:'파빌리온 구조체 전량을 수거재로 구성했다. 기후 메시지를 재료 자체로 진술한 작업.' },

  { n:'004', t:'Resonance 泂然', y:'2024', v:'제주 유동룡미술관', m:'폐지관', c:'sound', s:'wc4',
    raw:'trash05', done:'work05', q:'340 개', size:'가변 설치',
    d:'2024.06.26 – 11.30. 지관을 숲처럼 세워 전시장을 울림통으로 전환했다.' },

  { n:'005', t:'Papageno : Re:Dream', y:'2023', v:'더현대 목동', m:'수거 오브제', c:'art', s:'wc5',
    raw:'trash02', done:'work02', q:'210 점', size:'가변 설치',
    d:'버려진 일상 오브제를 모아 재구성한 특별전.' },

  { n:'006', t:'Re:relationship — Light Up', y:'2023', v:'Seoul', m:'폐형광등', c:'art', s:'wc6',
    raw:'trash04', done:'work04', q:'3,200 본', size:'가변 설치',
    d:'수명이 다한 형광등을 다시 밝혔다. 관계의 회복을 빛으로 번역한 연작.' },

  { n:'007', t:'Black Silhouette 現影', y:'2022', v:'Seoul', m:'담배꽁초', c:'art', s:'wc7',
    raw:'trash06', done:'work06', q:'11,300 개', size:'가변 설치',
    d:'現影 연작의 초기 버전. 꽁초를 재료로 삼기 시작한 첫 작업.' },

  { n:'008', t:'The Resonance Forest', y:'2022', v:'아트사이드 갤러리', m:'폐지관', c:'sound', s:'wc8',
    raw:'trash01', done:'work01', q:'480 개', size:'가변 설치',
    d:'지관을 숲처럼 세워 갤러리 전체를 하나의 울림통으로 만든 개인전.' },

  { n:'009', t:'Daybreak', y:'2021', v:'Seoul', m:'폐스피커', c:'sound', s:'wc9',
    raw:'trash02', done:'work02', q:'1,886 개', size:'가변 설치',
    d:'버려진 스피커 1,886개를 모아 결핍에서 작은 위로를 만들어냈다. 각각을 분해하고 다시 울리게 했다.' },

  { n:'010', t:'Towards 向 : Indigo Sky', y:'2021', v:'경상북도청 광장', m:'수거 스테인리스', c:'pub', s:'wc10',
    raw:'trash04', done:'work04', q:'86 점', size:'옥외 조형',
    d:'대구경북통합신공항의 성공을 기원하며 도청 앞에 헌정된 조형물.' },

  { n:'011', t:'Resonance 泂然 : Gyeongju', y:'2021', v:'경주엑스포', m:'폐지관', c:'pub', s:'wc11',
    raw:'trash05', done:'work05', q:'—', size:'가변 설치',
    d:'맑고 깊은 울림을 전하는 泂然을 경주엑스포에서 공개.' },

  { n:'012', t:'Resonance 泂然 : Reconcile', y:'2011', v:'Seoul', m:'폐지관', c:'art', s:'wc12',
    raw:'trash01', done:'work01', q:'—', size:'가변 설치',
    d:'화해를 주제로 한 공명 연작.' },

  { n:'013', t:'Resonance 泂然 : Audi A8 Pavilion', y:'2010', v:'Audi Pavilion', m:'파빌리온', c:'arch', s:'wc13',
    raw:'trash03', done:'work03', q:'—', size:'파빌리온',
    d:'브랜드 파빌리온 공간에 적용한 건축적 공명 구조.' },

  { n:'014', t:'Resonance 泂然 : Korean Embassy', y:'2008', v:'주한 대사관', m:'건축 설치', c:'arch', s:'wc14',
    raw:'trash06', done:'work06', q:'—', size:'건축 통합',
    d:'대사관 건축에 통합된 초기 공명 설치.' }
];
