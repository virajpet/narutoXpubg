const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI ||
        "mongodb+srv://Virajpet:<db_password>@game.nchke5i.mongodb.net/?retryWrites=true&w=majority&appName=Game",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

// Character Schema
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

const Character = mongoose.model("Character", characterSchema, " naruto");

// Helper function to transform MongoDB data to clean JavaScript objects
const transformMongoData = (doc) => {
  if (!doc) return doc;

  // Convert MongoDB document to plain object
  const obj = doc.toObject ? doc.toObject() : doc;

  // Recursively clean up MongoDB type objects
  const cleanObject = (item) => {
    if (item === null || item === undefined) return item;

    if (Array.isArray(item)) {
      return item.map(cleanObject);
    }

    if (typeof item === "object") {
      // Handle MongoDB type objects
      if (item.$numberDouble !== undefined) {
        return parseFloat(item.$numberDouble);
      }
      if (item.$numberInt !== undefined) {
        return parseInt(item.$numberInt);
      }
      if (item.$numberLong !== undefined) {
        return parseInt(item.$numberLong);
      }

      // Recursively clean nested objects
      const cleaned = {};
      for (const [key, value] of Object.entries(item)) {
        cleaned[key] = cleanObject(value);
      }
      return cleaned;
    }

    return item;
  };

  const cleaned = cleanObject(obj);

  // Ensure we have an _id field for frontend compatibility
  if (!cleaned._id && cleaned.name) {
    cleaned._id = cleaned.name.toLowerCase().replace(/[^a-z0-9]/g, "_");
  }

  // Ensure we have the MongoDB ObjectId if available
  if (doc._id && !cleaned._id) {
    cleaned._id = doc._id.toString();
  }

  // Ensure we have the abilities structure that frontend expects
  if (!cleaned.abilities) {
    cleaned.abilities = {
      kekkei_genkai: null,
      nature_transformations: cleaned.chakra_nature || [],
      unique_jutsu: [],
      special_abilities: [],
    };

    // Try to extract jutsu from existing data if available
    if (cleaned.basic_info && cleaned.basic_info.unique_jutsu) {
      cleaned.abilities.unique_jutsu = cleaned.basic_info.unique_jutsu;
    }

    // Add some default jutsu based on character data
    if (cleaned.name) {
      const defaultJutsu = getDefaultJutsuForCharacter(cleaned.name);
      if (defaultJutsu.length > 0) {
        cleaned.abilities.unique_jutsu = defaultJutsu;
      }
    }
  }

  // Ensure arrays exist even if empty
  if (!cleaned.strengths) cleaned.strengths = [];
  if (!cleaned.weaknesses) cleaned.weaknesses = [];

  return cleaned;
};

// Helper function to provide default jutsu for known characters
const getDefaultJutsuForCharacter = (name) => {
  const jutsuMap = {
    "Naruto Uzumaki": ["Rasengan", "Shadow Clone Jutsu", "Sage Mode"],
    "Sasuke Uchiha": ["Chidori", "Sharingan", "Amaterasu"],
    "Sakura Haruno": ["Medical Ninjutsu", "Chakra Enhanced Strength"],
    "Kakashi Hatake": ["Chidori", "Kamui", "Lightning Blade"],
    "Sai Yamanaka": ["Super Beast Scroll", "Ink Clone Technique"],
    Yamato: ["Wood Release", "Earth Style Wall"],
    Gaara: ["Sand Manipulation", "Sand Shield", "Sand Coffin"],
    "Itachi Uchiha": ["Tsukuyomi", "Amaterasu", "Susanoo"],
    Pain: ["Almighty Push", "Universal Pull", "Planetary Devastation"],
    Jiraiya: ["Sage Mode", "Summoning Technique", "Fire Style"],
    Tsunade: ["Medical Ninjutsu", "Strength of a Hundred Seal"],
    Orochimaru: ["Summoning Technique", "Body Replacement"],
    "Minato Namikaze": ["Flying Thunder God", "Rasengan"],
    "Hashirama Senju": ["Wood Release", "Sage Mode"],
    "Tobirama Senju": ["Flying Thunder God", "Water Dragon Jutsu"],
    "Hiruzen Sarutobi": ["Summoning Technique", "Shadow Clone Jutsu"],
    "Might Guy": ["Eight Gates", "Dynamic Entry"],
    "Rock Lee": ["Eight Gates", "Primary Lotus"],
    "Neji Hyuga": ["Byakugan", "Gentle Fist"],
    "Shikamaru Nara": ["Shadow Possession", "Shadow Bind"],
    "Choji Akimichi": ["Multi-Size Technique", "Human Bullet Tank"],
    "Ino Yamanaka": ["Mind Transfer", "Mind Body Switch"],
    "Kiba Inuzuka": ["Fang Over Fang", "Beast Human Clone"],
    "Shino Aburame": ["Insect Clone", "Secret Technique"],
    "Hinata Hyuga": ["Byakugan", "Gentle Fist"],
    Tenten: ["Weapon Summoning", "Twin Rising Dragons"],
  };

  return jutsuMap[name] || ["Basic Techniques", "Substitution Jutsu"];
};

