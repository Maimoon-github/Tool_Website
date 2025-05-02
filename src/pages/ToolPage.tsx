import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import tools from '../data/tools';
import TextCaseConverter from '../components/tools/TextTools/TextCase';
import CharacterCounter from '../components/tools/TextTools/CharCounter';
import PasswordGenerator from '../components/tools/PasswordGenerator';
import UUIDGenerator from '../components/tools/UUIDGenerator';
import JsonFormatter from '../components/tools/JsonFormatter';
import URLEncoder from '../components/tools/URLEncoder';
import Base64Converter from '../components/tools/Base64Converter';
import UnitConverter from '../components/tools/UnitConverter';
import ColorConverter from '../components/tools/ColorConverter';
import { useToolHistory } from '../hooks/useToolHistory';
import * as LucideIcons from 'lucide-react';

const ToolPage: React.FC = () => {
  const { toolId } = useParams<{ toolId: string }>();
  const { recordToolUse } = useToolHistory();
  
  const tool = tools.find(t => t.path === `/tools/${toolId}`);
  
  useEffect(() => {
    if (tool) {
      recordToolUse(tool.id);
      
      // Update document title
      document.title = `${tool.name} - MyTools`;
      
      // Reset title when leaving the page
      return () => {
        document.title = 'MyTools';
      };
    }
  }, [tool, recordToolUse]);
  
  if (!tool) {
    return <Navigate to="/not-found" replace />;
  }
  
  // Render the appropriate tool component based on the ID
  const renderTool = () => {
    switch (tool.id) {
      case 'text-case-converter':
        return <TextCaseConverter />;
      case 'character-counter':
        return <CharacterCounter />;
      case 'password-generator':
        return <PasswordGenerator />;
      case 'uuid-generator':
        return <UUIDGenerator />;
      case 'json-formatter':
        return <JsonFormatter />;
      case 'url-encoder':
        return <URLEncoder />;
      case 'base64-converter':
        return <Base64Converter />;
      case 'unit-converter':
        return <UnitConverter />;
      case 'color-converter':
        return <ColorConverter />;
      default:
        return <ToolComingSoon tool={tool} />;
    }
  };
  
  return (
    <div className="pt-8 pb-16">
      {renderTool()}
    </div>
  );
};

// Placeholder component for tools that aren't implemented yet
const ToolComingSoon: React.FC<{ tool: typeof tools[0] }> = ({ tool }) => {
  const IconComponent = (LucideIcons as Record<string, React.FC<any>>)[tool.icon] || LucideIcons.Tool;
  
  return (
    <div className="max-w-3xl mx-auto text-center p-6">
      <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400">
        <IconComponent size={32} />
      </div>
      
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">{tool.name}</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">{tool.description}</p>
      
      <div className="p-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg inline-block">
        <h2 className="text-xl font-semibold text-blue-700 dark:text-blue-300 mb-2">Coming Soon!</h2>
        <p className="text-gray-600 dark:text-gray-400">
          We're currently working on implementing this tool.
          Please check back later or try one of our other tools.
        </p>
      </div>
    </div>
  );
};

export default ToolPage;