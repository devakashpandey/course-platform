import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { GraduationCap, Mail, MapPin, Phone, Facebook, Twitter, Linkedin, Instagram, Youtube } from "lucide-react";

const navigation = {
    courses: [
        { name: "Beginner Courses", href: "/courses?level=beginner" },
        { name: "Intermediate Courses", href: "/courses?level=intermediate" },
        { name: "Advanced Courses", href: "/courses?level=advanced" },
        { name: "All Courses", href: "/courses" },
    ],
    company: [
        { name: "About Us", href: "/about" },
        { name: "Blog", href: "/blog" },
        { name: "Careers", href: "/careers" },
        { name: "Contact", href: "/contact" },
    ],
    support: [
        { name: "Help Center", href: "/help" },
        { name: "FAQs", href: "/contact#faq" },
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
    ],
    social: [
        { name: "Facebook", href: "https://facebook.com", icon: Facebook },
        { name: "Twitter", href: "https://twitter.com", icon: Twitter },
        { name: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
        { name: "Instagram", href: "https://instagram.com", icon: Instagram },
        { name: "YouTube", href: "https://youtube.com", icon: Youtube },
    ],
};

export function Footer() {
    return (
        <footer className="bg-black text-white rounded-t-[50px] mt-20">


            {/* Main Footer */}
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                                <GraduationCap className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-xl font-bold">DSWithShikhar</span>
                        </Link>
                        <p className="mt-4 max-w-sm text-gray-400">
                            Empowering professionals to upskill in AI/ML through highly gamified experiential learning programs.
                        </p>
                        <div className="mt-6 space-y-3">
                            <div className="flex items-center gap-3 text-sm text-gray-400">
                                <Mail className="h-4 w-4" />
                                <span>contact@dswithshikhar.com</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-400">
                                <Phone className="h-4 w-4" />
                                <span>+91 98765 43210</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-400">
                                <MapPin className="h-4 w-4" />
                                <span>Bangalore, India</span>
                            </div>
                        </div>
                    </div>

                    {/* Courses */}
                    <div>
                        <h4 className="font-semibold text-lg">Courses</h4>
                        <ul className="mt-4 space-y-3">
                            {navigation.courses.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="text-sm text-gray-400 transition-colors hover:text-white"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="font-semibold text-lg">Company</h4>
                        <ul className="mt-4 space-y-3">
                            {navigation.company.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="text-sm text-gray-400 transition-colors hover:text-white"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="font-semibold text-lg">Support</h4>
                        <ul className="mt-4 space-y-3">
                            {navigation.support.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="text-sm text-gray-400 transition-colors hover:text-white"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <Separator className="my-8 bg-white/10" />

                {/* Bottom Footer */}
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                    <p className="text-sm text-gray-400">
                        © {new Date().getFullYear()} DSWithShikhar. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4">
                        {navigation.social.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 transition-colors hover:text-white"
                            >
                                <item.icon className="h-5 w-5" />
                                <span className="sr-only">{item.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
