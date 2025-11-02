'use client';
import { AITutor } from '@/components/ai-tutor';

export default function AITutorPage() {
  return (
    // The h-full class with a fixed layout in the parent will make it take up available space
    <div className="h-full">
      <AITutor />
    </div>
  );
}
