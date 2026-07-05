import React from 'react';

/**
 * PageTransition Component
 *
 * Reusable wrapper that applies smooth fade animations to page content.
 * Provides a consistent transition experience when navigating between pages.
 *
 * Currently implements a fade animation. Can be extended with additional
 * transition types (slide, scale, etc.) through props if needed in the future.
 *
 * Features:
 * - Smooth fade-in animation
 * - No exaggerated motion (respects modern UX principles)
 * - Prepared for future transition variants
 * - Fully reusable across all pages
 */
export const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div
      className="animate-fade-in"
      style={{
        animation: 'fadeIn 0.5s ease-out forwards',
      }}
    >
      {children}

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

        @media (prefers-reduced-motion: reduce) {
          .animate-fade-in {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
};

export default PageTransition;
