
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { pages, Page, contents, Content, ComponentType } from '@/data/mockData';
import { Plus, Edit, Trash2, LayoutGrid, FileText, MoveVertical, MoreVertical, Eye, Copy, Link as LinkIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface ComponentIconProps {
  type: ComponentType;
}

const ComponentIcon = ({ type }: ComponentIconProps) => {
  switch (type) {
    case 'hero':
      return <div className="w-6 h-6 rounded-md bg-violet-100 text-violet-600 flex items-center justify-center">H</div>;
    case 'feature-grid':
      return <div className="w-6 h-6 rounded-md bg-sky-100 text-sky-600 flex items-center justify-center">G</div>;
    case 'content-with-image':
      return <div className="w-6 h-6 rounded-md bg-green-100 text-green-600 flex items-center justify-center">C</div>;
    case 'testimonials':
      return <div className="w-6 h-6 rounded-md bg-yellow-100 text-yellow-600 flex items-center justify-center">T</div>;
    case 'gallery':
      return <div className="w-6 h-6 rounded-md bg-red-100 text-red-600 flex items-center justify-center">G</div>;
    case 'team-members':
      return <div className="w-6 h-6 rounded-md bg-gray-100 text-gray-600 flex items-center justify-center">T</div>;
    default:
      return <LayoutGrid size={18} />;
  }
};

interface PageComponentPreviewProps {
  pageId: string;
  type: ComponentType;
  contentIds: string[];
}

const PageComponentPreview = ({ pageId, type, contentIds }: PageComponentPreviewProps) => {
  const componentContents = contents.filter(content => contentIds.includes(content.id));
  
  // Get title of the first content
  const primaryTitle = componentContents.length > 0 
    ? componentContents[0].languages.find(l => l.languageId === 'en')?.title || 'Untitled'
    : 'No content selected';
  
  return (
    <div className="border border-gray-200 rounded-md overflow-hidden">
      <div className={cn(
        "py-2 px-3 flex items-center justify-between",
        type === 'hero' ? "bg-violet-50" :
        type === 'feature-grid' ? "bg-sky-50" :
        type === 'content-with-image' ? "bg-green-50" :
        type === 'testimonials' ? "bg-yellow-50" :
        type === 'gallery' ? "bg-red-50" :
        "bg-gray-50"
      )}>
        <div className="flex items-center">
          <ComponentIcon type={type} />
          <span className="ml-2 font-medium text-gray-800">
            {type === 'hero' ? 'Hero Banner' :
            type === 'feature-grid' ? 'Feature Grid' :
            type === 'content-with-image' ? 'Content with Image' :
            type === 'testimonials' ? 'Testimonials' :
            type === 'gallery' ? 'Gallery' :
            type === 'team-members' ? 'Team Members' :
            type}
          </span>
        </div>
        <div className="flex">
          <button className="p-1 text-gray-500 hover:text-gray-700">
            <MoveVertical size={16} />
          </button>
          <button className="p-1 text-gray-500 hover:text-gray-700">
            <Edit size={16} />
          </button>
          <button className="p-1 text-gray-500 hover:text-gray-700 ml-1">
            <MoreVertical size={16} />
          </button>
        </div>
      </div>
      
      <div className="p-3 bg-white">
        <div className="text-sm text-gray-800 font-medium mb-1">
          {primaryTitle}
        </div>
        
        <div className="text-xs text-gray-500">
          {contentIds.length} content{contentIds.length !== 1 && 's'} assigned
        </div>
        
        {contentIds.length > 1 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {contentIds.slice(0, 3).map(id => {
              const content = contents.find(c => c.id === id);
              return content ? (
                <div 
                  key={id} 
                  className="px-2 py-1 rounded-md bg-gray-100 text-xs text-gray-700"
                >
                  {content.languages.find(l => l.languageId === 'en')?.title || 'Untitled'}
                </div>
              ) : null;
            })}
            
            {contentIds.length > 3 && (
              <div className="px-2 py-1 rounded-md bg-gray-100 text-xs text-gray-700">
                +{contentIds.length - 3} more
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

interface PageCardProps {
  page: Page;
}

const PageCard = ({ page }: PageCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h3 className="font-medium text-gray-800">{page.title}</h3>
        <div className="flex items-center">
          <span className={cn(
            "px-2 py-0.5 text-xs rounded-full mr-2",
            page.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
          )}>
            {page.isActive ? 'Published' : 'Draft'}
          </span>
          <button className="p-1 text-gray-500 hover:text-gray-700">
            <MoreVertical size={18} />
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <div className="mb-3">
          <div className="flex items-center text-gray-500 text-sm mb-1">
            <LinkIcon size={14} className="mr-1" />
            <span className="truncate">/{page.slug}</span>
          </div>
          <p className="text-sm text-gray-600">{page.description}</p>
        </div>
        
        <div className="mb-3">
          <div className="text-xs font-medium text-gray-500 uppercase mb-2">Components</div>
          <div className="flex flex-wrap gap-1">
            {page.components.slice(0, 3).map(component => (
              <div key={component.id} className="flex items-center py-0.5 px-2 bg-gray-100 rounded-md">
                <ComponentIcon type={component.type} />
                <span className="ml-1 text-xs text-gray-700">
                  {component.type === 'hero' ? 'Hero' :
                  component.type === 'feature-grid' ? 'Features' :
                  component.type === 'content-with-image' ? 'Content' :
                  component.type === 'testimonials' ? 'Testimonials' :
                  component.type === 'gallery' ? 'Gallery' :
                  component.type === 'team-members' ? 'Team' :
                  component.type}
                </span>
              </div>
            ))}
            
            {page.components.length > 3 && (
              <div className="py-0.5 px-2 bg-gray-100 rounded-md">
                <span className="text-xs text-gray-700">+{page.components.length - 3} more</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="text-xs text-gray-500">
          Updated {new Date(page.updatedAt).toLocaleDateString()}
        </div>
      </div>
      
      <div className="bg-gray-50 px-4 py-3 border-t border-gray-200 flex justify-between">
        <div className="flex space-x-2">
          <button className="inline-flex items-center px-2 py-1 text-xs text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50">
            <Eye size={14} className="mr-1" />
            Preview
          </button>
          <button className="inline-flex items-center px-2 py-1 text-xs text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50">
            <Copy size={14} className="mr-1" />
            Duplicate
          </button>
        </div>
        
        <div className="flex space-x-2">
          <Link
            to={`/pages/edit/${page.id}`}
            className="inline-flex items-center px-2 py-1 text-xs text-white bg-violet-600 rounded hover:bg-violet-700"
          >
            <Edit size={14} className="mr-1" />
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
};

const PageDetail = ({ pageId }: { pageId: string }) => {
  const page = pages.find(p => p.id === pageId);
  
  if (!page) {
    return <div>Page not found</div>;
  }
  
  // Sort components by order
  const sortedComponents = [...page.components].sort((a, b) => a.order - b.order);
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
        <div>
          <h3 className="font-medium text-gray-800">{page.title}</h3>
          <p className="text-sm text-gray-600">{page.description}</p>
        </div>
        <div className="flex items-center space-x-2">
          <button className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50">
            <Eye size={16} className="mr-1.5" />
            Preview
          </button>
          <button className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-white bg-violet-600 rounded-md shadow-sm hover:bg-violet-700">
            <Edit size={16} className="mr-1.5" />
            Edit Page
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-medium text-gray-800">Page Components</h4>
          <button className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-white bg-violet-600 rounded-md shadow-sm hover:bg-violet-700">
            <Plus size={16} className="mr-1.5" />
            Add Component
          </button>
        </div>
        
        <div className="space-y-3">
          {sortedComponents.map(component => (
            <PageComponentPreview
              key={component.id}
              pageId={page.id}
              type={component.type}
              contentIds={component.contentIds}
            />
          ))}
          
          {sortedComponents.length === 0 && (
            <div className="bg-gray-50 border border-gray-200 border-dashed rounded-lg p-6 text-center">
              <div className="mx-auto w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                <LayoutGrid size={20} className="text-gray-500" />
              </div>
              <h4 className="text-base font-medium text-gray-800 mb-1">No Components</h4>
              <p className="text-sm text-gray-600 mb-4">
                This page doesn't have any components yet. Add your first component to start building the page.
              </p>
              <button className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-white bg-violet-600 rounded-md shadow-sm hover:bg-violet-700">
                <Plus size={16} className="mr-1.5" />
                Add Component
              </button>
            </div>
          )}
        </div>
      </div>
      
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Last updated: {new Date(page.updatedAt).toLocaleString()}
          </div>
          <div className="flex items-center space-x-2">
            <button className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50">
              <Copy size={16} className="mr-1.5" />
              Duplicate
            </button>
            <button className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-white bg-red-600 rounded-md shadow-sm hover:bg-red-700">
              <Trash2 size={16} className="mr-1.5" />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Pages = () => {
  const [selectedPage, setSelectedPage] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'detail'>('grid');
  
  const handleSelectPage = (pageId: string) => {
    setSelectedPage(pageId);
    setViewMode('detail');
  };
  
  return (
    <Layout title="Pages">
      {viewMode === 'grid' ? (
        <>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">All Pages</h2>
              <p className="text-sm text-gray-600">Manage and organize your website pages</p>
            </div>
            <Link
              to="/pages/new"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-violet-600 rounded-md shadow-sm hover:bg-violet-700"
            >
              <Plus size={18} className="mr-1.5" />
              Create Page
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pages.map(page => (
              <div key={page.id} onClick={() => handleSelectPage(page.id)}>
                <PageCard page={page} />
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="mb-6">
            <button
              className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
              onClick={() => setViewMode('grid')}
            >
              <span className="mr-1">←</span>
              Back to Pages
            </button>
          </div>
          
          {selectedPage && (
            <PageDetail pageId={selectedPage} />
          )}
        </>
      )}
    </Layout>
  );
};

export default Pages;
