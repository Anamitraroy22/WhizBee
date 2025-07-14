// src/components/SparkleTrail.tsx
import React, { useEffect, useRef } from 'react';

const SparkleTrail = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // We will attach the event listener to the window object
    // This ensures that mouse movements anywhere on the page trigger the sparkles
    // regardless of other elements' z-index or pointer-events properties.

    const createSparkle = (e: MouseEvent) => {
      const sparkle = document.createElement('div');
      sparkle.className = 'sparkle';
      // Position the sparkle relative to the viewport using clientX/Y
      sparkle.style.left = `${e.clientX}px`;
      sparkle.style.top = `${e.clientY}px`;
      
      // Append the sparkle to the containerRef's current element
      // This container will still be the parent, allowing it to manage the sparkles
      // and ensure they are within the intended z-index context.
      if (containerRef.current) {
        containerRef.current.appendChild(sparkle);
      }
      
      // Remove the sparkle after its animation duration
      setTimeout(() => sparkle.remove(), 1000); // Remove sparkle after 1 second
    };

    // Add the mousemove event listener to the window
    window.addEventListener('mousemove', createSparkle);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('mousemove', createSparkle);
    };
  }, []); // Empty dependency array ensures this effect runs once on mount and cleans up on unmount

  // The container for the sparkles. It should still be absolute and cover the area
  // where you want sparkles to appear. Its z-index: 20 ensures it's on top.
  // pointer-events-none is still useful here so the container itself doesn't block clicks
  // on elements beneath it, even though the mousemove is now global.
  return <div ref={containerRef} className="absolute inset-0 z-20 pointer-events-none"></div>;
};

export default SparkleTrail;
