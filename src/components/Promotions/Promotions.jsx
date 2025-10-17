import React from 'react';
import { Heart } from 'lucide-react';
import { promotions } from '../../data/churchData';
import './Promotions.css';

const Promotions = () => {
  return (
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
  );
};

export default Promotions;