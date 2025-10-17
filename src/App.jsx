import React, { useState, useEffect, useRef } from 'react';
import { useScrollBackground } from './hooks/useScrollBackground';
import { backgroundImages, churchImages } from './data/churchData';

// Import Components
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Announcements from './components/Announcements/Announcements';
import Promotions from './components/Promotions/Promotions';
import ChurchInfo from './components/ChurchInfo/ChurchInfo';
import Gallery from './components/Gallery/Gallery'; // ADD GALLERY IMPORT
import Events from './components/Events/Events';
import Reminders from './components/Reminders/Reminders';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';

import './dashboard.css';

const Dashboard = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState(null);
  
  const mainRef = useRef(null);
  const activeBgIndex = useScrollBackground(backgroundImages, mainRef);

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % churchImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [churchImages.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % churchImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + churchImages.length) % churchImages.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="homepage-container" ref={mainRef}>
      {/* Dynamic Background Images */}
      <div className="dynamic-background">
        {backgroundImages.map((image, index) => (
          <div
            key={image.id}
            className={`background-layer ${index === activeBgIndex ? 'active' : ''}`}
            style={{ backgroundImage: `url(${image.src})` }}
          ></div>
        ))}
      </div>

      <Header isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      
      <Hero 
        currentSlide={currentSlide}
        churchImages={churchImages}
        nextSlide={nextSlide}
        prevSlide={prevSlide}
        goToSlide={goToSlide}
      />
      
      <div className="main-content">
        <Announcements />
        <Promotions />
        
        <ChurchInfo 
          expandedSection={expandedSection}
          toggleSection={toggleSection}
        />
        
        <Gallery /> {/* ADD GALLERY COMPONENT HERE */}
        
        <Events />
        <Reminders />
        <Contact />
      </div>
      
      <Footer />
    </div>
  );
};

export default Dashboard;