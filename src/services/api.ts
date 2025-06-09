import { Character } from "../data/characters";

const API_BASE_URL = "https://narutoxpubg.onrender.com";

// Response interface for the Node.js backend
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  count?: number;
  message?: string;
  error?: string;
}

export class ApiService {
  static async getAllCharacters(params?: {
    limit?: number;
    skip?: number;
    name?: string;
  }): Promise<Character[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/characters`);

      if (!response.ok) {
        throw new Error(`Failed to fetch characters: ${response.status}`);
      }

      const apiResponse: ApiResponse<Character[]> = await response.json();

      if (!apiResponse.success) {
        throw new Error(apiResponse.message || "Failed to fetch characters");
      }

      return apiResponse.data || [];
    } catch (error) {
      console.error("Error fetching characters:", error);
      throw error;
    }
  }

  static async getCharacterById(id: string): Promise<Character> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/characters/${id}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch character: ${response.status}`);
      }

      const apiResponse: ApiResponse<Character> = await response.json();

      if (!apiResponse.success) {
        throw new Error(apiResponse.message || "Failed to fetch character");
      }

      return apiResponse.data!;
    } catch (error) {
      console.error("Error fetching character:", error);
      throw error;
    }
  }

  static async getCharacterByName(name: string): Promise<Character> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/characters/name/${encodeURIComponent(name)}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch character: ${response.status}`);
      }

      const apiResponse: ApiResponse<Character> = await response.json();

      if (!apiResponse.success) {
        throw new Error(apiResponse.message || "Failed to fetch character");
      }

      return apiResponse.data!;
    } catch (error) {
      console.error("Error fetching character by name:", error);
      throw error;
    }
  }

  static async getCharactersByVillage(village: string): Promise<Character[]> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/characters/village/${encodeURIComponent(village)}`
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch characters by village: ${response.status}`
        );
      }

      const apiResponse: ApiResponse<Character[]> = await response.json();

      if (!apiResponse.success) {
        throw new Error(apiResponse.message || "Failed to fetch characters");
      }

      return apiResponse.data || [];
    } catch (error) {
      console.error("Error fetching characters by village:", error);
      throw error;
    }
  }

  static async getCharactersByRank(rank: string): Promise<Character[]> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/characters/rank/${encodeURIComponent(rank)}`
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch characters by rank: ${response.status}`
        );
      }

      const apiResponse: ApiResponse<Character[]> = await response.json();

      if (!apiResponse.success) {
        throw new Error(apiResponse.message || "Failed to fetch characters");
      }

      return apiResponse.data || [];
    } catch (error) {
      console.error("Error fetching characters by rank:", error);
      throw error;
    }
  }

  static async searchCharacters(
    query: string,
    limit: number = 10
  ): Promise<Character[]> {
    try {
      // Search by name first
      const response = await fetch(
        `${API_BASE_URL}/api/characters/name/${encodeURIComponent(query)}`
      );

      if (response.ok) {
        const apiResponse: ApiResponse<Character> = await response.json();
        if (apiResponse.success && apiResponse.data) {
          return [apiResponse.data];
        }
      }

      // If no exact match, return empty array (could be enhanced to do fuzzy search)
      return [];
    } catch (error) {
      console.error("Error searching characters:", error);
      return [];
    }
  }

  static async getTopCharactersByStat(
    stat: string,
    limit: number = 10
  ): Promise<Character[]> {
    try {
      // Get all characters and sort by stat on frontend
      const characters = await this.getAllCharacters();

      return characters
        .sort((a, b) => {
          const statA = this.getStatValue(a, stat);
          const statB = this.getStatValue(b, stat);
          return statB - statA;
        })
        .slice(0, limit);
    } catch (error) {
      console.error("Error fetching top characters:", error);
      throw error;
    }
  }

  static async healthCheck(): Promise<{ message: string; version?: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/health`);

      if (!response.ok) {
        throw new Error("API health check failed");
      }

      const apiResponse: ApiResponse<any> = await response.json();

      return {
        message: apiResponse.message || "Server is running",
        version: "1.0.0",
      };
    } catch (error) {
      console.error("API health check failed:", error);
      throw error;
    }
  }

  // Get stat value for sorting
  private static getStatValue(character: Character, stat: string): number {
    switch (stat.toLowerCase()) {
      case "strength":
        return character.databook_stats.strength;
      case "speed":
        return character.databook_stats.speed;
      case "intelligence":
        return character.databook_stats.intelligence;
      case "ninjutsu":
        return character.databook_stats.ninjutsu;
      case "taijutsu":
        return character.databook_stats.taijutsu;
      case "genjutsu":
        return character.databook_stats.genjutsu;
      case "stamina":
        return character.databook_stats.stamina;
      case "hand_seals":
        return character.databook_stats.hand_seals;
      default:
        return 0;
    }
  }
}
