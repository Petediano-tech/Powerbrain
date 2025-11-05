
'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle, Save, Trash2, BookOpen } from "lucide-react";
import { useState } from "react";

// This is a dummy structure. In a real app, this would come from Firestore.
const dummyNotes = [
    { id: '1', title: 'My Thoughts on Photosynthesis', content: 'It seems pretty important for plants. They use sunlight to make food. CO2 + Water -> Glucose + Oxygen.', subject: 'Biology', updatedAt: '2 hours ago' },
    { id: '2', title: 'English Exam Prep', content: 'Remember to practice essay writing. Focus on introduction, body paragraphs, and conclusion.', subject: 'English', updatedAt: '1 day ago' },
];

type Note = {
    id: string;
    title: string;
    content: string;
    subject: string;
    updatedAt: string;
}

export default function NotesPage() {

    const [notes, setNotes] = useState(dummyNotes);
    const [selectedNote, setSelectedNote] = useState<Note | null>(null);
    const [isCreating, setIsCreating] = useState(false);

    const handleSelectNote = (note: Note) => {
        setSelectedNote(note);
        setIsCreating(false);
    }

    const handleNewNote = () => {
        setSelectedNote({id: 'new', title: '', content: '', subject: '', updatedAt: ''});
        setIsCreating(true);
    }

    const handleSaveNote = () => {
        // TODO: Implement Firestore save logic
        console.log("Saving note:", selectedNote);
        alert("Note saving is not implemented yet.");
        // After saving, you'd refetch or update the local state.
    }
    
    const handleDeleteNote = () => {
         // TODO: Implement Firestore delete logic
        if (selectedNote && confirm("Are you sure you want to delete this note?")) {
            console.log("Deleting note:", selectedNote);
            alert("Note deletion is not implemented yet.");
             // After deleting, clear selection and update local state
        }
    }


    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-10rem)]">
            {/* Notes List */}
            <div className="md:col-span-1 flex flex-col gap-4">
                <Button onClick={handleNewNote}>
                    <PlusCircle className="mr-2" />
                    New Note
                </Button>
                <Card className="flex-1">
                    <CardHeader>
                        <CardTitle>My Notepad</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        {notes.map(note => (
                             <button 
                                key={note.id} 
                                onClick={() => handleSelectNote(note)}
                                className={`w-full text-left p-3 rounded-lg border transition-colors ${selectedNote?.id === note.id ? 'bg-muted border-primary' : 'hover:bg-muted/50'}`}
                             >
                                <p className="font-semibold truncate">{note.title}</p>
                                <p className="text-xs text-muted-foreground truncate">{note.content}</p>
                                <p className="text-xs text-muted-foreground mt-1">{note.updatedAt}</p>
                            </button>
                        ))}
                    </CardContent>
                </Card>
            </div>

            {/* Note Editor */}
            <div className="md:col-span-2">
                {selectedNote ? (
                    <Card className="h-full flex flex-col">
                        <CardHeader>
                            <Input 
                                className="text-2xl font-bold border-none shadow-none focus-visible:ring-0 p-0"
                                placeholder="My Awesome Note Title"
                                value={selectedNote.title}
                                onChange={(e) => setSelectedNote({...selectedNote, title: e.target.value})}
                            />
                        </CardHeader>
                        <CardContent className="flex-1 flex">
                            <Textarea 
                                className="w-full h-full border-none shadow-none focus-visible:ring-0 p-0 resize-none text-base"
                                placeholder="Start writing your notes here..."
                                value={selectedNote.content}
                                onChange={(e) => setSelectedNote({...selectedNote, content: e.target.value})}
                            />
                        </CardContent>
                        <CardContent className="pb-4">
                            <Label htmlFor="subject-tag">Subject Tag</Label>
                            <Input 
                                id="subject-tag"
                                placeholder="e.g., Mathematics"
                                value={selectedNote.subject}
                                onChange={(e) => setSelectedNote({...selectedNote, subject: e.target.value})}
                            />
                        </CardContent>
                        <CardContent className="flex justify-end gap-2">
                            {!isCreating && (
                                <Button variant="destructive" onClick={handleDeleteNote}>
                                    <Trash2 className="mr-2"/>
                                    Delete
                                </Button>
                            )}
                            <Button onClick={handleSaveNote}>
                                <Save className="mr-2"/>
                                Save Note
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center p-10 border-2 border-dashed rounded-lg">
                        <BookOpen className="h-16 w-16 text-muted-foreground mb-4" />
                        <h2 className="text-2xl font-bold">Select a note</h2>
                        <p className="text-muted-foreground">Choose a note from the left to read or edit it, or create a new one.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
