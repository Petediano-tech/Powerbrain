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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth, useFirestore } from '@/firebase';
import {
  AuthError,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';
import { doc, writeBatch } from 'firebase/firestore';
import Link from 'next/link';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Logo } from '@/components/logo';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(true);

  // Sign Up State
  const [name, setName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [role, setRole] = useState('student');
  
  // Login State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const auth = useAuth();
  const firestore = useFirestore();
  const { toast } = useToast();
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError(null);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast({
        title: 'Logged in successfully!',
        description: 'Welcome to Power Brain.',
      });
      router.push('/home');
    } catch (error) {
      console.error(error);
      const authError = error as AuthError;
      setError(authError.message);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: authError.message,
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (signUpPassword.length < 6) {
        setError("Password must be at least 6 characters long.");
        setIsLoading(false);
        return;
    }
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, signUpEmail, signUpPassword);
      const user = userCredential.user;
      await updateProfile(user, { displayName: name });

      const batch = writeBatch(firestore);

      const profileId = user.uid;
      const userProfileRef = doc(firestore, "userProfiles", profileId);
      batch.set(userProfileRef, {
          id: profileId,
          firstName: name.split(' ')[0] || '',
          lastName: name.split(' ').slice(1).join(' ') || '',
          email: user.email,
          role: role,
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

      router.push('/home');

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
  
  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      toast({
        title: 'Logged in successfully!',
        description: "Welcome back to Power Brain.",
      });
      router.push('/home');
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
    <div className="w-full h-screen flex flex-col items-center justify-center bg-[#090B1A] p-4">
      <div className="text-center space-y-2 mb-8">
        <div className="flex justify-center p-4 bg-primary/20 rounded-full w-fit mx-auto backdrop-blur-sm">
          <Logo />
        </div>
        <h1 className="text-4xl font-bold text-white">Power Brain</h1>
        <p className="text-lg text-white/70">
            Learning for Malawi's Future
        </p>
      </div>

      <Tabs defaultValue="signup" className="w-full max-w-sm" onValueChange={(value) => setIsSignUp(value === 'signup')}>
        <TabsList className="grid w-full grid-cols-2 bg-[#232634] rounded-full h-12 p-1.5">
          <TabsTrigger value="signup" className="rounded-full data-[state=active]:bg-[#363A4D] data-[state=active]:text-white text-white/70">Sign Up</TabsTrigger>
          <TabsTrigger value="login" className="rounded-full data-[state=active]:bg-[#363A4D] data-[state=active]:text-white text-white/70">Log In</TabsTrigger>
        </TabsList>
        
        <TabsContent value="signup" className="mt-8">
            <form onSubmit={handleEmailSignUp} className="space-y-4">
              <div className="space-y-2">
                <Label className="text-white/80" htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={isLoading}
                  className="bg-[#232634] border-0 text-white placeholder:text-white/50 rounded-lg h-12"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white/80" htmlFor="email-signup">Email Address</Label>
                <Input
                  id="email-signup"
                  type="email"
                  placeholder="Enter your email address"
                  value={signUpEmail}
                  onChange={(e) => setSignUpEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  className="bg-[#232634] border-0 text-white placeholder:text-white/50 rounded-lg h-12"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white/80" htmlFor="password-signup">Password</Label>
                <Input
                  id="password-signup"
                  type="password"
                  placeholder="Enter your password"
                  value={signUpPassword}
                  onChange={(e) => setSignUpPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  className="bg-[#232634] border-0 text-white placeholder:text-white/50 rounded-lg h-12"
                />
              </div>
              {error && isSignUp && <p className="text-sm text-destructive">{error}</p>}
               <div className="space-y-2">
                  <Label className="text-white/80">I am a...</Label>
                  <Tabs defaultValue={role} onValueChange={setRole} className='w-full'>
                      <TabsList className="grid w-full grid-cols-2 bg-[#232634] rounded-lg h-12 p-1">
                          <TabsTrigger value="student" className="rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-white/70">Student</TabsTrigger>
                          <TabsTrigger value="teacher" className="rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-white/70">Teacher</TabsTrigger>
                      </TabsList>
                  </Tabs>
               </div>

              <Button type="submit" className="w-full h-12 rounded-lg bg-primary hover:bg-primary/90 text-white font-bold" disabled={isLoading}>
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>
        </TabsContent>
        
        <TabsContent value="login" className="mt-8">
            <form onSubmit={handleEmailSignIn} className="space-y-4">
               <div className="space-y-2">
                <Label className="text-white/80" htmlFor="email-login">Email Address</Label>
                <Input
                  id="email-login"
                  type="email"
                  placeholder="Enter your email address"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  className="bg-[#232634] border-0 text-white placeholder:text-white/50 rounded-lg h-12"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white/80" htmlFor="password-login">Password</Label>
                <Input
                  id="password-login"
                  type="password"
                  placeholder="Enter your password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                  disabled={isLoading}
                   className="bg-[#232634] border-0 text-white placeholder:text-white/50 rounded-lg h-12"
                />
              </div>
               {error && !isSignUp && <p className="text-sm text-destructive">{error}</p>}
              <Button type="submit" className="w-full h-12 rounded-lg bg-primary hover:bg-primary/90 text-white font-bold" disabled={isLoading}>
                {isLoading ? 'Logging In...' : 'Log In'}
              </Button>
            </form>
        </TabsContent>
      </Tabs>
      
      <div className="w-full max-w-sm mt-6 text-center">
            <Link href="#" className="text-sm text-primary hover:underline">
              Forgot Password?
            </Link>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-white/20" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[#090B1A] px-2 text-white/50">
                  Or
                </span>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full h-12 rounded-lg bg-[#232634] border-0 text-white hover:bg-[#363A4D] hover:text-white"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
            >
              <svg
                className="mr-2 h-4 w-4"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="google"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 488 512"
              >
                <path
                  fill="currentColor"
                  d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 126 23.4 172.9 61.9l-76.2 76.2c-27.3-26.2-62.7-42.3-100.9-42.3-83.3 0-151.7 68.4-151.7 151.7s68.4 151.7 151.7 151.7c96.5 0 134.4-69.2 140.2-101.8H248v-95.6h239.8c.4 12.7.7 25.4.7 38.4z"
                ></path>
              </svg>
              Continue with Google
            </Button>
      </div>

    </div>
  );
}
