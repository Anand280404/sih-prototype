import React, { useState, useEffect, useMemo } from 'react';
import AdminSidebar from '../../components/ui/AdminSidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ContentTable from './components/ContentTable';
import ContentFilters from './components/ContentFilters';
import ContentStats from './components/ContentStats';
import LessonEditor from './components/LessonEditor';
import BulkActions from './components/BulkActions';

const AdminContentManagement = () => {
  const [lessons, setLessons] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    status: 'all',
    difficulty: 'all',
    dateFrom: '',
    dateTo: ''
  });
  const [sortConfig, setSortConfig] = useState({ key: 'lastModified', direction: 'desc' });
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingLesson, setEditingLesson] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showStats, setShowStats] = useState(false);

  // Mock data for lessons
  const mockLessons = [
    {
      id: 1,
      title: "Understanding Punjab\'s Air Quality Crisis",
      description: "Learn about stubble burning, industrial pollution, and what young people can do to improve air quality in Punjab and neighboring areas.",
      category: "air-pollution",
      difficulty: "beginner",
      status: "published",
      lastModified: "2025-01-10T10:30:00Z",
      content: `# Understanding Punjab\'s Air Quality Crisis\n\nEvery year during October-November, Punjab faces severe air pollution that affects millions of people.\n\n## What Causes Air Pollution in Punjab?\n\n- **Stubble Burning (Parali Jalaana)**: Farmers burn leftover rice crops\n- **Industrial Emissions**: Factories in Ludhiana, Jalandhar release harmful gases\n- **Vehicle Pollution**: Increasing cars and trucks on roads\n- **Construction Dust**: Building activities without proper controls\n\n**Activity for Students:** Interview 3 adults in your family/neighborhood about how air quality has changed in the last 10 years!`,
      estimatedTime: 15,
      tags: ["punjab", "air-pollution", "stubble-burning", "health"],
      prerequisites: []
    },
    {
      id: 2,
      title: "Punjab\'s Groundwater Emergency: Why Wells Are Going Dry",
      description: "Discover why Punjab\'s groundwater level is dropping 1-2 feet every year and how rice farming contributes to this crisis.",
      category: "water-crisis",
      difficulty: "intermediate",
      status: "published",
      lastModified: "2025-01-09T14:20:00Z",
      content: `# Punjab's Groundwater Emergency\n\nPunjab is facing a serious water crisis that threatens the future of farming and drinking water.\n\n## The Problem\n\n1. **Tube-well Overuse**: Punjab has over 14 lakh tube-wells pumping groundwater\n2. **Rice Cultivation**: Rice needs 3-5 times more water than wheat\n3. **Free Electricity**: Farmers get free power to pump unlimited water\n4. **Declining Water Table**: Groundwater level drops 1-2 feet every year\n\n**Real-life Connection**: Ask your family - has your neighborhood's water level changed? Do older people remember when wells were shallower?\n\n**Quiz for Teens:** Calculate how much water a rice field uses vs. a wheat field!`,
      estimatedTime: 20,
      tags: ["punjab", "groundwater", "agriculture", "rice-farming"],
      prerequisites: []
    },
    {
      id: 3,
      title: "Punjab's Rivers: Sutlej, Beas, and Ravi Under Threat",description: "Explore the pollution crisis in Punjab's major rivers and learn about industrial waste, sewage, and agricultural runoff affecting water quality.",
      category: "water-pollution",
      difficulty: "intermediate",
      status: "draft",
      lastModified: "2025-01-08T16:45:00Z",
      content: `# Punjab's Rivers Under Threat\n\nPunjab's three major rivers - Sutlej (Satluj), Beas, and Ravi - are facing severe pollution challenges.\n\n## Sources of River Pollution\n\n- **Industrial Waste**: Factories dump chemicals without proper treatment\n- **Urban Sewage**: Cities like Ludhiana, Amritsar discharge untreated waste\n- **Agricultural Runoff**: Pesticides and fertilizers flow into rivers\n- **Religious Activities**: Festival waste and ritual items\n\n**Activity for Age 10-15**: Visit a nearby river or stream. What do you observe? Take photos (safely) and discuss with your teacher.\n\n**Family Challenge**: Plan a family trip to see the Sutlej or Beas. Research its history and current condition!`,
      estimatedTime: 25,
      tags: ["punjab-rivers", "sutlej", "beas", "ravi", "water-pollution"],
      prerequisites: []
    },
    {
      id: 4,
      title: "Young Environmental Heroes: How Teens Can Save Punjab",
      description: "Inspiring stories of young environmental activists in Punjab and practical actions teenagers can take to protect their state\'s environment.",
      category: "youth-action",
      difficulty: "beginner",
      status: "published",
      lastModified: "2025-01-07T11:15:00Z",
      content: `# Young Environmental Heroes of Punjab\n\nMany teenagers across Punjab are already making a difference for the environment!\n\n## What You Can Do (Age 10-15)\n\n### At Home\n- **Convince parents** to avoid burning leaves/trash\n- **Start composting** kitchen waste\n- **Plant native trees** like neem, jamun, banyan\n- **Use bicycles** for short trips\n\n### At School\n- **Organize tree plantation** drives\n- **Create environment clubs**\n- **Educate younger students** about pollution\n- **Participate in clean-up drives**\n\n### In Community\n- **Spread awareness** about stubble burning alternatives\n- **Document pollution** and share on social media\n- **Write to local leaders** about environmental issues\n\n**Real Teen Heroes**: Meet 15-year-old Simran from Patiala who planted 500 trees, or 14-year-old Arjun from Ludhiana who convinced 20 families to stop burning waste!`,
      estimatedTime: 18,
      tags: ["youth-activism", "teen-environment", "punjab-solutions"],
      prerequisites: []
    },
    {
      id: 5,
      title: "Punjab\'s Farming Dilemma: Green Revolution to Environmental Challenge",
      description: "Understand how Punjab\'s agricultural success created environmental problems and what sustainable farming looks like.",
      category: "agriculture",
      difficulty: "advanced",
      status: "published",
      lastModified: "2025-01-06T09:30:00Z",
      content: `# Punjab's Farming Dilemma\n\nPunjab feeds India but at what environmental cost?\n\n## The Green Revolution Story\n\n**1960s-70s**: Punjab adopted new seeds, chemicals, and irrigation\n- **Success**: India became food-secure\n- **Cost**: Environmental damage began\n\n## Current Problems\n\n1. **Pesticide Overuse**: Punjab uses 25% of India's pesticides on 1.5% of land\n2. **Soil Degradation**: Chemical farming reduces soil fertility\n3. **Water Depletion**: Rice-wheat cycle depletes groundwater\n4. **Health Issues**: Cancer rates high in cotton-growing areas\n\n## Solutions Teens Can Promote\n\n- **Organic farming** in school gardens\n- **Supporting farmers** who avoid chemicals\n- **Eating seasonal, local** foods\n- **Learning about** alternative crops\n\n**Activity**: Visit a local farmer. Ask about changes in farming over generations!`,
      estimatedTime: 30,
      tags: ["punjab-agriculture", "green-revolution", "sustainable-farming"],
      prerequisites: ["Understanding Punjab's Air Quality Crisis"]
    },
    {
      id: 6,
      title: "Punjab's Wildlife: Protecting Peacocks, Blackbucks, and Migratory Birds",
      description: "Learn about Punjab's native wildlife, threats they face, and how young conservationists can help protect local biodiversity.",category: "biodiversity",
      difficulty: "beginner",status: "published",
      lastModified: "2025-01-05T13:20:00Z",
      content: `# Punjab's Amazing Wildlife\n\nDid you know Punjab is home to India's national bird and many other amazing animals?\n\n## Punjab's Native Animals\n\n### Birds\n- **Peacocks** (National Bird) - found in rural areas\n- **House Sparrows** - declining in cities\n- **Migratory Birds** - visit during winter\n- **Parrots** - green parrots in mango groves\n\n### Mammals\n- **Blackbucks** - fast antelopes in grasslands\n- **Spotted Deer** - in forest areas\n- **Nilgai** - large antelopes\n\n## Threats They Face\n\n- **Habitat Loss**: Urbanization destroys nesting areas\n- **Pesticide Poisoning**: Chemicals kill insects birds eat\n- **Pollution**: Dirty water and air affect health\n- **Hunting**: Illegal hunting still occurs\n\n## How You Can Help (Perfect for Ages 10-15!)\n\n- **Create bird feeding stations** at home\n- **Plant native trees** that provide food and shelter\n- **Join wildlife photography** clubs\n- **Report illegal hunting** to forest department\n- **Organize school trips** to wildlife sanctuaries\n\n**Fun Project**: Start a wildlife diary! Note which birds and animals you see in your area each month.`,
      estimatedTime: 22,
      tags: ["punjab-wildlife", "conservation", "birds", "biodiversity"],
      prerequisites: []
    }
  ];

  // Mock stats data
  const mockStats = {
    totalLessons: mockLessons?.length,
    published: mockLessons?.filter(l => l?.status === 'published')?.length,
    draft: mockLessons?.filter(l => l?.status === 'draft')?.length,
    archived: mockLessons?.filter(l => l?.status === 'archived')?.length,
    avgCompletion: 82,
    categories: {
      'air-pollution': mockLessons?.filter(l => l?.category === 'air-pollution')?.length,
      'water-crisis': mockLessons?.filter(l => l?.category === 'water-crisis')?.length,
      'water-pollution': mockLessons?.filter(l => l?.category === 'water-pollution')?.length,
      'youth-action': mockLessons?.filter(l => l?.category === 'youth-action')?.length,
      'agriculture': mockLessons?.filter(l => l?.category === 'agriculture')?.length,
      'biodiversity': mockLessons?.filter(l => l?.category === 'biodiversity')?.length
    },
    totalStudents: 3247,
    avgRating: 4.9,
    avgTime: '18m'
  };

  useEffect(() => {
    // Simulate loading data
    const loadData = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setLessons(mockLessons);
      setIsLoading(false);
    };
    loadData();
  }, []);

  // Filter and sort lessons
  const filteredLessons = useMemo(() => {
    let filtered = lessons?.filter(lesson => {
      const matchesSearch = !filters?.search || 
        lesson?.title?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
        lesson?.description?.toLowerCase()?.includes(filters?.search?.toLowerCase());
      
      const matchesCategory = filters?.category === 'all' || lesson?.category === filters?.category;
      const matchesStatus = filters?.status === 'all' || lesson?.status === filters?.status;
      const matchesDifficulty = filters?.difficulty === 'all' || lesson?.difficulty === filters?.difficulty;
      
      const matchesDateRange = (!filters?.dateFrom || new Date(lesson.lastModified) >= new Date(filters.dateFrom)) &&
                              (!filters?.dateTo || new Date(lesson.lastModified) <= new Date(filters.dateTo));

      return matchesSearch && matchesCategory && matchesStatus && matchesDifficulty && matchesDateRange;
    });

    // Sort lessons
    filtered?.sort((a, b) => {
      const aValue = a?.[sortConfig?.key];
      const bValue = b?.[sortConfig?.key];
      
      if (sortConfig?.key === 'lastModified') {
        const aDate = new Date(aValue);
        const bDate = new Date(bValue);
        return sortConfig?.direction === 'asc' ? aDate - bDate : bDate - aDate;
      }
      
      if (typeof aValue === 'string') {
        return sortConfig?.direction === 'asc' 
          ? aValue?.localeCompare(bValue)
          : bValue?.localeCompare(aValue);
      }
      
      return sortConfig?.direction === 'asc' ? aValue - bValue : bValue - aValue;
    });

    return filtered;
  }, [lessons, filters, sortConfig]);

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev?.key === key && prev?.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleCreateLesson = () => {
    setEditingLesson(null);
    setIsEditorOpen(true);
  };

  const handleEditLesson = (lesson) => {
    setEditingLesson(lesson);
    setIsEditorOpen(true);
  };

  const handlePreviewLesson = (lesson) => {
    // In a real app, this would open a preview modal or navigate to preview page
    console.log('Preview lesson:', lesson);
  };

  const handleDeleteLesson = (lesson) => {
    if (window.confirm(`Are you sure you want to delete "${lesson?.title}"?`)) {
      setLessons(prev => prev?.filter(l => l?.id !== lesson?.id));
      setSelectedItems(prev => prev?.filter(id => id !== lesson?.id));
    }
  };

  const handleSaveLesson = (lessonData) => {
    if (editingLesson) {
      // Update existing lesson
      setLessons(prev => prev?.map(l => l?.id === editingLesson?.id ? lessonData : l));
    } else {
      // Create new lesson
      const newLesson = {
        ...lessonData,
        id: Date.now(),
        lastModified: new Date()?.toISOString()
      };
      setLessons(prev => [newLesson, ...prev]);
    }
  };

  const handleBulkAction = (action, itemIds) => {
    switch (action) {
      case 'publish':
        setLessons(prev => prev?.map(l => 
          itemIds?.includes(l?.id) ? { ...l, status: 'published' } : l
        ));
        break;
      case 'unpublish':
        setLessons(prev => prev?.map(l => 
          itemIds?.includes(l?.id) ? { ...l, status: 'draft' } : l
        ));
        break;
      case 'archive':
        setLessons(prev => prev?.map(l => 
          itemIds?.includes(l?.id) ? { ...l, status: 'archived' } : l
        ));
        break;
      case 'delete':
        if (window.confirm(`Are you sure you want to delete ${itemIds?.length} lesson(s)?`)) {
          setLessons(prev => prev?.filter(l => !itemIds?.includes(l?.id)));
        }
        break;
      case 'duplicate':
        const duplicates = lessons?.filter(l => itemIds?.includes(l?.id))?.map(l => ({
          ...l,
          id: Date.now() + Math.random(),
          title: `${l?.title} (Copy)`,
          status: 'draft',
          lastModified: new Date()?.toISOString()
        }));
        setLessons(prev => [...duplicates, ...prev]);
        break;
      case 'export':
        // Simulate export
        console.log('Exporting lessons:', itemIds);
        break;
    }
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      category: 'all',
      status: 'all',
      difficulty: 'all',
      dateFrom: '',
      dateTo: ''
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex">
        <AdminSidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center animate-pulse">
              <Icon name="Leaf" size={24} color="white" />
            </div>
            <p className="font-caption text-muted-foreground">Loading content management...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-card border-b border-border shadow-soft p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="font-heading text-2xl text-foreground">Punjab Environmental Content Management</h1>
              <p className="font-caption text-muted-foreground">
                Create and manage age-appropriate environmental education content for Punjab students (ages 10-15)
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowStats(!showStats)}
                iconName={showStats ? "BarChart3" : "Eye"}
                iconPosition="left"
              >
                {showStats ? 'Hide Stats' : 'View Stats'}
              </Button>
              
              <Button
                variant="secondary"
                iconName="Upload"
                iconPosition="left"
              >
                Import Lessons
              </Button>
              
              <Button
                onClick={handleCreateLesson}
                iconName="Plus"
                iconPosition="left"
              >
                Create New Lesson
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Stats Panel */}
          {showStats && (
            <ContentStats stats={mockStats} />
          )}

          {/* Filters */}
          <ContentFilters
            filters={filters}
            onFilterChange={setFilters}
            onClearFilters={handleClearFilters}
            totalCount={lessons?.length}
            filteredCount={filteredLessons?.length}
          />

          {/* Bulk Actions */}
          <BulkActions
            selectedItems={selectedItems}
            onBulkAction={handleBulkAction}
            onClearSelection={() => setSelectedItems([])}
          />

          {/* Content Table */}
          <ContentTable
            lessons={filteredLessons}
            selectedItems={selectedItems}
            onSelectionChange={setSelectedItems}
            onEdit={handleEditLesson}
            onPreview={handlePreviewLesson}
            onDelete={handleDeleteLesson}
            sortConfig={sortConfig}
            onSort={handleSort}
          />
        </div>
      </div>
      {/* Lesson Editor Modal */}
      <LessonEditor
        lesson={editingLesson}
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        onSave={handleSaveLesson}
      />
    </div>
  );
};

export default AdminContentManagement;