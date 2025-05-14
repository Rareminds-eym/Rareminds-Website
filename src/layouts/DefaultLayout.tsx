import React, { useState, ReactNode } from "react";
import FooterBar from "@/components/Footer/FooterBar";
import Header from "@/components/Header/Index";

interface DefaultLayoutProps {
  children: ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  const [navbarOpen, setNavbarOpen] = useState<boolean>(false);

  return (
    <div className="flex h-screen flex-col">
      <Header navbarOpen={navbarOpen} setNavbarOpen={setNavbarOpen} />
      <main className="App w-full flex-1 mt-[80px]">{children}</main>
      <FooterBar />
    </div>
  );
};

export default DefaultLayout;