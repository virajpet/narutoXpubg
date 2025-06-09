import { useState, useEffect } from "react";
import { Character } from "../data/characters";
import { ApiService } from "../services/api";
import { narutoCharacters } from "../data/characters";

interface UseCharactersResult {
  characters: Character[];
  loading: boolean;
  error: string | null;
  apiHealthy: boolean;
  searchCharacters: (query: string) => Promise<Character[]>;
  getCharacterById: (id: string) => Promise<Character | null>;
  refreshCharacters: () => Promise<void>;
}

export const useCharacters = (): UseCharactersResult => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [apiHealthy, setApiHealthy] = useState(false);

  const loadCharacters = async () => {
    try {
      setLoading(true);
      setError(null);

      // First check if API is healthy
      await ApiService.healthCheck();
      setApiHealthy(true);

      // Load characters from API
      const apiCharacters = await ApiService.getAllCharacters();
      setCharacters(apiCharacters);
    } catch (error) {
      console.error("Failed to load characters from API:", error);
      setApiHealthy(false);
      setError("Failed to connect to API. Using local data as fallback.");
      // Fallback to local data
      setCharacters(narutoCharacters);
    } finally {
      setLoading(false);
    }
  };

  const searchCharacters = async (query: string): Promise<Character[]> => {
    try {
      if (apiHealthy) {
        return await ApiService.searchCharacters(query);
      } else {
        // Fallback search on local data
        return narutoCharacters.filter(
          (char) =>
            char.name.toLowerCase().includes(query.toLowerCase()) ||
            char.basic_info.full_name
              .toLowerCase()
              .includes(query.toLowerCase()) ||
            char.basic_info.aliases.some((alias) =>
              alias.toLowerCase().includes(query.toLowerCase())
            )
        );
      }
    } catch (error) {
      console.error("Search failed:", error);
      throw error;
    }
  };

  const getCharacterById = async (id: string): Promise<Character | null> => {
    try {
      if (apiHealthy) {
        return await ApiService.getCharacterById(id);
      } else {
        // Fallback to local data
        return narutoCharacters.find((char) => char._id === id) || null;
      }
    } catch (error) {
      console.error("Failed to get character by ID:", error);
      return null;
    }
  };

  const refreshCharacters = async () => {
    await loadCharacters();
  };

  useEffect(() => {
    loadCharacters();
  }, []);

  return {
    characters,
    loading,
    error,
    apiHealthy,
    searchCharacters,
    getCharacterById,
    refreshCharacters,
  };
};
