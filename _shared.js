/* BIRTHING DRAGONS — SHARED JS — include at bottom of every page */

/* ── GOOGLE ANALYTICS ── */
(function(){
  var GA_ID = 'G-NFC9EHWEQ3';
  var s = document.createElement('script');
  s.async = true; s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date()); gtag('config', GA_ID, { anonymize_ip: true });
  window.gtag = gtag;
})();

/* ── COOKIE CONSENT ── */
(function(){
  if (localStorage.getItem('bd_cookies_ok')) return;
  const banner = document.createElement('div');
  banner.id = 'bd-cookie-banner';
  banner.innerHTML = `
    <p>We use cookies to improve your experience and understand how our site is used.
    <a href="privacy.html">Privacy Policy</a></p>
    <div class="bd-cookie-btns">
      <button id="bd-cookie-accept">Accept</button>
      <button id="bd-cookie-decline">Decline</button>
    </div>`;
  const style = document.createElement('style');
  style.textContent = `
    #bd-cookie-banner {
      position:fixed;bottom:24px;left:24px;z-index:9999;
      max-width:420px;background:rgba(6,4,8,.97);border:1px solid rgba(201,168,76,.3);
      padding:20px 24px;backdrop-filter:blur(20px);
      font-family:'Montserrat',sans-serif;font-size:11px;line-height:1.7;color:rgba(255,255,255,.7);
      animation:slideUp .4s ease;
    }
    @keyframes slideUp{from{transform:translateY(20px);opacity:0}to{transform:translateY(0);opacity:1}}
    #bd-cookie-banner a{color:#c9a84c;text-decoration:none;}
    #bd-cookie-banner a:hover{text-decoration:underline;}
    #bd-cookie-banner p{margin:0 0 14px;}
    .bd-cookie-btns{display:flex;gap:10px;}
    #bd-cookie-accept{
      padding:8px 20px;background:#c9a84c;color:#06040a;border:none;
      font-family:'Montserrat',sans-serif;font-size:10px;letter-spacing:.16em;
      text-transform:uppercase;cursor:pointer;font-weight:600;transition:opacity .2s;
    }
    #bd-cookie-accept:hover{opacity:.85;}
    #bd-cookie-decline{
      padding:8px 20px;background:none;color:rgba(255,255,255,.5);
      border:1px solid rgba(255,255,255,.15);font-family:'Montserrat',sans-serif;
      font-size:10px;letter-spacing:.16em;text-transform:uppercase;cursor:pointer;transition:all .2s;
    }
    #bd-cookie-decline:hover{color:rgba(255,255,255,.8);border-color:rgba(255,255,255,.3);}
    @media(max-width:480px){#bd-cookie-banner{left:12px;right:12px;max-width:none;bottom:12px;}}
  `;
  document.head.appendChild(style);
  document.body.appendChild(banner);
  document.getElementById('bd-cookie-accept').onclick = function() {
    localStorage.setItem('bd_cookies_ok','1');
    banner.remove();
    // enable analytics if GA ID is set
    if (window.gtag) gtag('consent','update',{analytics_storage:'granted'});
  };
  document.getElementById('bd-cookie-decline').onclick = function() {
    localStorage.setItem('bd_cookies_ok','0');
    banner.remove();
  };
})();

