
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LayoutGrid, MoveDown, MoveUp, Plus, Settings as SettingsIcon, Trash2 } from 'lucide-react';
import ComponentList from './ComponentList';

const PageFormDialog = () => {
  const { 
    isDialogOpen, 
    setIsDialogOpen, 
    dialogMode,
    formData,
    handleInputChange,
    handleAddComponent,
    handleSavePage,
    sortedComponents,
  } = usePages();

  return (
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
              <ComponentList />
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSavePage}>Save Page</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PageFormDialog;
