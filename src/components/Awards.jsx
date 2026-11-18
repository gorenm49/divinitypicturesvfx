import { useEffect, useRef } from 'react';

const stats = [
  { number: '150+', label: 'Projects Delivered' },
  { number: '45+', label: 'Industry Awards' },
  { number: '12', label: 'Years of Excellence' },
  { number: '200+', label: 'Artists Worldwide' },
];

const timeline = [

  {
    year: 'Founder– VFX Supervisor',
    icon: 'emoji_events',
    title: 'GOKUL MAHAJAN',
    desc: 'Leading creative vision and technical excellence to deliver world-class visual effects and cinematic experiences.',
  },
  {
    year: 'Founder– VFX Supervisor',
    icon: 'emoji_events',
    title: 'KAPIL MORE',
    desc: 'Driving artistic vision, technical innovation, and cinematic excellence in visual effects.',
  },
  {
    year: 'Studio Manager',
    icon: 'emoji_events',
    title: 'SURESH KUMAWAT',
    desc: 'Driving studio excellence through strategic leadership, seamless operations, creative coordination, and high-quality project delivery.',
  },

  {
    year: 'IT Head',
    icon: 'emoji_events',
    title: 'CHETAN MALI',
    desc: 'Leads the organization’s technology strategy, infrastructure, and digital innovation to ensure secure, efficient, and future-ready IT operations.',
  },

  {
    year: 'HR/Operations Executive',
    icon: 'emoji_events',
    title: 'KAVYA POOJARY',
    desc: 'Driving organizational efficiency by seamlessly managing human resources, employee engagement, and day-to-day operational excellence.',
  },

  {
    year: 'Finance Head',
    icon: 'emoji_events',
    title: 'YOGESHWARI MAHAJAN',
    desc: 'Leads financial strategy, planning, budgeting, and financial operations to drive sustainable growth and ensure organizational financial stability.',
  },




  //This is fake award don't use this
  // {
  //   year: '2024',
  //   icon: 'emoji_events',
  //   title: 'Academy Award — Best Visual Effects',
  //   desc: 'Recognized for groundbreaking work on "Echoes of Eternity" at the 96th Academy Awards.',
  // },
  // {
  //   year: '2023',
  //   icon: 'workspace_premium',
  //   title: 'BAFTA — Outstanding British Film VFX',
  //   desc: 'Honored for exceptional visual effects artistry in "Quantum Rift" television series.',
  // },
  // {
  //   year: '2022',
  //   icon: 'military_tech',
  //   title: 'VES Award — Outstanding CG Character',
  //   desc: 'Our creature team set new standards for digital character creation in "Genesis Protocol".',
  // },
  // {
  //   year: '2021',
  //   icon: 'star',
  //   title: 'HPA Award — Outstanding Visual Effects',
  //   desc: 'Pioneering real-time VFX workflows that redefined the production pipeline.',
  // },
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
    <section id="awards" className="section-padding" ref={sectionRef}>
      <div className="awards-glow"></div>
      <div className="container">
        <div className="awards-layout" style={{ border: "0px solid red" }}>
          <div className="awards-left" style={{ border: "0px solid red" }}>
            <span className="section-label reveal">Recognition</span>
            <h2 className="section-title reveal reveal-delay-1">
              About Us
            </h2>
            <p className="section-subtitle reveal reveal-delay-2" style={{ textAlign: "justify" }}>
              DIVINITY PICTURES VFX is an award-winning visual effects studio based in Mumbai, India, dedicated to delivering high-quality, visually compelling work for the entertainment industry.<br /><br />

              We take pride in bringing together a talented team of artists, technicians, producers, and support professionals who share a passion for creativity, innovation, and storytelling. With a TPN-audited facility, an established VFX pipeline, and an AI-enhanced production workflow, we combine artistic excellence with cutting-edge technology to push creative boundaries and deliver exceptional visual experiences.<br /><br />

              With experience delivering projects across domestic and international markets, we provide comprehensive visual effects and digital production services for feature films, television, commercials, and web content. Our AI-enhanced pipeline complements our established workflows, enabling us to explore new creative possibilities, optimize production efficiency, and meet the evolving demands of modern filmmaking while maintaining high standards of quality and artistic control.<br /><br />

              From creative development and technical execution to final delivery, our experienced artists and producers work closely with clients at every stage of production to ensure seamless collaboration, efficient execution, and timely delivery without compromising on quality.<br /><br />

              At Divinity Pictures, we believe in transforming creative visions into reality through innovation, collaboration, and a commitment to excellence. We continually strive to expand the possibilities of visual storytelling by combining artistic talent, technical expertise, and emerging technologies.<br /><br />

            </p>

            {/* <div className="stats-grid" style={{ border: "0px solid red" }}>
              {stats.map((stat, i) => (
                <div key={stat.label} className={`stat-item reveal reveal-delay-${i + 3}`}>
                  <span className="stat-number">{stat.number}</span>
                  <span className="stat-label">{stat.label}</span>
                  <div className="stat-line"></div>
                </div>
              ))}
            </div> */}
          </div>

          <div className="awards-right">
            <div className="timeline">
              <div className="timeline-line"></div>
              {timeline.map((entry, i) => (
                <div key={entry.year + entry.title} className={`timeline-entry reveal reveal-delay-${i + 1}`}>
                  <div className="timeline-dot">
                    <span className="material-symbols-outlined">{entry.icon}</span>
                  </div>
                  <div className="timeline-card">
                    <div className="timeline-year">{entry.year}</div>
                    <h3 className="timeline-title">{entry.title}</h3>
                    <p className="timeline-desc">{entry.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
