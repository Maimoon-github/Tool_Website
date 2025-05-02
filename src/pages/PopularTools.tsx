import React from 'react';
import ToolCard from '../components/common/ToolCard';
import tools from '../data/tools';
import { useToolHistory } from '../hooks/useToolHistory';
import { Star } from 'lucide-react';

const PopularTools: React.FC = () => {
  const { getMostUsedTools } = useToolHistory();
  const popularToolIds = getMostUsedTools(8).map(item => item.id);
  const popularTools = tools.filter(tool => popularToolIds.includes(tool.id));

  // If no history, show default popular tools
  const displayTools = popularTools.length > 0 
    ? popularTools 
    : tools.slice(0, 8);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-yellow-600 dark:text-yellow-400">
          <Star size={32} />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Popular Tools</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Our most frequently used and highest-rated tools, chosen by our community.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {displayTools.map(tool => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </div>
  );
};

export default PopularTools;