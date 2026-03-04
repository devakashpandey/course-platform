"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, GraduationCap, User, LogOut, BookOpen, LayoutDashboard, Mail } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";

const navigation = [
    { name: "Home", href: "/" },
    { name: "Courses", href: "/courses" },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
];

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push("/");
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <nav className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                        <GraduationCap className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <span className="text-xl font-bold">DSWithShikhar</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex md:items-center md:gap-8">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                        >
                            {item.name}
                        </Link>
                    ))}

                    {/* My Courses - Only show if logged in */}
                    {user && (
                        <Link
                            href="/dashboard"
                            className="text-sm font-medium text-primary transition-colors hover:text-primary/80 flex items-center gap-1.5"
                        >
                            <BookOpen className="h-4 w-4" />
                            My Courses
                        </Link>
                    )}
                </div>

                {/* Desktop CTA */}
                <div className="hidden md:flex md:items-center md:gap-4">
                    {user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0">
                                    <Avatar className="h-10 w-10 ring-2 ring-primary/20 hover:ring-primary/40 transition-all">
                                        <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white font-bold">
                                            {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end" forceMount>
                                <div className="flex items-center gap-2 p-2">
                                    <Avatar className="h-8 w-8">
                                        <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-xs font-bold">
                                            {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col space-y-0.5">
                                        <p className="text-sm font-medium">{user.name}</p>
                                        <p className="text-xs text-muted-foreground truncate max-w-[180px]">{user.email}</p>
                                    </div>
                                </div>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link href="/dashboard" className="cursor-pointer">
                                        <LayoutDashboard className="mr-2 h-4 w-4" />
                                        Dashboard
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={handleLogout}
                                    className="text-destructive focus:text-destructive cursor-pointer"
                                >
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Sign Out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <>
                            <Button variant="ghost" size="sm" asChild>
                                <Link href="/login">Sign In</Link>
                            </Button>
                            <Button size="sm" asChild>
                                <Link href="/signup">Get Started</Link>
                            </Button>
                        </>
                    )}
                </div>

                {/* Mobile Navigation */}
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild className="md:hidden">
                        <Button variant="ghost" size="icon" className="hover:bg-primary/5">
                            <Menu className="h-6 w-6 text-foreground" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="flex w-[300px] flex-col p-0 sm:w-[350px]">
                        {/* Header with Logo */}
                        <div className="border-b px-6 py-5">
                            <Link href="/" className="flex items-center gap-2.5" onClick={() => setIsOpen(false)}>
                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20">
                                    <GraduationCap className="h-5 w-5 text-primary-foreground" />
                                </div>
                                <span className="text-xl font-bold tracking-tight">DSWithShikhar</span>
                            </Link>
                        </div>

                        <div className="flex flex-1 flex-col overflow-y-auto px-4 py-6">
                            {/* User Info Section */}
                            {user && (
                                <div className="mb-8 flex flex-col gap-4">
                                    <div className="flex items-center gap-4 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 p-4 ring-1 ring-primary/10">
                                        <Avatar className="h-12 w-12 border-2 border-background shadow-sm">
                                            <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-lg font-bold">
                                                {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col min-w-0">
                                            <p className="font-bold text-foreground leading-tight truncate">{user.name}</p>
                                            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                                        </div>
                                    </div>
                                    <Link
                                        href="/dashboard"
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center gap-3 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                                    >
                                        <LayoutDashboard className="h-4 w-4" />
                                        Access Dashboard
                                    </Link>
                                </div>
                            )}

                            {/* Navigation Links */}
                            <div className="space-y-1.5">
                                <p className="px-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-2">Main Menu</p>
                                {[
                                    { name: "Home", href: "/", icon: Menu },
                                    { name: "Courses", href: "/courses", icon: BookOpen },
                                    { name: "Blog", href: "/blog", icon: GraduationCap },
                                    { name: "About", href: "/about", icon: User },
                                    { name: "Contact", href: "/contact", icon: Mail },
                                ].map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className="group flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium text-muted-foreground transition-all hover:bg-primary/5 hover:text-primary active:bg-primary/10"
                                    >
                                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted/50 text-muted-foreground transition-colors group-hover:bg-primary/10 group-hover:text-primary">
                                            <item.icon className="h-4 w-4" />
                                        </div>
                                        {item.name}
                                    </Link>
                                ))}
                            </div>

                            {/* Auth Actions at Bottom */}
                            <div className="mt-auto space-y-3 pt-8 pb-4">
                                {!user ? (
                                    <>
                                        <Button variant="outline" className="h-12 w-full rounded-xl border-2 font-bold" asChild>
                                            <Link href="/login" onClick={() => setIsOpen(false)}>
                                                Sign In
                                            </Link>
                                        </Button>
                                        <Button className="h-12 w-full rounded-xl font-bold shadow-lg shadow-primary/20" asChild>
                                            <Link href="/signup" onClick={() => setIsOpen(false)}>
                                                Create Account
                                            </Link>
                                        </Button>
                                    </>
                                ) : (
                                    <Button
                                        variant="ghost"
                                        className="h-12 w-full justify-start rounded-xl px-4 text-destructive hover:bg-destructive/5 hover:text-destructive transition-colors font-bold"
                                        onClick={() => {
                                            handleLogout();
                                            setIsOpen(false);
                                        }}
                                    >
                                        <LogOut className="mr-3 h-5 w-5" />
                                        Sign Out Account
                                    </Button>
                                )}
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </nav>
        </header>
    );
}
