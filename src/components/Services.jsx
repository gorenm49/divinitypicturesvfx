import { useEffect, useRef } from 'react';

const services = [
  {
    icon: 'auto_awesome',
    title: 'CGI & 3D Animation',
    desc: 'Photorealistic CG environments, creatures, and effects built with cutting-edge tools and unmatched artistry.',
  },
  {
    icon: 'layers',
    title: 'Compositing',
    desc: 'Seamless integration of live-action and digital elements using industry-leading compositing pipelines.',
  },
  {
    icon: 'movie_filter',
    title: 'Matte Painting',
    desc: 'Stunning digital environments that transport audiences to worlds beyond imagination.',
  },
  {
    icon: 'blur_on',
    title: 'Motion Capture',
    desc: 'State-of-the-art performance capture delivering believable digital characters and creatures.',
  },
];

export default function Services() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const reveals = sectionRef.current?.querySelectorAll('.reveal');
    reveals?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" className="section-padding" ref={sectionRef}>
      <div className="services-glow"></div>
      <div className="container">
        <div className="services-layout">
          <div className="services-header">
            <span className="section-label reveal">What We Do</span>
            <h2 className="section-title reveal reveal-delay-1">
              Crafting the Impossible
            </h2>
            <p className="section-subtitle reveal reveal-delay-2">
              From concept to final pixel, our team of world-class artists and technologists
              deliver visual effects that define the future of entertainment.
            </p>
            <a href="#projects" className="pipeline-link reveal reveal-delay-3">
              <span className="text">Explore Our Pipeline</span>
              <span className="material-symbols-outlined">arrow_forward</span>
            </a>
          </div>

          <div className="services-grid">
            {services.map((service, i) => (
              <div
                key={service.title}
                className={`glass-card reveal reveal-delay-${i + 1}`}
              >
                <div className="card-icon">
                  <span className="material-symbols-outlined">{service.icon}</span>
                </div>
                <h3 className="card-title">{service.title}</h3>
                <p className="card-desc">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
