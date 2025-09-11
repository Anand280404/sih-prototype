import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import EnvironmentalBackground from './components/EnvironmentalBackground';
import LoadingAnimation from './components/LoadingAnimation';
import WelcomeMessage from './components/WelcomeMessage';

const UserLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (credentials) => {
    setIsLoading(true);
    
    // Simulate authentication process with encouraging messages
    const loadingSteps = [
      'Connecting to your eco-adventure...',
      'Loading your progress and achievements...',
      'Preparing your personalized dashboard...',
      'Welcome back, eco-hero!'
    ];

    for (let i = 0; i < loadingSteps?.length; i++) {
      setLoadingMessage(loadingSteps?.[i]);
      await new Promise(resolve => setTimeout(resolve, 800));
    }

    // Store authentication data
    const authData = {
      token: 'demo-token-' + Date.now(),
      role: credentials?.role,
      expiry: Date.now() + (credentials?.rememberMe ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000),
      user: {
        id: Date.now(),
        name: credentials?.name,
        email: credentials?.email,
        points: Math.floor(Math.random() * 5000) + 1000,
        streak: Math.floor(Math.random() * 30) + 1,
        level: Math.floor(Math.random() * 10) + 1,
        achievements: Math.floor(Math.random() * 15) + 5
      }
    };

    localStorage.setItem('pecoAuth', JSON.stringify(authData));

    // Navigate based on role
    if (credentials?.role === 'admin') {
      navigate('/admin-content-management');
    } else {
      navigate('/student-dashboard');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Environmental Background */}
      <EnvironmentalBackground />
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Welcome Section */}
            <div className="hidden lg:block">
              <WelcomeMessage />
            </div>
            
            {/* Login Section */}
            <div className="w-full">
              <div className="bg-card/95 backdrop-blur-sm rounded-2xl p-8 shadow-large border border-border/50">
                {/* Mobile Welcome Message */}
                <div className="lg:hidden mb-6">
                  <WelcomeMessage />
                </div>
                
                {/* Login Form */}
                <LoginForm 
                  onLogin={handleLogin}
                  isLoading={isLoading}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Loading Animation */}
      <LoadingAnimation 
        isVisible={isLoading}
        message={loadingMessage}
      />
      {/* Footer */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
        <div className="text-center text-white/80 text-sm font-caption">
          <p>&copy; {new Date()?.getFullYear()} Peco - Environmental Learning Platform</p>
          <p className="text-xs mt-1">Empowering the next generation of eco-heroes</p>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;