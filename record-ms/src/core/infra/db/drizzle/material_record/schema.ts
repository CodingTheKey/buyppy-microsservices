import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { materialTable } from "../material/schema";
import { recordTable } from "../record/schema";

const materialsRecordsTable = sqliteTable("materials_records", {
  id: text().primaryKey().default(""),
  materialId: text().primaryKey().default("").references(() => materialTable.id),
  materialName: text().default("").notNull(),
  recordId: text().primaryKey().default("").references(() => recordTable.id),
  materialPrice: text().notNull(),
  recordWeight: text().notNull(),
  created_at: integer('created_at', { mode: 'timestamp' }).default(sql`(current_timestamp)`),
  updated_at: integer({ mode: 'timestamp' }),
});

export { materialsRecordsTable };
