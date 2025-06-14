import React, { useState, useEffect } from 'react';
import '../styles/nav.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        {/* Logo/Name */}
        <div className="nav-logo">
          <h2>Abdurrahmaan9</h2>
        </div>

        {/* Desktop Navigation */}
        <div className="nav-menu">
          <div className="nav-item" onClick={() => scrollToSection('home')}>
            Home
          </div>
          <div className="nav-item" onClick={() => scrollToSection('about')}>
            About
          </div>
          <div className="nav-item" onClick={() => scrollToSection('experience')}>
            Experience
          </div>
          <div className="nav-item" onClick={() => scrollToSection('projects')}>
            Projects
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div 
          className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        {/* Mobile Navigation */}
        <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <div className="mobile-nav-item" onClick={() => scrollToSection('home')}>
            Home
          </div>
          <div className="mobile-nav-item" onClick={() => scrollToSection('about')}>
            About
          </div>
          <div className="mobile-nav-item" onClick={() => scrollToSection('experience')}>
            Experience
          </div>
          <div className="mobile-nav-item" onClick={() => scrollToSection('projects')}>
            Projects
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;