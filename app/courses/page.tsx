"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Clock, Star, Users, GraduationCap, Gamepad2, HeartHandshake } from "lucide-react";
import { courses as staticCourses, features } from "@/lib/course-data";
import { AnimatedSection } from "@/components/ui/animated-section";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { cn } from "@/lib/utils";

const iconMap: Record<string, any> = {
    GraduationCap,
    Gamepad2,
    Users,
    HeartHandshake
};

export default function CoursesPage() {
    const { user } = useAuth();
    const [allCourses, setAllCourses] = useState<any[]>(staticCourses);

    useEffect(() => {
        const storedCourses = localStorage.getItem('coursehub_custom_courses');
        if (storedCourses) {
            const customCourses = JSON.parse(storedCourses);
            setAllCourses([...staticCourses, ...customCourses]);
        }
    }, []);

    const activeCourses = allCourses.filter(c => c.isActive !== false);
    const beginnerCourses = activeCourses.filter(c => c.category === "beginner");
    const intermediateCourses = activeCourses.filter(c => c.category === "intermediate");
    const advancedCourses = activeCourses.filter(c => c.category === "advanced");

    return (
        <div className="min-h-screen">
            {/* New Hero Section */}
            <section className="relative overflow-hidden bg-background  py-16 md:py-24">
                {/* Background Decorations */}
                <div className="absolute left-0 top-0 -z-10 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
                <div className="absolute right-0 bottom-0 -z-10 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />

                <div className="container mx-auto px-4">
                    <div className="grid items-center gap-12 lg:grid-cols-2">
                        <AnimatedSection>
                            <div className="max-w-2xl px-2">
                                <h1 className="text-4xl font-extrabold tracking-tight md:text-7xl">
                                    Courses
                                </h1>
                                <p className="mt-8 text-xl leading-relaxed text-muted-foreground">
                                    From beginners to seasoned professionals, our diverse program lineup ensures
                                    mastery in Machine Learning, taking you from <span className="font-bold text-foreground">zero to hero!</span>
                                </p>
                                <div className="mt-10">
                                    <Button size="lg" className="h-14 px-10 text-lg font-bold uppercase tracking-wider shadow-lg shadow-primary/20" asChild>
                                        <Link href="#courses">
                                            View Courses
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </AnimatedSection>

                        <AnimatedSection delay={0.2}>
                            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-2xl">
                                <Image
                                    src="/lecture_hall_hero_2_1770441626130.png"
                                    alt="Students in a lecture hall"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* Courses Section */}
            <section id="courses" className="py-20">
                <div className="container mx-auto px-4">
                    <Tabs defaultValue="all" className="w-full">
                        <div className="flex justify-center mb-12">
                            <TabsList className="h-12 border-none bg-muted/50 p-1 w-full overflow-x-auto overflow-y-hidden justify-start md:justify-center no-scrollbar">
                                <TabsTrigger value="all" className="rounded-md px-6 md:px-8 data-[state=active]:bg-background data-[state=active]:shadow-sm shrink-0">All Courses</TabsTrigger>
                                <TabsTrigger value="beginner" className="rounded-md px-6 md:px-8 data-[state=active]:bg-background data-[state=active]:shadow-sm shrink-0">Beginner</TabsTrigger>
                                <TabsTrigger value="intermediate" className="rounded-md px-6 md:px-8 data-[state=active]:bg-background data-[state=active]:shadow-sm shrink-0">Intermediate</TabsTrigger>
                                <TabsTrigger value="advanced" className="rounded-md px-6 md:px-8 data-[state=active]:bg-background data-[state=active]:shadow-sm shrink-0">Advanced</TabsTrigger>
                            </TabsList>
                        </div>

                        <TabsContent value="all" className="focus-visible:outline-none">
                            <CourseGrid courses={activeCourses} user={user} />
                        </TabsContent>
                        <TabsContent value="beginner" className="focus-visible:outline-none">
                            <CourseGrid courses={beginnerCourses} user={user} />
                        </TabsContent>
                        <TabsContent value="intermediate" className="focus-visible:outline-none">
                            <CourseGrid courses={intermediateCourses} user={user} />
                        </TabsContent>
                        <TabsContent value="advanced" className="focus-visible:outline-none">
                            <CourseGrid courses={advancedCourses} user={user} />
                        </TabsContent>
                    </Tabs>
                </div>
            </section>

            {/* Why Learn With Us Section (Redesigned) */}
            <section className="bg-muted/10 py-24 border-t border-b overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl font-extrabold md:text-5xl">Why Learn With us?</h2>
                    </div>

                    <div className="relative mt-12 grid gap-y-12 lg:grid-cols-2">
                        {/* Vertical Divider */}
                        <div className="absolute left-1/2 top-0 hidden h-full w-[1px] bg-border lg:block" />

                        {features.map((feature, index) => {
                            const Icon = iconMap[feature.icon] || GraduationCap;
                            return (
                                <div key={feature.title} className={`flex flex-col md:flex-row items-start gap-6 px-6 md:px-12 ${index % 2 === 0 ? 'lg:pr-20' : 'lg:pl-20'}`}>
                                    <div className="flex h-16 w-16 md:h-20 md:w-20 shrink-0 items-center justify-center rounded-2xl bg-background shadow-xl ring-1 ring-border transition-all hover:scale-105">
                                        <Icon className="h-8 w-8 md:h-10 md:w-10 text-primary" />
                                    </div>
                                    <div className="space-y-2 md:space-y-4">
                                        <h3 className="text-xl md:text-2xl font-bold">{feature.title}</h3>
                                        <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
}

function CourseGrid({ courses, user }: { courses: any[], user: any }) {
    if (courses.length === 0) {
        return (
            <div className="py-12 text-center text-muted-foreground">
                No courses found in this category.
            </div>
        );
    }

    return (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course, index) => (
                <AnimatedSection key={course.id} delay={index * 0.1}>
                    <Card className="group flex h-full flex-col overflow-hidden rounded-3xl border-border/50 transition-all hover:-translate-y-1 hover:shadow-lg p-0 gap-0">
                        {/* Course Image */}
                        <div className="relative aspect-[16/10] overflow-hidden">
                            <Image
                                src={course.image}
                                alt={course.title}
                                fill
                                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                            <Badge
                                className="absolute left-4 top-4 px-4 py-1 text-sm font-bold shadow-lg"
                                variant={course.level === "Beginner" ? "secondary" : course.level === "Intermediate" ? "default" : "destructive"}
                            >
                                {course.level}
                            </Badge>
                            <Badge
                                className={cn(
                                    "absolute right-4 top-4 px-4 py-1 text-[10px] font-bold shadow-lg uppercase",
                                    (course.isActive !== false) ? "bg-green-500 hover:bg-green-600" : "bg-orange-500 hover:bg-orange-600"
                                )}
                            >
                                {course.isActive !== false ? "Active" : "Inactive"}
                            </Badge>
                        </div>

                        <CardHeader className="flex-1 px-6 py-4">
                            <CardTitle className="line-clamp-2 text-xl font-bold leading-tight group-hover:text-primary transition-colors">
                                {course.title}
                            </CardTitle>
                            <CardDescription className="line-clamp-2 mt-2 text-sm leading-relaxed">
                                {course.description}
                            </CardDescription>
                        </CardHeader>

                        <CardFooter className="flex items-center justify-between border-t px-6 py-2 group-hover:bg-muted/5 transition-colors">
                            <div className="text-xl font-black text-primary">
                                {course.price}
                            </div>
                            <div className="flex items-center gap-2">
                                <Button variant="outline" className="group/btn h-10 rounded-full px-4 transition-all hover:bg-primary hover:text-primary-foreground">
                                    <Link href={`/courses/${course.id}`} className="flex items-center gap-2 font-bold text-sm">
                                        View Details
                                        <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                                    </Link>
                                </Button>
                            </div>
                        </CardFooter>
                    </Card>
                </AnimatedSection>
            ))}
        </div>
    );
}
