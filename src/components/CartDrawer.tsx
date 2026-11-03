import React from 'react';
import type { Item } from '../types';
import { CropSvg } from './CropSvg';
import { MODELS_COUTURE } from '../data/categories';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: Record<string, number>;
  getItemById: (id: string) => Item | null;
  sheets: Record<string, string>;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  getItemById,
  sheets,
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
            <p style={{ fontSize: '13px', marginBottom: '12px' }}>Your Maison Vell shopping bag is empty.</p>
            <button className="secondary-btn wide" onClick={onClose}>
              Explore the Runway
            </button>
          </div>
        ) : (
          itemsInCart.map(([id, qty]) => {
            const item = getItemById(id);
            if (!item) return null;
            const href = sheets[item.sheetKey] || MODELS_COUTURE;
            const w = item.b - item.a;
            const h = (item.d ?? 214) - (item.c ?? 28);

            return (
              <div key={id} className="item-row">
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
          <span>Complimentary White-Glove Delivery</span>
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
