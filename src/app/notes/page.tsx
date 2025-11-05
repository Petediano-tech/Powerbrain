'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle, Save, Trash2, BookOpen, FileText } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { useUser, useFirestore, useCollection, useMemoFirebase } from "@/firebase";
import { collection, doc, addDoc, updateDoc, deleteDoc, serverTimestamp, query, orderBy } from "firebase/firestore";
import { useUserStore } from "@/hooks/use-user-store";
import { formatDistanceToNow } from 'date-fns';
import { Skeleton } from "@/components/ui/skeleton";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

type UserNote = {
    id: string;
    title: string;
    content: string;
    subject?: string;
    updatedAt: any; // Firestore Timestamp
};

export default function NotesPage() {
    const { user } = useUser();
    const { profileId } = useUserStore();
    const firestore = useFirestore();
    const { toast } = useToast();

    const notesCollectionRef = useMemoFirebase(
        () => profileId ? query(collection(firestore, `userProfiles/${profileId}/notes`), orderBy('updatedAt', 'desc')) : null,
        [firestore, profileId]
    );

    const { data: notes, isLoading: isLoadingNotes } = useCollection<UserNote>(notesCollectionRef);

    const [selectedNote, setSelectedNote] = useState<UserNote | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (!isLoadingNotes && notes && notes.length > 0 && !selectedNote && !isCreating) {
            setSelectedNote(notes[0]);
        }
    }, [notes, isLoadingNotes, selectedNote, isCreating]);

    const handleSelectNote = (note: UserNote) => {
        setSelectedNote(note);
        setIsCreating(false);
    }

    const handleNewNote = () => {
        setSelectedNote({ id: 'new', title: '', content: '', subject: '', updatedAt: null });
        setIsCreating(true);
    }

    const handleSaveNote = async () => {
        if (!profileId || !selectedNote) return;
        setIsSaving(true);
        try {
            if (isCreating) {
                const newNoteRef = await addDoc(collection(firestore, `userProfiles/${profileId}/notes`), {
                    title: selectedNote.title || "Untitled Note",
                    content: selectedNote.content,
                    subject: selectedNote.subject || "",
                    createdAt: serverTimestamp(),
                    updatedAt: serverTimestamp(),
                });
                toast({ title: "Note Created!", description: "Your new note has been saved." });
                setIsCreating(false);
                // Manually setting selected note for immediate feedback until listener updates it.
                setSelectedNote({ ...selectedNote, id: newNoteRef.id, updatedAt: new Date() });
            } else {
                const noteRef = doc(firestore, `userProfiles/${profileId}/notes`, selectedNote.id);
                await updateDoc(noteRef, {
                    title: selectedNote.title,
                    content: selectedNote.content,
                    subject: selectedNote.subject,
                    updatedAt: serverTimestamp(),
                });
                toast({ title: "Note Saved!", description: "Your changes have been saved." });
            }
        } catch (error) {
            console.error("Error saving note:", error);
            toast({ variant: "destructive", title: "Error", description: "Could not save your note." });
        } finally {
            setIsSaving(false);
        }
    }
    
    const handleDeleteNote = async () => {
        if (!profileId || !selectedNote || isCreating) return;
        
        try {
            const noteRef = doc(firestore, `userProfiles/${profileId}/notes`, selectedNote.id);
            await deleteDoc(noteRef);
            toast({ title: "Note Deleted", description: "Your note has been moved to the trash." });
            setSelectedNote(null);
            setIsCreating(false);
        } catch (error) {
            console.error("Error deleting note:", error);
            toast({ variant: "destructive", title: "Error", description: "Could not delete your note." });
        }
    }


    return (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 h-[calc(100vh-10rem)]">
            {/* Notes List */}
            <div className="md:col-span-1 lg:col-span-1 flex flex-col gap-4">
                <Button onClick={handleNewNote} className="h-12">
                    <PlusCircle className="mr-2" />
                    New Note
                </Button>
                <Card className="flex-1 flex flex-col">
                    <CardHeader className="border-b">
                        <CardTitle className="flex items-center gap-2"><FileText /> My Notepad</CardTitle>
                    </CardHeader>
                    <CardContent className="p-2 flex-1 overflow-y-auto">
                        {isLoadingNotes ? (
                            <div className="space-y-2">
                                {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-20 w-full" />)}
                            </div>
                        ) : notes && notes.length > 0 ? (
                            <div className="space-y-1">
                                {notes.map(note => (
                                    <button 
                                        key={note.id} 
                                        onClick={() => handleSelectNote(note)}
                                        className={cn(
                                            `w-full text-left p-3 rounded-lg border-2 border-transparent transition-colors`,
                                            selectedNote?.id === note.id ? 'bg-muted border-primary/50' : 'hover:bg-muted/50'
                                        )}
                                    >
                                        <p className="font-semibold truncate">{note.title || "Untitled Note"}</p>
                                        <p className="text-xs text-muted-foreground truncate h-8">{note.content || "No content"}</p>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            {note.updatedAt ? formatDistanceToNow(note.updatedAt.toDate(), { addSuffix: true }) : 'Just now'}
                                        </p>
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center p-4 text-muted-foreground">No notes yet. Create one!</div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Note Editor */}
            <div className="md:col-span-2 lg:col-span-3">
                {selectedNote ? (
                    <Card className="h-full flex flex-col">
                        <CardHeader className="border-b p-4">
                             <Input 
                                className="text-2xl font-bold border-none shadow-none focus-visible:ring-0 p-0 h-auto"
                                placeholder="My Awesome Note Title"
                                value={selectedNote.title}
                                onChange={(e) => setSelectedNote({...selectedNote, title: e.target.value})}
                                disabled={isSaving}
                            />
                            <div className="flex items-center gap-2 pt-2">
                                <Label htmlFor="subject-tag" className="text-xs text-muted-foreground">Tag:</Label>
                                <Input 
                                    id="subject-tag"
                                    placeholder="e.g., Mathematics"
                                    className="h-6 text-xs p-1 border-none focus-visible:ring-1 focus-visible:ring-ring rounded-sm w-fit"
                                    value={selectedNote.subject || ''}
                                    onChange={(e) => setSelectedNote({...selectedNote, subject: e.target.value})}
                                    disabled={isSaving}
                                />
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1 flex p-0">
                            <Textarea 
                                className="w-full h-full border-none shadow-none focus-visible:ring-0 p-4 resize-none text-base"
                                placeholder="Start writing your notes here..."
                                value={selectedNote.content}
                                onChange={(e) => setSelectedNote({...selectedNote, content: e.target.value})}
                                disabled={isSaving}
                            />
                        </CardContent>
                        <CardContent className="p-4 border-t flex justify-end gap-2">
                            {!isCreating && (
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant="destructive" disabled={isSaving}>
                                            <Trash2 className="mr-2"/>
                                            Delete
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This action cannot be undone. This will permanently delete your note.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={handleDeleteNote}>Delete</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            )}
                            <Button onClick={handleSaveNote} disabled={isSaving}>
                                <Save className="mr-2"/>
                                {isSaving ? "Saving..." : "Save Note"}
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center p-10 border-2 border-dashed rounded-lg bg-muted/20">
                        <BookOpen className="h-16 w-16 text-muted-foreground mb-4" />
                        <h2 className="text-2xl font-bold">Select a note</h2>
                        <p className="text-muted-foreground">Choose a note from the left to read or edit it, or create a new one.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
