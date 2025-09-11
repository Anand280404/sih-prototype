import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressStats = ({ 
  weeklyGoal = 5,
  completedLessons = 3,
  totalQuizzes = 12,
  completedQuizzes = 8,
  averageScore = 87,
  timeSpentToday = 45 // minutes
}) => {
  const weeklyProgress = (completedLessons / weeklyGoal) * 100;
  const quizProgress = (completedQuizzes / totalQuizzes) * 100;

  const stats = [
    {
      id: 'weekly-goal',
      title: 'Weekly Goal',
      value: `${completedLessons}/${weeklyGoal}`,
      subtitle: 'lessons completed',
      progress: weeklyProgress,
      icon: 'Target',
      color: 'primary',
      bgColor: 'bg-primary/10'
    },
    {
      id: 'quiz-progress',
      title: 'Quiz Progress',
      value: `${completedQuizzes}/${totalQuizzes}`,
      subtitle: 'quizzes completed',
      progress: quizProgress,
      icon: 'Brain',
      color: 'secondary',
      bgColor: 'bg-secondary/10'
    },
    {
      id: 'average-score',
      title: 'Average Score',
      value: `${averageScore}%`,
      subtitle: 'across all quizzes',
      progress: averageScore,
      icon: 'TrendingUp',
      color: 'success',
      bgColor: 'bg-success/10'
    },
    {
      id: 'time-today',
      title: 'Today\'s Learning',
      value: `${timeSpentToday}m`,
      subtitle: 'time spent learning',
      progress: Math.min((timeSpentToday / 60) * 100, 100), // Goal: 1 hour
      icon: 'Clock',
      color: 'warning',
      bgColor: 'bg-warning/10'
    }
  ];

  const getProgressColor = (progress, color) => {
    if (progress >= 80) return 'success';
    if (progress >= 60) return color;
    return 'muted-foreground';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-2xl text-foreground">Your Progress</h2>
        <div className="flex items-center space-x-2 text-muted-foreground">
          <Icon name="Calendar" size={16} />
          <span className="font-caption text-sm">This Week</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {stats?.map((stat) => {
          const progressColor = getProgressColor(stat?.progress, stat?.color);
          
          return (
            <div
              key={stat?.id}
              className={`${stat?.bgColor} border border-${stat?.color}/20 rounded-xl p-4 hover:shadow-soft transition-all duration-300`}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className={`w-8 h-8 bg-${stat?.color} rounded-lg flex items-center justify-center`}>
                    <Icon name={stat?.icon} size={16} color="white" />
                  </div>
                  <span className="font-caption font-medium text-sm text-foreground">
                    {stat?.title}
                  </span>
                </div>
                
                <div className="text-right">
                  <div className={`font-data text-lg font-bold text-${stat?.color}`}>
                    {stat?.value}
                  </div>
                </div>
              </div>
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className={`bg-${progressColor} h-2 rounded-full transition-all duration-500 ease-out`}
                    style={{ width: `${Math.min(stat?.progress, 100)}%` }}
                  />
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="font-caption text-xs text-muted-foreground">
                    {stat?.subtitle}
                  </span>
                  <span className={`font-data text-xs font-medium text-${progressColor}`}>
                    {Math.round(stat?.progress)}%
                  </span>
                </div>
              </div>
              {/* Status Message */}
              <div className="mt-3">
                {stat?.progress >= 100 ? (
                  <div className="flex items-center space-x-1 text-success">
                    <Icon name="CheckCircle" size={12} />
                    <span className="font-caption text-xs font-medium">Goal achieved!</span>
                  </div>
                ) : stat?.progress >= 80 ? (
                  <div className="flex items-center space-x-1 text-warning">
                    <Icon name="Zap" size={12} />
                    <span className="font-caption text-xs font-medium">Almost there!</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-1 text-muted-foreground">
                    <Icon name="ArrowUp" size={12} />
                    <span className="font-caption text-xs font-medium">Keep going!</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {/* Weekly Summary */}
      <div className="bg-card rounded-xl border border-border p-4 shadow-soft">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-heading text-lg text-foreground">This Week's Summary</h3>
          <Icon name="Calendar" size={20} color="var(--color-primary)" />
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="font-data text-2xl font-bold text-primary mb-1">
              {completedLessons}
            </div>
            <div className="font-caption text-xs text-muted-foreground">
              Lessons Completed
            </div>
          </div>
          
          <div>
            <div className="font-data text-2xl font-bold text-secondary mb-1">
              {completedQuizzes}
            </div>
            <div className="font-caption text-xs text-muted-foreground">
              Quizzes Taken
            </div>
          </div>
          
          <div>
            <div className="font-data text-2xl font-bold text-success mb-1">
              {Math.round((timeSpentToday * 7) / 60)}h
            </div>
            <div className="font-caption text-xs text-muted-foreground">
              Total Time
            </div>
          </div>
        </div>

        {/* Motivational Message */}
        <div className="mt-4 p-3 bg-primary/5 rounded-lg border border-primary/10">
          <div className="flex items-center space-x-2">
            <Icon name="Sparkles" size={16} color="var(--color-primary)" />
            <span className="font-caption text-sm text-primary font-medium">
              {weeklyProgress >= 100 ? 
                "Amazing! You've exceeded your weekly goal!" :
                weeklyProgress >= 80 ?
                "Great progress! You're almost at your weekly goal!" : "Keep learning! You're making great progress!"
              }
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressStats;