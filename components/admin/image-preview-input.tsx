"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Image as ImageIcon } from "lucide-react";

interface ImagePreviewInputProps {
    title?: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    required?: boolean;
}

export function ImagePreviewInput({
    title = "Image",
    value,
    onChange,
    placeholder = "e.g., /image.png or https://...",
    required = false,
}: ImagePreviewInputProps) {
    return (
        <Card className="border-border/50">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <ImageIcon className="h-5 w-5 text-purple-500" />
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    <Label htmlFor="image">Image URL {required && "*"}</Label>
                    <Input
                        id="image"
                        placeholder={placeholder}
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        required={required}
                    />
                    <p className="text-xs text-muted-foreground">Use a URL or path to image in /public folder</p>
                </div>
                {value && (
                    <div className="mt-4 aspect-video max-w-sm rounded-lg overflow-hidden border bg-muted">
                        <img
                            src={value}
                            alt="Preview"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                            }}
                        />
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
