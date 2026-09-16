import { Link } from "react-router-dom";
import dashboards from "../../api/dashboards";

const ResearchDashboards = () => (
  <section aria-labelledby="dashboards-heading" className="w-full mb-10">
    <h2 id="dashboards-heading" className="text-2xl font-bold text-gray-900 dark:text-white">Dashboards & visualizations</h2>
    <p className="mt-2 mb-4 text-sm text-gray-600 dark:text-gray-300">Interactive research tools and a visual journey through C-SWIM.</p>
    <div className="grid gap-3 xl:grid-cols-2">
      {dashboards.map((dashboard) => (
        <article key={dashboard.id} className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
          <p className="mb-2 text-xs font-medium text-blue-700 dark:text-blue-300">{dashboard.label}</p>
          <h3 className="font-bold text-gray-900 dark:text-white">{dashboard.title}</h3>
          <p className="my-2 text-sm text-gray-600 dark:text-gray-300">{dashboard.description}</p>
          <div className="flex flex-wrap gap-4 text-sm mt-3">
            {dashboard.internal ? <Link className="text-blue-700 hover:underline dark:text-blue-300" to={dashboard.url}>{dashboard.id === "cswim-journey" ? "Watch Journey 12" : "Open dashboard"}<span className="sr-only">: {dashboard.title}</span></Link> : <a className="text-blue-700 hover:underline dark:text-blue-300" href={dashboard.url} target="_blank" rel="noopener noreferrer">Open dashboard<span className="sr-only">: {dashboard.title}</span></a>}
            {dashboard.github && <a className="text-gray-600 hover:underline dark:text-gray-300" href={dashboard.github} target="_blank" rel="noopener noreferrer">Code<span className="sr-only">: {dashboard.title}</span></a>}
          </div>
        </article>
      ))}
    </div>
  </section>
);

export default ResearchDashboards;
