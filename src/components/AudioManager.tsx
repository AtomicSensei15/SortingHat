import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AudioContextType {
  playSound: (sound: string, volume?: number) => void;
  playMusic: (music: string, loop?: boolean) => void;
  stopMusic: () => void;
  setMasterVolume: (volume: number) => void;
  isMuted: boolean;
  toggleMute: () => void;
}

const AudioContext = createContext<AudioContextType | null>(null);

// Sound URLs (you can replace these with actual audio files)
const soundUrls = {
  // Ambient sounds
  'hogwarts-ambient': 'https://www.soundjay.com/misc/sounds-937.wav', // Placeholder - replace with actual ambient sound
  'sorting-hat-voice': 'https://www.soundjay.com/misc/sounds-938.wav', // Placeholder
  'magic-sparkle': 'https://www.soundjay.com/misc/sounds-939.wav', // Placeholder
  'page-turn': 'https://www.soundjay.com/misc/sounds-940.wav', // Placeholder
  'spell-cast': 'https://www.soundjay.com/misc/sounds-941.wav', // Placeholder
  'achievement': 'https://www.soundjay.com/misc/sounds-942.wav', // Placeholder
  'house-reveal': 'https://www.soundjay.com/misc/sounds-943.wav', // Placeholder
  
  // House themes (placeholder URLs)
  'gryffindor-theme': 'https://www.soundjay.com/misc/sounds-944.wav',
  'ravenclaw-theme': 'https://www.soundjay.com/misc/sounds-945.wav',
  'hufflepuff-theme': 'https://www.soundjay.com/misc/sounds-946.wav',
  'slytherin-theme': 'https://www.soundjay.com/misc/sounds-947.wav',
};

interface AudioProviderProps {
  children: React.ReactNode;
}

export const AudioProvider: React.FC<AudioProviderProps> = ({ children }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [masterVolume, setMasterVolumeState] = useState(0.3);
  const musicRef = useRef<HTMLAudioElement | null>(null);
  const soundsRef = useRef<Map<string, HTMLAudioElement>>(new Map());

  useEffect(() => {
    // Initialize audio elements
    Object.entries(soundUrls).forEach(([key, url]) => {
      const audio = new Audio();
      // For demo purposes, we'll use a simple beep sound generation
      // In production, replace with actual audio files
      audio.src = createBeepSound(key);
      audio.preload = 'auto';
      soundsRef.current.set(key, audio);
    });

    // Start ambient music
    playMusic('hogwarts-ambient', true);

    return () => {
      // Cleanup
      soundsRef.current.forEach(audio => {
        audio.pause();
        audio.src = '';
      });
      if (musicRef.current) {
        musicRef.current.pause();
        musicRef.current.src = '';
      }
    };
  }, []);

  // Create a simple beep sound for demo (replace with actual audio files)
  const createBeepSound = (type: string) => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Different frequencies for different sound types
    const frequencies: Record<string, number> = {
      'magic-sparkle': 800,
      'spell-cast': 600,
      'achievement': 1000,
      'page-turn': 400,
      'house-reveal': 1200,
      'sorting-hat-voice': 300,
    };
    
    oscillator.frequency.setValueAtTime(frequencies[type] || 500, audioContext.currentTime);
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
    
    // Return a data URL (this is just for demo - use real audio files in production)
    return 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+D3y3giBjWL1vLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+D3y3giBjWL1vLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+D3y3giBjWL1vLNeSsFA==';
  };

  const playSound = (sound: string, volume: number = 1) => {
    if (isMuted) return;
    
    const audio = soundsRef.current.get(sound);
    if (audio) {
      audio.volume = masterVolume * volume;
      audio.currentTime = 0;
      audio.play().catch(console.warn); // Catch autoplay restrictions
    }
  };

  const playMusic = (music: string, loop: boolean = false) => {
    if (isMuted) return;
    
    if (musicRef.current) {
      musicRef.current.pause();
    }
    
    const audio = soundsRef.current.get(music);
    if (audio) {
      musicRef.current = audio;
      audio.volume = masterVolume * 0.3; // Background music should be quieter
      audio.loop = loop;
      audio.play().catch(console.warn);
    }
  };

  const stopMusic = () => {
    if (musicRef.current) {
      musicRef.current.pause();
      musicRef.current.currentTime = 0;
    }
  };

  const setMasterVolume = (volume: number) => {
    setMasterVolumeState(volume);
    if (musicRef.current) {
      musicRef.current.volume = volume * 0.3;
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (musicRef.current) {
      if (!isMuted) {
        musicRef.current.pause();
      } else {
        musicRef.current.play().catch(console.warn);
      }
    }
  };

  const contextValue: AudioContextType = {
    playSound,
    playMusic,
    stopMusic,
    setMasterVolume,
    isMuted,
    toggleMute,
  };

  return (
    <AudioContext.Provider value={contextValue}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};

export const AudioControls: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { isMuted, toggleMute } = useAudio();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleMute}
      className={`fixed top-4 right-4 z-50 bg-magical-dark/80 hover:bg-magical-dark text-candlelight border border-candlelight/30 ${className}`}
      title={isMuted ? 'Unmute' : 'Mute'}
    >
      {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
    </Button>
  );
};