import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Header.css';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <header className="app-header">
      <Link to="/" className="logo-link">
        <div className="logo">KITH</div>
        <div className="product-name">Clarity Coach</div>
      </Link>
      <nav className="main-nav">
        <NavLink to="/translate/draft">Translate</NavLink>
        <NavLink to="/coach">Coach</NavLink>
        <div className="dropdown">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="dropdown-toggle">More</button>
          {isMenuOpen && (
            <div className="dropdown-menu">
              <NavLink to="/how-to-use" onClick={() => setIsMenuOpen(false)}>How to Use</NavLink>
              <NavLink to="/about" onClick={() => setIsMenuOpen(false)}>About</NavLink>
              <NavLink to="/roadmap" onClick={() => setIsMenuOpen(false)}>Roadmap</NavLink>
              <NavLink to="/changelog" onClick={() => setIsMenuOpen(false)}>Change Log</NavLink>
              <NavLink to="/enhancements" onClick={() => setIsMenuOpen(false)}>Enhancements</NavLink>
              <NavLink to="/credits" onClick={() => setIsMenuOpen(false)}>Credits</NavLink>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
export default Header;
