
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
import { useAuth } from '@/firebase';
import {
  AuthError,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import Link from 'next/link';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Logo } from '@/components/logo';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const auth = useAuth();
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
        description: "Welcome back to Power Brain.",
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

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: 'Logged in successfully!',
        description: "Welcome back to Power Brain.",
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
    <div className="w-full h-screen lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="hidden bg-gradient-to-br from-[#7F00FF] to-[#E100FF] lg:flex flex-col items-center justify-center p-10 text-white">
        <div className="text-center space-y-4">
          <div className="flex justify-center p-4 bg-white/20 rounded-full w-fit mx-auto backdrop-blur-sm">
            <Logo />
          </div>
          <h1 className="text-4xl font-bold">Power Brain</h1>
          <p className="text-xl max-w-md">
            Empowering every learner to dream, learn, and achieve without limits.
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center py-12">
        <Card className="w-full max-w-sm border-0 shadow-none sm:border sm:shadow-sm bg-card">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl pt-4">Welcome Back!</CardTitle>
            <CardDescription>
              Sign in to continue your learning journey.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleEmailSignIn} className="space-y-4">
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full"
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
              Google
            </Button>
          </CardContent>
          <CardFooter className="justify-center text-sm">
            <p>
              Don't have an account?{' '}
              <Link href="/signup" className="font-semibold text-primary hover:underline">
                Sign Up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
