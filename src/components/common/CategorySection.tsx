import React from 'react';
import { Link } from 'react-router-dom';
import ToolCard from './ToolCard';
import { Tool, ToolCategory } from '../../types';
import * as LucideIcons from 'lucide-react';

interface CategorySectionProps {
  title: string;
  category: ToolCategory;
  tools: Tool[];
  icon: string;
  description: string;
}

const getCategoryColor = (category: ToolCategory) => {
  const colors: Record<ToolCategory, { bg: string; text: string; darkBg: string; darkText: string }> = {
    text: { bg: 'bg-blue-100', text: 'text-blue-800', darkBg: 'dark:bg-blue-900/30', darkText: 'dark:text-blue-300' },
    conversion: { bg: 'bg-green-100', text: 'text-green-800', darkBg: 'dark:bg-green-900/30', darkText: 'dark:text-green-300' },
    generator: { bg: 'bg-purple-100', text: 'text-purple-800', darkBg: 'dark:bg-purple-900/30', darkText: 'dark:text-purple-300' },
    formatters: { bg: 'bg-orange-100', text: 'text-orange-800', darkBg: 'dark:bg-orange-900/30', darkText: 'dark:text-orange-300' },
    utilities: { bg: 'bg-gray-100', text: 'text-gray-800', darkBg: 'dark:bg-gray-800', darkText: 'dark:text-gray-300' },
  };
  
  return colors[category];
};

const CategorySection: React.FC<CategorySectionProps> = ({ title, category, tools, icon, description }) => {
  // Dynamically get the icon component
  const IconComponent = (LucideIcons as Record<string, React.FC<any>>)[icon] || LucideIcons.Folder;
  
  const categoryColor = getCategoryColor(category);
  const sectionTools = tools.filter(tool => tool.category === category);
  
  if (sectionTools.length === 0) {
    return null;
  }
  
  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <div className={`w-12 h-12 rounded-lg ${categoryColor.bg} ${categoryColor.darkBg} flex items-center justify-center ${categoryColor.text} ${categoryColor.darkText} mr-4`}>
              <IconComponent size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{title}</h2>
              <p className="text-gray-600 dark:text-gray-400">{description}</p>
            </div>
          </div>
          
          <Link 
            to={`/category/${category}`}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium flex items-center"
          >
            View All
            <LucideIcons.ChevronRight size={16} className="ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sectionTools.slice(0, 4).map(tool => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;