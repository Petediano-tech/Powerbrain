
'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail, Phone, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const WhatsAppIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M16.75 13.96c.25.13.41.2.52.39.11.19.19.41.19.64.01.23-.04.46-.14.68-.1.22-.26.41-.46.57-.2.16-.44.28-.7.37-.26.09-.55.12-.84.12-.33 0-.66-.06-1-.18-.34-.12-.68-.29-1.02-.51-.34-.22-.68-.48-1.01-.78-.33-.3-.66-.63-.97-.99-.32-.36-.61-.74-.88-1.14-.27-.4-.51-.83-.7-1.28-.2-.45-.34-.92-.42-1.39-.08-.47-.12-.95-.12-1.42 0-.41.06-.8.18-1.16.12-.36.3-.68.53-.97.23-.29.5-.54.81-.74.31-.2.65-.35.99-.44.35-.09.68-.14 1.02-.14h.13c.41 0 .79.09 1.12.26.33.17.6.4.8.69.21.29.35.62.42.98.07.36.08.73.02 1.11-.06.37-.18.72-.36.99-.18.27-.41.48-.68.61-.28.13-.57.2-.87.21-.29.01-.58-.04-.85-.14-.27-.1-.53-.23-.76-.39l-.04-.02c-.25-.16-.53-.25-.82-.27-.29-.02-.57.03-.84.14-.27.11-.52.28-.73.49-.21.21-.38.46-.49.73-.11.27-.17.56-.17.85 0 .28.06.55.17.81.11.26.28.5.49.7.21.21.46.38.72.49.26.11.53.17.8.17.28 0 .56-.05.82-.16.26-.11.5-.27.7-.46.2-.19.36-.42.48-.68.05-.11.08-.23.1-.34l.02-.02z"/>
    </svg>
);

export default function ContactPage() {
    const router = useRouter();
    const phoneNumber = "+265987066051";
    const whatsappLink = `https://wa.me/265987066051`;
    const email = "peterdamianotech@gmail.com";
    const location = "Dzenje Secondary School, Mulanje, Malawi";

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
                        <CardTitle className="text-3xl">Get in Touch</CardTitle>
                        <CardDescription>
                            We'd love to hear from you. Choose a method below to connect with us.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-4">
                            <h3 className="font-semibold text-lg text-center">Direct Contact</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Button asChild variant="outline" className="h-14">
                                    <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                                        <WhatsAppIcon />
                                        Chat on WhatsApp
                                    </a>
                                </Button>
                                <Button asChild variant="outline" className="h-14">
                                    <a href={`tel:${phoneNumber}`} className="flex items-center justify-center gap-2">
                                        <Phone />
                                        Call Us
                                    </a>
                                </Button>
                            </div>
                        </div>

                       <div className="space-y-4 pt-4 border-t">
                            <h3 className="font-semibold text-lg text-center">Other Information</h3>
                            <div className="flex items-start gap-4">
                               <div className="p-3 bg-muted rounded-full">
                                   <Mail className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <h4 className="font-semibold">Email</h4>
                                    <a href={`mailto:${email}`} className="text-primary hover:underline">{email}</a>
                                    <p className="text-sm text-muted-foreground">For general inquiries and support.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-muted rounded-full">
                                   <MapPin className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <h4 className="font-semibold">Our Location</h4>
                                    <p className="text-muted-foreground">{location}</p>
                                </div>
                           </div>
                       </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
