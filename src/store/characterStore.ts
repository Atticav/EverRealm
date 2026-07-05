/**
 * Character Store
 *
 * Global state management for character data using Zustand.
 * Manages the current character throughout the entire application lifecycle.
 *
 * This store persists character data in memory only (no localStorage or backend).
 * The character created in CharacterCreatorPage is available to all pages
 * through the useCharacter hook.
 *
 * Architecture:
 * - Single source of truth for character state
 * - Simple, predictable state updates
 * - No side effects or async operations
 * - Pure state container focused on data management
 *
 * State Flow:
 * 1. User creates character in CharacterCreatorPage
 * 2. setCharacter() is called with the new character data
 * 3. Store updates and notifies all subscribers
 * 4. Any component using useCharacter() hook re-renders with new data
 * 5. Character remains available until clearCharacter() is called
 */

import { create } from 'zustand';
import { Character } from '@/engine/character/Character';

/**
 * Character Store State Interface
 */
interface CharacterStoreState {
  /**
   * Currently active character
   * Null if no character has been created
   */
  currentCharacter: Character | null;

  /**
   * Set the current character
   * Called after character creation
   */
  setCharacter: (character: Character) => void;

  /**
   * Update specific properties of the current character
   * Only updates if a character exists
   */
  updateCharacter: (updates: Partial<Character>) => void;

  /**
   * Clear the current character
   * Called when exiting the chronicle or resetting state
   */
  clearCharacter: () => void;

  /**
   * Check if a character is currently loaded
   */
  hasCharacter: () => boolean;
}

/**
 * Character Store
 *
 * Global state management for character data.
 * Created with Zustand for minimal boilerplate and maximum flexibility.
 */
export const useCharacterStore = create<CharacterStoreState>((set, get) => ({
  currentCharacter: null,

  setCharacter: (character: Character) => {
    set({ currentCharacter: character });
    console.log('[CharacterStore] Character set:', character.name);
  },

  updateCharacter: (updates: Partial<Character>) => {
    const current = get().currentCharacter;
    if (!current) {
      console.warn('[CharacterStore] Cannot update: no character loaded');
      return;
    }

    const updated = {
      ...current,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    set({ currentCharacter: updated });
    console.log('[CharacterStore] Character updated:', updated.name);
  },

  clearCharacter: () => {
    set({ currentCharacter: null });
    console.log('[CharacterStore] Character cleared');
  },

  hasCharacter: () => {
    return get().currentCharacter !== null;
  },
}));

/**
 * Custom Hook: useCharacter
 *
 * Provides convenient access to character state and actions.
 * Use this hook in components to access the current character.
 *
 * @returns {Object} Character state and actions
 * @returns {Character | null} character - The current character or null
 * @returns {Function} setCharacter - Set a new character
 * @returns {Function} updateCharacter - Update current character properties
 * @returns {Function} clearCharacter - Clear the current character
 * @returns {Function} hasCharacter - Check if a character is loaded
 *
 * @example
 * ```tsx
 * const { character, setCharacter } = useCharacter();
 *
 * if (!character) {
 *   return <div>No character created</div>;
 * }
 *
 * return <div>Welcome, {character.name}</div>;
 * ```
 */
export const useCharacter = () => {
  return useCharacterStore((state) => ({
    character: state.currentCharacter,
    setCharacter: state.setCharacter,
    updateCharacter: state.updateCharacter,
    clearCharacter: state.clearCharacter,
    hasCharacter: state.hasCharacter,
  }));
};

export default useCharacterStore;
