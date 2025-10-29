
'use client';
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { BarChart2, Bot, Send, Sparkles, AlertTriangle, FileUp, Upload } from "lucide-react";
import { aiGradeQuizzes, AiGradeQuizzesOutput } from "@/ai/flows/ai-grade-quizzes";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { useAuth, useFirestore, useUser } from "@/firebase";
import { getApp } from "firebase/app";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";

export default function TeacherPage() {
  // Grading state
  const [studentAnswer, setStudentAnswer] = useState('');
  const [gradingRubric, setGradingRubric] = useState('');
  const [isGrading, setIsGrading] = useState(false);
  const [gradingResult, setGradingResult] = useState<AiGradeQuizzesOutput | null>(null);
  const [gradingError, setGradingError] = useState<string | null>(null);

  // Upload state
  const [noteFile, setNoteFile] = useState<File | null>(null);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteSubject, setNoteSubject] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const { user } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();


  const handleGradeWithAI = async () => {
    if (!studentAnswer || !gradingRubric) {
      setGradingError("Please provide both the student's answer and the grading rubric.");
      return;
    }
    setGradingError(null);
    setIsGrading(true);
    setGradingResult(null);

    try {
      const result = await aiGradeQuizzes({
        quizContent: "Short-answer question based on provided rubric.",
        studentAnswers: studentAnswer,
        teacherInstructions: gradingRubric,
      });
      setGradingResult(result);
    } catch (e) {
      console.error(e);
      setGradingError("The AI assistant failed to provide a grade. Please try again.");
    } finally {
      setIsGrading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNoteFile(e.target.files[0]);
    }
  };

  const handleUploadNote = async () => {
    if (!noteFile || !noteTitle || !noteSubject || !user) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please select a file, enter a title, and subject.",
      });
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    const app = getApp();
    const storage = getStorage(app);
    
    // Create a unique filename
    const storageRef = ref(storage, `notes/${Date.now()}_${noteFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, noteFile);

    uploadTask.on(
      'state_changed',
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
        await addDoc(collection(firestore, "notes"), {
          title: noteTitle,
          subject: noteSubject,
          author: user.displayName || "Teacher",
          pdfUrl: downloadURL,
          imageUrl: `https://picsum.photos/seed/${noteTitle.replace(/\s/g, '-')}/400/200`,
          imageHint: `${noteSubject} textbook`,
          createdAt: serverTimestamp(),
        });

        toast({
          title: "Upload Complete!",
          description: `"${noteTitle}" has been successfully uploaded.`,
        });

        // Reset form
        setIsUploading(false);
        setNoteFile(null);
        setNoteTitle('');
        setNoteSubject('');
        setUploadProgress(0);
      }
    );
  };


  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">Teacher's Corner</h2>
        <p className="text-muted-foreground">Manage your digital classroom, upload resources, and track student progress.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Upload /> Upload Notes</CardTitle>
            <CardDescription>Share PDF notes with your students. The file will be stored securely in the cloud.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="note-title">Note Title</Label>
              <Input id="note-title" placeholder="e.g., Introduction to Photosynthesis" value={noteTitle} onChange={(e) => setNoteTitle(e.target.value)} disabled={isUploading} />
            </div>
             <div className="space-y-2">
              <Label htmlFor="note-subject">Subject</Label>
              <Input id="note-subject" placeholder="e.g., Biology" value={noteSubject} onChange={(e) => setNoteSubject(e.target.value)} disabled={isUploading} />
            </div>
            <div className="space-y-2">
               <Label htmlFor="note-file">PDF File</Label>
               <Input id="note-file" type="file" accept=".pdf" onChange={handleFileChange} disabled={isUploading} />
            </div>
            {isUploading && (
                <div className="space-y-2">
                    <Progress value={uploadProgress} className="h-3" />
                    <p className="text-sm text-muted-foreground text-center">{uploadProgress.toFixed(0)}%</p>
                </div>
            )}
          </CardContent>
          <CardFooter>
             <Button onClick={handleUploadNote} disabled={isUploading || !noteFile || !noteTitle || !noteSubject} className="w-full">
              {isUploading ? "Uploading..." : <><FileUp className="mr-2 h-4 w-4" /> Upload Note</>}
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
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" disabled>Go to Analytics</Button>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Bot /> AI Grading Assistant</CardTitle>
          <CardDescription>Auto-mark quizzes and get feedback suggestions for short-answer questions.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea placeholder="Paste student's short-answer response here..." rows={5} value={studentAnswer} onChange={e => setStudentAnswer(e.target.value)} />
          <Textarea placeholder="Provide the correct answer or grading rubric..." rows={3} value={gradingRubric} onChange={e => setGradingRubric(e.target.value)}/>
           {gradingError && (
            <div className="flex items-center gap-2 text-sm text-destructive">
              <AlertTriangle className="h-4 w-4" />
              <p>{gradingError}</p>
            </div>
           )}
        </CardContent>
        <CardFooter className="flex-col items-start gap-4">
          <Button className="bg-sky-blue hover:bg-sky-blue/90 text-background" onClick={handleGradeWithAI} disabled={isGrading}>
            {isGrading ? (
              <>
                <Sparkles className="mr-2 h-4 w-4 animate-pulse" />
                Grading...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Grade with AI
              </>
            )}
          </Button>
          {isGrading && <Skeleton className="h-24 w-full" />}
          {gradingResult && (
            <div className="space-y-4 p-4 border rounded-lg bg-muted/50 w-full">
              <div>
                <h4 className="font-semibold">Suggested Grade: <span className="text-primary font-bold text-lg">{gradingResult.grade}</span></h4>
              </div>
              <div>
                 <h4 className="font-semibold">Feedback:</h4>
                 <p className="text-sm text-muted-foreground">{gradingResult.feedback}</p>
              </div>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
