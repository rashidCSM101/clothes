import React, { useState, useEffect } from 'react';

interface AddLookModalProps {
  isOpen: boolean;
  onClose: () => void;
  nextLookNum: number;
  onAddLook: (data: {
    lookNum: number;
    title: string;
    lookImage: string;
    piece1Name: string;
    piece1Price: string;
    piece1Image: string;
    piece2Name: string;
    piece2Price: string;
    piece2Image: string;
  }) => void;
}

export const AddLookModal: React.FC<AddLookModalProps> = ({
  isOpen,
  onClose,
  nextLookNum,
  onAddLook
}) => {
  const [lookNum, setLookNum] = useState<number>(nextLookNum);
  const [title, setTitle] = useState('Impératrice Diamond & Emerald Parure');
  const [lookImage, setLookImage] = useState('/jewelry-images/stage/look-1.png');
  const [piece1Name, setPiece1Name] = useState('Impératrice Emerald Collier');
  const [piece1Price, setPiece1Price] = useState('$54,000');
  const [piece1Image, setPiece1Image] = useState('/jewelry-images/pieces/piece-1.png');
  const [piece2Name, setPiece2Name] = useState('Step-Cut Emerald Solitaire');
  const [piece2Price, setPiece2Price] = useState('$22,500');
  const [piece2Image, setPiece2Image] = useState('/jewelry-images/pieces/piece-2.png');

  useEffect(() => {
    setLookNum(nextLookNum);
  }, [nextLookNum]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddLook({
      lookNum: Number(lookNum) || nextLookNum,
      title: title.trim(),
      lookImage: lookImage.trim() || '/jewelry-images/stage/look-1.png',
      piece1Name: piece1Name.trim(),
      piece1Price: piece1Price.trim(),
      piece1Image: piece1Image.trim() || '/jewelry-images/pieces/piece-1.png',
      piece2Name: piece2Name.trim(),
      piece2Price: piece2Price.trim(),
      piece2Image: piece2Image.trim() || '/jewelry-images/pieces/piece-2.png'
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
          Add a custom high-jewelry parure, solitaire ring, or timepiece directly into the active 3D depth line and looping product rail.
        </p>
        <form id="add-look-form" onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '12px' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="new-look-num">
                Edition / Parure #
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
                Title / Parure Name
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
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="new-look-img">
              Stage Hero Image Path (in public/jewelry-images/stage/)
            </label>
            <input
              type="text"
              id="new-look-img"
              className="form-input"
              value={lookImage}
              onChange={(e) => setLookImage(e.target.value)}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="new-piece1-name">
                Piece 1 Name, Price &amp; Image Path
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
                style={{ marginBottom: '6px' }}
              />
              <input
                type="text"
                id="new-piece1-img"
                className="form-input"
                value={piece1Image}
                onChange={(e) => setPiece1Image(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="new-piece2-name">
                Piece 2 Name, Price &amp; Image Path
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
                style={{ marginBottom: '6px' }}
              />
              <input
                type="text"
                id="new-piece2-img"
                className="form-input"
                value={piece2Image}
                onChange={(e) => setPiece2Image(e.target.value)}
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

