import React from "react";
import Thoughts from "./components/Thoughts";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

function Blog() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-page-background">
      <div className="w-full max-w-6xl px-4 md:px-8">
        <Navigation />
        <Thoughts />
        <Footer />
      </div>
    </div>
  );
}

export default Blog;
