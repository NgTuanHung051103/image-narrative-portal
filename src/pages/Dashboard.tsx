
import React from 'react';
import Layout from '@/components/Layout';
import { 
  FolderTree, 
  FileText, 
  Image, 
  LayoutGrid,
  Settings,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { categories, contents, images, pages } from '@/data/mockData';

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  to: string;
}

const StatCard = ({ title, value, icon, color, to }: StatCardProps) => {
  return (
    <Link 
      to={to}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 hover:shadow-md transition-all"
    >
      <div className="flex items-center mb-3">
        <div className={`h-10 w-10 flex items-center justify-center rounded-md ${color}`}>
          {icon}
        </div>
        <h3 className="ml-4 text-lg font-semibold text-gray-800">{title}</h3>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold text-gray-900">{value}</span>
        <ArrowRight size={18} className="text-gray-500" />
      </div>
    </Link>
  );
};

const Dashboard = () => {
  return (
    <Layout title="Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Categories" 
          value={categories.length} 
          icon={<FolderTree size={22} className="text-white" />} 
          color="bg-violet-600" 
          to="/categories"
        />
        <StatCard 
          title="Contents" 
          value={contents.length} 
          icon={<FileText size={22} className="text-white" />} 
          color="bg-sky-600" 
          to="/contents"
        />
        <StatCard 
          title="Images" 
          value={images.length} 
          icon={<Image size={22} className="text-white" />} 
          color="bg-green-600" 
          to="/images"
        />
        <StatCard 
          title="Pages" 
          value={pages.length} 
          icon={<LayoutGrid size={22} className="text-white" />} 
          color="bg-yellow-600" 
          to="/pages"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="flex justify-between items-center p-5 bg-gray-50 border-b border-gray-200">
            <h3 className="font-semibold text-gray-800">Recent Contents</h3>
            <Link to="/contents" className="text-sm text-violet-600 hover:text-violet-800">View all</Link>
          </div>
          <div className="divide-y divide-gray-200">
            {contents.slice(0, 5).map(content => (
              <div key={content.id} className="flex items-center p-4 hover:bg-gray-50">
                <div className="flex-shrink-0 h-10 w-10 rounded-md bg-gray-200 flex items-center justify-center">
                  <FileText size={20} className="text-gray-500" />
                </div>
                <div className="ml-4">
                  <h4 className="text-sm font-medium text-gray-900">
                    {content.languages.find(l => l.languageId === 'en')?.title || 'Untitled'}
                  </h4>
                  <p className="text-xs text-gray-500 truncate">
                    {new Date(content.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="flex justify-between items-center p-5 bg-gray-50 border-b border-gray-200">
            <h3 className="font-semibold text-gray-800">Recent Pages</h3>
            <Link to="/pages" className="text-sm text-violet-600 hover:text-violet-800">View all</Link>
          </div>
          <div className="divide-y divide-gray-200">
            {pages.slice(0, 5).map(page => (
              <div key={page.id} className="flex items-center p-4 hover:bg-gray-50">
                <div className="flex-shrink-0 h-10 w-10 rounded-md bg-gray-200 flex items-center justify-center">
                  <LayoutGrid size={20} className="text-gray-500" />
                </div>
                <div className="ml-4">
                  <h4 className="text-sm font-medium text-gray-900">{page.title}</h4>
                  <p className="text-xs text-gray-500 truncate">
                    {new Date(page.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
        <div className="flex justify-between items-center p-5 bg-gray-50 border-b border-gray-200">
          <h3 className="font-semibold text-gray-800">Quick Actions</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5">
          <Link 
            to="/categories/new" 
            className="bg-gray-50 border border-gray-200 rounded-md p-4 hover:bg-gray-100 transition-all"
          >
            <FolderTree size={24} className="text-violet-600 mb-3" />
            <h4 className="font-medium text-gray-800">Add New Category</h4>
            <p className="text-sm text-gray-500 mt-1">Create and organize categories</p>
          </Link>
          
          <Link 
            to="/contents/new" 
            className="bg-gray-50 border border-gray-200 rounded-md p-4 hover:bg-gray-100 transition-all"
          >
            <FileText size={24} className="text-sky-600 mb-3" />
            <h4 className="font-medium text-gray-800">Create New Content</h4>
            <p className="text-sm text-gray-500 mt-1">Add new content to your site</p>
          </Link>
          
          <Link 
            to="/pages/new" 
            className="bg-gray-50 border border-gray-200 rounded-md p-4 hover:bg-gray-100 transition-all"
          >
            <LayoutGrid size={24} className="text-yellow-600 mb-3" />
            <h4 className="font-medium text-gray-800">Build New Page</h4>
            <p className="text-sm text-gray-500 mt-1">Design pages with components</p>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
