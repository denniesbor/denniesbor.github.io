import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import Loading from "../components/common/Loading";
import FilePreviewModal from "../components/FilePreviewModal";
import { api, STATIC_BASE } from "../api/portfolio";

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [project, setProject] = useState(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);

  const FILES_URL = `${STATIC_BASE}/projects`;

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const data = await api.getProject(id);
        
        if (isMounted) {
          setProject(data);
          
          try {
            const resp = await fetch(`${FILES_URL}/${data.path}/description.md`);
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
  }, [id, FILES_URL]);

  const allFiles = useMemo(() => {
    if (!project) return [];
    const files = [];
    const base = `${FILES_URL}/${project.path}`;

    const addFiles = (list, type, icon) => {
        list?.forEach(f => files.push({ name: f, url: `${base}/${f}`, type, icon }));
    };

    addFiles(project.assets.images, 'image', 'fa-image');
    addFiles(project.assets.notebooks, 'notebook', 'fa-book');
    addFiles(project.assets.pdfs, 'pdf', 'fa-file-pdf');

    return files;
  }, [project, FILES_URL]);

  const handleFileClick = (filename, type, icon) => {
    const url = `${FILES_URL}/${project.path}/${filename}`;
    setSelectedFile({ name: filename, url, type, icon });
  };

  const handleBack = (e) => {
    e.preventDefault();
    if (location.key !== "default") {
      navigate(-1); 
    } else {
      navigate('/portfolio');
    }
  };

  if (loading) return <Loading />;

  if (!project) {
    return (
      <div className="mt-20 text-center text-gray-600 dark:text-gray-400">
        <h1 className="text-2xl font-bold mb-4">Project not found</h1>
        <button onClick={() => navigate('/portfolio')} className="text-blue-600 hover:underline dark:text-blue-400">
          ← Back to Portfolio
        </button>
      </div>
    );
  }

  const FileRow = ({ filename, type, icon, colorClass, bgClass, iconClass, label }) => (
    <div 
      onClick={() => handleFileClick(filename, type, iconClass)}
      role="button"
      tabIndex="0"
      className={`flex items-center justify-between px-6 py-3 hover:${bgClass} dark:hover:bg-gray-800 cursor-pointer transition group border-b border-gray-50 dark:border-gray-800 last:border-0`}
      onKeyDown={(e) => e.key === 'Enter' && handleFileClick(filename, type, iconClass)}
    >
      <div className="flex items-center">
        <i className={`${iconClass} ${colorClass} w-8 text-lg group-hover:scale-110 transition-transform`}></i>
        <span className="font-mono text-sm text-gray-700 dark:text-gray-300">{filename}</span>
      </div>
      <span className={`text-xs ${colorClass} bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity shadow-sm`}>
        {label}
      </span>
    </div>
  );

  return (
    <div className="mt-8 mb-20 max-w-5xl mx-auto px-4 sm:px-6">
      
      <div className="mb-6">
        <button 
          onClick={handleBack} 
          className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors flex items-center bg-transparent border-none cursor-pointer p-0 text-sm font-medium"
        >
          <i className="fas fa-arrow-left mr-2"></i> Back to Portfolio
        </button>
      </div>

      <div className="bg-white dark:bg-gray-900 p-6 md:p-8 rounded-xl shadow-sm mb-8 border border-gray-200 dark:border-gray-800 transition-colors duration-200">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-4">
              {project.title}
          </h1>
          
          {(project.demo || project.github) && (
            <div className="flex flex-wrap gap-3 mb-6">
              {project.demo && (
                // Fixed: Added opening <a> tag
                <a 
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  <i className="fas fa-external-link-alt mr-2"></i>
                  Open Full Demo
                </a>
              )}
              {project.github && (
                // Fixed: Added opening <a> tag
                <a 
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-gray-900 dark:bg-gray-800 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-700 transition-colors text-sm font-medium"
                >
                  <i className="fab fa-github mr-2"></i>
                  View Source
                </a>
              )}
            </div>
          )}

          {project.demo && (
            <div className="mb-6 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-800 shadow-sm">
              <div className="bg-gray-900 dark:bg-black px-4 py-2 flex items-center justify-between">
                <span className="text-xs font-mono text-gray-300">
                  <i className="fas fa-desktop mr-2"></i>
                  Live Preview
                </span>
                
                {/* Fixed: Added opening <a> tag */}
                <a 
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition text-xs flex items-center"
                  title="Open in new tab"
                >
                  <i className="fas fa-expand-alt mr-1"></i>
                  Fullscreen
                </a>
              </div>
              <iframe
                src={project.demo}
                className="w-full h-[400px] bg-white"
                title={`${project.title} Demo`}
                allow="accelerometer; gyroscope; fullscreen"
                loading="lazy"
                sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
              />
            </div>
          )}
          
          <div className="prose prose-slate dark:prose-invert prose-headings:font-bold prose-a:text-blue-600 dark:prose-a:text-blue-400 max-w-none text-gray-600 dark:text-gray-300">
            {description ? (
                <ReactMarkdown
                  remarkPlugins={[remarkMath]}
                  rehypePlugins={[rehypeKatex]}
                >
                  {description}
                </ReactMarkdown>
            ) : (
                <p className="italic opacity-60">No description available for this project.</p>
            )}
          </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 mb-12 overflow-hidden transition-colors duration-200">
          <div className="bg-gray-50 dark:bg-gray-800 px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center">
              <i className="fas fa-folder-open text-yellow-600 mr-3 text-lg"></i>
              <span className="font-bold text-gray-700 dark:text-gray-200">Project Files</span>
          </div>

          <div className="flex flex-col">
              
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

              {project.assets.data?.map(d => (
                  <a 
                      key={d} 
                      href={`${FILES_URL}/${project.path}/${d}`}
                      download
                      className="flex items-center justify-between px-6 py-3 hover:bg-green-50 dark:hover:bg-gray-800 transition group border-b border-gray-50 dark:border-gray-800 last:border-0"
                  >
                      <div className="flex items-center">
                          <i className="fas fa-database text-green-600 w-8 text-lg group-hover:scale-110 transition-transform"></i>
                          <span className="font-mono text-sm text-gray-700 dark:text-gray-300">{d}</span>
                      </div>
                      <span className="text-xs text-green-700 dark:text-green-400 bg-white dark:bg-gray-900 border border-green-200 dark:border-green-800 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                          Download Data
                      </span>
                  </a>
              ))}

              {(!project.assets.notebooks?.length && 
                !project.assets.pdfs?.length && 
                !project.assets.images?.length && 
                !project.assets.data?.length) && (
                  <div className="p-8 text-center text-gray-400 dark:text-gray-500 italic bg-gray-50/50 dark:bg-gray-800/50">
                      <i className="fas fa-box-open text-2xl mb-2 block opacity-30"></i>
                      No files available for this project.
                  </div>
              )}
          </div>
      </div>

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