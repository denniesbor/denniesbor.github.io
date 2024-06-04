import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BlogContext } from "../context/BlogContext";

const BlogPost = ({ post, tags }) => {
  const { topics } = useContext(BlogContext);

  //   filter topic name based on post.topic
  const topic = topics.find((t) => t.id === post.topic);

  return (
    <div className="border p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 w-full mb-4">
      <h3 className="text-xl font-semibold mb-2">
        <Link to={`${topic.slug}/${post.slug}`}>{post.title}</Link>
      </h3>
      <p
        className="text-gray-600 mb-4"
        dangerouslySetInnerHTML={{ __html: post.summary }}
      ></p>
      <div className="text-sm text-gray-500 mb-2">
        <span className="mr-2">By {post.author}</span>
        <span className="mr-2">|</span>
        <span>{new Date(post.created_on).toLocaleDateString()}</span>
        <span className="mr-2">|</span>
        <span className="mr-2">Views: {post.view_count}</span>
        <span className="mr-2">|</span>
        <span className="mr-2">Likes: {post.like_count}</span>
        <span className="mr-2">|</span>
        <span className="mr-2">Comments: {post.num_comments}</span>
      </div>
      <div className="flex flex-wrap space-x-2">
        {post.tags &&
          post.tags.map((tagId, index) => {
            const tag = tags.find((t) => t.id === tagId);
            return (
              <span
                key={index}
                className="bg-blue-100 text-blue-500 px-2 py-1 rounded-full text-xs"
              >
                {tag ? tag.name : `Tag ${tagId}`}
              </span>
            );
          })}
      </div>
    </div>
  );
};

export default BlogPost;
