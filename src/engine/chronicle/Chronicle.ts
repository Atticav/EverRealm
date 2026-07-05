/**
 * Chronicle Engine - Chronicle Model
 *
 * This file defines the central Chronicle interface that represents one complete story
 * lived by one Character inside one Realm.
 *
 * A Chronicle is NOT a save file or checkpoint. It is a living story—a persistent
 * narrative record that tracks the character's journey, relationships, inventory,
 * progress, and all moments experienced within a specific realm.
 *
 * Architecture:
 * - The Chronicle interface aggregates all story-related models through composition
 * - Each sub-model (Progress, Relationships, Inventory, Timeline, Journal) is independently managed
 * - The Chronicle serves as the unified entry point to the entire story system
 * - This structure enables modular feature development without tight coupling
 *
 * Design Principles:
 * - Composition over Inheritance: Chronicle composes other models rather than extending them
 * - Immutability: All properties are readonly to encourage functional updates
 * - Separation of Concerns: Each aspect of the story is isolated in its own model
 * - Type Safety: Full TypeScript support prevents runtime errors
 * - No Persistence Logic: This is purely a domain model; storage is handled elsewhere
 *
 * Future Integration Points:
 * - Chronicle persistence layer (database/storage)
 * - Chronicle services (creation, validation, serialization)
 * - Chronicle versioning and branching (alternate timelines)
 * - Chronicle sharing and collaboration
 * - Chronicle analytics and story insights
 */

import { Character } from '../character/Character';
import { ChronicleProgress } from './ChronicleProgress';
import { ChronicleRelationships } from './ChronicleRelationships';
import { ChronicleInventory } from './ChronicleInventory';
import { ChronicleTimeline } from './ChronicleTimeline';
import { ChronicleJournal } from './ChronicleJournal';

/**
 * Chronicle Interface
 *
 * Represents one complete story lived by one Character inside one Realm.
 * This is the central domain model that orchestrates all aspects of a character's journey.
 *
 * A Chronicle captures:
 * - The character playing the story
 * - The realm in which the story takes place
 * - All events and moments (timeline)
 * - Items and resources collected (inventory)
 * - Relationships with entities in the realm
 * - Written records and reflections (journal)
 * - Progression through the narrative
 *
 * The Chronicle is immutable from a type perspective; mutations should create new instances
 * through reducer functions or service methods.
 */
export interface Chronicle {
  /**
   * Unique identifier for this chronicle
   * Format: UUID v4 or similar unique string
   * Used throughout the system to reference this specific story
   */
  readonly id: string;

  /**
   * The character whose story this chronicle records
   * Immutable reference to the Character model
   * The character's identity, appearance, and personality are frozen at chronicle creation
   */
  readonly character: Character;

  /**
   * Reference to the realm in which this story takes place
   * Currently a string ID; future versions will reference a full Realm model
   * Format: UUID or similar unique identifier
   * Allows the chronicle to exist independently of the realm system
   */
  readonly realmId: string;

  /**
   * Human-readable title or name for this chronicle
   * Examples: "The Starborn's First Quest", "Chronicles of the Lost Kingdom"
   * Assigned by the player or generated from story events
   * Maximum length: 300 characters
   */
  readonly title: string;

  /**
   * Optional subtitle or tagline describing the chronicle's theme
   * Examples: "A tale of redemption", "The beginning of an era"
   * Can be empty string
   * Maximum length: 300 characters
   */
  readonly subtitle: string;

  /**
   * Timeline model
   * Contains all story events, moments, and temporal sequences
   * Tracks the chronological progression of the narrative
   */
  readonly timeline: ChronicleTimeline;

  /**
   * Inventory model
   * Contains all items, resources, and possessions collected during the chronicle
   * Tracks what the character owns and carries
   */
  readonly inventory: ChronicleInventory;

  /**
   * Relationships model
   * Contains all connections, bonds, and relationships formed during the chronicle
   * Tracks NPCs, allies, enemies, and other entities the character knows
   */
  readonly relationships: ChronicleRelationships;

