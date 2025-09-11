import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import StudentNavBar from '../../components/ui/StudentNavBar';
import FlashcardDisplay from './components/FlashcardDisplay';
import NavigationControls from './components/NavigationControls';
import StudyProgress from './components/StudyProgress';
import FilterControls from './components/FilterControls';
import StudyMascot from './components/StudyMascot';

const RevisionFlashcards = () => {
  // Mock flashcards data
  const mockFlashcards = [
    {
      id: 1,
      cardNumber: 1,
      topic: "Punjab Air Pollution",
      question: "Why does Punjab face severe air pollution during October-November every year?",
      answer: "Punjab faces severe air pollution during harvest season due to stubble burning (parali jalaana) by farmers after rice harvest, combined with winter weather conditions that trap pollutants near the ground.",
      explanation: "When farmers burn leftover rice stubble, it creates massive amounts of smoke that mixes with winter fog, creating dangerous smog that affects millions of people's health across North India.",
      questionImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop",
      answerImage: "https://images.unsplash.com/photo-1574263867128-a9b6f0a34e03?w=400&h=250&fit=crop",
      difficulty: "medium",
      reviewFrequency: "new",
      hasAudio: true,
      lastReviewed: null,
      timesReviewed: 0
    },
    {
      id: 2,
      cardNumber: 2,
      topic: "Punjab Water Crisis",
      question: "Name three major rivers of Punjab and explain why groundwater is decreasing.",
      answer: "Punjab's three major rivers are Sutlej (Satluj), Beas, and Ravi. Groundwater is decreasing because farmers use lakhs of tube-wells to pump water for rice cultivation, which needs 3-5 times more water than wheat.",
      explanation: "Punjab's shift from wheat to rice farming has created a water crisis. Rice needs flooding fields for months, depleting groundwater by 1-2 feet every year.",
      questionImage: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=250&fit=crop",
      answerImage: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=250&fit=crop",
      difficulty: "easy",
      reviewFrequency: "review",
      hasAudio: true,
      lastReviewed: new Date(Date.now() - 86400000),
      timesReviewed: 2
    },
    {
      id: 3,
      cardNumber: 3,
      topic: "Punjab Industrial Pollution",
      question: "How do industries in Ludhiana and other Punjab cities harm the environment?",
      answer: "Industries in Punjab cities like Ludhiana release untreated chemicals into rivers, emit toxic gases into the air, and produce solid waste that contaminates soil and groundwater.",
      explanation: "Cities like Ludhiana have thousands of textile, electroplating, and chemical industries that often don't follow pollution control rules, making Punjab one of India's most polluted states.",
      questionImage: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=250&fit=crop",
      answerImage: "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=400&h=250&fit=crop",
      difficulty: "hard",
      reviewFrequency: "new",
      hasAudio: false,
      lastReviewed: null,
      timesReviewed: 0
    },
    {
      id: 4,
      cardNumber: 4,
      topic: "Punjab Biodiversity",
      question: "Which animals and birds are commonly found in Punjab, and why do they need protection?",
      answer: "Punjab is home to peacocks (national bird), blackbucks, spotted deer, various migratory birds, sparrows, and parrots. They need protection because habitat loss, pollution, and pesticide use threaten their survival.",
      explanation: "Punjab's wildlife faces threats from shrinking forests, polluted rivers, and excessive pesticide use in agriculture. Protecting these species helps maintain ecological balance.",
      questionImage: "https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400&h=250&fit=crop",
      answerImage: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=250&fit=crop",
      difficulty: "easy",
      reviewFrequency: "mastered",
      hasAudio: true,
      lastReviewed: new Date(Date.now() - 172800000),
      timesReviewed: 5
    },
    {
      id: 5,
      cardNumber: 5,
      topic: "Punjab Agriculture & Environment",
      question: "How does modern farming in Punjab affect soil and water quality?",
      answer: "Modern farming in Punjab uses excessive pesticides and fertilizers, which contaminate groundwater, reduce soil fertility, and harm beneficial insects and earthworms essential for healthy soil.",
      explanation: "Punjab\'s Green Revolution brought higher crop yields but also environmental costs. Overuse of chemicals has led to soil degradation and water contamination affecting human health.",
      questionImage: "https://images.pexels.com/photos/256737/pexels-photo-256737.jpeg?w=400&h=250&fit=crop",
      answerImage: "https://images.unsplash.com/photo-1625246333195-78d9c38ad649?w=400&h=250&fit=crop",
      difficulty: "medium",
      reviewFrequency: "review",
      hasAudio: false,
      lastReviewed: new Date(Date.now() - 43200000),
      timesReviewed: 3
    },
    {
      id: 6,
      cardNumber: 6,
      topic: "Punjab Environmental Solutions",
      question: "What can young people in Punjab do to help solve environmental problems?",
      answer: "Young people can plant native trees, promote organic farming, educate families about alternatives to stubble burning, use bicycles for transport, organize cleanliness drives, and spread awareness through social media.",
      explanation: "Students like you have the power to influence families and communities. Your generation can adopt eco-friendly habits and pressure leaders to implement better environmental policies.",
      questionImage: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400&h=250&fit=crop",
      answerImage: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=250&fit=crop",
      difficulty: "easy",
      reviewFrequency: "new",
      hasAudio: true,
      lastReviewed: null,
      timesReviewed: 0
    }
  ];

  // Topics for filtering
  const topics = [
    { value: 'all', label: 'All Punjab Topics', icon: 'Layers', count: mockFlashcards?.length },
    { value: 'Punjab Air Pollution', label: 'Air Pollution', icon: 'CloudDrizzle', count: 1 },
    { value: 'Punjab Water Crisis', label: 'Water Crisis', icon: 'Droplets', count: 1 },
    { value: 'Punjab Industrial Pollution', label: 'Industrial Pollution', icon: 'Factory', count: 1 },
    { value: 'Punjab Biodiversity', label: 'Wildlife & Birds', icon: 'Bird', count: 1 },
    { value: 'Punjab Agriculture & Environment', label: 'Farming Impact', icon: 'Wheat', count: 1 },
    { value: 'Punjab Environmental Solutions', label: 'Solutions', icon: 'Lightbulb', count: 1 }
  ];

  // State management
  const [flashcards, setFlashcards] = useState(mockFlashcards);
  const [filteredCards, setFilteredCards] = useState(mockFlashcards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [sessionStartTime] = useState(Date.now());
  const [sessionTime, setSessionTime] = useState(0);
  const [studiedCards, setStudiedCards] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [streak, setStreak] = useState(7);
  const [difficultyStats, setDifficultyStats] = useState({ easy: 0, medium: 0, hard: 0 });

  // Filter states
  const [selectedTopic, setSelectedTopic] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedReviewFrequency, setSelectedReviewFrequency] = useState('all');

  // Session timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSessionTime(Math.floor((Date.now() - sessionStartTime) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, [sessionStartTime]);

  // Filter flashcards
  useEffect(() => {
    let filtered = flashcards;

    if (selectedTopic !== 'all') {
      filtered = filtered?.filter(card => card?.topic === selectedTopic);
    }

    if (selectedDifficulty !== 'all') {
      filtered = filtered?.filter(card => card?.difficulty === selectedDifficulty);
    }

    if (selectedReviewFrequency !== 'all') {
      filtered = filtered?.filter(card => card?.reviewFrequency === selectedReviewFrequency);
    }

    setFilteredCards(filtered);
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [selectedTopic, selectedDifficulty, selectedReviewFrequency, flashcards]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      switch (e?.key) {
        case 'ArrowLeft': case'a': case'A':
          e?.preventDefault();
          handlePrevious();
          break;
        case 'ArrowRight': case'd': case'D':
          e?.preventDefault();
          handleNext();
          break;
        case ' ':
          e?.preventDefault();
          handleFlip();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentIndex, filteredCards?.length]);

  // Navigation handlers
  const handlePrevious = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  }, [currentIndex]);

  const handleNext = useCallback(() => {
    if (currentIndex < filteredCards?.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    }
  }, [currentIndex, filteredCards?.length]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    
    // Mark as studied when flipping to answer
    if (!isFlipped && filteredCards?.[currentIndex]) {
      const cardId = filteredCards?.[currentIndex]?.id;
      const studiedCardIds = JSON.parse(localStorage.getItem('studiedCards') || '[]');
      
      if (!studiedCardIds?.includes(cardId)) {
        studiedCardIds?.push(cardId);
        localStorage.setItem('studiedCards', JSON.stringify(studiedCardIds));
        setStudiedCards(prev => prev + 1);
      }
    }
  };

  const handleShuffle = () => {
    if (!isShuffled) {
      const shuffled = [...filteredCards]?.sort(() => Math.random() - 0.5);
      setFilteredCards(shuffled);
      setIsShuffled(true);
    } else {
      // Reset to original order
      let filtered = flashcards;
      if (selectedTopic !== 'all') {
        filtered = filtered?.filter(card => card?.topic === selectedTopic);
      }
      if (selectedDifficulty !== 'all') {
        filtered = filtered?.filter(card => card?.difficulty === selectedDifficulty);
      }
      if (selectedReviewFrequency !== 'all') {
        filtered = filtered?.filter(card => card?.reviewFrequency === selectedReviewFrequency);
      }
      setFilteredCards(filtered);
      setIsShuffled(false);
    }
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setIsShuffled(false);
    setStudiedCards(0);
    setCorrectAnswers(0);
    setDifficultyStats({ easy: 0, medium: 0, hard: 0 });
    localStorage.removeItem('studiedCards');
  };

  const handleDifficultyRate = (cardId, difficulty) => {
    // Update difficulty stats
    setDifficultyStats(prev => ({
      ...prev,
      [difficulty]: prev?.[difficulty] + 1
    }));

    // Update card difficulty for adaptive learning
    setFlashcards(prev => prev?.map(card => 
      card?.id === cardId 
        ? { ...card, difficulty, lastReviewed: new Date(), timesReviewed: card?.timesReviewed + 1 }
        : card
    ));

    // If marked as easy, consider it correct
    if (difficulty === 'easy') {
      setCorrectAnswers(prev => prev + 1);
    }
  };

  const handleAudioPlay = (cardId) => {
    // Mock audio play - in real app would use Web Speech API or audio files
    if ('speechSynthesis' in window) {
      const card = filteredCards?.find(c => c?.id === cardId);
      if (card) {
        const utterance = new SpeechSynthesisUtterance(
          isFlipped ? card.answer : card.question
        );
        utterance.rate = 0.8;
        utterance.pitch = 1.1;
        speechSynthesis.speak(utterance);
      }
    }
  };

  const handleClearFilters = () => {
    setSelectedTopic('all');
    setSelectedDifficulty('all');
    setSelectedReviewFrequency('all');
  };

  const currentCard = filteredCards?.[currentIndex];
  const progressPercentage = filteredCards?.length > 0 ? ((currentIndex + 1) / filteredCards?.length) * 100 : 0;

  return (
    <div className="min-h-screen bg-background">
      <StudentNavBar points={1250} streak={streak} />
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name="BookOpen" size={24} color="var(--color-primary)" />
            </div>
            <div>
              <h1 className="font-heading text-3xl md:text-4xl text-foreground">
                Punjab Environment Flashcards
              </h1>
              <p className="font-caption text-muted-foreground">
                Master Punjab's environmental challenges and solutions through study cards
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/quiz-system">
              <Button variant="outline" iconName="Brain" iconPosition="left">
                Take Quiz
              </Button>
            </Link>
            <Link to="/student-dashboard">
              <Button variant="ghost" iconName="Home" iconPosition="left">
                Dashboard
              </Button>
            </Link>
          </div>
        </div>

        {/* Filter Controls */}
        <FilterControls
          topics={topics}
          selectedTopic={selectedTopic}
          onTopicChange={setSelectedTopic}
          selectedDifficulty={selectedDifficulty}
          onDifficultyChange={setSelectedDifficulty}
          selectedReviewFrequency={selectedReviewFrequency}
          onReviewFrequencyChange={setSelectedReviewFrequency}
          onClearFilters={handleClearFilters}
          totalCards={flashcards?.length}
          filteredCards={filteredCards?.length}
        />

        {filteredCards?.length === 0 ? (
          // No Cards State
          (<div className="text-center py-16 space-y-6">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto">
              <Icon name="Search" size={32} color="var(--color-muted-foreground)" />
            </div>
            <div>
              <h3 className="font-heading text-xl text-foreground mb-2">
                No flashcards found
              </h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your filters to see more cards
              </p>
              <Button onClick={handleClearFilters} iconName="RotateCcw" iconPosition="left">
                Clear Filters
              </Button>
            </div>
          </div>)
        ) : (
          // Main Study Interface
          (<div className="grid lg:grid-cols-4 gap-8">
            {/* Main Flashcard Area */}
            <div className="lg:col-span-3 space-y-6">
              {/* Flashcard Display */}
              <FlashcardDisplay
                flashcard={currentCard}
                onFlip={handleFlip}
                onDifficultyRate={handleDifficultyRate}
                isFlipped={isFlipped}
                showAnswer={isFlipped}
                onAudioPlay={handleAudioPlay}
              />

              {/* Navigation Controls */}
              <NavigationControls
                currentIndex={currentIndex}
                totalCards={filteredCards?.length}
                onPrevious={handlePrevious}
                onNext={handleNext}
                onShuffle={handleShuffle}
                onReset={handleReset}
                isShuffled={isShuffled}
              />
            </div>
            {/* Progress Sidebar */}
            <div className="lg:col-span-1">
              <StudyProgress
                studiedCards={studiedCards}
                totalCards={filteredCards?.length}
                sessionTime={sessionTime}
                streak={streak}
                correctAnswers={correctAnswers}
                difficultyStats={difficultyStats}
              />
            </div>
          </div>)
        )}

        {/* Study Tips */}
        <div className="bg-card rounded-lg p-6 shadow-soft border border-border">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Icon name="Lightbulb" size={20} color="var(--color-accent)" />
            </div>
            <div>
              <h3 className="font-heading text-lg text-foreground mb-2">Punjab Environment Study Tips</h3>
              <ul className="space-y-2 text-sm font-caption text-muted-foreground">
                <li className="flex items-start space-x-2">
                  <Icon name="CheckCircle" size={16} color="var(--color-success)" className="mt-0.5 flex-shrink-0" />
                  <span>Use keyboard shortcuts: A/D for navigation, Space to flip cards</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Icon name="CheckCircle" size={16} color="var(--color-success)" className="mt-0.5 flex-shrink-0" />
                  <span>Connect each topic to your daily life in Punjab - what do you see around you?</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Icon name="CheckCircle" size={16} color="var(--color-success)" className="mt-0.5 flex-shrink-0" />
                  <span>Discuss these topics with family and friends to deepen your understanding!</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* Study Mascot */}
      <StudyMascot
        currentProgress={progressPercentage}
        sessionTime={sessionTime}
        studiedCards={studiedCards}
        onQuickTip={(tip) => console.log('Tip shown:', tip)}
        onEncouragement={(message) => console.log('Encouragement:', message)}
      />
    </div>
  );
};

export default RevisionFlashcards;