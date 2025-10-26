import React from 'react';
import { Heart, Calendar, Users, Church, Star, Clock, MapPin } from 'lucide-react';
import './Promotions.css';

const Promotions = () => {
  const priests = [
   {
      id: 2,
      name: "Rev. Fr. Jojo Alisbo",
      image: "/images/Jojo.jpg",
      description: "Parish Priest ng San Jose Manggagawa Parish Church",
      tenure: "2012 - 2015 (3 na taon)",
      
    },
   
    {
      id: 1,
      name: "Rev. Fr. Paul Merida",
      image: "/images/FrPaul.jpg",
      description: "Parish Priest ng San Jose Manggagawa Parish Church",
      tenure: "2016 - 2020 (4 na taon)",
      
    },
      {
      id: 4,
      name: "Rev. Fr.Peejay Pendon",
      image: "/images/fr.pendon.jpg",
      description: "Parish Priest ng San Jose Manggagawa Parish Church",
      tenure: "2022 - 2023 (1 taon)",
    
    },
    {
      id: 3,
      name: "Rev. Fr.Francis Roi A. Madarang",
      image: "/images/parish6.jpg",
      description: "Kasalukuyang Parish Priest",
      tenure: "2023 - Present",
  
    }

  ];

  const timelineData = [
    {
      year: "1930",
      title: "Pagkakatatag ng Kapilya",
      description: "Ang simbahan ay unang itinayo bilang maliit na kapilya na gawa sa kawayan at nipa bago sumiklab ang Ikalawang Digmaang Pandaigdig.",
      icon: <Church size={20} />,
      image: "/images/church3.jpg",
      position: "left"
    },
    {
      year: "1940-2015",
      title: "Sentro ng Pananampalataya",
      description: "Nagsilbi bilang mahalagang sentro ng pananampalataya para sa mga lokal na magsasaka at manggagawa.",
      icon: <Users size={20} />,
      image: "./images/parish.jpg",
      position: "right"
    },
    {
      year: "2016",
      title: "Pagiging Ganap na Parokya",
      description: "Dahil sa patuloy na paglago ng bilang ng mga mananampalataya, ang kapilya ay itinaas bilang ganap na Parokya.",
      icon: <Star size={20} />,
      image: "/images/simbahan.jpg",
      position: "left"
    },
    {
      year: "Kasalukuyan",
      title: "Patuloy na Paglilingkod",
      description: "Ang simbahan ay patuloy na naglilingkod sa pamamagitan ng mga sakramento at programang pang-komunidad.",
      icon: <Clock size={20} />,
      image: "/images/church1.jpg",
      position: "right"
    }
  ];

  const churchFacts = [
    { icon: <Calendar size={24} />, fact: "Itinatag noong 1930", detail: "90+ Taon ng Kasaysayan" },
    { icon: <MapPin size={24} />, fact: "Barangay San Jose", detail: "Montalban, Rizal" },
    { icon: <Church size={24} />, fact: "Parish Church", detail: "Since 2016" },
    { icon: <Users size={24} />, fact: "4 na Pari", detail: "Mula 2012 - Present" }
  ];

  return (
    <section className="history-section" id="history">
      {/* Vintage Background Elements */}
      <div className="vintage-overlay"></div>
      <div className="historical-pattern"></div>
      
      <div className="section-content">
        {/* Header with Vintage Style */}
        <div className="history-header">
          <div className="header-decoration">
            <div className="decoration-line left"></div>
            <div className="header-icon">
              <Heart size={40} />
            </div>
            <div className="decoration-line right"></div>
          </div>
          <h1 className="history-main-title">Kasaysayan ng Parokya</h1>
          <p className="history-subtitle">San Jose Manggagawa Parish Church - Montalban, Rizal</p>
          <div className="header-underline"></div>
        </div>

        {/* Church Facts */}
        <div className="church-facts-grid">
          {churchFacts.map((item, index) => (
            <div key={index} className="fact-card">
              <div className="fact-icon">{item.icon}</div>
              <div className="fact-content">
                <h3>{item.fact}</h3>
                <p>{item.detail}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Timeline */}
        <div className="timeline-container">
          <div className="timeline-line">
            <div className="timeline-progress"></div>
          </div>
          
          {timelineData.map((item, index) => (
            <div key={index} className={`timeline-item ${item.position}`}>
              <div className="timeline-marker">
                <div className="marker-circle">
                  {item.icon}
                </div>
                <div className="marker-year">{item.year}</div>
              </div>
              
              <div className="timeline-content">
                <div className="timeline-card">
                  <div className="card-image">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                    />
                    <div className="image-fallback">
                      <Church size={40} />
                    </div>
                  </div>
                  <div className="card-content">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <div className="timeline-date">{item.year}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Priests Section */}
        <div className="priests-section">
          <div className="section-subheader">
            <h2>Ang Ating Mga Pari</h2>
            <p className="subtitle">Mga nagsilbi at kasalukuyang naglilingkod sa parokya</p>
            <div className="subheader-underline"></div>
          </div>
          
          <div className="priests-grid">
            {priests.map((priest) => (
              <div key={priest.id} className="priest-card">
                <div className="priest-image-container">
                  <div className="image-frame">
                    <img 
                      src={priest.image} 
                      alt={priest.name}
                      className="priest-image"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="image-fallback-priest">
                      <Users size={40} />
                    </div>
                    <div className="image-overlay"></div>
                  </div>
                  <div className="priest-tenure">{priest.tenure}</div>
                </div>
                
                <div className="priest-info">
                  <h3>{priest.name}</h3>
                  <p className="priest-role">{priest.description}</p>
                  <p className="priest-specialty">{priest.specialty}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Historical Quote */}
        <div className="historical-quote">
          <div className="quote-mark">"</div>
          <p className="quote-text">
            Ang kasaysayan ng ating parokya ay patunay ng patuloy na pagmamahal at pananampalataya 
            ng pamayanan sa Diyos, at ng dedikasyon ng mga paring naglingkod dito.
          </p>
          <div className="quote-author">- San Jose Manggagawa Parish</div>
        </div>
      </div>
    </section>
  );
};

export default Promotions;