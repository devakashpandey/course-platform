"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AnimatedSection } from "@/components/ui/animated-section";
import {
    DynamicListInput,
    DynamicKeyValueList,
    LessonEditor,
    ImagePreviewInput,
    InstructorForm
} from "@/components/admin";
import { FormSectionNav } from "@/components/admin/form-section-nav";
import {
    BookOpen,
    ArrowLeft,
    Save,
    DollarSign,
    CheckCircle,
    ListChecks,
    Image as ImageIcon,
    User,
    Video
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import type { CourseFormData, Lesson } from "@/lib/types/admin";
import { courses as staticCourses } from "@/lib/course-data";

// Define form sections for navigation - Status only in edit mode
const getFormSections = (isEditMode: boolean) => {
    const sections = [
        { id: "basic-info", label: "Basic Info", icon: BookOpen },
        { id: "pricing", label: "Pricing", icon: DollarSign },
        { id: "course-image", label: "Image", icon: ImageIcon },
        { id: "features", label: "Features", icon: CheckCircle },
        { id: "curriculum", label: "Curriculum", icon: ListChecks },
        { id: "lessons", label: "Lessons", icon: Video },
    ];

    if (isEditMode) {
        sections.unshift({ id: "status", label: "Status", icon: CheckCircle });
    }

    return sections;
};

export default function AddCoursePage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CourseForm />
        </Suspense>
    );
}

function CourseForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const editId = searchParams.get("edit");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState<CourseFormData>({
        title: "",
        description: "",
        image: "",
        price: "",
        duration: "",
        level: "Beginner",
        category: "beginner",
        features: [""],
        curriculum: [{ title: "", duration: "" }],
        instructor: {
            name: "",
            role: "",
            bio: "",
            image: ""
        },
        lessons: [{
            id: `lesson-${Date.now()}`,
            title: "",
            description: "",
            videoUrl: "",
            duration: "",
            order: 1,
        }],
        isActive: true,
    });

    // Load data if editing
    useEffect(() => {
        if (editId) {
            // First check custom courses
            const storedCourses = localStorage.getItem('coursehub_custom_courses');
            if (storedCourses) {
                const courses = JSON.parse(storedCourses);
                const courseToEdit = courses.find((c: any) => c.id === editId);
                if (courseToEdit) {
                    setFormData({
                        ...courseToEdit,
                        features: courseToEdit.features || [""],
                        curriculum: courseToEdit.curriculum || [{ title: "", duration: "" }],
                        lessons: courseToEdit.lessons || []
                    });
                    return;
                }
            }

            // Then check static courses
            const staticToEdit = staticCourses.find((c: any) => c.id === editId);
            if (staticToEdit) {
                setFormData({
                    ...staticToEdit,
                    features: staticToEdit.features || [""],
                    curriculum: (staticToEdit as any).curriculum || [{ title: "", duration: "" }],
                    lessons: staticToEdit.lessons || [],
                    instructor: {
                        ...staticToEdit.instructor,
                        image: (staticToEdit.instructor as any).image || "/authors/admin.jpg",
                        bio: (staticToEdit.instructor as any).bio || "Expert educator with years of experience in AI and Machine Learning."
                    },
                    isActive: true
                } as any);
            }
        }
    }, [editId]);

    // Generate slug from title
    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    };

    // Handle basic field changes
    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    // Handle instructor field changes
    const handleInstructorChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            instructor: { ...prev.instructor, [field]: value }
        }));
    };

    // Features handlers
    const addFeature = () => {
        setFormData(prev => ({ ...prev, features: [...prev.features, ""] }));
    };
    const updateFeature = (index: number, value: string) => {
        setFormData(prev => ({
            ...prev,
            features: prev.features.map((f, i) => i === index ? value : f)
        }));
    };
    const removeFeature = (index: number) => {
        setFormData(prev => ({
            ...prev,
            features: prev.features.filter((_, i) => i !== index)
        }));
    };

    // Curriculum handlers
    const addCurriculumItem = () => {
        setFormData(prev => ({
            ...prev,
            curriculum: [...prev.curriculum, { title: "", duration: "" }]
        }));
    };
    const updateCurriculumItem = (index: number, field: 'title' | 'duration', value: string) => {
        setFormData(prev => ({
            ...prev,
            curriculum: prev.curriculum.map((item, i) =>
                i === index ? { ...item, [field]: value } : item
            )
        }));
    };
    const removeCurriculumItem = (index: number) => {
        setFormData(prev => ({
            ...prev,
            curriculum: prev.curriculum.filter((_, i) => i !== index)
        }));
    };

    // Lessons handlers
    const addLesson = () => {
        const newOrder = formData.lessons.length + 1;
        setFormData(prev => ({
            ...prev,
            lessons: [...prev.lessons, {
                id: `lesson-${Date.now()}`,
                title: "",
                description: "",
                videoUrl: "",
                duration: "",
                order: newOrder,
            }]
        }));
    };
    const updateLesson = (index: number, field: keyof Lesson, value: string | number) => {
        setFormData(prev => ({
            ...prev,
            lessons: prev.lessons.map((lesson, i) =>
                i === index ? { ...lesson, [field]: value } : lesson
            )
        }));
    };
    const removeLesson = (index: number) => {
        setFormData(prev => ({
            ...prev,
            lessons: prev.lessons.filter((_, i) => i !== index).map((lesson, i) => ({
                ...lesson,
                order: i + 1
            }))
        }));
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            if (!formData.title || !formData.description || !formData.price) {
                toast.error("Please fill in all required fields");
                setIsSubmitting(false);
                return;
            }

            const newCourse = {
                id: generateSlug(formData.title),
                ...formData,
                features: formData.features.filter(f => f.trim() !== ""),
                curriculum: formData.curriculum.filter(c => c.title.trim() !== ""),
                lessons: formData.lessons.filter(l => l.title.trim() !== "").map((l, i) => ({
                    ...l,
                    id: `${generateSlug(formData.title)}-lesson-${i + 1}`,
                    order: i + 1,
                })),
            };

            const existingCourses = localStorage.getItem('coursehub_custom_courses');
            let courses = existingCourses ? JSON.parse(existingCourses) : [];

            if (editId) {
                courses = courses.map((c: any) => c.id === editId ? newCourse : c);
            } else {
                courses.push(newCourse);
            }

            localStorage.setItem('coursehub_custom_courses', JSON.stringify(courses));

            toast.success(editId ? "Course updated successfully!" : "Course created successfully!");
            router.push("/admin");
        } catch (error) {
            console.error("Error creating course:", error);
            toast.error("Failed to create course");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex gap-8">
            {/* Fixed Section Navigator */}
            <FormSectionNav sections={getFormSections(!!editId)} variant="admin" />

            {/* Main Form Content */}
            <div className="flex-1 max-w-4xl space-y-6 pb-12">
                {/* Header */}
                <AnimatedSection>
                    <div className="flex items-center justify-between mb-6">
                        <Button variant="ghost" size="sm" asChild>
                            <Link href="/admin">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Admin
                            </Link>
                        </Button>
                        <Button
                            onClick={(e) => handleSubmit(e as any)}
                            disabled={isSubmitting}
                            className="shadow-lg shadow-blue-500/20"
                        >
                            {isSubmitting ? (
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                            ) : (
                                <>
                                    <Save className="h-4 w-4 mr-2" />
                                    Publish Course
                                </>
                            )}
                        </Button>
                    </div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10">
                            <BookOpen className="h-5 w-5 text-blue-500" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold">{editId ? "Edit Course" : "Add New Course"}</h1>
                            <p className="text-sm text-muted-foreground">{editId ? "Update existing course details" : "Create a new course with all details"}</p>
                        </div>
                    </div>
                </AnimatedSection>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Status Toggle - Only in Edit Mode */}
                    {editId && (
                        <div id="status" className="scroll-mt-32">
                            <AnimatedSection delay={0.05}>
                                <Card className="border-border/50">
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <CardTitle>Course Status</CardTitle>
                                                <CardDescription>Control visibility of this course on the website</CardDescription>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Label htmlFor="isActive" className="text-sm font-bold uppercase tracking-wider">
                                                    {formData.isActive ? "Active" : "Inactive"}
                                                </Label>
                                                <button
                                                    type="button"
                                                    onClick={() => setFormData(p => ({ ...p, isActive: !p.isActive }))}
                                                    className={cn(
                                                        "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                                                        formData.isActive ? "bg-primary" : "bg-muted"
                                                    )}
                                                >
                                                    <span
                                                        className={cn(
                                                            "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                                                            formData.isActive ? "translate-x-5" : "translate-x-0"
                                                        )}
                                                    />
                                                </button>
                                            </div>
                                        </div>
                                    </CardHeader>
                                </Card>
                            </AnimatedSection>
                        </div>
                    )}

                    {/* Basic Information */}
                    <div id="basic-info" className="scroll-mt-32">
                        <AnimatedSection delay={0.1}>
                            <Card className="border-border/50">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <BookOpen className="h-5 w-5 text-primary" />
                                        Basic Information
                                    </CardTitle>
                                    <CardDescription>Course title, description and category</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="title">Course Title *</Label>
                                        <Input
                                            id="title"
                                            placeholder="e.g., Complete Machine Learning Bootcamp"
                                            value={formData.title || ""}
                                            onChange={(e) => handleChange("title", e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="description">Description *</Label>
                                        <Textarea
                                            id="description"
                                            placeholder="Describe what students will learn in this course..."
                                            value={formData.description || ""}
                                            onChange={(e) => handleChange("description", e.target.value)}
                                            rows={4}
                                            required
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="level">Level *</Label>
                                            <Select value={formData.level} onValueChange={(value: string) => handleChange("level", value)}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select level" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Beginner">Beginner</SelectItem>
                                                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                                                    <SelectItem value="Advanced">Advanced</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="category">Category</Label>
                                            <Select value={formData.category} onValueChange={(value: string) => handleChange("category", value)}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select category" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="beginner">Beginner</SelectItem>
                                                    <SelectItem value="intermediate">Intermediate</SelectItem>
                                                    <SelectItem value="advanced">Advanced</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </AnimatedSection>
                    </div>

                    {/* Pricing & Duration */}
                    <div id="pricing" className="scroll-mt-32">
                        <AnimatedSection delay={0.15}>
                            <Card className="border-border/50">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <DollarSign className="h-5 w-5 text-green-500" />
                                        Pricing & Duration
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="price">Price *</Label>
                                            <Input
                                                id="price"
                                                placeholder="e.g., ₹24,999 or Free"
                                                value={formData.price || ""}
                                                onChange={(e) => handleChange("price", e.target.value)}
                                                required
                                            />
                                            <p className="text-xs text-muted-foreground">Enter "Free" for free courses</p>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="duration">Duration *</Label>
                                            <Input
                                                id="duration"
                                                placeholder="e.g., 8 Weeks or 3 Hours"
                                                value={formData.duration || ""}
                                                onChange={(e) => handleChange("duration", e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </AnimatedSection>
                    </div>

                    {/* Course Image */}
                    <div id="course-image" className="scroll-mt-32">
                        <AnimatedSection delay={0.2}>
                            <ImagePreviewInput
                                title="Course Image"
                                value={formData.image}
                                onChange={(value) => handleChange("image", value)}
                                placeholder="e.g., /course-image.png or https://..."
                                required
                            />
                        </AnimatedSection>
                    </div>


                    {/* Features */}
                    <div id="features" className="scroll-mt-32">
                        <AnimatedSection delay={0.3}>
                            <DynamicListInput
                                title="What You'll Learn (Features)"
                                description="List the key learning outcomes"
                                icon={<CheckCircle className="h-5 w-5 text-green-500" />}
                                items={formData.features}
                                onAdd={addFeature}
                                onUpdate={updateFeature}
                                onRemove={removeFeature}
                                placeholder="Feature"
                                addButtonText="Add Feature"
                            />
                        </AnimatedSection>
                    </div>

                    {/* Curriculum */}
                    <div id="curriculum" className="scroll-mt-32">
                        <AnimatedSection delay={0.35}>
                            <DynamicKeyValueList
                                title="Curriculum Overview"
                                description="High-level topics covered in the course"
                                icon={<ListChecks className="h-5 w-5 text-orange-500" />}
                                items={formData.curriculum}
                                onAdd={addCurriculumItem}
                                onUpdate={updateCurriculumItem}
                                onRemove={removeCurriculumItem}
                                titlePlaceholder="Topic title"
                                valuePlaceholder="Duration (e.g., Week 1)"
                                addButtonText="Add Topic"
                            />
                        </AnimatedSection>
                    </div>

                    {/* Lessons */}
                    <div id="lessons" className="scroll-mt-32">
                        <AnimatedSection delay={0.4}>
                            <LessonEditor
                                lessons={formData.lessons}
                                onAdd={addLesson}
                                onUpdate={updateLesson}
                                onRemove={removeLesson}
                            />
                        </AnimatedSection>
                    </div>

                    {/* Submit Button */}
                    <AnimatedSection delay={0.45}>
                        <div className="flex gap-4 justify-end">
                            <Button type="button" variant="outline" asChild>
                                <Link href="/admin">Cancel</Link>
                            </Button>
                            <Button type="submit" disabled={isSubmitting} className="min-w-32">
                                {isSubmitting ? (
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                                ) : (
                                    <>
                                        <Save className="h-4 w-4 mr-2" />
                                        {editId ? "Update Course" : "Create Course"}
                                    </>
                                )}
                            </Button>
                        </div>
                    </AnimatedSection>
                </form>
            </div>
        </div>
    );
}
