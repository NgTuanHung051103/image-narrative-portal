
import React, { useState } from 'react';
import { usePages } from '../PagesContext';
import { pages } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const PagesList = () => {
  const { 
    handleAddPage, 
    handleEditPage, 
    setSelectedPage, 
    setIsDeleteDialogOpen 
  } = usePages();

  return (
    <>
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
    </>
  );
};

export default PagesList;
