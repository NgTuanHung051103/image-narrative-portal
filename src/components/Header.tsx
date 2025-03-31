
import React from 'react';
import { Bell, User, Search } from 'lucide-react';

const Header = () => {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 md:px-6">
      <div className="flex flex-1 items-center space-x-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full rounded-md border border-gray-200 bg-gray-50 py-2 pl-8 pr-4 text-sm text-gray-900 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="rounded-full p-2 text-gray-600 hover:bg-gray-100">
          <Bell size={20} />
        </button>
        
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-violet-600 text-white flex items-center justify-center">
            <User size={16} />
          </div>
          <div className="hidden md:block text-sm">
            <p className="font-medium text-gray-800">Admin User</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
