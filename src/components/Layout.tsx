
import React, { ReactNode } from 'react';
import Sidebar from './Sidebar';
import { useNav } from '@/context/NavContext';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

const Layout = ({ children, title }: LayoutProps) => {
  const { sidebarState } = useNav();
  const isExpanded = ['expanded', 'mobile-expanded'].includes(sidebarState);
  
  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar />
      
      <main className={cn(
        "flex-1 transition-all duration-300 ease-in-out",
        isExpanded ? "lg:ml-64" : "lg:ml-16",
      )}>
        {title && (
          <header className="bg-white border-b border-gray-200 py-4 px-6">
            <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
          </header>
        )}
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
