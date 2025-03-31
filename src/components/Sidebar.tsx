
import React from 'react';
import { Link } from 'react-router-dom';
import { useNav } from '@/context/NavContext';
import { 
  LayoutDashboard, 
  FolderTree, 
  FileText, 
  Image, 
  LayoutGrid,
  Settings,
  Menu,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarItemProps {
  icon: React.ReactNode;
  text: string;
  to: string;
  isActive: boolean;
  onClick: () => void;
}

const SidebarItem = ({ icon, text, to, isActive, onClick }: SidebarItemProps) => {
  return (
    <Link 
      to={to} 
      className={cn(
        "flex items-center px-3 py-2 rounded-md my-1 text-sm transition-colors",
        isActive 
          ? "bg-violet-100 text-violet-900" 
          : "text-gray-600 hover:bg-gray-100",
      )}
      onClick={onClick}
    >
      <div className="mr-2">{icon}</div>
      <span>{text}</span>
    </Link>
  );
};

const Sidebar = () => {
  const { sidebarState, toggleSidebar, activeSection, setActiveSection } = useNav();
  const isMobile = ['mobile-expanded', 'mobile-collapsed'].includes(sidebarState);
  const isExpanded = ['expanded', 'mobile-expanded'].includes(sidebarState);

  const handleNavClick = (section: string) => {
    setActiveSection(section);
    if (isMobile) {
      toggleSidebar();
    }
  };

  return (
    <>
      {/* Mobile sidebar backdrop */}
      {sidebarState === 'mobile-expanded' && (
        <div 
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Main sidebar */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col border-r border-gray-200 bg-white transition-all duration-300 ease-in-out",
          isExpanded ? "w-64" : "w-16",
          sidebarState === 'mobile-collapsed' && "lg:translate-x-0 -translate-x-full",
          sidebarState === 'mobile-expanded' && "translate-x-0",
        )}
      >
        {/* Header */}
        <div className="flex h-16 items-center justify-between border-b border-gray-200 px-4">
          <Link to="/" className="flex items-center">
            {isExpanded ? (
              <div className="text-xl font-bold text-violet-800">CMS Portal</div>
            ) : (
              <div className="h-8 w-8 rounded-full bg-violet-800 text-white flex items-center justify-center font-bold">
                C
              </div>
            )}
          </Link>
          <button
            type="button"
            onClick={toggleSidebar}
            className="rounded-md p-1 text-gray-500 hover:bg-gray-100"
          >
            {isExpanded ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-3 custom-scrollbar">
          <div className="space-y-5">
            <div>
              {isExpanded && <h4 className="text-xs font-semibold text-gray-400 uppercase mb-2">Main</h4>}
              <ul className="space-y-1">
                <li>
                  <SidebarItem
                    icon={<LayoutDashboard size={18} />}
                    text="Dashboard"
                    to="/"
                    isActive={activeSection === 'dashboard'}
                    onClick={() => handleNavClick('dashboard')}
                  />
                </li>
              </ul>
            </div>

            <div>
              {isExpanded && <h4 className="text-xs font-semibold text-gray-400 uppercase mb-2">Content</h4>}
              <ul className="space-y-1">
                <li>
                  <SidebarItem
                    icon={<FolderTree size={18} />}
                    text="Categories"
                    to="/categories"
                    isActive={activeSection === 'categories'}
                    onClick={() => handleNavClick('categories')}
                  />
                </li>
                <li>
                  <SidebarItem
                    icon={<FileText size={18} />}
                    text="Contents"
                    to="/contents"
                    isActive={activeSection === 'contents'}
                    onClick={() => handleNavClick('contents')}
                  />
                </li>
                <li>
                  <SidebarItem
                    icon={<Image size={18} />}
                    text="Images"
                    to="/images"
                    isActive={activeSection === 'images'}
                    onClick={() => handleNavClick('images')}
                  />
                </li>
                <li>
                  <SidebarItem
                    icon={<LayoutGrid size={18} />}
                    text="Pages"
                    to="/pages"
                    isActive={activeSection === 'pages'}
                    onClick={() => handleNavClick('pages')}
                  />
                </li>
              </ul>
            </div>

            <div>
              {isExpanded && <h4 className="text-xs font-semibold text-gray-400 uppercase mb-2">System</h4>}
              <ul className="space-y-1">
                <li>
                  <SidebarItem
                    icon={<Settings size={18} />}
                    text="Settings"
                    to="/settings"
                    isActive={activeSection === 'settings'}
                    onClick={() => handleNavClick('settings')}
                  />
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </aside>

      {/* Mobile toggle button */}
      {sidebarState === 'mobile-collapsed' && (
        <button
          type="button"
          onClick={toggleSidebar}
          className="fixed bottom-4 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-violet-600 text-white shadow-lg lg:hidden"
        >
          <Menu size={24} />
        </button>
      )}
    </>
  );
};

export default Sidebar;
