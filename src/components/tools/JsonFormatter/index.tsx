import React, { useState } from 'react';
import { Copy, CheckCircle2, Download, Upload, RefreshCw } from 'lucide-react';

const JsonFormatter: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [indentSize, setIndentSize] = useState(2);
  const [copied, setCopied] = useState(false);

  const formatJson = () => {
    try {
      if (!input.trim()) {
        setOutput('');
        setError(null);
        return;
      }

      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, indentSize);
      setOutput(formatted);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid JSON');
      setOutput('');
    }
  };

  const minifyJson = () => {
    try {
      if (!input.trim()) {
        setOutput('');
        setError(null);
        return;
      }

      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid JSON');
      setOutput('');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setInput(content);
      };
      reader.readAsText(file);
    }
  };

  const downloadJson = () => {
    const blob = new Blob([output], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'formatted.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">JSON Formatter</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Format, validate, and beautify your JSON data with this powerful formatter.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Input JSON
            </label>
            <label className="cursor-pointer text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
              <input
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                className="hidden"
              />
              <Upload size={16} className="inline mr-1" />
              Upload JSON
            </label>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-[500px] p-4 font-mono text-sm border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
            placeholder="Paste your JSON here..."
          />
        </div>

        {/* Output Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Formatted Output
            </label>
            <div className="flex space-x-2">
              <button
                onClick={copyToClipboard}
                disabled={!output}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 disabled:opacity-50"
              >
                {copied ? (
                  <>
                    <CheckCircle2 size={16} className="inline mr-1" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy size={16} className="inline mr-1" />
                    Copy
                  </>
                )}
              </button>
              <button
                onClick={downloadJson}
                disabled={!output}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 disabled:opacity-50"
              >
                <Download size={16} className="inline mr-1" />
                Download
              </button>
            </div>
          </div>
          <div
            className="w-full h-[500px] p-4 font-mono text-sm border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 overflow-auto"
          >
            {error ? (
              <div className="text-red-500 dark:text-red-400">{error}</div>
            ) : (
              <pre>{output}</pre>
            )}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex flex-wrap gap-4 items-center">
          <div>
            <label htmlFor="indent" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Indent Size
            </label>
            <select
              id="indent"
              value={indentSize}
              onChange={(e) => setIndentSize(Number(e.target.value))}
              className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
            >
              {[2, 4, 6, 8].map(size => (
                <option key={size} value={size}>{size} spaces</option>
              ))}
            </select>
          </div>

          <button
            onClick={formatJson}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow transition-colors duration-200 flex items-center"
          >
            <RefreshCw size={16} className="mr-2" />
            Format JSON
          </button>

          <button
            onClick={minifyJson}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg shadow transition-colors duration-200"
          >
            Minify JSON
          </button>
        </div>
      </div>
    </div>
  );
};

export default JsonFormatter;