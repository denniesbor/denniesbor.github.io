import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from "../components/common/Loading";
import { api } from "../api/portfolio";

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getProjects()
      .then(data => {
        setProjects(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch projects:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <Loading />;

  return (
    // PURE CONTENT - No Nav, No Footer, No Outer Container
    <div className="w-full py-8">
 
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(project => (
          <Link
            key={project.id}
            to={`/portfolio/${project.id}`}
            className="border rounded-lg p-6 hover:shadow-xl transition-shadow bg-white flex flex-col h-full"
          >
            <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
            <p className="text-gray-600 text-sm mb-4 flex-grow">{project.path}</p>
            
            <div className="flex flex-wrap gap-2 text-xs mt-auto">
              {project.assets.notebooks?.length > 0 && (
                <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded">
                  📓 {project.assets.notebooks.length} Notebooks
                </span>
              )}
              {project.assets.images?.length > 0 && (
                <span className="bg-green-100 text-green-600 px-2 py-1 rounded">
                  🖼️ {project.assets.images.length} Images
                </span>
              )}
              {project.assets.data?.length > 0 && (
                <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded">
                  💾 {project.assets.data.length} Data
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;