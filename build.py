#!/usr/bin/env python3
# 한원석 사이트 생성기
#
# CSS 없음. JS 없음. 브라우저 기본 렌더링 그대로.
# 작품을 추가하려면 아래 WORKS 에 한 줄 넣고 다시 실행하면 된다.

import os, re

OUT = os.path.dirname(os.path.abspath(__file__))

# (제목, 연도, 파일명, 장소, 재료, 수량, 규모, 수거이미지, 설치이미지, 기재)
WORKS = [
    ("Daybreak", "2021", "daybreak",
     "금호알베르, 서울", "폐스피커", "3,088", "가변 설치",
     "plate201", "plate202",
     "수명이 다한 스피커를 분해하고 다시 울리게 했다."),

    ("Papageno – Re:dream", "2023", "papageno",
     "현대백화점 목동점, 서울", "폐지관", "10T", "H 4,000mm",
     "plate101", "plate102",
     "폐기 예정이던 지관을 겹겹이 얽었다. 검정 껍질이 붉은 불빛을 감싼다."),

    ("Re:relationship", "2020", "rerelationship",
     "서울도시건축전시관", "폐헤드라이트", "1,374", "가변 설치",
     "plate501", "plate502",
     "빛을 잃은 헤드라이트를 다시 밝혔다."),

    ("Resonance 泂然", "2024", "resonance",
     "유동룡미술관, 제주", "폐금속관", "4", "가변 설치",
     "plate301", "plate302",
     "2024.06.26 – 11.30. 관을 숲처럼 세워 전시장을 울림통으로 삼았다."),

    ("Sound Silo", "2014", "soundsilo",
     "창원조각비엔날레, 창원", "사일로", "1", "옥외 설치",
     "plate401", "plate402",
     "쓰임이 끝난 사일로 한 기를 통째로 울림통으로 삼았다."),

    ("The Flower of Evil", "2003", "flowerofevil",
     "갤러리 아트사이드, 서울", "담배꽁초", "167,670", "가변 설치",
     "plate601", "plate602",
     "거리에서 모은 꽁초를 압착해 면을 세웠다."),
]

# 연보 — (연도, 내용, 부기)
CHRONO = [
    ("2025", "16th 〈Langue des trous noirs〉", "한국문화예술위원회 지원, 부산"),
    ("2025", "Seoul Winter Festa", "서울"),
    ("2024", "15th 〈Re:Forest Sound〉", "백해영갤러리, 서울"),
    ("2024", "Climate Resonance", "광화문광장, 서울"),
    ("2024", "Incheon Artshow 2024", "송도컨벤시아, 인천"),
    ("2024", "Seoul Design 2024", "DDP, 서울"),
    ("2024", "Artists with Warm Hands", "유동룡미술관, 제주"),
    ("2024", "Alone Be Together", "The Lits, 서울"),
    ("2024", "〈Resonance〉 소장", "경상북도청, 안동"),
    ("2023", "14th 〈不.二.火 – Re:one〉", "금호알베르, 서울"),
    ("2023", "13th 〈Papageno – Re:dream〉", "현대백화점 목동점"),
    ("2023", "Sculpture in the City 12th, shortlisted", "런던"),
    ("2022", "12th 〈Black Silhouette〉", "금호알베르, 서울"),
    ("2022", "11th 〈Sound Forest〉", "갤러리 아트사이드, 서울"),
    ("2021", "10th 〈Daybreak〉", "금호알베르, 서울"),
    ("2021", "9th 〈Towards(向) : Indigo Sky〉", "경상북도청, 안동"),
    ("2021", "〈Sound Tree〉 소장", "안뮤지엄, 경주 / 유동룡미술관, 제주"),
    ("2021", "〈Resonance(泂然)〉 소장", "경주엑스포"),
    ("2020", "8th 〈Re:relationship〉", "서울도시건축전시관"),
    ("2019", "7th 〈Glittering Pathway〉", "부산"),
    ("2019", "DRB 마을버스 6번 건축 기획", "부산"),
    ("2018", "BNK 부산은행 플래그십 지점", "부산"),
    ("2018", "평창동계올림픽 올림픽페스티벌파크 건축 기획", "평창, 강릉"),
    ("2017", "6th 〈Reconciled with Vestiges〉", "삼성창조캠퍼스, 대구"),
    ("2017", "UIA 2017 SEOUL 건축 디자인", "서울"),
    ("2016", "5th 〈Hello, Hui〉", "해방촌, 서울"),
    ("2016", "삼성 블루스퀘어 컬처파크 프로젝트 (2013–)", "서울"),
    ("2016", "하남 컨테이너 복합문화공간 기획·설계", ""),
    ("2015", "Chambres Bondées", "파리"),
    ("2015", "이중섭거리 문화공간 공모 당선", "제주"),
    ("2014", "창원조각비엔날레", "창원"),
    ("2014", "Glenfiddich AIR", "더프타운, 스코틀랜드"),
    ("2013", "소치동계올림픽 평창하우스 기획 설계", "러시아"),
    ("2012", "New Audi Q3 Art and Architecture", "블루스퀘어 아트스페이스, 서울"),
    ("2012", "IT Award 대상, 〈NEMO〉 환경·공간 디자인", "서울"),
    ("2011", "4th 〈Reconciled〉", "갤러리 압생트, 서울"),
    ("2011", "Resonance(泂然), 제48회 대종상영화제", "세종문화회관, 서울"),
    ("2011", "Sea of Peace 2", "인천시청"),
    ("2011", "허영만 스튜디오 블록 건축 기획", "한국만화영상진흥원, 부천"),
    ("2010", "60주년 6·25 평화 기원전", "청계천, 서울"),
    ("2010", "2010 Korea Tomorrow", "SETEC, 서울"),
    ("2010", "The Art of Progress, New Audi A8 런칭쇼", "올림픽공원, 서울"),
    ("2010", "문화공간 NEMO 건축 기획", "서울"),
    ("2009", "The Earth", "성북구립미술관, 서울"),
    ("2009", "Sound Forest", "자넷오갤러리, 서울"),
    ("2009", "〈Norwegian Forest – This Bird Has Flown〉 소장", "FEZH, 서울"),
    ("2009", "당진 K's House / RIZOME 리뉴얼", "서울"),
    ("2008", "3rd 〈Resonance〉", "다산쯔 798 예술구, 베이징"),
    ("2008", "부산비엔날레", "부산"),
    ("2008", "주중 한국대사관저 개관전", "베이징"),
    ("2008", "〈Rebirth〉, 〈Mother Arms〉, 〈나래소이북〉 소장",
     "경상북도청 / LIG넥스원 / 국립과천과학관"),
    ("2007", "모리아트센터 전시 기획", "일본"),
    ("2007", "Calla (에버콘 메디컬몰)", "서울"),
    ("2006", "2nd 〈Rebirth〉", "청계천, 서울. 복원 1주년 기념, 서울시 주최"),
    ("2006", "Chinese Art Today 2006", "중국미술관, 베이징"),
    ("2006", "Dreaming Object", "금호갤러리, 서울"),
    ("2006", "Thimbloom I & II, 성북동 H주택 리뉴얼", "서울"),
    ("2005", "소마미술관(SOMA) 리뉴얼 기획, Paper Dome", "서울, 용인"),
    ("2004", "도쿄대학교 대학원 건축학과 박사과정 수료 (–2007)", "도쿄"),
    ("2004", "성균관대 박물관, 공간 이음, 아트사이드 리노베이션 설계", "서울, 베이징"),
    ("2003", "1st 〈The Flower of Evil〉", "갤러리 아트사이드, 서울"),
    ("2003", "Chelsea College of Art & Design Show", "맨레사로드, 런던"),
    ("2002", "Borrowed Space – Time Bound", "Architecture Foundation, 런던"),
    ("2002", "네덜란드 환경건축 연구 프로그램", ""),
    ("2002", "센트럴 세인트 마틴 연구생 (–2003)", "런던"),
    ("2002", "UAL Chelsea Graduate Award", "런던"),
    ("2001", "첼시 예술대학 석사 (–2002)", "런던"),
]

# 평론 — (본문, 필자, 소속, 연도)
TEXTS = [
    ("사회적 부조리와 불안 속에서도 열정과 실천으로 국제적 성취를 이뤄낸 작가.",
     "서진석", "부산시립미술관 관장", "2024"),
    ("어둠과 빛, 소리와 공간을 써서 버려진 사물을 되살리고 희망과 치유의 메시지를 전한다.",
     "안현정", "미술평론가", "2022"),
    ("어둠과 소리를 통해 관람자의 감각과 마음을 치유하는 몰입 공간을 만든다.",
     "김성호", "2021 강원국제트리엔날레 예술감독", "2021"),
    ("예술과 건축의 경계를 흐리며, 작업으로 소통과 기획과 삶을 가르친다.",
     "신지섭", "매트리스 대표, 건축가", "2018"),
    ("건축과 설치미술을 잇고, 재사용과 문화공간과 국제 교류로 지역과 세계를 연결한다.",
     "조성룡", "성룡도시건축 대표, 성균관대 명예교수", "2014"),
    ("블루스퀘어 NEMO를 설계해 건축과 예술의 경계를 허무는 실험적 창작을 이끌었다.",
     "최태만", "국민대 예술대학 학부장, 미술평론가", "2012"),
]


def page(title, body):
    return (
        "<!DOCTYPE html>\n"
        '<html lang="ko">\n<head>\n<meta charset="UTF-8">\n'
        '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n'
        f"<title>{title}</title>\n</head>\n<body>\n\n{body}\n\n</body>\n</html>\n"
    )


def write(name, html):
    with open(os.path.join(OUT, name), "w", encoding="utf-8") as f:
        f.write(html)


# ── 표지 ───────────────────────────────────────────────────
write("index.html", page(
    "한원석 Wonsuk Han",
    "<p><b>한원석</b></p>\n\n<p>&nbsp;</p>\n\n"
    '<p><a href="content.html">한원석</a></p>\n'
    '<p><a href="content.html">Wonsuk Han</a></p>\n'
    '<p><a href="content.html">韓元錫</a></p>\n\n'
    "<p>&nbsp;</p>\n<p>&nbsp;</p>\n\n"
    "<p>&copy; Wonsuk Han</p>"
))

# ── 목차 ───────────────────────────────────────────────────
write("content.html", page(
    "한원석",
    "<p><b>Content</b></p>\n\n<p>&nbsp;</p>\n\n"
    '<p><a href="chronology.html">Chronology</a></p>\n'
    '<p><a href="contact.html">Contact</a></p>\n'
    '<p><a href="cv.html">CV</a></p>\n'
    '<p><a href="texts.html">Texts</a></p>\n'
    '<p><a href="list_of_works.html">Works</a></p>\n\n'
    "<p>&nbsp;</p>\n\n"
    '<p><a href="index.html">back</a></p>'
))

# ── 작품 목록 (가나다·알파벳순) ──────────────────────────────
items = "\n".join(
    f'<p><a href="{w[2]}.html">{w[0]}, {w[1]}</a></p>'
    for w in sorted(WORKS, key=lambda x: x[0].lower())
)
write("list_of_works.html", page(
    "Works of Wonsuk Han",
    "<p><b>Works</b></p>\n\n<p>&nbsp;</p>\n\n"
    f"{items}\n\n<p>&nbsp;</p>\n\n"
    '<p><a href="content.html">back</a></p>'
))

# ── 개별 작품 ──────────────────────────────────────────────
for t, y, slug, venue, mat, qty, size, raw, done, note in WORKS:
    write(f"{slug}.html", page(
        f"{t}, {y}",
        f"<p><b>{t}, {y}</b></p>\n\n<p>&nbsp;</p>\n\n"
        f'<p><img src="img/{raw}.png" alt="" width="420"></p>\n'
        f"<p>수거 당시</p>\n\n"
        f'<p><img src="img/{done}.png" alt="" width="420"></p>\n'
        f"<p>설치 이후</p>\n\n<p>&nbsp;</p>\n\n"
        f"<p>{mat}, {qty}<br>\n{size}<br>\n{venue}</p>\n\n"
        f"<p>{note}</p>\n\n<p>&nbsp;</p>\n\n"
        '<p><a href="list_of_works.html">back</a></p>'
    ))

# ── 연보 ───────────────────────────────────────────────────
rows, last = [], None
for y, what, where in CHRONO:
    shown = "" if y == last else y
    last = y
    tail = f", {where}" if where else ""
    rows.append(f"<p>{shown} &nbsp; {what}{tail}</p>")
write("chronology.html", page(
    "Chronology",
    "<p><b>Chronology</b></p>\n\n<p>&nbsp;</p>\n\n"
    + "\n".join(rows)
    + '\n\n<p>&nbsp;</p>\n\n<p><a href="content.html">back</a></p>'
))

# ── 평론 ───────────────────────────────────────────────────
qs = "\n\n".join(
    f"<p>{body}</p>\n<p>&mdash; {who}, {aff}, {yr}</p>"
    for body, who, aff, yr in TEXTS
)
write("texts.html", page(
    "Texts",
    "<p><b>Texts</b></p>\n\n<p>&nbsp;</p>\n\n"
    f"{qs}\n\n<p>&nbsp;</p>\n\n"
    '<p><a href="content.html">back</a></p>'
))

# ── CV ─────────────────────────────────────────────────────
write("cv.html", page(
    "CV",
    "<p><b>CV</b></p>\n\n<p>&nbsp;</p>\n\n"
    "<p>한원석 Wonsuk Han</p>\n"
    "<p>설치미술가, 건축가</p>\n\n<p>&nbsp;</p>\n\n"
    "<p>2004–2007 &nbsp; 도쿄대학교 대학원 건축학과 박사과정 수료</p>\n"
    "<p>2002–2003 &nbsp; 센트럴 세인트 마틴 연구생, 런던</p>\n"
    "<p>2001–2002 &nbsp; 첼시 예술대학 석사, 런던</p>\n\n<p>&nbsp;</p>\n\n"
    '<p>전체 이력은 <a href="chronology.html">Chronology</a> 참조.</p>\n\n'
    "<p>&nbsp;</p>\n\n"
    '<p><a href="content.html">back</a></p>'
))

# ── 연락처 ─────────────────────────────────────────────────
write("contact.html", page(
    "Contact",
    "<p><b>Contact</b></p>\n\n<p>&nbsp;</p>\n\n"
    '<p><a href="mailto:wonsukhan@hotmail.com">wonsukhan@hotmail.com</a></p>\n'
    "<p>H lab. Studio</p>\n"
    "<p>Seoul, Korea / London, UK</p>\n\n"
    '<p><a href="https://www.instagram.com/han_wonsuk/">Instagram</a></p>\n\n'
    "<p>&nbsp;</p>\n\n"
    '<p><a href="content.html">back</a></p>'
))

print("생성 완료:", len(WORKS) + 7, "개 파일")
