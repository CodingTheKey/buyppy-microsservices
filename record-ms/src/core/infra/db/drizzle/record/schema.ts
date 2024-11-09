import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

const recordTable = sqliteTable("records", {
  id: text().primaryKey().default(""),
  weight: text().notNull(),
  created_at: integer('created_at', { mode: 'timestamp' }).default(sql`(current_timestamp)`),
  updated_at: integer({ mode: 'timestamp' }),
});

export { recordTable };
