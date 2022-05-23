import { prisma } from '../database.js'

async function findAll() {
	return prisma.product.findMany()
}

export const productsRepository = {
	findAll
}