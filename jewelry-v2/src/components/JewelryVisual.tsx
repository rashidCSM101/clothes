import React, { useState } from 'react';
import type { SparklePoint } from '../utils/canvasKeyer';

interface JewelryVisualProps {
  src: string;
  alt?: string;
  className?: string;
  sparkles?: SparklePoint[];
  enable3DTilt?: boolean;
  externalTilt?: { x: number; y: number };
}

export const JewelryVisual: React.FC<JewelryVisualProps> = ({
  src,
  alt = '',
  className,
  sparkles,
  enable3DTilt = false,
  externalTilt
}) => {
  const [localTilt, setLocalTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const tiltX = externalTilt ? externalTilt.x : localTilt.x;
  const tiltY = externalTilt ? externalTilt.y : localTilt.y;

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!enable3DTilt || externalTilt) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / (rect.width || 1) - 0.5;
    const ny = (e.clientY - rect.top) / (rect.height || 1) - 0.5;
    setLocalTilt({ x: nx * 16, y: -ny * 16 });
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    setLocalTilt({ x: 0, y: 0 });
  };

  const active3D = enable3DTilt && (isHovered || (externalTilt && (Math.abs(externalTilt.x) > 0.1 || Math.abs(externalTilt.y) > 0.1)));

  return (
    <div
      className={`jewelry-3d-wrap ${className || ''}`}
      onPointerEnter={() => enable3DTilt && setIsHovered(true)}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'block',
        transformStyle: 'preserve-3d',
        transform: active3D
          ? `perspective(900px) rotateX(${tiltY.toFixed(2)}deg) rotateY(${tiltX.toFixed(2)}deg) scale3d(1.025, 1.025, 1.025)`
          : 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        filter: active3D
          ? `drop-shadow(${(-tiltX * 0.9).toFixed(1)}px ${(10 + Math.abs(tiltY) * 0.6).toFixed(1)}px 16px rgba(22, 25, 31, 0.22))`
          : 'drop-shadow(0px 6px 12px rgba(22, 25, 31, 0.1))',
        transition: externalTilt
          ? 'filter 0.2s ease-out'
          : 'transform 0.18s cubic-bezier(0.2, 0.8, 0.2, 1), filter 0.2s ease-out'
      }}
    >
      <img
        src={src}
        alt={alt}
        draggable={false}
        style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
      />

      {/* Specular Diamond Facet Sparkle Overlay */}
      {sparkles && sparkles.length > 0 && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            overflow: 'hidden'
          }}
        >
          {sparkles.map((sp, idx) => {
            // Shift sparkle intensity slightly as piece tilts in 3D
            const tiltBoost = Math.abs(tiltX + tiltY) * 0.04;
            return (
              <svg
                key={idx}
                className="diamond-sparkle"
                viewBox="0 0 32 32"
                style={{
                  position: 'absolute',
                  left: `${(sp.x * 100).toFixed(1)}%`,
                  top: `${(sp.y * 100).toFixed(1)}%`,
                  width: `${Math.round(22 * sp.size)}px`,
                  height: `${Math.round(22 * sp.size)}px`,
                  marginLeft: `-${Math.round(11 * sp.size)}px`,
                  marginTop: `-${Math.round(11 * sp.size)}px`,
                  animationDelay: `${sp.phase.toFixed(2)}s`,
                  transform: `scale(${(1 + tiltBoost).toFixed(2)})`
                }}
              >
                <defs>
                  <radialGradient id={`glint-${idx}`}>
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                    <stop offset="45%" stopColor="#fffbe8" stopOpacity="0.65" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <circle cx="16" cy="16" r="7" fill={`url(#glint-${idx})`} />
                <path
                  d="M16 0 L17.6 13.5 L32 16 L17.6 18.5 L16 32 L14.4 18.5 L0 16 L14.4 13.5 Z"
                  fill="#ffffff"
                />
                <path
                  d="M7 7 L14.8 14.2 L25 7 L17.2 15.8 L25 25 L16 17.4 L7 25 L14.5 15.8 Z"
                  fill="#fffdf2"
                  opacity="0.7"
                />
              </svg>
            );
          })}
        </div>
      )}
    </div>
  );
};
