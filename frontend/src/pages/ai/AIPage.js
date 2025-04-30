import React, { useState } from "react";
import SEO from "../../components/SEO/SEO";

const AIPage = () => {
  const [activeCase, setActiveCase] = useState(null);

  const toggleCase = (id) => {
    setActiveCase(activeCase === id ? null : id);
  };

  const aiCases = [
    {
      id: 1,
      title: "Автоматизация обработки документов",
      client: "Крупный европейский банк",
      solution:
        "Разработали систему на базе NLP для автоматической классификации и обработки 5000+ документов ежедневно",
      result: "Сокращение времени обработки на 70%, экономия $250k/год",
      icon: "📄",
    },
    {
      id: 2,
      title: "Генерация персонализированного видео",
      client: "Международная медиакомпания",
      solution:
        "Внедрили ИИ-систему для автоматического создания персонализированных видео-отчетов для клиентов",
      result:
        "Увеличение вовлеченности на 45%, сокращение затрат на производство",
      icon: "🎥",
    },
    {
      id: 3,
      title: "Интеллектуальный анализ данных в CRM",
      client: "Крупный ритейлер",
      solution:
        "Разработали систему предиктивной аналитики для прогнозирования покупок и персонализации предложений",
      result: "Рост конверсии на 30%, увеличение среднего чека на 15%",
      icon: "📊",
    },
    {
      id: 4,
      title: "Чат-бот с искусственным интеллектом",
      client: "Страховая компания",
      solution:
        "Создали интеллектуального ассистента для обработки запросов клиентов 24/7",
      result: "Снижение нагрузки на кол-центр на 60%, улучшение NPS",
      icon: "💬",
    },
  ];

  return (
    <div className="cyber-page">
      <SEO
        title="Искусственный интеллект (AI) | Veles IT"
        description="Внедрение AI-технологий от Veles IT: автоматизация, анализ данных, машинное обучение, NLP, компьютерное зрение для вашего бизнеса."
        keywords="Veles IT, искусственный интеллект, AI, машинное обучение, NLP, компьютерное зрение, автоматизация, анализ данных"
      />
      {/* Hero Section */}
      <section className="cyber-hero">
        <div className="container">
          <h1>Искусственный интеллект в решениях для бизнеса</h1>
          <p className="subtitle">
            Внедряем передовые AI-технологии для автоматизации процессов,
            анализа данных и улучшения клиентского опыта
          </p>
          <div className="hero-buttons">
            <button className="cyber-button">Обсудить проект</button>
            <button className="cyber-button secondary">Наши технологии</button>
          </div>
          <div className="scroll-indicator">
            <span>↓</span>
          </div>
        </div>
      </section>

      {/* Cases Section */}
      <section className="cyber-services">
        <div className="container">
          <h2>Наши кейсы внедрения ИИ</h2>
          <p className="section-description">
            Реальные примеры реализации искусственного интеллекта для решения
            бизнес-задач
          </p>

          <div className="services-grid">
            {aiCases.map((caseItem) => (
              <div
                key={caseItem.id}
                className={`service-card ${
                  activeCase === caseItem.id ? "active" : ""
                }`}
                onClick={() => toggleCase(caseItem.id)}
              >
                <div className="service-icon">{caseItem.icon}</div>
                <h3>{caseItem.title}</h3>
                <p className="client">{caseItem.client}</p>
                <div className="case-details">
                  <p>
                    <strong>Решение:</strong> {caseItem.solution}
                  </p>
                  <p>
                    <strong>Результат:</strong> {caseItem.result}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="protection-levels">
        <div className="container">
          <h2>Используемые технологии</h2>

          <div className="levels-container">
            <div className="level">
              <div className="level-number">1</div>
              <h3>Машинное обучение</h3>
              <p>Прогнозная аналитика и выявление паттернов в данных</p>
            </div>
            <div className="level">
              <div className="level-number">2</div>
              <h3>Обработка естественного языка</h3>
              <p>
                Анализ и генерация текста, чат-боты, классификация документов
              </p>
            </div>
            <div className="level">
              <div className="level-number">3</div>
              <h3>Компьютерное зрение</h3>
              <p>Распознавание изображений и видео, анализ визуальных данных</p>
            </div>
            <div className="level">
              <div className="level-number">4</div>
              <h3>Генеративный ИИ</h3>
              <p>Создание контента, дизайна и медиа с помощью нейросетей</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cyber-cta">
        <div className="container">
          <div className="cta-content">
            <div className="cta-text">
              <h2>Готовы реализовать ИИ-проект?</h2>
              <p>
                Наши эксперты помогут подобрать оптимальное AI-решение для
                вашего бизнеса
              </p>
              <div className="cta-contacts">
                <p>
                  Консультация: <span>+7 (495) 123-45-67</span>
                </p>
                <p>
                  Email: <span>ai@cyberdev.ru</span>
                </p>
              </div>
            </div>
            <form className="cta-form">
              <div className="form-group">
                <input type="text" placeholder="Ваше имя" required />
              </div>
              <div className="form-group">
                <input type="email" placeholder="Email" required />
              </div>
              <div className="form-group">
                <textarea placeholder="Опишите вашу задачу"></textarea>
              </div>
              <button type="submit" className="cyber-button">
                Отправить запрос
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AIPage;
