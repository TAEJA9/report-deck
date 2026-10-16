(() => {
  const W = 1920, H = 1080;
  const viewer = document.getElementById('viewer');
  const slides = [...viewer.querySelectorAll('.slide')];
  const frames = slides.map((s, i) => {
    const f = document.createElement('div');
    f.className = 'frame';
    f.tabIndex = -1;
    s.replaceWith(f);
    f.appendChild(s);
    const no = document.createElement('span');
    no.className = 'no'; no.textContent = i + 1;
    f.appendChild(no);
    return f;
  });
  const N = frames.length;
  const dots = document.getElementById('dots');
  dots.innerHTML = frames.map(() => '<i></i>').join('');
  const count = document.getElementById('count');
  const prevB = document.getElementById('prev'), nextB = document.getElementById('next');
  const gridB = document.getElementById('grid');

  const NOTES = JSON.parse(document.getElementById('notes')?.textContent || '[]');
  const ntB = document.getElementById('nt'), ntBox = document.getElementById('notesBox');
  let notesOn = false;
  try { notesOn = localStorage.getItem('deck-notes') === '1'; } catch (e) {}
  let cur = 0, overview = false;
  const m = /^#s(\d+)$/.exec(location.hash);
  if (m) cur = Math.min(N - 1, Math.max(0, +m[1] - 1));

  const narrow = () => innerWidth < 760 && innerHeight > innerWidth;
  const mode = () => narrow() ? 'stack' : overview ? 'grid' : 'present';

  function size(s) {
    frames.forEach(f => {
      f.style.width = W * s + 'px'; f.style.height = H * s + 'px';
      f.firstElementChild.style.transform = `scale(${s})`;
    });
  }
  function layout() {
    const md = mode();
    document.body.dataset.mode = md;
    document.body.dataset.notes = notesOn && NOTES.length ? 'on' : 'off';
    const nh = md === 'present' && notesOn && NOTES.length ? ntBox.offsetHeight + 16 : 0;
    document.body.style.setProperty('--nh', nh + 'px');
    if (md === 'present') size(Math.min((innerWidth - 32) / W, (innerHeight - 24 - 88 - nh) / H));
    else if (md === 'grid') {
      const avail = Math.min(innerWidth - 32, 1500);
      const cols = avail > 900 ? 3 : 2;
      size((avail - 24 * (cols - 1)) / cols / W);
    } else size((innerWidth - 32) / W);
    paint();
  }
  function paint() {
    frames.forEach((f, i) => { f.classList.toggle('on', i === cur); f.setAttribute('aria-hidden', mode() === 'present' && i !== cur); });
    [...dots.children].forEach((d, i) => d.classList.toggle('on', i === cur));
    count.innerHTML = `<b>${cur + 1}</b> / ${N}`;
    prevB.disabled = cur === 0; nextB.disabled = cur === N - 1;
    gridB.textContent = overview ? '발표 보기' : '전체';
    if (ntB) { ntB.setAttribute('aria-pressed', notesOn); ntBox.innerHTML = `<b>${cur + 1}</b>${(NOTES[cur] || '노트 없음').replace(/</g, '&lt;')}`; }
  }
  function go(i) {
    cur = Math.min(N - 1, Math.max(0, i));
    try { history.replaceState(null, '', '#s' + (cur + 1)); } catch (e) {}
    paint();
  }
  function toggleGrid(force) {
    overview = typeof force === 'boolean' ? force : !overview;
    layout();
    if (overview) frames[cur].scrollIntoView({ block: 'center' });
    else scrollTo(0, 0);
  }
  prevB.onclick = () => go(cur - 1);
  nextB.onclick = () => go(cur + 1);
  gridB.onclick = () => toggleGrid();
  function toggleNotes() { notesOn = !notesOn; try { localStorage.setItem('deck-notes', notesOn ? '1' : '0'); } catch (e) {} paint(); layout(); }
  if (ntB) ntB.onclick = toggleNotes;
  document.getElementById('fs').onclick = () => {
    const d = document;
    if (d.fullscreenElement) d.exitFullscreen?.().catch(() => {});
    else d.documentElement.requestFullscreen?.().catch(() => {});
  };
  frames.forEach((f, i) => f.addEventListener('click', e => {
    const md = mode();
    if (md === 'grid') { cur = i; toggleGrid(false); go(i); return; }
    if (md !== 'present' || e.target.closest('a')) return;
    const r = f.getBoundingClientRect();
    go(e.clientX - r.left < r.width * 0.3 ? cur - 1 : cur + 1);
  }));
  addEventListener('keydown', e => {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    const k = e.key;
    if (mode() === 'present') {
      if (['ArrowRight', 'PageDown', ' ', 'Enter'].includes(k)) { e.preventDefault(); go(cur + 1); }
      else if (['ArrowLeft', 'PageUp', 'Backspace'].includes(k)) { e.preventDefault(); go(cur - 1); }
      else if (k === 'Home') go(0);
      else if (k === 'End') go(N - 1);
    }
    if (k === 'g' || k === 'G') toggleGrid();
    else if (k === 'Escape' && overview) toggleGrid(false);
    else if (k === 'f' || k === 'F') document.getElementById('fs').click();
    else if ((k === 'n' || k === 'N') && ntB) toggleNotes();
  });
  let sx = null, sy = 0;
  viewer.addEventListener('touchstart', e => { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
  viewer.addEventListener('touchend', e => {
    if (sx === null || mode() !== 'present') return;
    const dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? cur + 1 : cur - 1);
    sx = null;
  }, { passive: true });
  addEventListener('resize', layout);
  layout();
})();
