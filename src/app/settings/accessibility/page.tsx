
'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AccessibilitySettingsPage() {
  const router = useRouter();

  return (
    <div className="pb-8">
      <div className="p-4 flex items-center gap-4 sticky top-0 bg-background/80 backdrop-blur-sm z-10 border-b">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft />
        </Button>
        <h1 className="text-xl font-bold">Accessibility</h1>
      </div>
      <div className="space-y-8 max-w-2xl mx-auto p-4">
        
        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>Customize the look and feel of the app.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <Label htmlFor="theme-selection" className="flex flex-col gap-1">
                <span>Theme Selection</span>
              </Label>
               <Select defaultValue="light">
                <SelectTrigger id="theme-selection" className="w-[180px]">
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light Mode</SelectItem>
                  <SelectItem value="dark">Dark Mode</SelectItem>
                  <SelectItem value="system">System Default</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="font-selection">Font</Label>
              <Select defaultValue="poppins">
                <SelectTrigger id="font-selection" className="w-[180px]">
                  <SelectValue placeholder="Select font" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="poppins">Poppins</SelectItem>
                  <SelectItem value="inter">Inter</SelectItem>
                  <SelectItem value="roboto">Roboto</SelectItem>
                  <SelectItem value="lato">Lato</SelectItem>
                  <SelectItem value="opensans">Open Sans</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Readability</CardTitle>
            <CardDescription>Make the app easier to read.</CardDescription>
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
      </div>
    </div>
  );
}
