import React, { useMemo, useState, useEffect } from 'react';
import FadeIn from './FadeIn';
import '../styles/Projects.css';


const ImageModal = ({ image, onClose }) => {
  const handleClickOutside = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    if (!image) return;
    
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose, image]);

  if (!image) return null;

  return (
    <div 
      className="modal-overlay" 
      onClick={handleClickOutside}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'transparent',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        padding: '20px',
        cursor: 'zoom-out',
      }}
    >
      <div 
        className="modal-content" 
        style={{ 
          position: 'relative',
          maxWidth: '90%',
          maxHeight: '90%',
          cursor: 'default',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'rgba(0, 0, 0, 0.5)',
            border: 'none',
            color: 'white',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            fontSize: '18px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s',
            padding: 0,
            zIndex: 2,
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(0, 0, 0, 0.8)';
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(0, 0, 0, 0.5)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
          aria-label="Close"
        >
          ×
        </button>
        <img 
          src={image} 
          alt="Enlarged view" 
          style={{
            maxWidth: '100%',
            maxHeight: '90vh',
            borderRadius: '8px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
            display: 'block',
          }}
        />
      </div>
    </div>
  );
};

function ProjectsGrid({ projects = [] }) {
  const [current, setCurrent] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const total = projects.length;
  const [direction, setDirection] = useState('next'); // 'next' | 'prev'
  const goNext = () => {
    if (!total) return;
    setDirection('next');
    setCurrent((prev) => (prev + 1) % total);
  };
  const goPrev = () => {
    if (!total) return;
    setDirection('prev');
    setCurrent((prev) => (prev - 1 + total) % total);
  };

  const windowSize = Math.min(3, total);
  const visible = useMemo(() => {
    return total > 0
      ? Array.from({ length: windowSize }, (_, k) => ({
          item: projects[(current + k) % total],
          idx: (current + k) % total,
        }))
      : [];
  }, [current, total, windowSize, projects]);

  const openModal = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <>
      {selectedImage && <ImageModal image={selectedImage} onClose={closeModal} />}
      <div className="projects-carousel">
        <button className="nav-btn nav-btn-left" onClick={goPrev} aria-label="Previous project">❮</button>
        <div className={`projects-grid ${direction === 'next' ? 'slide-left' : 'slide-right'}`}>
          {visible.map(({ item: p, idx }, i) => (
            <FadeIn key={`${idx}-${i}`} delay={200 + i * 100}>
              <div className="project-card">
                {p.image ? (
                  <div 
                    className="project-image" 
                    onClick={() => openModal(p.image)}
                    style={{ cursor: 'pointer' }}
                  >
                    <img src={p.image} alt={p.title} />
                  </div>
                ) : null}
                <div className="project-content">
                  <h3 className="project-title">{p.title}</h3>
                  <p className="project-desc">{p.description}</p>
                  {Array.isArray(p.tech) && p.tech.length > 0 ? (
                    <div className="project-tags">
                      {p.tech.map((t, idx) => (
                        <span className="tech-tag" key={idx}>{t}</span>
                      ))}
                    </div>
                  ) : null}
                  {(p.live || p.source) ? (
                    <div className="project-links">
                      {p.live ? (
                        <a className="project-link" href={p.live} target="_blank" rel="noreferrer">Live</a>
                      ) : null}
                      {p.source ? (
                        <a className="project-link" href={p.source} target="_blank" rel="noreferrer">Code</a>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
        <button className="nav-btn nav-btn-right" onClick={goNext} aria-label="Next project">❯</button>
      </div>
    </>
  );
}

export default ProjectsGrid;
