import React, { useState } from "react";
import SEO from "../../components/SEO/SEO";

const Blockchain = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Спасибо, ${formData.name}! Мы свяжемся с вами в ближайшее время.`);
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  const faqData = [
    {
      question: "Что такое блокчейн?",
      answer:
        "Блокчейн - это децентрализованная база данных, которая хранит информацию в виде цепочки блоков. Каждый блок содержит набор транзакций и криптографическую ссылку на предыдущий блок, что делает данные практически невозможными для изменения постфактум.",
    },
    {
      question: "Какие бизнес-задачи решает блокчейн?",
      answer:
        "Блокчейн эффективен для: цифровой идентификации, отслеживания цепочек поставок, управления правами на активы, автоматизации контрактов (смарт-контракты), создания систем лояльности и токенизации активов.",
    },
    {
      question: "Сколько стоит разработка блокчейн-решения?",
      answer:
        "Стоимость зависит от сложности проекта, выбранной блокчейн-платформы, необходимости интеграции с существующими системами и масштабируемости решения. Мы предлагаем индивидуальный расчет для каждого проекта после консультации.",
    },
    {
      question: "Какие блокчейн-платформы вы используете?",
      answer:
        "Мы работаем с Ethereum, Hyperledger Fabric, Binance Smart Chain, Solana и другими платформами в зависимости от требований проекта. Для приватных решений используем корпоративные блокчейн-решения.",
    },
    {
      question: "Как долго разрабатывается блокчейн-решение?",
      answer:
        "Сроки варьируются от 2 недель для MVP до 6+ месяцев для комплексных решений. После анализа требований мы предоставляем точные сроки реализации.",
    },
  ];

  const services = [
    {
      title: "Смарт-контракты",
      description:
        "Автоматизация бизнес-процессов с помощью самоисполняющихся контрактов на блокчейне.",
      icon: "📜",
    },
    {
      title: "DApps разработка",
      description:
        "Создание децентрализованных приложений (DApps) с использованием Ethereum, Solana и других платформ.",
      icon: "📱",
    },
    {
      title: "NFT платформы",
      description:
        "Разработка маркетплейсов и инфраструктуры для токенизации цифровых активов.",
      icon: "🖼️",
    },
    {
      title: "Блокчейн-аналитика",
      description: "Анализ блокчейн-транзакций и создание систем мониторинга.",
      icon: "📊",
    },
  ];

  const advantages = [
    {
      icon: "🔒",
      title: "Безопасность",
      description:
        "Криптографическая защита данных и невозможность подделки транзакций",
    },
    {
      icon: "👁️",
      title: "Прозрачность",
      description:
        "Все транзакции записываются в публичный реестр, доступный для проверки",
    },
    {
      icon: "⚡",
      title: "Эффективность",
      description:
        "Автоматизация процессов и сокращение посредников снижают издержки",
    },
    {
      icon: "🌐",
      title: "Децентрализация",
      description:
        "Отсутствие единого центра контроля повышает отказоустойчивость",
    },
  ];

  return (
    <div className="cyber-page">
      <SEO
        title="Блокчейн технологии | Veles IT"
        description="Veles IT: разработка блокчейн-решений - смарт-контракты, DApps, NFT-платформы, блокчейн-аналитика. Безопасность, прозрачность, эффективность."
        keywords="Veles IT, блокчейн, blockchain, разработка, смарт-контракты, dapps, nft, распределенный реестр, ethereum, solana"
      />
      {/* Hero Section */}
      <section className="cyber-hero">
        <div className="container">
          <h1>Блокчейн технологии</h1>
          <p className="subtitle">
            Инновационные решения на основе распределенных реестров для вашего
            бизнеса. Безопасность, прозрачность и децентрализация - основные
            принципы наших решений.
          </p>
          <div className="hero-buttons">
            <button className="cyber-button">Узнать больше</button>
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
          <h2>Наши блокчейн решения</h2>
          <p className="section-description">
            Мы предлагаем комплексные решения на основе блокчейн технологий для
            различных отраслей бизнеса.
          </p>
          <div className="services-grid">
            {services.map((service, index) => (
              <div className="service-card" key={index}>
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
          <h2>Почему блокчейн?</h2>
          <p className="section-description">
            Преимущества технологии распределенного реестра для вашего бизнеса
          </p>
          <div className="levels-container">
            {advantages.map((advantage, index) => (
              <div className="level" key={index}>
                <div className="level-number">{index + 1}</div>
                <div className="advantage-icon">{advantage.icon}</div>
                <h3>{advantage.title}</h3>
                <p>{advantage.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="threat-stats">
        <div className="container">
          <h2>Наши кейсы</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <h3>Финансовый сектор</h3>
              <p>
                Система международных платежей с сокращением времени обработки с
                3 дней до 15 минут
              </p>
              <div className="case-stats">
                <div className="stat">
                  <span>85%</span>
                  <p>Снижение комиссий</p>
                </div>
                <div className="stat">
                  <span>24/7</span>
                  <p>Доступность</p>
                </div>
              </div>
            </div>
            <div className="stat-card">
              <h3>Логистика</h3>
              <p>
                Система отслеживания цепочек поставок с гарантией подлинности
                товаров
              </p>
              <div className="case-stats">
                <div className="stat">
                  <span>99.9%</span>
                  <p>Точность данных</p>
                </div>
                <div className="stat">
                  <span>60%</span>
                  <p>Снижение документооборота</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="cyber-faq">
        <div className="container">
          <h2>Частые вопросы о блокчейне</h2>
          <div className="faq-list">
            {faqData.map((item, index) => (
              <div
                className={`faq-item ${activeFaq === index ? "active" : ""}`}
                key={index}
                onClick={() => toggleFaq(index)}
              >
                <div className="faq-question">
                  <h3>{item.question}</h3>
                  <span className="toggle-icon">
                    {activeFaq === index ? "−" : "+"}
                  </span>
                </div>
                <div className="faq-answer">
                  <p>{item.answer}</p>
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
              <h2>Готовы к внедрению блокчейна?</h2>
              <p>
                Оставьте заявку и наши эксперты помогут вам определить
                оптимальное решение для вашего бизнеса
              </p>
            </div>
            <form className="cta-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Ваше имя"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <textarea
                  name="message"
                  placeholder="Опишите ваш проект"
                  value={formData.message}
                  onChange={handleInputChange}
                ></textarea>
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

export default Blockchain;
