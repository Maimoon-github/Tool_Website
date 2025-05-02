import React from 'react';
import { Link } from 'react-router-dom';
import { Tool } from '../../types';
import * as LucideIcons from 'lucide-react';
import { useToolHistory } from '../../hooks/useToolHistory';

interface ToolCardProps {
  tool: Tool;
  className?: string;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool, className = '' }) => {
  const { recordToolUse } = useToolHistory();
  
  // Dynamically get the icon component
  const IconComponent = (LucideIcons as Record<string, React.FC<any>>)[tool.icon] || LucideIcons.FileText;
  
  const handleClick = () => {
    recordToolUse(tool.id);
  };
  
  return (
    <Link 
      to={tool.path} 
      onClick={handleClick}
      className={`block bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden ${className}`}
    >
      <div className="p-5">
        <div className="mb-3 flex items-center">
          <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400">
            <IconComponent size={20} />
          </div>
          <h3 className="text-lg font-medium text-gray-800 dark:text-white ml-3">{tool.name}</h3>
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-sm">{tool.description}</p>
        
        <div className="mt-4 flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium">
          Use Tool
          <LucideIcons.ArrowRight size={16} className="ml-1" />
        </div>
      </div>
    </Link>
  );
};

export default ToolCard;