import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // ✅ FUNCTION PARA MAG-REDIRECT SA EXPO BUILD
  const handleDownload = () => {
    window.open('https://expo.dev/accounts/carlovallena/projects/sjmp-parish-app/builds/6a9d892b-c1ca-4d66-a5ac-7ef4c2692082', '_blank');
  };

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-content">
        {/* Logo Section */}
        <div className="logo-area">
          <div className="logo-wrapper">
            <div className="logo-circle">
              <img 
                src="/images/LOGO.png" 
                alt="Church Logo" 
                className="logo-image"
              />
            </div>
          </div>
          <div className="church-name">
            <div className="diocese">Diocese of Antipolo</div>
            <div className="parish">San Jose Manggagawa Parish</div>
          </div>
        </div>

        {/* Navigation */}
        <nav className={`navigation ${isMenuOpen ? 'nav-open' : ''}`}>
          <div className="nav-links">
            <a href="#home" onClick={closeMenu}>Home</a>
            <a href="#church-info" onClick={closeMenu}>Church Info</a>
            <a href="#gallery" onClick={closeMenu}>Gallery</a>
            <a href="#events" onClick={closeMenu}>Events</a>
            <a href="#announcements" onClick={closeMenu}>Announcements</a>
            <a href="#history" onClick={closeMenu}>History</a>
            <a href="#reminders" onClick={closeMenu}>Reminders</a>
            <a href="#contact" onClick={closeMenu}>Contact</a>
          </div>
        </nav>

        {/* Download Button */}
        <div className="header-actions">
          {/* ✅ UPDATED BUTTON WITH ONCLICK */}
          <button className="download-btn" onClick={handleDownload}>
            Download App <ArrowRight size={16} />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className={`mobile-menu-btn ${isMenuOpen ? 'open' : ''}`}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
};

export default Header;