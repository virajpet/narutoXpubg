#!/bin/bash

echo "🍃 Naruto PUBG Squad Builder - Development Setup 🎯"
echo "=================================================="

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check prerequisites
echo "Checking prerequisites..."

if ! command_exists node; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

if ! command_exists npm; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

if ! command_exists python3; then
    echo "❌ Python 3 is not installed. Please install Python 3 first."
    exit 1
fi

if ! command_exists mongod; then
    echo "⚠️  MongoDB is not installed or not in PATH."
    echo "   Please install MongoDB and ensure it's running."
    echo "   You can still run the application with local data fallback."
fi

echo "✅ Prerequisites checked"

# Check if backend virtual environment exists
if [ ! -d "python-backend/venv" ]; then
    echo "🔧 Setting up Python backend..."
    cd python-backend
    python3 -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt
    cd ..
    echo "✅ Backend setup complete"
else
    echo "✅ Backend virtual environment exists"
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "🔧 Installing frontend dependencies..."
    npm install
    echo "✅ Frontend dependencies installed"
else
    echo "✅ Frontend dependencies exist"
fi

# Check if concurrently is installed
if ! npm list concurrently > /dev/null 2>&1; then
    echo "🔧 Installing concurrently for development..."
    npm install concurrently --save-dev
fi

echo ""
echo "🚀 Starting development servers..."
echo ""
echo "Backend will be available at: http://localhost:8000"
echo "Frontend will be available at: http://localhost:5173"
echo "API Documentation: http://localhost:8000/docs"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Start both services
npm run dev:full 