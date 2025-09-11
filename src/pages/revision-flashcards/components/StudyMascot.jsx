import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const StudyMascot = ({ 
  currentProgress, 
  sessionTime, 
  studiedCards,
  onQuickTip,
  onEncouragement 
}) => {
  const [currentTip, setCurrentTip] = useState(null);
  const [mascotMood, setMascotMood] = useState('happy');
  const [isVisible, setIsVisible] = useState(true);

  const studyTips = [
    {
      id: 1,
      title: "Study Tip",
      message: "Try to explain the answer in your own words - it helps you remember better!",
      icon: "Lightbulb",
      type: "tip"
    },
    {
      id: 2,
      title: "Memory Trick",
      message: "Create mental pictures to connect with environmental concepts!",
      icon: "Image",
      type: "tip"
    },
    {
      id: 3,
      title: "Focus Time",
      message: "Take a 5-minute break every 25 minutes to keep your brain fresh!",
      icon: "Clock",
      type: "break"
    },
    {
      id: 4,
      title: "Great Progress!",
      message: "You're doing amazing! Every card you study makes you an eco-hero!",
      icon: "Star",
      type: "encouragement"
    },
    {
      id: 5,
      title: "Review Strategy",
      message: "Mark difficult cards as 'hard' so you'll see them more often!",
      icon: "Target",
      type: "tip"
    }
  ];

  const encouragements = [
    "You\'re becoming an environmental expert! 🌱",
    "Every answer brings you closer to saving our planet! 🌍",
    "Your knowledge is growing like a mighty tree! 🌳",
    "Keep going, eco-warrior! You're doing fantastic! ⭐",
    "Learning about nature makes you a true hero! 🦸‍♀️"
  ];

  // Auto-show tips based on progress
  useEffect(() => {
    if (studiedCards > 0 && studiedCards % 5 === 0 && !currentTip) {
      showRandomTip();
    }
  }, [studiedCards]);

  // Update mascot mood based on session
  useEffect(() => {
    if (currentProgress >= 80) {
      setMascotMood('excited');
    } else if (currentProgress >= 50) {
      setMascotMood('happy');
    } else if (sessionTime > 1800) { // 30 minutes
      setMascotMood('tired');
    } else {
      setMascotMood('happy');
    }
  }, [currentProgress, sessionTime]);

  const showRandomTip = () => {
    const randomTip = studyTips?.[Math.floor(Math.random() * studyTips?.length)];
    setCurrentTip(randomTip);
    onQuickTip?.(randomTip);
    
    // Auto-hide after 8 seconds
    setTimeout(() => {
      setCurrentTip(null);
    }, 8000);
  };

  const showEncouragement = () => {
    const randomEncouragement = encouragements?.[Math.floor(Math.random() * encouragements?.length)];
    setCurrentTip({
      id: Date.now(),
      title: "You're Amazing!",
      message: randomEncouragement,
      icon: "Heart",
      type: "encouragement"
    });
    onEncouragement?.(randomEncouragement);
    
    setTimeout(() => {
      setCurrentTip(null);
    }, 5000);
  };

  const closeTip = () => {
    setCurrentTip(null);
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const getMascotImage = () => {
    switch (mascotMood) {
      case 'excited':
        return 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=100&h=100&fit=crop&crop=face';
      case 'tired':
        return 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=100&h=100&fit=crop&crop=face';
      default:
        return 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=100&h=100&fit=crop&crop=face';
    }
  };

  return (
    <>
      {/* Floating Mascot */}
      <div className={`fixed bottom-6 right-6 z-50 transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}>
        <div className="relative">
          {/* Mascot Container */}
          <div className="bg-card rounded-full p-4 shadow-large border-2 border-primary/20 cursor-pointer hover:scale-105 transition-transform duration-200"
               onClick={showRandomTip}>
            <div className="w-16 h-16 rounded-full overflow-hidden">
              <Image 
                src={getMascotImage()} 
                alt="Study mascot"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Mood Indicator */}
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
              <Icon 
                name={mascotMood === 'excited' ? 'Zap' : mascotMood === 'tired' ? 'Coffee' : 'Heart'} 
                size={12} 
                color="white" 
              />
            </div>
          </div>

          {/* Toggle Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleVisibility}
            className="absolute -top-2 -left-2 w-6 h-6 bg-muted hover:bg-muted-foreground/10"
          >
            <Icon name={isVisible ? "ChevronDown" : "ChevronUp"} size={12} />
          </Button>
        </div>
      </div>
      {/* Tip Bubble */}
      {currentTip && isVisible && (
        <div className="fixed bottom-28 right-6 z-50 max-w-xs animate-gentle-bounce">
          <div className={`rounded-lg p-4 shadow-large border-2 ${
            currentTip?.type === 'encouragement' ?'bg-success text-success-foreground border-success/20' 
              : currentTip?.type === 'break' ?'bg-warning text-warning-foreground border-warning/20' :'bg-card text-foreground border-primary/20'
          }`}>
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Icon name={currentTip?.icon} size={16} />
                <span className="font-caption font-medium text-sm">
                  {currentTip?.title}
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={closeTip}
                className="w-5 h-5 hover:bg-current/10"
              >
                <Icon name="X" size={12} />
              </Button>
            </div>

            {/* Message */}
            <p className="font-caption text-sm leading-relaxed">
              {currentTip?.message}
            </p>

            {/* Action Buttons */}
            {currentTip?.type === 'tip' && (
              <div className="flex space-x-2 mt-3">
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={showEncouragement}
                  className="text-xs"
                >
                  Thanks!
                </Button>
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={showRandomTip}
                  className="text-xs"
                >
                  More tips
                </Button>
              </div>
            )}

            {/* Speech Bubble Tail */}
            <div className={`absolute bottom-0 right-8 transform translate-y-full ${
              currentTip?.type === 'encouragement' ?'text-success' 
                : currentTip?.type === 'break' ?'text-warning' :'text-card'
            }`}>
              <Icon name="Triangle" size={12} className="rotate-180" />
            </div>
          </div>
        </div>
      )}
      {/* Quick Action Buttons */}
      {isVisible && !currentTip && (
        <div className="fixed bottom-28 right-6 z-40 flex flex-col space-y-2">
          <Button
            variant="outline"
            size="sm"
            onClick={showRandomTip}
            iconName="Lightbulb"
            className="bg-card shadow-soft"
          >
            Tip
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={showEncouragement}
            iconName="Heart"
            className="bg-card shadow-soft"
          >
            Cheer
          </Button>
        </div>
      )}
    </>
  );
};

export default StudyMascot;