import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const BulkActions = ({ selectedItems, onBulkAction, onClearSelection }) => {
  const [selectedAction, setSelectedAction] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const actionOptions = [
    { value: '', label: 'Select bulk action...' },
    { value: 'publish', label: 'Publish Selected' },
    { value: 'unpublish', label: 'Move to Draft' },
    { value: 'archive', label: 'Archive Selected' },
    { value: 'delete', label: 'Delete Selected' },
    { value: 'duplicate', label: 'Duplicate Selected' },
    { value: 'export', label: 'Export Selected' }
  ];

  const handleApplyAction = async () => {
    if (!selectedAction || selectedItems?.length === 0) return;

    setIsProcessing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      onBulkAction(selectedAction, selectedItems);
      setSelectedAction('');
      onClearSelection();
    } catch (error) {
      console.error('Bulk action failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const getActionIcon = (action) => {
    const icons = {
      publish: 'CheckCircle',
      unpublish: 'Clock',
      archive: 'Archive',
      delete: 'Trash2',
      duplicate: 'Copy',
      export: 'Download'
    };
    return icons?.[action] || 'Settings';
  };

  const getActionColor = (action) => {
    const colors = {
      publish: 'success',
      unpublish: 'warning',
      archive: 'secondary',
      delete: 'destructive',
      duplicate: 'primary',
      export: 'secondary'
    };
    return colors?.[action] || 'default';
  };

  if (selectedItems?.length === 0) {
    return null;
  }

  return (
    <div className="bg-card rounded-lg border border-border shadow-soft p-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Selection Info */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="CheckSquare" size={16} color="var(--color-primary)" />
          </div>
          <div>
            <div className="font-caption font-medium text-foreground">
              {selectedItems?.length} lesson{selectedItems?.length !== 1 ? 's' : ''} selected
            </div>
            <div className="text-sm text-muted-foreground">
              Choose an action to apply to selected items
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-3">
          <Select
            options={actionOptions}
            value={selectedAction}
            onChange={setSelectedAction}
            placeholder="Select action..."
            className="min-w-48"
          />

          <Button
            variant={getActionColor(selectedAction)}
            onClick={handleApplyAction}
            disabled={!selectedAction || isProcessing}
            loading={isProcessing}
            iconName={selectedAction ? getActionIcon(selectedAction) : 'Settings'}
            iconPosition="left"
          >
            Apply
          </Button>

          <Button
            variant="ghost"
            onClick={onClearSelection}
            iconName="X"
            iconPosition="left"
          >
            Clear
          </Button>
        </div>
      </div>
      {/* Action Preview */}
      {selectedAction && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
            <div className={`w-6 h-6 bg-${getActionColor(selectedAction)}/10 rounded-full flex items-center justify-center mt-0.5`}>
              <Icon 
                name={getActionIcon(selectedAction)} 
                size={14} 
                color={`var(--color-${getActionColor(selectedAction)})`} 
              />
            </div>
            <div className="flex-1">
              <div className="font-caption font-medium text-foreground mb-1">
                {actionOptions?.find(opt => opt?.value === selectedAction)?.label}
              </div>
              <div className="text-sm text-muted-foreground">
                {selectedAction === 'publish' && 'Make selected lessons visible to students'}
                {selectedAction === 'unpublish' && 'Move selected lessons back to draft status'}
                {selectedAction === 'archive' && 'Archive selected lessons (hidden but not deleted)'}
                {selectedAction === 'delete' && 'Permanently delete selected lessons (cannot be undone)'}
                {selectedAction === 'duplicate' && 'Create copies of selected lessons'}
                {selectedAction === 'export' && 'Download selected lessons as files'}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Warning for destructive actions */}
      {selectedAction === 'delete' && (
        <div className="mt-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="AlertTriangle" size={16} color="var(--color-destructive)" />
            <div>
              <div className="font-caption font-medium text-destructive mb-1">
                Warning: This action cannot be undone
              </div>
              <div className="text-sm text-destructive/80">
                Deleting lessons will permanently remove them from the system. Students will lose access to these lessons and their progress data.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BulkActions;