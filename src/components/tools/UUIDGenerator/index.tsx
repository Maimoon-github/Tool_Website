import React, { useState } from 'react';
import { Copy, CheckCircle2, RefreshCw } from 'lucide-react';

const UUIDGenerator: React.FC = () => {
  const [uuids, setUuids] = useState<string[]>([crypto.randomUUID()]);
  const [quantity, setQuantity] = useState(1);
  const [version, setVersion] = useState<'v4'>('v4');
  const [copied, setCopied] = useState<number | null>(null);

  const generateUUIDs = () => {
    const newUUIDs = Array(quantity).fill(0).map(() => crypto.randomUUID());
    setUUIDs(newUUIDs);
  };

  const copyToClipboard = (uuid: string, index: number) => {
    navigator.clipboard.writeText(uuid);
    setCopied(index);
    setTimeout(() => setCopied(null), 2000);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(uuids.join('\n'));
    setCopied(-1);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">UUID Generator</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Generate cryptographically secure UUIDs (Universally Unique Identifiers).
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex-1 min-w-[200px]">
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Number of UUIDs
            </label>
            <input
              type="number"
              id="quantity"
              min="1"
              max="100"
              value={quantity}
              onChange={(e) => setQuantity(Math.min(100, Math.max(1, parseInt(e.target.value) || 1)))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
            />
          </div>

          <div className="flex-1 min-w-[200px]">
            <label htmlFor="version" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              UUID Version
            </label>
            <select
              id="version"
              value={version}
              onChange={(e) => setVersion(e.target.value as 'v4')}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
            >
              <option value="v4">Version 4 (Random)</option>
            </select>
          </div>
        </div>

        <button
          onClick={generateUUIDs}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow transition-colors duration-200 flex items-center justify-center"
        >
          <RefreshCw size={20} className="mr-2" />
          Generate {quantity > 1 ? `${quantity} UUIDs` : 'UUID'}
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Generated UUIDs</h2>
          {uuids.length > 1 && (
            <button
              onClick={copyAll}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center"
            >
              {copied === -1 ? (
                <>
                  <CheckCircle2 size={16} className="mr-1" />
                  Copied All
                </>
              ) : (
                <>
                  <Copy size={16} className="mr-1" />
                  Copy All
                </>
              )}
            </button>
          )}
        </div>

        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {uuids.map((uuid, index) => (
            <div key={index} className="p-4 flex justify-between items-center">
              <code className="font-mono text-sm text-gray-800 dark:text-gray-200">{uuid}</code>
              <button
                onClick={() => copyToClipboard(uuid, index)}
                className="ml-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                {copied === index ? (
                  <CheckCircle2 size={18} className="text-green-500" />
                ) : (
                  <Copy size={18} />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UUIDGenerator;