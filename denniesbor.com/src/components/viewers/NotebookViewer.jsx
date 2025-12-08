import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vs } from 'react-syntax-highlighter/dist/esm/styles/prism'; // Light theme like Jupyter
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css'; // Standard Math font

const NotebookViewer = ({ url }) => {
  const [notebook, setNotebook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error("Failed to load notebook");
        return res.json();
      })
      .then(data => {
        setNotebook(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, [url]);

  if (loading) return <div className="p-8 text-center text-gray-500">Loading Notebook...</div>;
  if (error) return <div className="p-8 text-center text-red-500">Error: {error}</div>;

  // RENDERERS

  const renderOutputs = (outputs) => {
    if (!outputs) return null;
    return outputs.map((output, idx) => {
      // 1. Render Images (Plots)
      if (output.data && (output.data['image/png'] || output.data['image/jpeg'])) {
        const mimeType = output.data['image/png'] ? 'image/png' : 'image/jpeg';
        const base64Data = output.data[mimeType];
        // Handle multiline base64 data which sometimes happens in JSON
        const src = Array.isArray(base64Data) ? base64Data.join('') : base64Data;
        return (
          <div key={idx} className="my-2 overflow-x-auto">
             <img src={`data:${mimeType};base64,${src}`} alt="Plot" className="max-w-full" />
          </div>
        );
      }
      
      // 2. Render Text/Stream Output
      if (output.text || (output.data && output.data['text/plain'])) {
        const text = output.text || output.data['text/plain'];
        const content = Array.isArray(text) ? text.join('') : text;
        return (
            <pre key={idx} className="text-xs font-mono bg-white p-2 overflow-x-auto whitespace-pre-wrap">
                {content}
            </pre>
        );
      }
      return null;
    });
  };

  return (
    <div className="bg-white min-h-full p-6 md:p-10 font-sans text-base max-w-5xl mx-auto">
      {notebook.cells.map((cell, index) => (
        <div key={index} className="mb-4">
          
          {/* MARKDOWN CELLS */}
          {cell.cell_type === 'markdown' && (
            <div className="prose prose-slate max-w-none ml-2 md:ml-12 mb-6">
               <ReactMarkdown 
                 remarkPlugins={[remarkMath]} 
                 rehypePlugins={[rehypeKatex]}
               >
                 {Array.isArray(cell.source) ? cell.source.join('') : cell.source}
               </ReactMarkdown>
            </div>
          )}

          {/* CODE CELLS */}
          {cell.cell_type === 'code' && (
            <div className="group">
                {/* Input Area */}
                <div className="flex flex-row">
                    <div className="w-12 text-right font-mono text-xs text-blue-600 pt-3 mr-2 select-none opacity-50">
                        In [{cell.execution_count || ' '}]:
                    </div>
                    <div className="flex-1 min-w-0 border border-gray-200 rounded bg-gray-50 overflow-hidden">
                        <SyntaxHighlighter
                            language="python"
                            style={vs}
                            customStyle={{ margin: 0, padding: '1rem', background: '#f8f9fa', fontSize: '0.9rem' }}
                        >
                            {Array.isArray(cell.source) ? cell.source.join('') : cell.source}
                        </SyntaxHighlighter>
                    </div>
                </div>

                {/* Output Area */}
                {cell.outputs && cell.outputs.length > 0 && (
                     <div className="flex flex-row mt-1">
                        <div className="w-12 text-right font-mono text-xs text-red-600 pt-1 mr-2 select-none opacity-50">
                            Out[{cell.execution_count || ' '}]:
                        </div>
                        <div className="flex-1 overflow-hidden">
                            {renderOutputs(cell.outputs)}
                        </div>
                     </div>
                )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default NotebookViewer;