import React from 'react';

/**
 * AppContainer Component
 *
 * Reusable container that defines maximum content width,
 * consistent spacing, and responsive padding for page content.
 *
 * This component ensures all pages maintain visual consistency
 * while adapting gracefully to different screen sizes.
 *
 * Features:
 * - Maximum width constraint (fits within max-w-6xl)
 * - Responsive padding
 * - Horizontal centering
 * - Flexible height for content
 */
export const AppContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      {children}
    </div>
  );
};

export default AppContainer;
