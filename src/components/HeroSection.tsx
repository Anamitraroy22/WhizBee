import React, { useState } from 'react';
import { motion } from 'framer-motion';
import HeroTypewriterHeading from './HeroTypewriterHeading'; // Adjust path if needed

const HeroSection = () => {
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);

    return (
        <section className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50">
            {/* Background Video */}
            <video
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                onCanPlayThrough={() => setIsVideoLoaded(true)}
                className="absolute top-0 left-0 w-full h-full object-cover z-0 pointer-events-none select-none"
                style={{
                    backfaceVisibility: 'hidden',
                    willChange: 'transform',
                    transform: 'translate3d(0, 0, 0)',
                }}
            >
                <source src="/assets/whizbee-home.mp4" type="video/mp4" />
            </video>

            {/* Fade-in Hero Content */}
            {isVideoLoaded && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.2 }}
                    className="absolute inset-0 z-10 flex flex-col justify-center items-center px-4 text-center"
                >
                    <HeroTypewriterHeading />
                </motion.div>
            )}
        </section>
    );
};

export default HeroSection;
