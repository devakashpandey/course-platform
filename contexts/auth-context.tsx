"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User, AuthContextType } from '@/lib/types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Storage keys
const USER_KEY = 'coursehub_user';
const USERS_KEY = 'coursehub_users';

// Simple hash function for passwords (demo only - use bcrypt in production)
function simpleHash(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return hash.toString(16);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Load user from localStorage on mount
    useEffect(() => {
        try {
            const savedUser = localStorage.getItem(USER_KEY);
            if (savedUser) {
                setUser(JSON.parse(savedUser));
            }
        } catch (error) {
            console.error('Error loading user:', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Get all users from localStorage
    const getUsers = useCallback((): { [email: string]: { user: User; passwordHash: string } } => {
        try {
            const users = localStorage.getItem(USERS_KEY);
            return users ? JSON.parse(users) : {};
        } catch {
            return {};
        }
    }, []);

    // Save users to localStorage
    const saveUsers = useCallback((users: { [email: string]: { user: User; passwordHash: string } }) => {
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
    }, []);

    // Login function
    const login = useCallback(async (email: string, password: string): Promise<boolean> => {
        setIsLoading(true);
        try {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 500));

            const users = getUsers();
            const userData = users[email.toLowerCase()];

            if (!userData) {
                setIsLoading(false);
                return false;
            }

            if (userData.passwordHash !== simpleHash(password)) {
                setIsLoading(false);
                return false;
            }

            // Login successful
            setUser(userData.user);
            localStorage.setItem(USER_KEY, JSON.stringify(userData.user));
            setIsLoading(false);
            return true;
        } catch (error) {
            console.error('Login error:', error);
            setIsLoading(false);
            return false;
        }
    }, [getUsers]);

    // Signup function
    const signup = useCallback(async (name: string, email: string, password: string): Promise<boolean> => {
        setIsLoading(true);
        try {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 500));

            const users = getUsers();
            const emailLower = email.toLowerCase();

            // Check if user already exists
            if (users[emailLower]) {
                setIsLoading(false);
                return false;
            }

            // Create new user
            const newUser: User = {
                id: `user_${Date.now()}`,
                name,
                email: emailLower,
                createdAt: new Date().toISOString(),
            };

            // Save to users database
            users[emailLower] = {
                user: newUser,
                passwordHash: simpleHash(password),
            };
            saveUsers(users);

            // Create demo enrollment for first course
            const demoEnrollment = {
                id: `enroll_${Date.now()}`,
                courseId: '1', // First course from course-data
                userId: newUser.id,
                enrolledAt: new Date().toISOString(),
                progress: 35,
                completedLessons: ['lesson-1-1', 'lesson-1-2', 'lesson-2-1'],
                currentLessonId: 'lesson-2-2',
                validTill: 'Lifetime',
            };

            // Save demo enrollment
            const ENROLLMENTS_KEY = 'coursehub_enrollments';
            const existingEnrollments = localStorage.getItem(ENROLLMENTS_KEY);
            const enrollments = existingEnrollments ? JSON.parse(existingEnrollments) : [];
            enrollments.push(demoEnrollment);
            localStorage.setItem(ENROLLMENTS_KEY, JSON.stringify(enrollments));

            // Auto login after signup
            setUser(newUser);
            localStorage.setItem(USER_KEY, JSON.stringify(newUser));
            setIsLoading(false);
            return true;
        } catch (error) {
            console.error('Signup error:', error);
            setIsLoading(false);
            return false;
        }
    }, [getUsers, saveUsers]);

    // Logout function
    const logout = useCallback(() => {
        setUser(null);
        localStorage.removeItem(USER_KEY);
    }, []);

    return (
        <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
