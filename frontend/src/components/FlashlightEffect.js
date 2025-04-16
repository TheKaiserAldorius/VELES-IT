import React, { useEffect, useRef } from 'react';
import './FlashlightEffect.css';

const FlashlightEffect = () => {
  const spotlightRef = useRef(null);
  const heroSectionRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const spotlight = spotlightRef.current;
      const heroSection = heroSectionRef.current;
      
      if (spotlight && heroSection) {
        const heroRect = heroSection.getBoundingClientRect();
        // Рассчитываем позицию относительно hero-section
        const x = e.clientX - heroRect.left;
        const y = e.clientY - heroRect.top;
        
        spotlight.style.setProperty('--x', `${x}px`);
        spotlight.style.setProperty('--y', `${y}px`);
      }
    };

    const heroSection = heroSectionRef.current;
    heroSection?.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      heroSection?.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="hero-spotlight-container" ref={heroSectionRef}>
      <div className="spotlight" ref={spotlightRef} />
    </div>
  );
};

export default FlashlightEffect;