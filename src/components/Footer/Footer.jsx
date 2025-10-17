import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="footer-content">
        <div className="footer-section">
          <div className="footer-logo">
            <img src="/images/LOGO.png" alt="Church Logo" className="church-logo-small" onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }} />
            <div className="logo-fallback-small">⛪</div>
            <span>San Jose Manggagawa Parish</span>
          </div>
          <p className="footer-description">
            A community of faith, hope, and love. Serving God and community.
          </p>
          <div className="footer-contact">
            <div><MapPin size={16} /> E Rodriquez Highway, San Jose Manggagawa Parish</div>
            <div><Phone size={16} /> (8) 633-80-10</div>
            <div><Mail size={16} /> info@sanjosemanggagawa.org</div>
          </div>
        </div>
        
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#church-info">Church Info</a></li>
            <li><a href="#events">Events</a></li>
            <li><a href="#announcements">Announcements</a></li>
            <li><a href="#promotions">Programs</a></li>
            <li><a href="#reminders">Reminders</a></li>
            <li><a href="#contact">Contact Us</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Mass Schedules</h3>
          <ul>
            <li>Weekdays: 6PM</li>
            <li>Saturday: 6PM</li>
            <li>Sunday: 6AM, 7:30AM, 9AM, 5PM, 6:30PM</li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-links">
            <a href="#" aria-label="Facebook">
              <img src="/images/facebookicon.png" alt="Facebook" />
              Facebook
            </a>
            <a href="#" aria-label="Instagram">
              <img src="/images/instagramicon.webp" alt="Instagram" />
              Instagram
            </a>
            <a href="#" aria-label="YouTube">
              <img src="/images/youicon.png" alt="YouTube" />
              YouTube
            </a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2024 San Jose Manggagawa Parish. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;