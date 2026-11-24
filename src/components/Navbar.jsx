import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const links = [
    { label: 'Services', id: 'services' },
    { label: 'Projects', id: 'projects' },
    { label: 'Recommendation', id: 'recommendation' },
    { label: 'Showreels', id: 'showreels' },
    { label: 'About us', id: 'awards' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <>
      <nav id="main-nav" className={scrolled ? 'scrolled' : ''}>
        <div className="nav-inner">
          <div className="nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>

            {/* <img src={logo} style={{ width: '50px', height: '50px' }} alt="logo" /> */}
            Divinity Pictures
          </div>
          <div className="nav-links">
            {links.map((link) => (
              <button
                key={link.id}
                type="button"
                className="nav-link"
                onClick={() => scrollTo(link.id)}
              >
                {link.label}
              </button>
            ))}
            <button type="button" className="nav-cta" onClick={() => scrollTo('contact')}>
              Start a Project
            </button>
          </div>
          <button type="button" className="mobile-toggle" onClick={() => setMobileOpen(true)} aria-label="Open navigation menu">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </nav>

      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
        <button type="button" className="mobile-close" onClick={() => setMobileOpen(false)} aria-label="Close navigation menu">
          <span className="material-symbols-outlined">close</span>
        </button>
        {links.map((link) => (
          <button
            key={link.id}
            type="button"
            className="nav-link"
            onClick={() => scrollTo(link.id)}
          >
            {link.label}
          </button>
        ))}
        <button type="button" className="nav-cta" onClick={() => scrollTo('contact')}>
          Start a Project
        </button>
      </div>
    </>
  );
}
