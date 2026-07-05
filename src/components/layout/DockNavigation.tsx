import React from 'react';

/**
 * DockNavigation Component
 *
 * An elegant navigation dock that adapts to screen size.
 * - Desktop: Vertical floating dock on the left side
 * - Mobile: Horizontal dock at the bottom
 *
 * This component serves as a placeholder with icon positions only.
 * Icons and click handlers will be implemented in future iterations.
 *
 * Navigation Items:
 * 1. Continue Journey
 * 2. Realms
 * 3. Character
 * 4. Chronicles
 * 5. Astral Library
 * 6. Settings
 *
 * Features:
 * - Fully responsive layout
 * - Frosted glass appearance
 * - Soft shadow and glow effects
 * - Smooth hover animations
 * - Accessibility-ready structure
 */
export const DockNavigation: React.FC = () => {
  const navigationItems = [
    { id: 1, label: 'Continue Journey', icon: '→' },
    { id: 2, label: 'Realms', icon: '◆' },
    { id: 3, label: 'Character', icon: '👤' },
    { id: 4, label: 'Chronicles', icon: '📖' },
    { id: 5, label: 'Astral Library', icon: '📚' },
    { id: 6, label: 'Settings', icon: '⚙️' },
  ];

  return (
    <>
      {/* Desktop Dock - Left Floating Vertical */}
      <nav
        className="hidden lg:flex fixed left-8 top-1/2 transform -translate-y-1/2 z-50 flex-col gap-4"
        aria-label="Primary navigation"
      >
        <div
          className="flex flex-col gap-3 px-4 py-6 rounded-2xl"
          style={{
            background: 'rgba(30, 58, 138, 0.4)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(191, 219, 254, 0.2)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          }}
        >
          {navigationItems.map((item) => (
            <button
              key={item.id}
              aria-label={item.label}
              className="relative w-12 h-12 flex items-center justify-center text-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
              title={item.label}
              style={{
                color: 'rgba(191, 219, 254, 0.7)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = 'rgba(217, 119, 6, 1)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = 'rgba(191, 219, 254, 0.7)';
              }}
            >
              {item.icon}
            </button>
          ))}
        </div>
      </nav>

      {/* Mobile Dock - Bottom Horizontal */}
      <nav
        className="lg:hidden fixed bottom-0 left-0 right-0 z-50"
        aria-label="Primary navigation"
      >
        <div
          className="flex justify-around items-center px-4 py-4 mx-4 mb-4 rounded-2xl"
          style={{
            background: 'rgba(30, 58, 138, 0.4)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(191, 219, 254, 0.2)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          }}
        >
          {navigationItems.map((item) => (
            <button
              key={item.id}
              aria-label={item.label}
              className="relative w-12 h-12 flex items-center justify-center text-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
              title={item.label}
              style={{
                color: 'rgba(191, 219, 254, 0.7)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = 'rgba(217, 119, 6, 1)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = 'rgba(191, 219, 254, 0.7)';
              }}
            >
              {item.icon}
            </button>
          ))}
        </div>
      </nav>

      {/* Mobile spacing adjustment for bottom dock */}
      <style>{`
        @media (max-width: 1024px) {
          body {
            padding-bottom: 80px;
          }
        }
      `}</style>
    </>
  );
};

export default DockNavigation;
