import PdfViewer from "../components/viewers/PdfViewer";

const cvUrl = "/cv/Dennies_Bor_CV.pdf";

const Resume = () => (
  <div className="w-full py-8 mb-8">
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-6">
      <div>
        <h1 className="text-3xl font-bold">Curriculum vitae</h1>
        <p className="text-slate-600 mt-2">Research CV for postdoctoral applications. Expected PhD graduation: May 2027.</p>
        <p className="text-sm text-slate-500 mt-1">The portfolio also includes student collaborations and additional research beyond this selected CV.</p>
      </div>
      <a href={cvUrl} download="Dennies_Bor_CV.pdf" className="inline-flex shrink-0 items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">Download CV PDF</a>
    </div>
    <div className="rounded-xl border border-slate-200 overflow-hidden bg-white h-[900px]">
      <PdfViewer url={cvUrl} />
    </div>
  </div>
);

export default Resume;
