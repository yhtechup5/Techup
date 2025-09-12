import React, { useState } from "react";
import "../styles/Login.css";

interface LoginProps {
  currentUser: string | null;
  onLogin: (name: string) => void;
  onLogout: () => void;
  cartItemCount: number | null;
}

const Login: React.FC<LoginProps> = ({
  currentUser,
  onLogin,
  onLogout,
  cartItemCount,
}) => {
  const [showDialog, setShowDialog] = useState(false);
  const [name, setName] = useState("");

  const getCartText = () => {
    if (cartItemCount === null || cartItemCount === 0) {
      return "0 tees";
    }
    return cartItemCount === 1 ? "1 tee" : `${cartItemCount} tees`;
  };

  const handleLoginClick = () => {
    setShowDialog(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onLogin(name.trim());
      setShowDialog(false);
      setName("");
    }
  };

  const handleLogout = () => {
    onLogout();
  };

  const handleCancel = () => {
    setShowDialog(false);
    setName("");
  };

  return (
    <div className="login">
      {currentUser ? (
        <div className="logged-in-state">
          <div className="message">
            Hey {currentUser}. You have {getCartText()} in your cart.
          </div>
          <button className="button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <div className="logged-in-state">
          <div className="message">Login to add tees to your cart.</div>
          <button className="button" onClick={handleLoginClick}>
            Login
          </button>
        </div>
      )}

      {showDialog && (
        <div className="dialog-overlay">
          <div className="dialog">
            <form onSubmit={handleSubmit}>
              <h3>Login</h3>
              <label htmlFor="name">Enter your name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="off"
                autoFocus
                required
              />
              <div className="dialog-buttons">
                <button type="submit">OK</button>
                <button type="button" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
