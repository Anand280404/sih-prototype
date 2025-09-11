import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const LeaderboardPanel = ({ 
  currentUserRank = 15,
  currentUserPoints = 1250,
  showGlobal = false 
}) => {
  const [activeTab, setActiveTab] = useState(showGlobal ? 'global' : 'friends');

  // Mock leaderboard data
  const friendsLeaderboard = [
    {
      id: 1,
      name: "Emma Johnson",
      points: 1850,
      level: 7,
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
      streak: 12,
      isCurrentUser: false
    },
    {
      id: 2,
      name: "Alex Chen",
      points: 1650,
      level: 6,
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
      streak: 8,
      isCurrentUser: false
    },
    {
      id: 3,
      name: "Sofia Rodriguez",
      points: 1420,
      level: 5,
      avatar: "https://randomuser.me/api/portraits/women/3.jpg",
      streak: 15,
      isCurrentUser: false
    },
    {
      id: 4,
      name: "You",
      points: currentUserPoints,
      level: 5,
      avatar: "https://randomuser.me/api/portraits/women/4.jpg",
      streak: 7,
      isCurrentUser: true
    },
    {
      id: 5,
      name: "Marcus Thompson",
      points: 1180,
      level: 4,
      avatar: "https://randomuser.me/api/portraits/men/5.jpg",
      streak: 5,
      isCurrentUser: false
    }
  ];

  const globalLeaderboard = [
    {
      id: 1,
      name: "EcoMaster2024",
      points: 3250,
      level: 12,
      avatar: "https://randomuser.me/api/portraits/men/10.jpg",
      streak: 25,
      isCurrentUser: false,
      country: "🇺🇸"
    },
    {
      id: 2,
      name: "GreenQueen",
      points: 2980,
      level: 11,
      avatar: "https://randomuser.me/api/portraits/women/11.jpg",
      streak: 22,
      isCurrentUser: false,
      country: "🇨🇦"
    },
    {
      id: 3,
      name: "PlantPower",
      points: 2750,
      level: 10,
      avatar: "https://randomuser.me/api/portraits/men/12.jpg",
      streak: 18,
      isCurrentUser: false,
      country: "🇬🇧"
    }
  ];

  const currentLeaderboard = activeTab === 'friends' ? friendsLeaderboard : globalLeaderboard;

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return { icon: 'Crown', color: 'var(--color-warning)' };
      case 2: return { icon: 'Medal', color: 'var(--color-muted-foreground)' };
      case 3: return { icon: 'Award', color: 'var(--color-accent)' };
      default: return { icon: 'User', color: 'var(--color-muted-foreground)' };
    }
  };

  const getRankBadge = (rank) => {
    if (rank <= 3) {
      return `bg-gradient-to-r ${
        rank === 1 ? 'from-warning to-accent' :
        rank === 2 ? 'from-muted-foreground to-muted': 'from-accent to-secondary'
      } text-white`;
    }
    return 'bg-muted text-muted-foreground';
  };

  return (
    <div className="bg-card rounded-2xl border border-border shadow-soft overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading text-lg text-foreground">Leaderboard</h3>
          <div className="flex items-center space-x-1 text-muted-foreground">
            <Icon name="TrendingUp" size={16} />
            <span className="font-caption text-sm">Your rank: #{currentUserRank}</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-muted rounded-lg p-1">
          <button
            onClick={() => setActiveTab('friends')}
            className={`flex-1 px-3 py-2 rounded-md font-caption text-sm font-medium transition-all duration-200 ${
              activeTab === 'friends' ?'bg-card text-primary shadow-soft' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            Friends
          </button>
          <button
            onClick={() => setActiveTab('global')}
            className={`flex-1 px-3 py-2 rounded-md font-caption text-sm font-medium transition-all duration-200 ${
              activeTab === 'global' ?'bg-card text-primary shadow-soft' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            Global
          </button>
        </div>
      </div>
      {/* Leaderboard List */}
      <div className="p-4 space-y-3 max-h-80 overflow-y-auto">
        {currentLeaderboard?.map((user, index) => {
          const rank = index + 1;
          const rankInfo = getRankIcon(rank);
          
          return (
            <div
              key={user?.id}
              className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                user?.isCurrentUser
                  ? 'bg-primary/10 border border-primary/20 shadow-soft'
                  : 'hover:bg-muted/50'
              }`}
            >
              {/* Rank */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${getRankBadge(rank)}`}>
                {rank <= 3 ? (
                  <Icon name={rankInfo?.icon} size={16} color={rank <= 3 ? 'white' : rankInfo?.color} />
                ) : (
                  rank
                )}
              </div>
              {/* Avatar */}
              <div className="relative">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-soft">
                  <Image 
                    src={user?.avatar}
                    alt={user?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Level Badge */}
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-success rounded-full flex items-center justify-center border border-white">
                  <span className="font-data text-xs font-bold text-white">{user?.level}</span>
                </div>
              </div>
              {/* User Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <span className={`font-caption font-medium text-sm truncate ${
                    user?.isCurrentUser ? 'text-primary' : 'text-foreground'
                  }`}>
                    {user?.name}
                  </span>
                  {user?.country && (
                    <span className="text-sm">{user?.country}</span>
                  )}
                </div>
                
                <div className="flex items-center space-x-3 mt-1">
                  <div className="flex items-center space-x-1">
                    <Icon name="Star" size={12} color="var(--color-success)" />
                    <span className="font-data text-xs text-success font-medium">
                      {user?.points?.toLocaleString()}
                    </span>
                  </div>
                  
                  {user?.streak > 0 && (
                    <div className="flex items-center space-x-1">
                      <Icon name="Zap" size={12} color="var(--color-warning)" />
                      <span className="font-data text-xs text-warning font-medium">
                        {user?.streak}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              {/* Current User Indicator */}
              {user?.isCurrentUser && (
                <div className="text-primary">
                  <Icon name="User" size={16} />
                </div>
              )}
            </div>
          );
        })}
      </div>
      {/* Footer */}
      <div className="p-4 border-t border-border bg-muted/30">
        <div className="text-center space-y-2">
          <p className="font-caption text-sm text-muted-foreground">
            {activeTab === 'friends' ? 'Invite friends to compete!' : 'Climb the global ranks!'}
          </p>
          <Button variant="outline" size="sm" iconName="Users" iconPosition="left">
            {activeTab === 'friends' ? 'Invite Friends' : 'View More'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPanel;