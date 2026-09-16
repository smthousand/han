# 한원석 — 작품 등록부 (Wonsuk Han, Catalogue Raisonné)

미술 수집가를 대상으로 한 작품 등록부. 빌드 없이 그대로 GitHub Pages 배포 가능.

## 구성

```
index.html        벽 — 작품 격자
registry.html     등록부 — 조회용 표
work.html?id=     개별 작품 (출처·전시이력·소장·문의)
chronology.html   연보
inquiry.html      소장 문의

css/registry.css       스타일 (파일 하나)
js/ui.js               상단·하단 공통
js/data/works.js       ★ 작품 등록 데이터
js/data/chronology.js  ★ 연보 데이터
img/bg5.png            스피커 벽 패턴 (표제 띠)
```

## 작품 추가

`js/data/works.js`에 항목 하나를 추가하면 벽·등록부·상세가 모두 갱신된다.

- `status` 는 `available` / `soldout` / `collection` / `commission` 중 하나.
  각각 색 점으로 표시된다 (문의 가능만 주황).
- `n` 은 숫자로 적는다 (`167670`). 쉼표는 자동으로 붙는다.
- `exh` 는 `[연도, 전시명, 장소]` 배열.

## 로컬에서 보기

ES 모듈을 쓰므로 로컬 서버가 필요하다.

```bash
python3 -m http.server 8000
```

## 남은 것

- 도판이 이전 작업의 임시 이미지다. 실제 촬영본으로 교체할 것
  (`works.js` 의 `raw` = 수거 당시, `done` = 설치 이후).
- 작품 수가 6점만 등록되어 있다. 전체 목록으로 확장 필요.
- 가격은 넣지 않았다.
  필요하면 `works.js` 에 필드를 추가하고 `work.html` 의 `spec` 에 한 줄 넣으면 된다.
