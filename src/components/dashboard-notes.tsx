
'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, BookOpen } from "lucide-react";
import { notesData } from "@/lib/notes-data";
import Link from "next/link";

export function DashboardNotes() {
  
  return (
    <Card className="flex-1 flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <FileText />
            Available Notes
        </CardTitle>
        <CardDescription>Browse and read notes shared by your teachers.</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <ScrollArea className="flex-1 -mx-6">
            <div className="px-6 space-y-4">
            {notesData.map((note) => (
                <div key={note.id} className="flex items-center justify-between p-3 -m-3 rounded-lg hover:bg-muted/50">
                    <div>
                        <p className="font-medium">{note.title}</p>
                        <p className="text-sm text-muted-foreground">{note.subject} • By {note.author}</p>
                    </div>
                    <Button variant="secondary" size="sm" asChild>
                      <Link href={`/notes/view?pdf=${encodeURIComponent(note.pdfUrl)}&subject=${note.subject.toLowerCase()}`}>
                        <BookOpen className="mr-2 h-4 w-4" />
                        Read Note
                      </Link>
                    </Button>
                </div>
            ))}
            </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
