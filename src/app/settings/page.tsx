
'use client';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronRight, User, Accessibility, Crown, Info, ArrowLeft, Timer } from "lucide-react";
import { useRouter } from "next/navigation";

const settingsItems = [
    {
        href: "/profile",
        icon: User,
        title: "Profile",
        description: "Manage your personal and academic information."
    },
    {
        href: "/settings/accessibility",
        icon: Accessibility,
        title: "Accessibility",
        description: "Customize theme, font, and notifications."
    },
    {
        href: "/settings/reading-style",
        icon: Timer,
        title: "Reading Style",
        description: "Adjust your study sessions with Pomodoro."
    },
    {
        href: "/subscribe",
        icon: Crown,
        title: "VIP Subscription",
        description: "Upgrade your plan for more features."
    },
    {
        href: "/settings/about",
        icon: Info,
        title: "About & Legal",
        description: "App info, terms, and privacy policy."
    }
]

export default function SettingsPage() {
  const router = useRouter();

  return (
    <div className="pb-8">
      <div className="p-4 flex items-center gap-4 sticky top-0 bg-background/80 backdrop-blur-sm z-10 border-b">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft />
        </Button>
        <h1 className="text-xl font-bold">Settings</h1>
      </div>
      <div className="max-w-2xl mx-auto p-4">
        <div className="space-y-4">
          {settingsItems.map((item) => (
            <Link href={item.href} key={item.title} className="block">
                <div className="flex items-center gap-4 p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="p-3 bg-muted rounded-full text-primary">
                        <item.icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-semibold text-lg">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
