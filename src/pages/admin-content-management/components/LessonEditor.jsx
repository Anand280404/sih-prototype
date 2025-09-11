import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const LessonEditor = ({ lesson, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: lesson?.title || '',
    description: lesson?.description || '',
    category: lesson?.category || 'climate-change',
    difficulty: lesson?.difficulty || 'beginner',
    status: lesson?.status || 'draft',
    content: lesson?.content || '',
    estimatedTime: lesson?.estimatedTime || 15,
    prerequisites: lesson?.prerequisites || [],
    tags: lesson?.tags || []
  });
  
  const [activeTab, setActiveTab] = useState('content');
  const [isPreview, setIsPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef(null);

  const categoryOptions = [
    { value: 'climate-change', label: 'Climate Change' },
    { value: 'recycling', label: 'Recycling' },
    { value: 'wildlife', label: 'Wildlife Conservation' },
    { value: 'energy', label: 'Renewable Energy' },
    { value: 'water', label: 'Water Conservation' },
    { value: 'pollution', label: 'Pollution Prevention' }
  ];

  const difficultyOptions = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' }
  ];

  const statusOptions = [
    { value: 'draft', label: 'Draft' },
    { value: 'published', label: 'Published' },
    { value: 'archived', label: 'Archived' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      onSave({
        ...lesson,
        ...formData,
        lastModified: new Date()?.toISOString()
      });
      onClose();
    } catch (error) {
      console.error('Save failed:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const insertContent = (type) => {
    const insertions = {
      heading: '\n## Heading\n',
      paragraph: '\n\nYour paragraph text here.\n\n',
      list: '\n- List item 1\n- List item 2\n- List item 3\n',
      image: '\n![Image description](image-url)\n',
      video: '\n[Video: Video title](video-url)\n',
      quiz: '\n**Quick Quiz:** What did you learn?\n',
      activity: '\n**Activity:** Try this at home!\n'
    };

    const newContent = formData?.content + (insertions?.[type] || '');
    handleInputChange('content', newContent);
  };

  const handleFileUpload = (event) => {
    const file = event?.target?.files?.[0];
    if (file) {
      // Simulate file upload
      const fileName = file?.name;
      const fileUrl = `https://example.com/uploads/${fileName}`;
      insertContent('image');
      // In real implementation, you would upload the file and get the URL
    }
  };

  const tabs = [
    { id: 'content', label: 'Content', icon: 'FileText' },
    { id: 'settings', label: 'Settings', icon: 'Settings' },
    { id: 'media', label: 'Media', icon: 'Image' },
    { id: 'preview', label: 'Preview', icon: 'Eye' }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1200] bg-black/50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg shadow-large border border-border w-full max-w-6xl h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="font-heading text-xl text-foreground">
              {lesson ? 'Edit Lesson' : 'Create New Lesson'}
            </h2>
            <p className="text-sm font-caption text-muted-foreground">
              Design engaging environmental education content
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              onClick={() => setIsPreview(!isPreview)}
              iconName={isPreview ? "Edit" : "Eye"}
              iconPosition="left"
            >
              {isPreview ? 'Edit' : 'Preview'}
            </Button>
            
            <Button
              variant="secondary"
              onClick={handleSave}
              loading={isSaving}
              iconName="Save"
              iconPosition="left"
            >
              Save Lesson
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
            >
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border px-6">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 px-4 py-3 border-b-2 transition-colors ${
                activeTab === tab?.id
                  ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span className="font-caption font-medium">{tab?.label}</span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden">
          {activeTab === 'content' && (
            <div className="h-full flex">
              {/* Toolbar */}
              <div className="w-64 border-r border-border p-4 space-y-4 overflow-y-auto">
                <div>
                  <h3 className="font-caption font-medium text-foreground mb-3">Insert Elements</h3>
                  <div className="space-y-2">
                    {[
                      { type: 'heading', label: 'Heading', icon: 'Heading' },
                      { type: 'paragraph', label: 'Paragraph', icon: 'Type' },
                      { type: 'list', label: 'List', icon: 'List' },
                      { type: 'image', label: 'Image', icon: 'Image' },
                      { type: 'video', label: 'Video', icon: 'Video' },
                      { type: 'quiz', label: 'Quiz', icon: 'HelpCircle' },
                      { type: 'activity', label: 'Activity', icon: 'Zap' }
                    ]?.map((item) => (
                      <button
                        key={item?.type}
                        onClick={() => insertContent(item?.type)}
                        className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-muted transition-colors text-left"
                      >
                        <Icon name={item?.icon} size={16} color="var(--color-muted-foreground)" />
                        <span className="font-caption text-sm">{item?.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-caption font-medium text-foreground mb-3">Quick Actions</h3>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => fileInputRef?.current?.click()}
                      iconName="Upload"
                      iconPosition="left"
                      className="w-full justify-start"
                    >
                      Upload Media
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Wand2"
                      iconPosition="left"
                      className="w-full justify-start"
                    >
                      AI Assist
                    </Button>
                  </div>
                </div>
              </div>

              {/* Editor */}
              <div className="flex-1 p-6">
                <textarea
                  value={formData?.content}
                  onChange={(e) => handleInputChange('content', e?.target?.value)}
                  placeholder="Start writing your lesson content here...\n\nUse markdown formatting:\n# Heading\n## Subheading\n**Bold text**\n*Italic text*\n- List items"
                  className="w-full h-full resize-none border border-border rounded-lg p-4 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,video/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="p-6 space-y-6 overflow-y-auto h-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Lesson Title"
                  value={formData?.title}
                  onChange={(e) => handleInputChange('title', e?.target?.value)}
                  placeholder="Enter lesson title"
                  required
                />

                <Select
                  label="Category"
                  options={categoryOptions}
                  value={formData?.category}
                  onChange={(value) => handleInputChange('category', value)}
                />

                <Select
                  label="Difficulty Level"
                  options={difficultyOptions}
                  value={formData?.difficulty}
                  onChange={(value) => handleInputChange('difficulty', value)}
                />

                <Select
                  label="Status"
                  options={statusOptions}
                  value={formData?.status}
                  onChange={(value) => handleInputChange('status', value)}
                />

                <Input
                  label="Estimated Time (minutes)"
                  type="number"
                  value={formData?.estimatedTime}
                  onChange={(e) => handleInputChange('estimatedTime', parseInt(e?.target?.value))}
                  min="5"
                  max="120"
                />
              </div>

              <Input
                label="Description"
                value={formData?.description}
                onChange={(e) => handleInputChange('description', e?.target?.value)}
                placeholder="Brief description of the lesson"
                description="This will be shown in lesson previews"
              />

              <div>
                <label className="block text-sm font-caption font-medium text-foreground mb-2">
                  Tags (comma-separated)
                </label>
                <Input
                  value={formData?.tags?.join(', ')}
                  onChange={(e) => handleInputChange('tags', e?.target?.value?.split(',')?.map(tag => tag?.trim()))}
                  placeholder="environment, climate, sustainability"
                />
              </div>
            </div>
          )}

          {activeTab === 'media' && (
            <div className="p-6">
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Image" size={32} color="var(--color-muted-foreground)" />
                </div>
                <h3 className="font-heading text-lg text-foreground mb-2">Media Library</h3>
                <p className="text-muted-foreground mb-6">Upload and manage images, videos, and other media files</p>
                <Button
                  variant="outline"
                  onClick={() => fileInputRef?.current?.click()}
                  iconName="Upload"
                  iconPosition="left"
                >
                  Upload Media
                </Button>
              </div>
            </div>
          )}

          {activeTab === 'preview' && (
            <div className="p-6 overflow-y-auto h-full">
              <div className="max-w-4xl mx-auto">
                <div className="bg-background rounded-lg border border-border p-8">
                  <div className="mb-6">
                    <h1 className="font-heading text-3xl text-foreground mb-2">
                      {formData?.title || 'Untitled Lesson'}
                    </h1>
                    <p className="text-muted-foreground mb-4">
                      {formData?.description || 'No description provided'}
                    </p>
                    <div className="flex items-center space-x-4 text-sm font-caption text-muted-foreground">
                      <span>📚 {formData?.category}</span>
                      <span>⏱️ {formData?.estimatedTime} min</span>
                      <span>📊 {formData?.difficulty}</span>
                    </div>
                  </div>
                  
                  <div className="prose prose-lg max-w-none">
                    <div className="whitespace-pre-wrap font-body">
                      {formData?.content || 'No content yet. Start writing in the Content tab!'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LessonEditor;