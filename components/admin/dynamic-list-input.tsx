"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";

interface DynamicListInputProps {
    title: string;
    description?: string;
    icon?: React.ReactNode;
    items: string[];
    onAdd: () => void;
    onUpdate: (index: number, value: string) => void;
    onRemove: (index: number) => void;
    placeholder?: string;
    addButtonText?: string;
}

export function DynamicListInput({
    title,
    description,
    icon,
    items,
    onAdd,
    onUpdate,
    onRemove,
    placeholder = "Enter value",
    addButtonText = "Add Item",
}: DynamicListInputProps) {
    return (
        <Card className="border-border/50">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    {icon}
                    {title}
                </CardTitle>
                {description && <CardDescription>{description}</CardDescription>}
            </CardHeader>
            <CardContent className="space-y-3">
                {items.map((item, index) => (
                    <div key={index} className="flex gap-2">
                        <Input
                            placeholder={`${placeholder} ${index + 1}`}
                            value={item}
                            onChange={(e) => onUpdate(index, e.target.value)}
                        />
                        {items.length > 1 && (
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => onRemove(index)}
                                className="text-destructive hover:text-destructive"
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={onAdd}>
                    <Plus className="h-4 w-4 mr-2" />
                    {addButtonText}
                </Button>
            </CardContent>
        </Card>
    );
}

interface DynamicKeyValueListProps {
    title: string;
    description?: string;
    icon?: React.ReactNode;
    items: { title: string; duration: string }[];
    onAdd: () => void;
    onUpdate: (index: number, field: 'title' | 'duration', value: string) => void;
    onRemove: (index: number) => void;
    titlePlaceholder?: string;
    valuePlaceholder?: string;
    addButtonText?: string;
}

export function DynamicKeyValueList({
    title,
    description,
    icon,
    items,
    onAdd,
    onUpdate,
    onRemove,
    titlePlaceholder = "Title",
    valuePlaceholder = "Duration",
    addButtonText = "Add Item",
}: DynamicKeyValueListProps) {
    return (
        <Card className="border-border/50">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    {icon}
                    {title}
                </CardTitle>
                {description && <CardDescription>{description}</CardDescription>}
            </CardHeader>
            <CardContent className="space-y-3">
                {items.map((item, index) => (
                    <div key={index} className="flex gap-2">
                        <Input
                            placeholder={titlePlaceholder}
                            value={item.title}
                            onChange={(e) => onUpdate(index, 'title', e.target.value)}
                            className="flex-1"
                        />
                        <Input
                            placeholder={valuePlaceholder}
                            value={item.duration}
                            onChange={(e) => onUpdate(index, 'duration', e.target.value)}
                            className="w-40"
                        />
                        {items.length > 1 && (
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => onRemove(index)}
                                className="text-destructive hover:text-destructive"
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={onAdd}>
                    <Plus className="h-4 w-4 mr-2" />
                    {addButtonText}
                </Button>
            </CardContent>
        </Card>
    );
}
