// src/components/Auth/SignOutButton.tsx
import React, { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../lib/firebase'; // Import your Firebase auth instance
import { useNavigate } from 'react-router-dom';

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const SignOutButton: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
        variant: "default",
      });
      navigate('/login'); // Redirect to login page after logout
    } catch (error: any) {
      console.error('Error signing out:', error);
      toast({
        title: "Logout Failed",
        description: error.message || "An error occurred during logout.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleSignOut}
      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
      disabled={loading}
    >
      {loading ? 'Logging out...' : 'Log Out'}
    </Button>
  );
};

export default SignOutButton;
