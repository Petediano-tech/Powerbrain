
'use client';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useAuth, useDoc, useMemoFirebase, useUser } from '@/firebase';
import { useUserStore } from '@/hooks/use-user-store';
import { capitalize } from '@/lib/utils';
import { signOut } from 'firebase/auth';
import { doc, getFirestore } from 'firebase/firestore';
import {
  ArrowLeft,
  Book,
  ChevronRight,
  GraduationCap,
  Heart,
  HelpCircle,
  KeyRound,
  LogOut,
  Mail,
  MapPin,
  Moon,
  Pencil,
  Phone,
  ShieldAlert,
  Star,
  Bell,
} from 'lucide-react';
import Link from 'next/link';
import { useMemo } from 'react';
import { ProfileListItem } from '@/components/profile-list-item';
import { Switch } from '@/components/ui/switch';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProfilePage() {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const firestore = getFirestore();
  const { profileId } = useUserStore();
  const router = useRouter();

  const userProfileRef = useMemoFirebase(() => {
    if (!profileId) return null;
    return doc(firestore, 'userProfiles', profileId);
  }, [firestore, profileId]);

  const { data: userProfile, isLoading: isProfileLoading } = useDoc(userProfileRef);

  const getInitials = (name: string) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  const displayName = useMemo(() => {
    if (userProfile) {
      const name = `${userProfile.firstName} ${userProfile.lastName}`.trim();
      if (name) return name;
    }
    if (user?.displayName) return user.displayName;
    return 'Power Brain User';
  }, [user, userProfile]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/welcome');
  };

  const isLoading = isUserLoading || isProfileLoading;

  if (isLoading) {
    return (
      <div className="bg-background text-foreground min-h-screen p-4">
        <div className="flex items-center gap-4 mb-8">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-6 w-24" />
        </div>
        <div className="flex flex-col items-center gap-4">
          <Skeleton className="h-28 w-28 rounded-full relative" />
          <Skeleton className="h-7 w-40" />
          <Skeleton className="h-5 w-20" />
        </div>

        <div className="mt-10 space-y-8">
            <div>
                <Skeleton className="h-5 w-32 mb-4" />
                <div className="bg-muted rounded-lg p-2 space-y-2">
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                </div>
            </div>
             <div>
                <Skeleton className="h-5 w-32 mb-4" />
                <div className="bg-muted rounded-lg p-2 space-y-2">
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                </div>
            </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="p-4 flex items-center gap-4 sticky top-0 bg-background/80 backdrop-blur-sm z-10">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft />
        </Button>
        <h1 className="text-xl font-bold">Profile</h1>
      </div>

      <div className="flex flex-col items-center p-4 gap-2 text-center">
        <div className="relative">
          <Avatar className="h-28 w-28 border-4 border-primary">
            {user?.photoURL && <AvatarImage src={user.photoURL} alt={displayName} />}
            <AvatarFallback className="text-4xl bg-muted text-foreground">
              {getInitials(displayName)}
            </AvatarFallback>
          </Avatar>
          <Button
            size="icon"
            className="absolute bottom-0 right-0 rounded-full border-4 border-background"
          >
            <Pencil className="h-5 w-5" />
          </Button>
        </div>
        <h2 className="text-2xl font-bold mt-2">{displayName}</h2>
        <p className="text-primary font-semibold">{capitalize(userProfile?.role || 'student')}</p>
      </div>

      <div className="p-4 space-y-8">
        {/* Personal Information */}
        <div>
          <h3 className="font-semibold text-lg mb-2">Personal Information</h3>
          <div className="bg-card rounded-xl p-2 space-y-1 border">
            <ProfileListItem
              icon={Mail}
              label="Email"
              value={user?.email || 'N/A'}
            />
            <ProfileListItem
              icon={Phone}
              label="Phone Number"
              value={userProfile?.phoneNumber || '+265 123 456 789'}
            />
            <ProfileListItem
              icon={MapPin}
              label="Location"
              value={userProfile?.location || 'Lilongwe, Malawi'}
            />
          </div>
        </div>

        {/* Academic Information */}
        <div>
          <h3 className="font-semibold text-lg mb-2">Academic Information</h3>
          <div className="bg-card rounded-xl p-2 space-y-1 border">
            <ProfileListItem
              icon={GraduationCap}
              label="School"
              value={userProfile?.schoolId || 'Kamuzu Academy'}
            />
            <ProfileListItem
              icon={Star}
              label="Grade / Form"
              value={userProfile?.gradeLevel || 'Form 4'}
            />
             <ProfileListItem
              icon={Book}
              label="Subjects of Interest"
              value={userProfile?.subjectsOfInterest?.join(', ') || 'Mathematics, Physics'}
            />
          </div>
        </div>

        {/* Settings */}
        <div>
          <h3 className="font-semibold text-lg mb-2">Settings</h3>
          <div className="bg-card rounded-xl p-2 space-y-1 border">
            <ProfileListItem
              icon={Bell}
              label="Notification Preferences"
              value=""
            />
            <ProfileListItem
              icon={Moon}
              label="Dark Mode"
              value={<Switch />}
              isAction={false}
            />
             <ProfileListItem
              icon={KeyRound}
              label="Change Password"
              value=""
            />
            <ProfileListItem
              icon={HelpCircle}
              label="Help & Support"
              value=""
            />
          </div>
        </div>
      </div>
      
      <div className="p-6 mt-4">
        <Button variant="destructive" className="w-full h-12" onClick={handleLogout}>
          <LogOut className="mr-2" />
          Log Out
        </Button>
      </div>

    </div>
  );
}
