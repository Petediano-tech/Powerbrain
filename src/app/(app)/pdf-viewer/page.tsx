'use client';
import { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { UploadCloud, FileText, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from 'lucide-react';

export default function DocumentReaderPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mainFileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
    } else if (file) {
      alert('Please select a PDF file.');
      setSelectedFile(null);
      // Reset the input value if the file is not a PDF
      if (event.target) {
        event.target.value = '';
      }
    }
  };

  // This effect creates and cleans up the object URL.
  useEffect(() => {
    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setFileUrl(objectUrl);

      // This is the cleanup function. It runs when the component unmounts
      // OR when the `selectedFile` dependency changes (before the effect runs again).
      return () => {
        URL.revokeObjectURL(objectUrl);
        setFileUrl(null); // Clean up the state
      };
    }
  }, [selectedFile]); // This effect ONLY runs when `selectedFile` changes.

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const triggerMainFileUpload = () => {
    mainFileInputRef.current?.click();
  }

  return (
    <div className="flex flex-col h-full bg-muted/30 rounded-lg border">
      {/* Header Toolbar */}
      <header className="flex items-center justify-between p-2 border-b bg-background rounded-t-lg">
        <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={triggerFileUpload}>
                <div className="cursor-pointer flex items-center gap-2">
                    <UploadCloud className="h-4 w-4" />
                    <span>{selectedFile ? 'Change PDF' : 'Upload PDF'}</span>
                </div>
            </Button>
            <Input id="pdf-upload" type="file" accept="application/pdf" className="sr-only" onChange={handleFileChange} ref={fileInputRef}/>
           {selectedFile && (
            <p className="text-sm text-muted-foreground border-l pl-2 hidden md:block">
              {selectedFile.name}
            </p>
          )}
        </div>
        
        <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" disabled>
                <ChevronLeft className="h-5 w-5" />
            </Button>
            <span className="text-sm text-muted-foreground w-16 text-center">
                1 / 1
            </span>
            <Button variant="ghost" size="icon" disabled>
                <ChevronRight className="h-5 w-5" />
            </Button>
            <div className="w-px h-6 bg-border mx-2"></div>
             <Button variant="ghost" size="icon" disabled>
                <ZoomOut className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" disabled>
                <ZoomIn className="h-5 w-5" />
            </Button>
        </div>
      </header>

      {/* Document Viewer Area */}
      <main className="flex-grow flex items-center justify-center p-0">
        {fileUrl ? (
          <iframe src={fileUrl} className="w-full h-full border-0" title={selectedFile?.name || 'PDF Viewer'} />
        ) : (
          <div className="text-center text-muted-foreground p-6 flex flex-col items-center">
            <FileText className="mx-auto h-16 w-16 text-muted-foreground/30 mb-4" />
            <h3 className="text-xl font-semibold text-foreground/80 mb-1">Document Reader</h3>
            <p>Upload a PDF file to start reading your notes.</p>
            <Button asChild className="mt-6">
                <div className="cursor-pointer" onClick={triggerMainFileUpload}>
                    <UploadCloud className="mr-2 h-4 w-4" />
                    Upload PDF
                </div>
            </Button>
            <Input id="pdf-upload-main" type="file" accept="application/pdf" className="sr-only" onChange={handleFileChange} ref={mainFileInputRef}/>
          </div>
        )}
      </main>
    </div>
  );
}
