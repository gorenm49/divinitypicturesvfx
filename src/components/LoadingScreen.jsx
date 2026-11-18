import { useState, useEffect } from 'react';
import logo from '../assets/logo.webp';

export default function LoadingScreen() {
  const [hidden, setHidden] = useState(false);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        if (prev < 55) return prev + 3;
        if (prev < 85) return prev + 2;
        return prev + 1;
      });
    }, 40);

    const timer = setTimeout(() => {
      setHidden(true);
    }, 2500);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div id="loading-screen" className={hidden ? 'hidden' : ''}>
      <div className="loading-glow"></div>
      <div className="loading-grain"></div>
      <div className="loading-content" style={{ border: '0px solid red' }}>
        <div className='loading-logo' style={{ border: "0px solid blue", display: 'flex', justifyContent: 'center' }}>
          <img src={logo} style={{ width: '150px', height: '150px' }} alt="logo" />
        </div>
        <div className="loading-title">Divinity Pictures</div>
        <div className="loading-subtitle">Visual Effects Studio</div>
        <div className="loading-bar-track">
          <div className="loading-bar-fill"></div>
        </div>
        <div className="loading-percent">{percent}%</div>
      </div>
    </div>
  );
}
