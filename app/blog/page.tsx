"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { blogs as staticBlogs } from "@/lib/course-data";
import { AnimatedSection } from "@/components/ui/animated-section";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth-context";

export default function BlogPage() {
    const { user } = useAuth();
    const [allBlogs, setAllBlogs] = useState<any[]>(staticBlogs);

    useEffect(() => {
        const storedBlogs = localStorage.getItem('coursehub_custom_blogs');
        if (storedBlogs) {
            const customBlogs = JSON.parse(storedBlogs);
            setAllBlogs([...staticBlogs, ...customBlogs]);
        }
    }, []);

    const activeBlogs = allBlogs.filter(b => b.isActive !== false);
    const featuredBlog = activeBlogs[0] || staticBlogs[0];
    const otherBlogs = activeBlogs.slice(1);

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <AnimatedSection>
                <section className="bg-gradient-to-b from-primary/5 to-background py-8">
                    <div className="container mx-auto px-4 text-center">
                        <Badge variant="outline" className="mb-4">Learning Center</Badge>
                        <h1 className="text-4xl font-bold md:text-5xl">Our Blog</h1>
                        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                            Read about the latest from the world of Machine Learning and stay ahead
                            in your AI journey.
                        </p>
                    </div>
                </section>
            </AnimatedSection>

            {/* Featured Blog */}
            <section className="py-8">
                <div className="container mx-auto px-4">
                    <AnimatedSection>
                        <Card className="group overflow-hidden md:grid md:grid-cols-2 p-0 gap-0">
                            <div className="relative aspect-video overflow-hidden md:aspect-auto">
                                <Image
                                    src={featuredBlog.image}
                                    alt={featuredBlog.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <Badge className="absolute left-4 top-4 shadow-lg">Featured</Badge>
                            </div>
                            <div className="flex flex-col justify-center p-6 md:p-10">
                                <Badge variant="outline" className="mb-4 w-fit">
                                    {featuredBlog.category}
                                </Badge>
                                <CardTitle className="text-2xl md:text-3xl group-hover:text-primary transition-colors">
                                    <Link href={`/blog/${featuredBlog.id}`}>{featuredBlog.title}</Link>
                                </CardTitle>
                                <CardDescription className="mt-4 text-base">
                                    {featuredBlog.excerpt}
                                </CardDescription>
                                <div className="mt-6 flex items-center gap-4">
                                    <Avatar className="h-12 w-12">
                                        <AvatarFallback className="bg-primary/10 text-primary">
                                            {featuredBlog.author.name.split(' ').map((n: string) => n[0]).join('')}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="font-medium text-primary">Admin</div>
                                    </div>
                                </div>
                                <Button className="mt-6 w-fit gap-2" asChild>
                                    <Link href={`/blog/${featuredBlog.id}`}>
                                        Read Article
                                        <ArrowRight className="h-4 w-4" />
                                    </Link>
                                </Button>
                            </div>
                        </Card>
                    </AnimatedSection>
                </div>
            </section>

            {/* Latest Articles Header */}
            <section className="pb-6">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-bold">Latest Articles</h2>
                </div>
            </section>

            {/* Blog Grid */}
            <section className="pb-16">
                <div className="container mx-auto px-4">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {otherBlogs.map((blog, index) => (
                            <AnimatedSection key={blog.id} delay={index * 0.1}>
                                <Card className="group flex flex-col overflow-hidden transition-all hover:shadow-lg h-full p-0 gap-0">
                                    <div className="relative aspect-video overflow-hidden">
                                        <Image
                                            src={blog.image}
                                            alt={blog.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>
                                    <CardHeader className="flex-1 pt-6">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Badge variant="outline" className="text-xs">
                                                {blog.category}
                                            </Badge>
                                        </div>
                                        <CardTitle className="line-clamp-2 text-lg group-hover:text-primary transition-colors">
                                            <Link href={`/blog/${blog.id}`}>{blog.title}</Link>
                                        </CardTitle>
                                        <CardDescription className="line-clamp-2 mt-2">
                                            {blog.excerpt}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="pb-6">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-8 w-8">
                                                <AvatarFallback className="bg-primary/10 text-primary text-xs">
                                                    {blog.author.name.split(' ').map((n: string) => n[0]).join('')}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="text-sm">
                                                <div className="font-medium text-primary">Admin</div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </AnimatedSection>
                        ))}
                    </div>

                    {/* Load More */}
                    <div className="mt-12 text-center">
                        <Button variant="outline" size="lg">
                            Load More Articles
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
