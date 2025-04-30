import React from "react";
import { Link } from "react-router-dom";
import SEO from "../../components/SEO/SEO";
import * as FaIcons from "react-icons/fa";

const CASE_ICONS = {
  "веб-разработка": FaIcons.FaCode,
  дизайн: FaIcons.FaPalette,
  "ux/ui": FaIcons.FaObjectGroup,
  "мобильная разработка": FaIcons.FaMobileAlt,
  безопасность: FaIcons.FaShieldAlt,
  cloud: FaIcons.FaCloud,
  "искусственный интеллект": FaIcons.FaRobot,
  ai: FaIcons.FaRobot,
  логистика: FaIcons.FaTruckLoading,
  "e-commerce": FaIcons.FaShoppingCart,
  масштабируемость: FaIcons.FaExpandAlt,
  "big data": FaIcons.FaDatabase,
  аналитика: FaIcons.FaChartLine,
};

const DEFAULT_CASE_ICON = FaIcons.FaBriefcase;

const getCaseIcon = (tags) => {
  const lowerTags = tags.map((tag) => tag.toLowerCase());
  for (const tag of lowerTags) {
    if (CASE_ICONS[tag]) {
      const IconComponent = CASE_ICONS[tag];
      return <IconComponent className="case-icon" />;
    }
  }

  for (const tag of lowerTags) {
    const foundEntry = Object.entries(CASE_ICONS).find(([key]) =>
      tag.includes(key)
    );
    if (foundEntry) {
      const IconComponent = foundEntry[1];
      return <IconComponent className="case-icon" />;
    }
  }

  return <DEFAULT_CASE_ICON className="case-icon" />;
};

const CasesPage = () => {
  const cases = [
    {
      title: "Корпоративный сайт для нефтяной компании",
      description:
        "Разработали современный корпоративный портал с системой управления контентом",
      tags: ["Веб-разработка", "Дизайн", "UX/UI"],
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d",
      result: "Увеличение конверсии на 35%",
    },
    {
      title: "Мобильное приложение для банка",
      description:
        "Создали кроссплатформенное мобильное приложение с биометрической авторизацией",
      tags: ["Мобильная разработка", "Безопасность"],
      image: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6",
      result: "1M+ скачиваний за первый месяц",
    },
    {
      title: "AI для логистики",
      description:
        "Внедрили систему искусственного интеллекта для оптимизации маршрутов доставки",
      tags: ["Искусственный интеллект", "Логистика"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
      result: "Сокращение затрат на 25%",
    },
    {
      title: "Облачное хранилище",
      description:
        "Разработали защищенное облачное решение для хранения медицинских данных",
      tags: ["Cloud", "Безопасность"],
      image: "https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9",
      result: "99.9% uptime",
    },
    {
      title: "Платформа для электронной коммерции",
      description: "Создали масштабируемую платформу для международных продаж",
      tags: ["E-commerce", "Масштабируемость"],
      image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df",
      result: "Рост продаж на 200%",
    },
    {
      title: "Система аналитики для ритейла",
      description: "Разработали систему сбора и анализа данных о покупателях",
      tags: ["Big Data", "Аналитика"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
      result: "Точность прогнозов 92%",
    },
  ];

  return (
    <div className="cases-page">
      <SEO
        title="Кейсы | Veles IT"
        description="Примеры реализованных проектов Veles IT: разработка сайтов, мобильных приложений, AI-решений, облачных хранилищ. Ознакомьтесь с нашими кейсами."
        keywords="Veles IT, кейсы, портфолио, проекты, веб-разработка, мобильная разработка, ai, cloud, e-commerce, big data"
      />

      <section className="cases-hero">
        <div className="hero-content">
          <h1>Наши кейсы</h1>
          <p>Реальные проекты с измеримыми результатами</p>
        </div>
      </section>

      <section className="cases-section">
        <div className="section-container">
          <div className="cases-header">
            <h2>Реализованные проекты</h2>
            <p className="section-subtitle">
              Каждый проект - это уникальное решение под конкретные задачи
              клиента
            </p>
          </div>

          <div className="cases-grid">
            {cases.map((caseItem, index) => (
              <div key={index} className="case-card">
                <div className="case-icon-container">
                  {getCaseIcon(caseItem.tags)}
                </div>
                <div className="case-content">
                  <h3>{caseItem.title}</h3>
                  <p>{caseItem.description}</p>
                  <div className="case-result">
                    <strong>Результат:</strong> {caseItem.result}
                  </div>
                  <div className="case-tags">
                    {caseItem.tags.map((tag, index) => (
                      <span key={index} className="case-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="section-container">
          <h2>Хотите такой же результат?</h2>
          <p>Оставьте заявку и мы обсудим ваш проект</p>
          <Link to="/contacts" className="cta-button">
            Обсудить проект
          </Link>
        </div>
      </section>
    </div>
  );
};

export default CasesPage;
