import React from "react";
import BlogPost from "./BlogPost";

const TopicSection = ({ topics }) => {
  // Sample data for blog posts
  const blogPosts = [
    {
      id: 1,
      title: "Post Title 1",
      description: "This is a truncated description for Post Title 1.",
      author: "Author 1",
      tags: ["Tag1", "Tag2"],
      date: "2023-06-01",
      topic: "Topic1",
    },
    {
      id: 2,
      title: "Post Title 2",
      description: "This is a truncated description for Post Title 2.",
      author: "Author 2",
      tags: ["Tag3", "Tag4"],
      date: "2023-05-15",
      topic: "Topic2",
    },
    // Add more blog posts as needed
  ];

  const filteredPosts = blogPosts.filter((post) => topics.includes(post.topic));

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Articles</h2>
      <div className="space-y-4">
        {filteredPosts.map((post, index) => (
          <BlogPost key={index} post={post} />
        ))}
      </div>
    </div>
  );
};

export default TopicSection;
