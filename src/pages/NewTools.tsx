import React from 'react';
import ToolCard from '../components/common/ToolCard';
import tools from '../data/tools';
import { Sparkles } from 'lucide-react';

const NewTools: React.FC = () => {
  // For demo purposes, showing the latest 6 tools
  const newTools = tools.slice(-6);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
          <Sparkles size={32} />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">New Tools</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Check out our latest additions to help streamline your workflow.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {newTools.map(tool => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </div>
  );
};

export default NewTools;