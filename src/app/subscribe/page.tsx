'use client';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Crown, Star, CreditCard, Landmark, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const plans = [
    { name: "Spark Plan", price: "K1,000", features: ["15 AI Questions/Day", "Basic Support"], monthly: true },
    { name: "Ignite Plan", price: "K2,000", features: ["30 AI Questions/Day", "Priority Support"], monthly: true },
    { name: "Blaze Plan", price: "K3,000", features: ["50 AI Questions/Day", "Priority Support"], monthly: true },
    { name: "Quantum Plan", price: "K5,000", features: ["100 AI Questions/Day", "24/7 Support"], monthly: true },
];

const powerPlan = {
    name: "Power Brain",
    price: "K10,000",
    features: ["Unlimited AI Questions", "Unlock All AI Features", "Dedicated 24/7 Support", "Early Access to New Features"],
    monthly: true,
    highlight: true,
};

function PaypalIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.4 2H5.6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h8.8a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z" />
            <path d="M9.4 12.5c-.3 0-.6-.1-.8-.4a1.3 1.3 0 0 1-.5-1.4 1.4 1.4 0 0 1 .5-1 .9.9 0 0 1 .8-.4h2.9c.4 0 .7.1 1 .4.3.2.4.5.4.9a.9.9 0 0 1-.4.8c-.3.2-.6.3-1 .3h-1.8c-.4 0-.7.1-.9.2a.7.7 0 0 0-.4.6c0 .4.2.7.5.9.3.2.7.3 1.1.3h.3a1.4 1.4 0 0 1 1.2.6 1.4 1.4 0 0 1 .4 1.1c0 .5-.2 1-.6 1.3a2.3 2.3 0 0 1-1.6.5H9.4z"/>
        </svg>
    )
}

export default function SubscribePage() {
    const { toast } = useToast();

    const handlePaymentConfirmation = () => {
        toast({
            title: "Confirmation Sent!",
            description: "Thank you! Your account will be upgraded once payment is verified (usually within 1-2 hours).",
        });
    }

    return (
        <div className="max-w-5xl mx-auto py-8 px-4">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold tracking-tight">Become a VIP Member</h1>
                <p className="mt-2 text-lg text-muted-foreground">Unlock powerful AI features and support the Power Brain mission.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {plans.map((plan) => (
                    <Card key={plan.name} className="flex flex-col">
                        <CardHeader>
                            <CardTitle>{plan.name}</CardTitle>
                            <CardDescription>
                                <span className="text-3xl font-bold">{plan.price}</span>
                                {plan.monthly && <span className="text-muted-foreground">/month</span>}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 space-y-3">
                            {plan.features.map((feature) => (
                                <div key={feature} className="flex items-center gap-2">
                                    <CheckCircle className="h-5 w-5 text-green-500" />
                                    <span className="text-sm">{feature}</span>
                                </div>
                            ))}
                        </CardContent>
                        <CardFooter>
                            <Button variant="outline" className="w-full">Select Plan</Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

             <Card className={cn("mt-8 w-full lg:w-3/4 mx-auto", powerPlan.highlight && "border-primary border-2 shadow-primary/20")}>
                <CardHeader className="text-center">
                    <Star className="h-8 w-8 mx-auto text-yellow-400" />
                    <CardTitle className="text-3xl text-primary">{powerPlan.name}</CardTitle>
                     <CardDescription>
                        <span className="text-4xl font-bold">{powerPlan.price}</span>
                        {powerPlan.monthly && <span className="text-muted-foreground">/month</span>}
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 grid grid-cols-2 gap-4">
                    {powerPlan.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-3">
                            <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                            <span className="text-sm font-medium">{feature}</span>
                        </div>
                    ))}
                </CardContent>
                <CardFooter>
                    <Button className="w-full" size="lg">Select Power Plan</Button>
                </CardFooter>
            </Card>

            <Card className="mt-12 max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle>Complete Your Payment</CardTitle>
                    <CardDescription>Choose your preferred payment method to upgrade.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="mobile" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="mobile">Mobile Money</TabsTrigger>
                            <TabsTrigger value="card" disabled>Credit Card</TabsTrigger>
                            <TabsTrigger value="paypal" disabled>PayPal</TabsTrigger>
                        </TabsList>
                        <TabsContent value="mobile" className="py-4">
                             <div className="space-y-4">
                                <ol className="list-decimal list-inside space-y-3 text-muted-foreground">
                                    <li>
                                        Choose your desired VIP plan from the options above.
                                    </li>
                                    <li>
                                        Open your Airtel Money menu.
                                    </li>
                                    <li>
                                        Select "Send Money".
                                    </li>
                                    <li>
                                       Enter the phone number: <strong className="text-primary font-mono">+265987066051</strong>.
                                    </li>
                                     <li>
                                       Enter the exact amount for your chosen plan (e.g., 1000 for Spark Plan).
                                    </li>
                                    <li>
                                        Confirm the transaction with your PIN. You will receive an SMS confirmation from Airtel.
                                    </li>
                                </ol>
                                <Separator />
                                 <p className="text-sm font-semibold">After sending the money, click the button below so our team can verify your payment.</p>
                                  <Button className="w-full bg-green-600 hover:bg-green-700" onClick={handlePaymentConfirmation}>
                                    I have sent the payment
                                </Button>
                            </div>
                        </TabsContent>
                        <TabsContent value="card" className="py-4">
                             <div className="flex flex-col items-center justify-center text-center p-8 border rounded-lg bg-muted/50">
                                <CreditCard className="h-12 w-12 text-muted-foreground mb-4" />
                                <h3 className="text-lg font-bold">Coming Soon</h3>
                                <p className="text-muted-foreground">Credit card payments will be available shortly.</p>
                            </div>
                        </TabsContent>
                        <TabsContent value="paypal" className="py-4">
                             <div className="flex flex-col items-center justify-center text-center p-8 border rounded-lg bg-muted/50">
                                <PaypalIcon />
                                <h3 className="text-lg font-bold mt-4">Coming Soon</h3>
                                <p className="text-muted-foreground">PayPal payments will be available shortly.</p>
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
                 <CardFooter>
                    <Button variant="outline" asChild className="w-full">
                        <Link href="/dashboard">Back to Dashboard</Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
