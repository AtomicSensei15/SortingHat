import React from 'react';
import { Github, Twitter, Instagram, Mail, Castle } from 'lucide-react';
import castleImage from '@/assets/hogwarts-castle-footer.jpg';

export const MagicalFooter: React.FC = () => {
  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Mail, href: 'mailto:hello@sortinghat2.0', label: 'Email' }
  ];

  return (
    <footer 
      className="relative bg-magical-dark text-foreground py-20 overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.9)), url(${castleImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center bottom',
      }}
    >
      {/* Floating magical elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-2 h-2 bg-candlelight rounded-full animate-sparkle"></div>
        <div className="absolute top-20 right-20 w-3 h-3 bg-candlelight-glow rounded-full animate-float"></div>
        <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-gryffindor-secondary rounded-full animate-sparkle" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 right-1/3 w-4 h-4 bg-ravenclaw-secondary rounded-full animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Main footer content */}
        <div className="text-center mb-16">
          {/* Logo/Title */}
          <div className="mb-8">
            <Castle className="w-16 h-16 text-candlelight mx-auto mb-4 animate-glow" />
            <h3 className="font-magical text-4xl text-candlelight mb-2">
              Sorting Hat 2.0
            </h3>
            <p className="font-story text-lg text-parchment">
              Discover your magical destiny with AI-powered house sorting
            </p>
          </div>

          {/* Social Media Links */}
          <div className="flex justify-center space-x-8 mb-12">
            {socialLinks.map(({ icon: Icon, href, label }, index) => (
              <a
                key={label}
                href={href}
                className="group relative p-4 bg-magical-medium rounded-full border border-candlelight/30 hover:border-candlelight transition-all duration-300 hover:scale-110 hover:shadow-glow"
                aria-label={label}
              >
                <Icon className="w-6 h-6 text-candlelight group-hover:text-candlelight-glow transition-colors" />
                
                {/* Tooltip */}
                <span className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-candlelight text-magical-dark px-3 py-1 rounded-lg font-magical text-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  {label}
                </span>
              </a>
            ))}
          </div>

          {/* Magical Quote */}
          <div className="bg-magical-medium/50 border border-candlelight/30 rounded-lg p-8 mb-12 backdrop-blur-sm">
            <blockquote className="font-story text-xl italic text-parchment mb-4">
              "It is our choices that show what we truly are, far more than our abilities."
            </blockquote>
            <cite className="font-magical text-candlelight">— Albus Dumbledore</cite>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-candlelight/30 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-center md:text-left">
              <p className="font-story text-parchment">
                © 2024 Sorting Hat 2.0. All magical rights reserved.
              </p>
              <p className="font-story text-sm text-muted-foreground mt-1">
                Created with magic and AI ✨
              </p>
            </div>

            {/* House colors strip */}
            <div className="flex space-x-2">
              <div className="w-4 h-4 bg-gradient-gryffindor rounded-full animate-glow"></div>
              <div className="w-4 h-4 bg-gradient-ravenclaw rounded-full animate-glow" style={{animationDelay: '0.5s'}}></div>
              <div className="w-4 h-4 bg-gradient-hufflepuff rounded-full animate-glow" style={{animationDelay: '1s'}}></div>
              <div className="w-4 h-4 bg-gradient-slytherin rounded-full animate-glow" style={{animationDelay: '1.5s'}}></div>
            </div>

            {/* Back to top link */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group flex items-center space-x-2 text-candlelight hover:text-candlelight-glow transition-colors font-magical"
            >
              <Castle className="w-4 h-4 group-hover:animate-bounce" />
              <span>Return to Castle</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};