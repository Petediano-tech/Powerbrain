
'use client';

import Image from 'next/image';

export function LoadingSpinner() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-background">
      <div className="relative flex h-32 w-32 items-center justify-center">
        {/* Animated Orbiting Arcs */}
        <div className="absolute h-full w-full animate-orbit rounded-full border-2 border-primary/30"></div>
        <div className="absolute h-[85%] w-[85%] animate-orbit-reverse rounded-full border-t-2 border-r-2 border-accent/40"></div>
        <div className="absolute h-[70%] w-[70%] animate-orbit rounded-full border-l-2 border-b-2 border-sky-blue/50"></div>

        {/* Pulsing Gradient Border for the Logo */}
        <div className="absolute h-20 w-20 animate-pulse rounded-full bg-gradient-to-br from-primary to-accent opacity-50 blur-md"></div>
        
        {/* Logo Container with Gradient Border */}
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full p-1 bg-gradient-to-br from-primary to-accent">
          <div className="h-full w-full rounded-full bg-background p-2 flex items-center justify-center">
            <Image 
              src="https://i.ibb.co/LXVP2DvQ/file-00000000c054622f99a4d97070b6f180.png" 
              alt="Power Brain Logo" 
              width={40} 
              height={40} 
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
