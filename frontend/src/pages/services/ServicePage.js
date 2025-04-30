import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Papa from "papaparse";
import { Loader2 } from "lucide-react";
import SEO from "../../components/SEO/SEO";
import CalculatorBtn from "../../components/CalculatorBtn/CalculatorBtn";

const ServicePage = () => {
  const { slug } = useParams();
  const [serviceData, setServiceData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/Services_content.csv");
        const text = await response.text();

        Papa.parse(text, {
          header: true,
          complete: (results) => {
            const match = results.data.find((item) => item.slug === slug);
            setServiceData(match);
            setLoading(false);
          },
          error: () => {
            setLoading(false);
          },
        });
      } catch (error) {
        console.error("Error loading service data:", error);
        setLoading(false);
      }
    };

    fetchServiceData();
  }, [slug]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (!serviceData) {
    return <NotFoundScreen />;
  }

  const metaDescription =
    serviceData.description?.substring(0, 160) ||
    `Услуга ${serviceData.name} от Veles IT.`;
  const metaKeywords = `Veles IT, ${
    serviceData.name
  }, ${slug}, IT услуги, ${serviceData.description
    ?.split(" ")
    .slice(0, 5)
    .join(", ")}`;

  return (
    <div className="service-page">
      <SEO
        title={`${serviceData.name} | Veles IT`}
        description={metaDescription}
        keywords={metaKeywords}
      />

      <ServiceHero
        name={serviceData.name}
        description={serviceData.description}
      />

      <div className="service-text-container">
        <div className="service-text">
          <div
            className="service-details"
            dangerouslySetInnerHTML={{ __html: serviceData.content }}
          />
        </div>
      </div>
      <CalculatorBtn />
    </div>
  );
};

const LoadingScreen = () => (
  <div className="loading-screen">
    <SEO title="Загрузка... | Veles IT" />
    <Loader2 className="spinner" />
    <span className="loading-text">Загрузка контента...</span>
  </div>
);

const NotFoundScreen = () => (
  <div className="not-found-screen">
    <SEO
      title="Услуга не найдена | Veles IT"
      description="Запрашиваемая услуга не найдена."
    />
    <span className="error-text">Услуга не найдена</span>
  </div>
);

const ServiceHero = ({ name, description }) => (
  <section className="service-hero">
    <div className="hero-content">
      <h1>{name}</h1>
      <p className="hero-description">{description}</p>
    </div>
    <div className="hero-decoration"></div>
  </section>
);

export default ServicePage;
