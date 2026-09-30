/* ═══════════════════════════════════════════════════════════
   home.js — index.html 전용 스크립트
   작품 아카이브 데이터는 ./data/works.js 에서 가져온다 (중복 제거).
   ═══════════════════════════════════════════════════════════ */
import { WORKS as W, LABELS as L } from './data/works.js';
import { mountHeader } from './header.js';

mountHeader('home');

/* 진입 연출 — 첫 이중판이 살짝 확대된 상태에서 제자리로 줄어든다 */
window.addEventListener('load', function () { document.body.classList.add('ready'); });

/* ══ 이중판 ══
   이 페이지의 전부다. 표제도, 인트로 문구도, 별도 섹션도 없다.
   왼쪽은 수거 당시, 오른쪽은 설치 이후. 그 사이 선 하나가 진술이다.

   첫 판은 화면 전체를 채우며 시작하고(진입 자체가 이중판),
   이후 판은 점점 작아지고 어긋나며 아래로 흩어진다.

   붙는 정보는 수량이 먼저다 — 하찮은 것을 압도적인 양으로 쌓는 것이
   이 작가의 방법이므로, 제목이 아니라 숫자가 앞에 선다.
     raw/done : 수거 당시 / 설치 이후 이미지
     m        : 재료   q : 수량   y : 연도
     w        : 너비(vw)  x : 수평 위치(vw)  gap : 위 여백(vh) */
var P = [
  { raw: 'plate601', done: 'plate602', m: '담배꽁초',     q: '167,670', y: '2003',                w: 100, x: 0,  gap: 0,  full: true },
  { raw: 'plate201', done: 'plate202', m: '폐스피커',     q: '3,088',   y: '2021 2022 2024',     w: 66,  x: 8,  gap: 14 },
  { raw: 'plate501', done: 'plate502', m: '폐헤드라이트', q: '1,374',   y: '2006 2014 2020 2021', w: 48, x: 44, gap: 20 },
  { raw: 'plate101', done: 'plate102', m: '폐지관',       q: '10T',     y: '2023 2024',          w: 40,  x: 12, gap: 24 },
  { raw: 'plate301', done: 'plate302', m: '폐금속관',     q: '4',       y: '2024',               w: 28,  x: 56, gap: 22 },
  { raw: 'plate401', done: 'plate402', m: '사일로',       q: '1',       y: '2014',               w: 20,  x: 20, gap: 26 }
];

var ps = document.getElementById('plates');
P.forEach(function (p) {
  var el = document.createElement('article');
  el.className = 'plate' + (p.full ? ' plate--full' : '');
  if (!p.full) {
    el.style.width = 'min(' + p.w + 'vw, 1100px)';
    el.style.marginLeft = p.x + 'vw';
  }
  el.style.marginTop = p.gap + 'vh';
  el.innerHTML =
    '<div class="duo">' +
      '<figure class="raw"><img src="img/' + p.raw + '.png" alt="' + p.m + ' — 수거 당시"></figure>' +
      '<figure class="done"><img src="img/' + p.done + '.png" alt="' + p.m + ' — 설치 이후"></figure>' +
      '<div class="seam"></div>' +
    '</div>' +
    '<div class="fact">' +
      '<span class="q num">' + p.q + '</span>' +
      '<span class="m">' + p.m + '</span>' +
      '<span class="y num">' + p.y + '</span>' +
    '</div>';
  ps.appendChild(el);
});

/* 아카이브 : 연도 목록 + 데이터 테이블 */
var rows = document.getElementById('rows'), yl = document.getElementById('yl'), years = [];
W.forEach(function (w) { if (years.indexOf(w.y) < 0) years.push(w.y); });
years.forEach(function (y) {
  var c = W.filter(function (w) { return w.y === y; }).length;
  var a = document.createElement('a'); a.href = '#arv'; a.dataset.y = y;
  a.innerHTML = '<span>' + y + '</span><span>' + String(c).padStart(2, '0') + '</span>';
  yl.appendChild(a);
});
W.forEach(function (w) {
  var r = document.createElement('div'); r.className = 'tr'; r.dataset.c = w.c; r.dataset.y = w.y;
  r.tabIndex = 0; r.setAttribute('role', 'button'); r.setAttribute('aria-expanded', 'false');
  r.innerHTML = '<div>' + w.n + '</div><div class="t">' + w.t + '</div><div class="q">' + w.q + '</div>' +
    '<div>' + w.m + '</div><div>' + w.y + '</div><div class="x">+</div>' +
    '<div class="det"><div class="in">' +
      '<a class="im" href="work.html?id=' + w.n + '">' +
        '<img data-s="' + w.s + '" src="" alt="' + w.t + '">' +
        '<span class="go">자세히 보기 →</span>' +
      '</a>' +
      '<div class="tx"><b>' + L[w.c] + ' / ' + w.v + ' / ' + w.y + '</b>' + w.d + '</div>' +
    '</div></div>';
  rows.appendChild(r);
});
function toggle(r) {
  var open = r.classList.contains('open');
  rows.querySelectorAll('.tr.open').forEach(function (o) {
    o.classList.remove('open'); o.setAttribute('aria-expanded', 'false');
  });
  if (!open) {
    r.classList.add('open'); r.setAttribute('aria-expanded', 'true');
    var im = r.querySelector('.det img');
    if (im && !im.src) im.src = 'https://picsum.photos/seed/' + im.dataset.s + '/700/460';
  }
}
rows.addEventListener('click', function (e) {
  /* 이미지 링크 클릭은 상세 페이지로 보낸다 — 아코디언을 접지 않는다 */
  if (e.target.closest('.det .im')) return;
  var r = e.target.closest('.tr'); if (r) toggle(r);
});
rows.addEventListener('keydown', function (e) {
  if (e.key !== 'Enter' && e.key !== ' ') return;
  var r = e.target.closest('.tr'); if (!r || e.target.closest('.det .im')) return;
  e.preventDefault(); toggle(r);
});

/* 필터 : 분류 × 연도 동시 적용 */
function apply(f, y) {
  var c = 0;
  document.querySelectorAll('.tr').forEach(function (r) {
    var ok = (f === 'all' || r.dataset.c === f) && (!y || r.dataset.y === y);
    r.classList.toggle('hide', !ok); r.classList.remove('open'); if (ok) c++;
  });
  document.getElementById('cAll').textContent = String(c).padStart(2, '0');
}
var curF = 'all', curY = null;
document.getElementById('fl').addEventListener('click', function (e) {
  var b = e.target.closest('button'); if (!b) return;
  this.querySelectorAll('button').forEach(function (x) { x.classList.remove('on'); });
  b.classList.add('on'); curF = b.dataset.f; apply(curF, curY);
});
yl.addEventListener('click', function (e) {
  var a = e.target.closest('a'); if (!a) return;
  var was = a.classList.contains('on');
  this.querySelectorAll('a').forEach(function (x) { x.classList.remove('on'); });
  if (!was) { a.classList.add('on'); curY = a.dataset.y; } else { curY = null; }
  apply(curF, curY);
});

/* 판이 화면에 들어오면 이음매가 그어진다 */
var io = new IntersectionObserver(function (es) {
  es.forEach(function (e) { if (e.isIntersecting) e.target.classList.add('in'); });
}, { threshold: .22 });
document.querySelectorAll('.plate').forEach(function (x) { io.observe(x); });