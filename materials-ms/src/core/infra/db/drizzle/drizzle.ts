import { type DrizzleD1Database, drizzle } from "drizzle-orm/d1";

let db: DrizzleD1Database | null

function connect(binding: D1Database) {
  if (!db) {
    db = drizzle(binding)
  }
  return db
}

export { connect, db };
