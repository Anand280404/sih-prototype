import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const WelcomeMessage = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const welcomeMessages = [
    {
      icon: 'Leaf',
      title: 'Welcome to Peco!',
      message: 'Your environmental learning adventure awaits',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      icon: 'Target',
      title: 'Daily Challenges',
      message: 'Complete eco-friendly tasks and earn points',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      icon: 'Trophy',
      title: 'Achievements',
      message: 'Unlock badges as you learn and grow',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      icon: 'Users',
      title: 'Join Friends',
      message: 'Learn together and compete on leaderboards',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentMessageIndex((prev) => (prev + 1) % welcomeMessages?.length);
        setIsVisible(true);
      }, 300);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const currentMessage = welcomeMessages?.[currentMessageIndex];

  return (
    <div className="mb-8">
      <div className={`transition-all duration-300 ${
        isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-2'
      }`}>
        <div className={`${currentMessage?.bgColor} rounded-lg p-6 border border-current/20`}>
          <div className="flex items-center space-x-4">
            {/* Icon */}
            <div className={`w-12 h-12 ${currentMessage?.bgColor?.replace('/10', '')} rounded-full flex items-center justify-center shadow-soft`}>
              <Icon 
                name={currentMessage?.icon} 
                size={24} 
                color="white"
              />
            </div>
            
            {/* Content */}
            <div className="flex-1">
              <h3 className={`font-heading text-lg ${currentMessage?.color} mb-1`}>
                {currentMessage?.title}
              </h3>
              <p className="font-caption text-sm text-muted-foreground">
                {currentMessage?.message}
              </p>
            </div>
            
            {/* Progress Indicator */}
            <div className="flex flex-col space-y-1">
              {welcomeMessages?.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentMessageIndex 
                      ? currentMessage?.color?.replace('text-', 'bg-')
                      : 'bg-muted'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Feature Highlights */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="text-center p-4 bg-card rounded-lg border border-border shadow-soft">
          <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center mx-auto mb-2">
            <Icon name="BookOpen" size={16} color="white" />
          </div>
          <div className="font-caption text-sm font-medium text-foreground">Interactive Lessons</div>
          <div className="text-xs text-muted-foreground mt-1">Learn through play</div>
        </div>
        
        <div className="text-center p-4 bg-card rounded-lg border border-border shadow-soft">
          <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center mx-auto mb-2">
            <Icon name="Zap" size={16} color="white" />
          </div>
          <div className="font-caption text-sm font-medium text-foreground">Streak Rewards</div>
          <div className="text-xs text-muted-foreground mt-1">Daily login bonuses</div>
        </div>
      </div>
      {/* Environmental Stats */}
      <div className="mt-6 p-4 bg-gradient-to-r from-primary/5 to-success/5 rounded-lg border border-primary/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-success rounded-full flex items-center justify-center">
              <Icon name="Globe" size={20} color="white" />
            </div>
            <div>
              <div className="font-caption font-medium text-foreground">Global Impact</div>
              <div className="text-xs text-muted-foreground">Join 10,000+ eco-heroes worldwide</div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-data text-lg font-bold text-primary">2.5M</div>
            <div className="text-xs text-muted-foreground">Trees saved</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeMessage;