import React from 'react';
import { reminders } from '../../data/churchData';
import './Reminders.css';

const Reminders = () => {
  return (
    <section className="reminders-section" id="reminders">
      <div className="section-content">
        <div className="section-header">
          <div className="warning-icon">⚠️</div>
          <h2>Important Reminders</h2>
          <p>Please take note of these important parish guidelines</p>
        </div>
        
        <div className="reminders-container">
          {reminders.map((reminder, index) => (
            <div key={index} className="reminder-card">
              <div className="reminder-number">{index + 1}</div>
              <p className="reminder-text">{reminder}</p>
            </div>
          ))}
        </div>
        
        <div className="thank-you-note">
          <p>THANK YOU FOR YOUR CONSIDERATION AND COOPERATION.</p>
        </div>
      </div>
    </section>
  );
};

export default Reminders;