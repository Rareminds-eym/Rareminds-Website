// src/pages/Universities/ServicesPage.tsx
import React from 'react';
import ServiceCategoriesPage from "@/pages/Universities/sdp/ServiceCategoriesPage";
import FDPButton from "@/components/universities/sdp/FDPButton";
import FloatingActionMenu from '@/components/universities/sdp/FloatingAction';

const ServicesPage: React.FC = () => {
  return (
    <div className="pt-20">
      <FDPButton />
      <ServiceCategoriesPage />
      <FloatingActionMenu />
    </div>
  );
};

export default ServicesPage;
