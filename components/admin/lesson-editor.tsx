"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Video } from "lucide-react";
import type { Lesson } from "@/lib/types/admin";

interface LessonEditorProps {
    lessons: Lesson[];
    onAdd: () => void;
    onUpdate: (index: number, field: keyof Lesson, value: string | number) => void;
    onRemove: (index: number) => void;
}

export function LessonEditor({
    lessons,
    onAdd,
    onUpdate,
    onRemove,
}: LessonEditorProps) {
    return (
        <Card className="border-border/50">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Video className="h-5 w-5 text-red-500" />
                    Course Lessons
                </CardTitle>
                <CardDescription>Individual video lessons for the course</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {lessons.map((lesson, index) => (
                    <div key={lesson.id} className="p-4 border rounded-xl bg-muted/30 space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="font-bold text-sm">Lesson {index + 1}</span>
                            {lessons.length > 1 && (
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => onRemove(index)}
                                    className="text-destructive hover:text-destructive"
                                >
                                    <Trash2 className="h-4 w-4 mr-1" />
                                    Remove
                                </Button>
                            )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="space-y-2">
                                <Label>Lesson Title *</Label>
                                <Input
                                    placeholder="e.g., Introduction to Python"
                                    value={lesson.title || ""}
                                    onChange={(e) => onUpdate(index, 'title', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Duration *</Label>
                                <Input
                                    placeholder="e.g., 30 min"
                                    value={lesson.duration || ""}
                                    onChange={(e) => onUpdate(index, 'duration', e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Description</Label>
                            <Textarea
                                placeholder="What will be covered in this lesson..."
                                value={lesson.description || ""}
                                onChange={(e) => onUpdate(index, 'description', e.target.value)}
                                rows={2}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Video URL (YouTube Embed)</Label>
                            <Input
                                placeholder="e.g., https://www.youtube.com/embed/xxxxx"
                                value={lesson.videoUrl || ""}
                                onChange={(e) => onUpdate(index, 'videoUrl', e.target.value)}
                            />
                            <p className="text-xs text-muted-foreground">Use YouTube embed URL format</p>
                        </div>
                    </div>
                ))}
                <Button type="button" variant="outline" onClick={onAdd}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Lesson
                </Button>
            </CardContent>
        </Card>
    );
}
