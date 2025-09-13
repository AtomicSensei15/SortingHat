import { AuthForms } from './components/AuthForms';
import { UserProfile } from './components/UserProfile';
import { AuthProvider } from './AuthContext';
import { useAuth } from './useAuth';

// Re-export auth components and hooks
export { AuthProvider, AuthForms, UserProfile, useAuth };