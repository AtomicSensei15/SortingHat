import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, User, BookOpen, Trophy } from 'lucide-react';

export const MagicalNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Hide navigation on quiz page since we show progress bar there
  if (location.pathname === '/quiz') {
    return null;
  }

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/quiz', label: 'Quiz', icon: BookOpen },
    { path: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-gradient-parchment border border-candlelight/30 rounded-full shadow-magical px-4 py-2">
        <div className="flex items-center gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Button
                key={item.path}
                variant={isActive ? "default" : "ghost"}
                size="sm"
                onClick={() => navigate(item.path)}
                className={`rounded-full ${
                  isActive 
                    ? 'bg-candlelight text-magical-dark shadow-sm' 
                    : 'text-magical-dark hover:bg-candlelight/20'
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {item.label}
              </Button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};