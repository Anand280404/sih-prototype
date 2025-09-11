import React from 'react';
import Icon from '../../../components/AppIcon';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const ContentStats = ({ stats }) => {
  const categoryData = [
    { name: 'Climate Change', value: stats?.categories?.['climate-change'] || 0, color: '#2D7D32' },
    { name: 'Recycling', value: stats?.categories?.recycling || 0, color: '#1976D2' },
    { name: 'Wildlife', value: stats?.categories?.wildlife || 0, color: '#FF6B35' },
    { name: 'Energy', value: stats?.categories?.energy || 0, color: '#FFC107' },
    { name: 'Water', value: stats?.categories?.water || 0, color: '#4CAF50' },
    { name: 'Pollution', value: stats?.categories?.pollution || 0, color: '#E57373' }
  ];

  const engagementData = [
    { name: 'Jan', views: 1200, completions: 890 },
    { name: 'Feb', views: 1400, completions: 1020 },
    { name: 'Mar', views: 1600, completions: 1180 },
    { name: 'Apr', views: 1800, completions: 1350 },
    { name: 'May', views: 2100, completions: 1580 },
    { name: 'Jun', views: 2300, completions: 1720 }
  ];

  const statCards = [
    {
      title: 'Total Lessons',
      value: stats?.totalLessons,
      change: '+12%',
      changeType: 'positive',
      icon: 'BookOpen',
      color: 'primary'
    },
    {
      title: 'Published',
      value: stats?.published,
      change: '+8%',
      changeType: 'positive',
      icon: 'CheckCircle',
      color: 'success'
    },
    {
      title: 'Draft',
      value: stats?.draft,
      change: '-5%',
      changeType: 'negative',
      icon: 'Clock',
      color: 'warning'
    },
    {
      title: 'Avg. Completion',
      value: `${stats?.avgCompletion}%`,
      change: '+3%',
      changeType: 'positive',
      icon: 'TrendingUp',
      color: 'secondary'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards?.map((stat, index) => (
          <div key={index} className="bg-card rounded-lg border border-border shadow-soft p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-${stat?.color}/10 rounded-lg flex items-center justify-center`}>
                <Icon name={stat?.icon} size={24} color={`var(--color-${stat?.color})`} />
              </div>
              <div className={`text-sm font-caption px-2 py-1 rounded-full ${
                stat?.changeType === 'positive' ?'bg-success/10 text-success' :'bg-error/10 text-error'
              }`}>
                {stat?.change}
              </div>
            </div>
            <div>
              <div className="font-data text-2xl font-bold text-foreground mb-1">
                {stat?.value}
              </div>
              <div className="text-sm font-caption text-muted-foreground">
                {stat?.title}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Distribution */}
        <div className="bg-card rounded-lg border border-border shadow-soft p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-heading text-lg text-foreground">Content by Category</h3>
              <p className="text-sm font-caption text-muted-foreground">
                Distribution of lessons across topics
              </p>
            </div>
            <Icon name="PieChart" size={20} color="var(--color-muted-foreground)" />
          </div>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [value, 'Lessons']}
                  labelStyle={{ color: 'var(--color-foreground)' }}
                  contentStyle={{ 
                    backgroundColor: 'var(--color-card)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="grid grid-cols-2 gap-2 mt-4">
            {categoryData?.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item?.color }}
                />
                <span className="text-sm font-caption text-muted-foreground">
                  {item?.name} ({item?.value})
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Engagement Trends */}
        <div className="bg-card rounded-lg border border-border shadow-soft p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-heading text-lg text-foreground">Engagement Trends</h3>
              <p className="text-sm font-caption text-muted-foreground">
                Monthly views and completions
              </p>
            </div>
            <Icon name="BarChart3" size={20} color="var(--color-muted-foreground)" />
          </div>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="name" 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <YAxis 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--color-card)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="views" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="completions" fill="var(--color-success)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center space-x-6 mt-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-sm font-caption text-muted-foreground">Views</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-success" />
              <span className="text-sm font-caption text-muted-foreground">Completions</span>
            </div>
          </div>
        </div>
      </div>
      {/* Performance Metrics */}
      <div className="bg-card rounded-lg border border-border shadow-soft p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-heading text-lg text-foreground">Performance Metrics</h3>
            <p className="text-sm font-caption text-muted-foreground">
              Key performance indicators for content effectiveness
            </p>
          </div>
          <Icon name="Activity" size={20} color="var(--color-muted-foreground)" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Icon name="Users" size={24} color="var(--color-primary)" />
            </div>
            <div className="font-data text-2xl font-bold text-foreground mb-1">
              {stats?.totalStudents?.toLocaleString() || '2,847'}
            </div>
            <div className="text-sm font-caption text-muted-foreground">
              Active Students
            </div>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Icon name="Award" size={24} color="var(--color-success)" />
            </div>
            <div className="font-data text-2xl font-bold text-foreground mb-1">
              {stats?.avgRating || '4.8'}
            </div>
            <div className="text-sm font-caption text-muted-foreground">
              Average Rating
            </div>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Icon name="Clock" size={24} color="var(--color-warning)" />
            </div>
            <div className="font-data text-2xl font-bold text-foreground mb-1">
              {stats?.avgTime || '12m'}
            </div>
            <div className="text-sm font-caption text-muted-foreground">
              Avg. Completion Time
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentStats;