import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navigation from "./components/common/Navigation";
import Footer from "./components/common/Footer";
import ResearchHighlights from "./components/portfolio/ResearchHighlights";
import ProfileSidebar from "./components/portfolio/ProfileSidebar";
import { api } from "./api/portfolio";
import { categoryConfig, getCategoryInfo, getTagColor } from "./api/categories";

function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [projects, setProjects] = useState([]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    api.getProjects()
      .then(data => setProjects(data))
      .catch(err => console.error("Failed to fetch projects:", err));
  }, []);

  // Group projects by primary category (from backend)
  const projectsByCategory = projects.reduce((acc, project) => {
    const primaryCategory = project.primaryCategory || project.tags?.[0] || 'other';
    acc[primaryCategory] = acc[primaryCategory] || [];
    acc[primaryCategory].push(project);
    return acc;
  }, {});

  return (
    <div className="flex flex-col items-center min-h-screen bg-page-background">
      <div className="w-full max-w-8xl px-4 md:px-4">
        <Navigation toggleSidebar={toggleSidebar} />
        
        <div className="flex gap-4">
          <ProfileSidebar
            isOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
          />
          
          <div className="flex-1 py-8">
            <ResearchHighlights />
          </div>

          <div className="hidden lg:block w-80 py-8">
            <div className="bg-white rounded-lg border border-gray-200 p-4 sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto">
              <h3 className="text-lg font-bold mb-4 flex items-center border-b pb-3">
                <i className="fas fa-code mr-2 text-gray-500"></i>
                Technical Projects
              </h3>
              
              <div className="space-y-6">
                {Object.entries(projectsByCategory)
                  .filter(([category]) => categoryConfig[category])
                  .slice(0, 3)
                  .map(([category, categoryProjects]) => {
                    const catInfo = getCategoryInfo(category);
                    return (
                      <div key={category}>
                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center">
                          <i className={`fas ${catInfo.icon} mr-2 text-blue-600`}></i>
                          {catInfo.name}
                        </h4>
                        
                        <div className="space-y-2">
                          {categoryProjects.map(project => (
                            <Link
                              key={project.id}
                              to={`/portfolio/${project.id}`}
                              className="block p-2 hover:bg-blue-50 rounded border border-transparent hover:border-blue-200 transition group"
                            >
                              <div className="font-semibold text-sm text-gray-800 group-hover:text-blue-600 mb-1">
                                {project.title}
                              </div>
                              
                              {project.tags && project.tags.length > 0 && (
                                <div className="flex flex-wrap gap-1">
                                  {project.tags.map(tag => (
                                    <span 
                                      key={tag} 
                                      className={`text-[9px] px-1.5 py-0.5 rounded font-medium ${getTagColor(tag)}`}
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </Link>
                          ))}
                        </div>
                      </div>
                    );
                  })}
              </div>

              <Link 
                to="/portfolio" 
                className="block text-center text-blue-600 hover:text-blue-800 font-semibold text-sm border-t pt-3 mt-6"
              >
                View All Projects
                <i className="fas fa-arrow-right ml-2"></i>
              </Link>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    </div>
  );
}

export default Home;