
'use client';
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Crown, Medal, Trophy } from "lucide-react";
import { useUser, useCollection, useMemoFirebase } from "@/firebase";
import { collection, getFirestore, query, orderBy, limit } from "firebase/firestore";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const getInitials = (name: string) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
};

const getRankIcon = (rank: number) => {
  if (rank === 1) return <Crown className="h-6 w-6 text-yellow-400 fill-yellow-400" />;
  if (rank === 2) return <Medal className="h-6 w-6 text-slate-400 fill-slate-400" />;
  if (rank === 3) return <Trophy className="h-6 w-6 text-amber-600 fill-amber-600" />;
  return <span className="font-bold text-lg w-6 text-center">{rank}</span>;
};

const avatarColors = [
    "bg-gradient-to-br from-red-500 to-orange-500",
    "bg-gradient-to-br from-green-500 to-emerald-500",
    "bg-gradient-to-br from-blue-500 to-indigo-500",
    "bg-gradient-to-br from-purple-500 to-violet-500",
    "bg-gradient-to-br from-pink-500 to-rose-500",
];

export default function LeaderboardPage() {
    const { user } = useUser();
    const firestore = getFirestore();

    const leaderboardQuery = useMemoFirebase(() => {
        return query(collection(firestore, 'leaderboard'), orderBy('averageScore', 'desc'), limit(10));
    }, [firestore]);
    
    const { data: leaderboardData, isLoading } = useCollection(leaderboardQuery);

    const getAvatarColor = (id: string) => {
        const hash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        return avatarColors[hash % avatarColors.length];
    }

  return (
    <div className="space-y-6">
       <div>
        <h2 className="text-2xl font-bold">Leaderboard</h2>
        <p className="text-muted-foreground">See how you rank against other learners!</p>
      </div>
      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-4 space-y-2">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-center gap-4 p-2">
                        <Skeleton className="h-8 w-8" />
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <Skeleton className="h-6 flex-1" />
                        <Skeleton className="h-6 w-20" />
                    </div>
                ))}
            </div>
          ) : (
            <ul className="divide-y">
              {leaderboardData?.map((userData, index) => {
                const rank = index + 1;
                const isCurrentUser = userData.id === user?.uid;

                return (
                  <li
                    key={userData.id}
                    className={cn("flex items-center justify-between p-4 transition-colors", isCurrentUser ? "bg-primary/10" : "hover:bg-muted/50")}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-8 text-center flex justify-center">{getRankIcon(rank)}</div>
                      <Avatar className="h-10 w-10 border-2 border-muted">
                        {userData.profilePicture && <AvatarImage src={userData.profilePicture} alt={userData.name} />}
                        <AvatarFallback className={cn("font-bold text-white", getAvatarColor(userData.id))}>
                          {getInitials(userData.name)}
                        </AvatarFallback>
                      </Avatar>
                      <span className={cn("font-medium", isCurrentUser ? "text-primary" : "")}>
                        {userData.name}
                        {isCurrentUser ? ' (You)' : ''}
                      </span>
                    </div>
                    <span className="font-bold text-lg text-primary">{(userData.averageScore || 0).toFixed(0)} pts</span>
                  </li>
                );
              })}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
