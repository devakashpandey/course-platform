"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";
import { useCourse } from "@/contexts/course-context";
import { Loader2, Play } from "lucide-react";

interface EnrollButtonProps {
    courseId: string;
    price: string;
}

export function EnrollButton({ courseId, price }: EnrollButtonProps) {
    const router = useRouter();
    const { user } = useAuth();
    const { isEnrolled, enrollInCourse } = useCourse();
    const [isEnrolling, setIsEnrolling] = useState(false);

    const enrolled = isEnrolled(courseId);

    const handleEnroll = async () => {
        // If not logged in, redirect to login
        if (!user) {
            router.push(`/login?redirect=/courses/${courseId}`);
            return;
        }

        // If already enrolled, go to course player
        if (enrolled) {
            router.push(`/dashboard/courses/${courseId}`);
            return;
        }

        // Enroll in course
        setIsEnrolling(true);
        try {
            // Here you would integrate Razorpay for paid courses
            // For now, we simulate enrollment
            const success = await enrollInCourse(courseId);
            if (success) {
                router.push(`/dashboard/courses/${courseId}`);
            }
        } catch (error) {
            console.error("Enrollment error:", error);
        } finally {
            setIsEnrolling(false);
        }
    };

    if (enrolled) {
        return (
            <Button
                className="w-full h-14 text-lg font-bold uppercase tracking-wider transition-all hover:scale-[1.02] active:scale-[0.98] gap-2"
                size="lg"
                onClick={handleEnroll}
            >
                <Play className="h-5 w-5 fill-current" />
                Continue Learning
            </Button>
        );
    }

    return (
        <Button
            className="w-full h-14 text-lg font-bold uppercase tracking-wider transition-all hover:scale-[1.02] active:scale-[0.98]"
            size="lg"
            onClick={handleEnroll}
            disabled={isEnrolling}
        >
            {isEnrolling ? (
                <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    {price === "Free" ? "Enrolling..." : "Processing..."}
                </>
            ) : (
                price === "Free" ? "Enroll Now - Free" : "Enroll Now"
            )}
        </Button>
    );
}
