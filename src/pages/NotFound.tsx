import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-blue-600 dark:text-blue-500">404</h1>
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mt-4 mb-6">Page Not Found</h2>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-lg mx-auto mb-10">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            to="/" 
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition-colors flex items-center justify-center"
          >
            <Home className="mr-2" size={18} />
            Back to Home
          </Link>
          <Link 
            to="/categories" 
            className="px-6 py-3 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg shadow-md transition-colors flex items-center justify-center"
          >
            <Search className="mr-2" size={18} />
            Browse Tools
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;