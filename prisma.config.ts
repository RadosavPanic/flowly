import "dotenv/config";
import path from "node:path";
import type { PrismaConfig } from "prisma";

export default {
  migrations: {
    path: path.join("prisma", "migrations"),
    seed: "tsx prisma/seed.ts",
  },
} satisfies PrismaConfig;
