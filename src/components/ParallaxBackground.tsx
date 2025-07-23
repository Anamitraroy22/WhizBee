// src/components/ParallaxBackground.tsx (REVISED)
import React, { useEffect, useState } from 'react';

// Import static decorative assets for this layer
import cloud1 from '../assets/deco/cloud1.png';
import cloud2 from '../assets/deco/cloud2.png';
import star from '../assets/deco/star.png';
import decorativePlanet from '../assets/deco/ballons.png'; // Using ballons.png as a placeholder

// Import assets for the falling rain effect
import rainPlanet1 from '../assets/deco/planet1.png';
import rainPlanet2 from '../assets/deco/planet2.png';
import rocket from '../assets/deco/rocket.png';
import books from '../assets/deco/books.png';
import animal from '../assets/deco/animal.png';
import monkey from '../assets/deco/monkey.png';
import bell from '../assets/deco/bell.png';

// Consolidated list of items for the falling rain effect
const fallingRainItems = [
  rainPlanet1, rainPlanet2, cloud1, cloud2,
  rocket, star, books, animal, monkey, bell,
];

const ParallaxBackground = () => {
  const [renderedRainItems, setRenderedRainItems] = useState<JSX.Element[]>([]);

  // Effect for generating falling rain items
  useEffect(() => {
    const generateRain = () => {
      const items = Array.from({ length: 30 }).map((_, index) => {
        const itemSrc = fallingRainItems[index % fallingRainItems.length];
        const left = Math.random() * 100;
        const duration = 8 + Math.random() * 5;
        const delay = Math.random() * 5;
        const size = 40 + Math.random() * 20; // Size variation for depth effect

        return (
          <img
            key={index}
            src={itemSrc}
            className="absolute animate-fall motion-blur pointer-events-none"
            style={{
              left: `${left}%`,
              top: `-${size}px`, // Start above the viewport of this component's parent
              width: `${size}px`,
              height: 'auto',
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
              opacity: `${0.6 + Math.random() * 0.4}`, // Random opacity for depth
              transform: `scale(${0.8 + Math.random() * 0.4})`, // Random scale for depth
            }}
            alt="" // Decorative image, alt can be empty
          />
        );
      });
      setRenderedRainItems(items);
    };

    generateRain(); // Generate rain on component mount
  }, []); // Empty dependency array to run once

  return (
    // This component is an absolute overlay within its *parent container* (HomePage's content wrapper).
    // It's set to z-10, placing it above the `RainbowBackground` but behind main content (z-20+).
    // overflow-hidden is crucial to contain animations within its bounds.
    <div
      className="absolute inset-0 z-10 overflow-hidden pointer-events-none"
      aria-hidden="true" // Indicate it's for decorative purposes
    >
      {/* Layer 1: Falling Rain Elements */}
      {renderedRainItems}

      {/* Layer 2: Main Static Parallax Decorative Elements (Clouds, Star, and 'decorativePlanet') */}
      <img
        src={cloud1}
        className="absolute w-40 sm:w-60 animate-float-slow"
        style={{ top: '10%', left: '5%' }}
        alt="cloud"
      />
      <img
        src={cloud2}
        className="absolute w-48 sm:w-72 animate-float"
        style={{ top: '30%', right: '10%' }}
        alt="cloud"
      />
      <img
        src={decorativePlanet} // Using the imported decorativePlanet (ballons.png)
        className="absolute w-20 sm:w-28 animate-rotate-slow"
        style={{ bottom: '20%', left: '25%' }}
        alt="decorative planet"
      />
      <img
        src={star}
        className="absolute w-16 sm:w-20 animate-pulse"
        style={{ bottom: '5%', right: '15%' }}
        alt="star"
      />

      {/* Layer 3: Animated Shapes (circles, squares, triangles) - Moved from HomePage.tsx */}
      {/* These are also absolute within this ParallaxBackground component */}
      <div className="absolute inset-0 opacity-30">
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
    </div>
  );
};

export default ParallaxBackground;