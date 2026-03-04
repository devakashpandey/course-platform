import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Target, Heart, Users } from "lucide-react";
import type { Metadata } from "next";
import { AnimatedSection } from "@/components/ui/animated-section";
import { HomeBanner } from "@/components/sections/home-banner";

export const metadata: Metadata = {
    title: "About Us - DSWithShikhar",
    description: "Learn about our mission to democratize AI education and meet the team behind DSWithShikhar.",
};

export default function AboutPage() {
    const missions = [
        {
            number: "1",
            title: "Help You Combat Your Fears Due to AI!",
            description: "No matter the industry you're a part of, a wave of change driven by Machine Learning is either already underway, or is inevitable. We're on a mission to empower professionals upskill and combat their fears due to AI!",
            icon: Target,
        },
        {
            number: "2",
            title: "Grow Your Careers Using AI as a Launchpad!",
            description: "A rare combination of highly gamified AI upskilling programs along with career coaching to help you navigate these uncertain times with confidence, and spurt the next wave of growth in your careers!",
            icon: ArrowRight,
        },
        {
            number: "3",
            title: "Give You a Supportive Community",
            description: "Whether you're a university student or an experienced individual, you need a community to support you. This is where we come in - give you the required support with access to other learners and our world-wide AI community.",
            icon: Heart,
        },
    ];

    const stats = [
        { value: "10,000+", label: "Students Taught" },
        { value: "50+", label: "Countries" },
        { value: "95%", label: "Success Rate" },
        { value: "200+", label: "Industry Partners" },
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <AnimatedSection>
                <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background py-16 md:py-20">
                    {/* Background Decorative Elements */}
                    <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
                    <div className="absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />

                    <div className="container relative mx-auto px-4">
                        <div className="mx-auto max-w-4xl text-center">
                            <Badge variant="outline" className="mb-6 rounded-full px-4 py-1 text-sm font-medium tracking-wide uppercase border-primary/20 bg-primary/5 text-primary">
                                Our Mission
                            </Badge>
                            <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
                                Engineering the <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">AI Revolution</span>
                            </h1>
                            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                                We are democratizing high-end AI education through gamified learning,
                                hands-on research, and a community-driven approach that prepares you for
                                the future of work.
                            </p>
                        </div>
                    </div>
                </section>
            </AnimatedSection>


            {/* Our Story Section - Like Reference */}
            <AnimatedSection>
                <section className="py-12 bg-muted/30">
                    <div className="container mx-auto px-4">
                        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
                            <div>
                                <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-6">Our Story</h2>
                                <h3 className="text-xl font-semibold mb-4">Empowering Futures in the AI Era</h3>

                                <div className="space-y-4 text-muted-foreground leading-relaxed">
                                    <p>
                                        Hello, I'm Kumar Shikhar, the <strong className="text-foreground">founder</strong> of DSWithShikhar. My journey
                                        through multiple <strong className="text-foreground">Silicon Valley startups</strong> and as an <strong className="text-foreground">AI researcher</strong> at
                                        Stanford's Geometric Processing Lab ignited a passion to bridge the gap in skilled practitioners
                                        in the AI/ML space.
                                    </p>
                                    <p>
                                        Fueled by experiences in Applied ML, startup growth, and 3D
                                        Computer Vision, I founded <strong className="text-foreground">DSWithShikhar</strong> with a purpose – <strong className="text-foreground">to empower professionals in an
                                            era of AI-driven change.</strong>
                                    </p>
                                    <p>
                                        At DSWithShikhar, we're on a mission to <strong className="text-foreground">revolutionize</strong> Machine Learning
                                        education. Our <strong className="text-foreground">gamified hands-on</strong> products not only facilitate <strong className="text-foreground">skill
                                            development</strong> but also provide a <strong className="text-foreground">comprehensive career
                                                development</strong> experience. Through <strong className="text-foreground">strategic partnerships with
                                                    Habit Coaches and ex-CEOs</strong>, we guide individuals towards holistic
                                        success.
                                    </p>

                                </div>
                            </div>
                            <div className="relative">
                                <div className="aspect-[3/4] w-full max-w-md mx-auto rounded-2xl overflow-hidden shadow-lg">
                                    <Image
                                        src="/homepage_hero_1770439506444.png"
                                        alt="Kumar Shikhar - Founder"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </AnimatedSection>

            {/* Stats Section */}
            <section className="bg-primary/5 border-y border-primary/10 py-16 relative overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                        {stats.map((stat) => (
                            <div key={stat.label} className="text-center group">
                                <div className="text-3xl font-bold tracking-tighter md:text-5xl text-primary transition-transform group-hover:scale-105">
                                    {stat.value}
                                </div>
                                <div className="mt-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <AnimatedSection>
                <section className="py-16 bg-gradient-to-b from-background to-primary/5">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <Badge variant="outline" className="mb-4">The Pillars</Badge>
                            <h2 className="text-2xl font-bold md:text-4xl tracking-tight">Our Core Philosophy</h2>
                            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                                We believe education should be as engaging as the technology it teaches.
                                Here is what drives every decision we make.
                            </p>
                        </div>

                        <div className="grid gap-6 md:grid-cols-3">
                            {missions.map((mission) => (
                                <Card key={mission.number} className="group relative overflow-hidden border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                                    <div className="absolute -right-4 -top-4 text-8xl font-black text-primary/5 group-hover:text-primary/10 transition-colors">
                                        {mission.number}
                                    </div>
                                    <CardHeader className="relative z-10">
                                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                            <mission.icon className="h-6 w-6" />
                                        </div>
                                        <h3 className="text-xl font-bold tracking-tight">{mission.title}</h3>
                                    </CardHeader>
                                    <CardContent className="relative z-10 pt-0">
                                        <p className="text-muted-foreground leading-relaxed">{mission.description}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
            </AnimatedSection>

            {/* Home Banner */}
            <HomeBanner />
        </div>
    );
}
