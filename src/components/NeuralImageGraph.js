import React, { useMemo, useState } from 'react';

function polarToCartesian(centerX, centerY, radius, angleRad) {
  return {
    x: centerX + radius * Math.cos(angleRad),
    y: centerY + radius * Math.sin(angleRad),
  };
}

export default function NeuralImageGraph({
  images = [
    '/assets/me1.jpg',
    '/assets/me2.jpg',
    '/assets/Mr-Robot.jpeg'
  ],
  size = 360,
}) {
  const [active, setActive] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [hoverCenter, setHoverCenter] = useState(false);
  const accent = '#00d4ff';
  const isModalOpen = !!active;

  const center = { x: size / 2, y: size / 2 };
  const radius = size * 0.36; // used for drawing the middle area only

  const nodes = useMemo(() => {
    const n = images.length;
    const NODE_SIZE = 56; // must match the button size below
    const minDist = NODE_SIZE + 12; // spacing between nodes
    const outerR = size * 0.42;
    const innerR = size * 0.20; // keep a hole near the label

    // simple deterministic RNG (mulberry32)
    let seed = 0;
    for (let i = 0; i < images.length; i++) seed = (seed + images[i].length * 97 + i * 31) >>> 0;
    const rand = (() => {
      let t = seed || 1;
      return () => {
        t += 0x6D2B79F5;
        let r = Math.imul(t ^ (t >>> 15), 1 | t);
        r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
        return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
      };
    })();

    // initial random positions in an annulus
    const pts = Array.from({ length: n }, (_, i) => {
      const ang = rand() * Math.PI * 2;
      const r = innerR + rand() * (outerR - innerR);
      const { x, y } = polarToCartesian(center.x, center.y, r, ang);
      return { id: i, src: images[i], x, y };
    });

    // relax to avoid overlaps and stay inside the ring
    const ITER = 140;
    for (let it = 0; it < ITER; it++) {
      // pairwise repulsion to avoid collisions
      for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
          const a = pts[i], b = pts[j];
          let dx = b.x - a.x;
          let dy = b.y - a.y;
          const d = Math.hypot(dx, dy) || 0.0001;
          const overlap = minDist - d;
          if (overlap > 0) {
            const push = (overlap / 2) * (1 - it / ITER); // decay over time
            dx /= d; dy /= d;
            a.x -= dx * push; a.y -= dy * push;
            b.x += dx * push; b.y += dy * push;
          }
        }
      }

      // keep within outer radius and outside inner radius
      for (let i = 0; i < n; i++) {
        const a = pts[i];
        let dx = a.x - center.x;
        let dy = a.y - center.y;
        let d = Math.hypot(dx, dy) || 0.0001;
        // pull back inside outer circle
        if (d > outerR) {
          const scale = outerR / d;
          a.x = center.x + dx * scale;
          a.y = center.y + dy * scale;
          d = outerR;
        }
        // push out of inner circle
        if (d < innerR) {
          const scale = innerR / d;
          a.x = center.x + dx * scale;
          a.y = center.y + dy * scale;
        }
      }
    }

    return pts;
  }, [images, size, center.x, center.y]);

  return (
    <div style={{ position: 'relative', width: size, height: size, margin: '0 auto' }}>
      <svg
        width={size}
        height={size}
        aria-hidden={isModalOpen}
        style={{ position: 'absolute', inset: 0, opacity: isModalOpen ? 0.12 : 1, pointerEvents: isModalOpen ? 'none' : 'auto', zIndex: 0 }}
      >
        <defs>
          <radialGradient id="glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx={center.x} cy={center.y} r={radius * 0.4} fill="url(#glow)" opacity="0.35" />
        {nodes.map((n) => (
          <line
            key={`c-${n.id}`}
            x1={center.x}
            y1={center.y}
            x2={n.x}
            y2={n.y}
            stroke={(hoveredId === n.id || hoverCenter) ? accent : '#ffffff'}
            strokeOpacity={(hoveredId === n.id || hoverCenter) ? 0.7 : 0.35}
            strokeWidth={(hoveredId === n.id || hoverCenter) ? 2.2 : 1.5}
          />
        ))}
        {nodes.map((a) =>
          nodes.map((b) =>
            a.id < b.id ? (
              <line
                key={`l-${a.id}-${b.id}`}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke={hoveredId === a.id || hoveredId === b.id ? accent : '#ffffff'}
                strokeOpacity={hoveredId === a.id || hoveredId === b.id ? 0.6 : 0.18}
                strokeWidth={hoveredId === a.id || hoveredId === b.id ? 2 : 1.5}
              />
            ) : null
          )
        )}
        <g onMouseEnter={() => setHoverCenter(true)} onMouseLeave={() => setHoverCenter(false)} style={{ cursor: 'pointer' }}>
          <circle cx={center.x} cy={center.y} r={radius * 0.28} fill="#1f1f1f" stroke={hoverCenter ? accent : '#ffffff'} strokeOpacity={hoverCenter ? 0.7 : 0.35} strokeWidth={hoverCenter ? 2 : 1} />
          <text x={center.x} y={center.y} textAnchor="middle" dominantBaseline="middle" fill={hoverCenter ? accent : '#ffffff'} style={{ fontSize: 18, fontWeight: 600, opacity: hoverCenter ? 1 : 0.85 }}>
            Memories
          </text>
        </g>
      </svg>

      {nodes.map((n) => (
        <button
          key={n.id}
          onClick={() => setActive(n)}
          onMouseEnter={() => setHoveredId(n.id)}
          onMouseLeave={() => setHoveredId(null)}
          style={{
            position: 'absolute',
            left: n.x - 28,
            top: n.y - 28,
            width: 56,
            height: 56,
            borderRadius: 14,
            overflow: 'hidden',
            padding: 0,
            border: hoveredId === n.id ? `2px solid ${accent}` : '2px solid rgba(255,255,255,0.35)',
            boxShadow: hoveredId === n.id 
              ? `0 10px 24px rgba(0,0,0,0.55), 0 0 18px ${accent}55`
              : '0 0 12px rgba(255,255,255,0.25)',
            background: 'transparent',
            cursor: 'pointer',
            transform: hoveredId === n.id ? 'translateY(-4px) scale(1.08)' : 'translateY(0) scale(1)',
            transition: 'transform 150ms ease, box-shadow 150ms ease, border-color 150ms ease',
            zIndex: hoveredId === n.id ? 2 : 1,
            display: isModalOpen ? 'none' : 'block',
          }}
          aria-label="Open image"
        >
          <img src={n.src} alt="memory" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </button>
      ))}

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: 'absolute',
            inset: 0,
            display: 'grid',
            placeItems: 'center',
            background: 'rgba(0,0,0,0.45)',
            backdropFilter: 'blur(2px)',
            animation: 'fadeIn 160ms ease-out',
            zIndex: 100,
          }}
          onClick={() => setActive(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: Math.min(520, size * 0.9),
              borderRadius: 18,
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.25)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.55)',
              background: '#0f0f0f',
            }}
          >
            <div style={{ position: 'relative' }}>
              <img src={active.src} alt="selected memory" style={{ width: '100%', display: 'block', maxHeight: 420, objectFit: 'cover' }} />
              <button
                onClick={() => setActive(null)}
                style={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  width: 34,
                  height: 34,
                  borderRadius: 8,
                  background: 'rgba(0,0,0,0.6)',
                  color: '#fff',
                  border: '1px solid rgba(255,255,255,0.2)',
                  cursor: 'pointer',
                }}
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <div style={{ padding: '12px 14px', color: '#ddd' }}>
              <div style={{ fontSize: 14, opacity: 0.8 }}>Click outside to close</div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @media (max-width: 640px) {
          div[data-neural-resize] { transform: scale(0.9); }
        }
      `}</style>
    </div>
  );
}
