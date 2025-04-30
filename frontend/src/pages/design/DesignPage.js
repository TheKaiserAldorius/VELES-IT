import React, { useState } from "react";
import SEO from "../../components/SEO/SEO";

const DesignPage = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const [activeTab, setActiveTab] = useState("web");

  const toggleFaq = (id) => {
    setActiveFaq(activeFaq === id ? null : id);
  };

  const designTypes = [
    { id: "web", name: "Веб-дизайн" },
    { id: "mobile", name: "Мобильный дизайн" },
    { id: "branding", name: "Брендинг" },
  ];

  const webDesigns = [
    {
      id: 1,
      title: "Корпоративный сайт",
      description: "Современный дизайн для бизнеса",
      image: "/images/web-design1.jpg",
    },
    {
      id: 2,
      title: "Интернет-магазин",
      description: "Удобный и продающий дизайн",
      image: "/images/web-design2.jpg",
    },
    {
      id: 3,
      title: "Лендинг пейдж",
      description: "Высококонверсионные одностраничники",
      image: "/images/web-design3.jpg",
    },
  ];

  const mobileDesigns = [
    {
      id: 1,
      title: "Мобильное приложение",
      description: "Интуитивно понятный UI/UX",
      image: "/images/mobile-design1.jpg",
    },
    {
      id: 2,
      title: "Адаптивный дизайн",
      description: "Идеальное отображение на всех устройствах",
      image: "/images/mobile-design2.jpg",
    },
  ];

  const brandingDesigns = [
    {
      id: 1,
      title: "Логотип",
      description: "Узнаваемый символ вашего бренда",
      image: "/images/branding1.jpg",
    },
    {
      id: 2,
      title: "Фирменный стиль",
      description: "Единая визуальная концепция",
      image: "/images/branding2.jpg",
    },
    {
      id: 3,
      title: "Полиграфия",
      description: "Дизайн печатной продукции",
      image: "/images/branding3.jpg",
    },
  ];

  const advantages = [
    {
      id: 1,
      title: "Уникальность",
      description: "Каждый проект создается с нуля под ваши задачи",
      icon: "🎨",
    },
    {
      id: 2,
      title: "Современность",
      description: "Используем актуальные тренды и технологии",
      icon: "💎",
    },
    {
      id: 3,
      title: "Функциональность",
      description: "Красота, которая работает на ваш бизнес",
      icon: "⚙️",
    },
  ];

  const faqs = [
    {
      id: 1,
      question: "Сколько стоит дизайн сайта?",
      answer:
        "Стоимость зависит от сложности проекта. Дизайн лендинга - от 30 000 руб., интернет-магазина - от 60 000 руб.",
    },
    {
      id: 2,
      question: "Какие этапы работы?",
      answer: "Бриф → Концепция → Прототип → Дизайн → Подготовка к верстке",
    },
    {
      id: 3,
      question: "Даете ли вы исходники?",
      answer: "Да, после полной оплаты мы передаем все исходные файлы",
    },
  ];

  const getActiveDesigns = () => {
    switch (activeTab) {
      case "web":
        return webDesigns;
      case "mobile":
        return mobileDesigns;
      case "branding":
        return brandingDesigns;
      default:
        return webDesigns;
    }
  };

  return (
    <div className="design-page">
      <SEO
        title="Дизайн | Veles IT"
        description="Профессиональный дизайн от Veles IT: веб-дизайн (сайты, интернет-магазины, лендинги), мобильный дизайн (UI/UX), брендинг (логотипы, фирменный стиль)."
        keywords="Veles IT, дизайн, веб-дизайн, ui, ux, мобильный дизайн, брендинг, логотип, фирменный стиль, дизайн сайтов"
      />
      {/* Hero Section */}
      <section className="design-hero">
        <div className="container">
          <h1 className="design-title">Профессиональный дизайн</h1>
          <p className="design-subtitle">
            Создаем запоминающиеся визуальные решения для вашего бизнеса
          </p>
          <button className="design-cta">Обсудить проект</button>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="design-portfolio">
        <div className="container">
          <h2 className="section-title">Наши работы</h2>
          <p className="section-description">Примеры реализованных проектов</p>

          <div className="tabs">
            {designTypes.map((type) => (
              <button
                key={type.id}
                className={`tab ${activeTab === type.id ? "active" : ""}`}
                onClick={() => setActiveTab(type.id)}
              >
                {type.name}
              </button>
            ))}
          </div>

          <div className="portfolio-grid">
            {getActiveDesigns().map((design, index) => (
              <div
                key={design.id}
                className="portfolio-card"
                style={{ "--order": index }}
              >
                <div className="portfolio-image">
                  <img src={design.image} alt={design.title} />
                  <div className="portfolio-overlay">
                    <h3>{design.title}</h3>
                    <p>{design.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="design-advantages">
        <div className="container">
          <h2 className="section-title">Наш подход к дизайну</h2>

          <div className="advantages-grid">
            {advantages.map((advantage) => (
              <div key={advantage.id} className="advantage-card">
                <div className="advantage-icon">{advantage.icon}</div>
                <h3>{advantage.title}</h3>
                <p>{advantage.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="design-faq">
        <div className="container">
          <h2 className="section-title">Частые вопросы</h2>

          <div className="faq-list">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className={`faq-item ${activeFaq === faq.id ? "active" : ""}`}
              >
                <div className="faq-question" onClick={() => toggleFaq(faq.id)}>
                  <h3>{faq.question}</h3>
                  <span className="toggle-icon">
                    {activeFaq === faq.id ? "−" : "+"}
                  </span>
                </div>

                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="design-cta-section">
        <div className="container">
          <h2>Готовы создать уникальный дизайн?</h2>
          <p>Оставьте заявку и получите бесплатную консультацию</p>
          <button className="design-cta">Оставить заявку</button>
        </div>
      </section>
    </div>
  );
};

export default DesignPage;
