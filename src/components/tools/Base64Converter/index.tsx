import React, { useState, useEffect } from 'react';
import { Copy, CheckCircle2, Upload, Download, RefreshCw } from 'lucide-react';

const Base64Converter: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    convertData();
  }, [input, mode]);

  const convertData = () => {
    try {
      setError(null);
      if (!input) {
        setOutput('');
        return;
      }

      if (mode === 'encode') {
        setOutput(btoa(input));
      } else {
        setOutput(atob(input));
      }
    } catch (err) {
      setError(`Invalid ${mode === 'encode' ? 'text' : 'Base64'} input`);
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
      if (mode === 'encode') {
        reader.onload = (e) => {
          const content = e.target?.result;
          if (typeof content === 'string') {
            setInput(content);
          }
        };
        reader.readAsText(file);
      } else {
        reader.onload = (e) => {
          const content = e.target?.result;
          if (typeof content === 'string') {
            const base64 = content.split(',')[1];
            setInput(base64 || '');
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const downloadOutput = () => {
    const blob = new Blob([output], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `base64-${mode === 'encode' ? 'encoded' : 'decoded'}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Base64 Converter</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Convert text to Base64 encoding or decode Base64 back to text.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-4">
            <button
              onClick={() => setMode('encode')}
              className={`px-4 py-2 rounded-lg font-medium ${
                mode === 'encode'
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              Encode
            </button>
            <button
              onClick={() => setMode('decode')}
              className={`px-4 py-2 rounded-lg font-medium ${
                mode === 'decode'
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              Decode
            </button>
          </div>

          <label className="cursor-pointer text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
            <input
              type="file"
              onChange={handleFileUpload}
              className="hidden"
            />
            <Upload size={16} className="inline mr-1" />
            Upload File
          </label>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Input {mode === 'encode' ? 'Text' : 'Base64'}
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full h-48 p-4 font-mono text-sm border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
              placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter Base64 to decode...'}
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Output {mode === 'encode' ? 'Base64' : 'Text'}
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
                  onClick={downloadOutput}
                  disabled={!output}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 disabled:opacity-50"
                >
                  <Download size={16} className="inline mr-1" />
                  Download
                </button>
              </div>
            </div>
            <div className="relative">
              <textarea
                value={output}
                readOnly
                className="w-full h-48 p-4 font-mono text-sm border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
              />
              {error && (
                <div className="absolute inset-0 flex items-center justify-center bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <p className="text-red-600 dark:text-red-400">{error}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <button
          onClick={convertData}
          className="mt-6 w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow transition-colors duration-200 flex items-center justify-center"
        >
          <RefreshCw size={16} className="mr-2" />
          {mode === 'encode' ? 'Encode to Base64' : 'Decode from Base64'}
        </button>
      </div>

      <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-2">About Base64</h3>
        <p className="text-blue-700 dark:text-blue-400">
          Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format.
          It's commonly used when there's a need to encode binary data that needs to be stored and transferred
          over media that are designed to deal with text.
        </p>
      </div>
    </div>
  );
};

export default Base64Converter;