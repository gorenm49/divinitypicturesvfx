import { useState, useEffect, useRef, useCallback } from 'react';

// Thumbnails for the 3 YouTube showreels
import badCopReelImg from '../assets/reel-bad-cop.jpg';
import showreel2023Img from '../assets/reel-showreel-2023.jpg';
import showreel2022Img from '../assets/reel-showreel-2022.jpg';

const reels = [
  {
    id: 'bad-cop',
    image: badCopReelImg,
    badge: 'VFX Breakdown',
    badgeType: 'accent',
    title: 'Bad Cop — VFX Breakdown',
    duration: '00:36',
    videoId: 'GV-lTzx9SyU',
    youtubeUrl: 'https://youtu.be/GV-lTzx9SyU?si=qSjChjwvw8LmirF-',
    embedUrl: 'https://www.youtube.com/embed/GV-lTzx9SyU?autoplay=1&rel=0',
  },
  {
    id: 'showreel-2023',
    image: showreel2023Img,
    badge: 'Featured Reel',
    badgeType: 'accent',
    title: 'Divinity Pictures — 2023 VFX Showreel',
    duration: '01:45',
    videoId: 'gNRUq9ZJ2qE',
    youtubeUrl: 'https://youtu.be/gNRUq9ZJ2qE?si=T0MsiJzcF50jJgl5',
    embedUrl: 'https://www.youtube.com/embed/gNRUq9ZJ2qE?autoplay=1&rel=0',
  },
  {
    id: 'showreel-2022',
    image: showreel2022Img,
    badge: 'VFX Showreel',
    badgeType: 'surface',
    title: 'Divinity Pictures — 2022 VFX Showreel',
    duration: '02:11',
    videoId: 'K7k-8SHRRvg',
    youtubeUrl: 'https://youtu.be/K7k-8SHRRvg?si=8kD0GRc9A1zT0AU1',
    embedUrl: 'https://www.youtube.com/embed/K7k-8SHRRvg?autoplay=1&rel=0',
  },
];

