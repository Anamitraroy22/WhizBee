// src/components/ProgramDetailsModal.tsx
import React, { useState, useEffect } from 'react';
import { Program, FreeTrialContent } from '../pages/Programs'; // Import Program and FreeTrialContent interfaces
import { X, CheckCircle } from 'lucide-react';

// Import Firestore functions and auth
import { doc, getDoc, setDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../context/AuthContext'; // To get current user
import { useToast } from "@/components/ui/use-toast";

// Removed import for FreeTrialContentModal.tsx as requested

interface ProgramDetailsModalProps {
  program: Program;
  onClose: () => void;
  freeTrialContents: FreeTrialContent[]; // Still passed, but not used for opening FreeTrialContentModal
  loadingFreeTrialContent: boolean; // Still passed, but not used for opening FreeTrialContentModal
}

const ProgramDetailsModal: React.FC<ProgramDetailsModalProps> = ({
  program,
  onClose,
  freeTrialContents, // Not used for opening FreeTrialContentModal in this version
  loadingFreeTrialContent, // Not used for opening FreeTrialContentModal in this version
}) => {
  const { currentUser, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const [hasTakenTrial, setHasTakenTrial] = useState(false);
  const [trialProgressLoading, setTrialProgressLoading] = useState(true);
  // Removed showFreeTrialContentModal and currentFreeTrialContent states as requested

  // Check user's trial progress when modal opens or user/program changes
  useEffect(() => {
    const checkTrialStatus = async () => {
      if (!currentUser || !program.freeTrialContentId) {
        setHasTakenTrial(false);
        setTrialProgressLoading(false);
        return;
      }

      setTrialProgressLoading(true);
      try {
        const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
        const userTrialProgressRef = doc(db, `artifacts/${appId}/users/${currentUser.uid}/userTrialProgress`, program.freeTrialContentId);
        const docSnap = await getDoc(userTrialProgressRef);

        if (docSnap.exists() && docSnap.data().isTrialOver) {
          setHasTakenTrial(true);
        } else {
          setHasTakenTrial(false);
        }
      } catch (error) {
        console.error("Error checking trial status:", error);
        toast({
          title: "Error",
          description: "Could not check free trial status.",
          variant: "destructive",
        });
        setHasTakenTrial(false); // Assume not taken on error
      } finally {
        setTrialProgressLoading(false);
      }
    };

    if (!authLoading) { // Only check if auth state is loaded
      checkTrialStatus();
    }
  }, [currentUser, program.freeTrialContentId, authLoading, toast]);

  const handleStartFreeTrial = async () => {
    if (!currentUser) {
      toast({
        title: "Login Required",
        description: "Please log in to start the free trial.",
        variant: "destructive",
      });
      return;
    }

    // This is now a placeholder as FreeTrialContentModal is removed
    toast({
      title: "Free Trial Coming Soon!",
      description: "The interactive free trial content will be available here once models are ready.",
      variant: "default",
    });

    // Still record trial start in Firestore
    try {
      const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
      const userTrialProgressRef = doc(db, `artifacts/${appId}/users/${currentUser.uid}/userTrialProgress`, program.freeTrialContentId);
      const docSnap = await getDoc(userTrialProgressRef);

      if (!docSnap.exists()) {
        await setDoc(userTrialProgressRef, {
          userId: currentUser.uid,
          programId: program.freeTrialContentId, // Using freeTrialContentId as programId for progress tracking
          startedAt: serverTimestamp(),
          completedAt: null,
          progress: {},
          isTrialOver: false,
        });
        console.log("Free trial started recorded.");
      }
    } catch (error) {
      console.error("Error recording trial start:", error);
      toast({
        title: "Error",
        description: "Could not record trial start. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleEnrollNow = () => {
    // TODO: Implement Stripe integration here
    toast({
      title: "Enroll Now",
      description: "Stripe integration will be handled here!",
      variant: "default",
    });
    console.log("Enroll Now clicked for:", program.title);
  };

  if (!program) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        {/* Modal Container: White background, rounded, shadow */}
        <div className="relative bg-white rounded-2xl p-8 max-w-5xl w-full text-foreground shadow-2xl overflow-y-auto max-h-[90vh] border border-gray-100 font-nunito"> {/* Added font-nunito here */}
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>

          <h2 className="text-3xl font-bold text-whiz-blue mb-2 text-center font-fredoka">{program.title}</h2> {/* Example: Fredoka for titles */}
          <p className="text-gray-600 mb-8 text-center font-nunito">{program.description}</p> {/* Nunito for description */}

          {/* Main Content Area: Three Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8">
            {/* Column 1: Key Features */}
            <div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800 font-fredoka">Key Features</h3> {/* Fredoka for sub-titles */}
              <ul className="space-y-3">
                {program.features.map((feature, index) => (
                  <li key={index} className="flex items-start text-gray-700 text-base font-nunito"> {/* Nunito for list items */}
                    <CheckCircle size={20} className="text-whiz-green mr-3 flex-shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Modules Included */}
            <div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800 font-fredoka">Modules Included</h3> {/* Fredoka for sub-titles */}
              <ul className="space-y-3">
                {program.modules.map((module, index) => (
                  <li key={index} className="flex items-start text-gray-700 text-base font-nunito"> {/* Nunito for list items */}
                    <div className={`w-2.5 h-2.5 bg-${program.color} rounded-full mr-3 flex-shrink-0 mt-2`}></div>
                    {module}
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Pricing, Enroll Now, Free Trial */}
            <div className="flex flex-col items-center justify-center bg-gray-50 p-6 rounded-xl shadow-inner border border-gray-100 lg:col-span-1">
              <p className="text-4xl font-extrabold text-whiz-orange mb-2 font-fredoka"> {/* Fredoka for price */}
                ${program.price.toFixed(2)}
                <span className="text-xl font-medium text-gray-600 font-nunito"> / month</span> {/* Nunito for "/ month" */}
              </p>
              {program.discount > 0 && (
                <>
                  <p className="text-lg text-gray-500 line-through mb-1 font-nunito"> {/* Nunito for line-through price */}
                    ${(program.price / (1 - program.discount)).toFixed(2)}
                  </p>
                  <p className="text-whiz-green text-2xl font-bold mb-6 font-fredoka"> {/* Fredoka for discount percentage */}
                    ({(program.discount * 100).toFixed(0)}% Off!)
                  </p>
                </>
              )}
              {!program.discount && (
                <div className="mb-6 h-12"></div> /* Spacer if no discount */
              )}

              {/* Enroll Now Button (Sleek Design) */}
              <button
                onClick={handleEnrollNow}
                className="w-full py-4 rounded-full font-semibold bg-whiz-blue text-white hover:bg-whiz-blue/90 transition-colors duration-300 text-xl shadow-lg hover:shadow-xl transform hover:scale-105 mb-6 font-poppins" // Poppins for button text
              >
                Enroll Now
              </button>

              {/* Free Trial Section */}
              {program.freeTrialContentId && (
                <div className="w-full mt-4 border-t border-gray-200 pt-6">
                  {trialProgressLoading || authLoading ? (
                    <button
                      className="w-full py-4 rounded-full font-semibold bg-gray-200 text-gray-500 cursor-not-allowed text-xl font-poppins" // Poppins for button text
                      disabled
                    >
                      Loading Trial Status...
                    </button>
                  ) : hasTakenTrial ? (
                    <p className="text-xl font-semibold text-whiz-purple text-center font-poppins"> {/* Poppins for text */}
                      Free Trial Completed!
                    </p>
                  ) : (
                    <>
                      <button
                        onClick={handleStartFreeTrial}
                        className="w-full py-4 rounded-full font-semibold bg-whiz-green text-white hover:bg-whiz-green/90 transition-colors duration-300 text-xl shadow-lg hover:shadow-xl transform hover:scale-105 animate-glow font-poppins" // Poppins for button text + animate-glow
                      >
                        Start Free Trial
                      </button>
                      <p className="text-sm text-gray-500 mt-3 text-center font-nunito"> {/* Nunito for small text */}
                        Experience a taste of this program before enrolling!
                      </p>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Free Trial Content Modal (Removed for now as requested) */}
      {/* {showFreeTrialContentModal && currentFreeTrialContent && (
        <FreeTrialContentModal
          trialContent={currentFreeTrialContent}
          onClose={() => setShowFreeTrialContentModal(false)}
          programId={currentFreeTrialContent.id} // Pass the free trial content ID for tracking
        />
      )} */}
    </>
  );
};

export default ProgramDetailsModal;
