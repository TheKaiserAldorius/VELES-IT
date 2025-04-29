import React, { useState } from "react";
import SEO from "../../components/SEO/SEO";

const SMMPage = () => {
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (id) => {
    setActiveFaq(activeFaq === id ? null : id);
  };

  const services = [
    {
      id: 1,
      title: "Продвижение в Instagram",
      description:
        "Комплексное продвижение бизнеса в Instagram: от оформления профиля до таргетированной рекламы",
      icon: "📱",
    },
    {
      id: 2,
      title: "Ведение Facebook",
      description:
        "Создание и ведение бизнес-страниц, настройка рекламных кампаний и работа с аудиторией",
      icon: "👍",
    },
    {
      id: 3,
      title: "Продвижение в TikTok",
      description:
        "Создание вирусного контента и настройка рекламы для молодой аудитории",
      icon: "🎵",
    },
    {
      id: 4,
      title: "Контент-стратегия",
      description: "Разработка контент-плана и визуального стиля для соцсетей",
      icon: "📝",
    },
  ];

  const advantages = [
    {
      id: 1,
      title: "Охват аудитории",
      description:
        "Увеличиваем охват целевой аудитории с помощью точных инструментов таргетинга",
      icon: "👥",
    },
    {
      id: 2,
      title: "Вовлеченность",
      description:
        "Повышаем вовлеченность подписчиков с помощью интерактивного контента",
      icon: "💬",
    },
    {
      id: 3,
      title: "Конверсии",
      description:
        "Превращаем подписчиков в клиентов с помощью продуманных воронок продаж",
      icon: "💰",
    },
  ];

  const faqs = [
    {
      id: 1,
      question: "Сколько стоит продвижение в соцсетях?",
      answer:
        "Стоимость зависит от платформы и объема работ. Минимальный пакет - от 15 000 руб./месяц",
    },
    {
      id: 2,
      question: "Как быстро появятся первые результаты?",
      answer:
        "Первые результаты видны через 2-3 недели, значительный рост - через 2-3 месяца",
    },
    {
      id: 3,
      question: "Какие соцсети лучше для моего бизнеса?",
      answer:
        "Мы проведем аудит и порекомендуем оптимальные платформы под ваш бизнес",
    },
  ];

  return (
    <div className="smm-page">
      <SEO
        title="SMM продвижение | Veles IT"
        description="Veles IT: SMM продвижение в социальных сетях (Instagram, Facebook, TikTok). Контент-стратегия, таргетированная реклама, увеличение охвата и вовлеченности."
        keywords="Veles IT, smm, продвижение в соцсетях, instagram, facebook, tiktok, таргетированная реклама, контент-маркетинг, социальные сети"
      />
      {/* Hero Section */}
      <section className="smm-hero">
        <div className="container">
          <h1 className="smm-title">Продвижение в социальных сетях</h1>
          <p className="smm-subtitle">
            Увеличиваем продажи и узнаваемость бренда через социальные сети
          </p>
          <button className="smm-cta">Получить консультацию</button>
        </div>
      </section>

      {/* Services Section */}
      <section className="smm-services">
        <div className="container">
          <h2 className="section-title">Наши услуги SMM</h2>
          <p className="section-description">
            Комплексные решения для продвижения в социальных сетях
          </p>

          <div className="services-grid">
            {services.map((service, index) => (
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
      <section className="smm-advantages">
        <div className="container">
          <h2 className="section-title">Почему выбирают нас</h2>

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
      <section className="smm-faq">
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
      <section className="smm-cta-section">
        <div className="container">
          <h2>Готовы увеличить продажи через соцсети?</h2>
          <p>Оставьте заявку и получите бесплатный аудит ваших соцсетей</p>
          <button className="smm-cta">Оставить заявку</button>
        </div>
      </section>
    </div>
  );
};

export default SMMPage;
