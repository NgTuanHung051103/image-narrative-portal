
import React, { createContext, useContext, useState, ReactNode } from 'react';

type SidebarState = 'expanded' | 'collapsed' | 'mobile-expanded' | 'mobile-collapsed';

interface NavContextType {
  sidebarState: SidebarState;
  toggleSidebar: () => void;
  closeSidebar: () => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const NavContext = createContext<NavContextType | undefined>(undefined);

export function NavProvider({ children }: { children: ReactNode }) {
  const [sidebarState, setSidebarState] = useState<SidebarState>('expanded');
  const [activeSection, setActiveSection] = useState('dashboard');

  const toggleSidebar = () => {
    setSidebarState(prev => {
      if (prev === 'expanded') return 'collapsed';
      if (prev === 'collapsed') return 'expanded';
      if (prev === 'mobile-expanded') return 'mobile-collapsed';
      return 'mobile-expanded';
    });
  };

  const closeSidebar = () => {
    setSidebarState(prev => {
      if (prev === 'mobile-expanded') return 'mobile-collapsed';
      return prev;
    });
  };

  return (
    <NavContext.Provider value={{
      sidebarState,
      toggleSidebar,
      closeSidebar,
      activeSection,
      setActiveSection,
    }}>
      {children}
    </NavContext.Provider>
  );
}

export function useNav() {
  const context = useContext(NavContext);
  if (context === undefined) {
    throw new Error('useNav must be used within a NavProvider');
  }
  return context;
}
