"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Enrollment, CourseContextType } from '@/lib/types';
import { useAuth } from './auth-context';
import { getTotalLessons } from '@/lib/course-data';

const CourseContext = createContext<CourseContextType | undefined>(undefined);

// Storage key
const ENROLLMENTS_KEY = 'coursehub_enrollments';

export function CourseProvider({ children }: { children: React.ReactNode }) {
    const { user } = useAuth();
    const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Load enrollments from localStorage
    const loadEnrollments = useCallback(() => {
        if (!user) {
            setEnrollments([]);
            setIsLoading(false);
            return;
        }

        try {
            const allEnrollments = localStorage.getItem(ENROLLMENTS_KEY);
            const parsed: Enrollment[] = allEnrollments ? JSON.parse(allEnrollments) : [];
            // Filter enrollments for current user
            const userEnrollments = parsed.filter(e => e.userId === user.id);
            setEnrollments(userEnrollments);
        } catch (error) {
            console.error('Error loading enrollments:', error);
            setEnrollments([]);
        } finally {
            setIsLoading(false);
        }
    }, [user]);

    // Load enrollments when user changes
    useEffect(() => {
        loadEnrollments();
    }, [loadEnrollments]);

    // Save enrollment to localStorage
    const saveEnrollment = useCallback((enrollment: Enrollment) => {
        try {
            const allEnrollments = localStorage.getItem(ENROLLMENTS_KEY);
            const parsed: Enrollment[] = allEnrollments ? JSON.parse(allEnrollments) : [];

            // Check if already enrolled
            const existingIndex = parsed.findIndex(
                e => e.userId === enrollment.userId && e.courseId === enrollment.courseId
            );

            if (existingIndex !== -1) {
                parsed[existingIndex] = enrollment;
            } else {
                parsed.push(enrollment);
            }

            localStorage.setItem(ENROLLMENTS_KEY, JSON.stringify(parsed));
        } catch (error) {
            console.error('Error saving enrollment:', error);
        }
    }, []);

    // Enroll in a course
    const enrollInCourse = useCallback(async (courseId: string): Promise<boolean> => {
        if (!user) return false;

        // Check if already enrolled
        if (enrollments.some(e => e.courseId === courseId)) {
            return true; // Already enrolled
        }

        // Simulate payment delay (Razorpay integration would go here)
        await new Promise(resolve => setTimeout(resolve, 1000));

        const newEnrollment: Enrollment = {
            id: `enroll_${Date.now()}`,
            courseId,
            userId: user.id,
            enrolledAt: new Date().toISOString(),
            progress: 0,
            completedLessons: [],
            currentLessonId: null,
            validTill: 'Lifetime',
        };

        saveEnrollment(newEnrollment);
        setEnrollments(prev => [...prev, newEnrollment]);
        return true;
    }, [user, enrollments, saveEnrollment]);

    // Update progress
    const updateProgress = useCallback((courseId: string, lessonId: string) => {
        if (!user) return;

        setEnrollments(prev => {
            const updated = prev.map(enrollment => {
                if (enrollment.courseId !== courseId) return enrollment;

                const completedLessons = enrollment.completedLessons.includes(lessonId)
                    ? enrollment.completedLessons
                    : [...enrollment.completedLessons, lessonId];

                const totalLessons = getTotalLessons(courseId);
                const progress = totalLessons > 0
                    ? Math.round((completedLessons.length / totalLessons) * 100)
                    : 0;

                const updatedEnrollment = {
                    ...enrollment,
                    completedLessons,
                    currentLessonId: lessonId,
                    progress,
                };

                // Save to localStorage
                saveEnrollment(updatedEnrollment);
                return updatedEnrollment;
            });

            return updated;
        });
    }, [user, saveEnrollment]);

    // Get enrollment for a course
    const getEnrollment = useCallback((courseId: string): Enrollment | undefined => {
        return enrollments.find(e => e.courseId === courseId);
    }, [enrollments]);

    // Check if enrolled in a course
    const isEnrolled = useCallback((courseId: string): boolean => {
        return enrollments.some(e => e.courseId === courseId);
    }, [enrollments]);

    return (
        <CourseContext.Provider value={{
            enrollments,
            isLoading,
            enrollInCourse,
            updateProgress,
            getEnrollment,
            isEnrolled,
        }}>
            {children}
        </CourseContext.Provider>
    );
}

export function useCourse() {
    const context = useContext(CourseContext);
    if (context === undefined) {
        throw new Error('useCourse must be used within a CourseProvider');
    }
    return context;
}
