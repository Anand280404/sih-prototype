import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentNavBar from '../../components/ui/StudentNavBar';
import QuizHeader from './components/QuizHeader';
import QuestionCard from './components/QuestionCard';
import QuizMascot from './components/QuizMascot';
import QuizResults from './components/QuizResults';
import QuizNavigation from './components/QuizNavigation';

const QuizSystem = () => {
  const navigate = useNavigate();
  
  // Quiz State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(900); // 15 minutes
  const [points, setPoints] = useState(1250);
  const [streak, setStreak] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [startTime] = useState(Date.now());

  // Mock Quiz Data
  const quizData = {
    id: "punjab-environmental-quiz",
    title: "Punjab Environment Challenge",
    description: "Test your knowledge about Punjab\'s environmental challenges and solutions!",
    timeLimit: 900,
    questions: [
      {
        id: 1,
        type: "multiple-choice",
        text: "What is the main cause of air pollution in Punjab during October-November?",
        image: "https://images.unsplash.com/photo-1574263867128-a9b6f0a34e03?w=500&h=300&fit=crop",
        description: "Think about what farmers do with leftover crop residue!",
        options: [
          { id: "a", text: "Stubble burning by farmers after rice harvest" },
          { id: "b", text: "Too many cars in cities" },
          { id: "c", text: "Factory pollution from Ludhiana" },
          { id: "d", text: "Dust storms from Rajasthan" }
        ],
        correctAnswer: "a",
        explanation: "Stubble burning (parali jalaana) is the biggest cause of air pollution in Punjab during harvest season, affecting millions of people's health!",
        points: 100
      },
      {
        id: 2,
        type: "image-selection",
        text: "Which river is most important for Punjab\'s agriculture but faces serious pollution?",
        description: "Look at these Punjab rivers and choose the most polluted one.",
        imageOptions: [
          { 
            id: "a", 
            image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=300&h=200&fit=crop",
            label: "River Sutlej (Satluj)",
            alt: "Sutlej river with pollution"
          },
          { 
            id: "b", 
            image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=300&h=200&fit=crop",
            label: "River Beas",
            alt: "Beas river flowing"
          },
          { 
            id: "c", 
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop",
            label: "River Ravi",
            alt: "Ravi river near border"
          }
        ],
        correctAnswer: "a",
        explanation: "River Sutlej (Satluj) is heavily polluted by industrial waste from factories and untreated sewage, affecting millions who depend on it for water!",
        points: 150
      },
      {
        id: 3,
        type: "drag-and-drop",
        text: "Match these items to the correct recycling bins:",
        description: "Help sort waste properly by dragging items to their correct recycling bins.",
        draggableItems: [
          { id: "item1", text: "Plastic Bottle" },
          { id: "item2", text: "Banana Peel" },
          { id: "item3", text: "Newspaper" },
          { id: "item4", text: "Glass Jar" }
        ],
        dropZones: [
          { id: "plastic", label: "Plastic Recycling" },
          { id: "organic", label: "Compost Bin" },
          { id: "paper", label: "Paper Recycling" },
          { id: "glass", label: "Glass Recycling" }
        ],
        correctAnswer: {
          "plastic": { id: "item1", text: "Plastic Bottle" },
          "organic": { id: "item2", text: "Banana Peel" },
          "paper": { id: "item3", text: "Newspaper" },
          "glass": { id: "item4", text: "Glass Jar" }
        },
        explanation: "Proper sorting helps recycling facilities process materials efficiently and reduces waste!",
        points: 200
      },
      {
        id: 4,
        type: "multiple-choice",
        text: "Why is Punjab\'s groundwater level dropping every year?",
        image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=500&h=300&fit=crop",
        description: "Think about how farmers get water for their crops!",
        options: [
          { id: "a", text: "Too much rain washing away soil" },
          { id: "b", text: "Excessive tube-well pumping for rice and wheat farming" },
          { id: "c", text: "Climate change making it too hot" },
          { id: "d", text: "People wasting water at home" }
        ],
        correctAnswer: "b",
        explanation: "Punjab farmers use lakhs of tube-wells to pump groundwater for rice (which needs lots of water), causing the water table to drop 1-2 feet every year!",
        points: 100
      },
      {
        id: 5,
        type: "multiple-choice",
        text: "Which transportation method produces the least pollution?",
        description: "Think about eco-friendly ways to get around!",
        options: [
          { id: "a", text: "Riding a bicycle" },
          { id: "b", text: "Driving a car alone" },
          { id: "c", text: "Flying in an airplane" },
          { id: "d", text: "Riding a motorcycle" }
        ],
        correctAnswer: "a",
        explanation: "Bicycles produce zero emissions and are great exercise too! They\'re one of the most eco-friendly ways to travel.",
        points: 100
      }
    ]
  };

  const currentQuestion = quizData?.questions?.[currentQuestionIndex];
  const totalQuestions = quizData?.questions?.length;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  // Timer Effect
  useEffect(() => {
    if (timeRemaining > 0 && !quizComplete) {
      const timer = setTimeout(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0) {
      handleQuizComplete();
    }
  }, [timeRemaining, quizComplete]);

  // Handle Answer Selection
  const handleAnswer = (answer) => {
    const newAnswers = { ...answers, [currentQuestion?.id]: answer };
    setAnswers(newAnswers);
    
    // Check if answer is correct
    const isCorrect = checkAnswer(answer, currentQuestion);
    
    // Update streak
    if (isCorrect) {
      setCurrentStreak(prev => prev + 1);
      setStreak(prev => Math.max(prev, currentStreak + 1));
      // Add points with streak bonus
      const bonusMultiplier = Math.floor(currentStreak / 3) + 1;
      setPoints(prev => prev + (currentQuestion?.points * bonusMultiplier));
    } else {
      setCurrentStreak(0);
    }
    
    setShowFeedback(true);
    
    // Auto-advance after feedback (except last question)
    if (!isLastQuestion) {
      setTimeout(() => {
        handleNext();
      }, 2500);
    }
  };

  const checkAnswer = (answer, question) => {
    if (question?.type === 'drag-and-drop') {
      const correctAnswer = question?.correctAnswer;
      return JSON.stringify(answer) === JSON.stringify(correctAnswer);
    }
    return answer === question?.correctAnswer;
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setShowFeedback(false);
      setShowHint(false);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setShowFeedback(false);
      setShowHint(false);
    }
  };

  const handleSkip = () => {
    setCurrentStreak(0);
    handleNext();
  };

  const handleHintRequest = () => {
    setShowHint(true);
  };

  const handleQuizComplete = () => {
    setQuizComplete(true);
  };

  const calculateResults = () => {
    let correctCount = 0;
    let totalPoints = 0;
    
    quizData?.questions?.forEach(question => {
      const userAnswer = answers?.[question?.id];
      if (userAnswer && checkAnswer(userAnswer, question)) {
        correctCount++;
        totalPoints += question?.points;
      }
    });

    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    
    // Mock new badges based on performance
    const newBadges = [];
    if (correctCount === totalQuestions) {
      newBadges?.push({
        name: "Perfect Score",
        description: "Answered all questions correctly!",
        icon: "Crown"
      });
    }
    if (streak >= 3) {
      newBadges?.push({
        name: "Streak Master",
        description: `${streak} questions in a row!`,
        icon: "Zap"
      });
    }

    return {
      score: correctCount,
      totalQuestions,
      pointsEarned: totalPoints,
      timeSpent,
      correctAnswers: correctCount,
      streak,
      newBadges
    };
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setShowFeedback(false);
    setQuizComplete(false);
    setTimeRemaining(900);
    setStreak(0);
    setCurrentStreak(0);
    setShowHint(false);
  };

  const handleContinue = () => {
    navigate('/student-dashboard');
  };

  const handleReview = () => {
    setQuizComplete(false);
    setCurrentQuestionIndex(0);
    setShowFeedback(true);
  };

  const handleExit = () => {
    navigate('/student-dashboard');
  };

  if (quizComplete) {
    const results = calculateResults();
    return (
      <QuizResults
        {...results}
        onRestart={handleRestart}
        onContinue={handleContinue}
        onReview={handleReview}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <StudentNavBar points={points} streak={streak} />
      <div className="pb-20 lg:pb-4">
        {/* Quiz Header */}
        <QuizHeader
          currentQuestion={currentQuestionIndex + 1}
          totalQuestions={totalQuestions}
          timeRemaining={timeRemaining}
          points={points}
          streak={currentStreak}
          onExit={handleExit}
        />

        {/* Main Quiz Content */}
        <div className="max-w-4xl mx-auto px-4 py-6">
          <QuestionCard
            question={currentQuestion}
            onAnswer={handleAnswer}
            showFeedback={showFeedback}
            selectedAnswer={answers?.[currentQuestion?.id]}
            isCorrect={answers?.[currentQuestion?.id] && checkAnswer(answers?.[currentQuestion?.id], currentQuestion)}
            explanation={currentQuestion?.explanation}
          />
        </div>

        {/* Quiz Navigation */}
        <QuizNavigation
          currentQuestion={currentQuestionIndex + 1}
          totalQuestions={totalQuestions}
          canGoBack={currentQuestionIndex > 0}
          canGoNext={currentQuestionIndex < totalQuestions - 1}
          canSkip={true}
          hasAnswered={!!answers?.[currentQuestion?.id]}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onSkip={handleSkip}
          onSubmit={handleQuizComplete}
          isLastQuestion={isLastQuestion}
        />

        {/* Quiz Mascot */}
        <QuizMascot
          currentQuestion={currentQuestionIndex + 1}
          showHint={showHint}
          onHintRequest={handleHintRequest}
          isCorrect={answers?.[currentQuestion?.id] && checkAnswer(answers?.[currentQuestion?.id], currentQuestion)}
          showFeedback={showFeedback}
          streak={currentStreak}
        />
      </div>
    </div>
  );
};

export default QuizSystem;