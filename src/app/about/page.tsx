
'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, BookOpen, BrainCircuit, Target } from "lucide-react";
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
                        <div className="p-4 bg-primary/10 rounded-full">
                            <Logo />
                        </div>
                        <CardTitle className="text-3xl">About Power Brain</CardTitle>
                        <CardDescription>
                            Empowering every learner to dream, learn, and achieve without limits.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 text-muted-foreground text-center">
                        <p>
                            <strong>Power Brain is a digital learning movement for Malawi,</strong> designed to provide accessible, high-quality education to students everywhere. Our platform combines AI-powered tools with curriculum-aligned content to create a personalized and engaging learning experience.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 text-left">
                            <div className="flex flex-col items-center text-center p-4 rounded-lg bg-muted/50">
                                <Target className="h-8 w-8 text-primary mb-2" />
                                <h3 className="font-semibold text-foreground mb-1">Our Mission</h3>
                                <p className="text-sm">To break down barriers to education and empower the next generation of leaders, thinkers, and innovators in Malawi and beyond.</p>
                            </div>
                             <div className="flex flex-col items-center text-center p-4 rounded-lg bg-muted/50">
                                <BrainCircuit className="h-8 w-8 text-primary mb-2" />
                                <h3 className="font-semibold text-foreground mb-1">Our Vision</h3>
                                <p className="text-sm">A future where every Malawian student has the tools and confidence to reach their full academic and professional potential.</p>
                            </div>
                             <div className="flex flex-col items-center text-center p-4 rounded-lg bg-muted/50">
                                <BookOpen className="h-8 w-8 text-primary mb-2" />
                                <h3 className="font-semibold text-foreground mb-1">Our Approach</h3>
                                <p className="text-sm">We leverage technology to create a personalized learning journey, with AI tutors, adaptive quizzes, and a rich library of resources.</p>
                            </div>
                        </div>
                         <p className="pt-4">
                            Founded by a Malawian developer with a passion for education, Power Brain is more than just an app—it's a community dedicated to building a brighter future for Malawi through the power of learning.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
