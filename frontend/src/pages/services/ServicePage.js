import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Papa from "papaparse";
import { Loader2 } from "lucide-react";

const ServicePage = () => {
  const { slug } = useParams();
  const [serviceData, setServiceData] = useState(null);

  useEffect(() => {
    fetch("/Services_content.csv")
      .then((response) => response.text())
      .then((text) => {
        Papa.parse(text, {
          header: true,
          complete: (results) => {
            const match = results.data.find((item) => item.slug === slug);
            setServiceData(match);
          },
        });
      });
  }, [slug]);

  if (!serviceData) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-100 to-gray-200">
        <Loader2 className="animate-spin h-10 w-10 text-blue-600" />
        <span className="ml-3 text-xl text-gray-600">Загрузка контента...</span>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-16 px-4 md:px-12">
      <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-3xl p-8 md:p-16 border border-gray-100 relative overflow-hidden">
        {/* Декоративный элемент */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-100 rounded-full opacity-30 blur-2xl z-0"></div>
        <div className="absolute -bottom-10 -right-10 w-52 h-52 bg-indigo-100 rounded-full opacity-30 blur-3xl z-0"></div>

        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
            {serviceData.name}
          </h1>
          <p className="text-xl text-gray-700 mb-8 leading-relaxed">
            {serviceData.description}
          </p>
          <div
            className="prose prose-lg max-w-none text-gray-800"
            dangerouslySetInnerHTML={{ __html: serviceData.content }}
          />
        </div>
      </div>
    </section>
  );
};

export default ServicePage;
