import React from 'react';
import { Users, Calendar, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { missionPoints, visionText, massSchedules, officeHours } from '../../data/churchData';
import './ChurchInfo.css';

const ChurchInfo = ({ expandedSection, toggleSection }) => {
  return (
    <section className="church-info-section" id="church-info">
      <div className="section-content">
        <div className="section-header">
          <h2>Church Information</h2>
          <p>Click on each section to view details</p>
        </div>
        
        <div className="church-info-buttons">
          {/* Mission & Vision Button */}
          <div className="info-button-container">
            <button 
              className={`info-button mission-vision-button ${expandedSection === 'mission' ? 'expanded' : ''}`}
              onClick={() => toggleSection('mission')}
            >
              <div className="button-header">
                <div className="button-icon">
                  <Users size={24} />
                </div>
                <span className="button-title">Mission & Vision</span>
                <div className="button-arrow">
                  {expandedSection === 'mission' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </div>
              
              {expandedSection === 'mission' && (
                <div className="button-content">
                  <div className="mission-section">
                    <h4>OUR MISSION</h4>
                    <ul className="compact-mission-list">
                      {missionPoints.map((point, index) => (
                        <li key={index}>
                          <span className="mission-number">{index + 1}</span>
                          <span className="mission-text">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="vision-section">
                    <h4>OUR VISION</h4>
                    <p className="compact-vision-text">{visionText}</p>
                  </div>
                </div>
              )}
            </button>
          </div>

          {/* Mass Schedule Button */}
          <div className="info-button-container">
            <button 
              className={`info-button mass-schedule-button ${expandedSection === 'mass' ? 'expanded' : ''}`}
              onClick={() => toggleSection('mass')}
            >
              <div className="button-header">
                <div className="button-icon">
                  <Calendar size={24} />
                </div>
                <span className="button-title">Mass Schedules</span>
                <div className="button-arrow">
                  {expandedSection === 'mass' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </div>
              
              {expandedSection === 'mass' && (
                <div className="button-content">
                  <div className="schedule-list">
                    {massSchedules.map((schedule, index) => (
                      <div key={index} className="schedule-item-compact">
                        <div className="schedule-day-compact">{schedule.day}</div>
                        <div className="schedule-times-compact">
                          {schedule.times.map((time, timeIndex) => (
                            <div key={timeIndex} className="time-slot-compact">
                              <Clock size={14} />
                              <span>{time}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </button>
          </div>

          {/* Office Hours Button */}
          <div className="info-button-container">
            <button 
              className={`info-button office-hours-button ${expandedSection === 'office' ? 'expanded' : ''}`}
              onClick={() => toggleSection('office')}
            >
              <div className="button-header">
                <div className="button-icon">
                  <Clock size={24} />
                </div>
                <span className="button-title">Office Hours</span>
                <div className="button-arrow">
                  {expandedSection === 'office' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </div>
              
              {expandedSection === 'office' && (
                <div className="button-content">
                  <div className="office-hours-list">
                    {officeHours.map((office, index) => (
                      <div key={index} className="office-hour-item">
                        <div className="office-days-compact">{office.days}</div>
                        <div className="office-hours-compact">{office.hours}</div>
                      </div>
                    ))}
                  </div>
                  <div className="office-note">
                    <p>For inquiries and transactions, please visit during office hours.</p>
                  </div>
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChurchInfo;