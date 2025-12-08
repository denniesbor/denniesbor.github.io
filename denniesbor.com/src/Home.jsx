import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "./components/common/Navigation";
import Footer from "./components/common/Footer";
import ProfileSidebar from "./components/portfolio/ProfileSidebar";
import Portfolio from "./pages/Portfolio";

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
          <div className="flex-1">
            <Portfolio />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Home;