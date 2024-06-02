import React from "react";
import { Link } from "react-router-dom";

const BlogPost = ({ post }) => {
  return (
    <div className="border p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 w-full mb-4">
      <h3 className="text-xl font-semibold mb-2">
        <Link to={`/blog/${post.id}`}>{post.title}</Link>
      </h3>
      <p className="text-gray-600 mb-4">{post.description}</p>
      <div className="text-sm text-gray-500 mb-2">
        <span className="mr-2">By {post.author}</span>
        <span className="mr-2">|</span>
        <span>{new Date(post.date).toLocaleDateString()}</span>
      </div>
      <div className="flex flex-wrap space-x-2">
        {post.tags.map((tag, index) => (
          <span
            key={index}
            className="bg-blue-100 text-blue-500 px-2 py-1 rounded-full text-xs"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default BlogPost;
