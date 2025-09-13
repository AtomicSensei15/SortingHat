import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MagicalQuiz } from '@/components/MagicalQuiz';
import { MagicalBackground } from '@/components/MagicalBackground';
import { GameProgress } from '@/components/GameProgress';
import { AudioProvider } from '@/components/AudioManager';

const Quiz: React.FC = () => {
  const navigate = useNavigate();
  const [gameScore, setGameScore] = useState(10); // Starting bonus
  const [achievements, setAchievements] = useState<string[]>(['Journey Begun']);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);

  const simulateAISorting = (quizData: { personalityText?: string; answers?: Record<string, string> }): { house: string; description: string } => {
    const houses = ['gryffindor', 'ravenclaw', 'hufflepuff', 'slytherin'];
    const houseScores = {
      gryffindor: 0,
      ravenclaw: 0,
      hufflepuff: 0,
      slytherin: 0
    };

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
      if (text.includes('kind') || text.includes('loyal') || text.includes('friend') ||
          text.includes('help') || text.includes('patient') || text.includes('fair')) {
        houseScores.hufflepuff += 2;
      }
      
      // Slytherin keywords
      if (text.includes('ambitious') || text.includes('cunning') || text.includes('power') ||
          text.includes('success') || text.includes('strategic') || text.includes('determined')) {
        houseScores.slytherin += 2;
      }
    }

    // Analyze quiz answers
    if (quizData.answers) {
      Object.values(quizData.answers).forEach((answer: string) => {
        if (typeof answer === 'string') {
          const answerText = answer.toLowerCase();
          
          // Score based on answer patterns
          if (answerText.includes('face it head-on') || answerText.includes('courage') || answerText.includes('adventure')) {
            houseScores.gryffindor += 1;
          }
          if (answerText.includes('analyze') || answerText.includes('intelligence') || answerText.includes('reading')) {
            houseScores.ravenclaw += 1;
          }
          if (answerText.includes('help others') || answerText.includes('loyalty') || answerText.includes('friends')) {
            houseScores.hufflepuff += 1;
          }
          if (answerText.includes('strategic') || answerText.includes('ambition') || answerText.includes('goals')) {
            houseScores.slytherin += 1;
          }
        }
      });
    }

    Object.keys(houseScores).forEach(house => {
      houseScores[house as keyof typeof houseScores] += Math.random() * 0.5;
    });

    // Find the house with the highest score
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

  const handleQuizSubmit = (quizData: { personalityText?: string; answers?: Record<string, string> }) => {
    const result = simulateAISorting(quizData);
    
    // Update achievements based on completion
    const newAchievements = [...achievements, 'Quiz Complete', 'Destiny Revealed'];
    
    // Navigate to results page with the sorting result
    navigate('/result', { 
      state: { 
        house: result.house,
        description: result.description,
        gameScore: gameScore + 50, // Completion bonus
        achievements: newAchievements
      }
    });
  };

  return (
    <AudioProvider>
      <div className="min-h-screen">
        {/* Game Progress Bar - Fixed at top */}
        <div className="fixed top-0 left-0 right-0 z-40">
          <GameProgress
            currentStep={questionsAnswered + 1}
            totalSteps={4}
            score={gameScore}
            achievements={achievements}
          />
        </div>
        
        {/* Quiz Section - Add top padding to account for fixed progress bar */}
        <div className="pt-56 mt-10">
          <MagicalBackground variant="quiz" className="min-h-screen">
            <MagicalQuiz 
              onSubmit={handleQuizSubmit}
              isVisible={true}
              onAnswerChange={(count) => setQuestionsAnswered(count)}
              gameScore={gameScore}
            />
          </MagicalBackground>
        </div>
      </div>
    </AudioProvider>
  );
};

export default Quiz;