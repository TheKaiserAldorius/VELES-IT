import React, { useState } from 'react';

const SEOPage = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    website: ''
  });

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Спасибо, ${formData.name}! Наш SEO-специалист свяжется с вами для анализа сайта ${formData.website}`);
    setFormData({
      name: '',
      email: '',
      website: ''
    });
  };

  const faqData = [
    {
      question: "Сколько времени нужно для выхода в ТОП?",
      answer: "Первые результаты обычно видны через 3-4 месяца, но выход в ТОП по конкурентным запросам может занять 6-12 месяцев. Мы даем прогноз после аудита вашего сайта."
    },
    {
      question: "Какие методы SEO вы используете?",
      answer: "Только белые методы: оптимизация контента и структуры, улучшение юзабилити, наращивание качественных ссылок, работа с поведенческими факторами."
    },
    {
      question: "Нужно ли платить за размещение в поисковиках?",
      answer: "Нет, органическое SEO не требует оплаты за размещение. Вы платите только за работу специалистов по оптимизации."
    },
    {
      question: "Как часто нужно обновлять контент?",
      answer: "Рекомендуем обновлять ключевые страницы каждые 6-12 месяцев, блог - 2-4 раза в месяц. Частота зависит от тематики и конкурентности."
    },
    {
      question: "Что важнее: SEO или контекстная реклама?",
      answer: "Оба инструмента важны. Реклама дает быстрый трафик, SEO - стабильный долгосрочный результат. Оптимально использовать оба подхода."
    }
  ];

  const services = [
    {
      title: "SEO-аудит",
      description: "Полный анализ сайта и выявление ошибок, мешающих продвижению",
      icon: "🔍"
    },
    {
      title: "Техническое SEO",
      description: "Оптимизация скорости, мобильной версии, индексации и структуры",
      icon: "⚙️"
    },
    {
      title: "Контент-маркетинг",
      description: "Создание и оптимизация контента под поисковые запросы",
      icon: "✍️"
    },
    {
      title: "Линкбилдинг",
      description: "Наращивание качественных ссылок на ваш сайт",
      icon: "🔗"
    },
    {
      title: "Локальное SEO",
      description: "Продвижение для местного бизнеса в Google Maps и Яндекс.Картах",
      icon: "📍"
    },
    {
      title: "SEO-аналитика",
      description: "Мониторинг позиций, трафика и эффективности оптимизации",
      icon: "📊"
    }
  ];

  const stats = [
    {
      value: "93%",
      label: "Онлайн-опыта начинается с поиска"
    },
    {
      value: "70%",
      label: "Кликов приходится на органическую выдачу"
    },
    {
      value: "50%+",
      label: "Роста трафика после 6 месяцев SEO"
    },
    {
      value: "5-8x",
      label: "ROI от SEO по сравнению с рекламой"
    }
  ];

  const steps = [
    {
      title: "Анализ",
      description: "Изучаем ваш сайт, конкурентов и целевую аудиторию"
    },
    {
      title: "Оптимизация",
      description: "Улучшаем технические параметры и контент"
    },
    {
      title: "Развитие",
      description: "Наращиваем ссылочную массу и авторитет"
    },
    {
      title: "Мониторинг",
      description: "Анализируем результаты и корректируем стратегию"
    }
  ];

  return (
    <div className="cyber-page">
      {/* Hero Section */}
      <section className="cyber-hero">
        <div className="container">
          <h1>Профессиональное SEO-продвижение</h1>
          <p className="subtitle">
            Увеличьте органический трафик и продажи с помощью комплексной 
            поисковой оптимизации вашего сайта
          </p>
          <div className="hero-buttons">
            <button className="cyber-button">Заказать аудит</button>
            <button className="cyber-button secondary">Анализ конкурентов</button>
          </div>
          <div className="scroll-indicator">
            <span>↓</span>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="threat-stats">
        <div className="container">
          <h2>SEO в цифрах</h2>
          <p className="section-description">
            Почему поисковая оптимизация — фундамент цифрового маркетинга
          </p>
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div className="stat-card" key={index}>
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="cyber-services">
        <div className="container">
          <h2>Наши SEO-услуги</h2>
          <p className="section-description">
            Комплексный подход к поисковому продвижению
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

      {/* Process Section */}
      <section className="protection-levels">
        <div className="container">
          <h2>Как мы работаем</h2>
          <div className="levels-container">
            {steps.map((step, index) => (
              <div className="level" key={index}>
                <div className="level-number">{index + 1}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="cyber-faq">
        <div className="container">
          <h2>Частые вопросы о SEO</h2>
          <div className="faq-list">
            {faqData.map((item, index) => (
              <div 
                className={`faq-item ${activeFaq === index ? 'active' : ''}`} 
                key={index}
                onClick={() => toggleFaq(index)}
              >
                <div className="faq-question">
                  <h3>{item.question}</h3>
                  <span className="toggle-icon">
                    {activeFaq === index ? '−' : '+'}
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
              <h2>Готовы увеличить трафик?</h2>
              <p>
                Оставьте заявку и получите бесплатный аудит вашего сайта 
                с планом оптимизации
              </p>
              <div className="cta-contacts">
                <p>Консультация: <span>+7 (495) 123-45-67</span></p>
                <p>Email: <span>seo@cyberdev.ru</span></p>
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
                <input 
                  type="url" 
                  name="website" 
                  placeholder="Адрес вашего сайта" 
                  value={formData.website}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button type="submit" className="cyber-button">Получить аудит</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SEOPage;