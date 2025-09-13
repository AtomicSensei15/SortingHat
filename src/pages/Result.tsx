import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { HouseResult } from '@/components/HouseResult';
import { MagicalBackground } from '@/components/MagicalBackground';
import { AudioProvider } from '@/components/AudioManager';

interface ResultState {
  house: string;
  description: string;
  gameScore: number;
  achievements: string[];
}

const Result: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as ResultState;

  // Redirect to home if no result data
  if (!state || !state.house) {
    navigate('/');
    return null;
  }

  const handleRetake = () => {
    navigate('/');
  };

  const handleViewProfile = () => {
    navigate('/profile');
  };

  return (
    <AudioProvider>
      <div className="min-h-screen">
        <MagicalBackground 
          variant="result" 
          house={state.house as 'gryffindor' | 'ravenclaw' | 'hufflepuff' | 'slytherin'}
        >
          <HouseResult
            house={state.house}
            description={state.description}
            onRetake={handleRetake}
            isVisible={true}
            gameScore={state.gameScore}
            achievements={state.achievements}
          />
        </MagicalBackground>
      </div>
    </AudioProvider>
  );
};

export default Result;