
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { categories, contents, languages, images } from '@/data/mockData';
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
import { Plus, Pencil, Trash2, Image, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';

const Contents = () => {
  const [selectedContent, setSelectedContent] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isImagePickerOpen, setIsImagePickerOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState('add'); // 'add' or 'edit'
  const [formData, setFormData] = useState({
    categoryId: '',
    status: 'draft',
    isActive: true,
    languages: languages.map(lang => ({
      languageId: lang.id,
      title: '',
      description: ''
    })),
    imageIds: [],
  });

  // Function to open dialog in add mode
  const handleAddContent = () => {
    setDialogMode('add');
    setFormData({
      categoryId: categories[0]?.id || '',
      status: 'draft',
      isActive: true,
      languages: languages.map(lang => ({
        languageId: lang.id,
        title: '',
        description: ''
      })),
      imageIds: [],
    });
    setIsDialogOpen(true);
  };

  // Function to open dialog in edit mode
  const handleEditContent = (content) => {
    setDialogMode('edit');
    setSelectedContent(content);
    setFormData({
      categoryId: content.categoryId,
      status: content.status,
      isActive: content.isActive,
      languages: languages.map(lang => {
        const existingLang = content.languages.find(l => l.languageId === lang.id);
        return {
          languageId: lang.id,
          title: existingLang?.title || '',
          description: existingLang?.description || ''
        };
      }),
      imageIds: content.imageIds || [content.imageId],
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

  // Function to handle field changes
  const handleFieldChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Function to get the category name
  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    if (!category) return 'Unknown Category';
    
    const englishLang = category.languages.find(l => l.languageId === 'en');
    return englishLang ? englishLang.name : category.languages[0]?.name || 'Unnamed Category';
  };

  // Function to get the image for a content
  const getContentImage = (imageId) => {
    return images.find(img => img.id === imageId);
  };

  // Function to handle image selection
  const handleImageSelect = (imageId) => {
    setFormData(prev => {
      // Check if the image is already selected
      if (prev.imageIds.includes(imageId)) {
        // Remove the image if it's already selected
        return {
          ...prev,
          imageIds: prev.imageIds.filter(id => id !== imageId)
        };
      } else {
        // Add the image to the selection
        return {
          ...prev,
          imageIds: [...prev.imageIds, imageId]
        };
      }
    });
  };

  // Function to close the image picker
  const handleCloseImagePicker = () => {
    setIsImagePickerOpen(false);
  };

  // Function to save content (add/edit)
  const handleSaveContent = () => {
    // Here you would normally make an API call
    console.log('Saving content:', formData);
    // Close the dialog after saving
    setIsDialogOpen(false);
  };

  // Function to confirm deletion
  const handleDeleteConfirm = () => {
    // Here you would normally make an API call
    console.log('Deleting content:', selectedContent);
    // Close the dialogs after deleting
    setIsDeleteDialogOpen(false);
  };

  return (
    <Layout title="Contents">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Contents</h1>
        <Button onClick={handleAddContent}>
          <Plus className="h-4 w-4 mr-1" />
          <span>Add Content</span>
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Active</TableHead>
              <TableHead>Updated</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contents.map(content => {
              // Find the English title or fallback to the first available language
              const englishLang = content.languages.find(l => l.languageId === 'en');
              const displayTitle = englishLang ? englishLang.title : content.languages[0]?.title || 'Untitled';
              
              return (
                <TableRow key={content.id}>
                  <TableCell className="font-medium">
                    {displayTitle}
                  </TableCell>
                  <TableCell>{getCategoryName(content.categoryId)}</TableCell>
                  <TableCell>
                    <Badge variant={content.status === 'published' ? 'default' : 'outline'}>
                      {content.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={content.isActive ? 'success' : 'secondary'}>
                      {content.isActive ? 'Yes' : 'No'}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(content.updatedAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEditContent(content)}
                      >
                        <Pencil className="h-4 w-4 mr-1" />
                        <span>Edit</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setSelectedContent(content);
                          setIsDeleteDialogOpen(true);
                        }}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        <span>Delete</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Add/Edit Content Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {dialogMode === 'add' ? 'Add New Content' : 'Edit Content'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <Select 
                value={formData.categoryId} 
                onValueChange={(value) => handleFieldChange('categoryId', value)}
              >
                <SelectTrigger id="category" className="col-span-3">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => {
                    const englishLang = category.languages.find(l => l.languageId === 'en');
                    const displayName = englishLang ? englishLang.name : category.languages[0]?.name || 'Unnamed Category';
                    
                    return (
                      <SelectItem key={category.id} value={category.id}>
                        {displayName}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <Select 
                value={formData.status} 
                onValueChange={(value) => handleFieldChange('status', value)}
              >
                <SelectTrigger id="status" className="col-span-3">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="active" className="text-right">
                Active
              </Label>
              <div className="col-span-3 flex items-center space-x-2">
                <Switch 
                  id="active"
                  checked={formData.isActive} 
                  onCheckedChange={(value) => handleFieldChange('isActive', value)} 
                />
                <span>{formData.isActive ? 'Yes' : 'No'}</span>
              </div>
            </div>

            <div className="grid grid-cols-4 items-start gap-4">
              <Label className="text-right pt-2">
                Images
              </Label>
              <div className="col-span-3">
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.imageIds.map(imageId => {
                    const image = getContentImage(imageId);
                    return image ? (
                      <div key={imageId} className="relative group">
                        <img 
                          src={image.thumbnailUrl} 
                          alt={image.filename} 
                          className="h-16 w-16 rounded object-cover"
                        />
                        <button 
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => {
                            setFormData(prev => ({
                              ...prev,
                              imageIds: prev.imageIds.filter(id => id !== imageId)
                            }));
                          }}
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    ) : null;
                  })}
                </div>
                <Button variant="outline" size="sm" onClick={() => setIsImagePickerOpen(true)}>
                  <Image className="h-4 w-4 mr-1" />
                  <span>Select Images</span>
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
                      <Label htmlFor={`title-${lang.id}`} className="text-right">
                        Title
                      </Label>
                      <Input
                        id={`title-${lang.id}`}
                        value={formData.languages.find(l => l.languageId === lang.id)?.title || ''}
                        onChange={(e) => handleInputChange(lang.id, 'title', e.target.value)}
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
            <Button onClick={handleSaveContent}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this content? This action cannot be undone.</p>
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
            <DialogTitle>Select Images</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map(image => (
              <div 
                key={image.id} 
                className={`cursor-pointer border rounded-lg p-2 ${formData.imageIds.includes(image.id) ? 'ring-2 ring-violet-500' : ''}`}
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
            <Button variant="outline" onClick={handleCloseImagePicker}>Done</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Contents;
