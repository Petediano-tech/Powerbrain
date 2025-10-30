
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-background p-4">
            <Card className="max-w-3xl w-full">
                <CardHeader>
                    <CardTitle className="text-3xl">Privacy Policy</CardTitle>
                    <CardDescription>
                        Last Updated: {new Date().toLocaleDateString()}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground prose prose-sm dark:prose-invert max-h-[50vh] overflow-y-auto">
                    <p>Your privacy is important to us. It is Power Brain's policy to respect your privacy regarding any information we may collect from you across our application.</p>

                    <h3 className="text-foreground font-semibold">1. Information We Collect</h3>
                    <p>We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We collect your name, email address, and learning progress data.</p>

                    <h3 className="text-foreground font-semibold">2. How We Use Your Information</h3>
                    <p>We use the information we collect to operate and maintain our app, to provide you with the features and functionality of the service, to personalize your experience, and to understand and analyze how you use our app.</p>

                    <h3 className="text-foreground font-semibold">3. Data Security</h3>
                    <p>We are committed to protecting your data. We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.</p>
                    
                    <h3 className="text-foreground font-semibold">4. Data Retention</h3>
                    <p>We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we’ll protect within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use or modification.</p>

                </CardContent>
                 <CardContent>
                     <Button variant="outline" asChild className="w-full">
                        <Link href="/settings">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Settings
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}
