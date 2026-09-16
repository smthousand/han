/* ═══════════════════════════════════════════════════════════
   ui.js — 상단·하단 공통 요소
   ═══════════════════════════════════════════════════════════ */

const NAV = [
  { id:'wall',   t:'Works',      href:'index.html' },
  { id:'reg',    t:'Registry',   href:'registry.html' },
  { id:'chrono', t:'Chronology', href:'chronology.html' },
  { id:'inq',    t:'Inquiry',    href:'inquiry.html' }
];

export function mount(current) {
  const h = document.getElementById('hdr');
  if (h) h.innerHTML =
    '<div class="id"><a href="index.html"><b>한원석</b> Wonsuk Han</a>' +
    '<span>작품 등록부 · Catalogue Raisonné</span></div>' +
    '<nav>' + NAV.map(n =>
      '<a href="' + n.href + '"' + (n.id === current ? ' aria-current="page"' : '') +
      '>' + n.t + '</a>').join('') + '</nav>';

  const f = document.getElementById('ftr');
  if (f) f.innerHTML =
    '<div>H lab. Studio · Seoul, Korea / London, UK<br>' +
    '<a href="mailto:wonsukhan@hotmail.com">wonsukhan@hotmail.com</a></div>' +
    '<div><a href="https://www.instagram.com/han_wonsuk/">Instagram</a></div>' +
    '<div>&copy; Wonsuk Han</div>';
}

/* 167670 → "167,670" */
export const fmt = n => n.toLocaleString('en-US');
