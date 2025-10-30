
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-background p-4">
            <Card className="max-w-2xl w-full">
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
                <CardContent>
                     <Button variant="outline" asChild className="w-full">
                        <Link href="/dashboard">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Dashboard
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}
