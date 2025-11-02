
'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function TermsPage() {
    const router = useRouter();

    return (
        <div>
            <div className="p-4 flex items-center gap-4 sticky top-0 bg-background/80 backdrop-blur-sm z-10 border-b">
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <ArrowLeft />
                </Button>
                <h1 className="text-xl font-bold">Terms of Service</h1>
            </div>
            <div className="p-4 max-w-3xl mx-auto">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-3xl">Terms of Service</CardTitle>
                        <CardDescription>
                            Last Updated: {new Date().toLocaleDateString()}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 text-muted-foreground prose prose-sm dark:prose-invert">
                        <p>Welcome to Power Brain! These terms and conditions outline the rules and regulations for the use of our application.</p>

                        <h3 className="text-foreground font-semibold">1. Acceptance of Terms</h3>
                        <p>By accessing and using our app, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.</p>

                        <h3 className="text-foreground font-semibold">2. User Accounts</h3>
                        <p>When you create an account with us, you must provide us with information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our service.</p>

                        <h3 className="text-foreground font-semibold">3. Intellectual Property</h3>
                        <p>The Service and its original content (excluding Content provided by users), features and functionality are and will remain the exclusive property of Power Brain and its licensors. The Service is protected by copyright, trademark, and other laws of both Malawi and foreign countries.</p>
                        
                        <h3 className="text-foreground font-semibold">4. Termination</h3>
                        <p>We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>
                        
                        <h3 className="text-foreground font-semibold">5. Limitation Of Liability</h3>
                        <p>In no event shall Power Brain, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.</p>
                        
                        <h3 className="text-foreground font-semibold">6. Changes to Terms</h3>
                        <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
