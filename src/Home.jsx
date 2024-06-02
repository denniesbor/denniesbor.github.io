import React, { useState } from "react";
import Navigation from "./components/Navigation";
import HorizontalBar from "./components/HorizontalBar";
import Footer from "./components/Footer";
import ProfileSidebar from "./components/ProfileSidebar";
import MainContent from "./components/MainContent"; // Import MainContent component

function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-page-background">
      <div className="w-full max-w-8xl px-4 md:px-4">
        <Navigation toggleSidebar={toggleSidebar} />
        <div className="flex">
          <ProfileSidebar
            isOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
          />
          <MainContent />
        </div>
        <HorizontalBar />
        <HorizontalBar />
        <HorizontalBar />
        <Footer />
      </div>
    </div>
  );
}

export default Home;
