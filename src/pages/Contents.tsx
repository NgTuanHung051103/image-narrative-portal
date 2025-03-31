
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { categories, Category, contents, Content, languages, images } from '@/data/mockData';
import { Plus, Search, Edit, Trash2, Globe, Filter, ArrowUp, ArrowDown, Image as ImageIcon, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

const ContentsList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'updated' | 'title'>('updated');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  
  // Filter contents based on search and category
  const filteredContents = contents.filter(content => {
    // Filter by category if selected
    if (selectedCategory && content.categoryId !== selectedCategory) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery) {
      const lowercaseQuery = searchQuery.toLowerCase();
      const titleMatch = content.languages.some(lang => 
        lang.title.toLowerCase().includes(lowercaseQuery)
      );
      const descriptionMatch = content.languages.some(lang => 
        lang.description.toLowerCase().includes(lowercaseQuery)
      );
      
      return titleMatch || descriptionMatch;
    }
    
    return true;
  });
  
  // Sort contents
  const sortedContents = [...filteredContents].sort((a, b) => {
    if (sortBy === 'updated') {
      const dateA = new Date(a.updatedAt).getTime();
      const dateB = new Date(b.updatedAt).getTime();
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    } else {
      const titleA = a.languages.find(l => l.languageId === 'en')?.title || '';
      const titleB = b.languages.find(l => l.languageId === 'en')?.title || '';
      return sortOrder === 'asc' 
        ? titleA.localeCompare(titleB)
        : titleB.localeCompare(titleA);
    }
  });
  
  const toggleSortOrder = () => {
    setSortOrder(current => current === 'asc' ? 'desc' : 'asc');
  };
  
  const toggleSort = (type: 'updated' | 'title') => {
    if (sortBy === type) {
      toggleSortOrder();
    } else {
      setSortBy(type);
      setSortOrder('desc');
    }
  };
  
  // Helper function to get category name
  const getCategoryName = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category?.languages.find(l => l.languageId === 'en')?.name || 'Unknown';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
        <h3 className="font-medium text-gray-800">All Contents</h3>
        <Link
          to="/contents/new"
          className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-white bg-violet-600 rounded-md hover:bg-violet-700"
        >
          <Plus size={16} className="mr-1" />
          <span>Add New</span>
        </Link>
      </div>
      
      <div className="p-4 border-b border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative col-span-2">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search contents..."
            className="w-full rounded-md border border-gray-200 bg-gray-50 py-2 pl-8 pr-4 text-sm text-gray-900 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div>
          <select
            className="w-full rounded-md border border-gray-200 bg-gray-50 py-2 px-3 text-sm text-gray-900 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
            value={selectedCategory || ''}
            onChange={(e) => setSelectedCategory(e.target.value || null)}
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.languages.find(l => l.languageId === 'en')?.name || 'Unknown'}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
                ID
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => toggleSort('title')}
              >
                <div className="flex items-center">
                  <span>Title</span>
                  {sortBy === 'title' && (
                    sortOrder === 'asc' ? 
                      <ArrowUp size={14} className="ml-1" /> : 
                      <ArrowDown size={14} className="ml-1" />
                  )}
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => toggleSort('updated')}
              >
                <div className="flex items-center">
                  <span>Updated</span>
                  {sortBy === 'updated' && (
                    sortOrder === 'asc' ? 
                      <ArrowUp size={14} className="ml-1" /> : 
                      <ArrowDown size={14} className="ml-1" />
                  )}
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedContents.map(content => {
              const title = content.languages.find(l => l.languageId === 'en')?.title || 'Untitled';
              const hasImages = content.imageIds.length > 0;
              
              return (
                <tr key={content.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {content.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {hasImages ? (
                        <div className="flex-shrink-0 h-8 w-8 rounded-md overflow-hidden mr-3">
                          <img 
                            src={images.find(img => img.id === content.imageIds[0])?.thumbnailUrl} 
                            alt={title}
                            className="h-8 w-8 object-cover"
                          />
                        </div>
                      ) : (
                        <div className="flex-shrink-0 h-8 w-8 rounded-md bg-gray-200 flex items-center justify-center mr-3">
                          <FileText size={14} className="text-gray-500" />
                        </div>
                      )}
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {title}
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <Globe size={12} className="mr-1" />
                          <span>{content.languages.length} languages</span>
                          {hasImages && (
                            <>
                              <span className="mx-1">•</span>
                              <ImageIcon size={12} className="mr-1" />
                              <span>{content.imageIds.length} images</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {getCategoryName(content.categoryId)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(content.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={cn(
                      "px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
                      content.isActive 
                        ? "bg-green-100 text-green-800" 
                        : "bg-gray-100 text-gray-800"
                    )}>
                      {content.isActive ? 'Active' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link
                      to={`/contents/edit/${content.id}`}
                      className="text-violet-600 hover:text-violet-900 mr-3"
                    >
                      <Edit size={16} />
                    </Link>
                    <button className="text-red-600 hover:text-red-900">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              );
            })}
            
            {sortedContents.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                  <div className="flex flex-col items-center">
                    <FileText size={32} className="text-gray-400 mb-2" />
                    <p className="text-lg font-medium text-gray-600 mb-1">No contents found</p>
                    <p className="text-sm text-gray-500 mb-4">
                      {searchQuery || selectedCategory 
                        ? 'Try changing your search criteria'
                        : 'Get started by creating your first content'}
                    </p>
                    <Link
                      to="/contents/new"
                      className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-white bg-violet-600 rounded-md hover:bg-violet-700"
                    >
                      <Plus size={16} className="mr-1" />
                      <span>Add New Content</span>
                    </Link>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <div className="bg-gray-50 px-4 py-3 border-t border-gray-200 sm:px-6">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">{sortedContents.length}</span> results
          </div>
          <div className="flex-1 flex justify-end">
            <div className="relative z-0 inline-flex shadow-sm rounded-md">
              <button
                type="button"
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Previous
              </button>
              <button
                type="button"
                className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Contents = () => {
  return (
    <Layout title="Contents">
      <ContentsList />
    </Layout>
  );
};

export default Contents;