(function(){

  /* ── LIGHT MODE CSS INJECTION ── */
  const themeStyle = document.createElement('style');
  themeStyle.textContent = `
    /* FONT READABILITY FIXES — applied in both light and dark */
    .nav__links a { font-size:12px !important; letter-spacing:.12em !important; font-weight:600 !important; }
    .nav__cta { font-size:11px !important; font-weight:700 !important; }
    .eyebrow { font-size:12px !important; letter-spacing:.28em !important; font-weight:700 !important; }
    .btn { font-size:11px !important; letter-spacing:.2em !important; font-weight:700 !important; }
    .service-card__tag,.course-card__tag,.pkg-card__tag,.price-card__tag,
    .svc-card__tag,.cat-card__tag,.pillar-card__tag,.mod-item__title { font-size:11px !important; font-weight:600 !important; }
    .footer__links a,.footer__nav a { font-size:11px !important; font-weight:500 !important; }
    .footer__copy { font-size:11px !important; font-weight:500 !important; }
    .section-body { font-size:17px !important; }
    .price-card__period,.pkg-card__period { font-size:12px !important; font-weight:600 !important; }
    .proc-step__num { font-size:11px !important; font-weight:700 !important; }

    /* 3D TITLE LETTERING — applies to all hero/section titles */
    .hero__title,
    .hero__title .line1,
    .hero__title .line2,
    .hero__name,
    .section-title,
    .cta-title,
    .manifesto__title {
      filter:
        drop-shadow(1px 1px 0px rgba(0,0,0,0.9))
        drop-shadow(2px 2px 0px rgba(0,0,0,0.8))
        drop-shadow(3px 3px 0px rgba(0,0,0,0.7))
        drop-shadow(4px 4px 0px rgba(0,0,0,0.6))
        drop-shadow(5px 5px 0px rgba(0,0,0,0.4))
        drop-shadow(0px 8px 20px rgba(0,0,0,0.35));
    }
    [data-theme="light"] .hero__title {
      filter:
        drop-shadow(0px 1px 1px rgba(50,20,0,0.55))
        drop-shadow(0px 2px 2px rgba(50,20,0,0.35)) !important;
    }
    [data-theme="light"] .section-title,
    [data-theme="light"] .cta-title {
      filter:
        drop-shadow(1px 1px 0px rgba(100,60,0,0.5))
        drop-shadow(2px 2px 0px rgba(100,60,0,0.4))
        drop-shadow(3px 3px 0px rgba(100,60,0,0.3))
        drop-shadow(0px 6px 14px rgba(100,60,0,0.2));
    }

    /* NAV LOGO — always flex row, consistent across all pages */
    .nav__logo {
      display:flex !important; align-items:center !important;
      gap:10px !important; text-decoration:none !important;
    }
    .nav__logo img { height:36px !important; width:auto !important; }
    .nav__logo-text,.nav__logo>div { text-align:left !important; }

    /* THEME TOGGLE BUTTON */
    .bd-theme-toggle {
      position:fixed; bottom:28px; right:28px; z-index:9990;
      width:46px; height:46px; border-radius:50%;
      border:1px solid var(--gold-d); background:var(--dark2);
      cursor:url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="22" viewBox="0 0 16 22"><path d="M2 2 L2 18 L6 14 L8.5 20 L11 19 L8.5 13 L13 13 Z" fill="%23c9a84c" stroke="%23604008" stroke-width="1.2" stroke-linejoin="round"/></svg>') 2 2,default;
      display:flex; align-items:center; justify-content:center;
      font-size:20px; transition:all .3s; backdrop-filter:blur(12px);
      box-shadow:0 4px 24px rgba(0,0,0,.3);
    }
    .bd-theme-toggle:hover { border-color:var(--gold); transform:scale(1.12); }

    /* LIGHT MODE VARIABLES — golden, luxurious, feminine */
    [data-theme="light"] {
      --black:#fdf5e0; --deep:#f7e8c4; --dark:#f0d9a8; --dark2:#f8edcc; --dark3:#f5e6c0;
      --gold:#9a6e10; --gold-l:#c9920c; --gold-d:rgba(154,110,16,.22);
      --crimson:#8B1A3A; --crimson-l:#c4405e;
      --rose:#c0607a; --rose-d:rgba(192,96,122,.18);
      --violet:#6a4aaa; --violet-l:#9070cc;
      --white:#1a0a2e; --cream:#2e1040; --cream-d:rgba(46,16,64,.72);
    }

    /* LIGHT MODE — GENERAL */
    [data-theme="light"] body { background:#fdf5e0; color:#1a0a2e; }
    [data-theme="light"] * { color:inherit; }
    [data-theme="light"] p, [data-theme="light"] li,
    [data-theme="light"] .section-body { color:rgba(26,10,46,.84) !important; }
    [data-theme="light"] #main-nav { border-bottom-color:rgba(154,110,16,.15); }
    [data-theme="light"] #main-nav.scrolled {
      background:rgba(253,245,224,.97) !important;
      border-color:rgba(154,110,16,.25) !important;
    }
    [data-theme="light"] .nav__logo-text,
    [data-theme="light"] .nav__logo { color:#1a0a2e !important; }
    [data-theme="light"] .nav__links a { color:rgba(26,10,46,.82) !important; }
    [data-theme="light"] .nav__links a:hover { color:#9a6e10 !important; }

    /* LIGHT MODE — HERO */
    [data-theme="light"] .hero {
      background:
        radial-gradient(ellipse at 30% 10%,rgba(201,168,76,.28),transparent 55%),
        radial-gradient(ellipse at 75% 85%,rgba(139,26,58,.2),transparent 50%),
        radial-gradient(ellipse at 50% 50%,rgba(201,146,12,.1),transparent 70%),
        linear-gradient(160deg,#fdf5e0,#f7e8c4) !important;
    }
    [data-theme="light"] .hero-bg {
      background:
        radial-gradient(ellipse at 50% 0%,rgba(201,168,76,.25),transparent 55%),
        radial-gradient(ellipse at 15% 75%,rgba(139,26,58,.18),transparent 50%),
        linear-gradient(160deg,#fdf5e0,#f7e8c4) !important;
    }
    [data-theme="light"] .hero::before { opacity:.18 !important; }
    [data-theme="light"] .hero-scale { opacity:.18 !important; filter:sepia(1) saturate(2) hue-rotate(10deg); }
    [data-theme="light"] .hero__sub,
    [data-theme="light"] .hero__tagline { color:rgba(46,16,64,.75) !important; }

    /* LIGHT MODE — SECTIONS */
    [data-theme="light"] .section--dark {
      background:linear-gradient(160deg,#f7e8c4,#f0d9a8) !important;
    }
    [data-theme="light"] .welcome-visual,
    [data-theme="light"] .exp-visual,
    [data-theme="light"] .intro-visual,
    [data-theme="light"] .what-visual {
      background:linear-gradient(160deg,#f7e8c4,#f0d9a8) !important;
    }
    [data-theme="light"] .welcome-visual__glow,
    [data-theme="light"] .what-visual__glow,
    [data-theme="light"] .exp-visual__glow {
      background:radial-gradient(ellipse,rgba(201,168,76,.35),transparent 65%) !important;
    }

    /* LIGHT MODE — CARDS */
    [data-theme="light"] .service-card,
    [data-theme="light"] .course-card,
    [data-theme="light"] .pkg-card,
    [data-theme="light"] .price-card,
    [data-theme="light"] .svc-card,
    [data-theme="light"] .cat-card,
    [data-theme="light"] .mod-item,
    [data-theme="light"] .inside-item,
    [data-theme="light"] .pillar-card,
    [data-theme="light"] .proc-step,
    [data-theme="light"] .inc-tile,
    [data-theme="light"] .testi-card,
    [data-theme="light"] .pillar {
      background:linear-gradient(160deg,#f8edcc,#f5e4b8) !important;
      border-color:rgba(154,110,16,.2) !important;
    }
    [data-theme="light"] .service-card:hover,
    [data-theme="light"] .course-card:hover,
    [data-theme="light"] .cat-card:hover,
    [data-theme="light"] .pillar-card:hover,
    [data-theme="light"] .inside-item:hover {
      background:linear-gradient(160deg,#f5e4b8,#efd8a0) !important;
    }

    /* LIGHT MODE — QUOTE / CTA */
    [data-theme="light"] .quote-section::before {
      background:
        radial-gradient(ellipse at 50% 50%,rgba(201,168,76,.2),transparent 60%),
        radial-gradient(ellipse at 20% 80%,rgba(139,26,58,.12),transparent 55%),
        #f7e8c4 !important;
    }
    [data-theme="light"] .quote-section__scale,
    [data-theme="light"] .quote-scale,
    [data-theme="light"] .cta-scale,
    [data-theme="light"] .cta-section__scale,
    [data-theme="light"] .hero-scale { filter:sepia(1) saturate(3) hue-rotate(10deg); opacity:.12 !important; }
    [data-theme="light"] .cta-section::before {
      background:
        radial-gradient(ellipse at 50% 0%,rgba(201,168,76,.25),transparent 55%),
        radial-gradient(ellipse at 80% 100%,rgba(139,26,58,.15),transparent 50%),
        linear-gradient(160deg,#f7e8c4,#f0d9a8) !important;
    }

    /* LIGHT MODE — WAVES */
    [data-theme="light"] .wave-divider svg path,
    [data-theme="light"] .wave svg path,
    [data-theme="light"] [style*="wave"] svg path { fill:#f7e8c4 !important; }

    /* LIGHT MODE — FORM FIELDS */
    [data-theme="light"] .custom-form input,
    [data-theme="light"] .custom-form textarea,
    [data-theme="light"] .custom-form select {
      background:rgba(26,10,46,.05) !important;
      border-color:rgba(154,110,16,.3) !important;
      color:#1a0a2e !important;
    }
    [data-theme="light"] .custom-form input::placeholder,
    [data-theme="light"] .custom-form textarea::placeholder { color:rgba(26,10,46,.45) !important; }
    [data-theme="light"] .custom-form select option { background:#f8edcc !important; color:#1a0a2e !important; }

    /* LIGHT MODE — FOOTER */
    [data-theme="light"] footer {
      background:linear-gradient(160deg,#f7e8c4,#f0d9a8) !important;
      border-color:rgba(154,110,16,.25) !important;
    }
    [data-theme="light"] .footer__links a,
    [data-theme="light"] .footer__nav a { color:rgba(26,10,46,.78) !important; }
    [data-theme="light"] .footer__links a:hover,
    [data-theme="light"] .footer__nav a:hover { color:#9a6e10 !important; }
    [data-theme="light"] .footer__copy { color:rgba(26,10,46,.65) !important; }
    [data-theme="light"] .footer__col-title,
    [data-theme="light"] .footer__heading { color:#9a6e10 !important; }

    /* LIGHT MODE — THEME TOGGLE */
    [data-theme="light"] .bd-theme-toggle {
      background:linear-gradient(135deg,#f8edcc,#f0d9a8);
      border-color:rgba(154,110,16,.4) !important;
      box-shadow:0 4px 24px rgba(154,110,16,.2);
    }

    /* LIGHT MODE — STARS CANVAS */
    [data-theme="light"] canvas#stars { opacity:.3; mix-blend-mode:multiply; }

    /* LIGHT MODE — PRICING FEATURED */
    [data-theme="light"] .price-card--featured,
    [data-theme="light"] .pkg-card--featured {
      background:linear-gradient(160deg,#f8edcc,rgba(201,168,76,.18),#f5e4b8) !important;
      border-color:rgba(154,110,16,.45) !important;
    }

    /* LIGHT MODE — THEMES TICKER */
    [data-theme="light"] .theme-pill {
      background:linear-gradient(135deg,#f8edcc,#f5e4b8) !important;
      border-color:rgba(154,110,16,.28) !important;
    }
    [data-theme="light"] .theme-pill__topic { color:#1a0a2e !important; }

    /* LIGHT MODE — GRADIENT TEXT (headings) */
    [data-theme="light"] .section-title em,
    [data-theme="light"] .hero__title em {
      background:linear-gradient(135deg,#8a5008 0%,#c9920c 45%,#8a5008 75%,#5a3204 100%) !important;
      -webkit-background-clip:text !important; background-clip:text !important;
      -webkit-text-fill-color:transparent !important;
    }
    [data-theme="light"] .section-title--gold em {
      background:linear-gradient(135deg,#8a5008 0%,#c9920c 45%,#8a5008 75%,#5a3204 100%) !important;
      -webkit-background-clip:text !important; background-clip:text !important;
      -webkit-text-fill-color:transparent !important;
    }

    /* LIGHT MODE — homepage hero title: richer gold gradient on line1/line2, clear child shadow so parent handles it */
    [data-theme="light"] .hero__title .line1,
    [data-theme="light"] .hero__title .line2 {
      background: linear-gradient(135deg, #8a5c00 0%, #c9a84c 30%, #e8d070 55%, #c9a84c 75%, #8a5c00 100%) !important;
      -webkit-background-clip: text !important;
      background-clip: text !important;
      -webkit-text-fill-color: transparent !important;
      filter: none !important;
    }

    /* LIGHT MODE — HEADINGS general */
    [data-theme="light"] h1,[data-theme="light"] h2,
    [data-theme="light"] h3,[data-theme="light"] h4 { color:#1a0a2e !important; }

    /* LIGHT MODE — BUTTONS */
    [data-theme="light"] .btn--outline {
      border-color:rgba(154,110,16,.6) !important; color:#1a0a2e !important;
    }
    [data-theme="light"] .btn--outline:hover { background:rgba(154,110,16,.12) !important; }

    /* LIGHT MODE — EYEBROW / TAGS */
    [data-theme="light"] .eyebrow { color:#9a6e10 !important; }
    [data-theme="light"] .service-card__tag,.course-card__tag,.pkg-card__tag,
    [data-theme="light"] .price-card__tag,[data-theme="light"] .svc-card__tag,
    [data-theme="light"] .cat-card__tag,[data-theme="light"] .pillar-card__tag {
      color:#8B1A3A !important;
    }
  `;
  document.head.appendChild(themeStyle);

  /* ── THEME INIT ── */
  const saved = localStorage.getItem('bd-theme') || 'dark';
  if(saved === 'light') document.documentElement.setAttribute('data-theme','light');

  /* ── THEME TOGGLE BUTTON ── */
  const toggle = document.createElement('button');
  toggle.className = 'bd-theme-toggle';
  toggle.setAttribute('aria-label','Toggle light/dark mode');
  toggle.innerHTML = saved === 'light' ? '🌙' : '☀️';
  document.body.appendChild(toggle);

  toggle.addEventListener('click', () => {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    if(isLight){
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('bd-theme','dark');
      toggle.innerHTML = '☀️';
    } else {
      document.documentElement.setAttribute('data-theme','light');
      localStorage.setItem('bd-theme','light');
      toggle.innerHTML = '🌙';
    }
  });

  /* ── SPARKLE ── */
  document.addEventListener('click',e=>{
    if(e.target === toggle) return;
    const b=document.createElement('div');b.className='sparkle-burst';
    b.style.cssText=`left:${e.clientX}px;top:${e.clientY}px;`;
    const colors=['var(--gold)','var(--crimson-l)','var(--rose)','var(--gold-l)'];
    for(let i=0;i<10;i++){
      const s=document.createElement('span');
      const ang=i*36*(Math.PI/180),d=28+Math.random()*36;
      s.style.cssText=`--bx:${Math.cos(ang)*d}px;--by:${Math.sin(ang)*d}px;background:${colors[i%colors.length]};animation-delay:${Math.random()*0.08}s;`;
      b.appendChild(s);
    }
    document.body.appendChild(b);setTimeout(()=>b.remove(),750);
  });

  /* ── MOBILE HAMBURGER MENU ── */
  const mobileStyle = document.createElement('style');
  mobileStyle.textContent = `
    .nav__hamburger {
      display:none; flex-direction:column; justify-content:center; align-items:center;
      gap:5px; width:40px; height:40px; background:none; border:none;
      cursor:pointer; z-index:850; padding:4px; flex-shrink:0;
    }
    .nav__hamburger span {
      display:block; width:22px; height:1.5px; background:var(--gold);
      transition:all .3s ease; transform-origin:center;
    }
    .nav__hamburger.open span:nth-child(1) { transform:translateY(6.5px) rotate(45deg); }
    .nav__hamburger.open span:nth-child(2) { opacity:0; transform:scaleX(0); }
    .nav__hamburger.open span:nth-child(3) { transform:translateY(-6.5px) rotate(-45deg); }
    .bd-mobile-menu {
      position:fixed; inset:0; z-index:840;
      background:rgba(6,4,8,.97); backdrop-filter:blur(24px); -webkit-backdrop-filter:blur(24px);
      display:flex; flex-direction:column; align-items:center; justify-content:center;
      gap:0; opacity:0; visibility:hidden;
      transition:opacity .4s ease,visibility .4s ease;
      overflow-y:auto; padding:80px 40px 60px;
    }
    .bd-mobile-menu.open { opacity:1; visibility:visible; }
    .bd-mobile-menu a {
      font-family:'Cormorant Garamond',Georgia,serif;
      font-size:clamp(24px,7vw,38px); font-weight:600; letter-spacing:.1em;
      color:var(--cream); text-decoration:none; text-transform:uppercase;
      padding:16px 0; border-bottom:1px solid rgba(201,168,76,.1);
      width:100%; text-align:center; transition:color .2s;
    }
    .bd-mobile-menu a:last-child { border-bottom:none; }
    .bd-mobile-menu a:hover,.bd-mobile-menu a.active { color:var(--gold); }
    .bd-mobile-menu .mob-cta {
      margin-top:36px; padding:16px 48px;
      border:1px solid var(--gold); color:var(--gold) !important;
      font-family:'Montserrat',sans-serif; font-size:11px !important;
      letter-spacing:.28em; font-weight:700 !important;
      background:none; transition:background .25s,color .25s;
    }
    .bd-mobile-menu .mob-cta:hover { background:var(--gold); color:var(--black) !important; }
    @media(max-width:768px) { .nav__hamburger { display:flex !important; } }
  `;
  document.head.appendChild(mobileStyle);

  // Create hamburger button
  const hamburger = document.createElement('button');
  hamburger.className = 'nav__hamburger';
  hamburger.setAttribute('aria-label', 'Toggle navigation');
  hamburger.innerHTML = '<span></span><span></span><span></span>';
  const navEl = document.getElementById('main-nav') || document.querySelector('.nav[id]') || document.querySelector('nav');
  if(navEl) navEl.appendChild(hamburger);

  // Build mobile menu from existing nav links
  const mobileMenu = document.createElement('div');
  mobileMenu.className = 'bd-mobile-menu';
  const navLinks = document.querySelector('.nav__links');
  if(navLinks) {
    navLinks.querySelectorAll('a').forEach(a => {
      const isCta = a.classList.contains('nav__cta') || a.classList.contains('nav__cta-btn') || a.classList.contains('nav__cta-text');
      const link = document.createElement('a');
      link.href = a.href; link.textContent = a.textContent.trim();
      if(a.classList.contains('active')) link.classList.add('active');
      if(isCta) link.classList.add('mob-cta');
      mobileMenu.appendChild(link);
    });
  }
  document.body.appendChild(mobileMenu);

  // Toggle
  hamburger.addEventListener('click', e => {
    e.stopPropagation();
    const open = hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* ── CUSTOM CURSOR ── */
  (function(){
    if(window.innerWidth <= 768) return;
    if(document.getElementById('cursor-dot')) return; // already exists
    const dot = document.createElement('div'); dot.id = 'cursor-dot';
    const ring = document.createElement('div'); ring.id = 'cursor-ring';
    document.body.appendChild(dot);
    document.body.appendChild(ring);
    let mx=0,my=0,rx=0,ry=0;
    document.addEventListener('mousemove',e=>{
      mx=e.clientX; my=e.clientY;
      dot.style.left=mx+'px'; dot.style.top=my+'px';
    });
    (function animateRing(){
      rx+=(mx-rx)*0.12; ry+=(my-ry)*0.12;
      ring.style.left=rx+'px'; ring.style.top=ry+'px';
      requestAnimationFrame(animateRing);
    })();
    document.querySelectorAll('a,button,.t-card,.t-filter').forEach(el=>{
      el.addEventListener('mouseenter',()=>document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave',()=>document.body.classList.remove('cursor-hover'));
    });
  })();

  /* ── NAV SCROLL ── */
  const nav=document.getElementById('main-nav');
  if(nav)window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',window.scrollY>60));

  /* ── SCROLL REVEAL ── */
  const obs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible');});
  },{threshold:0.09,rootMargin:'0px 0px -36px 0px'});
  document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));

  /* ── MAGNETIC BUTTONS ── */
  document.querySelectorAll('.magnetic').forEach(btn=>{
    btn.addEventListener('mousemove',e=>{
      const r=btn.getBoundingClientRect();
      btn.style.transform=`translate(${(e.clientX-r.left-r.width/2)*0.3}px,${(e.clientY-r.top-r.height/2)*0.3}px)`;
    });
    btn.addEventListener('mouseleave',()=>btn.style.transform='');
  });

  /* ── THREE.JS PARTICLES (inner pages) ── */
  const starsCanvas = document.getElementById('stars');
  if (starsCanvas && !document.getElementById('hero-3d')) {
    // Keep the existing 2D stars running — add a separate WebGL canvas on top for 3D interactivity
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js';
    script.onload = function() {
      const hero = starsCanvas.parentElement;
      const newCanvas = document.createElement('canvas');
      newCanvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:1;';
      hero.appendChild(newCanvas);
      const renderer = new THREE.WebGLRenderer({ canvas: newCanvas, alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(hero.offsetWidth, hero.offsetHeight);
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, hero.offsetWidth / hero.offsetHeight, 0.1, 1000);
      camera.position.z = 5;

      const COUNT = 220;
      const geo = new THREE.BufferGeometry();
      const pos = new Float32Array(COUNT * 3);
      const sizes = new Float32Array(COUNT);
      const colorsArr = new Float32Array(COUNT * 3);

      const darkPal  = [new THREE.Color('#c9a84c'),new THREE.Color('#e8d48e'),new THREE.Color('#9a7830'),new THREE.Color('#f0e0a0'),new THREE.Color('#8B1A3A')];
      const lightPal = [new THREE.Color('#c9a84c'),new THREE.Color('#b8902a'),new THREE.Color('#d4a840'),new THREE.Color('#c07858'),new THREE.Color('#a87830')];

      for (let i = 0; i < COUNT; i++) {
        pos[i*3]   = (Math.random()-.5)*14;
        pos[i*3+1] = (Math.random()-.5)*10;
        pos[i*3+2] = (Math.random()-.5)*6;
        sizes[i]   = Math.random()*3+0.5;
        const c = darkPal[Math.floor(Math.random()*darkPal.length)];
        colorsArr[i*3]=c.r; colorsArr[i*3+1]=c.g; colorsArr[i*3+2]=c.b;
      }
      geo.setAttribute('position', new THREE.BufferAttribute(pos,3));
      geo.setAttribute('color',    new THREE.BufferAttribute(colorsArr,3));
      geo.setAttribute('size',     new THREE.BufferAttribute(sizes,1));

      const dc=document.createElement('canvas'); dc.width=dc.height=64;
      const dctx=dc.getContext('2d');
      const g=dctx.createRadialGradient(32,32,0,32,32,30);
      g.addColorStop(0,'rgba(255,255,255,1)'); g.addColorStop(0.5,'rgba(255,255,255,0.6)');
      g.addColorStop(0.8,'rgba(255,255,255,0.15)'); g.addColorStop(1,'rgba(255,255,255,0)');
      dctx.fillStyle=g; dctx.beginPath(); dctx.arc(32,32,30,0,Math.PI*2); dctx.fill();

      const mat = new THREE.PointsMaterial({ map: new THREE.CanvasTexture(dc), vertexColors: true, transparent: true, opacity: 0.45, depthWrite: false, sizeAttenuation: true, size: 0.10 });
      const points = new THREE.Points(geo, mat);
      scene.add(points);

      function applyTheme() {
        const isLight = document.documentElement.getAttribute('data-theme')==='light';
        const pal = isLight ? lightPal : darkPal;
        mat.opacity = isLight ? 0.5 : 0.45;
        for (let i=0;i<COUNT;i++){const c=pal[Math.floor(Math.random()*pal.length)];colorsArr[i*3]=c.r;colorsArr[i*3+1]=c.g;colorsArr[i*3+2]=c.b;}
        geo.attributes.color.needsUpdate=true;
      }
      applyTheme();
      new MutationObserver(applyTheme).observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});

      let mx=0,my=0;
      document.addEventListener('mousemove',e=>{mx=(e.clientX/window.innerWidth-.5)*2;my=(e.clientY/window.innerHeight-.5)*2;});

      (function animate(t){
        requestAnimationFrame(animate);
        points.rotation.y=t*0.00006+mx*0.06;
        points.rotation.x=t*0.00003+my*0.04;
        renderer.render(scene,camera);
      })(0);

      window.addEventListener('resize',()=>{
        renderer.setSize(hero.offsetWidth, hero.offsetHeight);
        camera.aspect = hero.offsetWidth / hero.offsetHeight;
        camera.updateProjectionMatrix();
      });
    };
    document.head.appendChild(script);
  }

  /* ── CARD TILT ── */
  document.querySelectorAll('[data-tilt]').forEach(card=>{
    card.addEventListener('mousemove',e=>{
      const r=card.getBoundingClientRect();
      const x=(e.clientX-r.left)/r.width-0.5,y=(e.clientY-r.top)/r.height-0.5;
      card.style.transform=`perspective(900px) rotateY(${x*7}deg) rotateX(${-y*7}deg) translateZ(10px)`;
    });
    card.addEventListener('mouseleave',()=>{card.style.transform='';});
  });

})();

