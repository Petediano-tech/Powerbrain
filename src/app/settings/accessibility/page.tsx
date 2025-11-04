
'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useTheme } from "next-themes";
import { useFont } from "@/components/font-provider";
import { useSettingsStore } from "@/hooks/use-settings-store";

const availableFonts = ["poppins", "inter", "roboto", "lato", "opensans"];

export default function AccessibilitySettingsPage() {
  const { theme, setTheme } = useTheme();
  const { font, setFont } = useFont();
  const { 
    fontSize, 
    setFontSize,
    dailyQuotes,
    setDailyQuotes,
    quizReminders,
    setQuizReminders
  } = useSettingsStore();

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      
      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>Customize the look and feel of the app.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <Label htmlFor="theme-selection">
              <span>Theme Selection</span>
            </Label>
             <Select value={theme} onValueChange={setTheme}>
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
            <Select value={font} onValueChange={setFont}>
              <SelectTrigger id="font-selection" className="w-[180px]">
                <SelectValue placeholder="Select font" />
              </SelectTrigger>
              <SelectContent>
                {availableFonts.map(f => (
                  <SelectItem key={f} value={f} className={`font-${f}`}>
                      <span style={{ fontFamily: `var(--font-${f})`}}>{f.charAt(0).toUpperCase() + f.slice(1)}</span>
                  </SelectItem>
                ))}
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
            <Slider 
              id="font-size" 
              value={[fontSize]} 
              onValueChange={([val]) => setFontSize(val)} 
              max={20} 
              min={12} 
              step={1} 
            />
            <p className="text-center text-sm text-muted-foreground" style={{ fontSize: `${fontSize}px` }}>
              Adjust for readability (current: {fontSize}px)
            </p>
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
            <Switch 
              id="daily-quotes" 
              checked={dailyQuotes}
              onCheckedChange={setDailyQuotes}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="quiz-reminders">Upcoming Quiz Reminders</Label>
            <Switch 
              id="quiz-reminders" 
              checked={quizReminders}
              onCheckedChange={setQuizReminders}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
