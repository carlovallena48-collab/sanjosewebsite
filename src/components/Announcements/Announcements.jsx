import React, { useState, useEffect } from 'react';
import { Megaphone, Calendar, Eye, RefreshCw, AlertCircle, Server } from 'lucide-react';
import './Announcements.css';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [serverStatus, setServerStatus] = useState('checking');

  const API_BASE_URL = 'http://localhost:5000';

  // Check server status first
  const checkServerStatus = async () => {
    try {
      console.log('🔍 Checking server status...');
      const response = await fetch(`${API_BASE_URL}/health`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setServerStatus('online');
        console.log('✅ Server is online:', data);
        return true;
      } else {
        setServerStatus('offline');
        console.error('❌ Server responded with error:', response.status);
        return false;
      }
    } catch (err) {
      setServerStatus('offline');
      console.error('❌ Cannot reach server:', err.message);
      return false;
    }
  };

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // First check if server is running
      const isServerOnline = await checkServerStatus();
      
      if (!isServerOnline) {
        throw new Error(`Cannot connect to server at ${API_BASE_URL}. Make sure the backend is running.`);
      }

      console.log('🔄 Fetching announcements from:', `${API_BASE_URL}/api/announcements`);
      
      const response = await fetch(`${API_BASE_URL}/api/announcements`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      console.log('📡 Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Server response error:', errorText);
        throw new Error(`Server error: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      console.log('✅ API Response:', result);

      if (result.success) {
        setAnnouncements(result.data || []);
        console.log(`📊 Loaded ${result.data.length} announcements`);
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

  const handleRetry = () => {
    fetchAnnouncements();
  };

  // Server Status Indicator
  const ServerStatus = () => (
    <div className={`server-status ${serverStatus}`}>
    
     
    </div>
  );

  if (loading) {
    return (
      <section className="announcement-section" id="announcements">
        <div className="section-content">
          <div className="section-header">
            <Megaphone size={48} className="section-icon" />
            <h2>Church Announcements</h2>
            <p>Important updates and news from San Jose Manggagawa Parish</p>
            <ServerStatus />
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
            <ServerStatus />
          </div>
          <div className="error-state">
            <AlertCircle size={48} className="error-icon" />
            <h3>Connection Error</h3>
            <p>{error}</p>
            <div className="troubleshooting">
              <h4>💡 Troubleshooting Steps:</h4>
              <ol>
                <li>Make sure the backend server is running on port 5000</li>
                <li>Check if you can visit: <a href="http://localhost:5000/health" target="_blank" rel="noopener noreferrer">http://localhost:5000/health</a></li>
                <li>Verify your .env file has the correct MONGODB_URI</li>
                <li>Check console for detailed error messages</li>
              </ol>
            </div>
            <button onClick={handleRetry} className="retry-button">
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
          <ServerStatus />
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
                {announcement.image && (
                  <div className="announcement-image-container">
                    <img 
                      src={announcement.image} 
                      alt={announcement.title}
                      className="announcement-image"
                      onError={(e) => {
                        console.log('Image failed to load:', announcement.title);
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