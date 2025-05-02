import React, { useState, useEffect } from 'react';
import { Copy, CheckCircle2 } from 'lucide-react';

const TextCaseConverter: React.FC = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [conversion, setConversion] = useState<string>('uppercase');
  const [copied, setCopied] = useState(false);
  
  // Apply conversion whenever text or conversion type changes
  useEffect(() => {
    convertText(text, conversion);
  }, [text, conversion]);
  
  const convertText = (input: string, type: string) => {
    switch (type) {
      case 'uppercase':
        setResult(input.toUpperCase());
        break;
      case 'lowercase':
        setResult(input.toLowerCase());
        break;
      case 'capitalize':
        setResult(
          input
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ')
        );
        break;
      case 'sentence':
        setResult(
          input
            .split('. ')
            .map(sentence => {
              if (sentence.length === 0) return '';
              return sentence.charAt(0).toUpperCase() + sentence.slice(1).toLowerCase();
            })
            .join('. ')
        );
        break;
      case 'alternating':
        setResult(
          input
            .split('')
            .map((char, i) => i % 2 === 0 ? char.toUpperCase() : char.toLowerCase())
            .join('')
        );
        break;
      case 'inverse':
        setResult(
          input
            .split('')
            .map(char => {
              if (char === char.toUpperCase()) return char.toLowerCase();
              return char.toUpperCase();
            })
            .join('')
        );
        break;
      default:
        setResult(input);
    }
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Text Case Converter</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Transform your text between different cases: uppercase, lowercase, title case, sentence case, and more.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input section */}
        <div className="space-y-4">
          <label htmlFor="input" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Input Text
          </label>
          <textarea
            id="input"
            className="w-full h-64 p-4 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            placeholder="Type or paste your text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="text-right text-sm text-gray-500 dark:text-gray-400">
            {text.length} characters | {text.split(/\s+/).filter(Boolean).length} words
          </div>
        </div>
        
        {/* Result section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label htmlFor="result" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Result
            </label>
            <button
              onClick={copyToClipboard}
              className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm"
            >
              {copied ? (
                <>
                  <CheckCircle2 size={16} className="mr-1" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy size={16} className="mr-1" />
                  Copy to clipboard
                </>
              )}
            </button>
          </div>
          <div
            id="result"
            className="w-full h-64 p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 overflow-auto"
          >
            {result}
          </div>
        </div>
      </div>
      
      {/* Conversion options */}
      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Conversion Options</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { id: 'uppercase', label: 'UPPERCASE' },
            { id: 'lowercase', label: 'lowercase' },
            { id: 'capitalize', label: 'Title Case' },
            { id: 'sentence', label: 'Sentence case' },
            { id: 'alternating', label: 'AlTeRnAtInG cAsE' },
            { id: 'inverse', label: 'InVeRsE cAsE' },
          ].map((option) => (
            <button
              key={option.id}
              onClick={() => setConversion(option.id)}
              className={`p-3 rounded-lg transition-colors ${
                conversion === option.id
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 border-2 border-blue-600 dark:border-blue-500'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-750'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TextCaseConverter;