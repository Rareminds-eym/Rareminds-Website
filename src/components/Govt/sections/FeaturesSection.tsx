import React from "react";
import { Section } from "../../../components/ui/section";
import { SparklesText } from "../../../components/ui/sparkles-text";

export const FeaturesSection = () => {
  return (
    <Section className="bg-white" id="feature-section">
      <div className="text-center ">
        <h2 className="mb-4 font-bold text-[18px] md:text-4xl">
          Why Governments Choose{" "}
          <SparklesText
            text="Rareminds"
            className="inline-block text-gray-700  text-[22px] md:text-4xl"
            colors={{ first: "#fa564b", second: "#33C3F0" }}
            sparklesCount={10}
          />
        </h2>
        <p className="mx-auto text-base md:text-xl text-gray-600">
          Our comprehensive approach to government training delivers results through
          <span className="text-red-500"> efficiency, transparency & excellence.</span>
        </p>
      </div>

      {/* Desktop & Tablet View */}
      <div className="hidden md:flex justify-center items-center w-full px-4 mt-9">
        <div className="w-full max-w-6xl">
          <img
            src="https://itvhjkgfafikpqmuunlh.supabase.co/storage/v1/object/public/images/Government/Home/Hero_Section/Main_layout.webp"
            alt="Main Layout"
            className="w-full h-auto object-contain"
          />
        </div>
      </div>

      {/* Mobile View */}
      <div className="flex items-center justify-center md:hidden w-full">
        <div className="w-80 flex items-center justify-center">
          <img
            src="https://itvhjkgfafikpqmuunlh.supabase.co/storage/v1/object/public/images/Government/Home/Hero_Section/Mobile.webp"
            alt="Mobile Features"
            className=""
          />
        </div>
      </div>
    </Section>
  );
};
