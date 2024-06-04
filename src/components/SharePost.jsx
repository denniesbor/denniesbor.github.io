import React, { useState, useEffect } from "react";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import axios from "axios";

const SharePost = ({ post }) => {
  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard!");
  };

  console.log(post.id);

  const [showCard, setShowCard] = useState(false);
  const [name, setName] = useState("");

  const handleButtonClick = () => {
    setShowCard(true);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSendClick = (post) => {
    let id = post.id;
    axios
      .post("https://denniesbor.com/chat/likes/", {
        post: id,
        name: name,
      })
      .then(() => {
        setName("");
        setShowCard(false);
      })
      .catch((error) => {
        console.error("Error adding like:", error);
      });
  };

  return (
    <div className="flex space-x-4 mt-8">
      <TwitterShareButton
        url={window.location.href}
        title={post.title}
        className="text-blue-500"
      >
        <i className="fab fa-twitter"></i> Share to X
      </TwitterShareButton>
      <FacebookShareButton
        url={window.location.href}
        quote={post.title}
        className="text-blue-600"
      >
        <i className="fab fa-facebook"></i> Share to Facebook
      </FacebookShareButton>
      <button onClick={copyLink} className="text-green-500">
        <i className="fas fa-link"></i> Copy Link
      </button>
      <div>
        <button onClick={handleButtonClick} className="text-red-500">
          <i className="fas fa-heart"></i> Like
        </button>
        {showCard && (
          <div className="p-4 mt-2 border border-gray-300 rounded">
            <textarea
              value={name}
              onChange={handleNameChange}
              placeholder="Enter your name"
              className="p-2 border border-gray-300 rounded w-full"
            />
            <button
              onClick={() => handleSendClick(post)}
              className="px-4 py-2 bg-blue-500 text-white rounded mt-2"
            >
              Send
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SharePost;
