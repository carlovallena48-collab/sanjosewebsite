import React, { useState, useEffect } from 'react';
import { Calendar, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import './Hero.css';

const Hero = ({ 
  currentSlide, 
  churchImages, 
  nextSlide, 
  prevSlide, 
  goToSlide 
}) => {
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Minimum swipe distance
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Handle download app click
  const handleDownloadApp = () => {
    window.open('https://expo.dev/accounts/carlovallena/projects/sjmp-parish-app/builds/6a9d892b-c1ca-4d66-a5ac-7ef4c2692082', '_blank');
  };

  return (
    <main className="hero-section" id="home">
      <div 
        className="full-slider-container"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="slider-wrapper">
          {churchImages.map((image, index) => (
            <div
              key={image.id}
              className={`slide ${index === currentSlide ? 'active' : ''}`}
            >
              <img 
                src={image.src} 
                alt={image.alt}
                className="slider-image"
                onError={(e) => {
                  e.target.style.display = 'none';
                  const placeholder = document.createElement('div');
                  placeholder.className = 'image-placeholder-fallback';
                  placeholder.innerHTML = '⛪';
                  e.target.parentNode.appendChild(placeholder);
                }}
              />
              <div className="slide-overlay"></div>
            </div>
          ))}
        </div>

        {/* Hero Content Over Slider */}
        <div className="hero-content-overlay">
          <div className="hero-content">
            <p className="subtitle">SAN JOSE MANGGAGAWA PARISH</p>
            <h1>Welcome to Our Church Community</h1>
            <p className="description">
              A vibrant Catholic community dedicated to faith, service, and love. Join us in worship and become part of our growing family in Christ.
            </p>
            <div className="hero-buttons">
              <a href="#church-info" className="cta-button primary">
                <Calendar size={18} /> MASS SCHEDULES
              </a>
              <button onClick={handleDownloadApp} className="cta-button secondary">
                <Download size={18} /> DOWNLOAD APP
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button className="slider-arrow prev-arrow" onClick={prevSlide} aria-label="Previous image">
          <ChevronLeft size={32} />
        </button>
        <button className="slider-arrow next-arrow" onClick={nextSlide} aria-label="Next image">
          <ChevronRight size={32} />
        </button>

        {/* Dots Indicator */}
        <div className="slider-dots">
          {churchImages.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Slide Counter */}
        <div className="slide-counter">
          <span className="current-slide">{currentSlide + 1}</span>
          <span className="slide-separator">/</span>
          <span className="total-slides">{churchImages.length}</span>
        </div>
      </div>
    </main>
  );
};

export default Hero;