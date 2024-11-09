import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

const materialTable = sqliteTable("materials", {
  id: text().primaryKey().default("").unique(),
  name: text().notNull(),
  price: text().notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(current_timestamp)`),
  updatedAt: integer({ mode: 'timestamp' }),
});

export { materialTable };
