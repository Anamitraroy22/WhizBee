// src/components/Auth/PrivateRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Import your custom auth hook

const PrivateRoute: React.FC = () => {
  // Get the current user and loading state from the AuthContext
  const { currentUser, loading } = useAuth();

  // If the authentication state is still loading, show a loading message/spinner
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-xl text-muted-foreground bg-gradient-to-br from-blue-50 to-purple-50">
        Checking authentication status...
      </div>
    );
  }

  // If a user is logged in (currentUser is not null), render the child routes/components.
  // Otherwise, redirect them to the login page.
  return currentUser ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
