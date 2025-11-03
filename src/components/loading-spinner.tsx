'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

export function LoadingSpinner() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-background">
      <div className="relative flex h-20 w-20 items-center justify-center">
        <div className="absolute inline-flex h-full w-full rounded-full bg-primary/20 opacity-75 animate-ping"></div>
        <div className="relative inline-flex rounded-full h-20 w-20 bg-card border-2 border-primary/50 flex items-center justify-center">
             <Image 
                src="https://i.ibb.co/LXVP2DvQ/file-00000000c054622f99a4d97070b6f180.png" 
                alt="Power Brain Logo" 
                width={48} 
                height={48} 
                className="animate-pulse"
             />
        </div>
      </div>
    </div>
  );
}
