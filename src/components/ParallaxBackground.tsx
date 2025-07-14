// src/components/ParallaxBackground.tsx
import React, { useEffect, useRef, useState } from 'react';

// Import static decorative assets for this layer
import cloud1 from '../assets/deco/cloud1.png';
import cloud2 from '../assets/deco/cloud2.png';
import star from '../assets/deco/star.png';
// Using ballons.png as a placeholder for planet.png as it was missing
import decorativePlanet from '../assets/deco/ballons.png';

// Import assets for the falling rain effect
import rainPlanet1 from '../assets/deco/planet1.png';
import rainPlanet2 from '../assets/deco/planet2.png';
// cloud1 and cloud2 are already imported above for static parallax, can reuse
import rocket from '../assets/deco/rocket.png';
// star is already imported above for static parallax, can reuse
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
  const rainbowBgRef = useRef<HTMLDivElement>(null);
  const [renderedRainItems, setRenderedRainItems] = useState<JSX.Element[]>([]);

  // Effect for the Rainbow Background hue shift (moved from RainbowBackground.tsx)
  useEffect(() => {
    let hue = 0;
    const interval = setInterval(() => {
      hue = (hue + 1) % 360;
      if (rainbowBgRef.current) {
        rainbowBgRef.current.style.background = `linear-gradient(120deg, hsl(${hue}, 100%, 85%), hsl(${(hue + 60) % 360}, 100%, 85%))`;
      }
    }, 60); // Adjust speed here if needed
    return () => clearInterval(interval);
  }, []); // Empty dependency array ensures this effect runs once on mount and cleans up on unmount

  // Effect for generating falling rain items (moved from ParallaxRain.tsx)
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
              top: `-${size}px`, // Start above the viewport
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
    // This is the main container for ALL background layers after the Hero section.
    // It is fixed positioned to cover the entire viewport from top: 100vh downwards.
    // z-0 ensures it's behind the content (which will be z-10 or z-20).
    // pointer-events-none ensures it doesn't block interactions.
    // overflow-hidden is crucial to contain animations within its bounds.
    <div
      className="fixed top-[100vh] left-0 w-full h-[calc(100%-100vh)] z-0 overflow-hidden pointer-events-none"
      aria-hidden="true" // Indicate it's for decorative purposes
    >
      {/* Layer 1: Rainbow Hue-Shifting Background (Deepest Layer: z-[-10] implicitly from its style) */}
      <div
        ref={rainbowBgRef}
        className="absolute inset-0 z-[-10] transition-all duration-1000 ease-in-out"
      />

      {/* Layer 2: Falling Rain Elements (z-0, same as this container) */}
      {renderedRainItems}

      {/* Layer 3: Main Static Parallax Decorative Elements (Clouds, Star, and 'decorativePlanet') */}
      {/* These elements are positioned with z-index 0, intermingling with falling rain */}
      <img
        src={cloud1}
        className="absolute w-40 sm:w-60 animate-float-slow"
        style={{ top: '10%', left: '5%', zIndex: 0 }}
        alt="cloud"
      />
      <img
        src={cloud2}
        className="absolute w-48 sm:w-72 animate-float"
        style={{ top: '30%', right: '10%', zIndex: 0 }}
        alt="cloud"
      />
      <img
        src={decorativePlanet} // Using the imported decorativePlanet (ballons.png)
        className="absolute w-20 sm:w-28 animate-rotate-slow"
        style={{ bottom: '20%', left: '25%', zIndex: 0 }}
        alt="decorative planet"
      />
      <img
        src={star}
        className="absolute w-16 sm:w-20 animate-pulse"
        style={{ bottom: '5%', right: '15%', zIndex: 0 }}
        alt="star"
      />

      {/* Your existing animated shapes (circles, squares, triangles) from HomePage.tsx
          are still at z-0 within the content wrapper. They will also appear
          on top of these background elements. If you want them to be part of
          this fixed background, they should be moved here. */}

    </div>
  );
};

export default ParallaxBackground;