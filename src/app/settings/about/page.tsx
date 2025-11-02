
'use client';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronRight, FileText, Info, ShieldCheck, Users, Phone, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const aboutItems = [
    {
        href: "/about",
        icon: Info,
        title: "About Power Brain",
    },
    {
        href: "/terms",
        icon: FileText,
        title: "Terms of Service",
    },
    {
        href: "/privacy",
        icon: ShieldCheck,
        title: "Privacy Policy",
    },
    {
        href: "/contact",
        icon: Phone,
        title: "Contact Us",
    },
    {
        href: "/developers",
        icon: Users,
        title: "Developers",
    }
]

export default function AboutLegalPage() {
  const router = useRouter();

  return (
    <div className="pb-8">
      <div className="p-4 flex items-center gap-4 sticky top-0 bg-background/80 backdrop-blur-sm z-10 border-b">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft />
        </Button>
        <h1 className="text-xl font-bold">About & Legal</h1>
      </div>
      <div className="max-w-2xl mx-auto p-4">
        <div className="space-y-2">
          {aboutItems.map((item) => (
            <Link href={item.href} key={item.title} className="block">
                <div className="flex items-center p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors cursor-pointer">
                    <item.icon className="h-5 w-5 mr-4 text-muted-foreground" />
                    <span className="flex-1 font-medium">{item.title}</span>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
