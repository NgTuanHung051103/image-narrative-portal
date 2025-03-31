
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { pages, contents, componentTypes } from '@/data/mockData';
import {
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pencil, Trash2, Plus, LayoutGrid, MoveDown, MoveUp, Settings as SettingsIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Define interface for component settings to fix type errors
interface ComponentSettings {
  backgroundColor: string;
  textColor: string;
  contentAlignment: string;
  columns?: number;
  showImages?: boolean;
}

// Define interface for component content to fix type errors
interface ComponentContent {
  title?: string;
  mainContentId?: string;
  contentIds?: string[];
  featuredContentIds?: string[];
}

const Pages = () => {
  const [selectedPage, setSelectedPage] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isComponentDialogOpen, setIsComponentDialogOpen] = useState(false);
  const [isComponentSettingsOpen, setIsComponentSettingsOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState('add'); // 'add' or 'edit'
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    status: 'draft',
    components: []
  });
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [componentFormData, setComponentFormData] = useState({
    type: '',
    settings: {
      backgroundColor: '#FFFFFF',
      textColor: '#111827',
      contentAlignment: 'left',
      columns: 3,
      showImages: true
    } as ComponentSettings,
    content: {} as ComponentContent
  });

  // Function to open dialog in add mode
  const handleAddPage = () => {
    setDialogMode('add');
    setFormData({
      title: '',
      slug: '',
      status: 'draft',
      components: []
    });
    setIsDialogOpen(true);
  };

  // Function to open dialog in edit mode
  const handleEditPage = (page) => {
    setDialogMode('edit');
    setSelectedPage(page);
    setFormData({
      title: page.title,
      slug: page.slug,
      status: page.status,
      components: page.components
    });
    setIsDialogOpen(true);
  };

  // Function to handle form input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Function to open add component dialog
  const handleAddComponent = () => {
    setComponentFormData({
      type: componentTypes[0]?.id || '',
      settings: {
        backgroundColor: '#FFFFFF',
        textColor: '#111827',
        contentAlignment: 'left',
        columns: 3,
        showImages: true
      },
      content: {}
    });
    setIsComponentDialogOpen(true);
  };

  // Function to save component
  const handleSaveComponent = () => {
    // Create a new component with the form data
    const newComponent = {
      id: `comp_${Date.now()}`,
      type: componentFormData.type,
      orderIndex: formData.components.length + 1,
      settings: componentFormData.settings,
      content: componentFormData.content
    };

    // Add the new component to the page
    setFormData(prev => ({
      ...prev,
      components: [...prev.components, newComponent]
    }));

    // Close the dialog
    setIsComponentDialogOpen(false);
  };

  // Function to open component settings
  const handleComponentSettings = (component) => {
    setSelectedComponent(component);
    setComponentFormData({
      type: component.type,
      settings: { ...component.settings },
      content: { ...component.content }
    });
    setIsComponentSettingsOpen(true);
  };

  // Function to update component settings
  const handleUpdateComponent = () => {
    // Update the component in the page
    setFormData(prev => ({
      ...prev,
      components: prev.components.map(comp => 
        comp.id === selectedComponent.id 
          ? { 
              ...comp, 
              settings: componentFormData.settings,
              content: componentFormData.content
            }
          : comp
      )
    }));

    // Close the dialog
    setIsComponentSettingsOpen(false);
  };

  // Function to move component up in order
  const handleMoveComponentUp = (index) => {
    if (index === 0) return;
    
    const newComponents = [...formData.components];
    [newComponents[index], newComponents[index - 1]] = [newComponents[index - 1], newComponents[index]];
    
    // Update the orderIndex values
    newComponents.forEach((comp, idx) => {
      comp.orderIndex = idx + 1;
    });
    
    setFormData(prev => ({
      ...prev,
      components: newComponents
    }));
  };

  // Function to move component down in order
  const handleMoveComponentDown = (index) => {
    if (index === formData.components.length - 1) return;
    
    const newComponents = [...formData.components];
    [newComponents[index], newComponents[index + 1]] = [newComponents[index + 1], newComponents[index]];
    
    // Update the orderIndex values
    newComponents.forEach((comp, idx) => {
      comp.orderIndex = idx + 1;
    });
    
    setFormData(prev => ({
      ...prev,
      components: newComponents
    }));
  };

  // Function to remove component
  const handleRemoveComponent = (componentId) => {
    setFormData(prev => ({
      ...prev,
      components: prev.components.filter(comp => comp.id !== componentId)
    }));
  };

  // Function to handle component form changes
  const handleComponentFormChange = (field, value) => {
    setComponentFormData(prev => {
      if (field.startsWith('settings.')) {
        const settingField = field.split('.')[1];
        return {
          ...prev,
          settings: {
            ...prev.settings,
            [settingField]: value
          }
        };
      } else if (field.startsWith('content.')) {
        const contentField = field.split('.')[1];
        return {
          ...prev,
          content: {
            ...prev.content,
            [contentField]: value
          }
        };
      } else {
        return {
          ...prev,
          [field]: value
        };
      }
    });
  };

  // Function to handle component type change
  const handleComponentTypeChange = (type) => {
    const selectedType = componentTypes.find(t => t.id === type);
    let defaultContent = {} as ComponentContent;
    
    // Set default content structure based on component type
    switch (type) {
      case 'hero':
        defaultContent = {
          mainContentId: '',
          featuredContentIds: []
        };
        break;
      case 'featured':
      case 'list':
      case 'grid':
      case 'carousel':
        defaultContent = {
          title: '',
          contentIds: []
        };
        break;
      default:
        defaultContent = {};
    }
    
    // Set default settings based on component type
    let defaultSettings: ComponentSettings = {
      backgroundColor: '#FFFFFF',
      textColor: '#111827',
      contentAlignment: 'left',
    };
    
    // Add type-specific settings
    if (['featured', 'grid'].includes(type)) {
      defaultSettings.columns = 3;
      defaultSettings.showImages = true;
    }
    
    setComponentFormData(prev => ({
      ...prev,
      type,
      settings: defaultSettings,
      content: defaultContent
    }));
  };

  // Function to handle content selection
  const handleContentSelect = (field, value) => {
    setComponentFormData(prev => {
      const contentField = field.split('.')[1];
      
      // Handle arrays of content IDs
      if (contentField.endsWith('Ids')) {
        let updatedIds;
        if (Array.isArray(prev.content[contentField])) {
          // If the value is already in the array, remove it
          if (prev.content[contentField].includes(value)) {
            updatedIds = prev.content[contentField].filter(id => id !== value);
          } else {
            // Otherwise add it
            updatedIds = [...prev.content[contentField], value];
          }
        } else {
          updatedIds = [value];
        }
        
        return {
          ...prev,
          content: {
            ...prev.content,
            [contentField]: updatedIds
          }
        };
      } else {
        // Handle single content ID
        return {
          ...prev,
          content: {
            ...prev.content,
            [contentField]: value
          }
        };
      }
    });
  };

  // Function to save page
  const handleSavePage = () => {
    // Here you would normally make an API call
    console.log('Saving page:', formData);
    // Close the dialog
    setIsDialogOpen(false);
  };

  // Function to confirm deletion
  const handleDeleteConfirm = () => {
    // Here you would normally make an API call
    console.log('Deleting page:', selectedPage);
    // Close the dialogs
    setIsDeleteDialogOpen(false);
  };

  // Function to get component type name
  const getComponentTypeName = (typeId) => {
    const type = componentTypes.find(t => t.id === typeId);
    return type ? type.name : 'Unknown Component';
  };

  // Function to get content title
  const getContentTitle = (contentId) => {
    const content = contents.find(c => c.id === contentId);
    if (!content) return 'Unknown Content';
    
    const englishLang = content.languages.find(l => l.languageId === 'en');
    return englishLang ? englishLang.title : content.languages[0]?.title || 'Untitled';
  };

  // Sort components by orderIndex
  const sortedComponents = formData.components.slice().sort((a, b) => a.orderIndex - b.orderIndex);

  return (
    <Layout title="Pages">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Pages</h1>
        <Button onClick={handleAddPage}>
          <Plus className="h-4 w-4 mr-1" />
          <span>Add Page</span>
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Components</TableHead>
              <TableHead>Updated</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pages.map(page => (
              <TableRow key={page.id}>
                <TableCell className="font-medium">
                  {page.title}
                </TableCell>
                <TableCell>{page.slug}</TableCell>
                <TableCell>
                  <Badge variant={page.status === 'published' ? 'default' : 'outline'}>
                    {page.status}
                  </Badge>
                </TableCell>
                <TableCell>{page.components.length}</TableCell>
                <TableCell>{new Date(page.updatedAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEditPage(page)}
                    >
                      <Pencil className="h-4 w-4 mr-1" />
                      <span>Edit</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setSelectedPage(page);
                        setIsDeleteDialogOpen(true);
                      }}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      <span>Delete</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Add/Edit Page Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>
              {dialogMode === 'add' ? 'Add New Page' : 'Edit Page'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Page Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Enter page title"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => handleInputChange('slug', e.target.value)}
                  placeholder="Enter page slug (URL path)"
                />
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select 
                value={formData.status} 
                onValueChange={(value) => handleInputChange('status', value)}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Separator />
            
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Page Components</h3>
                <Button onClick={handleAddComponent}>
                  <Plus className="h-4 w-4 mr-1" />
                  <span>Add Component</span>
                </Button>
              </div>
              
              {sortedComponents.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                  <LayoutGrid className="h-10 w-10 mx-auto mb-2 text-gray-400" />
                  <p className="text-gray-500">No components added yet. Click the button above to add a component.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {sortedComponents.map((component, index) => (
                    <Card key={component.id}>
                      <CardHeader>
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-base">
                            {getComponentTypeName(component.type)}
                          </CardTitle>
                          <div className="flex space-x-1">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleMoveComponentUp(index)}
                              disabled={index === 0}
                            >
                              <MoveUp className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleMoveComponentDown(index)}
                              disabled={index === sortedComponents.length - 1}
                            >
                              <MoveDown className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleComponentSettings(component)}
                            >
                              <SettingsIcon className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleRemoveComponent(component.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <CardDescription>
                          Order: {component.orderIndex} | Alignment: {component.settings.contentAlignment}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Background:</span> {component.settings.backgroundColor}
                          </div>
                          <div>
                            <span className="font-medium">Text Color:</span> {component.settings.textColor}
                          </div>
                          {component.content.title && (
                            <div className="col-span-2">
                              <span className="font-medium">Title:</span> {component.content.title}
                            </div>
                          )}
                          {component.content.mainContentId && (
                            <div className="col-span-2">
                              <span className="font-medium">Main Content:</span> {getContentTitle(component.content.mainContentId)}
                            </div>
                          )}
                          {component.content.contentIds && component.content.contentIds.length > 0 && (
                            <div className="col-span-2">
                              <span className="font-medium">Content Items:</span> {component.content.contentIds.length}
                            </div>
                          )}
                          {component.content.featuredContentIds && component.content.featuredContentIds.length > 0 && (
                            <div className="col-span-2">
                              <span className="font-medium">Featured Items:</span> {component.content.featuredContentIds.length}
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSavePage}>Save Page</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this page? This action cannot be undone.</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Component Dialog */}
      <Dialog open={isComponentDialogOpen} onOpenChange={setIsComponentDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Add Component</DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="componentType">Component Type</Label>
              <Select 
                value={componentFormData.type} 
                onValueChange={handleComponentTypeChange}
              >
                <SelectTrigger id="componentType">
                  <SelectValue placeholder="Select component type" />
                </SelectTrigger>
                <SelectContent>
                  {componentTypes.map(type => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.name} - {type.description}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {componentFormData.type && (
              <>
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Component Settings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="bgColor">Background Color</Label>
                      <div className="flex">
                        <Input
                          id="bgColor"
                          type="color"
                          value={componentFormData.settings.backgroundColor}
                          onChange={(e) => handleComponentFormChange('settings.backgroundColor', e.target.value)}
                          className="w-12 p-1 mr-2"
                        />
                        <Input
                          value={componentFormData.settings.backgroundColor}
                          onChange={(e) => handleComponentFormChange('settings.backgroundColor', e.target.value)}
                          className="flex-1"
                        />
                      </div>
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="textColor">Text Color</Label>
                      <div className="flex">
                        <Input
                          id="textColor"
                          type="color"
                          value={componentFormData.settings.textColor}
                          onChange={(e) => handleComponentFormChange('settings.textColor', e.target.value)}
                          className="w-12 p-1 mr-2"
                        />
                        <Input
                          value={componentFormData.settings.textColor}
                          onChange={(e) => handleComponentFormChange('settings.textColor', e.target.value)}
                          className="flex-1"
                        />
                      </div>
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="alignment">Content Alignment</Label>
                      <Select 
                        value={componentFormData.settings.contentAlignment} 
                        onValueChange={(value) => handleComponentFormChange('settings.contentAlignment', value)}
                      >
                        <SelectTrigger id="alignment">
                          <SelectValue placeholder="Select alignment" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="left">Left</SelectItem>
                          <SelectItem value="center">Center</SelectItem>
                          <SelectItem value="right">Right</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {(componentFormData.type === 'featured' || componentFormData.type === 'grid') && (
                      <>
                        <div className="grid gap-2">
                          <Label htmlFor="columns">Columns</Label>
                          <Select 
                            value={componentFormData.settings.columns?.toString() || '3'} 
                            onValueChange={(value) => handleComponentFormChange('settings.columns', parseInt(value))}
                          >
                            <SelectTrigger id="columns">
                              <SelectValue placeholder="Select columns" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1 Column</SelectItem>
                              <SelectItem value="2">2 Columns</SelectItem>
                              <SelectItem value="3">3 Columns</SelectItem>
                              <SelectItem value="4">4 Columns</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Content Selection</h3>
                  
                  {(componentFormData.type === 'featured' || componentFormData.type === 'list' || 
                    componentFormData.type === 'grid' || componentFormData.type === 'carousel') && (
                    <div className="grid gap-4 mb-4">
                      <div className="grid gap-2">
                        <Label htmlFor="sectionTitle">Section Title</Label>
                        <Input
                          id="sectionTitle"
                          value={componentFormData.content.title || ''}
                          onChange={(e) => handleComponentFormChange('content.title', e.target.value)}
                          placeholder="Enter section title"
                        />
                      </div>
                    </div>
                  )}
                  
                  {componentFormData.type === 'hero' && (
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="mainContent">Main Content</Label>
                        <Select 
                          value={componentFormData.content.mainContentId || ''} 
                          onValueChange={(value) => handleComponentFormChange('content.mainContentId', value)}
                        >
                          <SelectTrigger id="mainContent">
                            <SelectValue placeholder="Select main content" />
                          </SelectTrigger>
                          <SelectContent>
                            {contents.map(content => {
                              const englishLang = content.languages.find(l => l.languageId === 'en');
                              const displayTitle = englishLang ? englishLang.title : content.languages[0]?.title || 'Untitled';
                              
                              return (
                                <SelectItem key={content.id} value={content.id}>
                                  {displayTitle}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="grid gap-2">
                        <Label>Featured Content</Label>
                        <div className="border rounded-md p-4 max-h-60 overflow-y-auto">
                          {contents.map(content => {
                            const englishLang = content.languages.find(l => l.languageId === 'en');
                            const displayTitle = englishLang ? englishLang.title : content.languages[0]?.title || 'Untitled';
                            const isSelected = componentFormData.content.featuredContentIds?.includes(content.id);
                            
                            return (
                              <div 
                                key={content.id}
                                className={`p-2 mb-1 rounded-md flex items-center cursor-pointer ${isSelected ? 'bg-violet-100 border border-violet-300' : 'hover:bg-gray-100'}`}
                                onClick={() => handleContentSelect('content.featuredContentIds', content.id)}
                              >
                                <input 
                                  type="checkbox" 
                                  checked={isSelected}
                                  onChange={() => {}}
                                  className="mr-2"
                                />
                                <span>{displayTitle}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {(componentFormData.type === 'featured' || componentFormData.type === 'list' || 
                    componentFormData.type === 'grid' || componentFormData.type === 'carousel') && (
                    <div className="grid gap-2">
                      <Label>Content Items</Label>
                      <div className="border rounded-md p-4 max-h-60 overflow-y-auto">
                        {contents.map(content => {
                          const englishLang = content.languages.find(l => l.languageId === 'en');
                          const displayTitle = englishLang ? englishLang.title : content.languages[0]?.title || 'Untitled';
                          const isSelected = componentFormData.content.contentIds?.includes(content.id);
                          
                          return (
                            <div 
                              key={content.id}
                              className={`p-2 mb-1 rounded-md flex items-center cursor-pointer ${isSelected ? 'bg-violet-100 border border-violet-300' : 'hover:bg-gray-100'}`}
                              onClick={() => handleContentSelect('content.contentIds', content.id)}
                            >
                              <input 
                                type="checkbox" 
                                checked={isSelected}
                                onChange={() => {}}
                                className="mr-2"
                              />
                              <span>{displayTitle}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsComponentDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveComponent} disabled={!componentFormData.type}>Add Component</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Component Settings Dialog */}
      <Dialog open={isComponentSettingsOpen} onOpenChange={setIsComponentSettingsOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Component Settings</DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-6">
            <div className="grid gap-2">
              <Label>Component Type</Label>
              <div className="p-2 bg-gray-50 rounded-md">{getComponentTypeName(componentFormData.type)}</div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="text-lg font-medium mb-4">Component Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="bgColor">Background Color</Label>
                  <div className="flex">
                    <Input
                      id="bgColor"
                      type="color"
                      value={componentFormData.settings.backgroundColor}
                      onChange={(e) => handleComponentFormChange('settings.backgroundColor', e.target.value)}
                      className="w-12 p-1 mr-2"
                    />
                    <Input
                      value={componentFormData.settings.backgroundColor}
                      onChange={(e) => handleComponentFormChange('settings.backgroundColor', e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="textColor">Text Color</Label>
                  <div className="flex">
                    <Input
                      id="textColor"
                      type="color"
                      value={componentFormData.settings.textColor}
                      onChange={(e) => handleComponentFormChange('settings.textColor', e.target.value)}
                      className="w-12 p-1 mr-2"
                    />
                    <Input
                      value={componentFormData.settings.textColor}
                      onChange={(e) => handleComponentFormChange('settings.textColor', e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="alignment">Content Alignment</Label>
                  <Select 
                    value={componentFormData.settings.contentAlignment} 
                    onValueChange={(value) => handleComponentFormChange('settings.contentAlignment', value)}
                  >
                    <SelectTrigger id="alignment">
                      <SelectValue placeholder="Select alignment" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="left">Left</SelectItem>
                      <SelectItem value="center">Center</SelectItem>
                      <SelectItem value="right">Right</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {(componentFormData.type === 'featured' || componentFormData.type === 'grid') && (
                  <>
                    <div className="grid gap-2">
                      <Label htmlFor="columns">Columns</Label>
                      <Select 
                        value={componentFormData.settings.columns?.toString() || '3'} 
                        onValueChange={(value) => handleComponentFormChange('settings.columns', parseInt(value))}
                      >
                        <SelectTrigger id="columns">
                          <SelectValue placeholder="Select columns" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Column</SelectItem>
                          <SelectItem value="2">2 Columns</SelectItem>
                          <SelectItem value="3">3 Columns</SelectItem>
                          <SelectItem value="4">4 Columns</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="text-lg font-medium mb-4">Content Selection</h3>
              
              {(componentFormData.type === 'featured' || componentFormData.type === 'list' || 
                componentFormData.type === 'grid' || componentFormData.type === 'carousel') && (
                <div className="grid gap-4 mb-4">
                  <div className="grid gap-2">
                    <Label htmlFor="sectionTitle">Section Title</Label>
                    <Input
                      id="sectionTitle"
                      value={componentFormData.content.title || ''}
                      onChange={(e) => handleComponentFormChange('content.title', e.target.value)}
                      placeholder="Enter section title"
                    />
                  </div>
                </div>
              )}
              
              {componentFormData.type === 'hero' && (
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="mainContent">Main Content</Label>
                    <Select 
                      value={componentFormData.content.mainContentId || ''} 
                      onValueChange={(value) => handleComponentFormChange('content.mainContentId', value)}
                    >
                      <SelectTrigger id="mainContent">
                        <SelectValue placeholder="Select main content" />
                      </SelectTrigger>
                      <SelectContent>
                        {contents.map(content => {
                          const englishLang = content.languages.find(l => l.languageId === 'en');
                          const displayTitle = englishLang ? englishLang.title : content.languages[0]?.title || 'Untitled';
                          
                          return (
                            <SelectItem key={content.id} value={content.id}>
                              {displayTitle}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label>Featured Content</Label>
                    <div className="border rounded-md p-4 max-h-60 overflow-y-auto">
                      {contents.map(content => {
                        const englishLang = content.languages.find(l => l.languageId === 'en');
                        const displayTitle = englishLang ? englishLang.title : content.languages[0]?.title || 'Untitled';
                        const isSelected = componentFormData.content.featuredContentIds?.includes(content.id);
                        
                        return (
                          <div 
                            key={content.id}
                            className={`p-2 mb-1 rounded-md flex items-center cursor-pointer ${isSelected ? 'bg-violet-100 border border-violet-300' : 'hover:bg-gray-100'}`}
                            onClick={() => handleContentSelect('content.featuredContentIds', content.id)}
                          >
                            <input 
                              type="checkbox" 
                              checked={isSelected}
                              onChange={() => {}}
                              className="mr-2"
                            />
                            <span>{displayTitle}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
              
              {(componentFormData.type === 'featured' || componentFormData.type === 'list' || 
                componentFormData.type === 'grid' || componentFormData.type === 'carousel') && (
                <div className="grid gap-2">
                  <Label>Content Items</Label>
                  <div className="border rounded-md p-4 max-h-60 overflow-y-auto">
                    {contents.map(content => {
                      const englishLang = content.languages.find(l => l.languageId === 'en');
                      const displayTitle = englishLang ? englishLang.title : content.languages[0]?.title || 'Untitled';
                      const isSelected = componentFormData.content.contentIds?.includes(content.id);
                      
                      return (
                        <div 
                          key={content.id}
                          className={`p-2 mb-1 rounded-md flex items-center cursor-pointer ${isSelected ? 'bg-violet-100 border border-violet-300' : 'hover:bg-gray-100'}`}
                          onClick={() => handleContentSelect('content.contentIds', content.id)}
                        >
                          <input 
                            type="checkbox" 
                            checked={isSelected}
                            onChange={() => {}}
                            className="mr-2"
                          />
                          <span>{displayTitle}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsComponentSettingsOpen(false)}>Cancel</Button>
            <Button onClick={handleUpdateComponent}>Update Component</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Pages;
