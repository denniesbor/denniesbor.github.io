import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from "../components/common/Loading";
import { api } from "../api/portfolio";
import { categoryConfig, getCategoryInfo, getTagColor } from "../api/categories";
import LivePreviewModal from "../components/viewers/LivePreviewModal"; // Import the Modal

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // State for the active modal
  const [activePreview, setActivePreview] = useState(null);

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

  const projectsByCategory = projects.reduce((acc, project) => {
    const primaryCategory = project.primaryCategory || project.tags?.[0] || 'other';
    acc[primaryCategory] = acc[primaryCategory] || [];
    acc[primaryCategory].push(project);
    return acc;
  }, {});

  const sortedCategories = Object.keys(categoryConfig).filter(cat => projectsByCategory[cat]);
  const otherCategories = Object.keys(projectsByCategory).filter(cat => !categoryConfig[cat]);
  const allCategories = [...sortedCategories, ...otherCategories];

  // Handler to open modal without navigating
  const handlePreview = (e, url, title) => {
    e.preventDefault(); 
    e.stopPropagation(); 
    setActivePreview({ url, title });
  };

  if (loading) return <Loading />;

  return (
    <div className="w-full py-8 mb-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Technical Portfolio</h1>
        <p className="text-gray-600 dark:text-gray-400">
          A collection of computational projects, simulations, and visualizations.
        </p>
      </div>

      <div className="space-y-12">
        {allCategories.map(category => {
          const catInfo = getCategoryInfo(category);
          const categoryProjects = projectsByCategory[category];

          return (
            <div key={category} className="animate-fade-in">
              {/* Category Header */}
              <div className="flex items-center mb-6 border-b border-gray-200 dark:border-gray-800 pb-2">
                <div className={`p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 mr-3`}>
                    <i className={`fas ${catInfo.icon} text-blue-600 dark:text-blue-400 text-lg`}></i>
                </div>
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 uppercase tracking-wide">
                  {catInfo.name}
                </h2>
                <span className="ml-3 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-xs font-mono py-1 px-2 rounded-full">
                    {categoryProjects.length}
                </span>
              </div>

              {/* Projects Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryProjects.map(project => (
                  <Link
                    key={project.id}
                    to={`/portfolio/${project.id}`}
                    className="group relative border border-gray-200 dark:border-gray-800 rounded-xl p-6 hover:shadow-lg transition-all duration-300 bg-white dark:bg-gray-900 flex flex-col h-full hover:border-blue-300 dark:hover:border-blue-700"
                  >
                    {/* --- ABSOLUTE TOP-RIGHT DEMO BUTTON --- */}
                    {project.demo && (
                        <button
                            onClick={(e) => handlePreview(e, project.demo, project.title)}
                            className="absolute top-4 right-4 z-10 flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider transition shadow-sm border bg-green-50 text-green-700 border-green-200 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800 dark:hover:bg-green-900/40"
                            title="Open Live Preview"
                        >
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            Demo
                        </button>
                    )}

                    <div className="flex justify-between items-start mb-3">
                        {/* Title - Added padding-right (pr-16) to avoid overlap with button */}
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1 pr-16">
                            {project.title}
                        </h3>
                        
                        {/* GitHub Icon (Kept next to title, but below the absolute button) */}
                        {project.github && (
                            <i className="fab fa-github text-gray-400 dark:text-gray-600 text-lg"></i>
                        )}
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 flex-grow line-clamp-3">
                        {project.description}
                    </p>
                    
                    {/* Tags Section */}
                    <div className="mt-auto pt-4 border-t border-gray-50 dark:border-gray-800">
                        {project.tags && project.tags.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                                {project.tags.slice(0, 3).map(tag => (
                                    <span 
                                        key={tag} 
                                        className={`text-[10px] px-2 py-1 rounded font-medium border border-transparent ${getTagColor(tag)}`}
                                    >
                                        {tag}
                                    </span>
                                ))}
                                {project.tags.length > 3 && (
                                    <span className="text-[10px] px-2 py-1 rounded font-medium bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                                        +{project.tags.length - 3}
                                    </span>
                                )}
                            </div>
                        ) : (
                            <div className="flex gap-2 text-xs text-gray-400">
                                <span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                                    <i className="fas fa-code mr-1"></i> Project
                                </span>
                            </div>
                        )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Render Modal ONLY when activePreview is set */}
      {activePreview && (
        <LivePreviewModal 
          url={activePreview.url} 
          title={activePreview.title} 
          onClose={() => setActivePreview(null)} 
        />
      )}
    </div>
  );
};

export default Portfolio;