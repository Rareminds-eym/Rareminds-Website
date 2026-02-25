import Services from "@/components/Corporate/Training/Services";
import React from "react";
import { Helmet } from "react-helmet-async";

const ServicesPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Our Services | Corporate Training | Rareminds</title>
        <meta
          name="description"
          content="Explore our comprehensive corporate training services designed to tackle diverse workforce challenges and deliver measurable business impact."
        />
      </Helmet>
      <Services />
    </>
  );
};

export default ServicesPage;
