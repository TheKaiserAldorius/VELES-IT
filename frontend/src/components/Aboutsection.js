import React from "react";
import {
  FaCalendarAlt,
  FaUserCog,
  FaCode,
  FaChartLine,
  FaUsers,
  FaHandshake,
} from "react-icons/fa";

const AboutSection = () => {
  return (
    <section className="about-section" id="AboutUs">
      <div className="about-container">
        <div className="about-header">
          <h2>Мы создаем цифровое будущее вместе с вами</h2>
          <p className="about-intro">
            Компания Veles IT — это команда профессионалов, которые превращают
            идеи в успешные цифровые проекты. Мы специализируемся на разработке
            веб-решений любой сложности: от лендингов и интернет-магазинов до
            сложных корпоративных порталов и CRM-систем.
          </p>
        </div>

        <div className="mission-block">
          <h3>
            <FaHandshake className="mission-icon" /> Наша миссия
          </h3>
          <p>
            Помогать бизнесу расти и развиваться с помощью современных
            технологий. Мы верим, что каждый проект уникален, поэтому подходим к
            работе с максимальной внимательностью к деталям.
          </p>
        </div>

        <div className="advantages-section">
          <h3>Почему выбирают нас?</h3>
          <div className="advantages-grid">
            <div className="advantage-card">
              <div className="advantage-icon">
                <FaCalendarAlt size={24} />
              </div>
              <h4>Опыт и экспертиза</h4>
              <p>Более 10 лет на рынке IT-услуг</p>
            </div>

            <div className="advantage-card">
              <div className="advantage-icon">
                <FaUserCog size={24} />
              </div>
              <h4>Индивидуальный подход</h4>
              <p>Учитываем все потребности вашего бизнеса</p>
            </div>

            <div className="advantage-card">
              <div className="advantage-icon">
                <FaCode size={24} />
              </div>
              <h4>Современные технологии</h4>
              <p>Используем актуальные инструменты разработки</p>
            </div>

            <div className="advantage-card">
              <div className="advantage-icon">
                <FaChartLine size={24} />
              </div>
              <h4>Измеримый результат</h4>
              <p>Наши проекты увеличивают продажи и оптимизируют процессы</p>
            </div>
          </div>
        </div>

        <div className="team-description">
          <h3>
            <FaUsers className="team-icon" /> Наша команда
          </h3>
          <p>
            Мы гордимся нашей командой, которая состоит из талантливых
            разработчиков, дизайнеров, аналитиков и менеджеров. Вместе мы
            создаем решения, которые работают на результат.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
