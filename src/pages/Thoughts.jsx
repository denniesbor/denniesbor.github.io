import React from "react";
import BlogArticle from "../components/BlogArticle";

const syntheticData = [
  {
    title: "Understanding the Cosmos",
    summary: "An in-depth look at the mysteries of the universe.",
    link: "/blog/cosmos",
  },
  {
    title: "Advances in Quantum Computing",
    summary: "Exploring the future of computing.",
    link: "/blog/quantum",
  },
  {
    title: "The Secrets of Dark Matter",
    summary: "A journey into the unknown components of the cosmos.",
    link: "/blog/dark-matter",
  },
  {
    title: "Artificial Intelligence in Space Exploration",
    summary: "How AI is changing the way we explore space.",
    link: "/blog/ai-space",
  },
  {
    title: "The Future of Renewable Energy",
    summary: "Innovations that are shaping the future of energy.",
    link: "/blog/renewable-energy",
  },
];

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
