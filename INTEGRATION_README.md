# Naruto PUBG Squad Builder - Full Stack Integration

This project integrates a React frontend with a FastAPI backend to create a dynamic Naruto character squad builder application.

## Architecture Overview

### Frontend (React + TypeScript + Vite)

- **Location**: `src/`
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Port**: 5173 (default Vite dev server)

### Backend (FastAPI + Python)

- **Location**: `python-backend/`
- **Framework**: FastAPI
- **Database**: MongoDB
- **Port**: 8000
- **API Documentation**: Available at `http://localhost:8000/docs`

## Features

### Backend API Endpoints

- `GET /` - Health check and API info
- `GET /characters` - Get all characters with optional filtering and pagination
- `GET /characters/{character_id}` - Get specific character by ID
- `GET /characters/search/{query}` - Search characters by various fields
- `GET /characters/stats/top` - Get top characters by specific stats

### Frontend Integration

- **API Service** (`src/services/api.ts`): Handles all backend communication
- **Custom Hook** (`src/hooks/useCharacters.ts`): Manages character data state
- **Fallback System**: Uses local data if API is unavailable
- **Loading States**: Shows loading spinners during API calls
- **Error Handling**: Displays user-friendly error messages
- **Health Monitoring**: Shows API connection status

## Setup Instructions

### 1. Backend Setup

```bash
# Navigate to backend directory
cd python-backend

# Run the setup script (creates virtual environment, installs dependencies, sets up MongoDB)
bash setup.sh

# Alternatively, set up manually:
# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start MongoDB (if not running as a service)
mongod

# Seed the database with character data
python seed_data.py

# Start the FastAPI server
python start_server.py
```

The backend will be available at `http://localhost:8000`

### 2. Frontend Setup

```bash
# Install dependencies
npm install

# Install concurrently for running both services (optional)
npm install concurrently --save-dev

# Start the frontend development server
npm run dev
```

The frontend will be available at `http://localhost:5173`

### 3. Run Full Stack Application

Option 1: Run services separately

```bash
# Terminal 1: Start backend
npm run dev:backend

# Terminal 2: Start frontend
npm run dev
```

Option 2: Run both services together (requires concurrently)

```bash
npm run dev:full
```

## API Integration Details

### Data Flow

1. **Startup**: Frontend attempts to connect to the backend API
2. **Health Check**: Verifies API availability with `/` endpoint
3. **Data Loading**: Fetches character data from `/characters` endpoint
4. **Fallback**: Uses local data if API is unavailable
5. **Real-time Updates**: Provides refresh functionality

### Error Handling

- **Network Errors**: Falls back to local character data
- **API Errors**: Displays error messages with fallback option
- **Loading States**: Shows loading indicators during API calls
- **Health Monitoring**: Visual indicator of API connection status

### Performance Features

- **Lazy Loading**: Characters loaded on component mount
- **Caching**: Uses React state to cache loaded characters
- **Search Optimization**: Server-side search when API is available
- **Fallback Search**: Client-side search on local data when API is down

## File Structure

```
project/
├── src/                          # Frontend source code
│   ├── components/              # React components
│   │   ├── TeamBuilder.tsx     # Main component (updated)
│   │   ├── CharacterCard.tsx   # Character display component
│   │   └── RadarChart.tsx      # Stats visualization
│   ├── services/               # API integration
│   │   └── api.ts              # API service class (new)
│   ├── hooks/                  # Custom React hooks
│   │   └── useCharacters.ts    # Character data hook (new)
│   ├── data/                   # Local data (fallback)
│   │   └── characters.ts       # Character definitions
│   └── App.tsx                 # Root component
├── python-backend/             # Backend source code
│   ├── main.py                # FastAPI application
│   ├── models.py              # Pydantic models
│   ├── database.py            # MongoDB connection
│   ├── seed_data.py           # Database seeding
│   └── start_server.py        # Server startup script
└── package.json               # Updated with new scripts
```

## Development Workflow

### Adding New Features

1. **Backend**: Add new endpoints in `python-backend/main.py`
2. **Frontend Service**: Update `src/services/api.ts` with new API methods
3. **Frontend Hook**: Extend `src/hooks/useCharacters.ts` if needed
4. **Components**: Update React components to use new functionality

### Testing API Integration

1. Start both services
2. Check API health at `http://localhost:8000/docs`
3. Verify frontend shows "Connected to API" status
4. Test fallback by stopping the backend service

## Troubleshooting

### Common Issues

**API Connection Failed**

- Verify backend is running on port 8000
- Check MongoDB is running
- Ensure no firewall blocking the connection

**CORS Errors**

- Backend includes CORS middleware for development
- For production, update `allow_origins` in `main.py`

**Database Connection Issues**

- Ensure MongoDB is running
- Check connection string in `database.py`
- Verify database is seeded with `python seed_data.py`

**Frontend Build Issues**

- Run `npm install` to ensure all dependencies are installed
- Check TypeScript compilation errors
- Verify all imports are correct

## Production Deployment

### Backend

- Set up production MongoDB instance
- Configure environment variables
- Use production ASGI server (Gunicorn + Uvicorn)
- Set up proper CORS origins

### Frontend

- Build production bundle: `npm run build`
- Serve static files through web server
- Update API_BASE_URL in `src/services/api.ts`

## Next Steps

1. **Authentication**: Add user authentication to both frontend and backend
2. **Team Persistence**: Save team compositions to database
3. **Real-time Features**: WebSocket integration for live updates
4. **Caching**: Implement Redis caching for frequently accessed data
5. **Testing**: Add unit and integration tests
6. **Monitoring**: Add logging and monitoring to both services
