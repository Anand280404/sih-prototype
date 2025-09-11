import React from 'react';
import Icon from '../../../components/AppIcon';

const LoadingAnimation = ({ isVisible, message = "Logging you in..." }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[1200] flex items-center justify-center">
      <div className="bg-card rounded-2xl p-8 shadow-large border border-border max-w-sm w-full mx-4">
        {/* Animated Mascot */}
        <div className="text-center mb-6">
          <div className="relative inline-block">
            {/* Main Character */}
            <div className="w-24 h-24 bg-gradient-to-br from-primary to-success rounded-full flex items-center justify-center shadow-large animate-gentle-bounce">
              <Icon name="Leaf" size={40} color="white" />
            </div>
            
            {/* Orbiting Elements */}
            <div className="absolute inset-0 animate-spin-slow">
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-warning rounded-full flex items-center justify-center">
                <Icon name="Sparkles" size={12} color="white" />
              </div>
              <div className="absolute top-1/2 -right-2 transform -translate-y-1/2 w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                <Icon name="Star" size={12} color="white" />
              </div>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-secondary rounded-full flex items-center justify-center">
                <Icon name="Heart" size={12} color="white" />
              </div>
              <div className="absolute top-1/2 -left-2 transform -translate-y-1/2 w-6 h-6 bg-success rounded-full flex items-center justify-center">
                <Icon name="TreePine" size={12} color="white" />
              </div>
            </div>
          </div>
        </div>

        {/* Loading Message */}
        <div className="text-center space-y-3">
          <h3 className="font-heading text-xl text-primary">Welcome Back!</h3>
          <p className="font-caption text-muted-foreground">{message}</p>
          
          {/* Progress Dots */}
          <div className="flex justify-center space-x-2 mt-4">
            {[...Array(3)]?.map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-primary rounded-full animate-pulse"
                style={{
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: '1s'
                }}
              />
            ))}
          </div>
        </div>

        {/* Environmental Facts */}
        <div className="mt-6 p-4 bg-success/5 rounded-lg border border-success/20">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <Icon name="Info" size={12} color="white" />
            </div>
            <div>
              <h4 className="font-caption font-medium text-success text-sm mb-1">
                Did you know?
              </h4>
              <p className="text-xs text-success/80">
                A single recycled plastic bottle can save enough energy to power a light bulb for 3 hours!
              </p>
            </div>
          </div>
        </div>

        {/* Loading Bar */}
        <div className="mt-6">
          <div className="w-full bg-muted rounded-full h-2">
            <div className="bg-gradient-to-r from-primary to-success h-2 rounded-full animate-loading-bar" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingAnimation;