import React from "react";
import BlogArticle from "../components/BlogArticle";

const syntheticData = [];

const Thoughts = () => {
  return (
    <div className="max-w-4xl mx-auto p-4">
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
