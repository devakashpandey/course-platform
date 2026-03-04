"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname() || "";

    // Comprehensive check for routes that should NOT have the main navbar/footer
    // These include:
    // 1. Dashboard routes (/dashboard, /dashboard/...)
    // 2. Admin routes (/admin, /admin/...)
    // 3. Auth routes (/login, /signup)

    const isDashboard = pathname.startsWith("/dashboard");
    const isAdmin = pathname.startsWith("/admin");
    const isAuth = pathname === "/login" || pathname === "/signup";

    const hideLayout = isDashboard || isAdmin || isAuth;

    // Debugging (will show in browser console)
    // console.log("Pathname:", pathname, "Hide Layout:", hideLayout);

    if (hideLayout) {
        return <>{children}</>;
    }

    return (
        <>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
        </>
    );
}
