#!/usr/bin/env bash

set -e

echo "Starting backend"

if [ ! -f ".env" ]; then
  echo ".env file missing in backend/"
  exit 1
fi

./mvnw clean install

./mvnw spring-boot:run