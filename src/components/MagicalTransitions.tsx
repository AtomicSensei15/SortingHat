import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MagicalTransitionProps {
  children: React.ReactNode;
  trigger: boolean;
  type?: 'fade' | 'sparkle' | 'swirl' | 'burst';
  duration?: number;
  onComplete?: () => void;
}

export const MagicalTransition: React.FC<MagicalTransitionProps> = ({
  children,
  trigger,
  type = 'fade',
  duration = 0.8,
  onComplete
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (trigger) {
      setIsVisible(true);
      if (onComplete) {
        setTimeout(onComplete, duration * 1000);
      }
    }
  }, [trigger, duration, onComplete]);

  const getVariants = () => {
    switch (type) {
      case 'fade':
        return {
          initial: { opacity: 0, scale: 0.8 },
          animate: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 0.8 }
        };
      case 'sparkle':
        return {
          initial: { opacity: 0, rotate: -180, scale: 0 },
          animate: { opacity: 1, rotate: 0, scale: 1 },
          exit: { opacity: 0, rotate: 180, scale: 0 }
        };
      case 'swirl':
        return {
          initial: { opacity: 0, rotate: -360, x: -100 },
          animate: { opacity: 1, rotate: 0, x: 0 },
          exit: { opacity: 0, rotate: 360, x: 100 }
        };
      case 'burst':
        return {
          initial: { opacity: 0, scale: 0, rotate: -90 },
          animate: { opacity: 1, scale: [0, 1.2, 1], rotate: 0 },
          exit: { opacity: 0, scale: 0, rotate: 90 }
        };
      default:
        return {
          initial: { opacity: 0, scale: 0.8 },
          animate: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 0.8 }
        };
    }
  };

  const getTransition = () => {
    switch (type) {
      case 'sparkle':
        return { type: "spring" as const, stiffness: 200, damping: 10 };
      case 'swirl':
        return { type: "spring" as const, stiffness: 100, damping: 15 };
      case 'burst':
        return { 
          duration: 0.6,
          times: [0, 0.6, 1],
          type: "spring" as const,
          stiffness: 300
        };
      default:
        return { duration };
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          initial="initial"
          animate="animate"
          exit="exit"
          variants={getVariants()}
          transition={getTransition()}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface MagicalRevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export const MagicalReveal: React.FC<MagicalRevealProps> = ({
  children,
  delay = 0,
  direction = 'up'
}) => {
  const getInitialPosition = () => {
    switch (direction) {
      case 'up': return { y: 50, x: 0 };
      case 'down': return { y: -50, x: 0 };
      case 'left': return { x: 50, y: 0 };
      case 'right': return { x: -50, y: 0 };
      default: return { y: 50, x: 0 };
    }
  };

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        ...getInitialPosition(),
        filter: 'blur(10px)'
      }}
      animate={{ 
        opacity: 1, 
        y: 0, 
        x: 0,
        filter: 'blur(0px)'
      }}
      transition={{ 
        duration: 0.8, 
        delay,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
    >
      {children}
    </motion.div>
  );
};

interface TypewriterEffectProps {
  text: string;
  speed?: number;
  className?: string;
  onComplete?: () => void;
}

export const TypewriterEffect: React.FC<TypewriterEffectProps> = ({
  text,
  speed = 50,
  className = '',
  onComplete
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timer);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, speed, onComplete]);

  return (
    <span className={className}>
      {displayedText}
      {currentIndex < text.length && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="ml-1"
        >
          |
        </motion.span>
      )}
    </span>
  );
};