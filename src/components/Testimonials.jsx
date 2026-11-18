import { useState, useEffect, useRef } from 'react';

const testimonials = [
  {
    text: 'Divinity Pictures transformed our vision into something beyond our wildest imagination. Their attention to detail and artistic excellence is unmatched in the industry.',
    name: 'Sarah Mitchell',
    role: 'Director — Echoes of Eternity',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
  },
  {
    text: 'Working with the team at Divinity was a game-changing experience. They didn\'t just deliver VFX — they elevated every single frame of our film to cinematic perfection.',
    name: 'James Chen',
    role: 'Producer — Quantum Rift',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
  },
  {
    text: 'The level of craftsmanship and creative problem-solving at Divinity Pictures is extraordinary. They are true pioneers in the visual effects space.',
    name: 'Elena Rodriguez',
    role: 'VFX Supervisor — Genesis Protocol',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(1);
  const sectionRef = useRef(null);

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

  const getOrder = () => {
    const prev = (activeIndex - 1 + testimonials.length) % testimonials.length;
    const next = (activeIndex + 1) % testimonials.length;
    return [prev, activeIndex, next];
  };

  const [left, center, right] = getOrder();

  const goNext = () => setActiveIndex((prev) => (prev + 1) % testimonials.length);
  const goPrev = () => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  const renderCard = (index, type) => {
    const t = testimonials[index];
    return (
      <div className={`testimonial-card ${type}`}>
        <div className="quote-mark">"</div>
        {type === 'center' && (
          <div className="testimonial-stars">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="material-symbols-outlined">star</span>
            ))}
          </div>
        )}
        <p className="testimonial-text">{t.text}</p>
        <div className="testimonial-divider"></div>
        <div className="testimonial-author">
          <div className="testimonial-avatar">
            <img src={t.avatar} alt={t.name} />
          </div>
          <div>
            <div className="author-name">{t.name}</div>
            <div className="author-role">{t.role}</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="testimonials" className="section-padding" ref={sectionRef}>
      <div className="testimonials-glow"></div>
      <div className="container">
        <div className="label-with-lines reveal">
          <div className="label-line"></div>
          <span className="section-label" style={{ marginBottom: 0 }}>
            Testimonials
          </span>
          <div className="label-line"></div>
        </div>
        <h2
          className="section-title reveal reveal-delay-1"
          style={{ textAlign: 'center', marginBottom: 80 }}
        >
          What Our Clients Say
        </h2>

        <div className="testimonials-slider reveal reveal-delay-2">
          <button className="test-nav-btn left" onClick={goPrev}>
            <span className="material-symbols-outlined">chevron_left</span>
          </button>

          {renderCard(left, 'side')}
          {renderCard(center, 'center')}
          {renderCard(right, 'side')}

          <button className="test-nav-btn right" onClick={goNext}>
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>

        <div className="testimonial-dots">
          {testimonials.map((_, i) => (
            <button
              key={i}
              className={`testimonial-dot ${i === activeIndex ? 'active' : 'inactive'}`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
