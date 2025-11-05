import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Header.css';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="drip-header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <span className="logo-icon">💧</span>
            DRIP HUB
          </Link>
          
          <nav className="nav">
            <Link to="/" className="nav-link">Fresh Fits</Link>
            <Link to="/sneakers" className="nav-link">Sneakers</Link>
            <Link to="/streetwear" className="nav-link">Streetwear</Link>
            <Link to="/accessories" className="nav-link">Accessories</Link>
            
            {user ? (
              <>
                <Link to="/create-post" className="nav-link drip-post-btn">
                  + Drop Fit
                </Link>
                <div className="user-menu">
                  <Link to="/profile" className="user-avatar">
                    {user.avatar ? (
                      <img src={`http://localhost:5000${user.avatar}`} alt={user.username} />
                    ) : (
                      <span>👤</span>
                    )}
                  </Link>
                  <button onClick={handleLogout} className="btn btn-secondary">
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="auth-buttons">
                <Link to="/login" className="nav-link">Login</Link>
                <Link to="/register" className="btn btn-primary">Join DRIP</Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;