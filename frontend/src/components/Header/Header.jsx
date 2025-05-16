import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import "./Header.css";

export default function Header() {
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  const services = [
    {
      name: "Калькулятор",
      path: "/calculator",
    },
    {
      name: "Лендинги",
      path: "/services/landings",
    },
    {
      name: "Корпоративные порталы",
      path: "/services/portals",
    },
    {
      name: "Интернет-магазины",
      path: "/services/ecommerce",
    },
    {
      name: "Сайты-визитки",
      path: "/services/business-cards",
    },
    {
      name: "CRM и ERP решения",
      path: "/services/crm-erp",
    },
    {
      name: "Веб-приложения",
      path: "/services/web-apps",
    },
    {
      name: "Техническая поддержка сайтов",
      path: "/services/support",
    },
  ];

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <img src="/logoveles.png" alt="VelesIT Logo" className="logo-image" />
        </Link>

        <nav className="top-nav">
          <Link to="/" className="top-nav-link">
            Главная
          </Link>
          <div
            className="top-nav-dropdown"
            onMouseEnter={() => setActiveSubmenu("services")}
            onMouseLeave={() => setActiveSubmenu(null)}
          >
            <Link to="/services" className="top-nav-link dropdown-toggle">
              Услуги{" "}
              <FaChevronDown
                className={`dropdown-icon ${
                  activeSubmenu === "services" ? "rotated" : ""
                }`}
              />
            </Link>
            {activeSubmenu === "services" && (
              <div className="top-nav-dropdown-menu">
                {services.map((service) => (
                  <Link
                    key={service.path}
                    to={service.path}
                    className="top-nav-dropdown-item"
                  >
                    {service.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link to="/clients" className="top-nav-link">
            Клиенты
          </Link>
          <Link to="/Contacts" className="top-nav-link">
            Контакты
          </Link>
        </nav>
      </div>
    </header>
  );
}
