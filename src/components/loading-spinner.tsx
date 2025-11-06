
'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

export function LoadingSpinner() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-background">
      <div className="relative flex h-24 w-24 items-center justify-center">
        {/* Animated arcs */}
        <div className="absolute h-full w-full animate-loading-rotate">
          <div className="absolute h-full w-full animate-loading-dash rounded-full border-2 border-primary/50 opacity-75"></div>
        </div>
         <div className="absolute h-[85%] w-[85%] animate-loading-rotate [animation-direction:reverse]">
          <div className="absolute h-full w-full animate-loading-dash [animation-direction:reverse] rounded-full border-2 border-accent/50 opacity-50"></div>
        </div>

        {/* Pulsing logo container */}
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-card shadow-2xl shadow-primary/10">
          <Image 
            src="https://i.ibb.co/LXVP2DvQ/file-00000000c054622f99a4d97070b6f180.png" 
            alt="Power Brain Logo" 
            width={48} 
            height={48} 
            className="animate-pulse"
            priority
          />
        </div>
      </div>
    </div>
  );
}
