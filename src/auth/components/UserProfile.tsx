import React from 'react';
import { useAuth } from '../useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { LogOut, User } from 'lucide-react';

interface UserProfileProps {
  onLogout?: () => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({ onLogout }) => {
  const { user, logout } = useAuth();

  if (!user) {
    return null;
  }

  const handleLogout = () => {
    logout();
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-gradient-parchment border-candlelight/30 shadow-magical">
      <CardHeader className="pb-2">
        <CardTitle className="font-magical text-2xl text-center text-candlelight flex items-center justify-center">
          <User className="w-5 h-5 mr-2" />
          Magical Profile
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="p-4 bg-parchment/50 rounded-lg">
          <div className="mb-2">
            <span className="font-story text-sm text-gray-500">Wizard Name:</span>
            <p className="font-magical text-xl text-magical-dark">{user.username}</p>
          </div>
          
          <div>
            <span className="font-story text-sm text-gray-500">Owl Mail:</span>
            <p className="font-story text-magical-dark">{user.email}</p>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-center pb-6">
        <Button 
          variant="outline" 
          onClick={handleLogout}
          className="text-gryffindor border-gryffindor/30 hover:bg-gryffindor/10"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </CardFooter>
    </Card>
  );
};