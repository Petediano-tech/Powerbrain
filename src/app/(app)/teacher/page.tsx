'use client';
import { useState, ChangeEvent } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useFirestore, useUser, useFirebaseApp } from "@/firebase";
import { BarChart2, UploadCloud } from "lucide-react";

export default function TeacherPage() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const firestore = useFirestore();
  const { user } = useUser();
  const app = useFirebaseApp();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type !== 'application/pdf') {
        toast({
          variant: "destructive",
          title: "Invalid File Type",
          description: "Please select a PDF file.",
        });
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleUploadNote = async () => {
    if (!file || !title || !subject || !user) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please select a file, enter a title, and subject.",
      });
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    const storage = getStorage(app);
    // Create a unique file path
    const storageRef = ref(storage, `notes/${Date.now()}_${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.error("Upload failed:", error);
        toast({
          variant: "destructive",
          title: "Upload Failed",
          description: "There was an error uploading your note. Please try again.",
        });
        setIsUploading(false);
      },
      async () => {
        // Upload completed successfully, now get the download URL
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        
        // Save note metadata to Firestore
        try {
          await addDoc(collection(firestore, "notes"), {
            title: title,
            subject: subject,
            pdfUrl: downloadURL,
            author: user.displayName || "Teacher",
            createdAt: serverTimestamp(),
            // Use a placeholder image for now, can be improved later
            imageUrl: `https://picsum.photos/seed/${title.replace(/\s/g, '-')}/400/200`,
            imageHint: 'textbook cover'
          });

          toast({
            title: "Upload Successful",
            description: `"${title}" has been added to the notes.`,
          });

        } catch (error) {
           console.error("Error saving note to Firestore:", error);
           toast({
             variant: "destructive",
             title: "Save Failed",
             description: "The file was uploaded but we couldn't save it to the notes list.",
           });
        } finally {
            // Reset form
            setFile(null);
            setTitle('');
            setSubject('');
            setUploadProgress(0);
            setIsUploading(false);
        }
      }
    );
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">Teacher's Corner</h2>
        <p className="text-muted-foreground">Manage your digital classroom and track student progress.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><UploadCloud /> Upload Notes & PDFs</CardTitle>
            <CardDescription>Share study materials with your students by uploading them here.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="space-y-2">
                <Label htmlFor="title">Note Title</Label>
                <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., Introduction to Photosynthesis" disabled={isUploading} />
            </div>
             <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="e.g., Biology" disabled={isUploading} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pdf-file">PDF File</Label>
              <Input id="pdf-file" type="file" accept="application/pdf" onChange={handleFileChange} disabled={isUploading} />
            </div>
            {isUploading && (
              <div className="space-y-2">
                <Label>Upload Progress</Label>
                <Progress value={uploadProgress} />
                <p className="text-sm text-muted-foreground text-center">{Math.round(uploadProgress)}%</p>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handleUploadNote} disabled={isUploading || !file || !title || !subject}>
              {isUploading ? "Uploading..." : "Upload Note"}
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><BarChart2 /> View Student Performance</CardTitle>
            <CardDescription>Access analytics and performance charts.</CardDescription>
          </CardHeader>
          <CardContent className="text-center py-10 flex flex-col items-center justify-center">
            <BarChart2 className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <p className="text-muted-foreground">Performance dashboards are coming soon.</p>
            <p className="text-xs text-muted-foreground">This feature is under active development.</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" disabled>Go to Analytics</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
