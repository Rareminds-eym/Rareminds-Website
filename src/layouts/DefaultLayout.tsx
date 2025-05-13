import React, { useState } from "react";
import FooterBar from "@/components/Footer/FooterBar";
import Header from "@/components/Header/Index";

const DefaultLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  return (
    <div className="flex h-screen flex-col">
        <Header navbarOpen={navbarOpen} setNavbarOpen={setNavbarOpen} />
        <div className="App w-full flex-1 mt-[80px]">{children}</div>
        <FooterBar />
    </div>
  );
};

export default DefaultLayout;
