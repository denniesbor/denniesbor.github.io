import React from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-page-background">
      <Navigation />
      <div className="flex flex-col items-center justify-center flex-grow">
        <p className="text-lg font-bold animate-pulse">
          Loading<span className="animate-pulse">...</span>
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default Loading;
