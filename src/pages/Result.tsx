import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { HouseResult } from '@/components/HouseResult';
import { MagicalBackground } from '@/components/MagicalBackground';
import { AudioProvider } from '@/components/AudioManager';
import { useAuth } from '@/auth';
import { AuthService } from '@/auth/authService';

interface ResultState {
  house: string;
  description: string;
  gameScore: number;
  achievements: string[];
}

const Result: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const state = location.state as ResultState;

  useEffect(() => {
    if (user && state.house) {
      AuthService.updateUserHouse(user.id, state.house as 'gryffindor' | 'ravenclaw' | 'hufflepuff' | 'slytherin');
    }
  }, [user, state.house]);

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
          house={state.house as 'gryffindor' | 'ravenclaw' | 'hufflepuff' | 'slytherin'}>
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