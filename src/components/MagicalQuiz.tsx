import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Wand2, BookOpen } from 'lucide-react';
import gsap from 'gsap';
import { AuthForms, UserProfile, useAuth } from '@/auth';

interface MagicalQuizProps {
  onSubmit: (answers: { answers: Record<string, string>; personalityText: string; timestamp: string }) => void;
  isVisible: boolean;
  onAnswerChange?: (count: number) => void;
  gameScore?: number;
}

// Fallback static questions (used when AI generation fails or not configured)
const fallbackQuestions = [
  {
    id: 'courage',
    question: 'When faced with danger, what is your first instinct?',
    options: [
      'Face it head-on with bravery',
      'Analyze the situation carefully first',
      'Help others to safety first',
      'Find a strategic advantage'
    ]
  },
  {
    id: 'values',
    question: 'What quality do you value most in others?',
    options: [
      'Courage and determination',
      'Intelligence and wisdom', 
      'Loyalty and kindness',
      'Ambition and cunning'
    ]
  },
  {
    id: 'free_time',
    question: 'How do you prefer to spend your free time?',
    options: [
      'Seeking adventure and excitement',
      'Reading and learning new things',
      'Spending time with friends and family',
      'Working toward your goals'
    ]
  },
  {
    id: 'fear',
    question: 'What would you fear most?',
    options: [
      'Being seen as a coward',
      'Being ignorant or foolish',
      'Being alone or unloved',
      'Being powerless or weak'
    ]
  }
];

import { generateQuizQuestions, GeneratedQuizQuestion } from '@/lib/geminiQuiz';

export const MagicalQuiz: React.FC<MagicalQuizProps> = ({ 
  onSubmit, 
  isVisible, 
  onAnswerChange,
  gameScore = 0 
}) => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [personalityText, setPersonalityText] = useState('');
  const [dynamicQuestions, setDynamicQuestions] = useState<GeneratedQuizQuestion[] | null>(null);
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [questionError, setQuestionError] = useState<string | null>(null);
  const [useFallback, setUseFallback] = useState(false);
  const quizRef = useRef<HTMLDivElement>(null);
  const questionsRef = useRef<HTMLDivElement[]>([]);
  const { user } = useAuth();

  // Load AI generated questions when component becomes visible
  useEffect(() => {
    if (isVisible && quizRef.current) {
      // Reset and animate quiz container
      gsap.fromTo(quizRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      );

      // Animate questions with stagger
      const questionCards = questionsRef.current.filter(Boolean);
      if (questionCards.length > 0) {
        gsap.fromTo(questionCards,
          { opacity: 0, y: 30, scale: 0.95 },
          { 
            opacity: 1, 
            y: 0, 
            scale: 1, 
            duration: 0.8, 
            stagger: 0.2, 
            ease: 'power2.out',
            delay: 0.3
          }
        );
      }
    }
  }, [isVisible]);
  const fetchQuestions = useCallback(async () => {
    setLoadingQuestions(true);
    setQuestionError(null);
    try {
      const result = await generateQuizQuestions();
      setDynamicQuestions(result.questions);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to generate questions';
      setQuestionError(message);
    } finally {
      setLoadingQuestions(false);
    }
  }, []);

  useEffect(() => {
    if (isVisible && !dynamicQuestions && !useFallback) {
      void fetchQuestions();
    }
  }, [isVisible, dynamicQuestions, useFallback, fetchQuestions]);

  const handleQuestionAnswer = (questionId: string, answer: string) => {
    setAnswers(prev => {
      const newAnswers = { ...prev, [questionId]: answer };
      onAnswerChange?.(Object.keys(newAnswers).length);
      return newAnswers;
    });
  };

  const handleSubmit = () => {
    const quizData = {
      answers,
      personalityText: personalityText.trim(),
      timestamp: new Date().toISOString()
    };
    onSubmit(quizData);
  };

  const currentQuestions = dynamicQuestions && !useFallback ? dynamicQuestions.map(q => ({id: q.id, question: q.question, options: q.options})) : fallbackQuestions;
  const isComplete = Object.keys(answers).length === currentQuestions.length || personalityText.trim().length > 50;

  if (!isVisible) return null;

  // Show authentication forms if user is not logged in
  if (!user) {
    return (
      <section className="py-16 px-6">
        <div ref={quizRef} className="max-w-4xl mx-auto pt-8">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="font-magical text-4xl md:text-6xl text-candlelight mb-4">
              The Sorting Ceremony
            </h2>
            <p className="font-story text-xl text-parchment mb-8">
              You must be enrolled at Hogwarts to participate in the Sorting Ceremony
            </p>
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-candlelight to-transparent mx-auto mb-8"></div>
            <p className="text-parchment/80 font-story mb-6 max-w-2xl mx-auto">
              Sign in or create a new account to discover which of the four Hogwarts houses you truly belong to. 
              Your magical journey awaits!
            </p>
          </div>
          
          {/* Authentication Forms */}
          <div className="max-w-md mx-auto">
            <AuthForms />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-6">
      <div ref={quizRef} className="max-w-4xl mx-auto pt-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="font-magical text-4xl md:text-6xl text-candlelight mb-4">
            The Sorting Ceremony
          </h2>
          <p className="font-story text-xl text-parchment">
            Answer these questions or describe yourself to discover your true Hogwarts house
          </p>
        </div>

        {/* Personality Description Option */}
        <Card className="mb-12 bg-gradient-parchment border-candlelight/30 shadow-magical animate-fade-in-up">
          <CardContent className="p-8">
            <div className="flex items-center mb-6">
              <BookOpen className="w-8 h-8 text-hufflepuff-secondary mr-4" />
              <h3 className="font-magical text-2xl text-magical-dark">Tell Us About Yourself</h3>
            </div>
            <Textarea
              placeholder="Describe your personality, values, strengths, and what drives you... The Sorting Hat is listening."
              className="min-h-32 bg-parchment/50 border-candlelight/40 text-magical-dark font-story text-lg resize-none focus:ring-candlelight focus:border-candlelight"
              value={personalityText}
              onChange={(e) => setPersonalityText(e.target.value)}
            />
          </CardContent>
        </Card>

        {/* Divider */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-4 text-candlelight">
            <div className="h-px bg-gradient-to-r from-transparent to-candlelight/50 flex-1 max-w-32" />
            <span className="font-magical text-lg">OR</span>
            <div className="h-px bg-gradient-to-l from-transparent to-candlelight/50 flex-1 max-w-32" />
          </div>
        </div>

        {/* Quiz Questions */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="font-story text-parchment/80 text-sm">
              {dynamicQuestions && !useFallback ? 'AI generated questions loaded.' : 'Using fallback static questions.'}
            </p>
            {questionError && (
              <p className="text-red-300 text-sm font-story mt-1">{questionError}</p>
            )}
          </div>
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={loadingQuestions}
              onClick={() => fetchQuestions()}
              className="border-candlelight/40 text-parchment"
            >
              {loadingQuestions ? 'Summoning...' : 'Regenerate'}
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setUseFallback(f => !f)}
              className="text-parchment/70 hover:text-parchment"
            >
              {useFallback ? 'Use AI Set' : 'Use Fallback Set'}
            </Button>
          </div>
        </div>

        {loadingQuestions && (
          <div className="text-center text-parchment/70 font-story mb-8">Conjuring questions from the Realm of AI...</div>
        )}
        <div className="space-y-8">
          {currentQuestions.map((question, index) => (
            <Card 
              key={question.id}
              ref={(el) => {
                if (el) questionsRef.current[index] = el;
              }}
              className="bg-gradient-parchment border-candlelight/30 shadow-magical"
            >
              <CardContent className="p-8">
                <div className="flex items-start mb-6">
                  <Wand2 className="w-6 h-6 text-candlelight mr-4 mt-1 animate-sparkle" />
                  <h3 className="font-magical text-xl text-magical-dark">
                    {question.question}
                  </h3>
                </div>
                <RadioGroup
                  value={answers[question.id] || ''}
                  onValueChange={(value) => handleQuestionAnswer(question.id, value)}
                  className="space-y-4"
                >
                  {question.options.map((option, optionIndex) => (
                    <div 
                      key={optionIndex} 
                      className="flex items-center space-x-3 p-4 rounded-lg bg-parchment/30 hover:bg-parchment/50 transition-colors cursor-pointer"
                      onClick={() => handleQuestionAnswer(question.id, option)}
                    >
                      <RadioGroupItem value={option} id={`${question.id}-${optionIndex}`} />
                      <Label 
                        htmlFor={`${question.id}-${optionIndex}`}
                        className="font-story text-lg text-magical-dark cursor-pointer flex-1"
                      >
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Submit Button */}
        <div className="text-center mt-16 animate-fade-in-up">
          <Button 
            variant="spell" 
            size="lg"
            className="text-xl px-16 py-6 h-auto disabled:opacity-50"
            onClick={handleSubmit}
            disabled={!isComplete}
          >
            <Wand2 className="w-6 h-6 mr-3 animate-sparkle" />
            {isComplete ? 'Cast Sorting Spell' : 'Complete the Form Above'}
            <Wand2 className="w-6 h-6 ml-3 animate-sparkle" />
          </Button>
        </div>
        
        {/* User Profile Display */}
        <div className="mt-16">
          <UserProfile />
        </div>
      </div>
    </section>
  );
};