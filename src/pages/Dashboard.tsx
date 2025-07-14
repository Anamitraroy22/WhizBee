// src/pages/Dashboard.tsx
import React from 'react';
import { useAuth } from '../context/AuthContext'; // Import your custom auth hook
import SignOutButton from '../components/Auth/SignOutButton'; // Import the logout button

const Dashboard: React.FC = () => {
  const { currentUser } = useAuth(); // Get the current user from context

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-4 text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to your Dashboard!</h1>
      {currentUser && (
        <p className="text-lg text-gray-600 mb-6">
          Hello, {currentUser.displayName || currentUser.email || 'User'}!
        </p>
      )}
      <p className="text-md text-gray-700 mb-8">
        This is a protected page, only accessible when you are logged in.
      </p>
      <SignOutButton /> {/* Logout button */}
    </div>
  );
};

export default Dashboard;
