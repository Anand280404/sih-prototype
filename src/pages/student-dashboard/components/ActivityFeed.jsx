import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const ActivityFeed = ({ showNotifications = true }) => {
  const [filter, setFilter] = useState('all');

  // Mock activity data
  const activities = [
    {
      id: 1,
      type: 'achievement',
      title: 'New Badge Earned!',
      description: 'You earned the "Streak Champion" badge for maintaining a 7-day learning streak',
      timestamp: new Date(Date.now() - 300000), // 5 minutes ago
      icon: 'Trophy',
      color: 'success',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=100&h=100&fit=crop',
      points: 200
    },
    {
      id: 2,
      type: 'quiz',
      title: 'Quiz Completed',
      description: 'Scored 95% on "Water Conservation Basics" quiz',
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      icon: 'Brain',
      color: 'secondary',
      image: 'https://images.pixabay.com/photo/2016/03/26/13/09/workspace-1280538_1280.jpg?w=100&h=100&fit=crop',
      points: 95
    },
    {
      id: 3,
      type: 'lesson',
      title: 'Lesson Progress',
      description: 'Completed "Renewable Energy Sources" - Chapter 3',
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      icon: 'BookOpen',
      color: 'primary',
      image: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?w=100&h=100&fit=crop',
      points: 50
    },
    {
      id: 4,
      type: 'challenge',
      title: 'Daily Challenge',
      description: 'Completed today\'s eco-challenge: "Reduce Water Waste"',
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      icon: 'Target',
      color: 'accent',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=100&h=100&fit=crop',
      points: 75
    },
    {
      id: 5,
      type: 'social',
      title: 'Friend Activity',
      description: 'Emma Johnson just earned the "Water Warrior" badge!',
      timestamp: new Date(Date.now() - 10800000), // 3 hours ago
      icon: 'Users',
      color: 'warning',
      image: 'https://randomuser.me/api/portraits/women/1.jpg',
      points: 0
    }
  ];

  const filteredActivities = filter === 'all' ? activities : activities?.filter(activity => activity?.type === filter);

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  const filterOptions = [
    { value: 'all', label: 'All Activity', icon: 'Activity' },
    { value: 'achievement', label: 'Achievements', icon: 'Trophy' },
    { value: 'quiz', label: 'Quizzes', icon: 'Brain' },
    { value: 'lesson', label: 'Lessons', icon: 'BookOpen' },
    { value: 'challenge', label: 'Challenges', icon: 'Target' }
  ];

  return (
    <div className="bg-card rounded-2xl border border-border shadow-soft overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <h3 className="font-heading text-lg text-foreground">Recent Activity</h3>
            {showNotifications && (
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
            )}
          </div>
          
          <Button variant="ghost" size="sm" iconName="Bell">
            Notifications
          </Button>
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-1 overflow-x-auto pb-2">
          {filterOptions?.map((option) => (
            <button
              key={option?.value}
              onClick={() => setFilter(option?.value)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-caption text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                filter === option?.value
                  ? 'bg-primary text-primary-foreground shadow-soft'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon name={option?.icon} size={16} />
              <span>{option?.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Activity List */}
      <div className="max-h-96 overflow-y-auto">
        {filteredActivities?.length > 0 ? (
          <div className="divide-y divide-border">
            {filteredActivities?.map((activity) => (
              <div key={activity?.id} className="p-4 hover:bg-muted/30 transition-colors duration-200">
                <div className="flex items-start space-x-3">
                  {/* Activity Icon/Image */}
                  <div className="relative flex-shrink-0">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-soft">
                      <Image 
                        src={activity?.image}
                        alt={activity?.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Type Icon */}
                    <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center border-2 border-white shadow-soft ${
                      activity?.color === 'success' ? 'bg-success' :
                      activity?.color === 'secondary' ? 'bg-secondary' :
                      activity?.color === 'primary' ? 'bg-primary' :
                      activity?.color === 'accent' ? 'bg-accent' :
                      activity?.color === 'warning'? 'bg-warning' : 'bg-muted-foreground'
                    }`}>
                      <Icon name={activity?.icon} size={12} color="white" />
                    </div>
                  </div>

                  {/* Activity Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-caption font-medium text-sm text-foreground mb-1">
                          {activity?.title}
                        </h4>
                        <p className="font-caption text-sm text-muted-foreground line-clamp-2">
                          {activity?.description}
                        </p>
                      </div>
                      
                      {/* Points */}
                      {activity?.points > 0 && (
                        <div className="flex items-center space-x-1 ml-2">
                          <Icon name="Star" size={12} color="var(--color-success)" />
                          <span className="font-data text-xs font-medium text-success">
                            +{activity?.points}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Timestamp */}
                    <div className="flex items-center space-x-2 mt-2">
                      <Icon name="Clock" size={12} color="var(--color-muted-foreground)" />
                      <span className="font-caption text-xs text-muted-foreground">
                        {getTimeAgo(activity?.timestamp)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Activity" size={24} color="var(--color-muted-foreground)" />
            </div>
            <h4 className="font-heading text-lg text-foreground mb-2">No Activity Yet</h4>
            <p className="font-caption text-sm text-muted-foreground">
              Start learning to see your activity here!
            </p>
          </div>
        )}
      </div>
      {/* Footer */}
      {filteredActivities?.length > 0 && (
        <div className="p-4 border-t border-border bg-muted/30">
          <Button variant="outline" className="w-full" iconName="ArrowRight" iconPosition="right">
            View All Activity
          </Button>
        </div>
      )}
    </div>
  );
};

export default ActivityFeed;