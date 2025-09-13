import React from 'react';
import { ParticleSystem } from './ParticleSystem';

interface MagicalBackgroundProps {
  variant?: 'hero' | 'quiz' | 'result' | 'footer';
  house?: 'gryffindor' | 'ravenclaw' | 'hufflepuff' | 'slytherin';
  children?: React.ReactNode;
  className?: string;
}

export const MagicalBackground: React.FC<MagicalBackgroundProps> = ({
  variant = 'hero',
  house,
  children,
  className = ''
}) => {
  const getBackgroundClass = () => {
    if (house) {
      return `${house}-theme`;
    }
    
    switch (variant) {
      case 'hero':
        return 'bg-gradient-magical';
      case 'quiz':
        return 'bg-gradient-magical';
      case 'result':
        return house ? `bg-gradient-${house}` : 'bg-gradient-magical';
      case 'footer':
        return 'bg-magical-dark';
      default:
        return 'bg-gradient-magical';
    }
  };

  const getParticleType = () => {
    if (variant === 'result') return 'celebration';
    if (variant === 'quiz') return 'sorting';
    return 'ambient';
  };

  const getParticleIntensity = () => {
    if (variant === 'result') return 'high';
    if (variant === 'hero') return 'medium';
    return 'low';
  };

  return (
    <div className={`relative overflow-hidden ${getBackgroundClass()} ${className}`}>
      {/* Static gradient overlay for better performance */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-candlelight/5 to-transparent" />
      
      {/* Reduced moving magical aura - only one element for hero, none for others */}
      {variant === 'hero' && (
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-candlelight/10 rounded-full blur-xl animate-float" />
        </div>
      )}
      
      {/* Particle system */}
      <ParticleSystem 
        type={getParticleType()}
        intensity={getParticleIntensity()}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};