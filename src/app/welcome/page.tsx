
'use client';
import { useState, useEffect } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const onboardingSlides = [
  {
    image: PlaceHolderImages.find(p => p.id === 'welcome-logo-1')?.imageUrl || '',
    imageHint: 'educational logo',
    title: 'Welcome to Power Brain',
    description: 'Your Digital Partner in Malawian Education.',
  },
  {
    image: PlaceHolderImages.find(p => p.id === 'welcome-logo-2')?.imageUrl || '',
    imageHint: 'AI learning',
    title: 'Learn with Brainy',
    description: 'Your personal AI tutor, available 24/7 to help you succeed.',
  },
];

export default function WelcomePage() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on('select', () => {
        setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="flex h-16 items-center justify-between px-4 sm:px-6">
        <Logo />
      </header>

      <main className="flex-1 flex flex-col justify-center">
        <Carousel setApi={setApi} className="w-full max-w-md mx-auto">
          <CarouselContent>
            {onboardingSlides.map((slide, index) => (
              <CarouselItem key={index} className="h-full">
                <div className="flex h-full flex-col items-center justify-center gap-8 p-4 text-center">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    width={350}
                    height={250}
                    data-ai-hint={slide.imageHint}
                    className="aspect-[4/3] w-full max-w-xs sm:max-w-sm rounded-lg object-cover"
                  />
                  <div className="space-y-2">
                    <h1 className="text-3xl font-bold">{slide.title}</h1>
                    <p className="text-muted-foreground max-w-xs mx-auto">{slide.description}</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </main>

      <footer className="p-6">
        <div className="mb-6 flex justify-center gap-2">
          {onboardingSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={cn(
                'h-2 w-2 rounded-full bg-primary transition-all',
                current === index ? 'w-4 opacity-100' : 'opacity-30'
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        <div className="space-y-3 max-w-sm mx-auto">
          <Button size="lg" className="w-full" asChild>
            <Link href="/auth">Get Started</Link>
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link href="/auth" className="font-semibold text-primary hover:underline">
                Log In
            </Link>
          </p>
        </div>
        <div className="flex justify-center gap-4 mt-6 text-sm">
            <Link href="/about" className="text-primary hover:underline transition-colors">About</Link>
            <Link href="/contact" className="text-primary hover:underline transition-colors">Contact</Link>
            <Link href="/terms" className="text-primary hover:underline transition-colors">Terms</Link>
            <Link href="/privacy" className="text-primary hover:underline transition-colors">Privacy</Link>
        </div>
      </footer>
    </div>
  );
}
