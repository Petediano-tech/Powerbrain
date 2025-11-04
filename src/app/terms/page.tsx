
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
                    <CardContent className="space-y-6 text-muted-foreground prose prose-sm dark:prose-invert max-w-none">
                        <p>Welcome to Power Brain! These terms and conditions outline the rules and regulations for the use of our application, located within the platform.</p>

                        <h3 className="text-foreground font-semibold">1. Acceptance of Terms</h3>
                        <p>By accessing and using our app, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use this service. This agreement applies to all visitors, users, and others who wish to access or use the Service.</p>

                        <h3 className="text-foreground font-semibold">2. User Accounts</h3>
                        <p>When you create an account with us, you guarantee that you are above the age of 13, and that the information you provide us is accurate, complete, and current at all times. Inaccurate, incomplete, or obsolete information may result in the immediate termination of your account on our Service. You are responsible for maintaining the confidentiality of your account and password.</p>

                        <h3 className="text-foreground font-semibold">3. Intellectual Property</h3>
                        <p>The Service and its original content (excluding Content provided by users), features, and functionality are and will remain the exclusive property of Power Brain and its licensors. The Service is protected by copyright, trademark, and other laws of both Malawi and foreign countries. Our trademarks may not be used in connection with any product or service without the prior written consent of Power Brain.</p>
                        
                        <h3 className="text-foreground font-semibold">4. User-Generated Content</h3>
                        <p>Our Service may allow you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material ("Content"). You are responsible for the Content that you post on or through the Service, including its legality, reliability, and appropriateness. By posting Content, you grant us the right and license to use, modify, publicly perform, publicly display, reproduce, and distribute such Content on and through the Service.</p>

                        <h3 className="text-foreground font-semibold">5. Prohibited Uses</h3>
                        <p>You agree not to use the Service for any unlawful purpose or any purpose prohibited under this clause. You agree not to use the Service in any way that could damage the Service, the services, or the general business of Power Brain. This includes, but is not limited to, harassing, abusing, or threatening others or otherwise violating any person's legal rights; and engaging in any form of fraudulent activity.</p>
                        
                        <h3 className="text-foreground font-semibold">6. Termination</h3>
                        <p>We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Service will immediately cease.</p>
                        
                        <h3 className="text-foreground font-semibold">7. Limitation Of Liability</h3>
                        <p>In no event shall Power Brain, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.</p>
                        
                        <h3 className="text-foreground font-semibold">8. Changes to Terms</h3>
                        <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>
                        
                        <h3 className="text-foreground font-semibold">9. Contact Us</h3>
                        <p>If you have any questions about these Terms, please contact us through the information provided on our Contact page.</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
