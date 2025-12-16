#!/bin/bash
export PATH="/opt/homebrew/opt/postgresql@14/bin:$PATH"
DB_USER=$(whoami)

echo "Setting up StockY database..."
echo "You may be prompted for your PostgreSQL password (press Enter if no password set)"

# Create database
psql -U $DB_USER -d postgres -c "CREATE DATABASE stocky_db;" 2>/dev/null || echo "Database may already exist"

# Run schema
echo "Creating tables..."
psql -U $DB_USER -d stocky_db -f db/schema.sql

# Run seed
echo "Seeding data..."
psql -U $DB_USER -d stocky_db -f db/seed.sql

echo "Done! Update your .env file with:"
echo "DB_USER=$DB_USER"
echo "DB_PASS="
