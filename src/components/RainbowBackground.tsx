// src/components/RainbowBackground.tsx
import React, { useEffect, useRef } from 'react';

const RainbowBackground = () => {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let hue = 0;
    // Set up an interval to continuously change the hue
    const interval = setInterval(() => {
      hue = (hue + 1) % 360; // Increment hue, reset to 0 after 359
      if (bgRef.current) {
        // Apply a linear gradient with two shifting HSL colors
        bgRef.current.style.background = `linear-gradient(120deg, hsl(${hue}, 100%, 85%), hsl(${(hue + 60) % 360}, 100%, 85%))`;
      }
    }, 60); // Adjust this value (milliseconds) to control the speed of the hue shift

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, []); // Empty dependency array ensures this effect runs once on mount and cleans up on unmount

  return (
    // The div that will display the rainbow background
    // z-[-10] places it behind other z-indexed elements (like z-0 and z-10)
    // transition-all duration-1000 ease-in-out ensures smooth color changes
    <div
      ref={bgRef}
      className="absolute inset-0 z-[-10] transition-all duration-1000 ease-in-out"
    />
  );
};

export default RainbowBackground;