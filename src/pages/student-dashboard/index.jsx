import React, { useState, useEffect } from 'react';
import StudentNavBar from '../../components/ui/StudentNavBar';
import EcoHeroAvatar from './components/EcoHeroAvatar';
import QuickAccessCards from './components/QuickAccessCards';
import AchievementShowcase from './components/AchievementShowcase';
import LeaderboardPanel from './components/LeaderboardPanel';
import ActivityFeed from './components/ActivityFeed';
import ProgressStats from './components/ProgressStats';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const StudentDashboard = () => {
  const [userStats, setUserStats] = useState({
    points: 1250,
    level: 5,
    streakDays: 7,
    nextLevelPoints: 1500,
    currentUserRank: 15,
    totalBadges: 12,
    weeklyGoal: 5,
    completedLessons: 3,
    totalQuizzes: 12,
    completedQuizzes: 8,
    averageScore: 87,
    timeSpentToday: 45
  });

  const [showLevelUp, setShowLevelUp] = useState(false);
  const [showNewBadge, setShowNewBadge] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Mock continue lesson data
  const continueLesson = {
    title: "Punjab\'s Air Quality Challenge",
    progress: 65
  };

  // Mock recent achievements
  const recentAchievements = [
    {
      id: 1,
      name: "Punjab Water Guardian",
      description: "Completed 5 lessons about Punjab\'s groundwater crisis",
      icon: "Droplets",
      color: "secondary",
      earnedDate: "2025-09-10",
      points: 100,
      rarity: "common",
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=200&h=200&fit=crop"
    },
    {
      id: 2,
      name: "Farm Pollution Fighter",
      description: "Scored 100% on 3 Punjab agriculture pollution quizzes",
      icon: "Trophy",
      color: "warning",
      earnedDate: "2025-09-09",
      points: 150,
      rarity: "rare",
      image: "https://images.pexels.com/photos/256737/pexels-photo-256737.jpeg?w=200&h=200&fit=crop"
    },
    {
      id: 3,
      name: "Satluj River Protector",
      description: "Maintained 7-day streak studying river conservation",
      icon: "Zap",
      color: "accent",
      earnedDate: "2025-09-11",
      points: 200,
      rarity: "epic",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=200&h=200&fit=crop"
    }
  ];

  useEffect(() => {
    // Update current time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Simulate level up celebration
    const levelUpTimer = setTimeout(() => {
      if (userStats?.points >= userStats?.nextLevelPoints - 50) {
        setShowLevelUp(true);
      }
    }, 2000);

    // Simulate new badge notification
    const badgeTimer = setTimeout(() => {
      setShowNewBadge(true);
    }, 3000);

    return () => {
      clearTimeout(levelUpTimer);
      clearTimeout(badgeTimer);
    };
  }, [userStats?.points, userStats?.nextLevelPoints]);

  const getGreeting = () => {
    const hour = currentTime?.getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const getTodaysDate = () => {
    return currentTime?.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <StudentNavBar 
        points={userStats?.points}
        streak={userStats?.streakDays}
      />
      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 space-y-8">
        {/* Welcome Header */}
        <div className="text-center space-y-2">
          <h1 className="font-heading text-3xl md:text-4xl text-foreground">
            {getGreeting()}, Punjab Eco Hero! 🌾
          </h1>
          <p className="font-caption text-muted-foreground">
            {getTodaysDate()} • Ready to protect Punjab's environment today?
          </p>
        </div>

        {/* Hero Avatar Section */}
        <EcoHeroAvatar
          points={userStats?.points}
          level={userStats?.level}
          streakDays={userStats?.streakDays}
          nextLevelPoints={userStats?.nextLevelPoints}
          showLevelUp={showLevelUp}
        />

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Access Cards */}
            <QuickAccessCards
              continueLesson={continueLesson}
              availableQuizzes={3}
              dailyChallengeCompleted={false}
              todaysChallengeTitle="Reduce Punjab Farm Stubble Burning"
            />

            {/* Achievement Showcase */}
            <AchievementShowcase
              recentAchievements={recentAchievements}
              totalBadges={userStats?.totalBadges}
              showNewBadge={showNewBadge}
            />

            {/* Progress Stats */}
            <ProgressStats
              weeklyGoal={userStats?.weeklyGoal}
              completedLessons={userStats?.completedLessons}
              totalQuizzes={userStats?.totalQuizzes}
              completedQuizzes={userStats?.completedQuizzes}
              averageScore={userStats?.averageScore}
              timeSpentToday={userStats?.timeSpentToday}
            />
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Leaderboard Panel */}
            <LeaderboardPanel
              currentUserRank={userStats?.currentUserRank}
              currentUserPoints={userStats?.points}
              showGlobal={false}
            />

            {/* Activity Feed */}
            <ActivityFeed showNotifications={true} />
          </div>
        </div>

        {/* Motivational Footer */}
        <div className="bg-gradient-to-r from-primary/10 to-success/10 rounded-2xl p-6 border border-primary/20 text-center">
          <div className="flex items-center justify-center space-x-2 mb-3">
            <Icon name="Heart" size={24} color="var(--color-primary)" />
            <h3 className="font-heading text-xl text-primary">Keep Going, Punjab's Environment Protector!</h3>
          </div>
          <p className="font-caption text-muted-foreground mb-4">
            Every lesson you complete helps you become a better guardian of Punjab's air, water, and soil. 
            Your learning journey is making a real difference for our beautiful state! 🏞️
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Button variant="outline" iconName="BookOpen" iconPosition="left">
              Continue Learning
            </Button>
            <Button iconName="Users" iconPosition="left">
              Share with Friends
            </Button>
          </div>
        </div>
      </div>
      {/* Floating Action Button for Mobile */}
      <div className="fixed bottom-20 right-4 lg:hidden z-50">
        <Button
          size="icon"
          className="w-14 h-14 rounded-full shadow-large"
          iconName="Plus"
        >
        </Button>
      </div>
    </div>
  );
};

export default StudentDashboard;