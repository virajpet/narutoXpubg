import React from "react";
import { Character } from "../data/characters";
import { User, Award, Zap, Shield } from "lucide-react";

interface CharacterCardProps {
  character: Character;
  role: string;
  className?: string;
}

const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  role,
  className = "",
}) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-lg border border-slate-200 overflow-hidden ${className}`}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <User className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold">{character.name}</h3>
            <p className="text-orange-100 text-sm">{role}</p>
          </div>
        </div>
      </div>

      {/* Basic Info */}
      <div className="p-4">
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-medium text-slate-800">
              Rank: {character.basic_info?.rank || "Unknown"}
            </span>
          </div>
          <div className="text-xs text-slate-600">
            {(character.basic_info?.affiliations || []).join(" • ") ||
              "No affiliations"}
          </div>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center">
            <div className="text-lg font-bold text-blue-600">
              {character.databook_stats?.ninjutsu || "N/A"}
            </div>
            <div className="text-xs text-slate-600">Ninjutsu</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-red-600">
              {character.databook_stats?.taijutsu || "N/A"}
            </div>
            <div className="text-xs text-slate-600">Taijutsu</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-purple-600">
              {character.databook_stats?.intelligence || "N/A"}
            </div>
            <div className="text-xs text-slate-600">Intelligence</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-green-600">
              {character.databook_stats?.speed || "N/A"}
            </div>
            <div className="text-xs text-slate-600">Speed</div>
          </div>
        </div>

        {/* Abilities */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-medium text-slate-800">
              Key Abilities
            </span>
          </div>
          <div className="flex flex-wrap gap-1">
            {(character.abilities?.unique_jutsu || [])
              .slice(0, 3)
              .map((jutsu, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                >
                  {jutsu}
                </span>
              ))}
            {(!character.abilities?.unique_jutsu ||
              character.abilities.unique_jutsu.length === 0) && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                No special jutsu
              </span>
            )}
          </div>
        </div>

        {/* Strengths */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-4 h-4 text-green-500" />
            <span className="text-sm font-medium text-slate-800">
              Top Strengths
            </span>
          </div>
          <ul className="text-xs text-slate-600 space-y-1">
            {(character.strengths || []).slice(0, 2).map((strength, index) => (
              <li key={index} className="flex items-start gap-1">
                <span className="text-green-500 mt-0.5">•</span>
                {strength}
              </li>
            ))}
            {(!character.strengths || character.strengths.length === 0) && (
              <li className="flex items-start gap-1">
                <span className="text-gray-400 mt-0.5">•</span>
                <span className="text-gray-500">
                  No specific strengths listed
                </span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;
