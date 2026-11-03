import React, { useState } from 'react';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [email, setEmail] = useState('vendome@maisonvell.com');
  const [password, setPassword] = useState('hautejoaillerie2027');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess();
    onClose();
  };

  return (
    <div
      className={`center-modal ${isOpen ? 'open' : ''}`}
      id="account-modal"
      style={{ width: 'min(480px, calc(100vw - 32px))' }}
      role="dialog"
      aria-label="Client Access"
    >
      <div className="modal-header">
        <h2 className="wide">Client Access</h2>
        <button className="close-btn" onClick={onClose} aria-label="Close login">
          &times;
        </button>
      </div>
      <div className="modal-body">
        <p style={{ fontSize: '12px', color: 'var(--mid)', marginBottom: '20px', lineHeight: 1.6 }}>
          Sign in to access private high-jewelry vault previews, bespoke diamond engraving, and GIA certificate archives.
        </p>
        <form id="account-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="login-email">
              Email Address
            </label>
            <input
              type="email"
              id="login-email"
              className="form-input"
              placeholder="client@maisonvell.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="login-pass">
              Password
            </label>
            <input
              type="password"
              id="login-pass"
              className="form-input"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="primary-btn wide">
            Sign In to Private Salon
          </button>
        </form>
      </div>
    </div>
  );
};

