import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Papa from "papaparse";
import { Loader2 } from "lucide-react";
import * as FaIcons from "react-icons/fa";
import SEO from "../../components/SEO/SEO";
import CalculatorBtn from "../../components/CalculatorBtn/CalculatorBtn";
// Маппинг иконок для сервисов
const SERVICE_ICONS = {
  разработка: FaIcons.FaCode,
  ai: FaIcons.FaRobot,
  искусственный: FaIcons.FaRobot,
  блокчейн: FaIcons.FaLink,
  безопасность: FaIcons.FaShieldAlt,
  кибер: FaIcons.FaShieldAlt,
  мобильный: FaIcons.FaMobileAlt,
  аналитика: FaIcons.FaChartLine,
  ecommerce: FaIcons.FaShoppingCart,
  маркетплейс: FaIcons.FaShoppingCart,
  дизайн: FaIcons.FaPalette,
  seo: FaIcons.FaSearchDollar,
  smm: FaIcons.FaHashtag,
  социальный: FaIcons.FaHashtag,
};

const DEFAULT_ICON = FaIcons.FaCode;

const ServicesListPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("/Services_content.csv");
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);

        const text = await response.text();
        Papa.parse(text, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const validServices = results.data.filter(
              (item) => item.slug && item.name
            );
            setServices(validServices);
            setLoading(false);
          },
          error: (error) => {
            throw new Error(`CSV parsing error: ${error.message}`);
          },
        });
      } catch (err) {
        console.error("Failed to load services:", err);
        setError("Не удалось загрузить список услуг");
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const getServiceIcon = (serviceName) => {
    const lowerName = serviceName.toLowerCase();
    const IconComponent =
      Object.entries(SERVICE_ICONS).find(([key]) =>
        lowerName.includes(key)
      )?.[1] || DEFAULT_ICON;

    return <IconComponent className="service-icon" />;
  };

  if (loading) return <LoadingScreen />;
  if (error) return <ErrorScreen message={error} />;

  return (
    <div className="services-list-page">
      <SEO
        title="Наши Услуги | Veles IT"
        description="IT-услуги: веб-разработка, AI, блокчейн, SMM, SEO, дизайн, кибербезопасность"
        keywords="IT услуги, разработка, AI, блокчейн, SMM, SEO, дизайн"
      />

      <ServicesHero />

      <main className="services-main">
        <div className="container">
          <h2 className="section-title">Обзор Услуг</h2>
          <div className="services-grid">
            {services.map((service) => (
              <ServiceCard
                key={service.slug}
                service={service}
                icon={getServiceIcon(service.name)}
              />
            ))}
          </div>
          {services.length === 0 && <NoServicesMessage />}
        </div>
      </main>
      <CalculatorBtn />
    </div>
  );
};

const LoadingScreen = () => (
  <div className="loading-screen">
    <Loader2 className="spinner" />
    <span className="loading-text">Загрузка услуг...</span>
  </div>
);

const ErrorScreen = ({ message }) => (
  <div className="error-screen">
    <span className="error-text">{message}</span>
  </div>
);

const ServicesHero = () => (
  <section className="services-hero">
    <div className="container">
      <h1>Наши Услуги</h1>
      <p className="hero-subtitle">
        Комплексные IT-решения для развития вашего бизнеса
      </p>
    </div>
  </section>
);

const ServiceCard = ({ service, icon }) => (
  <Link to={`/services/${service.slug}`} className="service-card">
    <div className="service-icon-container">{icon}</div>
    <div className="service-content">
      <h3>{service.name}</h3>
      <p className="service-description">{service.description}</p>
      <div className="service-price">от {service.price || ""}</div>
    </div>
    <div className="service-hover-effect"></div>
  </Link>
);

const NoServicesMessage = () => (
  <p className="no-services">Услуги не найдены</p>
);

export default ServicesListPage;
