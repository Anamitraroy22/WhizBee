// src/context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase'; // Import your Firebase auth instance

// Define the shape of your AuthContext
interface AuthContextType {
  currentUser: User | null;
  loading: boolean; // Indicates if the initial auth state is still being loaded
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create a provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // True initially, as we are checking auth state

  useEffect(() => {
    // onAuthStateChanged is a Firebase listener that triggers whenever the user's sign-in state changes.
    // It returns an unsubscribe function that should be called when the component unmounts to prevent memory leaks.
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user); // Set the current user (null if logged out, User object if logged in)
      setLoading(false); // Authentication state has been determined, so loading is complete
    });

    // Cleanup function: Unsubscribe from the listener when the component unmounts
    return unsubscribe;
  }, []); // Empty dependency array means this effect runs only once on mount

  return (
    // Provide the currentUser and loading state to all children components
    <AuthContext.Provider value={{ currentUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to easily consume the AuthContext in any functional component
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    // This error helps ensure that useAuth is always called within an AuthProvider
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
