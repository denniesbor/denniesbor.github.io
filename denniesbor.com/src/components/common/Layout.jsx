import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";
import Footer from "./Footer";

const Layout = () => {
  const handleToggleSidebar = () => {};

  return (
    <div className="flex flex-col items-center min-h-screen bg-page-background">
      <div className="w-full max-w-6xl px-4 md:px-8 flex flex-col min-h-screen">
        
        <Navigation toggleSidebar={handleToggleSidebar} />
        
        <div className="flex-grow mt-4">
          <Outlet />
        </div>

        <Footer />
        
      </div>
    </div>
  );
};

export default Layout;