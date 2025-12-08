import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import Loading from "../components/common/Loading";
import FilePreviewModal from "../components/FilePreviewModal";
import { api } from "../api/portfolio";

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [project, setProject] = useState(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  
  // Modal State
  const [selectedFile, setSelectedFile] = useState(null);

  // Consider moving this to an environment variable in production
  const BASE_URL = "http://localhost:8080/projects";

  // 1. Fetch Project Data & Description
  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        // Fetch Project Metadata
        const data = await api.getProject(id);
        
        if (isMounted) {
          setProject(data);
          
          // Attempt to fetch description.md
          try {
            const resp = await fetch(`${BASE_URL}/${data.path}/description.md`);
            if (resp.ok) {
              const text = await resp.text();
              if (isMounted) setDescription(text);
            }
          } catch (e) {
            console.warn("Description file not found, skipping.");
          }
        }
      } catch (err) {
        console.error("Failed to fetch project:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => { isMounted = false; };
  }, [id]);

  // 2. Memoize File List to prevent Modal re-renders
  const allFiles = useMemo(() => {
    if (!project) return [];
    const files = [];
    const base = `${BASE_URL}/${project.path}`;

    const addFiles = (list, type, icon) => {
        list?.forEach(f => files.push({ name: f, url: `${base}/${f}`, type, icon }));
    };

    addFiles(project.assets.images, 'image', 'fa-image');
    addFiles(project.assets.notebooks, 'notebook', 'fa-book');
    addFiles(project.assets.pdfs, 'pdf', 'fa-file-pdf');

    return files;
  }, [project]);

  // --- Handlers ---
  const handleFileClick = (filename, type, icon) => {
    const url = `${BASE_URL}/${project.path}/${filename}`;
    setSelectedFile({ name: filename, url, type, icon });
  };

  const handleBack = (e) => {
    e.preventDefault();
    // React Router 'default' key implies direct entry (no history stack)
    if (location.key !== "default") {
      navigate(-1); 
    } else {
      navigate('/portfolio');
    }
  };

  if (loading) return <Loading />;

  if (!project) {
    return (
      <div className="mt-20 text-center text-gray-600">
        <h1 className="text-2xl font-bold mb-4">Project not found</h1>
        <button onClick={() => navigate('/portfolio')} className="text-blue-600 hover:underline">
          ← Back to Portfolio
        </button>
      </div>
    );
  }

  // Helper to render file rows to keep JSX clean
  const FileRow = ({ filename, type, icon, colorClass, bgClass, iconClass, label }) => (
    <div 
      onClick={() => handleFileClick(filename, type, iconClass)}
      role="button"
      tabIndex="0"
      className={`flex items-center justify-between px-6 py-3 hover:${bgClass} cursor-pointer transition group border-b border-gray-50 last:border-0`}
      onKeyDown={(e) => e.key === 'Enter' && handleFileClick(filename, type, iconClass)}
    >
      <div className="flex items-center">
        <i className={`${iconClass} ${colorClass} w-8 text-lg group-hover:scale-110 transition-transform`}></i>
        <span className="font-mono text-sm text-gray-700">{filename}</span>
      </div>
      <span className={`text-xs ${colorClass} bg-white border border-gray-200 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity shadow-sm`}>
        {label}
      </span>
    </div>
  );

  return (
    <div className="mt-8 mb-20 max-w-5xl mx-auto px-4 sm:px-6">
      
      {/* NAVIGATION */}
      <div className="mb-6">
        <button 
          onClick={handleBack} 
          className="text-gray-500 hover:text-blue-600 transition-colors flex items-center bg-transparent border-none cursor-pointer p-0 text-sm font-medium"
        >
          <i className="fas fa-arrow-left mr-2"></i> Back to Portfolio
        </button>
      </div>

      {/* HEADER & DESCRIPTION */}
      <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm mb-8 border border-gray-200">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 border-b border-gray-100 pb-4">
              {project.title}
          </h1>
          
          <div className="prose prose-slate prose-headings:font-bold prose-a:text-blue-600 max-w-none text-gray-600">
            {description ? (
                <ReactMarkdown>{description}</ReactMarkdown>
            ) : (
                <p className="italic opacity-60">No description available for this project.</p>
            )}
          </div>
      </div>

      {/* FILE BROWSER */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-12 overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center">
              <i className="fas fa-folder-open text-yellow-600 mr-3 text-lg"></i>
              <span className="font-bold text-gray-700">Project Files</span>
          </div>

          <div className="flex flex-col">
              
              {/* NOTEBOOKS */}
              {project.assets.notebooks?.map(nb => (
                <FileRow 
                  key={nb} 
                  filename={nb} 
                  type="notebook" 
                  iconClass="fas fa-book"
                  colorClass="text-orange-500"
                  bgClass="bg-orange-50"
                  label="View Notebook"
                />
              ))}

              {/* PDFS */}
              {project.assets.pdfs?.map(pdf => (
                <FileRow 
                  key={pdf} 
                  filename={pdf} 
                  type="pdf" 
                  iconClass="fas fa-file-pdf"
                  colorClass="text-red-500"
                  bgClass="bg-red-50"
                  label="View PDF"
                />
              ))}

              {/* IMAGES */}
              {project.assets.images?.map(img => (
                <FileRow 
                  key={img} 
                  filename={img} 
                  type="image" 
                  iconClass="fas fa-image"
                  colorClass="text-purple-500"
                  bgClass="bg-purple-50"
                  label="Preview Image"
                />
              ))}

              {/* DATA (Direct Download) */}
              {project.assets.data?.map(d => (
                  <a 
                      key={d} 
                      href={`${BASE_URL}/${project.path}/${d}`}
                      download
                      className="flex items-center justify-between px-6 py-3 hover:bg-green-50 transition group border-b border-gray-50 last:border-0"
                  >
                      <div className="flex items-center">
                          <i className="fas fa-database text-green-600 w-8 text-lg group-hover:scale-110 transition-transform"></i>
                          <span className="font-mono text-sm text-gray-700">{d}</span>
                      </div>
                      <span className="text-xs text-green-700 bg-white border border-green-200 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                          Download Data
                      </span>
                  </a>
              ))}

              {/* Empty State */}
              {(!project.assets.notebooks?.length && 
                !project.assets.pdfs?.length && 
                !project.assets.images?.length && 
                !project.assets.data?.length) && (
                  <div className="p-8 text-center text-gray-400 italic bg-gray-50/50">
                      <i className="fas fa-box-open text-2xl mb-2 block opacity-30"></i>
                      No files available for this project.
                  </div>
              )}
          </div>
      </div>

      {/* MODAL ORCHESTRATOR */}
      {selectedFile && (
          <FilePreviewModal 
              initialFile={selectedFile} 
              allProjectFiles={allFiles} 
              onClose={() => setSelectedFile(null)} 
          />
      )}
    </div>
  );
};

export default ProjectDetail;