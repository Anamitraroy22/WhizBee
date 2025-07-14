// src/pages/HomePage.tsx

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';

import {
  ArrowRight,
  Rocket,
} from 'lucide-react';

// Declare all image imports from your assets folder
import heroTeacher from '../assets/hero-teacher.jpg';
import kidsReading from '../assets/kids-reading.jpg';
import kidsGroup from '../assets/kids-group.jpg';
import learningfun from '../assets/learning-fun.jpg';
import { useAuth } from '@/context/AuthContext';

// IMPORT THE TWO DIFFERENT TYPEWRITER COMPONENTS
import HeroTypewriterHeading from '../components/HeroTypewriterHeading'; // For the cycling hero effect
import TypewriterHeading from '../components/TypewriterHeading'; // For the one-time section heading effect

import QuestionnaireModal from "@/components/QuestionnaireModal";
import AuthModal from "@/components/AuthModal";
import BlogCard from "@/components/BlogCard";

// Import the debounce utility - (ensure this path is correct if issues persist)
import { debounce } from '../lib/utils.ts';

// NEW IMPORTS FOR THE BACKGROUND EFFECTS
import ParallaxBackground from '../components/ParallaxBackground'; // Import the parallax background component
import SparkleTrail from '../components/SparkleTrail'; // Import the sparkle trail component
import RainbowBackground from '../components/RainbowBackground'; // Import the rainbow background component
import ParallaxRain from '../components/ParallaxRain'; // NEW: Import the ParallaxRain component

