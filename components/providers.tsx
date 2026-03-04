"use client";

import { AuthProvider } from "@/contexts/auth-context";
import { CourseProvider } from "@/contexts/course-context";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <CourseProvider>
                {children}
            </CourseProvider>
        </AuthProvider>
    );
}
