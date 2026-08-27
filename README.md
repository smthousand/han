# Wonsuk Han — 포트폴리오 사이트

정적 HTML/CSS/JS 사이트입니다. 서버나 빌드 도구 없이 그대로 깃허브에 올리고
GitHub Pages 로 열 수 있습니다.

## 폴더 구조

```
.
├── index.html          홈 (히어로 + 이중판 티저 + 아카이브 테이블 + About 예고 + 연락처)
├── about.html           About (연표 + 평론)
├── work.html            작품 상세 (?id=001 같은 쿼리로 개별 작품 표시)
│
├── css/
│   ├── base.css          모든 페이지 공통 — 색/폰트 변수, 리셋, 헤더·푸터 기본 골격
│   ├── home.css          index.html 전용 스타일
│   ├── about.css         about.html 전용 스타일
│   └── work.css          work.html 전용 스타일
│
└── js/
    ├── data/
    │   └── works.js      ★ 작품 아카이브 데이터 — 단 하나의 원본
    ├── home.js            index.html 스크립트 (works.js를 import)
    ├── about.js           about.html 스크립트 (연표·평론 데이터 포함)
    └── work.js             work.html 스크립트 (works.js를 import)
```

## 이번에 정리한 것

- **작품 데이터 중복 제거**: 예전에는 `index.html`과 `work.html` 안에 똑같은 작품
  배열이 각각 하드코딩되어 있었습니다 (심지어 필드가 살짝 달라서 어긋난 부분도 있었어요).
  이제 `js/data/works.js` 하나에만 있고, 두 페이지가 `import`로 같이 씁니다.
  **작품을 추가/수정할 땐 이 파일 하나만 고치면 됩니다.**
- **CSS/JS를 HTML에서 분리**: `<style>`, `<script>` 인라인 블록을 모두 밖으로 뺐습니다.
  코드 에디터(VS Code 등)에서 문법 하이라이팅과 자동완성이 정상적으로 동작합니다.
- **공통 스타일(base.css) 분리**: 색상 변수, 폰트, 헤더/푸터 골격처럼 세 페이지가
  똑같이 쓰는 부분만 `base.css`에 모았습니다. 색을 하나 바꾸고 싶으면 여기만
  고치면 세 페이지 모두 반영됩니다.

## 로컬에서 확인하는 법

`js/*.js` 파일들이 `import`/`export`(ES 모듈)를 쓰기 때문에, 파일을 더블클릭해서
`file://`로 그냥 열면 브라우저가 모듈 로딩을 막습니다. 아래처럼 간단한 로컬 서버를
띄운 뒤 열어보세요.

```bash
# 이 폴더 안에서
python3 -m http.server 8000
# 브라우저에서 http://localhost:8000 접속
```

또는 VS Code의 "Live Server" 확장을 써도 됩니다.

## GitHub Pages로 배포하기

1. 이 폴더 전체를 깃허브 저장소에 푸시합니다.
2. 저장소 Settings → Pages → Branch를 `main` (또는 원하는 브랜치), 폴더는 `/ (root)`로 설정합니다.
3. 몇 분 뒤 `https://<username>.github.io/<repo>/`에서 그대로 열립니다 (별도 빌드 과정 없음).

## 아직 손볼 부분 (원본에도 있던 자리표시자)

- 이미지가 전부 `picsum.photos`의 임시 랜덤 이미지입니다. 실제 작품 사진으로
  교체해야 합니다 (`js/data/works.js`의 `s`, `raw`, `done` 필드가 이미지 시드값입니다).
- `about.html`의 작가 노트(`.stmt`)는 임시 요약 텍스트라고 표시되어 있습니다.
- `index.html`의 `.intro` 섹션은 Lorem ipsum 자리표시자입니다.