// Routes

// Get all characters
app.get("/api/characters", async (req, res) => {
  try {
    const characters = await Character.find({});
    const cleanedCharacters = characters.map(transformMongoData);

    res.json({
      success: true,
      count: cleanedCharacters.length,
      data: cleanedCharacters,
    });
  } catch (error) {
    console.error("Error fetching characters:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching characters",
      error: error.message,
    });
  }
});

// Get character by ID
app.get("/api/characters/:id", async (req, res) => {
  try {
    const character = await Character.findById(req.params.id);

    if (!character) {
      return res.status(404).json({
        success: false,
        message: "Character not found",
      });
    }

    res.json({
      success: true,
      data: transformMongoData(character),
    });
  } catch (error) {
    console.error("Error fetching character:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching character",
      error: error.message,
    });
  }
});

// Get character by name
app.get("/api/characters/name/:name", async (req, res) => {
  try {
    const character = await Character.findOne({
      name: new RegExp(req.params.name, "i"),
    });

    if (!character) {
      return res.status(404).json({
        success: false,
        message: "Character not found",
      });
    }

    res.json({
      success: true,
      data: transformMongoData(character),
    });
  } catch (error) {
    console.error("Error fetching character:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching character",
      error: error.message,
    });
  }
});

// Get characters by village
app.get("/api/characters/village/:village", async (req, res) => {
  try {
    const characters = await Character.find({
      "basic_info.affiliations": new RegExp(req.params.village, "i"),
    });

    const cleanedCharacters = characters.map(transformMongoData);

    res.json({
      success: true,
      count: cleanedCharacters.length,
      data: cleanedCharacters,
    });
  } catch (error) {
    console.error("Error fetching characters by village:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching characters by village",
      error: error.message,
    });
  }
});

// Get characters by rank
app.get("/api/characters/rank/:rank", async (req, res) => {
  try {
    const characters = await Character.find({
      "basic_info.rank": new RegExp(req.params.rank, "i"),
    });

    const cleanedCharacters = characters.map(transformMongoData);

    res.json({
      success: true,
      count: cleanedCharacters.length,
      data: cleanedCharacters,
    });
  } catch (error) {
    console.error("Error fetching characters by rank:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching characters by rank",
      error: error.message,
    });
  }
});

// Create a new character (for testing purposes)
app.post("/api/characters", async (req, res) => {
  try {
    const character = new Character(req.body);
    const savedCharacter = await character.save();

    res.status(201).json({
      success: true,
      message: "Character created successfully",
      data: savedCharacter,
    });
  } catch (error) {
    console.error("Error creating character:", error);
    res.status(400).json({
      success: false,
      message: "Error creating character",
      error: error.message,
    });
  }
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
    error: err.message,
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Start server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Health check: http://localhost:${PORT}/api/health`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
