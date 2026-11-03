import React from 'react';
import type { Category } from '../types';
import { JewelryVisual } from './JewelryVisual';

interface LookbookModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: Category;
  keyedUrls: Record<string, string>;
  onSelectLook: (idx: number) => void;
}

export const LookbookModal: React.FC<LookbookModalProps> = ({
  isOpen,
  onClose,
  category,
  keyedUrls,
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
            Select any edition to walk that creation to the front of the 3D stage
          </p>
        </div>
        <button className="close-btn" onClick={onClose} aria-label="Close index">
          &times;
        </button>
      </div>

      <div className="modal-body">
        <div className="lookbook-grid" id="lookbook-grid-container">
          {category.looks.map((look, idx) => {
            const src = keyedUrls[look.image] || look.image;
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
                  <JewelryVisual src={src} alt={look.name} />
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

