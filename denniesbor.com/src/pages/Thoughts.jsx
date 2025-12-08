import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from "../components/common/Loading";
import { api } from "../api/portfolio";

const Thoughts = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getThoughts()
      .then(data => {
        setCategories(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch thoughts:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <Loading />;

  return (
    <>
      <div className="mt-8">
        
        {categories.map(category => (
          <div key={category.slug} className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
              {category.name}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {category.posts.map(post => (
                <Link
                  key={post.slug}
                  to={`/thoughts/${category.slug}/${post.slug}`}
                  className="border rounded-lg p-4 hover:shadow-lg transition-shadow bg-white"
                >
                  <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{post.date}</p>
                  <p className="text-gray-700">{post.summary}</p>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Thoughts;