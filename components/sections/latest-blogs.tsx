"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { blogs as staticBlogs } from "@/lib/data";
import { cn } from "@/lib/utils";

export function LatestBlogs() {
    const allBlogs = staticBlogs;

    const featuredBlog = allBlogs[0];
    const otherBlogs = allBlogs.slice(1, 4);

    return (
        <section className="bg-muted/30 py-20">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center">
                    <Badge variant="outline" className="mb-4">
                        Learning Center
                    </Badge>
                    <h2 className="text-3xl font-bold md:text-4xl">
                        Latest Articles
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                        Read about the latest from the world of Machine Learning and stay ahead
                        in your AI journey.
                    </p>
                </div>

                {/* Featured Blog */}
                {featuredBlog && (
                    <div className="mt-12">
                        <Card className="group overflow-hidden md:grid md:grid-cols-2 p-0 gap-0">
                            <div className="relative aspect-video overflow-hidden md:aspect-auto">
                                <Image
                                    src={featuredBlog.image}
                                    alt={featuredBlog.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <Badge className="absolute left-4 top-4 shadow-lg">Featured</Badge>
                                <Badge className="absolute left-4 top-4 shadow-lg">Featured</Badge>
                            </div>
                            <div className="flex flex-col justify-center p-6 md:p-8">
                                <div className="flex items-center justify-between mb-4">
                                    <Badge variant="outline" className="w-fit">
                                        {featuredBlog.category}
                                    </Badge>
                                </div>
                                <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                                    <Link href={`/blog/${featuredBlog.id}`}>{featuredBlog.title}</Link>
                                </CardTitle>
                                <CardDescription className="mt-4 text-base">
                                    {featuredBlog.excerpt}
                                </CardDescription>
                                <div className="mt-6 flex items-center gap-4">
                                    <Avatar className="h-10 w-10">
                                        <AvatarFallback className="bg-primary/10 text-primary">
                                            AD
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="font-medium text-primary">Admin</div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                )}

                {/* Blog Grid */}
                <div className="mt-8 grid gap-6 md:grid-cols-3">
                    {otherBlogs.map((blog) => (
                        <Card key={blog.id} className="group flex flex-col overflow-hidden transition-all hover:shadow-md p-0 gap-0">
                            <div className="relative aspect-video overflow-hidden">
                                <Image
                                    src={blog.image}
                                    alt={blog.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                            <CardHeader className="flex-1 pt-6">
                                <div className="flex items-center justify-between mb-2">
                                    <Badge variant="outline" className="w-fit text-xs">
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
                                <div className="flex items-center justify-between text-sm text-muted-foreground">
                                    <span className="font-medium text-primary">Admin</span>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* View All Button */}
                <div className="mt-12 text-center">
                    <Button size="lg" variant="outline" asChild>
                        <Link href="/blog">
                            View All Articles
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
