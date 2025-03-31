
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import PageBuilder from '@/components/PageBuilder/PageBuilder';
import { pages } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

const Settings = () => {
  const [pageBuilderOpen, setPageBuilderOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState(null);
  const { toast } = useToast();

  const handleOpenPageBuilder = (page = null) => {
    setSelectedPage(page);
    setPageBuilderOpen(true);
  };

  const handleSavePage = (pageData) => {
    console.log('Saving page:', pageData);
    toast({
      title: "Page saved",
      description: `${pageData.title} has been saved successfully.`
    });
    setPageBuilderOpen(false);
  };

  return (
    <Layout title="Settings">
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="pages">Pages</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Manage your website's general settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Configuration options will be available here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="pages">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Pages</h2>
            <Button onClick={() => handleOpenPageBuilder()}>
              Create New Page
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pages.map(page => (
              <Card key={page.id}>
                <CardHeader className="pb-2">
                  <CardTitle>{page.title}</CardTitle>
                  <CardDescription>/{page.slug}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    {page.components.length} components
                  </p>
                  <p className="text-sm text-gray-500">
                    Last updated: {new Date(page.updatedAt).toLocaleDateString()}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => handleOpenPageBuilder(page)}>
                    Edit Page Layout
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>
                Customize how your website looks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Theme and appearance options will be available here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <PageBuilder 
        open={pageBuilderOpen}
        onClose={() => setPageBuilderOpen(false)}
        initialData={selectedPage}
        onSave={handleSavePage}
      />
    </Layout>
  );
};

export default Settings;
