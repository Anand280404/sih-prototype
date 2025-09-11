import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuizNavigation = ({ 
  currentQuestion, 
  totalQuestions, 
  canGoBack, 
  canGoNext, 
  canSkip,
  hasAnswered,
  onPrevious, 
  onNext, 
  onSkip,
  onSubmit,
  isLastQuestion 
}) => {
  return (
    <div className="bg-card border-t border-border shadow-soft">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Previous Button */}
          <div className="flex-1">
            {canGoBack && (
              <Button
                variant="outline"
                onClick={onPrevious}
                iconName="ChevronLeft"
                iconPosition="left"
                disabled={currentQuestion === 1}
              >
                Previous
              </Button>
            )}
          </div>

          {/* Center Actions */}
          <div className="flex items-center space-x-4">
            {/* Skip Button */}
            {canSkip && !hasAnswered && (
              <Button
                variant="ghost"
                onClick={onSkip}
                iconName="SkipForward"
                iconPosition="left"
                className="text-muted-foreground hover:text-foreground"
              >
                Skip Question
              </Button>
            )}

            {/* Question Counter */}
            <div className="flex items-center space-x-2 bg-muted px-4 py-2 rounded-full">
              <Icon name="HelpCircle" size={16} color="var(--color-primary)" />
              <span className="font-data text-sm font-medium text-foreground">
                {currentQuestion} / {totalQuestions}
              </span>
            </div>
          </div>

          {/* Next/Submit Button */}
          <div className="flex-1 flex justify-end">
            {isLastQuestion ? (
              <Button
                variant="success"
                onClick={onSubmit}
                iconName="Check"
                iconPosition="right"
                disabled={!hasAnswered}
              >
                Submit Quiz
              </Button>
            ) : (
              <Button
                variant="default"
                onClick={onNext}
                iconName="ChevronRight"
                iconPosition="right"
                disabled={!canGoNext || !hasAnswered}
              >
                Next Question
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden mt-4 space-y-3">
          {/* Top Row - Skip and Counter */}
          <div className="flex items-center justify-between">
            {canSkip && !hasAnswered && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onSkip}
                iconName="SkipForward"
                iconPosition="left"
                className="text-muted-foreground"
              >
                Skip
              </Button>
            )}
            
            <div className="flex items-center space-x-2 bg-muted px-3 py-1 rounded-full">
              <Icon name="HelpCircle" size={14} color="var(--color-primary)" />
              <span className="font-data text-xs font-medium text-foreground">
                {currentQuestion} / {totalQuestions}
              </span>
            </div>
          </div>

          {/* Bottom Row - Navigation */}
          <div className="flex items-center justify-between space-x-4">
            {canGoBack ? (
              <Button
                variant="outline"
                size="sm"
                onClick={onPrevious}
                iconName="ChevronLeft"
                iconPosition="left"
                disabled={currentQuestion === 1}
                className="flex-1"
              >
                Previous
              </Button>
            ) : (
              <div className="flex-1"></div>
            )}

            {isLastQuestion ? (
              <Button
                variant="success"
                size="sm"
                onClick={onSubmit}
                iconName="Check"
                iconPosition="right"
                disabled={!hasAnswered}
                className="flex-1"
              >
                Submit
              </Button>
            ) : (
              <Button
                variant="default"
                size="sm"
                onClick={onNext}
                iconName="ChevronRight"
                iconPosition="right"
                disabled={!canGoNext || !hasAnswered}
                className="flex-1"
              >
                Next
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizNavigation;