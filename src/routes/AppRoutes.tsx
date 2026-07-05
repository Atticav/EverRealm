/**
 * Application Routes Definition
 *
 * Centralized routing configuration for EverRealm.
 * Defines all routes, lazy-loaded components, and route guards.
 *
 * Architecture:
 * - All routes defined in one place for easy maintenance
 * - Lazy-loaded components with Suspense fallback
 * - Protected route wrapper for future authentication
 * - Consistent layout application across all routes
 *
 * Routes:
 * - /welcome : Entry point, game introduction
 * - /character : Character creation flow
 * - /universe : Universe/realm selection
 * - /chronicle : Chronicle creation and initialization
 * - /observatory : Main game environment
 */

import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '@/layouts/MainLayout';
import { LoadingFallback } from '@/components/loading/LoadingFallback';
import { ProtectedRoute } from '@/components/routing/ProtectedRoute';

/**
 * Lazy-loaded page components
 * Components are only loaded when their routes are accessed
 */
const WelcomePage = lazy(() =>
  import('@/pages/WelcomePage').then((module) => ({
    default: module.WelcomePage,
  }))
);

const CharacterCreatorPage = lazy(() =>
  import('@/pages/CharacterCreatorPage').then((module) => ({
    default: module.CharacterCreatorPage,
  }))
);

const UniverseSelectionPage = lazy(() =>
  import('@/pages/UniverseSelectionPage').then((module) => ({
    default: module.UniverseSelectionPage,
  }))
);

const ChronicleCreatorPage = lazy(() =>
  import('@/pages/ChronicleCreatorPage').then((module) => ({
    default: module.ChronicleCreatorPage,
  }))
);

const ObservatoryPage = lazy(() =>
  import('@/pages/ObservatoryPage').then((module) => ({
    default: module.ObservatoryPage,
  }))
);

/**
 * AppRoutes Component
 *
 * Defines the complete routing structure wrapped in Suspense
 * for loading state management.
 */
export const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route element={<MainLayout />}>
          {/* Welcome Page - Public, entry point */}
          <Route path="/welcome" element={<WelcomePage />} />

          {/* Character Creator - Protected route */}
          <Route
            path="/character"
            element={
              <ProtectedRoute>
                <CharacterCreatorPage />
              </ProtectedRoute>
            }
          />

          {/* Universe Selection - Protected route */}
          <Route
            path="/universe"
            element={
              <ProtectedRoute>
                <UniverseSelectionPage />
              </ProtectedRoute>
            }
          />

          {/* Chronicle Creator - Protected route */}
          <Route
            path="/chronicle"
            element={
              <ProtectedRoute>
                <ChronicleCreatorPage />
              </ProtectedRoute>
            }
          />

          {/* Observatory - Main game, protected route */}
          <Route
            path="/observatory"
            element={
              <ProtectedRoute>
                <ObservatoryPage />
              </ProtectedRoute>
            }
          />

          {/* Root redirect to welcome */}
          <Route path="/" element={<Navigate to="/welcome" replace />} />

          {/* Catch-all redirect to welcome */}
          <Route path="*" element={<Navigate to="/welcome" replace />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
