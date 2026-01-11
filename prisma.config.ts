// Prisma 7 Config - Database connection configured HERE
// This file MUST be at project root (same level as package.json)

import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  // Schema location
  schema: "prisma/schema.prisma",
  
  // Migrations configuration
  migrations: {
    path: "prisma/migrations",
  },
  
  // Database connection - THIS IS WHERE URL GOES IN PRISMA 7!
  datasource: {
    // For Neon pooled connection (used by Prisma CLI for migrations)
    url: env("DATABASE_URL"),
  },
});