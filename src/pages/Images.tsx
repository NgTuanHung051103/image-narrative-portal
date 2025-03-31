
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { images } from '@/data/mockData';
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
import { Pencil, Trash2, Upload, Image as ImageIcon, FileType } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const Images = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState('view'); // 'view' or 'edit'
  const [formData, setFormData] = useState({
    filename: '',
    name: '',
  });
  const [uploadFiles, setUploadFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);

  // Function to format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Function to open dialog in view/edit mode
  const handleViewImage = (image) => {
    setDialogMode('view');
    setSelectedImage(image);
    setFormData({
      filename: image.filename,
      name: image.name,
    });
    setIsDialogOpen(true);
  };

  // Function to edit image metadata
  const handleEditImage = () => {
    setDialogMode('edit');
  };

  // Function to handle form input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Function to save image metadata
  const handleSaveImage = () => {
    // Here you would normally make an API call
    console.log('Saving image metadata:', formData);
    // Switch back to view mode
    setDialogMode('view');
  };

  // Function to confirm deletion
  const handleDeleteConfirm = () => {
    // Here you would normally make an API call
    console.log('Deleting image:', selectedImage);
    // Close the dialogs after deleting
    setIsDeleteDialogOpen(false);
    setIsDialogOpen(false);
  };

  // Function to handle file selection for upload
  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setUploadFiles(files);
    
    // Create preview URLs
    const urls = files.map(file => URL.createObjectURL(file));
    setPreviewUrls(urls);
  };

  // Function to upload images
  const handleUpload = () => {
    // Here you would normally make an API call to upload the files
    console.log('Uploading files:', uploadFiles);
    // Reset the form and close the dialog
    setUploadFiles([]);
    setPreviewUrls([]);
    setIsUploadDialogOpen(false);
  };

  return (
    <Layout title="Images">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Images</h1>
        <Button onClick={() => setIsUploadDialogOpen(true)}>
          <Upload className="h-4 w-4 mr-1" />
          <span>Upload Images</span>
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Preview</TableHead>
              <TableHead>Filename</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Uploaded</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {images.map(image => (
              <TableRow key={image.id}>
                <TableCell>
                  <div className="h-12 w-12 relative">
                    <img 
                      src={image.thumbnailUrl} 
                      alt={image.filename} 
                      className="h-full w-full object-cover rounded"
                    />
                  </div>
                </TableCell>
                <TableCell className="font-medium">
                  {image.name || image.filename}
                </TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {image.mimeType}
                  </Badge>
                </TableCell>
                <TableCell>{formatFileSize(image.size)}</TableCell>
                <TableCell>{new Date(image.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewImage(image)}
                    >
                      <ImageIcon className="h-4 w-4 mr-1" />
                      <span>View</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setSelectedImage(image);
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

      {/* View/Edit Image Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              {dialogMode === 'view' ? 'Image Details' : 'Edit Image'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex justify-center items-center">
              {selectedImage && (
                <img 
                  src={selectedImage.path} 
                  alt={selectedImage.filename} 
                  className="max-h-[400px] max-w-full object-contain rounded"
                />
              )}
            </div>
            
            <div className="space-y-4">
              {dialogMode === 'view' ? (
                <>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Filename</h3>
                    <p className="mt-1">{selectedImage?.filename}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Display Name</h3>
                    <p className="mt-1">{selectedImage?.name}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Type</h3>
                    <p className="mt-1">{selectedImage?.mimeType}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Size</h3>
                    <p className="mt-1">{formatFileSize(selectedImage?.size || 0)}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Uploaded</h3>
                    <p className="mt-1">{new Date(selectedImage?.createdAt || '').toLocaleString()}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Last Updated</h3>
                    <p className="mt-1">{new Date(selectedImage?.updatedAt || '').toLocaleString()}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Path</h3>
                    <p className="mt-1 break-all">{selectedImage?.path}</p>
                  </div>
                  <Button onClick={handleEditImage}>
                    <Pencil className="h-4 w-4 mr-1" />
                    <span>Edit Metadata</span>
                  </Button>
                </>
              ) : (
                <>
                  <div className="grid gap-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="filename" className="text-right">
                        Filename
                      </Label>
                      <Input
                        id="filename"
                        value={formData.filename}
                        onChange={(e) => handleInputChange('filename', e.target.value)}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Display Name
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="col-span-3"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          <DialogFooter>
            {dialogMode === 'view' ? (
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Close</Button>
            ) : (
              <>
                <Button variant="outline" onClick={() => setDialogMode('view')}>Cancel</Button>
                <Button onClick={handleSaveImage}>Save</Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this image? This action cannot be undone.</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Upload Dialog */}
      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Upload Images</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Input
                id="file-upload"
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleFileSelect}
              />
              <Label htmlFor="file-upload" className="cursor-pointer">
                <div className="flex flex-col items-center">
                  <FileType className="h-12 w-12 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500">
                    Drag and drop files here, or click to select files
                  </span>
                </div>
              </Label>
            </div>
            
            {previewUrls.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-medium mb-2">Selected Files ({previewUrls.length})</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {previewUrls.map((url, index) => (
                    <div key={index} className="relative">
                      <img 
                        src={url} 
                        alt={`Preview ${index + 1}`} 
                        className="h-24 w-full object-cover rounded"
                      />
                      <button 
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                        onClick={() => {
                          const newFiles = [...uploadFiles];
                          newFiles.splice(index, 1);
                          setUploadFiles(newFiles);
                          
                          const newUrls = [...previewUrls];
                          URL.revokeObjectURL(newUrls[index]);
                          newUrls.splice(index, 1);
                          setPreviewUrls(newUrls);
                        }}
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => {
              // Revoke all object URLs to avoid memory leaks
              previewUrls.forEach(url => URL.revokeObjectURL(url));
              setPreviewUrls([]);
              setUploadFiles([]);
              setIsUploadDialogOpen(false);
            }}>
              Cancel
            </Button>
            <Button 
              onClick={handleUpload}
              disabled={uploadFiles.length === 0}
            >
              <Upload className="h-4 w-4 mr-1" />
              <span>Upload {uploadFiles.length > 0 ? `(${uploadFiles.length})` : ''}</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Images;
