# Node.js Backend + React Frontend Integration Guide

## 🔗 Integration Overview

This project successfully integrates a **Node.js/Express backend** with a **React/TypeScript frontend** for the Naruto PUBG Team Builder application.

### Architecture

```
Frontend (React/TypeScript)     ←→     Backend (Node.js/Express)     ←→     Database (MongoDB Atlas)
    Port 5176                            Port 3002                         Cloud Database
```

## 🚀 Quick Start

### 1. Start Backend Server

```bash
cd nodejs-backend
npm run dev
```

The backend will start on `http://localhost:3002`

### 2. Start Frontend

```bash
npm run dev
```

The frontend will start on `http://localhost:5176`

### 3. Verify Integration

- Visit `http://localhost:5176` in your browser
- Check the API status indicator in the header (should show "Connected to API")
- Characters should load from the MongoDB database

## 🔌 API Integration Details

### Backend Configuration

- **Base URL**: `http://localhost:3002`
- **Database**: MongoDB Atlas (`game-data` database, `naruto` collection)
- **CORS**: Enabled for frontend communication

### Frontend Integration Points

#### 1. API Service (`src/services/api.ts`)

Central service that handles all backend communication:

```typescript
export class ApiService {
  static async getAllCharacters(): Promise<Character[]>;
  static async getCharacterById(id: string): Promise<Character>;
  static async getCharacterByName(name: string): Promise<Character>;
  static async getCharactersByVillage(village: string): Promise<Character[]>;
  static async getCharactersByRank(rank: string): Promise<Character[]>;
  static async searchCharacters(query: string): Promise<Character[]>;
  static async healthCheck(): Promise<{ message: string; version?: string }>;
}
```

#### 2. Characters Hook (`src/hooks/useCharacters.ts`)

React hook that manages character data with automatic fallback:

```typescript
const { characters, loading, error, apiHealthy, refreshCharacters } =
  useCharacters();
```

Features:

- ✅ Automatic API health checking
- ✅ Fallback to local data if API unavailable
- ✅ Loading states and error handling
- ✅ Manual refresh capability

#### 3. Component Integration (`src/components/TeamBuilder.tsx`)

Main component shows:

- API connection status indicator
- Real-time character data from database
- 36 characters loaded from MongoDB Atlas

## 📡 Available API Endpoints

### Character Endpoints

| Method | Endpoint                           | Description                    | Example                                                          |
| ------ | ---------------------------------- | ------------------------------ | ---------------------------------------------------------------- |
| GET    | `/api/characters`                  | Get all characters             | `curl http://localhost:3002/api/characters`                      |
| GET    | `/api/characters/:id`              | Get character by ID            | `curl http://localhost:3002/api/characters/64f...`               |
| GET    | `/api/characters/name/:name`       | Get by name (case-insensitive) | `curl http://localhost:3002/api/characters/name/naruto`          |
| GET    | `/api/characters/village/:village` | Filter by village/affiliation  | `curl http://localhost:3002/api/characters/village/konohagakure` |
| GET    | `/api/characters/rank/:rank`       | Filter by rank                 | `curl http://localhost:3002/api/characters/rank/hokage`          |
| POST   | `/api/characters`                  | Create new character           | For testing/admin use                                            |

### System Endpoints

| Method | Endpoint      | Description  |
| ------ | ------------- | ------------ | --------------------- |
| GET    | `/api/health` | Health check | Returns server status |

## 📊 Data Flow

### 1. Frontend Startup

```
useCharacters hook → ApiService.healthCheck() → ApiService.getAllCharacters() → Display characters
```

### 2. Character Search

```
User types → searchCharacters() → API call → Results displayed
```

### 3. Error Handling

```
API fails → Fallback to local data → Show warning message → Continue functionality
```

## 🧪 Testing the Integration

### Backend API Tests

```bash
# Health check
curl http://localhost:3002/api/health

# Get all characters (should return 36 characters)
curl http://localhost:3002/api/characters | jq '.count'

# Search by name
curl http://localhost:3002/api/characters/name/naruto | jq '.data.name'

# Filter by village
curl http://localhost:3002/api/characters/village/konohagakure | jq '.count'

# Filter by rank
curl http://localhost:3002/api/characters/rank/hokage | jq '.count'
```

### Frontend Integration Tests

1. **API Health**: Check green/red indicator in header
2. **Character Loading**: Verify 36 characters appear in dropdowns
3. **Search Functionality**: Type character names in search
4. **Team Building**: Select characters for different roles
5. **Fallback**: Stop backend server, verify local data fallback

## 🔧 Configuration

### Environment Variables (Backend)

```env
PORT=3002
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/game-data
NODE_ENV=development
```

### Frontend API Configuration

```typescript
// src/services/api.ts
const API_BASE_URL = "http://localhost:3002";
```

## 📈 Data Statistics

Current database contains:

- **Total Characters**: 36
- **Konohagakure Characters**: 27
- **Hokage Rank Characters**: 6
- **Complete Character Profiles**: All with stats, abilities, affiliations

## 🚨 Error Handling

### Backend Errors

- MongoDB connection issues
- Character not found (404)
- Server errors (500)

### Frontend Fallbacks

- API unreachable → Use local data
- Search fails → Show error message
- Loading states → Display spinner

## 🎯 Key Features Achieved

✅ **Real-time Database Integration**: Characters load from MongoDB Atlas  
✅ **Robust Error Handling**: Graceful fallbacks when API unavailable  
✅ **Type Safety**: Full TypeScript integration between frontend/backend  
✅ **Performance**: Efficient API calls with proper caching  
✅ **User Experience**: Clear status indicators and loading states  
✅ **Scalability**: Easy to add new endpoints and features

## 🔄 Development Workflow

### Adding New Features

1. **Backend**: Add endpoint in `nodejs-backend/server.js`
2. **Frontend**: Add method in `src/services/api.ts`
3. **Hook**: Update `src/hooks/useCharacters.ts` if needed
4. **Component**: Use in React components

### Data Updates

1. **Add Characters**: POST to `/api/characters`
2. **Update Schema**: Modify both backend and frontend types
3. **Migration**: Update database structure if needed

## 🛠 Troubleshooting

### Common Issues

**Backend not starting**:

- Check MongoDB connection string
- Verify port 3002 is available
- Check Node.js version compatibility

**Frontend shows local data**:

- Verify backend is running on port 3002
- Check browser console for API errors
- Test health endpoint manually

**Empty character list**:

- Verify database has data in `naruto` collection
- Check MongoDB Atlas connection
- Ensure correct database name (`game-data`)

### Debug Commands

```bash
# Check backend server
curl http://localhost:3002/api/health

# Check character count
curl http://localhost:3002/api/characters | jq '.count'

# Monitor backend logs
cd nodejs-backend && npm run dev

# Check frontend network requests
# Open browser DevTools → Network tab
```

## 📝 Next Steps

Potential enhancements:

- [ ] Add real-time updates with WebSocket
- [ ] Implement character favorites/bookmarks
- [ ] Add advanced filtering and sorting
- [ ] Create admin panel for character management
- [ ] Add user authentication
- [ ] Implement character comparison features

---

🎉 **Integration Complete!** Your Naruto PUBG Team Builder now successfully connects a React frontend to a Node.js backend with MongoDB Atlas database.
