#!/bin/bash
export PATH="/opt/homebrew/opt/postgresql@14/bin:$PATH"

echo "=========================================="
echo "StockY Database Setup"
echo "=========================================="
echo ""
echo "Step 1: Setting PostgreSQL password to '1234'"
echo "You'll be prompted to connect to PostgreSQL."
echo "If it asks for a password, try pressing Enter or your macOS password."
echo ""
read -p "Press Enter to continue and connect to PostgreSQL..."

psql -U josefmarenec -d postgres << SQL
ALTER USER josefmarenec WITH PASSWORD '1234';
\q
SQL

if [ $? -eq 0 ]; then
    echo ""
    echo "Password set successfully!"
    echo ""
    echo "Step 2: Creating database and tables..."
    export PGPASSWORD='1234'
    
    psql -U josefmarenec -d postgres -c "CREATE DATABASE stocky_db;" 2>&1 | grep -v "already exists"
    
    echo "Creating tables..."
    psql -U josefmarenec -d stocky_db -f db/schema.sql 2>&1 | grep -E "CREATE|ERROR" | head -5
    
    echo "Seeding data..."
    psql -U josefmarenec -d stocky_db -f db/seed.sql 2>&1 | tail -3
    
    echo ""
    echo "Verifying setup..."
    psql -U josefmarenec -d stocky_db -c "SELECT COUNT(*) as products FROM products;" 2>&1 | grep -E "products|count"
    
    echo ""
    echo "=========================================="
    echo "Database setup complete!"
    echo "=========================================="
    echo ""
    echo "Your .env file should have:"
    echo "DB_USER=josefmarenec"
    echo "DB_PASS=1234"
else
    echo ""
    echo "Could not set password automatically."
    echo "Please run this command manually:"
    echo "  psql -U josefmarenec -d postgres"
    echo "Then in psql, run:"
    echo "  ALTER USER josefmarenec WITH PASSWORD '1234';"
    echo "  \\q"
    echo ""
    echo "Then run this script again."
fi
