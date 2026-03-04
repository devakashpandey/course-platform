"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
    Bookmark,
    Facebook,
    Twitter,
    Linkedin,
    Link as LinkIcon,
    Check
} from "lucide-react";

export function BlogInteractions() {
    const [saved, setSaved] = useState(false);
    const [copied, setCopied] = useState(false);
    const [showShare, setShowShare] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowShare(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleCopy = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

    return (
        <div className="flex items-center gap-2 relative" ref={dropdownRef}>
            <Button
                variant="outline"
                className="rounded-full px-6 text-muted-foreground hover:text-foreground font-medium"
                onClick={() => setShowShare(!showShare)}
            >
                Share
            </Button>

            {showShare && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-background border border-border rounded-xl shadow-lg z-50 overflow-hidden py-1 border-border/50">
                    <button
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted text-sm transition-colors"
                        onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank')}
                    >
                        <Facebook className="h-4 w-4 text-[#1877F2]" />
                        <span>Share on Facebook</span>
                    </button>
                    <button
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted text-sm transition-colors"
                        onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`, '_blank')}
                    >
                        <Twitter className="h-4 w-4 text-[#1DA1F2]" />
                        <span>Share on Twitter</span>
                    </button>
                    <button
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted text-sm transition-colors"
                        onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank')}
                    >
                        <Linkedin className="h-4 w-4 text-[#0A66C2]" />
                        <span>Share on LinkedIn</span>
                    </button>
                    <button
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted text-sm transition-colors border-t border-border/50 mt-1"
                        onClick={handleCopy}
                    >
                        {copied ? <Check className="h-4 w-4 text-green-600" /> : <LinkIcon className="h-4 w-4 text-muted-foreground" />}
                        <span>{copied ? "Copied!" : "Copy Link"}</span>
                    </button>
                </div>
            )}

            <Button
                variant="outline"
                size="icon"
                className="rounded-full h-10 w-10 transition-colors"
                onClick={() => setSaved(!saved)}
                title={saved ? "Remove from bookmarks" : "Save article"}
            >
                <Bookmark className={`h-4 w-4 ${saved ? "fill-primary text-primary" : "text-muted-foreground"}`} />
            </Button>
        </div>
    );
}
