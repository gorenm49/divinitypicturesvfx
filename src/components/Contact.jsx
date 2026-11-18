import { useState, useEffect, useRef } from 'react';

const serviceLabels = {
  cgi: 'CGI & 3D Animation',
  compositing: 'Compositing',
  matte: 'Matte Painting',
  mocap: 'Motion Capture',
  full: 'Full VFX Pipeline',
  other: 'Other',
};

// Web3Forms API endpoint
const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

// Web3Forms Access Key:
// Configured from .env (VITE_WEB3FORMS_ACCESS_KEY) with direct fallback
const WEB3FORMS_ACCESS_KEY = (
  import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ||
  '0fdb3577-2e81-4eb9-8755-b9561c18da6e'
).trim();

const TARGET_EMAIL = 'connect@divinitypictures.com';

export default function Contact() {
  const sectionRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: '',
  });
  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (status === 'error') setStatus('idle');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage('');

    // If access key is placeholder
    if (!WEB3FORMS_ACCESS_KEY || WEB3FORMS_ACCESS_KEY === 'YOUR_ACCESS_KEY_HERE') {
      setStatus('error');
      setErrorMessage(
        'Web3Forms Access Key is not configured. Please add your key to VITE_WEB3FORMS_ACCESS_KEY in .env, or use the email client button below.'
      );
      return;
    }

    const readableService = serviceLabels[formData.service] || formData.service || 'Not Specified';

    const payload = {
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: `New Project Inquiry from ${formData.name} - Divinity Pictures`,
      from_name: 'Divinity Pictures Contact Form',
      name: formData.name,
      email: formData.email,
      company: formData.company || 'Not Specified',
      service: readableService,
      message: formData.message || 'No additional details provided.',
      replyto: formData.email,
      botcheck: '',
    };

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus('success');
        setFormData({ name: '', email: '', company: '', service: '', message: '' });
      } else {
        throw new Error(result.message || 'Failed to send message via Web3Forms.');
      }
    } catch (err) {
      console.error('Web3Forms submission error:', err);
      setStatus('error');
      setErrorMessage(
        err.message && !err.message.includes('fetch')
          ? `Error: ${err.message}`
          : 'Unable to send message via Web3Forms. Please use the button below to send directly via email.'
      );
    }
  };

  const handleMailtoFallback = () => {
    const readableService = serviceLabels[formData.service] || formData.service || 'Not Specified';
    const subject = encodeURIComponent(`Project Inquiry: ${formData.name} - Divinity Pictures`);
    const body = encodeURIComponent(
      `Full Name: ${formData.name}\n` +
      `Email Address: ${formData.email}\n` +
      `Company / Studio: ${formData.company || 'N/A'}\n` +
      `Requested Service: ${readableService}\n\n` +
      `Project Details:\n${formData.message}`
    );
    window.location.href = `mailto:${TARGET_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="section-padding" ref={sectionRef}>
      <div className="contact-glow"></div>
      <div className="container">
        <div className="contact-layout">
          <div className="contact-info">
            <div>
              <span className="section-label reveal">Get in Touch</span>
              <h2 className="section-title reveal reveal-delay-1">
                Let's Create Something Extraordinary
              </h2>
              <p className="section-subtitle reveal reveal-delay-2">
                Ready to bring your vision to life? Reach out and let's discuss how we can
                elevate your next project.
              </p>
            </div>

            <div className="reveal reveal-delay-3">
              <div className="contact-detail" style={{ marginBottom: 24 }}>
                <span className="material-symbols-outlined">mail</span>
                <a href="mailto:connect@divinitypictures.com">connect@divinitypictures.com</a>
              </div>
              <div className="contact-detail" style={{ marginBottom: 24 }}>
                <span className="material-symbols-outlined">call</span>
                <a href="tel:+919967375578">+91 9967375578</a>
              </div>
              <div className="contact-detail">
                <span className="material-symbols-outlined">location_on</span>
                <p>
                  1201, Shree Krishna Premises co-op. soc.Ltd, opposite Fun republic, Yash Raj lane,
                  New Link Road, Andheri (W). Mumbai-400053
                </p>
              </div>
            </div>

            <div className="social-links reveal reveal-delay-4">
              <a href="https://www.instagram.com/divinitypicturesllp" className="social-link" aria-label="Instagram">
                <svg viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/divinitypicturesvfx/" className="social-link" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              {/* <a href="#" className="social-link" aria-label="Twitter/X">
                <svg viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="#" className="social-link" aria-label="Vimeo">
                <svg viewBox="0 0 24 24">
                  <path d="M23.977 6.416c-.105 2.338-1.739 5.543-4.894 9.609-3.268 4.247-6.026 6.37-8.29 6.37-1.409 0-2.578-1.294-3.553-3.881L5.322 11.4C4.603 8.816 3.834 7.522 3.01 7.522c-.179 0-.806.378-1.881 1.132L0 7.197c1.185-1.044 2.351-2.084 3.501-3.128C5.08 2.701 6.266 1.984 7.055 1.91c1.867-.18 3.016 1.1 3.447 3.838.465 2.953.789 4.789.971 5.507.539 2.45 1.131 3.674 1.776 3.674.502 0 1.256-.796 2.265-2.385 1.004-1.589 1.54-2.797 1.612-3.628.144-1.371-.395-2.061-1.614-2.061-.574 0-1.167.121-1.777.391 1.186-3.868 3.434-5.757 6.762-5.637 2.473.06 3.628 1.664 3.493 4.797l-.013.01z" />
                </svg>
              </a> */}
              <a href="https://www.youtube.com/@DivinityPicturesVFX" className="social-link" aria-label="Youtube">
                <svg viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.376.55A3.016 3.016 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136C4.495 20.5 12 20.5 12 20.5s7.505 0 9.376-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.6 15.5v-7l6.3 3.5-6.3 3.5z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="contact-form-card reveal reveal-delay-2">
            {status === 'success' ? (
              <div className="form-success-state">
                <div className="success-icon-circle">
                  <span className="material-symbols-outlined">check_circle</span>
                </div>
                <h3 className="success-title">Message Sent Successfully!</h3>
                <p className="success-desc">
                  Thank you for reaching out to Divinity Pictures. Your message has been sent to our
                  team at <strong style={{ color: 'var(--beige)' }}>{TARGET_EMAIL}</strong>. We will review
                  your project details and respond shortly.
                </p>
                <button
                  type="button"
                  className="form-submit"
                  onClick={() => setStatus('idle')}
                  style={{ marginTop: 28, maxWidth: '280px' }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {/* Web3Forms Honeypot for spam protection */}
                <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

                {status === 'error' && (
                  <div className="form-error-banner">
                    <div className="form-error-text">
                      <span className="material-symbols-outlined">warning</span>
                      <span>{errorMessage}</span>
                    </div>
                    <button
                      type="button"
                      className="mailto-fallback-btn"
                      onClick={handleMailtoFallback}
                    >
                      <span className="material-symbols-outlined">mail</span>
                      Send via Email Client
                    </button>
                  </div>
                )}

                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    className="form-input"
                    placeholder="Full Name *"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={status === 'sending'}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    className="form-input"
                    placeholder="Email Address *"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={status === 'sending'}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="company"
                    className="form-input"
                    placeholder="Company / Studio"
                    value={formData.company}
                    onChange={handleChange}
                    disabled={status === 'sending'}
                  />
                </div>
                <div className="form-group">
                  <div className="select-wrapper">
                    <select
                      name="service"
                      className="form-select"
                      value={formData.service}
                      onChange={handleChange}
                      disabled={status === 'sending'}
                    >
                      <option value="" disabled>
                        Select Service
                      </option>
                      <option value="cgi">CGI & 3D Animation</option>
                      <option value="compositing">Compositing</option>
                      <option value="matte">Matte Painting</option>
                      <option value="mocap">Motion Capture</option>
                      <option value="full">Full VFX Pipeline</option>
                      <option value="other">Other</option>
                    </select>
                    <span className="material-symbols-outlined">expand_more</span>
                  </div>
                </div>
                <div className="form-group">
                  <textarea
                    name="message"
                    className="form-input"
                    placeholder="Tell us about your project... *"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    required
                    disabled={status === 'sending'}
                  />
                </div>
                <button
                  type="submit"
                  className="form-submit"
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? (
                    <span className="submit-loading">
                      <span className="submit-spinner"></span>
                      Sending Message...
                    </span>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
