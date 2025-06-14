import React from 'react';
import '../styles/footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Abdurrahmaan9</h3>
            <p>Software Engineer passionate about creating innovative digital experiences.</p>
          </div>
          
          <div className="footer-section">
            <h4>Contact</h4>
            <div className="contact-info">
              <div className="contact-item">
                <span className="contact-icon">📧</span>
                <a href="mailto:abdurrahmaanchimalo5@gmail.com">abdurrahmaanchimalo5@gmail.com</a>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <a href="tel:0979663634">0979663634</a>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <span>Zambia</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">💼</span>
                <a href="https://probasegroup.com/" target="_blank" rel="noopener noreferrer">Probase Limited</a>
              </div>
            </div>
          </div>
          
          <div className="footer-section">
            <h4>Connect</h4>
            <div className="social-links">
              <a href="https://github.com/abdurrahmaan9" target="_blank" rel="noopener noreferrer" className="social-link">
                <span className="social-icon">🐙</span>
                <span>GitHub</span>
              </a>
              <a href="https://linkedin.com/in/abdurrahmaan9" target="_blank" rel="noopener noreferrer" className="social-link">
                <span className="social-icon">💼</span>
                <span>LinkedIn</span>
              </a>
              <a href="https://twitter.com/abdurchimalo" target="_blank" rel="noopener noreferrer" className="social-link">
                <span className="social-icon">🐦</span>
                <span>Twitter</span>
              </a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-divider"></div>
          <p>&copy; {currentYear} Abdurrahmaan9. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 