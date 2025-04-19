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
import "./style.css";
import ServiceCard from "./components/ServiceCard";
import ProjectCard from "./components/ProjectCard";
import TeamMemberCard from "./components/TeamMemberCard";
import { services, projects, team } from "./data/homeData";

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

  // Email and Phone for contact links
  const contactEmail = "info@velesit.pro";
  const contactPhone = "+79269128783"; // Raw number for tel link
  const displayPhone = "+7 926 912 8783"; // Formatted number for display

  return (
    <>
      {/* Wrapped hero content in <header> for semantics */}
      <header className="hero-section">
        <FlashlightEffect />
        <div className="hero-content">
          <h1>IT-разработка и маркетинг</h1>
          <p>Инновационные решения для вашего бизнеса</p>
          <button onClick={handleCalculateClick} className="hero-calculate-btn">
            Рассчитать стоимость проекта
          </button>
        </div>
      </header>

      {/* Changed div to ul/li for services list */}
      {/* Ensure CSS resets list styles (bullets, padding) if needed */}
      <section className="services-section1">
        <div className="section-container">
          <h2>Наши услуги</h2>
          <p className="section-subtitle">
            Комплексные решения для вашего бизнеса
          </p>
          <ul className="services-grid1">
            {" "}
            {/* Changed div to ul */}
            {services.map((service, index) => (
              <li key={index}>
                {" "}
                {/* Wrapped card in li */}
                <ServiceCard service={service} />
              </li>
            ))}
          </ul>
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
          <ul className="team-grid">
            {" "}
            {/* Changed div to ul */}
            {team.map((member, index) => (
              <li key={index}>
                {" "}
                {/* Wrapped card in li */}
                <TeamMemberCard member={member} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Существующий блок контактов */}
      <section id="contacts" className="contact-section">
        {" "}
        <div className="section-container">
          <div className="contact-container">
            <div className="contact-info">
              <h1>Контакты</h1>
              <p>ИНН 9703208785</p>
              <p>Наименование: ООО ВЕЛЕС-АЙТИ</p>
              <p>
                <span>📧 Email:</span>{" "}
                <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
              </p>
              <p>
                <span>📞 Телефон:</span>{" "}
                <a href={`tel:${contactPhone}`}>{displayPhone}</a>
              </p>
              <p>
                <span>🏢 Адрес:</span>123376, г. Москва, ул. Красная Пресня, д.
                32-34, пом. 1Л/Н
              </p>
              <h2>Политика обработки персональных данных</h2>{" "}
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
          <Route path="/AdminPage" element={<AdminPage />} />
        </Routes>
      </main>
      <footer className="footer">
        <p>© {new Date().getFullYear()} VelesIT - ООО ВЕЛЕС-АЙТИ</p>
      </footer>
    </div>
  );
}

export default App;
