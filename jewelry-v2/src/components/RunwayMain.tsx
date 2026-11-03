import React, { useEffect, useLayoutEffect, useRef, useCallback, useState } from 'react';
import type { Category } from '../types';
import type { SparklePoint } from '../utils/canvasKeyer';
import { KX, KF, KH, KB, KO } from '../data/categories';
import { JewelryVisual } from './JewelryVisual';

interface RunwayMainProps {
  category: Category;
  keyedUrls: Record<string, string>;
  aspectRatios: Record<string, number>;
  sparklesMap: Record<string, SparklePoint[]>;
  wishlist: string[];
  isSwitching: boolean;
  vaultNoir: boolean;
  loupeEnabled: boolean;
  jumpTarget: number | null;
  onJumpTargetHandled: () => void;
  onToggleWishlist: (id: string) => void;
  onAddToCart: (id: string) => void;
  onOpenBespoke: (id: string) => void;
  onShopCurrentLook: (activeIdx: number) => void;
  onOpenIndex: () => void;
  onActiveIdxChange: (idx: number) => void;
}

const wrap = (x: number, n: number) => ((x % n) + n) % n;
const clamp = (x: number, a: number, b: number) => Math.min(b, Math.max(a, x));

export const RunwayMain: React.FC<RunwayMainProps> = ({
  category,
  keyedUrls,
  aspectRatios,
  sparklesMap,
  wishlist,
  isSwitching,
  vaultNoir,
  loupeEnabled,
  jumpTarget,
  onJumpTargetHandled,
  onToggleWishlist,
  onAddToCart,
  onOpenBespoke,
  onShopCurrentLook,
  onOpenIndex,
  onActiveIdxChange
}) => {
  const stageRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const loupeRef = useRef<HTMLDivElement>(null);
  const rollRef = useRef<HTMLSpanElement>(null);
  const peopleContainerRef = useRef<HTMLDivElement>(null);

  const peopleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  // Physics state (100% identical to V1)
  const pRef = useRef(0);
  const targetRef = useRef(0);
  const lastTimeRef = useRef(0);
  const dirtyRef = useRef(true);
  const lastActiveIdxRef = useRef(0);

  // Foreground 3D tilt state & Loupe state
  const [stageTilt, setStageTilt] = useState({ x: 0, y: 0 });
  const [shiftHeld, setShiftHeld] = useState(false);
  const [pointerInside, setPointerInside] = useState(false);
  const [loupeBgPos, setLoupeBgPos] = useState('50% 50%');

  // Layout cache
  const WRef = useRef(0);
  const HRef = useRef(0);
  const baseRef = useRef(0);
  const cardSRef = useRef(0);
  const sideRef = useRef(false);

  // Mouse / cursor tracking
  const mxRef = useRef(0);
  const myRef = useRef(0);
  const cxRef = useRef(0);
  const cyRef = useRef(0);
  const downRef = useRef(false);
  const sxRef = useRef(0);
  const stRef = useRef(0);
  const movedRef = useRef(0);
  const wheelTimerRef = useRef<number | null>(null);

  const calm = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion:reduce)').matches;

  const isLoupeActive = (loupeEnabled || shiftHeld) && pointerInside && !downRef.current;

  // Handle external jump target (e.g. clicking footer pills, index modal, search)
  useEffect(() => {
    if (jumpTarget !== null) {
      targetRef.current = jumpTarget;
      onJumpTargetHandled();
      dirtyRef.current = true;
    }
  }, [jumpTarget, onJumpTargetHandled]);

  // Size recalculation
  const size = useCallback(() => {
    if (!stageRef.current || !railRef.current) return;
    const stageEl = stageRef.current;
    const railEl = railRef.current;

    const W = stageEl.clientWidth;
    const H = stageEl.clientHeight;
    WRef.current = W;
    HRef.current = H;

    const base = H * 1.2;
    baseRef.current = base;

    const side = window.innerWidth <= 820;
    sideRef.current = side;

    category.looks.forEach((look, i) => {
      const el = peopleRefs.current[i];
      if (el) {
        const r = look.aspectRatio || aspectRatios[look.image] || 0.38;
        el.style.width = `${base * r}px`;
        el.style.height = `${base}px`;
      }
    });

    const cardS = side ? 160 : railEl.clientHeight / 3;
    cardSRef.current = cardS;

    cardRefs.current.forEach((c) => {
      if (c) c.style.height = side ? '100%' : `${cardS}px`;
    });

    if (rollRef.current?.firstChild) {
      const rollEl = rollRef.current;
      const firstChild = rollEl.firstChild as HTMLElement;
      rollEl.style.setProperty('--h', `${firstChild.getBoundingClientRect().height}`);
    }

    dirtyRef.current = true;
  }, [category.looks, aspectRatios]);

  // Render/Paint loop (100% identical math & DOM styling)
  const paint = useCallback(() => {
    const N = category.looks.length;
    if (N === 0) return;

    const p = pRef.current;
    const H = HRef.current;
    const W = WRef.current;
    const base = baseRef.current;
    const cardS = cardSRef.current;
    const side = sideRef.current;

    // Paint stage models/busts
    category.looks.forEach((look, i) => {
      const el = peopleRefs.current[i];
      if (!el) return;

      let d = wrap(i - p, N);
      if (d > N - 1) d -= N;

      const k = clamp(d + 1, 0, 6);
      const a = Math.floor(k);
      const b = Math.min(6, a + 1);
      const t = k - a;
      const mix = (A: number[]) => A[a] + (A[b] - A[a]) * t;

      const r = look.aspectRatio || aspectRatios[look.image] || 0.38;

      const h = mix(KH) * H;
      const s = h / (base || 1);
      const w = h * r;
      const x = mix(KX) * W - w / 2;
      const y = mix(KF) * H - h;

      el.style.transform = `translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0) scale(${s.toFixed(4)})`;

      const f = mix(KB) / s;
      const fs = f < 0.2 ? 'none' : `blur(${f.toFixed(1)}px)`;
      const o = mix(KO).toFixed(3);

      el.style.filter = fs;
      el.style.opacity = o;
      el.style.zIndex = `${100 - Math.round(d * 10)}`;
    });

    // Paint rail cards
    const all = cardS * category.items.length;
    category.items.forEach((_, i) => {
      const c = cardRefs.current[i];
      if (!c) return;
      let y = wrap(i * cardS - p * 2 * cardS, all);
      if (y > all - cardS) y -= all;
      c.style.transform = side
        ? `translate3d(${y.toFixed(1)}px,0,0)`
        : `translate3d(0,${y.toFixed(1)}px,0)`;
    });

    // Roll counter number
    if (rollRef.current?.firstChild) {
      const firstChild = rollRef.current.firstChild as HTMLElement;
      const offsetH = firstChild.offsetHeight;
      rollRef.current.style.transform = `translate3d(0,${(-wrap(p, N) * offsetH).toFixed(1)}px,0)`;
    }

    // Active look pill sync
    const activeIdx = wrap(Math.round(p), N);
    if (activeIdx !== lastActiveIdxRef.current) {
      lastActiveIdxRef.current = activeIdx;
      onActiveIdxChange(activeIdx);
    }
  }, [category.looks, category.items, aspectRatios, onActiveIdxChange]);

  // Main physics animation frame
  useEffect(() => {
    let animId: number;

    const frame = (now: number) => {
      const dt = Math.min(50, now - lastTimeRef.current) || 16;
      lastTimeRef.current = now;

      const was = pRef.current;
      const target = targetRef.current;

      if (calm) {
        pRef.current = target;
      } else {
        pRef.current += (target - pRef.current) * (1 - Math.exp(-dt * 0.0072));
      }

      if (Math.abs(target - pRef.current) < 0.0004) {
        pRef.current = target;
      }

      if (pRef.current !== was || dirtyRef.current) {
        dirtyRef.current = false;
        paint();
      }

      // Smooth custom cursor follower ring & gemologist loupe
      cxRef.current += (mxRef.current - cxRef.current) * 0.32;
      cyRef.current += (myRef.current - cyRef.current) * 0.32;
      const posTransform = `translate3d(${cxRef.current.toFixed(1)}px,${cyRef.current.toFixed(1)}px,0)`;
      if (ringRef.current) {
        ringRef.current.style.transform = posTransform;
      }
      if (loupeRef.current) {
        loupeRef.current.style.transform = posTransform;
      }

      animId = requestAnimationFrame(frame);
    };

    animId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(animId);
  }, [calm, paint]);

  // Setup resize listeners and initial size synchronously before paint
  useLayoutEffect(() => {
    size();
    paint();
    window.addEventListener('resize', size);
    return () => window.removeEventListener('resize', size);
  }, [size, paint]);

  // Reset indices on category switch synchronously before browser paint
  useLayoutEffect(() => {
    pRef.current = 0;
    targetRef.current = 0;
    size();
    paint();
  }, [category.key, size, paint]);

  // Pointer interactions
  const handlePointerEnter = (e: React.PointerEvent) => {
    if (e.pointerType === 'mouse') {
      setPointerInside(true);
      ringRef.current?.classList.add('show');
    }
  };

  const handlePointerLeave = () => {
    setPointerInside(false);
    setStageTilt({ x: 0, y: 0 });
    ringRef.current?.classList.remove('show');
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!stageRef.current) return;
    const r = stageRef.current.getBoundingClientRect();
    const mx = e.clientX - r.left;
    const my = e.clientY - r.top;
    mxRef.current = mx;
    myRef.current = my;

    // 3D Stage Tilt calculation for foreground jewel
    const nx = mx / (r.width || 1) - 0.65;
    const ny = my / (r.height || 1) - 0.5;
    setStageTilt({
      x: clamp(nx * 20, -11, 11),
      y: clamp(-ny * 16, -9, 9)
    });

    // Update Gemologist Loupe optical zoom position relative to foreground jewel element
    const activeIdx = wrap(Math.round(pRef.current), category.looks.length);
    const activeEl = peopleRefs.current[activeIdx];
    if (activeEl) {
      const box = activeEl.getBoundingClientRect();
      const bx = clamp(((e.clientX - box.left) / (box.width || 1)) * 100, 0, 100);
      const by = clamp(((e.clientY - box.top) / (box.height || 1)) * 100, 0, 100);
      setLoupeBgPos(`${bx.toFixed(1)}% ${by.toFixed(1)}%`);
    }

    if (!downRef.current) return;
    const dx = e.clientX - sxRef.current;
    movedRef.current = Math.max(movedRef.current, Math.abs(dx));
    const pull = Math.max(150, WRef.current * 0.2);
    targetRef.current = stRef.current + dx / pull;
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    const targetEl = e.target as HTMLElement;
    if (targetEl.closest('a, button')) return;
    downRef.current = true;
    sxRef.current = e.clientX;
    stRef.current = targetRef.current;
    movedRef.current = 0;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    ringRef.current?.classList.add('drag');
  };

  const handleRelease = (e: React.PointerEvent) => {
    if (!downRef.current) return;
    downRef.current = false;
    ringRef.current?.classList.remove('drag');

    const N = category.looks.length;
    if (movedRef.current < 6) {
      const hit = document
        .elementsFromPoint(e.clientX, e.clientY)
        .find((x) => x.classList && x.classList.contains('m')) as HTMLElement | undefined;
      if (hit && hit.dataset.i !== undefined) {
        let d = wrap(+hit.dataset.i - targetRef.current, N);
        d = Math.round(d);
        if (d > 0 && d < N) {
          targetRef.current = Math.round(targetRef.current) + d;
        }
      }
    } else {
      targetRef.current = Math.round(targetRef.current);
    }
  };

  // Wheel listener attached with { passive: false }
  useEffect(() => {
    const stageEl = stageRef.current;
    if (!stageEl) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      targetRef.current += clamp(e.deltaY + e.deltaX, -120, 120) / 420;
      if (wheelTimerRef.current) clearTimeout(wheelTimerRef.current);
      wheelTimerRef.current = window.setTimeout(() => {
        targetRef.current = Math.round(targetRef.current);
      }, 150);
    };

    stageEl.addEventListener('wheel', onWheel, { passive: false });
    return () => stageEl.removeEventListener('wheel', onWheel);
  }, []);

  // Keyboard navigation + Shift key Loupe activator
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Shift') setShiftHeld(true);
      if (document.querySelector('.side-drawer.open, .center-modal.open')) return;
      if (['ArrowRight', 'ArrowDown'].includes(e.key)) {
        e.preventDefault();
        targetRef.current = Math.round(targetRef.current) + 1;
      }
      if (['ArrowLeft', 'ArrowUp'].includes(e.key)) {
        e.preventDefault();
        targetRef.current = Math.round(targetRef.current) - 1;
      }
    };

    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Shift') setShiftHeld(false);
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, []);

  const N = category.looks.length;
  const currentActiveIdx = wrap(Math.round(pRef.current), N);
  const activeLook = category.looks[currentActiveIdx];
  const activeLookSrc = activeLook ? keyedUrls[activeLook.image] || activeLook.image : '';

  const stageBgValue = vaultNoir
    ? 'radial-gradient(circle at 72% 48%, #262d3d 0%, #12151e 52%, #090b10 100%)'
    : category.stageBg;

  return (
    <main>
      <section
        ref={stageRef}
        className={`stage ${vaultNoir ? 'vault-noir' : ''}`}
        id="stage"
        aria-label="Runway looks. Drag, scroll or use the arrow keys to change look."
        tabIndex={0}
        style={{ '--stage-bg': stageBgValue } as React.CSSProperties}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onPointerMove={handlePointerMove}
        onPointerDown={handlePointerDown}
        onPointerUp={handleRelease}
        onPointerCancel={handleRelease}
      >
        <div
          ref={peopleContainerRef}
          className={`line ${isSwitching ? 'switching' : ''}`}
          id="line"
        >
          {category.looks.map((look, i) => {
            const src = keyedUrls[look.image] || look.image;
            const isForeground = i === currentActiveIdx;
            return (
              <div
                key={i}
                ref={(el) => {
                  peopleRefs.current[i] = el;
                }}
                className="m"
                data-i={i}
              >
                <JewelryVisual
                  src={src}
                  alt={look.name}
                  sparkles={isForeground ? sparklesMap[look.image] : undefined}
                  enable3DTilt={isForeground}
                  externalTilt={isForeground ? stageTilt : undefined}
                />
              </div>
            );
          })}
        </div>

        <div className="intro">
          <h2 className="wide" id="hero-title">
            {category.title}
          </h2>
          <p id="hero-desc">{category.desc}</p>
          <div className="intro-actions">
            <button className="intro-link wide" id="btn-open-index" onClick={onOpenIndex}>
              {category.counterLabel} Index ({N})
            </button>
            <button
              className="intro-link wide"
              onClick={() => {
                const firstItem = category.items[currentActiveIdx * 2];
                if (firstItem) onOpenBespoke(firstItem.id);
              }}
            >
              Bespoke &amp; GIA Dossier
            </button>
          </div>
        </div>

        <div className="tag">
          <div className="look wide" aria-live="polite">
            <span id="counter-label">{category.counterLabel}</span>
            <span className="win">
              <span className="roll" id="roll" ref={rollRef}>
                {Array.from({ length: N + 1 }).map((_, i) => {
                  const num = category.looks[i % N]?.lookNum ?? 1;
                  const numStr = num < 10 ? `0${num}` : `${num}`;
                  return <b key={i}>{numStr}</b>;
                })}
              </span>
            </span>
          </div>
          <button
            className="shop wide"
            id="shop-look-btn"
            onClick={() => {
              const activeIdx = wrap(Math.round(pRef.current), N);
              onShopCurrentLook(activeIdx);
            }}
          >
            {category.shopCta}
          </button>
        </div>

        {/* Standard custom follower ring (hidden when Gemologist Loupe is active) */}
        <div
          className="ring"
          id="ring"
          ref={ringRef}
          style={{ opacity: isLoupeActive ? 0 : undefined }}
        />

        {/* 10x Gemologist Optical Magnifier Loupe */}
        <div
          ref={loupeRef}
          className={`gem-loupe ${isLoupeActive ? 'show' : ''}`}
          style={{
            backgroundImage: activeLookSrc ? `url("${activeLookSrc}")` : undefined,
            backgroundPosition: loupeBgPos
          }}
        >
          <span className="loupe-badge wide">10x GIA Loupe</span>
        </div>
      </section>

      <aside
        ref={railRef}
        className={`rail ${isSwitching ? 'switching' : ''}`}
        id="rail"
        aria-label="Pieces in this look"
      >
        {category.items.map((item, i) => {
          const src = keyedUrls[item.image] || item.image;
          const isFav = wishlist.includes(item.id);

          return (
            <article
              key={i}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className={`card ${i % 2 ? 'alt' : ''}`}
              data-id={item.id}
              onClick={() => onOpenBespoke(item.id)}
              title="Click to customize metal, engraving & view GIA certificate"
              style={{ cursor: 'pointer' }}
            >
              <button
                className="fav"
                aria-pressed={isFav}
                aria-label={`Save ${item.name}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleWishlist(item.id);
                }}
              >
                <svg viewBox="0 0 24 24">
                  <path d="M12 20S3.5 15 3.5 9A4.6 4.6 0 0 1 12 6.6 4.6 4.6 0 0 1 20.500 9C20.500 15 12 20 12 20Z" />
                </svg>
              </button>
              <span className="shot">
                <JewelryVisual
                  src={src}
                  alt={item.name}
                  sparkles={sparklesMap[item.image]}
                  enable3DTilt={true}
                />
              </span>
              <div className="meta">
                <h3 className="wide">{item.name}</h3>
                <span>{item.price}</span>
                <button
                  className="add"
                  aria-label={`Add ${item.name} to cart`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart(item.id);
                  }}
                />
              </div>
            </article>
          );
        })}
      </aside>
    </main>
  );
};
