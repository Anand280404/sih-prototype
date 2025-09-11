import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ChallengeCard = ({ challenge, onStartChallenge, onCompleteChallenge, userProgress = {} }) => {
  const [timeLeft, setTimeLeft] = useState('');
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const endTime = new Date(challenge.endTime);
      const timeDiff = endTime - now;

      if (timeDiff <= 0) {
        setTimeLeft('Expired');
        setIsExpired(true);
        return;
      }

      const hours = Math.floor(timeDiff / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      setTimeLeft(`${hours}h ${minutes}m`);
    };

    updateTimer();
    const timer = setInterval(updateTimer, 60000);
    return () => clearInterval(timer);
  }, [challenge?.endTime]);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'text-success bg-success/10';
      case 'medium': return 'text-warning bg-warning/10';
      case 'hard': return 'text-error bg-error/10';
      default: return 'text-primary bg-primary/10';
    }
  };

  const getProgressPercentage = () => {
    if (!userProgress?.[challenge?.id]) return 0;
    const completed = userProgress?.[challenge?.id]?.completedSteps || 0;
    return (completed / challenge?.totalSteps) * 100;
  };

  const isCompleted = userProgress?.[challenge?.id]?.completed || false;
  const isStarted = userProgress?.[challenge?.id]?.started || false;

  return (
    <div className={`bg-card rounded-xl border-2 shadow-soft overflow-hidden transition-all duration-300 hover:shadow-large ${
      isCompleted ? 'border-success' : isStarted ? 'border-primary' : 'border-border'
    }`}>
      {/* Challenge Header */}
      <div className="relative">
        <div className="h-48 overflow-hidden">
          <Image
            src={challenge?.image}
            alt={challenge?.title}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Overlay Elements */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
          {/* Difficulty Badge */}
          <div className={`px-3 py-1 rounded-full text-xs font-caption font-medium ${getDifficultyColor(challenge?.difficulty)}`}>
            <Icon name="Star" size={12} className="inline mr-1" />
            {challenge?.difficulty?.charAt(0)?.toUpperCase() + challenge?.difficulty?.slice(1)}
          </div>

          {/* Timer */}
          <div className={`px-3 py-1 rounded-full text-xs font-data font-medium ${
            isExpired ? 'bg-error text-error-foreground' : 'bg-warning text-warning-foreground'
          }`}>
            <Icon name="Clock" size={12} className="inline mr-1" />
            {timeLeft}
          </div>
        </div>

        {/* Completion Badge */}
        {isCompleted && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center shadow-large">
              <Icon name="CheckCircle" size={32} color="white" />
            </div>
          </div>
        )}
      </div>
      {/* Challenge Content */}
      <div className="p-6">
        {/* Title and Points */}
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-heading text-xl text-foreground flex-1 mr-4">
            {challenge?.title}
          </h3>
          <div className="flex items-center space-x-1 bg-accent/10 px-2 py-1 rounded-full">
            <Icon name="Star" size={16} color="var(--color-accent)" />
            <span className="font-data text-sm font-medium text-accent">
              +{challenge?.points}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-muted-foreground font-caption mb-4 line-clamp-3">
          {challenge?.description}
        </p>

        {/* Challenge Type */}
        <div className="flex items-center space-x-2 mb-4">
          <Icon name={challenge?.typeIcon} size={16} color="var(--color-primary)" />
          <span className="text-sm font-caption text-primary font-medium">
            {challenge?.type}
          </span>
        </div>

        {/* Progress Bar (if started) */}
        {isStarted && !isCompleted && (
          <div className="mb-4">
            <div className="flex justify-between text-xs font-caption text-muted-foreground mb-1">
              <span>Progress</span>
              <span>{userProgress?.[challenge?.id]?.completedSteps || 0}/{challenge?.totalSteps} steps</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${getProgressPercentage()}%` }}
              />
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="flex space-x-2">
          {!isStarted && !isExpired && (
            <Button
              onClick={() => onStartChallenge(challenge)}
              className="flex-1"
              iconName="Play"
              iconPosition="left"
            >
              Start Challenge
            </Button>
          )}

          {isStarted && !isCompleted && !isExpired && (
            <Button
              onClick={() => onCompleteChallenge(challenge)}
              variant="outline"
              className="flex-1"
              iconName="ArrowRight"
              iconPosition="right"
            >
              Continue
            </Button>
          )}

          {isCompleted && (
            <Button
              variant="success"
              className="flex-1"
              iconName="CheckCircle"
              iconPosition="left"
              disabled
            >
              Completed
            </Button>
          )}

          {isExpired && !isCompleted && (
            <Button
              variant="ghost"
              className="flex-1"
              disabled
            >
              Challenge Expired
            </Button>
          )}
        </div>

        {/* Bonus Info */}
        {challenge?.bonusReward && (
          <div className="mt-3 p-3 bg-accent/5 rounded-lg border border-accent/20">
            <div className="flex items-center space-x-2">
              <Icon name="Gift" size={16} color="var(--color-accent)" />
              <span className="text-sm font-caption text-accent font-medium">
                Bonus: {challenge?.bonusReward}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChallengeCard;