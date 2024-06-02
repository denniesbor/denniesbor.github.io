import React from "react";
import { useParams } from "react-router-dom";

const ReadBlog = () => {
  const { id } = useParams();
  // Fetch the blog post using the id
  const blogPost = {
    id,
    title: "Post Title",
    content: "This is the full content of the blog post.",
    author: "Author Name",
    date: "2023-06-01",
    tags: ["Tag1", "Tag2"],
  };

  return (
    <div className="p-4 w-full mx-auto mb-4">
      <h1 className="text-3xl font-bold mb-4">{blogPost.title}</h1>
      <div className="text-sm text-gray-500 mb-2">
        <span className="mr-2">By {blogPost.author}</span>
        <span className="mr-2">|</span>
        <span>{new Date(blogPost.date).toLocaleDateString()}</span>
      </div>
      <div className="flex flex-wrap space-x-2 mb-4">
        {blogPost.tags.map((tag, index) => (
          <span
            key={index}
            className="bg-blue-100 text-blue-500 px-2 py-1 rounded-full text-xs"
          >
            {tag}
          </span>
        ))}
      </div>
      <p className="text-gray-700">{blogPost.content}</p>
    </div>
  );
};

export default ReadBlog;
