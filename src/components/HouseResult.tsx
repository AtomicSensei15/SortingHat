import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Crown, Shield, Heart, Zap, RefreshCw } from 'lucide-react';
import houseCrestsImage from '@/assets/house-crests.jpg';

interface HouseResultProps {
  house: string;
  description: string;
  onRetake: () => void;
  isVisible: boolean;
  gameScore?: number;
  achievements?: string[];
}

const houseData = {
  gryffindor: {
    icon: Crown,
    colors: 'text-gryffindor-primary',
    bgVariant: 'gryffindor',
    traits: ['Brave', 'Daring', 'Chivalrous', 'Courageous'],
    motto: '"Their daring, nerve, and chivalry set Gryffindors apart"'
  },
  ravenclaw: {
    icon: Zap,
    colors: 'text-ravenclaw-primary', 
    bgVariant: 'ravenclaw',
    traits: ['Wise', 'Clever', 'Creative', 'Curious'],
    motto: '"Wit beyond measure is man\'s greatest treasure"'
  },
  hufflepuff: {
    icon: Heart,
    colors: 'text-hufflepuff-primary',
    bgVariant: 'hufflepuff', 
    traits: ['Loyal', 'Kind', 'Patient', 'Hardworking'],
    motto: '"Those patient Hufflepuffs are true and unafraid of toil"'
  },
  slytherin: {
    icon: Shield,
    colors: 'text-slytherin-primary',
    bgVariant: 'slytherin',
    traits: ['Ambitious', 'Cunning', 'Resourceful', 'Determined'],
    motto: '"Slytherin will help you on the way to greatness"'
  }
};

export const HouseResult: React.FC<HouseResultProps> = ({ 
  house, 
  description, 
  onRetake, 
  isVisible,
  gameScore = 0,
  achievements = []
}) => {
  const [showResult, setShowResult] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setShowResult(true), 500);
      return () => clearTimeout(timer);
    } else {
      setShowResult(false);
    }
  }, [isVisible]);

  useEffect(() => {
    if (showResult && resultRef.current) {
      gsap.fromTo(resultRef.current,
        { opacity: 0, y: 40, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out' }
      );
    }
  }, [showResult]);

  if (!isVisible) return null;

  const houseInfo = houseData[house?.toLowerCase() as keyof typeof houseData];
  const HouseIcon = houseInfo?.icon || Crown;

    return (
      <section className="min-h-screen bg-gradient-magical py-20 px-6 flex items-center">
        <div className="max-w-4xl mx-auto w-full">
          
          {!showResult ? (
            // Sorting animation
            <div className="text-center animate-fade-in-up">
              <div className="relative mb-8">
                <div className="w-32 h-32 mx-auto bg-gradient-candlelight rounded-full animate-glow flex items-center justify-center">
                  <Crown className="w-16 h-16 text-magical-dark animate-sparkle" />
                </div>
                <div className="absolute inset-0 animate-spin">
                  <div className="w-40 h-40 border-4 border-transparent border-t-candlelight rounded-full mx-auto"></div>
                </div>
              </div>
              <h2 className="font-magical text-4xl text-candlelight mb-4">
                The Sorting Hat is thinking...
              </h2>
              <p className="font-story text-xl text-parchment animate-sparkle">
                "Hmm... interesting... very interesting indeed..."
              </p>
            </div>
          ) : (
            // Result display
            <div className="animate-fade-in-up">
              {/* House Announcement */}
              <div className="text-center mb-16">
                <div className="mb-8 relative">
                  <div className={`w-40 h-40 mx-auto bg-gradient-${houseInfo.bgVariant} rounded-full shadow-glow flex items-center justify-center animate-glow`}>
                    <HouseIcon className={`w-20 h-20 ${houseInfo.colors} animate-sparkle`} />
                  </div>
                  {/* Magical sparkles around the icon */}
                  <div className="absolute inset-0 animate-sparkle">
                    <div className="absolute top-4 left-1/4 w-2 h-2 bg-candlelight rounded-full animate-float"></div>
                    <div className="absolute top-12 right-1/4 w-3 h-3 bg-candlelight-glow rounded-full animate-float" style={{animationDelay: '1s'}}></div>
                    <div className="absolute bottom-8 left-1/3 w-2 h-2 bg-candlelight rounded-full animate-float" style={{animationDelay: '2s'}}></div>
                    <div className="absolute bottom-4 right-1/3 w-4 h-4 bg-candlelight-glow rounded-full animate-float" style={{animationDelay: '0.5s'}}></div>
                  </div>
                </div>
                
                <h2 className="font-magical text-6xl md:text-8xl text-candlelight mb-6 animate-glow">
                  {house?.toUpperCase()}!
                </h2>
                
                <p className="font-story text-2xl md:text-3xl text-parchment mb-8 italic">
                  {houseInfo.motto}
                </p>
              </div>
  
              {/* House Crest Display */}
              <div className="mb-16 text-center">
                <div className="relative inline-block">
                  <img 
                    src={houseCrestsImage} 
                    alt="Hogwarts House Crests" 
                    className="w-full max-w-2xl h-auto rounded-lg shadow-magical animate-float"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-magical-dark/60 to-transparent rounded-lg"></div>
                </div>
              </div>
  
              {/* House Information */}
              <Card className="mb-12 bg-gradient-parchment border-candlelight/30 shadow-magical">
                <CardContent className="p-8">
                  <h3 className="font-magical text-3xl text-magical-dark mb-6 text-center">
                    Your House Traits
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {houseInfo.traits.map((trait, index) => (
                      <div 
                        key={trait}
                        className={`text-center p-4 bg-gradient-${houseInfo.bgVariant} rounded-lg shadow-magical animate-fade-in-up`}
                        style={{ animationDelay: `${index * 0.2}s` }}
                      >
                        <span className="font-magical text-lg text-foreground">
                          {trait}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-parchment/50 p-6 rounded-lg border border-candlelight/30">
                    <h4 className="font-magical text-xl text-magical-dark mb-4">
                      The Sorting Hat Says:
                    </h4>
                    <p className="font-story text-lg text-magical-dark leading-relaxed italic">
                      "{description}"
                    </p>
                  </div>
                </CardContent>
              </Card>
  
              {/* Action Buttons */}
              <div className="text-center space-x-6">
                <Button 
                  variant={houseInfo.bgVariant as any}
                  size="lg"
                  className="text-xl px-12 py-6 h-auto"
                  onClick={() => window.location.reload()}
                >
                  <Crown className="w-6 h-6 mr-3 animate-sparkle" />
                  Celebrate Your House
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                  className="text-xl px-12 py-6 h-auto ml-4"
                  onClick={onRetake}
                >
                  <RefreshCw className="w-6 h-6 mr-3 animate-spin" />
                  Retake Quiz
                </Button>
              </div>
            </div>
          )}
        </div>
    </section>
    );
  };