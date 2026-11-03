import React from 'react';

interface CropSvgProps {
  href: string;
  x0: number;
  y0: number;
  w: number;
  h: number;
  sheetW?: number;
  sheetH?: number;
  className?: string;
}

export const CropSvg: React.FC<CropSvgProps> = ({
  href,
  x0,
  y0,
  w,
  h,
  sheetW = 960,
  sheetH = 720,
  className
}) => {
  return (
    <svg viewBox={`${x0} ${y0} ${w} ${h}`} aria-hidden="true" className={className}>
      <svg x={x0} y={y0} width={w} height={h} viewBox={`${x0} ${y0} ${w} ${h}`}>
        <image href={href} width={sheetW} height={sheetH} />
      </svg>
    </svg>
  );
};

