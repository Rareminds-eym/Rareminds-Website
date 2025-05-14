import React, { ReactNode } from "react";
import FooterBar from "@/components/Footer/FooterBar"; // Optional: remove if not needed
import Header from "@/components/Header/CorporateHeader"; // Updated to CorporateHeader

interface CorporateLayoutProps {
  children: ReactNode;
}

const CorporateLayout: React.FC<CorporateLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen flex-col">
      {/* Use CorporateHeader for vertical-specific navigation */}
      <Header />

      <main className="flex-1 mt-[100px] lg:mt-[140px] px-4 lg:px-12">
        {children}
      </main>

      {/* Optional: include FooterBar if needed */}
      <FooterBar />
    </div>
  );
};

export default CorporateLayout;
