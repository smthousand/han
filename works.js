/* 작품 목록 — 「작품 정리」 문서 원문 그대로
   문서의 항목 번호와 필드를 1:1로 옮겼다. 값은 문서에 적힌 표기(영문: 국문) 그대로다.

   cat     1. 작품의 구분1
   series  2. 작품의 구분2
   t / ko  3. 작품명 (원어 / 국문)
   y       4. 연도
           5. 작품 설명 → texts.js
           6. 작품의 식별 정보
   made      6-1 제작년도
   size      6-2 크기, 재료
   type      6-3 작품유형
   place     6-4 설치 장소
   event     6-5 커미션을 준 기관 / 행사
   credit    6-6 협업자 정보
   tags      6-7 태그
           7. 코멘트·인용구 → texts.js
   id      상세가 있는 작품만 가진다. 없으면 목록에 이름만 나온다.
   img     사진 파일명 (img 폴더 안). 사진이 들어오면 채운다.
   note    목록에서 제목 아래 함께 적는 내용 */

var WORKS = [

  /* ── Installation · BLACK SILHOUETTE ───────────────────── */
  { id: 'bs-a', cat: 'Installation', series: 'BLACK SILHOUETTE',
    t: 'BLACK Silhouette(現影)', ko: '현영現影', y: '2025',
    made: '2025',
    size: 'Φ 227 x H 375cm, 3,088 Speakers',
    type: 'Temporary Installation: 임시설치',
    place: 'Lahan Select Gyeongju, Gyeongju, Korea, 라한셀렉트 경주, 경주, 대한민국',
    event: 'Farewell Dinner for the High-Level Dialogue on Cultural Industries in Gyeongju: 경주 문화산업고위급대화 환송만찬',
    credit: 'Sound source / Kim Tae-geun: 음향 / 김태근',
    tags: 'Sound / Light / Interactive / Site-specific / Pavilion', img: [] },

  { id: 'bs-b', cat: 'Installation', series: 'BLACK SILHOUETTE',
    t: 'BLACK Silhouette(現影): 共生共思', ko: '현영現影: 공생공사', y: '2024',
    made: '2024',
    size: 'Φ 227 x H 375cm, 3,088 Speakers',
    type: 'Team Exhibition: 기획전',
    place: 'The Lit, Hanam, Korea : 더릿, 하남, 대한민국',
    event: 'The Lit Symbiosis and Co-destruction Exhibition : 더릿 공생공사 전시전',
    credit: 'Sound source / Lee Ye-chan: 음향 / 이예찬',
    tags: 'Sound / Light / Interactive / Site-specific / Pavilion', img: [] },

  { id: 'bs-c', cat: 'Installation', series: 'BLACK SILHOUETTE',
    t: 'Resonance(泂然)', ko: '형연泂然', y: '2024',
    made: '2024',
    size: 'Φ 227 x H 375cm, 3,088 Speakers, Mixed media',
    type: 'Permanent Installation: 영구설치',
    place: 'Gyeongsangbuk-do Provincial Office, Andong, Korea: 경상북도청, 안동, 대한민국',
    event: 'Gyeongsangbuk-do Provincial Office, Andong, Korea: 경상북도청, 안동, 대한민국',
    credit: 'Sound source / Kim Tae-geun: 음향 / 김태근',
    tags: 'Sound / Light / Interactive / Site-specific / Public Art', img: [] },

  { id: 'bs-d', cat: 'Installation', series: 'BLACK SILHOUETTE',
    t: 'Resonance(泂然): Climate Resonance', ko: '형연泂然: 기후공명', y: '2024',
    made: '2024',
    size: 'Φ 227 x H 375cm, 3,088 Speakers, Mixed media',
    type: 'Team Exhibition: 기획전',
    place: 'Gwanghwamun Square, Seoul, Korea: 광화문광장, 서울, 대한민국',
    event: '2024 Climate Resonance Project, 2024 기후공명 프로젝트',
    credit: 'Sound source / Yoo Young-eun: 음향 / 유영은',
    tags: 'Sound / Light / Interactive / Site-specific / Public Art', img: [] },

  { id: 'bs-e', cat: 'Installation', series: 'BLACK SILHOUETTE',
    t: 'BLACK Silhouette(現影)', ko: '현영現影', y: '2022',
    made: '2022',
    size: 'Φ 227 x H 375cm, 3,088 Speakers, Mixed media',
    type: 'Private collection : 개인 소장',
    place: 'Kumho Albert Seoul, Seoul, Korea: 금호 알베르 서울, 서울, 대한민국',
    event: 'Kumho Albert Seoul - The Silhouette: 금호알베르 서울 - 한원석 초대전',
    credit: 'Singer / Wonsuk Han: 가수 / 한원석',
    tags: 'Sound / Light / Interactive / Site-specific / Pavilion', img: [] },

  { id: 'bs-f', cat: 'Installation', series: 'BLACK SILHOUETTE',
    t: 'Resonance(泂然): Gyeongju', ko: '형연泂然: 경주', y: '2021',
    made: '2021',
    size: 'Φ 227 x H 375cm, 3,088 Speakers',
    type: 'Private collection : 개인 소장',
    place: 'Gyeongju Expo Cultural Center, Gyeongju, Korea, 경주 엑스포 문화센터, 경주, 대한민국',
    event: 'Gyeongju Expo, 2021: 2021 경주 엑스포, 2021',
    credit: 'Sound source / Kim Tae-geun: 음향 / 김태근',
    tags: 'Sound / Light / Interactive / Site-specific / Public Art', img: [] },

  { id: 'bs-g', cat: 'Installation', series: 'BLACK SILHOUETTE',
    t: 'Resonance(泂然): Reconcile', ko: '형연泂然-화해의 울림', y: '2011',
    made: '2011',
    size: 'Φ 227 x H 375cm, 3,088 Speakers',
    type: 'Temporary Installation: 임시설치',
    place: 'Seoul Sejong Center for the Performing Arts, Seoul, Korea: 세종문화회관, 서울, 대한민국',
    event: 'The 48th Daejong Film Awards: 제 48회 대종상시상식',
    credit: 'Sound source / Kim Tae-geun: 음향 / 김태근',
    tags: 'Sound / Light / Interactive / Site-specific / Pavilion', img: [] },

  { id: 'bs-h', cat: 'Installation', series: 'BLACK SILHOUETTE',
    t: 'Resonance(泂然): Reconcile', ko: '형연泂然-화해의 울림', y: '2011',
    made: '2011',
    size: 'Φ 227 x H 375cm, 3,088 Speakers',
    type: 'Team Exhibition: 기획전',
    place: 'Incheon Art Platform, Incheon, Korea: 인천아트플랫폼, 인천, 대한민국',
    event: 'The 4th Anniversary of the Oct 4th South-North Joint Declaration: Sea of Conflict, Sea of Reconciliation, 2011: 10•4 남북공동선언 4주년 기념 <분쟁의 바다 화해의 바다>, 2011',
    credit: 'Sound source / Kim Tae-geun: 음향 / 김태근',
    tags: 'Sound / Light / Interactive / Site-specific / Public Art / Pavilion', img: [] },

  { id: 'bs-i', cat: 'Installation', series: 'BLACK SILHOUETTE',
    t: 'Resonance(泂然): Audi A8 Pavilion', ko: '형연泂然: 아우디 A8 파빌리온', y: '2010',
    made: '2010',
    size: 'Φ 227 x H 375cm, 3,088 Speakers',
    type: 'Team Exhibition: 기획전',
    place: 'Olympic Park, Seoul, Korea: 올림픽공원, 서울, 대한민국',
    event: 'Audi A8 Pavilion, 2010: 아우디 A8 파빌리온, 2010',
    credit: 'Composer / AUDI HEARTBEAT: 작곡 / AUDI HEARTBEAT',
    tags: 'Sound / Light / Interactive / Site-specific / Pavilion', img: [] },

  { id: 'bs-j', cat: 'Installation', series: 'BLACK SILHOUETTE',
    t: 'Resonance(泂然)', ko: '형연泂然', y: '2010',
    made: '2010',
    size: 'Φ 227 x H 375cm, 3,088 Speakers',
    type: 'Team Exhibition: 기획전',
    place: 'Cheonggyecheon, Seoul, Korea, 2010: 청계천, 서울, 대한민국, 2010',
    event: 'Peace Prayer Festival for the 60th Anniversary of the Korean War, 2010: 6·25 60주년 평화염원 범국민 한마당, 2010',
    credit: 'Sound source / Kim Tae-geun: 음향 / 김태근',
    tags: 'Sound / Light / Interactive / Site-specific / Public Art', img: [] },

  { id: 'bs-k', cat: 'Installation', series: 'BLACK SILHOUETTE',
    t: 'Resonance(泂然): Korean Embassy', ko: '형연泂然: 주한대사관', y: '2008',
    made: '2008',
    size: 'Φ 227 x H 375cm, 3,088 Speakers',
    type: 'Team Exhibition: 기획전',
    place: 'The Korea Ambassador’s residence, Beijing, China, 2008: 주중 한국대사관 저, 베이징, 중국, 2008',
    event: 'The Korea Ambassador’s residence, Beijing, China, 2008: 주중 한국대사관 저, 베이징, 중국, 2008',
    credit: 'Sound source / Kim Tae-geun: 음향 / 김태근',
    tags: 'Sound / Light / Interactive / Site-specific / Pavilion', img: [] },

  { id: 'bs-l', cat: 'Installation', series: 'BLACK SILHOUETTE',
    t: 'Resonance(泂然): Busan Biennale', ko: '형연泂然: 부산 비앤날레', y: '2008',
    made: '2008',
    size: 'Φ 227 x H 375cm, 3,088 Speakers',
    type: 'Team Exhibition: 기획전',
    place: 'Busan Biennale, Busan, Korea: 부산 비엔날레, 부산, 대한민국',
    event: '2008 Busan Biennale: 2008 부산 비엔날레',
    credit: 'Sound source / Kim Tae-geun: 음향 / 김태근',
    tags: 'Sound / Light / Interactive / Site-specific / Pavilion', img: [] },

  { id: 'bs-m', cat: 'Installation', series: 'BLACK SILHOUETTE',
    t: 'Resonance(泂然)', ko: '형연泂然', y: '2008',
    made: '2008',
    size: 'Φ 227 x H 375cm, 3,088 Speakers',
    type: 'Solo exhibition: 개인전',
    place: '798 Art District, Dashanzi, Beijing, China: 798 예술구 다산쯔, 베이징, 중국',
    event: '798 Dashanzi Exhibition for 2008 Beijing Olympics: 2008 베이징 올림픽 기념 798 다산쯔 예술 축제',
    credit: 'Sound source / Kim Tae-geun: 음향 / 김태근',
    tags: 'Sound / Light / Interactive / Site-specific / Pavilion', img: [] },

  { id: 'bs-n', cat: 'Installation', series: 'BLACK SILHOUETTE',
    t: 'Narae-soebuk', ko: '나래쇠북', y: '2008',
    made: '2008',
    size: 'Φ 227 x H 375cm, 3,088 Speakers',
    type: 'Permanent Installation: 영구설치',
    place: 'New National Science Museum, Gwacheon, Korea: 과천국립과학관, 대한민국',
    event: 'The South Korea National Science center Opening: 新 국립과학관 건립 기념식',
    credit: 'Sound source / Kim Tae-geun: 음향 / 김태근',
    tags: 'Sound / Light / Interactive / Site-specific / Public Art', img: [] },

  /* ── Installation · SOUND TREE ─────────────────────────── */
  { id: 'st-a', cat: 'Installation', series: 'SOUND TREE',
    t: 'Thought within the Black Hole', ko: '검은 구멍의 혀', y: '2025',
    made: '2025',
    size: '400cm X 600cm X (H) 400cm, paper tube, mixed media',
    type: 'Solo exhibition: 개인전',
    place: 'Dongil Rubber Belt Dongrae Factory, Busan, Korea: 동일고무벨트 동래공장, 부산, 한국',
    event: 'The Thought within the Black Hole Exhibition: 지각의 경계: 검은 구멍 속 사유 전시회',
    credit: 'Curator / Eun-young Gim Choe: 기획 / 김최은영\nSound source / Young-eun Yoo: 음향 / 유영은\nPerformance / Ye-chan Lee, Gwan-ji Kim, Hye-in Pyo: 퍼포먼스 / 이예찬, 김관지, 표혜인',
    tags: 'Installation / Sound / Light / Interactive / Site-specific / Pavilion', img: [] },

  { id: 'st-b', cat: 'Installation', series: 'SOUND TREE',
    t: 'Re-Forest Sound Pavilion: DDP', ko: '리-포레스트 사운드 파빌리온: DDP', y: '2024',
    made: '2024',
    size: '400cm X 600cm X (H) 400cm, paper tube, mixed media',
    type: 'Team Exhibition: 기획전',
    place: 'Dongdaemun Design Plaza, Seoul, Korea: 동대문디자인플라자, 서울, 대한민국',
    event: 'Seoul Design Festival 2024: 서울디자인페스티벌 2024',
    credit: 'Sound source / Young-eun Yoo: 음향 / 유영은',
    tags: 'Installation / Sound / Light / Interactive / Site-specific / Public Art / Pavilion', img: [] },

  { id: 'st-c', cat: 'Installation', series: 'SOUND TREE',
    t: 'Re-Forest Sound Pavilion', ko: '리-포레스트 사운드 파빌리온', y: '2024',
    made: '2024',
    size: '400cm X 600cm X (H) 400cm, paper tube, mixed media',
    type: 'Solo exhibition: 개인전',
    place: 'Paik Hae Young Gallery, Seoul, Korea: 백해영 갤러리, 서울, 대한민국',
    event: "Won-seok Han Solo Exhibition 'RE:forest Sound Pavilion' at Paik Hae Young Gallery: 백해영갤러리 한원석 개인전 'RE:forest Sound Pavilion'",
    credit: 'Sound source / Young-eun Yoo: 음향 / 유영은',
    tags: 'Installation / Sound / Light / Interactive / Site-specific / Pavilion', img: [] },

  /* 문서: 연도 2024, 제작년도 2009 — 원문 그대로 둠 */
  { id: 'st-d', cat: 'Installation', series: 'SOUND TREE',
    t: 'Sound Tree', ko: '소리나무', y: '2024',
    made: '2009',
    size: 'Φ12 x H 190cm',
    type: 'Team Exhibition: 기획전',
    place: 'A Jujube Field Oriental Medical Clinic, Gyeongju, Korea: 대추밭한의원, 경주, 대한민국',
    event: 'A Jujube Field Oriental Medical Clinic: 대추밭한의원',
    credit: 'Composer / Young-eun Yoo: 작곡가 / 유영은',
    tags: 'Installation / Sound / Interactive / Site-specific / Pavilion', img: [] },

  { cat: 'Installation', series: 'SOUND TREE', t: 'Sound Tree', y: '2024' },
  { cat: 'Installation', series: 'SOUND TREE', t: 'PAPAGENO RE: DREAM', y: '2023' },
  { cat: 'Installation', series: 'SOUND TREE', t: 'Sound Forest', y: '2022' },
  { cat: 'Installation', series: 'SOUND TREE', t: 'Gwan-Eum(觀音) III', y: '2015' },
  { cat: 'Installation', series: 'SOUND TREE', t: 'Gwan-Eum(觀音) II', y: '2015' },
  { cat: 'Installation', series: 'SOUND TREE', t: 'Sound Forest: Earth 展', y: '2011' },
  { cat: 'Installation', series: 'SOUND TREE', t: 'Gwan-Eum(觀音) I', y: '2010' },
  { cat: 'Installation', series: 'SOUND TREE', t: 'Sound Forest III', y: '2010' },
  { cat: 'Installation', series: 'SOUND TREE', t: 'Sound Forest II', y: '2010' },

  /* 문서를 읽은 내용이 이 항목의 태그 부분에서 끊겼다 (…Site-specific / Pavili) */
  { id: 'st-m', cat: 'Installation', series: 'SOUND TREE',
    t: 'Sound Forest II - Sublime', ko: '소리숲 II - 숭고', y: '2009',
    made: '2009',
    size: 'Φ12 x H 300cm Paper Cylinder 82ea,Speakers',
    type: 'Team Exhibition: 기획전',
    place: 'Icheon Art Hall, Icheon, Korea: 이천아트홀, 이천, 대한민국',
    event: 'Icheon Art Hall Opening Ceremony: 이천아트홀 개관식',
    credit: 'Sound source / Tae-geun Kim,Chang-hoon Kim : 음향 / 김태근,김창훈',
    tags: 'Installation / Sound / Light / Interactive / Site-specific / Pavilion', img: [] },

  { cat: 'Installation', series: 'SOUND TREE', t: 'Sound Forest I', y: '2009' },

  /* ── Installation · REBIRTH ────────────────────────────── */
  { cat: 'Installation', series: 'REBIRTH', t: 'Rebirth(還生): Silla Cultural Festival', y: '2021' },
  { cat: 'Installation', series: 'REBIRTH', t: 'Rebirth(還生)', y: '2021' },
  { cat: 'Installation', series: 'REBIRTH', t: 'Rebirth(還生): Shine a light of hope', y: '2020' },
  { cat: 'Installation', series: 'REBIRTH', t: 'Rebirth(還生)', y: '2014' },
  { cat: 'Installation', series: 'REBIRTH', t: 'Rebirth(還生)', y: '2006' },

  /* ── Installation · RECONCILED ─────────────────────────── */
  { cat: 'Installation', series: 'RECONCILED', t: 'Daybreak: A dreamy journey', y: '2022' },
  { cat: 'Installation', series: 'RECONCILED', t: 'The Resonance Forest', y: '2022' },
  { cat: 'Installation', series: 'RECONCILED', t: 'Daybreak 82 x 23', y: '2021' },
  { cat: 'Installation', series: 'RECONCILED', t: 'Reconciled Ⅱ', y: '2011' },
  { cat: 'Installation', series: 'RECONCILED', t: 'Reconciled I', y: '2011' },

  /* ── Installation · THE FLOWER OF EVIL ─────────────────── */
  { cat: 'Installation', series: 'THE FLOWER OF EVIL',
    t: 'The Flower of Evil', y: '2003',
    note: 'The Flower of Evil, Burned Out, Trace, Greedy Flower, Burning, Self Portrait(L), Self Portrait(R), Stupid Smile, Oh! korea, Snow, Star (12 pieces)' },

  /* ── Installation · OTHER WORKS ────────────────────────── */
  { cat: 'Installation', series: 'OTHER WORKS', t: 'Re-one(不.二.火): 共生共思', y: '2024' },
  { cat: 'Installation', series: 'OTHER WORKS', t: 'Re-one(不.二.火)', y: '2023' },
  { cat: 'Installation', series: 'OTHER WORKS', t: 'Towards(向): Indigo Sky', y: '2020' },
  { cat: 'Installation', series: 'OTHER WORKS', t: 'Glittering Pathway(到耿)', y: '2019' },
  { cat: 'Installation', series: 'OTHER WORKS', t: 'Moon Window', y: '2014' },
  { cat: 'Installation', series: 'OTHER WORKS', t: "Mother's arms", y: '2010' },

  /* ── Architectural ─────────────────────────────────────── */
  { cat: 'Architectural', series: '', t: 'APEC banquet hall', y: '2025' },
  { cat: 'Architectural', series: '', t: 'Bloom-Up', y: '2019' },
  { cat: 'Architectural', series: '', t: 'Village Bus 6', y: '2019' },
  { cat: 'Architectural', series: '', t: 'PyeongChang Olympic Festival Park', y: '2018' },
  { cat: 'Architectural', series: '', t: 'SAMSUNG BLUE SQUARE Renewal', y: '2016' },
  { cat: 'Architectural', series: '', t: 'PyeongChang House Conception 胎夢', y: '2014' },
  { cat: 'Architectural', series: '', t: 'Benz Pavilion', y: '2013' },
  { cat: 'Architectural', series: '', t: 'NEMO', y: '2012' },
  { cat: 'Architectural', series: '', t: 'Dangjin K’s House', y: '2010' },
  { cat: 'Architectural', series: '', t: 'RIZOME Renewal', y: '2009' },
  { cat: 'Architectural', series: '', t: 'Calla (Everone Medical Mall)', y: '2009' },
  { cat: 'Architectural', series: '', t: 'Paper dome', y: '2007' },
  { cat: 'Architectural', series: '', t: 'ThimBloom I & II', y: '2007' },
  { cat: 'Architectural', series: '', t: 'Seongbuk-dong H’s House Renewal', y: '2007' },
  { cat: 'Architectural', series: '', t: 'SOMA Seoul Olympic Museum Renewal', y: '2006' },
  { cat: 'Architectural', series: '', t: 'Dangnim Art Museum', y: '1999' },
  { cat: 'Architectural', series: '', t: 'WooHyuk’s Villa', y: '1997' },
  { cat: 'Architectural', series: '', t: 'Bar DDong', y: '1995' },
  { cat: 'Architectural', series: '', t: 'Jazz Story', y: '1994' },
  { cat: 'Architectural', series: '', t: 'Tree Day', y: '1994' }
];
