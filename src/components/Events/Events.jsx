import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
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
      
      // ✅ DITO NAWAWALA YUNG FETCH CALL - IDAGDAG MO TO
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

  // Format date function
  const formatDate = (dateString) => {
    if (!dateString) return 'Date not set';
    
    try {
      const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric'
      };
      return new Date(dateString).toLocaleDateString('en-PH', options);
    } catch (error) {
      return 'Invalid date';
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
                <div className="event-header">
                  <h3>{event.title}</h3>
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
                    <span>{formatDate(event.date)}</span>
                  </div>
                  
                  {event.time && (
                    <div className="event-time">
                      <span>⏰ {event.time}</span>
                    </div>
                  )}
                  
                  {event.location && (
                    <div className="event-location">
                      <span>📍 {event.location}</span>
                    </div>
                  )}
                  
                  {event.category && (
                    <div className="event-category">
                      <span>🏷️ {event.category}</span>
                    </div>
                  )}
                </div>
                
                {event.contactPerson && (
                  <div className="event-contact">
                    <span>📞 Contact: {event.contactPerson}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Events;