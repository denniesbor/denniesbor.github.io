import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navigation from "./Navigation";
import Footer from "./Footer";

const Layout = () => {
  const location = useLocation();
  const handleToggleSidebar = () => {};

  // Wider for space weather grid, standard for other pages
  const isSpaceWeatherGrid = location.pathname.includes('/space-weather-grid');

  return (
    <div className="flex flex-col items-center min-h-screen bg-page-background">
      <div className={`w-full ${isSpaceWeatherGrid ? 'max-w-[1800px] px-2 md:px-4' : 'max-w-[1400px] px-4 md:px-8'} flex flex-col min-h-screen`}>
        
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