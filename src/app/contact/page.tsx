
'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Mail, Phone, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ContactPage() {
    const router = useRouter();

    return (
        <div>
            <div className="p-4 flex items-center gap-4 sticky top-0 bg-background/80 backdrop-blur-sm z-10 border-b">
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <ArrowLeft />
                </Button>
                <h1 className="text-xl font-bold">Contact Us</h1>
            </div>
            <div className="p-4 max-w-2xl mx-auto">
                <Card>
                    <CardHeader className="text-center">
                        <CardTitle className="text-3xl">Contact Us</CardTitle>
                        <CardDescription>
                            We'd love to hear from you.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                       <div className="flex items-start gap-4">
                           <div className="p-2 bg-muted rounded-full">
                               <Mail className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold">Email</h3>
                                <a href="mailto:support@powerbrain.mw" className="text-primary hover:underline">support@powerbrain.mw</a>
                                <p className="text-sm text-muted-foreground">For general inquiries and support.</p>
                            </div>
                       </div>
                       <div className="flex items-start gap-4">
                            <div className="p-2 bg-muted rounded-full">
                               <Phone className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold">Phone</h3>
                                <p className="text-muted-foreground">+265 123 456 789</p>
                                <p className="text-sm text-muted-foreground">Mon - Fri, 9am - 5pm</p>
                            </div>
                       </div>
                       <div className="flex items-start gap-4">
                            <div className="p-2 bg-muted rounded-full">
                               <MapPin className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold">Office</h3>
                                <p className="text-muted-foreground">Power Brain HQ, Lilongwe, Malawi</p>
                            </div>
                       </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
