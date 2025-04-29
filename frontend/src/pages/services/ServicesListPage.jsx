import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Papa from "papaparse";
import { Loader2 } from "lucide-react";
import SEO from "../../components/SEO/SEO";
import ServiceCard from "../../components/ServiceCard";
import "../../style.css";

const ServicesListPage = () => {
  const [servicesList, setServicesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch("/Services_content.csv")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then((text) => {
        Papa.parse(text, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const validServices = results.data.filter(
              (item) => item.slug && item.name
            );
            setServicesList(validServices);
            setLoading(false);
          },
          error: (err) => {
            console.error("Ошибка парсинга CSV:", err);
            setError("Не удалось обработать данные услуг.");
            setLoading(false);
          },
        });
      })
      .catch((err) => {
        console.error("Ошибка загрузки CSV:", err);
        setError("Не удалось загрузить список услуг.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-100 to-gray-200">
        <SEO title="Загрузка услуг... | Veles IT" />
        <Loader2 className="animate-spin h-10 w-10 text-blue-600" />
        <span className="ml-3 text-xl text-gray-600">Загрузка услуг...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-100 to-gray-200">
        <SEO title="Ошибка | Veles IT" />
        <span className="text-xl text-red-600">{error}</span>
      </div>
    );
  }

  return (
    <div className="services-list-page cyber-page">
      <SEO
        title="Наши Услуги | Veles IT"
        description="Ознакомьтесь со всеми IT-услугами от Veles IT: веб-разработка, искусственный интеллект, блокчейн, SMM, SEO, дизайн, кибербезопасность и многое другое."
        keywords="Veles IT, услуги, IT-услуги, веб-разработка, AI, блокчейн, SMM, SEO, дизайн, кибербезопасность"
      />

      <section className="services-list-hero cyber-hero">
        <div className="container">
          <h1 className="contacts-title">Наши Услуги</h1>
          <p className="subtitle">
            Комплексные IT-решения для развития вашего бизнеса в цифровую эпоху.
          </p>
        </div>
      </section>

      <section className="services-list-grid-section cyber-services">
        <div className="container">
          <h2 className="section-title">Обзор Услуг</h2>
          <div className="services-grid1">
            {servicesList.map((service) => {
              const serviceDataForCard = {
                title: service.name,
                description: service.description,
                image: service.ogImage || "/images/service-placeholder.png",
                price: service.price || "",
              };
              return (
                <Link
                  to={`/services/${service.slug}`}
                  key={service.slug}
                  className="service-card-link"
                  style={{ textDecoration: "none" }}
                >
                  <ServiceCard service={serviceDataForCard} />
                </Link>
              );
            })}
          </div>
          {servicesList.length === 0 && !loading && <p>Услуги не найдены.</p>}
        </div>
      </section>
    </div>
  );
};

export default ServicesListPage;
