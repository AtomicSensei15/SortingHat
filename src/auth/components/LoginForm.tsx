import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginCredentials } from '../schemas';
import { useAuth } from '../useAuth';

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Label } from '@/components/ui/label';
import { Wand2 } from 'lucide-react';

interface LoginFormProps {
  onSuccess?: () => void;
  onSwitchToSignup: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ 
  onSuccess,
  onSwitchToSignup 
}) => {
  const { login, error, isLoading, clearError } = useAuth();
  
  const { register, handleSubmit, formState: { errors } } = useForm<LoginCredentials>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async (data: LoginCredentials) => {
    const result = await login(data);
    if (result && onSuccess) {
      onSuccess();
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-gradient-parchment border-candlelight/30 shadow-magical">
      <CardHeader className="pb-2">
        <CardTitle className="font-magical text-3xl text-center text-candlelight">
          Return to Hogwarts
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
              placeholder="••••••••"
              className="bg-parchment/50 border-candlelight/40 focus:border-candlelight text-lg py-6"
              onClick={clearError}
            />
            {errors.password && (
              <p className="text-red-500 text-sm font-story">{errors.password.message}</p>
            )}
          </div>

          <Button 
            type="submit"
            variant="spell"
            className="w-full py-6 h-auto text-lg mt-4"
            disabled={isLoading}
          >
            <Wand2 className="w-5 h-5 mr-2 animate-sparkle" />
            {isLoading ? 'Casting Spell...' : 'Login with Magic'}
          </Button>
        </form>
      </CardContent>
      
      <CardFooter className="flex justify-center pb-6">
        <p className="font-story text-magical-dark text-base">
          New to Hogwarts?{' '}
          <button
            type="button"
            onClick={onSwitchToSignup}
            className="text-ravenclaw hover:underline focus:outline-none font-bold"
          >
            Sign up for the Sorting Ceremony
          </button>
        </p>
      </CardFooter>
    </Card>
  );
};