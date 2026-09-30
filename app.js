/* 주소 뒤 #으로 화면을 바꾼다.
   #toc 목차 / #works 작품 목록 / #w-bs-e 작품 / #exhibitions 전시 목록 / #cv 약력 / #contact 연락처 */

var view = document.getElementById('view');

function esc(s) {
  return String(s == null ? '' : s).replace(/[&<>"]/g, function (m) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m];
  });
}
function paras(s) {
  return s.split(/\n\s*\n/).map(function (p) {
    return '<p>' + esc(p.trim()).replace(/\n/g, '<br>') + '</p>';
  }).join('');
}
function back(href, t) { return '<a class="back" href="' + href + '">← ' + (t || '목차') + '</a>'; }

var DETAILED = WORKS.filter(function (w) { return w.id; });

/* 같은 제목·연도가 두 번 나오면 장소로 구분되므로 장소 열에만 의존한다 */
function short(place) { return place ? place.split(',')[0] : ''; }

var PAGES = {
  toc: function () {
    var items = [['works', '작품 목록', WORKS.length + '점'],
                 ['exhibitions', '전시 목록', EXHIBITIONS.length + '건'],
                 ['cv', '약력', ''],
                 ['contact', '연락처', '']];
    return '<h1>목차</h1><nav class="toc">' +
      items.map(function (i) {
        return '<a href="#' + i[0] + '">' + i[1] + '<span class="num">' + i[2] + '</span></a>';
      }).join('') + '</nav>';
  },

  works: function () {
    var html = '<h1>작품 목록</h1>', cat = null, series = null, open = false;
    WORKS.forEach(function (w) {
      if (w.cat !== cat) {
        if (open) html += '</tbody></table>';
        cat = w.cat; series = null; open = true;
        html += '<h3>' + esc(cat) + '</h3><table><thead><tr><th>작품</th><th>연도</th><th class="p">장소</th></tr></thead><tbody>';
      }
      if (w.series && w.series !== series) {
        series = w.series;
        html += '<tr class="ser"><td colspan="3">' + esc(series) + '</td></tr>';
      }
      html += w.id
        ? '<tr class="go" data-href="#w-' + w.id + '"><td>' + esc(w.t) + '</td><td class="y num">' + w.y + '</td><td class="p">' + esc(short(w.place)) + '</td></tr>'
        : '<tr class="nodet"><td>' + esc(w.t) + '</td><td class="y num">' + w.y + '</td><td class="p"></td></tr>';
    });
    if (open) html += '</tbody></table>';
    return html + back('#toc');
  },

  exhibitions: function () {
    var last = null;
    return '<h1>전시 목록</h1><table><thead><tr><th>연도</th><th>전시</th><th class="p">장소</th></tr></thead><tbody>' +
      EXHIBITIONS.map(function (e) {
        var y = e[0] === last ? '' : e[0]; last = e[0];
        return '<tr><td class="y num">' + y + '</td><td>' + esc(e[1]) + '</td><td class="p">' + esc(e[2]) + '</td></tr>';
      }).join('') + '</tbody></table>' + back('#toc');
  },

  cv: function () {
    return '<h1>약력</h1><h2>한원석</h2><p class="dim">Wonsuk Han</p><div class="gap"></div>' +
      '<table><tbody>' +
      CV.map(function (c) {
        return '<tr><td class="y num" style="width:110px">' + c[0] + '</td><td>' + esc(c[1]) + '</td></tr>';
      }).join('') + '</tbody></table>' + back('#toc');
  },

  contact: function () {
    return '<h1>연락처</h1><table><tbody>' +
      CONTACT.map(function (c) {
        return '<tr class="go" data-href="' + c[1] + '"><td>' + esc(c[0]) + '</td></tr>';
      }).join('') + '</tbody></table>' + back('#toc');
  }
};

function workPage(id) {
  var i = -1;
  DETAILED.forEach(function (w, k) { if (w.id === id) i = k; });
  if (i < 0) return PAGES.works();
  var w = DETAILED[i], prev = DETAILED[i - 1], next = DETAILED[i + 1];
  var tx = TEXTS[w.id] || {};

  var rows = [
    ['구분', w.cat + (w.series ? ' · ' + w.series : '')],
    ['연도', w.y],
    ['크기 · 재료', w.size],
    ['유형', w.type],
    ['장소', w.place],
    ['행사', w.event],
    ['협업', w.credit],
    ['태그', w.tags]
  ].filter(function (r) { return r[1]; });

  var html = '<h1>' + esc(w.series || w.cat) + '</h1>' +
    '<h2>' + esc(w.t) + '</h2>' +
    (w.ko ? '<p class="dim">' + esc(w.ko) + '</p>' : '') + '<div class="gap"></div>';

  (w.img || []).forEach(function (src) {
    html += '<figure><img src="img/' + src + '" alt=""></figure>';
  });

  html += '<table class="spec"><tbody>' + rows.map(function (r) {
    return '<tr><th>' + r[0] + '</th><td>' + esc(r[1]) + '</td></tr>';
  }).join('') + '</tbody></table>';

  if (tx.text) html += '<div class="gap"></div><div class="txt">' + paras(tx.text) + '</div>';

  (tx.quotes || []).forEach(function (q) {
    html += '<div class="quote txt">' + paras(q.text) + '<p class="by">— ' + esc(q.by) + '</p></div>';
  });

  html += '<div class="pager">' +
    (prev ? '<a href="#w-' + prev.id + '">← ' + esc(prev.t) + ', ' + prev.y + '</a>' : '<span></span>') +
    (next ? '<a href="#w-' + next.id + '">' + esc(next.t) + ', ' + next.y + ' →</a>' : '<span></span>') +
    '</div>' + back('#works', '작품 목록');
  return html;
}

function render() {
  var h = decodeURIComponent(location.hash.slice(1));
  if (!h) { document.body.classList.remove('open'); return; }
  document.body.classList.add('open');
  view.innerHTML = h.indexOf('w-') === 0 ? workPage(h.slice(2)) : (PAGES[h] || PAGES.toc)();
  view.parentNode.scrollTop = 0;
}

function close() { history.pushState('', '', location.pathname); render(); }

/* 표의 행 전체를 누를 수 있게 */
view.addEventListener('click', function (e) {
  var tr = e.target.closest('tr[data-href]');
  if (!tr) return;
  var href = tr.getAttribute('data-href');
  if (href.charAt(0) === '#') location.hash = href.slice(1);
  else window.open(href, href.indexOf('mailto:') === 0 ? '_self' : '_blank');
});

document.querySelector('.burger').onclick = function () { location.hash = 'toc'; };
document.querySelector('.close').onclick = close;
document.querySelector('.shade').onclick = close;
document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
window.addEventListener('hashchange', render);
render();
