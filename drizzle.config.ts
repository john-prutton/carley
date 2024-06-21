import "dotenv/config"

import { defineConfig } from "drizzle-kit"

export default defineConfig({
  schema: "./src/lib/infrastructure/data-access/db/schema/index.ts",
  dialect: "sqlite",
  driver: "turso",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
    authToken: process.env.DATABASE_AUTH_TOKEN
  },
  verbose: true,
  strict: true
})
