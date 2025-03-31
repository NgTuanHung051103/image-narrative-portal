
import React from 'react';
import { usePages } from '../PagesContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MoveDown, MoveUp, Settings as SettingsIcon, Trash2 } from 'lucide-react';

const ComponentList = () => {
  const { 
    sortedComponents,
    getComponentTypeName,
    getContentTitle,
    handleComponentSettings,
    handleRemoveComponent,
    handleMoveComponentUp,
    handleMoveComponentDown
  } = usePages();

  return (
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
  );
};

export default ComponentList;
