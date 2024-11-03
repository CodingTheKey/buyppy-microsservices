import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './src/core/infra/db/drizzle/**/*.ts',
  // dialect: 'sqlite',
  // driver: 'd1-http',
  // tablesFilter: ['/^(?!.*_cf_KV).*$/'],
  // dbCredentials: {
    // url: './local.sqlite'
    // accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
    // databaseId: process.env.CLOUDFLARE_DATABASE_ID!,
    // token: process.env.CLOUDFLARE_D1_TOKEN!,
  // },
});