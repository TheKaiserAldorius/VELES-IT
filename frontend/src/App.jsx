import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
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
import Footer from "./components/footer";
import { services, projects, team } from "./data/homeData";
import ScrollToTop from "./components/ScrollToTop";
import ServicePage from "./pages/services/ServicePage";
import ServicesListPage from "./pages/services/ServicesListPage";
import AboutSection from "components/Aboutsection";
import WebAcademy from "./pages/WebAcademy/WebAcademy";
import CasesSection from "components/CaseSection/CasesSection";
import SEO from "./components/SEO/SEO.jsx";
// import ClientsArticle from "components/ClientsArticle/ClientsArticle";

// Приватный маршрут
const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

// Главная страница
const HomePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleCalculateClick = () => {
    navigate("/calculator");
  };

  const contactEmail = "start@veles-it.pro";
  const contactPhone = "+79169892974";
  const displayPhone = "+7 916 989 2974";

  useEffect(() => {
    if (location.hash === "#AboutUs") {
      const targetElement = document.getElementById("AboutUs");
      if (targetElement) {
        setTimeout(() => {
          targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, [location.hash]);

  return (
    <>
      <SEO
        title="Veles IT | IT-разработка и маркетинг"
        description="Veles IT - Инновационные IT-решения для вашего бизнеса. Веб-разработка, мобильные приложения, AI, блокчейн, маркетинг, SEO, SMM."
        keywords="Veles IT, IT разработка, маркетинг, веб-разработка, AI, блокчейн, SEO, SMM, мобильные приложения"
      />
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

      <AboutSection />
      <CasesSection />
      {/* <ClientsArticle /> */}
      <section id="contacts" className="contacts-section">
        <ContactForm />
      </section>

      {/* Changed div to ul/li for services list */}
      {/* Ensure CSS resets list styles (bullets, padding) if needed */}
      {/* <section className="services-section1">
        <div className="section-container">
          <h2>Наши услуги</h2>
          <p className="section-subtitle">
            Комплексные решения для вашего бизнеса
          </p>
          <ul className="services-grid1">
            {" "}
            {services.map((service, index) => (
              <li key={index}>
                {" "}
                <ServiceCard service={service} />
              </li>
            ))}
          </ul>
        </div>
      </section> */}

      {/* Блок проектов (бывшие кейсы) */}
      {/* <section className="cases-section">
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
      </section> */}

      {/* Новый блок команды */}
      {/* <section className="team-section">
        <div className="section-container">
          <h2>Наша команда</h2>
          <p className="section-subtitle">
            Профессионалы с опытом реализации сложных проектов
          </p>
          <ul className="team-grid">
            {" "}
            {team.map((member, index) => (
              <li key={index}>
                {" "}
                <TeamMemberCard member={member} />
              </li>
            ))}
          </ul>
        </div>
      </section> */}
    </>
  );
};

function App() {
  return (
    <div className="app">
      <Navbar />
      <ScrollToTop />
      <main className="content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/academy" element={<WebAcademy />} />
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
          <Route path="/services" element={<ServicesListPage />} />
          <Route path="/services/:slug" element={<ServicePage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
