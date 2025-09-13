import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthService } from './authService';
import { User, AuthUser, LoginCredentials } from './schemas';

// Interface for the Auth context
interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  error: string | null;
  register: (userData: User) => Promise<AuthUser | null>;
  login: (credentials: LoginCredentials) => Promise<AuthUser | null>;
  logout: () => void;
  clearError: () => void;
}

// Create the context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: false,
  error: null,
  register: async () => null,
  login: async () => null,
  logout: () => {},
  clearError: () => {}
});

// Provider props
interface AuthProviderProps {
  children: ReactNode;
}

// Auth Provider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Check for existing user session on initial load
  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
    setIsLoading(false);
  }, []);

  // Clear error
  const clearError = () => setError(null);

  // Register a new user
  const register = async (userData: User): Promise<AuthUser | null> => {
    setIsLoading(true);
    clearError();

    try {
      const newUser = AuthService.register(userData);
      
      if (!newUser) {
        setError('Username or email already exists');
        return null;
      }
      
      // Auto-login after registration
      setUser(newUser);
      AuthService.setCurrentUser(newUser);
      return newUser;
    } catch (err) {
      setError('Registration failed. Please try again.');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Login user
  const login = async (credentials: LoginCredentials): Promise<AuthUser | null> => {
    setIsLoading(true);
    clearError();

    try {
      const loggedInUser = AuthService.login(credentials);
      
      if (!loggedInUser) {
        setError('Invalid email or password');
        return null;
      }
      
      setUser(loggedInUser);
      AuthService.setCurrentUser(loggedInUser);
      return loggedInUser;
    } catch (err) {
      setError('Login failed. Please try again.');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout user
  const logout = () => {
    AuthService.logout();
    setUser(null);
  };

  // Context value
  const value = {
    user,
    isLoading,
    error,
    register,
    login,
    logout,
    clearError
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Export the AuthContext for use with hooks
export { AuthContext };