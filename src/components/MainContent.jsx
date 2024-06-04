import React, { useContext } from "react";
import { BlogContext } from "../context/BlogContext";
import TopicSection from "./TopicSection";
import Loading from "./Loading";

const MainContent = () => {
  const { topics, selectedTopicIds, toggleTopic, loading } =
    useContext(BlogContext);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex-1 p-4">
      <div className="w-full">
        <div className="flex justify-center space-x-4 mb-8">
          {topics.map((topic) => (
            <div
              key={topic.id}
              className={`inline-block px-2 py-1 rounded-full text-sm cursor-pointer ${
                selectedTopicIds.includes(topic.id)
                  ? "bg-blue-500 text-white"
                  : "bg-blue-100 text-blue-500"
              }`}
              onClick={() => toggleTopic(topic.id)}
            >
              {topic.name}
            </div>
          ))}
        </div>
        <TopicSection topicIds={selectedTopicIds} />
      </div>
    </div>
  );
};

export default MainContent;
