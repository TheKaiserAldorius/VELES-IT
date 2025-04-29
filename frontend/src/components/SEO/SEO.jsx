import React from "react";

const DEFAULT_TITLE = "Veles IT | IT-решения и Маркетинг";
const DEFAULT_DESCRIPTION =
  "Veles IT предлагает инновационные решения в области IT-разработки, AI, блокчейна, маркетинга, SEO и SMM.";

const SEO = ({ title, description, keywords }) => {
  const pageTitle = title || DEFAULT_TITLE;
  const pageDescription = description || DEFAULT_DESCRIPTION;

  return (
    <>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />

      {keywords && <meta name="keywords" content={keywords} />}
    </>
  );
};

export default SEO;
