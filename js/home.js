/* ═══════════════════════════════════════════════════════════
   home.js — index.html 전용 스크립트
   작품 아카이브 데이터는 ./data/works.js 에서 가져온다 (중복 제거).
   ═══════════════════════════════════════════════════════════ */
import { WORKS as W, LABELS as L } from './data/works.js';

/* 진입 연출 — 히어로 이미지가 살짝 확대된 상태에서 제자리로 줄어든다 */
window.addEventListener('load', function () { document.body.classList.add('ready'); });

/* hero 전환 */
var PL = [
  { s: 'wc1', t: 'Re:one 不二火', m: '2024 — 폐지관, LED, 사운드 — H 4,000mm' },
  { s: 'wc9', t: 'Daybreak', m: '2021 — 폐스피커 1,886개 — Seoul' },
  { s: 'wc8', t: 'The Resonance Forest', m: '2022 — 지관, 사운드 — 아트사이드 갤러리' }
];
var pi = 0, hi = document.getElementById('hi'), dots = document.querySelectorAll('#dots i');
function go(k) {
  pi = k; var p = PL[pi]; hi.style.opacity = 0;
  setTimeout(function () {
    hi.src = 'https://picsum.photos/seed/' + p.s + '/2200/1400';
    document.getElementById('ct').textContent = p.t;
    document.getElementById('cm').textContent = p.m;
    hi.style.opacity = 1;
  }, 520);
  dots.forEach(function (d, i) { d.classList.toggle('on', i === pi); });
}
dots.forEach(function (d, i) { d.addEventListener('click', function () { go(i); }); });
setInterval(function () { go((pi + 1) % PL.length); }, 7000);

/* 이중판 티저 — 실제 촬영본이 들어가면 이 구조 하나로 작가관이 전달된다.
   아카이브 데이터와는 별개의 연출용 배치 정보(w/x/gap)를 가진 소규모 세트.
   w: 화면 대비 너비(vw) / x: 수평 위치(vw) / gap: 위 여백(vh) */
var P = [
  { raw: 'trash01', done: 'work01', m: '폐지관', q: '100+', y: '2024', w: 72, x: 12, gap: 0 },
  { raw: 'trash02', done: 'work02', m: '폐스피커', q: '1,886', y: '2021', w: 58, x: 34, gap: 26 },
  { raw: 'trash03', done: 'work03', m: '폐창틀', q: '1,042', y: '2019', w: 46, x: 8, gap: 38 },
  { raw: 'trash04', done: 'work04', m: '폐형광등', q: '3,200', y: '2023', w: 36, x: 52, gap: 52 },
  { raw: 'trash05', done: 'work05', m: '폐지관', q: '340', y: '2024', w: 27, x: 16, gap: 64 },
  { raw: 'trash06', done: 'work06', m: '담배꽁초', q: '11,300', y: '2022', w: 20, x: 62, gap: 78 }
];
var ps = document.getElementById('plates');
P.forEach(function (p) {
  var el = document.createElement('article');
  el.className = 'plate';
  el.style.width = 'min(' + p.w + 'vw, 1100px)';
  el.style.marginLeft = p.x + 'vw';
  el.style.marginTop = p.gap + 'vh';
  el.innerHTML =
    '<div class="duo">' +
      '<figure class="raw"><img src="https://picsum.photos/seed/' + p.raw + '/900/900" alt=""></figure>' +
      '<figure class="done"><img src="https://picsum.photos/seed/' + p.done + '/900/900" alt=""></figure>' +
      '<div class="seam"></div>' +
    '</div>' +
    '<div class="fact"><span>' + p.m + '</span><span>' + p.q + '</span><span>' + p.y + '</span></div>';
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
  r.innerHTML = '<div>' + w.n + '</div><div class="t">' + w.t + '</div><div>' + w.v + '</div>' +
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
