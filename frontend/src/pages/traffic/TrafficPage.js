import React, { useState } from "react";
import SEO from "../../components/SEO/SEO";

const TrafficPage = () => {
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (id) => {
    setActiveFaq(activeFaq === id ? null : id);
  };

  const trafficTypes = [
    { id: "seo", name: "SEO-трафик" },
    { id: "context", name: "Контекстная реклама" },
    { id: "social", name: "Социальные сети" },
  ];

  const seoTraffic = [
    {
      id: 1,
      title: "SEO-оптимизация",
      description: "Повышение видимости сайта в органической выдаче",
      icon: "🔍",
    },
    {
      id: 2,
      title: "Контент-маркетинг",
      description: "Создание полезного контента для привлечения аудитории",
      icon: "📝",
    },
  ];

  const contextTraffic = [
    {
      id: 1,
      title: "Яндекс.Директ",
      description: "Настройка и ведение рекламных кампаний",
      icon: "💰",
    },
    {
      id: 2,
      title: "Google Ads",
      description: "Привлечение целевого трафика через поиск и КМС",
      icon: "📈",
    },
  ];

  const socialTraffic = [
    {
      id: 1,
      title: "Таргетированная реклама",
      description: "Точный таргетинг по интересам и поведению",
      icon: "🎯",
    },
    {
      id: 2,
      title: "Ретаргетинг",
      description: "Возврат ушедших посетителей",
      icon: "🔄",
    },
  ];

  const advantages = [
    {
      id: 1,
      title: "Качественный трафик",
      description: "Привлекаем только целевую аудиторию",
      icon: "✅",
    },
    {
      id: 2,
      title: "Аналитика",
      description: "Подробные отчеты по эффективности",
      icon: "📊",
    },
    {
      id: 3,
      title: "Оптимизация бюджета",
      description: "Максимальная эффективность при минимальных затратах",
      icon: "💸",
    },
  ];

  const faqs = [
    {
      id: 1,
      question: "Сколько стоит привлечение трафика?",
      answer:
        "Стоимость зависит от источника трафика и конкурентности ниши. SEO - от 25 000 руб./мес, контекст - от 15 000 руб./мес + бюджет на рекламу",
    },
    {
      id: 2,
      question: "Как быстро появится трафик?",
      answer:
        "Контекстная реклама дает трафик сразу после запуска, SEO - через 1-3 месяца",
    },
    {
      id: 3,
      question: "Какой трафик лучше для моего бизнеса?",
      answer: "Проведем аудит и порекомендуем оптимальные каналы привлечения",
    },
  ];

  const getActiveTraffic = () => {
    switch (activeTab) {
      case "seo":
        return seoTraffic;
      case "context":
        return contextTraffic;
      case "social":
        return socialTraffic;
      default:
        return seoTraffic;
    }
  };

  const [activeTab, setActiveTab] = useState("seo");

  return (
    <div className="traffic-page">
      <SEO
        title="Привлечение трафика | Veles IT"
        description="Увеличим поток целевых посетителей на ваш сайт. Veles IT предлагает SEO, контекстную рекламу (Яндекс.Директ, Google Ads), таргетированную рекламу в соцсетях."
        keywords="Veles IT, привлечение трафика, seo, контекстная реклама, яндекс директ, google ads, таргетированная реклама, smm, интернет-маркетинг"
      />
      {/* Hero Section */}
      <section className="traffic-hero">
        <div className="container">
          <h1 className="traffic-title">Привлечение трафика</h1>
          <p className="traffic-subtitle">
            Увеличиваем поток целевых посетителей на ваш сайт
          </p>
          <button className="traffic-cta">Получить анализ трафика</button>
        </div>
      </section>

      {/* Services Section */}
      <section className="traffic-services">
        <div className="container">
          <h2 className="section-title">Наши решения</h2>
          <p className="section-description">
            Эффективные каналы привлечения целевого трафика
          </p>

          <div className="tabs">
            {trafficTypes.map((type) => (
              <button
                key={type.id}
                className={`tab ${activeTab === type.id ? "active" : ""}`}
                onClick={() => setActiveTab(type.id)}
              >
                {type.name}
              </button>
            ))}
          </div>

          <div className="services-grid">
            {getActiveTraffic().map((service, index) => (
              <div
                key={service.id}
                className="service-card"
                style={{ "--order": index }}
              >
                <div className="service-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="traffic-advantages">
        <div className="container">
          <h2 className="section-title">Наши преимущества</h2>

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
      <section className="traffic-faq">
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
      <section className="traffic-cta-section">
        <div className="container">
          <h2>Готовы увеличить поток клиентов?</h2>
          <p>Оставьте заявку и получите бесплатный аудит трафика</p>
          <button className="traffic-cta">Оставить заявку</button>
        </div>
      </section>
    </div>
  );
};

export default TrafficPage;
