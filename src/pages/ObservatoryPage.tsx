import React from 'react';
import { AppLayout } from '@/layouts/AppLayout';
import { PageTransition } from '@/components/layout/PageTransition';
import { DockNavigation } from '@/components/layout/DockNavigation';
import { ObservatoryOrb } from '@/components/observatory/ObservatoryOrb';

/**
 * ObservatoryPage Component
 *
 * The entrance to EverRealm. This page serves as the first experience
 * when users access the application.
 *
 * Visual Elements:
 * - Starfield background (via AppLayout)
 * - Celestial orb artifact (ObservatoryOrb)
 * - EverRealm branding
 * - Subtitle with the platform's philosophy
 *
 * Architecture:
 * - Uses AppLayout for background and structure
 * - PageTransition for smooth entrance animation
 * - DockNavigation for navigation access
 * - No business logic or routing in this component
 *
 * Future Integration:
 * - This page is prepared for React Router integration
 * - Navigation items will connect to respective pages
 * - Can be extended with additional elements as needed
 */
export const ObservatoryPage: React.FC = () => {
  return (
    <AppLayout>
      <PageTransition>
        <div className="flex flex-col items-center justify-center min-h-screen gap-8 sm:gap-12 lg:gap-16">
          {/* Observatory Orb - Magical centerpiece */}
          <div className="flex justify-center">
            <ObservatoryOrb />
          </div>

          {/* Branding Section */}
          <div className="flex flex-col items-center gap-4 sm:gap-6 text-center">
            {/* Main Title */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold tracking-tight">
              <span
                style={{
                  background: 'linear-gradient(135deg, rgba(191, 219, 254, 1) 0%, rgba(217, 119, 6, 1) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                EverRealm
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl lg:text-2xl font-light tracking-wide" style={{ color: 'rgba(191, 219, 254, 0.8)' }}>
              Every story leaves a constellation.
            </p>
          </div>
        </div>
      </PageTransition>

      {/* Navigation Dock */}
      <DockNavigation />
    </AppLayout>
  );
};

export default ObservatoryPage;
