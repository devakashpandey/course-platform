"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Quote } from "lucide-react";
import { testimonials } from "@/lib/data";
import { motion } from "framer-motion";

export function Testimonials() {
    // Duplicate testimonials for seamless looping
    const duplicatedTestimonials = [...testimonials, ...testimonials];

    return (
        <section className="py-20 overflow-hidden">
            <div className="container mx-auto px-4 mb-12">
                {/* Section Header */}
                <div className="text-center">
                    <Badge variant="outline" className="mb-4">
                        Testimonials
                    </Badge>
                    <h2 className="text-3xl font-bold md:text-4xl">
                        Why Students Love DSWithShikhar
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                        Hear from our community of learners who have transformed their careers
                        through our programs.
                    </p>
                </div>
            </div>

            {/* Infinite Marquee Container */}
            <div className="relative flex w-full">
                <motion.div
                    className="flex gap-4 md:gap-6 whitespace-nowrap py-4"
                    animate={{
                        x: ["0%", "-50%"],
                    }}
                    transition={{
                        duration: 25, // Slightly faster for better feel
                        ease: "linear",
                        repeat: Infinity,
                    }}
                    whileHover={{ animationPlayState: "paused" }}
                >
                    {duplicatedTestimonials.map((testimonial, index) => (
                        <Card
                            key={`${testimonial.name}-${index}`}
                            className="relative flex-shrink-0 w-[280px] md:w-[350px] aspect-[4/5] md:aspect-square overflow-hidden border-border/50 hover:border-primary/50 transition-colors shadow-sm"
                        >
                            <CardContent className="h-full flex flex-col justify-between p-6 md:p-8">
                                <div>
                                    <Quote className="h-8 w-8 md:h-10 md:w-10 text-primary/10 mb-4" strokeWidth={3} />
                                    <p className="text-sm md:text-base text-muted-foreground italic whitespace-normal leading-relaxed line-clamp-[6] md:line-clamp-6">
                                        {testimonial.content}
                                    </p>
                                </div>

                                <div className="flex items-center gap-4 border-t pt-4 md:pt-6 mt-4">
                                    <Avatar className="h-10 w-10 md:h-12 md:w-12 border-2 border-primary/10">
                                        <AvatarFallback className="bg-gradient-to-br from-primary/80 to-accent text-white font-bold text-xs md:text-sm">
                                            {testimonial.name.split(' ').map(n => n[0]).join('')}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="whitespace-normal min-w-0">
                                        <div className="font-bold text-sm md:text-base truncate">{testimonial.name}</div>
                                        <div className="text-[10px] md:text-xs text-muted-foreground font-medium uppercase tracking-wider truncate">
                                            {testimonial.role}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </motion.div>

                {/* Gradient Overlays for smooth edges */}
                <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-10" />
                <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-10" />
            </div>
        </section>
    );
}
