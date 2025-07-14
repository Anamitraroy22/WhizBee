// src/pages/Programs.tsx

import React, { useEffect, useRef, useState } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Palette, Beaker, BookOpen, Music, Globe, Calculator, Star, ArrowRight } from 'lucide-react';
import { useTypewriter, Cursor } from 'react-simple-typewriter';
import ProgramDetailsModal from '../components/ProgramDetailsModal';
import PricingModal from '../components/PricingModal.tsx';

// Import Firestore functions
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase'; // Import your Firestore instance
// useAuth, doc, getDoc, setDoc, serverTimestamp, updateDoc, useToast, FreeTrialContentModal imports removed from here
// as their logic is now primarily in ProgramDetailsModal or not directly on the card.

// Import the background image
import watercolorBg from '../assets/5646846.jpg';

// Define the Program interface to include new fields
export interface Program { // <--- THIS 'EXPORT' IS CRUCIAL
  icon: React.ElementType;
  title: string;
  age: string;
  description: string;
  modules: string[];
  features: string[];
  price: number;
  discount: number;
  color: string;
  featured: boolean;
  // Add a field to link to free trial content
  freeTrialContentId?: string; // Optional: ID of the free trial content document
}

// Define FreeTrialContent interface based on our schema
export interface FreeTrialContent { // <--- THIS 'EXPORT' IS CRUCIAL
  id: string; // Document ID from Firestore
  programId: string;
  title: string;
  description: string;
  durationMinutes: number;
  contentModules: Array<{
    moduleId: string;
    type: 'video' | 'quiz' | 'interactiveStory' | 'game';
    data: any; // Flexible for different content types
  }>;
}

