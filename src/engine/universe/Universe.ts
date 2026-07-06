/**
 * Universe Type Definition
 *
 * Represents a fictional world or setting in which Chronicles take place.
 * A Universe is the context for a character's story - it defines the rules,
 * setting, NPCs, quests, and atmosphere of the narrative.
 *
 * Examples:
 * - ACOTAR (A Court of Thorns and Roses)
 * - Harry Potter
 * - Fourth Wing
 * - Original World (custom user-created universe)
 *
 * Design Principles:
 * - Immutable: All properties are readonly
 * - Composable: Can be combined with Characters and Chronicles
 * - Extensible: Metadata field allows future features
 * - Type-safe: Full TypeScript support
 */

/**
 * Universe Interface
 *
 * Represents a single fictional world/setting.
 * Each chronicle exists within a specific universe.
 */
export interface Universe {
  /**
   * Unique identifier for this universe
   * Format: UUID v4 or similar unique string
   * Used to reference this universe throughout the application
   */
  readonly id: string;

  /**
   * Display name of the universe
   * Examples: "ACOTAR", "Harry Potter", "Fourth Wing"
   * Maximum length: 100 characters
   */
  readonly name: string;

  /**
   * Detailed description of the universe
   * Explains the setting, tone, and key characteristics
   * Maximum length: 1000 characters
   */
  readonly description: string;

  /**
   * Type of universe source material
   * Indicates the origin or nature of the universe
   *
   * Values:
   * - "book" : Based on published book series
   * - "movie" : Based on film/movie franchise
   * - "game" : Based on video game
   * - "original" : Official original world by EverRealm
   * - "custom" : User-created custom universe
   */
  readonly type: 'book' | 'movie' | 'game' | 'original' | 'custom';

  /**
   * Whether this universe is locked/unavailable
   * Locked universes cannot be selected by the player
   * Used for future DLC or progression-based unlocking
   */
  readonly isLocked: boolean;

  /**
   * Reason for locking the universe (if locked)
   * Examples: "Unlock by completing 3 chronicles", "DLC Only"
   * Empty string if not locked
   */
  readonly lockReason: string;

  /**
   * URL or path to the universe's cover/background image
   * Used for visual display in the universe selection UI
   */
  readonly imageUrl: string;

  /**
   * Short tagline or motto for the universe
   * Examples: "Where shadows dance and magic reigns"
   * Maximum length: 200 characters
   */
  readonly tagline: string;

  /**
   * Timestamp when this universe was created
   * ISO 8601 format: "2026-07-05T19:14:42Z"
   */
  readonly createdAt: string;

  /**
   * Timestamp when this universe was last updated
   * ISO 8601 format: "2026-07-05T19:14:42Z"
   */
  readonly updatedAt: string;

  /**
   * Metadata and custom properties for the universe
   * Allows extensibility without modifying the core interface
   */
  readonly metadata: UniverseMetadata;
}

/**
 * Universe Metadata
 *
 * Flexible metadata storage for universe-specific information.
 * Allows for future extensibility without breaking the core model.
 */
export interface UniverseMetadata {
  /**
   * Custom flags representing boolean properties
   * Examples: { "hasMultipleTimelines": true, "isMagical": true }
   */
  readonly flags: Record<string, boolean>;

  /**
   * Tags for categorizing universes
   * Examples: ["fantasy", "magical", "romance", "adventure"]
   */
  readonly tags: string[];

  /**
   * Arbitrary key-value data for future features
   * Examples: { "difficulty": "beginner", "averagePlaytime": "40 hours" }
   */
  readonly customData: Record<string, unknown>;
}

/**
 * Universe Creation Input
 *
 * Represents the data needed to create a new universe.
 */
export interface UniverseCreationInput {
  readonly name: string;
  readonly description: string;
  readonly type: 'book' | 'movie' | 'game' | 'original' | 'custom';
  readonly imageUrl?: string;
  readonly tagline?: string;
  readonly isLocked?: boolean;
  readonly lockReason?: string;
  readonly metadata?: Partial<UniverseMetadata>;
}

/**
 * Universe Update Input
 *
 * Represents partial universe data that can be updated.
 * All fields are optional; only provided fields are updated.
 */
export interface UniverseUpdateInput {
  readonly name?: string;
  readonly description?: string;
  readonly type?: 'book' | 'movie' | 'game' | 'original' | 'custom';
  readonly imageUrl?: string;
  readonly tagline?: string;
  readonly isLocked?: boolean;
  readonly lockReason?: string;
  readonly metadata?: Partial<UniverseMetadata>;
}
