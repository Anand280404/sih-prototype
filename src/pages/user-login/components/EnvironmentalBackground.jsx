import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const EnvironmentalBackground = () => {
  const [currentScene, setCurrentScene] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const environmentalScenes = [
    {
      id: 1,
      name: 'Forest Paradise',
      background: 'bg-gradient-to-br from-green-400 via-green-500 to-green-600',
      elements: [
        { icon: 'TreePine', size: 48, position: 'top-10 left-10', color: 'text-green-800', delay: '0s' },
        { icon: 'TreePine', size: 36, position: 'top-20 left-32', color: 'text-green-700', delay: '0.5s' },
        { icon: 'TreePine', size: 52, position: 'top-16 left-56', color: 'text-green-900', delay: '1s' },
        { icon: 'Flower2', size: 24, position: 'bottom-20 left-16', color: 'text-pink-400', delay: '1.5s' },
        { icon: 'Flower', size: 20, position: 'bottom-32 left-40', color: 'text-yellow-400', delay: '2s' },
        { icon: 'Bird', size: 28, position: 'top-32 right-20', color: 'text-blue-600', delay: '2.5s' }
      ]
    },
    {
      id: 2,
      name: 'Ocean Waves',
      background: 'bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600',
      elements: [
        { icon: 'Waves', size: 40, position: 'bottom-10 left-10', color: 'text-blue-800', delay: '0s' },
        { icon: 'Fish', size: 32, position: 'top-24 left-20', color: 'text-orange-400', delay: '0.5s' },
        { icon: 'Shell', size: 24, position: 'bottom-24 right-16', color: 'text-pink-300', delay: '1s' },
        { icon: 'Anchor', size: 28, position: 'bottom-16 right-32', color: 'text-gray-600', delay: '1.5s' },
        { icon: 'Sun', size: 36, position: 'top-8 right-12', color: 'text-yellow-400', delay: '2s' }
      ]
    },
    {
      id: 3,
      name: 'Mountain Vista',
      background: 'bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600',
      elements: [
        { icon: 'Mountain', size: 56, position: 'bottom-0 left-8', color: 'text-gray-700', delay: '0s' },
        { icon: 'Mountain', size: 48, position: 'bottom-0 left-24', color: 'text-gray-600', delay: '0.5s' },
        { icon: 'Mountain', size: 44, position: 'bottom-0 left-40', color: 'text-gray-800', delay: '1s' },
        { icon: 'Cloud', size: 32, position: 'top-16 left-16', color: 'text-white', delay: '1.5s' },
        { icon: 'Cloud', size: 28, position: 'top-12 right-20', color: 'text-gray-100', delay: '2s' },
        { icon: 'Snowflake', size: 20, position: 'top-32 left-32', color: 'text-blue-200', delay: '2.5s' }
      ]
    },
    {
      id: 4,
      name: 'Desert Oasis',
      background: 'bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600',
      elements: [
        { icon: 'Palmtree', size: 48, position: 'bottom-8 left-12', color: 'text-green-600', delay: '0s' },
        { icon: 'Sun', size: 44, position: 'top-8 right-8', color: 'text-yellow-300', delay: '0.5s' },
        { icon: 'Cactus', size: 36, position: 'bottom-12 right-16', color: 'text-green-500', delay: '1s' },
        { icon: 'Wind', size: 28, position: 'top-20 left-24', color: 'text-yellow-200', delay: '1.5s' }
      ]
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentScene((prev) => (prev + 1) % environmentalScenes?.length);
        setIsAnimating(false);
      }, 500);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const currentSceneData = environmentalScenes?.[currentScene];

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Main Background */}
      <div className={`absolute inset-0 transition-all duration-1000 ${currentSceneData?.background} ${
        isAnimating ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
      }`}>
        {/* Animated Elements */}
        {currentSceneData?.elements?.map((element, index) => (
          <div
            key={`${currentScene}-${index}`}
            className={`absolute ${element?.position} ${element?.color} animate-gentle-float`}
            style={{
              animationDelay: element?.delay,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          >
            <Icon 
              name={element?.icon} 
              size={element?.size} 
              className="drop-shadow-lg opacity-80 hover:opacity-100 transition-opacity duration-300"
            />
          </div>
        ))}

        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(12)]?.map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full animate-float-particles"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${8 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-black/5" />
      </div>
      {/* Scene Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
          <Icon name="MapPin" size={16} color="white" />
          <span className="text-white text-sm font-caption font-medium">
            {currentSceneData?.name}
          </span>
          <div className="flex space-x-1 ml-2">
            {environmentalScenes?.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentScene ? 'bg-white' : 'bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
      {/* Environmental Tips */}
      <div className="absolute top-8 right-8 max-w-xs">
        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-large border border-white/20">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center flex-shrink-0">
              <Icon name="Lightbulb" size={16} color="white" />
            </div>
            <div>
              <h4 className="font-caption font-medium text-success mb-1">Eco Tip</h4>
              <p className="text-sm text-foreground">
                {currentScene === 0 && "Trees produce oxygen that we breathe! One tree can provide oxygen for two people."}
                {currentScene === 1 && "Oceans absorb carbon dioxide and help regulate Earth's temperature."}
                {currentScene === 2 && "Mountains create their own weather patterns and are home to unique ecosystems."}
                {currentScene === 3 && "Desert plants like cacti store water efficiently to survive harsh conditions."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnvironmentalBackground;