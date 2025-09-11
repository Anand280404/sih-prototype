import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const AchievementShowcase = ({ 
  recentAchievements = [],
  totalBadges = 12,
  showNewBadge = false 
}) => {
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const [showCelebration, setShowCelebration] = useState(showNewBadge);

  // Mock achievements data
  const mockAchievements = [
    {
      id: 1,
      name: "Water Warrior",
      description: "Completed 5 water conservation lessons",
      icon: "Droplets",
      color: "secondary",
      earnedDate: "2025-09-10",
      points: 100,
      rarity: "common",
      image: "https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg?w=200&h=200&fit=crop"
    },
    {
      id: 2,
      name: "Quiz Master",
      description: "Scored 100% on 3 consecutive quizzes",
      icon: "Trophy",
      color: "warning",
      earnedDate: "2025-09-09",
      points: 150,
      rarity: "rare",
      image: "https://images.pixabay.com/photo/2017/05/25/21/25/quiz-2343519_1280.jpg?w=200&h=200&fit=crop"
    },
    {
      id: 3,
      name: "Streak Champion",
      description: "Maintained 7-day learning streak",
      icon: "Zap",
      color: "accent",
      earnedDate: "2025-09-11",
      points: 200,
      rarity: "epic",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=200&h=200&fit=crop"
    },
    {
      id: 4,
      name: "Green Thumb",
      description: "Learned about 10 different plants",
      icon: "Leaf",
      color: "success",
      earnedDate: "2025-09-08",
      points: 75,
      rarity: "common",
      image: "https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?w=200&h=200&fit=crop"
    }
  ];

  const achievements = recentAchievements?.length > 0 ? recentAchievements : mockAchievements;

  useEffect(() => {
    if (showNewBadge) {
      setShowCelebration(true);
      const timer = setTimeout(() => setShowCelebration(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showNewBadge]);

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'common': return 'border-muted-foreground';
      case 'rare': return 'border-secondary';
      case 'epic': return 'border-accent';
      case 'legendary': return 'border-warning';
      default: return 'border-muted-foreground';
    }
  };

  const getRarityBg = (rarity) => {
    switch (rarity) {
      case 'common': return 'bg-muted/20';
      case 'rare': return 'bg-secondary/20';
      case 'epic': return 'bg-accent/20';
      case 'legendary': return 'bg-warning/20';
      default: return 'bg-muted/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-2xl text-foreground">Your Achievements</h2>
          <p className="font-caption text-sm text-muted-foreground">
            {totalBadges} badges collected • Keep learning to earn more!
          </p>
        </div>
        
        {showCelebration && (
          <div className="animate-gentle-bounce">
            <div className="flex items-center space-x-2 bg-success text-success-foreground px-3 py-1 rounded-full">
              <Icon name="Star" size={16} />
              <span className="font-caption text-sm font-medium">New Badge!</span>
            </div>
          </div>
        )}
      </div>
      {/* Recent Achievements Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {achievements?.slice(0, 4)?.map((achievement) => (
          <div
            key={achievement?.id}
            onClick={() => setSelectedAchievement(achievement)}
            className={`${getRarityBg(achievement?.rarity)} ${getRarityColor(achievement?.rarity)} border-2 rounded-xl p-4 cursor-pointer hover:shadow-soft transition-all duration-300 hover:scale-105 group`}
          >
            {/* Badge Image/Icon */}
            <div className="relative mb-3">
              <div className="w-16 h-16 mx-auto rounded-full overflow-hidden border-2 border-white shadow-soft">
                <Image 
                  src={achievement?.image}
                  alt={achievement?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Rarity Indicator */}
              <div className={`absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center border-2 border-white ${
                achievement?.rarity === 'epic' ? 'bg-accent' :
                achievement?.rarity === 'rare' ? 'bg-secondary' :
                achievement?.rarity === 'legendary'? 'bg-warning' : 'bg-muted-foreground'
              }`}>
                <Icon name={achievement?.icon} size={12} color="white" />
              </div>
            </div>

            {/* Badge Info */}
            <div className="text-center">
              <h3 className="font-caption font-medium text-sm text-foreground mb-1 group-hover:text-primary transition-colors">
                {achievement?.name}
              </h3>
              <p className="font-caption text-xs text-muted-foreground line-clamp-2">
                {achievement?.description}
              </p>
              
              {/* Points */}
              <div className="flex items-center justify-center space-x-1 mt-2">
                <Icon name="Star" size={12} color="var(--color-success)" />
                <span className="font-data text-xs font-medium text-success">
                  +{achievement?.points}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* View All Button */}
      <div className="text-center">
        <Button variant="outline" iconName="Trophy" iconPosition="left">
          View All Badges ({totalBadges})
        </Button>
      </div>
      {/* Achievement Detail Modal */}
      {selectedAchievement && (
        <div className="fixed inset-0 z-[1200] bg-black/50 flex items-center justify-center p-4" onClick={() => setSelectedAchievement(null)}>
          <div className="bg-card rounded-2xl p-6 max-w-sm w-full shadow-large" onClick={(e) => e?.stopPropagation()}>
            {/* Close Button */}
            <div className="flex justify-end mb-4">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setSelectedAchievement(null)}
              >
                <Icon name="X" size={20} />
              </Button>
            </div>

            {/* Achievement Details */}
            <div className="text-center space-y-4">
              <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-success shadow-soft">
                <Image 
                  src={selectedAchievement?.image}
                  alt={selectedAchievement?.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h3 className="font-heading text-xl text-foreground mb-2">
                  {selectedAchievement?.name}
                </h3>
                <p className="font-caption text-muted-foreground mb-4">
                  {selectedAchievement?.description}
                </p>
              </div>

              <div className="flex items-center justify-center space-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <Icon name="Star" size={16} color="var(--color-success)" />
                  <span className="font-data font-medium text-success">
                    {selectedAchievement?.points} points
                  </span>
                </div>
                
                <div className="flex items-center space-x-1">
                  <Icon name="Calendar" size={16} color="var(--color-muted-foreground)" />
                  <span className="font-caption text-muted-foreground">
                    {new Date(selectedAchievement.earnedDate)?.toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className={`inline-block px-3 py-1 rounded-full text-xs font-caption font-medium capitalize ${
                selectedAchievement?.rarity === 'epic' ? 'bg-accent/20 text-accent' :
                selectedAchievement?.rarity === 'rare' ? 'bg-secondary/20 text-secondary' :
                selectedAchievement?.rarity === 'legendary'? 'bg-warning/20 text-warning' : 'bg-muted text-muted-foreground'
              }`}>
                {selectedAchievement?.rarity} badge
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AchievementShowcase;