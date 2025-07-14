// src/components/ParallaxRain.tsx
import React, { useEffect, useState } from 'react';

const rainItems = [
  'planet1.png', 'planet2.png', 'cloud1.png', 'cloud2.png',
  'rocket.png', 'star.png', 'books.png', 'animal.png', 'monkey.png', 'bell.png',
];

const ParallaxRain: React.FC = () => {
  const [renderedItems, setRenderedItems] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const generateRain = () => {
      const items = Array.from({ length: 30 }).map((_, index) => {
        const item = rainItems[index % rainItems.length];
        const left = Math.random() * 100;
        const duration = 8 + Math.random() * 5;
        const delay = Math.random() * 5;
        const size = 40 + Math.random() * 20;

        return (
          <img
            key={index}
            src={`/assets/deco/${item}`}
            className="absolute animate-fall motion-blur pointer-events-none"
            style={{
              left: `${left}%`,
              top: `-${size}px`,
              width: `${size}px`,
              height: 'auto',
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
            }}
            alt=""
          />
        );
      });
      setRenderedItems(items);
    };

    generateRain();
  }, []);

  return (
    <div
      className="fixed top-[100vh] left-0 w-full h-[calc(100%-100vh)] z-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {renderedItems}
    </div>
  );
};

export default ParallaxRain;
