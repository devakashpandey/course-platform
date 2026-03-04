"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { IconSidebar } from "@/components/layout/icon-sidebar";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { BookOpen, Bookmark, MessageCircle } from "lucide-react";

const sidebarLinks = [
    { name: "My Courses", href: "/dashboard", icon: BookOpen },
    { name: "Saved", href: "/dashboard/saved", icon: Bookmark },
    { name: "Support", href: "/contact", icon: MessageCircle },
];

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user, isLoading, logout } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    // Check if we're on a course player page
    const isCoursePage = pathname?.includes("/dashboard/courses/");

    // Redirect if not logged in
    useEffect(() => {
        if (!isLoading && !user) {
            router.push("/login?redirect=/dashboard");
        }
    }, [user, isLoading, router]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    const handleLogout = () => {
        logout();
        router.push("/");
    };

    // Course player has its own layout
    if (isCoursePage) {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen bg-background flex">
            {/* Expanded Sidebar */}
            <IconSidebar
                links={sidebarLinks}
                user={user}
                onLogout={handleLogout}
                variant="default"
            />

            {/* Main Content with Header */}
            <div className="flex-1 ml-56 flex flex-col">
                {/* Dashboard Header */}
                <DashboardHeader
                    title="Dashboard"
                    user={user}
                    variant="default"
                />

                {/* Page Content */}
                <main className="flex-1">
                    <div className="container mx-auto px-6 py-8 max-w-6xl">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
