import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Download, Calendar, Megaphone, Users, Heart, Clock, MapPin, Phone, Mail, ChevronDown, ChevronUp } from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeBgIndex, setActiveBgIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState(null);
  
  const mainRef = useRef(null);

  // Background images for scroll effect
  const backgroundImages = [
    {
      id: 1,
      src: "./images/church1.jpg",
      alt: "San Jose Manggagawa Parish Church Building"
    },
    {
      id: 2,
      src: "./images/church2.jpg",
      alt: "Church Interior and Altar"
    },
    {
      id: 3,
      src: "./images/church3.jpg",
      alt: "Church Community Gathering"
    },
    {
      id: 4,
      src: "./images/simbahan.jpg",
      alt: "Sunday Mass Celebration"
    }
  ];

  // Sample images for slider
  const churchImages = [
    {
      id: 1,
      src: "./images/church1.jpg",
      alt: "San Jose Manggagawa Parish Church Building"
    },
    {
      id: 2,
      src: "./images/church2.jpg",
      alt: "Church Interior and Altar"
    },
    {
      id: 3,
      src: "./images/church3.jpg",
      alt: "Church Community Gathering"
    },
    {
      id: 4,
      src: "./images/simbahan.jpg",
      alt: "Sunday Mass Celebration"
    }
  ];

  // Mission data
  const missionPoints = [
    "PATULOY NA PAGSASAGAWA NG MGA PAG-AARAL, PAGSASANAY AT PAGSASABUHAY NG SALITA NG DIYOS",
    "PAGYAKAP AT PAGMAMAHAL SA EUKARISTIYA AT SA LAHAT NG MGA SAKRAMENTO",
    "BUMUONG PAMAYANAN NA MAY DEBOSYON, PAGKILALA AT PAGPAPAHALAGA SA MGA KATANGIAN NI MARIA AT NI SAN JOSE MANGGAGAWA",
    "PAGSISIKAP NA PALAWAKIN, PATATAGIN AT PASIGLAHIN ANG MUNTING SAMBAYANANG KRISTIYANOSA TULONG AT GABAY NG KURA PAROKO"
  ];

  // Vision data
  const visionText = "PAGTATATAG NG PAMAYANAN NG DIYOS, NA TAPAT NA SUMUSUNOD SA MGA ARAL AT TURO NI HESUS UPANG MAGING ISANG SAMBAYANAN NA ANG PINANANALIGAN, PINAGKAKATIWALAAN, SINUSUNOD AT PINAGLILINGKURAN AY ANG TUNAY NA DIYOS, UPANG MAGING SAMBAYANAN NA ANG SENTRO NG LAHAT AY ANG DIYOS, AT MAKAPAMUHAY SA KABANALAN AYON SA KALOOBAN NG PANGINOON, SA TULONG NI MARIA, INA NG SIMBAHAN AT NI SAN JOSE MANGGAGAWA NA ATING PATRON";

  // Mass schedules data - Combined into compact format
  const massSchedules = [
    {
      day: "SUNDAY MASSES",
      times: ["6:00 A.M.", "7:30 A.M.", "9:00 A.M. (English Mass)", "5:00 P.M.", "6:30 P.M."]
    },
    {
      day: "WEEKDAY MASSES",
      times: ["6:00 P.M. (Tuesday to Friday)"]
    },
    {
      day: "SATURDAY MASS",
      times: ["6:00 P.M. (Anticipated Mass)"]
    },
    {
      day: "FIRST WEDNESDAY & FRIDAY",
      times: ["6:00 A.M.", "6:00 P.M."]
    }
  ];

  // Reminders data
  const reminders = [
    "ALL TRANSACTIONS MUST BE DONE AT THE PARISH OFFICE ONLY",
    "ALL TRANSACTIONS BEYOND 5:00 P.M. WILL NOT BE ENTERTAINED",
    "ALL MASS INTENTIONS MUST BE OFFERED WITHIN OFFICE HOURS: EVERY TUESDAY TO SATURDAY, BETWEEN 8AM-12NN & 2PM-5PM ONLY. EVERY SUNDAY, BETWEEN 8AM-12NN ONLY",
    "ALL MASS INTENTIONS OFFERED BEYOND THOSE TIME WILL NOT BE INCLUDED FOR THE MASS INTENDED TO OFFER",
    "PLEASE FOLLOW THE SAID OFFICE HOURS"
  ];

  // Office hours data
  const officeHours = [
    { days: "TUESDAY - SATURDAY", hours: "8:00 AM - 12:00 NN & 2:00 PM - 5:00 PM" },
    { days: "SUNDAY", hours: "8:00 AM - 12:00 NN" },
    { days: "MONDAY", hours: "CLOSED" }
  ];

  // Announcements data
  const announcements = [
    {
      id: 1,
      title: "Christmas Mass Schedule",
      date: "December 24-25, 2024",
      description: "Join us for our special Christmas Eve and Christmas Day masses."
    },
    {
      id: 2,
      title: "Baptism Seminar",
      date: "Every Saturday",
      description: "Mandatory seminar for parents and godparents. Registration at 8:00 AM."
    },
    {
      id: 3,
      title: "Parish Renovation Update",
      date: "Ongoing",
      description: "The church renovation is 70% complete. We appreciate your patience."
    }
  ];

  // Events data
  const events = [
    {
      id: 1,
      title: "Sunday Holy Mass",
      schedule: "Every Sunday",
      location: "Main Church"
    },
    {
      id: 2,
      title: "Weekly Bible Study",
      schedule: "Every Wednesday, 7:00 PM",
      location: "Parish Hall"
    },
    {
      id: 3,
      title: "Youth Ministry Meeting",
      schedule: "Every Friday, 6:00 PM",
      location: "Youth Center"
    }
  ];

  // Promotions data
  const promotions = [
    {
      id: 1,
      title: "Christmas Gift Giving",
      description: "Join our annual gift-giving activity for underprivileged children.",
      deadline: "December 20, 2024"
    },
    {
      id: 2,
      title: "Volunteer Program",
      description: "Be part of our church volunteers. Help in various ministries.",
      contact: "Parish Office - 09123456789"
    }
  ];

  // Handle scroll for background image change
  useEffect(() => {
    const handleScroll = () => {
      if (!mainRef.current) return;
      
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      const sectionCount = backgroundImages.length;
      const sectionHeight = docHeight / sectionCount;
      const currentSection = Math.floor(scrollTop / sectionHeight);
      
      setActiveBgIndex(Math.min(currentSection, backgroundImages.length - 1));
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [backgroundImages.length]);

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % churchImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [churchImages.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % churchImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + churchImages.length) % churchImages.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="homepage-container" ref={mainRef}>
      {/* Dynamic Background Images */}
      <div className="dynamic-background">
        {backgroundImages.map((image, index) => (
          <div
            key={image.id}
            className={`background-layer ${index === activeBgIndex ? 'active' : ''}`}
            style={{ backgroundImage: `url(${image.src})` }}
          ></div>
        ))}
      </div>

      {/* HEADER / NAVIGATION BAR */}
      <header className="home-header">
        <div className="logo-section">
          <div className="logo-background">
            <img src="./images/LOGO.png" alt="Church Logo" className="church-logo" onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }} />
            <div className="logo-fallback">⛪</div>
          </div>
          <span className="logo-text">San Jose Manggagawa Parish</span>
        </div>
        
        <nav className={`main-nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#church-info">Church Info</a></li>
            <li><a href="#events">Events</a></li>
            <li><a href="#announcements">Announcements</a></li>
            <li><a href="#promotions">Programs</a></li>
            <li><a href="#reminders">Reminders</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
        
        <button className="mobile-menu-toggle" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        
        <a href="#download" className="download-app-button">
          DOWNLOAD APP <ArrowRight size={16} />
        </a>
      </header>

      {/* HERO SECTION */}
      <main className="hero-section" id="home">
        <div className="full-slider-container">
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
                <a href="#download" className="cta-button secondary">
                  <Download size={18} /> DOWNLOAD APP
                </a>
              </div>
            </div>
          </div>

          {/* Navigation Arrows - IMPROVED */}
          <button className="slider-arrow prev-arrow" onClick={prevSlide}>
            <ChevronLeft size={32} />
          </button>
          <button className="slider-arrow next-arrow" onClick={nextSlide}>
            <ChevronRight size={32} />
          </button>

          {/* Dots Indicator */}
          <div className="slider-dots">
            {churchImages.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </div>
      </main>

      {/* ANNOUNCEMENTS SECTION */}
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

      {/* PROMOTIONS SECTION */}
      <section className="promotion-section" id="promotions">
        <div className="section-content">
          <div className="section-header">
            <Heart size={48} className="section-icon" />
            <h2>Programs & Activities</h2>
            <p>Get involved in our church programs and community activities</p>
          </div>
          
          <div className="promotions-grid">
            {promotions.map((promo) => (
              <div key={promo.id} className="promotion-card">
                <h3>{promo.title}</h3>
                <p>{promo.description}</p>
                <div className="promotion-details">
                  {promo.deadline && <span>📅 Deadline: {promo.deadline}</span>}
                  {promo.contact && <span>📞 {promo.contact}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMBINED CHURCH INFO SECTION - UPDATED WITH COLLAPSIBLE BUTTONS */}
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

      {/* EVENTS SECTION */}
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

      {/* REMINDERS SECTION */}
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

      {/* CONTACT SECTION */}
      <section className="contact-section" id="contact">
        <div className="section-content">
          <div className="section-header">
            <Phone size={48} className="section-icon" />
            <h2>Contact Us</h2>
            <p>Get in touch with San Jose Manggagawa Parish</p>
          </div>
          
          <div className="contact-grid">
            <div className="contact-info">
              <div className="contact-item">
                <MapPin size={24} />
                <div>
                  <h4>Address</h4>
                  <p>E Rodriquez Highway, San Jose Manggagawa Parish</p>
                </div>
              </div>
              
              <div className="contact-item">
                <Phone size={24} />
                <div>
                  <h4>Phone</h4>
                  <p>(8) 633-80-10</p>
                </div>
              </div>
              
              <div className="contact-item">
                <Mail size={24} />
                <div>
                  <h4>Email</h4>
                  <p>info@sanjosemanggagawa.org</p>
                </div>
              </div>
              
              <div className="contact-item">
                <Clock size={24} />
                <div>
                  <h4>Office Hours</h4>
                  <p>Tuesday-Saturday: 8AM-12NN & 2PM-5PM</p>
                  <p>Sunday: 8AM-12NN</p>
                  <p>Monday: Closed</p>
                </div>
              </div>
            </div>
            
            <div className="map-container">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3858.6671946268625!2d121.13290967457532!3d14.731398373862058!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397bbdd79b996d7%3A0x9a4fc72d4712bf77!2sSAN%20JOSE%20MANGGAGAWA%20PARISH%20MONTALBAN!5e0!3m2!1sen!2sph!4v1760185417517!5m2!1sen!2sph" 
                width="100%" 
                height="100%" 
                style={{ border: 0, borderRadius: '15px' }}
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="San Jose Manggagawa Parish Location"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="main-footer">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <img src="./images/LOGO.png" alt="Church Logo" className="church-logo-small" onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }} />
              <div className="logo-fallback-small">⛪</div>
              <span>San Jose Manggagawa Parish</span>
            </div>
            <p className="footer-description">
              A community of faith, hope, and love. Serving God and community.
            </p>
            <div className="footer-contact">
              <div><MapPin size={16} /> E Rodriquez Highway, San Jose Manggagawa Parish</div>
              <div><Phone size={16} /> (8) 633-80-10</div>
              <div><Mail size={16} /> info@sanjosemanggagawa.org</div>
            </div>
          </div>
          
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#church-info">Church Info</a></li>
              <li><a href="#events">Events</a></li>
              <li><a href="#announcements">Announcements</a></li>
              <li><a href="#promotions">Programs</a></li>
              <li><a href="#reminders">Reminders</a></li>
              <li><a href="#contact">Contact Us</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Mass Schedules</h3>
            <ul>
              <li>Weekdays: 6PM</li>
              <li>Saturday: 6PM</li>
              <li>Sunday: 6AM, 7:30AM, 9AM, 5PM, 6:30PM</li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Follow Us</h3>
            <div className="social-links">
              <a href="#" aria-label="Facebook">
                <img src="./images/facebookicon.png" alt="Facebook" />
                Facebook
              </a>
              <a href="#" aria-label="Instagram">
                <img src="./images/instagramicon.webp" alt="Instagram" />
                Instagram
              </a>
              <a href="#" aria-label="YouTube">
                <img src="./images/youicon.png" alt="YouTube" />
                YouTube
              </a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 San Jose Manggagawa Parish. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;