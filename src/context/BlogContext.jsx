import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [topics, setTopics] = useState([]);
  const [selectedTopicIds, setSelectedTopicIds] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [topicsResponse, postsResponse, tagsResponse] = await Promise.all(
          [
            axios.get("https://denniesbor.com/chat/topics/"),
            axios.get("https://denniesbor.com/chat/posts/"),
            axios.get("https://denniesbor.com/chat/tags/"),
          ]
        );

        setTopics(topicsResponse.data);
        setSelectedTopicIds(topicsResponse.data.map((topic) => topic.id)); // Select all topics by default
        setBlogPosts(postsResponse.data);
        setTags(tagsResponse.data);
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleTopic = (topicId) => {
    setSelectedTopicIds((prevTopicIds) =>
      prevTopicIds.includes(topicId)
        ? prevTopicIds.filter((id) => id !== topicId)
        : [...prevTopicIds, topicId]
    );
  };

  return (
    <BlogContext.Provider
      value={{
        topics,
        selectedTopicIds,
        toggleTopic,
        blogPosts,
        tags,
        loading,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};
