import { useState, useEffect } from 'react';
import logo from '../assets/logo.webp';

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
    { label: 'Showreels', id: 'showreels' },
    { label: 'About us', id: 'awards' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <>
      <nav id="main-nav" className={scrolled ? 'scrolled' : ''}>
        <div className="nav-inner">
          <div className="nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ border: '0px solid red' }}>

            {/* <img src={logo} style={{ width: '50px', height: '50px' }} alt="logo" /> */}
            Divinity Pictures
          </div>
          <div className="nav-links">
            {links.map((link) => (
              <button
                key={link.id}
                className="nav-link"
                onClick={() => scrollTo(link.id)}
              >
                {link.label}
              </button>
            ))}
            <button className="nav-cta" onClick={() => scrollTo('contact')}>
              Start a Project
            </button>
          </div>
          <button className="mobile-toggle" onClick={() => setMobileOpen(true)}>
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </nav>

      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
        <button className="mobile-close" onClick={() => setMobileOpen(false)}>
          <span className="material-symbols-outlined">close</span>
        </button>
        {links.map((link) => (
          <button
            key={link.id}
            className="nav-link"
            onClick={() => scrollTo(link.id)}
          >
            {link.label}
          </button>
        ))}
        <button className="nav-cta" onClick={() => scrollTo('contact')}>
          Start a Project
        </button>
      </div>
    </>
  );
}