const Programs = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [freeTrialContents, setFreeTrialContents] = useState<FreeTrialContent[]>([]);
  const [loadingFreeTrialContent, setLoadingFreeTrialContent] = useState(true);
  // userTrialProgress, trialProgressLoading, showFreeTrialContentModal, currentFreeTrialContent removed
  // as their direct interaction is no longer on the program card level.

  const heroSectionRef = useRef<HTMLElement | null>(null);
  const programsGridRef = useRef<HTMLElement | null>(null);
  const howItWorksRef = useRef<HTMLElement | null>(null);
  const ctaRef = useRef<HTMLElement | null>(null);

  // No longer directly using useAuth or useToast here for card-level logic.
  // const { currentUser, loading: authLoading } = useAuth();
  // const { toast } = useToast();


  // Fetch free trial content from Firestore on component mount
  // This is still needed to pass to ProgramDetailsModal
  useEffect(() => {
    const fetchFreeTrialContent = async () => {
      try {
        const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
        const querySnapshot = await getDocs(collection(db, `artifacts/${appId}/public/data/freeTrialContent`));
        const contents: FreeTrialContent[] = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as FreeTrialContent));
        setFreeTrialContents(contents);
      } catch (error) {
        console.error("Error fetching free trial content:", error);
      } finally {
        setLoadingFreeTrialContent(false);
      }
    };

    fetchFreeTrialContent();
  }, []);

  // Removed fetchUserTrialProgress useEffect from here,
  // as trial status check will be done inside ProgramDetailsModal when it opens.


  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('section-hidden');
          entry.target.classList.add('section-visible');
        } else {
          entry.target.classList.remove('section-visible');
          entry.target.classList.add('section-hidden');
        }
      });
    };

    const observerOptions = {
      threshold: 0.2,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const sections = [heroSectionRef, programsGridRef, howItWorksRef, ctaRef];
    sections.forEach(ref => {
      if (ref.current) {
        ref.current.classList.add('section-hidden');
        observer.observe(ref.current);
      }
    });

    return () => {
      sections.forEach(ref => {
        if (ref.current) observer.unobserve(ref.current);
      });
    };
  }, []);

  const [text] = useTypewriter({
    words: ['Learning Programs', 'New Adventures', 'Bright Futures'],
    loop: 0,
    typeSpeed: 70,
    deleteSpeed: 50,
    delaySpeed: 1500,
  });

  const openProgramDetails = (program: Program) => {
    setSelectedProgram(program);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProgram(null);
  };

  const openPricingModal = () => {
    setShowPricingModal(true);
  };

  const closePricingModal = () => {
    setShowPricingModal(false);
  };

  // handleStartFreeTrialFromCard and handleEnrollNowFromCard removed from here,
  // as their logic is now handled within ProgramDetailsModal.


  // Define programs with a freeTrialContentId to link them
  const programs: Program[] = [
    {
      icon: Palette,
      title: 'Creative Arts',
      age: '6-12 years',
      description: 'Unleash imagination through digital art, storytelling, and creative expression.',
      modules: ['Digital Drawing', 'Story Writing', 'Animation Basics', 'Creative Thinking'],
      features: [
        'Interactive Art Lessons', 'Guided Storytelling Sessions', 'Basic Animation Principles', 'Color Theory Fundamentals',
        'Digital Tools Proficiency', 'Portfolio Building Tips', 'Peer Feedback & Collaboration', 'Creative Challenges',
        'Certificate of Completion', 'Access to Art Resources'
      ],
      price: 19.99,
      discount: 0.15,
      color: 'whiz-pink',
      featured: false,
      freeTrialContentId: 'creative_arts_trial_001' // Link to a specific trial content document
    },
    {
      icon: Beaker,
      title: 'STEM Explorers',
      age: '7-12 years',
      description: 'Discover the wonders of science, technology, engineering, and math through hands-on experiments.',
      modules: ['Fun Chemistry', 'Basic Coding', 'Engineering Challenges', 'Math Games'],
      features: [
        'Engaging Science Experiments', 'Introduction to Block Coding', 'Robotics Fundamentals', 'Problem-Solving Challenges',
        'Critical Thinking Exercises', 'Interactive Math Puzzles', 'Virtual Lab Simulations', 'Team-Based Projects',
        'STEM Career Spotlights', 'Exclusive Access to STEM Webinars'
      ],
      price: 24.99,
      discount: 0.20,
      color: 'whiz-blue',
      featured: true,
      freeTrialContentId: 'stem_explorers_trial_001' // Link to a specific trial content document
    },
    {
      icon: BookOpen,
      title: 'Reading Adventures',
      age: '6-10 years',
      description: 'Build reading skills through interactive stories and comprehension activities.',
      modules: ['Phonics Fun', 'Story Comprehension', 'Vocabulary Building', 'Reading Fluency'],
      features: [
        'Interactive Storybooks', 'Phonics & Decoding Practice', 'Vocabulary Expansion Games', 'Reading Comprehension Quizzes',
        'Personalized Reading Paths', 'Audiobook Library Access', 'Writing Prompts for Creativity', 'Read-Aloud Sessions',
        'Progress Tracking Dashboard', 'Parental Reading Guides'
      ],
      price: 17.99,
      discount: 0.10,
      color: 'whiz-green',
      featured: false,
      freeTrialContentId: 'reading_adventures_trial_001'
    },
    {
      icon: Music,
      title: 'Music & Rhythm',
      age: '6-12 years',
      description: 'Explore the world of music through interactive lessons and rhythm games.',
      modules: ['Basic Music Theory', 'Rhythm Patterns', 'Instrument Introduction', 'Melody Creation'],
      features: [
        'Introduction to Music Theory', 'Rhythm & Beat Training', 'Virtual Instrument Exploration', 'Melody & Song Creation',
        'Music History Stories', 'Interactive Ear Training', 'Digital Music Production Basics', 'Performance Challenges',
        'Access to Sheet Music Library', 'Expert-Led Workshops'
      ],
      price: 18.99,
      discount: 0.10,
      color: 'whiz-yellow',
      featured: false,
      freeTrialContentId: 'music_rhythm_trial_001'
    },
    {
      icon: Globe,
      title: 'World Explorers',
      age: '8-12 years',
      description: 'Journey around the world to learn about different cultures, geography, and history.',
      modules: ['Cultural Awareness', 'Geography Games', 'Historical Stories', 'Language Basics'],
      features: [
        'Virtual World Tours', 'Cultural Festivals & Traditions', 'Interactive Maps & Geography', 'Historical Storytelling',
        'Basic Language Phrases', 'Global Cuisine Exploration', 'Wildlife & Ecosystem Studies', 'World Landmark Quizzes',
        'Pen Pal Program Option', '"Travel Journal" Activities'
      ],
      price: 21.99,
      discount: 0.15,
      color: 'whiz-purple',
      featured: false,
      freeTrialContentId: 'world_explorers_trial_001'
    },
    {
      icon: Calculator,
      title: 'Math Mastery',
      age: '6-12 years',
      description: 'Make math fun with interactive games, puzzles, and real-world applications.',
      modules: ['Number Sense', 'Problem Solving', 'Geometry Fun', 'Math in Daily Life'],
      features: [
        'Engaging Math Games', 'Core Arithmetic Practice', 'Geometry & Shapes Exploration', 'Word Problem Solving Skills',
        'Interactive Math Puzzles', 'Real-World Math Applications', 'Personalized Progress Tracking', 'Mental Math Strategies',
        'Challenge Quizzes', 'Parental Math Guides'
      ],
      price: 22.99,
      discount: 0.20,
      color: 'whiz-orange',
      featured: true,
      freeTrialContentId: 'math_mastery_trial_001'
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      <main
        className="pt-24 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${watercolorBg})` }}
      >
        {/* Hero Section */}
        <section
          ref={heroSectionRef}
          className="py-20 section-hidden transition-all duration-700 ease-out"
        >
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-5xl font-bold mb-6 text-foreground">
              <span className="text-gradient-orange">
                {text}
              </span>
              <Cursor cursorStyle='|' />
            </h1>
            <p className="text-xl text-foreground max-w-3xl mx-auto leading-relaxed">
              Discover our carefully crafted microlearning modules designed to spark curiosity,
              build confidence, and make learning an exciting adventure for every child.
            </p>
          </div>
        </section>

        {/* Programs Grid Section */}
        <section
          ref={programsGridRef}
          className="py-20 section-hidden transition-all duration-700 ease-out"
        >
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {programs.map((program, index) => {
                // Removed hasTrialBeenTaken logic from here, it will be in the modal
                return (
                  <div
                    key={index}
                    className={`neuro-card group hover:scale-105 transition-all duration-300 relative ${
                      program.featured ? 'ring-2 ring-whiz-orange' : ''
                    }`}
                  >
                    {program.featured && (
                      <div className="absolute -top-3 -right-3 bg-whiz-orange text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                        <Star className="w-4 h-4 mr-1" />
                        Popular
                      </div>
                    )}

                    <div className={`w-16 h-16 bg-${program.color}/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <program.icon className={`w-8 h-8 text-${program.color}`} />
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-foreground">{program.title}</h3>
                      <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded-full">
                        {program.age}
                      </span>
                    </div>

                    <p className="text-foreground mb-6 leading-relaxed">
                      {program.description}
                    </p>

                    {/* Restored original layout: Modules list directly here */}
                    <div className="mb-6">
                      <h4 className="font-semibold mb-3 text-sm uppercase tracking-wide text-foreground">
                        What's Included:
                      </h4>
                      <ul className="space-y-2">
                        {program.modules.map((module, moduleIndex) => (
                          <li key={moduleIndex} className="flex items-center text-sm text-foreground">
                            <div className={`w-2 h-2 bg-${program.color} rounded-full mr-3`}></div>
                            {module}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Only the "Explore Program" button at the bottom */}
                    <button
                      onClick={() => openProgramDetails(program)}
                      className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center group border-2 border-${program.color} text-${program.color} hover:bg-${program.color} hover:text-white`}
                    >
                      Explore Program
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section
          ref={howItWorksRef}
          className="py-20 section-hidden transition-all duration-700 ease-out"
        >
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 text-foreground">
                How Our <span className="text-gradient-blue">Programs Work</span>
              </h2>
              <p className="text-xl text-foreground">
                Simple, effective, and designed for young learners
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: '1',
                  title: 'Choose Your Adventure',
                  description: 'Select programs that match your child\'s interests and learning goals.',
                  color: 'whiz-blue'
                },
                {
                  step: '2',
                  title: 'Learn Through Play',
                  description: 'Engage with interactive lessons, games, and activities designed for fun learning.',
                  color: 'whiz-orange'
                },
                {
                  step: '3',
                  title: 'Track Progress',
                  description: 'Watch your child grow with detailed progress reports and achievement celebrations.',
                  color: 'whiz-green'
                }
              ].map((step, index) => (
                <div key={index} className="text-center">
                  <div className={`w-20 h-20 bg-${step.color} rounded-full flex items-center justify-center mb-6 mx-auto`}>
                    <span className="text-2xl font-bold text-white">{step.step}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-foreground">{step.title}</h3>
                  <p className="text-foreground leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section
          ref={ctaRef}
          className="py-20 section-hidden transition-all duration-700 ease-out"
        >
          <div className="container mx-auto px-6 text-center">
            <div className="neuro-card max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold mb-6 text-foreground">
                Ready to Start <span className="text-gradient-orange">Learning?</span>
              </h2>
              <p className="text-xl text-foreground mb-8 leading-relaxed">
                Join thousands of families who have discovered the joy of learning with WhizBee.
                Start your child's educational adventure today!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="neuro-button">
                  Start Free Trial
                </button>
                <button
                  onClick={openPricingModal}
                  className="px-8 py-4 rounded-full border-2 border-whiz-blue text-whiz-blue font-semibold hover:bg-whiz-blue hover:text-white transition-all duration-300"
                >
                  View Pricing
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Program Details Modal - Pass freeTrialContents and loading state */}
      {showModal && selectedProgram && (
        <ProgramDetailsModal
          program={selectedProgram}
          onClose={closeModal}
          freeTrialContents={freeTrialContents}
          loadingFreeTrialContent={loadingFreeTrialContent}
        />
      )}

      {/* Pricing Modal */}
      {showPricingModal && (
        <PricingModal programs={programs} onClose={closePricingModal} />
      )}
    </div>
  );
};

export default Programs;