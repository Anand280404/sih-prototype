import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const ContentTable = ({ 
  lessons, 
  selectedItems, 
  onSelectionChange, 
  onEdit, 
  onPreview, 
  onDelete,
  sortConfig,
  onSort 
}) => {
  const [expandedRows, setExpandedRows] = useState(new Set());

  const toggleRowExpansion = (id) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded?.has(id)) {
      newExpanded?.delete(id);
    } else {
      newExpanded?.add(id);
    }
    setExpandedRows(newExpanded);
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      onSelectionChange(lessons?.map(lesson => lesson?.id));
    } else {
      onSelectionChange([]);
    }
  };

  const handleSelectItem = (id, checked) => {
    if (checked) {
      onSelectionChange([...selectedItems, id]);
    } else {
      onSelectionChange(selectedItems?.filter(item => item !== id));
    }
  };

  const getSortIcon = (column) => {
    if (sortConfig?.key !== column) {
      return <Icon name="ArrowUpDown" size={16} color="var(--color-muted-foreground)" />;
    }
    return sortConfig?.direction === 'asc' 
      ? <Icon name="ArrowUp" size={16} color="var(--color-primary)" />
      : <Icon name="ArrowDown" size={16} color="var(--color-primary)" />;
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      published: { color: 'success', icon: 'CheckCircle' },
      draft: { color: 'warning', icon: 'Clock' },
      archived: { color: 'muted', icon: 'Archive' }
    };
    
    const config = statusConfig?.[status] || statusConfig?.draft;
    
    return (
      <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-caption bg-${config?.color}/10 text-${config?.color}`}>
        <Icon name={config?.icon} size={12} />
        <span className="capitalize">{status}</span>
      </div>
    );
  };

  const getDifficultyBadge = (difficulty) => {
    const difficultyConfig = {
      beginner: { color: 'success', dots: 1 },
      intermediate: { color: 'warning', dots: 2 },
      advanced: { color: 'error', dots: 3 }
    };
    
    const config = difficultyConfig?.[difficulty] || difficultyConfig?.beginner;
    
    return (
      <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-caption bg-${config?.color}/10 text-${config?.color}`}>
        <div className="flex space-x-1">
          {Array.from({ length: 3 }, (_, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full ${
                i < config?.dots ? `bg-${config?.color}` : 'bg-muted'
              }`}
            />
          ))}
        </div>
        <span className="capitalize">{difficulty}</span>
      </div>
    );
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-soft overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="w-12 p-4">
                <Checkbox
                  checked={selectedItems?.length === lessons?.length && lessons?.length > 0}
                  onChange={(e) => handleSelectAll(e?.target?.checked)}
                />
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => onSort('title')}
                  className="flex items-center space-x-2 font-caption font-medium text-foreground hover:text-primary transition-colors"
                >
                  <span>Title</span>
                  {getSortIcon('title')}
                </button>
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => onSort('category')}
                  className="flex items-center space-x-2 font-caption font-medium text-foreground hover:text-primary transition-colors"
                >
                  <span>Category</span>
                  {getSortIcon('category')}
                </button>
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => onSort('difficulty')}
                  className="flex items-center space-x-2 font-caption font-medium text-foreground hover:text-primary transition-colors"
                >
                  <span>Difficulty</span>
                  {getSortIcon('difficulty')}
                </button>
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => onSort('status')}
                  className="flex items-center space-x-2 font-caption font-medium text-foreground hover:text-primary transition-colors"
                >
                  <span>Status</span>
                  {getSortIcon('status')}
                </button>
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => onSort('lastModified')}
                  className="flex items-center space-x-2 font-caption font-medium text-foreground hover:text-primary transition-colors"
                >
                  <span>Last Modified</span>
                  {getSortIcon('lastModified')}
                </button>
              </th>
              <th className="text-right p-4 font-caption font-medium text-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {lessons?.map((lesson) => (
              <tr key={lesson?.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                <td className="p-4">
                  <Checkbox
                    checked={selectedItems?.includes(lesson?.id)}
                    onChange={(e) => handleSelectItem(lesson?.id, e?.target?.checked)}
                  />
                </td>
                <td className="p-4">
                  <div>
                    <div className="font-caption font-medium text-foreground">{lesson?.title}</div>
                    <div className="text-sm text-muted-foreground truncate max-w-xs">
                      {lesson?.description}
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="inline-flex items-center space-x-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-caption">
                    <Icon name="Leaf" size={14} />
                    <span>{lesson?.category}</span>
                  </div>
                </td>
                <td className="p-4">
                  {getDifficultyBadge(lesson?.difficulty)}
                </td>
                <td className="p-4">
                  {getStatusBadge(lesson?.status)}
                </td>
                <td className="p-4">
                  <div className="text-sm text-muted-foreground">
                    {new Date(lesson.lastModified)?.toLocaleDateString('en-US')}
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onPreview(lesson)}
                      className="hover:bg-primary/10 hover:text-primary"
                    >
                      <Icon name="Eye" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(lesson)}
                      className="hover:bg-secondary/10 hover:text-secondary"
                    >
                      <Icon name="Edit" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(lesson)}
                      className="hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Icon name="Trash2" size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4 p-4">
        {lessons?.map((lesson) => (
          <div key={lesson?.id} className="bg-background rounded-lg border border-border p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start space-x-3 flex-1">
                <Checkbox
                  checked={selectedItems?.includes(lesson?.id)}
                  onChange={(e) => handleSelectItem(lesson?.id, e?.target?.checked)}
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-caption font-medium text-foreground truncate">
                    {lesson?.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {lesson?.description}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => toggleRowExpansion(lesson?.id)}
              >
                <Icon 
                  name={expandedRows?.has(lesson?.id) ? "ChevronUp" : "ChevronDown"} 
                  size={20} 
                />
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-caption">
                <Icon name="Leaf" size={14} />
                <span>{lesson?.category}</span>
              </div>
              {getDifficultyBadge(lesson?.difficulty)}
              {getStatusBadge(lesson?.status)}
            </div>

            {expandedRows?.has(lesson?.id) && (
              <div className="space-y-3 pt-3 border-t border-border">
                <div className="text-sm text-muted-foreground">
                  Last modified: {new Date(lesson.lastModified)?.toLocaleDateString('en-US')}
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPreview(lesson)}
                    iconName="Eye"
                    iconPosition="left"
                  >
                    Preview
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => onEdit(lesson)}
                    iconName="Edit"
                    iconPosition="left"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onDelete(lesson)}
                    iconName="Trash2"
                    iconPosition="left"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {lessons?.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="BookOpen" size={32} color="var(--color-muted-foreground)" />
          </div>
          <h3 className="font-heading text-lg text-foreground mb-2">No lessons found</h3>
          <p className="text-muted-foreground">Create your first lesson to get started.</p>
        </div>
      )}
    </div>
  );
};

export default ContentTable;