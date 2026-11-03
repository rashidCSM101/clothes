import React from 'react';
import type { Look } from '../types';

interface LuxuryFooterProps {
  footerLabel: string;
  counterLabel: string;
  looks: Look[];
  activeIdx: number;
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
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
  onToggleAudio,
  onOpenAddLook,
  onOpenEditorial,
  onSelectLook
}) => {
  return (
    <footer className="luxury-footer wide">
      <div className="footer-left">
        <span id="footer-cat-label">{footerLabel}</span>
        <button id="btn-sound" title="Toggle Runway Ambience" onClick={onToggleAudio}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M11 5L6 9H2v6h4l5 4V5z" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
          </svg>{' '}
          <span id="sound-label">Audio: {isAudioPlaying ? 'On' : 'Off'}</span>
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
        <span>Paris &middot; Milan &middot; Tokyo</span>
        <button id="btn-editorial" onClick={onOpenEditorial}>
          Atelier Notes
        </button>
      </div>
    </footer>
  );
};
