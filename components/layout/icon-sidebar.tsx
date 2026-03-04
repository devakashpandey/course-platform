"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Home, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SidebarLink } from "@/lib/types/admin";

interface IconSidebarProps {
    links: SidebarLink[];
    user: {
        name: string;
        email?: string;
    };
    onLogout: () => void;
    variant?: "default" | "admin";
    avatarBadge?: React.ReactNode;
}

export function IconSidebar({
    links,
    user,
    onLogout,
    variant = "default",
    avatarBadge,
}: IconSidebarProps) {
    const pathname = usePathname();

    const isAdmin = variant === "admin";
    const activeColor = isAdmin ? "bg-orange-500 text-white" : "bg-primary text-primary-foreground";
    const activeIndicatorColor = isAdmin ? "bg-orange-500" : "bg-primary";
    const avatarGradient = isAdmin
        ? "from-orange-500 to-red-600"
        : "from-primary to-accent";
    const ringColor = isAdmin
        ? "ring-orange-500/50 hover:ring-orange-500"
        : "ring-primary/20 hover:ring-primary/40";

    return (
        <aside className="fixed inset-y-0 left-0 z-50 w-56 bg-card border-r flex flex-col py-4">
            {/* User Avatar & Info */}
            <Link href={isAdmin ? "/admin" : "/dashboard"} className="flex items-center gap-3 px-4 mb-6">
                <div className="relative">
                    <Avatar className={cn("h-10 w-10 ring-2 transition-all cursor-pointer flex-shrink-0", ringColor)}>
                        <AvatarFallback className={cn("text-white font-bold text-sm bg-gradient-to-br", avatarGradient)}>
                            {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    {avatarBadge}
                </div>
                <div className="flex flex-col min-w-0">
                    <span className="font-semibold text-sm truncate">{user.name}</span>
                    {user.email && (
                        <span className="text-xs text-muted-foreground truncate">{user.email}</span>
                    )}
                </div>
            </Link>

            {/* Navigation Links */}
            <nav className="flex-1 flex flex-col gap-1 px-3">
                {links.map((link) => {
                    const isActive = pathname === link.href;
                    const Icon = link.icon;
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all",
                                isActive
                                    ? activeColor
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            )}
                        >
                            {isActive && (
                                <div className={cn("absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full -ml-3", activeIndicatorColor)} />
                            )}
                            <Icon className="h-5 w-5 flex-shrink-0" />
                            <span className="text-sm font-medium">{link.name}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom Section */}
            <div className="flex flex-col gap-1 px-3 pt-4 border-t mt-4">
                {/* Home Link */}
                <Link
                    href="/"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-all"
                >
                    <Home className="h-5 w-5 flex-shrink-0" />
                    <span className="text-sm font-medium">Back to Home</span>
                </Link>

                {/* Logout Button */}
                <button
                    onClick={onLogout}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all w-full"
                >
                    <LogOut className="h-5 w-5 flex-shrink-0" />
                    <span className="text-sm font-medium">Logout</span>
                </button>
            </div>
        </aside>
    );
}
