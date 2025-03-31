
import React, { useState } from 'react';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetDescription,
  SheetFooter
} from '@/components/ui/sheet';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardFooter 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  DragDropContext, 
  Droppable, 
  Draggable 
} from '@hello-pangea/dnd';
import { 
  Plus, 
  Pencil, 
  Trash2, 
  Settings as SettingsIcon, 
  MoveUp, 
  MoveDown, 
  X,
  GripVertical
} from 'lucide-react';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { contents, categories } from '@/data/mockData';

// Component type definitions
const componentTypes = [
  {
    id: 'text-block',
    name: 'Text Block',
    icon: 'T',
    description: 'Add a block of text content'
  },
  {
    id: 'image',
    name: 'Image',
    icon: 'I',
    description: 'Add a single image'
  },
  {
    id: 'video',
    name: 'Video',
    icon: 'V',
    description: 'Add a video'
  },
  {
    id: 'gallery',
    name: 'Gallery',
    icon: 'G',
    description: 'Add multiple images in a gallery'
  },
  {
    id: 'hero',
    name: 'Hero Banner',
    icon: 'H',
    description: 'Add a hero section with main content'
  },
  {
    id: 'featured',
    name: 'Featured Content',
    icon: 'F',
    description: 'Add a section with featured content items'
  },
  {
    id: 'grid',
    name: 'Content Grid',
    icon: 'CG',
    description: 'Add a grid of content items'
  }
];

interface PageBuilderProps {
  open: boolean;
  onClose: () => void;
  initialData?: any;
  onSave: (data: any) => void;
}

