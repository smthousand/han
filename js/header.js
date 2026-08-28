/* ═══════════════════════════════════════════════════════════
   header.js — index.html 과 history.html 이 공유하는 헤더

   전에는 <header>...</header> 마크업이 두 파일에 각각 따로 있었고,
   history.html(당시 이름 about.html) 쪽은 링크에 "index.html#" 접두어가
   붙어야 해서 내용이 미묘하게 달랐다 (셋 다 고치는 걸 깜빡하기 쉬운 지점).

   이제 이 파일 하나가 헤더를 만들고, 어느 페이지인지(active)만
   넘겨받아서 링크 접두어와 "현재 페이지" 표시를 알아서 계산한다.
   내비게이션 항목을 추가/삭제/이름 변경할 때도 여기 한 곳만 고치면 된다.

   about 은 더 이상 별도 페이지가 아니라 index.html 안의 섹션(#about)이다.
   전체 연표·평론은 history.html 이라는 별도 페이지로 남아있다.
   ═══════════════════════════════════════════════════════════ */

/* 내비게이션 항목
   - hash 항목: index.html 안의 섹션으로 이동. home 페이지에서는 "#..." 그대로,
     다른 페이지에서는 앞에 "index.html" 이 자동으로 붙는다.
   - href 항목: 완전히 다른 페이지로 이동 (history.html 처럼). key 를 주면
     현재 그 페이지에 있을 때 옅게 표시된다. */
const NAV = [
  { label: 'WORKS', hash: '#plates' },
  { label: 'INDEX', hash: '#arv' },
  { label: 'ABOUT', hash: '#about' },
  // { label: 'history', href: 'history.html', key: 'history' },
  { label: 'CONTACT', hash: '#contact' }
];

/**
 * @param {'home'|'history'|'work'} active - 지금 렌더링하는 페이지
 * @returns {string} <header> 안에 채워 넣을 innerHTML
 */
export function renderHeader(active) {
  const prefix = active === 'home' ? '' : 'index.html';

  const links = NAV.map(item => {
    const href = item.href ? item.href : prefix + item.hash;
    const isCurrent = item.key === active;
    const style = isCurrent ? ' style="opacity:.45"' : '';
    return `<a href="${href}"${style}>${item.label}</a>`;
  }).join('\n    ');

  return `
  <a href="${active === 'home' ? '#' : 'index.html'}">
    <img src="img/logo.svg" alt="Wonsuk Han">
  </a>
  <nav>
    ${links}
  </nav>
  `;
}

/** #site-header 요소를 찾아 헤더를 그 안에 그려 넣는다. */
export function mountHeader(active) {
  const el = document.getElementById('site-header');
  if (!el) return;
  el.innerHTML = renderHeader(active);
  bindScrollBackground(el);
}

/* 히어로(100vh) 구간을 지나가면 헤더 배경을 검정으로 바꾼다.
   히어로가 없는 페이지에서도 동작하도록 기준은 window.innerHeight 하나로 통일. */
function bindScrollBackground(el) {
  function update() {
    el.classList.toggle('is-solid', window.scrollY > window.innerHeight);
  }
  update();
  window.addEventListener('scroll', update, { passive: true });
}
