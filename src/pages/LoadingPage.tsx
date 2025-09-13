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
        // This is just a simulation - in a real app, you would fetch actual data
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate network delay
        
        // Once "data" is loaded, allow the loading screen to continue
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading quiz data:', error);
        // Even if there's an error, we continue to the quiz (could add error handling)
        setIsLoading(false);
      }
    };

    loadQuizData();
  }, []);

  const handleLoadingComplete = () => {
    // Navigate to the quiz page when loading is complete
    navigate('/quiz');
  };

  return (
    <LoadingQuotes 
      minimumLoadTime={5000} // 5 seconds minimum loading time
      onComplete={handleLoadingComplete}
      // Pass isLoading to potentially show different states if needed
      isDataReady={!isLoading}
    />
  );
};

export default LoadingPage;