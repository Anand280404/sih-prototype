import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';

const ProgressIndicator = ({ 
  currentStep = 0, 
  totalSteps = 10, 
  points = 0, 
  showCelebration = false,
  achievements = [],
  streakDays = 0,
  completionPercentage = 0,
  variant = 'default' // 'default', 'circular', 'minimal'
}) => {
  const [animatePoints, setAnimatePoints] = useState(false);
  const [showAchievement, setShowAchievement] = useState(null);

  useEffect(() => {
    if (showCelebration) {
      setAnimatePoints(true);
      const timer = setTimeout(() => setAnimatePoints(false), 600);
      return () => clearTimeout(timer);
    }
  }, [showCelebration, points]);

  useEffect(() => {
    if (achievements?.length > 0) {
      const latestAchievement = achievements?.[achievements?.length - 1];
      setShowAchievement(latestAchievement);
      const timer = setTimeout(() => setShowAchievement(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [achievements]);

  const progressPercentage = totalSteps > 0 ? (currentStep / totalSteps) * 100 : completionPercentage;

  if (variant === 'circular') {
    return (
      <div className="flex flex-col items-center space-y-4">
        {/* Circular Progress */}
        <div className="relative w-24 h-24">
          <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
            {/* Background Circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="var(--color-muted)"
              strokeWidth="8"
              fill="none"
            />
            {/* Progress Circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="var(--color-primary)"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 45}`}
              strokeDashoffset={`${2 * Math.PI * 45 * (1 - progressPercentage / 100)}`}
              className="transition-all duration-500 ease-out"
            />
          </svg>
          {/* Center Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-data text-lg font-bold text-primary">
              {Math.round(progressPercentage)}%
            </span>
            <span className="text-xs font-caption text-muted-foreground">
              Complete
            </span>
          </div>
        </div>

        {/* Points Display */}
        <div className={`flex items-center space-x-2 transition-transform duration-300 ${
          animatePoints ? 'animate-scale-celebration' : ''
        }`}>
          <Icon name="Star" size={20} color="var(--color-success)" />
          <span className="font-data text-lg font-bold text-success">
            {points} points
          </span>
        </div>
      </div>
    );
  }

  if (variant === 'minimal') {
    return (
      <div className="flex items-center space-x-4">
        {/* Simple Progress Bar */}
        <div className="flex-1 bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        
        {/* Points */}
        <div className={`flex items-center space-x-1 transition-transform duration-300 ${
          animatePoints ? 'animate-scale-celebration' : ''
        }`}>
          <Icon name="Star" size={16} color="var(--color-success)" />
          <span className="font-data text-sm font-medium text-success">
            {points}
          </span>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className="space-y-4">
      {/* Achievement Celebration */}
      {showAchievement && (
        <div className="fixed top-4 right-4 z-[1200] bg-success text-success-foreground p-4 rounded-lg shadow-large animate-gentle-bounce">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-success-foreground/20 rounded-full flex items-center justify-center">
              <Icon name="Trophy" size={20} color="currentColor" />
            </div>
            <div>
              <div className="font-caption font-medium">Achievement Unlocked!</div>
              <div className="text-sm opacity-90">{showAchievement?.name}</div>
            </div>
          </div>
        </div>
      )}
      {/* Main Progress Section */}
      <div className="bg-card rounded-lg p-6 shadow-soft border border-border">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-heading text-lg text-foreground">Your Progress</h3>
            <p className="text-sm font-caption text-muted-foreground">
              Keep up the great work!
            </p>
          </div>
          
          {/* Streak Counter */}
          {streakDays > 0 && (
            <div className="flex items-center space-x-2 bg-warning/10 px-3 py-1 rounded-full">
              <Icon name="Zap" size={16} color="var(--color-warning)" />
              <span className="font-data text-sm font-medium text-warning-foreground">
                {streakDays} day streak
              </span>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm font-caption">
            <span className="text-muted-foreground">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-primary font-medium">
              {Math.round(progressPercentage)}% Complete
            </span>
          </div>
          
          <div className="w-full bg-muted rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-primary to-success h-3 rounded-full transition-all duration-500 ease-out relative overflow-hidden"
              style={{ width: `${progressPercentage}%` }}
            >
              {showCelebration && (
                <div className="absolute inset-0 bg-white/30 animate-pulse rounded-full" />
              )}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          {/* Points */}
          <div className={`bg-success/5 rounded-lg p-4 transition-transform duration-300 ${
            animatePoints ? 'animate-scale-celebration' : ''
          }`}>
            <div className="flex items-center space-x-2 mb-1">
              <Icon name="Star" size={20} color="var(--color-success)" />
              <span className="font-caption text-sm text-muted-foreground">Points</span>
            </div>
            <div className="font-data text-2xl font-bold text-success">
              {points?.toLocaleString()}
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-accent/5 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-1">
              <Icon name="Trophy" size={20} color="var(--color-accent)" />
              <span className="font-caption text-sm text-muted-foreground">Achievements</span>
            </div>
            <div className="font-data text-2xl font-bold text-accent">
              {achievements?.length}
            </div>
          </div>
        </div>

        {/* Recent Achievements */}
        {achievements?.length > 0 && (
          <div className="mt-4 pt-4 border-t border-border">
            <h4 className="font-caption font-medium text-sm text-muted-foreground mb-2">
              Recent Achievements
            </h4>
            <div className="space-y-2">
              {achievements?.slice(-3)?.map((achievement, index) => (
                <div key={index} className="flex items-center space-x-3 p-2 bg-muted/50 rounded-lg">
                  <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                    <Icon name="Trophy" size={12} color="white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-caption text-sm font-medium text-foreground">
                      {achievement?.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {achievement?.description}
                    </div>
                  </div>
                  <div className="text-xs font-data text-accent font-medium">
                    +{achievement?.points}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressIndicator;