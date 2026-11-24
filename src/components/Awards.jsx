import { useEffect, useRef } from 'react';

const teamMembers = [
  {
    name: 'GOKUL MAHAJAN',
    role: 'Founder – VFX Supervisor',
    initials: 'GM',
    desc: 'Leading creative vision and technical excellence to deliver world-class visual effects and cinematic experiences.',
  },
  {
    name: 'KAPIL MORE',
    role: 'Founder – VFX Supervisor',
    initials: 'KM',
    desc: 'Driving artistic vision, technical innovation, and cinematic excellence in visual effects.',
  },
  {
    name: 'CHETAN MALI',
    role: 'IT Head',
    initials: 'CM',
    desc: 'Leads the organization’s technology strategy, infrastructure, and digital innovation to ensure secure, efficient, and future-ready IT operations.',
  },
  {
    name: 'KAVYA POOJARY',
    role: 'HR / Operations Executive',
    initials: 'KP',
    desc: 'Driving organizational efficiency by seamlessly managing human resources, employee engagement, and day-to-day operational excellence.',
  },
  {
    name: 'YOGESHWARI MAHAJAN',
    role: 'Finance Head',
    initials: 'YM',
    desc: 'Leads financial strategy, planning, budgeting, and financial operations to drive sustainable growth and ensure organizational financial stability.',
  },
];

export default function Awards() {
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
    <section id="awards" className="section-padding about-section" ref={sectionRef}>
      <div className="awards-glow"></div>
      <div className="container">
        {/* Horizontal About Us Area */}
        <div className="about-header-wrap">
          <span className="section-label reveal">Who We Are</span>
          <h2 className="section-title reveal reveal-delay-1">About Us</h2>
          <p className="about-lead reveal reveal-delay-2">
            DIVINITY PICTURES VFX is an award-winning visual effects studio based in Mumbai, India, dedicated to delivering high-quality, visually compelling work for the entertainment industry.
          </p>
        </div>

        <div className="about-columns-grid reveal reveal-delay-3">
          <div className="about-col">
            <p>
              We take pride in bringing together a talented team of artists, technicians, producers, and support professionals who share a passion for creativity, innovation, and storytelling. With a TPN-audited facility, an established VFX pipeline, and an AI-enhanced production workflow, we combine artistic excellence with cutting-edge technology to push creative boundaries and deliver exceptional visual experiences.
            </p>
            <p>
              With experience delivering projects across domestic and international markets, we provide comprehensive visual effects and digital production services for feature films, television, commercials, and web content. Our AI-enhanced pipeline complements our established workflows, enabling us to explore new creative possibilities, optimize production efficiency, and meet the evolving demands of modern filmmaking while maintaining high standards of quality and artistic control.
            </p>
          </div>
          <div className="about-col">
            <p>
              From creative development and technical execution to final delivery, our experienced artists and producers work closely with clients at every stage of production to ensure seamless collaboration, efficient execution, and timely delivery without compromising on quality.
            </p>
            <p>
              At Divinity Pictures, we believe in transforming creative visions into reality through innovation, collaboration, and a commitment to excellence. We continually strive to expand the possibilities of visual storytelling by combining artistic talent, technical expertise, and emerging technologies.
            </p>
          </div>
        </div>

        {/* Horizontal Our Team Area */}
        <div className="team-container">
          <div className="team-header">
            <span className="section-label reveal">Leadership & Core Team</span>
            <h2 className="section-title reveal reveal-delay-1">Our Team</h2>
          </div>

          <div className="team-grid">
            {teamMembers.map((member, i) => (
              <div
                key={member.name}
                className={`team-card reveal reveal-delay-${(i % 5) + 1}`}
              >
                <div className="team-card-shimmer"></div>
                <div className="team-card-top">
                  <div className="team-avatar-ring">
                    <span className="team-initials">{member.initials}</span>
                  </div>
                  <span className="team-role-badge">{member.role}</span>
                </div>
                <h3 className="team-member-name">{member.name}</h3>
                <p className="team-member-desc">{member.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
