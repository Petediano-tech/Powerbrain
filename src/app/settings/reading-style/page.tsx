
'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Timer } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { usePomodoroStore } from "@/hooks/use-pomodoro-store";

export default function ReadingStylePage() {
  const {
    isEnabled,
    focusDuration,
    breakDuration,
    setEnabled,
    setFocusDuration,
    setBreakDuration,
  } = usePomodoroStore();

  const handleToggle = (checked: boolean) => {
    setEnabled(checked);
    if (checked && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  };

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      
      <Card>
        <CardHeader>
          <CardTitle>Pomodoro Timer</CardTitle>
          <CardDescription>Customize your focused study sessions. A powerful technique to improve focus and manage time.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <Label htmlFor="pomodoro-timer" className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <Timer className="h-4 w-4" />
                  <span>Enable Pomodoro Timer</span>
                </div>
                <span className="text-xs font-normal text-muted-foreground">Activates a timer during reading sessions.</span>
            </Label>
            <Switch id="pomodoro-timer" checked={isEnabled} onCheckedChange={handleToggle} />
          </div>
          
          {isEnabled && (
            <>
              <div className="space-y-3">
                <Label htmlFor="focus-duration">Focus Duration (minutes)</Label>
                <Slider 
                  id="focus-duration" 
                  value={[focusDuration]} 
                  onValueChange={([value]) => setFocusDuration(value)}
                  max={60} 
                  min={15} 
                  step={5} 
                />
                <p className="text-center text-sm text-muted-foreground">{focusDuration} minutes</p>
              </div>
              <div className="space-y-3">
                <Label htmlFor="break-duration">Break Duration (minutes)</Label>
                <Slider 
                  id="break-duration" 
                  value={[breakDuration]} 
                  onValueChange={([value]) => setBreakDuration(value)}
                  max={30} 
                  min={3} 
                  step={1} 
                />
                <p className="text-center text-sm text-muted-foreground">{breakDuration} minutes</p>
              </div>
            </>
          )}

        </CardContent>
      </Card>

    </div>
  );
}
