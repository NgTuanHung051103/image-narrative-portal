
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { categories, Category, languages, Image, images } from '@/data/mockData';
import { Plus, Search, Edit, Trash2, ChevronDown, ChevronRight, Globe, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TreeNodeProps {
  category: Category;
  categories: Category[];
  level: number;
  expanded: Record<string, boolean>;
  selected: string | null;
  onToggleExpand: (id: string) => void;
  onSelect: (id: string) => void;
}

const TreeNode = ({ 
  category, 
  categories, 
  level, 
  expanded, 
  selected, 
  onToggleExpand, 
  onSelect 
}: TreeNodeProps) => {
  const hasChildren = categories.some(c => c.parentId === category.id);
  const isExpanded = expanded[category.id] || false;
  const isSelected = selected === category.id;
  const childCategories = categories.filter(c => c.parentId === category.id);
  
  // Get image if exists
  const categoryImage = category.imageId ? images.find(img => img.id === category.imageId) : null;
  
  // Get name from English language (default)
  const name = category.languages.find(l => l.languageId === 'en')?.name || 'Unnamed';

  return (
    <div>
      <div 
        className={cn(
          "flex items-center py-2 px-3 hover:bg-gray-50 cursor-pointer transition-colors",
          isSelected && "bg-violet-50"
        )}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
        onClick={() => onSelect(category.id)}
      >
        {hasChildren ? (
          <button
            className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-gray-700"
            onClick={(e) => {
              e.stopPropagation();
              onToggleExpand(category.id);
            }}
          >
            {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
          </button>
        ) : (
          <div className="w-6"></div>
        )}
        
        {categoryImage ? (
          <div className="w-6 h-6 mr-2 rounded overflow-hidden">
            <img 
              src={categoryImage.thumbnailUrl} 
              alt={name} 
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="w-6 h-6 mr-2 bg-gray-200 rounded flex items-center justify-center">
            <span className="text-xs text-gray-500">{name.charAt(0)}</span>
          </div>
        )}
        
        <span className="flex-1 truncate">{name}</span>
        
        {category.languages.length > 1 && (
          <div className="flex items-center text-gray-400 ml-2">
            <Globe size={14} />
            <span className="ml-1 text-xs">{category.languages.length}</span>
          </div>
        )}
      </div>
      
      {isExpanded && hasChildren && (
        <div>
          {childCategories.map(child => (
            <TreeNode
              key={child.id}
              category={child}
              categories={categories}
              level={level + 1}
              expanded={expanded}
              selected={selected}
              onToggleExpand={onToggleExpand}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const CategoryForm = ({ category, onClose }: { category: Category | null, onClose: () => void }) => {
  const [activeTab, setActiveTab] = useState(languages[0].id);
  
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
      <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-gray-50">
        <h3 className="font-semibold text-gray-800">
          {category ? 'Edit Category' : 'Add New Category'}
        </h3>
        <button 
          className="text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <X size={20} />
        </button>
      </div>
      
      <div className="p-4">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Slug
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-violet-500 focus:border-violet-500"
            placeholder="category-slug"
            defaultValue={category?.slug || ''}
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Parent Category
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-violet-500 focus:border-violet-500"
            defaultValue={category?.parentId || ''}
          >
            <option value="">None (Top Level)</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>
                {cat.languages.find(l => l.languageId === 'en')?.name || 'Unnamed'}
              </option>
            ))}
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Featured Image
          </label>
          <div className="flex items-center">
            {category?.imageId ? (
              <div className="relative w-24 h-24 border border-gray-200 rounded-md overflow-hidden group">
                <img 
                  src={images.find(img => img.id === category.imageId)?.thumbnailUrl || ''} 
                  alt="Category" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button className="text-white text-sm">Change</button>
                </div>
              </div>
            ) : (
              <button className="w-24 h-24 border border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center text-gray-500 hover:text-violet-600 hover:border-violet-500">
                <Plus size={20} />
                <span className="text-xs mt-1">Select Image</span>
              </button>
            )}
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex border-b border-gray-200">
            {languages.map(lang => (
              <button
                key={lang.id}
                className={cn(
                  "px-4 py-2 text-sm font-medium",
                  activeTab === lang.id 
                    ? "text-violet-700 border-b-2 border-violet-700" 
                    : "text-gray-500 hover:text-gray-700"
                )}
                onClick={() => setActiveTab(lang.id)}
              >
                {lang.name} {lang.isDefault && '(Default)'}
              </button>
            ))}
          </div>
          
          <div className="pt-4">
            {languages.map(lang => (
              <div key={lang.id} className={activeTab === lang.id ? 'block' : 'hidden'}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name ({lang.name})
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-violet-500 focus:border-violet-500"
                    placeholder={`Category name in ${lang.name}`}
                    defaultValue={category?.languages.find(l => l.languageId === lang.id)?.name || ''}
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description ({lang.name})
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-violet-500 focus:border-violet-500"
                    rows={3}
                    placeholder={`Category description in ${lang.name}`}
                    defaultValue={category?.languages.find(l => l.languageId === lang.id)?.description || ''}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end space-x-3 mt-6">
          <button
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 text-sm font-medium text-white bg-violet-600 rounded-md hover:bg-violet-700"
          >
            {category ? 'Update Category' : 'Create Category'}
          </button>
        </div>
      </div>
    </div>
  );
};

const Categories = () => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  
  const rootCategories = categories.filter(c => c.parentId === null);
  
  const handleToggleExpand = (id: string) => {
    setExpanded(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  const handleSelect = (id: string) => {
    setSelected(id);
    setShowForm(true);
  };
  
  const handleAddNew = () => {
    setSelected(null);
    setShowForm(true);
  };
  
  const selectedCategory = selected ? categories.find(c => c.id === selected) || null : null;
  
  return (
    <Layout title="Categories">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
              <h3 className="font-medium text-gray-800">Category Tree</h3>
              <button
                className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-white bg-violet-600 rounded-md hover:bg-violet-700"
                onClick={handleAddNew}
              >
                <Plus size={16} className="mr-1" />
                <span>Add New</span>
              </button>
            </div>
            
            <div className="p-3 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search categories..."
                  className="w-full rounded-md border border-gray-200 bg-gray-50 py-2 pl-8 pr-4 text-sm text-gray-900 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="tree-table max-h-96 overflow-y-auto custom-scrollbar">
              {rootCategories.map(category => (
                <TreeNode
                  key={category.id}
                  category={category}
                  categories={categories}
                  level={0}
                  expanded={expanded}
                  selected={selected}
                  onToggleExpand={handleToggleExpand}
                  onSelect={handleSelect}
                />
              ))}
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-2">
          {showForm ? (
            <CategoryForm 
              category={selectedCategory} 
              onClose={() => setShowForm(false)} 
            />
          ) : (
            <div className="bg-gray-100 border border-gray-200 border-dashed rounded-lg p-8 text-center">
              <div className="mx-auto w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                <FolderTree size={24} className="text-gray-500" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Category Selected</h3>
              <p className="text-gray-600 mb-4">
                Select a category from the tree to edit its details or create a new one.
              </p>
              <button
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-violet-600 rounded-md hover:bg-violet-700"
                onClick={handleAddNew}
              >
                <Plus size={16} className="mr-2" />
                <span>Add New Category</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
