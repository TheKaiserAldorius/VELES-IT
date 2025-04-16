import React from 'react';
import './Aboutus.css';
import { Link } from 'react-router-dom';

const Aboutus = () => {
  const values = [
    {
      id: 1,
      title: "Честность",
      description: "Прозрачность во всех аспектах работы. Открытость в коммуникации и честный подход к ценообразованию.",
      icon: "👥"
    },
    {
      id: 2,
      title: "Надежность",
      description: "Гарантируем качество и стабильность работы. Готовы поддерживать и развивать созданные решения.",
      icon: "🛡️"
    },
    {
      id: 3,
      title: "Сотрудничество",
      description: "Видим партнеров в клиентах. Совместное принятие решений и открытый диалог - наш подход.",
      icon: "🤝"
    }
  ];

  return (
    <div className="aboutus-container">
      <div className="aboutus-header">
        <h1>О компании Veles-IT</h1>
        <p className="mission-statement">
          Мы создаем уникальную экосистему, где талантливые профессионалы могут объединяться, 
          развиваться и реализовывать свои идеи.
        </p>
      </div>

      <section className="values-section">
        <h2>Наши ценности</h2>
        <div className="values-grid">
          {values.map((value) => (
            <div key={value.id} className="value-card">
              <div className="value-icon">{value.icon}</div>
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <h3>Хотите узнать больше о нашей работе?</h3>
        <Link to="/contacts" className="cta-button">
            Оставить заявку
          </Link>
      </section>
    </div>
  );
};

export default Aboutus;