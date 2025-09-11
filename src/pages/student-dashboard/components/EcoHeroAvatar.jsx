import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const EcoHeroAvatar = ({ 
  points = 1250, 
  level = 5, 
  streakDays = 7, 
  nextLevelPoints = 1500,
  showLevelUp = false 
}) => {
  const [animatePoints, setAnimatePoints] = useState(false);
  const [showCelebration, setShowCelebration] = useState(showLevelUp);

  useEffect(() => {
    if (showLevelUp) {
      setShowCelebration(true);
      const timer = setTimeout(() => setShowCelebration(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showLevelUp]);

  const progressPercentage = ((points % 300) / 300) * 100;
  const avatarImage = `https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face`;

  const levelTitles = {
    1: "Eco Sprout",
    2: "Green Explorer", 
    3: "Nature Guardian",
    4: "Earth Protector",
    5: "Eco Champion",
    6: "Planet Hero"
  };

  return (
    <div className="relative bg-gradient-to-br from-success/10 to-primary/10 rounded-2xl p-6 border border-success/20">
      {/* Level Up Celebration */}
      {showCelebration && (
        <div className="absolute inset-0 bg-success/20 rounded-2xl flex items-center justify-center z-10 animate-gentle-bounce">
          <div className="text-center">
            <Icon name="Trophy" size={48} color="var(--color-success)" />
            <div className="font-heading text-2xl text-success mt-2">Level Up!</div>
            <div className="font-caption text-success-foreground">You're now a {levelTitles?.[level]}!</div>
          </div>
        </div>
      )}
      <div className="flex items-center space-x-6">
        {/* Avatar Section */}
        <div className="relative">
          <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-success shadow-soft">
            <Image 
              src={avatarImage}
              alt="Eco Hero Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Level Badge */}
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-success rounded-full flex items-center justify-center border-2 border-white shadow-soft">
            <span className="font-data text-xs font-bold text-white">{level}</span>
          </div>

          {/* Streak Fire */}
          {streakDays > 0 && (
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-warning rounded-full flex items-center justify-center border-2 border-white">
              <Icon name="Zap" size={12} color="white" />
            </div>
          )}
        </div>

        {/* Progress Info */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="font-heading text-lg text-foreground">Welcome back, Eco Hero!</h3>
              <p className="font-caption text-sm text-success font-medium">{levelTitles?.[level]}</p>
            </div>
            
            <div className={`text-right transition-transform duration-300 ${animatePoints ? 'animate-scale-celebration' : ''}`}>
              <div className="flex items-center space-x-1">
                <Icon name="Star" size={20} color="var(--color-success)" />
                <span className="font-data text-xl font-bold text-success">{points?.toLocaleString()}</span>
              </div>
              <p className="font-caption text-xs text-muted-foreground">Total Points</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-caption text-muted-foreground">Level {level} Progress</span>
              <span className="font-caption text-primary font-medium">
                {nextLevelPoints - points} points to Level {level + 1}
              </span>
            </div>
            
            <div className="w-full bg-muted rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-success to-primary h-3 rounded-full transition-all duration-500 ease-out relative overflow-hidden"
                style={{ width: `${progressPercentage}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full opacity-50" />
              </div>
            </div>
          </div>

          {/* Streak Counter */}
          {streakDays > 0 && (
            <div className="flex items-center space-x-2 mt-3 bg-warning/10 px-3 py-1 rounded-full w-fit">
              <Icon name="Flame" size={16} color="var(--color-warning)" />
              <span className="font-data text-sm font-medium text-warning-foreground">
                {streakDays} day learning streak!
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EcoHeroAvatar;