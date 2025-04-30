import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaBuilding,
  FaIdCard,
} from "react-icons/fa";
import { FaTelegram } from "react-icons/fa";

const Footer = () => {
  const address = "123376, г. Москва, ул. Красная Пресня, д. 32-34, пом. 1/ЛН";
  const mapCoords = "37.567563,55.762728";
  const mapZoom = 16;
  const mapPoint = `${mapCoords},pm2rdm`;
  const mapUrl = `https://yandex.ru/map-widget/v1/?ll=${mapCoords}&z=${mapZoom}&pt=${mapPoint}`;

  return (
    <footer className="footer" id="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-section">
            <h3 className="footer-title">
              <FaBuilding className="footer-icon" /> ВЕЛЕС-АЙТИ
            </h3>
            <p className="footer-description">
              Разработка цифровых решений для вашего бизнеса
            </p>

            <h3 className="footer-title">Мы на карте</h3>
            <div className="footer-map-container">
              <iframe
                src={mapUrl}
                width="100%"
                height="200"
                frameBorder="0"
                allowFullScreen={true}
                style={{ border: 0, borderRadius: "8px", overflow: "hidden" }}
                title="Карта расположения офиса Veles IT"
                loading="lazy"
              ></iframe>
            </div>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Контакты</h3>
            <ul className="footer-list">
              <li className="footer-list-item">
                <FaIdCard className="footer-list-icon" />
                <span>ИНН 9703208785</span>
              </li>
              <li className="footer-list-item">
                <FaEnvelope className="footer-list-icon" />
                <a href="mailto:start@veles-it.pro" className="footer-link">
                  start@veles-it.pro
                </a>
              </li>
              <li className="footer-list-item">
                <FaPhone className="footer-list-icon" />
                <a href="tel:+79169892974" className="footer-link">
                  +7 916 989 2974
                </a>
              </li>
              <li className="footer-list-item">
                <FaMapMarkerAlt className="footer-list-icon" />
                <span>{address}</span>
              </li>
            </ul>
            <a
              href="https://t.me/veles_it"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-telegram-link"
              aria-label="Наш Telegram"
            >
              <FaTelegram className="footer-telegram-icon" />
            </a>
          </div>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-copyright">© 2025 velestIT - ООО ВЕЛЕС-АЙТИ</div>
      </div>
    </footer>
  );
};

export default Footer;
