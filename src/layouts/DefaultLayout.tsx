import React, { useState, ReactNode } from "react";
import FooterBar from "@/components/Footer/FooterBar";
import Header from "@/components/Header/Index";
import { usePageTracking } from "@/hooks/usePageTracking";

interface DefaultLayoutProps {
  children: ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  const [navbarOpen, setNavbarOpen] = useState<boolean>(false);
  usePageTracking();

  return (
    <div className="flex h-screen flex-col">
      <Header navbarOpen={navbarOpen} setNavbarOpen={setNavbarOpen} />
      <main className="App w-full flex-1 ">{children}</main>
      <FooterBar hideServices={true} />
    </div>
  );
};

export default DefaultLayout;
