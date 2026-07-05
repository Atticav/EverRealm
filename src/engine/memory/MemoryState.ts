/**
 * Memory Engine - Memory State Model
 *
 * This file defines the central MemoryState interface that represents the current state
 * of a Chronicle at any given moment in time.
 *
 * The Memory Engine is the source of truth for the application. It stores the complete
 * current state of a character's journey within a realm—their relationships, quests,
 * location, appearance, and the world around them.
 *
 * This is NOT an AI memory system. It is a pure state container that holds the
 * serializable, observable current conditions of the chronicle.
 *
 * Architecture:
 * - MemoryState aggregates all state sub-models through composition
 * - Each sub-model (Relationships, Quests, Location, Appearance, WorldState) is independently managed
 * - MemoryState is immutable from a type perspective; mutations should create new instances
 * - This structure enables efficient state management, serialization, and time-travel debugging
 * - All data is serializable and can be persisted or replayed
 *
 * Design Principles:
 * - Single Responsibility: Each memory model tracks one aspect of state
 * - Composition: MemoryState composes sub-models rather than inheriting from them
 * - Immutability: All properties are readonly to encourage functional updates
 * - Observable: State can be observed and reacted to without side effects
 * - Deterministic: Given the same state, the same actions always produce the same results
 *
 * Future Integration Points:
 * - State serialization and persistence
 * - State versioning and time-travel
 * - State replication and synchronization
 * - State debugging and inspection tools
 * - State management library integration (Redux, Zustand, etc.)
 */

import { RelationshipMemory } from './RelationshipMemory';
import { QuestMemory } from './QuestMemory';
import { LocationMemory } from './LocationMemory';
import { AppearanceMemory } from './AppearanceMemory';
import { WorldStateMemory } from './WorldStateMemory';

/**
 * Memory State Interface
 *
 * Represents the complete current state of a Chronicle.
 * This is the single source of truth for all information about the character's
 * current situation within the realm.
 *
 * The Memory State includes:
 * - Current and completed quests
 * - Relationships with NPCs and entities
 * - Current location and visited places
 * - Current outfit and appearance
 * - World conditions (weather, season, time)
 *
 * All mutations to MemoryState should be functional (creating new instances)
 * rather than imperative (modifying existing data).
 */
export interface MemoryState {
  /**
   * Unique identifier for this memory state
   * Format: UUID v4 or similar unique string
   * Used to track and reference this specific state snapshot
   */
  readonly id: string;

  /**
   * Reference to the chronicle this memory belongs to
   * Format: UUID or similar unique identifier
   * Links this state to a specific character's story
   */
  readonly chronicleId: string;

  /**
   * Timestamp when this memory state was created
   * ISO 8601 format: "2026-07-05T19:14:42Z"
   * Represents when this state snapshot was captured
   */
  readonly createdAt: string;

  /**
   * Timestamp when this memory state was last updated
   * ISO 8601 format: "2026-07-05T19:14:42Z"
   * Updated whenever any part of the state changes
   */
  readonly updatedAt: string;

  /**
   * Relationship memory
   * Stores the current relationship state between the player and all NPCs/entities
   * Tracks trust, affection, reputation, and interaction history
   */
  readonly relationships: RelationshipMemory;

  /**
   * Quest memory
   * Stores all current, active, and completed quests
   * Tracks quest progress, objectives, and completion state
   */
  readonly quests: QuestMemory;

  /**
   * Location memory
   * Stores the character's current location and visited places
   * Tracks exploration progress and fast travel points
   */
  readonly location: LocationMemory;

  /**
   * Appearance memory
   * Stores the character's current outfit and cosmetic state
   * Tracks equipped items and visual appearance
   */
  readonly appearance: AppearanceMemory;

  /**
   * World state memory
   * Stores environmental conditions and world time
   * Tracks weather, season, date, and time of day
   */
  readonly worldState: WorldStateMemory;

  /**
   * Version number of this memory state
   * Incremented with each mutation
   * Useful for change detection and debugging
   */
  readonly version: number;

  /**
   * Flags and metadata for the memory state
   * Extensible storage for future state properties
   */
  readonly metadata: MemoryStateMetadata;
}

/**
 * Memory State Metadata
 *
 * Flexible metadata storage for memory state-specific information.
 * Allows for extensibility without breaking the core model.
 */
export interface MemoryStateMetadata {
  /**
   * Custom flags representing boolean state
   * Examples: { "isInCombat": false, "isSneaking": true }
   */
  readonly flags: Record<string, boolean>;

  /**
   * Tags for categorizing or filtering memory states
   * Examples: ["checkpoint", "autosave", "player-save"]
   */
  readonly tags: string[];

  /**
   * Arbitrary key-value data for future features
   * Examples: { "difficulty": "hard", "playthrough": 2 }
   */
  readonly customData: Record<string, unknown>;
}

/**
 * Memory State Creation Input
 *
 * Represents the initial data needed to create a new memory state.
 * Typically created when a chronicle is initialized or a new save is made.
 */
export interface MemoryStateCreationInput {
  readonly chronicleId: string;
  readonly relationships?: Partial<RelationshipMemory>;
  readonly quests?: Partial<QuestMemory>;
  readonly location?: Partial<LocationMemory>;
  readonly appearance?: Partial<AppearanceMemory>;
  readonly worldState?: Partial<WorldStateMemory>;
  readonly metadata?: Partial<MemoryStateMetadata>;
}

/**
 * Memory State Update Input
 *
 * Represents partial memory state data that can be updated.
 * All fields are optional; only provided fields are updated.
 * Used for incremental state changes during gameplay.
 */
export interface MemoryStateUpdateInput {
  readonly relationships?: Partial<RelationshipMemory>;
  readonly quests?: Partial<QuestMemory>;
  readonly location?: Partial<LocationMemory>;
  readonly appearance?: Partial<AppearanceMemory>;
  readonly worldState?: Partial<WorldStateMemory>;
  readonly metadata?: Partial<MemoryStateMetadata>;
}

/**
 * Memory State Snapshot
 *
 * A complete snapshot of a memory state at a specific point in time.
 * Used for save states, checkpoints, and time-travel debugging.
 */
export interface MemoryStateSnapshot {
  /**
   * The complete memory state captured
   */
  readonly state: MemoryState;

  /**
   * Description of why this snapshot was taken
   * Examples: "Player saved at checkpoint", "Auto-save before boss fight"
   */
  readonly reason: string;

  /**
   * User-provided name for this snapshot
   * Can be empty string if not provided
   * Maximum length: 200 characters
   */
  readonly label: string;

  /**
   * Timestamp when this snapshot was created
   * ISO 8601 format: "2026-07-05T19:14:42Z"
   */
  readonly snapshotAt: string;
}
