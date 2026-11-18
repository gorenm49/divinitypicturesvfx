import { useEffect, useRef } from 'react';

const clientsRow1 = [
  'Warner Bros.', 'Netflix', 'Disney+', 'HBO', 'Amazon Studios',
  'Paramount', 'Universal', 'Sony Pictures', 'Apple TV+', 'Lionsgate',
];

const clientsRow2 = [
  'BBC Studios', 'A24', 'Marvel Studios', 'Lucasfilm', 'DreamWorks',
  'Focus Features', 'Searchlight', 'New Line Cinema', 'Blumhouse', 'Neon',
];

export default function Clients() {
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

  return (
    <section id="clients" className="section-padding" ref={sectionRef}>
      <div className="container">
        <div className="label-with-lines reveal">
          <div className="label-line"></div>
          <span className="section-label" style={{ marginBottom: 0 }}>
            Trusted By
          </span>
          <div className="label-line"></div>
        </div>
        <h2
          className="section-title reveal reveal-delay-1"
          style={{ textAlign: 'center', marginBottom: 64 }}
        >
          Industry Leaders Trust Our Vision
        </h2>
      </div>

      {/* Marquee Row 1 - Left */}
      <div className="marquee-wrapper marquee-mask reveal reveal-delay-2">
        <div className="marquee-track left">
          <div className="marquee-set">
            {clientsRow1.map((name) => (
              <span key={name} className="marquee-item">{name}</span>
            ))}
          </div>
          <div className="marquee-set">
            {clientsRow1.map((name) => (
              <span key={name + '-dup'} className="marquee-item">{name}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Marquee Row 2 - Right */}
      <div className="marquee-wrapper marquee-mask reveal reveal-delay-3">
        <div className="marquee-track right">
          <div className="marquee-set">
            {clientsRow2.map((name) => (
              <span key={name} className="marquee-item">{name}</span>
            ))}
          </div>
          <div className="marquee-set">
            {clientsRow2.map((name) => (
              <span key={name + '-dup'} className="marquee-item">{name}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="marquee-divider"></div>
    </section>
  );
}
