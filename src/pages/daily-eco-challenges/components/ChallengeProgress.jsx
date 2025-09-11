import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ChallengeProgress = ({ challenge, userProgress, onUpdateProgress, onSubmitChallenge }) => {
  const [currentStep, setCurrentStep] = useState(userProgress?.currentStep || 0);
  const [uploadedPhotos, setUploadedPhotos] = useState(userProgress?.photos || []);
  const [reflection, setReflection] = useState(userProgress?.reflection || '');
  const [showCamera, setShowCamera] = useState(false);

  const handleStepComplete = (stepIndex) => {
    const newProgress = {
      ...userProgress,
      completedSteps: Math.max(userProgress?.completedSteps || 0, stepIndex + 1),
      currentStep: stepIndex + 1
    };
    setCurrentStep(stepIndex + 1);
    onUpdateProgress(challenge?.id, newProgress);
  };

  const handlePhotoUpload = (event) => {
    const file = event?.target?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newPhotos = [...uploadedPhotos, {
          id: Date.now(),
          url: e?.target?.result,
          name: file?.name,
          timestamp: new Date()?.toISOString()
        }];
        setUploadedPhotos(newPhotos);
        
        const newProgress = {
          ...userProgress,
          photos: newPhotos
        };
        onUpdateProgress(challenge?.id, newProgress);
      };
      reader?.readAsDataURL(file);
    }
  };

  const handleReflectionChange = (e) => {
    setReflection(e?.target?.value);
    const newProgress = {
      ...userProgress,
      reflection: e?.target?.value
    };
    onUpdateProgress(challenge?.id, newProgress);
  };

  const canSubmit = () => {
    const requiredSteps = challenge?.steps?.filter(step => step?.required)?.length;
    const completedRequired = (userProgress?.completedSteps || 0);
    return completedRequired >= requiredSteps;
  };

  return (
    <div className="bg-card rounded-xl shadow-soft border border-border overflow-hidden">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-heading text-2xl mb-2">{challenge?.title}</h2>
            <p className="opacity-90 font-caption">{challenge?.description}</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-data font-bold">
              {userProgress?.completedSteps || 0}/{challenge?.totalSteps}
            </div>
            <div className="text-sm opacity-75">Steps Complete</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="w-full bg-primary-foreground/20 rounded-full h-3">
            <div 
              className="bg-primary-foreground h-3 rounded-full transition-all duration-500"
              style={{ width: `${((userProgress?.completedSteps || 0) / challenge?.totalSteps) * 100}%` }}
            />
          </div>
        </div>
      </div>
      {/* Challenge Steps */}
      <div className="p-6 space-y-6">
        {challenge?.steps?.map((step, index) => {
          const isCompleted = (userProgress?.completedSteps || 0) > index;
          const isCurrent = currentStep === index;
          const isAccessible = index <= (userProgress?.completedSteps || 0);

          return (
            <div key={index} className={`border rounded-lg p-4 transition-all duration-300 ${
              isCompleted ? 'border-success bg-success/5' : isCurrent ?'border-primary bg-primary/5': isAccessible ?'border-border bg-background': 'border-muted bg-muted/30'
            }`}>
              {/* Step Header */}
              <div className="flex items-start space-x-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  isCompleted ? 'bg-success text-success-foreground' :
                  isCurrent ? 'bg-primary text-primary-foreground': isAccessible ?'bg-muted text-muted-foreground': 'bg-muted/50 text-muted-foreground/50'
                }`}>
                  {isCompleted ? (
                    <Icon name="Check" size={16} />
                  ) : (
                    <span className="font-data text-sm font-bold">{index + 1}</span>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className={`font-caption font-medium ${
                      isAccessible ? 'text-foreground' : 'text-muted-foreground'
                    }`}>
                      {step?.title}
                      {step?.required && (
                        <span className="text-error ml-1">*</span>
                      )}
                    </h3>
                    {step?.points && (
                      <div className="flex items-center space-x-1 text-accent">
                        <Icon name="Star" size={14} />
                        <span className="font-data text-sm">+{step?.points}</span>
                      </div>
                    )}
                  </div>

                  <p className={`text-sm mb-3 ${
                    isAccessible ? 'text-muted-foreground' : 'text-muted-foreground/50'
                  }`}>
                    {step?.description}
                  </p>

                  {/* Step Content */}
                  {isAccessible && (
                    <div className="space-y-3">
                      {/* Photo Upload Step */}
                      {step?.type === 'photo' && (
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            <Icon name="Camera" size={16} color="var(--color-primary)" />
                            <span className="text-sm font-caption font-medium">Upload Photo</span>
                          </div>
                          
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-3">
                            {uploadedPhotos?.map((photo) => (
                              <div key={photo?.id} className="relative aspect-square rounded-lg overflow-hidden bg-muted">
                                <Image
                                  src={photo?.url}
                                  alt="Challenge photo"
                                  className="w-full h-full object-cover"
                                />
                                <div className="absolute top-2 right-2">
                                  <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center">
                                    <Icon name="Check" size={12} color="white" />
                                  </div>
                                </div>
                              </div>
                            ))}
                            
                            {uploadedPhotos?.length < (step?.maxPhotos || 1) && (
                              <label className="aspect-square border-2 border-dashed border-muted-foreground/30 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors">
                                <Icon name="Plus" size={24} color="var(--color-muted-foreground)" />
                                <span className="text-xs font-caption text-muted-foreground mt-1">Add Photo</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={handlePhotoUpload}
                                  className="hidden"
                                />
                              </label>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Text Input Step */}
                      {step?.type === 'reflection' && (
                        <div>
                          <Input
                            label="Your Reflection"
                            type="text"
                            placeholder={step?.placeholder || "Share your thoughts..."}
                            value={reflection}
                            onChange={handleReflectionChange}
                            className="mb-2"
                          />
                        </div>
                      )}

                      {/* Action Step */}
                      {step?.type === 'action' && !isCompleted && (
                        <Button
                          onClick={() => handleStepComplete(index)}
                          variant="outline"
                          size="sm"
                          iconName="CheckCircle"
                          iconPosition="left"
                        >
                          Mark as Complete
                        </Button>
                      )}

                      {/* Completed Indicator */}
                      {isCompleted && (
                        <div className="flex items-center space-x-2 text-success">
                          <Icon name="CheckCircle" size={16} />
                          <span className="text-sm font-caption font-medium">Completed!</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Submit Section */}
      <div className="p-6 border-t border-border bg-muted/30">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-caption font-medium text-foreground mb-1">
              Ready to submit?
            </div>
            <div className="text-sm text-muted-foreground">
              Complete all required steps to earn your reward
            </div>
          </div>
          
          <Button
            onClick={() => onSubmitChallenge(challenge)}
            disabled={!canSubmit()}
            iconName="Send"
            iconPosition="right"
            className="ml-4"
          >
            Submit Challenge
          </Button>
        </div>

        {!canSubmit() && (
          <div className="mt-3 p-3 bg-warning/10 rounded-lg border border-warning/20">
            <div className="flex items-center space-x-2">
              <Icon name="AlertCircle" size={16} color="var(--color-warning)" />
              <span className="text-sm font-caption text-warning-foreground">
                Complete all required steps to submit your challenge
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChallengeProgress;