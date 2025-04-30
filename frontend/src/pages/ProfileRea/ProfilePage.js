import React from "react";
import { useAuth } from "../../context/AuthContext";
import SEO from "../../components/SEO/SEO";

const ProfilePage = () => {
  // Временные данные для визуализации
  const mockProfile = {
    avatar: "/default-avatar.png",
    firstName: "Иван",
    lastName: "Иванов",
    email: "ivan@example.com",
    phone: "+7 (999) 123-45-67",
    registrationDate: "15 января 2023",
    skills: ["Web-разработка", "UI/UX дизайн", "Blockchain"],
    bio: "Фронтенд разработчик с опытом работы 5 лет. Специализируюсь на React и современных веб-технологиях.",
  };

  return (
    <div className="profile-container">
      <SEO
        title="Мой профиль | Veles IT"
        description="Страница вашего профиля в Veles IT. Управление личными данными и настройками."
        keywords="Veles IT, профиль, личный кабинет, настройки"
      />
      <div className="profile-header">
        <div className="avatar-container">
          <img
            src={mockProfile.avatar}
            alt="Аватар"
            className="profile-avatar"
          />
          <button className="avatar-edit-btn">✏️</button>
        </div>
        <h1>
          {mockProfile.firstName} {mockProfile.lastName}
        </h1>
        <p className="profile-meta">
          Участник с {mockProfile.registrationDate}
        </p>
      </div>

      <div className="profile-content">
        <section className="profile-section">
          <h2>Контактная информация</h2>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Email:</span>
              <span className="info-value">{mockProfile.email}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Телефон:</span>
              <span className="info-value">{mockProfile.phone}</span>
            </div>
          </div>
        </section>

        <section className="profile-section">
          <h2>О себе</h2>
          <p className="profile-bio">{mockProfile.bio}</p>
        </section>

        <section className="profile-section">
          <h2>Навыки</h2>
          <div className="skills-container">
            {mockProfile.skills.map((skill, index) => (
              <span key={index} className="skill-tag">
                {skill}
              </span>
            ))}
          </div>
        </section>

        <button className="edit-profile-btn">Редактировать профиль</button>
      </div>
    </div>
  );
};

export default ProfilePage;
