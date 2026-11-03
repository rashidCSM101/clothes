import React, { useState, useEffect, useCallback, useRef } from 'react';
import type { ModalType, Item, CategoriesMap } from './types';
import {
  INITIAL_CATEGORIES,
  SHEETS,
  MODELS_COUTURE,
  PIECES_COUTURE,
  RAW_BEAUTY_STAGE,
  RAW_BEAUTY_PIECES,
  RAW_ACC_STAGE,
  RAW_ACC_PIECES,
  BEAUTY_LOOK_BOXES,
  BEAUTY_PIECE_BOXES,
  ACC_LOOK_BOXES,
  ACC_PIECE_BOXES
} from './data/categories';
import { keyStudioSheetToTransparent } from './utils/canvasKeyer';
import { audioEngine } from './utils/audio';

import { Header } from './components/Header';
import { RunwayMain } from './components/RunwayMain';
import { LuxuryFooter } from './components/LuxuryFooter';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SearchModal } from './components/SearchModal';
import { LookbookModal } from './components/LookbookModal';
import { AddLookModal } from './components/AddLookModal';
import { StoryModal } from './components/StoryModal';
import { AccountModal } from './components/AccountModal';

export default function App() {
  const [categories, setCategories] = useState<CategoriesMap>(INITIAL_CATEGORIES);
  const [activeCatKey, setActiveCatKey] = useState<string>('runway');
  const [sheets, setSheets] = useState<Record<string, string>>(SHEETS);
  const [cart, setCart] = useState<Record<string, number>>({});
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [jumpTarget, setJumpTarget] = useState<number | null>(null);
  const [isSwitching, setIsSwitching] = useState<boolean>(false);
  const [userLabel, setUserLabel] = useState<string>('Login');
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [toastMsg, setToastMsg] = useState<string>('');
  const [toastVisible, setToastVisible] = useState<boolean>(false);

  const toastTimerRef = useRef<number | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMsg(msg);
    setToastVisible(true);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = window.setTimeout(() => {
      setToastVisible(false);
    }, 2600);
  }, []);

  // Pre-Key Studio Sheets for Transparent Alpha
  useEffect(() => {
    Promise.all([
      ...[MODELS_COUTURE, PIECES_COUTURE].map((u) => {
        const i = new Image();
        i.src = u;
        return i.decode().catch(() => {});
      }),
      keyStudioSheetToTransparent(
        RAW_BEAUTY_STAGE,
        BEAUTY_LOOK_BOXES.map((x) => [x.a, x.b, x.y0 ?? 110, x.y1 ?? 445]),
        960,
        540
      )
        .then((url) => setSheets((prev) => ({ ...prev, beautyStage: url })))
        .catch(() => {}),
      keyStudioSheetToTransparent(
        RAW_BEAUTY_PIECES,
        BEAUTY_PIECE_BOXES.map((x) => [x.a, x.b, x.c ?? 16, x.d ?? 232]),
        960,
        720
      )
        .then((url) => setSheets((prev) => ({ ...prev, beautyPieces: url })))
        .catch(() => {}),
      keyStudioSheetToTransparent(
        RAW_ACC_STAGE,
        ACC_LOOK_BOXES.map((x) => [x.a, x.b, x.y0 ?? 155, x.y1 ?? 385]),
        960,
        540
      )
        .then((url) => setSheets((prev) => ({ ...prev, accStage: url })))
        .catch(() => {}),
      keyStudioSheetToTransparent(
        RAW_ACC_PIECES,
        ACC_PIECE_BOXES.map((x) => [x.a, x.b, x.c ?? 20, x.d ?? 215]),
        960,
        720
      )
        .then((url) => setSheets((prev) => ({ ...prev, accPieces: url })))
        .catch(() => {})
    ])
      .then(() => document.fonts.ready)
      .then(() => {
        setIsReady(true);
      });
  }, []);

  const currentCategory = categories[activeCatKey] || categories['runway'];

  // Global lookup for any item by ID across all categories
  const getItemById = useCallback(
    (id: string): Item | null => {
      for (const cat of Object.values(categories)) {
        const found = cat.items.find((x) => x.id === id);
        if (found) return { ...found, catKey: cat.key, catTitle: cat.title };
      }
      return null;
    },
    [categories]
  );

  // Switch category with 160ms smooth fade
  const handleSelectCategory = (catKey: string, lookIdx = 0) => {
    if (!categories[catKey]) return;
    setActiveModal(null);
    if (activeCatKey === catKey) {
      setJumpTarget(lookIdx);
      return;
    }
    setIsSwitching(true);
    setTimeout(() => {
      setActiveCatKey(catKey);
      setJumpTarget(lookIdx);
      setIsSwitching(false);
    }, 160);
  };

  // Cart operations
  const handleAddToCart = (id: string) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    const item = getItemById(id);
    showToast(`Added ${item ? item.name : 'piece'} to Bag`);
  };

  const handleIncrementCart = (id: string) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const handleDecrementCart = (id: string) => {
    setCart((prev) => {
      const next = { ...prev };
      if (next[id] > 1) {
        next[id]--;
      } else {
        delete next[id];
      }
      return next;
    });
  };

  const handleRemoveFromCart = (id: string) => {
    setCart((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const handleCheckout = () => {
    const totalCount = Object.values(cart).reduce((a, b) => a + b, 0);
    if (totalCount === 0) return;
    setCart({});
    setActiveModal(null);
    showToast('Order #MV-2027 confirmed — Preparing white-glove shipment');
  };

  // Wishlist operations
  const handleToggleWishlist = (id: string) => {
    setWishlist((prev) => {
      if (prev.includes(id)) {
        showToast('Removed from Wishlist');
        return prev.filter((x) => x !== id);
      } else {
        showToast('Saved to Wishlist');
        return [...prev, id];
      }
    });
  };

  const handleMoveToCart = (id: string) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    setWishlist((prev) => prev.filter((x) => x !== id));
    showToast('Moved to Shopping Bag');
  };

  const handleMoveAllToCart = () => {
    if (wishlist.length === 0) return;
    setCart((prev) => {
      const next = { ...prev };
      wishlist.forEach((id) => {
        next[id] = (next[id] || 0) + 1;
      });
      return next;
    });
    setWishlist([]);
    setActiveModal('cart');
    showToast('All saved pieces moved to Bag');
  };

  // Shop foreground look pieces
  const handleShopCurrentLook = (idx: number) => {
    const p1 = currentCategory.items[idx * 2];
    const p2 = currentCategory.items[idx * 2 + 1];
    setCart((prev) => {
      const next = { ...prev };
      if (p1) next[p1.id] = (next[p1.id] || 0) + 1;
      if (p2) next[p2.id] = (next[p2.id] || 0) + 1;
      return next;
    });
    setActiveModal('cart');
    const look = currentCategory.looks[idx];
    showToast(`Added ${currentCategory.counterLabel} ${look ? look.lookNum : idx + 1} pieces to Bag`);
  };

  // Add custom look to current category
  const handleAddCustomLook = ({
    lookNum,
    title,
    piece1Name,
    piece1Price,
    piece2Name,
    piece2Price
  }: {
    lookNum: number;
    title: string;
    piece1Name: string;
    piece1Price: string;
    piece2Name: string;
    piece2Price: string;
  }) => {
    const templateLook = currentCategory.looks[currentCategory.looks.length % 6];
    const templateP1 = currentCategory.items[0];
    const templateP2 = currentCategory.items[1];
    const p1Num = parseInt(piece1Price.replace(/[^0-9]/g, ''), 10) || 1800;
    const p2Num = parseInt(piece2Price.replace(/[^0-9]/g, ''), 10) || 650;
    const uid = Date.now();

    const newLook = {
      ...templateLook,
      lookNum,
      name: title
    };

    const newItems = [
      {
        ...templateP1,
        id: `${activeCatKey}-${uid}-1`,
        lookNum,
        name: piece1Name,
        price: piece1Price,
        priceNum: p1Num
      },
      {
        ...templateP2,
        id: `${activeCatKey}-${uid}-2`,
        lookNum,
        name: piece2Name,
        price: piece2Price,
        priceNum: p2Num
      }
    ];

    setCategories((prev) => ({
      ...prev,
      [activeCatKey]: {
        ...prev[activeCatKey],
        looks: [...prev[activeCatKey].looks, newLook],
        items: [...prev[activeCatKey].items, ...newItems]
      }
    }));

    setJumpTarget(currentCategory.looks.length);
    showToast(`${currentCategory.counterLabel} ${lookNum}: "${title}" added`);
  };

  // Soundscape toggle
  const handleToggleAudio = () => {
    const playing = audioEngine.toggle();
    setIsAudioPlaying(playing);
  };

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);

  return (
    <div className="page">
      <Header
        activeCatKey={activeCatKey}
        onSelectCategory={(cat) => handleSelectCategory(cat, 0)}
        cartCount={cartCount}
        savedCount={wishlist.length}
        userLabel={userLabel}
        onOpenCart={() => setActiveModal('cart')}
        onOpenWishlist={() => setActiveModal('wishlist')}
        onOpenSearch={() => setActiveModal('search')}
        onOpenLogin={() => setActiveModal('account')}
      />

      <RunwayMain
        category={currentCategory}
        sheets={sheets}
        wishlist={wishlist}
        isSwitching={isSwitching}
        jumpTarget={jumpTarget}
        onJumpTargetHandled={() => setJumpTarget(null)}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
        onShopCurrentLook={handleShopCurrentLook}
        onOpenIndex={() => setActiveModal('lookbook')}
        onActiveIdxChange={setActiveIdx}
      />

      <LuxuryFooter
        footerLabel={currentCategory.footerLabel}
        counterLabel={currentCategory.counterLabel}
        looks={currentCategory.looks}
        activeIdx={activeIdx}
        isAudioPlaying={isAudioPlaying}
        onToggleAudio={handleToggleAudio}
        onOpenAddLook={() => setActiveModal('add-look')}
        onOpenEditorial={() => setActiveModal('story')}
        onSelectLook={(idx) => setJumpTarget(idx)}
      />

      {/* Overlay Backdrop */}
      <div
        className={`overlay-backdrop ${activeModal ? 'open' : ''}`}
        id="backdrop"
        onClick={() => setActiveModal(null)}
      />

      {/* Slide-Over Drawers & Modals */}
      <CartDrawer
        isOpen={activeModal === 'cart'}
        onClose={() => setActiveModal(null)}
        cart={cart}
        getItemById={getItemById}
        sheets={sheets}
        onIncrement={handleIncrementCart}
        onDecrement={handleDecrementCart}
        onRemove={handleRemoveFromCart}
        onCheckout={handleCheckout}
      />

      <WishlistDrawer
        isOpen={activeModal === 'wishlist'}
        onClose={() => setActiveModal(null)}
        wishlist={wishlist}
        getItemById={getItemById}
        sheets={sheets}
        onMoveToCart={handleMoveToCart}
        onRemoveFromWishlist={handleToggleWishlist}
        onMoveAllToCart={handleMoveAllToCart}
      />

      <SearchModal
        isOpen={activeModal === 'search'}
        onClose={() => setActiveModal(null)}
        categories={categories}
        sheets={sheets}
        onJumpToStage={(catKey, lookIdx) => {
          handleSelectCategory(catKey, lookIdx);
        }}
      />

      <LookbookModal
        isOpen={activeModal === 'lookbook'}
        onClose={() => setActiveModal(null)}
        category={currentCategory}
        sheets={sheets}
        onSelectLook={(idx) => setJumpTarget(idx)}
      />

      <AddLookModal
        isOpen={activeModal === 'add-look'}
        onClose={() => setActiveModal(null)}
        nextLookNum={(currentCategory.looks[currentCategory.looks.length - 1]?.lookNum ?? 20) + 1}
        onAddLook={handleAddCustomLook}
      />

      <StoryModal
        isOpen={activeModal === 'story'}
        onClose={() => setActiveModal(null)}
        category={currentCategory}
      />

      <AccountModal
        isOpen={activeModal === 'account'}
        onClose={() => setActiveModal(null)}
        onLoginSuccess={() => {
          setUserLabel('VIP Atelier');
          showToast('Signed in as Maison Vell Private Client');
        }}
      />

      {/* Toast Notification */}
      <div className={`toast wide ${toastVisible ? 'show' : ''}`} id="toast">
        {toastMsg}
      </div>

      {/* Initial Boot Curtain */}
      <div className={`wait ${isReady ? 'gone' : ''}`} id="wait" />
    </div>
  );
}
