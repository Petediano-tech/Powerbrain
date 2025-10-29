'use client';
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Crown, Medal, Trophy } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useUser } from "@/firebase";

const leaderboardData = [
  { rank: 1, name: "Thandiwe", score: 9850, avatarId: "user-avatar-1" },
  { rank: 2, name: "Chikondi", score: 9600, avatarId: "user-avatar-2" },
  { rank: 3, name: "Limbani", score: 9420, avatarId: "user-avatar-3" },
  { rank: 4, name: "Mphatso", score: 8900, avatarId: "user-avatar-4" },
  { rank: 5, name: "Kondwani", score: 8750, avatarId: "user-avatar-5" },
  { rank: 6, name: "Pemphero", score: 8500, avatarId: "user-avatar-6" },
  { rank: 7, name: "Ganizani", score: 8210, avatarId: "user-avatar-7" },
  { rank: 8, name: "Funani", score: 8050, avatarId: "user-avatar-8" },
  { rank: 9, name: "Dalitso", score: 7900, avatarId: "user-avatar-9" },
];

const getRankIcon = (rank: number) => {
  if (rank === 1) return <Crown className="h-6 w-6 text-yellow-400 fill-yellow-400" />;
  if (rank === 2) return <Medal className="h-6 w-6 text-slate-400 fill-slate-400" />;
  if (rank === 3) return <Trophy className="h-6 w-6 text-amber-600 fill-amber-600" />;
  return <span className="font-bold text-lg w-6 text-center">{rank}</span>;
};

const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
};

export default function LeaderboardPage() {
    const { user } = useUser();
    const currentUser = { rank: 8, name: user?.displayName || 'You', score: 8400, avatarId: "user-avatar", isCurrentUser: true };
    const sortedLeaderboard = [...leaderboardData, currentUser].sort((a,b) => b.score - a.score).map((u, i) => ({...u, rank: i+1}));

  return (
    <div className="space-y-6">
       <div>
        <h2 className="text-2xl font-bold">Leaderboard</h2>
        <p className="text-muted-foreground">See how you rank against other learners this month!</p>
      </div>
      <Card>
        <CardContent className="p-0">
          <ul className="divide-y">
            {sortedLeaderboard.map((userData) => {
              const avatar = PlaceHolderImages.find(p => p.id === userData.avatarId);
              return (
                <li
                  key={userData.rank}
                  className={`flex items-center justify-between p-4 transition-colors ${userData.isCurrentUser ? "bg-primary/10" : "hover:bg-muted/50"}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-8 text-center flex justify-center">{getRankIcon(userData.rank)}</div>
                    <Avatar className="h-10 w-10 border-2 border-muted">
                      <AvatarImage src={user?.isCurrentUser ? user?.photoURL ?? avatar?.imageUrl : avatar?.imageUrl} alt={userData.name} data-ai-hint={avatar?.imageHint} />
                      <AvatarFallback>{getInitials(userData.name)}</AvatarFallback>
                    </Avatar>
                    <span className={`font-medium ${userData.isCurrentUser ? "text-primary" : ""}`}>{userData.name}{userData.isCurrentUser ? ' (You)' : ''}</span>
                  </div>
                  <span className="font-bold text-lg text-primary">{userData.score.toLocaleString()} pts</span>
                </li>
              );
            })}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
