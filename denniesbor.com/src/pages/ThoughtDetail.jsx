import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import Loading from "../components/common/Loading";
import { api, STATIC_BASE } from "../api/portfolio";

const ThoughtDetail = () => {
  const { category, slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const passedMetadata = location.state?.post;
  
  const [content, setContent] = useState("");
  const [metadata, setMetadata] = useState(passedMetadata || null);
  const [loading, setLoading] = useState(true);

  const stripFrontmatter = (markdown) => {
    const frontmatterRegex = /^---\n[\s\S]*?\n---\n/;
    let cleaned = markdown.replace(frontmatterRegex, '').trim();
    
    cleaned = cleaned.replace(/^#\s+.+\n/, '').trim();
    
    return cleaned;
  };

  useEffect(() => {
    if (passedMetadata) {
      api.getThoughtContent(category, slug)
        .then(markdownContent => {
          setContent(stripFrontmatter(markdownContent));
          setLoading(false);
        })
        .catch(err => {
          console.error("Failed to fetch thought content:", err);
          setLoading(false);
        });
    } else {
      Promise.all([
        api.getThought(category, slug),
        api.getThoughtContent(category, slug)
      ])
        .then(([meta, markdownContent]) => {
          setMetadata(meta);
          setContent(stripFrontmatter(markdownContent));
          setLoading(false);
        })
        .catch(err => {
          console.error("Failed to fetch thought:", err);
          setLoading(false);
        });
    }
  }, [category, slug, passedMetadata]);

  const handleBack = (e) => {
    e.preventDefault();
    if (location.key !== "default") {
      navigate(-1); 
    } else {
      navigate('/thoughts');
    }
  };

  const MarkdownComponents = {
    img: ({ node, ...props }) => {
      const { src, alt } = props;
      const imageSrc = src.startsWith('http') 
        ? src 
        : `${STATIC_BASE}/thoughts/${category}/${slug}/${src}`;
      
      return (
        <img 
          {...props} 
          src={imageSrc} 
          alt={alt}
          className="w-full rounded-lg my-4 border border-gray-200 dark:border-gray-700"
        />
      );
    }
  };

  if (loading) return <Loading />;

  if (!metadata) {
    return (
      <div className="mt-20 text-center text-gray-600 dark:text-gray-400">
        <h1 className="text-2xl font-bold mb-4">Post not found</h1>
        <button onClick={() => navigate('/thoughts')} className="text-blue-600 hover:underline dark:text-blue-400">
          ← Back to Thoughts
        </button>
      </div>
    );
  }

  return (
    <div className="mt-8 mb-20 max-w-5xl mx-auto px-4 sm:px-6">
      <div className="mb-6">
        <button 
          onClick={handleBack} 
          className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors flex items-center bg-transparent border-none cursor-pointer p-0 text-sm font-medium"
        >
          <i className="fas fa-arrow-left mr-2"></i> Back to Thoughts
        </button>
      </div>

      <article className="bg-white dark:bg-gray-900 p-6 md:p-8 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 transition-colors duration-200">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900 dark:text-white">
          {metadata.title}
        </h1>
        
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100 dark:border-gray-800">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            <i className="fas fa-calendar-alt mr-2"></i>
            {metadata.date}
          </p>
          {metadata.tags && metadata.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {metadata.tags.map(tag => (
                <span 
                  key={tag}
                  className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        
        <div className="prose prose-slate dark:prose-invert prose-headings:font-bold prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-code:text-pink-600 dark:prose-code:text-pink-400 prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800 max-w-none text-gray-600 dark:text-gray-300">
          <ReactMarkdown
            remarkPlugins={[remarkMath]}
            rehypePlugins={[rehypeKatex]}
            components={MarkdownComponents}
          >
            {content}
          </ReactMarkdown>
        </div>
      </article>
    </div>
  );
};

export default ThoughtDetail;