# Property Hub

A full-stack real estate property management web application built with modern technologies.

## Tech Stack

### Backend

- **Express.js** - Web framework
- **TypeScript** - Type-safe JavaScript
- **MySQL** - Relational database
- **Drizzle ORM** - Database ORM
- **Zod** - Schema validation
- **JSON Web Token** - Authentication
- **Bcryptjs** - Password hashing

### Frontend

- **React 19** - UI library
- **Vite** - Build tool
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **React Hook Form** - Form handling

## Features

- User authentication (register/login)
- Property listing and management
- Property details with images
- Search and filter properties
- Responsive design

## Project Structure

```
property-hub/
├── api/                 # Backend application
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── db/
│   │   └── server.ts
│   ├── package.json
│   └── tsconfig.json
│
├── web/                 # Frontend application
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   └── App.tsx
│   ├── package.json
│   └── vite.config.ts
│
└── README.md
```

## Prerequisites

- Node.js (v18+)
- MySQL (v8.0+)
- npm or yarn

## Setup Guide

### 1. Clone the Repository

```bash
git clone <repository-url>
cd property-hub
```

### 2. Setup Backend

```bash
cd api
npm install
```

### 3. Configure Database

Create/update the `.env` file in the `api` directory:

**For Docker MySQL:**
```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=propertyhub_user
DB_PASSWORD=propertyhub@12345
DB_NAME=property_hub_db
```

**For Local MySQL:**
```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=property_hub_db
```

**Common settings:**
```env
JWT_SECRET=your_jwt_secret_key
JWT_ACCESS_EXPIRES_IN=20m
JWT_REFRESH_EXPIRES_IN=7d
PORT=3001
```

### 4. Setup Frontend

```bash
cd web
npm install
```

## How to Run

### 1. Start MySQL with Docker

First, ensure Docker daemon is running:

- **Linux**: `sudo systemctl start docker` (Linux)
- **Mac**: Start Docker Desktop application (Mac)
- **Windows**: Start Docker Desktop application (Windows)

Then start MySQL container:

```bash
cd api

# Linux (may need sudo)
sudo docker-compose up -d

# Mac (Docker Desktop must be running)
docker-compose up -d

# Windows (newer Docker versions use "docker compose")
docker compose up -d
```

This will start a MySQL 8.0 container with:
- **Database**: property_hub_db
- **User**: propertyhub_user
- **Password**: propertyhub@12345
- **Root Password**: rootpassword
- **Port**: 3306

To stop the container:
```bash
cd api
docker-compose down          # Linux/Mac
docker compose down         # Windows (newer Docker)
```

Or to stop and remove data:
```bash
docker-compose down -v      # Linux/Mac
docker compose down -v      # Windows
```

---

Alternatively, start your local MySQL server:

- **Linux**: `sudo systemctl start mysql` (Linux)
- **Mac**: `sudo mysql.server start` (Mac)
- **Windows**: Start MySQL service from Services app or use XAMPP/WAMP (Windows)

Then connect:
```bash
mysql -u root -p
```

### 2. Run Database Migrations

```bash
cd api
npm run db:push
```

### Step 3: Start the Backend Server

```bash
cd api
npm run dev
```

The API will run on `http://localhost:3001`

### Step 4: Start the Frontend Development Server

Open a new terminal:

```bash
cd web
npm run dev
```

The frontend will run on `http://localhost:5173`

## How to Run Drizzle Studio

Drizzle Studio provides a visual interface to explore your database tables and data.

```bash
cd api
npm run db:studio
```

This will open a web interface at `http://localhost:4983` where you can:
- View all tables
- Browse and filter data
- Add new records
- Edit existing data

## Available Scripts

### Backend

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run start` | Start production server |
| `npm run db:studio` | Open Drizzle Studio |
| `npm run db:generate` | Generate migrations |
| `npm run db:push` | Push schema to database |

### Frontend

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview production build |

## API Endpoints

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/properties` - Get all properties
- `GET /api/properties/:id` - Get property by ID
- `POST /api/properties` - Create property (auth required)
- `PUT /api/properties/:id` - Update property (auth required)
- `DELETE /api/properties/:id` - Delete property (auth required)

## License

@NischalSilwal
