
'use client';

import { useDoc, useFirestore, useMemoFirebase } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, FileText, BarChart2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ClassDetailsPage() {
    const params = useParams();
    const classId = params.classId as string;
    const firestore = useFirestore();

    const classRef = useMemoFirebase(() => doc(firestore, 'classes', classId), [firestore, classId]);
    const { data: classData, isLoading } = useDoc(classRef);

    if (isLoading) {
        return (
            <div className="space-y-6">
                <Skeleton className="h-8 w-1/2" />
                <Skeleton className="h-4 w-1/3" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-24 w-full" />
                </div>
                <Skeleton className="h-64 w-full mt-6" />
            </div>
        )
    }

    if (!classData) {
        return (
            <Card className="text-center p-8">
                <CardTitle>Class Not Found</CardTitle>
                <CardDescription>The class you are looking for does not exist.</CardDescription>
            </Card>
        )
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">{classData.name}</h1>
                <p className="text-muted-foreground">{classData.subject}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Enrolled Students</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{classData.studentIds?.length || 0}</div>
                        <p className="text-xs text-muted-foreground">students have joined this class</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                        <BarChart2 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">78%</div>
                        <p className="text-xs text-muted-foreground">across all assignments</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Active Assignments</CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">3</div>
                        <p className="text-xs text-muted-foreground">assignments currently active</p>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="students">
                <TabsList>
                    <TabsTrigger value="students">Students</TabsTrigger>
                    <TabsTrigger value="assignments">Assignments</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>
                <TabsContent value="students">
                    <Card>
                        <CardHeader>
                            <CardTitle>Student Roster</CardTitle>
                             <CardDescription>List of all students enrolled in this class.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>Student list coming soon.</p>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="assignments">
                    <Card>
                        <CardHeader>
                            <CardTitle>Class Assignments</CardTitle>
                            <div className="flex justify-between items-center">
                                <CardDescription>Manage and create assignments for this class.</CardDescription>
                                <Button>Create Assignment</Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                           <p>Assignment management coming soon.</p>
                        </CardContent>
                    </Card>
                </TabsContent>
                 <TabsContent value="analytics">
                    <Card>
                        <CardHeader>
                            <CardTitle>Performance Analytics</CardTitle>
                            <CardDescription>Detailed insights into your students' performance.</CardDescription>
                        </CardHeader>
                        <CardContent>
                           <p>Analytics coming soon.</p>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
