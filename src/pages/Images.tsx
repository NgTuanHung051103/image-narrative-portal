
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { images } from '@/data/mockData';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Grid2X2, 
  List, 
  Upload, 
  Search, 
  Filter,
  Pencil,
  Trash2,
  Image as ImageIcon
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';

const Images = () => {
  const [view, setView] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [imageTitle, setImageTitle] = useState('');
  
  // Filter images based on search
  const filteredImages = images.filter(img => 
    img.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    img.alt.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setSelectedFile(file);
    setImageTitle(file.name.split('.')[0]);
    
    // Create preview URL
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  
  // Handle image upload
  const handleUpload = () => {
    // Here you would normally handle the actual upload
    console.log('Uploading:', selectedFile, 'with title:', imageTitle);
    setUploadDialogOpen(false);
    setSelectedFile(null);
    setPreviewUrl('');
    setImageTitle('');
  };

  return (
    <Layout title="Media Library">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Images</h1>
        <Button onClick={() => setUploadDialogOpen(true)}>
          <Upload className="h-4 w-4 mr-2" />
          <span>Upload Image</span>
        </Button>
      </div>

      <Card className="mb-6">
        <div className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search images..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                <span>Filter</span>
              </Button>
              <div className="flex bg-muted rounded-md">
                <Button
                  variant={view === 'grid' ? 'default' : 'ghost'}
                  className="rounded-r-none rounded-l-md"
                  onClick={() => setView('grid')}
                >
                  <Grid2X2 className="h-4 w-4" />
                </Button>
                <Button
                  variant={view === 'list' ? 'default' : 'ghost'}
                  className="rounded-l-none rounded-r-md"
                  onClick={() => setView('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <CardContent className="p-4">
          {view === 'grid' ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {filteredImages.map(img => (
                <div key={img.id} className="group relative">
                  <div className="aspect-square rounded-md overflow-hidden border bg-muted">
                    <img
                      src={img.url}
                      alt={img.alt}
                      className="h-full w-full object-cover transition-all hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="sm" className="text-white">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-white">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="mt-1 text-sm truncate">{img.title}</p>
                </div>
              ))}
              
              {filteredImages.length === 0 && (
                <div className="col-span-full flex items-center justify-center h-32">
                  <p className="text-muted-foreground">No images found.</p>
                </div>
              )}
            </div>
          ) : (
            <ScrollArea className="h-[calc(100vh-300px)]">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Image</th>
                    <th className="text-left p-2">Title</th>
                    <th className="text-left p-2">Alt Text</th>
                    <th className="text-left p-2">Dimensions</th>
                    <th className="text-left p-2">Size</th>
                    <th className="text-left p-2">Date</th>
                    <th className="text-left p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredImages.map(img => (
                    <tr key={img.id} className="border-b">
                      <td className="p-2">
                        <div className="h-10 w-10 rounded-md overflow-hidden bg-muted">
                          <img
                            src={img.url}
                            alt={img.alt}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </td>
                      <td className="p-2">{img.title}</td>
                      <td className="p-2">{img.alt}</td>
                      <td className="p-2">{img.dimensions}</td>
                      <td className="p-2">{img.size}</td>
                      <td className="p-2">{new Date(img.uploadedAt).toLocaleDateString()}</td>
                      <td className="p-2">
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="sm">
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  
                  {filteredImages.length === 0 && (
                    <tr>
                      <td colSpan={7} className="p-4 text-center">
                        No images found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </ScrollArea>
          )}
        </CardContent>
      </Card>
      
      {/* Upload Dialog */}
      <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Upload Image</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-md p-6 bg-muted">
              {previewUrl ? (
                <div className="relative w-full max-w-sm">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="max-h-48 mx-auto object-contain"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-0 right-0 bg-black bg-opacity-50 text-white rounded-full p-1"
                    onClick={() => {
                      setSelectedFile(null);
                      setPreviewUrl('');
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <>
                  <ImageIcon className="h-10 w-10 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">Drag and drop or click to upload</p>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="max-w-sm"
                  />
                </>
              )}
            </div>
            
            {previewUrl && (
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={imageTitle}
                  onChange={(e) => setImageTitle(e.target.value)}
                  placeholder="Enter image title"
                />
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setUploadDialogOpen(false)}>Cancel</Button>
            <Button
              onClick={handleUpload}
              disabled={!selectedFile}
            >
              Upload
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Images;