  /**
   * Journal model
   * Contains written records, reflections, entries, and narrative prose
   * Captures the character's thoughts, discoveries, and reflections
   */
  readonly journal: ChronicleJournal;

  /**
   * Progress model
   * Contains progression metrics, milestones, and story advancement data
   * Tracks the character's development and completion of narrative arcs
   */
  readonly progress: ChronicleProgress;

  /**
   * Timestamp when this chronicle was created
   * ISO 8601 format: "2026-07-05T19:14:42Z"
   * Represents when the character entered this realm and began this story
   */
  readonly createdAt: string;

  /**
   * Timestamp when this chronicle was last modified
   * ISO 8601 format: "2026-07-05T19:14:42Z"
   * Updated whenever any chronicle data changes
   */
  readonly updatedAt: string;

  /**
   * Timestamp of the last significant story event
   * ISO 8601 format: "2026-07-05T19:14:42Z"
   * The last moment when something meaningful happened in the narrative
   */
  readonly lastEventAt: string;

  /**
   * Current status of this chronicle
   * Tracks whether the story is active, paused, completed, or archived
   */
  readonly status: ChronicleStatus;

  /**
   * Metadata and custom properties for the chronicle
   * Allows extensibility without modifying the core interface
   */
  readonly metadata: ChronicleMetadata;
}

/**
 * Chronicle Status
 *
 * Represents the current state of a chronicle.
 * Determines whether the story is actively progressing, paused, or concluded.
 */
export enum ChronicleStatus {
  /**
   * Chronicle is actively being played
   * Character is currently inside this realm living this story
   */
  ACTIVE = 'ACTIVE',

  /**
   * Chronicle is paused but can be resumed
   * Character has left the realm but can return to continue the story
   */
  PAUSED = 'PAUSED',

  /**
   * Chronicle is completed
   * The narrative arc has reached its conclusion
   */
  COMPLETED = 'COMPLETED',

  /**
   * Chronicle is archived
   * No longer actively used but preserved for historical reference
   */
  ARCHIVED = 'ARCHIVED',

  /**
   * Chronicle is abandoned or invalid
   * The story cannot be resumed or completed
   */
  ABANDONED = 'ABANDONED',
}

/**
 * Chronicle Metadata
 *
 * Flexible metadata storage for chronicle-specific information.
 * Allows for future extensibility without breaking the core model.
 */
export interface ChronicleMetadata {
  /**
   * Custom flags for chronicle state
   * Examples: { "hasUnlockedSecretArea": true, "isSpeedrun": false }
   */
  readonly flags: Record<string, boolean>;

  /**
   * Custom tags for organizing chronicles
   * Examples: ["beginner-friendly", "high-action", "story-heavy"]
   */
  readonly tags: string[];

  /**
   * Arbitrary key-value data for future features
   * Examples: { "difficulty": "hard", "playstyle": "stealth" }
   */
  readonly customData: Record<string, unknown>;
}

/**
 * Chronicle Creation Input
 *
 * Represents the minimal data required to create a new chronicle.
 * Used when a character enters a realm and begins their story.
 */
export interface ChronicleCreationInput {
  readonly character: Character;
  readonly realmId: string;
  readonly title: string;
  readonly subtitle?: string;
  readonly metadata?: Partial<ChronicleMetadata>;
}

/**
 * Chronicle Update Input
 *
 * Represents partial chronicle data that can be updated.
 * All fields are optional; only provided fields are updated.
 */
export interface ChronicleUpdateInput {
  readonly title?: string;
  readonly subtitle?: string;
  readonly status?: ChronicleStatus;
  readonly timeline?: Partial<ChronicleTimeline>;
  readonly inventory?: Partial<ChronicleInventory>;
  readonly relationships?: Partial<ChronicleRelationships>;
  readonly journal?: Partial<ChronicleJournal>;
  readonly progress?: Partial<ChronicleProgress>;
  readonly metadata?: Partial<ChronicleMetadata>;
}
