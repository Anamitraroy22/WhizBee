// src/components/TypewriterHeading.tsx
import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface Props {
  text: React.ReactNode;
  className?: string;
}

// Helper function to extract plain text from ReactNode (handles nested JSX)
const getPlainText = (node: React.ReactNode): string => {
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node); // Directly return string or number
  }
  if (Array.isArray(node)) {
    // If it's an array of children, recursively get text for each and join
    return node.map(getPlainText).join('');
  }
  if (React.isValidElement(node) && node.props && node.props.children !== undefined) {
    // If it's a React element with children, recursively get text from children
    return getPlainText(node.props.children);
  }
  // For null, undefined, boolean, or elements without children (like <br /> which often has no children), return empty string.
  return '';
};

const TypewriterHeading = ({ text, className }: Props) => {
  // useInView hook to detect when the element enters the viewport
  // threshold: 0.3 means 30% of the element must be visible to trigger
  // triggerOnce: true ensures the animation runs only once when it comes into view
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });
  
  // State to control whether the full text should be shown (after typing is complete)
  const [showFullText, setShowFullText] = useState(false);
  
  // State to hold the text currently being displayed by the typewriter effect
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    // Only start typing if the element is in view and the full text hasn't been shown yet
    if (inView && !showFullText) {
      // Use our helper to get a clean plain text string from the 'text' prop
      const plainText = getPlainText(text);
      let i = 0; // Index for typing animation

      const interval = setInterval(() => {
        // Update displayed text character by character
        setDisplayedText((prev) => plainText.slice(0, i + 1));
        i++;
        
        // If all characters have been displayed, clear interval and show full text
        if (i >= plainText.length) {
          clearInterval(interval);
          setShowFullText(true);
        }
      }, 30); // Typing speed (30ms per character)

      // Cleanup function: Clear the interval if the component unmounts or dependencies change
      return () => clearInterval(interval);
    }
  }, [inView, text, showFullText]); // Dependencies for the effect

  return (
    // The <h2> element that will display the typewriter text
    // The 'ref' is attached for useInView to observe
    // It shows 'displayedText' during animation, then 'text' (original JSX) when done
    <h2 ref={ref} className={className}>
      {showFullText ? text : displayedText}
    </h2>
  );
};

export default TypewriterHeading;