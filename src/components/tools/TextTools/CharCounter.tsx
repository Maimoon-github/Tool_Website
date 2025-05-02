import React, { useState, useEffect } from 'react';
import { Copy, CheckCircle2, Clock } from 'lucide-react';

const CharacterCounter: React.FC = () => {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState({
    characters: 0,
    charactersNoSpaces: 0,
    words: 0,
    sentences: 0,
    paragraphs: 0,
    readingTime: 0,
  });
  
  useEffect(() => {
    // Calculate statistics
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, '').length;
    const words = text.split(/\s+/).filter(Boolean).length;
    const sentences = text.split(/[.!?]+/).filter(Boolean).length;
    const paragraphs = text.split(/\n+/).filter(Boolean).length;
    
    // Average reading speed: 200 words per minute
    const readingTime = Math.ceil(words / 200);
    
    setStats({
      characters,
      charactersNoSpaces,
      words,
      sentences,
      paragraphs,
      readingTime,
    });
  }, [text]);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const clearText = () => {
    setText('');
  };
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Character Counter</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Count characters, words, sentences, and paragraphs. Also calculates estimated reading time.
        </p>
      </div>
      
      <div className="space-y-6">
        {/* Text input */}
        <div>
          <label htmlFor="input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Input Text
          </label>
          <div className="relative">
            <textarea
              id="input"
              className="w-full h-64 p-4 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              placeholder="Type or paste your text here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <div className="absolute bottom-3 right-3 space-x-2">
              <button
                onClick={copyToClipboard}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-md text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                {copied ? (
                  <span className="flex items-center">
                    <CheckCircle2 size={14} className="mr-1" />
                    Copied
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Copy size={14} className="mr-1" />
                    Copy
                  </span>
                )}
              </button>
              <button
                onClick={clearText}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-md text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
        
        {/* Statistics */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Text Statistics</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <div className="text-blue-700 dark:text-blue-300 text-sm font-medium mb-1">Characters</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.characters}</div>
            </div>
            
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
              <div className="text-purple-700 dark:text-purple-300 text-sm font-medium mb-1">Characters (no spaces)</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.charactersNoSpaces}</div>
            </div>
            
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <div className="text-green-700 dark:text-green-300 text-sm font-medium mb-1">Words</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.words}</div>
            </div>
            
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
              <div className="text-yellow-700 dark:text-yellow-300 text-sm font-medium mb-1">Sentences</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.sentences}</div>
            </div>
            
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
              <div className="text-red-700 dark:text-red-300 text-sm font-medium mb-1">Paragraphs</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.paragraphs}</div>
            </div>
            
            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg">
              <div className="text-indigo-700 dark:text-indigo-300 text-sm font-medium mb-1 flex items-center">
                <Clock size={14} className="mr-1" />
                Reading Time
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.readingTime} {stats.readingTime === 1 ? 'minute' : 'minutes'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterCounter;