"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, FileText, ArrowRight, Users, TrendingUp, Shield, ArrowLeft } from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { courses, blogs } from "@/lib/course-data";
import { cn } from "@/lib/utils";

export default function AdminDashboardPage() {
    const [view, setView] = useState<'dashboard' | 'courses' | 'blogs'>('dashboard');
    const [customCourses, setCustomCourses] = useState<any[]>([]);
    const [customBlogs, setCustomBlogs] = useState<any[]>([]);

    // Get stats from localStorage on client
    useEffect(() => {
        try {
            const storedCourses = localStorage.getItem('coursehub_custom_courses');
            const storedBlogs = localStorage.getItem('coursehub_custom_blogs');
            setCustomCourses(storedCourses ? JSON.parse(storedCourses) : []);
            setCustomBlogs(storedBlogs ? JSON.parse(storedBlogs) : []);
        } catch (e) {
            // Ignore errors
        }
    }, []);

    const deleteCourse = (id: string) => {
        const updated = customCourses.filter(c => c.id !== id);
        setCustomCourses(updated);
        localStorage.setItem('coursehub_custom_courses', JSON.stringify(updated));
    };

    const deleteBlog = (id: string) => {
        const updated = customBlogs.filter(b => b.id !== id);
        setCustomBlogs(updated);
        localStorage.setItem('coursehub_custom_blogs', JSON.stringify(updated));
    };

    // Get stats
    const totalCoursesCount = courses.length + customCourses.length;
    const totalBlogsCount = blogs.length + customBlogs.length;

    const stats = [
        {
            title: "Total Courses",
            value: totalCoursesCount,
            description: `${customCourses.length} custom added`,
            icon: BookOpen,
            color: "from-blue-500 to-cyan-500",
            onClick: () => setView('courses'),
        },
        {
            title: "Total Blogs",
            value: totalBlogsCount,
            description: `${customBlogs.length} custom added`,
            icon: FileText,
            color: "from-purple-500 to-pink-500",
            onClick: () => setView('blogs'),
        },
        {
            title: "Active Students",
            value: "150+",
            description: "Enrolled learners",
            icon: Users,
            color: "from-green-500 to-emerald-500",
        },
        {
            title: "Growth",
            value: "+24%",
            description: "This month",
            icon: TrendingUp,
            color: "from-orange-500 to-red-500",
        },
    ];

    if (view === 'courses') {
        // Combine static courses with custom courses
        const allCourses = [
            ...courses.map(c => ({ ...c, isStatic: true, isActive: true })),
            ...customCourses.map(c => ({ ...c, isStatic: false }))
        ];
        return (
            <CoursesListView
                courses={allCourses}
                onBack={() => setView('dashboard')}
                onDelete={deleteCourse}
            />
        );
    }

    if (view === 'blogs') {
        // Combine static blogs with custom blogs
        const allBlogs = [
            ...blogs.map(b => ({ ...b, isStatic: true, isActive: true })),
            ...customBlogs.map(b => ({ ...b, isStatic: false }))
        ];
        return (
            <BlogsListView
                blogs={allBlogs}
                onBack={() => setView('dashboard')}
                onDelete={deleteBlog}
            />
        );
    }

    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            <AnimatedSection>
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500/10 via-red-500/5 to-transparent p-6 md:p-8 border border-orange-500/20">
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 text-orange-500 font-bold text-xs uppercase tracking-wider mb-2">
                            <Shield className="h-3 w-3" />
                            <span>Admin Dashboard</span>
                        </div>
                        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                            Welcome to <span className="text-orange-500">Admin Panel</span>
                        </h1>
                        <p className="text-muted-foreground mt-2 max-w-lg">
                            Manage your courses, blogs, and content from here. Add new courses or write blog posts to help students learn.
                        </p>
                    </div>
                    <div className="absolute top-4 right-4 h-24 w-24 rounded-full bg-orange-500/10 blur-2xl" />
                </div>
            </AnimatedSection>

            {/* Stats Grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, index) => (
                    <AnimatedSection key={stat.title} delay={index * 0.1}>
                        <Card
                            className={cn(
                                "relative overflow-hidden border-border/50 hover:shadow-lg transition-all",
                                stat.onClick && "cursor-pointer hover:-translate-y-1"
                            )}
                            onClick={stat.onClick}
                        >
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-muted-foreground">{stat.title}</p>
                                        <p className="text-3xl font-bold mt-1">{stat.value}</p>
                                        <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                                    </div>
                                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${stat.color}`}>
                                        <stat.icon className="h-6 w-6 text-white" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </AnimatedSection>
                ))}
            </div>

            {/* Quick Actions */}
            <AnimatedSection delay={0.3}>
                <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                    {[
                        {
                            title: "Add New Course",
                            description: "Create a new course with lessons, curriculum, and pricing",
                            icon: BookOpen,
                            href: "/admin/add-course",
                            color: "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20",
                        },
                        {
                            title: "Add New Blog",
                            description: "Write and publish a new blog post",
                            icon: FileText,
                            href: "/admin/add-blog",
                            color: "bg-purple-500/10 text-purple-500 hover:bg-purple-500/20",
                        },
                    ].map((action) => (
                        <Link key={action.href} href={action.href}>
                            <Card className="group cursor-pointer border-border/50 hover:shadow-lg transition-all hover:-translate-y-1">
                                <CardContent className="p-6">
                                    <div className="flex items-start gap-4">
                                        <div className={`flex h-12 w-12 items-center justify-center rounded-xl transition-colors ${action.color}`}>
                                            <action.icon className="h-6 w-6" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                                                {action.title}
                                            </h3>
                                            <p className="text-sm text-muted-foreground mt-1">
                                                {action.description}
                                            </p>
                                        </div>
                                        <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </AnimatedSection>

            {/* Recent Activity Placeholder */}
            <AnimatedSection delay={0.4}>
                <Card className="border-border/50">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                        <CardDescription>Your recent actions and updates</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col items-center justify-center py-8 text-center">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
                                <TrendingUp className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <p className="text-muted-foreground">
                                Activity tracking coming soon...
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </AnimatedSection>
        </div>
    );
}

function CoursesListView({ courses, onBack, onDelete }: { courses: any[], onBack: () => void, onDelete: (id: string) => void }) {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <Button variant="ghost" onClick={onBack} size="sm" className="gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Dashboard
                </Button>
                <Button asChild size="sm">
                    <Link href="/admin/add-course">Add New Course</Link>
                </Button>
            </div>

            <h2 className="text-2xl font-bold">Manage Courses ({courses.length})</h2>

            <div className="grid gap-4">
                {courses.length === 0 ? (
                    <Card className="p-12 text-center border-dashed">
                        <p className="text-muted-foreground">No courses available.</p>
                    </Card>
                ) : (
                    courses.map((course) => (
                        <Card key={course.id} className={cn(
                            "overflow-hidden border-border/50",
                            course.isStatic && "opacity-80"
                        )}>
                            <CardContent className="p-4 flex items-center gap-4">
                                <div className="h-16 w-16 rounded-lg bg-muted shrink-0 overflow-hidden">
                                    <img src={course.image} alt="" className="h-full w-full object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <h3 className="font-bold truncate">{course.title}</h3>
                                        <div className="flex gap-1">
                                            {course.isActive !== false ? (
                                                <span className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-500 text-[10px] font-bold uppercase">Active</span>
                                            ) : (
                                                <span className="px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-500 text-[10px] font-bold uppercase">Inactive</span>
                                            )}
                                        </div>
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-1">{course.level} • {course.price}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button variant="outline" size="sm" asChild>
                                        <Link href={`/admin/add-course?edit=${course.id}`}>Edit</Link>
                                    </Button>
                                    {!course.isStatic && (
                                        <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => onDelete(course.id)}>
                                            Delete
                                        </Button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}

function BlogsListView({ blogs, onBack, onDelete }: { blogs: any[], onBack: () => void, onDelete: (id: string) => void }) {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <Button variant="ghost" onClick={onBack} size="sm" className="gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Dashboard
                </Button>
                <Button asChild size="sm">
                    <Link href="/admin/add-blog">Add New Blog</Link>
                </Button>
            </div>

            <h2 className="text-2xl font-bold">Manage Blogs ({blogs.length})</h2>

            <div className="grid gap-4">
                {blogs.length === 0 ? (
                    <Card className="p-12 text-center border-dashed">
                        <p className="text-muted-foreground">No blogs available.</p>
                    </Card>
                ) : (
                    blogs.map((blog) => (
                        <Card key={blog.id} className={cn(
                            "overflow-hidden border-border/50",
                            blog.isStatic && "opacity-80"
                        )}>
                            <CardContent className="p-4 flex items-center gap-4">
                                <div className="h-16 w-24 rounded-lg bg-muted shrink-0 overflow-hidden">
                                    <img src={blog.image} alt="" className="h-full w-full object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <h3 className="font-bold truncate">{blog.title}</h3>
                                        <div className="flex gap-1">
                                            {blog.isActive !== false ? (
                                                <span className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-500 text-[10px] font-bold uppercase">Active</span>
                                            ) : (
                                                <span className="px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-500 text-[10px] font-bold uppercase">Inactive</span>
                                            )}
                                        </div>
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-1">{blog.category} • {blog.readTime || "5 min read"}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button variant="outline" size="sm" asChild>
                                        <Link href={`/admin/add-blog?edit=${blog.id}`}>Edit</Link>
                                    </Button>
                                    {!blog.isStatic && (
                                        <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => onDelete(blog.id)}>
                                            Delete
                                        </Button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
