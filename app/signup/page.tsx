"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Eye, EyeOff, Loader2, Check } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";

export default function SignupPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirect = searchParams.get("redirect");
    const { signup, isLoading } = useAuth();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const passwordRequirements = [
        { label: "At least 6 characters", met: password.length >= 6 },
        { label: "Contains a number", met: /\d/.test(password) },
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsSubmitting(true);

        if (!name || !email || !password || !confirmPassword) {
            setError("Please fill in all fields");
            setIsSubmitting(false);
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            setIsSubmitting(false);
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            setIsSubmitting(false);
            return;
        }

        const success = await signup(name, email, password);

        if (success) {
            // Redirect to intended page or dashboard
            router.push(redirect || "/dashboard");
        } else {
            setError("An account with this email already exists");
        }
        setIsSubmitting(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-background via-background to-primary/5">
            {/* Background decorations */}
            <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <Card className="w-full max-w-md relative z-10 shadow-2xl border-border/50">
                <CardHeader className="text-center space-y-4">
                    <Link href="/" className="flex items-center justify-center gap-2 mx-auto">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
                            <GraduationCap className="h-7 w-7 text-primary-foreground" />
                        </div>
                    </Link>
                    <div>
                        <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
                        <CardDescription className="mt-2">
                            Start your AI/ML learning journey today
                        </CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm text-center">
                                {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium">
                                Full Name
                            </label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                disabled={isSubmitting}
                                className="h-12"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium">
                                Email Address
                            </label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={isSubmitting}
                                className="h-12"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm font-medium">
                                Password
                            </label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    disabled={isSubmitting}
                                    className="h-12 pr-12"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                            {password && (
                                <div className="mt-2 space-y-1">
                                    {passwordRequirements.map((req, i) => (
                                        <div key={i} className={`flex items-center gap-2 text-xs ${req.met ? 'text-green-600' : 'text-muted-foreground'}`}>
                                            <Check className={`h-3 w-3 ${req.met ? 'opacity-100' : 'opacity-30'}`} />
                                            {req.label}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="confirmPassword" className="text-sm font-medium">
                                Confirm Password
                            </label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                disabled={isSubmitting}
                                className="h-12"
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-12 text-base font-semibold"
                            disabled={isSubmitting || isLoading}
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Creating account...
                                </>
                            ) : (
                                "Create Account"
                            )}
                        </Button>
                    </form>

                    <div className="mt-6 text-center text-sm">
                        <span className="text-muted-foreground">Already have an account? </span>
                        <Link
                            href={`/login${redirect ? `?redirect=${encodeURIComponent(redirect)}` : ""}`}
                            className="text-primary font-semibold hover:underline"
                        >
                            Sign In
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
