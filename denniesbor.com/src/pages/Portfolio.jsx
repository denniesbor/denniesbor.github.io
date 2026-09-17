import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from "../components/common/Loading";
import ResearchDashboards from "../components/portfolio/ResearchDashboards";
import { api } from "../api/portfolio";
import { categoryConfig, getCategoryInfo, getTagColor } from "../api/categories";
import LivePreviewModal from "../components/viewers/LivePreviewModal";

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [activePreview, setActivePreview] = useState(null);

  useEffect(() => {
    api.getProjects()
      .then((data) => {
        if (!Array.isArray(data)) throw new Error("Invalid project list");
        setProjects(data);
      })
      .catch(() => setFailed(true))
      .finally(() => setLoading(false));
  }, []);

  const projectsByCategory = projects.reduce((acc, project) => {
    const category = project.primaryCategory || project.tags?.[0] || "other";
    (acc[category] ||= []).push(project);
    return acc;
  }, {});
  const allCategories = [
    ...Object.keys(categoryConfig).filter((category) => projectsByCategory[category]),
    ...Object.keys(projectsByCategory).filter((category) => !categoryConfig[category]),
  ];

  return (
    <main className="w-full py-8 mb-12">
      <header className="mb-10 border-b border-gray-200 pb-8 dark:border-gray-700">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Research tools and technical projects</h1>
        <p className="mt-3 max-w-3xl text-lg leading-relaxed text-gray-600 dark:text-gray-300">Explore how natural hazards can affect infrastructure, then look inside the computational methods, simulations, and visualizations behind my work.</p>
        <nav aria-label="Browse portfolio sections" className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-blue-800 dark:text-blue-300">
          <a href="#dashboards-heading" className="underline underline-offset-4">Interactive tools and film</a>
          <a href="#technical-projects" className="underline underline-offset-4">Computational projects</a>
          <Link to="/#research-heading" className="underline underline-offset-4">Papers and collaborations</Link>
        </nav>
      </header>
      <ResearchDashboards />
      <section aria-labelledby="technical-projects">
        <h2 id="technical-projects" className="scroll-mt-6 text-2xl font-bold text-gray-900 dark:text-white">Computational projects</h2>
        <p className="mt-3 mb-8 max-w-3xl leading-relaxed text-gray-600 dark:text-gray-300">Explore individual methods and experiments, with derivations, code, notebooks, and visualizations available in the project notes.</p>
        {loading ? <Loading /> : failed ? (
          <p role="alert" className="rounded-lg border border-gray-200 bg-white p-5 text-gray-700">Technical projects could not be loaded. The research tools above are still available.</p>
        ) : (
          <div className="space-y-10">
            {allCategories.map((category) => {
              const info = getCategoryInfo(category);
              return (
                <section key={category} aria-labelledby={`category-${category}`}>
                  <div className="mb-5 flex items-center gap-3 border-b border-gray-200 pb-3 dark:border-gray-700">
                    <i aria-hidden="true" className={`fas ${info.icon} text-blue-700 dark:text-blue-300`} />
                    <h3 id={`category-${category}`} className="text-xl font-bold text-gray-800 dark:text-gray-100">{info.name}</h3>
                    <span className="text-sm text-gray-500">{projectsByCategory[category].length} projects</span>
                  </div>
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {projectsByCategory[category].map((project) => (
                      <article key={project.id} className="flex min-w-0 flex-col rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
                        <h4 className="text-lg font-bold leading-snug text-gray-900 dark:text-white">
                          <Link to={`/portfolio/${project.id}`} className="hover:text-blue-700 hover:underline dark:hover:text-blue-300">{project.title}</Link>
                        </h4>
                        <p className="my-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300">{project.description}</p>
                        {project.tags?.length > 0 && (
                          <div className="mb-5 flex flex-wrap gap-2">
                            {project.tags.map((tag) => <span key={tag} className={`break-all rounded px-2 py-1 text-xs ${getTagColor(tag)}`}>{tag}</span>)}
                          </div>
                        )}
                        <div className="mt-auto flex flex-wrap gap-x-5 gap-y-3 border-t border-gray-100 pt-4 text-sm dark:border-gray-800">
                          <Link to={`/portfolio/${project.id}`} className="font-semibold text-blue-700 hover:underline dark:text-blue-300">Read project notes<span className="sr-only">: {project.title}</span></Link>
                          {project.demo && <button type="button" onClick={() => setActivePreview({ url: project.demo, title: project.title })} className="text-blue-700 hover:underline dark:text-blue-300">Preview demo<span className="sr-only">: {project.title}</span></button>}
                          {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:underline dark:text-gray-300">View source code<span className="sr-only">: {project.title}</span></a>}
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              );
            })}
            {projects.length === 0 && <p className="text-gray-600">No technical projects are available.</p>}
          </div>
        )}
      </section>
      {activePreview && <LivePreviewModal url={activePreview.url} title={activePreview.title} onClose={() => setActivePreview(null)} />}
    </main>
  );
};

export default Portfolio;
