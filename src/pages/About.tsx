// src/pages/About.tsx

import React, { useEffect, useRef } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Heart, Target, Users, Lightbulb } from 'lucide-react';
import { useTypewriter, Cursor } from 'react-simple-typewriter';

// Import the background image
import watercolorBg from '../assets/5646846.jpg'; // <--- IMPORT THE IMAGE HERE

const About = () => {
  // We still need individual refs for observation if you want section-specific animations
  const heroSectionRef = useRef<HTMLDivElement | null>(null);
  const valuesSectionRef = useRef<HTMLDivElement | null>(null);
  const storySectionRef = useRef<HTMLDivElement | null>(null);
  const teamSectionRef = useRef<HTMLDivElement | null>(null);

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
      threshold: 0.2, // Adjust threshold as needed
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe each section
    if (heroSectionRef.current) {
      observer.observe(heroSectionRef.current);
    }
    if (valuesSectionRef.current) {
      observer.observe(valuesSectionRef.current);
    }
    if (storySectionRef.current) {
      observer.observe(storySectionRef.current);
    }
    if (teamSectionRef.current) {
      observer.observe(teamSectionRef.current);
    }

    return () => {
      // Disconnect observer for each ref when component unmounts
      if (heroSectionRef.current) observer.unobserve(heroSectionRef.current);
      if (valuesSectionRef.current) observer.unobserve(valuesSectionRef.current);
      if (storySectionRef.current) observer.unobserve(storySectionRef.current);
      if (teamSectionRef.current) observer.unobserve(teamSectionRef.current);
    };
  }, []);

  // Typewriter Hook for the main heading
  const [text] = useTypewriter({
    words: ['Our Mission', 'Our Story', 'Our Values'],
    loop: 0,
    typeSpeed: 70,
    deleteSpeed: 50,
    delaySpeed: 1500,
  });

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* New wrapper div for sections that should have the watercolor background */}
      <main
        className="pt-24 bg-cover bg-center bg-no-repeat" // Apply background here
        style={{ backgroundImage: `url(${watercolorBg})` }}
      >
        {/* Hero Section */}
        <section
          ref={heroSectionRef}
          className="section-hidden py-20 transition-all duration-700 ease-out" // Removed bg-gradient-hero
        >
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-5xl font-bold mb-6">
              <span className="text-gradient-orange">
                {text}
              </span>
              <Cursor cursorStyle='|' />
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We believe every child deserves access to engaging, high-quality education that sparks curiosity and builds confidence.
              WhizBee was created to make learning a joyful adventure for children everywhere.
            </p>
          </div>
        </section>

        {/* Values Section */}
        <section
          ref={valuesSectionRef}
          className="section-hidden py-20 transition-all duration-700 ease-out"
        >
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">
                What We <span className="text-gradient-blue">Believe</span>
              </h2>
              <p className="text-xl text-muted-foreground">Our core values drive everything we do</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Heart,
                  title: 'Child-Centered',
                  description: 'Every decision we make puts the child\'s happiness and growth first.',
                  color: 'whiz-pink'
                },
                {
                  icon: Target,
                  title: 'Purpose-Driven',
                  description: 'We\'re committed to creating meaningful educational experiences.',
                  color: 'whiz-orange'
                },
                {
                  icon: Users,
                  title: 'Inclusive',
                  description: 'Learning should be accessible and welcoming for all children.',
                  color: 'whiz-blue'
                },
                {
                  icon: Lightbulb,
                  title: 'Innovative',
                  description: 'We continuously evolve to make learning more engaging and effective.',
                  color: 'whiz-green'
                }
              ].map((value, index) => (
                <div key={index} className="neuro-card text-center group hover:scale-105 transition-all duration-300">
                  <div className={`w-16 h-16 bg-${value.color}/20 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                    <value.icon className={`w-8 h-8 text-${value.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section
          ref={storySectionRef}
          className="section-hidden py-20 transition-all duration-700 ease-out" // Removed bg-gradient-to-r
        >
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-8">
                Our <span className="text-gradient-orange">Story</span>
              </h2>
              <div className="neuro-card text-left">
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  WhizBee was born from a simple observation: children learn best when they're having fun.
                  As parents and educators, we noticed that traditional learning methods often failed to capture
                  the natural curiosity and enthusiasm that children bring to discovering the world around them.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  We set out to create a platform that would harness the power of technology to deliver
                  bite-sized learning experiences that feel more like play than work. Every lesson, game,
                  and interaction is carefully crafted to not just teach, but to inspire.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Today, WhizBee serves thousands of families worldwide, helping children develop critical
                  thinking skills, creativity, and a lifelong love of learning. We're not just building
                  an educational platform – we're nurturing the next generation of innovators, creators, and leaders.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main> {/* End of the watercolor background wrapper for main content */}


      {/* Team Section - This section REMAINS OUTSIDE the main wrapper to preserve its video background */}
      <section
        ref={teamSectionRef}
        className="section-hidden py-20 relative overflow-hidden transition-all duration-700 ease-out"
      >
        {/* Background Video */}
        <video
          src="/videos/team-bg.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        />

        {/* Optional Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/70 via-white/30 to-white/10 z-10" />

        {/* Content */}
        <div className="relative z-20 container mx-auto px-6">
          <div className="text-center mb-16 animate-fade-up">
            <h2 className="text-5xl font-extrabold mb-4 tracking-tight text-gray-800">
              Meet the <span className="text-gradient-blue">Team</span>
            </h2>
            <p className="text-xl text-gray-600 font-medium">
              Passionate educators, parents, and technologists working together
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: 'Dr. Sarah Chen',
                role: 'Chief Education Officer',
                bio: 'Former elementary school principal with 15 years of experience.',
                color: 'whiz-blue'
              },
              {
                name: 'Michael Rodriguez',
                role: 'Head of Product',
                bio: 'Parent of two and ex-game designer passionate about fun learning.',
                color: 'whiz-orange'
              },
              {
                name: 'Dr. Amara Okafor',
                role: 'Learning Scientist',
                bio: 'Child psychologist focused on cognitive development.',
                color: 'whiz-purple'
              },
              {
                name: 'Anamitra Roy',
                role: 'Founder of WhizBee',
                bio: 'AI researcher working on personalized educational tools.',
                color: 'whiz-pink'
              }
            ].map((member, index) => (
              <div
                key={index}
                className="neuro-card text-center bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl hover:scale-105 transform transition duration-300 animate-fade-up"
              >
                <div
                  className={`w-20 h-20 bg-${member.color}/30 rounded-full mx-auto mb-4 flex items-center justify-center`}
                >
                  <span className={`text-2xl font-bold text-${member.color}`}>
                    {member.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className={`text-${member.color} font-medium mb-2`}>{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;