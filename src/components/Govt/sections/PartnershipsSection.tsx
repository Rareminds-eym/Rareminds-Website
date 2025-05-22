
import React from "react";

import Testimonials from "./Testimonials";

export const PartnershipsSection: React.FC = () => {
 

  return (
    <section className="md:py-5 " id="partnerships">
      <div className="max-w-5xl mx-auto  md:px-4 flex flex-col items-center">
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">
          Partnerships that Speak for Themselves
        </h2>
        <p className="ext-base md:text-xl text-gray-600">
          Trusted by leading government organizations and educational institutions across India


        </p>

       <Testimonials />
      </div>
    </section>
  );
};
