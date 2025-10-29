
'use client';

import { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Download, AlertTriangle } from 'lucide-react';
import { capitalize } from '@/lib/utils';
import Link from 'next/link';

function PDFViewer() {
  const searchParams = useSearchParams();
  const pdfUrl = searchParams.get('pdf');
  const subject = searchParams.get('subject');
  const router = useRouter();

  if (!pdfUrl || pdfUrl === '#') {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-4">
        <AlertTriangle className="w-16 h-16 text-destructive mb-4" />
        <h2 className="text-2xl font-bold mb-2">PDF Not Available</h2>
        <p className="text-muted-foreground mb-6">
          The link for this note is missing or has not been set up yet.
        </p>
        <Button onClick={() => router.back()}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="flex items-center justify-between p-4 border-b bg-background sticky top-0 z-10">
        <Button variant="outline" onClick={() => router.back()}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
        </Button>
        <div className="text-center">
            {subject && <h1 className="text-lg font-semibold">{capitalize(subject)} Note</h1>}
        </div>
        <Button asChild>
          <a href={pdfUrl} download target="_blank" rel="noopener noreferrer">
            <Download className="mr-2 h-4 w-4" />
            Download
          </a>
        </Button>
      </div>
      <div className="flex-1">
        <iframe
          src={`https://docs.google.com/gview?url=${encodeURIComponent(pdfUrl)}&embedded=true`}
          className="w-full h-full border-0"
          title="PDF Viewer"
        />
      </div>
    </div>
  );
}

export default function NoteViewPage() {
  return (
    <Suspense fallback={<div className="flex h-screen w-screen items-center justify-center">Loading PDF...</div>}>
        <PDFViewer />
    </Suspense>
  );
}
