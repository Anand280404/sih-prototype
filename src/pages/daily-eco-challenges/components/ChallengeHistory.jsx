import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ChallengeHistory = ({ completedChallenges, onViewChallenge }) => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  const filterOptions = [
    { value: 'all', label: 'All Challenges', icon: 'List' },
    { value: 'photo', label: 'Photo Challenges', icon: 'Camera' },
    { value: 'action', label: 'Action Challenges', icon: 'Zap' },
    { value: 'family', label: 'Family Activities', icon: 'Users' },
    { value: 'knowledge', label: 'Knowledge Quests', icon: 'Brain' }
  ];

  const sortOptions = [
    { value: 'recent', label: 'Most Recent' },
    { value: 'points', label: 'Highest Points' },
    { value: 'difficulty', label: 'Difficulty' }
  ];

  const filteredChallenges = completedChallenges?.filter(challenge => selectedFilter === 'all' || challenge?.type === selectedFilter)?.sort((a, b) => {
      switch (sortBy) {
        case 'points':
          return b?.pointsEarned - a?.pointsEarned;
        case 'difficulty':
          const difficultyOrder = { easy: 1, medium: 2, hard: 3 };
          return difficultyOrder?.[b?.difficulty] - difficultyOrder?.[a?.difficulty];
        case 'recent':
        default:
          return new Date(b.completedAt) - new Date(a.completedAt);
      }
    });

  const getTotalStats = () => {
    return {
      totalChallenges: completedChallenges?.length,
      totalPoints: completedChallenges?.reduce((sum, c) => sum + c?.pointsEarned, 0),
      streakDays: Math.max(...completedChallenges?.map(c => c?.streakContribution || 0), 0),
      favoriteType: getMostFrequentType()
    };
  };

  const getMostFrequentType = () => {
    const typeCounts = completedChallenges?.reduce((acc, challenge) => {
      acc[challenge.type] = (acc?.[challenge?.type] || 0) + 1;
      return acc;
    }, {});
    
    return Object.keys(typeCounts)?.reduce((a, b) => 
      typeCounts?.[a] > typeCounts?.[b] ? a : b, 'action'
    );
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'text-success bg-success/10';
      case 'medium': return 'text-warning bg-warning/10';
      case 'hard': return 'text-error bg-error/10';
      default: return 'text-primary bg-primary/10';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const stats = getTotalStats();

  if (completedChallenges?.length === 0) {
    return (
      <div className="bg-card rounded-xl shadow-soft border border-border p-8 text-center">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Calendar" size={32} color="var(--color-muted-foreground)" />
        </div>
        <h3 className="font-heading text-xl text-foreground mb-2">No Challenges Yet</h3>
        <p className="text-muted-foreground font-caption mb-4">
          Complete your first daily challenge to see your progress here!
        </p>
        <Button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          iconName="ArrowUp"
          iconPosition="left"
        >
          View Today's Challenges
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="bg-card rounded-xl shadow-soft border border-border p-6">
        <h2 className="font-heading text-2xl text-foreground mb-4">Your Challenge Journey</h2>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-primary/5 rounded-lg">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-2">
              <Icon name="Target" size={24} color="white" />
            </div>
            <div className="font-data text-2xl font-bold text-primary">{stats?.totalChallenges}</div>
            <div className="text-sm font-caption text-muted-foreground">Completed</div>
          </div>

          <div className="text-center p-4 bg-success/5 rounded-lg">
            <div className="w-12 h-12 bg-success rounded-full flex items-center justify-center mx-auto mb-2">
              <Icon name="Star" size={24} color="white" />
            </div>
            <div className="font-data text-2xl font-bold text-success">{stats?.totalPoints?.toLocaleString()}</div>
            <div className="text-sm font-caption text-muted-foreground">Points Earned</div>
          </div>

          <div className="text-center p-4 bg-warning/5 rounded-lg">
            <div className="w-12 h-12 bg-warning rounded-full flex items-center justify-center mx-auto mb-2">
              <Icon name="Zap" size={24} color="white" />
            </div>
            <div className="font-data text-2xl font-bold text-warning">{stats?.streakDays}</div>
            <div className="text-sm font-caption text-muted-foreground">Best Streak</div>
          </div>

          <div className="text-center p-4 bg-accent/5 rounded-lg">
            <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-2">
              <Icon name="Heart" size={24} color="white" />
            </div>
            <div className="font-data text-lg font-bold text-accent capitalize">{stats?.favoriteType}</div>
            <div className="text-sm font-caption text-muted-foreground">Favorite Type</div>
          </div>
        </div>
      </div>
      {/* Filters and Sort */}
      <div className="bg-card rounded-xl shadow-soft border border-border p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            {filterOptions?.map((option) => (
              <Button
                key={option?.value}
                variant={selectedFilter === option?.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedFilter(option?.value)}
                iconName={option?.icon}
                iconPosition="left"
              >
                {option?.label}
              </Button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center space-x-2">
            <Icon name="ArrowUpDown" size={16} color="var(--color-muted-foreground)" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e?.target?.value)}
              className="bg-background border border-border rounded-md px-3 py-1 text-sm font-caption focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {sortOptions?.map((option) => (
                <option key={option?.value} value={option?.value}>
                  {option?.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      {/* Challenge Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredChallenges?.map((challenge) => (
          <div key={challenge?.id} className="bg-card rounded-xl shadow-soft border border-border overflow-hidden hover:shadow-large transition-all duration-300">
            {/* Challenge Image */}
            <div className="relative h-40 overflow-hidden">
              <Image
                src={challenge?.image}
                alt={challenge?.title}
                className="w-full h-full object-cover"
              />
              
              {/* Completion Badge */}
              <div className="absolute top-3 right-3">
                <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center shadow-soft">
                  <Icon name="CheckCircle" size={20} color="white" />
                </div>
              </div>

              {/* Difficulty Badge */}
              <div className="absolute top-3 left-3">
                <div className={`px-2 py-1 rounded-full text-xs font-caption font-medium ${getDifficultyColor(challenge?.difficulty)}`}>
                  {challenge?.difficulty?.charAt(0)?.toUpperCase() + challenge?.difficulty?.slice(1)}
                </div>
              </div>
            </div>

            {/* Challenge Content */}
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-heading text-lg text-foreground flex-1 mr-2">
                  {challenge?.title}
                </h3>
                <div className="flex items-center space-x-1 bg-success/10 px-2 py-1 rounded-full">
                  <Icon name="Star" size={14} color="var(--color-success)" />
                  <span className="font-data text-sm font-medium text-success">
                    +{challenge?.pointsEarned}
                  </span>
                </div>
              </div>

              <p className="text-muted-foreground font-caption text-sm mb-3 line-clamp-2">
                {challenge?.description}
              </p>

              {/* Challenge Meta */}
              <div className="flex items-center justify-between text-xs font-caption text-muted-foreground mb-3">
                <div className="flex items-center space-x-1">
                  <Icon name="Calendar" size={12} />
                  <span>{formatDate(challenge?.completedAt)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Clock" size={12} />
                  <span>{challenge?.timeSpent || '15 min'}</span>
                </div>
              </div>

              {/* Action Button */}
              <Button
                onClick={() => onViewChallenge(challenge)}
                variant="outline"
                size="sm"
                className="w-full"
                iconName="Eye"
                iconPosition="left"
              >
                View Details
              </Button>
            </div>
          </div>
        ))}
      </div>
      {/* Empty State for Filtered Results */}
      {filteredChallenges?.length === 0 && selectedFilter !== 'all' && (
        <div className="bg-card rounded-xl shadow-soft border border-border p-8 text-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Search" size={32} color="var(--color-muted-foreground)" />
          </div>
          <h3 className="font-heading text-xl text-foreground mb-2">No Challenges Found</h3>
          <p className="text-muted-foreground font-caption mb-4">
            Try adjusting your filters to see more challenges.
          </p>
          <Button
            onClick={() => setSelectedFilter('all')}
            variant="outline"
            iconName="RotateCcw"
            iconPosition="left"
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default ChallengeHistory;