import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SortingHatHero } from '@/components/SortingHatHero';
import { MagicalFooter } from '@/components/MagicalFooter';
import { AudioProvider } from '@/components/AudioManager';
import { MagicalBackground } from '@/components/MagicalBackground';

const Index: React.FC = () => {
  const navigate = useNavigate();

  const handleGetSorted = () => {
    navigate('/loading');
  };

  return (
    <AudioProvider>
      <div className="min-h-screen">
        {/* Hero Section */}
        <MagicalBackground variant="hero">
          <SortingHatHero onGetSorted={handleGetSorted} />
        </MagicalBackground>
        
        {/* Footer */}
        <MagicalBackground variant="footer">
          <MagicalFooter />
        </MagicalBackground>
      </div>
    </AudioProvider>
  );
};

export default Index;
