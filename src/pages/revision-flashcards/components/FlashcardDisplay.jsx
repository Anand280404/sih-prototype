import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const FlashcardDisplay = ({ 
  flashcard, 
  onFlip, 
  onDifficultyRate, 
  isFlipped, 
  showAnswer,
  onAudioPlay 
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleFlip = () => {
    setIsAnimating(true);
    setTimeout(() => {
      onFlip();
      setIsAnimating(false);
    }, 150);
  };

  const handleDifficultyClick = (difficulty) => {
    onDifficultyRate(flashcard?.id, difficulty);
  };

  if (!flashcard) return null;

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Main Flashcard */}
      <div 
        className={`relative bg-card rounded-2xl shadow-large border-2 border-primary/20 min-h-[400px] cursor-pointer transition-transform duration-300 ${
          isAnimating ? 'scale-95' : 'hover:scale-105'
        }`}
        onClick={handleFlip}
      >
        {/* Card Content */}
        <div className="p-8 h-full flex flex-col justify-center">
          {!isFlipped ? (
            // Question Side
            (<div className="text-center space-y-6">
              {/* Topic Badge */}
              <div className="inline-flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full">
                <Icon name="Leaf" size={16} color="var(--color-primary)" />
                <span className="font-caption text-sm font-medium text-primary">
                  {flashcard?.topic}
                </span>
              </div>
              {/* Question */}
              <div className="space-y-4">
                <h2 className="font-heading text-2xl md:text-3xl text-foreground leading-relaxed">
                  {flashcard?.question}
                </h2>
                
                {flashcard?.questionImage && (
                  <div className="w-48 h-32 mx-auto rounded-lg overflow-hidden">
                    <Image 
                      src={flashcard?.questionImage} 
                      alt="Question illustration"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
              {/* Audio Button */}
              {flashcard?.hasAudio && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e?.stopPropagation();
                    onAudioPlay(flashcard?.id);
                  }}
                  iconName="Volume2"
                  iconPosition="left"
                >
                  Listen
                </Button>
              )}
              {/* Flip Hint */}
              <div className="flex items-center justify-center space-x-2 text-muted-foreground">
                <Icon name="RotateCcw" size={16} />
                <span className="font-caption text-sm">Tap to reveal answer</span>
              </div>
            </div>)
          ) : (
            // Answer Side
            (<div className="space-y-6">
              {/* Answer Content */}
              <div className="text-center space-y-4">
                <div className="inline-flex items-center space-x-2 bg-success/10 px-4 py-2 rounded-full">
                  <Icon name="CheckCircle" size={16} color="var(--color-success)" />
                  <span className="font-caption text-sm font-medium text-success">
                    Answer
                  </span>
                </div>

                <div className="space-y-4">
                  <p className="font-caption text-lg md:text-xl text-foreground leading-relaxed">
                    {flashcard?.answer}
                  </p>

                  {flashcard?.explanation && (
                    <div className="bg-muted/50 rounded-lg p-4 text-left">
                      <h4 className="font-caption font-medium text-foreground mb-2">
                        Explanation:
                      </h4>
                      <p className="font-caption text-muted-foreground text-sm leading-relaxed">
                        {flashcard?.explanation}
                      </p>
                    </div>
                  )}

                  {flashcard?.answerImage && (
                    <div className="w-64 h-40 mx-auto rounded-lg overflow-hidden">
                      <Image 
                        src={flashcard?.answerImage} 
                        alt="Answer illustration"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
              {/* Difficulty Rating */}
              <div className="border-t border-border pt-6">
                <p className="font-caption text-sm text-center text-muted-foreground mb-4">
                  How difficult was this for you?
                </p>
                <div className="flex justify-center space-x-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e?.stopPropagation();
                      handleDifficultyClick('easy');
                    }}
                    className="text-success border-success hover:bg-success hover:text-success-foreground"
                    iconName="ThumbsUp"
                    iconPosition="left"
                  >
                    Easy
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e?.stopPropagation();
                      handleDifficultyClick('medium');
                    }}
                    className="text-warning border-warning hover:bg-warning hover:text-warning-foreground"
                    iconName="Minus"
                    iconPosition="left"
                  >
                    Medium
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e?.stopPropagation();
                      handleDifficultyClick('hard');
                    }}
                    className="text-error border-error hover:bg-error hover:text-error-foreground"
                    iconName="ThumbsDown"
                    iconPosition="left"
                  >
                    Hard
                  </Button>
                </div>
              </div>
            </div>)
          )}
        </div>

        {/* Flip Animation Overlay */}
        {isAnimating && (
          <div className="absolute inset-0 bg-primary/10 rounded-2xl flex items-center justify-center">
            <Icon name="RotateCcw" size={32} color="var(--color-primary)" className="animate-spin" />
          </div>
        )}
      </div>
      {/* Card Number */}
      <div className="absolute -top-3 -right-3 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-data text-sm font-bold shadow-soft">
        {flashcard?.cardNumber}
      </div>
    </div>
  );
};

export default FlashcardDisplay;