"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface DashboardHeaderProps {
    title: string;
    subtitle?: string;
    user: {
        name: string;
        email?: string;
    };
    variant?: "default" | "admin";
    icon?: React.ReactNode;
    badge?: string;
}

export function DashboardHeader({
    title,
    subtitle,
    user,
    variant = "default",
    icon,
    badge,
}: DashboardHeaderProps) {
    const isAdmin = variant === "admin";
    const avatarGradient = isAdmin
        ? "from-orange-500 to-red-600"
        : "from-primary to-accent";
    const badgeColor = isAdmin ? "text-orange-500" : "text-muted-foreground";

    return (
        <header className="sticky top-0 z-40 h-16 bg-card/95 backdrop-blur border-b flex items-center justify-between px-6">
            <div className="flex items-center gap-3">
                {icon}
                <div>
                    <h1 className="text-lg font-bold">{title}</h1>
                    {subtitle && (
                        <p className="text-xs text-muted-foreground">{subtitle}</p>
                    )}
                </div>
            </div>
            <div className="flex items-center gap-3">
                <div className="flex items-center gap-3">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className={cn("text-xs font-medium", badgeColor)}>
                            {badge || user.email}
                        </p>
                    </div>
                    <Avatar className="h-9 w-9">
                        <AvatarFallback className={cn("text-white font-bold text-xs bg-gradient-to-br", avatarGradient)}>
                            {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                </div>
            </div>
        </header>
    );
}
