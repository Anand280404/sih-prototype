import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ChallengeCalendar = ({ challenges, onDateSelect, selectedDate }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [viewMode, setViewMode] = useState('month'); // 'month' or 'week'

  const today = new Date();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
  const lastDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
  const firstDayOfWeek = firstDayOfMonth?.getDay();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const navigateMonth = (direction) => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      newDate?.setMonth(prev?.getMonth() + direction);
      return newDate;
    });
  };

  const getChallengesForDate = (date) => {
    const dateString = date?.toISOString()?.split('T')?.[0];
    return challenges?.filter(challenge => {
      const challengeDate = new Date(challenge.date)?.toISOString()?.split('T')?.[0];
      return challengeDate === dateString;
    });
  };

  const getChallengeStatusForDate = (date) => {
    const dateChallenges = getChallengesForDate(date);
    if (dateChallenges?.length === 0) return 'none';
    
    const completed = dateChallenges?.filter(c => c?.status === 'completed')?.length;
    const total = dateChallenges?.length;
    
    if (completed === total) return 'completed';
    if (completed > 0) return 'partial';
    return 'available';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-success text-success-foreground';
      case 'partial': return 'bg-warning text-warning-foreground';
      case 'available': return 'bg-primary text-primary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const isToday = (date) => {
    return date?.toDateString() === today?.toDateString();
  };

  const isSelected = (date) => {
    return selectedDate && date?.toDateString() === selectedDate?.toDateString();
  };

  const renderCalendarDays = () => {
    const days = [];
    const totalDays = lastDayOfMonth?.getDate();

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      days?.push(
        <div key={`empty-${i}`} className="aspect-square p-1">
          <div className="w-full h-full"></div>
        </div>
      );
    }

    // Days of the month
    for (let day = 1; day <= totalDays; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const status = getChallengeStatusForDate(date);
      const challengeCount = getChallengesForDate(date)?.length;
      
      days?.push(
        <div key={day} className="aspect-square p-1">
          <button
            onClick={() => onDateSelect(date)}
            className={`w-full h-full rounded-lg border-2 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary relative ${
              isSelected(date) ? 'border-primary bg-primary/10' : isToday(date) ?'border-accent bg-accent/10': 'border-transparent hover:border-muted'
            }`}
          >
            {/* Day Number */}
            <div className={`text-sm font-data font-medium ${
              isToday(date) ? 'text-accent' : isSelected(date) ?'text-primary': 'text-foreground'
            }`}>
              {day}
            </div>

            {/* Challenge Indicators */}
            {challengeCount > 0 && (
              <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex space-x-1">
                {challengeCount <= 3 ? (
                  // Show individual dots for 1-3 challenges
                  (Array.from({ length: challengeCount })?.map((_, index) => (
                    <div
                      key={index}
                      className={`w-1.5 h-1.5 rounded-full ${getStatusColor(status)}`}
                    />
                  )))
                ) : (
                  // Show count for 4+ challenges
                  (<div className={`px-1 py-0.5 rounded-full text-xs font-data font-bold ${getStatusColor(status)}`}>
                    {challengeCount}
                  </div>)
                )}
              </div>
            )}

            {/* Today Indicator */}
            {isToday(date) && (
              <div className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full"></div>
            )}
          </button>
        </div>
      );
    }

    return days;
  };

  const getWeekDays = () => {
    const startOfWeek = new Date(selectedDate || today);
    startOfWeek?.setDate(startOfWeek?.getDate() - startOfWeek?.getDay());
    
    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date?.setDate(startOfWeek?.getDate() + i);
      weekDays?.push(date);
    }
    return weekDays;
  };

  const renderWeekView = () => {
    const weekDays = getWeekDays();
    
    return (
      <div className="grid grid-cols-7 gap-2">
        {weekDays?.map((date, index) => {
          const status = getChallengeStatusForDate(date);
          const challengeCount = getChallengesForDate(date)?.length;
          const dateChallenges = getChallengesForDate(date);
          
          return (
            <div key={index} className="space-y-2">
              {/* Day Header */}
              <div className="text-center">
                <div className="text-xs font-caption text-muted-foreground">
                  {dayNames?.[date?.getDay()]}
                </div>
                <button
                  onClick={() => onDateSelect(date)}
                  className={`w-8 h-8 rounded-full text-sm font-data font-medium transition-all duration-200 ${
                    isSelected(date) ? 'bg-primary text-primary-foreground' :
                    isToday(date) ? 'bg-accent text-accent-foreground': 'hover:bg-muted'
                  }`}
                >
                  {date?.getDate()}
                </button>
              </div>
              {/* Challenges for the day */}
              <div className="space-y-1 min-h-[120px]">
                {dateChallenges?.slice(0, 3)?.map((challenge, challengeIndex) => (
                  <div
                    key={challengeIndex}
                    className={`p-2 rounded text-xs font-caption cursor-pointer hover:opacity-80 ${getStatusColor(challenge?.status || 'available')}`}
                    onClick={() => onDateSelect(date)}
                  >
                    <div className="font-medium truncate">{challenge?.title}</div>
                    <div className="opacity-75 flex items-center space-x-1">
                      <Icon name="Star" size={10} />
                      <span>+{challenge?.points}</span>
                    </div>
                  </div>
                ))}
                
                {dateChallenges?.length > 3 && (
                  <div className="text-xs font-caption text-muted-foreground text-center py-1">
                    +{dateChallenges?.length - 3} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="bg-card rounded-xl shadow-soft border border-border overflow-hidden">
      {/* Calendar Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-heading text-2xl text-foreground">
              {monthNames?.[currentMonth?.getMonth()]} {currentMonth?.getFullYear()}
            </h2>
            <p className="text-sm font-caption text-muted-foreground">
              Track your daily eco-challenges
            </p>
          </div>

          <div className="flex items-center space-x-2">
            {/* View Mode Toggle */}
            <div className="flex bg-muted rounded-lg p-1">
              <Button
                variant={viewMode === 'month' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('month')}
                iconName="Calendar"
              >
                Month
              </Button>
              <Button
                variant={viewMode === 'week' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('week')}
                iconName="CalendarDays"
              >
                Week
              </Button>
            </div>

            {/* Navigation */}
            <div className="flex space-x-1">
              <Button
                variant="outline"
                size="icon"
                onClick={() => navigateMonth(-1)}
              >
                <Icon name="ChevronLeft" size={20} />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentMonth(new Date())}
              >
                Today
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => navigateMonth(1)}
              >
                <Icon name="ChevronRight" size={20} />
              </Button>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-caption">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success rounded-full"></div>
            <span>Completed</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-warning rounded-full"></div>
            <span>In Progress</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span>Available</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-muted rounded-full"></div>
            <span>No Challenges</span>
          </div>
        </div>
      </div>
      {/* Calendar Content */}
      <div className="p-6">
        {viewMode === 'month' ? (
          <>
            {/* Day Headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {dayNames?.map((day) => (
                <div key={day} className="text-center text-sm font-caption font-medium text-muted-foreground py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
              {renderCalendarDays()}
            </div>
          </>
        ) : (
          renderWeekView()
        )}
      </div>
      {/* Selected Date Info */}
      {selectedDate && (
        <div className="p-6 border-t border-border bg-muted/30">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-heading text-lg text-foreground">
                {selectedDate?.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </h3>
              <p className="text-sm font-caption text-muted-foreground">
                {getChallengesForDate(selectedDate)?.length} challenge{getChallengesForDate(selectedDate)?.length !== 1 ? 's' : ''} available
              </p>
            </div>
            
            {getChallengesForDate(selectedDate)?.length > 0 && (
              <Button
                onClick={() => {/* Navigate to challenges for this date */}}
                iconName="ArrowRight"
                iconPosition="right"
              >
                View Challenges
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChallengeCalendar;