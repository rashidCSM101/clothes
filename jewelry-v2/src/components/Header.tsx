import React from 'react';

interface HeaderProps {
  activeCatKey: string;
  onSelectCategory: (catKey: string) => void;
  cartCount: number;
  savedCount: number;
  userLabel: string;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  onOpenLogin: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeCatKey,
  onSelectCategory,
  cartCount,
  savedCount,
  userLabel,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onOpenLogin
}) => {
  return (
    <header>
      <div className="r1">
        <a
          className="brand wide"
          href="#runway"
          id="brand-logo"
          aria-label="Maison Vell"
          onClick={(e) => {
            e.preventDefault();
            onSelectCategory('runway');
          }}
        >
          Maison Vell
        </a>
        <nav className="tabs wide" aria-label="Sections">
          <button
            className={`nav-cat-btn ${activeCatKey === 'runway' ? 'on' : ''}`}
            data-cat="runway"
            aria-current={activeCatKey === 'runway' ? 'page' : undefined}
            onClick={() => onSelectCategory('runway')}
          >
            High Jewelry
          </button>
          <button
            className={`nav-cat-btn ${activeCatKey === 'maison' ? 'on' : ''}`}
            data-cat="maison"
            aria-current={activeCatKey === 'maison' ? 'page' : undefined}
            onClick={() => onSelectCategory('maison')}
          >
            The Maison
          </button>
          <button
            className={`nav-cat-btn ${activeCatKey === 'lookbook' ? 'on' : ''}`}
            data-cat="lookbook"
            aria-current={activeCatKey === 'lookbook' ? 'page' : undefined}
            onClick={() => onSelectCategory('lookbook')}
          >
            Lookbook
          </button>
          <button
            className={`nav-cat-btn ${activeCatKey === 'shop' ? 'on' : ''}`}
            data-cat="shop"
            aria-current={activeCatKey === 'shop' ? 'page' : undefined}
            onClick={() => onSelectCategory('shop')}
          >
            Shop
          </button>
        </nav>
        <div className="acct wide">
          <button id="btn-login" aria-label="Member Login" onClick={onOpenLogin}>
            {userLabel}
          </button>
          <button id="btn-search" aria-label="Search Collection" onClick={onOpenSearch}>
            <svg viewBox="0 0 24 24">
              <circle cx="10.5" cy="10.5" r="6.5" />
              <path d="m15.5 15.5 5 5" />
            </svg>
          </button>
          <button id="btn-saved" aria-label="Saved Pieces" onClick={onOpenWishlist}>
            <svg viewBox="0 0 24 24">
              <path d="M12 20S3.5 15 3.5 9A4.6 4.6 0 0 1 12 6.6 4.6 4.6 0 0 1 20.500 9C20.500 15 12 20 12 20Z" />
            </svg>{' '}
            (<span id="saved-count" className="badge-count">{savedCount}</span>)
          </button>
          <button id="btn-cart" aria-label="Shopping Bag" onClick={onOpenCart}>
            <svg viewBox="0 0 24 24">
              <path d="M5 8h14l1 13H4Z" />
              <path d="M9 10V6a3 3 0 0 1 6 0v4" />
            </svg>{' '}
            Cart (<span id="cart" className="badge-count">{cartCount}</span>)
          </button>
        </div>
      </div>
      <nav className="r2 wide" aria-label="Departments">
        <button
          className={`nav-cat-btn ${activeCatKey === 'rings' ? 'on' : ''}`}
          data-cat="rings"
          aria-current={activeCatKey === 'rings' ? 'page' : undefined}
          onClick={() => onSelectCategory('rings')}
        >
          Rings
        </button>
        <button
          className={`nav-cat-btn ${activeCatKey === 'necklaces' ? 'on' : ''}`}
          data-cat="necklaces"
          aria-current={activeCatKey === 'necklaces' ? 'page' : undefined}
          onClick={() => onSelectCategory('necklaces')}
        >
          Necklaces
        </button>
        <button
          className={`nav-cat-btn ${activeCatKey === 'earrings' ? 'on' : ''}`}
          data-cat="earrings"
          aria-current={activeCatKey === 'earrings' ? 'page' : undefined}
          onClick={() => onSelectCategory('earrings')}
        >
          Earrings
        </button>
        <button
          className={`nav-cat-btn ${activeCatKey === 'bracelets' ? 'on' : ''}`}
          data-cat="bracelets"
          aria-current={activeCatKey === 'bracelets' ? 'page' : undefined}
          onClick={() => onSelectCategory('bracelets')}
        >
          Bracelets
        </button>
        <button
          className={`nav-cat-btn ${activeCatKey === 'timepieces' ? 'on' : ''}`}
          data-cat="timepieces"
          aria-current={activeCatKey === 'timepieces' ? 'page' : undefined}
          onClick={() => onSelectCategory('timepieces')}
        >
          Timepieces
        </button>
        <button
          className={`nav-cat-btn ${activeCatKey === 'bridal' ? 'on' : ''}`}
          data-cat="bridal"
          aria-current={activeCatKey === 'bridal' ? 'page' : undefined}
          onClick={() => onSelectCategory('bridal')}
        >
          Bridal
        </button>
      </nav>
    </header>
  );
};

