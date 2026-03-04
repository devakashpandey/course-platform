"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCourse } from "@/contexts/course-context";
import { useAuth } from "@/contexts/auth-context";
import { getCourseById } from "@/lib/course-data";
import { Search, BookOpen, ArrowRight, Clock, Play, GraduationCap, Sparkles } from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";

export default function DashboardPage() {
    const { enrollments, isLoading } = useCourse();
    const { user } = useAuth();
    const [searchQuery, setSearchQuery] = useState("");

    // Filter enrollments based on search
    const filteredEnrollments = enrollments.filter(enrollment => {
        const course = getCourseById(enrollment.courseId);
        if (!course) return false;
        return course.title.toLowerCase().includes(searchQuery.toLowerCase());
    });

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto space-y-8 pb-12">
            {/* Reduced Header Section */}
            <AnimatedSection>
                <div className="relative overflow-hidden rounded-2xl bg-muted/30 p-6 md:p-8 border border-border/50">
                    <div className="relative z-10 flex items-center justify-between">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider">
                                <Sparkles className="h-3 w-3" />
                                <span>Welcome Back, {user?.name.split(' ')[0]}</span>
                            </div>
                            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                                Ready to learn something new <span className="text-primary">today?</span>
                            </h1>
                            <p className="text-muted-foreground text-sm max-w-md">
                                Pick up where you left off and continue your learning journey.
                            </p>
                        </div>
                        <div className="hidden md:flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 rotate-12 border border-primary/10">
                            <GraduationCap className="h-10 w-10 text-primary -rotate-12" />
                        </div>
                    </div>
                </div>
            </AnimatedSection>

            {/* Controls Section */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold mb-1">Your Courses</h2>
                    <p className="text-sm text-muted-foreground">Manage your active learning programs</p>
                </div>
                <div className="relative w-full md:w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search courses..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 h-10 text-sm rounded-xl bg-card border-border/50 focus:ring-primary/20"
                    />
                </div>
            </div>

            {/* Courses Grid */}
            {filteredEnrollments.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredEnrollments.map((enrollment, index) => {
                        const course = getCourseById(enrollment.courseId);
                        if (!course) return null;

                        return (
                            <AnimatedSection key={enrollment.id} delay={index * 0.1}>
                                <Link href={`/dashboard/courses/${course.id}`}>
                                    <Card className="group overflow-hidden rounded-2xl border-border/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer p-0">
                                        {/* Course Image */}
                                        <div className="relative aspect-video overflow-hidden">
                                            <Image
                                                src={course.image}
                                                alt={course.title}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-black/20 group-hover:opacity-0 transition-opacity" />
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
                                                    <Play className="h-6 w-6 fill-current" />
                                                </div>
                                            </div>
                                        </div>

                                        <CardContent className="p-5 space-y-4">
                                            <div>
                                                <h3 className="font-bold text-lg line-clamp-2 group-hover:text-primary transition-colors">
                                                    {course.title}
                                                </h3>
                                                <p className="text-xs text-muted-foreground mt-1">
                                                    {course.instructor.name}
                                                </p>
                                            </div>

                                            {/* Progress Bar Container */}
                                            <div className="space-y-2">
                                                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
                                                        style={{ width: `${enrollment.progress}%` }}
                                                    />
                                                </div>
                                                <div className="flex items-center justify-between text-xs font-bold">
                                                    <span className="text-primary">
                                                        {enrollment.progress}% completed
                                                    </span>
                                                    <span className="text-muted-foreground flex items-center gap-1">
                                                        <Clock className="h-3 w-3" />
                                                        {course.duration}
                                                    </span>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            </AnimatedSection>
                        );
                    })}
                </div>
            ) : (
                /* Reverted to Simple Empty State */
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 mb-6">
                        <BookOpen className="h-10 w-10 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">No Courses Yet</h2>
                    <p className="text-muted-foreground max-w-md mb-8">
                        You haven&apos;t enrolled in any courses yet. Browse our catalog and start your learning journey today!
                    </p>
                    <Button size="lg" asChild className="rounded-xl px-8">
                        <Link href="/courses" className="gap-2">
                            Browse Courses
                            <ArrowRight className="h-5 w-5" />
                        </Link>
                    </Button>
                </div>
            )}
        </div>
    );
}