export default function Showreels() {
  const [activeIndex, setActiveIndex] = useState(1);
  const [activeReel, setActiveReel] = useState(reels[1]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalClosing, setModalClosing] = useState(false);
  const sectionRef = useRef(null);
  const modalRef = useRef(null);

  /* ── Intersection observer for reveal animations ── */
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

  /* ── Modal open / close handlers ── */
  const openModal = useCallback((reel) => {
    setActiveReel(reel);
    setModalOpen(true);
    setModalClosing(false);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeModal = useCallback(() => {
    setModalClosing(true);
    // Wait for the exit animation to finish before unmounting
    setTimeout(() => {
      setModalOpen(false);
      setModalClosing(false);
      document.body.style.overflow = '';
    }, 500);
  }, []);

  /* ── Close on Escape key ── */
  useEffect(() => {
    if (!modalOpen) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [modalOpen, closeModal]);

  /* ── Carousel helpers ── */
  const getOrder = () => {
    const prev = (activeIndex - 1 + reels.length) % reels.length;
    const next = (activeIndex + 1) % reels.length;
    return [prev, activeIndex, next];
  };

  const [left, center, right] = getOrder();

  const goNext = () => setActiveIndex((prev) => (prev + 1) % reels.length);
  const goPrev = () => setActiveIndex((prev) => (prev - 1 + reels.length) % reels.length);

  return (
    <section id="showreels" className="section-padding" ref={sectionRef}>
      <div className="container">
        <div className="label-with-lines reveal">
          <div className="label-line"></div>
          <span className="section-label" style={{ marginBottom: 0 }}>
            Showreels
          </span>
          <div className="label-line"></div>
        </div>
        <h2
          className="section-title reveal reveal-delay-1"
          style={{ textAlign: 'center', marginBottom: 80 }}
        >
          See Our Craft in Motion
        </h2>

        <div className="showreels-carousel reveal reveal-delay-2">
          <button
            type="button"
            className="carousel-nav-btn left"
            onClick={goPrev}
            aria-label="Previous Showreel"
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </button>

          {/* Left side reel */}
          <div
            className="reel-card side"
            onClick={() => {
              setActiveIndex(left);
              openModal(reels[left]);
            }}
            title={`Click to watch: ${reels[left].title}`}
          >
            <img src={reels[left].image} alt={reels[left].title} />
            <div className="reel-side-dark"></div>
            <div className="reel-play-mini">
              <span className="material-symbols-outlined">play_arrow</span>
            </div>
            <div className="reel-info">
              <span className={`reel-badge ${reels[left].badgeType}`}>
                {reels[left].badge}
              </span>
              <div className="reel-side-bottom">
                <div className="reel-title">{reels[left].title}</div>
                <span className="reel-duration">{reels[left].duration}</span>
              </div>
            </div>
          </div>

          {/* Center reel */}
          <div
            className="reel-card center"
            onClick={() => openModal(reels[center])}
            title={`Click to watch: ${reels[center].title}`}
          >
            <img src={reels[center].image} alt={reels[center].title} />
            <div className="reel-overlay"></div>
            <div className="reel-play">
              <span className="material-symbols-outlined">play_arrow</span>
            </div>
            <div className="reel-info">
              <span className={`reel-badge ${reels[center].badgeType}`}>
                {reels[center].badge}
              </span>
              <div className="reel-center-bottom">
                <div className="reel-title">{reels[center].title}</div>
                <span className="reel-duration">{reels[center].duration}</span>
              </div>
            </div>
          </div>

          {/* Right side reel */}
          <div
            className="reel-card side"
            onClick={() => {
              setActiveIndex(right);
              openModal(reels[right]);
            }}
            title={`Click to watch: ${reels[right].title}`}
          >
            <img src={reels[right].image} alt={reels[right].title} />
            <div className="reel-side-dark"></div>
            <div className="reel-play-mini">
              <span className="material-symbols-outlined">play_arrow</span>
            </div>
            <div className="reel-info">
              <span className={`reel-badge ${reels[right].badgeType}`}>
                {reels[right].badge}
              </span>
              <div className="reel-side-bottom">
                <div className="reel-title">{reels[right].title}</div>
                <span className="reel-duration">{reels[right].duration}</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="carousel-nav-btn right"
            onClick={goNext}
            aria-label="Next Showreel"
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>

        <div className="carousel-dots">
          {reels.map((reel, i) => (
            <button
              key={reel.id}
              type="button"
              className={`carousel-dot ${i === activeIndex ? 'active' : ''}`}
              onClick={() => setActiveIndex(i)}
              aria-label={`Go to ${reel.title}`}
            />
          ))}
        </div>
      </div>

      {/* ── Video Popup Modal ── */}
      {modalOpen && (
        <div
          className={`reel-modal-backdrop ${modalClosing ? 'closing' : ''}`}
          onClick={closeModal}
          ref={modalRef}
        >
          {/* Ambient glow effects */}
          <div className="reel-modal-glow reel-modal-glow--left" />
          <div className="reel-modal-glow reel-modal-glow--right" />

          <div
            className={`reel-modal-container ${modalClosing ? 'closing' : ''}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button className="reel-modal-close" onClick={closeModal} aria-label="Close">
              <span className="material-symbols-outlined">close</span>
            </button>

            {/* Header */}
            <div className={`reel-modal-header ${modalClosing ? 'closing' : ''}`}>
              <span className="reel-modal-badge">{activeReel.badge || 'Now Playing'}</span>
              <h3 className="reel-modal-title">{activeReel.title}</h3>
            </div>

            {/* Video frame */}
            <div className={`reel-modal-frame ${modalClosing ? 'closing' : ''}`}>
              <iframe
                src={modalClosing ? '' : activeReel.embedUrl}
                title={activeReel.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
