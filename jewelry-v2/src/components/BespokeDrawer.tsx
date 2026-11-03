import React, { useState, useEffect } from 'react';
import type { Item, BespokeConfig } from '../types';
import type { SparklePoint } from '../utils/canvasKeyer';
import { JewelryVisual } from './JewelryVisual';

interface BespokeDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  item: Item | null;
  keyedUrls: Record<string, string>;
  sparklesMap: Record<string, SparklePoint[]>;
  onAddBespokeToCart: (item: Item, config: BespokeConfig) => void;
}

const METALS: BespokeConfig['metal'][] = ['950 Platinum', '18k Yellow Gold', '18k Rose Gold'];
const SIZES = ['48', '50', '52', '54', '56', 'Bespoke'];

export const BespokeDrawer: React.FC<BespokeDrawerProps> = ({
  isOpen,
  onClose,
  item,
  keyedUrls,
  sparklesMap,
  onAddBespokeToCart
}) => {
  const [metal, setMetal] = useState<BespokeConfig['metal']>('950 Platinum');
  const [size, setSize] = useState<string>('52');
  const [engraving, setEngraving] = useState<string>('M · V  2027');

  useEffect(() => {
    if (item) {
      if (item.name.toLowerCase().includes('rose')) setMetal('18k Rose Gold');
      else if (item.name.toLowerCase().includes('24k') || item.name.toLowerCase().includes('gold')) setMetal('18k Yellow Gold');
      else setMetal('950 Platinum');
    }
  }, [item]);

  if (!item) {
    return <div className="side-drawer" id="bespoke-drawer" role="dialog" aria-label="Bespoke Salon" />;
  }

  const src = keyedUrls[item.image] || item.image;
  const sparkles = sparklesMap[item.image];
  const certNumber = `GIA-MV-${item.id.toUpperCase()}-2027`;

  return (
    <div className={`side-drawer ${isOpen ? 'open' : ''}`} id="bespoke-drawer" role="dialog" aria-label="Bespoke Salon">
      <div className="drawer-header">
        <h2 className="wide">Bespoke Atelier &amp; GIA</h2>
        <button className="close-btn" onClick={onClose} aria-label="Close bespoke salon">
          &times;
        </button>
      </div>

      <div className="drawer-body">
        {/* Interactive 3D Preview Box */}
        <div
          style={{
            height: '220px',
            background: 'radial-gradient(circle, #ffffff 0%, #eef3f8 100%)',
            border: '1px solid #e6ebf0',
            padding: '18px',
            position: 'relative',
            marginBottom: '20px'
          }}
        >
          <span
            className="wide"
            style={{
              position: 'absolute',
              top: '10px',
              left: '12px',
              fontSize: '8.5px',
              letterSpacing: '.14em',
              color: 'var(--mid)'
            }}
          >
            3D Interactive Tilt &middot; Hover to Inspect
          </span>
          <JewelryVisual src={src} alt={item.name} sparkles={sparkles} enable3DTilt={true} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '18px' }}>
          <h3 className="wide" style={{ fontSize: '12px', letterSpacing: '.14em', fontWeight: 400 }}>
            {item.name}
          </h3>
          <span style={{ fontSize: '15px', color: 'var(--ink)', fontVariantNumeric: 'tabular-nums', fontWeight: 500 }}>
            {item.price}
          </span>
        </div>

        {/* Precious Metal Selector */}
        <div className="form-group">
          <label className="form-label">1. Hallmarked Precious Metal</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
            {METALS.map((m) => (
              <button
                key={m}
                type="button"
                className={`look-step-btn ${metal === m ? 'active' : ''}`}
                style={{ padding: '8px 6px', fontSize: '9px', textAlign: 'center' }}
                onClick={() => setMetal(m)}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Size / Fit Calibration */}
        <div className="form-group">
          <label className="form-label">2. Place Vendôme Size / Calibration</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '6px' }}>
            {SIZES.map((s) => (
              <button
                key={s}
                type="button"
                className={`look-step-btn ${size === s ? 'active' : ''}`}
                style={{ padding: '7px 4px', fontSize: '9px', textAlign: 'center' }}
                onClick={() => setSize(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Complimentary Engraving */}
        <div className="form-group">
          <label className="form-label" htmlFor="bespoke-engraving-input">
            3. Complimentary Hand-Engraving (Max 18 Chars)
          </label>
          <input
            id="bespoke-engraving-input"
            type="text"
            maxLength={18}
            className="form-input"
            placeholder="Initials, date, or private motto..."
            value={engraving}
            onChange={(e) => setEngraving(e.target.value)}
          />
          {/* Live Metallic Engraving Preview Plaque */}
          <div
            style={{
              marginTop: '10px',
              padding: '10px 14px',
              background:
                metal === '18k Yellow Gold'
                  ? 'linear-gradient(90deg, #f3e5c2 0%, #fcf4df 50%, #ebd8ac 100%)'
                  : metal === '18k Rose Gold'
                  ? 'linear-gradient(90deg, #f2dcd6 0%, #fbf0ed 50%, #ebd0c8 100%)'
                  : 'linear-gradient(90deg, #e5eaef 0%, #f7f9fb 50%, #dce3ea 100%)',
              border: '1px solid #d5dde6',
              textAlign: 'center',
              fontSize: '10px',
              letterSpacing: '.24em',
              color: '#3a414c',
              textShadow: '0 1px 0 rgba(255,255,255,0.85)'
            }}
            className="wide"
          >
            {engraving.trim() || 'MAISON VELL PARIS'}
          </div>
        </div>

        {/* GIA & Provenance Certificate Box */}
        <div
          style={{
            marginTop: '18px',
            padding: '14px 16px',
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            fontSize: '11px',
            lineHeight: 1.7,
            color: 'var(--mid)'
          }}
        >
          <div className="wide" style={{ fontSize: '9px', color: 'var(--ink)', letterSpacing: '.14em', marginBottom: '6px' }}>
            GIA &amp; Provenance Dossier &middot; {certNumber}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Clarity / Color:</span>
            <strong style={{ color: 'var(--ink)', fontWeight: 500 }}>IF–VVS1 &middot; D–E Colorless</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Precious Assay:</span>
            <strong style={{ color: 'var(--ink)', fontWeight: 500 }}>Tête d’Aigle &amp; Dog’s Head Hallmark</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Origin Workshop:</span>
            <strong style={{ color: 'var(--ink)', fontWeight: 500 }}>14 Place Vendôme, Paris</strong>
          </div>
        </div>
      </div>

      <div className="drawer-footer">
        <button
          className="primary-btn wide"
          onClick={() => {
            onAddBespokeToCart(item, { metal, size, engraving: engraving.trim() });
          }}
        >
          Add Bespoke Creation to Bag &mdash; {item.price}
        </button>
        <button className="secondary-btn wide" onClick={onClose}>
          Return to 3D Stage
        </button>
      </div>
    </div>
  );
};

