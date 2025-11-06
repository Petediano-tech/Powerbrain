
'use client';
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Book, Eye, Layers } from "lucide-react";
import Link from "next/link";
import { useUser, useFirestore, useCollection, useMemoFirebase } from "@/firebase";
import { collection, query, addDoc, serverTimestamp } from "firebase/firestore";
import { useUserStore } from "@/hooks/use-user-store";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { subjectsData } from "@/lib/subjects-data";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type FlashcardSet = {
    id: string;
    title: string;
    subject: string;
    cardCount?: number; // cardCount might not be stored directly on the set
};

export default function FlashcardsPage() {
    const { user } = useUser();
    const { profileId } = useUserStore();
    const firestore = useFirestore();
    const { toast } = useToast();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [newSetTitle, setNewSetTitle] = useState('');
    const [newSetSubject, setNewSetSubject] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const flashcardSetsCollectionRef = useMemoFirebase(
        () => profileId ? collection(firestore, `userProfiles/${profileId}/flashcardSets`) : null,
        [firestore, profileId]
    );

    const { data: sets, isLoading } = useCollection<FlashcardSet>(flashcardSetsCollectionRef);

    const handleCreateSet = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!profileId || !newSetTitle || !newSetSubject) {
            toast({ variant: "destructive", title: "Missing Information", description: "Please provide a title and subject." });
            return;
        }
        setIsSubmitting(true);

        try {
            await addDoc(collection(firestore, `userProfiles/${profileId}/flashcardSets`), {
                title: newSetTitle,
                subject: newSetSubject,
                createdAt: serverTimestamp(),
            });
            toast({ title: "Set Created!", description: "Your new flashcard set has been saved." });
            setIsDialogOpen(false);
            setNewSetTitle('');
            setNewSetSubject('');
        } catch (error) {
            console.error("Error creating flashcard set:", error);
            toast({ variant: "destructive", title: "Error", description: "Could not create flashcard set." });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-end">
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <PlusCircle className="mr-2" />
                            Create New Set
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Create New Flashcard Set</DialogTitle>
                            <DialogDescription>
                                Give your new set a title and assign it to a subject.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleCreateSet}>
                            <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Set Title</Label>
                                    <Input
                                        id="title"
                                        placeholder="e.g., Biology Chapter 1 Vocab"
                                        value={newSetTitle}
                                        onChange={(e) => setNewSetTitle(e.target.value)}
                                        disabled={isSubmitting}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="subject">Subject</Label>
                                    <Select onValueChange={setNewSetSubject} disabled={isSubmitting}>
                                        <SelectTrigger id="subject">
                                            <SelectValue placeholder="Select a subject" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {subjectsData.map(subject => (
                                                <SelectItem key={subject.id} value={subject.name}>{subject.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? "Creating..." : "Create Set"}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-48 w-full" />)}
                </div>
            ) : sets && sets.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sets.map(set => (
                        <Card key={set.id} className="flex flex-col hover:border-primary transition-colors">
                            <CardHeader>
                                <CardTitle>{set.title}</CardTitle>
                                <CardDescription>{set.subject}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1 flex items-center justify-between text-sm text-muted-foreground">
                                <span>{set.cardCount || 0} cards</span>
                                <Button variant="secondary" size="sm" asChild>
                                    <Link href={`/flashcards/${set.id}`}>
                                        <Eye className="mr-2 h-4 w-4" />
                                        Study
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <Card className="flex flex-col items-center justify-center text-center p-10 py-20 border-dashed">
                    <div className="p-4 bg-primary/10 rounded-full mb-4">
                         <Layers className="h-10 w-10 text-primary" />
                    </div>
                    <CardTitle className="text-2xl mb-2">No Flashcard Sets Yet</CardTitle>
                    <CardDescription className="mb-6 max-w-sm">Create your first set of flashcards to start studying key facts, formulas, and vocabulary.</CardDescription>
                    <Button onClick={() => setIsDialogOpen(true)}>
                        <PlusCircle className="mr-2" />
                        Create Your First Set
                    </Button>
                </Card>
            )}
        </div>
    );
}
