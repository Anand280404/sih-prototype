import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NavigationControls = ({ 
  currentIndex, 
  totalCards, 
  onPrevious, 
  onNext, 
  onShuffle, 
  onReset,
  isShuffled = false 
}) => {
  const isFirstCard = currentIndex === 0;
  const isLastCard = currentIndex === totalCards - 1;

  return (
    <div className="flex flex-col space-y-4">
      {/* Main Navigation */}
      <div className="flex items-center justify-between">
        {/* Previous Button */}
        <Button
          variant="outline"
          size="lg"
          onClick={onPrevious}
          disabled={isFirstCard}
          iconName="ChevronLeft"
          iconPosition="left"
          className="min-w-[120px]"
        >
          Previous
        </Button>

        {/* Card Counter */}
        <div className="flex flex-col items-center space-y-2">
          <div className="bg-card rounded-lg px-4 py-2 border border-border shadow-soft">
            <span className="font-data text-lg font-bold text-primary">
              {currentIndex + 1} / {totalCards}
            </span>
          </div>
          
          {/* Progress Dots */}
          <div className="flex space-x-1">
            {Array.from({ length: Math.min(totalCards, 10) })?.map((_, index) => {
              const dotIndex = totalCards > 10 
                ? Math.floor((index / 9) * (totalCards - 1))
                : index;
              
              return (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                    dotIndex <= currentIndex 
                      ? 'bg-primary' :'bg-muted'
                  }`}
                />
              );
            })}
          </div>
        </div>

        {/* Next Button */}
        <Button
          variant="outline"
          size="lg"
          onClick={onNext}
          disabled={isLastCard}
          iconName="ChevronRight"
          iconPosition="right"
          className="min-w-[120px]"
        >
          Next
        </Button>
      </div>
      {/* Secondary Controls */}
      <div className="flex items-center justify-center space-x-4">
        {/* Shuffle Button */}
        <Button
          variant={isShuffled ? "default" : "ghost"}
          size="sm"
          onClick={onShuffle}
          iconName="Shuffle"
          iconPosition="left"
        >
          {isShuffled ? 'Shuffled' : 'Shuffle'}
        </Button>

        {/* Reset Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onReset}
          iconName="RotateCcw"
          iconPosition="left"
        >
          Reset
        </Button>

        {/* Quick Actions */}
        <div className="hidden md:flex items-center space-x-2 text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="ArrowLeft" size={16} />
            <span className="font-caption text-xs">A</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="ArrowRight" size={16} />
            <span className="font-caption text-xs">D</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Space" size={16} />
            <span className="font-caption text-xs">Flip</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationControls;