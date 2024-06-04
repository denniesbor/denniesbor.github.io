import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";
import Navigation from "./Navigation";
import Footer from "./Footer";
import SharePost from "./SharePost";
import CommentsList from "./CommentsList";

const ReadBlog = () => {
  const { topic, slug } = useParams();
  const [blogPost, setBlogPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `https://denniesbor.com/chat/posts/${slug}/`
        );
        setBlogPost(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch the blog post", err);
        setLoading(false);
      }
    };

    fetchPost();
  }, [topic, slug]); // Dependency array ensures this runs only when topic or slug changes

  if (loading) {
    return <Loading />;
  }

  if (!blogPost) {
    return <p>Post not found.</p>;
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-page-background">
      <div className="w-full max-w-7xl px-4 md:px-4 mx-auto">
        <Navigation />
        <div className="flex flex-col mt-4 leading-loose mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">{blogPost.title}</h1>
          <div className="text-sm text-gray-500 mb-2">
            <span className="mr-2">By {blogPost.author}</span>
            <span className="mr-2">|</span>
            <span>{new Date(blogPost.created_on).toLocaleDateString()}</span>
            <span className="mr-2">|</span>
            <span className="mr-2">Views: {blogPost.view_count}</span>
            <span className="mr-2">|</span>
            <span className="mr-2">Likes: {blogPost.like_count}</span>
            <span className="mr-2">|</span>
            <span className="mr-2">Comments: {blogPost.num_comments}</span>
          </div>
          <div className="flex flex-wrap justify-center space-x-2 mb-4">
            {blogPost.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-500 px-2 py-1 rounded-full text-xs"
              >
                {tag.name}
              </span>
            ))}
          </div>
          <div
            className="text-gray-700 text-left"
            dangerouslySetInnerHTML={{ __html: blogPost.content }}
          ></div>
          <SharePost post={blogPost} />
          {/* <CommentsList comments={blogPost.comments} /> */}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default ReadBlog;
