import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    ArrowLeft,
    Calendar,
    Clock,
    ArrowRight
} from "lucide-react";
import { blogs } from "@/lib/data";
import type { Metadata } from "next";
import { BlogInteractions } from "@/components/blog/blog-interactions";

type Props = {
    params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const blog = blogs.find(b => b.id === id);

    return {
        title: blog ? `${blog.title} - DSWithShikhar Blog` : "Article Not Found",
        description: blog?.excerpt || "Article not found",
    };
}

export async function generateStaticParams() {
    return blogs.map((blog) => ({
        id: blog.id,
    }));
}

export default async function BlogDetailPage({ params }: Props) {
    const { id } = await params;
    const blog = blogs.find(b => b.id === id);

    if (!blog) {
        notFound();
    }

    const relatedBlogs = blogs.filter(b => b.id !== blog.id && b.category === blog.category).slice(0, 3);

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-b from-primary/5 to-background py-12">
                <div className="container mx-auto px-4">
                    <Button variant="ghost" size="sm" className="mb-6" asChild>
                        <Link href="/blog">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Blog
                        </Link>
                    </Button>

                    <div className="mx-auto max-w-3xl">
                        <Badge variant="outline" className="mb-4">
                            {blog.category}
                        </Badge>
                        <h1 className="text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
                            {blog.title}
                        </h1>
                        <p className="mt-6 text-lg text-muted-foreground">
                            {blog.excerpt}
                        </p>

                        <div className="mt-10 flex items-center justify-between border-y border-border/50 py-6">
                            <div className="flex items-center gap-3">
                                <Avatar className="h-10 w-10 border border-border">
                                    <AvatarFallback className="bg-primary text-primary-foreground text-xs font-bold">
                                        CH
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col">
                                    <span className="text-xs font-bold tracking-wider uppercase">DSWithShikhar Team</span>
                                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest mt-0.5">Feb 07, 2026</span>
                                </div>
                            </div>
                            <BlogInteractions />
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Image */}
            <section className="pb-8">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-3xl">
                        <div className="relative aspect-video overflow-hidden rounded-xl border border-border/50">
                            <Image
                                src={blog.image}
                                alt={blog.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Article Content */}
            <section className="pb-16">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-3xl">
                        {/* Main Content */}
                        <article className="prose prose-lg dark:prose-invert max-w-none">
                            <div
                                className="
                  [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:mt-8 [&>h2]:mb-4
                  [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:mt-6 [&>h3]:mb-3
                  [&>p]:text-muted-foreground [&>p]:leading-relaxed [&>p]:mb-4
                  [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-4 [&>ul]:space-y-2
                  [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-4 [&>ol]:space-y-2
                  [&>li]:text-muted-foreground
                  [&>blockquote]:border-l-4 [&>blockquote]:border-primary [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-muted-foreground
                  [&>table]:w-full [&>table]:border-collapse [&>table]:my-6
                  [&>table_th]:border [&>table_th]:border-border [&>table_th]:p-3 [&>table_th]:bg-muted [&>table_th]:text-left
                  [&>table_td]:border [&>table_td]:border-border [&>table_td]:p-3
                  [&>strong]:font-semibold [&>strong]:text-foreground
                "
                                dangerouslySetInnerHTML={{ __html: blog.content.replace(/\n/g, '<br/>').replace(/## /g, '<h2>').replace(/### /g, '<h3>').replace(/<h2>/g, '</p><h2>').replace(/<h3>/g, '</p><h3>').replace(/<h2>/g, '</h2><p>').replace(/<h3>/g, '</h3><p>') }}
                            />
                        </article>

                        <Separator className="my-12" />
                    </div>
                </div>
            </section >

            <Separator />

            {/* Related Articles */}
            {
                relatedBlogs.length > 0 && (
                    <section className="py-16">
                        <div className="container mx-auto px-4">
                            <h2 className="text-2xl font-bold">Related Articles</h2>
                            <div className="mt-8 grid gap-6 md:grid-cols-3">
                                {relatedBlogs.map((relatedBlog) => (
                                    <Card key={relatedBlog.id} className="group overflow-hidden p-0 gap-0">
                                        <div className="relative aspect-video overflow-hidden">
                                            <Image
                                                src={relatedBlog.image}
                                                alt={relatedBlog.title}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        </div>
                                        <CardHeader className="pt-6 pb-6">
                                            <Badge variant="outline" className="w-fit mb-2">{relatedBlog.category}</Badge>
                                            <CardTitle className="line-clamp-2 text-lg group-hover:text-primary transition-colors">
                                                <Link href={`/blog/${relatedBlog.id}`}>{relatedBlog.title}</Link>
                                            </CardTitle>
                                            <CardDescription className="line-clamp-2 mt-2">
                                                {relatedBlog.excerpt}
                                            </CardDescription>
                                        </CardHeader>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </section>
                )
            }
        </div >
    );
}
