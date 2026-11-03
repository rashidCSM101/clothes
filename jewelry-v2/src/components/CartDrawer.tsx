import React from 'react';
import type { Item, BespokeConfig } from '../types';
import { JewelryVisual } from './JewelryVisual';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: Record<string, number>;
  bespokeConfigs: Record<string, BespokeConfig>;
  getItemById: (id: string) => Item | null;
  keyedUrls: Record<string, string>;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  bespokeConfigs,
  getItemById,
  keyedUrls,
  onIncrement,
  onDecrement,
  onRemove,
  onCheckout
}) => {
  const itemsInCart = Object.entries(cart).filter(([_, qty]) => qty > 0);
  const totalCount = itemsInCart.reduce((acc, [_, qty]) => acc + qty, 0);

  let subtotal = 0;
  itemsInCart.forEach(([id, qty]) => {
    const item = getItemById(id);
    if (item) subtotal += item.priceNum * qty;
  });

  return (
    <div className={`side-drawer ${isOpen ? 'open' : ''}`} id="cart-drawer" role="dialog" aria-label="Shopping Bag">
      <div className="drawer-header">
        <h2 className="wide">
          Shopping Bag (<span id="drawer-cart-count">{totalCount}</span>)
        </h2>
        <button className="close-btn" onClick={onClose} aria-label="Close bag">
          &times;
        </button>
      </div>

      <div className="drawer-body" id="cart-items-container">
        {itemsInCart.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px 12px', color: 'var(--mid)' }}>
            <p style={{ fontSize: '13px', marginBottom: '12px' }}>Your Maison Vell joaillerie bag is empty.</p>
            <button className="secondary-btn wide" onClick={onClose}>
              Explore High Jewelry
            </button>
          </div>
        ) : (
          itemsInCart.map(([id, qty]) => {
            const item = getItemById(id);
            if (!item) return null;
            const src = keyedUrls[item.image] || item.image;
            const bespoke = bespokeConfigs[id];

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
                  {bespoke && (
                    <div style={{ fontSize: '10px', color: 'var(--ink)', marginTop: '3px', letterSpacing: '.04em' }}>
                      {bespoke.metal} &middot; Size {bespoke.size}
                      {bespoke.engraving ? ` · “${bespoke.engraving}”` : ''}
                    </div>
                  )}
                  <div className="qty-ctrl">
                    <button className="cart-minus" onClick={() => onDecrement(id)} aria-label="Decrease quantity">
                      &minus;
                    </button>
                    <span style={{ fontSize: '12px', minWidth: '16px', textAlign: 'center', fontVariantNumeric: 'tabular-nums' }}>
                      {qty}
                    </span>
                    <button className="cart-plus" onClick={() => onIncrement(id)} aria-label="Increase quantity">
                      &#43;
                    </button>
                  </div>
                </div>
                <button
                  className="cart-remove"
                  onClick={() => onRemove(id)}
                  aria-label={`Remove ${item.name}`}
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
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '12px' }}>
          <span className="wide" style={{ color: 'var(--mid)' }}>
            Subtotal
          </span>
          <span id="cart-subtotal" style={{ fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>
            ${subtotal.toLocaleString()}
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '11px', color: 'var(--mid)' }}>
          <span>Complimentary Armoured White-Glove Delivery</span>
          <span>Free</span>
        </div>
        <button className="primary-btn wide" id="btn-checkout" onClick={onCheckout}>
          Proceed to Checkout
        </button>
        <button className="secondary-btn wide" onClick={onClose}>
          Continue Browsing
        </button>
      </div>
    </div>
  );
};
