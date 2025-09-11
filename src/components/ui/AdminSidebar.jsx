import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const AdminSidebar = ({ isCollapsed = false }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState(['content']);
  const location = useLocation();

  const navigationSections = [
    {
      id: 'overview',
      label: 'Overview',
      items: [
        {
          label: 'Dashboard',
          path: '/admin-dashboard',
          icon: 'LayoutDashboard',
          description: 'System overview and analytics'
        }
      ]
    },
    {
      id: 'content',
      label: 'Content Management',
      items: [
        {
          label: 'Content Library',
          path: '/admin-content-management',
          icon: 'BookOpen',
          description: 'Manage lessons and materials'
        },
        {
          label: 'Quiz Builder',
          path: '/admin-quiz-builder',
          icon: 'Brain',
          description: 'Create and edit quizzes'
        },
        {
          label: 'Challenge Creator',
          path: '/admin-challenge-creator',
          icon: 'Target',
          description: 'Design daily challenges'
        }
      ]
    },
    {
      id: 'users',
      label: 'User Management',
      items: [
        {
          label: 'Students',
          path: '/admin-students',
          icon: 'Users',
          description: 'Manage student accounts'
        },
        {
          label: 'Educators',
          path: '/admin-educators',
          icon: 'GraduationCap',
          description: 'Manage educator accounts'
        },
        {
          label: 'Progress Reports',
          path: '/admin-reports',
          icon: 'BarChart3',
          description: 'View learning analytics'
        }
      ]
    },
    {
      id: 'system',
      label: 'System',
      items: [
        {
          label: 'Settings',
          path: '/admin-settings',
          icon: 'Settings',
          description: 'System configuration'
        },
        {
          label: 'Help Center',
          path: '/admin-help',
          icon: 'HelpCircle',
          description: 'Documentation and support'
        }
      ]
    }
  ];

  const isActivePath = (path) => location?.pathname === path;

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => 
      prev?.includes(sectionId) 
        ? prev?.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const toggleMobile = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
            <Icon name="Leaf" size={20} color="white" />
          </div>
          {!isCollapsed && (
            <div>
              <h2 className="font-heading text-lg text-primary">Peco Admin</h2>
              <p className="text-xs font-caption text-muted-foreground">Content Management</p>
            </div>
          )}
        </div>
        
        {/* Mobile Close Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMobile}
          className="md:hidden"
        >
          <Icon name="X" size={20} />
        </Button>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {navigationSections?.map((section) => (
          <div key={section?.id}>
            {/* Section Header */}
            <button
              onClick={() => toggleSection(section?.id)}
              className={`flex items-center justify-between w-full p-2 text-left rounded-md hover:bg-muted transition-colors duration-200 ${
                isCollapsed ? 'justify-center' : ''
              }`}
            >
              <span className={`font-caption font-medium text-sm text-muted-foreground uppercase tracking-wide ${
                isCollapsed ? 'hidden' : ''
              }`}>
                {section?.label}
              </span>
              {!isCollapsed && (
                <Icon 
                  name={expandedSections?.includes(section?.id) ? "ChevronDown" : "ChevronRight"} 
                  size={16} 
                  color="var(--color-muted-foreground)"
                />
              )}
            </button>

            {/* Section Items */}
            {(expandedSections?.includes(section?.id) || isCollapsed) && (
              <div className={`space-y-1 ${isCollapsed ? '' : 'ml-2 mt-2'}`}>
                {section?.items?.map((item) => (
                  <Link
                    key={item?.path}
                    to={item?.path}
                    onClick={() => setIsMobileOpen(false)}
                    className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 group ${
                      isActivePath(item?.path)
                        ? 'bg-primary text-primary-foreground shadow-soft'
                        : 'text-foreground hover:bg-muted hover:text-primary'
                    } ${isCollapsed ? 'justify-center' : ''}`}
                    title={isCollapsed ? item?.label : ''}
                  >
                    <Icon 
                      name={item?.icon} 
                      size={20} 
                      color={isActivePath(item?.path) ? 'currentColor' : 'currentColor'}
                    />
                    {!isCollapsed && (
                      <div className="flex-1 min-w-0">
                        <div className="font-caption font-medium text-sm">{item?.label}</div>
                        <div className="text-xs opacity-75 truncate">{item?.description}</div>
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <div className={`flex items-center space-x-3 ${isCollapsed ? 'justify-center' : ''}`}>
          <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
            <Icon name="User" size={16} color="var(--color-muted-foreground)" />
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <div className="font-caption font-medium text-sm">Admin User</div>
              <div className="text-xs text-muted-foreground">System Administrator</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`hidden md:flex fixed left-0 top-0 z-[1000] h-screen bg-card border-r border-border shadow-soft transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}>
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isMobileOpen && (
        <div className="md:hidden fixed inset-0 z-[1100] bg-black/50" onClick={toggleMobile}>
          <aside className="fixed left-0 top-0 h-screen w-64 bg-card border-r border-border shadow-large">
            {sidebarContent}
          </aside>
        </div>
      )}

      {/* Mobile Menu Button */}
      <Button
        variant="outline"
        size="icon"
        onClick={toggleMobile}
        className="md:hidden fixed top-4 left-4 z-[1000] bg-card shadow-soft"
      >
        <Icon name="Menu" size={20} />
      </Button>

      {/* Content Spacer */}
      <div className={`hidden md:block transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}></div>
    </>
  );
};

export default AdminSidebar;