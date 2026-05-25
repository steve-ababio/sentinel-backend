#!/bin/bash

# Check if the environment is passed as an argument
if [ -z "$1" ]; then
  echo "Error: Environment (e.g., production) is required."
  echo "Usage: ./src/infrastructure/typeorm/scripts/run-migrations.sh <ENVIRONMENT>"
  exit 1
fi

ENVIRONMENT=$1

echo "---> Running 'migration run' for environment: $ENVIRONMENT"

# Ensure DATABASE_URL is set from the environment
if [ -z "$DATABASE_URL" ]; then
  echo "Error: DATABASE_URL environment variable is not set."
  exit 1
fi

echo "---> DATABASE_URL: $DATABASE_URL"

# Set additional environment variables
export NODE_ENV=$ENVIRONMENT
export DB_USE_SSL='true'  # Adjust if SSL is not required

echo "---> Started running migrations"
npx ts-node -r tsconfig-paths/register  ./node_modules/.bin/typeorm migration:run -d ./src/infrastructure/typeorm/data-source.ts

echo "---> Migration run completed"