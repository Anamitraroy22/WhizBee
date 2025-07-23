// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],

  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],

  // ✅ Safelist to prevent purging of dynamic classes
  safelist: [
    'section-hidden',
    'section-visible',
    // --- ADDED/UPDATED FOR RAIN EFFECT ---
    'animate-fall', // Ensure animate-fall is not purged
    'motion-blur',  // Ensure motion-blur is not purged
    // ------------------------------------
    // Patterns for dynamic 'whiz' colors
    {
      pattern: /(bg|text|border|ring|hover:bg|hover:text)-(whiz)-(blue|orange|purple|green|yellow|pink)(\/\d+)?/,
      variants: ['responsive', 'hover', 'focus'], // Include any variants you use
    },
    // Pattern for dynamic width/height classes (e.g., w-16, h-20)
    {
      pattern: /(w|h)-\d+/,
      variants: ['responsive'],
    },
  ],

  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },

    extend: {
      // ✅ Corrected: Merged all fontFamily definitions into one block
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'], // Keep existing Poppins if needed as a default or specific use
        'bubblegum-sans': ['"Bubblegum Sans"', 'cursive'],
        'fredoka': ['Fredoka', 'sans-serif'],
        'quicksand': ['Quicksand', 'sans-serif'],
        'nunito': ['Nunito', 'sans-serif'], // New: For paragraphs!
        // Add other custom fonts you might use here
      },

      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',

        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },

        // 🐝 WhizBee Custom Tokens (using HSL variables from your previous config)
        whiz: {
          orange: 'hsl(var(--whiz-orange))',
          blue: 'hsl(var(--whiz-blue))',
          purple: 'hsl(var(--whiz-purple))',
          green: 'hsl(var(--whiz-green))',
          yellow: 'hsl(var(--whiz-yellow))',
          pink: 'hsl(var(--whiz-pink))',
        },

        // Sidebar Theming
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },

      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },

      // ✨ Transitions & Animations
      transitionProperty: {
        'smooth': 'var(--transition-smooth)',
        'bounce': 'var(--transition-bounce)',
        'opacity-transform': 'opacity, transform',
      },

      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
        bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },

      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        ripple: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.05)', opacity: '0.8' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'subtle-pulse': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.02)' },
        },
        // ADDED: rainbowFlow keyframes for background animation
        rainbowFlow: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        // ✅ ADDED: Keyframes for modal animations
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in-fade-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        // NEW: Custom glow keyframe for the button
        glow: {
          '0%, 100%': {
            boxShadow: '0 0 5px hsl(var(--whiz-green)), 0 0 10px hsl(var(--whiz-green)/50%)'
          },
          '50%': {
            boxShadow: '0 0 15px hsl(var(--whiz-green)), 0 0 25px hsl(var(--whiz-green)/80%)'
          },
        },
        // NEW: Keyframes for ParallaxBackground (clouds, planet, star)
        'float': {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
          '100%': { transform: 'translateY(0)' },
        },
        'float-slow': {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
          '100%': { transform: 'translateY(0)' },
        },
        'rotate-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        // NEW: Keyframes for SparkleTrail
        'sparkleFade': {
          '0%': { opacity: '1', transform: 'scale(1)' },
          '100%': { opacity: '0', transform: 'scale(2)' },
        },
        // ✅ ADDED: Keyframe for 'fall' for the decorative rain
        fall: {
            '0%': { transform: 'translateY(-100px) rotate(0deg)', opacity: '1' },
            '100%': { transform: 'translateY(110vh) rotate(360deg)', opacity: '0' },
        },
      },

      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        ripple: 'ripple 2s infinite ease-in-out',
        'subtle-pulse': 'subtle-pulse 3s infinite ease-in-out',
        // ADDED: rainbow animation
        rainbow: 'rainbowFlow 30s ease infinite', // 30s duration for a slow, smooth flow
        // ✅ ADDED: Animations for modal
        'fade-in': 'fade-in 0.3s ease-out forwards',
        'scale-in-fade-in': 'scale-in-fade-in 0.3s ease-out forwards',
        // NEW: Apply the glow animation
        glow: 'glow 2s infinite alternate ease-in-out',
        // NEW: Animations for ParallaxBackground
        'float-animation': 'float 5s ease-in-out infinite',
        'float-slow-animation': 'float-slow 10s ease-in-out infinite',
        'rotate-slow-animation': 'rotate-slow 60s linear infinite',
        // NEW: Animation for SparkleTrail
        'sparkle-fade-animation': 'sparkleFade 1s ease-out forwards',
        // ✅ ADDED: Animation for 'fall' for the decorative rain
        fall: 'fall linear infinite',
      },
    },
  },

  plugins: [require("tailwindcss-animate")],
};

export default config;