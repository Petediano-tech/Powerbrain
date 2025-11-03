
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
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';
import { doc, getDoc, writeBatch } from 'firebase/firestore';
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
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if user profile already exists
      const userProfileRef = doc(firestore, "userProfiles", user.uid);
      const userProfileSnap = await getDoc(userProfileRef);

      if (!userProfileSnap.exists()) {
        // This is a new user, create their profile and account docs
        const batch = writeBatch(firestore);

        batch.set(userProfileRef, {
            id: user.uid,
            firstName: user.displayName?.split(' ')[0] || '',
            lastName: user.displayName?.split(' ').slice(1).join(' ') || '',
            email: user.email,
            role: 'student', // Default role for Google sign-in
            registrationDate: new Date().toISOString(),
            gradeLevel: "Form 1",
            studyStreaks: 0,
            totalTimeStudied: 0,
            quizzesCompleted: 0,
            topicsMastered: 0,
            badges: [],
            averageScore: 0,
            subscriptionTier: "free",
        });

        const userAccountRef = doc(firestore, "userAccounts", user.uid);
        batch.set(userAccountRef, {
          id: user.uid,
          email: user.email,
          username: user.displayName,
          registrationDate: new Date().toISOString(),
          profileId: user.uid,
        });
        
        await batch.commit();
        toast({
          title: 'Account created successfully!',
          description: "Welcome to Power Brain.",
        });
      } else {
         toast({
          title: 'Logged in successfully!',
          description: 'Welcome back to Power Brain.',
        });
      }

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

  const handleForgotPassword = async () => {
    const email = isSignUp ? signUpEmail : loginEmail;
    if (!email) {
      toast({
        variant: 'destructive',
        title: 'Email required',
        description: 'Please enter your email address to reset your password.',
      });
      return;
    }

    setIsLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      toast({
        title: 'Password reset email sent',
        description: `Please check your inbox at ${email} to reset your password.`,
      });
    } catch (error) {
      const authError = error as AuthError;
      toast({
        variant: 'destructive',
        title: 'Error sending email',
        description: authError.message,
      });
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="text-center space-y-2 mb-8">
        <div className="flex justify-center p-4 bg-primary/10 rounded-full w-fit mx-auto">
          <Logo />
        </div>
        <h1 className="text-4xl font-bold text-foreground">Power Brain</h1>
        <p className="text-lg text-muted-foreground">
            Learning for Malawi's Future
        </p>
      </div>

      <Tabs defaultValue="signup" className="w-full max-w-sm" onValueChange={(value) => setIsSignUp(value === 'signup')}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
          <TabsTrigger value="login">Log In</TabsTrigger>
        </TabsList>
        
        <TabsContent value="signup" className="mt-8">
            <form onSubmit={handleEmailSignUp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={isLoading}
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email-signup">Email Address</Label>
                <Input
                  id="email-signup"
                  type="email"
                  placeholder="Enter your email address"
                  value={signUpEmail}
                  onChange={(e) => setSignUpEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password-signup">Password</Label>
                <Input
                  id="password-signup"
                  type="password"
                  placeholder="Enter your password"
                  value={signUpPassword}
                  onChange={(e) => setSignUpPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  className="h-12"
                />
              </div>
              {error && isSignUp && <p className="text-sm text-destructive">{error}</p>}
               <div className="space-y-2">
                  <Label>I am a...</Label>
                  <Tabs defaultValue={role} onValueChange={setRole} className='w-full'>
                      <TabsList className="grid w-full grid-cols-2 h-12 p-1">
                          <TabsTrigger value="student">Student</TabsTrigger>
                          <TabsTrigger value="teacher">Teacher</TabsTrigger>
                      </TabsList>
                  </Tabs>
               </div>

              <Button type="submit" className="w-full h-12" disabled={isLoading}>
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>
        </TabsContent>
        
        <TabsContent value="login" className="mt-8">
            <form onSubmit={handleEmailSignIn} className="space-y-4">
               <div className="space-y-2">
                <Label htmlFor="email-login">Email Address</Label>
                <Input
                  id="email-login"
                  type="email"
                  placeholder="Enter your email address"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password-login">Password</Label>
                <Input
                  id="password-login"
                  type="password"
                  placeholder="Enter your password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  className="h-12"
                />
              </div>
               {error && !isSignUp && <p className="text-sm text-destructive">{error}</p>}
              <Button type="submit" className="w-full h-12" disabled={isLoading}>
                {isLoading ? 'Logging In...' : 'Log In'}
              </Button>
            </form>
        </TabsContent>
      </Tabs>
      
      <div className="w-full max-w-sm mt-6 text-center">
            <button onClick={handleForgotPassword} className="text-sm text-primary hover:underline">
              Forgot Password?
            </button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or
                </span>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full h-12"
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
