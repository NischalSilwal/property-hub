# Drizzle Studio Guide

## Quick Start

### 1. Start MySQL Database
```bash
cd api
docker compose up -d mysql
```

### 2. Open Drizzle Studio
```bash
npm run db:studio
```

### 3. Open in Browser
Visit: **http://localhost:4983**

## Available Scripts

```bash
# Generate migrations from schema changes
npm run db:generate

# Push schema to database (without migration files)
npm run db:push

# Run migrations
npm run db:migrate

# Open Drizzle Studio
npm run db:studio

# Check for schema mismatches
npm run db:check
```

## Database Connection

Drizzle Studio connects to:
- **Host**: localhost:3306
- **Database**: property_hub_db
- **User**: propertyhub_user
- **Password**: propertyhub@12345

## Workflow

### Start Database
```bash
docker compose up -d mysql
```

### View/Edit Database
```bash
npm run db:studio
# Opens Drizzle Studio at http://localhost:4983
```

### Make Schema Changes
1. Edit `src/db/schema.ts`
2. Run `npm run db:generate` to create migration files
3. Run `npm run db:push` to apply changes to database
4. View changes in Drizzle Studio

### Stop Database
```bash
docker compose down
```

## Troubleshooting

### Connection refused
- Ensure MySQL container is running: `docker ps | grep mysql`
- Check .env has correct DB credentials

### Drizzle Studio not loading
- Wait a moment after starting
- Clear browser cache
- Check if port 4983 is in use: `lsof -i :4983`

### Database not initialized
- Ensure `sql/init.sql` exists and run: `docker compose down -v && docker compose up -d`
