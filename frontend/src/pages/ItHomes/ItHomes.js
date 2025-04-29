// pages/ItHomes.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SEO from "../../components/SEO/SEO";

const ItHomesPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    beforeChange: (current, next) => setCurrentSlide(next),
    arrows: false,
  };

  const slides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf",
      title: "IT Деревня",
      subtitle: "Инновационное пространство для технологических стартапов",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab",
      title: "Коворкинг зоны",
      subtitle: "Современные рабочие пространства",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2",
      title: "Лаборатории",
      subtitle: "Оснащенные всем необходимым для разработки",
    },
  ];

  return (
    <div className="it-homes-page">
      <SEO
        title="IT Деревня | Veles IT"
        description="IT Деревня от Veles IT - инновационное пространство для IT-стартапов и специалистов. Коворкинг, лаборатории, нетворкинг. Станьте резидентом."
        keywords="Veles IT, IT Деревня, технологический кластер, стартапы, коворкинг, лаборатории, IT-пространство, инновации"
      />
      {/* Hero Slider */}
      <section className="it-homes-slider">
        <Slider {...sliderSettings}>
          {slides.map((slide) => (
            <div key={slide.id} className="slider-item">
              <div
                className="slider-image"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="slider-overlay">
                  <div className="slider-content">
                    <h1>{slide.title}</h1>
                    <p>{slide.subtitle}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      {/* Project Description */}
      <section className="project-description">
        <div className="container">
          <div className="description-grid">
            <div className="description-content">
              <h2>О проекте IT Деревня</h2>
              <p>
                IT Деревня - это уникальный технологический кластер, созданный
                для поддержки стартапов и IT-специалистов. На территории
                расположены коворкинг зоны, лаборатории, переговорные комнаты и
                зоны отдыха.
              </p>
              <p>
                Проект направлен на создание экосистемы, где разработчики,
                предприниматели и инвесторы могут работать вместе над
                инновационными проектами.
              </p>
              <div className="features-list">
                <h3>Основные возможности:</h3>
                <ul>
                  <li>Современные рабочие пространства</li>
                  <li>Доступ к высокоскоростному интернету</li>
                  <li>Лаборатории с оборудованием для разработки</li>
                  <li>Мероприятия и воркшопы</li>
                  <li>Возможность нетворкинга</li>
                </ul>
              </div>
            </div>

            <div className="description-image">
              <div className="image-wrapper">
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978"
                  alt="IT Деревня"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="gallery-section">
        <div className="container">
          <h2>Галерея</h2>
          <div className="gallery-grid">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="gallery-item">
                <img
                  src={`https://images.unsplash.com/photo-1497366811353-6870744d04b2?ix=${item}`}
                  alt={`Галерея ${item}`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Хотите стать резидентом?</h2>
          <p>Оставьте заявку и мы свяжемся с вами для обсуждения условий</p>
          <Link to="/contacts" className="cta-button">
            Оставить заявку
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ItHomesPage;
