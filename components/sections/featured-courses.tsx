"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock, Star, Users, BookOpen } from "lucide-react";
import { courses as staticCourses } from "@/lib/data";
import { cn } from "@/lib/utils";

export function FeaturedCourses() {
    const allCourses = staticCourses;

    // Only show top 3 courses on home page
    const featuredCourses = allCourses.slice(0, 3);

    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="text-left">
                        <Badge variant="outline" className="mb-4">
                            Our Programs
                        </Badge>
                        <h2 className="text-3xl font-bold md:text-5xl">
                            Latest Courses
                        </h2>
                        <p className="mt-4 max-w-2xl text-muted-foreground italic">
                            From beginners to seasoned professionals, our diverse program lineup ensures
                            mastery in Machine Learning, taking you from zero to hero!
                        </p>
                    </div>
                    <Button size="lg" variant="link" className="h-auto p-0 text-primary font-bold text-lg group/all" asChild>
                        <Link href="/courses" className="flex items-center gap-2">
                            View All Courses
                            <ArrowRight className="h-5 w-5 transition-transform group-hover/all:translate-x-1" />
                        </Link>
                    </Button>
                </div>

                {/* Courses Grid */}
                <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {featuredCourses.map((course) => (
                        <Card key={course.id} className="group flex h-full flex-col overflow-hidden rounded-3xl border-border/50 transition-all hover:-translate-y-1 hover:shadow-lg p-0 gap-0">
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
                                            Learn More
                                            <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                                        </Link>
                                    </Button>
                                </div>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
