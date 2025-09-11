import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const StudentNavBar = ({ points = 0, streak = 0, isCollapsed = false }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    {
      label: 'My Adventure',
      path: '/student-dashboard',
      icon: 'Home',
      description: 'Your learning journey starts here'
    },
    {
      label: 'Learn & Play',
      path: '/quiz-system',
      icon: 'Brain',
      description: 'Interactive quizzes and games'
    },
    {
      label: 'Study Tools',
      path: '/revision-flashcards',
      icon: 'BookOpen',
      description: 'Review with flashcards'
    },
    {
      label: 'Daily Quest',
      path: '/daily-eco-challenges',
      icon: 'Target',
      description: 'Complete today\'s challenge'
    }
  ];

  const isActivePath = (path) => location?.pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[1000] bg-card border-b border-border shadow-soft">
        <div className="flex items-center justify-between h-16 px-4">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
              <Icon name="Leaf" size={24} color="white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-heading text-primary">Peco</h1>
              <p className="text-xs font-caption text-muted-foreground">Learn & Grow</p>
            </div>
          </div>

          {/* Desktop Navigation Items */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-200 hover:bg-muted group ${
                  isActivePath(item?.path) 
                    ? 'bg-primary text-primary-foreground shadow-soft' 
                    : 'text-foreground hover:text-primary'
                }`}
              >
                <Icon 
                  name={item?.icon} 
                  size={20} 
                  color={isActivePath(item?.path) ? 'currentColor' : 'currentColor'} 
                />
                <span className="font-caption font-medium">{item?.label}</span>
              </Link>
            ))}
          </div>

          {/* Progress & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Progress Indicators */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-warning/10 px-3 py-1 rounded-full">
                <Icon name="Zap" size={16} color="var(--color-warning)" />
                <span className="font-data text-sm font-medium text-warning-foreground">
                  {streak} day streak
                </span>
              </div>
              <div className="flex items-center space-x-2 bg-success/10 px-3 py-1 rounded-full">
                <Icon name="Star" size={16} color="var(--color-success)" />
                <span className="font-data text-sm font-medium text-success-foreground">
                  {points} points
                </span>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              className="lg:hidden"
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
            </Button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-16 left-0 right-0 bg-card border-b border-border shadow-large">
            <div className="p-4 space-y-2">
              {/* Mobile Progress */}
              <div className="flex items-center justify-center space-x-4 mb-4 pb-4 border-b border-border">
                <div className="flex items-center space-x-2 bg-warning/10 px-3 py-1 rounded-full">
                  <Icon name="Zap" size={16} color="var(--color-warning)" />
                  <span className="font-data text-sm font-medium text-warning-foreground">
                    {streak} day streak
                  </span>
                </div>
                <div className="flex items-center space-x-2 bg-success/10 px-3 py-1 rounded-full">
                  <Icon name="Star" size={16} color="var(--color-success)" />
                  <span className="font-data text-sm font-medium text-success-foreground">
                    {points} points
                  </span>
                </div>
              </div>

              {/* Mobile Navigation Items */}
              {navigationItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                    isActivePath(item?.path)
                      ? 'bg-primary text-primary-foreground shadow-soft'
                      : 'text-foreground hover:bg-muted hover:text-primary'
                  }`}
                >
                  <Icon name={item?.icon} size={24} />
                  <div>
                    <div className="font-caption font-medium">{item?.label}</div>
                    <div className="text-xs opacity-75">{item?.description}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
      {/* Bottom Navigation for Mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-[1000] bg-card border-t border-border shadow-large lg:hidden">
        <div className="flex items-center justify-around py-2">
          {navigationItems?.map((item) => (
            <Link
              key={item?.path}
              to={item?.path}
              className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-all duration-200 min-w-[44px] ${
                isActivePath(item?.path)
                  ? 'text-primary' :'text-muted-foreground hover:text-primary'
              }`}
            >
              <Icon name={item?.icon} size={20} />
              <span className="text-xs font-caption font-medium">{item?.label?.split(' ')?.[0]}</span>
              {isActivePath(item?.path) && (
                <div className="w-1 h-1 bg-primary rounded-full"></div>
              )}
            </Link>
          ))}
        </div>
      </div>
      {/* Spacer for fixed navigation */}
      <div className="h-16"></div>
      <div className="h-16 lg:hidden"></div>
    </>
  );
};

export default StudentNavBar;