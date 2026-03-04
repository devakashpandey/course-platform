import { Badge } from "@/components/ui/badge";
import { GraduationCap, Gamepad2, Users, HeartHandshake } from "lucide-react";
import { features } from "@/lib/data";

const iconMap: Record<string, any> = {
    GraduationCap,
    Gamepad2,
    Users,
    HeartHandshake
};

export function WhyUs() {
    return (
        <section className="bg-muted/10 py-24 border-t border-b overflow-hidden relative">
            <div className="absolute left-0 top-0 -z-10 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />

            <div className="container mx-auto px-4">
                <div className="text-center mb-20">
                    <Badge variant="outline" className="mb-4">
                        Success Metrics
                    </Badge>
                    <h2 className="text-4xl font-extrabold md:text-5xl">Why Learn With us?</h2>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                        Exceptional curriculum, outstanding teaching, and a supportive learning
                        environment that sets us apart from the rest!
                    </p>
                </div>

                <div className="relative mt-12 grid gap-y-12 md:gap-y-16 lg:grid-cols-2">
                    {/* Vertical Divider */}
                    <div className="absolute left-1/2 top-0 hidden h-full w-[1px] bg-border lg:block" />

                    {features.map((feature, index) => {
                        const Icon = iconMap[feature.icon] || GraduationCap;
                        return (
                            <div key={feature.title} className={`flex flex-col md:flex-row items-start gap-6 md:gap-8 px-4 md:px-12 ${index % 2 === 0 ? 'lg:pr-20' : 'lg:pl-20'}`}>
                                <div className="flex h-16 w-16 md:h-20 md:w-20 shrink-0 items-center justify-center rounded-2xl bg-background shadow-xl ring-1 ring-border transition-all hover:scale-110 hover:shadow-primary/10">
                                    <Icon className="h-8 w-8 md:h-10 md:w-10 text-primary" strokeWidth={2.5} />
                                </div>
                                <div className="space-y-2 md:space-y-4">
                                    <h3 className="text-xl md:text-2xl font-bold tracking-tight">{feature.title}</h3>
                                    <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
