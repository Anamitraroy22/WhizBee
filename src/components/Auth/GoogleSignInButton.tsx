// src/components/Auth/GoogleSignInButton.tsx
import React, { useState } from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../lib/firebase'; // Import your Firebase auth instance
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc'; // Import Google icon from react-icons

import { Button } from "@/components/ui/button"; // Assuming Shadcn Button
import { useToast } from "@/components/ui/use-toast";

const GoogleSignInButton: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      
      toast({
        title: "Google Login Successful!",
        description: "You have been logged in with Google.",
        variant: "default",
      });
      navigate('/'); // Redirect to homepage or dashboard after successful Google login
    } catch (error: any) {
      console.error('Error signing in with Google:', error);
      toast({
        title: "Google Login Failed",
        description: error.message || "An unexpected error occurred during Google login.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleGoogleSignIn}
      className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-md text-sm font-medium py-2 hover:bg-gray-100 text-gray-700 shadow-sm"
      disabled={loading}
    >
      <FcGoogle className="w-5 h-5" />
      {loading ? 'Signing in with Google...' : 'Sign in with Google'}
    </Button>
  );
};

export default GoogleSignInButton;
