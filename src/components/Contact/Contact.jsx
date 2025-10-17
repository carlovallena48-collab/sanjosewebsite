import React from 'react';
import { Phone, MapPin, Mail, Clock } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  return (
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
  );
};

export default Contact;