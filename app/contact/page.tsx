import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
    Mail,
    Phone,
    MapPin,
    Send,
    MessageSquare,
    Facebook,
    Twitter,
    Linkedin,
    Instagram
} from "lucide-react";
import { faqs } from "@/lib/data";
import type { Metadata } from "next";
import { AnimatedSection } from "@/components/ui/animated-section";

export const metadata: Metadata = {
    title: "Contact Us - DSWithShikhar",
    description: "Get in touch with DSWithShikhar. We're here to help with any questions about our courses or programs.",
};

export default function ContactPage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <AnimatedSection>
                <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background py-20 px-4">
                    {/* Hero Background Elements */}
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

                    <div className="container mx-auto text-center relative z-10">
                        <Badge variant="outline" className="mb-6 px-4 py-1.5 rounded-full bg-primary/5 text-primary border-primary/20 font-medium">
                            Need Assistance?
                        </Badge>
                        <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                            Get in <span className="text-primary">Touch</span>
                        </h1>
                        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
                            Have questions about our AI courses or need career guidance?
                            Our team of experts is ready to help you level up.
                        </p>
                    </div>
                </section>
            </AnimatedSection>

            {/* Contact Section */}
            <section className="py-12 relative overflow-hidden">
                {/* Background Blobs */}
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

                <div className="container mx-auto px-4 relative">
                    <div className="grid gap-8 lg:grid-cols-5 items-start">
                        {/* Contact Info - Compact cards */}
                        <div className="lg:col-span-2 space-y-6">
                            <AnimatedSection>
                                <div>
                                    <h2 className="text-3xl font-bold tracking-tight">Let's Connect</h2>
                                    <p className="mt-3 text-muted-foreground leading-relaxed">
                                        We're here to help you navigate your journey. Reach out through any of these channels.
                                    </p>
                                </div>

                                <div className="mt-8 grid gap-4">
                                    {[
                                        { icon: Mail, label: "Email", value: "contact@dswithshikhar.com", href: "mailto:contact@dswithshikhar.com" },
                                        { icon: Phone, label: "Phone", value: "+91 98765 43210", href: "tel:+919876543210" },
                                        { icon: MapPin, label: "Address", value: "123 Tech Park, HSR Layout, Bangalore", href: null },
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-4 p-4 rounded-xl border bg-card/30 backdrop-blur-sm hover:border-primary/30 transition-all group">
                                            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors shrink-0">
                                                <item.icon className="h-5 w-5" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-0.5">{item.label}</div>
                                                {item.href ? (
                                                    <Link href={item.href} className="text-sm font-medium hover:text-primary transition-colors block truncate">
                                                        {item.value}
                                                    </Link>
                                                ) : (
                                                    <p className="text-sm font-medium">{item.value}</p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Social Links */}
                                <div className="mt-8 pt-8 border-t border-border/50">
                                    <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Follow Our Journey</h3>
                                    <div className="flex gap-3">
                                        {[
                                            { icon: Facebook, href: "https://facebook.com" },
                                            { icon: Twitter, href: "https://twitter.com" },
                                            { icon: Linkedin, href: "https://linkedin.com" },
                                            { icon: Instagram, href: "https://instagram.com" }
                                        ].map((social, i) => (
                                            <Button key={i} variant="outline" size="icon" className="rounded-full hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300" asChild>
                                                <Link href={social.href} target="_blank">
                                                    <social.icon className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                            </AnimatedSection>
                        </div>

                        {/* Contact Form - More compact and modern */}
                        <div className="lg:col-span-3">
                            <AnimatedSection>
                                <Card className="border-none shadow-2xl shadow-primary/5 bg-background/60 backdrop-blur-xl">
                                    <CardHeader className="pb-4">
                                        <CardTitle className="text-xl flex items-center gap-2">
                                            <div className="p-2 rounded-lg bg-primary/10">
                                                <MessageSquare className="h-5 w-5 text-primary" />
                                            </div>
                                            Send a Message
                                        </CardTitle>
                                        <CardDescription>
                                            We usually respond within 24 hours.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <form className="space-y-4">
                                            <div className="grid gap-4 md:grid-cols-2">
                                                <div className="space-y-1.5">
                                                    <label htmlFor="firstName" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                                        First Name
                                                    </label>
                                                    <Input id="firstName" placeholder="John" className="h-11 bg-muted/30 border-none focus-visible:ring-1 focus-visible:ring-primary/50" />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label htmlFor="lastName" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                                        Last Name
                                                    </label>
                                                    <Input id="lastName" placeholder="Doe" className="h-11 bg-muted/30 border-none focus-visible:ring-1 focus-visible:ring-primary/50" />
                                                </div>
                                            </div>

                                            <div className="space-y-1.5">
                                                <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                                    Email Address
                                                </label>
                                                <Input id="email" type="email" placeholder="john@example.com" className="h-11 bg-muted/30 border-none focus-visible:ring-1 focus-visible:ring-primary/50" />
                                            </div>

                                            <div className="grid gap-4 md:grid-cols-2">
                                                <div className="space-y-1.5">
                                                    <label htmlFor="phone" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                                        Phone (Optional)
                                                    </label>
                                                    <Input id="phone" type="tel" placeholder="+91 98765 43210" className="h-11 bg-muted/30 border-none focus-visible:ring-1 focus-visible:ring-primary/50" />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label htmlFor="subject" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                                        Subject
                                                    </label>
                                                    <Input id="subject" placeholder="General Inquiry" className="h-11 bg-muted/30 border-none focus-visible:ring-1 focus-visible:ring-primary/50" />
                                                </div>
                                            </div>

                                            <div className="space-y-1.5">
                                                <label htmlFor="message" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                                    Message
                                                </label>
                                                <Textarea
                                                    id="message"
                                                    placeholder="How can we help you today?"
                                                    className="min-h-[120px] bg-muted/30 border-none focus-visible:ring-1 focus-visible:ring-primary/50 resize-none"
                                                />
                                            </div>

                                            <Button type="submit" size="lg" className="w-full h-12 gap-2 text-base font-semibold transition-all hover:gap-3 hover:shadow-lg hover:shadow-primary/25">
                                                <Send className="h-4 w-4" />
                                                Send Message
                                            </Button>
                                        </form>
                                    </CardContent>
                                </Card>
                            </AnimatedSection>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <AnimatedSection>
                <section id="faq" className="bg-muted/30 py-20">
                    <div className="container mx-auto px-4">
                        <div className="text-center">
                            <Badge variant="outline" className="mb-4">FAQs</Badge>
                            <h2 className="text-3xl font-bold md:text-4xl">Frequently Asked Questions</h2>
                            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                                Find answers to common questions about our courses and programs.
                            </p>
                        </div>

                        <div className="mx-auto mt-12 max-w-4xl grid gap-4">
                            <Accordion type="single" collapsible className="w-full space-y-4">
                                {faqs.map((faq, index) => (
                                    <AccordionItem
                                        key={index}
                                        value={`item-${index}`}
                                        className="border rounded-xl px-6 bg-card/50 hover:bg-card transition-colors data-[state=open]:border-primary/50 data-[state=open]:shadow-sm"
                                    >
                                        <AccordionTrigger className="text-left py-4 hover:no-underline font-semibold text-foreground">
                                            {faq.question}
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground pb-4 leading-relaxed">
                                            {faq.answer}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>

                        {/* Still Have Questions */}
                        <div className="mt-12 text-center">
                            <p className="text-muted-foreground">
                                Still have questions?{" "}
                                <Link href="mailto:contact@dswithshikhar.com" className="font-medium text-primary hover:underline">
                                    Reach out to us
                                </Link>
                            </p>
                        </div>
                    </div>
                </section>
            </AnimatedSection>

        </div>
    );
}
