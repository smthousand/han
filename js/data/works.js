/* ═══════════════════════════════════════════════════════════
   works.js — 작품 등록부 (단일 소스)

   수집가가 조회하는 항목을 기준으로 필드를 짰다.
     id      등록번호 (WH-연도-일련)
     t/te    제목 (국/영)
     y       제작연도
     unit    유닛           n     유닛 수량 (이 작가의 핵심 수치)
     mat     재료 전체 기재
     dim     규모
     ed      에디션
     status  soldout | available | collection | commission
     hold    소장처
     prov    출처·이력
     exh     전시 이력 [연도, 전시명, 장소]
     raw/done  수거 당시 / 설치 이후 도판
   ═══════════════════════════════════════════════════════════ */

export const STATUS = {
  available : { t:'문의 가능',  k:'Available' },
  soldout   : { t:'소장 완료',  k:'Sold' },
  collection: { t:'기관 소장',  k:'Museum Collection' },
  commission: { t:'커미션',     k:'Commission' }
};

export const WORKS = [
  {
    id:'WH-2003-001', t:'악의 꽃', te:'The Flower of Evil', y:'2003',
    unit:'담배꽁초', n:167670,
    mat:'담배꽁초, 아크릴, 스틸 프레임',
    dim:'2,400 × 1,800 mm (가변)',
    ed:'유일본', status:'soldout',
    hold:'개인 소장, 서울',
    prov:'갤러리 아트사이드(2003) — 개인 소장',
    exh:[['2003','1st 〈The Flower of Evil〉','갤러리 아트사이드, 서울'],
         ['2006','Chinese Art Today 2006','중국미술관, 베이징']],
    raw:'plate601', done:'plate602'
  },
  {
    id:'WH-2014-002', t:'사운드 사일로', te:'Sound Silo', y:'2014',
    unit:'사일로', n:1,
    mat:'폐사일로, 스피커, 앰프, 사운드',
    dim:'Φ3,200 × H 12,000 mm',
    ed:'유일본', status:'collection',
    hold:'창원시 영구 설치',
    prov:'창원조각비엔날레 커미션(2014) — 창원시 이관',
    exh:[['2014','창원조각비엔날레','창원']],
    raw:'plate401', done:'plate402'
  },
  {
    id:'WH-2020-003', t:'관계의 회복', te:'Re:relationship', y:'2020',
    unit:'폐헤드라이트', n:1374,
    mat:'폐차 헤드라이트, LED, 스틸',
    dim:'6,000 × 2,700 mm (가변)',
    ed:'유일본', status:'soldout',
    hold:'개인 소장, 서울',
    prov:'서울도시건축전시관(2020) — 개인 소장',
    exh:[['2020','8th 〈Re:relationship〉','서울도시건축전시관']],
    raw:'plate501', done:'plate502'
  },
  {
    id:'WH-2021-004', t:'여명', te:'Daybreak', y:'2021',
    unit:'폐스피커', n:3088,
    mat:'폐스피커 유닛, 앰프, 8채널 사운드',
    dim:'8,000 × 3,000 mm (가변)',
    ed:'유일본', status:'available',
    hold:'작가 소장',
    prov:'금호알베르(2021) — 작가 소장',
    exh:[['2021','10th 〈Daybreak〉','금호알베르, 서울'],
         ['2022','12th 〈Black Silhouette〉','금호알베르, 서울']],
    raw:'plate201', done:'plate202'
  },
  {
    id:'WH-2023-005', t:'파파게노 — 다시, 꿈', te:'Papageno – Re:dream', y:'2023',
    unit:'폐지관', n:10,
    mat:'폐지관(10T), LED, 스피커, 혼합재료',
    dim:'Φ122 × H 4,000 mm × 10점',
    ed:'유일본', status:'commission',
    hold:'현대백화점 목동점 상설',
    prov:'현대백화점 커미션(2023)',
    exh:[['2023','13th 〈Papageno – Re:dream〉','현대백화점 목동점']],
    raw:'plate101', done:'plate102'
  },
  {
    id:'WH-2024-006', t:'형연 泂然', te:'Resonance', y:'2024',
    unit:'폐금속관', n:4,
    mat:'폐금속관, 사운드 시스템',
    dim:'가변 설치',
    ed:'유일본', status:'available',
    hold:'작가 소장',
    prov:'유동룡미술관 개인전(2024) — 작가 소장',
    exh:[['2024','Resonance 泂然','유동룡미술관, 제주 (06.26–11.30)']],
    raw:'plate301', done:'plate302'
  }
];
