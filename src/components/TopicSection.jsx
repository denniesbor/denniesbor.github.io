import React, { useContext } from "react";
import { BlogContext } from "../context/BlogContext";
import BlogPost from "./BlogPost";
import Loading from "./Loading";

const TopicSection = ({ topicIds }) => {
  const { blogPosts, tags, loading } = useContext(BlogContext);

  if (loading) {
    return <Loading />;
  }

  const filteredPosts = blogPosts.filter(
    (post) => topicIds && topicIds.includes(post.topic)
  );

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Articles</h2>
      <div className="space-y-4">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post, index) => (
            <BlogPost key={index} post={post} tags={tags} />
          ))
        ) : (
          <p>No articles available for the selected topics.</p>
        )}
      </div>
    </div>
  );
};

export default TopicSection;
