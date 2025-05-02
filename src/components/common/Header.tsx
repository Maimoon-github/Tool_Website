import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Moon, Sun, Menu, X } from 'lucide-react';
import { useDarkMode } from '../../hooks/useDarkMode';
import tools from '../../data/tools';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<typeof tools>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useDarkMode();
  const location = useLocation();

  // Handle scrolling effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Handle search functionality
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = tools.filter(
      tool => 
        tool.name.toLowerCase().includes(query) || 
        tool.description.toLowerCase().includes(query)
    );
    
    setSearchResults(filtered);
  }, [searchQuery]);

  const handleSearchFocus = () => {
    setIsSearchOpen(true);
  };

  const handleSearchBlur = () => {
    // Delay to allow click on search results
    setTimeout(() => {
      setIsSearchOpen(false);
    }, 200);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white dark:bg-gray-900 shadow-md py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">My</span>
            <span className="text-2xl font-bold text-gray-800 dark:text-white">Tools</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="font-medium text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400">
              Home
            </Link>
            <Link to="/categories" className="font-medium text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400">
              Categories
            </Link>
            <Link to="/popular" className="font-medium text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400">
              Popular
            </Link>
            <Link to="/new" className="font-medium text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400">
              New
            </Link>
          </nav>

          {/* Search, Theme Toggle & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="relative">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search tools..."
                  className="pl-10 pr-4 py-2 w-40 md:w-64 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={handleSearchFocus}
                  onBlur={handleSearchBlur}
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              </div>

              {/* Search Results Dropdown */}
              {isSearchOpen && searchResults.length > 0 && (
                <div className="absolute mt-2 w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg max-h-96 overflow-y-auto z-50">
                  {searchResults.map(tool => (
                    <Link
                      key={tool.id}
                      to={tool.path}
                      className="block p-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className="font-medium text-gray-800 dark:text-white">{tool.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{tool.description}</div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? (
                <Sun className="h-5 w-5 text-yellow-400" />
              ) : (
                <Moon className="h-5 w-5 text-gray-700" />
              )}
            </button>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-800 dark:text-white" />
              ) : (
                <Menu className="h-6 w-6 text-gray-800 dark:text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg">
          <nav className="flex flex-col px-4 py-4 space-y-4">
            <Link to="/" className="font-medium text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400">
              Home
            </Link>
            <Link to="/categories" className="font-medium text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400">
              Categories
            </Link>
            <Link to="/popular" className="font-medium text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400">
              Popular
            </Link>
            <Link to="/new" className="font-medium text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400">
              New
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;