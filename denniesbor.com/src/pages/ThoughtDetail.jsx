import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import Loading from "../components/common/Loading";
import { api } from "../api/portfolio";

const ThoughtDetail = () => {
  const { category, slug } = useParams();
  const [content, setContent] = useState("");
  const [metadata, setMetadata] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.getThought(category, slug),
      api.getThoughtContent(category, slug)
    ])
      .then(([meta, markdownContent]) => {
        setMetadata(meta);
        setContent(markdownContent);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch thought:", err);
        setLoading(false);
      });
  }, [category, slug]);

  if (loading) return <Loading />;

  if (!metadata) {
    return (
      <div className="mt-20 text-center">
        <h1 className="text-2xl mb-4">Post not found</h1>
        <Link to="/thoughts" className="text-blue-600 hover:underline">
          ← Back to Thoughts
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back Link */}
      <div className="mt-8 mb-4">
        <Link 
          to="/thoughts" 
          className="text-blue-600 hover:underline flex items-center"
        >
          <i className="fas fa-arrow-left mr-2"></i>
          Back to Thoughts
        </Link>
      </div>

      {/* Article Content */}
      <article className="prose prose-lg max-w-none bg-white p-8 rounded-lg shadow-sm border">
        <h1 className="text-4xl font-bold mb-2">{metadata.title}</h1>
        <p className="text-gray-500 mb-8 border-b pb-4">
            Published on {metadata.date}
        </p>
        
        <ReactMarkdown>{content}</ReactMarkdown>
      </article>
    </div>
  );
};

export default ThoughtDetail;