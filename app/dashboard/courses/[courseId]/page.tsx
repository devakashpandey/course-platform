"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useCourse } from "@/contexts/course-context";
import { useAuth } from "@/contexts/auth-context";
import {
    getCourseById,
    getFirstLesson,
    getLessonById,
    getNextLesson,
    getPreviousLesson,
    getTotalLessons
} from "@/lib/course-data";
import {
    ArrowLeft,
    ChevronRight,
    ChevronLeft,
    Play,
    CheckCircle,
    Clock,
    MessageSquare,
    Menu,
    X,
    FileText,
    Download,
    ExternalLink
} from "lucide-react";
import { cn } from "@/lib/utils";
import { VideoPlayer } from "@/components/ui/video-player";

type Props = {
    params: Promise<{ courseId: string }>;
};

export default function CoursePlayerPage({ params }: Props) {
    const { courseId } = use(params);
    const router = useRouter();
    const { user } = useAuth();
    const { getEnrollment, updateProgress, isEnrolled } = useCourse();

    const [currentLessonId, setCurrentLessonId] = useState<string | null>(null);
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const course = getCourseById(courseId);
    const enrollment = getEnrollment(courseId);

    // Redirect if not enrolled
    useEffect(() => {
        if (!isEnrolled(courseId)) {
            router.push(`/courses/${courseId}`);
        }
    }, [courseId, isEnrolled, router]);

    // Set initial lesson
    useEffect(() => {
        if (course && !currentLessonId) {
            const firstLesson = getFirstLesson(courseId);
            const lessonId = enrollment?.currentLessonId || firstLesson?.id || null;
            setCurrentLessonId(lessonId);
        }
    }, [course, courseId, currentLessonId, enrollment]);

    if (!course) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p>Course not found</p>
            </div>
        );
    }

    const currentLessonData = currentLessonId ? getLessonById(courseId, currentLessonId) : null;
    const currentLesson = currentLessonData?.lesson;
    const nextLesson = currentLessonId ? getNextLesson(courseId, currentLessonId) : null;
    const previousLesson = currentLessonId ? getPreviousLesson(courseId, currentLessonId) : null;
    const totalLessons = getTotalLessons(courseId);
    const completedLessons = enrollment?.completedLessons || [];
    const progress = enrollment?.progress || 0;

    const handleLessonClick = (lessonId: string) => {
        setCurrentLessonId(lessonId);
        updateProgress(courseId, lessonId);
    };

    const handleNext = () => {
        if (nextLesson) {
            handleLessonClick(nextLesson.id);
        }
    };

    const handlePrevious = () => {
        if (previousLesson) {
            handleLessonClick(previousLesson.id);
        }
    };

    const handleComplete = () => {
        if (currentLessonId) {
            updateProgress(courseId, currentLessonId);
            if (nextLesson) {
                handleNext();
            }
        }
    };

    return (
        <div className="min-h-screen bg-background flex text-foreground">
            {/* Left Sidebar - Course Content */}
            <aside className={cn(
                "fixed inset-y-0 left-0 z-40 w-80 bg-card border-r flex flex-col transition-transform duration-300",
                sidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                {/* Sidebar Header - Back & Progress */}
                <div className="p-4 border-b space-y-4">
                    <div className="flex items-center gap-3">
                        <Link href="/dashboard">
                            <Button variant="ghost" size="icon" className="rounded-full shrink-0">
                                <ArrowLeft className="h-5 w-5" />
                            </Button>
                        </Link>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                                <div className="h-2 flex-1 bg-muted rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-primary transition-all"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                                <span className="text-xs font-bold text-primary shrink-0">{progress}%</span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1 font-medium text-center">
                                {completedLessons.length} of {totalLessons} topics completed
                            </p>
                        </div>
                    </div>
                </div>

                {/* Course Discussions */}
                <div className="px-5 py-4 border-b">
                    <Link href="#" className="flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors">
                        <MessageSquare className="h-4 w-4" />
                        <span>Course Discussions</span>
                    </Link>
                </div>

                {/* Topics List */}
                <ScrollArea className="flex-1">
                    <div className="py-2">
                        <div className="px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50">
                            Course Content
                        </div>
                        <Accordion type="single" collapsible className="w-full px-2 overflow-visible" defaultValue={currentLessonId || undefined}>
                            {course.lessons
                                .sort((a, b) => a.order - b.order)
                                .map((lesson) => {
                                    const isActive = lesson.id === currentLessonId;
                                    const isCompleted = completedLessons.includes(lesson.id);

                                    return (
                                        <AccordionItem key={lesson.id} value={lesson.id} className="border-none">
                                            <AccordionTrigger
                                                className={cn(
                                                    "w-full flex items-start gap-4 px-4 py-3 hover:bg-muted/50 transition-all text-left group relative hover:no-underline rounded-xl",
                                                    isActive && "bg-primary/5"
                                                )}
                                            >
                                                <div className="flex items-start gap-3 w-full">
                                                    <div className="shrink-0 mt-0.5">
                                                        {isCompleted ? (
                                                            <CheckCircle className="h-4 w-4 text-green-500" />
                                                        ) : (
                                                            <div className={cn(
                                                                "h-4 w-4 rounded-full border flex items-center justify-center transition-all",
                                                                isActive ? "border-primary bg-primary/20" : "border-muted-foreground/30"
                                                            )}>
                                                                <Play className={cn(
                                                                    "h-2 w-2",
                                                                    isActive ? "text-primary fill-primary" : "text-muted-foreground/50"
                                                                )} />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className={cn(
                                                            "text-sm line-clamp-2 transition-colors",
                                                            isActive ? "font-bold text-primary" : "text-muted-foreground font-medium group-hover:text-foreground"
                                                        )}>
                                                            {lesson.title}
                                                        </p>
                                                        <span className="text-[10px] text-muted-foreground/70 font-medium">
                                                            {lesson.duration}
                                                        </span>
                                                    </div>
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent className="pb-2 pt-1">
                                                <div className="ml-6 border-l-2 border-primary/10 pl-3 space-y-2">
                                                    {/* Video Link */}
                                                    <button
                                                        className={cn(
                                                            "w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-semibold transition-all duration-200",
                                                            isActive
                                                                ? "bg-primary text-white shadow-md shadow-primary/20"
                                                                : "bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground border border-transparent"
                                                        )}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleLessonClick(lesson.id);
                                                        }}
                                                    >
                                                        <div className={cn(
                                                            "h-6 w-6 rounded flex items-center justify-center shrink-0",
                                                            isActive ? "bg-white/20" : "bg-primary/10"
                                                        )}>
                                                            <Play className={cn(
                                                                "h-2.5 w-2.5",
                                                                isActive ? "text-white fill-white" : "text-primary fill-primary"
                                                            )} />
                                                        </div>
                                                        <span className="truncate">Watch Video</span>
                                                        <span className="ml-auto text-[10px] opacity-70 font-medium">{lesson.duration}</span>
                                                    </button>

                                                    {/* Resources link if any */}
                                                    {lesson.resources && lesson.resources.length > 0 && (
                                                        <div className="space-y-1 pt-1.5">
                                                            <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/40 px-3 flex items-center gap-2">
                                                                <span className="h-px w-3 bg-muted-foreground/20" />
                                                                Resources
                                                            </p>
                                                            <div className="space-y-0.5">
                                                                {lesson.resources.map((resource, i) => (
                                                                    <a
                                                                        key={i}
                                                                        href={resource.url}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-muted/50 text-[11px] font-medium text-muted-foreground hover:text-foreground transition-colors group"
                                                                        onClick={(e) => e.stopPropagation()}
                                                                    >
                                                                        <FileText className="h-3 w-3 text-orange-500/70 shrink-0" />
                                                                        <span className="truncate flex-1">{resource.title}</span>
                                                                        <Download className="h-2.5 w-2.5 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                                                                    </a>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>
                                    );
                                })}
                        </Accordion>
                    </div>
                </ScrollArea>

                {/* User Info at bottom */}
                <div className="p-4 border-t flex items-center gap-3 bg-muted/20">
                    <Avatar className="h-9 w-9 border-2 border-primary/20">
                        <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-xs font-bold uppercase">
                            {user?.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold truncate">{user?.name}</p>
                        <p className="text-[10px] text-muted-foreground truncate uppercase tracking-tighter">Student Account</p>
                    </div>
                </div>
            </aside>

            {/* Mobile Sidebar Toggle */}
            <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-card shadow-lg border"
            >
                {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

            {/* Main Content */}
            <main className={cn(
                "flex-1 transition-all duration-300 min-h-screen",
                sidebarOpen ? "ml-80" : "ml-0"
            )}>
                {/* Top Header */}
                <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b">
                    <div className="flex items-center justify-between h-14 px-6 md:px-8">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="hidden lg:flex h-9 w-9 items-center justify-center rounded-lg hover:bg-muted transition-colors"
                            >
                                <Menu className="h-5 w-5" />
                            </button>
                            <h1 className="font-bold text-sm md:text-base truncate max-w-[200px] md:max-w-md text-muted-foreground uppercase tracking-wider">{course.title}</h1>
                        </div>

                        <div className="flex items-center gap-2">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handlePrevious}
                                disabled={!previousLesson}
                                className="gap-1 rounded-full text-xs font-bold px-4"
                            >
                                <ChevronLeft className="h-4 w-4" />
                                <span className="hidden sm:inline">Previous</span>
                            </Button>
                            <Button
                                size="sm"
                                onClick={handleComplete}
                                className="gap-1 rounded-full text-xs font-bold px-4 md:px-6 shadow-lg shadow-primary/20"
                            >
                                {nextLesson ? 'Complete and Continue' : 'Finish Course'}
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </header>

                {/* Video and Content */}
                <div className="p-6 md:p-10 max-w-6xl mx-auto">
                    {currentLesson && (
                        <div className="space-y-10">
                            {/* Video Player */}
                            <VideoPlayer
                                url={currentLesson.videoUrl}
                                title={currentLesson.title}
                                className="shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] border border-white/5"
                                onEnded={handleComplete}
                            />

                            {/* Lesson Title & Info */}
                            <div className="space-y-8">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <Badge variant="secondary" className="bg-primary/10 text-primary-foreground font-bold px-3 py-1 text-[10px] uppercase tracking-widest border-none">
                                            Topic {currentLesson.order}
                                        </Badge>
                                        <span className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                                            <Clock className="h-3.5 w-3.5" />
                                            {currentLesson.duration}
                                        </span>
                                    </div>
                                    <h2 className="text-3xl md:text-5xl font-black leading-tight tracking-tight">
                                        {currentLesson.title}
                                    </h2>
                                </div>

                                <div className="grid gap-12 lg:grid-cols-3 pt-4 border-t border-muted-foreground/10">
                                    <div className="lg:col-span-2 space-y-6">
                                        <div className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-muted-foreground">
                                            <span className="h-1 w-6 bg-primary rounded-full" />
                                            Description
                                        </div>
                                        <p className="text-muted-foreground leading-relaxed text-base">
                                            {currentLesson.description}
                                        </p>
                                    </div>

                                    {/* Resources Section */}
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-muted-foreground">
                                            <span className="h-1 w-6 bg-primary rounded-full" />
                                            Resources
                                        </div>
                                        <div className="space-y-3">
                                            {currentLesson.resources && currentLesson.resources.length > 0 ? (
                                                currentLesson.resources.map((resource, i) => (
                                                    <a
                                                        key={i}
                                                        href={resource.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center justify-between p-4 rounded-2xl border bg-card hover:border-primary/50 hover:bg-primary/5 hover:-translate-y-1 transition-all duration-300 group shadow-sm"
                                                    >
                                                        <div className="flex items-center gap-4">
                                                            <div className="p-2.5 rounded-xl bg-muted group-hover:bg-primary/20 transition-colors">
                                                                <FileText className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
                                                            </div>
                                                            <span className="text-sm font-bold">{resource.title}</span>
                                                        </div>
                                                        <Download className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-all" />
                                                    </a>
                                                ))
                                            ) : (
                                                <div className="p-8 rounded-2xl border-2 border-dashed border-muted-foreground/10 text-center flex flex-col items-center gap-2">
                                                    <div className="p-2 rounded-full bg-muted/50 text-muted-foreground/30">
                                                        <Download className="h-6 w-6" />
                                                    </div>
                                                    <p className="text-xs text-muted-foreground font-medium italic">No downloadable resources for this topic.</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

// Add Badge component locally if not available
function Badge({ children, variant = "default", className = "" }: { children: React.ReactNode, variant?: string, className?: string }) {
    const variants: Record<string, string> = {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    };

    return (
        <span className={cn("inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", variants[variant] || variants.default, className)}>
            {children}
        </span>
    );
}
