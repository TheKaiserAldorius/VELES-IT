import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { SiTelegram } from "react-icons/si";
import { FaBars, FaTimes, FaEnvelope, FaMapMarkerAlt, FaGlobe } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { Player } from '@lottiefiles/react-lottie-player';
import './Navbar.css';

//анимаций Lottie
import aboutAnimation from '../animations/Home.json';
import servicesAnimation from '../animations/Services.json';
import clientsAnimation from '../animations/Project.json';
import academyAnimation from '../animations/Mortarboard.json';
import villageAnimation from '../animations/planet.json';
import contactAnim   from '../animations/Contact.json';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const [language, setLanguage] = useState('Русский');
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const { user } = useAuth();
  const animationRefs = useRef({});

  const languages = [
    { code: 'brics', name: 'BRICS' },
    { code: 'ru', name: 'Русский' },
    { code: 'en', name: 'English' },
    { code: 'zh', name: '中文' },
    { code: 'ar', name: 'العربية' }
  ];

  const services = [
    { name: "О нас", path: "/aboutus", animation: aboutAnimation, id: "about" },
    { name: "Услуги", path: "/services", animation: servicesAnimation, id: "services" },
    { name: "Клиенты", path: "/clients", animation: clientsAnimation, id: "clients" },
    { name: "Веб-академия", path: "/academy", animation: academyAnimation, id: "academy" },
    { name: "IT деревня", path: "/ItHomes", animation: villageAnimation, id: "village" },
    { name:"Контакты", path: "/Contacts", animation: contactAnim, id: "contact"}
  
  ];

  const handleMouseEnter = (id) => {
    if (animationRefs.current[id]) {
      animationRefs.current[id].play();
    }
  };

  const handleMouseLeave = (id) => {
    if (animationRefs.current[id]) {
      animationRefs.current[id].stop();
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
      if (window.innerWidth >= 992) setIsMenuOpen(false);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLanguageChange = (lang) => {
    setLanguage(lang.name);
    setShowLanguageDropdown(false);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="logo">
            <img src="/logoveles.png" alt="VelesIT Logo" className="logo-image"/>
          </Link>

          <div className="navbar-right-group">
            {!isMobile && (
              <div className="desktop-contacts">
                <div className="contact-item">
                  <FaEnvelope className="contact-icon1"/>
                  <a href="mailto:info@velesit.pro">info@velesit.pro</a>
                </div>
                <div className="contact-item">
                  <SiTelegram className="contact-icon1"/>
                  <a href="tel:+79269128783">+7 926 912 8783</a>
                </div>
              </div>
            )}

            <div className="navbar-controls">
              {user && (
                <Link to="/profile" className="profile-nav-btn">
                  <img 
                    src={user.profile?.avatar || '/default-avatar.png'} 
                    alt="Профиль"
                    className="nav-avatar"
                  />
                  {!isMobile && <span className="profile-text">Профиль</span>}
                </Link>
              )}
              
              <button 
                className="menu-toggle" 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
              >
                {isMenuOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <aside className={`side-menu ${isMobile ? 'mobile' : 'desktop'} ${isMenuOpen ? 'open' : ''}`}>
        <div className="menu-content">
          {isMobile && (
            <div className="mobile-contacts">
              <div className="language-selector mobile">
                <button
                  className="language-toggle"
                  onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                >
                  <FaGlobe className="language-icon"/>
                  <span>{language}</span>
                </button>
                
                {showLanguageDropdown && (
                  <div className="language-dropdown mobile">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        className="language-option"
                        onClick={() => handleLanguageChange(lang)}
                      >
                        {lang.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="contact-item">
                <SiTelegram className="contact-icon"/>
                <a href="tel:+79269128783">+7 926 912 8783</a>
              </div>

              <div className="contact-item">
                <FaEnvelope className="contact-icon"/>
                <a href="mailto:info@velesit.pro">info@velesit.pro</a>
              </div>

              <div className="contact-item">
                <FaMapMarkerAlt className="contact-icon"/>
                <span>г. Москва, ул. Социалистическая д. 88 оф. 302</span>
              </div>
            </div>
          )}
          
          <div className="menu-section">
            {services.map((service) => (
              <Link 
                key={service.id}
                to={service.path}
                className="menu-link"
                onClick={() => isMobile && setIsMenuOpen(false)}
                onMouseEnter={() => handleMouseEnter(service.id)}
                onMouseLeave={() => handleMouseLeave(service.id)}
              >
                <div className="lottie-icon">
                  <Player
                    lottieRef={(instance) => {
                      animationRefs.current[service.id] = instance;
                    }}
                    autoplay={false}
                    loop={false}
                    src={service.animation}
                    style={{ width: '44px', height: '44px' }}
                  />
                </div>
                <span className="menu-link-text">{service.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </aside>

      {isMobile && isMenuOpen && (
        <div 
          className="menu-overlay" 
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
}