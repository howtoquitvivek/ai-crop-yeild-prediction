#!/usr/bin/env bash

set -e

echo "Starting AICYP Development Environment"

# 1. Start Backend

echo "Building backend..."
cd backend
./mvnw clean install -q

echo "Starting backend..."
./mvnw spring-boot:run &
BACKEND_PID=$!
cd ..

# 2. Start ML Service

if [ -d "ml-service" ]; then
  echo "🧠 Starting ML service..."
  cd ml-service
  if [ -f "venv/bin/activate" ]; then
    source venv/bin/activate
  fi
  python app/main.py &
  ML_PID=$!
  cd ..
fi

# 3. Start Frontend

echo "Starting frontend..."
cd frontend/web

if [ ! -d "node_modules" ]; then
  echo "Installing frontend dependencies..."
  npm install
fi

npm run dev &
FRONTEND_PID=$!
cd ../..

# Done

echo ""
echo "AICYP is running!"
echo "Backend:  http://localhost:8080"
echo "Frontend: http://localhost:5173"
echo ""

wait