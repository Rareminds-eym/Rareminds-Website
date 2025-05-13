import React, { useState } from "react";
import FooterBar from "@/components/Footer/FooterBar";
import Header from "@/components/Header/Index";
import Menu from "@/components/Menu/Index";
import { useLocation } from "react-router-dom";

const DefaultLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="flex w-full h-screen">
      <div className="flex-1">
      <Header navbarOpen={navbarOpen} setNavbarOpen={setNavbarOpen} />
      <Menu navbarOpen={navbarOpen} setNavbarOpen={setNavbarOpen} />
      <div className="App w-full h-full pt-[80px]">{children}</div>
      <FooterBar />
      </div>
      
    </div>
  );
};

export default DefaultLayout;
