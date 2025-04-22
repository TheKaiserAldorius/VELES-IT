import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Papa from "papaparse";

const ServiceTemplate = () => {
  const { serviceSlug } = useParams();
  const [pageData, setPageData] = useState(null);

  useEffect(() => {
    // Загрузка CSV файла
    fetch("/data/Services_content.csv")
      .then((res) => res.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            // Преобразование slug для поиска
            const matched = result.data.find((item) =>
              item.slug ? item.slug.trim().toLowerCase() === serviceSlug.trim().toLowerCase() : false
            );
            setPageData(matched || null);  // Если нет совпадений, установка null
          },
        });
      })
      .catch((error) => {
        console.error("Ошибка при загрузке CSV:", error);
        setPageData(null); // В случае ошибки установка null
      });
  }, [serviceSlug]);

  if (!pageData) return <div>Загрузка...</div>;

  return (
    <div className="template-page">
      <h1>{pageData.name}</h1>
      <p>{pageData.description}</p>
      <div dangerouslySetInnerHTML={{ __html: pageData.content }} />
    </div>
  );
};

export default ServiceTemplate;
