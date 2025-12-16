# Database Setup Instructions

PostgreSQL is installed and running. To set up the database, you have two options:

## Option 1: Set a PostgreSQL Password (Recommended)

1. Set a password for your PostgreSQL user:
   ```bash
   /opt/homebrew/opt/postgresql@14/bin/psql -U $(whoami) -d postgres
   ```
   Then in psql, run:
   ```sql
   ALTER USER $(whoami) WITH PASSWORD 'your_password';
   \q
   ```

2. Update your `.env` file:
   ```
   DB_USER=josefmarenec
   DB_PASS=your_password
   ```

3. Run the setup script:
   ```bash
   ./setup-db-simple.sh
   ```

## Option 2: Configure Trust Authentication (Easier for Development)

1. Edit PostgreSQL config to allow local connections without password:
   ```bash
   # Find the pg_hba.conf file
   /opt/homebrew/opt/postgresql@14/bin/pg_config --sysconfdir
   
   # Edit the file (usually at /opt/homebrew/var/postgresql@14/pg_hba.conf)
   # Change the line for local connections from:
   # local   all   all   md5
   # to:
   # local   all   all   trust
   ```

2. Restart PostgreSQL:
   ```bash
   brew services restart postgresql@14
   ```

3. Update your `.env` file:
   ```
   DB_USER=josefmarenec
   DB_PASS=
   ```

4. Run the setup:
   ```bash
   /opt/homebrew/opt/postgresql@14/bin/psql -U $(whoami) -d postgres -c "CREATE DATABASE stocky_db;"
   /opt/homebrew/opt/postgresql@14/bin/psql -U $(whoami) -d stocky_db -f db/schema.sql
   /opt/homebrew/opt/postgresql@14/bin/psql -U $(whoami) -d stocky_db -f db/seed.sql
   ```

## Quick Manual Setup

If you know your PostgreSQL password, run:

```bash
export PATH="/opt/homebrew/opt/postgresql@14/bin:$PATH"
export PGPASSWORD="your_password"

psql -U $(whoami) -d postgres -c "CREATE DATABASE stocky_db;"
psql -U $(whoami) -d stocky_db -f db/schema.sql
psql -U $(whoami) -d stocky_db -f db/seed.sql
```

Then update `.env` with your username and password.
