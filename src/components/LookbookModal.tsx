import React from 'react';
import type { Category } from '../types';
import { CropSvg } from './CropSvg';
import { MODELS_COUTURE } from '../data/categories';

interface LookbookModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: Category;
  sheets: Record<string, string>;
  onSelectLook: (idx: number) => void;
}

export const LookbookModal: React.FC<LookbookModalProps> = ({
  isOpen,
  onClose,
  category,
  sheets,
  onSelectLook
}) => {
  return (
    <div
      className={`center-modal ${isOpen ? 'open' : ''}`}
      id="lookbook-modal"
      style={{ width: 'min(880px, calc(100vw - 32px))' }}
      role="dialog"
      aria-label="Collection Index"
    >
      <div className="modal-header">
        <div>
          <h2 className="wide" id="lookbook-modal-title">
            {category.title} &mdash; Index
          </h2>
          <p style={{ fontSize: '11px', color: 'var(--mid)', marginTop: '4px' }}>
            Select any edition to walk that piece to the front of the 3D stage
          </p>
        </div>
        <button className="close-btn" onClick={onClose} aria-label="Close index">
          &times;
        </button>
      </div>

      <div className="modal-body">
        <div className="lookbook-grid" id="lookbook-grid-container">
          {category.looks.map((look, idx) => {
            const href = sheets[look.sheetKey] || MODELS_COUTURE;
            const w = look.b - look.a;
            const h = (look.y1 ?? 496) - (look.y0 ?? 48);
            const numStr = look.lookNum < 10 ? `0${look.lookNum}` : `${look.lookNum}`;
            const p1 = category.items[idx * 2];
            const p2 = category.items[idx * 2 + 1];

            return (
              <div
                key={`${look.lookNum}-${idx}`}
                className="lookbook-card"
                data-idx={idx}
                onClick={() => {
                  onSelectLook(idx);
                  onClose();
                }}
              >
                <div className="lookbook-img-box">
                  <CropSvg
                    href={href}
                    x0={look.a}
                    y0={look.y0 ?? 48}
                    w={w}
                    h={h}
                    sheetW={look.sheetW ?? 960}
                    sheetH={look.sheetH ?? 540}
                  />
                </div>
                <div className="lookbook-meta">
                  <div style={{ fontSize: '9px', color: 'var(--mid)', letterSpacing: '.12em' }} className="wide">
                    {category.counterLabel} {numStr}
                  </div>
                  <h4 className="wide" style={{ fontSize: '10px', marginTop: '4px', lineHeight: 1.4 }}>
                    {look.name}
                  </h4>
                  <div style={{ fontSize: '11px', color: 'var(--mid)', marginTop: '6px' }}>
                    {p1 ? p1.price : ''} {p2 ? `· ${p2.price}` : ''}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
