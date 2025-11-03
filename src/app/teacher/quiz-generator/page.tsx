'use client';
import { AIQuizGenerator } from '@/components/ai-quiz-generator';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AIQuizGeneratorPage() {
    const router = useRouter();

  return (
    <div className="space-y-6">
        <div className="flex items-center gap-4">
             <Button variant="outline" onClick={() => router.back()}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
            </Button>
        </div>
        <AIQuizGenerator />
    </div>
  );
}
