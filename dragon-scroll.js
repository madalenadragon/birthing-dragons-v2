/* ================================================================
   BIRTHING DRAGONS — Epic Dragon Scroll Hero
   Cinematic scroll-driven 3D dragon sequence for the homepage.
   THREE.js, GSAP + ScrollTrigger already loaded by index.html.
   ================================================================ */

(function () {
  'use strict';

  if (!document.getElementById('dragon-scroll-sequence')) return;

  /* ── wait for GLTFLoader (loaded after Three) ── */
  var GLTF_CDN = 'https://cdn.jsdelivr.net/npm/three@0.134.0/examples/js/loaders/GLTFLoader.js';

  function loadScript(src, cb) {
    var s = document.createElement('script');
    s.src = src; s.onload = cb;
    document.head.appendChild(s);
  }

  function boot() {
    if (typeof THREE.GLTFLoader !== 'undefined') { init(); }
    else { loadScript(GLTF_CDN, init); }
  }

  if (typeof THREE !== 'undefined' && typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    boot();
  } else {
    window.addEventListener('load', function () {
      gsap.registerPlugin(ScrollTrigger);
      boot();
    });
  }

  /* ================================================================
     INIT
  ================================================================ */
  function init() {
    var W = function () { return window.innerWidth; };
    var H = function () { return window.innerHeight; };
    var mobile = W() < 768;

    var canvas = document.getElementById('dragon-canvas');
    if (!canvas) return;

    /* ── RENDERER ── */
    var renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W(), H());
    renderer.outputEncoding = THREE.sRGBEncoding;

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(42, W() / H(), 0.1, 1000);
    camera.position.set(0, 0, 28);

    /* Light — strong ambient so baked Meshy texture reads correctly */
    scene.add(new THREE.AmbientLight(0xffffff, 2.2));

    /* ── GOLD PARTICLE FIELD ── */
    var pCount = mobile ? 400 : 900;
    var pPos = new Float32Array(pCount * 3);
    for (var pi = 0; pi < pCount * 3; pi++) pPos[pi] = (Math.random() - 0.5) * 90;
    var pgeo = new THREE.BufferGeometry();
    pgeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    var pMat = new THREE.PointsMaterial({ color: 0xc9a84c, size: mobile ? 0.14 : 0.07, transparent: true, opacity: 0.25 });
    var particles = new THREE.Points(pgeo, pMat);
    scene.add(particles);

    /* ── CRIMSON EMBER PARTICLES (secondary layer) ── */
    var eCount = mobile ? 120 : 280;
    var ePos = new Float32Array(eCount * 3);
    for (var ei = 0; ei < eCount * 3; ei++) ePos[ei] = (Math.random() - 0.5) * 70;
    var egeo = new THREE.BufferGeometry();
    egeo.setAttribute('position', new THREE.BufferAttribute(ePos, 3));
    var eMat = new THREE.PointsMaterial({ color: 0x8b1a3a, size: mobile ? 0.1 : 0.05, transparent: true, opacity: 0.15 });
    var embers = new THREE.Points(egeo, eMat);
    scene.add(embers);

    /* ── SCROLL-DRIVEN STATE (GSAP tweens these) ── */
    var S = {
      dragonX:     mobile ? 0 : -2,
      dragonY:     -1,
      dragonZ:     -70,
      dragonScale: 0.28,
      dragonRotY:  0.35,
      dragonRotX:  -0.15,
      cameraZ:     28,
      pOpacity:    0.18,
      eOpacity:    0.1,
      /* text channels 0-1 */
      eyebrow: 0, line1: 0, line2: 0, tagline: 0, body: 0, actions: 0, hint: 1
    };

    /* ── DRAGON LOAD ── */
    var dragon = null, mixer = null, clips = {}, curClip = null;
    var bones  = {};
    var clock  = new THREE.Clock();

    function playClip(name, fade) {
      if (!clips[name] || curClip === name) return;
      fade = fade || 0.5;
      if (curClip && clips[curClip]) clips[curClip].fadeOut(fade);
      clips[name].reset().fadeIn(fade).play();
      curClip = name;
    }

    var loader = new THREE.GLTFLoader();
    loader.load('dragon_mascot.glb', function (gltf) {
      dragon = gltf.scene;
      dragon.scale.setScalar(S.dragonScale);
      dragon.position.set(S.dragonX, S.dragonY, S.dragonZ);
      dragon.rotation.set(S.dragonRotX, S.dragonRotY, 0);

      /* MeshBasicMaterial — exact Meshy baked-texture colours, no lighting dependency */
      dragon.traverse(function (child) {
        if (child.isMesh) {
          child.frustumCulled = false;   /* CRITICAL — prevents culling during animation */
          var orig = child.material;
          child.material = new THREE.MeshBasicMaterial({
            map: orig.map, side: THREE.DoubleSide, transparent: false
          });
        }
        if (child.isBone) bones[child.name] = child;
      });

      /* Build all 8 animation clips */
      if (gltf.animations && gltf.animations.length) {
        mixer = new THREE.AnimationMixer(dragon);
        gltf.animations.forEach(function (clip) {
          var a = mixer.clipAction(clip);
          a.setLoop(THREE.LoopRepeat, Infinity);
          a.clampWhenFinished = false;
          clips[clip.name] = a;
        });
        var fly = clips['Fly_loop'] || clips[Object.keys(clips)[0]];
        if (fly) { fly.play(); curClip = fly._clip.name; }
      }

      scene.add(dragon);
      buildTimeline();

    }, undefined, function (err) { console.warn('Dragon load error:', err); });

    /* ── GSAP SCROLL TIMELINE ── */
    function buildTimeline() {
      var tl = gsap.timeline({
        scrollTrigger: {
          trigger: '#dragon-scroll-sequence',
          start:   'top top',
          end:     'bottom bottom',
          scrub:   2,
          onUpdate: function (self) {
            var p = self.progress;
            if      (p < 0.45) playClip('Fly_loop',    0.7);
            else if (p < 0.78) playClip('Hover_idle',  0.9);
            else               playClip('Fly_loop',    0.7);
          }
        }
      });

      /* Phase 1: Dragon charges toward camera (0 - 42%) */
      tl.to(S, {
        dragonZ:     mobile ? 7 : 5.5,
        dragonScale: mobile ? 2.6 : 3.0,
        dragonX:     mobile ? 0 : -0.4,
        dragonY:     0.4,
        dragonRotY:  0,
        cameraZ:     25,
        pOpacity:    0.75,
        eOpacity:    0.4,
        duration: 42, ease: 'power2.out'
      }, 0);

      tl.to(S, { hint: 0, duration: 8 }, 0);

      /* Eyebrow fades in at 18% */
      tl.to(S, { eyebrow: 1, duration: 9, ease: 'power2.out' }, 18);

      /* Title burns in 28 - 46% */
      tl.to(S, { line1: 1, duration: 9, ease: 'power2.out' }, 28);
      tl.to(S, { line2: 1, duration: 9, ease: 'power2.out' }, 36);

      /* Phase 2: Dragon sweeps to the right side (52 - 72%) */
      tl.to(S, {
        dragonX:     mobile ? 0 : 8.5,
        dragonY:     0.2,
        dragonRotY:  mobile ? 0 : -0.38,
        dragonScale: mobile ? 2.2 : 2.6,
        duration: 20, ease: 'power2.inOut'
      }, 52);

      /* Tagline, body, CTAs reveal 56 - 74% */
      tl.to(S, { tagline: 1, duration: 8, ease: 'power2.out' }, 56);
      tl.to(S, { body:    1, duration: 8, ease: 'power2.out' }, 63);
      tl.to(S, { actions: 1, duration: 8, ease: 'power2.out' }, 70);

      /* Phase 3: Dragon ascends and exits (80 - 100%) */
      tl.to(S, {
        dragonY:     22,
        dragonZ:     18,
        dragonScale: 0.7,
        pOpacity:    0.12,
        eOpacity:    0.05,
        duration: 20, ease: 'power2.in'
      }, 80);
    }

    /* ── RENDER LOOP ── */
    (function animate() {
      requestAnimationFrame(animate);
      var dt = clock.getDelta();
      var t  = Date.now() * 0.001;

      if (mixer) mixer.update(dt);

      if (dragon) {
        /* Smoothly lerp dragon toward scroll-driven targets */
        var bob   = Math.sin(t * 0.44) * 0.18;
        var drift = Math.sin(t * 0.27) * 0.12;
        dragon.position.x += (S.dragonX + drift - dragon.position.x) * 0.042;
        dragon.position.y += (S.dragonY + bob   - dragon.position.y) * 0.042;
        dragon.position.z += (S.dragonZ         - dragon.position.z) * 0.042;
        var curScale = dragon.scale.x;
        dragon.scale.setScalar(curScale + (S.dragonScale - curScale) * 0.042);
        dragon.rotation.y += (S.dragonRotY - dragon.rotation.y) * 0.04;
        dragon.rotation.x += (S.dragonRotX - dragon.rotation.x) * 0.04;
        /* Bank into turns */
        var bank = (S.dragonX - dragon.position.x) * -0.05;
        dragon.rotation.z += (bank - dragon.rotation.z) * 0.04;

        /* ── PROCEDURAL SECONDARY MOTION — identical to mascot ── */

        /* Tail: sinusoidal wave tip-to-base */
        var tailNames = ['Tail01','Tail02','Tail03','Tail04','Tail05'];
        for (var ti = 0; ti < tailNames.length; ti++) {
          var tb = bones[tailNames[ti]];
          if (!tb) continue;
          var ph  = ti * 0.55;
          var swsh = Math.sin(t * 2.2 + ph) * 0.28;
          var drp  = 0.18 * (ti + 1) * 0.22;
          var wob  = Math.sin(t * 1.54 + ph) * 0.06;
          tb.rotation.z += (swsh - tb.rotation.z) * 0.12;
          tb.rotation.x += (-drp  - tb.rotation.x) * 0.06;
          tb.rotation.y += (wob   - tb.rotation.y) * 0.08;
        }

        /* Head subtle micro-movement */
        var hd = bones['Head'];
        if (hd) {
          hd.rotation.x += (Math.sin(t * 0.62) * 0.035 - hd.rotation.x) * 0.025;
          hd.rotation.y += (0 - hd.rotation.y) * 0.02;
        }
        var nk = bones['neck'] || bones['Neck'];
        if (nk) nk.rotation.y += (0 - nk.rotation.y) * 0.02;

        /* Breathing — subtle spine expansion */
        var breath = Math.sin(t * 1.55) * 0.022;
        var sp  = bones['Spine'];   if (sp)  sp.rotation.x  += (breath       - sp.rotation.x)  * 0.03;
        var sp1 = bones['Spine01']; if (sp1) sp1.rotation.x += (breath * 0.7 - sp1.rotation.x) * 0.03;

        /* Wing tips flutter */
        var wt  = Math.sin(t * 4.8 + 0.4) * 0.12;
        var lwt = bones['LeftWingTip'];  if (lwt) lwt.rotation.z += ( wt - lwt.rotation.z) * 0.15;
        var rwt = bones['RightWingTip']; if (rwt) rwt.rotation.z += (-wt - rwt.rotation.z) * 0.15;

        /* Hands and claws */
        var handCurl = Math.sin(t * 1.8) * 0.18 + 0.12;
        var lh = bones['LeftHand'];  if (lh) lh.rotation.x += (handCurl        - lh.rotation.x) * 0.06;
        var rh = bones['RightHand']; if (rh) rh.rotation.x += (handCurl * 0.85 - rh.rotation.x) * 0.06;

        /* Toe curl while flying */
        var toeCurl = 0.15 + Math.sin(t * 1.1) * 0.06;
        var lt = bones['LeftToeBase'];  if (lt) lt.rotation.x += (toeCurl - lt.rotation.x) * 0.04;
        var rt = bones['RightToeBase']; if (rt) rt.rotation.x += (toeCurl - rt.rotation.x) * 0.04;

        /* Jaw — ambient breath exhale */
        var jaw = bones['Jaw'];
        if (jaw) {
          var jawBreath = Math.max(0, Math.sin(t * 1.55 + 0.8)) * 0.04;
          jaw.rotation.x += (jawBreath - jaw.rotation.x) * 0.05;
        }
      }

      /* Camera smooth follow */
      camera.position.z += (S.cameraZ - camera.position.z) * 0.04;

      /* Particles drift */
      particles.material.opacity = S.pOpacity;
      particles.rotation.y = t * 0.009;
      particles.rotation.x = t * 0.003;
      embers.material.opacity = S.eOpacity;
      embers.rotation.y = -t * 0.006;

      renderer.render(scene, camera);
    })();

    /* ── TEXT OVERLAY SYNC (30 fps is plenty for DOM updates) ── */
    var els = {
      eyebrow: document.getElementById('dsh-eyebrow'),
      line1:   document.getElementById('dsh-line1'),
      line2:   document.getElementById('dsh-line2'),
      tagline: document.getElementById('dsh-tagline'),
      body:    document.getElementById('dsh-body'),
      actions: document.getElementById('dsh-actions'),
      hint:    document.getElementById('dsh-scroll-hint')
    };

    function applyText(el, val, yAmt) {
      if (!el) return;
      el.style.opacity   = val;
      el.style.transform = 'translateY(' + ((1 - val) * (yAmt || 24)) + 'px)';
    }

    setInterval(function () {
      applyText(els.eyebrow, S.eyebrow, 14);
      applyText(els.line1,   S.line1,   36);
      applyText(els.line2,   S.line2,   36);
      applyText(els.tagline, S.tagline, 20);
      applyText(els.body,    S.body,    18);
      applyText(els.actions, S.actions, 18);
      if (els.hint) els.hint.style.opacity = S.hint;
    }, 33);

    /* ── RESIZE ── */
    window.addEventListener('resize', function () {
      renderer.setSize(W(), H());
      camera.aspect = W() / H();
      camera.updateProjectionMatrix();
      mobile = W() < 768;
    });
  }

})();
