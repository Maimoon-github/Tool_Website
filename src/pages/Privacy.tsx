import React from 'react';
import { Shield, Lock, Eye, Server } from 'lucide-react';

const Privacy: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Shield className="w-16 h-16 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Privacy Policy</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Your privacy is important to us. Here's how we handle your data.
          </p>
        </div>

        <div className="space-y-12">
          <section>
            <div className="flex items-center mb-4">
              <Lock className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-2" />
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Data Collection</h2>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                We do not collect, store, or transmit any of your personal data. All operations are performed locally in your browser.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                <li>No personal information is collected</li>
                <li>No cookies are used for tracking</li>
                <li>No data is sent to our servers</li>
              </ul>
            </div>
          </section>

          <section>
            <div className="flex items-center mb-4">
              <Eye className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-2" />
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Analytics</h2>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
              <p className="text-gray-600 dark:text-gray-400">
                We use basic, anonymous analytics to understand how our tools are used and to improve them. This data is:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-4 text-gray-600 dark:text-gray-400">
                <li>Completely anonymous</li>
                <li>Never linked to personal information</li>
                <li>Used only for improving our services</li>
              </ul>
            </div>
          </section>

          <section>
            <div className="flex items-center mb-4">
              <Server className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-2" />
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Local Storage</h2>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Some tools may use your browser's local storage to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                <li>Save your preferences</li>
                <li>Remember your last used settings</li>
                <li>Improve your user experience</li>
              </ul>
              <p className="mt-4 text-gray-600 dark:text-gray-400">
                This data never leaves your device and can be cleared at any time through your browser settings.
              </p>
            </div>
          </section>

          <section className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Contact Us</h2>
            <p className="text-gray-600 dark:text-gray-400">
              If you have any questions about our privacy policy, please contact us at:
              <a href="mailto:privacy@mytools.com" className="text-blue-600 dark:text-blue-400 ml-2 hover:underline">
                privacy@mytools.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;