import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, Stars, Wand2, Crown, Zap, Home } from 'lucide-react';
import heroImage from '@/assets/sorting-hat-hero.jpg';
import { useAudio } from './AudioManager';
import { useAuth } from '@/auth';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

interface SortingHatHeroProps {
  onGetSorted: () => void;
}

export const SortingHatHero: React.FC<SortingHatHeroProps> = ({ onGetSorted }) => {
  const { playSound } = useAudio();
  const { user } = useAuth();
  const navigate = useNavigate();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dashboardBtnRef = useRef<HTMLButtonElement>(null);
  const floatingElementsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create a simplified animation sequence with reduced complexity
    const tl = gsap.timeline({
      defaults: {
        duration: 0.8, // Shorter durations
        ease: "power2.out" // Simpler easing
      }
    });
    
    // Optimize by using batch animations instead of individual tweens
    // Pre-set initial states in one batch
    gsap.set([titleRef.current, subtitleRef.current, buttonRef.current, dashboardBtnRef.current].filter(Boolean), { opacity: 0, y: 30 });
    
    // Animate title and subtitle together
    tl.to([titleRef.current, subtitleRef.current], {
      opacity: 1,
      y: 0,
      stagger: 0.2 // Small stagger instead of separate animations
    }, 0);
    
    // Animate buttons
    tl.to([buttonRef.current, dashboardBtnRef.current].filter(Boolean), {
      opacity: 1,
      y: 0,
      duration: 0.5, // Even shorter duration
      stagger: 0.15
    }, 0.4);
    
    // Only animate 2-3 floating elements instead of all
    if (floatingElementsRef.current && floatingElementsRef.current.children.length > 0) {
      // Take only first 3 elements
      const limitedElements = [
        floatingElementsRef.current.children[0],
        floatingElementsRef.current.children[2],
        floatingElementsRef.current.children[4]
      ].filter(Boolean);
      
      gsap.set(limitedElements, { opacity: 0 });
      tl.to(limitedElements, {
        opacity: 0.8, // Less opacity
        stagger: 0.3,
        duration: 0.6
      }, 0.2);
    }
  }, []);

  const handleGetSorted = () => {
    playSound('magic-sparkle');
    setTimeout(() => playSound('spell-cast'), 300);
    
    // Add exit animation before navigation
    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        scale: 1.1,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        onComplete: onGetSorted
      });
    } else {
      onGetSorted();
    }
  };

  const handleEnterHouse = () => {
    playSound('magic-sparkle');
    
    // Add exit animation before navigation
    if (dashboardBtnRef.current) {
      gsap.to(dashboardBtnRef.current, {
        scale: 1.1,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        onComplete: () => navigate('/profile')
      });
    } else {
      navigate('/profile');
    }
  };
  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-magical"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        // Remove fixed attachment for better performance
        // backgroundAttachment: 'fixed'
      }}
    >

      {/* Reduced floating magical elements - fewer elements and simpler animations */}
      <div ref={floatingElementsRef} className="absolute inset-0 overflow-hidden">
        {/* Reduced to just 3 key elements */}
        <div className="absolute top-20 left-10">
          <Sparkles className="w-8 h-8 text-candlelight opacity-80" /> {/* Removed animation */}
        </div>
        <div className="absolute bottom-32 left-20">
          <Wand2 className="w-10 h-10 text-gryffindor-secondary" /> {/* Removed animation */}
        </div>
        <div className="absolute top-1/3 left-1/4">
          <Zap className="w-6 h-6 text-hufflepuff-secondary" /> {/* Removed animation */}
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        {/* Main title with optimized effects */}
        <h1 
          ref={titleRef}
          className="font-magical text-6xl md:text-8xl lg:text-9xl font-bold mb-6 text-candlelight"
          // Removed magical-text animate-text-sparkle
        >
          Sorting Hat 2.0
        </h1>
        
        {/* Subtitle */}
        <div 
          ref={subtitleRef}
          className="font-story text-xl md:text-2xl lg:text-3xl mb-12 text-parchment"
        >
          Discover your Hogwarts House with AI magic
        </div>
        
        {/* Simplified CTA Button */}
        <Button 
          ref={buttonRef}
          variant="magical" 
          size="lg" 
          className="text-xl md:text-2xl px-12 py-6 h-auto group relative overflow-hidden mb-4"
          onClick={handleGetSorted}
          // Removed interactive-spark magical-hover
        >
          <Sparkles className="w-6 h-6 mr-3" /> {/* Removed animations */}
          <span className="relative z-10">Get Sorted</span>
          <Sparkles className="w-6 h-6 ml-3" /> {/* Removed animations */}
          
          {/* Simplified hover effect */}
          <div className="absolute inset-0 bg-candlelight-glow/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Button>
        
        {/* Enter Your House button - only visible when logged in */}
        {user && (
          <Button 
            ref={dashboardBtnRef}
            variant="outline" 
            size="lg" 
            className="text-xl md:text-2xl px-12 py-6 h-auto group relative overflow-hidden mt-4 border-parchment text-parchment hover:bg-parchment/10"
            onClick={handleEnterHouse}
          >
            <Home className="w-6 h-6 mr-3" />
            <span className="relative z-10">Enter Your House</span>
            <Crown className="w-6 h-6 ml-3" />
          </Button>
        )}
        
        {/* Static achievement text */}
        <div className="mt-8">
          <p className="font-story text-sm text-parchment/80">
            ✨ Join over 100,000 wizards already sorted! ✨
          </p>
        </div>
      </div>

      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-magical-dark/60 via-transparent to-magical-dark/40 pointer-events-none" />
    </section>
  );
};