import React, { useState, useEffect } from 'react';
import { Copy, CheckCircle2, ArrowDownUp } from 'lucide-react';

const URLEncoder: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      if (mode === 'encode') {
        setOutput(encodeURIComponent(input));
      } else {
        setOutput(decodeURIComponent(input));
      }
    } catch (error) {
      setOutput('Invalid input for ' + mode);
    }
  }, [input, mode]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const switchMode = () => {
    setMode(mode === 'encode' ? 'decode' : 'encode');
    setInput(output);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">URL Encoder/Decoder</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Encode or decode URLs for safe transmission over the internet.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            {mode === 'encode' ? 'URL Encoder' : 'URL Decoder'}
          </h2>
          <button
            onClick={switchMode}
            className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
          >
            <ArrowDownUp size={16} className="mr-1" />
            Switch to {mode === 'encode' ? 'Decoder' : 'Encoder'}
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Input
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full h-32 p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
              placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter encoded URL to decode...'}
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Output
              </label>
              <button
                onClick={copyToClipboard}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center"
              >
                {copied ? (
                  <>
                    <CheckCircle2 size={16} className="mr-1" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy size={16} className="mr-1" />
                    Copy
                  </>
                )}
              </button>
            </div>
            <div className="w-full h-32 p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 overflow-auto">
              <pre className="whitespace-pre-wrap break-all">{output}</pre>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-2">About URL Encoding</h3>
        <p className="text-blue-700 dark:text-blue-400">
          URL encoding converts characters into a format that can be transmitted over the Internet. 
          Characters that are not alphanumeric are converted into a percent (%) sign followed by two hexadecimal digits.
        </p>
      </div>
    </div>
  );
};

export default URLEncoder;