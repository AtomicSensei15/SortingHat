import React, { useState } from 'react';
import { SortingHatHero } from './SortingHatHero';
import { MagicalQuiz } from './MagicalQuiz';
import { HouseResult } from './HouseResult';
import { MagicalFooter } from './MagicalFooter';
import { AudioProvider, AudioControls } from './AudioManager';
import { MagicalBackground } from './MagicalBackground';
import { GameProgress } from './GameProgress';
import { useAudio } from './AudioManager';

type AppState = 'hero' | 'quiz' | 'result';

export const SortingApp: React.FC = () => {
  const [currentState, setCurrentState] = useState<AppState>('hero');
  const [sortingResult, setSortingResult] = useState<{
    house: string;
    description: string;
  } | null>(null);
  const [gameScore, setGameScore] = useState(0);
  const [achievements, setAchievements] = useState<string[]>([]);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);

  const handleGetSorted = () => {
    setCurrentState('quiz');
    setGameScore(10); // Starting bonus
    setAchievements(['Journey Begun']);
    // Smooth scroll to quiz section
    setTimeout(() => {
      const quizElement = document.getElementById('quiz-section');
      if (quizElement) {
        quizElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const simulateAISorting = (quizData: any): { house: string; description: string } => {
    // Simulate AI processing based on quiz responses
    const houses = ['gryffindor', 'ravenclaw', 'hufflepuff', 'slytherin'];
    
    // Simple logic based on answers or personality text
    let houseScores = {
      gryffindor: 0,
      ravenclaw: 0,
      hufflepuff: 0,
      slytherin: 0
    };

    // Analyze personality text if provided
    if (quizData.personalityText) {
      const text = quizData.personalityText.toLowerCase();
      
      // Gryffindor keywords
      if (text.includes('brave') || text.includes('courage') || text.includes('bold') || 
          text.includes('adventure') || text.includes('hero') || text.includes('leader')) {
        houseScores.gryffindor += 2;
      }
      
      // Ravenclaw keywords  
      if (text.includes('smart') || text.includes('learn') || text.includes('study') ||
          text.includes('knowledge') || text.includes('book') || text.includes('creative')) {
        houseScores.ravenclaw += 2;
      }
      
      // Hufflepuff keywords
      if (text.includes('loyal') || text.includes('kind') || text.includes('friend') ||
          text.includes('help') || text.includes('fair') || text.includes('patient')) {
        houseScores.hufflepuff += 2;
      }
      
      // Slytherin keywords
      if (text.includes('ambitious') || text.includes('success') || text.includes('power') ||
          text.includes('win') || text.includes('achieve') || text.includes('goal')) {
        houseScores.slytherin += 2;
      }
    }

    // Analyze quiz answers if provided
    Object.values(quizData.answers || {}).forEach((answer: any) => {
      if (typeof answer === 'string') {
        const answerLower = answer.toLowerCase();
        
        if (answerLower.includes('courage') || answerLower.includes('adventure') || answerLower.includes('brave')) {
          houseScores.gryffindor += 1;
        } else if (answerLower.includes('intelligence') || answerLower.includes('learning') || answerLower.includes('wisdom')) {
          houseScores.ravenclaw += 1;
        } else if (answerLower.includes('loyalty') || answerLower.includes('kindness') || answerLower.includes('friends')) {
          houseScores.hufflepuff += 1;
        } else if (answerLower.includes('ambition') || answerLower.includes('goals') || answerLower.includes('cunning')) {
          houseScores.slytherin += 1;
        }
      }
    });

    // Add some randomness if scores are tied
    Object.keys(houseScores).forEach(house => {
      houseScores[house as keyof typeof houseScores] += Math.random();
    });

    // Find the house with highest score
    const sortedHouses = Object.entries(houseScores).sort(([,a], [,b]) => b - a);
    const selectedHouse = sortedHouses[0][0];

    // Generate house-specific descriptions
    const descriptions = {
      gryffindor: "I see great courage and bravery within you! You face challenges head-on and stand up for what's right. Your boldness and determination shine brightly, making you a natural leader who inspires others to be their best.",
      
      ravenclaw: "Your mind is sharp and curious, always seeking knowledge and understanding! You approach problems with wisdom and creativity, finding elegant solutions others might miss. Your love of learning makes you truly special.",
      
      hufflepuff: "What a loyal and kind heart you have! You value friendship, fairness, and hard work above all else. Your dedication to helping others and your unwavering patience make you a treasured friend and ally.",
      
      slytherin: "Ah, ambitious and cunning! You know what you want and you're determined to achieve it. Your resourcefulness and strategic mind will take you far. You understand that sometimes great things require great sacrifices."
    };

    return {
      house: selectedHouse,
      description: descriptions[selectedHouse as keyof typeof descriptions]
    };
  };

  const handleQuizSubmit = (quizData: any) => {
    // Calculate score based on answers
    const answerCount = Object.keys(quizData.answers || {}).length;
    const textLength = quizData.personalityText?.length || 0;
    
    let bonusScore = 0;
    if (answerCount === 4) bonusScore += 20; // Complete quiz bonus
    if (textLength > 50) bonusScore += 15; // Detailed personality bonus
    if (textLength > 100) bonusScore += 10; // Very detailed bonus
    
    setGameScore(prev => prev + bonusScore);
    setQuestionsAnswered(answerCount);
    
    // Add achievements
    const newAchievements = [...achievements];
    if (answerCount === 4 && !achievements.includes('Quiz Master')) {
      newAchievements.push('Quiz Master');
    }
    if (textLength > 100 && !achievements.includes('Storyteller')) {
      newAchievements.push('Storyteller');
    }
    setAchievements(newAchievements);
    
    // Simulate AI processing
    const result = simulateAISorting(quizData);
    setSortingResult(result);
    setCurrentState('result');
    
    // Add house-specific achievement
    if (!achievements.includes(`${result.house} Sorted`)) {
      setAchievements(prev => [...prev, `${result.house} Sorted`]);
    }
    
    // Smooth scroll to result section
    setTimeout(() => {
      const resultElement = document.getElementById('result-section');
      if (resultElement) {
        resultElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleRetake = () => {
    setCurrentState('hero');
    setSortingResult(null);
    setGameScore(0);
    setAchievements([]);
    setQuestionsAnswered(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AudioProvider>
      <div className="min-h-screen">
        <AudioControls />
        
        {/* Hero Section */}
        <MagicalBackground variant="hero">
          <SortingHatHero onGetSorted={handleGetSorted} />
        </MagicalBackground>
        
        {/* Game Progress - Shows during quiz */}
        {currentState === 'quiz' && (
          <div className="fixed top-20 left-4 z-40 w-80 max-w-sm">
            <GameProgress
              currentStep={questionsAnswered + 1}
              totalSteps={4}
              score={gameScore}
              achievements={achievements}
            />
          </div>
        )}
        
        {/* Quiz Section */}
        <div id="quiz-section">
          <MagicalBackground variant="quiz">
            <MagicalQuiz 
              onSubmit={handleQuizSubmit}
              isVisible={currentState === 'quiz'}
              onAnswerChange={(count) => setQuestionsAnswered(count)}
              gameScore={gameScore}
            />
          </MagicalBackground>
        </div>
        
        {/* Result Section */}
        <div id="result-section">
          {sortingResult && (
            <MagicalBackground 
              variant="result" 
              house={sortingResult.house as any}
            >
              <HouseResult
                house={sortingResult.house}
                description={sortingResult.description}
                onRetake={handleRetake}
                isVisible={currentState === 'result'}
                gameScore={gameScore}
                achievements={achievements}
              />
            </MagicalBackground>
          )}
        </div>
        
        {/* Footer */}
        <MagicalBackground variant="footer">
          <MagicalFooter />
        </MagicalBackground>
      </div>
    </AudioProvider>
  );
};