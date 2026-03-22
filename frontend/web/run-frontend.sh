#!/usr/bin/env bash

set -e

echo "Starting frontend"

if [ ! -f ".env" ]; then
  echo ".env file missing in frontend/web/"
  exit 1
fi

if [ ! -d "node_modules" ]; then
  npm install
fi

npm run dev