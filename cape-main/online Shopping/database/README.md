# Shopify Database Setup

This folder contains database setup scripts for the Shopify application.

## Database Configuration

- **Database Name**: `shopify_db`
- **Username**: `root`
- **Password**: `root`
- **Port**: `5432` (default PostgreSQL port)

## Setup Instructions

### 1. Install PostgreSQL
Make sure PostgreSQL is installed on your system.

### 2. Create Database and Tables

#### Option A: Using psql command line
```bash
# Login to PostgreSQL
psql -U root

# Run the initialization script
\i init.sql
```

#### Option B: Using pgAdmin
1. Open pgAdmin
2. Create a new database named `shopify_db`
3. Open the Query Tool
4. Load and execute the `init.sql` script

### 3. Verify Setup
```sql
-- List all tables
\dt

-- Check categories
SELECT * FROM categories;

-- Check products
SELECT * FROM products;
```

## Notes

- The Spring Boot application will automatically create tables if they don't exist (thanks to `ddl-auto=update`)
- The `DataLoader` class in the backend will populate sample data on first run
- This SQL script is provided as an alternative manual setup option
