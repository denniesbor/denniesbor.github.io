import { useState } from "react";
import { Link, ScrollRestoration } from "react-router-dom";
import Navigation from "./components/common/Navigation";
import Footer from "./components/common/Footer";
import ResearchHighlights from "./components/portfolio/ResearchHighlights";
import ResearchDashboards from "./components/portfolio/ResearchDashboards";
import ProfileSidebar from "./components/portfolio/ProfileSidebar";

function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen((open) => !open);

  return (
    <div className="flex min-h-screen flex-col items-center bg-page-background">
      <ScrollRestoration />
      <div className="w-full max-w-[1440px] px-4 md:px-6">
        <Navigation toggleSidebar={toggleSidebar} />
        <div className="flex gap-6 lg:gap-8">
          <ProfileSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          <main className="min-w-0 flex-1 py-8">
            <header className="mb-10 border-b border-gray-200 pb-8 dark:border-gray-700">
              <p className="text-sm font-semibold text-blue-800 dark:text-blue-300">Dennies Bor · Computational science at George Mason University</p>
              <h1 className="mt-3 max-w-4xl text-3xl font-bold leading-tight text-gray-900 lg:text-4xl dark:text-white">How natural hazards affect power, satellites, and aviation</h1>
              <p className="mt-4 max-w-3xl text-lg leading-relaxed text-gray-600 dark:text-gray-300">I study how solar storms and other natural hazards can disrupt the systems we rely on, and what those disruptions could cost. Explore the interactive research below or read the papers behind it.</p>
              <nav aria-label="Explore this portfolio" className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-blue-800 dark:text-blue-300">
                <a href="#dashboards-heading" className="underline underline-offset-4">Interactive tools and film</a>
                <a href="#research-heading" className="underline underline-offset-4">Papers and collaborations</a>
                <Link to="/portfolio#technical-projects" className="underline underline-offset-4">Technical projects</Link>
              </nav>
            </header>
            <ResearchDashboards />
            <ResearchHighlights />
          </main>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
