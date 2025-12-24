import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import PdfViewer from "../components/viewers/PdfViewer";

const RAW_BASE =
  "https://raw.githubusercontent.com/denniesbor/dbor_resume_public/main";

const CVS = [
  {
    id: "ds-ml",
    title: "Data Science & ML",
    subtitle: "YOLO, ML pipelines, stats, signal processing",
    pdf: `${RAW_BASE}/main_cv_ds_ml.pdf`,
    downloadName: "Dennies_Bor_Resume_DataScience_ML.pdf",
    tags: ["YOLO", "Time-series", "NLP", "Benchmarks"],
  },
  {
    id: "geospatial",
    title: "Geospatial & Remote Sensing",
    subtitle: "Web mapping, satellite imagery, GIS algorithms",
    pdf: `${RAW_BASE}/main_cv_geospatial_rs.pdf`,
    downloadName: "Dennies_Bor_Resume_Geospatial_RS.pdf",
    tags: ["GIS", "Remote sensing", "Dashboards", "Spatial analysis"],
  },
  {
    id: "sci-comp",
    title: "Scientific Computing & HPC",
    subtitle: "Numerical methods, optimization, scalable workflows",
    pdf: `${RAW_BASE}/main_cv_sci_comp_hpc.pdf`,
    downloadName: "Dennies_Bor_Resume_SciComp_HPC.pdf",
    tags: ["Numerics", "Pyomo/IPOPT", "Monte Carlo", "Pipelines"],
  },
  {
    id: "swe-cloud",
    title: "Software Engineering & Cloud",
    subtitle: "Full-stack, DevOps, AWS, CI/CD",
    pdf: `${RAW_BASE}/main_cv_swe_cloud.pdf`,
    downloadName: "Dennies_Bor_Resume_SWE_Cloud.pdf",
    tags: ["React", "Docker", "GitHub Actions", "AWS"],
  },
  {
    id: "postdoc",
    title: "Postdoc (Integrated)",
    subtitle: "Publications-first research CV",
    pdf: `${RAW_BASE}/main_cv_postdoc.pdf`,
    downloadName: "Dennies_Bor_CV_Postdoc.pdf",
    tags: ["Publications", "Research software", "Space weather", "Risk"],
  },
];

const Resume = () => {
  const [params, setParams] = useSearchParams();
  const selectedId = params.get("cv") || "ds-ml";

  const selected = useMemo(() => {
    return CVS.find((x) => x.id === selectedId) || CVS[0];
  }, [selectedId]);

  const setSelected = (id) => {
    const next = new URLSearchParams(params);
    next.set("cv", id);
    setParams(next, { replace: true });
  };

  const copyPdfLink = async () => {
    try {
      await navigator.clipboard.writeText(selected.pdf);
    } catch {
      // fallback (older browsers)
      const ta = document.createElement("textarea");
      ta.value = selected.pdf;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
  };

  return (
    <div className="w-full py-8 mb-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Resume</h1>
          <p className="text-slate-600 mt-1">
            Choose a version tailored to the role and download/share the PDF.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <a
            href={selected.pdf}
            download={selected.downloadName}
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
          >
            Download PDF
          </a>

          <button
            onClick={copyPdfLink}
            className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-800 hover:bg-slate-50 transition"
            title="Copy direct PDF link"
          >
            Copy PDF Link
          </button>
        </div>
      </div>

      {/* Selector */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 mb-6">
        {CVS.map((cv) => {
          const active = cv.id === selected.id;
          return (
            <button
              key={cv.id}
              onClick={() => setSelected(cv.id)}
              className={[
                "text-left rounded-xl border p-4 transition",
                "bg-white hover:bg-slate-50",
                active
                  ? "border-blue-600 ring-2 ring-blue-100"
                  : "border-slate-200",
              ].join(" ")}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="font-semibold text-slate-900">{cv.title}</div>
                  <div className="text-sm text-slate-600 mt-1">
                    {cv.subtitle}
                  </div>
                </div>
                {active && (
                  <span className="text-xs rounded-full bg-blue-50 text-blue-700 px-2 py-1 border border-blue-100">
                    Selected
                  </span>
                )}
              </div>

              <div className="flex flex-wrap gap-2 mt-3">
                {cv.tags.map((t) => (
                  <span
                    key={t}
                    className="text-xs rounded-full bg-slate-100 text-slate-700 px-2 py-1"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </button>
          );
        })}
      </div>

      {/* Viewer */}
      <div className="rounded-xl border border-slate-200 shadow-sm overflow-hidden bg-white">
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200">
          <div>
            <div className="font-semibold text-slate-900">{selected.title}</div>
            <div className="text-sm text-slate-600">{selected.subtitle}</div>
          </div>
          <a
            href={selected.pdf}
            download={selected.downloadName}
            className="text-sm text-blue-700 hover:underline"
          >
            Download this version
          </a>
        </div>

        <div className="h-[900px]">
          <PdfViewer url={selected.pdf} />
        </div>
      </div>
    </div>
  );
};

export default Resume;
