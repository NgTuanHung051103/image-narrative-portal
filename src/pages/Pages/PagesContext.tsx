import React, { createContext, useState, useContext } from 'react';
import { pages, contents, componentTypes } from '@/data/mockData';

interface ComponentSettings {
  backgroundColor: string;
  textColor: string;
  contentAlignment: string;
  columns?: number;
  showImages?: boolean;
}

interface ComponentContent {
  title?: string;
  mainContentId?: string;
  contentIds?: string[];
  featuredContentIds?: string[];
}

interface Component {
  id: string;
  type: string;
  orderIndex: number;
  settings: ComponentSettings;
  content: ComponentContent;
}

interface FormData {
  title: string;
  slug: string;
  status: string;
  components: Component[];
}

interface PagesContextType {
  selectedPage: any;
  setSelectedPage: (page: any) => void;
  isDialogOpen: boolean;
  setIsDialogOpen: (isOpen: boolean) => void;
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: (isOpen: boolean) => void;
  isComponentDialogOpen: boolean;
  setIsComponentDialogOpen: (isOpen: boolean) => void;
  isComponentSettingsOpen: boolean;
  setIsComponentSettingsOpen: (isOpen: boolean) => void;
  dialogMode: string;
  setDialogMode: (mode: string) => void;
  formData: FormData;
  setFormData: (data: FormData) => void;
  selectedComponent: any;
  setSelectedComponent: (component: any) => void;
  componentFormData: {
    type: string;
    settings: ComponentSettings;
    content: ComponentContent;
  };
  setComponentFormData: (data: any) => void;
  handleAddPage: () => void;
  handleEditPage: (page: any) => void;
  handleInputChange: (field: string, value: any) => void;
  handleAddComponent: () => void;
  handleSaveComponent: () => void;
  handleComponentSettings: (component: any) => void;
  handleUpdateComponent: () => void;
  handleMoveComponentUp: (index: number) => void;
  handleMoveComponentDown: (index: number) => void;
  handleRemoveComponent: (componentId: string) => void;
  handleComponentFormChange: (field: string, value: any) => void;
  handleComponentTypeChange: (type: string) => void;
  handleContentSelect: (field: string, value: string) => void;
  handleSavePage: () => void;
  handleDeleteConfirm: () => void;
  getComponentTypeName: (typeId: string) => string;
  getContentTitle: (contentId: string) => string;
  sortedComponents: Component[];
}

const PagesContext = createContext<PagesContextType | undefined>(undefined);

export const PagesProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [selectedPage, setSelectedPage] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isComponentDialogOpen, setIsComponentDialogOpen] = useState(false);
  const [isComponentSettingsOpen, setIsComponentSettingsOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState('add'); // 'add' or 'edit'
  const [formData, setFormData] = useState<FormData>({
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

  const contextValue: PagesContextType = {
    selectedPage,
    setSelectedPage,
    isDialogOpen,
    setIsDialogOpen,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    isComponentDialogOpen,
    setIsComponentDialogOpen,
    isComponentSettingsOpen,
    setIsComponentSettingsOpen,
    dialogMode,
    setDialogMode,
    formData,
    setFormData,
    selectedComponent,
    setSelectedComponent,
    componentFormData,
    setComponentFormData,
    handleAddPage,
    handleEditPage,
    handleInputChange,
    handleAddComponent,
    handleSaveComponent,
    handleComponentSettings,
    handleUpdateComponent,
    handleMoveComponentUp,
    handleMoveComponentDown,
    handleRemoveComponent,
    handleComponentFormChange,
    handleComponentTypeChange,
    handleContentSelect,
    handleSavePage,
    handleDeleteConfirm,
    getComponentTypeName,
    getContentTitle,
    sortedComponents
  };

  return (
    <PagesContext.Provider value={contextValue}>
      {children}
    </PagesContext.Provider>
  );
};

export const usePages = () => {
  const context = useContext(PagesContext);
  if (context === undefined) {
    throw new Error('usePages must be used within a PagesProvider');
  }
  return context;
};
