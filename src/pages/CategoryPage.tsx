import React from 'react';
import { useParams, Link } from 'react-router-dom';
import ToolCard from '../components/common/ToolCard';
import tools from '../data/tools';
import { ToolCategory } from '../types';
import * as LucideIcons from 'lucide-react';

// Configuration for category-specific information
const categoryInfo: Record<ToolCategory, { 
  title: string;
  description: string;
  icon: string;
  bgClass: string;
  textClass: string;
  darkBgClass: string;
  darkTextClass: string;
}> = {
  text: {
    title: 'Text Tools',
    description: 'Utilities for manipulating and analyzing text content',
    icon: 'Type',
    bgClass: 'bg-blue-100',
    textClass: 'text-blue-800',
    darkBgClass: 'dark:bg-blue-900/30',
    darkTextClass: 'dark:text-blue-300',
  },
  conversion: {
    title: 'Conversion Tools',
    description: 'Convert between different formats, units, and measurement systems',
    icon: 'RefreshCw',
    bgClass: 'bg-green-100',
    textClass: 'text-green-800',
    darkBgClass: 'dark:bg-green-900/30',
    darkTextClass: 'dark:text-green-300',
  },
  generator: {
    title: 'Generator Tools',
    description: 'Create secure passwords, random data, and other content',
    icon: 'Wand2',
    bgClass: 'bg-purple-100',
    textClass: 'text-purple-800',
    darkBgClass: 'dark:bg-purple-900/30',
    darkTextClass: 'dark:text-purple-300',
  },
  formatters: {
    title: 'Formatter Tools',
    description: 'Format, prettify, and validate various data formats',
    icon: 'FileText',
    bgClass: 'bg-orange-100',
    textClass: 'text-orange-800',
    darkBgClass: 'dark:bg-orange-900/30',
    darkTextClass: 'dark:text-orange-300',
  },
  utilities: {
    title: 'Utilities',
    description: 'Miscellaneous useful tools for everyday tasks',
    icon: 'Tool',
    bgClass: 'bg-gray-100',
    textClass: 'text-gray-800',
    darkBgClass: 'dark:bg-gray-800',
    darkTextClass: 'dark:text-gray-300',
  },
};

const CategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  
  // Validate that the category exists
  if (!categoryId || !(categoryId as ToolCategory in categoryInfo)) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Category Not Found</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">The category you're looking for doesn't exist.</p>
        <Link 
          to="/"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          Return to Home
        </Link>
      </div>
    );
  }
  
  const category = categoryId as ToolCategory;
  const info = categoryInfo[category];
  const IconComponent = (LucideIcons as Record<string, React.FC<any>>)[info.icon] || LucideIcons.Folder;
  
  // Filter tools by the selected category
  const categoryTools = tools.filter(tool => tool.category === category);
  
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Category Header */}
      <div className="mb-12 text-center">
        <div className={`w-20 h-20 mx-auto mb-4 rounded-full ${info.bgClass} ${info.darkBgClass} flex items-center justify-center ${info.textClass} ${info.darkTextClass}`}>
          <IconComponent size={32} />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">{info.title}</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">{info.description}</p>
      </div>
      
      {/* Tools Grid */}
      {categoryTools.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categoryTools.map(tool => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            No tools available in this category yet. Check back soon!
          </p>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;