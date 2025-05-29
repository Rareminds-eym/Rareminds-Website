import React, { ReactNode } from "react";
import FooterBar from "@/components/Footer/FooterBar"; // Optional: remove if not needed
import CorporateHeader from "@/components/Header/CorporateHeader"; // Updated to CorporateHeader
import FloatingActionMenu from "@/components/Corporate/Recruitment/FloatingAction";

interface CorporateLayoutProps {
  children: ReactNode;
}

const CorporateLayout: React.FC<CorporateLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen flex-col">
      {/* Use CorporateHeader for vertical-specific navigation */}
      <CorporateHeader />

      <main className="flex-1 mt-[80px]">{children}</main>
      {/* <FAQChatbot /> */}
      <FloatingActionMenu />
      {/* Optional: include FooterBar if needed */}
      <FooterBar />
    </div>
  );
};

export default CorporateLayout;
