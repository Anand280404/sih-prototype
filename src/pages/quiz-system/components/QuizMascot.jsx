import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuizMascot = ({ 
  currentQuestion, 
  showHint, 
  onHintRequest, 
  isCorrect, 
  showFeedback,
  streak 
}) => {
  const [mascotState, setMascotState] = useState('idle');
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  const encouragementMessages = [
    "You're doing great! Keep it up! 🌱",
    "Every question makes you an eco-hero! 🦸‍♀️",
    "Learning about our planet is awesome! 🌍",
    "You\'re helping save the Earth! 💚",
    "Keep going, environmental champion! ⭐"
  ];

  const hintMessages = [
    "Think about what helps our planet! 🤔",
    "Remember what we learned about nature! 🌿",
    "What would an eco-hero do? 💭",
    "Consider the environment in your answer! 🌍",
    "You\'ve got this! Think green! 💚"
  ];

  const celebrationMessages = [
    "Fantastic! You\'re amazing! 🎉",
    "Brilliant answer! You rock! ⭐",
    "Perfect! You\'re a true eco-hero! 🦸‍♀️",
    "Excellent work! Keep shining! ✨",
    "Outstanding! You\'re saving the planet! 🌍"
  ];

  const supportMessages = [
    "That\'s okay! Learning is a journey! 🌱",
    "Don\'t worry! Every mistake helps us grow! 💪",
    "Keep trying! You're doing your best! 💚",
    "It\'s all about learning! You\'ve got this! 🌟",
    "Every eco-hero makes mistakes! Keep going! 🦸‍♀️"
  ];

  useEffect(() => {
    if (showFeedback) {
      if (isCorrect) {
        setMascotState('celebrating');
        setMessage(celebrationMessages?.[Math.floor(Math.random() * celebrationMessages?.length)]);
      } else {
        setMascotState('encouraging');
        setMessage(supportMessages?.[Math.floor(Math.random() * supportMessages?.length)]);
      }
      setShowMessage(true);
      
      const timer = setTimeout(() => {
        setMascotState('idle');
        setShowMessage(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [showFeedback, isCorrect]);

  useEffect(() => {
    if (streak > 0 && streak % 3 === 0) {
      setMascotState('celebrating');
      setMessage(`Amazing ${streak} question streak! You're on fire! 🔥`);
      setShowMessage(true);
      
      const timer = setTimeout(() => {
        setMascotState('idle');
        setShowMessage(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [streak]);

  const handleHintClick = () => {
    setMascotState('thinking');
    setMessage(hintMessages?.[Math.floor(Math.random() * hintMessages?.length)]);
    setShowMessage(true);
    onHintRequest();
    
    setTimeout(() => {
      setMascotState('idle');
      setShowMessage(false);
    }, 4000);
  };

  const getMascotIcon = () => {
    switch (mascotState) {
      case 'celebrating':
        return 'PartyPopper';
      case 'encouraging':
        return 'Heart';
      case 'thinking':
        return 'Lightbulb';
      default:
        return 'Leaf';
    }
  };

  const getMascotColor = () => {
    switch (mascotState) {
      case 'celebrating':
        return 'var(--color-success)';
      case 'encouraging':
        return 'var(--color-accent)';
      case 'thinking':
        return 'var(--color-warning)';
      default:
        return 'var(--color-primary)';
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Message Bubble */}
      {showMessage && (
        <div className="absolute bottom-16 right-0 mb-2 max-w-xs">
          <div className="bg-card border border-border rounded-lg p-3 shadow-large relative">
            <p className="font-caption text-sm text-foreground">{message}</p>
            {/* Speech bubble tail */}
            <div className="absolute bottom-0 right-4 transform translate-y-full">
              <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-card"></div>
            </div>
          </div>
        </div>
      )}

      {/* Mascot Container */}
      <div className="flex flex-col items-center space-y-2">
        {/* Hint Button */}
        {!showHint && !showFeedback && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleHintClick}
            iconName="HelpCircle"
            iconPosition="left"
            className="bg-card shadow-soft"
          >
            Hint
          </Button>
        )}

        {/* Mascot Avatar */}
        <div className={`w-16 h-16 rounded-full flex items-center justify-center shadow-large transition-all duration-300 ${
          mascotState === 'celebrating' ?'bg-success animate-bounce' 
            : mascotState === 'encouraging' ?'bg-accent animate-pulse'
            : mascotState === 'thinking' ?'bg-warning animate-spin' :'bg-primary hover:scale-110'
        }`}>
          <Icon 
            name={getMascotIcon()} 
            size={24} 
            color="white"
          />
        </div>

        {/* Mascot Name */}
        <div className="text-center">
          <span className="font-caption text-xs font-medium text-primary">
            Eco Buddy
          </span>
        </div>
      </div>
    </div>
  );
};

export default QuizMascot;