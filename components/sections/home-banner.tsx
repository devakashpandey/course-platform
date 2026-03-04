import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function HomeBanner() {
    return (
        <section className="relative overflow-hidden bg-[#2d5cf7] py-16 md:py-24">
            {/* Background Orbs */}
            <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-20 right-0 h-96 w-96 rounded-full bg-black/10 blur-3xl" />

            <div className="container relative mx-auto px-4">
                <div className="grid items-center gap-12 lg:grid-cols-2">
                    <div className="text-white">
                        <h2 className="text-3xl font-extrabold leading-tight md:text-5xl lg:text-6xl">
                            Grow your career!<br />
                            Its high time you learn ML!
                        </h2>
                        <p className="mt-6 text-lg md:text-xl leading-relaxed text-white/90">
                            Whether you want to build a career in ML, or navigate its impact in your
                            industry, we are here for you!
                        </p>
                        <div className="mt-10">
                            <Button size="lg" variant="secondary" className="h-14 bg-white px-10 text-lg font-bold text-[#2d5cf7] hover:bg-white/90 uppercase tracking-wider" asChild>
                                <Link href="/courses">
                                    Our Courses
                                </Link>
                            </Button>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="relative mx-auto aspect-square w-full max-w-[500px] overflow-hidden rounded-3xl">
                            <Image
                                src="/mockups_cta.png"
                                alt="Learning Platform Mockups"
                                fill
                                className="object-contain"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
