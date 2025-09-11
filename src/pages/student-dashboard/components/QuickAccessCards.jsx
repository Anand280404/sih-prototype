import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const QuickAccessCards = ({ 
  continueLesson = null,
  availableQuizzes = 3,
  dailyChallengeCompleted = false,
  todaysChallengeTitle = "Reduce Water Waste"
}) => {
  const quickAccessItems = [
    {
      id: 'continue-lesson',
      title: continueLesson ? `Continue: ${continueLesson?.title}` : 'Start New Lesson',
      description: continueLesson ? `${continueLesson?.progress}% complete` : 'Begin your eco-learning journey',
      icon: 'BookOpen',
      color: 'primary',
      bgColor: 'bg-primary/10',
      borderColor: 'border-primary/20',
      image: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?w=300&h=200&fit=crop',
      path: '/quiz-system',
      action: continueLesson ? 'Continue Learning' : 'Start Learning',
      badge: continueLesson ? `${continueLesson?.progress}%` : 'New'
    },
    {
      id: 'take-quiz',
      title: 'Take a Quiz',
      description: `${availableQuizzes} quizzes available`,
      icon: 'Brain',
      color: 'secondary',
      bgColor: 'bg-secondary/10',
      borderColor: 'border-secondary/20',
      image: 'https://images.pixabay.com/photo/2016/03/26/13/09/workspace-1280538_1280.jpg?w=300&h=200&fit=crop',
      path: '/quiz-system',
      action: 'Start Quiz',
      badge: availableQuizzes > 0 ? `${availableQuizzes} Available` : 'Coming Soon'
    },
    {
      id: 'daily-challenge',
      title: "Today\'s Challenge",
      description: todaysChallengeTitle,
      icon: 'Target',
      color: dailyChallengeCompleted ? 'success' : 'accent',
      bgColor: dailyChallengeCompleted ? 'bg-success/10' : 'bg-accent/10',
      borderColor: dailyChallengeCompleted ? 'border-success/20' : 'border-accent/20',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=300&h=200&fit=crop',
      path: '/daily-eco-challenges',
      action: dailyChallengeCompleted ? 'View Results' : 'Accept Challenge',
      badge: dailyChallengeCompleted ? 'Completed' : 'New'
    },
    {
      id: 'revision',
      title: 'Review & Practice',
      description: 'Flashcards and quick reviews',
      icon: 'RotateCcw',
      color: 'warning',
      bgColor: 'bg-warning/10',
      borderColor: 'border-warning/20',
      image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?w=300&h=200&fit=crop',
      path: '/revision-flashcards',
      action: 'Start Review',
      badge: 'Study'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-2xl text-foreground">Quick Actions</h2>
        <div className="flex items-center space-x-2 text-muted-foreground">
          <Icon name="Clock" size={16} />
          <span className="font-caption text-sm">Ready to learn?</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {quickAccessItems?.map((item) => (
          <div
            key={item?.id}
            className={`${item?.bgColor} ${item?.borderColor} border rounded-2xl overflow-hidden hover:shadow-soft transition-all duration-300 hover:scale-[1.02] group`}
          >
            {/* Image Header */}
            <div className="relative h-32 overflow-hidden">
              <Image 
                src={item?.image}
                alt={item?.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              
              {/* Badge */}
              <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-caption font-medium ${
                item?.badge === 'Completed' ? 'bg-success text-success-foreground' :
                item?.badge === 'New' ? 'bg-accent text-accent-foreground' :
                'bg-card text-foreground'
              } shadow-soft`}>
                {item?.badge}
              </div>

              {/* Icon Overlay */}
              <div className={`absolute bottom-3 left-3 w-10 h-10 bg-card rounded-full flex items-center justify-center shadow-soft`}>
                <Icon name={item?.icon} size={20} color={`var(--color-${item?.color})`} />
              </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
              <div>
                <h3 className="font-heading text-lg text-foreground mb-1">{item?.title}</h3>
                <p className="font-caption text-sm text-muted-foreground">{item?.description}</p>
              </div>

              <Link to={item?.path} className="block">
                <Button 
                  variant={item?.color === 'primary' ? 'default' : 'outline'}
                  className="w-full"
                  iconName="ArrowRight"
                  iconPosition="right"
                >
                  {item?.action}
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickAccessCards;