import React from "react";
import BlogArticle from "../components/BlogArticle";

const syntheticData = []; // Your synthetic data array

const Thoughts = () => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Enhanced Festive Message Section */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">
          <i className="fas fa-snowflake text-blue-400"></i> Merry Christmas and
          Happy 2024! <i className="fas fa-gift text-red-500"></i>
        </h2>
        <p className="text-lg">
          <i className="fas fa-laptop-code text-green-500"></i> Uhm, I had
          thought of writing about{" "}
          <span className="font-semibold text-purple-600">multi-threading</span>{" "}
          and{" "}
          <span className="font-semibold text-orange-500">
            multi-processing
          </span>{" "}
          in Python, but then... the year just ended...
        </p>
        <p className="mt-2 text-lg">
          <i className="fas fa-glass-cheers text-yellow-400"></i> Wishing you
          all the joys of the season and happiness throughout the coming year.
        </p>
      </div>

      {/* Blog Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {syntheticData.map((article, index) => (
          <BlogArticle
            key={index}
            title={article.title}
            summary={article.summary}
            link={article.link}
          />
        ))}
      </div>
    </div>
  );
};

export default Thoughts;
