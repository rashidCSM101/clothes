import React from 'react';
import type { Item } from '../types';
import { JewelryVisual } from './JewelryVisual';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: string[];
  getItemById: (id: string) => Item | null;
  keyedUrls: Record<string, string>;
  onMoveToCart: (id: string) => void;
  onRemoveFromWishlist: (id: string) => void;
  onMoveAllToCart: () => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlist,
  getItemById,
  keyedUrls,
  onMoveToCart,
  onRemoveFromWishlist,
  onMoveAllToCart
}) => {
  return (
    <div className={`side-drawer ${isOpen ? 'open' : ''}`} id="wishlist-drawer" role="dialog" aria-label="Saved Pieces">
      <div className="drawer-header">
        <h2 className="wide">Saved Creations</h2>
        <button className="close-btn" onClick={onClose} aria-label="Close saved pieces">
          &times;
        </button>
      </div>

      <div className="drawer-body" id="wishlist-items-container">
        {wishlist.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px 12px', color: 'var(--mid)' }}>
            <p style={{ fontSize: '13px' }}>No saved creations yet.</p>
            <p style={{ fontSize: '11px', marginTop: '8px' }}>Tap the heart icon on any ring, collier, timepiece, or high-jewelry piece.</p>
          </div>
        ) : (
          wishlist.map((id) => {
            const item = getItemById(id);
            if (!item) return null;
            const src = keyedUrls[item.image] || item.image;

            return (
              <div key={id} className="item-row">
                <div className="item-thumb">
                  <JewelryVisual src={src} alt={item.name} />
                </div>
                <div className="item-info">
                  <h4 className="wide">{item.name}</h4>
                  <div className="price">
                    {item.price} &middot; <span style={{ fontSize: '11px' }}>{item.catTitle}</span>
                  </div>
                  <button
                    className="wishlist-add-cart"
                    onClick={() => onMoveToCart(id)}
                    style={{ fontSize: '10px', textDecoration: 'underline', marginTop: '6px', display: 'block' }}
                  >
                    Move to Bag
                  </button>
                </div>
                <button
                  className="wishlist-remove"
                  onClick={() => onRemoveFromWishlist(id)}
                  aria-label="Remove saved item"
                  style={{ fontSize: '16px', color: 'var(--mid)', padding: '4px' }}
                >
                  &times;
                </button>
              </div>
            );
          })
        )}
      </div>

      <div className="drawer-footer">
        <button className="primary-btn wide" id="btn-move-all-cart" onClick={onMoveAllToCart}>
          Move All to Bag
        </button>
      </div>
    </div>
  );
};

