import React from 'react';

import Input from '../../components/Contact/Input'
import ContactPage from "../../components/Contact/ContactPage"
const Contact: React.FC = () => {
  return (
    <div className="relative w-full mt-23">
      {/* <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
          Contact us
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8">
          Get in touch with our team
        </p>
        <div className="max-w-2xl mx-auto  text-gray-500">
          <p>We'd love to hear from you! Contact information will be available soon.</p>
        </div> */}
      {/* </div> */}
      <Input/>
      <ContactPage />
    </div>
  );
};

export default Contact;
