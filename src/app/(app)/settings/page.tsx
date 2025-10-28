import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

export default function SettingsPage() {
  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold">Settings</h2>
        <p className="text-muted-foreground">Personalize your Power Brain experience.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>Customize the look and feel of the app.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <Label htmlFor="dark-mode">Dark Mode</Label>
            <Switch id="dark-mode" defaultChecked disabled />
            {/* Note: In a real app, this would be tied to a theme provider state */}
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
          <div className="space-y-3">
            <Label htmlFor="font-size">Font Size</Label>
            <Slider id="font-size" defaultValue={[16]} max={24} min={12} step={1} />
            <p className="text-center text-sm text-muted-foreground">Adjust for readability</p>
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
          <div className="flex items-center justify-between">
            <Label htmlFor="missed-lessons">Missed Lesson Summaries</Label>
            <Switch id="missed-lessons" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
          <CardDescription>Manage your account security and data.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm">Logged in as <span className="font-semibold text-primary">peter.phiri@example.com</span></p>
           <div className="flex items-center justify-between">
            <Label htmlFor="data-backup">Auto-backup to Google Drive</Label>
            <Switch id="data-backup" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
