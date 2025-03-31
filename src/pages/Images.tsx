
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { images, Image as ImageType } from '@/data/mockData';
import { Plus, Search, Trash2, Download, Grid, LayoutList, Filter, Eye, ArrowUp, ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';

type ViewMode = 'grid' | 'list';
type SortField = 'name' | 'size' | 'date';
type SortOrder = 'asc' | 'desc';

interface ImageCardProps {
  image: ImageType;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onView: (image: ImageType) => void;
}

const ImageCard = ({ image, isSelected, onSelect, onView }: ImageCardProps) => {
  return (
    <div 
      className={cn(
        "border rounded-lg overflow-hidden transition-all",
        isSelected 
          ? "border-violet-500 shadow-md" 
          : "border-gray-200 hover:border-gray-300"
      )}
      onClick={() => onSelect(image.id)}
    >
      <div className="relative aspect-square bg-gray-100">
        <img 
          src={image.thumbnailUrl} 
          alt={image.name} 
          className="w-full h-full object-cover"
        />
        {isSelected && (
          <div className="absolute top-2 right-2 w-5 h-5 bg-violet-500 rounded-full flex items-center justify-center border-2 border-white">
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586l-2.293-2.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>
      
      <div className="p-3">
        <div className="flex items-start justify-between">
          <div className="overflow-hidden">
            <h4 className="text-sm font-medium text-gray-900 truncate">{image.name}</h4>
            <p className="text-xs text-gray-500 mt-1">
              {(image.size / 1024).toFixed(0)} KB • {image.mimeType.split('/')[1]}
            </p>
          </div>
          
          <button 
            className="p-1 text-gray-400 hover:text-violet-600"
            onClick={(e) => {
              e.stopPropagation();
              onView(image);
            }}
          >
            <Eye size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

interface ImageListItemProps {
  image: ImageType;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onView: (image: ImageType) => void;
}

const ImageListItem = ({ image, isSelected, onSelect, onView }: ImageListItemProps) => {
  const date = new Date(image.createdAt).toLocaleDateString();
  
  return (
    <tr 
      className={cn(
        "cursor-pointer hover:bg-gray-50 transition-colors",
        isSelected && "bg-violet-50"
      )}
      onClick={() => onSelect(image.id)}
    >
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="h-10 w-10 flex-shrink-0 mr-3">
            <img 
              src={image.thumbnailUrl} 
              alt={image.name}
              className="h-10 w-10 rounded-md object-cover"
            />
          </div>
          <div>
            <div className="text-sm font-medium text-gray-900">{image.name}</div>
            <div className="text-xs text-gray-500">{image.mimeType}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {(image.size / 1024).toFixed(0)} KB
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {date}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button 
          className="text-violet-600 hover:text-violet-900 mr-2"
          onClick={(e) => {
            e.stopPropagation();
            onView(image);
          }}
        >
          <Eye size={16} />
        </button>
        <button 
          className="text-gray-600 hover:text-gray-900 mr-2"
          onClick={(e) => e.stopPropagation()}
        >
          <Download size={16} />
        </button>
        <button 
          className="text-red-600 hover:text-red-900"
          onClick={(e) => e.stopPropagation()}
        >
          <Trash2 size={16} />
        </button>
      </td>
    </tr>
  );
};

const ImageModal = ({ image, onClose }: { image: ImageType | null, onClose: () => void }) => {
  if (!image) return null;
  
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen p-4 text-center">
        <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" onClick={onClose}></div>
        
        <div className="inline-block w-full max-w-3xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              {image.name}
            </h3>
            <button 
              className="text-gray-400 hover:text-gray-500"
              onClick={onClose}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="p-4">
            <div className="flex flex-col lg:flex-row">
              <div className="w-full lg:w-2/3 bg-gray-100 flex items-center justify-center border rounded-md overflow-hidden">
                <img
                  src={image.url}
                  alt={image.name}
                  className="max-w-full max-h-96 object-contain"
                />
              </div>
              
              <div className="w-full lg:w-1/3 mt-4 lg:mt-0 lg:pl-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">File Information</h4>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Name:</span>
                        <span className="text-sm text-gray-900">{image.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Type:</span>
                        <span className="text-sm text-gray-900">{image.mimeType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Size:</span>
                        <span className="text-sm text-gray-900">{(image.size / 1024).toFixed(2)} KB</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Uploaded:</span>
                        <span className="text-sm text-gray-900">
                          {new Date(image.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Dimensions:</span>
                        <span className="text-sm text-gray-900">800 x 600</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">URL</h4>
                    <div className="mt-1 flex">
                      <input
                        type="text"
                        readOnly
                        value={image.url}
                        className="flex-1 border-gray-300 focus:border-violet-500 focus:ring-violet-500 rounded-md shadow-sm text-sm"
                      />
                      <button
                        type="button"
                        className="ml-2 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                  
                  <div className="pt-3 border-t border-gray-200">
                    <div className="flex space-x-2">
                      <button
                        type="button"
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                      >
                        <Download size={16} className="mr-2" />
                        Download
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        <Trash2 size={16} className="mr-2" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Images = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [viewImage, setViewImage] = useState<ImageType | null>(null);
  
  // Filter images based on search
  const filteredImages = images.filter(image => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      image.name.toLowerCase().includes(query) ||
      image.mimeType.toLowerCase().includes(query)
    );
  });
  
  // Sort images
  const sortedImages = [...filteredImages].sort((a, b) => {
    if (sortField === 'name') {
      return sortOrder === 'asc' 
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else if (sortField === 'size') {
      return sortOrder === 'asc' 
        ? a.size - b.size
        : b.size - a.size;
    } else {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === 'asc' 
        ? dateA - dateB
        : dateB - dateA;
    }
  });
  
  const toggleImageSelection = (id: string) => {
    if (selectedImages.includes(id)) {
      setSelectedImages(selectedImages.filter(imgId => imgId !== id));
    } else {
      setSelectedImages([...selectedImages, id]);
    }
  };
  
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };
  
  const handleSortChange = (field: SortField) => {
    if (field === sortField) {
      toggleSortOrder();
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };
  
  const handleViewImage = (image: ImageType) => {
    setViewImage(image);
  };

  return (
    <Layout title="Images">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
          <h3 className="font-medium text-gray-800">Media Library</h3>
          <button
            className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-white bg-violet-600 rounded-md hover:bg-violet-700"
          >
            <Plus size={16} className="mr-1" />
            <span>Upload</span>
          </button>
        </div>
        
        <div className="p-4 border-b border-gray-200 flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0">
          <div className="relative w-full md:w-72">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search images..."
              className="w-full rounded-md border border-gray-200 bg-gray-50 py-2 pl-8 pr-4 text-sm text-gray-900 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center space-x-3 w-full md:w-auto">
            <div className="border border-gray-200 rounded-md flex items-center">
              <button 
                className={cn(
                  "p-2 text-sm",
                  viewMode === 'grid' 
                    ? "bg-gray-100 text-gray-900" 
                    : "text-gray-500 hover:text-gray-900"
                )}
                onClick={() => setViewMode('grid')}
              >
                <Grid size={18} />
              </button>
              <button 
                className={cn(
                  "p-2 text-sm",
                  viewMode === 'list' 
                    ? "bg-gray-100 text-gray-900" 
                    : "text-gray-500 hover:text-gray-900"
                )}
                onClick={() => setViewMode('list')}
              >
                <LayoutList size={18} />
              </button>
            </div>
            
            <div className="flex-1 md:flex-none">
              <select
                className="w-full rounded-md border border-gray-200 bg-gray-50 py-2 px-3 text-sm text-gray-900 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
                value={`${sortField}-${sortOrder}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split('-');
                  setSortField(field as SortField);
                  setSortOrder(order as SortOrder);
                }}
              >
                <option value="date-desc">Newest first</option>
                <option value="date-asc">Oldest first</option>
                <option value="name-asc">Name (A-Z)</option>
                <option value="name-desc">Name (Z-A)</option>
                <option value="size-desc">Size (largest first)</option>
                <option value="size-asc">Size (smallest first)</option>
              </select>
            </div>
          </div>
        </div>

        {viewMode === 'grid' ? (
          <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {sortedImages.map(image => (
              <ImageCard
                key={image.id}
                image={image}
                isSelected={selectedImages.includes(image.id)}
                onSelect={toggleImageSelection}
                onView={handleViewImage}
              />
            ))}
            
            {sortedImages.length === 0 && (
              <div className="col-span-full py-8 flex flex-col items-center justify-center text-gray-500">
                <div className="bg-gray-100 rounded-full p-3 mb-3">
                  <Search size={24} className="text-gray-400" />
                </div>
                <p className="text-lg font-medium text-gray-600 mb-1">No images found</p>
                <p className="text-sm text-gray-500">
                  {searchQuery 
                    ? 'Try a different search term' 
                    : 'Upload some images to get started'}
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSortChange('name')}
                  >
                    <div className="flex items-center">
                      <span>File name</span>
                      {sortField === 'name' && (
                        sortOrder === 'asc' ? 
                          <ArrowUp size={14} className="ml-1" /> : 
                          <ArrowDown size={14} className="ml-1" />
                      )}
                    </div>
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSortChange('size')}
                  >
                    <div className="flex items-center">
                      <span>Size</span>
                      {sortField === 'size' && (
                        sortOrder === 'asc' ? 
                          <ArrowUp size={14} className="ml-1" /> : 
                          <ArrowDown size={14} className="ml-1" />
                      )}
                    </div>
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSortChange('date')}
                  >
                    <div className="flex items-center">
                      <span>Date</span>
                      {sortField === 'date' && (
                        sortOrder === 'asc' ? 
                          <ArrowUp size={14} className="ml-1" /> : 
                          <ArrowDown size={14} className="ml-1" />
                      )}
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedImages.map(image => (
                  <ImageListItem
                    key={image.id}
                    image={image}
                    isSelected={selectedImages.includes(image.id)}
                    onSelect={toggleImageSelection}
                    onView={handleViewImage}
                  />
                ))}
                
                {sortedImages.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-10 text-center text-gray-500">
                      <div className="flex flex-col items-center">
                        <div className="bg-gray-100 rounded-full p-3 mb-3">
                          <Search size={24} className="text-gray-400" />
                        </div>
                        <p className="text-lg font-medium text-gray-600 mb-1">No images found</p>
                        <p className="text-sm text-gray-500">
                          {searchQuery 
                            ? 'Try a different search term' 
                            : 'Upload some images to get started'}
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
        
        <div className="bg-gray-50 px-4 py-3 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            <span>Showing </span>
            <span className="font-medium">{sortedImages.length}</span>
            <span> of </span>
            <span className="font-medium">{images.length}</span>
            <span> images</span>
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
      
      {viewImage && <ImageModal image={viewImage} onClose={() => setViewImage(null)} />}
    </Layout>
  );
};

export default Images;
