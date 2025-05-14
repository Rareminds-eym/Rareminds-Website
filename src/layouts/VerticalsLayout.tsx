import React, { ReactNode } from "react";
import FooterBar from "@/components/Footer/FooterBar"; // Optional: remove if not needed
import Header from "@/components/Header/VerticalsHeader"; // Optional: create if different from default

interface VerticalsLayoutProps {
  children: ReactNode;
}

const VerticalsLayout: React.FC<VerticalsLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen flex-col">
      {/* Optional: use a different header if verticals need custom navigation */}
      <Header />
      
      <main className="flex-1 mt-[100px] lg:mt-[140px] px-4 lg:px-12">
        {children}
      </main>
      
      {/* Optional: include FooterBar if needed */}
      <FooterBar />
    </div>
  );
};

export default VerticalsLayout;
