import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuizHeader = ({ 
  currentQuestion, 
  totalQuestions, 
  timeRemaining, 
  points, 
  streak,
  onExit 
}) => {
  const progressPercentage = (currentQuestion / totalQuestions) * 100;
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  return (
    <div className="bg-card border-b border-border shadow-soft">
      <div className="max-w-4xl mx-auto px-4 py-4">
        {/* Top Row */}
        <div className="flex items-center justify-between mb-4">
          {/* Exit Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onExit}
            iconName="X"
            iconPosition="left"
            className="text-muted-foreground hover:text-foreground"
          >
            Exit Quiz
          </Button>

          {/* Stats */}
          <div className="flex items-center space-x-4">
            {/* Timer */}
            <div className="flex items-center space-x-2 bg-warning/10 px-3 py-1 rounded-full">
              <Icon name="Clock" size={16} color="var(--color-warning)" />
              <span className="font-data text-sm font-medium text-warning-foreground">
                {minutes}:{seconds?.toString()?.padStart(2, '0')}
              </span>
            </div>

            {/* Points */}
            <div className="flex items-center space-x-2 bg-success/10 px-3 py-1 rounded-full">
              <Icon name="Star" size={16} color="var(--color-success)" />
              <span className="font-data text-sm font-medium text-success-foreground">
                {points} pts
              </span>
            </div>

            {/* Streak */}
            {streak > 0 && (
              <div className="flex items-center space-x-2 bg-accent/10 px-3 py-1 rounded-full">
                <Icon name="Zap" size={16} color="var(--color-accent)" />
                <span className="font-data text-sm font-medium text-accent-foreground">
                  {streak} streak
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Progress Section */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="font-caption text-sm text-muted-foreground">
              Question {currentQuestion} of {totalQuestions}
            </span>
            <span className="font-caption text-sm text-primary font-medium">
              {Math.round(progressPercentage)}% Complete
            </span>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-muted rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-primary to-success h-3 rounded-full transition-all duration-500 ease-out relative overflow-hidden"
              style={{ width: `${progressPercentage}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full opacity-50" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizHeader;