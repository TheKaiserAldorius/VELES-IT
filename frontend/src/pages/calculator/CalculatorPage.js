import React from "react";
import CalculatorForm from "./CalculatorForm";
import SEO from "../../components/SEO/SEO";
import OrderBtn from "../../components/OrderBtn/OrderBtn";

const CalculatorPage = () => {
  return (
    <>
      <div className="calculator-page">
        <SEO
          title="Калькулятор стоимости | Veles IT"
          description="Рассчитайте примерную стоимость разработки сайта или другого IT-проекта с помощью калькулятора Veles IT. Получите оценку бюджета онлайн."
          keywords="Veles IT, калькулятор стоимости, рассчитать стоимость сайта, стоимость разработки, оценка проекта, IT-услуги"
        />
        <div className="header">
          <h2>Калькулятор стоимости услуг</h2>
          <p>Рассчитайте стоимость разработки под ваш проект</p>
        </div>
        <CalculatorForm />
      </div>
      <OrderBtn />
    </>
  );
};

export default CalculatorPage;
