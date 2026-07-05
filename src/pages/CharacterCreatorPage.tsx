/**
 * Character Creator Page
 *
 * The first major user-facing feature of EverRealm.
 * Allows players to create their first character through an intuitive,
 * immersive multi-step form interface.
 *
 * Architecture:
 * - Modular component structure with reusable form sections
 * - Mock state management (no backend integration)
 * - Responsive design for mobile and desktop
 * - EverRealm design language compliance (frosted glass, gradients, animations)
 * - No persistence; form state is held in memory only
 *
 * Components Used:
 * - CharacterBasicsForm: Identity and biographical information
 * - CharacterAppearanceForm: Physical appearance customization
 * - CharacterGalleryForm: Reference image uploads
 * - FormSection: Reusable container for form groupings
 * - FormInput: Reusable text/date input component
 * - FormSelect: Reusable select dropdown component
 *
 * State Management:
 * - Uses React hooks for local form state
 * - No external state management (Redux, Zustand, etc.)
 * - Form data is accumulated as user progresses through sections
 *
 * Design:
 * - Full-height scrollable page
 * - Frosted glass containers with gradient accents
 * - Smooth fade-in animations for sections
 * - Golden highlights on interactive elements
 * - Mobile-first responsive design
 */

import React, { useState } from 'react';
import { AppLayout } from '@/layouts/AppLayout';
import { PageTransition } from '@/components/layout/PageTransition';
import { AppContainer } from '@/components/layout/AppContainer';
import { CharacterBasicsForm } from '@/components/character-creator/CharacterBasicsForm';
import { CharacterAppearanceForm } from '@/components/character-creator/CharacterAppearanceForm';
import { CharacterGalleryForm } from '@/components/character-creator/CharacterGalleryForm';

/**
 * Form Data Structure
 * Represents the accumulated character creation data
 */
interface CharacterFormData {
  // Basics
  name: string;
  preferredName: string;
  pronouns: string;
  birthDate: string;
  origin: string;
  biography: string;

  // Appearance
  hair: string;
  eyes: string;
  skinTone: string;
  height: string;
  bodyType: string;
  voiceDescription: string;

  // Gallery
  portraitImages: File[];
  outfitImages: File[];
  accessoryImages: File[];
}

/**
 * CharacterCreatorPage Component
 *
 * The main container for the character creation experience.
 * Orchestrates all form sections and manages form state.
 */
