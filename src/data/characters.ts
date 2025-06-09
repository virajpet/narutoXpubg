export interface Character {
  _id: string;
  name: string;
  basic_info: {
    full_name: string;
    aliases: string[];
    affiliations: string[];
    rank: string;
  };
  databook_stats: {
    ninjutsu: number;
    taijutsu: number;
    genjutsu: number;
    intelligence: number;
    strength: number;
    speed: number;
    stamina: number;
    hand_seals: number;
  };
  abilities: {
    kekkei_genkai: string | null;
    nature_transformations: string[];
    unique_jutsu: string[];
    special_abilities: string[];
  };
  strengths: string[];
  weaknesses: string[];
  avatar?: string;
}

export const narutoCharacters: Character[] = [
  {
    _id: "naruto_uzumaki",
    name: "Naruto Uzumaki",
    basic_info: {
      full_name: "Naruto Uzumaki",
      aliases: [
        "Seventh Hokage",
        "Child of the Prophecy",
        "Hero of the Hidden Leaf",
      ],
      affiliations: ["Konohagakure", "Team 7", "Uzumaki Clan"],
      rank: "Hokage",
    },
    databook_stats: {
      ninjutsu: 5,
      taijutsu: 4.5,
      genjutsu: 2,
      intelligence: 3,
      strength: 5,
      speed: 4.5,
      stamina: 5,
      hand_seals: 2,
    },
    abilities: {
      kekkei_genkai: null,
      nature_transformations: [
        "Wind",
        "Fire",
        "Earth",
        "Water",
        "Lightning",
        "Lava",
        "Magnet",
        "Boil",
      ],
      unique_jutsu: [
        "Rasengan",
        "Shadow Clone Technique",
        "Sage Mode",
        "Nine-Tails Chakra Mode",
      ],
      special_abilities: [
        "Nine-Tails Jinchūriki",
        "Sage Mode",
        "Six Paths Power",
      ],
    },
    strengths: [
      "Massive chakra reserves",
      "Multiple Shadow Clone mastery",
      "Unpredictable fighting style",
      "Never gives up",
    ],
    weaknesses: [
      "Impulsive decision making",
      "Poor genjutsu resistance",
      "Relies heavily on brute force",
    ],
  },
  {
    _id: "sasuke_uchiha",
    name: "Sasuke Uchiha",
    basic_info: {
      full_name: "Sasuke Uchiha",
      aliases: ["Last Uchiha", "Shadow Hokage"],
      affiliations: ["Konohagakure", "Team 7", "Uchiha Clan"],
      rank: "Jōnin",
    },
    databook_stats: {
      ninjutsu: 5,
      taijutsu: 4.5,
      genjutsu: 5,
      intelligence: 4.5,
      strength: 4,
      speed: 5,
      stamina: 4,
      hand_seals: 5,
    },
    abilities: {
      kekkei_genkai: "Sharingan, Rinnegan",
      nature_transformations: ["Fire", "Lightning", "Earth", "Water", "Wind"],
      unique_jutsu: ["Chidori", "Amaterasu", "Susanoo", "Space-Time Ninjutsu"],
      special_abilities: ["Sharingan mastery", "Rinnegan power", "Curse Mark"],
    },
    strengths: [
      "Exceptional analytical skills",
      "Diverse jutsu arsenal",
      "High-speed combat",
      "Strategic thinking",
    ],
    weaknesses: [
      "Chakra depletion from dōjutsu",
      "Prideful nature",
      "Lone wolf mentality",
    ],
  },
  {
    _id: "sakura_haruno",
    name: "Sakura Haruno",
    basic_info: {
      full_name: "Sakura Haruno",
      aliases: ["Tsunade's Apprentice"],
      affiliations: ["Konohagakure", "Team 7", "Medical Corps"],
      rank: "Jōnin",
    },
    databook_stats: {
      ninjutsu: 4,
      taijutsu: 4,
      genjutsu: 3.5,
      intelligence: 4.5,
      strength: 5,
      speed: 3.5,
      stamina: 4,
      hand_seals: 4,
    },
    abilities: {
      kekkei_genkai: null,
      nature_transformations: ["Earth", "Water", "Fire"],
      unique_jutsu: [
        "Cherry Blossom Impact",
        "Strength of a Hundred Seal",
        "Medical Ninjutsu",
      ],
      special_abilities: [
        "Medical expertise",
        "Chakra control mastery",
        "Superhuman strength",
      ],
    },
    strengths: [
      "Perfect chakra control",
      "Medical ninjutsu mastery",
      "Incredible physical strength",
      "Analytical mind",
    ],
    weaknesses: [
      "Limited long-range options",
      "Emotionally driven",
      "Relatively lower speed",
    ],
  },
  {
    _id: "choji_akimichi",
    name: "Chōji Akimichi",
    basic_info: {
      full_name: "Chōji Akimichi",
      aliases: ["Sixteenth Head of the Akimichi Clan"],
      affiliations: ["Konohagakure", "Team Asuma", "Akimichi Clan"],
      rank: "Chūnin",
    },
    databook_stats: {
      ninjutsu: 4.5,
      taijutsu: 4.5,
      genjutsu: 1.5,
      intelligence: 2.5,
      strength: 5,
      speed: 3,
      stamina: 4.5,
      hand_seals: 1,
    },
    abilities: {
      kekkei_genkai: null,
      nature_transformations: ["Earth", "Fire", "Yang"],
      unique_jutsu: [
        "Multi-Size Technique",
        "Human Bullet Tank",
        "Spiky Human Bullet Tank",
        "Butterfly Mode",
      ],
      special_abilities: [
        "Size manipulation",
        "Calorie control",
        "Butterfly chakra mode",
        "Immense physical strength",
      ],
    },
    strengths: [
      "Immense physical strength",
      "Size manipulation for offense and defense",
      "High stamina and endurance",
      "Butterfly Mode power boost",
    ],
    weaknesses: [
      "Low speed and mobility",
      "Poor genjutsu and hand seal abilities",
      "Vulnerable to long-range attacks",
      "Butterfly Mode life risk",
    ],
  },
  {
    _id: "shikamaru_nara",
    name: "Shikamaru Nara",
    basic_info: {
      full_name: "Shikamaru Nara",
      aliases: ["Hokage's Advisor"],
      affiliations: ["Konohagakure", "Team Asuma", "Nara Clan"],
      rank: "Jōnin",
    },
    databook_stats: {
      ninjutsu: 3,
      taijutsu: 2,
      genjutsu: 3,
      intelligence: 5,
      strength: 2,
      speed: 3,
      stamina: 3,
      hand_seals: 3,
    },
    abilities: {
      kekkei_genkai: null,
      nature_transformations: ["Earth", "Fire", "Wind", "Yin"],
      unique_jutsu: [
        "Shadow Possession",
        "Shadow Imitation",
        "Shadow Strangle",
      ],
      special_abilities: [
        "Strategic genius",
        "Shadow manipulation",
        "Tactical analysis",
      ],
    },
    strengths: [
      "Exceptional strategic thinking",
      "Battle analysis",
      "Leadership skills",
      "Shadow jutsu mastery",
    ],
    weaknesses: [
      "Low physical combat stats",
      "Lazy by nature",
      "Limited chakra reserves",
      "Prefers avoiding conflict",
    ],
  },
  {
    _id: "neji_hyuga",
    name: "Neji Hyūga",
    basic_info: {
      full_name: "Neji Hyūga",
      aliases: ["Hyūga Prodigy"],
      affiliations: ["Konohagakure", "Team Guy", "Hyūga Clan"],
      rank: "Jōnin",
    },
    databook_stats: {
      ninjutsu: 4.5,
      taijutsu: 5,
      genjutsu: 4,
      intelligence: 4.5,
      strength: 4,
      speed: 4.5,
      stamina: 4,
      hand_seals: 5,
    },
    abilities: {
      kekkei_genkai: "Byakugan",
      nature_transformations: ["Fire", "Water", "Earth"],
      unique_jutsu: ["Eight Trigrams Sixty-Four Palms", "Rotation", "Air Palm"],
      special_abilities: [
        "360° vision",
        "Chakra point precision",
        "Gentle Fist mastery",
      ],
    },
    strengths: [
      "Perfect 360° vision",
      "Chakra point targeting",
      "Defensive techniques",
      "Analytical combat",
    ],
    weaknesses: [
      "Blind spot at close range",
      "Limited long-range attacks",
      "Overconfident",
      "Rigid fighting style",
    ],
  },
  {
    _id: "rock_lee",
    name: "Rock Lee",
    basic_info: {
      full_name: "Rock Lee",
      aliases: ["Handsome Devil of the Hidden Leaf"],
      affiliations: ["Konohagakure", "Team Guy"],
      rank: "Jōnin",
    },
    databook_stats: {
      ninjutsu: 1,
      taijutsu: 5,
      genjutsu: 1,
      intelligence: 2.5,
      strength: 5,
      speed: 5,
      stamina: 5,
      hand_seals: 1,
    },
    abilities: {
      kekkei_genkai: null,
      nature_transformations: [],
      unique_jutsu: ["Eight Gates", "Primary Lotus", "Hidden Lotus"],
      special_abilities: [
        "Eight Gates mastery",
        "Incredible speed",
        "Taijutsu specialist",
      ],
    },
    strengths: [
      "Unmatched taijutsu",
      "Eight Gates power",
      "Incredible determination",
      "Physical conditioning",
    ],
    weaknesses: [
      "No ninjutsu or genjutsu",
      "Eight Gates health risks",
      "Limited tactical options",
      "Predictable attacks",
    ],
  },
  {
    _id: "tenten",
    name: "Tenten",
    basic_info: {
      full_name: "Tenten",
      aliases: ["Weapons Specialist"],
      affiliations: ["Konohagakure", "Team Guy"],
      rank: "Jōnin",
    },
    databook_stats: {
      ninjutsu: 4,
      taijutsu: 4,
      genjutsu: 2,
      intelligence: 4,
      strength: 3.5,
      speed: 4,
      stamina: 3.5,
      hand_seals: 4,
    },
    abilities: {
      kekkei_genkai: null,
      nature_transformations: ["Fire", "Water", "Earth"],
      unique_jutsu: [
        "Twin Rising Dragons",
        "Manipulated Tools",
        "Weapon Summoning",
      ],
      special_abilities: [
        "Weapon mastery",
        "Perfect accuracy",
        "Tool manipulation",
      ],
    },
    strengths: [
      "Weapon expertise",
      "Long-range precision",
      "Versatile arsenal",
      "Strategic weapon use",
    ],
    weaknesses: [
      "Dependent on weapons",
      "Limited close combat",
      "Chakra intensive techniques",
      "Predictable patterns",
    ],
  },
];

export const teamRoles = [
  {
    id: "igl",
    name: "IGL (In-Game Leader)",
    description: "Strategic mastermind and team coordinator",
  },
  {
    id: "entry_fragger",
    name: "Entry Fragger",
    description: "First to engage enemies, aggressive playstyle",
  },
  {
    id: "sniper",
    name: "Sniper",
    description: "Long-range specialist and precision eliminator",
  },
  {
    id: "medic",
    name: "Medic",
    description: "Team support and healing specialist",
  },
  {
    id: "scout",
    name: "Scout",
    description: "Information gatherer and reconnaissance",
  },
  {
    id: "support",
    name: "Support",
    description: "Utility provider and team backup",
  },
];
