import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuizResults = ({ 
  score, 
  totalQuestions, 
  pointsEarned, 
  timeSpent, 
  correctAnswers, 
  streak,
  newBadges = [],
  onRestart,
  onContinue,
  onReview 
}) => {
  const [showCelebration, setShowCelebration] = useState(false);
  const [currentBadge, setCurrentBadge] = useState(0);

  const percentage = Math.round((score / totalQuestions) * 100);
  const minutes = Math.floor(timeSpent / 60);
  const seconds = timeSpent % 60;

  useEffect(() => {
    setShowCelebration(true);
    const timer = setTimeout(() => setShowCelebration(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const getPerformanceMessage = () => {
    if (percentage >= 90) return "Outstanding! You're an eco-champion! 🏆";
    if (percentage >= 80) return "Excellent work! You're doing great! ⭐";
    if (percentage >= 70) return "Good job! Keep learning and growing! 🌱";
    if (percentage >= 60) return "Nice effort! Practice makes perfect! 💪";
    return "Keep trying! Every attempt makes you stronger! 🌟";
  };

  const getPerformanceColor = () => {
    if (percentage >= 80) return 'text-success';
    if (percentage >= 60) return 'text-warning';
    return 'text-accent';
  };

  const achievements = [
    {
      icon: 'Target',
      label: 'Questions Answered',
      value: `${score}/${totalQuestions}`,
      color: 'var(--color-primary)'
    },
    {
      icon: 'Star',
      label: 'Points Earned',
      value: pointsEarned?.toLocaleString(),
      color: 'var(--color-success)'
    },
    {
      icon: 'Clock',
      label: 'Time Spent',
      value: `${minutes}:${seconds?.toString()?.padStart(2, '0')}`,
      color: 'var(--color-warning)'
    },
    {
      icon: 'Zap',
      label: 'Best Streak',
      value: `${streak} in a row`,
      color: 'var(--color-accent)'
    }
  ];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-6">
        {/* Celebration Header */}
        <div className={`text-center space-y-4 ${showCelebration ? 'animate-gentle-bounce' : ''}`}>
          <div className="w-24 h-24 bg-gradient-to-br from-success to-primary rounded-full flex items-center justify-center mx-auto shadow-large">
            <Icon name="Trophy" size={48} color="white" />
          </div>
          
          <div>
            <h1 className="font-heading text-3xl text-foreground mb-2">
              Quiz Complete!
            </h1>
            <p className={`font-caption text-lg ${getPerformanceColor()}`}>
              {getPerformanceMessage()}
            </p>
          </div>

          {/* Score Circle */}
          <div className="relative w-32 h-32 mx-auto">
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="var(--color-muted)"
                strokeWidth="6"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="var(--color-success)"
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 45}`}
                strokeDashoffset={`${2 * Math.PI * 45 * (1 - percentage / 100)}`}
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-data text-2xl font-bold text-success">
                {percentage}%
              </span>
              <span className="text-xs font-caption text-muted-foreground">
                Score
              </span>
            </div>
          </div>
        </div>

        {/* Achievement Stats */}
        <div className="bg-card rounded-lg shadow-soft border border-border p-6">
          <h3 className="font-heading text-lg text-foreground mb-4 text-center">
            Your Achievement Summary
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {achievements?.map((achievement, index) => (
              <div key={index} className="text-center space-y-2">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto"
                     style={{ backgroundColor: `${achievement?.color}20` }}>
                  <Icon name={achievement?.icon} size={24} color={achievement?.color} />
                </div>
                <div>
                  <div className="font-data text-lg font-bold text-foreground">
                    {achievement?.value}
                  </div>
                  <div className="font-caption text-xs text-muted-foreground">
                    {achievement?.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* New Badges */}
        {newBadges?.length > 0 && (
          <div className="bg-card rounded-lg shadow-soft border border-border p-6">
            <h3 className="font-heading text-lg text-foreground mb-4 text-center">
              New Badges Earned! 🎉
            </h3>
            
            <div className="flex justify-center space-x-4">
              {newBadges?.map((badge, index) => (
                <div key={index} className="text-center space-y-2 animate-gentle-bounce">
                  <div className="w-16 h-16 bg-gradient-to-br from-accent to-warning rounded-full flex items-center justify-center shadow-large">
                    <Icon name={badge?.icon} size={32} color="white" />
                  </div>
                  <div>
                    <div className="font-caption font-medium text-foreground">
                      {badge?.name}
                    </div>
                    <div className="font-caption text-xs text-muted-foreground">
                      {badge?.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            variant="outline"
            onClick={onReview}
            iconName="Eye"
            iconPosition="left"
            className="w-full"
          >
            Review Answers
          </Button>
          
          <Button
            variant="secondary"
            onClick={onRestart}
            iconName="RotateCcw"
            iconPosition="left"
            className="w-full"
          >
            Try Again
          </Button>
          
          <Button
            variant="default"
            onClick={onContinue}
            iconName="ArrowRight"
            iconPosition="right"
            className="w-full"
          >
            Continue Learning
          </Button>
        </div>

        {/* Motivational Footer */}
        <div className="text-center space-y-2">
          <p className="font-caption text-sm text-muted-foreground">
            Every quiz makes you a better environmental guardian! 🌍
          </p>
          <div className="flex items-center justify-center space-x-4 text-xs font-caption text-muted-foreground">
            <span>Share your progress</span>
            <div className="flex space-x-2">
              <Icon name="Share2" size={16} />
              <Icon name="Heart" size={16} />
              <Icon name="Star" size={16} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizResults;