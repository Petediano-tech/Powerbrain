
'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Book, Eye } from "lucide-react";
import Link from "next/link";

const dummySets = [
    { id: '1', title: 'Biology Chapter 1 Vocab', subject: 'Biology', cardCount: 25 },
    { id: '2', title: 'Key Dates in Malawian History', subject: 'History', cardCount: 40 },
    { id: '3', title: 'Algebraic Formulas', subject: 'Mathematics', cardCount: 15 },
];

export default function FlashcardsPage() {

    // TODO: Fetch user's flashcard sets from Firestore

    return (
        <div className="space-y-6">
            <div className="flex justify-end">
                <Button>
                    <PlusCircle className="mr-2" />
                    Create New Set
                </Button>
            </div>

            {dummySets.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {dummySets.map(set => (
                        <Card key={set.id} className="flex flex-col hover:border-primary transition-colors">
                            <CardHeader>
                                <CardTitle>{set.title}</CardTitle>
                                <CardDescription>{set.subject}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1 flex items-center justify-between text-sm text-muted-foreground">
                                <span>{set.cardCount} cards</span>
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
                    <CardTitle className="text-2xl mb-2">No Flashcard Sets Yet</CardTitle>
                    <CardDescription className="mb-6 max-w-sm">Create your first set of flashcards to start studying key facts, formulas, and vocabulary.</CardDescription>
                    <Button>
                        <PlusCircle className="mr-2" />
                        Create Your First Set
                    </Button>
                </Card>
            )}
        </div>
    );
}
