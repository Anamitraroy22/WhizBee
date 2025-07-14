// src/components/HeroTypewriterHeading.tsx

import React, { useEffect, useState } from 'react';

// The texts array for the cycling effect
const heroTexts = [
  'Interactive',
  "Children's Learning",
  'Platform',
];

const HeroTypewriterHeading = () => {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    // This interval handles typing out characters
    const typingInterval = setInterval(() => {
      if (charIndex < heroTexts[index].length) {
        setText((prev) => prev + heroTexts[index][charIndex]);
        setCharIndex((prev) => prev + 1);
      } else {
        // When a word is fully typed, clear the typing interval
        clearInterval(typingInterval);
        // Wait for 2 seconds, then reset and move to the next word
        const cycleTimeout = setTimeout(() => {
          setText('');
          setCharIndex(0);
          setIndex((prev) => (prev + 1) % heroTexts.length);
        }, 2000); 
        return () => clearTimeout(cycleTimeout); // Cleanup timeout on unmount
      }
    }, 100); // Typing speed

    return () => clearInterval(typingInterval); // Cleanup typing interval on unmount
  }, [charIndex, index]); // Dependencies for useEffect

  return (
    <h1 className="text-white text-4xl md:text-6xl font-bold leading-tight">
      {text}
      <span className="border-r-2 border-white ml-1 animate-pulse" />
    </h1>
  );
};

export default HeroTypewriterHeading;