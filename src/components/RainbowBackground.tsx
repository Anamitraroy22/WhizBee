// src/components/RainbowBackground.tsx (REVISED for fixed positioning)
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
  }, []);

  return (
    // Key Change: Use 'fixed' instead of 'absolute' for viewport-wide coverage.
    // Also, use a very low z-index like z-[-20] or z-[-100] to ensure it's behind everything.
    // The transition-all is still relevant for smooth changes if any other properties were to change via Tailwind.
    <div
      ref={bgRef}
      className="fixed inset-0 z-[-100] transition-all duration-1000 ease-in-out" // Changed to 'fixed' and z-[-100]
    />
  );
};

export default RainbowBackground;