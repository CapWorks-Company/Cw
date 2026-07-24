/* ============================================================
   CapWorks — Barre latérale d'accès rapide (rétractable)
   Inclure sur chaque page publique via :
   <script src="sidebar.js" defer></script>
   S'adapte automatiquement aux couleurs (--accent, --surf, etc.)
   définies dans le <style> de chaque page.
   ============================================================ */
(function(){

  const CURRENT = (location.pathname.split('/').pop() || 'home.html');

  const ITEMS = [
    {href:'home.html',              icon:'🏠', label:'Accueil'},
    {href:'projects.html',          icon:'🗂',  label:'Projets'},
    {href:'campagnes.html',         icon:'💛', label:'Campagnes'},
    {href:'societes.html',          icon:'🏢', label:'Sous-sociétés'},
    {href:'capworks-studio.html',   icon:'🎬', label:'CapWorks Studio'},
    {href:'cplugins.html',          icon:'⛏️', label:'CPlugins'},
    {href:'helfos.html',            icon:'🧠', label:'Helfos'},
    {href:'home.html#team',         icon:'👥', label:'Équipe'},
    {href:'home.html#support',      icon:'💬', label:'Support'},
    {href:'home.html#contact',      icon:'📧', label:'Contact'},
  ];

  /* ---------- Styles ---------- */
  const style = document.createElement('style');
  style.textContent = `
    header nav{display:none!important}
    body{transition:margin-left .3s ease}
    #cwSidebar{position:fixed;top:0;left:0;height:100vh;width:228px;
      background:rgba(8,8,16,.97);backdrop-filter:blur(22px);
      border-right:1px solid var(--bdr,#1e1e38);z-index:300;
      display:flex;flex-direction:column;transition:width .3s ease;overflow:hidden}
    #cwSidebar.collapsed{width:64px}
    .cw-sb-head{display:flex;align-items:center;justify-content:space-between;
      padding:16px 14px;border-bottom:1px solid var(--bdr,#1e1e38);flex-shrink:0;min-height:62px}
    .cw-sb-logo{display:flex;align-items:center;gap:9px;text-decoration:none;
      font-family:var(--display,sans-serif);font-weight:800;font-size:.92rem;
      color:var(--txt,#e8e8f8);white-space:nowrap;overflow:hidden}
    .cw-sb-logo img{width:26px;height:26px;border-radius:7px;flex-shrink:0;object-fit:cover}
    #cwSidebar.collapsed .cw-sb-logo span{display:none}
    .cw-sb-toggle{background:var(--surf2,#141428);border:1px solid var(--bdr2,#2a2a4a);
      color:var(--txt2,#8888aa);width:26px;height:26px;border-radius:7px;
      display:flex;align-items:center;justify-content:center;cursor:pointer;
      flex-shrink:0;transition:all .2s}
    .cw-sb-toggle:hover{border-color:var(--accent,#6c5ce7);color:var(--accent,#6c5ce7)}
    .cw-sb-toggle svg{transition:transform .3s ease;display:block}
    #cwSidebar.collapsed .cw-sb-toggle svg{transform:rotate(180deg)}
    .cw-sb-list{flex:1;overflow-y:auto;overflow-x:hidden;padding:10px 8px;
      display:flex;flex-direction:column;gap:2px}
    .cw-sb-list::-webkit-scrollbar{width:3px}
    .cw-sb-list::-webkit-scrollbar-thumb{background:var(--bdr2,#2a2a4a)}
    .cw-sb-item{display:flex;align-items:center;gap:13px;padding:10px 11px;
      border-radius:9px;text-decoration:none;color:var(--txt2,#8888aa);
      font-size:.82rem;font-weight:600;white-space:nowrap;transition:all .18s}
    .cw-sb-item:hover{background:var(--surf2,#141428);color:var(--txt,#e8e8f8)}
    .cw-sb-item.active{background:var(--accentg,rgba(108,92,231,.15));color:var(--accent,#6c5ce7)}
    .cw-sb-ico{font-size:1.05rem;width:20px;text-align:center;flex-shrink:0}
    #cwSidebar.collapsed .cw-sb-label{display:none}
    #cwSidebar.collapsed .cw-sb-item{justify-content:center}
    .cw-sb-foot{padding:10px 8px;border-top:1px solid var(--bdr,#1e1e38);flex-shrink:0}
    .cw-sb-mobile-btn{position:fixed;bottom:18px;left:18px;z-index:301;
      width:48px;height:48px;border-radius:50%;background:var(--accent,#6c5ce7);
      color:#fff;border:none;display:none;align-items:center;justify-content:center;
      font-size:1.25rem;box-shadow:0 6px 22px rgba(0,0,0,.45);cursor:pointer}
    @media(max-width:900px){
      #cwSidebar{transform:translateX(-100%);width:230px!important}
      #cwSidebar.mobile-open{transform:translateX(0)}
      body{margin-left:0!important}
      .cw-sb-mobile-btn{display:flex}
    }
  `;
  document.head.appendChild(style);

  /* ---------- Markup ---------- */
  const collapsed = localStorage.getItem('cw_sidebar_collapsed') === '1';

  const aside = document.createElement('aside');
  aside.id = 'cwSidebar';
  if(collapsed) aside.classList.add('collapsed');

  const itemsHtml = ITEMS.map(it=>{
    const file = it.href.split('#')[0];
    const isActive = file === CURRENT;
    return `<a href="${it.href}" class="cw-sb-item${isActive?' active':''}"><span class="cw-sb-ico">${it.icon}</span><span class="cw-sb-label">${it.label}</span></a>`;
  }).join('');

  aside.innerHTML = `
    <div class="cw-sb-head">
      <a href="home.html" class="cw-sb-logo">
        <img src="CW_Logo.png" alt="CW" onerror="this.style.display='none'">
        <span>CapWorks</span>
      </a>
      <button class="cw-sb-toggle" id="cwSbToggle" title="Réduire / agrandir le menu" aria-label="Réduire ou agrandir le menu">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
      </button>
    </div>
    <nav class="cw-sb-list">${itemsHtml}</nav>
    <div class="cw-sb-foot">
      <a href="https://discord.gg/RSnKYzXsgm" target="_blank" class="cw-sb-item"><span class="cw-sb-ico">💬</span><span class="cw-sb-label">Discord</span></a>
    </div>
  `;
  document.body.prepend(aside);

  const mbtn = document.createElement('button');
  mbtn.className = 'cw-sb-mobile-btn';
  mbtn.innerHTML = '☰';
  mbtn.setAttribute('aria-label','Ouvrir le menu');
  document.body.appendChild(mbtn);

  /* ---------- Behaviour ---------- */
  function applyMargin(){
    if(window.innerWidth > 900){
      document.body.style.marginLeft = aside.classList.contains('collapsed') ? '64px' : '228px';
    } else {
      document.body.style.marginLeft = '0';
    }
  }
  applyMargin();
  window.addEventListener('resize', applyMargin);

  document.getElementById('cwSbToggle').addEventListener('click', ()=>{
    aside.classList.toggle('collapsed');
    localStorage.setItem('cw_sidebar_collapsed', aside.classList.contains('collapsed') ? '1' : '0');
    applyMargin();
  });

  mbtn.addEventListener('click', ()=> aside.classList.toggle('mobile-open'));

  aside.querySelectorAll('.cw-sb-item').forEach(a=>{
    a.addEventListener('click', ()=> aside.classList.remove('mobile-open'));
  });

})();
