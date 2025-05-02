import React from 'react';
import { Link } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';

const categories = [
  { id: 'text', name: 'Text Tools', icon: 'Type' },
  { id: 'conversion', name: 'Conversion Tools', icon: 'RefreshCw' },
  { id: 'generator', name: 'Generator Tools', icon: 'Wand2' },
  { id: 'formatters', name: 'Formatter Tools', icon: 'FileText' },
  { id: 'utilities', name: 'Utility Tools', icon: 'Tool' },
  { id: 'pdf', name: 'PDF Tools', icon: 'File' },
];

const CategoriesPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12 animate-fadeInUp">
        Explore Tool Categories
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category) => {
          const Icon = (LucideIcons as any)[category.icon] || LucideIcons.Folder;
          return (
            <Link
              key={category.id}
              to={`/categories/${category.id}`}
              className="flex flex-col items-center justify-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <div className="mb-4 p-4 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300">
                <Icon size={36} />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{category.name}</h2>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CategoriesPage;
