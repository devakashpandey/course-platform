"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { isAdminEmail } from "@/lib/admin-config";
import { IconSidebar } from "@/components/layout/icon-sidebar";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { BookOpen, FileText, LayoutDashboard, Shield } from "lucide-react";

const adminSidebarLinks = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Add Course", href: "/admin/add-course", icon: BookOpen },
    { name: "Add Blog", href: "/admin/add-blog", icon: FileText },
];

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user, isLoading, logout } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    const isAdmin = isAdminEmail(user?.email);

    // Redirect if not logged in or not admin
    useEffect(() => {
        if (!isLoading) {
            if (!user) {
                router.push("/login?redirect=/admin");
            } else if (!isAdmin) {
                router.push("/dashboard");
            }
        }
    }, [user, isLoading, isAdmin, router]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!user || !isAdmin) {
        return null;
    }

    const handleLogout = () => {
        logout();
        router.push("/");
    };

    // Admin badge on avatar
    const avatarBadge = (
        <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-orange-500 rounded-full flex items-center justify-center">
            <Shield className="h-2.5 w-2.5 text-white" />
        </div>
    );

    return (
        <div className="min-h-screen bg-background flex">
            {/* Expanded Sidebar */}
            <IconSidebar
                links={adminSidebarLinks}
                user={user}
                onLogout={handleLogout}
                variant="admin"
                avatarBadge={avatarBadge}
            />

            {/* Main Content with Header */}
            <div className="flex-1 ml-56 flex flex-col">
                {/* Admin Header */}
                <DashboardHeader
                    title="Admin Panel"
                    subtitle="Manage courses & content"
                    user={user}
                    variant="admin"
                    badge="Administrator"
                    icon={
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500/10">
                            <Shield className="h-4 w-4 text-orange-500" />
                        </div>
                    }
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
