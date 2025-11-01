'use client';

import Image from 'next/image';
import { Download, PlayCircle } from 'lucide-react';
import { Resource } from '@/lib/resources-data';

interface ResourceCardProps {
  resource: Resource;
}

export function ResourceCard({ resource }: ResourceCardProps) {
  const isVideo = resource.type === 'Video';

  return (
    <div className="group">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-muted">
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
      <div className="mt-2">
        <h3 className="font-semibold text-foreground truncate">{resource.title}</h3>
        <p className="text-sm text-muted-foreground">{resource.description}</p>
        <p className="text-xs text-muted-foreground mt-1">{resource.type}</p>
      </div>
    </div>
  );
}