export const CharacterCreatorPage: React.FC = () => {
  const [formData, setFormData] = useState<CharacterFormData>({
    name: '',
    preferredName: '',
    pronouns: '',
    birthDate: '',
    origin: '',
    biography: '',
    hair: '',
    eyes: '',
    skinTone: '',
    height: '',
    bodyType: '',
    voiceDescription: '',
    portraitImages: [],
    outfitImages: [],
    accessoryImages: [],
  });

  const [currentStep, setCurrentStep] = useState<'basics' | 'appearance' | 'gallery' | 'review'>(
    'basics'
  );

  /**
   * Handle updates to form data from child components
   */
  const handleFormChange = (section: keyof CharacterFormData, value: unknown) => {
    setFormData((prev) => ({
      ...prev,
      [section]: value,
    }));
  };

  /**
   * Handle step progression
   */
  const handleNextStep = () => {
    const steps: Array<'basics' | 'appearance' | 'gallery' | 'review'> = [
      'basics',
      'appearance',
      'gallery',
      'review',
    ];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePreviousStep = () => {
    const steps: Array<'basics' | 'appearance' | 'gallery' | 'review'> = [
      'basics',
      'appearance',
      'gallery',
      'review',
    ];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  /**
   * Handle character creation (mock implementation)
   */
  const handleCreateCharacter = () => {
    console.log('Character created:', formData);
    // In a real application, this would call a backend API
    alert('Character created! (Mock implementation - data not saved)');
  };

  return (
    <AppLayout>
      <PageTransition>
        <AppContainer>
          <div className="py-12">
            {/* Page Header */}
            <div className="text-center mb-12">
              <h1 className="text-5xl sm:text-6xl font-serif font-bold mb-4">
                <span
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(191, 219, 254, 1) 0%, rgba(217, 119, 6, 1) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Create Your Character
                </span>
              </h1>
              <p className="text-lg text-blue-200">
                Begin your story in EverRealm
              </p>
            </div>

            {/* Progress Indicator */}
            <div className="flex justify-center gap-2 mb-12">
              {(['basics', 'appearance', 'gallery', 'review'] as const).map((step, index) => (
                <React.Fragment key={step}>
                  <button
                    onClick={() => setCurrentStep(step)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      currentStep === step
                        ? 'bg-amber-500 w-8'
                        : 'bg-blue-400/50 hover:bg-blue-400'
                    }`}
                    aria-label={`Go to ${step} step`}
                  />
                  {index < 3 && <div className="w-8 h-px bg-blue-400/30 self-center" />}
                </React.Fragment>
              ))}
            </div>

            {/* Form Sections */}
            <div className="max-w-2xl mx-auto">
              {/* Basics Section */}
              {currentStep === 'basics' && (
                <div
                  className="animate-fade-in"
                  style={{
                    animation: 'fadeIn 0.5s ease-out forwards',
                  }}
                >
                  <CharacterBasicsForm
                    formData={formData}
                    onChange={handleFormChange}
                  />
                </div>
              )}

              {/* Appearance Section */}
              {currentStep === 'appearance' && (
                <div
                  className="animate-fade-in"
                  style={{
                    animation: 'fadeIn 0.5s ease-out forwards',
                  }}
                >
                  <CharacterAppearanceForm
                    formData={formData}
                    onChange={handleFormChange}
                  />
                </div>
              )}

              {/* Gallery Section */}
              {currentStep === 'gallery' && (
                <div
                  className="animate-fade-in"
                  style={{
                    animation: 'fadeIn 0.5s ease-out forwards',
                  }}
                >
                  <CharacterGalleryForm
                    formData={formData}
                    onChange={handleFormChange}
                  />
                </div>
              )}

              {/* Review Section */}
              {currentStep === 'review' && (
                <div
                  className="animate-fade-in"
                  style={{
                    animation: 'fadeIn 0.5s ease-out forwards',
                  }}
                >
                  <ReviewSection formData={formData} />
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-4 justify-center mt-12">
                <button
                  onClick={handlePreviousStep}
                  disabled={currentStep === 'basics'}
                  className="px-8 py-3 rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background: 'rgba(30, 58, 138, 0.4)',
                    border: '1px solid rgba(191, 219, 254, 0.3)',
                    color: 'rgba(191, 219, 254, 0.9)',
                  }}
                  onMouseEnter={(e) => {
                    if (!e.currentTarget.disabled) {
                      (e.currentTarget as HTMLElement).style.background =
                        'rgba(30, 58, 138, 0.6)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!e.currentTarget.disabled) {
                      (e.currentTarget as HTMLElement).style.background =
                        'rgba(30, 58, 138, 0.4)';
                    }
                  }}
                >
                  ← Previous
                </button>

                {currentStep === 'review' ? (
                  <button
                    onClick={handleCreateCharacter}
                    className="px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
                    style={{
                      background:
                        'linear-gradient(135deg, rgba(191, 219, 254, 0.8) 0%, rgba(217, 119, 6, 0.8) 100%)',
                      color: 'rgba(15, 23, 42, 1)',
                      border: '1px solid rgba(217, 119, 6, 0.5)',
                    }}
                  >
                    Create Character ✨
                  </button>
                ) : (
                  <button
                    onClick={handleNextStep}
                    className="px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
                    style={{
                      background:
                        'linear-gradient(135deg, rgba(191, 219, 254, 0.8) 0%, rgba(217, 119, 6, 0.8) 100%)',
                      color: 'rgba(15, 23, 42, 1)',
                      border: '1px solid rgba(217, 119, 6, 0.5)',
                    }}
                  >
                    Next →
                  </button>
                )}
              </div>
            </div>

            {/* Fade animation styles */}
            <style>{`
              @keyframes fadeIn {
                from {
                  opacity: 0;
                }
                to {
                  opacity: 1;
                }
              }

              .animate-fade-in {
                animation: fadeIn 0.5s ease-out forwards;
              }
            `}</style>
          </div>
        </AppContainer>
      </PageTransition>
    </AppLayout>
  );
};

/**
 * Review Section Component
 *
 * Displays a summary of all entered character data
 * for final confirmation before creation
 */
const ReviewSection: React.FC<{ formData: CharacterFormData }> = ({ formData }) => (
  <div
    className="p-8 rounded-2xl space-y-8"
    style={{
      background: 'rgba(30, 58, 138, 0.4)',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(191, 219, 254, 0.2)',
    }}
  >
    <h2 className="text-3xl font-serif font-bold text-blue-100">Review Your Character</h2>

    {/* Basics Review */}
    <div className="space-y-3">
      <h3 className="text-xl font-semibold text-amber-400">Identity</h3>
      <div className="grid grid-cols-2 gap-4 text-blue-100">
        <div>
          <p className="text-sm text-blue-300">Name</p>
          <p>{formData.name}</p>
        </div>
        <div>
          <p className="text-sm text-blue-300">Preferred Name</p>
          <p>{formData.preferredName || '—'}</p>
        </div>
        <div>
          <p className="text-sm text-blue-300">Pronouns</p>
          <p>{formData.pronouns}</p>
        </div>
        <div>
          <p className="text-sm text-blue-300">Birth Date</p>
          <p>{formData.birthDate}</p>
        </div>
      </div>
    </div>

    {/* Appearance Review */}
    <div className="space-y-3">
      <h3 className="text-xl font-semibold text-amber-400">Appearance</h3>
      <div className="grid grid-cols-3 gap-4 text-blue-100 text-sm">
        <div>
          <p className="text-blue-300">Hair</p>
          <p>{formData.hair || '—'}</p>
        </div>
        <div>
          <p className="text-blue-300">Eyes</p>
          <p>{formData.eyes || '—'}</p>
        </div>
        <div>
          <p className="text-blue-300">Skin Tone</p>
          <p>{formData.skinTone || '—'}</p>
        </div>
      </div>
    </div>

    {/* Biography Review */}
    <div className="space-y-3">
      <h3 className="text-xl font-semibold text-amber-400">Biography</h3>
      <p className="text-blue-100 text-sm leading-relaxed">
        {formData.biography || '—'}
      </p>
    </div>

    {/* Gallery Review */}
    <div className="space-y-3">
      <h3 className="text-xl font-semibold text-amber-400">Reference Gallery</h3>
      <div className="grid grid-cols-3 gap-4 text-blue-100 text-sm">
        <div>
          <p className="text-blue-300">Portraits</p>
          <p>{formData.portraitImages.length} image(s)</p>
        </div>
        <div>
          <p className="text-blue-300">Outfits</p>
          <p>{formData.outfitImages.length} image(s)</p>
        </div>
        <div>
          <p className="text-blue-300">Accessories</p>
          <p>{formData.accessoryImages.length} image(s)</p>
        </div>
      </div>
    </div>
  </div>
);

export default CharacterCreatorPage;
