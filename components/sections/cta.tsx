import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function CTA() {
    return (
        <section className="relative overflow-hidden py-20">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnYyaDR2MmgtNHYyaC0ydi0yem0wLTMwaDJ2NGgtMnYyaC00di0yaC0ydi0yaDJWMmgydjJ6TTYgMzRINHYtNGgydjJoNHYySDZ2Mmgtdi0yem0wLTMwaDJ2NGgtMnYySDR2LTJINHYtMmgtMlYyaDJ2MnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20" />

            <div className="container relative mx-auto px-4">
                <div className="mx-auto max-w-3xl text-center">
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-white">
                        <Sparkles className="h-4 w-4" />
                        <span className="text-sm font-medium">Start your AI journey today</span>
                    </div>

                    <h2 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                        Ready to Transform Your Career?
                    </h2>

                    <p className="mx-auto mt-6 max-w-xl text-lg text-white/80">
                        Whether you want to build a career in ML, or navigate its impact in your
                        industry, we are here for you!
                    </p>

                    <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <Button size="lg" variant="secondary" className="gap-2 px-8" asChild>
                            <Link href="/courses">
                                Explore Courses
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" className="gap-2 border-white/20 bg-white/10 px-8 text-white hover:bg-white/20" asChild>
                            <Link href="/contact">
                                Contact Us
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
