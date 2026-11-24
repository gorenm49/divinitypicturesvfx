import { useState, useEffect, useRef } from 'react';

// Import movie poster assets
import vvaanImg from '../assets/VVAAN.jfif';
import rajaShivajiImg from '../assets/RAJA SHIVAJI.png';
import tumbadchiManjulaImg from '../assets/TUMBADACHI MANJULA.jpg';
import pachFutachaBachanImg from '../assets/PACH FUTACHA BACHAAN.jpg';
import undekhiImg from '../assets/UNDEKHI.jpeg';
import dhurandharImg from '../assets/DHURANDHAR.jpg';
import tronAresImg from '../assets/TRON ARES.jpg';
import badCopImg from '../assets/BAD COP.jpeg';
import theTrialImg from '../assets/THE TRIAL.jpeg';
import planeImg from '../assets/PLANE.jpeg';
import anActionHeroImg from '../assets/AN ACTION HERO.jpeg';
import harHarMahadevImg from '../assets/HAR HAR MAHADEV.jpeg';

const projects = [
  {
    id: 'the-vvaan',
    name: 'The Vvaan',
    year: '2026',
    type: 'Movie',
    tag: 'Supernatural Thriller',
    image: vvaanImg,
  },
  {
    id: 'raja-shivaji',
    name: 'Raja Shivaji',
    year: '2026',
    type: 'Movie',
    tag: 'Historical Epic',
    image: rajaShivajiImg,
  },
  {
    id: 'tumbadchi-manjula',
    name: 'Tumbadchi Manjula',
    year: '2026',
    type: 'Movie',
    tag: 'Folklore / Drama',
    image: tumbadchiManjulaImg,
  },
  {
    id: 'paach-futacha-bachchan',
    name: 'Paach Futacha Bachchan',
    year: '2026',
    type: 'Movie',
    tag: 'Comedy / Drama',
    image: pachFutachaBachanImg,
  },
  {
    id: 'undekhi-s4',
    name: 'Undekhi (Season 4)',
    year: '2026',
    type: 'Web Series',
    tag: 'Crime Thriller',
    image: undekhiImg,
  },
  {
    id: 'dhurandhar',
    name: 'Dhurandhar',
    year: '2025',
    type: 'Movie',
    tag: 'Action / Spy Thriller',
    image: dhurandharImg,
  },
  {
    id: 'tron-ares',
    name: 'TRON: Ares',
    year: '2025',
    type: 'Movie',
    tag: 'Sci-Fi / Action',
    image: tronAresImg,
  },
  {
    id: 'bad-cop',
    name: 'Bad Cop',
    year: '2024',
    type: 'Web Series',
    tag: 'Action / Crime',
    image: badCopImg,
  },
  {
    id: 'the-trial',
    name: 'The Trial',
    year: '2023',
    type: 'Web Series',
    tag: 'Legal Drama',
    image: theTrialImg,
  },
  {
    id: 'plane',
    name: 'Plane',
    year: '2023',
    type: 'Movie',
    tag: 'Action / Survival Thriller',
    image: planeImg,
  },
  {
    id: 'an-action-hero',
    name: 'An Action Hero',
    year: '2022',
    type: 'Movie',
    tag: 'Action / Dark Comedy',
    image: anActionHeroImg,
  },
  {
    id: 'har-har-mahadev',
    name: 'Har Har Mahadev',
    year: '2022',
    type: 'Movie',
    tag: 'Historical Action',
    image: harHarMahadevImg,
  },
];

const years = ['All', '2026', '2025', '2024', '2023', '2022'];
const types = ['All', 'Movie', 'Web Series'];

