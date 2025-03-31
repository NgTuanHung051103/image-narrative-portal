
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { categories, languages, images } from '@/data/mockData';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FolderTree, Plus, Pencil, Trash2, Image } from 'lucide-react';

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isImagePickerOpen, setIsImagePickerOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState('add'); // 'add' or 'edit'
  const [selectedParent, setSelectedParent] = useState(null);
  const [formData, setFormData] = useState({
    status: 'active',
    languages: languages.map(lang => ({
      languageId: lang.id,
      name: '',
      description: ''
    })),
    imageId: '',
  });

  // Function to open dialog in add mode
  const handleAddCategory = (parentId = null) => {
    setDialogMode('add');
    setSelectedParent(parentId);
    setFormData({
      status: 'active',
      languages: languages.map(lang => ({
        languageId: lang.id,
        name: '',
        description: ''
      })),
      imageId: '',
    });
    setIsDialogOpen(true);
  };

  // Function to open dialog in edit mode
  const handleEditCategory = (category) => {
    setDialogMode('edit');
    setSelectedCategory(category);
    setFormData({
      status: category.status,
      languages: languages.map(lang => {
        const existingLang = category.languages.find(l => l.languageId === lang.id);
        return {
          languageId: lang.id,
          name: existingLang?.name || '',
          description: existingLang?.description || ''
        };
      }),
      imageId: category.imageId,
    });
    setIsDialogOpen(true);
  };

  // Function to handle form input changes
  const handleInputChange = (languageId, field, value) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.map(lang => 
        lang.languageId === languageId 
          ? { ...lang, [field]: value } 
          : lang
      )
    }));
  };

  // Function to handle status change
  const handleStatusChange = (value) => {
    setFormData(prev => ({
      ...prev,
      status: value
    }));
  };

  // Function to get the image for a category
  const getCategoryImage = (imageId) => {
    return images.find(img => img.id === imageId);
  };

  // Function to handle image selection
  const handleImageSelect = (imageId) => {
    setFormData(prev => ({
      ...prev,
      imageId
    }));
    setIsImagePickerOpen(false);
  };

  // Function to save category (add/edit)
  const handleSaveCategory = () => {
    // Here you would normally make an API call
    console.log('Saving category:', formData);
    // Close the dialog after saving
    setIsDialogOpen(false);
  };

  // Function to confirm deletion
  const handleDeleteConfirm = () => {
    // Here you would normally make an API call
    console.log('Deleting category:', selectedCategory);
    // Close the dialogs after deleting
    setIsDeleteDialogOpen(false);
  };

  // Build a hierarchical tree from flat categories array
  const buildCategoryTree = (categories, parentId = null) => {
    return categories
      .filter(category => category.parentId === parentId)
      .map(category => ({
        ...category,
        children: buildCategoryTree(categories, category.id)
      }));
  };

  const categoryTree = buildCategoryTree(categories);

  // Render a category row with its children indented
  const renderCategoryRows = (categories, level = 0) => {
    return categories.flatMap(category => {
      // Find the English name or fallback to the first available language
      const englishLang = category.languages.find(l => l.languageId === 'en');
      const displayName = englishLang ? englishLang.name : category.languages[0]?.name || 'Unnamed Category';
      
      // Get the category image
      const categoryImage = getCategoryImage(category.imageId);
      
      return [
        <TableRow key={category.id}>
          <TableCell className="font-medium">
            <div className="flex items-center">
              <span style={{ marginLeft: `${level * 20}px` }} className="flex items-center">
                {category.children && category.children.length > 0 && <FolderTree className="mr-2 h-4 w-4" />}
                {displayName}
              </span>
            </div>
          </TableCell>
          <TableCell>
            {categoryImage && (
              <div className="flex items-center space-x-2">
                <img 
                  src={categoryImage.thumbnailUrl} 
                  alt={categoryImage.filename} 
                  className="h-8 w-8 rounded object-cover"
                />
                <span className="text-sm text-gray-500">{categoryImage.filename}</span>
              </div>
            )}
          </TableCell>
          <TableCell>{category.status}</TableCell>
          <TableCell>{new Date(category.updatedAt).toLocaleDateString()}</TableCell>
          <TableCell>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleAddCategory(category.id)}
              >
                <Plus className="h-4 w-4 mr-1" />
                <span>Add</span>
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleEditCategory(category)}
              >
                <Pencil className="h-4 w-4 mr-1" />
                <span>Edit</span>
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  setSelectedCategory(category);
                  setIsDeleteDialogOpen(true);
                }}
              >
                <Trash2 className="h-4 w-4 mr-1" />
                <span>Delete</span>
              </Button>
            </div>
          </TableCell>
        </TableRow>,
        ...(category.children ? renderCategoryRows(category.children, level + 1) : [])
      ];
    });
  };

  return (
    <Layout title="Categories">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Categories</h1>
        <Button onClick={() => handleAddCategory()}>
          <Plus className="h-4 w-4 mr-1" />
          <span>Add Category</span>
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Updated</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {renderCategoryRows(categoryTree)}
          </TableBody>
        </Table>
      </div>

      {/* Add/Edit Category Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {dialogMode === 'add' ? 'Add New Category' : 'Edit Category'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <Select 
                value={formData.status} 
                onValueChange={handleStatusChange}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">
                Image
              </Label>
              <div className="col-span-3 flex items-center space-x-2">
                {formData.imageId && (
                  <div className="flex items-center space-x-2">
                    <img 
                      src={getCategoryImage(formData.imageId)?.thumbnailUrl} 
                      alt="Category" 
                      className="h-10 w-10 rounded object-cover"
                    />
                    <span className="text-sm text-gray-500">{getCategoryImage(formData.imageId)?.filename}</span>
                  </div>
                )}
                <Button variant="outline" size="sm" onClick={() => setIsImagePickerOpen(true)}>
                  <Image className="h-4 w-4 mr-1" />
                  <span>{formData.imageId ? 'Change' : 'Select'} Image</span>
                </Button>
              </div>
            </div>

            <Tabs defaultValue={languages[0].id} className="w-full">
              <TabsList className="grid grid-cols-2 md:grid-cols-4">
                {languages.map(lang => (
                  <TabsTrigger key={lang.id} value={lang.id}>{lang.name}</TabsTrigger>
                ))}
              </TabsList>
              
              {languages.map(lang => (
                <TabsContent key={lang.id} value={lang.id}>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor={`name-${lang.id}`} className="text-right">
                        Name
                      </Label>
                      <Input
                        id={`name-${lang.id}`}
                        value={formData.languages.find(l => l.languageId === lang.id)?.name || ''}
                        onChange={(e) => handleInputChange(lang.id, 'name', e.target.value)}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-start gap-4">
                      <Label htmlFor={`description-${lang.id}`} className="text-right pt-2">
                        Description
                      </Label>
                      <Textarea
                        id={`description-${lang.id}`}
                        value={formData.languages.find(l => l.languageId === lang.id)?.description || ''}
                        onChange={(e) => handleInputChange(lang.id, 'description', e.target.value)}
                        className="col-span-3"
                        rows={4}
                      />
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveCategory}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this category? This action cannot be undone.</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Image Picker Dialog */}
      <Dialog open={isImagePickerOpen} onOpenChange={setIsImagePickerOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Select Image</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map(image => (
              <div 
                key={image.id} 
                className={`cursor-pointer border rounded-lg p-2 ${formData.imageId === image.id ? 'ring-2 ring-violet-500' : ''}`}
                onClick={() => handleImageSelect(image.id)}
              >
                <img 
                  src={image.thumbnailUrl} 
                  alt={image.filename} 
                  className="w-full h-32 object-cover rounded mb-2"
                />
                <p className="text-sm truncate">{image.filename}</p>
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsImagePickerOpen(false)}>Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Categories;
