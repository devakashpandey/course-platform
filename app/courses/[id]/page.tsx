import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { EnrollButton } from "@/components/course/enroll-button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    ArrowLeft,
    ArrowRight,
    Clock,
    BookOpen,
    Star,
    Users,
    CheckCircle,
    Play,
    Award,
    Infinity,
    MessageSquare,
    Download,
    Video,
    FileText,
    Headphones,
    BarChart3
} from "lucide-react";
import { courses } from "@/lib/course-data";
import type { Metadata } from "next";
import { AnimatedSection } from "@/components/ui/animated-section";

type Props = {
    params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const course = courses.find(c => c.id === id);

    return {
        title: course ? `${course.title} - DSWithShikhar` : "Course Not Found",
        description: course?.description || "Course not found",
    };
}

export async function generateStaticParams() {
    return courses.map((course) => ({
        id: course.id,
    }));
}

// Helper to calculate "original" price (add ~25% markup for strikethrough effect)
function getOriginalPrice(price: string): string {
    if (price === "Free") return "Free";
    const numericPrice = parseInt(price.replace(/[₹,]/g, ''));
    const originalPrice = Math.round(numericPrice * 1.25);
    return `₹${originalPrice.toLocaleString('en-IN')}`;
}

export default async function CourseDetailPage({ params }: Props) {
    const { id } = await params;
    const course = courses.find(c => c.id === id);

    if (!course) {
        notFound();
    }

    const relatedCourses = courses.filter(c => c.id !== course.id).slice(0, 3);
    const allRelatedCourses = courses.filter(c => c.id !== course.id);

    const highlights = [
        { icon: Video, label: "Live & Recorded Videos" },
        { icon: FileText, label: "Session Notes & Resources" },
        { icon: Users, label: "Industry & Academic Interactions" },
        { icon: Headphones, label: "Mentorship & Query Resolution" },
    ];

    return (
        <div className="min-h-screen">
            {/* Background Decorations - Outside section to not clip */}
            <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none z-0" />
            <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none z-0" />

            {/* Main Content with Grid Layout */}
            <div className="container relative mx-auto px-4 py-10 lg:py-16 z-10">
                <AnimatedSection>
                    <Button variant="ghost" size="sm" className="mb-4" asChild>
                        <Link href="/courses">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Courses
                        </Link>
                    </Button>
                </AnimatedSection>

                <div className="grid gap-12 lg:grid-cols-5 lg:gap-22 lg:items-start">
                    {/* Course Info & Content - Left Side */}
                    <div className="lg:col-span-3 pb-8 md:pb-16">
                        <AnimatedSection delay={0.1}>
                            <h1 className="text-3xl font-extrabold leading-tight md:text-5xl lg:text-6xl">
                                {course.title}
                            </h1>
                        </AnimatedSection>

                        <AnimatedSection delay={0.2}>
                            <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl text-balance">
                                {course.description}
                            </p>
                        </AnimatedSection>

                        {/* Course Highlights Grid */}
                        <AnimatedSection delay={0.3}>
                            <div className="mt-8 grid grid-cols-2 gap-4">
                                {highlights.map((item, index) => (
                                    <div key={index} className="flex items-center gap-3 bg-muted/20 p-3 rounded-xl md:bg-transparent md:p-0">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                                            <item.icon className="h-5 w-5 text-primary" />
                                        </div>
                                        <span className="text-sm font-medium text-foreground">{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        </AnimatedSection>

                        {/* Instructor */}
                        <AnimatedSection delay={0.4}>
                            <div className="mt-10 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between border-t border-b py-6 md:border-none md:py-0">
                                <div className="flex items-center gap-4">
                                    <Avatar className="h-14 w-14 md:h-16 md:w-16 ring-2 ring-primary/20">
                                        <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-lg font-bold">
                                            {course.instructor.name.split(' ').map(n => n[0]).join('')}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="text-lg font-bold">{course.instructor.name}</div>
                                        <div className="text-sm text-primary font-medium uppercase tracking-wider">
                                            {course.instructor.role}
                                        </div>
                                    </div>
                                </div>
                                <Button variant="outline" className="flex md:flex gap-2 w-full md:w-auto rounded-xl" asChild>
                                    <a href="#curriculum">
                                        View Curriculum
                                        <ArrowRight className="h-4 w-4" />
                                    </a>
                                </Button>
                            </div>
                        </AnimatedSection>

                        {/* Course Content */}
                        <div className="mt-16 space-y-16">
                            {/* What You'll Learn */}
                            <AnimatedSection>
                                <div id="learning-outcomes" className="scroll-mt-24">
                                    <h2 className="text-3xl font-bold mb-6">What You'll Learn</h2>
                                    <Card className="p-6 bg-gradient-to-br from-primary/5 to-transparent border-primary/20 shadow-none">
                                        <div className="grid gap-4 md:grid-cols-2">
                                            {course.features.map((feature, index) => (
                                                <div key={index} className="flex items-start gap-3">
                                                    <CheckCircle className="mt-0.5 h-5 w-5 text-green-500 shrink-0" />
                                                    <span className="text-muted-foreground">{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </Card>
                                </div>
                            </AnimatedSection>

                            {/* Course Curriculum */}
                            <AnimatedSection delay={0.1}>
                                <div id="curriculum" className="scroll-mt-24">
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-3xl font-bold">Course Curriculum</h2>
                                        <Badge variant="secondary" className="text-sm">
                                            {course.lessons.length} Topics • {course.duration}
                                        </Badge>
                                    </div>
                                    <Accordion type="single" collapsible className="w-full grid gap-4">
                                        {course.lessons.sort((a, b) => a.order - b.order).map((lesson, index) => (
                                            <AccordionItem key={index} value={`item-${index}`} className="border rounded-2xl bg-muted/30 overflow-hidden px-2">
                                                <AccordionTrigger className="hover:no-underline py-5 px-4 group">
                                                    <div className="flex items-center gap-4 text-left">
                                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary font-bold group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                                                            {index + 1}
                                                        </div>
                                                        <div>
                                                            <div className="font-bold text-base group-hover:text-primary transition-colors">{lesson.title}</div>
                                                            <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider mt-0.5">{lesson.duration}</div>
                                                        </div>
                                                    </div>
                                                </AccordionTrigger>
                                                <AccordionContent className="px-6 pb-6 pt-2">
                                                    <div className="space-y-6">
                                                        {/* Preview Section */}
                                                        <div className="space-y-3">
                                                            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
                                                                <Play className="h-3 w-3" />
                                                                Content Preview
                                                            </div>
                                                            <div className="flex items-center justify-between p-3 rounded-xl bg-background border group/item hover:border-primary/50 transition-colors cursor-pointer">
                                                                <div className="flex items-center gap-3">
                                                                    <div className="h-8 w-8 rounded-lg bg-primary/5 flex items-center justify-center">
                                                                        <Video className="h-4 w-4 text-primary" />
                                                                    </div>
                                                                    <span className="text-sm font-medium">Recorded Lecture Video</span>
                                                                </div>
                                                                <Badge variant="outline" className="text-[10px] font-bold opacity-0 group-hover/item:opacity-100 transition-opacity">Preview</Badge>
                                                            </div>
                                                        </div>

                                                        {/* Resources Section */}
                                                        {lesson.resources && lesson.resources.length > 0 && (
                                                            <div className="space-y-3">
                                                                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
                                                                    <FileText className="h-3 w-3" />
                                                                    Study Material
                                                                </div>
                                                                <div className="grid gap-2">
                                                                    {lesson.resources.map((resource, i) => (
                                                                        <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-background border hover:bg-muted/50 transition-colors">
                                                                            <div className="flex items-center gap-3">
                                                                                <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center">
                                                                                    <Download className="h-4 w-4 text-muted-foreground" />
                                                                                </div>
                                                                                <span className="text-sm font-medium">{resource.title}</span>
                                                                            </div>
                                                                            <span className="text-[10px] text-muted-foreground font-bold uppercase">PDF</span>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </AccordionContent>
                                            </AccordionItem>
                                        ))}
                                    </Accordion>
                                </div>
                            </AnimatedSection>
                        </div>
                    </div>

                    {/* Sticky Pricing Card - Right Side */}
                    <div className="lg:col-span-2 self-start mt-8 lg:mt-0">
                        <div className="sticky top-24">
                            <AnimatedSection delay={0.3}>
                                <Card className="overflow-hidden border-border/50 shadow-2xl bg-card text-foreground p-0 gap-0 rounded-3xl">
                                    {/* Course Preview Image */}
                                    <div className="relative aspect-video overflow-hidden">
                                        <Image
                                            src={course.image}
                                            alt={course.title}
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                            <div className="flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-full bg-white/90 text-primary shadow-lg cursor-pointer hover:scale-110 transition-all duration-300">
                                                <Play className="h-6 w-6 md:h-8 md:w-8 fill-primary ml-1" />
                                            </div>
                                        </div>
                                    </div>

                                    <CardContent className="p-6 md:p-8 space-y-6">
                                        {/* Pricing */}
                                        <div className="flex flex-col">
                                            <div className="flex items-baseline gap-3">
                                                <span className="text-3xl md:text-4xl font-black text-foreground">
                                                    {course.price === "Free" ? "Free" : `₹ ${parseInt(course.price.replace(/[₹,]/g, '')).toLocaleString('en-IN')}.00`}
                                                </span>
                                                <span className="text-lg font-semibold text-foreground/80">INR</span>
                                            </div>
                                            {course.price !== "Free" && (
                                                <div className="text-muted-foreground line-through text-sm mt-1">
                                                    {getOriginalPrice(course.price)} INR
                                                </div>
                                            )}
                                        </div>

                                        {/* Enroll Button */}
                                        <div className="w-full">
                                            <EnrollButton courseId={course.id} price={course.price} />
                                        </div>

                                        <Separator />

                                        {/* Course Features */}
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-4 text-sm md:text-base">
                                                <BarChart3 className="h-5 w-5 text-primary shrink-0" />
                                                <span className="text-muted-foreground">Level: <strong className="text-foreground">{course.level}</strong></span>
                                            </div>
                                            <div className="flex items-center gap-4 text-sm md:text-base">
                                                <Award className="h-5 w-5 text-primary shrink-0" />
                                                <span className="text-muted-foreground">Experiential Hand-on Learning</span>
                                            </div>
                                            <div className="flex items-center gap-4 text-sm md:text-base">
                                                <MessageSquare className="h-5 w-5 text-primary shrink-0" />
                                                <span className="text-muted-foreground">LIVE Doubt Solving</span>
                                            </div>
                                            <div className="flex items-center gap-4 text-sm md:text-base">
                                                <Infinity className="h-5 w-5 text-primary shrink-0" />
                                                <span className="text-muted-foreground">Lifetime Access</span>
                                            </div>
                                            <div className="flex items-center gap-4 text-sm md:text-base">
                                                <Clock className="h-5 w-5 text-primary shrink-0" />
                                                <span className="text-muted-foreground">Duration: <strong className="text-foreground">{course.duration}</strong></span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </AnimatedSection>
                        </div>
                    </div>
                </div>
            </div>

            {/* Related Courses Section */}
            <section className="py-12 bg-muted/30">
                <div className="container mx-auto px-4">
                    <AnimatedSection>
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                            <div>
                                <Badge variant="outline" className="mb-4">Explore More</Badge>
                                <h2 className="text-3xl font-bold md:text-4xl">Related Courses</h2>
                                <p className="mt-4 text-muted-foreground max-w-xl">
                                    Continue your learning journey with these carefully selected courses.
                                </p>
                            </div>
                            <Button variant="link" className="h-auto p-0 text-primary font-bold text-lg group/all" asChild>
                                <Link href="/courses" className="flex items-center gap-2">
                                    View All Courses
                                    <ArrowRight className="h-5 w-5 transition-transform group-hover/all:translate-x-1" />
                                </Link>
                            </Button>
                        </div>
                    </AnimatedSection>

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {allRelatedCourses.slice(0, 3).map((relatedCourse, index) => (
                            <AnimatedSection key={relatedCourse.id} delay={index * 0.1}>
                                <Card className="group flex h-full flex-col overflow-hidden rounded-3xl border-border/50 transition-all hover:-translate-y-1 hover:shadow-lg p-0 gap-0">
                                    <div className="relative aspect-[16/10] overflow-hidden">
                                        <Image
                                            src={relatedCourse.image}
                                            alt={relatedCourse.title}
                                            fill
                                            className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                                        <Badge
                                            className="absolute left-4 top-4 px-4 py-1 text-sm font-bold shadow-lg"
                                            variant={relatedCourse.level === "Beginner" ? "secondary" : relatedCourse.level === "Intermediate" ? "default" : "destructive"}
                                        >
                                            {relatedCourse.level}
                                        </Badge>
                                    </div>

                                    <CardHeader className="flex-1 px-6 py-4">
                                        <CardTitle className="line-clamp-2 text-xl font-bold leading-tight group-hover:text-primary transition-colors">
                                            {relatedCourse.title}
                                        </CardTitle>
                                        <CardDescription className="line-clamp-2 mt-2 text-sm leading-relaxed">
                                            {relatedCourse.description}
                                        </CardDescription>
                                    </CardHeader>

                                    <CardFooter className="flex items-center justify-between border-t px-6 py-4 group-hover:bg-muted/5 transition-colors">
                                        <div className="text-xl font-black text-primary">
                                            {relatedCourse.price}
                                        </div>
                                        <Button variant="outline" className="group/btn h-10 rounded-full px-4 transition-all hover:bg-primary hover:text-primary-foreground">
                                            <Link href={`/courses/${relatedCourse.id}`} className="flex items-center gap-2 font-bold text-sm">
                                                View Details
                                                <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                                            </Link>
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
