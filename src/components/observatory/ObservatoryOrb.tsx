import React, { useState, useRef, useEffect } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

/**
 * ObservatoryOrb Component
 *
 * A reusable celestial artifact component that serves as the magical heart of EverRealm.
 * Features a frosted glass sphere with subtle animations and mouse-interactive effects.
 *
 * This is a purely visual component with no navigation or business logic.
 * It responds to user interaction and respects accessibility preferences.
 */
export const ObservatoryOrb: React.FC = () => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [ringRotation, setRingRotation] = useState(0);
  const orbRef = useRef<HTMLDivElement>(null);

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /**
   * Handle mouse movement to track mouse position relative to the orb
   * This enables the subtle parallax effect on hover
   */
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!orbRef.current || !isHovered) return;

      const rect = orbRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calculate distance from center (max 15px movement)
      const x = Math.min(Math.max((e.clientX - centerX) * 0.15, -15), 15);
      const y = Math.min(Math.max((e.clientY - centerY) * 0.15, -15), 15);

      setMousePosition({ x, y });
    };

    if (isHovered) {
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [isHovered]);

  /**
   * Animate the outer ring rotation on hover
   * Creates a subtle rotating effect for immersion
   */
  useEffect(() => {
    if (!isHovered || prefersReducedMotion) return;

    let animationFrameId: number;
    const animate = () => {
      setRingRotation((prev) => (prev + 0.3) % 360);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered, prefersReducedMotion]);

  /**
   * Handle mouse leave to reset position
   */
  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
    setRingRotation(0);
  };

  return (
    <div
      ref={orbRef}
      className="relative w-56 h-56 lg:w-60 lg:h-60"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Container with breathing and floating animation */}
      <div
        className={`relative w-full h-full transition-transform duration-300 ease-out ${
          !prefersReducedMotion ? 'animate-float' : ''
        }`}
        style={
          !prefersReducedMotion
            ? {
                transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
              }
            : {}
        }
      >
        {/* Main Orb Body - Frosted Glass Sphere */}
        <div
          className={`absolute inset-0 rounded-full transition-all duration-500 ${
            !prefersReducedMotion ? 'animate-breathe' : ''
          }`}
          style={{
            background: 'radial-gradient(circle at 30% 30%, rgba(191, 219, 254, 0.3) 0%, rgba(30, 58, 138, 0.6) 50%, rgba(15, 23, 42, 0.9) 100%)',
            backdropFilter: 'blur(10px)',
            boxShadow: isHovered
              ? `
                0 0 40px rgba(59, 130, 246, 0.6),
                inset -2px -2px 8px rgba(0, 0, 0, 0.4),
                inset 2px 2px 8px rgba(191, 219, 254, 0.2)
              `
              : `
                0 0 30px rgba(59, 130, 246, 0.4),
                inset -2px -2px 6px rgba(0, 0, 0, 0.3),
                inset 2px 2px 6px rgba(191, 219, 254, 0.15)
              `,
          }}
        />

        {/* Inner Glow Layer - Soft Blue Luminescence */}
        <div
          className={`absolute inset-0 rounded-full pointer-events-none transition-opacity duration-500 ${
            !prefersReducedMotion ? 'animate-glow-pulse' : ''
          }`}
          style={{
            opacity: isHovered ? 0.8 : 0.5,
            background: 'radial-gradient(circle at 50% 50%, rgba(96, 165, 250, 0.4) 0%, transparent 70%)',
          }}
        />

        {/* Reflection Layer - Glass Surface Highlight */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none overflow-hidden"
          style={{
            opacity: 0.3,
          }}
        >
          {/* Top-left reflection */}
          <div
            className="absolute top-2 left-2 w-16 h-16 rounded-full"
            style={{
              background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.6) 0%, transparent 70%)',
              filter: 'blur(8px)',
            }}
          />

          {/* Subtle rim highlight */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle at 35% 35%, transparent 20%, transparent 70%, rgba(191, 219, 254, 0.1) 100%)',
            }}
          />
        </div>

        {/* Outer Ring - Antique Gold Accent */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none transition-all duration-500"
          style={{
            border: '2px solid',
            borderImageSource: 'linear-gradient(135deg, rgba(217, 119, 6, 0.8) 0%, rgba(180, 83, 9, 0.4) 50%, rgba(217, 119, 6, 0.8) 100%)',
            borderImageSlice: 1,
            transform: `rotate(${ringRotation}deg)`,
            opacity: isHovered ? 1 : 0.7,
            boxShadow: isHovered
              ? '0 0 15px rgba(217, 119, 6, 0.5)'
              : '0 0 10px rgba(217, 119, 6, 0.3)',
          }}
        />

        {/* Decorative Inner Ring - Subtle Secondary Ring */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            border: '1px solid',
            borderColor: 'rgba(191, 219, 254, 0.2)',
            transform: 'scale(0.85)',
            inset: '15px 15px 15px 15px',
          }}
        />
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes breathe {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.02);
          }
        }

        @keyframes glow-pulse {
          0%, 100% {
            opacity: 0.5;
            filter: blur(0px);
          }
          50% {
            opacity: 0.7;
            filter: blur(2px);
          }
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        .animate-breathe {
          animation: breathe 3s ease-in-out infinite;
        }

        .animate-glow-pulse {
          animation: glow-pulse 4s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-float,
          .animate-breathe,
          .animate-glow-pulse {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
};

export default ObservatoryOrb;
