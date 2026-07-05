/**
 * Character Engine - Character Model
 *
 * This file defines the central Character interface that composes all character-related models.
 * It serves as the unified domain model for representing a player character in EverRealm.
 *
 * Architecture:
 * - The Character interface aggregates Appearance, Personality, Biography, and Gallery models
 * - Each model is independently managed but unified through the Character interface
 * - This structure enables modular feature development and independent scaling
 * - No business logic is included; this is purely a data structure definition
 *
 * Design Principles:
 * - Separation of Concerns: Each character aspect is isolated in its own model
 * - Immutability: Character properties are defined as readonly to encourage functional updates
 * - Extensibility: New character properties can be added without breaking existing code
 * - Type Safety: Full TypeScript support prevents runtime errors
 *
 * Future Integration Points:
 * - Character persistence layer (database/storage)
 * - Character services (creation, validation, serialization)
 * - Character analytics and telemetry
 * - Character progression and evolution
 */

import { CharacterAppearance } from './CharacterAppearance';
import { CharacterPersonality } from './CharacterPersonality';
import { CharacterBiography } from './CharacterBiography';
import { CharacterGallery } from './CharacterGallery';

/**
 * Character Interface
 *
 * Represents a complete player character in EverRealm.
 * Composes all character-related models into a unified structure.
 *
 * A Character is the player's avatar within the fictional universe—their identity,
 * appearance, personality, history, and collected moments all unified as one entity.
 */
export interface Character {
  /**
   * Unique identifier for this character
   * Format: UUID v4 or similar unique string
   * Used throughout the system to reference this character
   */
  readonly id: string;

  /**
   * The character's display name
   * Can be changed through in-game systems
   * Minimum length: 1, Maximum length: 100
   */
  readonly name: string;

  /**
   * The character's preferred name for intimate contexts
   * Used for personal interactions and internal monologue
   * Can differ from the display name
   * Optional; can be empty string
   * Minimum length: 0, Maximum length: 100
   */
  readonly preferredName: string;

  /**
   * Character pronouns for dialogue and narrative
   * Examples: "they/them", "she/her", "he/him", "xe/xem"
   * Minimum length: 1, Maximum length: 50
   */
  readonly pronouns: string;

  /**
   * Brief tagline or epithet for the character
   * Examples: "The Wanderer", "Keeper of Secrets", "Starborn"
   * Optional; can be empty string
   * Maximum length: 200
   */
  readonly title: string;

  /**
   * Character's date of birth in the realm
   * ISO 8601 format: "2026-07-05" or full timestamp
   * Influences perceived age and maturity
   */
  readonly birthDate: string;

  /**
   * Character's origin or homeland
   * Where they come from in the world
   * Can be a region, city, or significant location
   * Maximum length: 200
   */
  readonly origin: string;

  /**
   * Character's visual appearance model
   * Defines physical characteristics, cosmetics, distinctive features
   */
  readonly appearance: CharacterAppearance;

  /**
   * Character's personality model
   * Defines traits, values, behavioral tendencies
   */
  readonly personality: CharacterPersonality;

  /**
   * Character's biography model
   * Defines background, history, current status
   */
  readonly biography: CharacterBiography;

  /**
   * Character's gallery model
   * Organized collection of character moments, memories, and visual history
   */
  readonly gallery: CharacterGallery;

  /**
   * Timestamp when this character was created
   * ISO 8601 format: "2026-07-05T19:14:42Z"
   */
  readonly createdAt: string;

  /**
   * Timestamp when this character was last modified
   * ISO 8601 format: "2026-07-05T19:14:42Z"
   * Updated whenever any character property changes
   */
  readonly updatedAt: string;

  /**
   * Flags for character status and features
   * Used to track special states without adding new properties
   */
  readonly flags: CharacterFlags;
}

/**
 * Character Flags
 *
 * Boolean flags that represent special states or features of a character.
 * Allows for extensibility without modifying the core Character interface.
 */
export interface CharacterFlags {
  /**
   * Whether the character has completed the initial onboarding/creation flow
   */
  readonly isOnboarded: boolean;

  /**
   * Custom flags for future features and extensibility
   * Key-value pairs for extensible boolean states
   * Examples: { "hasCompletedFirstQuest": true, "isBeta": false }
   */
  readonly customFlags: Record<string, boolean>;
}

/**
 * Character Creation Input
 *
 * Represents the minimal data required to create a new character.
 * Used when character is first created before full data population.
 */
export interface CharacterCreationInput {
  readonly name: string;
  readonly preferredName?: string;
  readonly pronouns: string;
  readonly title?: string;
  readonly birthDate: string;
  readonly origin: string;
  readonly appearance?: Partial<CharacterAppearance>;
  readonly personality?: Partial<CharacterPersonality>;
  readonly biography?: Partial<CharacterBiography>;
}

/**
 * Character Update Input
 *
 * Represents partial character data that can be updated.
 * All fields are optional; only provided fields are updated.
 */
export interface CharacterUpdateInput {
  readonly name?: string;
  readonly preferredName?: string;
  readonly pronouns?: string;
  readonly title?: string;
  readonly birthDate?: string;
  readonly origin?: string;
  readonly appearance?: Partial<CharacterAppearance>;
  readonly personality?: Partial<CharacterPersonality>;
  readonly biography?: Partial<CharacterBiography>;
  readonly flags?: Partial<CharacterFlags>;
}
