#!/usr/bin/env bash

set -e

cd "$(dirname "$0")"

echo "Starting ML service"

if [ ! -f ".env" ]; then
  echo ".env file missing in ml-service/"
  exit 1
fi

if [ ! -d "venv" ]; then
  echo "Creating virtual environment"
  python3 -m venv venv
fi

source venv/bin/activate

pip install -r requirements.txt

echo "Starting FastAPI server"

uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload