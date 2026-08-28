/* ═══════════════════════════════════════════════════════════
   work.js — work.html (작품 상세) 전용 스크립트
   작품 아카이브 데이터는 ./data/works.js 에서 가져온다 (중복 제거).
   ═══════════════════════════════════════════════════════════ */
import { WORKS as W, LABELS as L } from './data/works.js';
import { mountHeader } from './header.js';

mountHeader('work');

(function () {
  function esc(x) {
    return String(x).replace(/[&<>"]/g, function (m) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m];
    });
  }

  var id = new URLSearchParams(location.search).get('id');
  var i = W.findIndex(function (w) { return w.n === id; });
  var main = document.getElementById('main');

  if (i < 0) {
    main.innerHTML = '<div class="miss"><p class="h1">작품을 찾을 수 없습니다</p>' +
      '<p class="lb" style="margin-top:18px"><a href="index.html#arv" style="color:var(--accent)">목록으로 돌아가기 →</a></p></div>';
    return;
  }

  var w = W[i], prev = W[i - 1], next = W[i + 1];
  var img = function (seed, r) { return 'https://picsum.photos/seed/' + seed + '/' + r; };

  main.innerHTML =
    '<div class="cover"><img src="' + img(w.s, '2200/1200') + '" alt="' + esc(w.t) + '"></div>' +

    '<div class="wrap">' +
      '<div class="head">' +
        '<div>' +
          '<div class="lb no num">' + esc(w.n) + ' — ' + esc(L[w.c]) + '</div>' +
          '<h1 class="h1">' + esc(w.t) + '</h1>' +
        '</div>' +
        '<div class="side lb num">' + esc(w.v) + '<br>' + esc(w.y) + '</div>' +
      '</div>' +

      '<div class="body">' +
        '<p class="bd">' + esc(w.d) + '</p>' +
        '<dl class="spec">' +
          '<div><dt>재료</dt><dd>' + esc(w.m) + '</dd></div>' +
          '<div><dt>수량</dt><dd>' + esc(w.q) + '</dd></div>' +
          '<div><dt>규모</dt><dd>' + esc(w.size) + '</dd></div>' +
          '<div><dt>장소</dt><dd>' + esc(w.v) + '</dd></div>' +
          '<div><dt>연도</dt><dd>' + esc(w.y) + '</dd></div>' +
          '<div><dt>분류</dt><dd>' + esc(L[w.c]) + '</dd></div>' +
        '</dl>' +
      '</div>' +

      '<div class="plates">' +
        '<figure class="raw"><img src="' + img(w.raw, '900/900') + '" alt="수거 당시">' +
          '<figcaption>수거 당시</figcaption></figure>' +
        '<figure class="done"><img src="' + img(w.done, '900/900') + '" alt="설치 이후">' +
          '<figcaption>설치 이후</figcaption></figure>' +
      '</div>' +

      '<nav class="nav2">' +
        (prev
          ? '<a class="prev" href="work.html?id=' + prev.n + '"><span class="lb">← 이전</span>' +
            '<div class="t">' + esc(prev.t) + '</div></a>'
          : '<span class="prev dis"><span class="lb">← 이전</span><div class="t">—</div></span>') +
        (next
          ? '<a class="next" href="work.html?id=' + next.n + '"><span class="lb">다음 →</span>' +
            '<div class="t">' + esc(next.t) + '</div></a>'
          : '<span class="next dis"><span class="lb">다음 →</span><div class="t">—</div></span>') +
      '</nav>' +
    '</div>';

  document.title = w.t + ' — Wonsuk Han';
  requestAnimationFrame(function () { document.body.classList.add('ready'); });

  /* 좌우 방향키로 앞뒤 작품 이동 */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft' && prev) location.href = 'work.html?id=' + prev.n;
    if (e.key === 'ArrowRight' && next) location.href = 'work.html?id=' + next.n;
  });
})();
