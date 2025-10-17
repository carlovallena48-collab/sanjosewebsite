import React from 'react';
import { Calendar } from 'lucide-react';
import { events } from '../../data/churchData';
import './Events.css';

const Events = () => {
  return (
    <section className="events-section" id="events">
      <div className="section-content">
        <div className="section-header">
          <Calendar size={48} className="section-icon" />
          <h2>Church Events</h2>
          <p>Join us in our regular activities and special events</p>
        </div>
        
        <div className="events-grid">
          {events.map((event) => (
            <div key={event.id} className="event-card">
              <h3>{event.title}</h3>
              <div className="event-details">
                <div className="event-schedule">
                  <Calendar size={16} />
                  <span>{event.schedule}</span>
                </div>
                <div className="event-location">
                  <span>📍 {event.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;