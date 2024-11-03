import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

export let prisma = new PrismaClient({ log: [] }).$extends(withAccelerate());

const setDB = async (DATABASE_URL: string, DIRECT_URL: string) => {
  prisma = new PrismaClient({ log: [], datasources: {
  db: {
    url: DATABASE_URL,
    directUrl: DIRECT_URL
  },
}}).$extends(withAccelerate());
};
