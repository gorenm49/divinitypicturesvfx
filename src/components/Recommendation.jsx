import { useState, useEffect, useRef } from 'react';
import starbrightImg from '../assets/STARBRIGHT.png';
import baramullaImg from '../assets/BARAMULLA.jpg';

const recommendations = [
  {
    id: 'starbright',
    name: 'Starbright',
    year: '2026',
    type: 'Movie',
    tag: 'Fantasy / Adventure',
    image: starbrightImg,
  },
  {
    id: 'baramulla',
    name: 'Baramulla',
    year: '2025',
    type: 'Movie',
    tag: 'Supernatural Thriller',
    image: baramullaImg,
  },
];

export default function Recommendation() {
  const [selectedPoster, setSelectedPoster] = useState(null);
  const sectionRef = useRef(null);

  // Intersection observer for reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1 }
    );

    const reveals = sectionRef.current?.querySelectorAll('.reveal');
    reveals?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Modal ESC key listener and scroll lock
  useEffect(() => {
    if (!selectedPoster) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') setSelectedPoster(null);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [selectedPoster]);

  return (
    <section id="recommendation" className="section-padding recommendation-section" ref={sectionRef}>
      <div className="recommendation-glow"></div>
      <div className="container">
        {/* Section Heading */}
        <div className="label-with-lines reveal">
          <div className="label-line"></div>
          <span className="section-label" style={{ marginBottom: 0 }}>
            Curated Highlights
          </span>
          <div className="label-line"></div>
        </div>
        <h2 className="section-title reveal reveal-delay-1" style={{ textAlign: 'center' }}>
          Recommendation
        </h2>
        <p
          className="section-subtitle reveal reveal-delay-2"
          style={{ textAlign: 'center', margin: '0 auto 48px' }}
        >
          Signature productions recognized for award-winning visual effects and cinematic storytelling.
        </p>

        {/* Poster Grid identical to Projects Section */}
        <div className="recommendation-posters-grid">
          {recommendations.map((project, i) => (
            <div
              key={project.id}
              className={`poster-card reveal reveal-delay-${i + 1}`}
              onClick={() => setSelectedPoster(project)}
            >
              <div className="poster-image-wrapper">
                <img
                  src={project.image}
                  alt={`${project.name} Poster`}
                  className="poster-img"
                  loading="lazy"
                />
                <div className="poster-overlay-gradient"></div>

                {/* Top Badges */}
                <div className="poster-top-badges">
                  <span className="poster-year-badge">{project.year}</span>
                  <span className={`poster-type-badge ${project.type === 'Web Series' ? 'type-series' : 'type-movie'}`}>
                    {project.type}
                  </span>
                </div>

                {/* Hover Quick Action */}
                <div className="poster-hover-action">
                  <span className="material-symbols-outlined">zoom_in</span>
                  <span>View Poster</span>
                </div>

                {/* Bottom Info */}
                <div className="poster-info">
                  <span className="poster-tag">{project.tag}</span>
                  <h3 className="poster-title">{project.name}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Poster Lightbox Modal (identical to Projects modal) ── */}
      {selectedPoster && (
        <div
          className="poster-modal-backdrop"
          onClick={() => setSelectedPoster(null)}
        >
          <div
            className="poster-modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="poster-modal-close"
              onClick={() => setSelectedPoster(null)}
              aria-label="Close Poster Modal"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <div className="poster-modal-content">
              <div className="poster-modal-image-pane">
                <img
                  src={selectedPoster.image}
                  alt={selectedPoster.name}
                  className="poster-modal-img"
                />
              </div>
              <div className="poster-modal-details-pane">
                <div className="poster-modal-header">
                  <div className="poster-modal-badges">
                    <span className="poster-year-badge modal-badge">{selectedPoster.year}</span>
                    <span className={`poster-type-badge ${selectedPoster.type === 'Web Series' ? 'type-series' : 'type-movie'}`}>
                      {selectedPoster.type}
                    </span>
                  </div>
                  <h3 className="poster-modal-title">{selectedPoster.name}</h3>
                  <p className="poster-modal-tag">{selectedPoster.tag}</p>
                </div>

                <div className="poster-modal-body">
                  <div className="modal-meta-row">
                    <span className="meta-label">Release Year</span>
                    <span className="meta-value">{selectedPoster.year}</span>
                  </div>
                  <div className="modal-meta-row">
                    <span className="meta-label">Format</span>
                    <span className="meta-value">{selectedPoster.type}</span>
                  </div>
                  <div className="modal-meta-row">
                    <span className="meta-label">VFX</span>
                    <span className="meta-value">Divinity Pictures VFX</span>
                  </div>
                </div>

                <div className="poster-modal-footer">
                  <button
                    type="button"
                    className="modal-cta-btn"
                    onClick={() => {
                      setSelectedPoster(null);
                      const el = document.getElementById('contact');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Discuss This Project
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
