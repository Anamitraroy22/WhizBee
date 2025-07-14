// src/components/ReviewModal.tsx
import React, { useState } from 'react';
import { X, Star } from 'lucide-react';

// Firestore imports
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';
import { useToast } from "@/components/ui/use-toast";

interface ReviewModalProps {
  programId: string; // The ID of the program being reviewed
  onClose: () => void;
}

const ReviewModal: React.FC<ReviewModalProps> = ({ programId, onClose }) => {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmitReview = async () => {
    if (!currentUser) {
      toast({
        title: "Login Required",
        description: "Please log in to submit a review.",
        variant: "destructive",
      });
      return;
    }
    if (rating === 0) {
      toast({
        title: "Rating Required",
        description: "Please select a star rating.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
      await addDoc(collection(db, `artifacts/${appId}/public/data/reviews`), {
        userId: currentUser.uid,
        userName: currentUser.displayName || currentUser.email || 'Anonymous',
        programId: programId,
        rating: rating,
        comment: comment,
        createdAt: serverTimestamp(),
      });
      toast({
        title: "Review Submitted!",
        description: "Thank you for your feedback!",
        variant: "default",
      });
      onClose();
    } catch (error) {
      console.error("Error submitting review:", error);
      toast({
        title: "Error",
        description: "Failed to submit review. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[101] p-4">
      <div className="neuro-card relative bg-white/10 backdrop-blur-xl rounded-2xl p-8 max-w-md w-full text-foreground shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-whiz-blue mb-4 text-center">Leave a Review</h2>
        <p className="text-center text-gray-600 mb-6">How was your free trial experience?</p>

        <div className="flex justify-center mb-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={32}
              className={`cursor-pointer ${
                star <= rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
              } transition-colors duration-200`}
              onClick={() => setRating(star)}
            />
          ))}
        </div>

        <textarea
          className="w-full p-3 rounded-lg border-2 border-gray-300 bg-white/5 text-foreground placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-whiz-orange mb-6 min-h-[100px]"
          placeholder="Share your thoughts about the program..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          disabled={loading}
        ></textarea>

        <button
          onClick={handleSubmitReview}
          className="w-full py-3 rounded-xl font-semibold bg-whiz-orange text-white hover:bg-whiz-orange/90 transition-colors duration-300"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </div>
    </div>
  );
};

export default ReviewModal;
