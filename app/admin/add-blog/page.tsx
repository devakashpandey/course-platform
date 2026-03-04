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
import { ImagePreviewInput } from "@/components/admin";
import { FormSectionNav } from "@/components/admin/form-section-nav";
import {
    FileText,
    ArrowLeft,
    Save,
    User,
    Image as ImageIcon,
    AlignLeft,
    CheckCircle
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useAuth } from "@/contexts/auth-context";
import type { BlogFormData } from "@/lib/types/admin";
import dynamic from "next/dynamic";

// Dynamically import Froala Editor to avoid SSR issues
const FroalaEditorComponent = dynamic(
    () => import("react-froala-wysiwyg"),
    { ssr: false }
);

import { cn } from "@/lib/utils";
import { blogs as staticBlogs } from "@/lib/course-data";

// Import Froala Editor CSS
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/css/froala_style.min.css";
// Import Froala Editor JS (Load only on client)
if (typeof window !== "undefined") {
    require("froala-editor/js/plugins.pkgd.min.js");
}

// Define form sections for navigation - Status only in edit mode
const getFormSections = (isEditMode: boolean) => {
    const sections = [
        { id: "blog-info", label: "Blog Info", icon: FileText },
        { id: "featured-image", label: "Image", icon: ImageIcon },
        { id: "author-info", label: "Author", icon: User },
        { id: "blog-content", label: "Content", icon: AlignLeft },
    ];

    if (isEditMode) {
        sections.unshift({ id: "status", label: "Status", icon: CheckCircle });
    }

    return sections;
};

const categories = [
    "AI/ML",
    "Learning",
    "Industry",
    "Mathematics",
    "Career",
    "Tutorial",
    "News",
];

export default function AddBlogPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <BlogForm />
        </Suspense>
    );
}

function BlogForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const editId = searchParams.get("edit");
    const { user } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState<BlogFormData>({
        title: "",
        excerpt: "",
        content: "",
        category: "AI/ML",
        readTime: "5 min",
        image: "",
        author: {
            name: user?.name || "Admin",
            image: "/authors/admin.jpg",
        },
        isActive: true,
    });

    // Load data if editing
    useEffect(() => {
        if (editId) {
            // First check custom blogs
            const storedBlogs = localStorage.getItem('coursehub_custom_blogs');
            if (storedBlogs) {
                const blogs = JSON.parse(storedBlogs);
                const blogToEdit = blogs.find((b: any) => b.id === editId);
                if (blogToEdit) {
                    setFormData(blogToEdit);
                    return;
                }
            }

            // Then check static blogs
            const staticToEdit = (staticBlogs as any).find((b: any) => b.id === editId);
            if (staticToEdit) {
                setFormData({
                    ...staticToEdit,
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

    // Handle author field changes
    const handleAuthorChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            author: { ...prev.author, [field]: value }
        }));
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            if (!formData.title || !formData.excerpt || !formData.content) {
                toast.error("Please fill in all required fields");
                setIsSubmitting(false);
                return;
            }

            const newBlog = {
                id: generateSlug(formData.title),
                title: formData.title,
                excerpt: formData.excerpt,
                content: formData.content,
                category: formData.category,
                readTime: formData.readTime,
                image: formData.image || "/blogs/default.png",
                date: new Date().toISOString().split('T')[0],
                author: formData.author,
            };

            const existingBlogs = localStorage.getItem('coursehub_custom_blogs');
            let blogs = existingBlogs ? JSON.parse(existingBlogs) : [];

            if (editId) {
                blogs = blogs.map((b: any) => b.id === editId ? newBlog : b);
            } else {
                blogs.push(newBlog);
            }

            localStorage.setItem('coursehub_custom_blogs', JSON.stringify(blogs));

            toast.success(editId ? "Blog post updated successfully!" : "Blog post created successfully!");
            router.push("/admin");
        } catch (error) {
            console.error("Error creating blog:", error);
            toast.error("Failed to create blog post");
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
                            className="shadow-lg shadow-purple-500/20"
                        >
                            {isSubmitting ? (
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                            ) : (
                                <>
                                    <Save className="h-4 w-4 mr-2" />
                                    Publish Blog
                                </>
                            )}
                        </Button>
                    </div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10">
                            <FileText className="h-5 w-5 text-purple-500" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold">{editId ? "Edit Blog Post" : "Add New Blog Post"}</h1>
                            <p className="text-sm text-muted-foreground">{editId ? "Update existing blog article" : "Write and publish a new article"}</p>
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
                                                <CardTitle>Blog Status</CardTitle>
                                                <CardDescription>Control visibility of this blog post on the website</CardDescription>
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
                    <div id="blog-info" className="scroll-mt-32">
                        <AnimatedSection delay={0.1}>
                            <Card className="border-border/50">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <FileText className="h-5 w-5 text-primary" />
                                        Blog Information
                                    </CardTitle>
                                    <CardDescription>Title and summary of your blog post</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="title">Blog Title *</Label>
                                        <Input
                                            id="title"
                                            placeholder="e.g., Getting Started with Machine Learning"
                                            value={formData.title || ""}
                                            onChange={(e) => handleChange("title", e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="excerpt">Excerpt / Summary *</Label>
                                        <Textarea
                                            id="excerpt"
                                            placeholder="A brief summary of your blog post (shown in blog cards)..."
                                            value={formData.excerpt || ""}
                                            onChange={(e) => handleChange("excerpt", e.target.value)}
                                            rows={3}
                                            required
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="category">Category *</Label>
                                            <Select value={formData.category} onValueChange={(value: string) => handleChange("category", value)}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select category" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {categories.map(cat => (
                                                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="readTime">Read Time</Label>
                                            <Input
                                                id="readTime"
                                                placeholder="e.g., 5 min"
                                                value={formData.readTime || ""}
                                                onChange={(e) => handleChange("readTime", e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </AnimatedSection>
                    </div>

                    {/* Blog Image */}
                    <div id="featured-image" className="scroll-mt-32">
                        <AnimatedSection delay={0.15}>
                            <ImagePreviewInput
                                title="Featured Image"
                                value={formData.image}
                                onChange={(value) => handleChange("image", value)}
                                placeholder="e.g., /blogs/my-post.png or https://..."
                            />
                        </AnimatedSection>
                    </div>

                    {/* Author Info */}
                    <div id="author-info" className="scroll-mt-32">
                        <AnimatedSection delay={0.2}>
                            <Card className="border-border/50">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <User className="h-5 w-5 text-green-500" />
                                        Author Information
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="authorName">Author Name *</Label>
                                            <Input
                                                id="authorName"
                                                placeholder="Your name"
                                                value={formData.author.name || ""}
                                                onChange={(e) => handleAuthorChange("name", e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="authorImage">Author Image URL</Label>
                                            <Input
                                                id="authorImage"
                                                placeholder="e.g., /authors/john.jpg"
                                                value={formData.author.image || ""}
                                                onChange={(e) => handleAuthorChange("image", e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </AnimatedSection>
                    </div>

                    {/* Blog Content */}
                    <div id="blog-content" className="scroll-mt-32">
                        <AnimatedSection delay={0.25}>
                            <Card className="border-border/50">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <AlignLeft className="h-5 w-5 text-orange-500" />
                                        Blog Content *
                                    </CardTitle>
                                    <CardDescription>Write your blog content using the rich text editor</CardDescription>
                                </CardHeader>
                                <CardContent className="min-h-[400px]">
                                    <div className="prose prose-sm max-w-none dark:prose-invert">
                                        <FroalaEditorComponent
                                            tag="textarea"
                                            model={formData.content}
                                            onModelChange={(model: string) => handleChange("content", model)}
                                            config={{
                                                placeholderText: "Start writing your blog content here...",
                                                charCounterCount: true,
                                                quickInsertEnabled: false,
                                                toolbarButtons: {
                                                    moreText: {
                                                        buttons: ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontFamily', 'fontSize', 'textColor', 'backgroundColor', 'clearFormatting']
                                                    },
                                                    moreParagraph: {
                                                        buttons: ['alignLeft', 'alignCenter', 'formatOL', 'formatUL', 'paragraphFormat', 'lineHeight', 'outdent', 'indent', 'quote']
                                                    },
                                                    moreRich: {
                                                        buttons: ['insertLink', 'insertImage', 'insertTable', 'emoticons', 'insertHR']
                                                    },
                                                    moreMisc: {
                                                        buttons: ['undo', 'redo', 'fullscreen', 'html'],
                                                        align: 'right',
                                                        buttonsVisible: 2
                                                    }
                                                },
                                                heightMin: 300,
                                                events: {
                                                    'initialized': function () {
                                                        console.log('Editor initialized');
                                                    }
                                                }
                                            }}
                                        />
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-4">
                                        Rich text editor supported. You can add images and format your text directly.
                                    </p>

                                </CardContent>
                            </Card>
                        </AnimatedSection>
                    </div>

                    {/* Submit Button */}
                    <AnimatedSection delay={0.3}>
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
                                        {editId ? "Update Blog" : "Publish Blog"}
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
