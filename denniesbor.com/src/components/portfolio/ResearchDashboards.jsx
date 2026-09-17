import { Link } from "react-router-dom";
import dashboards from "../../api/dashboards";

const film = dashboards.find((item) => item.kind === "film");
const tools = dashboards.filter((item) => item.kind !== "film");
const actionClass = "inline-flex items-center justify-center gap-2 rounded-lg bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700";

const ResearchDashboards = () => (
  <section aria-labelledby="dashboards-heading" className="w-full mb-12 scroll-mt-6">
    <h2 id="dashboards-heading" className="text-2xl font-bold text-gray-900 dark:text-white scroll-mt-6">Explore the research</h2>
    <p className="mt-3 mb-6 max-w-3xl leading-relaxed text-gray-600 dark:text-gray-300">
      Space weather is the effect of solar activity on the environment around Earth.
      These tools explore its possible impacts on infrastructure, alongside risks from other natural hazards.
    </p>

    <article aria-labelledby="research-film-title" className="mb-6 overflow-hidden rounded-xl border border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/10">
      <div className="grid lg:grid-cols-2">
        <Link to={film.url} aria-label={film.action} className="group relative block self-center bg-slate-950 focus-visible:outline focus-visible:outline-4 focus-visible:outline-blue-600">
          <img src={film.poster} alt="" width="1280" height="720" className="aspect-video w-full object-cover" />
          <span className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-blue-800 shadow-lg transition-transform group-hover:scale-110">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7"><path d="m9 5 11 7-11 7V5Z" /></svg>
            </span>
          </span>
        </Link>
        <div className="p-5 sm:p-6">
          <p className="text-sm font-semibold text-blue-800 dark:text-blue-300">Start with the story · 89-second film</p>
          <h3 id="research-film-title" className="mt-2 text-2xl font-bold leading-tight text-gray-900 dark:text-white">{film.title}</h3>
          <p className="my-4 text-sm leading-relaxed text-gray-700 dark:text-gray-300">{film.description}</p>
          <Link to={film.url} className="font-semibold text-blue-800 underline decoration-blue-300 underline-offset-4 hover:decoration-blue-800 dark:text-blue-300">{film.action}<span aria-hidden="true"> →</span></Link>
        </div>
      </div>
    </article>

    <div className="grid gap-5 xl:grid-cols-2">
      {tools.map((dashboard) => (
        <article key={dashboard.id} aria-labelledby={`tool-${dashboard.id}`} className="flex min-w-0 flex-col rounded-xl border border-gray-200 bg-white p-5 sm:p-6 dark:border-gray-700 dark:bg-gray-900">
          <p className="text-sm font-semibold text-blue-800 dark:text-blue-300">{dashboard.topic}</p>
          <h3 id={`tool-${dashboard.id}`} className="mt-2 text-xl font-bold leading-snug text-gray-900 dark:text-white">{dashboard.title}</h3>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{dashboard.project}</p>
          <p className="mt-4 leading-relaxed text-gray-700 dark:text-gray-300">{dashboard.description}</p>
          <h4 className="mt-5 text-sm font-semibold text-gray-900 dark:text-white">What you can explore</h4>
          <ul className="mt-2 mb-5 list-disc space-y-2 pl-5 text-sm leading-relaxed text-gray-600 marker:text-blue-600 dark:text-gray-300">
            {dashboard.explore.map((item) => <li key={item}>{item}</li>)}
          </ul>
          {dashboard.collaboration && <p className="mb-5 text-sm leading-relaxed text-gray-500 dark:text-gray-400">{dashboard.collaboration}</p>}
          <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-gray-100 pt-5 dark:border-gray-800">
            {dashboard.internal ? (
              <Link className={actionClass} to={dashboard.url}>{dashboard.action}<span aria-hidden="true"> →</span></Link>
            ) : (
              <a className={actionClass} href={dashboard.url} target="_blank" rel="noopener noreferrer">{dashboard.action}<span aria-hidden="true"> ↗</span><span className="sr-only"> (opens in a new tab)</span></a>
            )}
            <a className="text-sm text-gray-600 underline underline-offset-4 hover:text-blue-700 dark:text-gray-300" href={dashboard.github} target="_blank" rel="noopener noreferrer">View source code<span className="sr-only">: {dashboard.title} (opens in a new tab)</span></a>
          </div>
        </article>
      ))}
    </div>
  </section>
);

export default ResearchDashboards;
