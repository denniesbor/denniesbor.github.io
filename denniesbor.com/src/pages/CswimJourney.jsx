import { useState } from "react";
import { Link } from "react-router-dom";

const videoUrl = "/media/cswim-journey-v12.mp4";

const CswimJourney = () => {
  const [failed, setFailed] = useState(false);
  return (
    <article className="mx-auto max-w-5xl py-8 px-2">
      <Link to="/" className="text-blue-700 hover:underline">Back to research</Link>
      <p className="mt-6 text-sm text-gray-500">Blender visualization · Journey 12 · September 2026</p>
      <h1 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">C-SWIM: a journey from the Sun to the power grid</h1>
      <p id="journey-description" className="my-4 text-gray-600 dark:text-gray-300">An 89-second research film connecting solar observations, Earth&apos;s magnetic environment, and modeled infrastructure effects in Northern Virginia.</p>
      <video controls playsInline preload="none" poster="/media/cswim-journey-v12.jpg" aria-label="C-SWIM Sun-to-grid journey, version 12" aria-describedby="journey-description journey-context" className="w-full aspect-video rounded-lg bg-black" onError={() => setFailed(true)}>
        <source src={videoUrl} type="video/mp4" onError={() => setFailed(true)} />
        Your browser does not support embedded video. <a href={videoUrl}>Download Journey 12</a> to watch it.
      </video>
      {failed && <p role="alert" className="mt-3 text-red-700">The video could not be loaded. Try the direct video link below.</p>}
      <a href={videoUrl} className="inline-block mt-3 text-blue-700 hover:underline" download="C-SWIM-Journey-12.mp4">Download Journey 12 video</a>
      <section id="journey-context" className="mt-8 rounded-lg border border-gray-200 bg-white p-5 dark:bg-gray-900 dark:border-gray-700">
        <h2 className="text-xl font-bold mb-3">What the film shows</h2>
        <p className="text-gray-600 dark:text-gray-300">The film moves from solar imagery through the magnetic environment around Earth to the geoelectric field, a substation, and nearby communities. Historical imagery and field modeling are combined with illustrative mechanisms and compressed transitions.</p>
        <p className="mt-3 text-gray-600 dark:text-gray-300">The closing outages represent one sampled outcome from a statistical 250-year storm scenario, considering transformer heating. The May 2024 field reconstruction and the statistical outage scenario are separate data products. Buildings, lighting changes, and scene timing provide a visual interpretation.</p>
        <p className="mt-3 text-sm text-gray-500">This preview contains on-screen explanations and no audio.</p>
      </section>
      <div className="mt-6 flex flex-wrap gap-4 text-blue-700">
        <a href="https://doi.org/10.1029/2026AV002367" target="_blank" rel="noopener noreferrer" className="hover:underline">Read the C-SWIM paper</a>
        <Link to="/portfolio/space-weather-grid" className="hover:underline">Explore the grid dashboard</Link>
      </div>
    </article>
  );
};

export default CswimJourney;
