import React from 'react';
import type { Category } from '../types';

interface StoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: Category;
}

export const StoryModal: React.FC<StoryModalProps> = ({ isOpen, onClose, category }) => {
  return (
    <div className={`center-modal ${isOpen ? 'open' : ''}`} id="story-modal" role="dialog" aria-label="Atelier Notes">
      <div className="modal-header">
        <h2 className="wide" id="story-title">
          {category.title} &mdash; Atelier Notes
        </h2>
        <button className="close-btn" onClick={onClose} aria-label="Close notes">
          &times;
        </button>
      </div>
      <div className="modal-body" id="story-content">
        <h3 className="wide" style={{ fontSize: '12px', letterSpacing: '.14em', marginBottom: '12px' }}>
          {category.footerLabel}
        </h3>
        <p style={{ fontSize: '13px', lineHeight: 1.8, color: 'var(--mid)' }}>
          {category.editorial}
        </p>
        <div
          style={{
            marginTop: '20px',
            paddingTop: '16px',
            borderTop: '1px solid #eef2f6',
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '11px',
            color: 'var(--mid)'
          }}
        >
          <span>{category.looks.length} Curated Stage Editions</span>
          <span>{category.items.length} Synchronized Companion Pieces</span>
        </div>
      </div>
    </div>
  );
};

