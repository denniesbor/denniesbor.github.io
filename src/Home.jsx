import React from "react";

import Navigation from "./components/Navigation";
import Profile from "./components/Profile";
import Biography from "./components/Biography";
import ResearchHighlights from "./components/ResearchHighlights";
import HorizontalBar from "./components/HorizontalBar";
import Footer from "./components/Footer";

function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-page-background">
      <div className="w-full max-w-6xl px-4 md:px-8">
        <Navigation />
        <Profile />
        <HorizontalBar />
        <Biography />
        <HorizontalBar />
        <ResearchHighlights />
        <HorizontalBar />
        <Footer />
      </div>
    </div>
  );
}

export default Home;
