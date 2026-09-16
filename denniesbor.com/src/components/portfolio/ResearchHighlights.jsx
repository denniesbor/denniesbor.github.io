import { useState } from "react";
import { Link } from "react-router-dom";
import papers from "../../api/papers";
import LivePreviewModal from "../viewers/LivePreviewModal";

const sections = [
  { id: "publications", title: "Publications & preprints", description: "Journal articles and public research manuscripts." },
  { id: "assip", title: "ASSIP collaborations", description: "Coauthored research through George Mason University's Aspiring Scientists Summer Internship Program. Abstracts, preprints, and developing manuscripts are labeled individually." },
  { id: "in-progress", title: "Work in progress", description: "Current research and manuscripts in preparation." },
];

const statusColors = {
  Published: "bg-green-50 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800",
  "Published abstract": "bg-teal-50 text-teal-800 border-teal-200 dark:bg-teal-900/20 dark:text-teal-300 dark:border-teal-800",
  "In press": "bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800",
  "Under review": "bg-orange-50 text-orange-800 border-orange-200 dark:bg-orange-900/20 dark:text-orange-300 dark:border-orange-800",
  Preprint: "bg-orange-50 text-orange-800 border-orange-200 dark:bg-orange-900/20 dark:text-orange-300 dark:border-orange-800",
  "In preparation": "bg-gray-100 text-gray-700 border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700",
  "In progress": "bg-gray-100 text-gray-700 border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700",
};

const linkClass = "inline-flex items-center gap-1.5 rounded border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600";

const ResearchHighlights = () => {
  const [query, setQuery] = useState("");
  const [section, setSection] = useState("all");
  const [expanded, setExpanded] = useState({});
  const [preview, setPreview] = useState(null);
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const filtered = papers.filter((paper) => {
    const searchable = [paper.id, paper.title, ...paper.authors, paper.description, paper.venue, paper.status, paper.collaboration, paper.note, paper.year].join(" ").toLowerCase();
    return (section === "all" || paper.section === section) && terms.every((term) => searchable.includes(term));
  });

  return (
    <section aria-labelledby="research-heading" className="w-full min-w-0">
      <h2 id="research-heading" className="text-2xl font-bold text-gray-900 dark:text-white">Research & collaborations</h2>
      <p className="mt-2 mb-5 text-sm text-gray-600 dark:text-gray-300">Publications, student collaborations, and ongoing research across space weather, infrastructure, and computational science.</p>
      <div className="grid gap-3 sm:grid-cols-2 mb-3">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
          Search research
          <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Title, collaborator, topic, or year" className="mt-1 block w-full rounded border border-gray-300 bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-900" />
        </label>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
          <span id="research-section-label">Section</span>
          <select aria-labelledby="research-section-label" value={section} onChange={(event) => setSection(event.target.value)} className="mt-1 block w-full rounded border border-gray-300 bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-900">
            <option value="all">All research</option>
            {sections.map((item) => <option key={item.id} value={item.id}>{item.title}</option>)}
          </select>
        </label>
      </div>
      <p role="status" className="mb-6 text-sm text-gray-500 dark:text-gray-400">Showing {filtered.length} of {papers.length} research records</p>
      {filtered.length === 0 && (
        <div className="rounded border border-gray-200 bg-white p-6 dark:bg-gray-900 dark:border-gray-700">
          <p>No research matches these filters.</p>
          <button type="button" className="mt-3 text-blue-700 underline dark:text-blue-300" onClick={() => { setQuery(""); setSection("all"); }}>Clear filters</button>
        </div>
      )}
      {sections.map((group) => {
        const entries = filtered.filter((paper) => paper.section === group.id);
        if (!entries.length) return null;
        return (
          <section key={group.id} aria-labelledby={`research-${group.id}`} className="mb-10">
            <h3 id={`research-${group.id}`} className="text-xl font-bold border-b pb-2 text-gray-900 dark:text-white dark:border-gray-700">{group.title}</h3>
            <p className="mt-2 mb-4 text-sm text-gray-600 dark:text-gray-300">{group.description}</p>
            <div className="space-y-4">
              {entries.map((paper) => {
                const isExpanded = Boolean(expanded[paper.id]);
                const hasMore = paper.description.length > 180;
                return (
                  <article key={paper.id} id={paper.id} className={`min-w-0 break-words rounded-lg border p-5 ${paper.featured ? "border-blue-200 bg-blue-50 dark:bg-blue-900/10 dark:border-blue-800" : "border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-700"}`}>
                    <div className="flex flex-wrap items-center gap-2 mb-3 text-xs">
                      <span className={`rounded border px-2 py-1 font-medium ${statusColors[paper.status]}`}>{paper.status}</span>
                      <span className="rounded border border-blue-200 px-2 py-1 text-blue-800 dark:border-blue-800 dark:text-blue-300">{paper.role}</span>
                      {paper.collaboration && <span className="rounded border border-purple-200 px-2 py-1 text-purple-800 dark:border-purple-800 dark:text-purple-300">{paper.collaboration}</span>}
                      {paper.year && <span className="text-gray-600 dark:text-gray-400">{paper.year}</span>}
                    </div>
                    <h4 className="text-lg font-bold leading-snug text-gray-900 dark:text-white">{paper.title}</h4>
                    {paper.authors.length > 0 && <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">{paper.authors.join(", ")}</p>}
                    {paper.venue && <p className="mt-1 text-sm italic text-gray-600 dark:text-gray-400">{paper.venue}</p>}
                    {paper.contribution && <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">{paper.contribution}</p>}
                    <p id={`${paper.id}-description`} className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                      {isExpanded || !hasMore ? paper.description : `${paper.description.slice(0, 180).trimEnd()}…`}
                    </p>
                    {hasMore && <button type="button" aria-expanded={isExpanded} aria-controls={`${paper.id}-description`} onClick={() => setExpanded((current) => ({ ...current, [paper.id]: !current[paper.id] }))} className="mt-1 text-sm text-blue-700 hover:underline dark:text-blue-300">{isExpanded ? "Show less" : "Read more"}</button>}
                    {paper.note && <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">{paper.note}</p>}
                    <div className="mt-4 flex flex-wrap gap-2 border-t border-gray-100 pt-3 dark:border-gray-800">
                      {paper.paperLink && <a href={paper.paperLink} target="_blank" rel="noopener noreferrer" className={linkClass}>{paper.paperLabel || "Journal article"}</a>}
                      {paper.preprintLink && <a href={paper.preprintLink} target="_blank" rel="noopener noreferrer" className={linkClass}>Preprint</a>}
                      {paper.githubLink && <a href={paper.githubLink} target="_blank" rel="noopener noreferrer" className={linkClass}>Code</a>}
                      {paper.resultsLink && (paper.resultsType === "internal" ? <Link to={paper.resultsLink} className={linkClass}>{paper.resultsLabel}</Link> : <a href={paper.resultsLink} target="_blank" rel="noopener noreferrer" className={linkClass}>{paper.resultsLabel}</a>)}
                      {paper.preview && <button type="button" onClick={() => setPreview(paper)} className={`${linkClass} hidden sm:inline-flex`}>Quick preview</button>}
                      {paper.visualizationLink && <Link to={paper.visualizationLink} className={linkClass}>Sun-to-grid film</Link>}
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        );
      })}
      {preview && <LivePreviewModal url={preview.resultsLink} title={preview.title} onClose={() => setPreview(null)} />}
    </section>
  );
};

export default ResearchHighlights;
