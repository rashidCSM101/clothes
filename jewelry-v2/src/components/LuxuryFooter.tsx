import React from 'react';
import type { Look } from '../types';

interface LuxuryFooterProps {
  footerLabel: string;
  counterLabel: string;
  looks: Look[];
  activeIdx: number;
  isAudioPlaying: boolean;
  loupeEnabled: boolean;
  vaultNoir: boolean;
  onToggleAudio: () => void;
  onToggleLoupe: () => void;
  onToggleVaultNoir: () => void;
  onOpenAddLook: () => void;
  onOpenEditorial: () => void;
  onSelectLook: (idx: number) => void;
}

export const LuxuryFooter: React.FC<LuxuryFooterProps> = ({
  footerLabel,
  counterLabel,
  looks,
  activeIdx,
  isAudioPlaying,
  loupeEnabled,
  vaultNoir,
  onToggleAudio,
  onToggleLoupe,
  onToggleVaultNoir,
  onOpenAddLook,
  onOpenEditorial,
  onSelectLook
}) => {
  return (
    <footer className="luxury-footer wide">
      <div className="footer-left">
        <span id="footer-cat-label">{footerLabel}</span>
        <button id="btn-sound" title="Toggle Runway Ambience & Crystal Chime" onClick={onToggleAudio}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M11 5L6 9H2v6h4l5 4V5z" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
          </svg>{' '}
          <span id="sound-label">Audio: {isAudioPlaying ? 'On' : 'Off'}</span>
        </button>

        <button
          id="btn-loupe"
          title="Toggle 10x Gemologist Magnifier Loupe (or hold Shift on Stage)"
          onClick={onToggleLoupe}
          style={{ color: loupeEnabled ? 'var(--ink)' : undefined }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>{' '}
          <span>Loupe: {loupeEnabled ? '10x On' : 'Off'}</span>
        </button>

        <button
          id="btn-vault-light"
          title="Switch between Place Vendôme Salon Daylight and Obsidian Vault Noir"
          onClick={onToggleVaultNoir}
          style={{ color: vaultNoir ? 'var(--ink)' : undefined }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
          </svg>{' '}
          <span>Light: {vaultNoir ? 'Vault Noir' : 'Salon Day'}</span>
        </button>

        <button id="btn-add-look" title="Add a custom item to the current category" onClick={onOpenAddLook}>
          + Add Custom Item
        </button>
      </div>

      <div className="footer-center" id="look-pills" role="tablist" aria-label="Jump to look">
        {looks.map((lk, idx) => {
          const numStr = lk.lookNum < 10 ? `0${lk.lookNum}` : `${lk.lookNum}`;
          const isActive = idx === activeIdx;
          return (
            <button
              key={`${lk.lookNum}-${idx}`}
              className={`look-step-btn ${isActive ? 'active' : ''}`}
              onClick={() => onSelectLook(idx)}
            >
              {counterLabel} {numStr}
            </button>
          );
        })}
      </div>

      <div className="footer-right">
        <span>Place Vendôme &middot; Geneva &middot; Tokyo</span>
        <button id="btn-editorial" onClick={onOpenEditorial}>
          Atelier Notes
        </button>
      </div>
    </footer>
  );
};
