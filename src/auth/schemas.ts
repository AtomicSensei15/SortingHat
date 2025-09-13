import { z } from 'zod';

// User schema for validation
export const userSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters long' })
    .max(20, { message: 'Username must be at most 20 characters long' })
    .regex(/^[a-zA-Z0-9_]+$/, { 
      message: 'Username can only contain letters, numbers, and underscores' 
    }),
  email: z
    .string()
    .email({ message: 'Please enter a valid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
    .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
    .regex(/[0-9]/, { message: 'Password must contain at least one number' })
});

// Login schema for validation
export const loginSchema = z.object({
  email: z
    .string()
    .email({ message: 'Please enter a valid email address' }),
  password: z
    .string()
    .min(1, { message: 'Password is required' })
});

// Type definitions derived from the schemas
export type User = z.infer<typeof userSchema>;
export type LoginCredentials = z.infer<typeof loginSchema>;

// User with ID for authenticated users
export type AuthUser = User & { id: string };