"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { User } from "lucide-react";

interface InstructorFormProps {
    instructor: {
        name: string;
        role: string;
        image: string;
        bio: string;
    };
    onChange: (field: string, value: string) => void;
}

export function InstructorForm({ instructor, onChange }: InstructorFormProps) {
    return (
        <Card className="border-border/50">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-cyan-500" />
                    Instructor Information
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="instructorName">Instructor Name *</Label>
                        <Input
                            id="instructorName"
                            placeholder="e.g., Dr. John Doe"
                            value={instructor.name}
                            onChange={(e) => onChange("name", e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="instructorRole">Role / Title *</Label>
                        <Input
                            id="instructorRole"
                            placeholder="e.g., Senior ML Engineer"
                            value={instructor.role}
                            onChange={(e) => onChange("role", e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="instructorBio">Bio</Label>
                    <Textarea
                        id="instructorBio"
                        placeholder="Brief about the instructor..."
                        value={instructor.bio}
                        onChange={(e) => onChange("bio", e.target.value)}
                        rows={2}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="instructorImage">Instructor Image URL</Label>
                    <Input
                        id="instructorImage"
                        placeholder="e.g., /instructors/john.jpg"
                        value={instructor.image}
                        onChange={(e) => onChange("image", e.target.value)}
                    />
                </div>
            </CardContent>
        </Card>
    );
}
