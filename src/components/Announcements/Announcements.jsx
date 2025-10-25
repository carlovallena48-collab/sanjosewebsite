import React, { useState, useEffect } from 'react';
import { Megaphone, Calendar, Eye, RefreshCw, AlertCircle } from 'lucide-react';
import './Announcements.css';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ FIXED: Change to your Render backend URL
  const API_BASE_URL = 'https://sanjosewebsite.onrender.com';

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('🔗 Fetching from:', `${API_BASE_URL}/api/announcements`);

      const response = await fetch(`${API_BASE_URL}/api/announcements`);
      
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const result = await response.json();
      console.log('📦 API Response:', result);

      if (result.success) {
        setAnnouncements(result.data || []);
      } else {
        throw new Error(result.message || 'Failed to load announcements');
      }

    } catch (err) {
      console.error('❌ Fetch error:', err);
      setError(err.message);
      setAnnouncements([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

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

  // Check if image is valid base64 or URL
  const isValidImage = (image) => {
    if (!image) return false;
    return image.startsWith('data:image') || image.startsWith('http');
  };

  if (loading) {
    return (
      <section className="announcement-section" id="announcements">
        <div className="section-content">
          <div className="section-header">
            <Megaphone size={48} className="section-icon" />
            <h2>Church Announcements</h2>
            <p>Important updates and news from San Jose Manggagawa Parish</p>
          </div>
          <div className="loading-state">
            <RefreshCw className="spinner" size={32} />
            <p>Loading announcements...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="announcement-section" id="announcements">
        <div className="section-content">
          <div className="section-header">
            <Megaphone size={48} className="section-icon" />
            <h2>Church Announcements</h2>
            <p>Important updates and news from San Jose Manggagawa Parish</p>
          </div>
          <div className="error-state">
            <AlertCircle size={48} className="error-icon" />
            <h3>Connection Error</h3>
            <p>{error}</p>
            <p className="debug-info">Trying to connect to: {API_BASE_URL}</p>
            <button onClick={fetchAnnouncements} className="retry-button">
              <RefreshCw size={16} />
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="announcement-section" id="announcements">
      <div className="section-content">
        <div className="section-header">
          <Megaphone size={48} className="section-icon" />
          <h2>Church Announcements</h2>
          <p>Important updates and news from San Jose Manggagawa Parish</p>
        </div>
        
        {announcements.length === 0 ? (
          <div className="no-announcements">
            <p>No announcements available at the moment.</p>
            <small>Check back later for updates!</small>
          </div>
        ) : (
          <div className="announcements-grid">
            {announcements.map((announcement) => (
              <div key={announcement._id} className="announcement-card">
                {isValidImage(announcement.image) && (
                  <div className="announcement-image-container">
                    <img 
                      src={announcement.image} 
                      alt={announcement.title}
                      className="announcement-image"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                )}
                
                <div className="announcement-content">
                  <div className="announcement-header">
                    <h3>{announcement.title || 'No Title'}</h3>
                    <div className="announcement-meta">
                      <span className="announcement-date">
                        <Calendar size={14} />
                        {formatDate(announcement.createdAt)}
                      </span>
                      {announcement.views > 0 && (
                        <span className="announcement-views">
                          <Eye size={14} />
                          {announcement.views}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="announcement-description">
                    {announcement.content || 'No content available'}
                  </div>
                  
                  {announcement.status && (
                    <div className={`announcement-status status-${announcement.status}`}>
                      {announcement.status}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Announcements;