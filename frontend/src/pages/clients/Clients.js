// pages/clients/Clients.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SEO from "../../components/SEO/SEO";
import OrderBtn from "../../components/OrderBtn/OrderBtn";

const ClientsPage = () => {
  const [loadedImages, setLoadedImages] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const clients = [
    {
      name: "Роснефть",
      logo: "/images/rosneft.png",
      description: "Крупнейшая нефтяная компания России",
      link: "https://www.rosneft.ru",
    },
    {
      name: "Сбербанк",
      logo: "/images/sber.png",
      description: "Крупнейший банк России и Восточной Европы",
      link: "https://www.sberbank.ru",
    },
    {
      name: "Газпром",
      logo: "/images/gazprom.png",
      description: "Глобальная энергетическая компания",
      link: "https://www.gazprom.ru",
    },
    {
      name: "Яндекс",
      logo: "/images/yandex.png",
      description:
        "Технологическая компания, владеющая одноимённой системой поиска в Сети",
      link: "https://yandex.ru",
    },
    {
      name: "МТС",
      logo: "/images/mts.png",
      description: "Крупнейший российский оператор мобильной связи",
      link: "https://www.mts.ru",
    },
    {
      name: "РЖД",
      logo: "/images/RZD.png",
      description:
        "Российские железные дороги - национальный железнодорожный перевозчик",
      link: "https://www.rzd.ru",
    },
  ];

  useEffect(() => {
    const preloadImages = async () => {
      const promises = clients.map((client) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = client.logo;
          img.onload = () => {
            setLoadedImages((prev) => ({
              ...prev,
              [client.name]: true,
            }));
            resolve();
          };
          img.onerror = () => {
            console.error(`Ошибка загрузки изображения для ${client.name}`);
            setLoadedImages((prev) => ({
              ...prev,
              [client.name]: false,
            }));
            resolve();
          };
        });
      });

      await Promise.all(promises);
      setIsLoading(false);
    };

    preloadImages();
  }, []);

  return (
    <div className="clients-page">
      <SEO
        title="Наши клиенты | Veles IT"
        description="Компании, которые доверяют Veles IT свои IT-проекты. Среди наших клиентов - Роснефть, Сбербанк, Газпром, Яндекс и другие лидеры рынка."
        keywords="Veles IT, клиенты, портфолио, партнеры, IT-услуги, digital-проекты, Роснефть, Сбербанк, Газпром, Яндекс"
      />
      <section className="clients-hero">
        <div className="hero-content">
          <h1>Наши клиенты</h1>
          <p>Компании, которые доверили нам свои digital-проекты</p>
        </div>
      </section>

      <section className="clients-section">
        <div className="section-container">
          <div className="clients-grid" style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 0.5s ease' }}>
            {clients.map((client, index) => (
              <div key={index} className="client-card">
                <div className={`client-logo-container ${loadedImages[client.name] ? 'loaded' : ''}`}>
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="client-logo"
                    style={{
                      opacity: loadedImages[client.name] ? 1 : 0,
                      transition: 'opacity 0.5s ease'
                    }}
                  />
                </div>
                <div className="client-info">
                  <h3>{client.name}</h3>
                  <p>{client.description}</p>
                  <a
                    href={client.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="client-link"
                  >
                    Посетить сайт
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <OrderBtn />
    </div>
  );
};

export default ClientsPage;
