
'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Timer } from "lucide-react";
import { useRouter } from "next/navigation";
import { Slider } from "@/components/ui/slider";

export default function ReadingStylePage() {
  const router = useRouter();

  return (
    <div className="pb-8">
      <div className="p-4 flex items-center gap-4 sticky top-0 bg-background/80 backdrop-blur-sm z-10 border-b">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft />
        </Button>
        <h1 className="text-xl font-bold">Reading Style</h1>
      </div>
      <div className="space-y-8 max-w-2xl mx-auto p-4">
        
        <Card>
          <CardHeader>
            <CardTitle>Pomodoro Timer</CardTitle>
            <CardDescription>Customize your focused study sessions.</CardDescription>
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
              <Switch id="pomodoro-timer" />
            </div>
            <div className="space-y-3">
              <Label htmlFor="focus-duration">Focus Duration (minutes)</Label>
              <Slider id="focus-duration" defaultValue={[25]} max={60} min={15} step={5} />
              <p className="text-center text-sm text-muted-foreground">25 minutes</p>
            </div>
            <div className="space-y-3">
              <Label htmlFor="break-duration">Break Duration (minutes)</Label>
              <Slider id="break-duration" defaultValue={[5]} max={15} min={3} step={1} />
              <p className="text-center text-sm text-muted-foreground">5 minutes</p>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
