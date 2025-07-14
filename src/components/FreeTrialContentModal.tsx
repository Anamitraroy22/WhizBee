// src/components/FreeTrialContentModal.tsx
import React, { useState, useEffect } from 'react';
import { FreeTrialContent } from '../pages/Programs'; // Import FreeTrialContent interface
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

// Firestore imports for progress tracking
import { doc, getDoc, updateDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';
import { useToast } from "@/components/ui/use-toast";

// Import ReviewModal (explicitly add .tsx extension)
import ReviewModal from './ReviewModal.tsx'; // <--- FIXED: Added .tsx extension

interface FreeTrialContentModalProps {
  trialContent: FreeTrialContent;
  onClose: () => void;
  programId: string; // The ID of the program (or freeTrialContentId) to track progress against
}

const FreeTrialContentModal: React.FC<FreeTrialContentModalProps> = ({
  trialContent,
  onClose,
  programId,
}) => {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [moduleProgress, setModuleProgress] = useState<any>({}); // To track specific module answers/states
  const [showReviewModal, setShowReviewModal] = useState(false);

  // Load saved progress for the specific trial when modal opens
  useEffect(() => {
    const loadProgress = async () => {
      if (!currentUser || !programId) return;

      try {
        const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id'; // __app_id is now declared globally
        const userTrialProgressRef = doc(db, `artifacts/${appId}/users/${currentUser.uid}/userTrialProgress`, programId);
        const docSnap = await getDoc(userTrialProgressRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setCurrentModuleIndex(data.progress?.currentModuleIndex || 0);
          setModuleProgress(data.progress?.moduleProgress || {});
        }
      } catch (error) {
        console.error("Error loading trial progress:", error);
      }
    };
    loadProgress();
  }, [currentUser, programId]);

  // Save progress to Firestore whenever moduleIndex or moduleProgress changes
  useEffect(() => {
    const saveProgress = async () => {
      if (!currentUser || !programId || (currentModuleIndex === 0 && Object.keys(moduleProgress).length === 0)) {
        // Don't save initial empty state or if no user/programId
        return;
      }

      try {
        const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id'; // __app_id is now declared globally
        const userTrialProgressRef = doc(db, `artifacts/${appId}/users/${currentUser.uid}/userTrialProgress`, programId);

        await setDoc(userTrialProgressRef, {
          userId: currentUser.uid,
          programId: programId,
          startedAt: serverTimestamp(), // Will only update if document doesn't exist
          completedAt: null, // Reset or keep null until full completion
          progress: {
            currentModuleIndex: currentModuleIndex,
            moduleProgress: moduleProgress,
          },
          isTrialOver: false, // Will be set to true on final completion
        }, { merge: true }); // Use merge to update existing fields without overwriting
        console.log("Trial progress saved.");
      } catch (error) {
        console.error("Error saving trial progress:", error);
      }
    };
    saveProgress();
  }, [currentModuleIndex, moduleProgress, currentUser, programId]);


  const handleNextModule = () => {
    if (currentModuleIndex < trialContent.contentModules.length - 1) {
      setCurrentModuleIndex(prev => prev + 1);
    } else {
      // Last module completed
      handleTrialCompletion();
    }
  };

  const handlePrevModule = () => {
    if (currentModuleIndex > 0) {
      setCurrentModuleIndex(prev => prev - 1);
    }
  };

  const handleTrialCompletion = async () => {
    if (!currentUser || !programId) return;

    try {
      const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id'; // __app_id is now declared globally
      const userTrialProgressRef = doc(db, `artifacts/${appId}/users/${currentUser.uid}/userTrialProgress`, programId);

      await updateDoc(userTrialProgressRef, {
        completedAt: serverTimestamp(),
        isTrialOver: true,
      });
      toast({
        title: "Free Trial Completed!",
        description: "You've finished the trial. Consider enrolling!",
        variant: "default",
      });
      setShowReviewModal(true); // Prompt for review
      onClose(); // Close the free trial modal
    } catch (error) {
      console.error("Error marking trial as complete:", error);
      toast({
        title: "Error",
        description: "Could not mark trial as complete.",
        variant: "destructive",
      });
    }
  };

  const renderModuleContent = (module: FreeTrialContent['contentModules'][0]) => {
    switch (module.type) {
      case 'video':
        return (
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-whiz-blue">{module.data.title}</h3>
            <div className="relative" style={{ paddingBottom: '56.25%', height: 0 }}>
              <iframe
                src={module.data.videoUrl}
                title={module.data.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
              ></iframe>
            </div>
            <p className="text-gray-700 mt-4">{module.data.videoTranscript}</p>
          </div>
        );
      case 'quiz':
        const currentQuestion = module.data.questions[0]; // Assuming one question per module for simplicity, or we need more complex state
        return (
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-whiz-orange">{module.data.quizTitle}</h3>
            <p className="text-xl font-semibold text-gray-800">{currentQuestion.questionText}</p>
            <div className="grid grid-cols-1 gap-3">
              {currentQuestion.options.map((option: string, index: number) => (
                <button
                  key={index}
                  className={`py-3 px-4 rounded-lg border-2 ${
                    moduleProgress[module.moduleId] === index
                      ? (index === currentQuestion.correctOptionIndex ? 'border-whiz-green bg-whiz-green/10' : 'border-red-500 bg-red-500/10')
                      : 'border-gray-300 hover:bg-gray-100'
                  } text-gray-800 transition-colors duration-200`}
                  onClick={() => {
                    setModuleProgress(prev => ({ ...prev, [module.moduleId]: index }));
                    if (index === currentQuestion.correctOptionIndex) {
                      toast({ title: "Correct!", variant: "default" });
                    } else {
                      toast({ title: "Incorrect, try again!", variant: "destructive" });
                    }
                  }}
                  disabled={moduleProgress[module.moduleId] !== undefined} // Disable after selection
                >
                  {option}
                </button>
              ))}
            </div>
            {moduleProgress[module.moduleId] !== undefined && (
                <p className={`text-sm mt-2 ${moduleProgress[module.moduleId] === currentQuestion.correctOptionIndex ? 'text-whiz-green' : 'text-red-500'}`}>
                    {moduleProgress[module.moduleId] === currentQuestion.correctOptionIndex ? 'That\'s right!' : `The correct answer was: ${currentQuestion.options[currentQuestion.correctOptionIndex]}`}
                </p>
            )}
          </div>
        );
      case 'interactiveStory':
        const currentStoryStep = module.data.steps[0]; // Assuming one step per module for simplicity
        return (
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-whiz-purple">{module.data.storyTitle}</h3>
            <p className="text-xl font-semibold text-gray-800">{currentStoryStep.prompt}</p>
            <div className="grid grid-cols-1 gap-3">
              {currentStoryStep.options.map((option: string, index: number) => (
                <button
                  key={index}
                  className={`py-3 px-4 rounded-lg border-2 ${
                    moduleProgress[module.moduleId] === index
                      ? (index === currentStoryStep.correctOptionIndex ? 'border-whiz-green bg-whiz-green/10' : 'border-red-500 bg-red-500/10')
                      : 'border-gray-300 hover:bg-gray-100'
                  } text-gray-800 transition-colors duration-200`}
                  onClick={() => {
                    setModuleProgress(prev => ({ ...prev, [module.moduleId]: index }));
                    if (index === currentStoryStep.correctOptionIndex) {
                      toast({ title: "Great choice!", variant: "default" });
                    } else {
                      toast({ title: "Not quite, try another spell!", variant: "destructive" });
                    }
                  }}
                  disabled={moduleProgress[module.moduleId] !== undefined}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );
      case 'game':
        // For a simple text-based game/riddle
        return (
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-whiz-yellow">{module.data.gameTitle}</h3>
            <p className="text-xl font-semibold text-gray-800">{module.data.riddle}</p>
            {/* Simple input for game answer */}
            <input
              type="text"
              placeholder="Your answer..."
              className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-whiz-yellow text-gray-800"
              value={moduleProgress[module.moduleId]?.answer || ''}
              onChange={(e) => setModuleProgress(prev => ({ ...prev, [module.moduleId]: { answer: e.target.value } }))}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const isCorrect = (moduleProgress[module.moduleId]?.answer || '').toLowerCase() === module.data.expectedAnswer.toLowerCase();
                  if (isCorrect) {
                    toast({ title: module.data.successMessage, variant: "default" });
                    setModuleProgress(prev => ({ ...prev, [module.moduleId]: { ...prev[module.moduleId], solved: true } }));
                  } else {
                    toast({ title: module.data.failureMessage, variant: "destructive" });
                  }
                }
              }}
              disabled={moduleProgress[module.moduleId]?.solved}
            />
             {moduleProgress[module.moduleId]?.solved && (
                <p className="text-whiz-green text-sm mt-2">You solved the riddle!</p>
            )}
          </div>
        );
      default:
        return <p className="text-red-500">Unknown content type: {module.type}</p>;
    }
  };

  const currentModule = trialContent.contentModules[currentModuleIndex];

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[100] p-4">
        <div className="neuro-card relative bg-white/10 backdrop-blur-xl rounded-2xl p-8 max-w-3xl w-full text-foreground shadow-2xl overflow-y-auto max-h-[90vh]">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>

          <h2 className="text-3xl font-bold text-whiz-blue mb-4 text-center">{trialContent.title}</h2>
          <p className="text-center text-gray-600 mb-6">{trialContent.description}</p>

          <div className="bg-white/5 backdrop-blur-md rounded-lg p-6 mb-6 min-h-[300px] flex items-center justify-center">
            {currentModule ? renderModuleContent(currentModule) : <p>No content for this module.</p>}
          </div>

          <div className="flex justify-between items-center mt-6">
            <button
              onClick={handlePrevModule}
              disabled={currentModuleIndex === 0}
              className="py-2 px-4 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 transition-colors duration-200 flex items-center"
            >
              <ChevronLeft size={20} className="mr-1" /> Previous
            </button>
            <span className="text-sm text-gray-600">
              Module {currentModuleIndex + 1} of {trialContent.contentModules.length}
            </span>
            <button
              onClick={handleNextModule}
              className="py-2 px-4 rounded-full bg-whiz-orange text-white hover:bg-whiz-orange/90 transition-colors duration-200 flex items-center"
            >
              {currentModuleIndex === trialContent.contentModules.length - 1 ? 'Finish Trial' : 'Next Module'} <ChevronRight size={20} className="ml-1" />
            </button>
          </div>
        </div>
      </div>

      {showReviewModal && (
        <ReviewModal
          programId={programId}
          onClose={() => setShowReviewModal(false)}
        />
      )}
    </>
  );
};

export default FreeTrialContentModal;
