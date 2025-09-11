import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const UpcomingChallenges = ({ upcomingChallenges, onSetReminder }) => {
  const [reminders, setReminders] = useState(new Set());

  const handleSetReminder = (challengeId) => {
    const newReminders = new Set(reminders);
    if (reminders?.has(challengeId)) {
      newReminders?.delete(challengeId);
    } else {
      newReminders?.add(challengeId);
    }
    setReminders(newReminders);
    onSetReminder(challengeId, !reminders?.has(challengeId));
  };

  const getDaysUntil = (dateString) => {
    const today = new Date();
    const challengeDate = new Date(dateString);
    const diffTime = challengeDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays < 7) return `In ${diffDays} days`;
    return `In ${Math.ceil(diffDays / 7)} week${Math.ceil(diffDays / 7) > 1 ? 's' : ''}`;
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'text-success bg-success/10';
      case 'medium': return 'text-warning bg-warning/10';
      case 'hard': return 'text-error bg-error/10';
      default: return 'text-primary bg-primary/10';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'photo': return 'Camera';
      case 'action': return 'Zap';
      case 'family': return 'Users';
      case 'knowledge': return 'Brain';
      default: return 'Target';
    }
  };

  const groupedChallenges = upcomingChallenges?.reduce((groups, challenge) => {
    const daysUntil = getDaysUntil(challenge?.startDate);
    if (!groups?.[daysUntil]) {
      groups[daysUntil] = [];
    }
    groups?.[daysUntil]?.push(challenge);
    return groups;
  }, {});

  const sortedGroups = Object.keys(groupedChallenges)?.sort((a, b) => {
    const order = ['Today', 'Tomorrow'];
    const aIndex = order?.indexOf(a);
    const bIndex = order?.indexOf(b);
    
    if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
    if (aIndex !== -1) return -1;
    if (bIndex !== -1) return 1;
    
    return a?.localeCompare(b);
  });

  if (upcomingChallenges?.length === 0) {
    return (
      <div className="bg-card rounded-xl shadow-soft border border-border p-8 text-center">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Calendar" size={32} color="var(--color-muted-foreground)" />
        </div>
        <h3 className="font-heading text-xl text-foreground mb-2">No Upcoming Challenges</h3>
        <p className="text-muted-foreground font-caption">
          New challenges are added regularly. Check back soon!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-card rounded-xl shadow-soft border border-border p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-heading text-2xl text-foreground mb-2">Coming Soon</h2>
            <p className="text-muted-foreground font-caption">
              Get ready for these exciting eco-challenges!
            </p>
          </div>
          <div className="text-right">
            <div className="font-data text-3xl font-bold text-primary">
              {upcomingChallenges?.length}
            </div>
            <div className="text-sm text-muted-foreground">Upcoming</div>
          </div>
        </div>
      </div>
      {/* Grouped Challenges */}
      {sortedGroups?.map((timeGroup) => (
        <div key={timeGroup} className="space-y-4">
          {/* Time Group Header */}
          <div className="flex items-center space-x-3">
            <div className={`px-3 py-1 rounded-full text-sm font-caption font-medium ${
              timeGroup === 'Today' ? 'bg-primary text-primary-foreground' :
              timeGroup === 'Tomorrow' ? 'bg-accent text-accent-foreground' :
              'bg-muted text-muted-foreground'
            }`}>
              {timeGroup}
            </div>
            <div className="flex-1 h-px bg-border"></div>
            <span className="text-sm font-caption text-muted-foreground">
              {groupedChallenges?.[timeGroup]?.length} challenge{groupedChallenges?.[timeGroup]?.length !== 1 ? 's' : ''}
            </span>
          </div>

          {/* Challenges Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {groupedChallenges?.[timeGroup]?.map((challenge) => (
              <div key={challenge?.id} className="bg-card rounded-lg shadow-soft border border-border overflow-hidden hover:shadow-large transition-all duration-300">
                {/* Challenge Image */}
                <div className="relative h-32 overflow-hidden">
                  <Image
                    src={challenge?.image}
                    alt={challenge?.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Overlay Elements */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  
                  {/* Difficulty Badge */}
                  <div className="absolute top-2 left-2">
                    <div className={`px-2 py-1 rounded-full text-xs font-caption font-medium ${getDifficultyColor(challenge?.difficulty)}`}>
                      {challenge?.difficulty?.charAt(0)?.toUpperCase() + challenge?.difficulty?.slice(1)}
                    </div>
                  </div>

                  {/* Special Badge */}
                  {challenge?.isSpecial && (
                    <div className="absolute top-2 right-2">
                      <div className="px-2 py-1 bg-accent text-accent-foreground rounded-full text-xs font-caption font-medium">
                        <Icon name="Sparkles" size={12} className="inline mr-1" />
                        Special
                      </div>
                    </div>
                  )}

                  {/* Points */}
                  <div className="absolute bottom-2 right-2 flex items-center space-x-1 bg-black/70 text-white px-2 py-1 rounded-full">
                    <Icon name="Star" size={12} />
                    <span className="font-data text-xs font-medium">+{challenge?.points}</span>
                  </div>
                </div>

                {/* Challenge Content */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-heading text-lg text-foreground flex-1 mr-2">
                      {challenge?.title}
                    </h3>
                    <div className="flex items-center space-x-1 text-primary">
                      <Icon name={getTypeIcon(challenge?.type)} size={16} />
                    </div>
                  </div>

                  <p className="text-muted-foreground font-caption text-sm mb-3 line-clamp-2">
                    {challenge?.description}
                  </p>

                  {/* Challenge Meta */}
                  <div className="flex items-center justify-between text-xs font-caption text-muted-foreground mb-3">
                    <div className="flex items-center space-x-1">
                      <Icon name="Clock" size={12} />
                      <span>{challenge?.estimatedTime || '15 min'}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Users" size={12} />
                      <span>{challenge?.participants || 0} signed up</span>
                    </div>
                  </div>

                  {/* Reminder Button */}
                  <Button
                    onClick={() => handleSetReminder(challenge?.id)}
                    variant={reminders?.has(challenge?.id) ? 'default' : 'outline'}
                    size="sm"
                    className="w-full"
                    iconName={reminders?.has(challenge?.id) ? 'BellRing' : 'Bell'}
                    iconPosition="left"
                  >
                    {reminders?.has(challenge?.id) ? 'Reminder Set' : 'Set Reminder'}
                  </Button>

                  {/* Preview Features */}
                  {challenge?.features && challenge?.features?.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-border">
                      <div className="flex flex-wrap gap-1">
                        {challenge?.features?.slice(0, 3)?.map((feature, index) => (
                          <span key={index} className="text-xs font-caption bg-muted text-muted-foreground px-2 py-1 rounded-full">
                            {feature}
                          </span>
                        ))}
                        {challenge?.features?.length > 3 && (
                          <span className="text-xs font-caption text-muted-foreground px-2 py-1">
                            +{challenge?.features?.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      {/* Weekly Preview */}
      <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl border border-primary/20 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <Icon name="Calendar" size={20} color="white" />
          </div>
          <div>
            <h3 className="font-heading text-lg text-foreground">This Week's Theme</h3>
            <p className="text-sm font-caption text-muted-foreground">Ocean Conservation Week</p>
          </div>
        </div>
        
        <p className="text-muted-foreground font-caption mb-4">
          Join us for a special week focused on protecting our oceans! Complete ocean-themed challenges to earn bonus rewards and help make a real difference.
        </p>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1 text-accent">
            <Icon name="Gift" size={16} />
            <span className="font-caption text-sm font-medium">Special Rewards</span>
          </div>
          <div className="flex items-center space-x-1 text-success">
            <Icon name="Users" size={16} />
            <span className="font-caption text-sm font-medium">Community Event</span>
          </div>
          <div className="flex items-center space-x-1 text-warning">
            <Icon name="Star" size={16} />
            <span className="font-caption text-sm font-medium">Double Points</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingChallenges;