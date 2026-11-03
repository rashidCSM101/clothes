import React, { useState } from 'react';

interface AddLookModalProps {
  isOpen: boolean;
  onClose: () => void;
  nextLookNum: number;
  onAddLook: (data: {
    lookNum: number;
    title: string;
    piece1Name: string;
    piece1Price: string;
    piece2Name: string;
    piece2Price: string;
  }) => void;
}

export const AddLookModal: React.FC<AddLookModalProps> = ({
  isOpen,
  onClose,
  nextLookNum,
  onAddLook
}) => {
  const [lookNum, setLookNum] = useState<number>(nextLookNum);
  const [title, setTitle] = useState('Celestial Organza Gown');
  const [piece1Name, setPiece1Name] = useState('Organza Draped Gown');
  const [piece1Price, setPiece1Price] = useState('$2,650');
  const [piece2Name, setPiece2Name] = useState('Crystal Drop Ear Cuff');
  const [piece2Price, setPiece2Price] = useState('$590');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddLook({
      lookNum: Number(lookNum) || nextLookNum,
      title: title.trim(),
      piece1Name: piece1Name.trim(),
      piece1Price: piece1Price.trim(),
      piece2Name: piece2Name.trim(),
      piece2Price: piece2Price.trim()
    });
    onClose();
  };

  return (
    <div className={`center-modal ${isOpen ? 'open' : ''}`} id="add-look-modal" role="dialog" aria-label="Add Custom Item">
      <div className="modal-header">
        <h2 className="wide">Add to Active Line</h2>
        <button className="close-btn" onClick={onClose} aria-label="Close modal">
          &times;
        </button>
      </div>
      <div className="modal-body">
        <p style={{ fontSize: '12px', color: 'var(--mid)', marginBottom: '20px', lineHeight: 1.6 }}>
          Add a custom couture dress, beauty elixir, or leather accessory directly into the active 3D depth line and looping product rail.
        </p>
        <form id="add-look-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="new-look-num">
              Edition / Look Number
            </label>
            <input
              type="number"
              id="new-look-num"
              className="form-input"
              value={lookNum}
              onChange={(e) => setLookNum(Number(e.target.value))}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="new-look-title">
              Title / Silhouette Name
            </label>
            <input
              type="text"
              id="new-look-title"
              className="form-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="new-piece1-name">
                Piece 1 Name &amp; Price
              </label>
              <input
                type="text"
                id="new-piece1-name"
                className="form-input"
                value={piece1Name}
                onChange={(e) => setPiece1Name(e.target.value)}
                required
                style={{ marginBottom: '6px' }}
              />
              <input
                type="text"
                id="new-piece1-price"
                className="form-input"
                value={piece1Price}
                onChange={(e) => setPiece1Price(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="new-piece2-name">
                Piece 2 Name &amp; Price
              </label>
              <input
                type="text"
                id="new-piece2-name"
                className="form-input"
                value={piece2Name}
                onChange={(e) => setPiece2Name(e.target.value)}
                required
                style={{ marginBottom: '6px' }}
              />
              <input
                type="text"
                id="new-piece2-price"
                className="form-input"
                value={piece2Price}
                onChange={(e) => setPiece2Price(e.target.value)}
                required
              />
            </div>
          </div>
          <button type="submit" className="primary-btn wide" style={{ marginTop: '12px' }}>
            Add to 3D Stage
          </button>
        </form>
      </div>
    </div>
  );
};
