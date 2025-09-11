import React from 'react';
import Icon from '../../../components/AppIcon';

const StudyProgress = ({ 
  studiedCards, 
  totalCards, 
  sessionTime, 
  streak, 
  correctAnswers,
  difficultyStats = { easy: 0, medium: 0, hard: 0 }
}) => {
  const progressPercentage = totalCards > 0 ? (studiedCards / totalCards) * 100 : 0;
  const accuracy = studiedCards > 0 ? (correctAnswers / studiedCards) * 100 : 0;

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-soft border border-border">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-heading text-lg text-foreground">Study Progress</h3>
        <div className="flex items-center space-x-2 bg-success/10 px-3 py-1 rounded-full">
          <Icon name="Zap" size={16} color="var(--color-success)" />
          <span className="font-data text-sm font-medium text-success">
            {streak} day streak
          </span>
        </div>
      </div>
      {/* Main Progress */}
      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="font-caption text-sm text-muted-foreground">
            Cards Reviewed
          </span>
          <span className="font-data font-bold text-primary">
            {studiedCards} / {totalCards}
          </span>
        </div>
        
        <div className="w-full bg-muted rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-primary to-success h-3 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        
        <div className="text-center">
          <span className="font-data text-2xl font-bold text-primary">
            {Math.round(progressPercentage)}%
          </span>
          <span className="font-caption text-sm text-muted-foreground ml-2">
            Complete
          </span>
        </div>
      </div>
      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Session Time */}
        <div className="bg-accent/5 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Clock" size={18} color="var(--color-accent)" />
            <span className="font-caption text-sm text-muted-foreground">Time</span>
          </div>
          <div className="font-data text-xl font-bold text-accent">
            {formatTime(sessionTime)}
          </div>
        </div>

        {/* Accuracy */}
        <div className="bg-success/5 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Target" size={18} color="var(--color-success)" />
            <span className="font-caption text-sm text-muted-foreground">Accuracy</span>
          </div>
          <div className="font-data text-xl font-bold text-success">
            {Math.round(accuracy)}%
          </div>
        </div>
      </div>
      {/* Difficulty Breakdown */}
      <div className="space-y-3">
        <h4 className="font-caption font-medium text-sm text-muted-foreground">
          Difficulty Breakdown
        </h4>
        
        {/* Easy */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success rounded-full"></div>
            <span className="font-caption text-sm">Easy</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-16 bg-muted rounded-full h-2">
              <div 
                className="bg-success h-2 rounded-full transition-all duration-300"
                style={{ 
                  width: `${studiedCards > 0 ? (difficultyStats?.easy / studiedCards) * 100 : 0}%` 
                }}
              />
            </div>
            <span className="font-data text-sm font-medium w-8 text-right">
              {difficultyStats?.easy}
            </span>
          </div>
        </div>

        {/* Medium */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-warning rounded-full"></div>
            <span className="font-caption text-sm">Medium</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-16 bg-muted rounded-full h-2">
              <div 
                className="bg-warning h-2 rounded-full transition-all duration-300"
                style={{ 
                  width: `${studiedCards > 0 ? (difficultyStats?.medium / studiedCards) * 100 : 0}%` 
                }}
              />
            </div>
            <span className="font-data text-sm font-medium w-8 text-right">
              {difficultyStats?.medium}
            </span>
          </div>
        </div>

        {/* Hard */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-error rounded-full"></div>
            <span className="font-caption text-sm">Hard</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-16 bg-muted rounded-full h-2">
              <div 
                className="bg-error h-2 rounded-full transition-all duration-300"
                style={{ 
                  width: `${studiedCards > 0 ? (difficultyStats?.hard / studiedCards) * 100 : 0}%` 
                }}
              />
            </div>
            <span className="font-data text-sm font-medium w-8 text-right">
              {difficultyStats?.hard}
            </span>
          </div>
        </div>
      </div>
      {/* Motivational Message */}
      {progressPercentage > 0 && (
        <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <Icon name="Sparkles" size={16} color="var(--color-primary)" />
            </div>
            <div>
              <p className="font-caption text-sm text-foreground">
                {progressPercentage === 100 
                  ? "Amazing! You've completed all flashcards in this session! 🎉"
                  : progressPercentage >= 75
                  ? "You're doing great! Keep up the excellent work! 💪"
                  : progressPercentage >= 50
                  ? "Halfway there! You're making excellent progress! 🌟" :"Great start! Every card you review makes you smarter! 🚀"
                }
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudyProgress;