import React, { useMemo, useState } from 'react';
import FadeIn from './FadeIn';
import '../styles/Projects.css';


function ProjectsGrid({ projects = [] }) {
  const [current, setCurrent] = useState(0);
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

  return (
    <>
      <div className="projects-carousel">
        <button className="nav-btn nav-btn-left" onClick={goPrev} aria-label="Previous project">❮</button>
        <div className={`projects-grid ${direction === 'next' ? 'slide-left' : 'slide-right'}`}>
          {visible.map(({ item: p, idx }, i) => (
            <FadeIn key={`${idx}-${i}`} delay={200 + i * 100}>
              <div className="project-card">
                {p.image ? (
                  <div className="project-image">
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
