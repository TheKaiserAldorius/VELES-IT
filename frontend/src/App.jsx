import React from "react";
import { Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import AIPage from "./pages/ai/AIPage";
import TrafficPage from "./pages/traffic/TrafficPage";
import ContactsPage from "./pages/contacts/ContactsPage";
import AboutUs from "./pages/aboutus/AboutUs";
import DesignPage from "./pages/design/DesignPage";
import Blockchain from "./pages/blockchain/Blockchain";
import Cyberdev from "pages/cybersecurity/Cyberdev";
import SMMPage from "./pages/smm/SMMPage";
import DevPage from "./pages/develop/DevPage";
import SEOPage from "./pages/seo/SEOPage";
import ContactForm from "./components/ContactForm";
import ProfilePage from "./pages/ProfileRea/ProfilePage";
import LoginPage from "./pages/auth/LoginPage";
import CalculatorPage from "./pages/calculator/CalculatorPage";
import ClientsPage from "pages/clients/Clients";
import CasesPage from "pages/cases/Cases";
import ItHomesPage from "pages/ItHomes/ItHomes";
import FlashlightEffect from "./components/FlashlightEffect";
import AdminPage from "pages/AdminPage";
import "./App.css";

// Карточка услуги (обновленная по ТЗ)
const ServiceCard = ({ service }) => (
  <div className="service-card1">
    {" "}
    {/* Изменили класс */}
    <div className="service-image">
      <img src={service.image} alt={service.title} />
    </div>
    <h3>{service.title}</h3>
    <p className="description-content">{service.description}</p>
    <p className="service-price">{service.price}</p>
    <button className="service-order-btn">Заказать</button>
  </div>
);

// Карточка проекта (обновленная по ТЗ)
const ProjectCard = ({ project }) => (
  <div className="case-card">
    <div
      className="case-image"
      style={{ backgroundImage: `url(${project.image})` }}
    ></div>
    <div className="case-content">
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <button className="project-details-btn">Подробнее</button>
      <div className="case-tags">
        {project.tags.map((tag, index) => (
          <span key={index} className="case-tag">
            {tag}
          </span>
        ))}
      </div>
    </div>
  </div>
);

// Карточка члена команды (новый компонент по ТЗ)
const TeamMemberCard = ({ member }) => (
  <div className="team-card">
    <div className="team-photo">
      <img src={member.photo} alt={member.name} />
    </div>
    <h3>{member.name}</h3>
    <p className="team-position">{member.position}</p>
    <p className="team-description">{member.description}</p>
  </div>
);

// Приватный маршрут
const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

// Главная страница
const HomePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCalculateClick = () => {
    navigate("/calculator");
  };

  // Обновленные данные услуг по ТЗ
  const services = [
    {
      title: "Искусственный интеллект",
      description:
        "Разработка AI-решений для автоматизации бизнес-процессов, чат-боты и нейросети",
      price: "от 150 000 ₽",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      path: "/ai",
    },
    {
      title: "SMM Продвижение",
      description:
        "Комплексное продвижение в социальных сетях с креативным подходом",
      price: "от 50 000 ₽",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      path: "/smm",
    },
    {
      title: "Веб-разработка",
      description: "Создание сайтов и веб-приложений любой сложности под ключ",
      price: "от 100 000 ₽",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      path: "/develop",
    },
    {
      title: "Blockchain решения",
      description:
        "Разработка смарт-контрактов и децентрализованных приложений",
      price: "от 200 000 ₽",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      path: "/blockchain",
    },
  ];

  // Обновленные данные проектов (бывшие кейсы)
  const projects = [
    {
      title: "AI для ритейла",
      description: "Система рекомендаций увеличила средний чек на 35%",
      tags: ["AI", "Машинное обучение", "Рекомендации"],
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    },
    {
      title: "Корпоративный портал",
      description: "Современное решение для международной компании",
      tags: ["Веб-разработка", "UX"],
      image:
        "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    },
    {
      title: "Blockchain-решение",
      description: "Система смарт-контрактов для логистики",
      tags: ["Blockchain", "Ethereum"],
      image:
        "https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    },
  ];

  // Данные команды (новый блок по ТЗ)
  const team = [
    {
      name: "Алексей Искусных",
      position: "Fullstack-Developer",
      description: "Разработчик полного цикла",
      photo: "/images/Alexey2.jpg",
    },
    {
      name: "Алексей Искусных",
      position: "Fullstack-Developer",
      description: "Разработчик полного цикла",
      photo: "/images/Alexey2.jpg",
    },
    {
      name: "Алексей Искусных",
      position: "Fullstack-Developer",
      description: "Разработчик полного цикла",
      photo: "/images/Alexey2.jpg",
    },
  ];

  return (
    <>
      <div className="hero-section">
        <FlashlightEffect />
        <div className="hero-content">
          <h1>IT-разработка и маркетинг</h1>
          <p>Инновационные решения для вашего бизнеса</p>
          <button onClick={handleCalculateClick} className="hero-calculate-btn">
            Рассчитать стоимость проекта
          </button>
        </div>
      </div>

      <section className="services-section1">
        <div className="section-container1">
          <h2>Наши услуги</h2>
          <p className="section-subtitle">
            Комплексные решения для вашего бизнеса
          </p>
          <div className="services-grid1">
            {services.map((service, index) => (
              <ServiceCard key={index} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Блок проектов (бывшие кейсы) */}
      <section className="cases-section">
        <div className="section-container">
          <h2>Наши проекты</h2>
          <p className="section-subtitle">
            Реализованные решения с измеримыми результатами
          </p>
          <div className="cases-grid">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Новый блок команды */}
      <section className="team-section">
        <div className="section-container">
          <h2>Наша команда</h2>
          <p className="section-subtitle">
            Профессионалы с опытом реализации сложных проектов
          </p>
          <div className="team-grid">
            {team.map((member, index) => (
              <TeamMemberCard key={index} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* Существующий блок контактов */}
      <section id="contacts" className="contact-sectionq1">
        <div className="section-container">
          <div className="contact-container">
            <div className="contact-info">
              <h1>Контакты</h1>
              <p>ИНН 9703208785</p>
              <p>Наименование: ООО ВЕЛЕС-АЙТИ</p>
              <p>
                <span>📧 Email:</span> info@velesit.pro
              </p>
              <p>
                <span>📞 Телефон:</span> +7 926 912 8783
              </p>
              <p>
                <span>🏢 Адрес:</span>123376, г. Москва, ул. Красная Пресня, д.
                32-34, пом. 1Л/Н
              </p>
              <h1>Политика обработки персональных данных</h1>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/seo" element={<SEOPage />} />
          <Route path="/calculator" element={<CalculatorPage />} />
          <Route path="/ai" element={<AIPage />} />
          <Route path="/blockchain" element={<Blockchain />} />
          <Route path="/smm" element={<SMMPage />} />
          <Route path="/design" element={<DesignPage />} />
          <Route path="/traffic" element={<TrafficPage />} />
          <Route path="/cybersecurity" element={<Cyberdev />} />
          <Route path="/develop" element={<DevPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/cases" element={<CasesPage />} />
          <Route path="/ItHomes" element={<ItHomesPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route PATH="/AdminPage" element={<AdminPage />} />
        </Routes>
      </main>
      <footer className="footer">
        <p>© {new Date().getFullYear()} VelesIT - ООО ВЕЛЕС-АЙТИ</p>
      </footer>
    </div>
  );
}

export default App;
