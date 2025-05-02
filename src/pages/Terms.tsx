import React from 'react';
import { Scale, AlertCircle, FileText, MessageCircle } from 'lucide-react';

const Terms: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Scale className="w-16 h-16 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Terms of Service</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Please read these terms carefully before using our services.
          </p>
        </div>

        <div className="space-y-12">
          <section>
            <div className="flex items-center mb-4">
              <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-2" />
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Terms of Use</h2>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                By accessing and using MyTools, you accept and agree to be bound by the terms and provisions of this agreement.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                <li>Use of our tools is free for both personal and commercial use</li>
                <li>You must not use our services for any illegal purposes</li>
                <li>We reserve the right to modify or terminate services at any time</li>
                <li>You are responsible for any data you process using our tools</li>
              </ul>
            </div>
          </section>

          <section>
            <div className="flex items-center mb-4">
              <AlertCircle className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-2" />
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Disclaimer</h2>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Our services are provided "as is" without any warranties:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                <li>We do not guarantee uninterrupted or error-free service</li>
                <li>We are not responsible for any data loss or damage</li>
                <li>Results from our tools should be verified independently</li>
                <li>We reserve the right to modify these terms at any time</li>
              </ul>
            </div>
          </section>

          <section>
            <div className="flex items-center mb-4">
              <MessageCircle className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-2" />
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Contact</h2>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
              <p className="text-gray-600 dark:text-gray-400">
                For any questions regarding these terms, please contact us at:
                <a href="mailto:terms@mytools.com" className="text-blue-600 dark:text-blue-400 ml-2 hover:underline">
                  terms@mytools.com
                </a>
              </p>
            </div>
          </section>

          <section className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Updates to Terms</h2>
            <p className="text-gray-600 dark:text-gray-400">
              We may update these terms from time to time. We will notify users of any material changes by posting the new terms
              on this site. Your continued use of our services after such modifications will constitute your acknowledgment of the
              modified terms.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;