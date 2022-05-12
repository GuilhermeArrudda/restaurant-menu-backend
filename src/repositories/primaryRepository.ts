import { prisma } from "../database.js";

async function findMany() {
  return prisma.primary.findMany();
}

async function getById(id: number) {
  return prisma.primary.findUnique({
    where: { id },
  });
}

export default {
  findMany,
  getById,
};
