import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { SiTelegram } from "react-icons/si";
import {
  FaBars,
  FaTimes,
  FaEnvelope,
  FaMapMarkerAlt,
  FaGlobe,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { Player } from "@lottiefiles/react-lottie-player";

//анимаций Lottie
import aboutAnimation from "../animations/Home.json";
import servicesAnimation from "../animations/Services.json";
import clientsAnimation from "../animations/Project.json";
import academyAnimation from "../animations/Mortarboard.json";
import villageAnimation from "../animations/planet.json";
import contactAnim from "../animations/Contact.json";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const [language, setLanguage] = useState("Русский");
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const { user } = useAuth();
  const animationRefs = useRef({});
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const submenuTimeoutRef = useRef(null);

  const languages = [
    { code: "brics", name: "BRICS" },
    { code: "ru", name: "Русский" },
    { code: "en", name: "English" },
    { code: "zh", name: "中文" },
    { code: "ar", name: "العربية" },
  ];

  const services = [
    { name: "О нас", path: "/aboutus", animation: aboutAnimation, id: "about" },
    {
      name: "Услуги",
      path: "/services",
      animation: servicesAnimation,
      id: "services",
      subServices: [
        { name: "Калькулятор", path: "/calculator" },
        { name: "Лендинги", path: "/landings" },
        { name: "Корпоративные порталы", path: "/portals" },
        { name: "Интернет-магазины", path: "/ecommerce" },
        { name: "Сайты-визитки", path: "/business-cards" },
        { name: "CRM и ERP решения", path: "/crm-erp" },
        { name: "Веб-приложения", path: "/web-apps" },
        { name: "Техническая поддержка сайтов", path: "/support" },
      ],
    },
    {
      name: "Клиенты",
      path: "/clients",
      animation: clientsAnimation,
      id: "clients",
    },
    {
      name: "Веб-академия",
      path: "/academy",
      animation: academyAnimation,
      id: "academy",
    },
    {
      name: "IT деревня",
      path: "/ItHomes",
      animation: villageAnimation,
      id: "village",
    },
    {
      name: "Контакты",
      path: "/Contacts",
      animation: contactAnim,
      id: "contact",
    },
  ];

  const handleScrollToFooter = (event) => {
    const footerElement = document.getElementById("footer");
    if (footerElement) {
      event.preventDefault();
      footerElement.scrollIntoView({ behavior: "smooth" });
      if (isMobile) {
        setIsMenuOpen(false);
      }
    } else {
      if (isMobile) {
        setIsMenuOpen(false);
      }
    }
  };

  const handleMouseEnterService = (id) => {
    if (submenuTimeoutRef.current) {
      clearTimeout(submenuTimeoutRef.current);
    }
    setActiveSubmenu(id);
    if (animationRefs.current[id]) {
      animationRefs.current[id].play();
    }
  };

  const handleMouseLeaveService = (id) => {
    submenuTimeoutRef.current = setTimeout(() => {
      setActiveSubmenu(null);
    }, 200);
    if (animationRefs.current[id]) {
      animationRefs.current[id].stop();
    }
  };

  const handleMouseEnterSubmenu = () => {
    if (submenuTimeoutRef.current) {
      clearTimeout(submenuTimeoutRef.current);
    }
  };

  const handleMouseLeaveSubmenu = () => {
    submenuTimeoutRef.current = setTimeout(() => {
      setActiveSubmenu(null);
    }, 200);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
      if (window.innerWidth >= 992) setIsMenuOpen(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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
            <img
              src="/logoveles.png"
              alt="VelesIT Logo"
              className="logo-image"
            />
          </Link>

          <div className="navbar-right-group">
            {!isMobile && (
              <div className="desktop-contacts">
                <div className="contact-item">
                  <a href="mailto:start@veles-it.pro">start@veles-it.pro</a>
                </div>
                <div className="contact-item color-link">
                  <SiTelegram className="contact-icon1" />
                  <a href="tel:+79169892974">+7 916 989 2974</a>
                </div>
              </div>
            )}

            <div className="navbar-controls">
              {user && (
                <Link to="/profile" className="profile-nav-btn">
                  <img
                    src={user.profile?.avatar || "/default-avatar.png"}
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

      <aside
        className={`side-menu ${isMobile ? "mobile" : "desktop"} ${
          isMenuOpen ? "open" : ""
        }`}
      >
        <div className="menu-content">
          {isMobile && (
            <div className="mobile-contacts">
              {/* <div className="language-selector mobile">
                <button
                  className="language-toggle"
                  onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                >
                  <FaGlobe className="language-icon" />
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
              </div> */}

              <div className="contact-item">
                <SiTelegram className="contact-icon" />
                <a href="tel:+79169892974">+7 916 989 2974</a>
              </div>

              <div className="contact-item">
                <a href="mailto:start@veles-it.pro">start@veles-it.pro</a>
              </div>

              <div className="contact-item">
                <FaMapMarkerAlt className="contact-icon" />
                <span>г. Москва, ул. Социалистическая д. 88 оф. 302</span>
              </div>
            </div>
          )}

          <div className="menu-section">
            {services.map((service) => (
              <div
                key={service.id}
                className="menu-item-wrapper"
                onMouseEnter={() =>
                  service.subServices &&
                  !isMobile &&
                  handleMouseEnterService(service.id)
                }
                onMouseLeave={() =>
                  service.subServices &&
                  !isMobile &&
                  handleMouseLeaveService(service.id)
                }
              >
                <Link
                  to={service.path}
                  className="menu-link"
                  onClick={(e) => {
                    if (service.id === "contact") {
                      handleScrollToFooter(e);
                    } else {
                      if (isMobile) {
                        setIsMenuOpen(false);
                      }
                    }
                  }}
                  onMouseEnter={() =>
                    !service.subServices && handleMouseEnterService(service.id)
                  }
                  onMouseLeave={() =>
                    !service.subServices && handleMouseLeaveService(service.id)
                  }
                >
                  <div className="lottie-icon">
                    <Player
                      lottieRef={(instance) => {
                        animationRefs.current[service.id] = instance;
                      }}
                      autoplay={false}
                      loop={true}
                      src={service.animation}
                      style={{ width: "44px", height: "44px" }}
                    />
                  </div>
                  <span className="menu-link-text">{service.name}</span>
                </Link>

                {service.subServices && !isMobile && (
                  <div
                    className={`submenu services-submenu ${
                      activeSubmenu === service.id ? "active" : ""
                    }`}
                    onMouseEnter={handleMouseEnterSubmenu}
                    onMouseLeave={handleMouseLeaveSubmenu}
                  >
                    {service.subServices.map((subItem) => (
                      <Link
                        key={subItem.name}
                        to={subItem.path}
                        className="submenu-item"
                        onClick={() => setActiveSubmenu(null)}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </aside>

      {isMobile && isMenuOpen && (
        <div className="menu-overlay" onClick={() => setIsMenuOpen(false)} />
      )}
    </>
  );
}
