import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { materialTable } from "../material/schema";

const materialsRecordsTable = sqliteTable("materials_records", {
  id: text().primaryKey().default(""),
  weight: text().notNull(),
  materialId: text().notNull().references(() => materialTable.id),
  created_at: integer('created_at', { mode: 'timestamp' }).default(sql`(current_timestamp)`),
});

export { materialsRecordsTable };
