import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import StudentNavBar from '../../components/ui/StudentNavBar';
import ProgressIndicator from '../../components/ui/ProgressIndicator';
import ChallengeCard from './components/ChallengeCard';
import ChallengeProgress from './components/ChallengeProgress';
import ChallengeHistory from './components/ChallengeHistory';
import UpcomingChallenges from './components/UpcomingChallenges';
import ChallengeCalendar from './components/ChallengeCalendar';

const DailyEcoChallenges = () => {
  const [activeTab, setActiveTab] = useState('today');
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [userProgress, setUserProgress] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCelebration, setShowCelebration] = useState(false);
  const [userStats, setUserStats] = useState({
    points: 2450,
    streak: 7,
    completedChallenges: 23,
    achievements: []
  });

  // Mock data for today's challenges
  const todaysChallenges = [
    {
      id: 'today-1',
      title: 'Punjab Clean Air Champion',
      description: `Help your family avoid contributing to air pollution today! Document alternatives to burning trash or leaves, and encourage using compost instead.\n\nTake photos of your family's clean burning alternatives and share your pollution-fighting actions!`,image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
      difficulty: 'easy',points: 150,bonusReward: 'Air Quality Hero Badge',type: 'photo',typeIcon: 'Camera',
      totalSteps: 4,
      endTime: new Date(Date.now() + 8 * 60 * 60 * 1000), // 8 hours from now
      steps: [
        {
          title: 'Find Burning Alternatives',description: 'Look for ways your family can avoid burning leaves, trash, or crop waste',type: 'action',
          required: true,
          points: 25
        },
        {
          title: 'Create a Compost Pile',description: 'Help make a compost area for organic waste instead of burning',type: 'action',
          required: true,
          points: 50
        },
        {
          title: 'Document Clean Actions',description: 'Take photos of your pollution-free waste management',type: 'photo',
          required: true,
          maxPhotos: 3,
          points: 50
        },
        {
          title: 'Share Your Impact',description: 'How can your actions inspire other Punjab families?',type: 'reflection',required: false,placeholder: 'Share how your family can help reduce Punjab\'s air pollution...',
          points: 25
        }
      ]
    },
    {
      id: 'today-2',
      title: 'Punjab Groundwater Detective',
      description: `Investigate water usage in your home and neighborhood! Find out how much groundwater your family uses and suggest ways to save this precious resource.\n\nPunjab's groundwater is disappearing fast - let's help protect it!`,
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop',
      difficulty: 'medium',
      points: 200,
      bonusReward: 'Water Conservation Expert Certificate',
      type: 'family',
      typeIcon: 'Users',
      totalSteps: 5,
      endTime: new Date(Date.now() + 10 * 60 * 60 * 1000), // 10 hours from now
      steps: [
        {
          title: 'Water Usage Audit',
          description: 'Count how many taps, tube-wells, and water sources your family uses',
          type: 'action',
          required: true,
          points: 40
        },
        {
          title: 'Find Water Waste',
          description: 'Look for leaking taps, overwatering plants, or long showers',
          type: 'photo',
          required: true,
          maxPhotos: 5,
          points: 60
        },
        {
          title: 'Calculate Daily Usage',
          description: 'Estimate how many buckets of water your family uses per day',
          type: 'action',
          required: true,
          points: 40
        },
        {
          title: 'Make Water-Saving Changes',
          description: 'Fix leaks, use buckets instead of hoses, collect rainwater',
          type: 'action',
          required: true,
          points: 40
        },
        {
          title: 'Family Water Promise',
          description: 'What water-saving promise will your family make for Punjab?',
          type: 'reflection',
          required: false,
          placeholder: 'Share your family\'s commitment to saving Punjab\'s groundwater...',
          points: 20
        }
      ]
    },
    {
      id: 'today-3',
      title: 'Sutlej River Knowledge Challenge',
      description: `Learn amazing facts about Punjab's rivers, especially the Sutlej, and understand why they need our protection.\n\nComplete this interactive quiz to become a Punjab Rivers expert!`,image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop',
      difficulty: 'easy',points: 100,type: 'knowledge',typeIcon: 'Brain',
      totalSteps: 3,
      endTime: new Date(Date.now() + 12 * 60 * 60 * 1000), // 12 hours from now
      steps: [
        {
          title: 'Take the Punjab Rivers Quiz',description: 'Answer 10 questions about Sutlej, Beas, and Ravi rivers',type: 'action',
          required: true,
          points: 60
        },
        {
          title: 'Learn River Facts',description: 'Discover amazing facts about Punjab\'s water systems',
          type: 'action',
          required: true,
          points: 30
        },
        {
          title: 'Share Your River Knowledge',
          description: 'What surprised you most about Punjab\'s rivers?',
          type: 'reflection',
          required: false,
          placeholder: 'Share what you learned about Punjab\'s rivers and their problems...',
          points: 10
        }
      ]
    }
  ];

  // Mock data for completed challenges
  const completedChallenges = [
    {
      id: 'completed-1',
      title: 'Punjab Tree Planting Hero',
      description: 'Plant native Punjab trees like neem, jamun, or banyan to fight air pollution',
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
      difficulty: 'easy',
      pointsEarned: 120,
      type: 'action',
      completedAt: '2025-01-10T14:30:00Z',
      timeSpent: '25 min',
      streakContribution: 1
    },
    {
      id: 'completed-2',
      title: 'Punjab Farm Waste Solutions',
      description: 'Learn about alternatives to stubble burning that Punjab farmers can use',
      image: 'https://images.pexels.com/photos/256737/pexels-photo-256737.jpeg?w=400&h=300&fit=crop',
      difficulty: 'medium',
      pointsEarned: 180,
      type: 'knowledge',
      completedAt: '2025-01-09T16:45:00Z',
      timeSpent: '18 min',
      streakContribution: 1
    },
    {
      id: 'completed-3',
      title: 'Chandigarh-Punjab Cycling Adventure',
      description: 'Choose cycling over motor vehicles for short trips in your city',
      image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400&h=300&fit=crop',
      difficulty: 'easy',
      pointsEarned: 200,
      type: 'family',
      completedAt: '2025-01-08T11:20:00Z',
      timeSpent: '45 min',
      streakContribution: 1
    },
    {
      id: 'completed-4',
      title: 'Punjab Industrial Pollution Awareness',
      description: 'Document pollution sources in Punjab cities and suggest solutions',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
      difficulty: 'hard',
      pointsEarned: 250,
      type: 'photo',
      completedAt: '2025-01-07T13:15:00Z',
      timeSpent: '35 min',
      streakContribution: 1
    }
  ];

  // Mock data for upcoming challenges
  const upcomingChallenges = [
    {
      id: 'upcoming-1',
      title: 'Punjab Plastic-Free Shopping Mission',
      description: 'Shop at Punjab markets (like Ludhiana or Amritsar bazaars) without using single-use plastic',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop',
      difficulty: 'medium',
      points: 180,
      type: 'action',
      startDate: '2025-01-12T09:00:00Z',
      estimatedTime: '30 min',
      participants: 156,
      isSpecial: false,
      features: ['Photo Upload', 'Family Friendly', 'Bonus Points']
    },
    {
      id: 'upcoming-2',
      title: 'Punjab Environmental Heroes Quiz',
      description: 'Learn about environmental activists and scientists working to protect Punjab',
      image: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=400&h=300&fit=crop',
      difficulty: 'hard',
      points: 300,
      type: 'knowledge',
      startDate: '2025-01-13T15:00:00Z',
      estimatedTime: '20 min',
      participants: 89,
      isSpecial: true,
      features: ['Leaderboard', 'Timed Challenge', 'Special Rewards']
    },
    {
      id: 'upcoming-3',
      title: 'Punjab Bird Feeding Station',
      description: 'Create feeding stations for Punjab birds like peacocks, sparrows, and parrots',
      image: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400&h=300&fit=crop',
      difficulty: 'easy',
      points: 150,
      type: 'family',
      startDate: '2025-01-14T10:00:00Z',
      estimatedTime: '40 min',
      participants: 234,
      isSpecial: false,
      features: ['Craft Project', 'Wildlife Support', 'Photo Sharing']
    }
  ];

  // Mock calendar data
  const calendarChallenges = [
    ...todaysChallenges?.map(c => ({ ...c, date: new Date()?.toISOString(), status: 'available' })),
    ...completedChallenges?.map(c => ({ ...c, date: c?.completedAt, status: 'completed' })),
    ...upcomingChallenges?.map(c => ({ ...c, date: c?.startDate, status: 'upcoming' }))
  ];

  useEffect(() => {
    // Load user progress from localStorage
    const savedProgress = localStorage.getItem('pecoUserProgress');
    if (savedProgress) {
      setUserProgress(JSON.parse(savedProgress));
    }

    // Load user stats
    const savedStats = localStorage.getItem('pecoUserStats');
    if (savedStats) {
      setUserStats(JSON.parse(savedStats));
    }
  }, []);

  const handleStartChallenge = (challenge) => {
    setSelectedChallenge(challenge);
    const newProgress = {
      ...userProgress,
      [challenge?.id]: {
        started: true,
        currentStep: 0,
        completedSteps: 0,
        photos: [],
        reflection: '',
        startedAt: new Date()?.toISOString()
      }
    };
    setUserProgress(newProgress);
    localStorage.setItem('pecoUserProgress', JSON.stringify(newProgress));
  };

  const handleCompleteChallenge = (challenge) => {
    setSelectedChallenge(challenge);
  };

  const handleUpdateProgress = (challengeId, progress) => {
    const newProgress = {
      ...userProgress,
      [challengeId]: progress
    };
    setUserProgress(newProgress);
    localStorage.setItem('pecoUserProgress', JSON.stringify(newProgress));
  };

  const handleSubmitChallenge = (challenge) => {
    const challengeProgress = userProgress?.[challenge?.id];
    const pointsEarned = challenge?.points;
    
    // Update user stats
    const newStats = {
      ...userStats,
      points: userStats?.points + pointsEarned,
      completedChallenges: userStats?.completedChallenges + 1,
      streak: userStats?.streak + 1
    };
    
    // Mark challenge as completed
    const newProgress = {
      ...userProgress,
      [challenge?.id]: {
        ...challengeProgress,
        completed: true,
        completedAt: new Date()?.toISOString(),
        pointsEarned
      }
    };

    setUserStats(newStats);
    setUserProgress(newProgress);
    setSelectedChallenge(null);
    setShowCelebration(true);

    localStorage.setItem('pecoUserStats', JSON.stringify(newStats));
    localStorage.setItem('pecoUserProgress', JSON.stringify(newProgress));

    // Hide celebration after 3 seconds
    setTimeout(() => setShowCelebration(false), 3000);
  };

  const handleSetReminder = (challengeId, enabled) => {
    // Mock reminder functionality
    console.log(`Reminder ${enabled ? 'set' : 'removed'} for challenge ${challengeId}`);
  };

  const handleViewChallenge = (challenge) => {
    console.log('Viewing challenge:', challenge);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const tabs = [
    { id: 'today', label: 'Today\'s Challenges', icon: 'Target', count: todaysChallenges?.length },
    { id: 'upcoming', label: 'Coming Soon', icon: 'Calendar', count: upcomingChallenges?.length },
    { id: 'history', label: 'My Progress', icon: 'Trophy', count: completedChallenges?.length },
    { id: 'calendar', label: 'Calendar View', icon: 'CalendarDays', count: null }
  ];

  return (
    <div className="min-h-screen bg-background">
      <StudentNavBar points={userStats?.points} streak={userStats?.streak} />
      {/* Celebration Modal */}
      {showCelebration && (
        <div className="fixed inset-0 z-[1200] bg-black/50 flex items-center justify-center p-4">
          <div className="bg-card rounded-xl shadow-large border border-border p-8 text-center max-w-md w-full animate-gentle-bounce">
            <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Trophy" size={32} color="white" />
            </div>
            <h2 className="font-heading text-2xl text-foreground mb-2">Challenge Complete!</h2>
            <p className="text-muted-foreground font-caption mb-4">
              Amazing work! You've earned points and helped protect our planet.
            </p>
            <Button onClick={() => setShowCelebration(false)}>
              Continue Learning
            </Button>
          </div>
        </div>
      )}
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div>
              <h1 className="font-heading text-4xl text-foreground mb-2">Punjab Environment Challenges</h1>
              <p className="text-muted-foreground font-caption text-lg">
                Take action for Punjab's environment with fun, daily challenges made just for you!
              </p>
            </div>
            
            {/* Quick Stats */}
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="font-data text-2xl font-bold text-primary">{userStats?.points?.toLocaleString()}</div>
                <div className="text-sm font-caption text-muted-foreground">Total Points</div>
              </div>
              <div className="text-center">
                <div className="font-data text-2xl font-bold text-warning">{userStats?.streak}</div>
                <div className="text-sm font-caption text-muted-foreground">Day Streak</div>
              </div>
              <div className="text-center">
                <div className="font-data text-2xl font-bold text-success">{userStats?.completedChallenges}</div>
                <div className="text-sm font-caption text-muted-foreground">Completed</div>
              </div>
            </div>
          </div>
        </div>

        {/* Challenge in Progress */}
        {selectedChallenge && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading text-2xl text-foreground">Challenge in Progress</h2>
              <Button
                variant="outline"
                onClick={() => setSelectedChallenge(null)}
                iconName="X"
                iconPosition="left"
              >
                Close
              </Button>
            </div>
            <ChallengeProgress
              challenge={selectedChallenge}
              userProgress={userProgress?.[selectedChallenge?.id] || {}}
              onUpdateProgress={handleUpdateProgress}
              onSubmitChallenge={handleSubmitChallenge}
            />
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 p-1 bg-muted rounded-lg">
            {tabs?.map((tab) => (
              <Button
                key={tab?.id}
                variant={activeTab === tab?.id ? 'default' : 'ghost'}
                onClick={() => setActiveTab(tab?.id)}
                iconName={tab?.icon}
                iconPosition="left"
                className="flex-1 sm:flex-none"
              >
                {tab?.label}
                {tab?.count !== null && (
                  <span className="ml-2 px-2 py-0.5 bg-primary-foreground/20 rounded-full text-xs font-data">
                    {tab?.count}
                  </span>
                )}
              </Button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {activeTab === 'today' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-heading text-2xl text-foreground">Today's Challenges</h2>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Icon name="Clock" size={16} />
                  <span className="font-caption text-sm">Refreshes daily at midnight</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {todaysChallenges?.map((challenge) => (
                  <ChallengeCard
                    key={challenge?.id}
                    challenge={challenge}
                    userProgress={userProgress}
                    onStartChallenge={handleStartChallenge}
                    onCompleteChallenge={handleCompleteChallenge}
                  />
                ))}
              </div>

              {/* Daily Progress */}
              <div className="mt-8">
                <ProgressIndicator
                  currentStep={Object.values(userProgress)?.filter(p => p?.completed)?.length}
                  totalSteps={todaysChallenges?.length}
                  points={userStats?.points}
                  streakDays={userStats?.streak}
                  showCelebration={showCelebration}
                  achievements={userStats?.achievements}
                  variant="default"
                />
              </div>
            </div>
          )}

          {activeTab === 'upcoming' && (
            <UpcomingChallenges
              upcomingChallenges={upcomingChallenges}
              onSetReminder={handleSetReminder}
            />
          )}

          {activeTab === 'history' && (
            <ChallengeHistory
              completedChallenges={completedChallenges}
              onViewChallenge={handleViewChallenge}
            />
          )}

          {activeTab === 'calendar' && (
            <ChallengeCalendar
              challenges={calendarChallenges}
              onDateSelect={handleDateSelect}
              selectedDate={selectedDate}
            />
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-12 bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl border border-primary/20 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div>
              <h3 className="font-heading text-xl text-foreground mb-2">Ready for More Punjab Environmental Learning?</h3>
              <p className="text-muted-foreground font-caption">
                Explore more activities to become Punjab's next environmental champion!
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Link to="/quiz-system">
                <Button variant="outline" iconName="Brain" iconPosition="left">
                  Punjab Eco Quiz
                </Button>
              </Link>
              <Link to="/revision-flashcards">
                <Button variant="outline" iconName="BookOpen" iconPosition="left">
                  Study Punjab Environment
                </Button>
              </Link>
              <Link to="/student-dashboard">
                <Button iconName="Home" iconPosition="left">
                  Back to Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyEcoChallenges;