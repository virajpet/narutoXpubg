const mongoose = require("mongoose");
require("dotenv").config();

// Character Schema (same as in server.js)
const characterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    village: {
      type: String,
      required: true,
    },
    rank: {
      type: String,
      required: true,
    },
    abilities: [
      {
        type: String,
      },
    ],
    chakra_nature: [
      {
        type: String,
      },
    ],
    description: {
      type: String,
      required: true,
    },
    image_url: {
      type: String,
    },
    stats: {
      strength: {
        type: Number,
        min: 1,
        max: 100,
        default: 50,
      },
      speed: {
        type: Number,
        min: 1,
        max: 100,
        default: 50,
      },
      intelligence: {
        type: Number,
        min: 1,
        max: 100,
        default: 50,
      },
      chakra: {
        type: Number,
        min: 1,
        max: 100,
        default: 50,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Character = mongoose.model("Character", characterSchema, "naruto");

// Sample character data
const sampleCharacters = [
  {
    name: "Naruto Uzumaki",
    village: "Hidden Leaf Village",
    rank: "Hokage",
    abilities: [
      "Rasengan",
      "Shadow Clone Jutsu",
      "Sage Mode",
      "Nine-Tails Chakra Mode",
    ],
    chakra_nature: ["Wind", "Fire", "Earth", "Water", "Lightning"],
    description:
      "The Seventh Hokage of the Hidden Leaf Village and the jinchūriki of the Nine-Tails.",
    image_url: "https://example.com/naruto.jpg",
    stats: {
      strength: 95,
      speed: 90,
      intelligence: 75,
      chakra: 100,
    },
  },
  {
    name: "Sasuke Uchiha",
    village: "Hidden Leaf Village",
    rank: "Rogue Ninja",
    abilities: ["Chidori", "Sharingan", "Rinnegan", "Amaterasu"],
    chakra_nature: ["Fire", "Lightning"],
    description:
      "The last surviving member of the Uchiha clan and Naruto's rival and best friend.",
    image_url: "https://example.com/sasuke.jpg",
    stats: {
      strength: 90,
      speed: 95,
      intelligence: 95,
      chakra: 90,
    },
  },
  {
    name: "Sakura Haruno",
    village: "Hidden Leaf Village",
    rank: "Jonin",
    abilities: [
      "Medical Ninjutsu",
      "Chakra Enhanced Strength",
      "Summoning Technique",
    ],
    chakra_nature: ["Earth", "Water"],
    description:
      "A highly skilled medical ninja and one of the strongest kunoichi of her generation.",
    image_url: "https://example.com/sakura.jpg",
    stats: {
      strength: 85,
      speed: 70,
      intelligence: 90,
      chakra: 80,
    },
  },
  {
    name: "Kakashi Hatake",
    village: "Hidden Leaf Village",
    rank: "Former Hokage",
    abilities: ["Chidori", "Sharingan", "Kamui", "Lightning Blade"],
    chakra_nature: ["Lightning", "Earth", "Water", "Fire", "Wind"],
    description:
      "The Copy Ninja, known for his Sharingan and mastery of over 1000 jutsu.",
    image_url: "https://example.com/kakashi.jpg",
    stats: {
      strength: 80,
      speed: 85,
      intelligence: 95,
      chakra: 85,
    },
  },
  {
    name: "Gaara",
    village: "Hidden Sand Village",
    rank: "Kazekage",
    abilities: [
      "Sand Manipulation",
      "Sand Shield",
      "Sand Coffin",
      "Shukaku Transformation",
    ],
    chakra_nature: ["Earth", "Wind"],
    description:
      "The Fifth Kazekage of the Hidden Sand Village and former jinchūriki of the One-Tail.",
    image_url: "https://example.com/gaara.jpg",
    stats: {
      strength: 75,
      speed: 65,
      intelligence: 85,
      chakra: 90,
    },
  },
  {
    name: "Itachi Uchiha",
    village: "Hidden Leaf Village",
    rank: "S-rank Criminal",
    abilities: ["Mangekyou Sharingan", "Tsukuyomi", "Amaterasu", "Susanoo"],
    chakra_nature: ["Fire", "Water", "Wind", "Yin", "Yang"],
    description:
      "A prodigy of the Uchiha clan who sacrificed everything for peace.",
    image_url: "https://example.com/itachi.jpg",
    stats: {
      strength: 85,
      speed: 90,
      intelligence: 100,
      chakra: 95,
    },
  },
  {
    name: "Jiraiya",
    village: "Hidden Leaf Village",
    rank: "Sannin",
    abilities: ["Sage Mode", "Rasengan", "Summoning Technique", "Fire Style"],
    chakra_nature: ["Fire", "Earth", "Water", "Wind", "Yin", "Yang"],
    description:
      "One of the Legendary Sannin and Naruto's mentor, known as the Toad Sage.",
    image_url: "https://example.com/jiraiya.jpg",
    stats: {
      strength: 90,
      speed: 80,
      intelligence: 90,
      chakra: 95,
    },
  },
  {
    name: "Pain/Nagato",
    village: "Hidden Rain Village",
    rank: "Leader of Akatsuki",
    abilities: [
      "Rinnegan",
      "Six Paths of Pain",
      "Planetary Devastation",
      "Almighty Push",
    ],
    chakra_nature: [
      "Fire",
      "Wind",
      "Lightning",
      "Earth",
      "Water",
      "Yin",
      "Yang",
    ],
    description:
      "The leader of Akatsuki who sought to bring peace through pain and understanding.",
    image_url: "https://example.com/pain.jpg",
    stats: {
      strength: 95,
      speed: 75,
      intelligence: 95,
      chakra: 100,
    },
  },
];

// Seed function
const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/naruto-game",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log("Connected to MongoDB");

    // Clear existing data
    await Character.deleteMany({});
    console.log("Cleared existing character data");

    // Insert sample data
    const insertedCharacters = await Character.insertMany(sampleCharacters);
    console.log(
      `Inserted ${insertedCharacters.length} characters successfully`
    );

    // Display inserted characters
    insertedCharacters.forEach((char) => {
      console.log(`- ${char.name} (${char.village}, ${char.rank})`);
    });
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    // Close connection
    await mongoose.connection.close();
    console.log("Database connection closed");
    process.exit(0);
  }
};

// Run seeder
seedDatabase();
