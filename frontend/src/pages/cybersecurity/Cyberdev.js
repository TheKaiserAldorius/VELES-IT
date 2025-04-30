import React, { useState } from "react";
import SEO from "../../components/SEO/SEO";

const Cyberdev = () => {
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
    alert(
      `Спасибо, ${formData.name}! Наши специалисты по кибербезопасности свяжутся с вами в ближайшее время.`
    );
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  const faqData = [
    {
      question: "Какие основные угрозы кибербезопасности существуют?",
      answer:
        "Основные угрозы включают фишинг, malware-атаки, DDoS-атаки, утечки данных, атаки на IoT устройства и криптоджекинг. Мы помогаем защититься от всех этих угроз.",
    },
    {
      question: "Как часто нужно обновлять системы защиты?",
      answer:
        "Киберзащита требует постоянного обновления. Мы рекомендуем ежемесячные аудиты безопасности и немедленное применение критических обновлений.",
    },
    {
      question: "Что включает в себя пентест?",
      answer:
        "Тестирование на проникновение (пентест) включает анализ уязвимостей, попытки взлома, социальную инженерию и составление подробного отчета с рекомендациями.",
    },
    {
      question: "Как защитить данные в облаке?",
      answer:
        "Мы используем многофакторную аутентификацию, end-to-end шифрование, регулярные бэкапы и строгий контроль доступа для защиты облачных данных.",
    },
    {
      question: "Что делать при обнаружении взлома?",
      answer:
        "Немедленно изолируйте пораженные системы, смените все пароли, обратитесь к специалистам по цифровой криминалистике и сообщите регуляторам, если затронуты персональные данные.",
    },
  ];

  const services = [
    {
      title: "Аудит безопасности",
      description:
        "Комплексная проверка вашей ИТ-инфраструктуры на уязвимости и потенциальные точки взлома.",
      icon: "🔍",
    },
    {
      title: "Защита от DDoS",
      description:
        "Многоуровневая система защиты от распределенных атак типа «отказ в обслуживании».",
      icon: "🛡️",
    },
    {
      title: "Шифрование данных",
      description:
        "Внедрение современных криптографических алгоритмов для защиты конфиденциальной информации.",
      icon: "🔐",
    },
    {
      title: "Обучение сотрудников",
      description:
        "Тренинги по кибербезопасности и противодействию социальной инженерии для вашей команды.",
      icon: "🎓",
    },
    {
      title: "Мониторинг угроз",
      description:
        "Круглосуточный мониторинг и оперативное реагирование на инциденты безопасности.",
      icon: "👁️",
    },
    {
      title: "ИБ-консалтинг",
      description:
        "Разработка политик и регламентов информационной безопасности для вашей компании.",
      icon: "📋",
    },
  ];

  const threats = [
    {
      name: "Фишинг",
      percentage: 78,
      description: "Атаки через поддельные письма и сайты",
    },
    {
      name: "Вредоносное ПО",
      percentage: 65,
      description: "Вирусы, трояны, ransomware",
    },
    {
      name: "Утечки данных",
      percentage: 53,
      description: "Несанкционированный доступ к конфиденциальным данным",
    },
    {
      name: "DDoS",
      percentage: 42,
      description: "Атаки на доступность сервисов",
    },
  ];

  return (
    <div className="cyber-page">
      <SEO
        title="Кибербезопасность | Veles IT"
        description="Veles IT: комплексные услуги кибербезопасности - аудит, защита от DDoS, шифрование, обучение сотрудников, мониторинг угроз, пентест, ИБ-консалтинг."
        keywords="Veles IT, кибербезопасность, информационная безопасность, аудит безопасности, защита ddos, шифрование, пентест, фишинг, malware"
      />
      {/* Hero Section */}
      <section className="cyber-hero">
        <div className="container">
          <h1>Кибербезопасность в цифровую эпоху</h1>
          <p className="subtitle">
            Полный спектр услуг по защите вашего бизнеса от современных
            киберугроз. Проактивная защита вместо реагирования на инциденты.
          </p>
          <div className="hero-buttons">
            <button className="cyber-button">Заказать аудит</button>
            <button className="cyber-button secondary">
              Экстренная помощь
            </button>
          </div>
          <div className="scroll-indicator">
            <span>↓</span>
          </div>
        </div>
      </section>

      {/* Threat Stats */}
      <section className="threat-stats">
        <div className="container">
          <h2>Современный ландшафт киберугроз</h2>
          <p className="section-description">
            Статистика последних атак по данным нашего центра мониторинга угроз
          </p>
          <div className="stats-grid">
            {threats.map((threat, index) => (
              <div className="stat-card" key={index}>
                <div className="stat-header">
                  <h3>{threat.name}</h3>
                  <span className="percentage">{threat.percentage}%</span>
                </div>
                <p>{threat.description}</p>
                <div className="stat-bar">
                  <div
                    className="bar-fill"
                    style={{ width: `${threat.percentage}%` }}
                    data-percentage={threat.percentage}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="cyber-services">
        <div className="container">
          <h2>Наши услуги по кибербезопасности</h2>
          <p className="section-description">
            Комплексные решения для защиты на всех уровнях ИТ-инфраструктуры
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

      {/* Protection Levels */}
      <section className="protection-levels">
        <div className="container">
          <h2>Многоуровневая система защиты</h2>
          <div className="levels-container">
            <div className="level">
              <div className="level-number">1</div>
              <h3>Превентивная защита</h3>
              <p>Firewall, антивирусы, системы обнаружения вторжений</p>
            </div>
            <div className="level">
              <div className="level-number">2</div>
              <h3>Мониторинг</h3>
              <p>Круглосуточный анализ угроз и подозрительной активности</p>
            </div>
            <div className="level">
              <div className="level-number">3</div>
              <h3>Реагирование</h3>
              <p>Оперативное устранение инцидентов и восстановление</p>
            </div>
            <div className="level">
              <div className="level-number">4</div>
              <h3>Анализ</h3>
              <p>Расследование инцидентов и предотвращение повторных атак</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="cyber-faq">
        <div className="container">
          <h2>Частые вопросы о кибербезопасности</h2>
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
              <h2>Защитите свой бизнес уже сегодня</h2>
              <p>
                Оставьте заявку и наши эксперты по кибербезопасности проведут
                бесплатную консультацию и оценку рисков для вашей компании
              </p>
              <div className="cta-contacts">
                <p>
                  Экстренная помощь: <span>+7 (495) 123-45-67</span>
                </p>
                <p>
                  Email: <span>sos@cyberdev-security.ru</span>
                </p>
              </div>
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
                  placeholder="Опишите ваши потребности в безопасности"
                  value={formData.message}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              <button type="submit" className="cyber-button">
                Запросить консультацию
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cyberdev;
