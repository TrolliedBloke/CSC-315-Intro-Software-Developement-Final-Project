#!/bin/bash
export PATH="/opt/homebrew/opt/postgresql@14/bin:$PATH"

echo "=========================================="
echo "StockY Database Setup"
echo "=========================================="
echo ""
echo "This script will set up your database."
echo "You may be prompted for a PostgreSQL password."
echo "If you haven't set one, try pressing Enter."
echo ""

read -p "Enter PostgreSQL password for user $(whoami) (or press Enter if none): " PGPASS
if [ -n "$PGPASS" ]; then
    export PGPASSWORD="$PGPASS"
else
    export PGPASSWORD=""
fi

DB_USER=$(whoami)

echo ""
echo "Creating database..."
psql -U $DB_USER -d postgres -c "CREATE DATABASE stocky_db;" 2>&1 | grep -v "already exists" || true

echo "Creating tables..."
psql -U $DB_USER -d stocky_db -f db/schema.sql 2>&1 | grep -E "CREATE|ERROR" | head -5

echo "Seeding data..."
psql -U $DB_USER -d stocky_db -f db/seed.sql 2>&1 | tail -3

echo ""
echo "Checking product count..."
psql -U $DB_USER -d stocky_db -c "SELECT COUNT(*) as products FROM products;" 2>&1 | grep -E "products|count"

echo ""
echo "=========================================="
echo "Setup complete!"
echo "=========================================="
echo ""
echo "Update your .env file with:"
echo "DB_USER=$DB_USER"
if [ -n "$PGPASS" ]; then
    echo "DB_PASS=$PGPASS"
else
    echo "DB_PASS="
fi
