import React from 'react';
import { FaTelegram, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import './ContactsPage.css';

const ContactsPage = () => {
  return (
    <div className="contacts-page">
      {/* Hero Section */}
      <section className="contacts-hero">
        <div className="container">
          <h1 className="contacts-title">Контакты</h1>
          <p className="contacts-subtitle">Свяжитесь с нами удобным способом</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="contacts-content">
        <div className="container">
          <div className="contacts-grid">
            {/* Contact Methods */}
            <div className="contacts-card">
              <h2 className="section-title">Способы связи</h2>
              <div className="contact-methods">
                <div className="contact-method">
                  <div className="contact-icon telegram">
                    <FaTelegram size={24} />
                  </div>
                  <div>
                    <h3>Telegram</h3>
                    <a href="https://t.me/veles_it" target="_blank" rel="noopener noreferrer">
                      @veles_it
                    </a>
                  </div>
                </div>
                
                <div className="contact-method">
                  <div className="contact-icon phone">
                    <FaPhone size={20} />
                  </div>
                  <div>
                    <h3>Телефон</h3>
                    <a href="tel:+79169892974">+7 916 989 29 74</a>
                  </div>
                </div>
                
                <div className="contact-method">
                  <div className="contact-icon email">
                    <FaEnvelope size={20} />
                  </div>
                  <div>
                    <h3>Email</h3>
                    <a href="mailto:Info@veles-it.pro">Info@veles-it.pro</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Company Info */}
            <div className="contacts-card">
              <h2 className="section-title">Реквизиты</h2>
              <div className="contact-info">
                <div className="requisite-item">
                  <p><strong>ООО "ВЕЛЕС-АЙТИ"</strong></p>
                  <p>ИНН 9703208785</p>
                </div>
                
                <div className="address-item">
                  <div className="contact-icon">
                    <FaMapMarkerAlt size={20} />
                  </div>
                  <div>
                    <p><strong>Адрес:</strong></p>
                    <p>г. Москва</p>
                    <p>ул. Красная Пресня, д. 32-34</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactsPage;