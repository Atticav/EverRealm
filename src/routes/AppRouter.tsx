/**
 * Main Application Router Configuration
 *
 * Defines the complete routing structure for EverRealm.
 * Implements the user onboarding flow from Welcome to Observatory.
 *
 * Routing Structure:
 * - / : Welcome Page
 * - /character-creator : Character Creation
 * - /universe-selection : Universe/Realm Selection
 * - /chronicle-creator : Chronicle Creation
 * - /observatory : Main Game Observatory
 *
 * Each route uses the MainLayout which provides consistent
 * navigation, styling, and layout across all pages.
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '@/layouts/MainLayout';
import { WelcomePage } from '@/pages/WelcomePage';
import { CharacterCreatorPage } from '@/pages/CharacterCreatorPage';
import { UniverseSelectionPage } from '@/pages/UniverseSelectionPage';
import { ChronicleCreatorPage } from '@/pages/ChronicleCreatorPage';
import { ObservatoryPage } from '@/pages/ObservatoryPage';

/**
 * App Router Component
 *
 * Sets up React Router with all application routes.
 * All routes use MainLayout for consistent styling and navigation.
 */
export const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          {/* Welcome Page - Entry Point */}
          <Route path="/" element={<WelcomePage />} />

          {/* Character Creation Flow */}
          <Route path="/character-creator" element={<CharacterCreatorPage />} />

          {/* Universe Selection */}
          <Route path="/universe-selection" element={<UniverseSelectionPage />} />

          {/* Chronicle Creation */}
          <Route path="/chronicle-creator" element={<ChronicleCreatorPage />} />

          {/* Main Game Screen */}
          <Route path="/observatory" element={<ObservatoryPage />} />

          {/* Catch-all redirect to welcome */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
