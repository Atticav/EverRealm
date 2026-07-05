import React from 'react';
import { StarfieldBackground } from '@/components/backgrounds/StarfieldBackground';

/**
 * AppLayout Component
 *
 * Main application wrapper that serves as the foundational structure for all pages.
 * Handles responsive layout, background rendering, and content centering.
 *
 * This layout is designed to work seamlessly with React Router and future
 * navigation implementations without requiring changes to this component.
 *
 * Features:
 * - Full viewport coverage
 * - Celestial background with starfield
 * - Content centering
 * - Responsive padding and spacing
 * - Prepared for dock navigation integration
 */
export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-slate-950">
      {/* Starfield background - rendered behind all content */}
      <StarfieldBackground />

      {/* Main content wrapper - centers content and handles responsive spacing */}
      <div className="relative z-10 w-full h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        {/* Content container with maximum width constraint */}
        <div className="w-full max-w-6xl">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
