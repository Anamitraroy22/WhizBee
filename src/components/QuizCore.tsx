// src/components/QuizCore.tsx

import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react'; // Added CheckCircle icon
// Do NOT import useNavigate here anymore!

// Shadcn UI Imports (adjust paths if your components are elsewhere)
import { Button } from './ui/button';
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Textarea } from './ui/textarea';
import { useToast } from './ui/use-toast'; // For notifications

interface Question {
  id: number;
  type: 'multiple-choice' | 'text-input';
  question: string;
  options?: string[];
  name: string;
  placeholder?: string;
}

// Combined pool of all quiz questions
const ALL_QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    type: 'multiple-choice',
    question: "When your child faces a new challenge, how do they typically react?",
    options: [
      "Eagerly curious and excited to try",
      "Cautious but willing to attempt with encouragement",
      "Hesitant and prefers to observe first",
      "Frustrated or avoids the challenge"
    ],
    name: 'challengeReaction',
  },
  {
    id: 2,
    type: 'multiple-choice',
    question: "How does your child prefer to learn new things?",
    options: [
      "Hands-on activities and experiments",
      "Through stories, books, and discussions",
      "By watching and imitating others",
      "Structured lessons and direct instruction"
    ],
    name: 'learningPreference',
  },
  {
    id: 3,
    type: 'multiple-choice',
    question: "What motivates your child the most in learning?",
    options: [
      "Praise and recognition",
      "The joy of discovery and understanding",
      "Achieving good grades or rewards",
      "Social interaction and learning with friends"
    ],
    name: 'motivation',
  },
  {
    id: 4,
    type: 'text-input',
    question: "Describe a moment when your child was truly absorbed in learning. What were they doing?",
    placeholder: "e.g., building with blocks, reading a book, exploring nature...",
    name: 'absorbedMoment',
  },
  {
    id: 5,
    type: 'multiple-choice',
    question: "How does your child typically handle mistakes while learning?",
    options: [
      "Sees them as opportunities to learn",
      "Gets a little discouraged but tries again",
      "Becomes upset or gives up easily",
      "Tries to hide or deny mistakes"
    ],
    name: 'mistakeHandling',
  },
  {
    id: 6,
    type: 'multiple-choice',
    question: "How important is 'fun' to your child's learning experience?",
    options: [
      "Absolutely essential, they learn best when engaged",
      "Important, but structure and clear goals are also key",
      "Somewhat important, they can focus even if it's not 'fun'",
      "Not a major factor, they are disciplined learners"
    ],
    name: 'funImportance',
  },
  {
    id: 7,
    type: 'multiple-choice',
    question: "In social learning settings, your child is most likely to be...",
    options: [
      "A leader, organizing activities",
      "A collaborative participant, working well with others",
      "An independent learner, preferring to work alone",
      "A quiet observer, learning from others"
    ],
    name: 'socialLearningStyle',
  },
  {
    id: 8,
    type: 'text-input',
    question: "What's one area where you'd like to see your child develop more confidence?",
    placeholder: "e.g., public speaking, problem-solving, creative expression...",
    name: 'confidenceArea',
  },
  {
    id: 9,
    type: 'multiple-choice',
    question: "How do you define 'success' in your child's education?",
    options: [
      "Achieving high academic results",
      "Developing a love for learning and curiosity",
      "Building strong character and life skills",
      "Becoming independent and self-sufficient"
    ],
    name: 'successDefinition',
  },
  {
    id: 10,
    type: 'multiple-choice',
    question: "What is your primary hope for your child's future, as it relates to their education?",
    options: [
      "They pursue higher education and a successful career",
      "They become a lifelong learner and critical thinker",
      "They discover their passions and purpose",
      "They are happy, well-adjusted, and contribute positively to society"
    ],
    name: 'futureHope',
  },
  // Parent-focused questions from previous response, now combined:
  {
    id: 11,
    type: 'multiple-choice',
    question: 'How important is personalized learning for your child?',
    options: ['Not important', 'Slightly important', 'Moderately important', 'Very important', 'Extremely important'],
    name: 'personalizedLearningImportance',
  },
  {
    id: 12,
    type: 'multiple-choice',
    question: 'What is the biggest challenge you face in your child\'s learning journey?',
    options: ['Keeping them engaged', 'Finding relevant resources', 'Balancing screen time', 'Tracking progress', 'Motivating them'],
    name: 'learningChallenge',
  },
  {
    id: 13,
    type: 'multiple-choice',
    question: 'Which of these topics are you most interested for your child to learn?',
    options: ['Science & Technology', 'Arts & Creativity', 'Critical Thinking', 'Financial Literacy', 'Social-Emotional Skills'],
    name: 'interestedTopics',
  },
  {
    id: 14,
    type: 'multiple-choice',
    question: 'How often do you discuss your child\'s learning progress with them?',
    options: ['Rarely', 'Sometimes', 'Often', 'Very often', 'Daily'],
    name: 'discussionFrequency',
  },
  {
    id: 15,
    type: 'multiple-choice',
    question: 'What kind of learning environment does your child thrive in?',
    options: ['Structured classroom', 'Hands-on experiential', 'Self-paced individual', 'Collaborative group', 'Outdoor learning'],
    name: 'thrivingEnvironment',
  },
];


