import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Crown, Medal, Trophy } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const leaderboardData = [
  { rank: 1, name: "Thandiwe", score: 9850, avatarId: "user-avatar-1" },
  { rank: 2, name: "Chikondi", score: 9600, avatarId: "user-avatar-2" },
  { rank: 3, name: "Limbani", score: 9420, avatarId: "user-avatar-3" },
  { rank: 4, name: "Mphatso", score: 8900, avatarId: "user-avatar-4" },
  { rank: 5, name: "Kondwani", score: 8750, avatarId: "user-avatar-5" },
  { rank: 6, name: "Pemphero", score: 8500, avatarId: "user-avatar-6" },
  { rank: 7, name: "Peter", score: 8400, avatarId: "user-avatar", isCurrentUser: true },
  { rank: 8, name: "Ganizani", score: 8210, avatarId: "user-avatar-7" },
  { rank: 9, name: "Funani", score: 8050, avatarId: "user-avatar-8" },
  { rank: 10, name: "Dalitso", score: 7900, avatarId: "user-avatar-9" },
];

const getRankIcon = (rank: number) => {
  if (rank === 1) return <Crown className="h-6 w-6 text-yellow-500" />;
  if (rank === 2) return <Medal className="h-6 w-6 text-slate-400" />;
  if (rank === 3) return <Trophy className="h-6 w-6 text-amber-700" />;
  return <span className="font-bold text-lg w-6 text-center">{rank}</span>;
};

const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
};

export default function LeaderboardPage() {
  return (
    <div className="space-y-6">
       <div>
        <h2 className="text-2xl font-bold">Leaderboard</h2>
        <p className="text-muted-foreground">See how you rank against other learners this month!</p>
      </div>
      <Card>
        <CardContent className="p-0">
          <ul className="divide-y">
            {leaderboardData.map((user) => {
              const avatar = PlaceHolderImages.find(p => p.id === user.avatarId);
              return (
                <li
                  key={user.rank}
                  className={`flex items-center justify-between p-4 ${user.isCurrentUser ? "bg-primary/10" : ""}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-8 text-center">{getRankIcon(user.rank)}</div>
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={avatar?.imageUrl} alt={user.name} data-ai-hint={avatar?.imageHint} />
                      <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                    </Avatar>
                    <span className={`font-medium ${user.isCurrentUser ? "text-primary" : ""}`}>{user.name}</span>
                  </div>
                  <span className="font-bold text-lg text-primary">{user.score.toLocaleString()} pts</span>
                </li>
              );
            })}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
