import React, { ReactNode } from "react";
import FooterBar from "@/components/Footer/FooterBar"; // Optional: remove if not needed
import Header from "@/components/Header/GovernmentHeader"; // Updated to CorporateHeader
import { usePageTracking } from "@/hooks/usePageTracking";

interface CorporateLayoutProps {
  children: ReactNode;
}

const CorporateLayout: React.FC<CorporateLayoutProps> = ({ children }) => {
  usePageTracking();
  return (
    <div className="flex h-screen flex-col">
      {/* Use CorporateHeader for vertical-specific navigation */}
      <Header />

      <main className="flex-1 mt-[80px]">{children}</main>

      {/* Optional: include FooterBar if needed */}
      <FooterBar />
    </div>
  );
};

export default CorporateLayout;
