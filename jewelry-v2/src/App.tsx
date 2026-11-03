import React, { useState, useEffect, useCallback, useRef } from 'react';
import type { ModalType, Item, CategoriesMap, BespokeConfig } from './types';
import { INITIAL_CATEGORIES } from './data/categories';
import { STAGE_IMAGES, PIECE_IMAGES } from './config/imagePaths';
import { keySingleImageToTransparent, type SparklePoint } from './utils/canvasKeyer';
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
import { BespokeDrawer } from './components/BespokeDrawer';

export default function App() {
  const [categories, setCategories] = useState<CategoriesMap>(INITIAL_CATEGORIES);
  const [activeCatKey, setActiveCatKey] = useState<string>('runway');
  const [keyedUrls, setKeyedUrls] = useState<Record<string, string>>({});
  const [aspectRatios, setAspectRatios] = useState<Record<string, number>>({});
  const [sparklesMap, setSparklesMap] = useState<Record<string, SparklePoint[]>>({});
  const [cart, setCart] = useState<Record<string, number>>({});
  const [bespokeConfigs, setBespokeConfigs] = useState<Record<string, BespokeConfig>>({});
  const [selectedBespokeId, setSelectedBespokeId] = useState<string | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [jumpTarget, setJumpTarget] = useState<number | null>(null);
  const [isSwitching, setIsSwitching] = useState<boolean>(false);
  const [vaultNoir, setVaultNoir] = useState<boolean>(false);
  const [loupeEnabled, setLoupeEnabled] = useState<boolean>(false);
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

  // Pre-Key All Individual Stage & Piece Images & Extract Specular Diamond Facet Points
  useEffect(() => {
    const stagePaths = Object.values(STAGE_IMAGES);
    const piecePaths = Object.values(PIECE_IMAGES);

    const tasks = [
      ...stagePaths.map(async (path) => {
        const res = await keySingleImageToTransparent(path, true);
        setKeyedUrls((prev) => ({ ...prev, [path]: res.url }));
        setAspectRatios((prev) => ({ ...prev, [path]: res.aspectRatio }));
        setSparklesMap((prev) => ({ ...prev, [path]: res.sparkles }));
      }),
      ...piecePaths.map(async (path) => {
        const res = await keySingleImageToTransparent(path, false);
        setKeyedUrls((prev) => ({ ...prev, [path]: res.url }));
        setAspectRatios((prev) => ({ ...prev, [path]: res.aspectRatio }));
        setSparklesMap((prev) => ({ ...prev, [path]: res.sparkles }));
      })
    ];

    Promise.all(tasks)
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

  // Active look change callback (triggers crystal chime when audio is enabled)
  const handleActiveIdxChange = useCallback((idx: number) => {
    setActiveIdx(idx);
    audioEngine.playCrystalChime();
  }, []);

  // Cart operations
  const handleAddToCart = (id: string) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    const item = getItemById(id);
    showToast(`Added ${item ? item.name : 'creation'} to Bag`);
  };

  const handleOpenBespoke = (id: string) => {
    setSelectedBespokeId(id);
    setActiveModal('bespoke');
  };

  const handleAddBespokeToCart = (item: Item, config: BespokeConfig) => {
    setBespokeConfigs((prev) => ({ ...prev, [item.id]: config }));
    setCart((prev) => ({ ...prev, [item.id]: (prev[item.id] || 0) + 1 }));
    setActiveModal('cart');
    showToast(`Added Bespoke ${item.name} (${config.metal}) to Bag`);
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
    showToast('Order #MV-VENDOME confirmed — Preparing armoured white-glove dispatch');
  };

  // Wishlist operations
  const handleToggleWishlist = (id: string) => {
    setWishlist((prev) => {
      if (prev.includes(id)) {
        showToast('Removed from Saved Creations');
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
    showToast('All saved creations moved to Bag');
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

  // Add custom look to current category (and auto-key any new custom image path!)
  const handleAddCustomLook = ({
    lookNum,
    title,
    lookImage,
    piece1Name,
    piece1Price,
    piece1Image,
    piece2Name,
    piece2Price,
    piece2Image
  }: {
    lookNum: number;
    title: string;
    lookImage: string;
    piece1Name: string;
    piece1Price: string;
    piece1Image: string;
    piece2Name: string;
    piece2Price: string;
    piece2Image: string;
  }) => {
    const p1Num = parseInt(piece1Price.replace(/[^0-9]/g, ''), 10) || 18000;
    const p2Num = parseInt(piece2Price.replace(/[^0-9]/g, ''), 10) || 9500;
    const uid = Date.now();

    // Key the custom images if not already keyed
    keySingleImageToTransparent(lookImage, true).then((res) => {
      setKeyedUrls((prev) => ({ ...prev, [lookImage]: res.url }));
      setAspectRatios((prev) => ({ ...prev, [lookImage]: res.aspectRatio }));
      setSparklesMap((prev) => ({ ...prev, [lookImage]: res.sparkles }));
    });
    keySingleImageToTransparent(piece1Image, false).then((res) => {
      setKeyedUrls((prev) => ({ ...prev, [piece1Image]: res.url }));
      setSparklesMap((prev) => ({ ...prev, [piece1Image]: res.sparkles }));
    });
    keySingleImageToTransparent(piece2Image, false).then((res) => {
      setKeyedUrls((prev) => ({ ...prev, [piece2Image]: res.url }));
      setSparklesMap((prev) => ({ ...prev, [piece2Image]: res.sparkles }));
    });

    const newLook = {
      lookNum,
      name: title,
      image: lookImage
    };

    const newItems = [
      {
        id: `${activeCatKey}-${uid}-1`,
        lookNum,
        name: piece1Name,
        price: piece1Price,
        priceNum: p1Num,
        image: piece1Image
      },
      {
        id: `${activeCatKey}-${uid}-2`,
        lookNum,
        name: piece2Name,
        price: piece2Price,
        priceNum: p2Num,
        image: piece2Image
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

  const handleToggleLoupe = () => {
    setLoupeEnabled((prev) => {
      const next = !prev;
      showToast(next ? '10x Gemologist Loupe Active — Hover stage to inspect facets' : 'Gemologist Loupe Off');
      return next;
    });
  };

  const handleToggleVaultNoir = () => {
    setVaultNoir((prev) => {
      const next = !prev;
      showToast(next ? 'Place Vendôme Vault Noir Lighting Active' : 'Salon Daylight Lighting Active');
      return next;
    });
  };

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const selectedBespokeItem = selectedBespokeId ? getItemById(selectedBespokeId) : null;

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
        keyedUrls={keyedUrls}
        aspectRatios={aspectRatios}
        sparklesMap={sparklesMap}
        wishlist={wishlist}
        isSwitching={isSwitching}
        vaultNoir={vaultNoir}
        loupeEnabled={loupeEnabled}
        jumpTarget={jumpTarget}
        onJumpTargetHandled={() => setJumpTarget(null)}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
        onOpenBespoke={handleOpenBespoke}
        onShopCurrentLook={handleShopCurrentLook}
        onOpenIndex={() => setActiveModal('lookbook')}
        onActiveIdxChange={handleActiveIdxChange}
      />

      <LuxuryFooter
        footerLabel={currentCategory.footerLabel}
        counterLabel={currentCategory.counterLabel}
        looks={currentCategory.looks}
        activeIdx={activeIdx}
        isAudioPlaying={isAudioPlaying}
        loupeEnabled={loupeEnabled}
        vaultNoir={vaultNoir}
        onToggleAudio={handleToggleAudio}
        onToggleLoupe={handleToggleLoupe}
        onToggleVaultNoir={handleToggleVaultNoir}
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
        bespokeConfigs={bespokeConfigs}
        getItemById={getItemById}
        keyedUrls={keyedUrls}
        onIncrement={handleIncrementCart}
        onDecrement={handleDecrementCart}
        onRemove={handleRemoveFromCart}
        onCheckout={handleCheckout}
      />

      <BespokeDrawer
        isOpen={activeModal === 'bespoke'}
        onClose={() => setActiveModal(null)}
        item={selectedBespokeItem}
        keyedUrls={keyedUrls}
        sparklesMap={sparklesMap}
        onAddBespokeToCart={handleAddBespokeToCart}
      />

      <WishlistDrawer
        isOpen={activeModal === 'wishlist'}
        onClose={() => setActiveModal(null)}
        wishlist={wishlist}
        getItemById={getItemById}
        keyedUrls={keyedUrls}
        onMoveToCart={handleMoveToCart}
        onRemoveFromWishlist={handleToggleWishlist}
        onMoveAllToCart={handleMoveAllToCart}
      />

      <SearchModal
        isOpen={activeModal === 'search'}
        onClose={() => setActiveModal(null)}
        categories={categories}
        keyedUrls={keyedUrls}
        onJumpToStage={(catKey, lookIdx) => {
          handleSelectCategory(catKey, lookIdx);
        }}
      />

      <LookbookModal
        isOpen={activeModal === 'lookbook'}
        onClose={() => setActiveModal(null)}
        category={currentCategory}
        keyedUrls={keyedUrls}
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
          setUserLabel('VIP Salon');
          showToast('Signed in as Maison Vell Private Vault Client');
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
