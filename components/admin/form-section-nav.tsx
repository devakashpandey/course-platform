"use client";

import { useEffect, useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon, ListTodo } from "lucide-react";

export interface FormSection {
    id: string;
    label: string;
    icon?: LucideIcon;
}

interface FormSectionNavProps {
    sections: FormSection[];
    activeSection?: string;
    variant?: "default" | "admin";
}

export function FormSectionNav({ sections, activeSection, variant = "default" }: FormSectionNavProps) {
    const [active, setActive] = useState(activeSection || sections[0]?.id);
    const isManualScrolling = useRef(false);

    const isAdmin = variant === "admin";
    const accentColor = isAdmin ? "bg-orange-500" : "bg-primary";
    const textColor = isAdmin ? "text-orange-500" : "text-primary";
    const hoverBg = isAdmin ? "hover:bg-orange-500/10" : "hover:bg-primary/10";

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-150px 0px -70% 0px', // Detects when section enters top part of screen
            threshold: 0
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            if (isManualScrolling.current) return;

            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActive(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        sections.forEach((section) => {
            const element = document.getElementById(section.id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, [sections]);

    const scrollToSection = (sectionId: string) => {
        isManualScrolling.current = true;
        setActive(sectionId);

        const element = document.getElementById(sectionId);
        if (element) {
            const offset = 120;
            const elementPosition = element.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
                top: elementPosition - offset,
                behavior: 'smooth'
            });
        }

        // Timeout to allow smooth scroll to finish before re-enabling observer feedback
        setTimeout(() => {
            isManualScrolling.current = false;
        }, 800);
    };

    return (
        <div className="w-44 flex-shrink-0 hidden lg:block">
            <div className="sticky top-32">
                <Card className="border-border/50 shadow-sm">
                    <CardContent className="p-2">
                        <div className="flex items-center gap-2 text-muted-foreground px-2 py-1.5 mb-1">
                            <ListTodo className="h-3.5 w-3.5" />
                            <span className="text-xs font-semibold uppercase tracking-wide">Sections</span>
                        </div>
                        <div className="space-y-0.5">
                            {sections.map((section) => {
                                const isActive = active === section.id;
                                const Icon = section.icon;

                                return (
                                    <button
                                        key={section.id}
                                        onClick={() => scrollToSection(section.id)}
                                        className={cn(
                                            "w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-xs font-medium transition-all text-left",
                                            isActive
                                                ? cn("bg-muted", textColor)
                                                : cn("text-muted-foreground hover:text-foreground", hoverBg)
                                        )}
                                    >
                                        {isActive && (
                                            <div className={cn("w-0.5 h-4 rounded-full flex-shrink-0", accentColor)} />
                                        )}
                                        {Icon && <Icon className={cn("h-3.5 w-3.5 flex-shrink-0", !isActive && "ml-3.5")} />}
                                        <span className="truncate">{section.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
