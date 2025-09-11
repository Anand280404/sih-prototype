import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

import Image from '../../../components/AppImage';

const QuestionCard = ({ 
  question, 
  onAnswer, 
  showFeedback, 
  selectedAnswer,
  isCorrect,
  explanation 
}) => {
  const [draggedItem, setDraggedItem] = useState(null);
  const [dropZones, setDropZones] = useState({});

  const handleMultipleChoice = (optionId) => {
    onAnswer(optionId);
  };

  const handleDragStart = (e, item) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e?.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, zoneId) => {
    e?.preventDefault();
    if (draggedItem) {
      setDropZones(prev => ({
        ...prev,
        [zoneId]: draggedItem
      }));
      setDraggedItem(null);
      
      // Check if all zones are filled for drag-and-drop questions
      const newDropZones = { ...dropZones, [zoneId]: draggedItem };
      if (Object.keys(newDropZones)?.length === question?.dropZones?.length) {
        onAnswer(newDropZones);
      }
    }
  };

  const renderMultipleChoice = () => (
    <div className="space-y-3">
      {question?.options?.map((option) => (
        <button
          key={option?.id}
          onClick={() => handleMultipleChoice(option?.id)}
          disabled={showFeedback}
          className={`w-full p-4 rounded-lg border-2 transition-all duration-200 text-left ${
            selectedAnswer === option?.id
              ? showFeedback
                ? isCorrect
                  ? 'border-success bg-success/10 text-success-foreground'
                  : 'border-error bg-error/10 text-error-foreground' :'border-primary bg-primary/10 text-primary-foreground' :'border-border bg-card hover:border-primary/50 hover:bg-muted'
          }`}
        >
          <div className="flex items-center space-x-3">
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
              selectedAnswer === option?.id
                ? showFeedback
                  ? isCorrect
                    ? 'border-success bg-success text-success-foreground'
                    : 'border-error bg-error text-error-foreground' :'border-primary bg-primary text-primary-foreground' :'border-muted-foreground'
            }`}>
              {selectedAnswer === option?.id && (
                <Icon 
                  name={showFeedback ? (isCorrect ? "Check" : "X") : "Circle"} 
                  size={12} 
                />
              )}
            </div>
            <span className="font-caption font-medium">{option?.text}</span>
          </div>
        </button>
      ))}
    </div>
  );

  const renderDragAndDrop = () => (
    <div className="space-y-6">
      {/* Draggable Items */}
      <div className="space-y-2">
        <h4 className="font-caption font-medium text-muted-foreground">Drag these items:</h4>
        <div className="flex flex-wrap gap-3">
          {question?.draggableItems?.map((item) => (
            <div
              key={item?.id}
              draggable
              onDragStart={(e) => handleDragStart(e, item)}
              className="bg-primary text-primary-foreground px-4 py-2 rounded-lg cursor-move hover:bg-primary/90 transition-colors duration-200 font-caption font-medium"
            >
              {item?.text}
            </div>
          ))}
        </div>
      </div>

      {/* Drop Zones */}
      <div className="space-y-2">
        <h4 className="font-caption font-medium text-muted-foreground">Drop them here:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {question?.dropZones?.map((zone) => (
            <div
              key={zone?.id}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, zone?.id)}
              className={`min-h-[80px] border-2 border-dashed rounded-lg p-4 flex items-center justify-center transition-all duration-200 ${
                dropZones?.[zone?.id]
                  ? 'border-success bg-success/10' :'border-muted-foreground hover:border-primary'
              }`}
            >
              {dropZones?.[zone?.id] ? (
                <span className="font-caption font-medium text-success">
                  {dropZones?.[zone?.id]?.text}
                </span>
              ) : (
                <span className="font-caption text-muted-foreground">
                  {zone?.label}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderImageSelection = () => (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {question?.imageOptions?.map((option) => (
        <button
          key={option?.id}
          onClick={() => handleMultipleChoice(option?.id)}
          disabled={showFeedback}
          className={`relative rounded-lg overflow-hidden border-4 transition-all duration-200 ${
            selectedAnswer === option?.id
              ? showFeedback
                ? isCorrect
                  ? 'border-success' :'border-error' :'border-primary' :'border-border hover:border-primary/50'
          }`}
        >
          <Image
            src={option?.image}
            alt={option?.alt}
            className="w-full h-32 object-cover"
          />
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            {selectedAnswer === option?.id && showFeedback && (
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                isCorrect ? 'bg-success' : 'bg-error'
              }`}>
                <Icon 
                  name={isCorrect ? "Check" : "X"} 
                  size={20} 
                  color="white"
                />
              </div>
            )}
          </div>
          <div className="p-2 bg-card">
            <span className="font-caption text-sm font-medium">{option?.label}</span>
          </div>
        </button>
      ))}
    </div>
  );

  return (
    <div className="bg-card rounded-lg shadow-soft border border-border p-6">
      {/* Question Content */}
      <div className="mb-6">
        <h2 className="font-heading text-xl text-foreground mb-4">
          {question?.text}
        </h2>
        
        {question?.image && (
          <div className="mb-4">
            <Image
              src={question?.image}
              alt="Question illustration"
              className="w-full max-w-md mx-auto rounded-lg"
            />
          </div>
        )}

        {question?.description && (
          <p className="font-caption text-muted-foreground mb-4">
            {question?.description}
          </p>
        )}
      </div>
      {/* Question Type Rendering */}
      <div className="mb-6">
        {question?.type === 'multiple-choice' && renderMultipleChoice()}
        {question?.type === 'drag-and-drop' && renderDragAndDrop()}
        {question?.type === 'image-selection' && renderImageSelection()}
      </div>
      {/* Feedback */}
      {showFeedback && (
        <div className={`p-4 rounded-lg border ${
          isCorrect 
            ? 'border-success bg-success/10' :'border-error bg-error/10'
        }`}>
          <div className="flex items-start space-x-3">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
              isCorrect ? 'bg-success' : 'bg-error'
            }`}>
              <Icon 
                name={isCorrect ? "Check" : "X"} 
                size={16} 
                color="white"
              />
            </div>
            <div>
              <div className={`font-caption font-medium mb-1 ${
                isCorrect ? 'text-success-foreground' : 'text-error-foreground'
              }`}>
                {isCorrect ? 'Correct! Well done!' : 'Not quite right, but keep trying!'}
              </div>
              {explanation && (
                <p className="font-caption text-sm opacity-90">
                  {explanation}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;