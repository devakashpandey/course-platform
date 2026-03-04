import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles } from "lucide-react";

export function Hero() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background">
            {/* Background decorations */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
                <div className="absolute right-1/4 top-1/2 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
            </div>

            <div className="container mx-auto px-4 pt-10 pb-20 md:pt-16 md:pb-32">
                <div className="mx-auto max-w-4xl text-center">
                    {/* Badge */}
                    <Badge variant="secondary" className="mb-6 gap-2 px-4 py-2">
                        <Sparkles className="h-4 w-4" />
                        New: Generative AI Masterclass Launched!
                    </Badge>

                    {/* Heading */}
                    <h1 className="text-3xl font-extrabold tracking-tight md:text-5xl lg:text-7xl leading-[1.1] md:leading-[1.2]">
                        Elevate Your Future!<br />
                        <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                            AI Taught by Researchers
                        </span>
                    </h1>

                    {/* Subheading */}
                    <p className="mx-auto mt-6 max-w-2xl text-base md:text-xl text-muted-foreground leading-relaxed">
                        Learn Machine Learning from the pros: Ivy League alumni, high-functioning startups,
                        and big tech giants – your ultimate mentors for mastering AI!
                    </p>

                    {/* CTA Buttons */}
                    <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <Button size="lg" className="gap-2 px-8 h-12" asChild>
                            <Link href="/courses">
                                Explore Courses
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" className="px-8 h-12" asChild>
                            <Link href="/about">
                                About Us
                            </Link>
                        </Button>
                    </div>

                    {/* Stats */}
                    <div className="mt-16 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4">
                        {[
                            { value: "10K+", label: "Students" },
                            { value: "50+", label: "Courses" },
                            { value: "95%", label: "Success Rate" },
                            { value: "4.9", label: "Rating" },
                        ].map((stat) => (
                            <div key={stat.label} className="text-center group">
                                <div className="text-2xl font-black text-primary md:text-4xl group-hover:scale-110 transition-all duration-300">
                                    {stat.value}
                                </div>
                                <div className="mt-1 text-[10px] md:text-sm font-bold uppercase tracking-wider text-muted-foreground">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
