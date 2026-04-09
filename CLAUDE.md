# Birthing Dragons Website — Project Rules

## ⚠️ CRITICAL: Correct Working Directory

**ALL edits must be made in this directory:**
```
/Users/madalenamorbey/birthing-dragons-v2/.claude/worktrees/pedantic-liskov/
```

**The preview server runs at:** `http://localhost:8080`

**DO NOT edit or touch:**
- `/Users/madalenamorbey/birthing-dragons-v2/` (main repo — different/older version)
- `/Users/madalenamorbey/birthingdragons-pages/` (old separate folder — not this project)

The correct site is always at **localhost:8080**. If another port (e.g. 4200) is open, ignore it — it is an unrelated old server.

Before making any change, confirm the file path starts with:
`/Users/madalenamorbey/birthing-dragons-v2/.claude/worktrees/pedantic-liskov/`

---

## Tech Stack
- Static HTML/CSS/JS site — no build step
- Served via Python HTTP server on port 8080
- Three.js r134 (CDN) for particles + 3D dragon mascot
- `_shared.js` — loaded on every page; contains theme toggle, nav, particles, dragon mascot IIFE
- `dragon_mascot.glb` — 3D dragon with 8 named animation clips

## Key Files
| File | Purpose |
|------|---------|
| `_shared.js` | Shared JS for all pages — particles, dragon, nav, theme |
| `dragon_mascot.glb` | 3D dragon model with animations |
| `index.html` | Home page with hero-3d WebGL particle field |
| `_base.css` / `shared-styles.css` | Shared styles |

## Dragon Mascot Notes
- Scale: `dragon.scale.setScalar(3)`, position starts at `(7, 2, 0)`
- Uses `MeshBasicMaterial` (not MeshPhysical) — baked Meshy texture, no lighting dependency
- `child.frustumCulled = false` — critical, prevents culling during animation
- 8 animation clips: Fly_loop, Hover_idle, Laugh, Talk, GrabCard, PresentCard, LookAround, Celebrate
- Procedural secondary motion layered on top: tail wave, head tracking, breathing, jaw, wing tips
