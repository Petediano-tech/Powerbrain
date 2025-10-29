'use client';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { UploadCloud, FileText } from 'lucide-react';

export default function DocumentReaderPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (file.type === 'application/pdf') {
        setSelectedFile(file);
        const url = URL.createObjectURL(file);
        setFileUrl(url);
      } else {
        alert('Please select a PDF file.');
        setSelectedFile(null);
        setFileUrl(null);
      }
    }
  };

  // Clean up the object URL when the component unmounts or the file changes
  useEffect(() => {
    return () => {
      if (fileUrl) {
        URL.revokeObjectURL(fileUrl);
      }
    };
  }, [fileUrl]);

  return (
    <div className="container mx-auto p-4 space-y-6 flex flex-col h-full">
      <div>
        <h2 className="text-2xl font-bold">Document Reader</h2>
        <p className="text-muted-foreground">Upload and view your PDF documents directly in the app.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upload PDF</CardTitle>
          <CardDescription>Select a PDF file from your device to get started.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row items-center gap-4">
          <label htmlFor="pdf-upload" className="w-full sm:w-auto">
            <Button asChild>
                <div className="cursor-pointer">
                    <UploadCloud className="mr-2 h-4 w-4" />
                    Choose File
                </div>
            </Button>
            <Input id="pdf-upload" type="file" accept="application/pdf" className="sr-only" onChange={handleFileChange} />
          </label>
          {selectedFile && <p className="text-sm text-muted-foreground">Selected: {selectedFile.name}</p>}
        </CardContent>
      </Card>

      <Card className="flex-grow flex flex-col">
        <CardHeader>
          <CardTitle>{selectedFile ? selectedFile.name : "Document Viewer"}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow flex items-center justify-center bg-muted/50 rounded-b-lg p-0">
          {fileUrl ? (
            <iframe src={fileUrl} className="w-full h-full border-0" title={selectedFile?.name || 'PDF Viewer'} />
          ) : (
            <div className="text-center text-muted-foreground p-6">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
              <p>Your PDF will be displayed here once uploaded.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
