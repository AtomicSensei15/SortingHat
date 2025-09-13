import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userSchema, User } from '../schemas';
import { useAuth } from '../useAuth';

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Label } from '@/components/ui/label';
import { Wand2 } from 'lucide-react';

interface SignupFormProps {
  onSuccess?: () => void;
  onSwitchToLogin: () => void;
}

export const SignupForm: React.FC<SignupFormProps> = ({ 
  onSuccess,
  onSwitchToLogin 
}) => {
  const { register: registerUser, error, isLoading, clearError } = useAuth();
  
  const { register, handleSubmit, formState: { errors } } = useForm<User>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      username: '',
      email: '',
      password: ''
    }
  });

  const onSubmit = async (data: User) => {
    const result = await registerUser(data);
    if (result && onSuccess) {
      onSuccess();
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-gradient-parchment border-candlelight/30 shadow-magical">
      <CardHeader className="pb-2">
        <CardTitle className="font-magical text-3xl text-center text-candlelight">
          Join Hogwarts
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4 border-red-500/50 bg-red-50/50">
            <AlertDescription className="font-story">{error}</AlertDescription>
          </Alert>
        )}
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username" className="font-story text-magical-dark text-lg">Username</Label>
            <Input
              id="username"
              {...register('username')}
              type="text"
              placeholder="HarryPotter"
              className="bg-parchment/50 border-candlelight/40 focus:border-candlelight text-lg py-6"
              onClick={clearError}
            />
            {errors.username && (
              <p className="text-red-500 text-sm font-story">{errors.username.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="font-story text-magical-dark text-lg">Email</Label>
            <Input
              id="email"
              {...register('email')}
              type="email"
              placeholder="wizard@hogwarts.edu"
              className="bg-parchment/50 border-candlelight/40 focus:border-candlelight text-lg py-6"
              onClick={clearError}
            />
            {errors.email && (
              <p className="text-red-500 text-sm font-story">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="font-story text-magical-dark text-lg">Password</Label>
            <Input
              id="password"
              {...register('password')}
              type="password"
              placeholder="Create a strong spell (password)"
              className="bg-parchment/50 border-candlelight/40 focus:border-candlelight text-lg py-6"
              onClick={clearError}
            />
            {errors.password && (
              <p className="text-red-500 text-sm font-story">{errors.password.message}</p>
            )}
            <p className="text-xs text-gray-600 font-story mt-1">
              Password must be at least 8 characters with uppercase, lowercase, and a number
            </p>
          </div>

          <Button 
            type="submit"
            variant="spell"
            className="w-full py-6 h-auto text-lg mt-4"
            disabled={isLoading}
          >
            <Wand2 className="w-5 h-5 mr-2 animate-sparkle" />
            {isLoading ? 'Casting Spell...' : 'Create Magical Account'}
          </Button>
        </form>
      </CardContent>
      
      <CardFooter className="flex justify-center pb-6">
        <p className="font-story text-magical-dark text-base">
          Already have an account?{' '}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-gryffindor hover:underline focus:outline-none font-bold"
          >
            Login with your wand
          </button>
        </p>
      </CardFooter>
    </Card>
  );
};