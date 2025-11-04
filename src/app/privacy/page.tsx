
'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PrivacyPage() {
    const router = useRouter();

    return (
        <div>
            <div className="p-4 flex items-center gap-4 sticky top-0 bg-background/80 backdrop-blur-sm z-10 border-b">
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <ArrowLeft />
                </Button>
                <h1 className="text-xl font-bold">Privacy Policy</h1>
            </div>
            <div className="p-4 max-w-3xl mx-auto">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-3xl">Privacy Policy for Power Brain</CardTitle>
                        <CardDescription>
                            Last Updated: {new Date().toLocaleDateString()}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 text-muted-foreground prose prose-sm dark:prose-invert max-w-none">
                        <p>At Power Brain, accessible from our application, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Power Brain and how we use it.</p>
                        <p>If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.</p>

                        <h3 className="text-foreground font-semibold">1. Information We Collect</h3>
                        <p>We collect personal information that you voluntarily provide to us when you register on the application, express an interest in obtaining information about us or our products and services, when you participate in activities on the application or otherwise when you contact us. The personal information we collect may include: Name, Email Address, Grade Level, School, and other details you provide.</p>
                        
                        <h3 className="text-foreground font-semibold">2. How We Use Your Information</h3>
                        <p>We use the information we collect in various ways, including to:</p>
                        <ul className="list-disc pl-5">
                            <li>Provide, operate, and maintain our application</li>
                            <li>Improve, personalize, and expand our application</li>
                            <li>Understand and analyze how you use our application</li>
                            <li>Develop new products, services, features, and functionality</li>
                            <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the application, and for marketing and promotional purposes</li>
                            <li>Send you emails</li>
                            <li>Find and prevent fraud</li>
                        </ul>

                        <h3 className="text-foreground font-semibold">3. Log Files and Usage Data</h3>
                        <p>Power Brain follows a standard procedure of using log files. These files log visitors when they use the app. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the app, and gathering demographic information.</p>

                        <h3 className="text-foreground font-semibold">4. Cookies and Web Beacons</h3>
                        <p>Like any other application, Power Brain uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.</p>

                        <h3 className="text-foreground font-semibold">5. Google AdSense and DART Cookie</h3>
                        <p>Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to our app and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL – <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-primary">https://policies.google.com/technologies/ads</a></p>

                        <h3 className="text-foreground font-semibold">6. Advertising Partners Privacy Policies</h3>
                        <p>You may consult this list to find the Privacy Policy for each of the advertising partners of Power Brain. Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on Power Brain, which are sent directly to users' browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.</p>
                        <p>Note that Power Brain has no access to or control over these cookies that are used by third-party advertisers.</p>
                        
                        <h3 className="text-foreground font-semibold">7. Children's Information</h3>
                        <p>Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.</p>
                        <p>Power Brain does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our application, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.</p>
                        
                        <h3 className="text-foreground font-semibold">8. Consent</h3>
                        <p>By using our application, you hereby consent to our Privacy Policy and agree to its terms.</p>

                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
