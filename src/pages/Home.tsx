import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Star, Clock, PenTool as Tool } from 'lucide-react';
import ToolCard from '../components/common/ToolCard';
import CategorySection from '../components/common/CategorySection';
import tools from '../data/tools';
import { useToolHistory } from '../hooks/useToolHistory';

const Home: React.FC = () => {
  const { getRecentTools, getMostUsedTools } = useToolHistory();
  
  const recentToolIds = getRecentTools(4).map(item => item.id);
  const recentTools = tools.filter(tool => recentToolIds.includes(tool.id));
  
  const popularToolIds = getMostUsedTools(4).map(item => item.id);
  const popularTools = tools.filter(tool => popularToolIds.includes(tool.id));
  
  // If no history exists, show some default tools
  const showRecent = recentTools.length > 0;
  const showPopular = popularTools.length > 0 && !popularTools.every(tool => recentToolIds.includes(tool.id));
  
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-900 dark:to-indigo-900 text-white py-20">
  <div className="container mx-auto px-4">
    <div className="max-w-3xl mx-auto text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-6">One place for all your online tools</h1>
      <p className="text-xl mb-8 text-blue-100">
        Free online tools for text formatting, conversions, calculations and more.
        Save time with our collection of practical web utilities.
      </p>

      {/* Search Bar */}
      <div className="relative max-w-xl mx-auto">
        <input
          type="text"
          placeholder="Search for a tool..."
          className="w-full px-6 py-4 rounded-full text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-lg text-lg"
        />
        <Link
          to="/search"
          className="absolute right-3 top-3 p-2 bg-blue-600 rounded-full hover:bg-blue-700 transition-colors"
        >
          <Search size={20} />
        </Link>
      </div>

      {/* New Image Converter Button */}
      <div className="flex flex-wrap justify-center gap-6 mt-8">
        <Link
          to="/convert-image"
          className="inline-block px-8 py-3 bg-white text-blue-600 font-semibold rounded-full shadow-md hover:bg-blue-100 transition-colors"
        >
          Try Our Image Converter
        </Link>
        <Link
        to="/convert-pdf"
        className="inline-block px-8 py-3 bg-white text-blue-600 font-semibold rounded-full shadow-md hover:bg-blue-100 hover:scale-105 transform transition"
        >
          Try Our PDF Converter
          </Link>
      </div>

    </div>
  </div>
  </section>

      
      {/* Recently Used Tools Section */}
      {showRecent && (
        <section className="py-12 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="flex items-center mb-8">
              <Clock size={24} className="text-blue-600 dark:text-blue-400 mr-3" />
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Recently Used Tools</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recentTools.map(tool => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* Popular Tools Section */}
      {showPopular && (
        <section className="py-12 bg-white dark:bg-gray-950">
          <div className="container mx-auto px-4">
            <div className="flex items-center mb-8">
              <Star size={24} className="text-blue-600 dark:text-blue-400 mr-3" />
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Popular Tools</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {popularTools.map(tool => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* Categories */}
      <CategorySection
        title="Text Tools"
        category="text"
        tools={tools}
        icon="Type"
        description="Tools for text manipulation, formatting, and analysis"
      />
      
      <CategorySection
        title="Conversion Tools"
        category="conversion"
        tools={tools}
        icon="RefreshCw"
        description="Convert between different formats and units"
      />
      
      <CategorySection
        title="Generator Tools"
        category="generator"
        tools={tools}
        icon="Wand2"
        description="Generate passwords, UUIDs, and more"
      />
      
      <CategorySection
        title="Formatter Tools"
        category="formatters"
        tools={tools}
        icon="FileText"
        description="Format and validate various data formats"
      />
      
      <CategorySection
        title="Utilities"
        category="utilities"
        tools={tools}
        icon="Tool"
        description="Miscellaneous useful utilities"
      />
      
      {/* About Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
              Free Online Tools For Every Need
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              MyTools offers a comprehensive collection of free online utilities to help with 
              everyday tasks. All tools are designed to be fast, secure, and easy to use.
              We respect your privacy - all processing is done in your browser.
            </p>
            <div className="flex justify-center">
              <Link
                to="/about"
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-md"
              >
                Learn More About Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;