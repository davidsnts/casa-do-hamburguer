import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

//forma antiga de usar o prisma client
// const prisma = new PrismaClient();

async function connection() {
  await prisma.$connect();
  console.log("Conectado ao BD");
}

export { prisma, connection };
