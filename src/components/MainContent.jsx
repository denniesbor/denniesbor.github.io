import React, { useState } from "react";
import TopicSection from "./TopicSection";

const MainContent = () => {
  const initialTopics = ["Topic1", "Topic2", "Topic3", "Topic4", "Topic5"];
  const [selectedTopics, setSelectedTopics] = useState(initialTopics);

  const toggleTopic = (topic) => {
    setSelectedTopics((prevTopics) =>
      prevTopics.includes(topic)
        ? prevTopics.filter((t) => t !== topic)
        : [...prevTopics, topic]
    );
  };

  return (
    <div className="flex-1 p-4">
      <div className="w-full">
        <div className="flex justify-center space-x-4 mb-8">
          {initialTopics.map((topic, index) => (
            <div
              key={index}
              className={`inline-block px-2 py-1 rounded-full text-sm cursor-pointer ${
                selectedTopics.includes(topic)
                  ? "bg-blue-500 text-white"
                  : "bg-blue-100 text-blue-500"
              }`}
              onClick={() => toggleTopic(topic)}
            >
              {topic}
            </div>
          ))}
        </div>
        <TopicSection topics={selectedTopics} />
      </div>
    </div>
  );
};

export default MainContent;
