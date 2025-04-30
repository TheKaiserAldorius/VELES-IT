import React from "react";
import { FaCheck, FaLaptopCode, FaUserTie, FaClock } from "react-icons/fa";
import SEO from "../../components/SEO/SEO";

const AcademyPage = () => {
  return (
    <div className="academy-page">
      <SEO
        title="Веб-академия Veles IT | Обучение IT-профессиям"
        description="Практические курсы по веб-разработке, программированию и IT-технологиям от Veles IT Academy. Обучение для начинающих и профессионалов."
        keywords="IT обучение, курсы программирования, веб-разработка, Veles IT Academy, IT курсы"
      />

      <section className="academy-hero">
        <div className="hero-content">
          <h1>Обучение, которое открывает двери в мир IT</h1>
          <p className="hero-description">
            Добро пожаловать в Веб-академию Veles IT — образовательную
            платформу, которая помогает освоить востребованные навыки в
            IT-сфере.
          </p>
        </div>
      </section>

      <section className="academy-intro">
        <div className="container">
          <p>
            Мы предлагаем практические курсы, которые подойдут как новичкам, так
            и профессионалам, желающим углубить свои знания.
          </p>
        </div>
      </section>

      <section className="benefits-section">
        <div className="container">
          <h2 className="section-title">Что вы получите?</h2>

          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">
                <FaCheck />
              </div>
              <h3>Актуальные знания</h3>
              <p>Только проверенные методики и современные технологии</p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">
                <FaLaptopCode />
              </div>
              <h3>Практика с первого дня</h3>
              <p>Вы будете работать над реальными проектами</p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">
                <FaUserTie />
              </div>
              <h3>Поддержка экспертов</h3>
              <p>
                Наши преподаватели — это практикующие специалисты с опытом
                работы в крупных IT-компаниях
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">
                <FaClock />
              </div>
              <h3>Гибкость</h3>
              <p>Учитесь в удобное время и в удобном темпе</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AcademyPage;
