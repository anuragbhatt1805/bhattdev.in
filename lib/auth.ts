import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export interface User {
  id: string;
  username: string;
  active: boolean;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export async function validateUser(username: string, password: string): Promise<User | null> {
  try {
    const user = await prisma.user.findUnique({
      where: { username },
      select: {
        id: true,
        username: true,
        password: true,
        active: true,
        isAdmin: true,
        createdAt: true,
        updatedAt: true
      }
    });

    if (!user || !user.active) {
      return null;
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return null;
    }

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  } catch (error) {
    console.error('User validation error:', error);
    return null;
  }
}

export function createUserSession(user: User): string {
  const sessionData = {
    id: user.id,
    username: user.username,
    isAdmin: user.isAdmin,
    timestamp: Date.now()
  };
  return btoa(JSON.stringify(sessionData));
}

export function validateUserSession(token: string): { user: User; isValid: boolean } | null {
  try {
    const decoded = atob(token);
    const sessionData = JSON.parse(decoded);
    const { id, username, isAdmin, timestamp } = sessionData;
    
    const now = Date.now();
    const tokenAge = now - timestamp;
    
    // Token expires after 24 hours
    const isValid = tokenAge < 24 * 60 * 60 * 1000;
    
    if (!isValid) {
      return null;
    }

    const user: User = {
      id,
      username,
      active: true,
      isAdmin,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    return { user, isValid };
  } catch (error) {
    console.error('Token validation error:', error);
    return null;
  }
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}