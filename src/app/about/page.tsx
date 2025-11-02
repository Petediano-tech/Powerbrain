
'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AboutPage() {
    const router = useRouter();

    return (
        <div>
            <div className="p-4 flex items-center gap-4 sticky top-0 bg-background/80 backdrop-blur-sm z-10 border-b">
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <ArrowLeft />
                </Button>
                <h1 className="text-xl font-bold">About Power Brain</h1>
            </div>
            <div className="p-4 max-w-3xl mx-auto">
                <Card>
                    <CardHeader className="text-center items-center gap-4">
                        <Logo />
                        <CardTitle className="text-3xl">About Power Brain</CardTitle>
                        <CardDescription>
                            Empowering every learner to dream, learn, and achieve without limits.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 text-muted-foreground text-center">
                    <p>
                            Power Brain is a digital learning movement for Malawi, designed to provide accessible, high-quality education to students everywhere. Our platform combines AI-powered tools with curriculum-aligned content to create a personalized and engaging learning experience.
                    </p>
                    <p>
                            Our mission is to break down barriers to education and empower the next generation of leaders, thinkers, and innovators in Malawi and beyond.
                    </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
