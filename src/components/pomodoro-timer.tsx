
'use client';

import { usePomodoroStore } from '@/hooks/use-pomodoro-store';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Play, Pause, RotateCcw } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';

export function PomodoroTimer() {
  const {
    isEnabled,
    isActive,
    timeLeft,
    sessionType,
    tick,
    startTimer,
    pauseTimer,
    resetTimer,
    getProgress,
  } = usePomodoroStore();
  
  const [isHidden, setIsHidden] = useState(false);
  const dragStartPos = useRef({ x: 0, time: 0 });
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const progress = getProgress();

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (isActive) {
      interval = setInterval(() => {
        tick();
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, tick]);

  useEffect(() => {
    if (timeLeft === 0 && isActive) {
      audioRef.current?.play();
      const message =
        sessionType === 'focus'
          ? "Time for a break! Great work."
          : 'Break is over! Time to focus.';
      
      if (Notification.permission === 'granted') {
        new Notification('Power Brain Timer', { body: message });
      }
    }
  }, [timeLeft, isActive, sessionType]);

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    dragStartPos.current = { x: clientX, time: Date.now() };
  };

  const handleDragEnd = (e: React.MouseEvent | React.TouchEvent) => {
    const clientX = 'changedTouches' in e ? e.changedTouches[0].clientX : e.clientX;
    const deltaX = clientX - dragStartPos.current.x;
    const deltaTime = Date.now() - dragStartPos.current.time;

    if (deltaTime < 500) { // Only trigger on quick swipes
      if (isHidden && deltaX < -50) {
        setIsHidden(false);
      } else if (!isHidden && deltaX > 50) {
        setIsHidden(true);
      }
    }
  };

  if (!isEnabled) {
    return null;
  }

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const timerText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return (
    <>
      <audio ref={audioRef} src="data:audio/mp3;base64,SUQzBAAAAAAAI1RTSEUAAAABA1AAAP9mgAAAAAAAAABEU291bmRib3kuY29tIC0gQmFieSBDcnlpbmcgbXAzAAAAAAAAAAAA//uQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAExhdmY2MC4zLjEwMAAAAAAACQgCAwAEAAAAAAA2ZGVjndsh+AAAAAAAAAAAAAD/7+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9aMYg4MEYBwNoHDkROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9-MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9+MYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/9eMYg4MEYBwNoHDoROHAAATHv8H2A0AAADwADhAYiAMAAT/+4AAA" preload="auto" />
      <div
        className={cn(
          'fixed bottom-6 z-50 transition-transform duration-300 ease-in-out',
          isHidden ? 'translate-x-full right-0' : 'right-6'
        )}
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
        onMouseUp={handleDragEnd}
        onTouchEnd={handleDragEnd}
      >
        <div className="flex items-center gap-2">
          <div
            className={cn(
              'relative h-24 w-24 rounded-full flex items-center justify-center text-white shadow-lg transition-colors cursor-grab active:cursor-grabbing',
              sessionType === 'focus' ? 'bg-primary' : 'bg-green-500'
            )}
          >
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100">
              <circle
                className="stroke-current text-white/20"
                strokeWidth="4"
                cx="50"
                cy="50"
                r="46"
                fill="transparent"
              />
              <circle
                className="stroke-current"
                strokeWidth="4"
                cx="50"
                cy="50"
                r="46"
                fill="transparent"
                strokeDasharray={2 * Math.PI * 46}
                strokeDashoffset={(2 * Math.PI * 46) * (1 - progress / 100)}
                transform="rotate(-90 50 50)"
                style={{ transition: 'stroke-dashoffset 1s linear' }}
              />
            </svg>

            <span className="relative text-2xl font-bold font-mono">
              {timerText}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="rounded-full h-10 w-10 shadow-md"
                    onClick={isActive ? pauseTimer : startTimer}
                  >
                    {isActive ? <Pause size={18}/> : <Play size={18}/>}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="left">
                  <p>{isActive ? 'Pause' : 'Start'}</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                 <TooltipTrigger asChild>
                  <Button
                      variant="secondary"
                      size="icon"
                      className="rounded-full h-10 w-10 shadow-md"
                      onClick={() => resetTimer()}
                    >
                      <RotateCcw size={18}/>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="left">
                  <p>Reset</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
      
      {/* Hidden Handle */}
      <div
        className={cn(
          'fixed right-0 bottom-1/2 translate-y-1/2 h-20 w-8 bg-muted/50 rounded-l-full transition-opacity duration-300 cursor-pointer',
          isHidden ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
        onMouseUp={handleDragEnd}
        onTouchEnd={handleDragEnd}
      />
    </>
  );
}

    