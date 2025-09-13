import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingQuotes from '@/components/LoadingQuotes';

const LoadingPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading quiz data
  useEffect(() => {
    const loadQuizData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 2000)); 
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading quiz data:', error);
        setIsLoading(false);
      }
    };

    loadQuizData();
  }, []);

  const handleLoadingComplete = () => {
    navigate('/quiz');
  };

  return (
    <LoadingQuotes 
      minimumLoadTime={5000} // 5 seconds minimum loading time
      onComplete={handleLoadingComplete}
      isDataReady={!isLoading}
    />
  );
};

export default LoadingPage;