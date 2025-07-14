// src/components/QuestionnaireModal.tsx

import React from 'react';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import QuizCore from './QuizCore'; // Import the QuizCore component

// Define the props interface for QuestionnaireModal
interface QuestionnaireModalProps {
  isOpen: boolean;
  onClose: () => void;
  // This onComplete will now pass its arguments (answers, email) from QuizCore
  onComplete: (answers: Record<string, string | string[]>, email?: string) => void;
}

const QuestionnaireModal: React.FC<QuestionnaireModalProps> = ({ isOpen, onClose, onComplete }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {/* Apply AuthModal-like styling to the DialogContent */}
      <DialogContent className="bg-white/5 backdrop-blur-[10px] border border-white/20 rounded-2xl shadow-xl text-white max-w-lg w-full p-0 overflow-hidden flex flex-col h-[90vh]">
        {/* Pass the onComplete and onClose props to QuizCore */}
        <QuizCore onQuizComplete={onComplete} />
      </DialogContent>
    </Dialog>
  );
};

export default QuestionnaireModal;