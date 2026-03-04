"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Bookmark, ArrowRight } from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";

export default function SavedPage() {
    return (
        <div className="max-w-6xl mx-auto space-y-8 pb-12">
            {/* Header */}
            <AnimatedSection>
                <div>
                    <h1 className="text-2xl font-bold">Saved Courses</h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        Courses you've bookmarked for later
                    </p>
                </div>
            </AnimatedSection>

            {/* Empty State */}
            <AnimatedSection delay={0.1}>
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 mb-6">
                        <Bookmark className="h-10 w-10 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">No Saved Courses</h2>
                    <p className="text-muted-foreground max-w-md mb-8">
                        You haven&apos;t saved any courses yet. Browse our catalog and save courses you&apos;re interested in for later!
                    </p>
                    <Button size="lg" asChild className="rounded-xl px-8">
                        <Link href="/courses" className="gap-2">
                            Browse Courses
                            <ArrowRight className="h-5 w-5" />
                        </Link>
                    </Button>
                </div>
            </AnimatedSection>
        </div>
    );
}
