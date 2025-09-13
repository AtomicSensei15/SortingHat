import { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { ParticleSystem } from './ParticleSystem';

// Array of magical quotes to display during loading
const magicalQuotes = [
  "\"It does not do to dwell on dreams and forget to live.\" — Albus Dumbledore",
  "\"Happiness can be found even in the darkest of times, if one only remembers to turn on the light.\" — Albus Dumbledore",
  "\"It takes a great deal of bravery to stand up to our enemies, but just as much to stand up to our friends.\" — Albus Dumbledore",
  "\"Fear of a name only increases fear of the thing itself.\" — Hermione Granger",
  "\"I solemnly swear that I am up to no good.\" — The Marauders",
  "\"Wit beyond measure is man's greatest treasure.\" — Rowena Ravenclaw",
  "\"We've all got both light and dark inside us. What matters is the part we choose to act on.\" — Sirius Black",
  "\"Differences of habit and language are nothing at all if our aims are identical and our hearts are open.\" — Albus Dumbledore",
  "\"It matters not what someone is born, but what they grow to be.\" — Albus Dumbledore",
  "\"Time will not slow down when something unpleasant lies ahead.\" — J.K. Rowling",
  "\"The wand chooses the wizard.\" — Ollivander",
  "\"Curious indeed how these things happen. The wand chooses the wizard, remember.\" — Ollivander",
  "\"Things we lose have a way of coming back to us in the end, if not always in the way we expect.\" — Luna Lovegood",
  "\"You sort of start thinking anything's possible if you've got enough nerve.\" — Ginny Weasley",
  "\"It is our choices that show what we truly are, far more than our abilities.\" — Albus Dumbledore",
  "\"Do not pity the dead, Harry. Pity the living, and, above all, those who live without love.\" — Albus Dumbledore",
  "\"Words are, in my not-so-humble opinion, our most inexhaustible source of magic.\" — Albus Dumbledore",
  "\"Of course it is happening inside your head, Harry, but why on earth should that mean that it is not real?\" — Albus Dumbledore",
  "\"Indifference and neglect often do much more damage than outright dislike.\" — Albus Dumbledore",
  "\"Dark and difficult times lie ahead. Soon we must all face the choice between what is right and what is easy.\" — Albus Dumbledore"
];

interface LoadingQuotesProps {
  minimumLoadTime?: number; // in milliseconds
  onComplete?: () => void;
  isDataReady?: boolean; // Indicates if data is ready (optional)
}

const LoadingQuotes = ({ minimumLoadTime = 5000, onComplete, isDataReady = true }: LoadingQuotesProps) => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  // Change quote every 3 seconds
  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => 
        (prevIndex + 1) % magicalQuotes.length
      );
    }, 3000);

    return () => clearInterval(quoteInterval);
  }, []);

  // Progress bar simulation
  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min(100, (elapsed / minimumLoadTime) * 100);
      setProgress(newProgress);
      
      if (newProgress >= 100 && isDataReady) {
        setIsLoading(false);
        clearInterval(interval);
        if (onComplete) onComplete();
      }
    }, 100);

    return () => clearInterval(interval);
  }, [minimumLoadTime, onComplete, isDataReady]);

  const handleSkip = useCallback(() => {
    setIsLoading(false);
    navigate('/quiz');
  }, [navigate]);

  return (
    <motion.div 
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-amber-900/40 to-amber-950/60 p-6 text-amber-100 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Magical particle effects */}
      <div className="absolute inset-0 z-0">
        <ParticleSystem 
          intensity="high" 
          type="sorting" 
          className="w-full h-full" 
        />
      </div>
      <div className="max-w-xl mx-auto text-center z-10">
        <motion.div 
          className="mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl md:text-3xl font-serif mb-2">Preparing Your Sorting Ceremony</h2>
          <p className="text-amber-200/80">The Sorting Hat is collecting its thoughts...</p>
        </motion.div>

        {/* Spinning Hat Animation */}
        <motion.div 
          className="w-32 h-32 mx-auto mb-8"
          animate={{ 
            rotate: 360,
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            rotate: { 
              duration: 10, 
              repeat: Infinity, 
              ease: "linear" 
            },
            scale: {
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className="w-full h-full">
            {/* Hat Base */}
            <path fill="#8B4513" d="M10,45 C14,25 32,10 54,14 C56,23 52,42 32,42 C18,42 10,45 10,45 Z" />
            {/* Hat Top/Cone */}
            <path fill="#654321" d="M54,14 C52,5 46,4 44,3 C40,2 32,8 32,8 C32,8 24,4 18,10 C12,16 10,25 10,45 C15,38 22,30 32,30 C45,30 52,22 54,14 Z" />
            {/* Hat Band */}
            <path fill="#5D4037" d="M10,45 C10,45 15,35 32,35 C49,35 54,14 54,14 C54,14 49,22 32,22 C15,22 10,45 10,45 Z" />
            {/* Hat Details/Creases */}
            <path fill="#3E2723" d="M30,8 C30,8 35,12 38,16 C41,20 43,14 43,14 C43,14 38,8 30,8 Z" />
            <path fill="#3E2723" d="M20,16 C20,16 26,20 28,24 C30,28 33,22 33,22 C33,22 28,16 20,16 Z" />
            {/* Hat Face (subtle) */}
            <path fill="#3E2723" d="M28,32 C28,32 30,30 36,30 C36,30 36,32 32,33 C28,34 28,32 28,32 Z" />
          </svg>
        </motion.div>

        <div className="relative h-56 mb-8 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuoteIndex}
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <blockquote className="text-xl md:text-2xl font-serif italic text-amber-100">
                {magicalQuotes[currentQuoteIndex]}
              </blockquote>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="w-full max-w-md mx-auto mb-8">
          <div className="h-2 bg-amber-900/50 rounded-full overflow-hidden">
            <motion.div 
              className={`h-full ${isDataReady ? 'bg-amber-500' : 'bg-amber-700'}`}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "easeInOut" }}
            />
          </div>
          <div className="mt-2 text-sm text-amber-200/70 flex justify-between">
            <span>{isDataReady ? "Ready" : "Loading..."}</span>
            <span>{progress.toFixed(0)}%</span>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <Button 
            onClick={handleSkip}
            variant="outline" 
            className="mt-4 border-amber-500/50 text-amber-200 hover:bg-amber-800/30 hover:text-amber-100 transition-all duration-300 font-serif px-6 py-2"
          >
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, repeatDelay: 2 }}
              className="inline-block"
            >
              Skip Introduction
            </motion.span>
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingQuotes;