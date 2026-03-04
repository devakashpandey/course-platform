// Admin Types

export interface SidebarLink {
    name: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
}

export interface Lesson {
    id: string;
    title: string;
    description: string;
    videoUrl: string;
    duration: string;
    order: number;
}

export interface CurriculumItem {
    title: string;
    duration: string;
}

export interface CourseFormData {
    id?: string;
    title: string;
    description: string;
    image: string;
    price: string;
    duration: string;
    level: string;
    category: string;
    features: string[];
    curriculum: CurriculumItem[];
    instructor: {
        name: string;
        role: string;
        image: string;
        bio: string;
    };
    lessons: Lesson[];
    isActive: boolean;
}

export interface BlogFormData {
    id?: string;
    title: string;
    excerpt: string;
    content: string;
    category: string;
    readTime: string;
    image: string;
    author: {
        name: string;
        image: string;
    };
    isActive: boolean;
}
