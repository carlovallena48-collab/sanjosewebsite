import React from 'react';
import { ArrowRight } from 'lucide-react';
import './Header.css';

const Header = ({ isMenuOpen, toggleMenu }) => {
  return (
    <header className="home-header">
      <div className="logo-section">
        <div className="logo-background">
          <img src="/images/LOGO.png" alt="Church Logo" className="church-logo" onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'block';
          }} />
          <div className="logo-fallback">⛪</div>
        </div>
        <div className="logo-text-container">
          <span className="diocese-text">Diocese of Antipolo</span>
          <span className="parish-text">San Jose Manggagawa Parish</span>
        </div>
      </div>
      
      <nav className={`main-nav ${isMenuOpen ? 'nav-open' : ''}`}>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#church-info">Church Info</a></li>
          <li><a href="#gallery">Gallery</a></li> {/* ADD THIS LINE */}
          <li><a href="#events">Events</a></li>
          <li><a href="#announcements">Announcements</a></li>
          <li><a href="#promotions">Programs</a></li>
          <li><a href="#reminders">Reminders</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
      
      <button className="mobile-menu-toggle" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </button>
      
      <a href="#download" className="download-app-button">
        DOWNLOAD APP <ArrowRight size={16} />
      </a>
    </header>
  );
};

export default Header;