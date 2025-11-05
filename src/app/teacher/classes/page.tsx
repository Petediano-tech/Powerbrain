
'use client';
import { useState, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Users, ArrowRight, Clipboard, ClipboardCheck } from "lucide-react";
import Link from "next/link";
import { useUser, useFirestore, useCollection, useMemoFirebase } from "@/firebase";
import { collection, query, where, addDoc, serverTimestamp } from "firebase/firestore";
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm, zodResolver } from "@mantine/form";
import * as z from 'zod';
import { subjectsData } from '@/lib/subjects-data';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";


const createClassSchema = z.object({
  name: z.string().min(3, { message: "Class name must be at least 3 characters." }),
  subject: z.string().min(1, { message: "Please select a subject." }),
});


export default function TeacherClassesPage() {
    const { user } = useUser();
    const firestore = useFirestore();
    const { toast } = useToast();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const form = useForm({
        initialValues: {
            name: '',
            subject: '',
        },
        validate: zodResolver(createClassSchema),
    });

    const classesQuery = useMemoFirebase(
        () => user ? query(collection(firestore, 'classes'), where('teacherId', '==', user.uid)) : null,
        [firestore, user]
    );

    const { data: classes, isLoading } = useCollection(classesQuery);
    
    const generateJoinCode = () => {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        let result = '';
        for (let i = 0; i < 6; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    const handleCreateClass = async (values: z.infer<typeof createClassSchema>) => {
        if (!user) return;
        setIsSubmitting(true);
        
        try {
            await addDoc(collection(firestore, 'classes'), {
                name: values.name,
                subject: values.subject,
                teacherId: user.uid,
                studentIds: [],
                joinCode: generateJoinCode(),
                createdAt: serverTimestamp(),
            });
            toast({
                title: "Class Created!",
                description: "Your new class has been successfully created.",
            });
            form.reset();
            setIsDialogOpen(false);
        } catch (error) {
            console.error("Error creating class:", error);
            toast({
                variant: 'destructive',
                title: "Uh oh! Something went wrong.",
                description: "There was a problem creating your class.",
            });
        } finally {
            setIsSubmitting(false);
        }
    }
    
    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast({ title: "Copied!", description: "Join code copied to clipboard." });
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">My Classes</h1>
                    <p className="text-muted-foreground">Manage your classes, view student progress, and create assignments.</p>
                </div>
                 <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="h-12">
                            <PlusCircle className="mr-2" />
                            Create New Class
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Create a New Class</DialogTitle>
                            <DialogDescription>
                                Fill in the details below to create a new class. A unique join code will be generated for your students.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={form.onSubmit(handleCreateClass)} className="space-y-6">
                             <div className="space-y-2">
                                <Label htmlFor="name">Class Name</Label>
                                <Input
                                    id="name"
                                    placeholder="e.g., Form 4 Biology"
                                    {...form.getInputProps('name')}
                                />
                                {form.errors.name && <p className="text-sm text-destructive">{form.errors.name}</p>}
                            </div>

                             <div className="space-y-2">
                                <Label>Subject</Label>
                                <Select onValueChange={(value) => form.setFieldValue('subject', value)} >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a subject" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {subjectsData.map(subject => (
                                            <SelectItem key={subject.id} value={subject.name}>{subject.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {form.errors.subject && <p className="text-sm text-destructive">{form.errors.subject}</p>}
                            </div>
                            
                            <DialogFooter>
                                <Button type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? "Creating..." : "Create Class"}
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
            ) : classes && classes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {classes.map(cls => (
                        <Card key={cls.id} className="flex flex-col hover:border-primary transition-colors">
                            <CardHeader>
                                <CardTitle>{cls.name}</CardTitle>
                                <CardDescription>{cls.subject}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1 space-y-4">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Users className="h-5 w-5"/>
                                    <span>{cls.studentIds.length} Student{cls.studentIds.length !== 1 && 's'}</span>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium">Join Code</p>
                                    <div className="flex items-center gap-2">
                                        <Input readOnly value={cls.joinCode} className="font-mono bg-muted" />
                                        <Button size="icon" variant="ghost" onClick={() => copyToClipboard(cls.joinCode)}>
                                            <Clipboard className="h-5 w-5" />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                             <CardFooter>
                                <Button className="w-full" asChild>
                                    <Link href={`/teacher/classes/${cls.id}`}>
                                        View Class
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            ) : (
                 <Card className="flex flex-col items-center justify-center text-center p-10 py-20 border-dashed col-span-full">
                    <CardTitle className="text-2xl mb-2">No Classes Yet</CardTitle>
                    <CardDescription className="mb-6 max-w-sm">Create your first class to start managing students and assignments.</CardDescription>
                    <Button onClick={() => setIsDialogOpen(true)}>
                        <PlusCircle className="mr-2" />
                        Create Your First Class
                    </Button>
                </Card>
            )}
        </div>
    );
}