interface QuizCoreProps {
  onQuizComplete: (answers: Record<string, string | string[]>, email?: string) => void; // Added optional email
}

const QuizCore: React.FC<QuizCoreProps> = ({ onQuizComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [userEmail, setUserEmail] = useState(''); // State for the email input
  const { toast } = useToast();

  useEffect(() => {
    // Select 5 random, jumbled questions from the combined pool
    const selectRandomQuestions = () => {
      const shuffled = [...ALL_QUIZ_QUESTIONS].sort(() => 0.5 - Math.random());
      setQuizQuestions(shuffled.slice(0, 5));
    };
    selectRandomQuestions();
  }, []); // Run once on mount

  const handleNext = () => {
    if (quizQuestions.length === 0) return;

    const currentQuestion = quizQuestions[currentQuestionIndex];
    const currentAnswer = answers[currentQuestion.name];

    // Validation for current question
    if (currentQuestion.type === 'multiple-choice') {
      if (!currentAnswer || (Array.isArray(currentAnswer) && currentAnswer.length === 0)) {
        toast({
          title: "Missing Answer",
          description: "Please select an option to continue.",
          variant: "destructive",
        });
        return;
      }
    } else if (currentQuestion.type === 'text-input') {
      if (!currentAnswer || (currentAnswer as string).trim() === '') {
        toast({
          title: "Missing Answer",
          description: "Please provide an answer to continue.",
          variant: "destructive",
        });
        return;
      }
    }

    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // All questions answered
      setIsQuizComplete(true);
      // console.log('Quiz Complete! Answers:', answers); // Answers are ready but not sent yet
      // We will send answers with email in handleEmailSubmit
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev + 1); // This should be prev - 1
      setIsQuizComplete(false); // If going back from completion state
    }
    // FIX: Corrected this line to go back to the previous question
    if (currentQuestionIndex > 0) {
        setCurrentQuestionIndex(prev => prev - 1);
        setIsQuizComplete(false); // If going back from completion state, ensure quiz isn't "complete" anymore
    }
  };

  const handleAnswerChange = (value: string | string[], name: string, type: 'multiple-choice' | 'text-input') => {
    // Special handling for multiple-choice checkboxes to toggle selections
    if (type === 'multiple-choice' && Array.isArray(value)) {
        setAnswers(prev => ({ ...prev, [name]: value }));
    } else {
        setAnswers(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleCheckboxChange = (option: string, name: string, isChecked: boolean) => {
    const currentSelections = Array.isArray(answers[name])
      ? (answers[name] as string[])
      : [];

    if (isChecked) {
      handleAnswerChange([...currentSelections, option], name, 'multiple-choice');
    } else {
      handleAnswerChange(
        currentSelections.filter((item) => item !== option),
        name,
        'multiple-choice'
      );
    }
  };


  const handleEmailSubmit = () => {
    if (!userEmail.trim()) {
      toast({
        title: "Email Required",
        description: "Please enter your email to get course recommendations.",
        variant: "destructive",
      });
      return;
    }
    // Basic email format validation
    if (!/\S+@\S+\.\S+/.test(userEmail)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    // Call the onQuizComplete prop with answers and email
    onQuizComplete(answers, userEmail);
    toast({
      title: "Success!",
      description: "Your recommendations are on their way!",
      variant: "default",
    });
  };

  const currentQuestion = quizQuestions[currentQuestionIndex];

  return (
    <div className="flex flex-col h-full">
      <DialogHeader className="p-6 pb-2">
        <DialogTitle className="text-whiz-orange text-center text-3xl font-bold">
          {isQuizComplete ? 'Your WhizBee Insight' : `Answer 5 Questions to Know Your Child`}
        </DialogTitle>
        <DialogDescription className="text-center text-md text-gray-300">
          {isQuizComplete
            ? 'Thank you for sharing! This helps us tailor the best experience for your child.'
            : `Question ${currentQuestionIndex + 1}/${quizQuestions.length}. Help us understand your child's unique learning style and needs.`}
        </DialogDescription>
      </DialogHeader>

      {!isQuizComplete && quizQuestions.length > 0 && currentQuestion ? (
        <div className="space-y-6 py-4 px-6 overflow-y-auto flex-grow">
          <p className="text-xl font-semibold text-white leading-relaxed">{currentQuestion.question}</p>

          {currentQuestion.type === 'multiple-choice' && (
            <RadioGroup
              onValueChange={(value) => handleAnswerChange(value, currentQuestion.name, 'multiple-choice')}
              value={answers[currentQuestion.name] as string || ''}
              className="space-y-3"
            >
              {currentQuestion.options?.map((option, idx) => (
                <div key={idx} className="flex items-center space-x-3 p-3 neuro-card-sm cursor-pointer hover:bg-white/10 transition-colors duration-200 rounded-lg">
                  <RadioGroupItem
                    value={option}
                    id={`${currentQuestion.name}-${idx}`}
                    className="border-white/50 data-[state=checked]:bg-whiz-orange data-[state=checked]:text-white focus-visible:ring-whiz-orange"
                  />
                  <Label htmlFor={`${currentQuestion.name}-${idx}`} className="text-white/80 cursor-pointer text-base">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          )}

          {/* Multiple-choice with checkboxes (if needed, but current setup uses RadioGroup for single-choice multiple-choice) */}
          {/* If you intended 'multiple-choice' to mean actual checkboxes, use this block: */}
          {/* {currentQuestion.type === 'multiple-choice' && currentQuestion.options && currentQuestion.options.length > 0 && (
            <div className="space-y-3">
              {currentQuestion.options.map((option, idx) => (
                <div key={idx} className="flex items-center space-x-3 p-3 neuro-card-sm cursor-pointer hover:bg-white/10 transition-colors duration-200 rounded-lg">
                  <Checkbox
                    id={`${currentQuestion.name}-${idx}`}
                    checked={Array.isArray(answers[currentQuestion.name]) && (answers[currentQuestion.name] as string[]).includes(option)}
                    onCheckedChange={(checked) => handleCheckboxChange(option, currentQuestion.name, checked as boolean)}
                    className="border-white/50 data-[state=checked]:bg-whiz-orange data-[state=checked]:text-white focus-visible:ring-whiz-orange"
                  />
                  <Label htmlFor={`${currentQuestion.name}-${idx}`} className="text-white/80 cursor-pointer text-base">
                    {option}
                  </Label>
                </div>
              ))}
            </div>
          )} */}


          {currentQuestion.type === 'text-input' && (
            <Textarea
              placeholder={currentQuestion.placeholder}
              value={answers[currentQuestion.name] as string || ''}
              onChange={(e) => handleAnswerChange(e.target.value, currentQuestion.name, 'text-input')}
              className="min-h-[100px] rounded-md bg-white/10 border-white/20 text-white placeholder:text-gray-400 p-4"
            />
          )}
        </div>
      ) : isQuizComplete ? (
        <div className="text-center py-8 px-6 flex-grow flex flex-col justify-center">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6 animate-fade-in-up" /> {/* Green tick */}
          <h3 className="text-2xl font-bold text-white mb-3">Thank you for completing the first step!</h3>
          <p className="text-white/80 text-lg mb-8 leading-relaxed">
            Please provide your email below, and we'll send you personalized course recommendations based on your insights.
          </p>
          <div className="w-full max-w-sm mx-auto mb-6">
            <Input
              type="email"
              placeholder="Enter your email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              className="rounded-md bg-white/10 border-white/20 text-white placeholder:text-gray-400 p-4 mb-4"
            />
            <Button
              className="bg-whiz-orange hover:bg-whiz-orange/90 text-white px-8 py-3 text-lg w-full"
              onClick={handleEmailSubmit}
            >
              Get My Recommendations <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      ) : (
        <div className="text-center py-8 px-6 flex-grow flex flex-col justify-center text-white/70">
          <p>Loading questions...</p>
        </div>
      )}

      <DialogFooter className="flex justify-between mt-auto p-6 pt-4 border-t border-white/10">
        {!isQuizComplete && quizQuestions.length > 0 && (
          <>
            <Button
              variant="ghost"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              // Fixed previous button styling for better visibility
              className="text-white/70 hover:text-white hover:bg-white/10 transition-colors border border-transparent hover:border-white/20"
            >
              <ArrowLeft className="mr-2 w-4 h-4" /> Previous
            </Button>
            <Button
              onClick={handleNext}
              className="bg-whiz-orange hover:bg-whiz-orange/90 text-white transition-colors"
            >
              {currentQuestionIndex === quizQuestions.length - 1 ? 'Finish & Discover' : 'Next Question'}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </>
        )}
        {isQuizComplete && (
          // This button is replaced by the 'Get My Recommendations' button after quiz completion
          // but kept here for fallback or if you need a separate close action after email submit
          // For now, it will be hidden when isQuizComplete is true and email input is visible
          <></>
        )}
      </DialogFooter>
    </div>
  );
};

export default QuizCore;