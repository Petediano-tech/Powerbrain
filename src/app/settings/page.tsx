'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronRight, FileText, Info, ShieldCheck, Trash2, Users, Download, Phone, Crown, Timer, ArrowLeft } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";

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
      <div className="space-y-8 max-w-2xl mx-auto p-4">
        
        <Card>
          <CardHeader>
            <CardTitle>Subscription</CardTitle>
            <CardDescription>Upgrade your plan to unlock more features.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 bg-primary/10 rounded-lg">
              <div>
                <h4 className="font-semibold">You are on the Free Plan</h4>
                <p className="text-sm text-muted-foreground">Limited AI chat and features.</p>
              </div>
              <Button asChild>
                <Link href="/subscribe">
                  <Crown className="mr-2 h-4 w-4" />
                  Upgrade
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>Customize the look and feel of the app.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <Label htmlFor="dark-mode" className="flex flex-col gap-1">
                <span>Dark Mode</span>
              </Label>
              <Switch id="dark-mode" checked disabled />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="language">Language</Label>
              <Select defaultValue="en">
                <SelectTrigger id="language" className="w-[180px]">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="ch">Simple English</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Study Preferences</CardTitle>
            <CardDescription>Customize your study sessions.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <Label htmlFor="pomodoro-timer" className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <Timer className="h-4 w-4" />
                    <span>Pomodoro Reading Timer</span>
                  </div>
                  <span className="text-xs font-normal text-muted-foreground">Enable a timer during reading sessions.</span>
              </Label>
              <Switch id="pomodoro-timer" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Accessibility</CardTitle>
            <CardDescription>Make the app easier to use.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="font-size">Font Size</Label>
              <Slider id="font-size" defaultValue={[16]} max={24} min={12} step={1} />
              <p className="text-center text-sm text-muted-foreground">Adjust for readability</p>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="high-contrast" className="flex flex-col gap-1">
                  <span>High Contrast Mode</span>
                  <span className="text-xs font-normal text-muted-foreground">Coming soon!</span>
              </Label>
              <Switch id="high-contrast" disabled />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Manage how we notify you.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="daily-quotes">Daily Motivational Quotes</Label>
              <Switch id="daily-quotes" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="quiz-reminders">Upcoming Quiz Reminders</Label>
              <Switch id="quiz-reminders" defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Data & Privacy</CardTitle>
            <CardDescription>Manage your account security and data.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full justify-start gap-2 text-left">
              <Download className="h-4 w-4" />
              Export My Data
            </Button>
            <Button variant="destructive" className="w-full justify-start gap-2 text-left">
              <Trash2 className="h-4 w-4" />
              Delete My Account
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>About & Legal</CardTitle>
            <CardDescription>Information about the app and legal documents.</CardDescription>
          </CardHeader>
          <CardContent className="divide-y">
              <Link href="/about" className="flex items-center justify-between p-3 -m-3 hover:bg-muted/50 rounded-lg transition-colors">
                  <div className="flex items-center gap-3">
                      <Info />
                      <span>About Power Brain</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </Link>
              <Link href="/terms" className="flex items-center justify-between p-3 -m-3 hover:bg-muted/50 rounded-lg transition-colors">
                  <div className="flex items-center gap-3">
                      <FileText />
                      <span>Terms of Service</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </Link>
              <Link href="/privacy" className="flex items-center justify-between p-3 -m-3 hover:bg-muted/50 rounded-lg transition-colors">
                  <div className="flex items-center gap-3">
                      <ShieldCheck />
                      <span>Privacy Policy</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </Link>
              <Link href="/contact" className="flex items-center justify-between p-3 -m-3 hover:bg-muted/50 rounded-lg transition-colors">
                  <div className="flex items-center gap-3">
                      <Phone />
                      <span>Contact Us</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </Link>
              <Link href="/developers" className="flex items-center justify-between p-3 -m-3 hover:bg-muted/50 rounded-lg transition-colors">
                  <div className="flex items-center gap-3">
                      <Users />
                      <span>Developers</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
