import React, { useState, useEffect, useRef } from 'react';
import type { Item, CategoriesMap } from '../types';
import { JewelryVisual } from './JewelryVisual';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: CategoriesMap;
  keyedUrls: Record<string, string>;
  onJumpToStage: (catKey: string, lookIdx: number) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  categories,
  keyedUrls,
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

  const POPULAR_TAGS = ['Emerald', 'Diamond', 'Sapphire', 'Tourbillon', 'Pearl', '24k Gold'];

  return (
    <div className={`center-modal ${isOpen ? 'open' : ''}`} id="search-modal" role="dialog" aria-label="Search Maison Vell">
      <div className="modal-header">
        <h2 className="wide">Search Maison Vell Joaillerie</h2>
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
          placeholder="Search emeralds, solitaire rings, colliers, sapphires, tourbillons, pearls..."
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
            <p style={{ fontSize: '12px', color: 'var(--mid)' }}>No creations found matching &ldquo;{query}&rdquo;.</p>
          ) : (
            filtered.slice(0, 10).map((item) => {
              const src = keyedUrls[item.image] || item.image;

              return (
                <div key={item.id} className="item-row">
                  <div className="item-thumb">
                    <JewelryVisual src={src} alt={item.name} />
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

