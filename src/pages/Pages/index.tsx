
import React from 'react';
import Layout from '@/components/Layout';
import { PagesProvider } from './PagesContext';
import PagesList from './components/PagesList';
import PageFormDialog from './components/PageFormDialog';
import DeleteConfirmationDialog from './components/DeleteConfirmationDialog';
import ComponentFormDialog from './components/ComponentFormDialog';
import ComponentSettingsDialog from './components/ComponentSettingsDialog';

const Pages = () => {
  return (
    <Layout title="Pages">
      <PagesProvider>
        <PagesList />
        <PageFormDialog />
        <DeleteConfirmationDialog />
        <ComponentFormDialog />
        <ComponentSettingsDialog />
      </PagesProvider>
    </Layout>
  );
};

export default Pages;
