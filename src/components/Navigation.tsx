// src/components/Navigation.tsx
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

// ✅ Removed 'Insect', added 'WaspIcon'
import { Menu, X } from 'lucide-react';
import WaspIcon from './WaspIcon'; // ✅ Import your WaspIcon component
import clsx from 'clsx';

// Shadcn UI Imports (adjust path if your components are in a different location)
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Input } from './ui/input';

const GoogleLogo = ({ size = 24 }) => (
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

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true); // State to toggle between login and signup in the modal

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Programs', path: '/programs' },
    { name: 'Contact', 'path': '/contact' },
  ];

  return (
    <nav className={clsx(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      {
        'glass py-2 animate-ripple-border': isScrolled,
        'bg-transparent py-4': !isScrolled
      }
    )}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <NavLink to="/" className="flex items-center space-x-2 group">
            {/* ✅ Replaced Insect with WaspIcon */}
            <WaspIcon
              size={40} // Default size for the nav bar
              className="text-yellow-500" // Golden color from Tailwind CSS
            />
            <span className="text-2xl font-bold text-foreground animate-ripple">WhizBee</span>
          </NavLink>

          {/* Desktop Navigation (rest of the content is unchanged) */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  clsx(
                    "relative py-2 px-4 rounded-full transition-all duration-300 overflow-hidden",
                    "group",
                    {
                      'bg-whiz-orange text-white font-semibold shadow-lg': isActive,
                      'hover:bg-whiz-orange/90': isActive,

                      // Untapped state: glassmorphic background
                      'glass-nav-item': !isActive,
                      'hover:scale-105': !isActive
                    }
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <span className={clsx(
                      "relative z-10 font-bold",
                      {
                        'text-white': isActive,
                        'text-foreground group-hover:text-whiz-orange text-glow-on-hover': !isActive
                      }
                    )}>
                      {item.name}
                    </span>
                    {!isActive && (
                      <span className="absolute inset-0 block rounded-full opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 origin-center animate-ripple-fade-glass"></span>
                    )}
                  </>
                )}
              </NavLink>
            ))}

            {/* Enroll Now Button - Triggers Dialog */}
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  className="bg-whiz-orange text-white px-6 py-2 rounded-full font-semibold hover:bg-whiz-orange/90 transition-colors duration-300"
                >
                  Enroll Now
                </Button>
              </DialogTrigger>

              {/* Login/Signup Modal Content */}
              <DialogContent className="bg-white/5 backdrop-blur-[10px] border border-white/20 rounded-2xl shadow-xl text-white max-w-sm w-full">
                <DialogHeader>
                  <DialogTitle className="text-whiz-orange text-center text-2xl font-bold">
                    {isLogin ? "Welcome to WhizBee" : "Create an Account"}
                  </DialogTitle>
                  <DialogDescription className="text-center text-sm text-gray-300">
                    {isLogin
                      ? "Sign in to access your child's learning dashboard"
                      : "Sign up to start your child's learning adventure!"}
                  </DialogDescription>
                </DialogHeader>

                <form className="space-y-4 mt-4">
                  <Input placeholder="Email" type="email" className="rounded-md bg-white/10 border-white/20 text-white placeholder:text-gray-400" />
                  <Input placeholder="Password" type="password" className="rounded-md bg-white/10 border-white/20 text-white placeholder:text-gray-400" />
                  {!isLogin && (
                    <Input
                      placeholder="Confirm Password"
                      type="password"
                      className="rounded-md bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                    />
                  )}
                  <Button
                    type="submit"
                    className="w-full bg-whiz-orange hover:bg-whiz-orange/90 text-white rounded-md"
                  >
                    {isLogin ? "Login" : "Sign Up"}
                  </Button>
                </form>

                <div className="my-4 text-center text-sm text-white/70">or</div>

                <Button className="w-full flex items-center justify-center gap-2 border border-white/20 rounded-md text-sm font-medium py-2 hover:bg-white/10 text-white">
                  <GoogleLogo size={20} /> Sign in with Google
                </Button>

                <p className="text-xs text-center text-white/50 mt-6">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                  <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="underline text-whiz-orange hover:text-whiz-orange/80 ml-1"
                    type="button"
                  >
                    {isLogin ? "Sign up here" : "Login"}
                  </button>
                </p>
              </DialogContent>
            </Dialog>
          </div>

          {/* Mobile Menu Button (rest of the content is unchanged) */}
          <button
            className="md:hidden p-2 rounded-lg bg-white/20 backdrop-blur-sm text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu (rest of the content is unchanged) */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 glass rounded-b-2xl mx-4 mt-2 p-6 animate-ripple-border">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    clsx(
                      "py-2 px-4 rounded-full transition-all duration-300 text-center overflow-hidden",
                      "group",
                      {
                        'bg-whiz-orange text-white font-semibold shadow-lg': isActive,
                        'hover:bg-whiz-orange/90': isActive,

                        // Untapped state for mobile
                        'glass-nav-item': !isActive,
                        'hover:scale-105': !isActive
                      }
                    )
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {({ isActive }) => (
                    <>
                      <span className={clsx(
                        "relative z-10 font-bold",
                        {
                          'text-white': isActive,
                          'text-foreground group-hover:text-whiz-orange text-glow-on-hover': !isActive
                        }
                      )}>
                        {item.name}
                      </span>
                      {!isActive && (
                        <span className="absolute inset-0 block rounded-full opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 origin-center animate-ripple-fade-glass"></span>
                      )}
                    </>
                  )}
                </NavLink>
              ))}
              {/* Enroll Now button in mobile menu, also triggers Dialog */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-whiz-orange text-white px-6 py-2 rounded-full font-semibold hover:bg-whiz-orange/90 transition-colors duration-300 w-full">
                    Enroll Now
                  </Button>
                </DialogTrigger>
                {/* Re-use the same DialogContent for mobile */}
                <DialogContent className="bg-white/5 backdrop-blur-[10px] border border-white/20 rounded-2xl shadow-xl text-white max-w-sm w-full">
                  <DialogHeader>
                    <DialogTitle className="text-whiz-orange text-center text-2xl font-bold">
                      {isLogin ? "Welcome to WhizBee" : "Create an Account"}
                    </DialogTitle>
                    <DialogDescription className="text-center text-sm text-gray-300">
                      {isLogin
                        ? "Sign in to access your child's learning dashboard"
                        : "Sign up to start your child's learning adventure!"}
                    </DialogDescription>
                  </DialogHeader>

                  <form className="space-y-4 mt-4">
                    <Input placeholder="Email" type="email" className="rounded-md bg-white/10 border-white/20 text-white placeholder:text-gray-400" />
                    <Input placeholder="Password" type="password" className="rounded-md bg-white/10 border-white/20 text-white placeholder:text-gray-400" />
                    {!isLogin && (
                      <Input
                        placeholder="Confirm Password"
                        type="password"
                        className="rounded-md bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                      />
                    )}
                    <Button
                      type="submit"
                      className="w-full bg-whiz-orange hover:bg-whiz-orange/90 text-white rounded-md"
                    >
                      {isLogin ? "Login" : "Sign Up"}
                    </Button>
                  </form>

                  <div className="my-4 text-center text-sm text-white/70">or</div>

                  <Button className="w-full flex items-center justify-center gap-2 border border-white/20 rounded-md text-sm font-medium py-2 hover:bg-white/10 text-white">
                    <GoogleLogo size={20} /> Sign in with Google
                  </Button>

                  <p className="text-xs text-center text-white/50 mt-6">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                    <button
                      onClick={() => setIsLogin(!isLogin)}
                      className="underline text-whiz-orange hover:text-whiz-orange/80 ml-1"
                      type="button"
                    >
                      {isLogin ? "Sign up here" : "Login"}
                    </button>
                  </p>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;