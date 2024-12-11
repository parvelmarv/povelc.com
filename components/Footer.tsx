import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white shadow-lg mt-20">
      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-600 mb-4 md:mb-0">
            © {new Date().getFullYear()} Povel Croona. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <a href="https://github.com/parvelmarv" className="text-gray-600 hover:text-blue-600">
              GitHub
            </a>
            <a href="https://linkedin.com" className="text-gray-600 hover:text-blue-600">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 