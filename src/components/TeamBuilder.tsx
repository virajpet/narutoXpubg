import React, { useState } from "react";
import { teamRoles, Character } from "../data/characters";
import { useCharacters } from "../hooks/useCharacters";
import RadarChart from "./RadarChart";
import CharacterCard from "./CharacterCard";
import {
  ChevronDown,
  Users,
  Eye,
  TrendingUp,
  AlertCircle,
  Loader2,
  RefreshCw,
} from "lucide-react";

interface TeamSelection {
  [key: string]: Character | null;
}

const TeamBuilder: React.FC = () => {
  const [selectedTeam, setSelectedTeam] = useState<TeamSelection>({});
  const [showPreview, setShowPreview] = useState(false);

  const { characters, loading, error, apiHealthy, refreshCharacters } =
    useCharacters();

  const handleCharacterSelect = (
    roleId: string,
    character: Character | null
  ) => {
    setSelectedTeam((prev) => ({
      ...prev,
      [roleId]: character,
    }));
  };

  const handleRefresh = async () => {
    try {
      await refreshCharacters();
    } catch (error) {
      console.error("Failed to refresh characters:", error);
    }
  };

  const selectedCharacters = Object.values(selectedTeam).filter(
    Boolean
  ) as Character[];
  const selectedRoles = Object.entries(selectedTeam).filter(
    ([_, character]) => character !== null
  );
  const isTeamComplete = selectedRoles.length === teamRoles.length;

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-400 animate-spin mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">
            Loading Characters...
          </h2>
          <p className="text-blue-200">
            Fetching shinobi data from the database
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 via-red-500 to-orange-500 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-2">
              🍃 Naruto PUBG Squad 🎯
            </h1>
            <p className="text-orange-100 text-lg max-w-2xl mx-auto">
              Assemble your ultimate tactical team using legendary shinobi from
              Naruto
            </p>

            {/* API Status Indicator */}
            <div className="mt-4 flex items-center justify-center gap-2">
              <div
                className={`w-3 h-3 rounded-full ${
                  apiHealthy ? "bg-green-400" : "bg-red-400"
                }`}
              />
              <span className="text-sm text-orange-100">
                {apiHealthy ? "Connected to API" : "Using local data"}
              </span>
              <button
                onClick={handleRefresh}
                className="ml-2 p-1 rounded-full hover:bg-white/20 transition-colors"
                title="Refresh data"
              >
                <RefreshCw className="w-4 h-4 text-orange-100" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Error Notice */}
        {error && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}

        {/* Team Selection */}
        <div className="bg-white/95 backdrop-blur rounded-xl shadow-2xl p-6 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-slate-800">
              Build Your Squad
            </h2>
            <div className="ml-auto text-sm text-slate-600">
              {selectedRoles.length}/{teamRoles.length} selected
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamRoles.map((role) => (
              <div key={role.id} className="space-y-3">
                <div>
                  <h3 className="font-semibold text-slate-800 mb-1">
                    {role.name}
                  </h3>
                  <p className="text-sm text-slate-600">{role.description}</p>
                </div>

                <div className="relative">
                  <select
                    value={selectedTeam[role.id]?._id || ""}
                    onChange={(e) => {
                      const character = e.target.value
                        ? characters.find(
                            (char) => char._id === e.target.value
                          ) || null
                        : null;
                      handleCharacterSelect(role.id, character);
                    }}
                    className="w-full p-3 border border-slate-300 rounded-lg bg-white appearance-none cursor-pointer hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  >
                    <option value="">Select a shinobi...</option>
                    {characters.map((character) => {
                      // Check if this character is already selected for a different role
                      const isAlreadySelected = Object.entries(
                        selectedTeam
                      ).some(
                        ([otherRoleId, selectedChar]) =>
                          otherRoleId !== role.id &&
                          selectedChar?._id === character._id
                      );

                      return (
                        <option
                          key={character._id}
                          value={character._id}
                          disabled={isAlreadySelected}
                          style={
                            isAlreadySelected
                              ? { color: "#9CA3AF", fontStyle: "italic" }
                              : {}
                          }
                        >
                          {character.name} ({character.basic_info.rank})
                          {isAlreadySelected ? " - Already Selected" : ""}
                        </option>
                      );
                    })}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                </div>

                {selectedTeam[role.id] && (
                  <div className="p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-slate-800">
                          {selectedTeam[role.id]!.name}
                        </div>
                        <div className="text-sm text-slate-600">
                          {selectedTeam[role.id]!.basic_info.rank}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-slate-500">
                          Power Level
                        </div>
                        <div className="font-bold text-blue-600">
                          {Math.round(
                            ((selectedTeam[role.id]!.databook_stats.ninjutsu +
                              selectedTeam[role.id]!.databook_stats.taijutsu +
                              selectedTeam[role.id]!.databook_stats.strength) /
                              3) *
                              20
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Preview Button */}
          <div className="mt-8 text-center">
            <button
              onClick={() => setShowPreview(!showPreview)}
              disabled={selectedRoles.length === 0}
              className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                selectedRoles.length === 0
                  ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105"
              }`}
            >
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                {showPreview ? "Hide" : "Preview"} Squad Analysis
                {isTeamComplete && <span className="ml-2">✨</span>}
              </div>
            </button>
          </div>
        </div>

        {/* Preview Section */}
        {showPreview && selectedRoles.length > 0 && (
          <div className="space-y-8">
            {/* Squad Stats Overview */}
            <div className="bg-white/95 backdrop-blur rounded-xl shadow-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="w-6 h-6 text-green-600" />
                <h2 className="text-2xl font-bold text-slate-800">
                  Squad Combat Analysis
                </h2>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                {["ninjutsu", "taijutsu", "intelligence", "speed"].map(
                  (stat) => {
                    const allCharacters = selectedRoles.map(
                      ([_, character]) => character!
                    );
                    const average =
                      allCharacters.reduce(
                        (sum, char) =>
                          sum +
                          (char.databook_stats[
                            stat as keyof typeof char.databook_stats
                          ] as number),
                        0
                      ) / allCharacters.length;

                    return (
                      <div
                        key={stat}
                        className="text-center p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg"
                      >
                        <div className="text-2xl font-bold text-blue-600 mb-1">
                          {average.toFixed(1)}
                        </div>
                        <div className="text-sm text-slate-600 capitalize">
                          {stat}
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                            style={{ width: `${(average / 5) * 100}%` }}
                          />
                        </div>
                      </div>
                    );
                  }
                )}
              </div>

              {/* Radar Charts */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Object.entries(selectedTeam).map(([roleId, character]) => {
                  if (!character) return null;
                  const role = teamRoles.find((r) => r.id === roleId);
                  return (
                    <div
                      key={`${character._id}_${roleId}`}
                      className="text-center"
                    >
                      <RadarChart
                        character={character}
                        size={200}
                        className="mb-4"
                      />
                      <div className="text-sm text-slate-600">
                        {role?.name} - {character.name}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Character Details */}
            <div className="bg-white/95 backdrop-blur rounded-xl shadow-2xl p-6">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">
                Squad Member Profiles
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(selectedTeam).map(([roleId, character]) => {
                  if (!character) return null;
                  const role = teamRoles.find((r) => r.id === roleId);
                  return (
                    <CharacterCard
                      key={`${character._id}_${roleId}`}
                      character={character}
                      role={role?.name || "Unknown Role"}
                    />
                  );
                })}
              </div>
            </div>

            {/* Team Composition Summary */}
            {isTeamComplete && (
              <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl shadow-2xl p-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-4">
                    🎉 Squad Complete! 🎉
                  </h2>
                  <p className="text-lg mb-4">
                    Your tactical team is ready for action! With balanced skills
                    across all roles, this squad combines the strategic
                    brilliance of legendary shinobi with modern PUBG tactics.
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold">
                        {Math.round(
                          (selectedRoles
                            .map(([_, char]) => char!)
                            .reduce(
                              (sum, char) =>
                                sum + char.databook_stats.intelligence,
                              0
                            ) /
                            selectedRoles.length) *
                            20
                        )}
                      </div>
                      <div className="text-sm opacity-90">Strategy Rating</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">
                        {Math.round(
                          (selectedRoles
                            .map(([_, char]) => char!)
                            .reduce(
                              (sum, char) => sum + char.databook_stats.strength,
                              0
                            ) /
                            selectedRoles.length) *
                            20
                        )}
                      </div>
                      <div className="text-sm opacity-90">Combat Power</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">
                        {Math.round(
                          (selectedRoles
                            .map(([_, char]) => char!)
                            .reduce(
                              (sum, char) => sum + char.databook_stats.speed,
                              0
                            ) /
                            selectedRoles.length) *
                            20
                        )}
                      </div>
                      <div className="text-sm opacity-90">Mobility Score</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamBuilder;