const PageBuilder: React.FC<PageBuilderProps> = ({ 
  open, 
  onClose, 
  initialData = {
    title: 'New Page',
    slug: 'new-page',
    components: []
  }, 
  onSave 
}) => {
  const [pageData, setPageData] = useState(initialData);
  const [contentPickerOpen, setContentPickerOpen] = useState(false);
  const [currentComponent, setCurrentComponent] = useState(null);
  const [currentSlot, setCurrentSlot] = useState(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [selectedComponentIndex, setSelectedComponentIndex] = useState(null);

  // Add a component to the page
  const handleAddComponent = (componentType) => {
    const newComponent = {
      id: `comp_${Date.now()}`,
      type: componentType.id,
      orderIndex: pageData.components.length,
      settings: {
        backgroundColor: '#FFFFFF',
        textColor: '#111827',
        contentAlignment: 'left',
      },
      content: {}
    };
    
    // Initialize content structure based on component type
    if (componentType.id === 'hero') {
      newComponent.content = {
        mainContentId: '',
        featuredContentIds: []
      };
    } else if (['featured', 'grid'].includes(componentType.id)) {
      newComponent.content = {
        title: '',
        contentIds: []
      };
      newComponent.settings.columns = 3;
      newComponent.settings.showImages = true;
    }
    
    setPageData({
      ...pageData,
      components: [...pageData.components, newComponent]
    });
  };

  // Remove a component from the page
  const handleRemoveComponent = (index) => {
    const updatedComponents = [...pageData.components];
    updatedComponents.splice(index, 1);
    
    // Update orderIndex values
    updatedComponents.forEach((comp, idx) => {
      comp.orderIndex = idx;
    });
    
    setPageData({
      ...pageData,
      components: updatedComponents
    });
  };

  // Handle drag and drop reordering
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    
    const items = Array.from(pageData.components);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    // Update orderIndex values
    items.forEach((item, index) => {
      item.orderIndex = index;
    });
    
    setPageData({
      ...pageData,
      components: items
    });
  };

  // Open content picker for a specific slot
  const handleOpenContentPicker = (componentIndex, slot) => {
    setCurrentComponent(pageData.components[componentIndex]);
    setCurrentSlot(slot);
    setContentPickerOpen(true);
  };

  // Select content from the picker
  const handleSelectContent = (contentId) => {
    if (!currentComponent || !currentSlot) return;
    
    const updatedComponents = [...pageData.components];
    const componentIndex = updatedComponents.findIndex(c => c.id === currentComponent.id);
    
    if (componentIndex === -1) return;
    
    if (currentSlot === 'main') {
      updatedComponents[componentIndex].content.mainContentId = contentId;
    } else if (currentSlot === 'featured') {
      const featuredIds = updatedComponents[componentIndex].content.featuredContentIds || [];
      
      if (featuredIds.includes(contentId)) {
        // Remove if already selected
        updatedComponents[componentIndex].content.featuredContentIds = featuredIds.filter(id => id !== contentId);
      } else {
        // Add if not already selected
        updatedComponents[componentIndex].content.featuredContentIds = [...featuredIds, contentId];
      }
    } else if (currentSlot === 'items') {
      const contentIds = updatedComponents[componentIndex].content.contentIds || [];
      
      if (contentIds.includes(contentId)) {
        // Remove if already selected
        updatedComponents[componentIndex].content.contentIds = contentIds.filter(id => id !== contentId);
      } else {
        // Add if not already selected
        updatedComponents[componentIndex].content.contentIds = [...contentIds, contentId];
      }
    }
    
    setPageData({
      ...pageData,
      components: updatedComponents
    });
  };

  // Open settings for a component
  const handleOpenSettings = (index) => {
    setSelectedComponentIndex(index);
    setSettingsOpen(true);
  };

  // Update component settings
  const handleUpdateSettings = (settings) => {
    if (selectedComponentIndex === null) return;
    
    const updatedComponents = [...pageData.components];
    updatedComponents[selectedComponentIndex].settings = {
      ...updatedComponents[selectedComponentIndex].settings,
      ...settings
    };
    
    setPageData({
      ...pageData,
      components: updatedComponents
    });
    
    setSettingsOpen(false);
  };

  // Get content title by ID
  const getContentTitle = (contentId) => {
    const content = contents.find(c => c.id === contentId);
    if (!content) return 'Unknown Content';
    
    const englishLang = content.languages.find(l => l.languageId === 'en');
    return englishLang ? englishLang.title : content.languages[0]?.title || 'Untitled';
  };

  return (
    <Sheet open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <SheetContent className="w-full sm:max-w-[90vw] overflow-y-auto" side="right">
        <SheetHeader className="pb-4">
          <SheetTitle>Page Builder</SheetTitle>
          <SheetDescription>
            Drag and drop components to build your page layout
          </SheetDescription>
        </SheetHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-4 mt-2">
          {/* Component selection panel */}
          <div className="border rounded-md p-4">
            <h3 className="text-lg font-semibold mb-4">Add Component</h3>
            <div className="space-y-2">
              {componentTypes.map((component) => (
                <Button 
                  key={component.id}
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => handleAddComponent(component)}
                >
                  <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-md border">
                    {component.icon}
                  </div>
                  <span>{component.name}</span>
                </Button>
              ))}
            </div>
          </div>
          
          {/* Page structure panel */}
          <div className="border rounded-md p-4">
            <h3 className="text-lg font-semibold mb-4">Page Structure</h3>
            
            <div className="mb-6 grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="pageTitle">Page Title</Label>
                <Input 
                  id="pageTitle" 
                  value={pageData.title}
                  onChange={(e) => setPageData({...pageData, title: e.target.value})}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="pageSlug">Page Slug</Label>
                <Input 
                  id="pageSlug" 
                  value={pageData.slug}
                  onChange={(e) => setPageData({...pageData, slug: e.target.value})}
                  className="mt-1"
                />
              </div>
            </div>
            
            {pageData.components.length === 0 ? (
              <div className="text-center py-12 border border-dashed rounded-md">
                <p className="text-gray-500">Add components from the left panel to build your page</p>
              </div>
            ) : (
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="components">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="space-y-4"
                    >
                      {pageData.components.map((component, index) => (
                        <Draggable key={component.id} draggableId={component.id} index={index}>
                          {(provided) => (
                            <Card
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className="border"
                            >
                              <CardHeader className="pb-2">
                                <div className="flex justify-between items-center">
                                  <div className="flex items-center">
                                    <div {...provided.dragHandleProps} className="mr-2 cursor-move">
                                      <GripVertical size={16} />
                                    </div>
                                    <CardTitle className="text-base">
                                      {componentTypes.find(c => c.id === component.type)?.name || 'Component'}
                                    </CardTitle>
                                  </div>
                                  <div className="flex space-x-1">
                                    <Button 
                                      variant="ghost" 
                                      size="sm"
                                      onClick={() => handleOpenSettings(index)}
                                    >
                                      <SettingsIcon className="h-4 w-4" />
                                    </Button>
                                    <Button 
                                      variant="ghost" 
                                      size="sm"
                                      onClick={() => handleRemoveComponent(index)}
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              </CardHeader>
                              
                              <CardContent>
                                {component.type === 'hero' && (
                                  <div className="space-y-4">
                                    <div className="border rounded-md p-3">
                                      <div className="flex justify-between items-center">
                                        <span className="font-medium">Main Content</span>
                                        <Button 
                                          variant="outline" 
                                          size="sm"
                                          onClick={() => handleOpenContentPicker(index, 'main')}
                                        >
                                          <Pencil className="h-4 w-4 mr-1" />
                                          Pick Content
                                        </Button>
                                      </div>
                                      {component.content.mainContentId ? (
                                        <div className="mt-2 p-2 bg-gray-50 rounded">
                                          {getContentTitle(component.content.mainContentId)}
                                        </div>
                                      ) : (
                                        <div className="mt-2 text-gray-500 italic">No content selected</div>
                                      )}
                                    </div>
                                    
                                    <div>
                                      <div className="flex justify-between items-center mb-2">
                                        <span className="font-medium">Featured Items</span>
                                        <Button 
                                          variant="outline" 
                                          size="sm"
                                          onClick={() => handleOpenContentPicker(index, 'featured')}
                                        >
                                          <Pencil className="h-4 w-4 mr-1" />
                                          Pick Content
                                        </Button>
                                      </div>
                                      
                                      <div className="grid grid-cols-2 gap-2">
                                        {component.content.featuredContentIds?.map(contentId => (
                                          <div key={contentId} className="p-2 border rounded flex justify-between items-center">
                                            <span className="truncate">{getContentTitle(contentId)}</span>
                                            <Button 
                                              variant="ghost" 
                                              size="sm"
                                              onClick={() => {
                                                const updatedFeatured = component.content.featuredContentIds.filter(id => id !== contentId);
                                                const updatedComponents = [...pageData.components];
                                                updatedComponents[index].content.featuredContentIds = updatedFeatured;
                                                setPageData({...pageData, components: updatedComponents});
                                              }}
                                            >
                                              <X className="h-3 w-3" />
                                            </Button>
                                          </div>
                                        ))}
                                        
                                        {(!component.content.featuredContentIds || component.content.featuredContentIds.length === 0) && (
                                          <div className="col-span-2 text-gray-500 italic text-center py-2">
                                            No featured items selected
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                )}
                                
                                {(component.type === 'featured' || component.type === 'grid') && (
                                  <div className="space-y-4">
                                    <div>
                                      <Label htmlFor={`section-title-${index}`}>Section Title</Label>
                                      <Input 
                                        id={`section-title-${index}`}
                                        value={component.content.title || ''}
                                        onChange={(e) => {
                                          const updatedComponents = [...pageData.components];
                                          updatedComponents[index].content.title = e.target.value;
                                          setPageData({...pageData, components: updatedComponents});
                                        }}
                                        className="mt-1"
                                      />
                                    </div>
                                    
                                    <div>
                                      <div className="flex justify-between items-center mb-2">
                                        <span className="font-medium">Content Items</span>
                                        <Button 
                                          variant="outline" 
                                          size="sm"
                                          onClick={() => handleOpenContentPicker(index, 'items')}
                                        >
                                          <Pencil className="h-4 w-4 mr-1" />
                                          Pick Content
                                        </Button>
                                      </div>
                                      
                                      <div className="grid grid-cols-2 gap-2">
                                        {component.content.contentIds?.map(contentId => (
                                          <div key={contentId} className="p-2 border rounded flex justify-between items-center">
                                            <span className="truncate">{getContentTitle(contentId)}</span>
                                            <Button 
                                              variant="ghost" 
                                              size="sm"
                                              onClick={() => {
                                                const updatedContentIds = component.content.contentIds.filter(id => id !== contentId);
                                                const updatedComponents = [...pageData.components];
                                                updatedComponents[index].content.contentIds = updatedContentIds;
                                                setPageData({...pageData, components: updatedComponents});
                                              }}
                                            >
                                              <X className="h-3 w-3" />
                                            </Button>
                                          </div>
                                        ))}
                                        
                                        {(!component.content.contentIds || component.content.contentIds.length === 0) && (
                                          <div className="col-span-2 text-gray-500 italic text-center py-2">
                                            No content items selected
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                )}
                                
                                {(component.type === 'text-block' || component.type === 'image' || component.type === 'video' || component.type === 'gallery') && (
                                  <div className="text-center py-4">
                                    <Button 
                                      variant="outline"
                                      onClick={() => handleOpenContentPicker(index, 'main')}
                                    >
                                      <Pencil className="h-4 w-4 mr-1" />
                                      Select Content
                                    </Button>
                                    
                                    {component.content.mainContentId && (
                                      <div className="mt-2 p-2 bg-gray-50 rounded">
                                        {getContentTitle(component.content.mainContentId)}
                                      </div>
                                    )}
                                  </div>
                                )}
                              </CardContent>
                            </Card>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            )}
          </div>
        </div>
        
        <SheetFooter className="mt-4">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={() => onSave(pageData)}>Save Page</Button>
        </SheetFooter>
      </SheetContent>
      
      {/* Content Picker Dialog */}
      <Dialog open={contentPickerOpen} onOpenChange={setContentPickerOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>Select Content</DialogTitle>
          </DialogHeader>
          
          <ScrollArea className="mt-4 h-[50vh]">
            <div className="space-y-4">
              {categories.map(category => {
                const categoryContents = contents.filter(content => 
                  content.categoryId === category.id
                );
                
                if (categoryContents.length === 0) return null;
                
                return (
                  <div key={category.id} className="border rounded-md">
                    <div className="bg-gray-50 p-3 font-medium">
                      {category.languages.find(l => l.languageId === 'en')?.name || category.id}
                    </div>
                    <div className="p-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {categoryContents.map(content => {
                        const englishLang = content.languages.find(l => l.languageId === 'en');
                        const title = englishLang ? englishLang.title : content.languages[0]?.title || 'Untitled';
                        
                        let isSelected = false;
                        if (currentComponent && currentSlot) {
                          if (currentSlot === 'main') {
                            isSelected = currentComponent.content.mainContentId === content.id;
                          } else if (currentSlot === 'featured') {
                            isSelected = currentComponent.content.featuredContentIds?.includes(content.id) || false;
                          } else if (currentSlot === 'items') {
                            isSelected = currentComponent.content.contentIds?.includes(content.id) || false;
                          }
                        }
                        
                        return (
                          <div 
                            key={content.id}
                            className={`border rounded-md p-2 cursor-pointer hover:bg-gray-50 ${isSelected ? 'bg-violet-50 border-violet-300' : ''}`}
                            onClick={() => handleSelectContent(content.id)}
                          >
                            <div className="flex items-center">
                              <input 
                                type="checkbox" 
                                checked={isSelected}
                                onChange={() => {}}
                                className="mr-2"
                              />
                              <div>
                                <div className="font-medium">{title}</div>
                                <div className="text-sm text-gray-500 truncate">
                                  {englishLang?.description?.substring(0, 50) || 'No description'}...
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
          
          <DialogFooter>
            <Button onClick={() => setContentPickerOpen(false)}>Done</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Component Settings Dialog */}
      {selectedComponentIndex !== null && settingsOpen && (
        <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Component Settings</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="bgColor">Background Color</Label>
                <div className="flex">
                  <Input
                    id="bgColor"
                    type="color"
                    value={pageData.components[selectedComponentIndex].settings.backgroundColor}
                    onChange={(e) => {
                      const updatedComponents = [...pageData.components];
                      updatedComponents[selectedComponentIndex].settings.backgroundColor = e.target.value;
                      setPageData({...pageData, components: updatedComponents});
                    }}
                    className="w-12 p-1 mr-2"
                  />
                  <Input
                    value={pageData.components[selectedComponentIndex].settings.backgroundColor}
                    onChange={(e) => {
                      const updatedComponents = [...pageData.components];
                      updatedComponents[selectedComponentIndex].settings.backgroundColor = e.target.value;
                      setPageData({...pageData, components: updatedComponents});
                    }}
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
                    value={pageData.components[selectedComponentIndex].settings.textColor}
                    onChange={(e) => {
                      const updatedComponents = [...pageData.components];
                      updatedComponents[selectedComponentIndex].settings.textColor = e.target.value;
                      setPageData({...pageData, components: updatedComponents});
                    }}
                    className="w-12 p-1 mr-2"
                  />
                  <Input
                    value={pageData.components[selectedComponentIndex].settings.textColor}
                    onChange={(e) => {
                      const updatedComponents = [...pageData.components];
                      updatedComponents[selectedComponentIndex].settings.textColor = e.target.value;
                      setPageData({...pageData, components: updatedComponents});
                    }}
                    className="flex-1"
                  />
                </div>
              </div>
              
              {['featured', 'grid'].includes(pageData.components[selectedComponentIndex].type) && (
                <>
                  <div className="grid gap-2">
                    <Label htmlFor="columns">Columns</Label>
                    <select
                      id="columns"
                      value={pageData.components[selectedComponentIndex].settings.columns || 3}
                      onChange={(e) => {
                        const updatedComponents = [...pageData.components];
                        updatedComponents[selectedComponentIndex].settings.columns = parseInt(e.target.value);
                        setPageData({...pageData, components: updatedComponents});
                      }}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value={1}>1 Column</option>
                      <option value={2}>2 Columns</option>
                      <option value={3}>3 Columns</option>
                      <option value={4}>4 Columns</option>
                    </select>
                  </div>
                </>
              )}
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setSettingsOpen(false)}>Cancel</Button>
              <Button onClick={() => setSettingsOpen(false)}>Apply Settings</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </Sheet>
  );
};

export default PageBuilder;
