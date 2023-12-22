// src/components/BlogArticle.jsx
import React from "react";

const BlogArticle = ({ title, summary, link }) => {
  const truncate = (text, length) =>
    text.length > length ? text.substring(0, length) + "..." : text;

  return (
    <div className="article">
      <h2>{truncate(title, 50)}</h2> {/* Truncate title */}
      <p>{truncate(summary, 100)}</p> {/* Truncate summary */}
      <a href={link}>Read More</a>
    </div>
  );
};

export default BlogArticle;
