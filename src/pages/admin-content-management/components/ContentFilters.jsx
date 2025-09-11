import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ContentFilters = ({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  totalCount,
  filteredCount 
}) => {
  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'climate-change', label: 'Climate Change' },
    { value: 'recycling', label: 'Recycling' },
    { value: 'wildlife', label: 'Wildlife Conservation' },
    { value: 'energy', label: 'Renewable Energy' },
    { value: 'water', label: 'Water Conservation' },
    { value: 'pollution', label: 'Pollution Prevention' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'published', label: 'Published' },
    { value: 'draft', label: 'Draft' },
    { value: 'archived', label: 'Archived' }
  ];

  const difficultyOptions = [
    { value: 'all', label: 'All Levels' },
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' }
  ];

  const handleFilterChange = (key, value) => {
    onFilterChange({
      ...filters,
      [key]: value
    });
  };

  const hasActiveFilters = Object.values(filters)?.some(value => 
    value && value !== 'all' && value !== ''
  );

  return (
    <div className="bg-card rounded-lg border border-border shadow-soft p-6 space-y-6">
      {/* Search and Quick Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex-1 max-w-md">
          <Input
            type="search"
            placeholder="Search lessons by title or description..."
            value={filters?.search || ''}
            onChange={(e) => handleFilterChange('search', e?.target?.value)}
            className="w-full"
          />
        </div>
        
        <div className="flex items-center space-x-3">
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={onClearFilters}
              iconName="X"
              iconPosition="left"
            >
              Clear Filters
            </Button>
          )}
          
          <div className="text-sm font-caption text-muted-foreground">
            Showing {filteredCount} of {totalCount} lessons
          </div>
        </div>
      </div>
      {/* Filter Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Select
          label="Category"
          options={categoryOptions}
          value={filters?.category || 'all'}
          onChange={(value) => handleFilterChange('category', value)}
          className="w-full"
        />

        <Select
          label="Status"
          options={statusOptions}
          value={filters?.status || 'all'}
          onChange={(value) => handleFilterChange('status', value)}
          className="w-full"
        />

        <Select
          label="Difficulty"
          options={difficultyOptions}
          value={filters?.difficulty || 'all'}
          onChange={(value) => handleFilterChange('difficulty', value)}
          className="w-full"
        />

        <div className="space-y-2">
          <label className="text-sm font-caption font-medium text-foreground">
            Date Range
          </label>
          <div className="flex space-x-2">
            <Input
              type="date"
              value={filters?.dateFrom || ''}
              onChange={(e) => handleFilterChange('dateFrom', e?.target?.value)}
              className="flex-1"
            />
            <Input
              type="date"
              value={filters?.dateTo || ''}
              onChange={(e) => handleFilterChange('dateTo', e?.target?.value)}
              className="flex-1"
            />
          </div>
        </div>
      </div>
      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
          <span className="text-sm font-caption text-muted-foreground">Active filters:</span>
          
          {filters?.search && (
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
              <Icon name="Search" size={14} />
              <span>"{filters?.search}"</span>
              <button
                onClick={() => handleFilterChange('search', '')}
                className="hover:bg-primary/20 rounded-full p-0.5"
              >
                <Icon name="X" size={12} />
              </button>
            </div>
          )}

          {filters?.category && filters?.category !== 'all' && (
            <div className="inline-flex items-center space-x-2 bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm">
              <Icon name="Tag" size={14} />
              <span>{categoryOptions?.find(opt => opt?.value === filters?.category)?.label}</span>
              <button
                onClick={() => handleFilterChange('category', 'all')}
                className="hover:bg-secondary/20 rounded-full p-0.5"
              >
                <Icon name="X" size={12} />
              </button>
            </div>
          )}

          {filters?.status && filters?.status !== 'all' && (
            <div className="inline-flex items-center space-x-2 bg-warning/10 text-warning px-3 py-1 rounded-full text-sm">
              <Icon name="Circle" size={14} />
              <span>{statusOptions?.find(opt => opt?.value === filters?.status)?.label}</span>
              <button
                onClick={() => handleFilterChange('status', 'all')}
                className="hover:bg-warning/20 rounded-full p-0.5"
              >
                <Icon name="X" size={12} />
              </button>
            </div>
          )}

          {filters?.difficulty && filters?.difficulty !== 'all' && (
            <div className="inline-flex items-center space-x-2 bg-accent/10 text-accent px-3 py-1 rounded-full text-sm">
              <Icon name="BarChart3" size={14} />
              <span>{difficultyOptions?.find(opt => opt?.value === filters?.difficulty)?.label}</span>
              <button
                onClick={() => handleFilterChange('difficulty', 'all')}
                className="hover:bg-accent/20 rounded-full p-0.5"
              >
                <Icon name="X" size={12} />
              </button>
            </div>
          )}

          {(filters?.dateFrom || filters?.dateTo) && (
            <div className="inline-flex items-center space-x-2 bg-success/10 text-success px-3 py-1 rounded-full text-sm">
              <Icon name="Calendar" size={14} />
              <span>
                {filters?.dateFrom && filters?.dateTo 
                  ? `${filters?.dateFrom} to ${filters?.dateTo}`
                  : filters?.dateFrom 
                    ? `From ${filters?.dateFrom}`
                    : `Until ${filters?.dateTo}`
                }
              </span>
              <button
                onClick={() => {
                  handleFilterChange('dateFrom', '');
                  handleFilterChange('dateTo', '');
                }}
                className="hover:bg-success/20 rounded-full p-0.5"
              >
                <Icon name="X" size={12} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ContentFilters;