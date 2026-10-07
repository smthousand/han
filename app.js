/* WONSUKHAN — 한 페이지 안에서 주소(#)로 화면을 바꾼다.
   #            작품 목록 (격자)
   #w-bs-e      작품 한 점 (문서에 상세가 있는 기록)
   #w-n12       작품 한 점 (상세가 없는 기록 — 기본 정보만)
   #about       소개 · 이력
   works.js / texts.js 는 「작품 정리」 문서에서 자동으로 만든 파일이라 손으로 고치지 않는다.
   사진은 images.js 에 { 'bs-e': ['파일.jpg', ...] } 식으로 적는다. */

var view = document.getElementById('view');
var PER = 30;                       /* 처음에 보이는 수, 이후 LOAD MORE */

function esc(s) {
  return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
  });
}
function md(s) {
  return s.replace(/\*\*(\S(?:.*?\S)?)\*\*/g, '<strong>$1</strong>')
          .replace(/\*(\S(?:.*?\S)?)\*/g, '<em>$1</em>');
}
function paras(t) {
  return String(t).split(/\n\s*\n/).filter(function (p) { return p.trim(); }).map(function (p) {
    return '<p>' + md(esc(p.trim())).replace(/\n/g, '<br>') + '</p>';
  }).join('');
}
/* "English: 국문" 표기에서 국문만 */
function ko(s) {
  if (!s) return '';
  var k = s.search(/[가-힣]/);
  if (k < 0) return s;
  var cut = Math.max(s.lastIndexOf(':', k), s.lastIndexOf(',', k));
  return s.slice(cut + 1).trim();
}
/* "English: 국문" 표기에서 영문만 */
function en(s) {
  if (!s) return '';
  var k = s.search(/[가-힣]/);
  if (k < 0) return s;
  var cut = Math.max(s.lastIndexOf(':', k), s.lastIndexOf(',', k));
  return cut > 0 ? s.slice(0, cut).trim() : s;
}

/* ── 언어 ── EN / KR 을 눌러 바꾼다. 고른 언어는 기억해 둔다 */
var LANG = 'en';
try { LANG = localStorage.getItem('lang') || (/^ko/i.test(navigator.language || '') ? 'ko' : 'en'); } catch (e) {}
function pick(s) { return LANG === 'ko' ? ko(s) : en(s); }
function nm(w) { return LANG === 'ko' ? (w.ko || w.t) : w.t; }
function T(a, b) { return LANG === 'ko' ? b : a; }

function title(s) {
  return s.toLowerCase().replace(/(^|\s)\S/g, function (c) { return c.toUpperCase(); })
          .replace(/ (Of|The|And|In) /g, function (m) { return m.toLowerCase(); });
}

/* ── 기록 정리 ─────────────────────────────────────────── */
var TX = typeof TEXTS !== 'undefined' ? TEXTS : {};
var IM = typeof IMAGES !== 'undefined' ? IMAGES : {};

var ITEMS = WORKS.map(function (w, i) {
  return {
    w: w,
    key: w.id || 'n' + (i + 1),
    group: w.series || (w.cat === 'Architectural' ? 'ARCHITECTURAL' : 'OTHER WORKS'),
    img: (w.id && IM[w.id]) || w.img || [],
    order: i
  };
});
/* 최근 작업이 앞에 온다 (같은 해는 문서 순서) */
ITEMS.sort(function (a, b) { return (b.w.y - a.w.y) || (a.order - b.order); });

/* 필터 — 문서의 6-7 태그 기준. 태그가 적힌 작품만 해당 필터에 나온다 */
var TAGS = ['Sound', 'Light', 'Interactive', 'Site-specific', 'Pavilion'];
ITEMS.forEach(function (x) {
  x.tags = (x.w.tags || '').split('/').map(function (t) { return t.trim(); }).filter(Boolean);
});

var GROUPS = [];
WORKS.forEach(function (w, i) {
  var g = ITEMS.filter(function (x) { return x.order === i; })[0].group;
  if (GROUPS.indexOf(g) < 0) GROUPS.push(g);
});
/* 건축은 맨 끝에 */
GROUPS.sort(function (a, b) { return (a === 'ARCHITECTURAL') - (b === 'ARCHITECTURAL'); });

/* 사진이 없는 칸 — 스피커 사진을 칸마다 다르게 잘라 쓴다 */
function ph(i) {
  var size = [140, 220, 90, 180, 120, 260, 160][i % 7];
  var x = (i * 37) % 100, y = (i * 53) % 100;
  return '<span class="ph" style="background-size:' + size + '% auto;background-position:' +
    x + '% ' + y + '%"></span>';
}

/* ── 작품 목록 ─────────────────────────────────────────── */
var state = { f: '', shown: PER };
function label(g) { return g === 'ARCHITECTURAL' ? 'Architecture' : title(g); }

function worksPage() {
  view.innerHTML =
    '<ul class="filter">' +
      '<li><button data-f=""' + (state.f ? '' : ' class="on"') + '>All</button></li>' +
      TAGS.map(function (g) {
        return '<li><button data-f="' + esc(g) + '"' + (state.f === g ? ' class="on"' : '') + '>' +
          esc(g) + '</button></li>';
      }).join('') +
    '</ul><div class="grid" id="grid"></div><div id="foot"></div>';
  fill();
}

function fill() {
  var list = ITEMS.filter(function (x) { return !state.f || x.tags.indexOf(state.f) >= 0; });
  document.getElementById('grid').innerHTML = list.slice(0, state.shown).map(function (x) {
    var w = x.w;
    var pic = x.img.length ? '<img src="img/' + esc(x.img[0]) + '" alt="" loading="lazy">' : ph(x.order);
    return '<article class="item"><a href="#w-' + x.key + '">' +
      '<span class="pic">' + pic +
        '<span class="hov"><span>' + w.y + ' — ' + esc(label(x.group)) + '</span><b>' + esc(nm(w)) + '</b></span>' +
      '</span></a></article>';
  }).join('');
  document.getElementById('foot').innerHTML = list.length > state.shown
    ? '<button class="more">More +</button>' : '<div class="end"></div>';
}

view.addEventListener('click', function (e) {
  var b = e.target.closest('.filter button');
  if (b) {
    state.f = b.dataset.f; state.shown = PER;
    view.querySelectorAll('.filter button').forEach(function (x) { x.classList.toggle('on', x === b); });
    fill();
    return;
  }
  if (e.target.closest('.more')) { state.shown += PER; fill(); }
});

/* ── 작품 한 점 ────────────────────────────────────────── */
function workPage(key) {
  var list = ITEMS.filter(function (x) { return !state.f || x.tags.indexOf(state.f) >= 0; });
  var i = -1;
  list.forEach(function (x, k) { if (x.key === key) i = k; });
  if (i < 0) { list = ITEMS; ITEMS.forEach(function (x, k) { if (x.key === key) i = k; }); }
  if (i < 0) return worksPage();
  var x = list[i], w = x.w, tx = TX[w.id] || {};
  var prev = list[i - 1], next = list[i + 1];

  var rows = [
    [T('Year', '연도'), w.yfull || w.y], [T('Series', '시리즈'), label(x.group)], [T('Size', '크기'), w.size],
    [T('Type', '형식'), pick(w.type)], [T('Place', '장소'), pick(w.place)], [T('Event', '전시'), pick(w.event)],
    [T('Credit', '크레딧'), pick(w.credit)], [T('Pieces', '구성'), w.note]
  ].filter(function (r) { return r[1] && r[1] !== '없음'; });

  var html = '<div class="wrap"><div class="dhead"><div><h2>' + esc(nm(w)) + '</h2></div>' +
    '<dl class="meta">' + rows.map(function (r) {
      return '<div><dt>' + r[0] + '</dt><dd>' + esc(r[1]) + '</dd></div>';
    }).join('') + '</dl></div>' +
    '<div class="shots">' + (x.img.length
      ? x.img.map(function (s) { return '<img src="img/' + esc(s) + '" alt="">'; }).join('')
      : ph(x.order).replace('class="ph" style="', 'class="ph" style="background-size:260px auto;')) + '</div>';

  function both(o) {
    var t = LANG === 'ko' ? (o.ko || o.en) : (o.en || o.ko);   /* 고른 언어의 글이 없으면 있는 쪽을 보여준다 */
    return t ? paras(t) : '';
  }
  if (tx.en || tx.ko || (tx.quotes || []).length) {
    html += '<div class="body">' + both(tx) + (tx.quotes || []).map(function (q) {
      return '<p class="by">' + esc(pick(q.by)) + '</p>' + both(q);
    }).join('') + '</div>';
  }

  html += '<div class="pn">' +
    (prev ? '<a href="#w-' + prev.key + '">&larr; ' + esc(nm(prev.w)) + '</a>' : '<span></span>') +
    '<a class="all" href="#">' + T('All works', '전체 작품') + '</a>' +
    (next ? '<a class="nx" href="#w-' + next.key + '">' + esc(nm(next.w)) + ' &rarr;</a>' : '<span></span>') +
    '</div></div>';
  view.innerHTML = html;
}

/* ── 소개 ──────────────────────────────────────────────── */
function aboutPage() {
  var years = [];
  EXHIBITIONS.forEach(function (e) { if (years.indexOf(e[0]) < 0) years.push(e[0]); });

  var hist = years.map(function (y) {
    var ex = EXHIBITIONS.filter(function (e) { return e[0] === y; });
    return '<div class="yr"><b>' + y + '</b><ul>' + ex.map(function (e) {
      var solo = /개인전/.test(e[1]);
      return '<li>' + esc(e[1].replace(/\s*\(개인전\)/, '')) + ' <em>— ' + esc(e[2]) + '</em>' +
        (solo ? '<span class="solo">Solo</span>' : '') + '</li>';
    }).join('') + '</ul></div>';
  }).join('');

  function sec(name, body) { return '<section><h5>' + name + '</h5><div>' + body + '</div></section>'; }

  view.innerHTML = '<div class="wrap about">' +
    sec('Wonsuk Han',
      (LANG === 'ko'
        ? '<p>한원석은 설치미술과 건축을 넘나드는 작가이자 건축가다. 영국 첼시예술대학에서 미술 석사를, 도쿄대학교에서 건축학 박사과정을 수료했으며 담배꽁초·폐헤드라이트·폐스피커 등 버려진 사물을 모으고 쌓아 올리는 방법으로 작업해왔다. 베이징 798 예술구에 한국인 최초로 대안공간을 설립했고, 평창동계올림픽 페스티벌파크·소치동계올림픽 평창하우스·삼성 블루스퀘어 리뉴얼 등 다수의 건축·공공 프로젝트를 이끌었다.</p>'
        : '<p>Wonsuk Han is an installation artist and architect working across the boundaries of art and space. Holding a Master\'s from Chelsea College of Art &amp; Design (UK) and a PhD candidacy in Architecture from the University of Tokyo, he has spent three decades collecting and stacking discarded objects — cigarette butts, headlights, speakers — into works that reconcile rather than destroy. He founded the first Korean alternative art space in Beijing\'s 798 Art Zone, and has led architectural projects including the PyeongChang and Sochi Winter Olympics pavilions and the renewal of Samsung Blue Square.</p>')) +
    sec('Contact', CONTACT.map(function (c) {
      var ext = /^http/.test(c[1]);
      return '<p><a href="' + esc(c[1]) + '"' + (ext ? ' target="_blank" rel="noopener"' : '') + '>' +
        esc(ext ? 'Instagram @han_wonsuk' : c[0]) + '</a></p>';
    }).join('')) +
    sec('Exhibitions', hist) +
    sec('Education · Award', CV.map(function (c) {
      return '<div class="yr"><b>' + esc(c[0]) + '</b><span>' + esc(c[1]) + '</span></div>';
    }).join('')) +
    '</div>';
}

/* ── 주소 ──────────────────────────────────────────────── */
function render() {
  var h = location.hash.replace(/^#/, '');
  if (h.indexOf('w-') === 0) workPage(h.slice(2));
  else if (h === 'about') aboutPage();
  else worksPage();
  document.querySelectorAll('nav a[data-r]').forEach(function (a) {
    a.classList.toggle('on', a.dataset.r === (h === 'about' ? 'about' : h ? '' : 'works'));
  });
  window.scrollTo(0, 0);
}
window.addEventListener('hashchange', render);

/* EN / KR 전환 — 주소는 그대로 두고 지금 화면만 다시 그린다 */
var langBtn = document.querySelector('.langsw');
function showLang() {
  document.documentElement.lang = LANG;
  langBtn.querySelectorAll('span').forEach(function (x) { x.classList.toggle('on', x.dataset.l === LANG); });
}
langBtn.addEventListener('click', function () {
  LANG = LANG === 'ko' ? 'en' : 'ko';
  try { localStorage.setItem('lang', LANG); } catch (e) {}
  var y = window.scrollY;
  showLang(); render(); window.scrollTo(0, y);
});
showLang();
render();

/* 맨 위로 */
var toTop = document.querySelector('.top');
toTop.addEventListener('click', function (e) { e.preventDefault(); window.scrollTo(0, 0); });
window.addEventListener('scroll', function () { toTop.classList.toggle('on', window.scrollY > 600); });
