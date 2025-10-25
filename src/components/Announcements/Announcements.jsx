import React, { useState, useEffect } from 'react';
import { Megaphone, Calendar, Eye, RefreshCw, AlertCircle, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import './Announcements.css';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const API_BASE_URL = 'https://sanjosewebsite.onrender.com';

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_BASE_URL}/api/announcements`);
      
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        setAnnouncements(result.data || []);
      } else {
        throw new Error(result.message || 'Failed to load announcements');
      }

    } catch (err) {
      setError(err.message);
      setAnnouncements([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  // Carousel navigation
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === announcements.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? announcements.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return 'Invalid date';
    }
  };

  const isValidImage = (image) => {
    if (!image) return false;
    return image.startsWith('data:image') || image.startsWith('http');
  };

  // Auto-advance carousel
  useEffect(() => {
    if (announcements.length > 1) {
      const interval = setInterval(nextSlide, 5000);
      return () => clearInterval(interval);
    }
  }, [announcements.length, currentIndex]);

  if (loading) {
    return (
      <section className="announcement-section premium-section" id="announcements">
        <div className="premium-background"></div>
        <div className="section-content">
          <div className="section-header premium-header">
            <div className="icon-wrapper">
              <Megaphone size={52} className="section-icon premium-icon" />
              <div className="icon-glow"></div>
            </div>
            <h2 className="premium-title">Church Announcements</h2>
            <p className="premium-subtitle">Important updates and news from San Jose Manggagawa Parish</p>
          </div>
          <div className="loading-state premium-loading">
            <div className="spinner-container">
              <RefreshCw className="spinner premium-spinner" size={40} />
            </div>
            <p>Loading announcements...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="announcement-section premium-section" id="announcements">
        <div className="premium-background"></div>
        <div className="section-content">
          <div className="section-header premium-header">
            <div className="icon-wrapper">
              <Megaphone size={52} className="section-icon premium-icon" />
              <div className="icon-glow"></div>
            </div>
            <h2 className="premium-title">Church Announcements</h2>
            <p className="premium-subtitle">Important updates and news from San Jose Manggagawa Parish</p>
          </div>
          <div className="error-state premium-error">
            <div className="error-icon-container">
              <AlertCircle size={56} className="error-icon premium-error-icon" />
            </div>
            <h3>Connection Error</h3>
            <p>{error}</p>
            <button onClick={fetchAnnouncements} className="retry-button premium-retry-btn">
              <RefreshCw size={18} />
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="announcement-section premium-section" id="announcements">
      <div className="premium-background"></div>
      <div className="section-content">
        <div className="section-header premium-header">
          <div className="icon-wrapper">
            <Megaphone size={52} className="section-icon premium-icon" />
            <div className="icon-glow"></div>
            <Sparkles size={20} className="sparkle sparkle-1" />
            <Sparkles size={16} className="sparkle sparkle-2" />
            <Sparkles size={18} className="sparkle sparkle-3" />
          </div>
          <h2 className="premium-title">Church Announcements</h2>
          <p className="premium-subtitle">Important updates and news from San Jose Manggagawa Parish</p>
        </div>
        
        {announcements.length === 0 ? (
          <div className="no-announcements premium-no-announcements">
            <div className="empty-state-icon">
              <Megaphone size={64} />
            </div>
            <p>No announcements available at the moment.</p>
            <small>Check back later for updates from our parish!</small>
          </div>
        ) : (
          <div className="announcements-carousel premium-carousel">
            {/* Carousel Container */}
            <div className="carousel-container premium-carousel-container">
              {/* Left Navigation Button */}
              {announcements.length > 1 && (
                <button className="carousel-btn premium-carousel-btn carousel-btn-prev" onClick={prevSlide}>
                  <ChevronLeft size={28} />
                  <div className="btn-glow"></div>
                </button>
              )}

              {/* Carousel Slide */}
              <div className="carousel-slide premium-carousel-slide">
                {announcements.map((announcement, index) => (
                  <div 
                    key={announcement._id} 
                    className={`announcement-card premium-card ${index === currentIndex ? 'active' : ''}`}
                  >
                    <div className="card-glow"></div>
                    {isValidImage(announcement.image) && (
                      <div className="announcement-image-container premium-image-container">
                        <img 
                          src={announcement.image} 
                          alt={announcement.title}
                          className="announcement-image premium-image"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                        <div className="image-overlay"></div>
                      </div>
                    )}
                    
                    <div className="announcement-content premium-content">
                      <div className="announcement-header premium-header-content">
                        <h3 className="premium-card-title">{announcement.title || 'No Title'}</h3>
                        <div className="announcement-meta premium-meta">
                          <span className="announcement-date premium-date">
                            <Calendar size={16} />
                            {formatDate(announcement.createdAt)}
                          </span>
                          {announcement.views > 0 && (
                            <span className="announcement-views premium-views">
                              <Eye size={16} />
                              {announcement.views}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="announcement-description premium-description">
                        {announcement.content || 'No content available'}
                      </div>
                      
                      {announcement.status && (
                        <div className={`announcement-status premium-status status-${announcement.status}`}>
                          {announcement.status}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Navigation Button */}
              {announcements.length > 1 && (
                <button className="carousel-btn premium-carousel-btn carousel-btn-next" onClick={nextSlide}>
                  <ChevronRight size={28} />
                  <div className="btn-glow"></div>
                </button>
              )}
            </div>

            {/* Dots Indicator */}
            {announcements.length > 1 && (
              <div className="carousel-dots premium-dots">
                {announcements.map((_, index) => (
                  <button
                    key={index}
                    className={`dot premium-dot ${index === currentIndex ? 'active' : ''}`}
                    onClick={() => goToSlide(index)}
                  >
                    <div className="dot-glow"></div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Announcements;