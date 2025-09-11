import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FilterControls = ({ 
  topics, 
  selectedTopic, 
  onTopicChange, 
  selectedDifficulty, 
  onDifficultyChange,
  selectedReviewFrequency,
  onReviewFrequencyChange,
  onClearFilters,
  totalCards,
  filteredCards
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const difficulties = [
    { value: 'all', label: 'All Levels', icon: 'Layers' },
    { value: 'easy', label: 'Easy', icon: 'ThumbsUp', color: 'text-success' },
    { value: 'medium', label: 'Medium', icon: 'Minus', color: 'text-warning' },
    { value: 'hard', label: 'Hard', icon: 'ThumbsDown', color: 'text-error' }
  ];

  const reviewFrequencies = [
    { value: 'all', label: 'All Cards', icon: 'Layers' },
    { value: 'new', label: 'New Cards', icon: 'Plus', color: 'text-accent' },
    { value: 'review', label: 'Review Due', icon: 'Clock', color: 'text-warning' },
    { value: 'mastered', label: 'Mastered', icon: 'CheckCircle', color: 'text-success' }
  ];

  const hasActiveFilters = selectedTopic !== 'all' || selectedDifficulty !== 'all' || selectedReviewFrequency !== 'all';

  return (
    <div className="bg-card rounded-lg shadow-soft border border-border">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <Icon name="Filter" size={20} color="var(--color-primary)" />
          <h3 className="font-heading text-lg text-foreground">Study Filters</h3>
          {hasActiveFilters && (
            <div className="w-2 h-2 bg-accent rounded-full"></div>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Results Count */}
          <div className="bg-muted px-3 py-1 rounded-full">
            <span className="font-data text-sm font-medium text-foreground">
              {filteredCards} / {totalCards} cards
            </span>
          </div>
          
          {/* Toggle Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={20} />
          </Button>
        </div>
      </div>
      {/* Filter Content */}
      {isExpanded && (
        <div className="p-4 space-y-6">
          {/* Topic Filter */}
          <div className="space-y-3">
            <h4 className="font-caption font-medium text-sm text-muted-foreground uppercase tracking-wide">
              Topics
            </h4>
            <div className="flex flex-wrap gap-2">
              {topics?.map((topic) => (
                <Button
                  key={topic?.value}
                  variant={selectedTopic === topic?.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => onTopicChange(topic?.value)}
                  iconName={topic?.icon}
                  iconPosition="left"
                  className="text-xs"
                >
                  {topic?.label}
                  {topic?.count && (
                    <span className="ml-2 bg-muted px-2 py-0.5 rounded-full text-xs">
                      {topic?.count}
                    </span>
                  )}
                </Button>
              ))}
            </div>
          </div>

          {/* Difficulty Filter */}
          <div className="space-y-3">
            <h4 className="font-caption font-medium text-sm text-muted-foreground uppercase tracking-wide">
              Difficulty Level
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {difficulties?.map((difficulty) => (
                <Button
                  key={difficulty?.value}
                  variant={selectedDifficulty === difficulty?.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => onDifficultyChange(difficulty?.value)}
                  iconName={difficulty?.icon}
                  iconPosition="left"
                  className={`justify-start ${difficulty?.color || ''}`}
                >
                  {difficulty?.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Review Frequency Filter */}
          <div className="space-y-3">
            <h4 className="font-caption font-medium text-sm text-muted-foreground uppercase tracking-wide">
              Review Status
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {reviewFrequencies?.map((frequency) => (
                <Button
                  key={frequency?.value}
                  variant={selectedReviewFrequency === frequency?.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => onReviewFrequencyChange(frequency?.value)}
                  iconName={frequency?.icon}
                  iconPosition="left"
                  className={`justify-start ${frequency?.color || ''}`}
                >
                  {frequency?.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <div className="pt-4 border-t border-border">
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearFilters}
                iconName="X"
                iconPosition="left"
                className="text-muted-foreground hover:text-foreground"
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      )}
      {/* Quick Filter Chips (Always Visible) */}
      {!isExpanded && hasActiveFilters && (
        <div className="px-4 pb-4">
          <div className="flex flex-wrap gap-2">
            {selectedTopic !== 'all' && (
              <div className="flex items-center space-x-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs">
                <span className="font-caption">Topic: {topics?.find(t => t?.value === selectedTopic)?.label}</span>
                <button onClick={() => onTopicChange('all')}>
                  <Icon name="X" size={12} />
                </button>
              </div>
            )}
            {selectedDifficulty !== 'all' && (
              <div className="flex items-center space-x-1 bg-accent/10 text-accent px-3 py-1 rounded-full text-xs">
                <span className="font-caption">Difficulty: {difficulties?.find(d => d?.value === selectedDifficulty)?.label}</span>
                <button onClick={() => onDifficultyChange('all')}>
                  <Icon name="X" size={12} />
                </button>
              </div>
            )}
            {selectedReviewFrequency !== 'all' && (
              <div className="flex items-center space-x-1 bg-success/10 text-success px-3 py-1 rounded-full text-xs">
                <span className="font-caption">Status: {reviewFrequencies?.find(r => r?.value === selectedReviewFrequency)?.label}</span>
                <button onClick={() => onReviewFrequencyChange('all')}>
                  <Icon name="X" size={12} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterControls;