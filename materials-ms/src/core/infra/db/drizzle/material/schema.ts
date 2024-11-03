import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

const materialTable = sqliteTable("materials", {
  id: text().primaryKey().default(""),
  name: text().notNull(),
  price: text().notNull().unique(),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(current_timestamp)`),
  updatedAt: integer({ mode: 'timestamp' }),
});

export { materialTable };
