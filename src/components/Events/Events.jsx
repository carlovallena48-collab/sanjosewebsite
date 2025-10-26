import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Tag, Phone, Users } from 'lucide-react';
import './Events.css';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch events from Express server
  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const API_BASE_URL = 'https://sanjosewebsite.onrender.com';
      
      const response = await fetch(`${API_BASE_URL}/api/events`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.success) {
        setEvents(result.data);
      } else {
        throw new Error(result.error || 'Failed to fetch events');
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetching events:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // ✅ SIMPLE DATE FORMATTING - FRONTEND
  const formatDate = (dateString) => {
    if (!dateString) return 'Date not set';
    
    try {
      const date = new Date(dateString);
      
      // Check if date is valid
      if (isNaN(date.getTime())) {
        return 'Invalid date';
      }
      
      // ✅ SIMPLE FORMAT: "October 26, 2025"
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return 'Date error';
    }
  };

  // ✅ SIMPLE TIME FORMATTING - FRONTEND
  const formatTime = (dateString) => {
    if (!dateString) return 'Time not set';
    
    try {
      const date = new Date(dateString);
      
      // Check if date is valid
      if (isNaN(date.getTime())) {
        return 'Invalid time';
      }
      
      // ✅ SIMPLE FORMAT: "9:58 AM"
      return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
    } catch (error) {
      return 'Time error';
    }
  };

  if (loading) {
    return (
      <section className="events-section" id="events">
        <div className="section-content">
          <div className="section-header">
            <Calendar size={48} className="section-icon" />
            <h2>Church Events</h2>
            <p>Loading events...</p>
          </div>
          <div className="loading-events">
            <div className="loading-spinner"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="events-section" id="events">
        <div className="section-content">
          <div className="section-header">
            <Calendar size={48} className="section-icon" />
            <h2>Church Events</h2>
            <p>Error loading events</p>
          </div>
          <div className="error-message">
            <p>Error: {error}</p>
            <button onClick={fetchEvents} className="retry-button">
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="events-section" id="events">
      <div className="section-content">
        <div className="section-header">
          <Calendar size={48} className="section-icon" />
          <h2>Church Events</h2>
          <p>Join us in our regular activities and special events</p>
        </div>
        
        {events.length === 0 ? (
          <div className="no-events">
            <p>No upcoming events scheduled.</p>
            <p>Please check back later for updates.</p>
          </div>
        ) : (
          <div className="events-grid">
            {events.map((event) => (
              <div key={event._id} className="event-card">
                {/* EVENT IMAGE */}
                {event.image && (
                  <div className="event-image-container">
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="event-image"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                )}
                
                <div className="event-content">
                  <div className="event-header">
                    <h3>{event.title || 'No Title'}</h3>
                    {event.isFeatured && <span className="featured-badge">Featured</span>}
                  </div>
                  
                  {event.description && (
                    <div className="event-description">
                      <p>{event.description}</p>
                    </div>
                  )}
                  
                  <div className="event-details">
                    <div className="event-schedule">
                      <Calendar size={16} />
                      {/* ✅ FORMAT DATE IN FRONTEND */}
                      <span>{formatDate(event.date)}</span>
                    </div>
                    
                    <div className="event-time">
                      <Clock size={16} />
                      {/* ✅ FORMAT TIME IN FRONTEND */}
                      <span>{formatTime(event.date)}</span>
                    </div>
                    
                    {event.location && (
                      <div className="event-location">
                        <MapPin size={16} />
                        <span>{event.location}</span>
                      </div>
                    )}
                    
                    {event.category && (
                      <div className="event-category">
                        <Tag size={16} />
                        <span>{event.category}</span>
                      </div>
                    )}
                  </div>
                  
                  {event.contactPerson && (
                    <div className="event-contact">
                      <Phone size={16} />
                      <span>Contact: {event.contactPerson}</span>
                    </div>
                  )}
                  
                  {/* EVENT STATUS AND ATTENDEES */}
                  <div className="event-meta">
                    <span className={`event-status ${event.status || 'scheduled'}`}>
                      {event.status || 'scheduled'}
                    </span>
                    <div className="event-attendance">
                      <Users size={16} />
                      <span>{event.attendees || 0} attending</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Events;