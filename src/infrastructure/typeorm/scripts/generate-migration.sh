#!/bin/bash

# Check if the environment and migration name are passed as arguments
if [ -z "$1" ] || [ -z "$2" ]; then
  echo "Error: Both environment (e.g., production) and migration name are required."
  echo "Usage: ./src/infrastructure/typeorm/scripts/generate-migration.sh <ENVIRONMENT> <MIGRATION_NAME>"
  exit 1
fi

ENVIRONMENT=$1
MIGRATION_NAME=$2

echo "---> Running 'migration generate' for environment: $ENVIRONMENT"

# Ensure DATABASE_URL is set from the environment
if [ -z "$DATABASE_URL" ]; then
  echo "Error: DATABASE_URL environment variable is not set."
  exit 1
fi

echo "---> DATABASE_URL: $DATABASE_URL"

# Set additional environment variables
export NODE_ENV=$ENVIRONMENT
export DB_USE_SSL='true'  # Adjust if SSL is not required

echo "---> Started generating migrations"
npx ts-node  -r tsconfig-paths/register ./node_modules/.bin/typeorm migration:generate -d ./src/infrastructure/typeorm/data-source.ts ./src/infrastructure/typeorm/migrations/$MIGRATION_NAME

echo "---> Migration generation completed"