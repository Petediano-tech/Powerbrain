
'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth, useFirestore } from '@/firebase';
import { AuthError, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc, writeBatch } from 'firebase/firestore';
import Link from 'next/link';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Logo } from '@/components/logo';
import { useRouter } from 'next/navigation';


export default function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const auth = useAuth();
  const firestore = useFirestore();
  const { toast } = useToast();
  const router = useRouter();


  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (password.length < 6) {
        setError("Password must be at least 6 characters long.");
        setIsLoading(false);
        return;
    }
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await updateProfile(user, { displayName: name });

      const batch = writeBatch(firestore);

      // 1. Create UserProfile
      const profileId = user.uid; // Using user's UID as profile ID for simplicity
      const userProfileRef = doc(firestore, "userProfiles", profileId);
      batch.set(userProfileRef, {
          id: profileId,
          firstName: name.split(' ')[0] || '',
          lastName: name.split(' ').slice(1).join(' ') || '',
          email: user.email,
          registrationDate: new Date().toISOString(),
          gradeLevel: "Form 1",
          studyStreaks: 0,
          totalTimeStudied: 0,
          quizzesCompleted: 0,
          topicsMastered: 0,
          badges: [],
          averageScore: 0,
          subscriptionTier: "free",
          dailyChatCount: 0,
          lastChatDate: new Date().toISOString().split('T')[0],
      });

      // 2. Create UserAccount to link auth UID to profileId
      const userAccountRef = doc(firestore, "userAccounts", user.uid);
      batch.set(userAccountRef, {
        id: user.uid,
        email: user.email,
        username: name,
        registrationDate: new Date().toISOString(),
        profileId: profileId,
      });
      
      await batch.commit();
      
      toast({
        title: 'Account created successfully!',
        description: "Welcome to Power Brain.",
      });

      router.push('/dashboard');

    } catch (error) {
       console.error(error);
      const authError = error as AuthError;
      setError(authError.message);
       toast({
        variant: "destructive",
        title: 'Uh oh! Something went wrong.',
        description: authError.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center items-center">
            <Logo />
          <CardTitle className="text-2xl pt-4">Create an Account</CardTitle>
          <CardDescription>
            Join the digital learning movement in Malawi.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleEmailSignUp} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Peter Phiri"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="peter@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="justify-center text-sm">
          <p>
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-primary hover:underline">
              Sign In
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
