import React from 'react';
import { Users, Shield, Code2, Heart } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">About MyTools</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Making web development and digital tasks easier with free, reliable online tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <Users className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Our Mission</h2>
            <p className="text-gray-600 dark:text-gray-400">
              We believe that quality development tools should be accessible to everyone. Our mission is to provide free, 
              reliable, and easy-to-use online utilities that make your work more efficient.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <Shield className="w-12 h-12 text-green-600 dark:text-green-400 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Privacy First</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Your privacy is our priority. All our tools run directly in your browser - we never store or collect your data. 
              Work confidently knowing your information stays with you.
            </p>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Why Choose MyTools?</h2>
          <ul className="space-y-4">
            <li className="flex items-start">
              <span className="text-blue-600 dark:text-blue-400 mr-3">✓</span>
              <span className="text-gray-700 dark:text-gray-300">Free and open-source tools</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 dark:text-blue-400 mr-3">✓</span>
              <span className="text-gray-700 dark:text-gray-300">No registration required</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 dark:text-blue-400 mr-3">✓</span>
              <span className="text-gray-700 dark:text-gray-300">Browser-based processing - your data stays local</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 dark:text-blue-400 mr-3">✓</span>
              <span className="text-gray-700 dark:text-gray-300">Regular updates and new tools</span>
            </li>
          </ul>
        </div>

        <div className="text-center">
          <Code2 className="w-16 h-16 text-blue-600 dark:text-blue-400 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Made with <Heart className="w-5 h-5 text-red-500 inline" /> by Developers</h2>
          <p className="text-gray-600 dark:text-gray-400">
            We're developers too, and we understand what makes a great tool. Our utilities are crafted with attention to detail
            and optimized for the best user experience.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;