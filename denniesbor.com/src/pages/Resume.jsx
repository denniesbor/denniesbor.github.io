import PdfViewer from "../components/viewers/PdfViewer";

const PDF_URL = "https://raw.githubusercontent.com/denniesbor/dbor_resume_public/main/main.pdf";

const Resume = () => {
  return (
    <div className="w-full py-8 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Curriculum Vitae</h1>
        <a 
          href={PDF_URL} 
          download="Dennies_Bor_CV.pdf"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          <i className="fas fa-download mr-2"></i> Download PDF
        </a>
      </div>
      
      <div className="h-[900px] border rounded shadow-lg overflow-hidden bg-white">
          <PdfViewer url={PDF_URL} />
      </div>
    </div>
  );
};

export default Resume;