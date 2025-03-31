
import React from 'react';
import { usePages } from '../PagesContext';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { contents } from '@/data/mockData';

const ComponentSettingsDialog = () => {
  const { 
    isComponentSettingsOpen, 
    setIsComponentSettingsOpen, 
    componentFormData,
    handleComponentFormChange,
    handleContentSelect,
    handleUpdateComponent,
    getComponentTypeName
  } = usePages();

  return (
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
  );
};

export default ComponentSettingsDialog;
