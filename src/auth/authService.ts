import { User, AuthUser, LoginCredentials } from './schemas';

/**
 * Service for managing authentication with local storage
 */
export const AuthService = {
  // Store users in local storage
  getUsers: (): AuthUser[] => {
    const usersJson = localStorage.getItem('sortinghat_users');
    return usersJson ? JSON.parse(usersJson) : [];
  },

  // Save users to local storage
  saveUsers: (users: AuthUser[]): void => {
    localStorage.setItem('sortinghat_users', JSON.stringify(users));
  },

  // Register a new user
  register: (userData: User): AuthUser | null => {
    const users = AuthService.getUsers();
    
    // Check if email already exists
    if (users.some(user => user.email === userData.email)) {
      return null; // Email already taken
    }
    
    // Check if username already exists
    if (users.some(user => user.username === userData.username)) {
      return null; // Username already taken
    }
    
    // Create new user with ID
    const newUser: AuthUser = {
      ...userData,
      id: crypto.randomUUID()
    };
    
    // Add to users array and save to storage
    users.push(newUser);
    AuthService.saveUsers(users);
    
    return newUser;
  },

  // Login a user
  login: (credentials: LoginCredentials): AuthUser | null => {
    const users = AuthService.getUsers();
    
    // Find user by email and password
    const user = users.find(
      user => user.email === credentials.email && user.password === credentials.password
    );
    
    return user || null;
  },

  // Get current authenticated user
  getCurrentUser: (): AuthUser | null => {
    const userJson = localStorage.getItem('sortinghat_current_user');
    return userJson ? JSON.parse(userJson) : null;
  },

  // Set current authenticated user
  setCurrentUser: (user: AuthUser | null): void => {
    if (user) {
      localStorage.setItem('sortinghat_current_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('sortinghat_current_user');
    }
  },

  // Logout user
  logout: (): void => {
    AuthService.setCurrentUser(null);
  },

  // Update a user's house
  updateUserHouse: (userId: string, house: 'gryffindor' | 'ravenclaw' | 'hufflepuff' | 'slytherin'): AuthUser | null => {
    const users = AuthService.getUsers();
    const userIndex = users.findIndex(user => user.id === userId);

    if (userIndex === -1) {
      return null; // User not found
    }

    // Update user's house
    users[userIndex].house = house;
    AuthService.saveUsers(users);

    // Update current user if it's the same user
    const currentUser = AuthService.getCurrentUser();
    if (currentUser && currentUser.id === userId) {
      AuthService.setCurrentUser(users[userIndex]);
    }

    return users[userIndex];
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return !!AuthService.getCurrentUser();
  }
};