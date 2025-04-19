// pages/clients/Clients.js
import React from 'react';
import { Link } from 'react-router-dom';

const ClientsPage = () => {
  const clients = [
    {
      name: "Роснефть",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Rosneft_Logo.svg/1200px-Rosneft_Logo.svg.png",
      description: "Крупнейшая нефтяная компания России",
      link: "https://www.rosneft.ru"
    },
    {
      name: "Сбербанк",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Sberbank_Logo_2020.svg/1200px-Sberbank_Logo_2020.svg.png",
      description: "Крупнейший банк России и Восточной Европы",
      link: "https://www.sberbank.ru"
    },
    {
      name: "Газпром",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Gazprom-Logo.svg/1200px-Gazprom-Logo.svg.png",
      description: "Глобальная энергетическая компания",
      link: "https://www.gazprom.ru"
    },
    {
      name: "Яндекс",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Yandex.svg/1200px-Yandex.svg.png",
      description: "Технологическая компания, владеющая одноимённой системой поиска в Сети",
      link: "https://yandex.ru"
    },
    {
      name: "МТС",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/MTS_logo_2016.svg/1200px-MTS_logo_2016.svg.png",
      description: "Крупнейший российский оператор мобильной связи",
      link: "https://www.mts.ru"
    },
    {
      name: "РЖД",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/RZD_logo_2016.svg/1200px-RZD_logo_2016.svg.png",
      description: "Российские железные дороги - национальный железнодорожный перевозчик",
      link: "https://www.rzd.ru"
    }
  ];

  return (
    <div className="clients-page">
      <section className="clients-hero">
        <div className="hero-content">
          <h1>Наши клиенты</h1>
          <p>Компании, которые доверили нам свои digital-проекты</p>
        </div>
      </section>

      <section className="clients-section">
        <div className="section-container">
          <div className="clients-header">
            <h2>С кем мы работаем</h2>
            <p className="section-subtitle">Ведущие компании в своих отраслях</p>
          </div>
          
          <div className="clients-grid">
            {clients.map((client, index) => (
              <div key={index} className="client-card">
                <div className="client-logo-container">
                  <img 
                    src={client.logo} 
                    alt={client.name} 
                    className="client-logo"
                    onError={(e) => {
                      e.target.onerror = null; 
                      e.target.src = "https://via.placeholder.com/150x80?text=No+Logo";
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
                    Посетить сайт →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="section-container">
          <h2>Хотите стать нашим клиентом?</h2>
          <p>Оставьте заявку и мы свяжемся с вами для обсуждения проекта</p>
          <Link to="/contacts" className="cta-button">
            Оставить заявку
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ClientsPage;