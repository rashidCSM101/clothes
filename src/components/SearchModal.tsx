import React, { useState, useEffect, useRef } from 'react';
import type { Item, CategoriesMap } from '../types';
import { CropSvg } from './CropSvg';
import { MODELS_COUTURE } from '../data/categories';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: CategoriesMap;
  sheets: Record<string, string>;
  onJumpToStage: (catKey: string, lookIdx: number) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  categories,
  sheets,
  onJumpToStage
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 120);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Flatten all items across categories
  const allItems: Item[] = [];
  Object.values(categories).forEach((cat) => {
    cat.items.forEach((item, idx) => {
      allItems.push({
        ...item,
        catKey: cat.key,
        catTitle: cat.title,
        lookIdx: Math.floor(idx / 2)
      });
    });
  });

  const q = query.toLowerCase().trim();
  const filtered = q
    ? allItems.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          (item.catTitle && item.catTitle.toLowerCase().includes(q)) ||
          item.price.includes(q)
      )
    : allItems.slice(0, 6);

  const POPULAR_TAGS = ['Serum', 'Parfum', 'Kelly', 'Feather', 'Pleated', 'Stiletto'];

  return (
    <div className={`center-modal ${isOpen ? 'open' : ''}`} id="search-modal" role="dialog" aria-label="Search Maison Vell">
      <div className="modal-header">
        <h2 className="wide">Search Maison Vell</h2>
        <button className="close-btn" onClick={onClose} aria-label="Close search">
          &times;
        </button>
      </div>

      <div className="modal-body">
        <input
          ref={inputRef}
          type="text"
          id="search-input"
          className="form-input"
          placeholder="Search dresses, serums, parfum, handbags, cuffs, coats, silk..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <div style={{ display: 'flex', gap: '8px', marginTop: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: '10px', color: 'var(--mid)' }} className="wide">
            Popular:
          </span>
          {POPULAR_TAGS.map((tag) => (
            <button
              key={tag}
              className="look-step-btn search-tag"
              onClick={() => setQuery(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        <div id="search-results" style={{ marginTop: '24px' }}>
          {filtered.length === 0 ? (
            <p style={{ fontSize: '12px', color: 'var(--mid)' }}>No pieces found matching &ldquo;{query}&rdquo;.</p>
          ) : (
            filtered.slice(0, 10).map((item) => {
              const href = sheets[item.sheetKey] || MODELS_COUTURE;
              const w = item.b - item.a;
              const h = (item.d ?? 214) - (item.c ?? 28);

              return (
                <div key={item.id} className="item-row">
                  <div className="item-thumb">
                    <CropSvg
                      href={href}
                      x0={item.a}
                      y0={item.c ?? 28}
                      w={w}
                      h={h}
                      sheetW={item.sheetW ?? 960}
                      sheetH={item.sheetH ?? 720}
                    />
                  </div>
                  <div className="item-info">
                    <h4 className="wide">{item.name}</h4>
                    <div className="price">
                      {item.price} &middot; <span style={{ fontSize: '11px' }}>{item.catTitle}</span>
                    </div>
                  </div>
                  <button
                    className="primary-btn wide"
                    style={{ width: 'auto', padding: '8px 14px', fontSize: '9px' }}
                    onClick={() => onJumpToStage(item.catKey || 'runway', item.lookIdx || 0)}
                  >
                    View on Stage
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
