import React from 'react';
import { Megaphone } from 'lucide-react';
import { announcements } from '../../data/churchData';
import './Announcements.css';

const Announcements = () => {
  return (
    <section className="announcement-section" id="announcements">
      <div className="section-content">
        <div className="section-header">
          <Megaphone size={48} className="section-icon" />
          <h2>Church Announcements</h2>
          <p>Important updates and news from San Jose Manggagawa Parish</p>
        </div>
        
        <div className="announcements-grid">
          {announcements.map((announcement) => (
            <div key={announcement.id} className="announcement-card">
              <div className="announcement-header">
                <h3>{announcement.title}</h3>
                <span className="announcement-date">{announcement.date}</span>
              </div>
              <p className="announcement-description">{announcement.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Announcements;