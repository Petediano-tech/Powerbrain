import { BrainCircuit } from 'lucide-react';
import { Poppins } from 'next/font/google';
import { cn } from '@/lib/utils';

const logoFont = Poppins({
  subsets: ['latin'],
  weight: ['700'],
});

export function Logo() {
  return (
    <div className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
        <BrainCircuit className="h-6 w-6 text-primary" />
      </div>
      <div className={cn("flex flex-col group-data-[collapsible=icon]:hidden", logoFont.className)}>
        <h1 className="text-lg font-bold leading-tight text-primary">Power Brain</h1>
        <p className="text-xs text-muted-foreground">Smart Learning</p>
      </div>
    </div>
  );
}
