'use client';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { UploadCloud, FileText } from 'lucide-react';

export default function PdfViewerPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (file.type === 'application/pdf') {
        setSelectedFile(file);
        setFileName(file.name);
      } else {
        alert('Please select a PDF file.');
      }
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div>
        <h2 className="text-2xl font-bold">PDF Viewer</h2>
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
          {fileName && <p className="text-sm text-muted-foreground">Selected: {fileName}</p>}
        </CardContent>
      </Card>

      <Card className="flex-grow">
        <CardHeader>
          <CardTitle>Document</CardTitle>
        </CardHeader>
        <CardContent className="h-[60vh] flex items-center justify-center bg-muted/50 rounded-b-lg">
          {selectedFile ? (
            <div className="text-center text-muted-foreground">
              <p>PDF rendering area. Logic to display "{fileName}" would go here.</p>
            </div>
          ) : (
            <div className="text-center text-muted-foreground">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
              <p>Your PDF will be displayed here once uploaded.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
