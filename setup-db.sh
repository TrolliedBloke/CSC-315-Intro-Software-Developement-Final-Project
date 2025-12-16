#!/bin/bash
# Database setup script for StockY
# This script helps set up the PostgreSQL database

echo "StockY Database Setup"
echo "===================="
echo ""

# Check if psql is available
if ! command -v psql &> /dev/null; then
    echo "Error: psql command not found. Please install PostgreSQL."
    exit 1
fi

# Check if .env file exists
if [ ! -f .env ]; then
    echo "Error: .env file not found. Please copy .env.example to .env and configure it."
    exit 1
fi

# Source .env file to get database credentials
source .env

# Check if database name is set
if [ -z "$DB_NAME" ]; then
    echo "Error: DB_NAME not set in .env file"
    exit 1
fi

echo "Setting up database: $DB_NAME"
echo ""

# Create database if it doesn't exist
echo "Creating database (if it doesn't exist)..."
psql -U "$DB_USER" -h "$DB_HOST" -p "${DB_PORT:-5432}" -tc "SELECT 1 FROM pg_database WHERE datname = '$DB_NAME'" | grep -q 1 || \
psql -U "$DB_USER" -h "$DB_HOST" -p "${DB_PORT:-5432}" -c "CREATE DATABASE $DB_NAME"

# Run schema
echo "Running schema..."
psql -U "$DB_USER" -h "$DB_HOST" -p "${DB_PORT:-5432}" -d "$DB_NAME" -f db/schema.sql

# Run seed data
echo "Seeding database..."
psql -U "$DB_USER" -h "$DB_HOST" -p "${DB_PORT:-5432}" -d "$DB_NAME" -f db/seed.sql

echo ""
echo "Database setup complete!"
echo "You can now run 'npm start' to start the server."

