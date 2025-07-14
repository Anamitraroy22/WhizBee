// src/components/AuthModal.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Still needed for redirection AFTER auth success
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase'; // Adjust path if your firebase config is elsewhere

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Card, CardContent, CardFooter } from '@/components/ui/card'; // Using Card for internal structure
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast'; // For displaying notifications

// Assuming you have a simple Google Logo SVG component or similar
const GoogleLogo = ({ size = 20 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    width={size}
    height={size}
    className="inline-block"
  >
    <path
      fill="#FFC107"
      d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 8.065 3.09l5.663-5.664C34.651 4.291 29.68 2 24 2C11.85 2 2 11.85 2 24s9.85 22 22 22c11.77 0 21.604-8.529 21.998-20.925V20.083z"
    ></path>
    <path
      fill="#FF3D00"
      d="M6.306 14.691L1.649 9.035C3.268 5.485 7.085 2.5 12 2.5c5.388 0 9.58 3.064 11.928 5.766L19.927 12c-1.332-1.748-3.513-3-5.927-3c-3.35 0-6.284 2.115-7.378 5.191z"
    ></path>
    <path
      fill="#4CAF50"
      d="M24 46c5.202 0 9.871-1.802 13.486-4.836l-5.663-5.664C29.61 40.063 27.025 41 24 41c-3.513 0-6.284-2.115-7.378-5.191l-5.334 5.25C13.481 44.028 18.514 46 24 46z"
    ></path>
    <path
      fill="#1976D2"
      d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 8.065 3.09l5.663-5.664C34.651 4.291 29.68 2 24 2C11.85 2 2 11.85 2 24s9.85 22 22 22c11.77 0 21.604-8.529 21.998-20.925V20.083z"
    ></path>
  </svg>
);


interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess?: () => void; // Optional callback for successful auth
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true); // true for login, false for signup
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate(); // Still use navigate for post-auth redirection

  // Reset form when modal opens/closes or switches between login/signup
  React.useEffect(() => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setLoading(false);
  }, [isOpen, isLogin]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        // Login Logic
        await signInWithEmailAndPassword(auth, email, password);
        toast({
          title: "Login Successful!",
          description: "Welcome back to WhizBee.",
          variant: "default",
        });
      } else {
        // Signup Logic
        if (password !== confirmPassword) {
          toast({
            title: "Sign Up Failed",
            description: "Passwords do not match.",
            variant: "destructive",
          });
          setLoading(false);
          return;
        }
        await createUserWithEmailAndPassword(auth, email, password);
        toast({
          title: "Sign Up Successful!",
          description: "Your account has been created. You can now log in.",
          variant: "default",
        });
      }

      // If authentication is successful, close modal and trigger optional callback
      onClose();
      if (onAuthSuccess) {
        onAuthSuccess();
      }
      // Optionally navigate to a dashboard or home page after successful auth
      navigate('/'); // Redirect to homepage or dashboard after successful auth
    } catch (error: any) {
      console.error("Authentication Error:", error.message);
      toast({
        title: isLogin ? "Login Failed" : "Sign Up Failed",
        description: error.message || "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white/5 backdrop-blur-[10px] border border-white/20 rounded-2xl shadow-xl text-white max-w-sm w-full p-6">
        <DialogHeader>
          <DialogTitle className="text-whiz-orange text-center text-2xl font-bold">
            {isLogin ? "Welcome to WhizBee" : "Create an Account"}
          </DialogTitle>
          <DialogDescription className="text-center text-sm text-gray-300">
            {isLogin
              ? "Sign in to access your child's learning dashboard"
              : "Sign up to get started with smart crypto trading"} {/* Changed text to be more relevant */}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleAuth} className="space-y-4 mt-4">
          <Input
            placeholder="Email"
            type="email"
            className="rounded-md bg-white/10 border-white/20 text-white placeholder:text-gray-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
          <Input
            placeholder="Password"
            type="password"
            className="rounded-md bg-white/10 border-white/20 text-white placeholder:text-gray-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
          {!isLogin && (
            <Input
              placeholder="Confirm Password"
              type="password"
              className="rounded-md bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required={!isLogin} // Only required if not login
              disabled={loading}
            />
          )}
          <Button
            type="submit"
            className="w-full bg-whiz-orange hover:bg-whiz-orange/90 text-white rounded-md"
            disabled={loading}
          >
            {loading ? (isLogin ? "Logging in..." : "Signing up...") : (isLogin ? "Login" : "Sign Up")}
          </Button>
        </form>

        <div className="my-4 text-center text-sm text-white/70">or</div>

        {/* You can implement Google Sign-in here if you enable it in Firebase */}
        <Button className="w-full flex items-center justify-center gap-2 border border-white/20 rounded-md text-sm font-medium py-2 hover:bg-white/10 text-white" disabled={loading}>
          <GoogleLogo size={20} /> Sign in with Google
        </Button>

        <CardFooter className="flex justify-center text-xs text-center text-white/50 mt-6">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="underline text-whiz-orange hover:text-whiz-orange/80 ml-1"
            type="button"
            disabled={loading}
          >
            {isLogin ? "Sign up here" : "Login"}
          </button>
        </CardFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;