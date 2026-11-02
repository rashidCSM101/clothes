# Maison Vell — Multi-Category 3D Depth Runway & Luxury Storefront

Expand the **Maison Vell** interactive 3D depth lookbook so that every primary navigation tab (`Runway`, `The Maison`, `Lookbook`, `Shop`) and department link (`Collections`, `Clothing`, `Lookbook`, `Beauty`, `Accessories`, `Our World`) seamlessly transitions the main runway stage, rolling counter, and synchronized product rail into its own dedicated 6-look / 12-piece collection powered by custom Nano Banana luxury studio sheets.

## User Review & Critical Decisions

> [!IMPORTANT]
> The following architectural and creative choices have been confirmed from your answers and will govern the build:

- **Confirmed Decision 1 — Full-Category 3D Depth Stage Switching**: Clicking any primary tab (`Runway`, `The Maison`, `Lookbook`, `Shop`) or department (`Collections`, `Clothing`, `Beauty`, `Accessories`, `Our World`) switches the live 3D receding depth line, editorial hero copy, rolling counter, and looping product rail to that category's curated showcase while maintaining the exact same spatial physics and visual flow.
- **Confirmed Decision 2 — Pre-Generated Nano Banana Luxury Studio Sheets**: High-fashion studio composite sheets and product hero visuals for **Beauty** (sculptural serums, botanical elixirs, crystal parfums, velvet lip tints), **Accessories** (structured calfskin bags, architectural gold cuffs, eyewear, silk scarves), **Clothing / Collections**, and **Atelier Heritage** will be pre-generated via Nano Banana (`generate_image`) with clean neutral studio lighting so every category renders with zero external dependency breakage.
- **Confirmed Decision 3 — 6 Stage Items & 12 Rail Products Per Category**: Every category maintains the exact 6-position depth loop ($d \in [-1, 5]$) on the main stage and 12 synchronized cards (2 pieces per look/edition) in the right-hand product rail.

---

## 1. Overview & Core Concept

- **What It Does**: Transforms Maison Vell from a single-collection lookbook into a complete multi-department luxury digital flagship where every navigation destination uses the signature receding 3D runway depth engine. Whether browsing Haute Couture dresses on the `Runway`, sculptural flacons in `Beauty`, or Italian leather goods in `Accessories`, six hero subjects stand in a receding perspective line that walks forward on drag, scroll, or key press while twelve matching pieces scroll in sync on the product rail.
- **Target Audience / Persona**: Discerning luxury fashion, fragrance, and editorial clientele who expect an cohesive, tactile spatial browsing experience across every department of the house.
- **Key Value**: Preserves the mathematical purity of the single-float (`p`) depth engine and 7-stop interpolation table while scaling content richness across all brand pillars without breaking layout rhythm or introducing jarring page reloads.

---

## 2. User Experience & Visual Design

- **Key User Flows**:
  1. **Department & Tab Switching**: Clicking `Beauty`, `Accessories`, `Clothing`, `Collections`, `The Maison`, `Lookbook`, `Shop`, or `Our World` updates the active navigation indicator, smoothly cross-fades the stage atmospheric tint and editorial title/description, resets or preserves the continuous look position `p`, and populates the 6 depth slots and 12 rail cards with that department's items.
  2. **Continuous 3D Depth Walk**: Dragging horizontally on the stage, scrolling the mouse wheel, pressing arrow keys, clicking a background item in the depth line, or clicking a footer look button advances the 6-item line forward, smoothly scaling and unblurring the approaching item while sliding the front item past the rail.
  3. **Synchronized Rail & Cross-Department Bag**: As the line moves, the 12 product cards in the right column (or bottom horizontal track on mobile) wrap infinitely so the two pieces corresponding to the foreground look always align at the top. Users can save pieces to their Wishlist or add items from any department (`Beauty`, `Accessories`, `Runway`, etc.) into a unified Shopping Bag drawer.
  4. **Quick Index & Custom Addition**: Users can still open a visual grid overview of all items in the active category or add a custom look/product into the currently active department.

- **Visual Identity & Theme**:
  - *Aesthetic Direction*: Ultra-minimalist Parisian haute couture flagship — airy, sculptural, and tactile with subtle department-specific atmospheric gradients on the stage backdrop.
  - *Color Palette & Mood*:
    - Dominant Canvas (60%): Crisp gallery white (`#ffffff`) and cool alabaster mist (`#f1f5fa` to `#f6f9fc`).
    - Structural Surfaces (30%): Soft ice rail (`#f3f6fa`), hairline dividers (`#e6ebf0`), muted slate prose (`#737b86`), and inactive navigation (`#a4adb8`).
    - Accent Budget (10%): Deep obsidian ink (`#16191f`) for primary actions, active tabs, and the custom spring cursor ring, paired with dusty rose (`#d8a7a0`) for saved wishlist hearts.
  - *Typography & Hierarchy*:
    - Display & Navigation: `Michroma`, uppercase, wide letter-spacing (`0.14em`–`0.20em`) for brand wordmark, navigation links, department titles, product names, and the rolling look counter.
    - Body & Pricing: Clean sans-serif with tabular numerals (`tabular-nums`) for editorial descriptions, prices, and bag subtotals.
  - *Component Styling & Layout*: Full-viewport (`100svh`) locked grid (`header`, `main` with `1fr` stage + `372u` rail, and slim `footer`). Proportional unit `--u: min(calc(100vw/1600), calc(100vh/900))` scales every measurement harmoniously on desktop and converts to `1px` at `<= 820px` for mobile ergonomics.

- **Interactive Feedback & Motion**:
  - Exponential easing (`1 - exp(-dt * 0.0072)`) for silk-smooth deceleration on drag release and wheel snap.
  - Custom spring-physics ring cursor (`46u` circle morphing into an `84u × 34u` drag pill over `220ms cubic-bezier(.2,.8,.2,1)`).
  - Soft category transition curtain/cross-fade when switching between navbar tabs so new sprite sheets and studio assets swap cleanly without layout shift.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Unified Depth Engine vs. Separate Page Templates for Navbar Options**
  - *Chosen Approach*: Drive all navbar options (`Runway`, `Beauty`, `Accessories`, `Clothing`, `Collections`, `The Maison`, `Lookbook`, `Shop`, `Our World`) through the exact same 6-slot 3D depth stage and 12-card looping product rail, swapping the active category dataset and sprite sheet.
  - *Why*: Directly fulfills the requirement to make all navbar options functional with the exact same design and flow as the home page, turning every category into an interactive spatial showcase.
  - *Alternatives Considered*: Opening static text modals for secondary tabs was passed over because it breaks the immersive spatial runway interaction.

- **Decision 2: Pre-Generated Nano Banana Sprite Sheets & Cropping Architecture**
  - *Chosen Approach*: Generate dedicated high-resolution visual sheets using `generate_image` (Nano Banana) for the new product families (**Beauty & Fragrance**, **Luxury Accessories**, **Atelier & Heritage Objects**) and crop individual items cleanly using nested `<svg viewBox>` viewports with clean studio background blending.
  - *Why*: Ensures instantaneous 60fps GPU-accelerated `translate3d() scale()` transforms across all 6 depth stops without network lag or broken external image URLs.
  - *Alternatives Considered*: Fetching individual external URLs on tab switch was rejected due to inconsistent backgrounds and network latency.

---

## 4. Technical Architecture & Data Strategy *(Technical Reference)*

### Architecture & Component Diagram

```
┌──────────────────────────────────────────────────────────────────────────┐
│                        MAISON VELL APPLICATION STATE                     │
│  activeCategory ('runway' | 'beauty' | 'accessories' | 'clothing' | ...) │
│  p (float position) ──► target (float)   cart: {id:qty}   wishlist: [id] │
└───────────────────┬──────────────────────────────────┬───────────────────┘
                    │                                  │
                    ▼                                  ▼
┌───────────────────────────────────────┐  ┌───────────────────────────────┐
│        HEADER NAVIGATION BAR          │  │    GLOBAL DRAWERS & MODALS    │
│  ┌─────────────────────────────────┐  │  │  • Shopping Bag Slide-Over    │
│  │ Row 1: Brand | Primary Tabs     │  │  │  • Saved Wishlist Slide-Over  │
│  │        Login · Search · Bag (N) │  │  │  • Cross-Category Search      │
│  ├─────────────────────────────────┤  │  │  • Category Index Grid Modal  │
│  │ Row 2: Collections · Clothing   │  │  │  • "+ Add New Item" Creator   │
│  │        Lookbook · Beauty        │  │  └───────────────────────────────┘
│  │        Accessories · Our World  │  │
│  └────────────────┬────────────────┘  │
└───────────────────┼───────────────────┘
                    │ switches activeCategory & rebuilds stage/rail DOM
                    ▼
┌──────────────────────────────────────────────────────────────────────────┐
│                     MAIN VIEWPORT GRID (1fr + 372u)                      │
│  ┌───────────────────────────────────────┬────────────────────────────┐  │
│  │             RUNWAY STAGE              │       PRODUCT RAIL         │  │
│  │  • Editorial Header (Category Title   │  • 12 Looping Product      │  │
│  │    & Curated Description)             │    Cards (2 per Look/Set)  │  │
│  │  • 6 Depth Slots (d = wrap(i-p, 6))   │  • Position:               │  │
│  │    interpolated via KX, KF, KH, KB, KO│    y = wrap(i*c - p*2*c)   │  │
│  │  • Rolling Counter (Look / Edition #) │  • Heart Toggle & + Cart   │  │
│  │  • Custom Spring Ring Cursor          │    Button on Every Card    │  │
│  └───────────────────────────────────────┴────────────────────────────┘  │
│  ┌────────────────────────────────────────────────────────────────────┐  │
│  │             RUNWAY FOOTER: Audio Ambience · Quick-Jump             │  │
│  │             Look Buttons · "+ Add New Item" · Category Quick-Index │  │
│  └────────────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────────────┘
```

### Data Model & Category Catalogs

Each navbar option maps to a complete category configuration in `CATEGORIES_DATA`:
1. **`runway`** (*Spring Summer 2027*): Looks 15–20 — The original 6 haute couture runway looks and 12 garment pieces.
2. **`beauty`** (*Maison Vell Beauté*): Editions 01–06 — 6 sculptural beauty & fragrance hero presentations (Amber Peptide Serum, Rose Quartz Elixir, Extrait de Parfum N°15, Velvet Lip Sculpt, Mineral Dew Mist, Cellular Night Balm) and 12 accompanying skincare/cosmetic refills and tools.
3. **`accessories`** (*Atelier Maroquinerie & Bijoux*): Editions 07–12 — 6 architectural leather bags, sculptural cuffs, and eyewear pieces in the receding depth line, paired with 12 matching small leather goods, belts, and jewelry pieces on the rail.
4. **`clothing`** (*Prêt-à-Couture Wardrobe*): Looks 21–26 — 6 tailored separates and evening silhouettes arranged in curated capsule order with 12 individual wardrobe garments.
5. **`collections`** (*Archive & Capsule Editions*): Looks 01–06 — 6 signature seasonal silhouettes spanning Resort, Bridal, and Evening capsules with 12 runway pieces.
6. **`maison`** (*Saviez-Faire & Heritage*): Chapters 01–06 — 6 iconic archival creations from the Paris Atelier with 12 bespoke couture pieces.
7. **`lookbook`** (*Complete Season Edit*): Curated 6-look highlight reel with instant toggle to the full interactive Lookbook Grid modal.
8. **`shop`** (*Flagship Boutique Edit*): Direct flagship curation of best-selling garments, beauty serums, and leather goods with 6 featured ensembles and 12 immediate-purchase items.
9. **`our-world`** (*Sustainability & Pure Materials*): 6 eco-couture peace-silk, botanical-dyed, and regenerated-cashmere looks with 12 traceable pieces.

### Interactive Component & State Mapping

- **Category Switcher (`switchCategory(catKey)`)**:
  - Updates active styling on both `.tabs` (Row 1) and `.r2` (Row 2) navigation buttons.
  - Updates stage title (`#hero-title`), description (`#hero-desc`), counter prefix (`Look`, `Edition`, or `Chapter`), and subtle stage gradient palette.
  - Rebuilds the 6 `.m` stage elements and 12 `.card` rail elements from the selected category's sprite sheet and coordinate/item definitions, then triggers `size()` and `paint()` for immediate zero-flicker rendering.
- **Cross-Category Search & Bag**:
  - Searching in the Search modal queries across **all** categories (`Runway`, `Beauty`, `Accessories`, `Clothing`, etc.); clicking *"Jump to Item"* automatically switches to that item's category and smoothly animates `target` to its exact look index.
  - Cart and Wishlist drawers store items by unique global ID (`catKey-lookNum-pieceIdx`), allowing users to mix dresses, beauty serums, and leather bags in a single checkout flow.
