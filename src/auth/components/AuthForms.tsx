import React, { useState } from 'react';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';
import { useAuth } from '../useAuth';

interface AuthFormsProps {
  onAuthSuccess?: () => void;
}

export const AuthForms: React.FC<AuthFormsProps> = ({ onAuthSuccess }) => {
  const [formType, setFormType] = useState<'login' | 'signup'>('login');
  const { user } = useAuth();

  // If user is already authenticated, don't show the forms
  if (user) {
    return null;
  }

  return (
    <div className="animate-fade-in-up transition-all duration-300 bg-parchment/10 p-6 rounded-lg backdrop-blur-sm">
      {formType === 'login' ? (
        <LoginForm 
          onSuccess={onAuthSuccess} 
          onSwitchToSignup={() => setFormType('signup')} 
        />
      ) : (
        <SignupForm 
          onSuccess={onAuthSuccess} 
          onSwitchToLogin={() => setFormType('login')} 
        />
      )}
    </div>
  );
};