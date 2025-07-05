import React, { ReactNode } from "react";
import FooterBar from "@/components/Footer/FooterBar"; // Optional: remove if not needed
import Header from "@/components/Header/UniversitiesHeader"; // Updated to CorporateHeader
import { usePageTracking } from "@/hooks/usePageTracking";

interface InstitutionsLayoutProps {
  children: ReactNode;
}

const UniversitiesLayout: React.FC<InstitutionsLayoutProps> = ({
  children,
}) => {
  usePageTracking();
  return (
    <div className="flex h-screen flex-col">
      {/* Use CorporateHeader for vertical-specific navigation */}
      <Header />

      <main className="flex-1">{children}</main>

      {/* Optional: include FooterBar if needed */}
      <FooterBar />
    </div>
  );
};

export default UniversitiesLayout;
