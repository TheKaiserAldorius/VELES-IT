import React, { useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  FaWifi,
  FaUsers,
  FaTree,
  FaLightbulb,
  FaLaptop,
  FaMapMarkerAlt,
} from "react-icons/fa";
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
      title: "IT деревня",
      subtitle: "Пространство для инноваций и творчества",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab",
      title: "Рабочие зоны",
      subtitle: "Комфорт и технологии в гармонии с природой",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2",
      title: "Сообщество",
      subtitle: "Единомышленники, создающие будущее",
    },
  ];

  const features = [
    {
      icon: <FaLaptop />,
      text: "Комфортабельные рабочие зоны с высокоскоростным интернетом",
    },
    {
      icon: <FaUsers />,
      text: "Зоны для проведения встреч, семинаров и хакатонов",
    },
    { icon: <FaTree />, text: "Пространства для отдыха и общения" },
    { icon: <FaMapMarkerAlt />, text: "Природные ландшафты для вдохновения" },
  ];

  const forWhom = [
    {
      title: "Стартапы",
      description: "Которые ищут место для работы и развития",
    },
    {
      title: "Фрилансеры",
      description: "Которым важно комфортное рабочее пространство",
    },
    {
      title: "Компании",
      description: "Которые хотят провести корпоративные мероприятия",
    },
  ];

  return (
    <div className="it-homes-page">
      <SEO
        title="IT Деревня | Veles IT"
        description="IT Деревня от Veles IT - пространство для инноваций и творчества. Кампус для стартапов, фрилансеров и компаний в гармонии с природой."
        keywords="IT деревня, коворкинг, стартапы, фриланс, технологическое пространство, Veles IT"
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
          <div className="description-content">
            <h2>IT деревня — пространство для инноваций и творчества</h2>
            <p className="intro-text">
              IT деревня — это уникальный проект компании Veles IT, который
              объединяет профессионалов, стартапы и энтузиастов в одном месте.
              Мы создали пространство, где технологии встречаются с природой, а
              идеи превращаются в реальные проекты.
            </p>

            <div className="what-is-it">
              <h3>Что такое IT деревня?</h3>
              <p>
                Это современный кампус, расположенный вдали от городской суеты,
                где каждый может найти вдохновение и сосредоточиться на своих
                задачах. Здесь есть все необходимое для работы, обучения и
                отдыха:
              </p>

              <div className="features-grid">
                {features.map((feature, index) => (
                  <div key={index} className="feature-item">
                    <div className="feature-icon">{feature.icon}</div>
                    <p>{feature.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="for-whom">
              <h3>Для кого это?</h3>
              <div className="audience-grid">
                {forWhom.map((item, index) => (
                  <div key={index} className="audience-card">
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="why-important">
              <h3>Почему это важно?</h3>
              <p>
                Мы верим, что инновации рождаются там, где есть свобода
                творчества и поддержка единомышленников. IT деревня — это не
                просто место, это сообщество людей, которые меняют мир с помощью
                технологий.
              </p>
              <p className="cta-text">
                Присоединяйтесь к нашему проекту и станьте частью IT деревни —
                пространства, где будущее создается уже сегодня!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="gallery-section">
        <div className="container">
          <h2>Наша атмосфера</h2>
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
          <h2>Хотите стать резидентом IT деревни?</h2>
          <p>Оставьте заявку и мы расскажем подробности</p>
          <Link to="/contacts" className="cta-button">
            Оставить заявку
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ItHomesPage;
