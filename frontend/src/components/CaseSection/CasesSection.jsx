import React from "react";
import { Link } from "react-router-dom";
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
  if (!Array.isArray(tags)) {
    console.error("getCaseIcon ожидает массив тегов, получено:", tags);
    return <DEFAULT_CASE_ICON className="case-icon" />;
  }
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

const placeholderCases = [
  {
    id: 1,
    title: "Корпоративный сайт для нефтяной компании",
    description:
      "Разработали современный корпоративный портал с системой управления контентом",
    tags: ["Веб-разработка", "Дизайн", "UX/UI"],
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d",
    result: "Увеличение конверсии на 35%",
  },
  {
    id: 2,
    title: "Мобильное приложение для банка",
    description:
      "Создали кроссплатформенное мобильное приложение с биометрической авторизацией",
    tags: ["Мобильная разработка", "Безопасность"],
    image: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6",
    result: "1M+ скачиваний за первый месяц",
  },
  {
    id: 3,
    title: "AI для логистики",
    description:
      "Внедрили систему искусственного интеллекта для оптимизации маршрутов доставки",
    tags: ["Искусственный интеллект", "Логистика"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
    result: "Сокращение затрат на 25%",
  },
];

const CasesSection = () => {
  return (
    <section className="cases-section">
      <div className="container">
        <h2 className="section-title">Наши Кейсы</h2>
        <div className="cases-grid">
          {placeholderCases.map((caseItem) => (
            <div key={caseItem.id} className="case-card">
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
        <div className="cases-view-all-container">
          <Link to="/cases" className="cta-button">
            Посмотреть все кейсы
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CasesSection;
