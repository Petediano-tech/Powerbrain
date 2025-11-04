
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Download, PlayCircle } from 'lucide-react';
import type { Resource } from '@/lib/resources-data';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from './ui/card';
import { cn } from '@/lib/utils';

interface ResourceCardProps {
  resource: Resource;
}

export function ResourceCard({ resource }: ResourceCardProps) {
  const { toast } = useToast();
  const isVideo = resource.type.toLowerCase() === 'video';
  const isPdf = resource.type.toLowerCase() === 'pdf' || resource.type.toLowerCase() === 'past paper' || resource.type.toLowerCase() === 'textbook';

  const handleClick = (e: React.MouseEvent) => {
    if (resource.sourceUrl === '#') {
      e.preventDefault();
      toast({
        title: "Coming Soon!",
        description: `The resource "${resource.title}" is not available yet. Please check back later.`,
      });
    }
  };

  const cardContent = (
    <Card className="group h-full overflow-hidden transition-all hover:shadow-lg">
      <CardContent className="p-0">
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Image
            src={resource.imageUrl}
            alt={resource.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            data-ai-hint={resource.imageHint}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div
            className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground
            transition-transform group-hover:scale-110"
          >
            {isVideo ? (
              <PlayCircle className="h-5 w-5" />
            ) : (
              <Download className="h-5 w-5" />
            )}
          </div>
          {isVideo && (
              <div className="absolute inset-0 flex items-center justify-center">
                  <PlayCircle className="h-12 w-12 text-white/80 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
          )}
        </div>
        <div className="p-3">
          <h3 className="font-semibold text-foreground truncate">{resource.title}</h3>
          <p className="text-sm text-muted-foreground">{resource.description}</p>
          <p className="text-xs text-muted-foreground mt-1">{resource.type}</p>
        </div>
      </CardContent>
    </Card>
  );

  if (isPdf) {
    return (
        <Link href={`/notes/view?pdf=${encodeURIComponent(resource.sourceUrl)}&subject=${resource.title}`} onClick={handleClick}>
            {cardContent}
        </Link>
    )
  }

  return (
    <a href={resource.sourceUrl} target="_blank" rel="noopener noreferrer" onClick={handleClick}>
      {cardContent}
    </a>
  );
}
