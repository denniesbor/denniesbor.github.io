import React, { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeViewer = ({ url, filename }) => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  const getLanguage = (name) => {
    if (!name) return 'text';
    if (name.endsWith('.py')) return 'python';
    if (name.endsWith('.js') || name.endsWith('.jsx')) return 'javascript';
    if (name.endsWith('.go')) return 'go';
    if (name.endsWith('.m')) return 'matlab';
    if (name.endsWith('.json')) return 'json';
    return 'text';
  };

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then(res => res.text())
      .then(text => {
        setContent(text);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setContent("Error loading code.");
        setLoading(false);
      });
  }, [url]);

  if (loading) return <div className="p-10 text-center">Loading Code...</div>;

  return (
    <div className="h-full overflow-auto text-sm bg-[#1e1e1e]">
      <SyntaxHighlighter 
        language={getLanguage(filename)} 
        style={vscDarkPlus}
        customStyle={{ margin: 0, minHeight: '100%', borderRadius: 0 }}
        showLineNumbers={true}
      >
        {content}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeViewer;