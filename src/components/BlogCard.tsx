// src/components/BlogCard.tsx
import React from 'react';
import clsx from 'clsx';

interface BlogCardProps {
  title: string;
  description: string;
  imageUrl?: string; // Optional image for the blog card itself
  className?: string; // For Tailwind classes
  onClose?: () => void; // If you want a close button on the blog card
}

const BlogCard: React.FC<BlogCardProps> = ({ title, description, imageUrl, className, onClose }) => {
  return (
    <div
      className={clsx(
        "absolute inset-0 flex flex-col justify-center items-center text-center p-4 bg-white/95 rounded-3xl shadow-lg transition-opacity duration-300 transform scale-100", // Start with full opacity
        "group-hover:opacity-100 group-focus-within:opacity-100 group-hover:scale-100", // Ensure it's fully visible on hover/focus
        className
      )}
    >
      {imageUrl && <img src={imageUrl} alt={title} className="w-16 h-16 object-cover rounded-full mb-4" />}
      <h4 className="text-xl font-bold text-gray-800 mb-2">{title}</h4>
      <p className="text-sm text-gray-600 mb-4">{description}</p>
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          aria-label="Close blog post"
        >
          &times;
        </button>
      )}
    </div>
  );
};

export default BlogCard;