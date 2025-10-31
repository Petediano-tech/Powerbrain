
'use client';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Crown, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

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
                    <CardTitle>How to Pay</CardTitle>
                    <CardDescription>Follow these steps to upgrade your account.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
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
                </CardContent>
                <CardFooter className="flex-col gap-3">
                    <Button className="w-full bg-green-600 hover:bg-green-700" onClick={handlePaymentConfirmation}>
                        I have sent the payment
                    </Button>
                    <Button variant="outline" asChild className="w-full">
                        <Link href="/dashboard">Back to Dashboard</Link>
                    </Button>
                </CardFooter>
            </Card>

        </div>
    );
}
