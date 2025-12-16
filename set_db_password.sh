#!/bin/bash
export PATH="/opt/homebrew/opt/postgresql@14/bin:$PATH"

echo "Setting PostgreSQL password..."
echo "You'll be prompted to connect. If it asks for a password, try:"
echo "1. Press Enter (no password)"
echo "2. Or try 'postgres' as password"
echo "3. Or your macOS password"
echo ""
echo "Once connected, run: ALTER USER josefmarenec WITH PASSWORD '1234';"
echo ""
psql -U josefmarenec -d postgres
