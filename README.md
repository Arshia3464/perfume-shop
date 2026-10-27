# Perfume Shop

A modern e-commerce web application for luxury fragrances, built with cutting-edge web technologies.

## Tech Stack

- **Framework:** Next.js (App Router), React 19, TypeScript
- **Styling:** Tailwind CSS v4, Motion
- **Database & ORM:** PostgreSQL, Drizzle ORM
- **Auth:** Better Auth
- **Storage:** S3-compatible Object Storage (MinIO)
- **State Management:** Zustand

---

## Prerequisites

Ensure you have the following installed on your local machine:

- [Node.js](https://nodejs.org/) (>= 20)
- [pnpm](https://pnpm.io/) (>= 9.x)
- Docker & Docker Compose (recommended for running PostgreSQL and MinIO locally)

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Arshia3464/perfume-shop
cd perfume-shop
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Environment Variables Setup

Create a `.env` file in the root directory by copying the provided example file:

```bash
cp .env.example .env
```

Open `.env` and configure your environment variables. Here is a breakdown of what each variable does:

#### Database Configuration (PostgreSQL / Drizzle ORM)

- `DATABASE_URL`: The connection string for your PostgreSQL database.
  - _Local Example:_ `postgresql://postgres:mysecretpassword@localhost:5432/perfumedb`
  - _Production Example:_ `postgresql://<user>:<password>@<db-host>:5432/<dbname>?sslmode=require`

#### Object Storage (MinIO / S3)

- `MINIO_ENDPOINT`: The URL endpoint for your S3-compatible storage or MinIO container.
- `MINIO_ACCESS_KEY`: Access key ID for authentication.
- `MINIO_SECRET_KEY`: Secret access key for authentication.
- `MINIO_BUCKET_NAME`: The name of the bucket where perfume assets and images are stored.

#### Authentication (Better Auth)

- `BETTER_AUTH_SECRET`: A secure 32+ character key used to sign session tokens and cookies. You can generate one via terminal using: `openssl rand -base64 32`
- `BETTER_AUTH_URL`: The base URL of your application (e.g., `http://localhost:3000` for local development).

---

### 4. Database Setup & Migration

Make sure your PostgreSQL instance is running, then push your Drizzle schema to the database:

```bash
pnpm drizzle-kit push
```

### 5. Seed the Database

Populate your database with initial sample data (such as categories, products, or sample perfumes) by running:

```bash
pnpm db:seed
```

_(Note: Ensure your `package.json` has the corresponding `"db:seed"` script configured properly)._

---

### 6. Running the Development Server

Start the local development server:

```bash
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## License

Distributed under the MIT License. See `LICENSE` for more information.