const HomePage = () => {
  const navigate = useNavigate();
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);
  const [isQuizModalOpen, setIsQuizModal] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // State for manual hover/click override
  const [activeBlogCard, setActiveBlogCard] = useState<number | null>(null);

  // State for automatic cycling (image or blog for each card)
  const [autoDisplayMode, setAutoDisplayMode] = useState<{ [key: number]: 'image' | 'blog' }>({
    1: 'image',
    2: 'image',
    3: 'image',
  });

  // Ref to store interval IDs for each card
  const intervalRefs = useRef<{ [key: number]: number | null }>({
    1: null,
    2: null,
    3: null,
  });

  // Function to start the automatic animation for a specific card
  const startAutoAnimation = useCallback((cardIndex: number) => {
    if (intervalRefs.current[cardIndex]) {
      window.clearInterval(intervalRefs.current[cardIndex]!);
      intervalRefs.current[cardIndex] = null;
    }

    intervalRefs.current[cardIndex] = window.setInterval(() => {
      setAutoDisplayMode(prev => ({
        ...prev,
        [cardIndex]: prev[cardIndex] === 'image' ? 'blog' : 'image'
      }));
    }, 5000);
  }, []);

  // Function to stop the automatic animation for a specific card
  const stopAutoAnimation = useCallback((cardIndex: number) => {
    if (intervalRefs.current[cardIndex]) {
      window.clearInterval(intervalRefs.current[cardIndex]!);
      intervalRefs.current[cardIndex] = null;
    }
  }, []);

  // Effect to manage Intersection Observer for section visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('section-hidden');
            entry.target.classList.add('section-visible');
          } else {
            entry.target.classList.remove('section-visible');
            entry.target.classList.add('section-hidden');
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  // Effect to initialize and clean up automatic card animations
  useEffect(() => {
    startAutoAnimation(1);
    startAutoAnimation(2);
    startAutoAnimation(3);

    return () => {
      stopAutoAnimation(1);
      stopAutoAnimation(2);
      stopAutoAnimation(3);
    };
  }, [startAutoAnimation, stopAutoAnimation]);

  const setSectionRef = (index: number) => (el: HTMLElement | null) => {
    sectionsRef.current[index] = el;
  };

  const handleQuizCompletion = (answers: Record<string, string | string[]>, email?: string) => {
    console.log('Quiz completed with answers:', answers);
    if (email) {
      console.log('User provided email for recommendations:', email);
    }
    setIsQuizModal(false);
  };

  const handleAuthSuccess = () => {
    console.log('Authentication successful!');
  };

  // Helper to determine the effective display mode for a card
  const getCardDisplayMode = (cardIndex: number) => {
    if (activeBlogCard === cardIndex) {
      return 'blog';
    }
    return autoDisplayMode[cardIndex];
  };

  return (
    <>
      {/* Hero Section - Its background is intentionally untouched */}
      <section className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0 pointer-events-none"
        >
          <source src="/videos/spline-bg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="relative z-10 h-full flex flex-col justify-center items-center px-4 text-center">
          {/* Hero TypewriterHeading remains as is, now using HeroTypewriterHeading */}
          <HeroTypewriterHeading />

          <p className="text-white text-xl font-semibold mt-4 animate-ripple drop-shadow-[0_2px_8px_rgba(255,255,255,0.9)] bg-black/10 px-4 py-2 rounded-xl backdrop-blur-sm
                      font-['Nunito']"> {/* Changed to Nunito for paragraphs */}
            Sparking Joyful Learning Adventures for <br className="sm:hidden" /> Every Little Explorer!
          </p>

          <button
            className="mt-8 px-8 py-4 text-white font-semibold rounded-full bg-white/10 border border-white/30 backdrop-blur-xl hover:bg-white/20 transition-all duration-300 shadow-xl
                      font-['Poppins'] text-lg sm:text-xl"
            onClick={() => navigate('/programs#pricing')}
          >
            Let's Start the Fun! <Rocket className="inline-block ml-2 w-6 h-6" />
          </button>
        </div>
      </section>

      {/* --- 3D Animated Background Wrapper for ALL subsequent sections --- */}
      {/* This div acts as the main viewport for the 3D background.
          All sections below the Hero will now float above this animated layer. */}
      <div className="min-h-screen relative overflow-hidden">
        {/* 🌈 Rainbow hue-shifting background */}
        <RainbowBackground />

        {/* 🌧️ Parallax Rain Behind All Sections (except Hero) - NEW */}
        <ParallaxRain />

        {/* 🧁 Parallax Decorative Layer */}
        <ParallaxBackground />

        {/* 🧩 Existing animated shapes (you can layer them or keep as fallback) */}
        <div className="absolute inset-0 z-0 opacity-30">
          {/* We'll strategically place more shapes to cover the entire background */}

          {/* Circles */}
          <div
            className="animated-shape shape-circle bg-whiz-yellow w-20 h-20"
            style={{ top: '10%', left: '5%', animationDuration: '15s', animationDelay: '0s' }}
          ></div>
          <div
            className="animated-shape shape-circle bg-whiz-green w-24 h-24"
            style={{ bottom: '15%', left: '15%', animationDuration: '10s', animationDelay: '1s' }}
          ></div>
          <div
            className="animated-shape shape-circle bg-whiz-pink w-18 h-18"
            style={{ top: '70%', left: '50%', animationDuration: '11s', animationDelay: '0.5s' }}
          ></div>
          <div
            className="animated-shape shape-circle bg-whiz-blue w-28 h-28"
            style={{ top: '30%', right: '8%', animationDuration: '17s', animationDelay: '2.5s' }}
          ></div>
          <div
            className="animated-shape shape-circle bg-whiz-purple w-16 h-16"
            style={{ bottom: '5%', right: '40%', animationDuration: '13s', animationDelay: '4s' }}
          ></div>
           <div
            className="animated-shape shape-circle bg-whiz-orange w-22 h-22"
            style={{ top: '55%', left: '70%', animationDuration: '14s', animationDelay: '1.2s' }}
          ></div>
          <div
            className="animated-shape shape-circle bg-whiz-blue w-14 h-14"
            style={{ top: '5%', left: '40%', animationDuration: '12s', animationDelay: '3s' }}
          ></div>
          <div
            className="animated-shape shape-circle bg-whiz-yellow w-20 h-20"
            style={{ top: '45%', left: '5%', animationDuration: '15s', animationDelay: '0.5s' }}
          ></div>
          <div
            className="animated-shape shape-circle bg-whiz-pink w-16 h-16"
            style={{ bottom: '10%', right: '5%', animationDuration: '12s', animationDelay: '2s' }}
          ></div>
          <div
            className="animated-shape shape-circle bg-whiz-green w-22 h-22"
            style={{ top: '20%', left: '25%', animationDuration: '18s', animationDelay: '3.5s' }}
          ></div>
          <div
            className="animated-shape shape-circle bg-whiz-purple w-26 h-26"
            style={{ bottom: '30%', left: '40%', animationDuration: '16s', animationDelay: '1.8s' }}
          ></div>

          {/* Squares */}
          <div
            className="animated-shape shape-square bg-whiz-blue w-16 h-16"
            style={{ top: '25%', right: '10%', animationDuration: '12s', animationDelay: '2s' }}
          ></div>
          <div
            className="animated-shape shape-square bg-whiz-orange w-14 h-14"
            style={{ bottom: '5%', right: '25%', animationDuration: '14s', animationDelay: '3s' }}
          ></div>
          <div
            className="animated-shape shape-square bg-whiz-yellow w-12 h-12"
            style={{ top: '85%', left: '70%', animationDuration: '13s', animationDelay: '2.5s' }}
          ></div>
          <div
            className="animated-shape shape-square bg-whiz-green w-20 h-20"
            style={{ top: '50%', left: '80%', animationDuration: '16s', animationDelay: '1.5s' }}
          ></div>
          <div
            className="animated-shape shape-square bg-whiz-pink w-10 h-10"
            style={{ bottom: '30%', left: '5%', animationDuration: '9s', animationDelay: '0.8s' }}
          ></div>
           <div
            className="animated-shape shape-square bg-whiz-purple w-18 h-18"
            style={{ top: '15%', right: '50%', animationDuration: '10s', animationDelay: '4.5s' }}
          ></div>
          <div
            className="animated-shape shape-square bg-whiz-blue w-20 h-20"
            style={{ top: '70%', right: '20%', animationDuration: '14s', animationDelay: '1s' }}
          ></div>
          <div
            className="animated-shape shape-square bg-whiz-orange w-16 h-16"
            style={{ top: '5%', left: '60%', animationDuration: '11s', animationDelay: '0.3s' }}
          ></div>

          {/* Triangles */}
          <div
            className="animated-shape shape-triangle border-whiz-pink w-12 h-12"
            style={{ top: '40%', left: '20%', animationDuration: '18s', animationDelay: '4s' }}
          ></div>
          <div
            className="animated-shape shape-triangle border-whiz-purple w-16 h-16"
            style={{ top: '5%', right: '30%', animationDuration: '16s', animationDelay: '5s' }}
          ></div>
          <div
            className="animated-shape shape-triangle border-whiz-orange w-10 h-10"
            style={{ bottom: '10%', left: '60%', animationDuration: '11s', animationDelay: '3.5s' }}
          ></div>
          <div
            className="animated-shape shape-triangle border-whiz-blue w-14 h-14"
            style={{ top: '60%', right: '15%', animationDuration: '15s', animationDelay: '0.2s' }}
          ></div>
          <div
            className="animated-shape shape-triangle border-whiz-yellow w-20 h-20"
            style={{ top: '80%', left: '30%', animationDuration: '17s', animationDelay: '2s' }}
          ></div>
          <div
            className="animated-shape shape-triangle border-whiz-green w-18 h-18"
            style={{ bottom: '20%', left: '80%', animationDuration: '13s', animationDelay: '4.2s' }}
          ></div>
          <div
            className="animated-shape shape-triangle border-whiz-pink w-15 h-15"
            style={{ top: '30%', left: '75%', animationDuration: '10s', animationDelay: '1.7s' }}
          ></div>
        </div>

        {/* --- Content Sections (relative z-10 to stay above background) --- */}
        <div className="relative z-10">
          {/* All your content sections go here */}
          {/* Unbox the FUN of Learning Section */}
          <section ref={setSectionRef(0)} className="section-hidden py-20 bg-white/70 backdrop-blur-sm">
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
                <div>
                  {/* Typewriter effect for this heading */}
                  <TypewriterHeading
                    text={<>Unbox the <span className="text-pink-600">FUN</span> of Learning!</>}
                    className="text-4xl lg:text-5xl font-bold mb-6 text-gray-800 leading-tight font-['Bubblegum_Sans'] sm:font-['Fredoka']"
                  />
                  {/* Paragraph font changed to Nunito */}
                  <p className="text-lg text-gray-700 leading-relaxed font-['Nunito']">
                    Imagine a world where learning feels like playtime! Our super-fun activities and <br className="hidden sm:inline" /> bite-sized lessons are packed with giggles and 'aha!' moments, helping your <br className="hidden sm:inline" /> little one fall in love with discovering new things every single day.
                  </p>
                </div>
                <div>
                  {/* Blog Card 1 */}
                  <div
                    className={clsx(
                      "relative rounded-3xl p-8 overflow-hidden h-80 cursor-pointer group",
                      "transition-all duration-500 ease-in-out",
                      {
                        "bg-white": getCardDisplayMode(1) === 'blog',
                        "bg-cover bg-center": getCardDisplayMode(1) === 'image',
                      }
                    )}
                    style={getCardDisplayMode(1) === 'image' ? { backgroundImage: `url(${learningfun})` } : {}}
                    onMouseEnter={() => {
                      stopAutoAnimation(1);
                      setActiveBlogCard(1);
                      setAutoDisplayMode(prev => ({ ...prev, 1: 'blog' }));
                    }}
                    onMouseLeave={() => {
                      setActiveBlogCard(null);
                      setAutoDisplayMode(prev => ({ ...prev, 1: 'image' }));
                      startAutoAnimation(1);
                    }}
                    onClick={() => {
                      if (activeBlogCard === 1) {
                        setActiveBlogCard(null);
                        setAutoDisplayMode(prev => ({ ...prev, 1: 'image' }));
                        startAutoAnimation(1);
                      } else {
                        stopAutoAnimation(1);
                        setActiveBlogCard(1);
                        setAutoDisplayMode(prev => ({ ...prev, 1: 'blog' }));
                      }
                    }}
                  >
                    {getCardDisplayMode(1) === 'blog' && (
                      <BlogCard
                        title="Curiosity Sparks Brilliance!"
                        description="Explore exciting science, technology, engineering, and math concepts through playful activities and real-world wonders."
                        imageUrl={learningfun}
                        className="opacity-100"
                      />
                    )}
                    {getCardDisplayMode(1) === 'image' && (
                      <div className="absolute inset-0 flex items-end justify-start p-8 text-white bg-black bg-opacity-30 rounded-3xl opacity-100">
                        <h3 className="text-2xl font-bold font-['Bubblegum_Sans']">Sparking Great Ideas!</h3>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Blog Card 2 */}
                <div
                  className={clsx(
                    "relative rounded-3xl p-8 overflow-hidden h-80 cursor-pointer group",
                    "transition-all duration-500 ease-in-out",
                    {
                      "bg-white": getCardDisplayMode(2) === 'blog',
                      "bg-cover bg-center": getCardDisplayMode(2) === 'image',
                    }
                  )}
                  style={getCardDisplayMode(2) === 'image' ? { backgroundImage: `url(${kidsReading})` } : {}}
                  onMouseEnter={() => {
                    stopAutoAnimation(2);
                    setActiveBlogCard(2);
                    setAutoDisplayMode(prev => ({ ...prev, 2: 'blog' }));
                  }}
                  onMouseLeave={() => {
                    setActiveBlogCard(null);
                    setAutoDisplayMode(prev => ({ ...prev, 2: 'image' }));
                    startAutoAnimation(2);
                  }}
                  onClick={() => {
                    if (activeBlogCard === 2) {
                      setActiveBlogCard(null);
                      setAutoDisplayMode(prev => ({ ...prev, 2: 'image' }));
                      startAutoAnimation(2);
                    } else {
                      stopAutoAnimation(2);
                      setActiveBlogCard(2);
                      setAutoDisplayMode(prev => ({ ...prev, 2: 'blog' }));
                    }
                  }}
                >
                  {getCardDisplayMode(2) === 'blog' && (
                    <BlogCard
                      title="Reading for Superheroes!"
                      description="Dive into captivating stories and boost your child's literacy skills with our interactive books and story adventures."
                      imageUrl={kidsReading}
                      className="opacity-100"
                    />
                  )}
                  {getCardDisplayMode(2) === 'image' && (
                    <div className="absolute inset-0 flex items-end justify-start p-8 text-white bg-black bg-opacity-30 rounded-3xl opacity-100">
                      <h3 className="text-2xl font-bold font-['Bubblegum_Sans']">Magical Story Time!</h3>
                    </div>
                  )}
                </div>

                {/* Blog Card 3 (using heroTeacher as example for third image) */}
                <div
                  className={clsx(
                    "relative rounded-3xl p-8 overflow-hidden h-80 cursor-pointer group",
                    "transition-all duration-500 ease-in-out",
                    {
                      "bg-white": getCardDisplayMode(3) === 'blog',
                      "bg-cover bg-center": getCardDisplayMode(3) === 'image',
                    }
                  )}
                  style={getCardDisplayMode(3) === 'image' ? { backgroundImage: `url(${heroTeacher})` } : {}}
                  onMouseEnter={() => {
                    stopAutoAnimation(3);
                    setActiveBlogCard(3);
                    setAutoDisplayMode(prev => ({ ...prev, 3: 'blog' }));
                  }}
                  onMouseLeave={() => {
                    setActiveBlogCard(null);
                    setAutoDisplayMode(prev => ({ ...prev, 3: 'image' }));
                    startAutoAnimation(3);
                  }}
                  onClick={() => {
                    if (activeBlogCard === 3) {
                      setActiveBlogCard(null);
                      setAutoDisplayMode(prev => ({ ...prev, 3: 'image' }));
                      startAutoAnimation(3);
                    } else {
                      stopAutoAnimation(3);
                      setActiveBlogCard(3);
                      setAutoDisplayMode(prev => ({ ...prev, 3: 'blog' }));
                    }
                  }}
                >
                  {getCardDisplayMode(3) === 'blog' && (
                    <BlogCard
                      title="Parent Power-Up Tips!"
                      description="Get expert advice from experienced educators and make learning fun and effective right at home."
                      imageUrl={heroTeacher}
                      className="opacity-100"
                    />
                  )}
                  {getCardDisplayMode(3) === 'image' && (
                    <div className="absolute inset-0 flex items-end justify-start p-8 text-white bg-black bg-opacity-30 rounded-3xl opacity-100">
                      <h3 className="text-2xl font-bold font-['Bubblegum_Sans']">Guidance for Grown-Ups!</h3>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Hop, Skip & Learn Section */}
          <section ref={setSectionRef(1)} className="section-hidden py-20">
            <div className="container mx-auto px-6 bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
                <div>
                  {/* Typewriter effect for this heading */}
                  <TypewriterHeading
                    text={<>Hop, Skip, & Learn at <span className="text-purple-600">YOUR Pace!</span></>}
                    className="text-4xl lg:text-5xl font-bold mb-6 text-gray-800 leading-tight font-['Fredoka'] sm:font-['Bubblegum_Sans']"
                  />
                  {/* Paragraph font changed to Nunito */}
                  <p className="text-lg text-gray-700 leading-relaxed font-['Nunito']">
                    Every little learner is unique, just like a special snowflake! Our platform lets your child explore <br className="hidden sm:inline" /> and grow at their very own comfy speed. No rush, no pressure, just pure fun and <br className="hidden sm:inline" /> confidence-building at every step!
                  </p>
                  <button
                    className="bg-whiz-orange text-white px-8 py-3 rounded-full font-semibold hover:bg-whiz-orange/90 transition-colors duration-300 mt-6 shadow-md
                                  font-['Poppins']"
                    onClick={() => setIsQuizModal(true)}
                  >
                    Find My Child's Spark!
                  </button>
                </div>
                <div className="relative rounded-3xl overflow-hidden">
                  <video
                    src="/videos/learn-at-your-own-pace.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover rounded-3xl"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Future Skills Section */}
          <section ref={setSectionRef(2)} className="section-hidden py-20">
            <div className="container mx-auto px-6 bg-gradient-to-r from-blue-50/80 to-purple-50/80 backdrop-blur-sm rounded-3xl p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  {/* Typewriter effect for this heading */}
                  <TypewriterHeading
                    text={<>Unlocking Bright Futures: <br className="hidden sm:inline" /> Super Skills for <span className="text-blue-600">Tomorrow!</span></>}
                    className="text-4xl lg:text-5xl font-bold mb-6 text-gray-800 leading-tight font-['Fredoka'] sm:font-['Bubblegum_Sans']"
                  />
                  {/* Paragraph font changed to Nunito */}
                  <p className="text-lg text-gray-700 leading-relaxed mb-8 font-['Nunito']">
                    Get ready to unlock amazing superpowers for your child's future! Our exciting microlearning <br className="hidden sm:inline" /> adventures aren't just fun; they're building blocks for big thinkers, creative problem-solvers, <br className="hidden sm:inline" /> and confident leaders of tomorrow. Let's make their future sparkle!
                  </p>
                  <button
                    className="bg-whiz-orange text-white px-8 py-3 rounded-full font-semibold hover:bg-whiz-orange/90 transition-colors duration-300
                                  font-['Poppins']"
                    onClick={() => setIsAuthModalOpen(true)}
                  >
                    Join Our Learning Family!
                  </button>
                </div>
                <div className="relative">
                  <video
                    src="/videos/unlock-future.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full rounded-3xl object-cover"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Shine Section */}
          <section ref={setSectionRef(3)} className="section-hidden py-20">
            <div className="container mx-auto px-6 bg-white/80 backdrop-blur-sm rounded-3xl p-8">
              <div className="bg-blue-100 rounded-3xl p-16 relative overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="relative rounded-3xl overflow-hidden">
                    <video
                      src="/videos/empowering-children.mp4"
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover rounded-3xl"
                    />
                  </div>
                  <div>
                    {/* Typewriter effect for this heading */}
                    <TypewriterHeading
                      text={<>Watch Your Little Star <span className="text-yellow-600">SHINE!</span></>}
                      className="text-4xl lg:text-5xl font-bold mb-6 text-gray-800 leading-tight font-['Bubblegum_Sans'] sm:font-['Fredoka']"
                    />
                    {/* Paragraph font changed to Nunito */}
                    <p className="text-lg text-gray-700 leading-relaxed mb-8 font-['Nunito']">
                      We believe every child is a brilliant star waiting to shine! Our platform is a magical garden <br className="hidden sm:inline" /> where curiosity blooms, talents grow, and confidence soars. We nurture their unique <br className="hidden sm:inline" /> potential, helping them thrive not just academically, but as happy, well-rounded individuals.
                    </p>
                    <button
                      className="bg-whiz-orange text-white px-8 py-3 rounded-full font-semibold hover:bg-whiz-orange/90 transition-colors duration-300
                                  font-['Poppins']"
                      onClick={() => navigate('/programs')}
                    >
                      Explore Amazing Programs!
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Learning Magic: It's a Whole New World! Section */}
          <section
            ref={setSectionRef(4)}
            className="section-hidden py-20 bg-white/70 backdrop-blur-sm"
          >
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="relative rounded-3xl overflow-hidden">
                  <video
                    src="/videos/transforming-learning.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover rounded-3xl"
                  />
                </div>
                <div>
                  {/* Typewriter effect for this heading */}
                  <TypewriterHeading
                    text={<>Learning Magic: It's a <br className="hidden sm:inline" /> Whole New <span className="text-green-600">World!</span></>}
                    className="text-4xl lg:text-5xl font-bold mb-6 text-gray-800 leading-tight font-['Fredoka'] sm:font-['Bubblegum_Sans']"
                  />
                  {/* Paragraph font changed to Nunito */}
                  <p className="text-lg text-gray-700 leading-relaxed mb-8 font-['Nunito']">
                    Say goodbye to boring lessons and hello to learning magic! We're transforming how kids learn <br className="hidden sm:inline" /> by turning tough topics into thrilling games and exciting discoveries. Get ready for giggles, <br className="hidden sm:inline" /> 'Aha!' moments, and a lifelong love for exploring new knowledge!
                  </p>
                  <button
                    className="bg-whiz-orange text-white px-8 py-3 rounded-full font-semibold hover:bg-whiz-orange/90 transition-colors duration-300
                                  font-['Poppins']"
                    onClick={() => setIsQuizModal(true)}
                  >
                    Start Your Magic Journey!
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Building Tomorrow's Brightest Stars, Today! Section */}
          <section
            ref={setSectionRef(5)}
            className="section-hidden py-20 bg-white/70 backdrop-blur-sm"
          >
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                  {/* Typewriter effect for this heading */}
                  <TypewriterHeading
                    text={<>Building Tomorrow's <br className="hidden sm:inline" /> Brightest <span className="text-orange-600">Stars, Today!</span></>}
                    className="text-4xl lg:text-5xl font-bold mb-6 text-gray-800 leading-tight font-['Bubblegum_Sans'] sm:font-['Fredoka']"
                  />
                  {/* Paragraph font changed to Nunito */}
                  <p className="text-lg text-gray-700 leading-relaxed mb-8 font-['Nunito']">
                    We're not just teaching lessons; we're growing the super-smart, super-creative leaders of <br className="hidden sm:inline" /> tomorrow! Our platform helps unlock your child's unique gifts, encouraging them to think big, <br className="hidden sm:inline" /> dream wild, and become the amazing innovators and problem-solvers the world needs.
                  </p>
                  <button
                    className="bg-whiz-orange text-white px-8 py-3 rounded-full font-semibold hover:bg-whiz-orange/90 transition-colors duration-300
                                  font-['Poppins']"
                    onClick={() => setIsQuizModal(true)}
                  >
                    Discover Their Potential!
                  </button>
                </div>
                <div className="relative">
                  <img src={kidsGroup} alt="Diverse group of happy children learning and collaborating" className="w-full rounded-3xl" />
                  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4">
                    {/* These circles seem to be placeholders or decorative. */}
                    <div className="w-8 h-8 bg-white rounded-full"></div>
                    <div className="w-8 h-8 bg-white rounded-full"></div>
                    <div className="w-8 h-8 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 🌟 Bonus Polish: Mouse-Tracking Sparkles */}
          <SparkleTrail />

        </div> {/* End of relative z-10 content wrapper */}

      </div> {/* End of min-h-screen relative overflow-hidden wrapper */}

      {isQuizModalOpen && (
        <QuestionnaireModal
          isOpen={isQuizModalOpen}
          onClose={() => setIsQuizModal(false)}
          onComplete={handleQuizCompletion}
        />
      )}

      {isAuthModalOpen && (
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onAuthSuccess={handleAuthSuccess}
        />
      )}
    </>
  ); 
};

export default HomePage;