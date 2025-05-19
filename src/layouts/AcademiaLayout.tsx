import React, { ReactNode } from "react";
import AcademyFooterBar from "@/components/Footer/FooterBar"; // Optional: remove if not needed
import Header from "@/components/Header/CorporateHeader"; // Updated to CorporateHeader

interface CorporateLayoutProps {
  children: ReactNode;
}

const CorporateLayout: React.FC<CorporateLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen flex-col">
      {/* Use CorporateHeader for vertical-specific navigation */}
      {/* <Header /> */}

      <main className="flex-1">
        {children}
      </main>

      {/* Optional: include FooterBar if needed */}
      <AcademyFooterBar />
    </div>
  );
};

export default CorporateLayout;