export default function Projects() {
  const [selectedYear, setSelectedYear] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'
  const [selectedPoster, setSelectedPoster] = useState(null);
  const sectionRef = useRef(null);

  // Intersection observer for reveal animations, updated when filters change
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.05 }
    );

    const reveals = sectionRef.current?.querySelectorAll('.reveal');
    reveals?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [selectedYear, selectedType, viewMode]);

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

  // Filtered projects list
  const filteredProjects = projects.filter((project) => {
    const matchYear = selectedYear === 'All' || project.year === selectedYear;
    const matchType = selectedType === 'All' || project.type === selectedType;
    return matchYear && matchType;
  });

  return (
    <section id="projects" className="section-padding" ref={sectionRef}>
      <div className="container">
        {/* Section Heading */}
        <div className="label-with-lines reveal">
          <div className="label-line"></div>
          <span className="section-label" style={{ marginBottom: 0 }}>
            Featured Filmography
          </span>
          <div className="label-line"></div>
        </div>
        <h2 className="section-title reveal reveal-delay-1" style={{ textAlign: 'center' }}>
          Our Latest Masterpieces
        </h2>
        <p
          className="section-subtitle reveal reveal-delay-2"
          style={{ textAlign: 'center', margin: '0 auto 40px' }}
        >
          A showcase of our most ambitious feature films and web series across global cinema and digital streaming platforms.
        </p>

        {/* Filters & View Switcher Bar */}
        <div className="filmography-controls reveal reveal-delay-2">
          {/* Year Filter Pills */}
          <div className="filmography-filters">
            <span className="filter-label">Release Year:</span>
            <div className="filter-pills">
              {years.map((year) => (
                <button
                  key={year}
                  type="button"
                  className={`filter-pill ${selectedYear === year ? 'active' : ''}`}
                  onClick={() => setSelectedYear(year)}
                >
                  {year}
                  {year !== 'All' && (
                    <span className="pill-count">
                      {projects.filter((p) => p.year === year).length}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="filmography-secondary-controls">
            {/* Type Filter (Movie / Web Series) */}
            <div className="type-pills">
              {types.map((type) => (
                <button
                  key={type}
                  type="button"
                  className={`type-pill ${selectedType === type ? 'active' : ''}`}
                  onClick={() => setSelectedType(type)}
                >
                  {type === 'All' ? 'All Formats' : type === 'Movie' ? 'Movies' : 'Web Series'}
                </button>
              ))}
            </div>

            {/* View Mode Switcher (Grid vs Table) */}
            <div className="view-mode-toggle">
              <button
                type="button"
                className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
                title="Poster Grid View"
                aria-label="Poster Grid View"
              >
                <span className="material-symbols-outlined">grid_view</span>
                <span className="toggle-text">Posters</span>
              </button>
              <button
                type="button"
                className={`view-toggle-btn ${viewMode === 'table' ? 'active' : ''}`}
                onClick={() => setViewMode('table')}
                title="Filmography Table View"
                aria-label="Filmography Table View"
              >
                <span className="material-symbols-outlined">view_list</span>
                <span className="toggle-text">Table</span>
              </button>
            </div>
          </div>
        </div>

        {/* Result Counter Bar */}
        <div className="filmography-count-bar reveal">
          <span>
            Showing <strong>{filteredProjects.length}</strong> of {projects.length} titles
            {selectedYear !== 'All' ? ` • Release Year ${selectedYear}` : ''}
            {selectedType !== 'All' ? ` • ${selectedType === 'Movie' ? 'Movies' : 'Web Series'}` : ''}
          </span>
          {(selectedYear !== 'All' || selectedType !== 'All') && (
            <button
              type="button"
              className="reset-filter-btn"
              onClick={() => {
                setSelectedYear('All');
                setSelectedType('All');
              }}
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* ── View 1: Poster Grid View ── */}
        {viewMode === 'grid' && (
          <div className="posters-grid">
            {filteredProjects.map((project, i) => (
              <div
                key={project.id}
                className="poster-card reveal"
                style={{ animationDelay: `${(i % 6) * 0.08}s` }}
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
        )}

        {/* ── View 2: Table / List View ── */}
        {viewMode === 'table' && (
          <div className="filmography-table-card reveal">
            <div className="filmography-table-wrapper">
              <table className="filmography-table">
                <thead>
                  <tr>
                    <th style={{ width: '80px' }}>Poster</th>
                    <th style={{ width: '140px' }}>Release Year</th>
                    <th>Movie / Web Series</th>
                    <th style={{ width: '160px' }}>Format</th>
                    <th style={{ width: '220px' }}>Genre / VFX Focus</th>
                    <th style={{ width: '100px', textAlign: 'right' }}>Preview</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProjects.map((project) => (
                    <tr
                      key={project.id}
                      className="filmography-row"
                      onClick={() => setSelectedPoster(project)}
                    >
                      <td className="table-poster-cell">
                        <div className="table-thumb-wrapper">
                          <img
                            src={project.image}
                            alt={project.name}
                            className="table-thumb"
                            loading="lazy"
                          />
                        </div>
                      </td>
                      <td>
                        <span className="table-year-badge">{project.year}</span>
                      </td>
                      <td>
                        <div className="table-title-cell">
                          <span className="table-movie-name">{project.name}</span>
                        </div>
                      </td>
                      <td>
                        <span className={`poster-type-badge ${project.type === 'Web Series' ? 'type-series' : 'type-movie'}`}>
                          {project.type}
                        </span>
                      </td>
                      <td>
                        <span className="table-tag">{project.tag}</span>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <button
                          type="button"
                          className="table-view-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedPoster(project);
                          }}
                          aria-label={`View ${project.name} poster`}
                        >
                          <span className="material-symbols-outlined">visibility</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Bottom CTA / Contact Anchor */}
        <div style={{ textAlign: 'center', marginTop: '60px' }} className="reveal reveal-delay-2">
          <button
            type="button"
            className="view-all-btn"
            onClick={() => {
              const el = document.getElementById('contact');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Collaborate on Your Next Production
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* ── Poster Lightbox Modal ── */}
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
