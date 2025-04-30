import React, { useState } from "react";
import SEO from "../../components/SEO/SEO";

const DevPage = () => {
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (id) => {
    setActiveFaq(activeFaq === id ? null : id);
  };

  const services = [
    {
      id: 1,
      title: "Лендинги и промо-сайты",
      description:
        "Производим одностраничные сайты для презентации продуктов или услуг",
      icon: "🖥️",
    },
    {
      id: 2,
      title: "Интернет-магазины",
      description:
        "Разрабатываем платформы для онлайн-продаж с удобным каталогом и системой оплаты",
      icon: "🛒",
    },
    {
      id: 3,
      title: "Корпоративные сайты",
      description:
        "Создаём представительства компаний в интернете, которые повышают доверие клиентов",
      icon: "🏢",
    },
    {
      id: 4,
      title: "Веб-приложения",
      description:
        "Разрабатываем сложные интерактивные решения для специфических задач вашего бизнеса",
      icon: "⚙️",
    },
  ];

  const advantages = [
    {
      id: 1,
      title: "Уникальность",
      description:
        "Разрабатываем исключительные решения, учитывая специфику вашего бизнеса",
      icon: "✨",
    },
    {
      id: 2,
      title: "Комплексный сервис",
      description: "Полный цикл услуг разработки от анализа до поддержки",
      icon: "🔄",
    },
    {
      id: 3,
      title: "Опытная команда",
      description: "Специалисты с многолетним опытом в веб-разработке",
      icon: "👨‍💻",
    },
  ];

  const steps = [
    {
      id: 1,
      title: "Анализ и планирование",
      description: "Изучаем ваш бизнес, определяем цели",
    },
    {
      id: 2,
      title: "Проектирование",
      description: "Создаём прототипы и структуру сайта",
    },
    {
      id: 3,
      title: "Дизайн",
      description: "Разрабатываем уникальный визуальный стиль",
    },
    {
      id: 4,
      title: "Разработка",
      description: "Программируем функционал и интегрируем сервисы",
    },
    {
      id: 5,
      title: "Тестирование",
      description: "Проверяем работу на различных устройствах",
    },
    {
      id: 6,
      title: "Запуск и поддержка",
      description: "Размещаем сайт и обеспечиваем работу",
    },
  ];

  const faqs = [
    {
      id: 1,
      question: "Сколько времени занимает разработка сайта?",
      answer: "Лендинг - 1-2 недели, интернет-магазин - от 1 месяца",
    },
    {
      id: 2,
      question: "Предоставляете ли услуги по продвижению?",
      answer: "Да, включая SEO-оптимизацию и маркетинговое продвижение",
    },
    {
      id: 3,
      question: "Какие технологии вы используете?",
      answer: "React, Vue, Node.js, Laravel и другие современные технологии",
    },
  ];

  return (
    <div className="cyber-page">
      <SEO
        title="Веб-разработка | Veles IT"
        description="Veles IT: комплексная веб-разработка сайтов - лендинги, интернет-магазины, корпоративные сайты, веб-приложения. Уникальные решения, полный цикл услуг."
        keywords="Veles IT, веб-разработка, разработка сайтов, создание сайтов, лендинг, интернет-магазин, корпоративный сайт, веб-приложения, react, vue, nodejs"
      />
      {/* Hero Section */}
      <section className="cyber-hero">
        <div className="container">
          <h1>Комплексная веб-разработка для вашего бизнеса</h1>
          <p className="subtitle">
            Создаём современные и эффективные веб-решения, которые помогают
            вашему бизнесу расти
          </p>
          <div className="hero-buttons">
            <button className="cyber-button">Связаться с нами</button>
            <button className="cyber-button secondary">Наши проекты</button>
          </div>
          <div className="scroll-indicator">
            <span>↓</span>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="cyber-services">
        <div className="container">
          <h2>Мы умеем разрабатывать</h2>
          <p className="section-description">
            Полный спектр услуг по разработке веб-сайтов любой сложности
          </p>

          <div className="services-grid">
            {services.map((service) => (
              <div key={service.id} className="service-card">
                <div className="service-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <button className="service-button">Подробнее →</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="protection-levels">
        <div className="container">
          <h2>Преимущества работы с нами</h2>

          <div className="levels-container">
            {advantages.map((advantage) => (
              <div key={advantage.id} className="level">
                <div className="level-number">{advantage.id}</div>
                <div className="advantage-icon">{advantage.icon}</div>
                <h3>{advantage.title}</h3>
                <p>{advantage.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="threat-stats">
        <div className="container">
          <h2>Этапы работы</h2>

          <div className="stats-grid">
            {steps.map((step) => (
              <div key={step.id} className="stat-card">
                <div className="stat-value">{step.id}</div>
                <div className="stat-content">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="cyber-faq">
        <div className="container">
          <h2>Часто задаваемые вопросы</h2>

          <div className="faq-list">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className={`faq-item ${activeFaq === faq.id ? "active" : ""}`}
                onClick={() => toggleFaq(faq.id)}
              >
                <div className="faq-question">
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
      <section className="cyber-cta">
        <div className="container">
          <div className="cta-content">
            <div className="cta-text">
              <h2>Готовы обсудить ваш проект?</h2>
              <p>
                Оставьте заявку и мы свяжемся с вами для бесплатной консультации
              </p>
              <div className="cta-contacts">
                <p>
                  Телефон: <span>+7 (495) 123-45-67</span>
                </p>
                <p>
                  Email: <span>dev@cyberdev.ru</span>
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
                <textarea placeholder="Опишите ваш проект"></textarea>
              </div>
              <button type="submit" className="cyber-button">
                Отправить заявку
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DevPage;
