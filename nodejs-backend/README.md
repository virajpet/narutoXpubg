# Node.js Backend Server for Naruto Character Database

This is a Node.js backend server built with Express.js and MongoDB that provides API endpoints to fetch Naruto character details from a MongoDB database.

## Features

- RESTful API endpoints for character data
- MongoDB integration with Mongoose ODM
- Character schema with stats, abilities, and detailed information
- CORS enabled for frontend integration
- Error handling and validation
- Sample data seeding
- Health check endpoint

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

## Installation

1. Navigate to the backend directory:

   ```bash
   cd nodejs-backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:

   ```env
   PORT=3001
   MONGODB_URI=mongodb://localhost:27017/naruto-game
   NODE_ENV=development
   ```

4. Start MongoDB service (if running locally):

   ```bash
   # On macOS with Homebrew
   brew services start mongodb-community

   # On Linux
   sudo systemctl start mongod

   # On Windows
   net start MongoDB
   ```

## Usage

### Starting the Server

1. **Development mode** (with auto-restart):

   ```bash
   npm run dev
   ```

2. **Production mode**:
   ```bash
   npm start
   ```

The server will start on `http://localhost:3001` by default.

### Seeding Sample Data

To populate the database with sample Naruto character data:

```bash
npm run seed
```

This will add 8 sample characters including Naruto, Sasuke, Sakura, Kakashi, and others.

## API Endpoints

### Health Check

- **GET** `/api/health` - Check if the server is running

### Character Endpoints

- **GET** `/api/characters` - Get all characters
- **GET** `/api/characters/:id` - Get character by ID
- **GET** `/api/characters/name/:name` - Get character by name (case-insensitive)
- **GET** `/api/characters/village/:village` - Get characters by village
- **GET** `/api/characters/rank/:rank` - Get characters by rank
- **POST** `/api/characters` - Create a new character

### Example API Responses

#### Get All Characters

```json
{
  "success": true,
  "count": 8,
  "data": [
    {
      "_id": "...",
      "name": "Naruto Uzumaki",
      "village": "Hidden Leaf Village",
      "rank": "Hokage",
      "abilities": ["Rasengan", "Shadow Clone Jutsu", "Sage Mode"],
      "chakra_nature": ["Wind", "Fire", "Earth", "Water", "Lightning"],
      "description": "The Seventh Hokage...",
      "stats": {
        "strength": 95,
        "speed": 90,
        "intelligence": 75,
        "chakra": 100
      },
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### Get Character by Name

```json
{
  "success": true,
  "data": {
    "_id": "...",
    "name": "Sasuke Uchiha",
    "village": "Hidden Leaf Village",
    "rank": "Rogue Ninja",
    "abilities": ["Chidori", "Sharingan", "Rinnegan", "Amaterasu"],
    "chakra_nature": ["Fire", "Lightning"],
    "description": "The last surviving member of the Uchiha clan...",
    "stats": {
      "strength": 90,
      "speed": 95,
      "intelligence": 95,
      "chakra": 90
    }
  }
}
```

## Character Schema

Each character in the database has the following structure:

```javascript
{
  name: String (required, unique),
  village: String (required),
  rank: String (required),
  abilities: [String],
  chakra_nature: [String],
  description: String (required),
  image_url: String (optional),
  stats: {
    strength: Number (1-100),
    speed: Number (1-100),
    intelligence: Number (1-100),
    chakra: Number (1-100)
  },
  createdAt: Date,
  updatedAt: Date
}
```

## Testing the API

You can test the API using curl, Postman, or any HTTP client:

```bash
# Health check
curl http://localhost:3001/api/health

# Get all characters
curl http://localhost:3001/api/characters

# Get character by name
curl http://localhost:3001/api/characters/name/naruto

# Get characters by village
curl http://localhost:3001/api/characters/village/leaf

# Create a new character
curl -X POST http://localhost:3001/api/characters \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Rock Lee",
    "village": "Hidden Leaf Village",
    "rank": "Jonin",
    "abilities": ["Eight Gates", "Taijutsu"],
    "chakra_nature": [],
    "description": "A ninja who specializes in taijutsu"
  }'
```

## Error Handling

The API includes comprehensive error handling:

- **404** - Resource not found
- **400** - Bad request (validation errors)
- **500** - Internal server error

All error responses follow this format:

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message"
}
```

## Development

### Project Structure

```
nodejs-backend/
├── server.js          # Main server file
├── seedData.js        # Database seeding script
├── package.json       # Dependencies and scripts
├── .env.example       # Environment variables template
└── README.md          # This file
```

### Adding New Features

1. **New Endpoints**: Add routes in `server.js`
2. **Schema Changes**: Update the character schema in both `server.js` and `seedData.js`
3. **New Sample Data**: Add characters to the `sampleCharacters` array in `seedData.js`

## Deployment

For production deployment:

1. Set `NODE_ENV=production` in your environment
2. Use a production MongoDB instance (MongoDB Atlas recommended)
3. Consider using PM2 for process management:
   ```bash
   npm install -g pm2
   pm2 start server.js --name "naruto-api"
   ```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.
