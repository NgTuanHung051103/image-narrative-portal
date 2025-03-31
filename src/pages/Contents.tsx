
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { contents, categories } from '@/data/mockData';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  PlusCircle, 
  Search, 
  Filter, 
  Pencil, 
  Trash2, 
  Eye, 
  ChevronsUpDown, 
  ArrowUpDown,
  Languages
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

const Contents = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  // Filter contents based on search term and category filter
  const filteredContents = contents.filter(content => {
    const matchesSearch = content.languages.some(lang => 
      lang.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lang.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    const matchesCategory = filterCategory ? content.categoryId === filterCategory : true;
    
    return matchesSearch && matchesCategory;
  });
  
  // Get category name by id
  const getCategoryName = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    if (!category) return 'Uncategorized';
    
    const englishLang = category.languages.find(l => l.languageId === 'en');
    return englishLang ? englishLang.name : category.languages[0]?.name || 'Unnamed';
  };
  
  // Get status badge variant
  const getStatusVariant = (status) => {
    switch (status) {
      case 'published':
        return 'default';
      case 'draft':
        return 'outline';
      case 'scheduled':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  return (
    <Layout title="Contents">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold">Contents</h1>
          <Badge>{contents.length}</Badge>
        </div>
        <Button>
          <PlusCircle className="h-4 w-4 mr-2" />
          <span>Add Content</span>
        </Button>
      </div>

      <Card className="mb-6">
        <div className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search contents..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-full md:w-auto flex items-center gap-2">
              <Button variant="outline" className="w-full md:w-auto">
                <Filter className="h-4 w-4 mr-2" />
                <span>Filter</span>
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <ScrollArea className="rounded-md border h-[calc(100vh-250px)]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Languages</TableHead>
                <TableHead>Updated</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContents.map(content => {
                // Get English language version or first available
                const englishLang = content.languages.find(lang => lang.languageId === 'en');
                const displayLang = englishLang || content.languages[0];
                
                return (
                  <TableRow key={content.id}>
                    <TableCell className="font-medium">
                      {displayLang?.title}
                    </TableCell>
                    <TableCell>
                      {getCategoryName(content.categoryId)}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{content.type}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(content.status)}>
                        {content.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Languages className="h-4 w-4 mr-1" />
                        <span>{content.languages.length}</span>
                      </div>
                    </TableCell>
                    <TableCell>{new Date(content.updatedAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
              
              {filteredContents.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    No results found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </Card>
    </Layout>
  );
};

export default Contents;