/* ── DRAGON MASCOT — fully animated guardian ── */
/* HIDDEN: remove the return below to re-enable the dragon */
(function dragonMascot(){
  return; /* DRAGON HIDDEN — delete this line to bring it back */
  if (document.getElementById('dragon-mascot-canvas')) return;

  const cvs = document.createElement('canvas');
  cvs.id = 'dragon-mascot-canvas';
  cvs.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:8000;';
  document.body.appendChild(cvs);

  function loadScript(src, cb) {
    const s = document.createElement('script'); s.src = src; s.onload = cb;
    document.head.appendChild(s);
  }
  function init() {
    loadScript('https://cdn.jsdelivr.net/npm/three@0.134.0/examples/js/loaders/GLTFLoader.js', startDragon);
  }
  if (typeof THREE === 'undefined') {
    loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js', init);
  } else { init(); }

  function startDragon() {
    const W = () => window.innerWidth, H = () => window.innerHeight;

    const renderer = new THREE.WebGLRenderer({ canvas: cvs, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W(), H());
    renderer.outputEncoding = THREE.sRGBEncoding;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, W()/H(), 0.1, 1000);
    camera.position.z = 30;

    /* Strong ambient so baked texture reads correctly */
    scene.add(new THREE.AmbientLight(0xffffff, 1.5));

    let dragon = null, mixer = null, actions = {};
    let currentClip = null;
    const clock = new THREE.Clock();

    /* Flight path — slow S-curve across the page on scroll */
    let wx = 7, wy = 2, twx = wx, twy = wy;
    let idleTimer = 0, isIdle = false;
    let mx = 0.5, my = 0.5;

    document.addEventListener('mousemove', e => {
      mx = e.clientX / W(); my = e.clientY / H();
      idleTimer = 0; isIdle = false;
    });

    window.addEventListener('scroll', () => {
      const pct = document.body.scrollHeight > H()
        ? window.scrollY / (document.body.scrollHeight - H()) : 0;
      twx = 7 - pct * 16;
      twy = 2 + Math.sin(pct * Math.PI * 1.5) * 3.5 - pct * 1.5;
      idleTimer = 0; isIdle = false;
    });

    /* Smooth crossfade between animation clips */
    function playClip(name, fadeSec) {
      fadeSec = fadeSec || 0.4;
      if (!actions[name] || currentClip === name) return;
      const next = actions[name];
      if (currentClip && actions[currentClip]) {
        actions[currentClip].fadeOut(fadeSec);
      }
      next.reset().fadeIn(fadeSec).play();
      currentClip = name;
    }

    const loader = new THREE.GLTFLoader();
    loader.load('dragon_mascot.glb', function(gltf) {
      dragon = gltf.scene;

      dragon.scale.setScalar(3);
      scene.add(dragon);
      dragon.position.set(7, 2, 0);
      dragon.rotation.x = -0.26;  /* lean forward — flight posture */
      dragon.rotation.y = 0;

      /* MeshBasicMaterial — exact Meshy baked texture colours */
      dragon.traverse(function(child) {
        if (child.isMesh) {
          child.frustumCulled = false;
          const orig = child.material;
          child.material = new THREE.MeshBasicMaterial({
            map: orig.map, side: THREE.DoubleSide, transparent: false
          });
        }
      });

      /* Build action map from all 8 animation clips */
      if (gltf.animations && gltf.animations.length) {
        mixer = new THREE.AnimationMixer(dragon);
        gltf.animations.forEach(function(clip) {
          const a = mixer.clipAction(clip);
          a.setLoop(THREE.LoopRepeat, Infinity);
          a.clampWhenFinished = false;
          actions[clip.name] = a;
        });

        /* Start flying immediately */
        const flyClip = actions['Fly_loop'] || actions[Object.keys(actions)[0]];
        if (flyClip) { flyClip.play(); currentClip = flyClip._clip.name; }
      }

      /* Cache bone references for procedural secondary motion */
      window._dragonBones = {};
      dragon.traverse(function(child) {
        if (child.isBone) window._dragonBones[child.name] = child;
      });

      window._dragon   = dragon;
      window._dragonFn = { playClip: playClip, actions: actions };
    }, undefined, function(err) { console.warn('Dragon error:', err); });

    /* Auto idle behaviour — after 4s of no scroll/mouse → LookAround */
    setInterval(function() {
      if (!dragon || !actions['LookAround']) return;
      idleTimer += 0.5;
      if (idleTimer > 4 && !isIdle) {
        isIdle = true;
        playClip('LookAround', 0.6);
        /* Return to Fly after LookAround duration (~5s) */
        setTimeout(function() {
          playClip('Fly_loop', 0.6);
          isIdle = false; idleTimer = 0;
        }, 5200);
      }
    }, 500);

    /* render loop */
    (function animate() {
      requestAnimationFrame(animate);
      const dt = clock.getDelta();
      if (mixer) mixer.update(dt);

      if (dragon) {
        const t = Date.now() * 0.001;

        /* Very slow drift */
        wx += (twx - wx) * 0.008;
        wy += (twy - wy) * 0.008;

        const bob   = Math.sin(t * 0.45) * 0.25;
        const drift = Math.sin(t * 0.28) * 0.15;
        dragon.position.x += (wx + drift - dragon.position.x) * 0.025;
        dragon.position.y += (wy + bob   - dragon.position.y) * 0.025;

        /* Bank into turns, follow mouse pitch */
        const dx         = twx - wx;
        const bankZ      = dx * -0.04;
        const targetRotY = Math.atan2(dx, 14) * 0.6;
        const pitchOff   = (my - 0.5) * 0.12;
        dragon.rotation.x += (-0.26 + pitchOff - dragon.rotation.x) * 0.02;
        dragon.rotation.y += (targetRotY - dragon.rotation.y) * 0.02;
        dragon.rotation.z += (bankZ - dragon.rotation.z) * 0.02;

        /* ── PROCEDURAL SECONDARY MOTION ── layered on top of baked anim ── */
        var bones = window._dragonBones;
        if (bones) {

          /* TAIL — sinusoidal wave travelling tip-to-base, offsets per bone
             so it looks like it's being dragged through air */
          var tailSpeed  = 2.2;                        /* wave frequency */
          var tailAmpl   = 0.28;                       /* side-to-side arc */
          var tailDroop  = 0.18;                       /* downward gravity */
          var tailNames  = ['Tail01','Tail02','Tail03','Tail04','Tail05'];
          for (var ti = 0; ti < tailNames.length; ti++) {
            var tb = bones[tailNames[ti]];
            if (!tb) continue;
            var phase  = ti * 0.55;                    /* lag per segment */
            var swoosh = Math.sin(t * tailSpeed + phase) * tailAmpl;
            var droop  = tailDroop * (ti + 1) * 0.22; /* more droop at tip */
            var wobble = Math.sin(t * tailSpeed * 0.7 + phase) * 0.06;
            /* Add on top of whatever baked animation set */
            tb.rotation.z += (swoosh    - tb.rotation.z) * 0.12;
            tb.rotation.x += (-droop   - tb.rotation.x) * 0.06;
            tb.rotation.y += (wobble   - tb.rotation.y) * 0.08;
          }

          /* HANDS / CLAWS — gentle curl and uncurl, left/right slightly offset */
          var handCurl = Math.sin(t * 1.8) * 0.18 + 0.12;
          var lh = bones['LeftHand'];  if (lh)  { lh.rotation.x  += (handCurl          - lh.rotation.x)  * 0.06; }
          var rh = bones['RightHand']; if (rh)  { rh.rotation.x  += (handCurl * 0.85   - rh.rotation.x)  * 0.06; }

          /* TOE BASES — toes curl slightly while flying, adds life */
          var toeCurl = 0.15 + Math.sin(t * 1.1) * 0.06;
          var lt = bones['LeftToeBase'];  if (lt) { lt.rotation.x += (toeCurl  - lt.rotation.x) * 0.04; }
          var rt = bones['RightToeBase']; if (rt) { rt.rotation.x += (toeCurl  - rt.rotation.x) * 0.04; }

          /* BREATHING — subtle spine expansion/contraction at ~0.25 Hz */
          var breath = Math.sin(t * 1.55) * 0.022;
          var sp = bones['Spine']; if (sp) {
            sp.rotation.x += (breath - sp.rotation.x) * 0.03;
          }
          var sp1 = bones['Spine01']; if (sp1) {
            sp1.rotation.x += (breath * 0.7 - sp1.rotation.x) * 0.03;
          }

          /* HEAD — micro eye-tracking toward mouse, tiny life movement */
          var headLookH = (mx - 0.5) * 0.22;
          var headLookV = (my - 0.5) * 0.14;
          var headNod   = Math.sin(t * 0.62) * 0.035;
          var hd = bones['Head']; if (hd) {
            hd.rotation.y += (headLookH          - hd.rotation.y) * 0.025;
            hd.rotation.x += (headLookV + headNod - hd.rotation.x) * 0.025;
          }
          var nk = bones['neck']; if (nk) {
            nk.rotation.y += (headLookH * 0.5 - nk.rotation.y) * 0.025;
          }

          /* JAW — very slight ambient movement, like exhaling */
          var jawBone = bones['Jaw']; if (jawBone) {
            var jawBreath = Math.max(0, Math.sin(t * 1.55 + 0.8)) * 0.04;
            jawBone.rotation.x += (jawBreath - jawBone.rotation.x) * 0.05;
          }

          /* WING TIPS — flutter slightly at tip, trailing the main stroke */
          var wt  = Math.sin(t * 4.8 + 0.4) * 0.12;
          var lwt = bones['LeftWingTip'];  if (lwt) { lwt.rotation.z += ( wt - lwt.rotation.z) * 0.15; }
          var rwt = bones['RightWingTip']; if (rwt) { rwt.rotation.z += (-wt - rwt.rotation.z) * 0.15; }
        }
      }
      renderer.render(scene, camera);
    })();

    window.addEventListener('resize', () => {
      renderer.setSize(W(), H());
      camera.aspect = W() / H();
      camera.updateProjectionMatrix();
    });
  }
})();
