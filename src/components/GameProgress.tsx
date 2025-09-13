import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Zap, Trophy, Target, Home, User } from 'lucide-react';

interface GameProgressProps {
  currentStep: number;
  totalSteps: number;
  score: number;
  achievements: string[];
  className?: string;
}

const stepIcons = [Star, Zap, Trophy, Target];
const stepNames = ['Awakening', 'Discovery', 'Revelation', 'Destiny'];

export const GameProgress: React.FC<GameProgressProps> = ({
  currentStep,
  totalSteps,
  score,
  achievements,
  className = ''
}) => {
  const navigate = useNavigate();
  
  // Calculate actual questions answered (0-based)
  const questionsAnswered = currentStep <= 1 ? 0 : currentStep - 1;
  // Progress calculation to align with step positions at 25%, 50%, 75%, 100%
  // When 1 question answered, progress reaches 25% (first step)
  // When 2 questions answered, progress reaches 50% (second step)
  // When 3 questions answered, progress reaches 75% (third step)
  // When 4 questions answered, progress reaches 100% (fourth step)
  const progress = (questionsAnswered / totalSteps) * 100;

  return (
    <div className={`w-full bg-gradient-to-r from-magical-dark/95 to-magical-dark/90 backdrop-blur-sm border-b border-amber-700/40 shadow-magical ${className}`}>
      <div className="max-w-6xl mx-auto px-8 py-4">
        {/* Navigation Bar with Home, Progress, and Profile */}
        <div className="flex items-center justify-between mb-3">
          {/* Home Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="text-amber-100 hover:text-amber-50 hover:bg-amber-800/20 transition-colors px-4 py-2"
          >
            <Home className="w-5 h-5 mr-2" />
            Home
          </Button>

          {/* Center Progress Info */}
          <div className="flex flex-col items-center">
            <h3 className="font-magical text-base text-amber-100 drop-shadow-sm">Sorting Progress</h3>
            <div className="flex items-center gap-2 text-xs font-story text-amber-200">
              <span>Step {questionsAnswered} of {totalSteps}</span>
              <span className="text-amber-400">•</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
          </div>

          {/* Profile Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/profile')}
            className="text-amber-100 hover:text-amber-50 hover:bg-amber-800/20 transition-colors px-4 py-2"
          >
            <User className="w-5 h-5 mr-2" />
            Profile
          </Button>
        </div>

        {/* Score Badge */}
        <div className="flex justify-center mb-2">
          <Badge variant="outline" className="bg-amber-900/40 text-amber-100 border-amber-700/60 shadow-sm">
            <Zap className="w-4 h-4 mr-1" />
            {score} Magic Points
          </Badge>
        </div>

        {/* Visual Progress Bar with Step Indicators */}
        <div className="relative mb-4 px-4">
          {/* Background Progress Bar */}
          <div className="w-full h-2 bg-amber-900/30 rounded-full overflow-hidden border border-amber-800/20">
            <div 
              className="h-full bg-gradient-to-r from-amber-400 to-amber-300 transition-all duration-500 ease-out shadow-sm"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Step Indicators on the Progress Bar */}
          <div className="absolute top-0 left-0 w-full h-2 px-4">
            {Array.from({ length: totalSteps }, (_, index) => {
              const StepIcon = stepIcons[index % stepIcons.length];
              // Step logic: step is active when that question is completed
              const isActive = index < questionsAnswered;
              const isCurrent = index === questionsAnswered - 1 && questionsAnswered > 0;
              // Position steps at increments: 25%, 50%, 75%, 100%
              // Special case for last step (Destiny) to place it at the very end
              const basePosition = index === totalSteps - 1 ? 100 : ((index + 1) / totalSteps) * 100;
              // For other steps, adjust positioning to prevent edge overflow
              const adjustedPosition = index === totalSteps - 1 ? 100 : Math.min(Math.max(basePosition, 8), 92);
              
              return (
                <div 
                  key={index}
                  className="absolute flex flex-col items-center z-10"
                  style={{ 
                    left: `${adjustedPosition}%`, 
                    transform: index === totalSteps - 1 ? 'translateX(-100%)' : 'translateX(-50%)'
                  }}
                >
                  {/* Step Circle */}
                  <div className={`
                    -mt-1 w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300 border-2 z-20
                    ${isActive 
                      ? 'bg-amber-300 border-amber-400 text-amber-900 shadow-md shadow-amber-400/50' 
                      : 'bg-amber-950/80 border-amber-800/60 text-amber-600'
                    }
                    ${isCurrent ? 'scale-125 animate-pulse shadow-lg shadow-amber-400/60' : ''}
                    ${index === totalSteps - 1 ? 'ml-0' : ''}
                  `}>
                    <StepIcon className="w-2.5 h-2.5" />
                  </div>
                  
                  {/* Step Label */}
                  <span className={`
                    mt-1 text-xs font-story text-center whitespace-nowrap transition-all duration-300 drop-shadow-sm px-1 py-0.5 rounded
                    ${isActive ? 'text-amber-100 font-medium bg-amber-900/20' : 'text-amber-300/70'}
                    ${isCurrent ? 'font-semibold text-amber-50 bg-amber-800/30' : ''}
                  `}>
                    {stepNames[index % stepNames.length]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};